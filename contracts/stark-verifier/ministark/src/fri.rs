use crate::merkle::MerkleProof;
use crate::merkle::MerkleTree;
use crate::merkle::MerkleTreeError;
use crate::random::PublicCoin;
use crate::utils::interleave;
use alloc::vec::Vec;
use ark_ff::FftField;
use ark_ff::Field;
use ark_poly::domain::DomainCoeff;
use ark_poly::univariate::DensePolynomial;
use ark_poly::DenseUVPolynomial;
use ark_poly::EvaluationDomain;
use ark_poly::Polynomial;
use ark_poly::Radix2EvaluationDomain;
use ark_serialize::CanonicalDeserialize;
use ark_serialize::CanonicalSerialize;
use core::ops::Deref;
use digest::Digest;
use digest::Output;
use gpu_poly::prelude::*;
#[cfg(feature = "parallel")]
use rayon::prelude::*;
use snafu::Snafu;

#[derive(Clone, Copy)]
pub struct FriOptions {
    folding_factor: usize,
    max_remainder_size: usize,
    blowup_factor: usize,
}

impl FriOptions {
    pub fn new(blowup_factor: usize, folding_factor: usize, max_remainder_size: usize) -> Self {
        FriOptions {
            folding_factor,
            max_remainder_size,
            blowup_factor,
        }
    }

    pub fn num_layers(&self, mut domain_size: usize) -> usize {
        let mut num_layers = 0;
        while domain_size > self.max_remainder_size {
            domain_size /= self.folding_factor;
            num_layers += 1;
        }
        num_layers
    }

    pub fn remainder_size(&self, mut domain_size: usize) -> usize {
        while domain_size > self.max_remainder_size {
            domain_size /= self.folding_factor;
        }
        domain_size
    }

    pub fn domain_offset<F: GpuField>(&self) -> F::FftField
    where
        F::FftField: FftField,
    {
        F::FftField::GENERATOR
    }
}

#[derive(CanonicalSerialize, CanonicalDeserialize, Clone)]
pub struct FriProof<F: Field> {
    layers: Vec<FriProofLayer<F>>,
    remainder: Vec<F>,
    remainder_commitment: Vec<u8>,
}

impl<F: GpuField + Field> FriProof<F>
where
    F::FftField: FftField,
{
    pub fn new(
        layers: Vec<FriProofLayer<F>>,
        remainder_commitment: Vec<u8>,
        remainder: Vec<F>,
    ) -> Self {
        FriProof {
            layers,
            remainder_commitment,
            remainder,
        }
    }
}

pub struct FriProver<F: GpuField, D: Digest> {
    options: FriOptions,
    layers: Vec<FriLayer<F, D>>,
}

struct FriLayer<F: GpuField, D: Digest> {
    tree: MerkleTree<D>,
    evaluations: Vec<F>,
}

#[derive(CanonicalSerialize, CanonicalDeserialize, Clone)]
pub struct FriProofLayer<F: Field> {
    values: Vec<F>,
    proofs: Vec<MerkleProof>,
    commitment: Vec<u8>,
}

impl<F: GpuField + Field> FriProofLayer<F>
where
    F::FftField: FftField,
{
    pub fn new<const N: usize>(
        values: Vec<[F; N]>,
        proofs: Vec<MerkleProof>,
        commitment: Vec<u8>,
    ) -> Self {
        let values = values.into_iter().flatten().collect();
        FriProofLayer {
            values,
            proofs,
            commitment,
        }
    }

    pub fn verify<D: Digest, const N: usize>(
        &self,
        positions: &[usize],
    ) -> Result<(), MerkleTreeError> {
        let commitment = Output::<D>::from_slice(&self.commitment);
        // TODO: could check raminder is empty but not critical
        // TODO: could check positions has the same len as other vecs but not critical
        let (chunks, _remainder) = &self.values.as_chunks::<N>();
        // zip chains could be dangerous
        for (i, position) in positions.iter().enumerate() {
            let proof = self.proofs[i].parse::<D>();
            let expected_leaf = &proof[0];
            let mut chunk_bytes = Vec::with_capacity(chunks.compressed_size());
            chunks.serialize_compressed(&mut chunk_bytes).unwrap();
            let actual_leaf = D::new_with_prefix(chunk_bytes).finalize();

            if *expected_leaf != actual_leaf {
                return Err(MerkleTreeError::InvalidProof);
            }

            MerkleTree::<D>::verify(commitment, &proof, *position / 4)?;
        }
        Ok(())
    }
}

