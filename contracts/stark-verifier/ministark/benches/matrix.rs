#![feature(allocator_api)]

use ark_ff::Field;
use ark_ff_optimized::fp64::Fp;
use criterion::criterion_group;
use criterion::criterion_main;
use criterion::BenchmarkId;
use criterion::Criterion;
use digest::Digest;
use gpu_poly::allocator::PageAlignedAllocator;
use gpu_poly::GpuField;
use ministark::Matrix;
use sha2::Sha256;

const BENCHMARK_MATRIX_DIMENSIONS: [(usize, usize); 4] =
    [(2048, 1), (2048, 12), (65536, 1), (65536, 24)];

fn matrix_row_commitment_bench<F: GpuField + Field, D: Digest>(c: &mut Criterion, name: &str) {
    let mut rng = ark_std::test_rng();
    let mut group = c.benchmark_group(name);
    group.sample_size(10);

    for (m, n) in BENCHMARK_MATRIX_DIMENSIONS {
        let mut columns = Vec::new();
        for _ in 0..n {
            let mut row = Vec::with_capacity_in(m, PageAlignedAllocator);
            (0..m).for_each(|_| row.push(F::rand(&mut rng)));
            columns.push(row);
        }

        let matrix = Matrix::new(columns);

        let parameter = format!("{m}x{n}");
        group.bench_with_input(
            BenchmarkId::new("commit_to_rows", &parameter),
            &parameter,
            |b, _| b.iter(|| matrix.commit_to_rows::<D>()),
        );
    }

    group.finish()
}

fn matrix_row_commitment_benches(c: &mut Criterion) {
    matrix_row_commitment_bench::<Fp, Sha256>(c, "matrix row commitment (sha256)");
}

criterion_group!(benches, matrix_row_commitment_benches);
criterion_main!(benches);
