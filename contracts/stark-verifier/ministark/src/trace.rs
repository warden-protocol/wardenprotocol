use crate::challenges::Challenges;
use crate::merkle::MerkleProof;
use crate::merkle::MerkleTree;
use crate::Air;
use crate::Matrix;
use alloc::vec::Vec;
use ark_ff::Field;
use ark_ff::PrimeField;
use ark_poly::EvaluationDomain;
use ark_serialize::CanonicalDeserialize;
use ark_serialize::CanonicalSerialize;
use core::ops::Range;
use digest::Digest;

#[derive(CanonicalSerialize, CanonicalDeserialize, Clone)]
pub struct Queries<A: Air> {
    pub base_trace_values: Vec<A::Fp>,
    pub extension_trace_values: Vec<A::Fq>,
    pub composition_trace_values: Vec<A::Fq>,
    pub base_trace_proofs: Vec<MerkleProof>,
    pub extension_trace_proofs: Vec<MerkleProof>,
    pub composition_trace_proofs: Vec<MerkleProof>,
}

impl<A: Air> Queries<A> {
    #[allow(clippy::too_many_arguments)]
    pub fn new<D: Digest>(
        air: &A,
        base_trace_polys: &Matrix<A::Fp>,
        extension_trace_polys: Option<&Matrix<A::Fq>>,
        composition_trace_lde: &Matrix<A::Fq>,
        base_commitment: MerkleTree<D>,
        extension_commitment: Option<MerkleTree<D>>,
        composition_commitment: MerkleTree<D>,
        positions: &[usize],
    ) -> Self {
        let lde_xs = air.lde_domain();
        let mut base_trace_values = Vec::new();
        let mut extension_trace_values = Vec::new();
        let mut composition_trace_values = Vec::new();
        let mut base_trace_proofs = Vec::new();
        let mut extension_trace_proofs = Vec::new();
        let mut composition_trace_proofs = Vec::new();
        for &position in positions {
            // execution trace
            let lde_x = lde_xs.element(position);
            let base_trace_row = base_trace_polys.evaluate_at(lde_x);
            base_trace_values.extend(base_trace_row);
            let base_proof = base_commitment.prove(position).unwrap();
            base_trace_proofs.push(base_proof);

            if let Some(extension_trace_polys) = extension_trace_polys {
                // TODO: suport ark DomainCoeff on evaluate_at
                let extension_trace_row = extension_trace_polys.evaluate_at(A::Fq::from(lde_x));
                extension_trace_values.extend(extension_trace_row);
                let extension_proof = extension_commitment
                    .as_ref()
                    .unwrap()
                    .prove(position)
                    .unwrap();
                extension_trace_proofs.push(extension_proof);
            }

            // composition trace
            let composition_trace_row = composition_trace_lde.get_row(position).unwrap();
            composition_trace_values.extend(composition_trace_row);
            let composition_proof = composition_commitment.prove(position).unwrap();
            composition_trace_proofs.push(composition_proof);
        }
        Queries {
            base_trace_values,
            extension_trace_values,
            composition_trace_values,
            base_trace_proofs,
            extension_trace_proofs,
            composition_trace_proofs,
        }
    }
}

/// Public metadata about a trace.
#[derive(Debug, Clone, CanonicalSerialize, CanonicalDeserialize)]
pub struct TraceInfo {
    pub num_base_columns: usize,
    pub num_extension_columns: usize,
    pub trace_len: usize,
    // TODO: want to change this to auxiliary data
    pub meta: Vec<u8>,
}

impl TraceInfo {
    /// Smallest execution trace length
    /// TODO: justify
    pub const MIN_TRACE_LENGTH: usize = 2048;
    /// Maximum number of columns (base + extension) in an execution trace
    pub const MAX_TRACE_WIDTH: usize = 255;
    /// Maximum number of bytes in trace metadata; currently set at 64KiB.
    pub const MAX_META_BYTES: usize = 65535;

    pub fn new(
        num_base_columns: usize,
        num_extension_columns: usize,
        trace_len: usize,
        meta: Option<Vec<u8>>,
    ) -> Self {
        let num_total_cols = num_base_columns + num_extension_columns;
        let meta = meta.unwrap_or_default();
        assert!(num_base_columns > 0, "not enough base columns");
        assert!(num_total_cols <= Self::MAX_TRACE_WIDTH, "too many columns");
        assert!(meta.len() <= Self::MAX_META_BYTES, "too much meta data");
        assert!(trace_len >= Self::MIN_TRACE_LENGTH, "trace too small");
        TraceInfo {
            num_base_columns,
            num_extension_columns,
            trace_len,
            meta,
        }
    }

    pub fn base_columns_range(&self) -> Range<usize> {
        0..self.num_base_columns
    }

    pub fn extension_columns_range(&self) -> Range<usize> {
        self.num_base_columns..self.num_base_columns + self.num_extension_columns
    }
}

// TODO: docs: An execution trace of a computation, or the trace in short, is a
// sequence of machine states, one per clock cycle source: https://medium.com/starkware/starkdex-deep-dive-the-stark-core-engine-497942d0f0ab
pub trait Trace {
    const NUM_BASE_COLUMNS: usize;
    const NUM_EXTENSION_COLUMNS: usize = 0;

    type Fp: PrimeField;
    type Fq: Field<BasePrimeField = Self::Fp>;

    /// Returns the number of rows in this trace.
    fn len(&self) -> usize {
        self.base_columns().num_rows()
    }

    /// Returns a reference to the base trace columns.
    fn base_columns(&self) -> &Matrix<Self::Fp>;

    /// Builds and returns the extension columns
    /// These columns require auxiliary random elements to be constructed.
    /// Returns None if there are no columns that require this.
    fn build_extension_columns(
        &self,
        _challenges: &Challenges<Self::Fq>,
    ) -> Option<Matrix<Self::Fq>> {
        None
    }

    /// Returns trace info for this trace.
    fn info(&self) -> TraceInfo {
        TraceInfo::new(
            Self::NUM_BASE_COLUMNS,
            Self::NUM_EXTENSION_COLUMNS,
            self.len(),
            self.meta().map(|meta| meta.to_vec()),
        )
    }

    /// Returns metadata associated with this trace.
    fn meta(&self) -> Option<&[u8]> {
        None
    }

    fn is_empty(&self) -> bool {
        self.len() == 0
    }
}