impl<F: GpuField + Field, D: Digest> FriProver<F, D>
where
    F: DomainCoeff<F::FftField>,
    F::FftField: FftField,
{
    pub fn new(options: FriOptions) -> Self {
        FriProver {
            options,
            layers: Vec::new(),
        }
    }

    pub fn into_proof(self, positions: &[usize]) -> FriProof<F> {
        let folding_factor = self.options.folding_factor;
        let (last_layer, initial_layers) = self.layers.split_last().unwrap();
        let mut domain_size = self.layers[0].evaluations.len();
        let mut proof_layers = Vec::new();
        let mut positions = positions.to_vec();
        for layer in initial_layers {
            let num_eval_chunks = domain_size / folding_factor;
            positions = fold_positions(&positions, num_eval_chunks);
            domain_size = num_eval_chunks;

            proof_layers.push(match folding_factor {
                2 => query_layer::<F, D, 2>(layer, &positions),
                4 => query_layer::<F, D, 4>(layer, &positions),
                6 => query_layer::<F, D, 6>(layer, &positions),
                8 => query_layer::<F, D, 8>(layer, &positions),
                16 => query_layer::<F, D, 16>(layer, &positions),
                _ => unimplemented!("folding factor {folding_factor} is not supported"),
            });
        }

        // layers store interlaved evaluations so they need to be un-interleaved
        let remainder_commitment = last_layer.tree.root().to_vec();
        let last_evals = &last_layer.evaluations;
        let mut remainder = vec![F::zero(); last_evals.len()];
        let num_eval_chunks = last_evals.len() / folding_factor;
        for i in 0..num_eval_chunks {
            for j in 0..folding_factor {
                remainder[i + num_eval_chunks * j] = last_evals[i * folding_factor + j];
            }
        }

        FriProof::new(proof_layers, remainder_commitment, remainder)
    }

    pub fn build_layers(
        &mut self,
        channel: &mut impl ProverChannel<F, Digest = D>,
        mut evaluations: GpuVec<F>,
    ) {
        assert!(self.layers.is_empty());
        // let codeword = evaluations.0[0];

        for _ in 0..self.options.num_layers(evaluations.len()) + 1 {
            evaluations = match self.options.folding_factor {
                2 => self.build_layer::<2>(channel, evaluations),
                4 => self.build_layer::<4>(channel, evaluations),
                8 => self.build_layer::<8>(channel, evaluations),
                16 => self.build_layer::<16>(channel, evaluations),
                folding_factor => unreachable!("folding factor {folding_factor} not supported"),
            }
        }
    }

    /// Builds a single layer of the FRI protocol
    /// Returns the evaluations for the next layer.
    fn build_layer<const N: usize>(
        &mut self,
        channel: &mut impl ProverChannel<F, Digest = D>,
        mut evaluations: GpuVec<F>,
    ) -> GpuVec<F> {
        // Each layer requires decommitting to `folding_factor` many evaluations e.g.
        // `folding_factor = 2` decommits to an evaluation for LHS_i and RHS_i
        // (0 ≤ i < n/2) which requires two merkle paths if the evaluations are
        // committed to in their natural order. If we instead commit to interleaved
        // evaluations i.e. [[LHS0, RHS0], [LHS1, RHS1], ...] LHS_i and RHS_i
        // only require a single merkle path for their decommitment.
        let interleaved_evals: Vec<[F; N]> = interleave(&evaluations);
        let hashed_evals = ark_std::cfg_iter!(interleaved_evals)
            .map(|chunk| {
                let mut buff = Vec::with_capacity(chunk.compressed_size());
                chunk.serialize_compressed(&mut buff).unwrap();
                D::new_with_prefix(&buff).finalize()
            })
            .collect();

        let evals_merkle_tree = MerkleTree::new(hashed_evals).unwrap();
        channel.commit_fri_layer(evals_merkle_tree.root());

        let alpha = channel.draw_fri_alpha();
        evaluations = apply_drp(
            evaluations,
            self.options.domain_offset::<F>(),
            alpha,
            self.options.folding_factor,
        );

        self.layers.push(FriLayer {
            tree: evals_merkle_tree,
            evaluations: interleaved_evals.into_flattened(),
        });

        evaluations
    }
}

