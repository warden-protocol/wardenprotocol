use crate::{prelude::*, Error, Hasher, MerkleProof};

/// Trait representing a Merkle proof serializer. Used in [`MerkleProof::serialize`] and
/// [`MerkleProof::deserialize`].
///
/// The library provides some built-in implementations of this trait - check
/// [`proof_serializers`] module.
///
/// [`proof_serializers`]: crate::proof_serializers
pub trait MerkleProofSerializer {
    /// Serialize data from [`MerkleProof`] into a binary
    fn serialize<T: Hasher>(proof: &MerkleProof<T>) -> Vec<u8>;

    /// Deserialize data produced by [`MerkleProofSerializer::serialize`] back into [`MerkleProof`]
    fn deserialize<T: Hasher>(bytes: &[u8]) -> Result<MerkleProof<T>, Error>;
}
