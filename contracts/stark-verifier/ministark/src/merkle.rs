//! Use arkwork_rs or re make this. Just used for personal education.
use alloc::vec::Vec;
use ark_serialize::CanonicalDeserialize;
use ark_serialize::CanonicalSerialize;
use digest::Digest;
use digest::Output;
use snafu::Snafu;

/// MerkleTree tree error
#[derive(Debug, Snafu)]
pub enum MerkleTreeError {
    #[snafu(display("tree must contain `{expected}` leaves, but `{actual}` were provided"))]
    TooFewLeaves { expected: usize, actual: usize },
    #[snafu(display("number of leaves must be a power of two, but `{n}` were provided"))]
    NumberOfLeavesNotPowerOfTwo { n: usize },
    #[snafu(display("leaf index `{i}` cannot exceed the number of leaves (`{n}`)"))]
    LeafIndexOutOfBounds { i: usize, n: usize },
    #[snafu(display("proof is invalid"))]
    InvalidProof,
}

#[derive(CanonicalSerialize, CanonicalDeserialize, Clone)]
pub struct MerkleProof(Vec<u8>);

impl MerkleProof {
    pub fn new<D: Digest>(merkle_path: Vec<Output<D>>) -> Self {
        MerkleProof(merkle_path.into_iter().flatten().collect())
    }

    pub fn parse<D: Digest>(&self) -> Vec<Output<D>> {
        // TODO: would be great if this whole thing could be better.
        let chunk_size = <D as digest::OutputSizeUser>::output_size();
        let chunks = self.0.chunks(chunk_size);
        chunks
            .map(|chunk| Output::<D>::from_slice(chunk).clone())
            .collect()
    }
}

/// Merkle tree implemented as a full power-of-two arity tree.
///
/// ```text
///       #        <- root node
///     /   \
///   #       #    <- nodes
///  / \     / \
/// #   #   #   #  <- leaf nodes
/// |   |   |   |
/// +   +   +   +  <- leaf values
/// ```
pub struct MerkleTree<D: Digest> {
    nodes: Vec<Output<D>>,
    leaf_nodes: Vec<Output<D>>,
}

impl<D: Digest> MerkleTree<D> {
    // TODO: why not just commit to leaf values directly
    pub fn new(leaf_nodes: Vec<Output<D>>) -> Result<Self, MerkleTreeError> {
        let n = leaf_nodes.len();
        if n < 2 {
            return Err(MerkleTreeError::TooFewLeaves {
                expected: 2,
                actual: n,
            });
        } else if !n.is_power_of_two() {
            return Err(MerkleTreeError::NumberOfLeavesNotPowerOfTwo { n });
        }

        let nodes = build_merkle_nodes::<D>(&leaf_nodes);
        Ok(MerkleTree { nodes, leaf_nodes })
    }

    pub fn root(&self) -> &Output<D> {
        &self.nodes[1]
    }

    pub fn prove(&self, index: usize) -> Result<MerkleProof, MerkleTreeError> {
        if index >= self.leaf_nodes.len() {
            return Err(MerkleTreeError::LeafIndexOutOfBounds {
                n: self.leaf_nodes.len(),
                i: index,
            });
        }

        // TODO: batch proofs
        // TODO: could omit leaf_nodes[index]
        let mut path = vec![
            self.leaf_nodes[index].clone(),
            self.leaf_nodes[index ^ 1].clone(),
        ];

        let mut index = (index + self.nodes.len()) >> 1;
        while index > 1 {
            path.push(self.nodes[index ^ 1].clone());
            index >>= 1;
        }

        Ok(MerkleProof::new::<D>(path))
    }

    pub fn verify(
        root: &Output<D>,
        proof: &[Output<D>],
        mut position: usize,
    ) -> Result<(), MerkleTreeError> {
        let mut proof_iter = proof.iter();
        let mut running_hash = proof_iter.next().unwrap().clone();
        for node in proof_iter {
            let mut hasher = D::new();
            if position % 2 == 0 {
                hasher.update(running_hash);
                hasher.update(node);
            } else {
                hasher.update(node);
                hasher.update(running_hash);
            }
            running_hash = hasher.finalize();
            position >>= 1;
        }

        if *root == running_hash {
            Ok(())
        } else {
            Err(MerkleTreeError::InvalidProof)
        }
    }
}

#[cfg(feature = "parallel")]
fn build_merkle_nodes<D: Digest>(leaf_nodes: &[Output<D>]) -> Vec<Output<D>> {
    let n = leaf_nodes.len();
    let num_subtrees = core::cmp::min(rayon::current_num_threads().next_power_of_two(), n / 2);
    let mut nodes = vec![Output::<D>::default(); n];

    // code adapted from winterfell
    rayon::scope(|s| {
        for i in 0..num_subtrees {
            let nodes = unsafe { &mut *(&mut nodes[..] as *mut [Output<D>]) };
            s.spawn(move |_| {
                // generate layer of nodes from leaf nodes
                let batch_size = n / num_subtrees;
                let leaf_offset = batch_size * i;
                for j in (0..batch_size).step_by(2) {
                    let mut hasher = D::new();
                    hasher.update(&leaf_nodes[leaf_offset + j]);
                    hasher.update(&leaf_nodes[leaf_offset + j + 1]);
                    nodes[(n + leaf_offset + j) / 2] = hasher.finalize();
                }

                // generate remaining nodes
                let mut batch_size = n / num_subtrees / 4;
                let mut start_idx = n / 4 + batch_size * i;
                while start_idx >= num_subtrees {
                    for k in (start_idx..(start_idx + batch_size)).rev() {
                        let mut hasher = D::new();
                        hasher.update(&nodes[k * 2]);
                        hasher.update(&nodes[k * 2 + 1]);
                        nodes[k] = hasher.finalize();
                    }
                    start_idx /= 2;
                    batch_size /= 2;
                }
            });
        }
    });

    // finish the tip of the tree
    for i in (1..num_subtrees).rev() {
        let mut hasher = D::new();
        hasher.update(&nodes[i * 2]);
        hasher.update(&nodes[i * 2 + 1]);
        nodes[i] = hasher.finalize();
    }

    nodes
}

#[cfg(not(feature = "parallel"))]
fn build_merkle_nodes<D: Digest>(leaf_nodes: &[Output<D>]) -> Vec<Output<D>> {
    let n = leaf_nodes.len();
    let mut nodes = vec![Output::<D>::default(); n];

    // generate layer of nodes from leaf nodes
    for i in 0..n / 2 {
        let mut hasher = D::new();
        hasher.update(&leaf_nodes[i * 2]);
        hasher.update(&leaf_nodes[i * 2 + 1]);
        nodes[n / 2 + i] = hasher.finalize();
    }

    // generate remaining nodes
    for i in (1..n / 2).rev() {
        let mut hasher = D::new();
        hasher.update(&nodes[i * 2]);
        hasher.update(&nodes[i * 2 + 1]);
        nodes[i] = hasher.finalize();
    }

    nodes
}
