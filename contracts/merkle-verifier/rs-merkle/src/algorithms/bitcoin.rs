use crate::Hasher;
use alloc::vec::Vec;
use sha2::{digest::FixedOutput, Digest, Sha256};
use std::println;

/// Implementation of the [`Hasher`] trait for Bitcoin trees and proofs.
///
/// # Examples
///
/// ```
/// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Bitcoin, Hasher, Error, utils};
/// # use std::convert::TryFrom;
/// #
/// # fn main() -> Result<(), Box<dyn std::error::Error>> {
///  use rs_merkle::proof_serializers::BitcoinProofSerializer;
/// let tree = MerkleTree::<Bitcoin>::new();
///  let other_tree: MerkleTree<Bitcoin> = MerkleTree::new();
///
/// let proof_bytes: Vec<u8> = vec![
///     46, 125, 44, 3, 169, 80, 122, 226, 101, 236, 245, 181, 53, 104, 133, 165, 51, 147, 162,
///     2, 157, 36, 19, 148, 153, 114, 101, 161, 162, 90, 239, 198, 37, 47, 16, 200, 54, 16,
///     235, 202, 26, 5, 156, 11, 174, 130, 85, 235, 162, 249, 91, 228, 209, 215, 188, 250,
///     137, 215, 36, 138, 130, 217, 241, 17, 229, 160, 31, 238, 20, 224, 237, 92, 72, 113, 79,
///     34, 24, 15, 37, 173, 131, 101, 181, 63, 151, 121, 247, 157, 196, 163, 215, 233, 57, 99,
///     249, 74,
/// ];
///
/// let proof: MerkleProof<Bitcoin> = MerkleProof::deserialize::<BitcoinProofSerializer>(&proof_bytes)?;
/// # Ok(())
/// # }
/// ```
///
/// [`Hasher`]: crate::Hasher
#[derive(Clone, Debug)]
pub struct BitcoinHasher {}

impl Hasher for BitcoinHasher {
    type Hash = [u8; 32];

    fn hash(data: &[u8]) -> [u8; 32] {
        let mut hasher1 = Sha256::new();
        let mut hasher2 = Sha256::new();

        hasher1.update(data);
        hasher2.update(hasher1.finalize_fixed());

        hasher2.finalize_fixed().into()
    }

    fn concat_and_hash(left: &Self::Hash, right: Option<&Self::Hash>) -> Self::Hash {
        // println!(
        //     "{:?} {:?}\n",
        //     hex::encode(left),
        //     hex::encode(right.unwrap_or(left))
        // );
        let mut concatenated: Vec<u8> = (*left).into();

        match right {
            Some(right_node) => {
                let mut right_node_clone: Vec<u8> = (*right_node).into();
                concatenated.append(&mut right_node_clone);
                Self::hash(&concatenated)
            }
            None => {
                // *left
                concatenated.append(&mut (*left).into());
                Self::hash(&concatenated)
            }
        }
    }
}
