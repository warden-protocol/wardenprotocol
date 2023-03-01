//! This module contains built-in implementations of the [`MerkleProofSerializer`] trait.
//! Serializers are used in [`MerkleProof::serialize`] and [`MerkleProof::deserialize`]
//!
//! [`MerkleProofSerializer`]: crate::MerkleProofSerializer
//! [`MerkleProof::serialize`]: crate::MerkleProof::serialize
//! [`MerkleProof::deserialize`]: crate::MerkleProof::deserialize

mod direct_hashes_order;
mod merkle_proof_serializer;
mod reverse_hashes_order;
mod bitcoin;

pub use direct_hashes_order::DirectHashesOrder;
pub use merkle_proof_serializer::MerkleProofSerializer;
pub use reverse_hashes_order::ReverseHashesOrder;
pub use bitcoin::BitcoinProofSerializer;
