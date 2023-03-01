use crate::prelude::*;
use crate::{partial_tree::PartialTree, utils, utils::indices, Hasher, MerkleProof};

/// [`MerkleTree`] is a Merkle Tree that is well suited for both basic and advanced usage.
///
/// Basic features include the creation and verification of Merkle proofs from a set of leaves.
/// This is often done in various cryptocurrencies.
///
/// Advanced features include being able to make transactional changes to a tree with being able to
/// roll back to any previously committed state of the tree. This scenario is similar to Git and
/// can be found in databases and file systems.
#[derive(Clone, Debug)]
pub struct MerkleTree<T: Hasher> {
    current_working_tree: PartialTree<T>,
    history: Vec<PartialTree<T>>,
    uncommitted_leaves: Vec<T::Hash>,
}

impl<T: Hasher> Default for MerkleTree<T> {
    fn default() -> Self {
        Self::new()
    }
}

impl<T: Hasher> MerkleTree<T> {
    /// Creates a new instance of Merkle Tree. Requires a hash algorithm to be specified.
    ///
    /// # Examples
    ///
    /// ```
    /// use rs_merkle::{MerkleTree, algorithms::Sha256};
    ///
    /// let merkle_tree: MerkleTree<Sha256> = MerkleTree::new();
    ///
    /// let another_merkle_tree = MerkleTree::<Sha256>::new();
    /// ```
    pub fn new() -> Self {
        Self {
            current_working_tree: PartialTree::new(),
            history: Vec::new(),
            uncommitted_leaves: Vec::new(),
        }
    }

    /// Clones the leaves and builds the tree from them
    ///
    /// ## Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let leaves = [
    ///     Sha256::hash("a".as_bytes()),
    ///     Sha256::hash("b".as_bytes()),
    ///     Sha256::hash("c".as_bytes()),
    /// ];
    ///
    /// let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);
    /// # Ok(())
    /// # }
    pub fn from_leaves(leaves: &[T::Hash]) -> Self {
        let mut tree = Self::new();

        tree.append(leaves.to_vec().as_mut());
        tree.commit();

        tree
    }

    /// Returns the tree root - the top hash of the tree. Used in the inclusion proof verification.
    ///
    /// ## Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let leaves = [
    ///     Sha256::hash("a".as_bytes()),
    ///     Sha256::hash("b".as_bytes()),
    ///     Sha256::hash("c".as_bytes()),
    /// ];
    ///
    /// let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);
    ///
    /// let indices_to_prove = vec![0, 1];
    /// let leaves_to_prove = leaves.get(0..2).ok_or("can't get leaves to prove")?;
    ///
    /// let proof = merkle_tree.proof(&indices_to_prove);
    /// let root = merkle_tree.root().ok_or("couldn't get the merkle root")?;
    ///
    /// assert!(proof.verify(root, &indices_to_prove, leaves_to_prove, leaves.len()));
    /// # Ok(())
    /// # }
    /// ```
    pub fn root(&self) -> Option<T::Hash> {
        Some(self.layer_tuples().last()?.first()?.1)
    }

    /// Similar to [`MerkleTree::root`], but returns a hex encoded string instead of
    /// [`Hasher::Hash`].
    ///
    /// ## Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let leaves = [
    ///     Sha256::hash("a".as_bytes()),
    ///     Sha256::hash("b".as_bytes()),
    ///     Sha256::hash("c".as_bytes()),
    /// ];
    ///
    /// let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);
    /// let root = merkle_tree.root_hex().ok_or("couldn't get the merkle root")?;
    ///
    /// assert_eq!(
    ///     root,
    ///     "7075152d03a5cd92104887b476862778ec0c87be5c2fa1c0a90f87c49fad6eff".to_string()
    /// );
    /// # Ok(())
    /// # }
    /// ```
    pub fn root_hex(&self) -> Option<String> {
        let root = self.root()?;
        Some(utils::collections::to_hex_string(&root))
    }

    /// Returns helper nodes required to build a partial tree for the given indices
    /// to be able to extract a root from it. Useful in constructing Merkle proofs
    fn helper_nodes(&self, leaf_indices: &[usize]) -> Vec<T::Hash> {
        let mut helper_nodes = Vec::<T::Hash>::new();

        for layer in self.helper_node_tuples(leaf_indices) {
            for (_index, hash) in layer {
                helper_nodes.push(hash)
            }
        }

        helper_nodes
    }

