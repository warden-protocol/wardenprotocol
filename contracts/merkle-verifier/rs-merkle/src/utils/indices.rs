use crate::{prelude::*, utils};
use alloc::collections::BTreeMap;

pub fn is_left_index(index: usize) -> bool {
    index % 2 == 0
}

pub fn get_sibling_index(index: usize) -> usize {
    if is_left_index(index) {
        // Right sibling index
        return index + 1;
    }
    // Left sibling index
    index - 1
}

pub fn sibling_indices(indices: &[usize]) -> Vec<usize> {
    indices.iter().cloned().map(get_sibling_index).collect()
}

pub fn parent_index(index: usize) -> usize {
    if is_left_index(index) {
        return index / 2;
    }
    get_sibling_index(index) / 2
}

pub fn parent_indices(indices: &[usize]) -> Vec<usize> {
    let mut parents: Vec<usize> = indices.iter().cloned().map(parent_index).collect();
    parents.dedup();
    parents
}

pub fn tree_depth(leaves_count: usize) -> usize {
    8 * core::mem::size_of::<usize>() - leaves_count.leading_zeros() as usize
}

pub fn uneven_layers(tree_leaves_count: usize) -> BTreeMap<usize, usize> {
    let mut leaves_count = tree_leaves_count;
    let depth = tree_depth(tree_leaves_count);

    let mut uneven_layers = BTreeMap::new();

    for index in 0..depth {
        let uneven_layer = leaves_count % 2 != 0;
        if uneven_layer {
            uneven_layers.insert(index, leaves_count);
        }
        leaves_count = div_ceil(leaves_count, 2);
    }

    uneven_layers
}

/// Returns layered proof indices
pub fn proof_indices_by_layers(
    sorted_leaf_indices: &[usize],
    leaves_count: usize,
) -> Vec<Vec<usize>> {
    let depth = tree_depth(leaves_count);
    let uneven_layers = uneven_layers(leaves_count);

    let mut layer_nodes = sorted_leaf_indices.to_vec();
    let mut proof_indices: Vec<Vec<usize>> = Vec::new();

    for layer_index in 0..depth {
        let mut sibling_indices = sibling_indices(&layer_nodes);
        // The last node of that layer doesn't have another hash to the right, so no need to include
        // that index
        if let Some(leaves_count) = uneven_layers.get(&layer_index) {
            if let Some(layer_last_node_index) = layer_nodes.last() {
                if *layer_last_node_index == leaves_count - 1 {
                    sibling_indices.pop();
                }
            }
        }

        // Figuring out indices that are already siblings and do not require additional hash
        // to calculate the parent
        let proof_nodes_indices = utils::collections::difference(&sibling_indices, &layer_nodes);

        proof_indices.push(proof_nodes_indices);
        // Passing parent nodes indices to the next iteration cycle
        layer_nodes = parent_indices(&layer_nodes);
    }

    proof_indices
}

pub fn div_ceil(x: usize, y: usize) -> usize {
    x / y + if x % y != 0 { 1 } else { 0 }
}
