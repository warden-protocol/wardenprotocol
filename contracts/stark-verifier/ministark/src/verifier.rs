use crate::challenges::Challenges;
use crate::composer::DeepCompositionCoeffs;
use crate::constraints::FieldConstant;
use crate::fri;
use crate::fri::FriVerifier;
use crate::hints::Hints;
use crate::merkle::MerkleProof;
use crate::merkle::MerkleTree;
use crate::merkle::MerkleTreeError;
use crate::random::PublicCoin;
use crate::Air;
// use crate::channel::VerifierChannel;
use crate::Proof;
use alloc::collections::BTreeMap;
use alloc::vec::Vec;
use ark_ff::Field;
use ark_ff::One;
use ark_ff::Zero;
use ark_poly::EvaluationDomain;
use ark_serialize::CanonicalSerialize;
use core::ops::Deref;
use digest::Digest;
use digest::Output;
use rand::Rng;
use sha2::Sha256;
use snafu::Snafu;

/// Errors that are returned during verification of a STARK proof
#[derive(Debug, Snafu)]
pub enum VerificationError {
    #[snafu(display("constraint evaluations at the out-of-domain point are inconsistent"))]
    InconsistentOodConstraintEvaluations,
    #[snafu(context(false))]
    #[snafu(display("fri verification failed: {source}"))]
    FriVerification { source: fri::VerificationError },
    #[snafu(display("query does not resolve to the base trace commitment"))]
    BaseTraceQueryDoesNotMatchCommitment,
    #[snafu(display("query does not resolve to the extension trace commitment"))]
    ExtensionTraceQueryDoesNotMatchCommitment,
    #[snafu(display("query does not resolve to the composition trace commitment"))]
    CompositionTraceQueryDoesNotMatchCommitment,
    #[snafu(display("insufficient proof of work on fri commitments"))]
    FriProofOfWork,
}

