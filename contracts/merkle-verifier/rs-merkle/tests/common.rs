use rayon::prelude::*;
use rs_merkle::{algorithms::Sha256, Hasher, MerkleTree};

pub struct TestData {
    pub leaf_values: Vec<String>,
    pub expected_root_hex: String,
    pub leaf_hashes: Vec<[u8; 32]>,
}

fn combine<T: Clone>(active: Vec<T>, rest: Vec<T>, mut combinations: Vec<Vec<T>>) -> Vec<Vec<T>> {
    return if rest.is_empty() {
        if active.is_empty() {
            combinations
        } else {
            combinations.push(active);
            combinations
        }
    } else {
        let mut next = active.clone();

        if let Some(first) = rest.get(0) {
            next.push(first.clone());
        }

        combinations = combine(next, rest.clone().drain(1..).collect(), combinations);
        combinations = combine(active, rest.clone().drain(1..).collect(), combinations);
        combinations
    };
}

/// Create all possible combinations of elements inside a vector without duplicates
pub fn combinations<T: Clone>(vec: Vec<T>) -> Vec<Vec<T>> {
    combine(Vec::new(), vec, Vec::new())
}

pub fn setup() -> TestData {
    let leaf_values = ["a", "b", "c", "d", "e", "f"];
    let expected_root_hex = "1f7379539707bcaea00564168d1d4d626b09b73f8a2a365234c62d763f854da2";
    let leaf_hashes = leaf_values
        .iter()
        .map(|x| Sha256::hash(x.as_bytes()))
        .collect();

    TestData {
        leaf_values: leaf_values.iter().cloned().map(String::from).collect(),
        leaf_hashes,
        expected_root_hex: String::from(expected_root_hex),
    }
}

#[derive(Clone)]
pub struct ProofTestCases {
    pub merkle_tree: MerkleTree<Sha256>,
    pub cases: Vec<MerkleProofTestCase>,
}

#[derive(Clone)]
pub struct MerkleProofTestCase {
    pub leaf_indices_to_prove: Vec<usize>,
    pub leaf_hashes_to_prove: Vec<[u8; 32]>,
}

impl MerkleProofTestCase {
    fn new(leaf_hashes_to_prove: Vec<[u8; 32]>, leaf_indices_to_prove: Vec<usize>) -> Self {
        Self {
            // title: format!("from a tree of {} elements for {} elements at positions {:?}", leaf_hashes.len(), leaf_indices_to_prove.len(), leaf_indices_to_prove),
            leaf_hashes_to_prove,
            leaf_indices_to_prove,
        }
    }
}

pub fn setup_proof_test_cases() -> Vec<ProofTestCases> {
    let max_case = [
        "a", "b", "c", "d", "e", "f", "g", "h", "k", "l", "m", "o", "p", "r", "s",
    ];

    max_case
        .par_iter()
        .enumerate()
        .map(|(index, _)| {
            let tree_elements = max_case.get(0..index + 1).unwrap();

            let leaves: Vec<[u8; 32]> = tree_elements
                .iter()
                .map(|x| Sha256::hash(x.as_bytes()))
                .collect();

            let tuples: Vec<(usize, [u8; 32])> = leaves.iter().cloned().enumerate().collect();

            let possible_proof_elements_combinations = combinations(tuples);

            let cases: Vec<MerkleProofTestCase> = possible_proof_elements_combinations
                .par_iter()
                .cloned()
                .map(|proof_elements| {
                    let (indices, leaves2): (Vec<usize>, Vec<[u8; 32]>) =
                        proof_elements.iter().cloned().unzip();
                    MerkleProofTestCase::new(leaves2, indices)
                })
                .collect();
            let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);

            let case = ProofTestCases { merkle_tree, cases };
            case
        })
        .collect()
}