#[derive(Debug, Snafu)]
pub enum VerificationError {
    #[snafu(display("queries do not resolve to their commitment in layer {layer}"))]
    LayerCommitmentInvalid { layer: usize },
    #[snafu(display("degree respecting projection is invalid for layer {layer}"))]
    InvalidDegreeRespectingProjection { layer: usize },
    #[snafu(display("the number of query positions does not match the number of evaluations"))]
    NumPositionEvaluationMismatch,
    #[snafu(display("remainder does not resolve to its commitment"))]
    RemainderCommitmentInvalid,
    #[snafu(display("number of remainder values is less than the expected degree"))]
    RemainderTooSmall,
    #[snafu(display("remainder can not be represented as a degree {degree} polynomial"))]
    RemainderDegreeMismatch { degree: usize },
    #[snafu(display("degree-respecting projection is invalid at the last layer"))]
    InvalidRemainderDegreeRespectingProjection,
    #[snafu(display("{size} can't be divided by {folding_factor} (layer {layer})"))]
    CodewordTruncation {
        size: usize,
        folding_factor: usize,
        layer: usize,
    },
}

pub struct FriVerifier<F: GpuField + Field, D: Digest>
where
    F::FftField: FftField,
{
    options: FriOptions,
    layer_commitments: Vec<Output<D>>,
    layer_alphas: Vec<F>,
    proof: FriProof<F>,
    domain: Radix2EvaluationDomain<F::FftField>,
}

