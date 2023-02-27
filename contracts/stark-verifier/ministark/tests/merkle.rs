use digest::Digest;
use ministark::merkle::MerkleTree;
use sha2::Sha256;

#[test]
fn merkle_verify() {
    let leaf_values = [1u32, 2, 3, 4, 5, 6, 7, 8];
    let leaf_nodes = leaf_values
        .iter()
        .map(|&v| Sha256::new_with_prefix(v.to_le_bytes()).finalize())
        .collect();
    let tree = MerkleTree::<Sha256>::new(leaf_nodes).unwrap();
    let commitment = tree.root();
    let i = 3;
    let proof = tree.prove(i).unwrap().parse::<Sha256>();

    assert!(MerkleTree::<Sha256>::verify(commitment, &proof, i).is_ok());
}

#[test]
fn merkle_verify_large_tree() {
    let leaf_values = (0..1 << 10).collect::<Vec<usize>>();
    let leaf_nodes = leaf_values
        .iter()
        .map(|&v| Sha256::new_with_prefix(v.to_le_bytes()).finalize())
        .collect();
    let tree = MerkleTree::<Sha256>::new(leaf_nodes).unwrap();
    let commitment = tree.root();
    let i = 378;
    let proof = tree.prove(i).unwrap().parse::<Sha256>();

    assert!(MerkleTree::<Sha256>::verify(commitment, &proof, i).is_ok());
}