    /// Gets all helper nodes required to build a partial merkle tree for the given indices,
    /// cloning all required hashes into the resulting vector.
    fn helper_node_tuples(&self, leaf_indices: &[usize]) -> Vec<Vec<(usize, T::Hash)>> {
        let mut current_layer_indices = leaf_indices.to_vec();
        let mut helper_nodes: Vec<Vec<(usize, T::Hash)>> = Vec::new();

        for tree_layer in self.layer_tuples() {
            let mut helpers_layer = Vec::new();
            let siblings = utils::indices::sibling_indices(&current_layer_indices);
            // Filter all nodes that do not require an additional hash to be calculated
            let helper_indices = utils::collections::difference(&siblings, &current_layer_indices);

            for index in helper_indices {
                if let Some(tuple) = tree_layer.get(index) {
                    helpers_layer.push(*tuple);
                }
            }

            helper_nodes.push(helpers_layer);
            current_layer_indices = indices::parent_indices(&current_layer_indices);
        }

        helper_nodes
    }

    /// Returns the Merkle proof required to prove the inclusion of items in a data set.
    ///
    /// ## Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let leaves: Vec<[u8; 32]> = ["a", "b", "c", "d", "e", "f"]
    ///     .iter()
    ///     .map(|x| Sha256::hash(x.as_bytes()))
    ///     .collect();
    ///
    /// let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);
    /// let indices_to_prove = vec![3, 4];
    /// let leaves_to_prove = leaves.get(3..5).ok_or("can't get leaves to prove")?;
    /// let merkle_proof = merkle_tree.proof(&indices_to_prove);
    /// let merkle_root = merkle_tree.root().ok_or("couldn't get the merkle root")?;
    /// // Serialize proof to pass it to the client
    /// let proof_bytes = merkle_proof.to_bytes();
    ///
    /// // Parse proof back on the client
    /// let proof = MerkleProof::<Sha256>::try_from(proof_bytes)?;
    ///
    /// assert!(proof.verify(merkle_root, &indices_to_prove, leaves_to_prove, leaves.len()));
    /// # Ok(())
    /// # }
    /// ```
    pub fn proof(&self, leaf_indices: &[usize]) -> MerkleProof<T> {
        MerkleProof::<T>::new(self.helper_nodes(leaf_indices))
    }

    /// Inserts a new leaf. Please note it won't modify the root just yet; For the changes
    /// to be applied to the root, [`MerkleTree::commit`] method should be called first. To get the
    /// root of the new tree without applying the changes, you can use
    /// [`MerkleTree::uncommitted_root`]
    ///
    /// # Examples
    ///
    /// Get the root after an insert:
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let mut merkle_tree = MerkleTree::<Sha256>::new();
    /// merkle_tree.insert(Sha256::hash("a".as_bytes()));
    ///
    /// assert_eq!(merkle_tree.root(), None);
    ///
    /// merkle_tree.commit();
    /// assert_eq!(
    ///     merkle_tree.root_hex(),
    ///     Some("ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb".to_string())
    /// );
    /// # Ok(())
    /// # }
    /// ```
    ///
    /// Inserts also can be chained with [`MerkleTree::commit`] for convenience:
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let mut merkle_tree = MerkleTree::<Sha256>::new();
    /// merkle_tree
    ///     .insert(Sha256::hash("a".as_bytes()))
    ///     .commit();
    ///
    /// assert_eq!(
    ///     merkle_tree.root_hex(),
    ///     Some("ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb".to_string())
    /// );
    /// # Ok(())
    /// # }
    /// ```
    pub fn insert(&mut self, leaf: T::Hash) -> &mut Self {
        self.uncommitted_leaves.push(leaf);
        self
    }

    /// Appends leaves to the tree. Behaves similarly to [`MerkleTree::insert`], but for a list of
    /// items. Takes ownership of the elements of the [`std::vec::Vec<T>`],
    /// similarly to [`std::vec::Vec::append`].
    ///
    /// ## Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let mut merkle_tree = MerkleTree::<Sha256>::new();
    /// let mut leaves = vec![
    ///     Sha256::hash("a".as_bytes()),
    ///     Sha256::hash("b".as_bytes()),
    /// ];
    /// merkle_tree
    ///     .append(&mut leaves)
    ///     .commit();
    ///
    /// assert_eq!(
    ///     merkle_tree.root_hex(),
    ///     Some("e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a".to_string())
    /// );
    /// # Ok(())
    /// # }
    /// ```
    pub fn append(&mut self, leaves: &mut Vec<T::Hash>) -> &mut Self {
        self.uncommitted_leaves.append(leaves);
        self
    }