impl<F: GpuField + Field, D: Digest> FriVerifier<F, D>
where
    F: DomainCoeff<F::FftField>,
    F::FftField: FftField,
{
    pub fn new(
        public_coin: &mut PublicCoin<impl Digest>,
        options: FriOptions,
        proof: FriProof<F>,
        max_poly_degree: usize,
    ) -> Result<Self, VerificationError> {
        let folding_factor = options.folding_factor;
        let domain_offset = options.domain_offset::<F>();
        let domain_size = max_poly_degree.next_power_of_two() * options.blowup_factor;
        let domain = Radix2EvaluationDomain::new_coset(domain_size, domain_offset).unwrap();

        let mut layer_alphas = Vec::new();
        let mut layer_commitments = Vec::new();
        let mut layer_codeword_len = domain_size;
        for (i, layer) in proof.layers.iter().enumerate() {
            // TODO: batch merkle tree proofs
            // get the merkle root from the first merkle path
            let layer_commitment = Output::<D>::from_slice(&layer.commitment).clone();
            public_coin.reseed(&layer_commitment.deref());
            let alpha = public_coin.draw();
            layer_alphas.push(alpha);
            layer_commitments.push(layer_commitment);

            if i != proof.layers.len() - 1 && layer_codeword_len % folding_factor != 0 {
                return Err(VerificationError::CodewordTruncation {
                    size: layer_codeword_len,
                    folding_factor,
                    layer: i,
                });
            }

            layer_codeword_len /= folding_factor;
        }

        let remainder_root = Output::<D>::from_slice(&proof.remainder_commitment).clone();
        public_coin.reseed(&remainder_root.deref());
        let remainder_alpha = public_coin.draw();
        layer_alphas.push(remainder_alpha);
        layer_commitments.push(remainder_root);

        Ok(FriVerifier {
            options,
            domain,
            layer_commitments,
            layer_alphas,
            proof,
        })
    }

    pub fn verify_generic<const N: usize>(
        self,
        positions: &[usize],
        evaluations: &[F],
    ) -> Result<(), VerificationError> {
        let domain_offset = self.domain.coset_offset();
        let folding_domain = Radix2EvaluationDomain::new(N).unwrap();

        let mut layers = self.proof.layers.into_iter();
        let mut layer_alphas = self.layer_alphas.into_iter();
        let mut layer_commitments = self.layer_commitments.into_iter();
        let mut positions = positions.to_vec();
        let mut evaluations = evaluations.to_vec();
        let mut domain_size = self.domain.size();
        let mut domain_generator = self.domain.group_gen();

        // verify all layers
        for i in 0..self.options.num_layers(domain_size) {
            let folded_positions = fold_positions(&positions, domain_size / N);
            let layer_alpha = layer_alphas.next().unwrap();
            let layer_commitment = layer_commitments.next().unwrap();

            // TODO: change assert to error. Check remainder
            let layer = layers.next().unwrap();
            let (chunks, _) = &layer.values.as_chunks::<N>();
            assert_eq!(chunks.len(), folded_positions.len());

            // verify the layer values against the layer's commitment
            for (j, position) in folded_positions.iter().enumerate() {
                let proof = layer.proofs[j].parse::<D>();
                let expected_leaf = &proof[0];
                let chunk = chunks[j];
                let mut chunk_bytes = Vec::with_capacity(chunk.compressed_size());
                chunk.serialize_compressed(&mut chunk_bytes).unwrap();
                let actual_leaf = D::new_with_prefix(&chunk_bytes).finalize();

                if *expected_leaf != actual_leaf {
                    return Err(VerificationError::LayerCommitmentInvalid { layer: i });
                }

                MerkleTree::<D>::verify(&layer_commitment, &proof, *position)
                    .map_err(|_| VerificationError::LayerCommitmentInvalid { layer: i })?
            }

            let query_values = get_query_values(chunks, &positions, &folded_positions, domain_size);
            if evaluations != query_values {
                return Err(VerificationError::InvalidDegreeRespectingProjection { layer: i });
            }

            let polys = chunks
                .iter()
                .zip(&folded_positions)
                .map(|(chunk, position)| {
                    let offset = domain_offset * domain_generator.pow([*position as u64]);
                    let domain = folding_domain.get_coset(offset).unwrap();
                    DensePolynomial::from_coefficients_vec(domain.ifft(chunk))
                });

            // prepare for next layer
            evaluations = polys.map(|poly| poly.evaluate(&layer_alpha)).collect();
            positions = folded_positions;
            domain_generator = domain_generator.pow([N as u64]);
            domain_size /= N;
        }

        for (position, evaluation) in positions.into_iter().zip(evaluations) {
            if self.proof.remainder[position] != evaluation {
                return Err(VerificationError::InvalidRemainderDegreeRespectingProjection);
            }
        }

        verify_remainder::<F, D, N>(
            layer_commitments.next().unwrap(),
            self.proof.remainder,
            domain_size - 1,
        )
    }

    pub fn verify(self, positions: &[usize], evaluations: &[F]) -> Result<(), VerificationError> {
        if positions.len() != evaluations.len() {
            return Err(VerificationError::NumPositionEvaluationMismatch);
        }

        match self.options.folding_factor {
            2 => self.verify_generic::<2>(positions, evaluations),
            4 => self.verify_generic::<4>(positions, evaluations),
            8 => self.verify_generic::<8>(positions, evaluations),
            16 => self.verify_generic::<16>(positions, evaluations),
            // TODO: move this to options
            folding_factor => unreachable!("folding factor {folding_factor} not supported"),
        }
    }
}

