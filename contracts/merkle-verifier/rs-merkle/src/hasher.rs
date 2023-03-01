use crate::prelude::*;
use core::convert::TryFrom;
use core::mem;

/// Hasher is a trait used to provide a hashing algorithm for the library.
///
/// # Example
///
/// This example shows how to implement the sha256 algorithm
///
/// ```
/// use rs_merkle::{Hasher};
/// use sha2::{Sha256, Digest, digest::FixedOutput};
///
/// #[derive(Clone)]
/// pub struct Sha256Algorithm {}
///
/// impl Hasher for Sha256Algorithm {
///     type Hash = [u8; 32];
///
///     fn hash(data: &[u8]) -> [u8; 32] {
///         let mut hasher = Sha256::new();
///
///         hasher.update(data);
///         <[u8; 32]>::from(hasher.finalize_fixed())
///     }
/// }
/// ```
pub trait Hasher: Clone {
    /// This type is used as a hash type in the library.
    /// It is recommended to use fixed size u8 array as a hash type. For example,
    /// for sha256 the type would be `[u8; 32]`, representing 32 bytes,
    /// which is the size of the sha256 digest. Also, fixed sized arrays of `u8`
    /// by default satisfy all trait bounds required by this type.
    ///
    /// # Trait bounds
    /// `Copy` is required as the hash needs to be copied to be concatenated/propagated
    /// when constructing nodes.
    /// `PartialEq` is required to compare equality when verifying proof
    /// `Into<Vec<u8>>` is required to be able to serialize proof
    /// `TryFrom<Vec<u8>>` is required to parse hashes from a serialized proof
    type Hash: Copy + PartialEq + Into<Vec<u8>> + TryFrom<Vec<u8>>;

    /// This associated function takes a slice of bytes and returns a hash of it.
    /// Used by `concat_and_hash` function to build a tree from concatenated hashes
    fn hash(data: &[u8]) -> Self::Hash;

    /// Used by [`MerkleTree`] and [`PartialTree`] when calculating the root.
    /// The provided default implementation propagates the left node if it doesn't
    /// have a sibling. The left node should always be present. The right node is optional.
    ///
    /// For the tree to be compatible with different types of proofs this function
    /// needs to be overridden. For example, in Bitcoin implementation,
    /// if the left node doesn't have a sibling it is concatenated to itself and
    /// then hashed instead of just being propagated to the next level.
    ///
    /// [`MerkleTree`]: crate::MerkleTree
    /// [`PartialTree`]: crate::PartialTree
    fn concat_and_hash(left: &Self::Hash, right: Option<&Self::Hash>) -> Self::Hash {
        let mut concatenated: Vec<u8> = (*left).into();

        match right {
            Some(right_node) => {
                let mut right_node_clone: Vec<u8> = (*right_node).into();
                concatenated.append(&mut right_node_clone);
                Self::hash(&concatenated)
            }
            None => *left,
        }
    }

    /// Returns the byte size of `Self::Hash`. Default implementation returns
    /// `mem::size_of::<Self::Hash>()`. Usually doesn't need to be overridden.
    /// Used internally by `MerkleProof` to parse hashes from a serialized proof.
    fn hash_size() -> usize {
        mem::size_of::<Self::Hash>()
    }
}