impl<A: Air> Proof<A> {
    pub fn verify(self) -> Result<(), VerificationError> {
        use VerificationError::*;

        let Proof {
            base_trace_commitment,
            extension_trace_commitment,
            composition_trace_commitment,
            execution_trace_ood_evals,
            composition_trace_ood_evals,
            trace_queries,
            trace_info,
            public_inputs,
            options,
            fri_proof,
            pow_nonce,
            ..
        } = self;

        let mut seed = Vec::new();
        public_inputs.serialize_compressed(&mut seed).unwrap();
        trace_info.serialize_compressed(&mut seed).unwrap();
        options.serialize_compressed(&mut seed).unwrap();
        let mut public_coin = PublicCoin::<Sha256>::new(&seed);

        let air = A::new(trace_info, public_inputs, options);

        let base_trace_comitment = Output::<Sha256>::from_iter(base_trace_commitment);
        public_coin.reseed(&base_trace_comitment.deref());
        let challenges = air.get_challenges(&mut public_coin);
        let hints = air.get_hints(&challenges);

        let extension_trace_commitment =
            extension_trace_commitment.map(|extension_trace_commitment| {
                let extension_trace_commitment =
                    Output::<Sha256>::from_iter(extension_trace_commitment);
                public_coin.reseed(&extension_trace_commitment.deref());
                extension_trace_commitment
            });

        let composition_coeffs = air.get_constraint_composition_coeffs(&mut public_coin);
        let composition_trace_commitment =
            Output::<Sha256>::from_iter(composition_trace_commitment);
        public_coin.reseed(&composition_trace_commitment.deref());

        let z = public_coin.draw::<A::Fq>();
        public_coin.reseed(&execution_trace_ood_evals);
        // execution trace ood evaluation map
        let trace_ood_eval_map = air
            .trace_arguments()
            .into_iter()
            .zip(execution_trace_ood_evals.iter().copied())
            .collect::<BTreeMap<(usize, isize), A::Fq>>();
        let calculated_ood_constraint_evaluation = ood_constraint_evaluation(
            &composition_coeffs,
            &challenges,
            &hints,
            &trace_ood_eval_map,
            &air,
            z,
        );

        public_coin.reseed(&composition_trace_ood_evals);
        let mut acc = A::Fq::one();
        let provided_ood_constraint_evaluation =
            composition_trace_ood_evals
                .iter()
                .fold(A::Fq::zero(), |mut res, value| {
                    res += *value * acc;
                    acc *= z;
                    res
                });

        if calculated_ood_constraint_evaluation != provided_ood_constraint_evaluation {
            return Err(InconsistentOodConstraintEvaluations);
        }

        let deep_coeffs = air.get_deep_composition_coeffs(&mut public_coin);
        let fri_verifier = FriVerifier::<A::Fq, Sha256>::new(
            &mut public_coin,
            options.into_fri_options(),
            fri_proof,
            air.trace_len() - 1,
        )?;

        if options.grinding_factor != 0 {
            public_coin.reseed(&pow_nonce);
            if public_coin.seed_leading_zeros() < options.grinding_factor as u32 {
                return Err(FriProofOfWork);
            }
        }

        let mut rng = public_coin.draw_rng();
        let lde_domain_size = air.trace_len() * air.lde_blowup_factor();
        let query_positions = (0..options.num_queries)
            .map(|_| rng.gen_range(0..lde_domain_size))
            .collect::<Vec<usize>>();

        let base_trace_rows = trace_queries
            .base_trace_values
            .chunks(air.trace_info().num_base_columns)
            .collect::<Vec<&[A::Fp]>>();
        let extension_trace_rows = if air.trace_info().num_extension_columns > 0 {
            trace_queries
                .extension_trace_values
                .chunks(air.trace_info().num_extension_columns)
                .collect::<Vec<&[A::Fq]>>()
        } else {
            Vec::new()
        };

        let composition_trace_rows = trace_queries
            .composition_trace_values
            .chunks(air.ce_blowup_factor())
            .collect::<Vec<&[A::Fq]>>();

        // base trace positions
        verify_positions::<Sha256>(
            base_trace_comitment,
            &query_positions,
            &base_trace_rows,
            trace_queries.base_trace_proofs,
        )
        .map_err(|_| BaseTraceQueryDoesNotMatchCommitment)?;

        if let Some(extension_trace_commitment) = extension_trace_commitment {
            // extension trace positions
            verify_positions::<Sha256>(
                extension_trace_commitment,
                &query_positions,
                &extension_trace_rows,
                trace_queries.extension_trace_proofs,
            )
            .map_err(|_| ExtensionTraceQueryDoesNotMatchCommitment)?;
        }

        // composition trace positions
        verify_positions::<Sha256>(
            composition_trace_commitment,
            &query_positions,
            &composition_trace_rows,
            trace_queries.composition_trace_proofs,
        )
        .map_err(|_| CompositionTraceQueryDoesNotMatchCommitment)?;

        let deep_evaluations = deep_composition_evaluations(
            &air,
            &query_positions,
            deep_coeffs,
            base_trace_rows,
            extension_trace_rows,
            composition_trace_rows,
            z,
            trace_ood_eval_map,
            composition_trace_ood_evals,
        );

        Ok(fri_verifier.verify(&query_positions, &deep_evaluations)?)
    }
}

fn ood_constraint_evaluation<A: Air>(
    composition_coefficients: &[(A::Fq, A::Fq)],
    challenges: &Challenges<A::Fq>,
    hints: &Hints<A::Fq>,
    trace_ood_eval_map: &BTreeMap<(usize, isize), A::Fq>,
    air: &A,
    x: A::Fq,
) -> A::Fq {
    let mut result = A::Fq::zero();
    let trace_degree = air.trace_len() - 1;
    let composition_degree = air.composition_degree();

    for (i, constraint) in air.constraints().iter().enumerate() {
        let (numerator_degree, denominator_degree) = constraint.degree(trace_degree);
        let evaluation_degree = numerator_degree - denominator_degree;
        assert!(evaluation_degree <= composition_degree);
        let degree_adjustment = (composition_degree - evaluation_degree) as u64;

        let eval_result = constraint.eval(
            &FieldConstant::Fq(x),
            &|i| FieldConstant::Fq(hints[i]),
            &|i| FieldConstant::Fq(challenges[i]),
            &|i, j| FieldConstant::Fq(*trace_ood_eval_map.get(&(i, j)).unwrap()),
        );

        let eval_result = match eval_result {
            FieldConstant::Fq(v) => v,
            FieldConstant::Fp(_) => unreachable!(),
        };

        // TODO docs
        // TODO: proper errors
        // TODO: don't allow degree 0 constraints
        let (alpha, beta) = composition_coefficients[i];
        result += eval_result * (alpha * x.pow([degree_adjustment]) + beta)
    }

    result
}