    /// Commits the changes made by [`MerkleTree::insert`] and [`MerkleTree::append`]
    /// and modifies the root.
    /// Commits are saved to the history, so the tree can be rolled back to any previous commit
    /// using [`MerkleTree::rollback`]
    ///
    /// ## Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let mut merkle_tree = MerkleTree::<Sha256>::new();
    /// let mut leaves = vec![
    ///     Sha256::hash("a".as_bytes()),
    ///     Sha256::hash("b".as_bytes()),
    /// ];
    /// merkle_tree.append(&mut leaves);
    /// assert_eq!(
    ///     merkle_tree.root_hex(),
    ///     None
    /// );
    ///
    /// merkle_tree.commit();
    /// assert_eq!(
    ///     merkle_tree.root_hex(),
    ///     Some("e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a".to_string())
    /// );
    /// # Ok(())
    /// # }
    /// ```
    pub fn commit(&mut self) {
        if let Some(diff) = self.uncommitted_diff() {
            self.history.push(diff.clone());
            self.current_working_tree.merge_unverified(diff);
            self.uncommitted_leaves.clear();
        }
    }

    /// Rolls back one commit and reverts the tree to the previous state.
    /// Removes the most recent commit from the history.
    ///
    /// ## Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let mut merkle_tree = MerkleTree::<Sha256>::new();
    ///
    /// merkle_tree.insert(Sha256::hash("a".as_bytes())).commit();
    /// assert_eq!(
    ///     merkle_tree.root_hex(),
    ///     Some("ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb".to_string())
    /// );
    ///
    /// merkle_tree.insert(Sha256::hash("b".as_bytes())).commit();
    /// assert_eq!(
    ///     merkle_tree.root_hex(),
    ///     Some("e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a".to_string())
    /// );
    ///
    /// // Rollback to the previous state
    /// merkle_tree.rollback();
    /// assert_eq!(
    ///     merkle_tree.root_hex(),
    ///     Some("ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb".to_string())
    /// );
    /// # Ok(())
    /// # }
    /// ```
    pub fn rollback(&mut self) {
        // Remove the most recent commit
        self.history.pop();
        // Clear working tree
        self.current_working_tree.clear();
        // Applying all the commits up to the removed one. This is not an
        // efficient way of doing things, but the diff subtraction is not implemented yet on
        // PartialMerkleTree
        for commit in &self.history {
            self.current_working_tree.merge_unverified(commit.clone());
        }
    }

    /// Calculates the root of the uncommitted changes as if they were committed.
    /// Will return the same hash as [`MerkleTree::root`] after [`MerkleTree::commit`]
    ///
    /// For examples, please check [`MerkleTree::uncommitted_root_hex`]
    pub fn uncommitted_root(&self) -> Option<T::Hash> {
        let shadow_tree = self.uncommitted_diff()?;
        shadow_tree.root().cloned()
    }

    /// Calculates the root of the uncommitted changes as if they were committed. Serializes
    /// the result as a hex string.
    /// Will return the same hash as [`MerkleTree::root_hex`] after [`MerkleTree::commit`]
    ///
    /// ### Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let mut merkle_tree = MerkleTree::<Sha256>::new();
    /// let mut leaves = vec![
    ///     Sha256::hash("a".as_bytes()),
    ///     Sha256::hash("b".as_bytes()),
    /// ];
    /// merkle_tree.append(&mut leaves);
    /// assert_eq!(
    ///     merkle_tree.root_hex(),
    ///     None
    /// );
    /// assert_eq!(
    ///      merkle_tree.uncommitted_root_hex(),
    ///      Some("e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a".to_string())
    /// );
    ///
    /// merkle_tree.commit();
    /// assert_eq!(
    ///     merkle_tree.root_hex(),
    ///     Some("e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a".to_string())
    /// );
    /// # Ok(())
    /// # }
    /// ```
    pub fn uncommitted_root_hex(&self) -> Option<String> {
        let root = self.uncommitted_root()?;
        Some(utils::collections::to_hex_string(&root))
    }

    /// Clears all uncommitted changes made by [`MerkleTree::insert`] and [`MerkleTree::append`]
    /// operations without applying them to the tree.
    ///
    /// ## Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let mut merkle_tree = MerkleTree::<Sha256>::new();
    /// let mut leaves = vec![
    ///     Sha256::hash("a".as_bytes()),
    ///     Sha256::hash("b".as_bytes()),
    /// ];
    /// assert_eq!(
    ///     merkle_tree.root(),
    ///     None
    /// );
    ///
    /// merkle_tree.append(&mut leaves);
    /// merkle_tree.abort_uncommitted();
    /// merkle_tree.commit();
    ///
    /// assert_eq!(
    ///     merkle_tree.root(),
    ///     None
    /// );
    /// # Ok(())
    /// # }
    /// ```
    pub fn abort_uncommitted(&mut self) {
        self.uncommitted_leaves.clear()
    }