fn verify_remainder<F: GpuField + Field, D: Digest, const N: usize>(
    commitment: Output<D>,
    mut remainder_evals: Vec<F>,
    max_degree: usize,
) -> Result<(), VerificationError>
where
    F: DomainCoeff<F::FftField>,
    F::FftField: FftField,
{
    if max_degree >= remainder_evals.len() {
        return Err(VerificationError::RemainderTooSmall);
    }

    let interleaved_evals: Vec<[F; N]> = interleave(&remainder_evals);
    let hashed_evals = interleaved_evals
        .into_iter()
        .map(|chunk| {
            let mut buff = Vec::with_capacity(chunk.compressed_size());
            chunk.serialize_compressed(&mut buff).unwrap();
            D::new_with_prefix(&buff).finalize()
        })
        .collect();
    let remainder_merkle_tree = MerkleTree::<D>::new(hashed_evals).unwrap();

    if commitment != *remainder_merkle_tree.root() {
        return Err(VerificationError::RemainderCommitmentInvalid);
    }

    if max_degree == 0 {
        if remainder_evals.array_windows().all(|[a, b]| a == b) {
            Ok(())
        } else {
            Err(VerificationError::RemainderDegreeMismatch { degree: max_degree })
        }
    } else {
        let domain = Radix2EvaluationDomain::new(remainder_evals.len()).unwrap();
        domain.ifft_in_place(&mut remainder_evals);
        let poly = DensePolynomial::from_coefficients_vec(remainder_evals);

        if poly.degree() > max_degree {
            Err(VerificationError::RemainderDegreeMismatch { degree: max_degree })
        } else {
            Ok(())
        }
    }
}

pub trait ProverChannel<F: GpuField> {
    type Digest: Digest;

    fn commit_fri_layer(&mut self, layer_root: &Output<Self::Digest>);

    fn draw_fri_alpha(&mut self) -> F;
}

/// Performs a degree respecting projection (drp) on polynomial evaluations.
// Example for `folding_factor = 2`:
// 1. interpolate evals over the evaluation domain to obtain f(x):
//    ┌─────────┬───┬───┬───┬───┬───┬───┬───┬───┐
//    │ i       │ 0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │
//    ├─────────┼───┼───┼───┼───┼───┼───┼───┼───┤
//    │ eval[i] │ 9 │ 2 │ 3 │ 5 │ 9 │ 2 │ 3 │ 5 │
//    └─────────┴───┴───┴───┴───┴───┴───┴───┴───┘
//    ┌──────┬───────┬───────┬───────┬───────┬───────┬───────┬───────┬───────┐
//    │ x    │ o*Ω^0 │ o*Ω^1 │ o*Ω^2 │ o*Ω^3 │ o*Ω^4 │ o*Ω^5 │ o*Ω^6 │ o*Ω^7 │
//    ├──────┼───────┼───────┼───────┼───────┼───────┼───────┼───────┼───────┤
//    │ f(x) │ 9     │ 2     │ 3     │ 5     │ 9     │ 2     │ 3     │ 5     │
//    └──────┴───────┴───────┴───────┴───────┴───────┴───────┴───────┴───────┘
//      f(x) = c0 * x^0 + c1 * x^1 + c2 * x^2 + c3 * x^3 +
//             c4 * x^4 + c5 * x^5 + c6 * x^6 + c7 * x^7
//
// 2. perform a random linear combination of odd and even coefficients of f(x):
//    f_e(x) = c0 + c2 * x + c4 * x^2 + c6 * x^3
//    f_o(x) = c1 + c3 * x + c5 * x^2 + c7 * x^3
//    f(x)   = f_e(x) + x * f_o(x)
//    f'(x)  = f_e(x) + α * f_o(x)
//    α      = <random field element sent from verifier>
//
// 4. obtain the DRP by evaluating f'(x) over a new domain of half the size:
//    ┌───────┬───────────┬───────────┬───────────┬───────────┐
//    │ x     │ (o*Ω^0)^2 │ (o*Ω^1)^2 │ (o*Ω^2)^2 │ (o*Ω^3)^2 │
//    ├───────┼───────────┼───────────┼───────────┼───────────┤
//    │ f'(x) │ 82        │ 12        │ 57        │ 34        │
//    └───────┴───────────┴───────────┴───────────┴───────────┘
//    ┌────────┬────┬────┬────┬────┐
//    │ i      │ 0  │ 1  │ 2  │ 3  │
//    ├────────┼────┼────┼────┼────┤
//    │ drp[i] │ 82 │ 12 │ 57 │ 34 │
//    └────────┴────┴────┴────┴────┘
pub fn apply_drp<F: GpuField + Field>(
    evals: GpuVec<F>,
    domain_offset: F::FftField,
    alpha: F,
    folding_factor: usize,
) -> GpuVec<F>
where
    F: DomainCoeff<F::FftField>,
    F::FftField: FftField,
{
    let n = evals.len();
    let domain = Radix2EvaluationDomain::new_coset(n, domain_offset).unwrap();
    let coeffs = ifft(evals, domain);

    let alpha_powers = (0..folding_factor)
        .map(|i| alpha.pow([i as u64]))
        .collect::<Vec<F>>();

    let drp_coeffs = ark_std::cfg_chunks!(coeffs, folding_factor)
        .map(|chunk| {
            chunk
                .iter()
                .zip(&alpha_powers)
                .map(|(v, alpha)| *v * alpha)
                .sum()
        })
        .collect::<Vec<F>>()
        .to_vec_in(PageAlignedAllocator);

    let drp_offset = domain_offset.pow([folding_factor as u64]);
    let drp_domain = Radix2EvaluationDomain::new_coset(n / folding_factor, drp_offset).unwrap();

    // return the drp evals
    fft(drp_coeffs, drp_domain)
}

