//! `rs-merkle` is the most advanced Merkle tree library for Rust. Basic features
//! include building a Merkle tree, creation, and verification of Merkle proofs for
//! single and multiple elements, i.e. multi-proofs. Advanced features include making
//! transactional changes to the tree and rolling back to any previously committed
//! tree state, similarly to Git.
//!
//! The library has two main structs. The first one is [`MerkleTree`],
//! which builds the tree that can be used to verify data integrity and produce a Merkle proof. The
//! second is [`MerkleProof`], which can be used to verify the inclusion of an item in a set.
//!
//! The library is highly customizable. Hashing algorithm and the way how the tree is built
//! can be configured through the [`Hasher`] trait.
//!
//! ## About Merkle trees
//!
//! Merkle trees, also known as hash trees, are used to verify that two or more
//! parties have the same data without exchanging the entire data collection.
//!
//! Merkle trees are used in Git, Mercurial, ZFS, IPFS, Bitcoin, Ethereum, Cassandra,
//! and many more. In Git, for example, Merkle trees are used to find a delta
//! between the local and remote repository states to transfer only the difference
//! between them over the network. In Bitcoin, Merkle trees are used to verify that
//! a transaction was included in the block without downloading the whole block
//! contents. ZFS uses Merkle trees to quickly verify data integrity, offering
//! protection from silent data corruption caused by phantom writes, bugs in disk
//! firmware, power surges, and other causes.
//!
//! ## Examples
//!
//! Basic usage for verifying Merkle proofs:
//!
//! ```
//! # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
//! # use std::convert::TryFrom;
//! #
//! # fn main() -> Result<(), Box<dyn std::error::Error>> {
//! let leaf_values = ["a", "b", "c", "d", "e", "f"];
//! let leaves: Vec<[u8; 32]> = leaf_values
//!     .iter()
//!     .map(|x| Sha256::hash(x.as_bytes()))
//!     .collect();
//!
//! let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);
//! let indices_to_prove = vec![3, 4];
//! let leaves_to_prove = leaves.get(3..5).ok_or("can't get leaves to prove")?;
//! let merkle_proof = merkle_tree.proof(&indices_to_prove);
//! let merkle_root = merkle_tree.root().ok_or("couldn't get the merkle root")?;
//! // Serialize proof to pass it to the client
//! let proof_bytes = merkle_proof.to_bytes();
//!
//! // Parse proof back on the client
//! let proof = MerkleProof::<Sha256>::try_from(proof_bytes)?;
//!
//! assert!(proof.verify(merkle_root, &indices_to_prove, leaves_to_prove, leaves.len()));
//! # Ok(())
//! # }
//! ```
//!
//! Advanced usage with rolling several commits back:
//!
//! ```
//! # use rs_merkle::{MerkleTree, algorithms::Sha256, Hasher, Error};
//! #
//! # fn main() -> Result<(), Box<dyn std::error::Error>> {
//! let elements = ["a", "b", "c", "d", "e", "f"];
//! let mut leaves: Vec<[u8; 32]> = elements
//!     .iter()
//!     .map(|x| Sha256::hash(x.as_bytes()))
//!     .collect();
//!
//! let mut merkle_tree: MerkleTree<Sha256> = MerkleTree::new();
//!
//! // Appending leaves to the tree without committing
//! merkle_tree.append(&mut leaves);
//!
//! // Without committing changes we can get the root for the uncommitted data, but committed
//! // tree still doesn't have any elements
//! assert_eq!(merkle_tree.root(), None);
//! assert_eq!(
//!     merkle_tree.uncommitted_root_hex(),
//!     Some("1f7379539707bcaea00564168d1d4d626b09b73f8a2a365234c62d763f854da2".to_string())
//! );
//!
//! // Committing the changes
//! merkle_tree.commit();
//!
//! // Changes applied to the tree after the commit, and there's no uncommitted changes anymore
//! assert_eq!(
//!     merkle_tree.root_hex(),
//!     Some("1f7379539707bcaea00564168d1d4d626b09b73f8a2a365234c62d763f854da2".to_string())
//! );
//! assert_eq!(merkle_tree.uncommitted_root_hex(), None);
//!
//! // Adding a new leaf
//! merkle_tree.insert(Sha256::hash("g".as_bytes())).commit();
//!
//! // Root was updated after insertion
//! assert_eq!(
//!     merkle_tree.root_hex(),
//!     Some("e2a80e0e872a6c6eaed37b4c1f220e1935004805585b5f99617e48e9c8fe4034".to_string())
//! );
//!
//! // Adding some more leaves
//! merkle_tree.append(vec![
//!     Sha256::hash("h".as_bytes()),
//!     Sha256::hash("k".as_bytes()),
//! ].as_mut()).commit();
//! assert_eq!(
//!     merkle_tree.root_hex(),
//!     Some("09b6890b23e32e607f0e5f670ab224e36af8f6599cbe88b468f4b0f761802dd6".to_string())
//! );
//!
//! // Rolling back to the previous state
//! merkle_tree.rollback();
//! assert_eq!(
//!     merkle_tree.root_hex(),
//!     Some("e2a80e0e872a6c6eaed37b4c1f220e1935004805585b5f99617e48e9c8fe4034".to_string())
//! );
//!
//! // We can rollback multiple times as well
//! merkle_tree.rollback();
//! assert_eq!(
//!     merkle_tree.root_hex(),
//!     Some("1f7379539707bcaea00564168d1d4d626b09b73f8a2a365234c62d763f854da2".to_string())
//! );
//! # Ok(())
//! # }
//! ```
#![no_std]

extern crate alloc;

#[cfg(feature = "std")]
extern crate std;

pub use error::Error;
pub use error::ErrorKind;
pub use hasher::Hasher;
pub use merkle_proof::MerkleProof;
pub use merkle_tree::MerkleTree;
pub use partial_tree::PartialTree;
pub use proof_serializers::MerkleProofSerializer;

mod error;
mod hasher;
mod merkle_proof;
mod merkle_tree;
mod partial_tree;
mod prelude;
#[doc(hidden)]
pub mod utils;

pub mod algorithms;
pub mod proof_serializers;