    /// Returns the tree depth. A tree depth is how many layers there is between the
    /// leaves and the root
    ///
    /// ## Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let leaves = [
    ///     Sha256::hash("a".as_bytes()),
    ///     Sha256::hash("b".as_bytes()),
    ///     Sha256::hash("c".as_bytes()),
    /// ];
    ///
    /// let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);
    /// assert_eq!(merkle_tree.depth(), 2);
    /// # Ok(())
    /// # }
    /// ```
    pub fn depth(&self) -> usize {
        self.layer_tuples().len() - 1
    }

    /// Returns a copy of the tree leaves - the base level of the tree.
    ///
    /// ### Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let leaves = [
    ///     Sha256::hash("a".as_bytes()),
    ///     Sha256::hash("b".as_bytes()),
    ///     Sha256::hash("c".as_bytes()),
    /// ];
    ///
    /// let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);
    /// assert_eq!(merkle_tree.leaves(), Some(leaves.to_vec()));
    /// # Ok(())
    /// # }
    /// ```
    pub fn leaves(&self) -> Option<Vec<T::Hash>> {
        Some(self.layers().first()?.to_vec())
    }

    /// Returns the number of leaves in the tree.
    ///
    /// ## Examples
    ///
    /// ```
    /// # use rs_merkle::{MerkleTree, MerkleProof, algorithms::Sha256, Hasher, Error, utils};
    /// # use std::convert::TryFrom;
    /// # fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// let leaves = [
    ///     Sha256::hash("a".as_bytes()),
    ///     Sha256::hash("b".as_bytes()),
    ///     Sha256::hash("c".as_bytes()),
    /// ];
    ///
    /// let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);
    /// assert_eq!(merkle_tree.leaves_len(), 3);
    /// # Ok(())
    /// # }
    /// ```
    pub fn leaves_len(&self) -> usize {
        if let Some(leaves) = self.leaves_tuples() {
            return leaves.len();
        }

        0
    }

    fn leaves_tuples(&self) -> Option<&[(usize, T::Hash)]> {
        Some(self.layer_tuples().first()?.as_slice())
    }

    /// Returns the whole tree, where the first layer is leaves and
    /// consequent layers are nodes.
    fn layers(&self) -> Vec<Vec<T::Hash>> {
        self.current_working_tree.layer_nodes()
    }

    fn layer_tuples(&self) -> &[Vec<(usize, T::Hash)>] {
        self.current_working_tree.layers()
    }

    /// Creates a diff from a changes that weren't committed to the main tree yet. Can be used
    /// to get uncommitted root or can be merged with the main tree
    fn uncommitted_diff(&self) -> Option<PartialTree<T>> {
        if self.uncommitted_leaves.is_empty() {
            return None;
        }

        let committed_leaves_count = self.leaves_len();

        let shadow_indices: Vec<usize> = self
            .uncommitted_leaves
            .iter()
            .enumerate()
            .map(|(index, _)| committed_leaves_count + index)
            .collect();
        // Tuples (index, hash) needed to construct a partial tree, since partial tree can't
        // maintain indices otherwise
        let mut shadow_node_tuples: Vec<(usize, T::Hash)> = shadow_indices
            .iter()
            .cloned()
            .zip(self.uncommitted_leaves.iter().cloned())
            .collect();
        let mut partial_tree_tuples = self.helper_node_tuples(&shadow_indices);

        // Figuring what tree height would be if we've committed the changes
        let leaves_in_new_tree = self.leaves_len() + self.uncommitted_leaves.len();
        let uncommitted_tree_depth = utils::indices::tree_depth(leaves_in_new_tree);

        match partial_tree_tuples.first_mut() {
            Some(first_layer) => {
                first_layer.append(&mut shadow_node_tuples);
                first_layer.sort_by(|(a, _), (b, _)| a.cmp(b));
            }
            None => partial_tree_tuples.push(shadow_node_tuples),
        }

        // Building a partial tree with the changes that would be needed to the working tree
        PartialTree::<T>::build(partial_tree_tuples, uncommitted_tree_depth).ok()
    }
}