fn verify_positions<D: Digest>(
    commitment: Output<D>,
    positions: &[usize],
    rows: &[&[impl CanonicalSerialize]],
    proofs: Vec<MerkleProof>,
) -> Result<(), MerkleTreeError> {
    for ((position, proof), row) in positions.iter().zip(proofs).zip(rows) {
        let proof = proof.parse::<D>();
        let expected_leaf = &proof[0];
        let mut row_bytes = Vec::with_capacity(row.compressed_size());
        row.serialize_compressed(&mut row_bytes).unwrap();
        let actual_leaf = D::new_with_prefix(&row_bytes).finalize();

        if *expected_leaf != actual_leaf {
            return Err(MerkleTreeError::InvalidProof);
        }

        MerkleTree::<D>::verify(&commitment, &proof, *position)?;
    }

    Ok(())
}

#[allow(clippy::too_many_arguments)]
fn deep_composition_evaluations<A: Air>(
    air: &A,
    query_positions: &[usize],
    composition_coeffs: DeepCompositionCoeffs<A::Fq>,
    base_trace_rows: Vec<&[A::Fp]>,
    extension_trace_rows: Vec<&[A::Fq]>,
    composition_trace_rows: Vec<&[A::Fq]>,
    z: A::Fq,
    execution_trace_ood_evals_map: BTreeMap<(usize, isize), A::Fq>,
    composition_trace_ood_evals: Vec<A::Fq>,
) -> Vec<A::Fq> {
    let trace_domain = air.trace_domain();
    let g = trace_domain.group_gen();
    let g_inv = trace_domain.group_gen_inv();
    let lde_domain = air.lde_domain();
    let xs = query_positions
        .iter()
        .map(|pos| lde_domain.element(*pos))
        .collect::<Vec<A::Fp>>();

    let mut evals = vec![A::Fq::zero(); query_positions.len()];

    // add execution trace
    let trace_info = air.trace_info();
    let base_columns_range = trace_info.base_columns_range();
    let extension_columns_range = trace_info.extension_columns_range();
    for (i, (&x, eval)) in xs.iter().zip(&mut evals).enumerate() {
        for (j, ((column, offset), ood_eval)) in execution_trace_ood_evals_map.iter().enumerate() {
            let trace_value = if base_columns_range.contains(column) {
                A::Fq::from(base_trace_rows[i][*column])
            } else if extension_columns_range.contains(column) {
                extension_trace_rows[i][column - trace_info.num_base_columns]
            } else {
                panic!("column {column} does not exist");
            };

            let alpha = composition_coeffs.execution_trace[j];
            let shift = if offset.is_positive() { g } else { g_inv }.pow([offset.abs() as u64]);
            *eval += alpha * (trace_value - ood_eval) / (A::Fq::from(x) - z * shift);
        }
    }

    // add composition trace
    let z_n = z.pow([air.ce_blowup_factor() as u64]);
    for ((&x, row), eval) in xs.iter().zip(composition_trace_rows).zip(&mut evals) {
        for (i, value) in row.iter().enumerate() {
            let alpha = composition_coeffs.composition_trace[i];
            let ood_eval = composition_trace_ood_evals[i];
            *eval += alpha * (*value - ood_eval) / (A::Fq::from(x) - z_n);
        }
    }

    // adjust degree
    let (alpha, beta) = composition_coeffs.degree;
    for (x, eval) in xs.iter().zip(&mut evals) {
        *eval *= alpha + beta * x;
    }

    evals
}