fn ifft<F: GpuField + Field>(
    evals: GpuVec<F>,
    domain: Radix2EvaluationDomain<F::FftField>,
) -> GpuVec<F>
where
    F: DomainCoeff<F::FftField>,
    F::FftField: FftField,
{
    #[cfg(feature = "gpu")]
    if domain.size() >= GpuFft::<F>::MIN_SIZE {
        let mut coeffs = evals;
        let mut ifft = GpuIfft::from(domain);
        ifft.encode(&mut coeffs);
        ifft.execute();
        return coeffs;
    }

    let coeffs = domain.ifft(&evals);
    coeffs.to_vec_in(PageAlignedAllocator)
}

fn fft<F: GpuField + Field>(
    coeffs: GpuVec<F>,
    domain: Radix2EvaluationDomain<F::FftField>,
) -> GpuVec<F>
where
    F: DomainCoeff<F::FftField>,
    F::FftField: FftField,
{
    #[cfg(feature = "gpu")]
    if domain.size() >= GpuFft::<F>::MIN_SIZE {
        let mut evals = coeffs;
        let mut fft = GpuFft::from(domain);
        fft.encode(&mut evals);
        fft.execute();
        return evals;
    }

    let evals = domain.fft(&coeffs);
    evals.to_vec_in(PageAlignedAllocator)
}

fn fold_positions(positions: &[usize], max: usize) -> Vec<usize> {
    let mut res = positions
        .iter()
        .map(|pos| pos % max)
        .collect::<Vec<usize>>();
    res.sort();
    res.dedup();
    res
}

// from winterfell
fn get_query_values<F: Field, const N: usize>(
    chunks: &[[F; N]],
    positions: &[usize],
    folded_positions: &[usize],
    domain_size: usize,
) -> Vec<F> {
    let stride_len = domain_size / N;
    positions
        .iter()
        .map(|position| {
            let i = folded_positions
                .iter()
                .position(|&v| v == position % stride_len)
                .unwrap();
            chunks[i][position / stride_len]
        })
        .collect()
}

fn query_layer<F: GpuField + Field, D: Digest, const N: usize>(
    layer: &FriLayer<F, D>,
    positions: &[usize],
) -> FriProofLayer<F>
where
    F::FftField: FftField,
{
    let proofs = positions
        .iter()
        .map(|pos| {
            layer
                .tree
                .prove(*pos)
                .expect("failed to generate Merkle proof")
        })
        .collect::<Vec<MerkleProof>>();
    let mut values: Vec<[F; N]> = Vec::new();
    for &position in positions {
        let i = position * N;
        let chunk = &layer.evaluations[i..i + N];
        values.push(chunk.try_into().unwrap());
    }
    FriProofLayer::new(values, proofs, layer.tree.root().to_vec())
}
