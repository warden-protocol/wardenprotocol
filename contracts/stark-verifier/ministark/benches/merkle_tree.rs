#![feature(allocator_api)]

use ark_ff::UniformRand;
use ark_ff_optimized::fp64::Fp;
use ark_serialize::CanonicalSerialize;
use criterion::criterion_group;
use criterion::criterion_main;
use criterion::BenchmarkId;
use criterion::Criterion;
use digest::Digest;
use digest::Output;
use gpu_poly::GpuField;
use ministark::merkle::MerkleTree;
use sha2::Sha256;

const BENCHMARK_TREE_DEPTH: [usize; 4] = [14, 15, 16, 17];

fn build_merkle_tree_bench<F: GpuField, D: Digest>(c: &mut Criterion, name: &str) {
    let mut rng = ark_std::test_rng();
    let mut group = c.benchmark_group(name);
    group.sample_size(10);

    for d in BENCHMARK_TREE_DEPTH {
        let n = 1 << d;
        let leaves: Vec<Fp> = (0..n).map(|_| Fp::rand(&mut rng)).collect();
        let leaf_nodes = leaves
            .iter()
            .map(|leaf| {
                let mut bytes = Vec::new();
                leaf.serialize_compressed(&mut bytes).unwrap();
                D::new_with_prefix(&bytes).finalize()
            })
            .collect::<Vec<Output<D>>>();

        group.bench_with_input(BenchmarkId::new("new", n), &n, |b, _| {
            b.iter(|| MerkleTree::<D>::new(leaf_nodes.clone()))
        });
    }
}

fn build_merkle_tree_benches(c: &mut Criterion) {
    build_merkle_tree_bench::<Fp, Sha256>(c, "build merkle tree (sha256)");
}

criterion_group!(benches, build_merkle_tree_benches);
criterion_main!(benches);
