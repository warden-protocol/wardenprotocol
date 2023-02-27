#![cfg(target_arch = "aarch64")]
#![feature(allocator_api)]

use ark_ff::FftField;
use ark_ff::Field;
use ark_poly::EvaluationDomain;
use ark_poly::Radix2EvaluationDomain;
use ark_poly::domain::DomainCoeff;
use criterion::criterion_group;
use criterion::criterion_main;
use criterion::BenchmarkId;
use criterion::Criterion;
use gpu_poly::fields::p18446744069414584321::Fp as Fp64;
use gpu_poly::fields::p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp as Fp252;
use gpu_poly::prelude::*;

const BENCHMARK_INPUT_SIZES: [usize; 4] = [2048, 4096, 32768, 262144];

fn fft_bench<F: GpuField + Field>(c: &mut Criterion, name: &str)
where
    F: DomainCoeff<F::FftField>,
    F::FftField: FftField,
{
    let mut rng = ark_std::test_rng();
    let mut group = c.benchmark_group(name);
    group.sample_size(10);

    for n in BENCHMARK_INPUT_SIZES {
        let vals: Vec<F> = (0..n).map(|_| F::rand(&mut rng)).collect();
        let domain = Radix2EvaluationDomain::new(n).unwrap();
        let coset = domain.get_coset(F::FftField::GENERATOR).unwrap();

        group.bench_with_input(BenchmarkId::new("GpuFft", n), &n, |b, _| {
            let mut coeffs = vals.to_vec_in(PageAlignedAllocator);
            b.iter(|| {
                let mut fft = GpuFft::from(domain);
                fft.encode(&mut coeffs);
                fft.execute();
            })
        });

        group.bench_with_input(BenchmarkId::new("GpuFft (coset)", n), &n, |b, _| {
            let mut coeffs = vals.to_vec_in(PageAlignedAllocator);
            b.iter(|| {
                let mut fft = GpuFft::from(coset);
                fft.encode(&mut coeffs);
                fft.execute();
            })
        });

        group.bench_with_input(BenchmarkId::new("GpuIfft", n), &n, |b, _| {
            let mut evals = vals.to_vec_in(PageAlignedAllocator);
            b.iter(|| {
                let mut fft = GpuIfft::from(domain);
                fft.encode(&mut evals);
                fft.execute();
            })
        });

        group.bench_with_input(BenchmarkId::new("GpuIfft (coset)", n), &n, |b, _| {
            let mut evals = vals.to_vec_in(PageAlignedAllocator);
            b.iter(|| {
                let mut fft = GpuIfft::from(coset);
                fft.encode(&mut evals);
                fft.execute();
            })
        });
    }

    group.finish();
}

fn fft_benches(c: &mut Criterion) {
    fft_bench::<Fp64>(c, "FFT (64-bit prime field)");
    fft_bench::<Fp252>(c, "FFT (252-bit prime field)");
}

criterion_group!(benches, fft_benches);
criterion_main!(benches);
