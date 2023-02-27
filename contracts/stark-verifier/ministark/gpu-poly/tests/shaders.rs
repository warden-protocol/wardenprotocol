#![cfg(target_arch = "aarch64")]
#![feature(allocator_api)]

use core::iter::zip;
use ark_ff::FftField;
use ark_ff_optimized::fp64::Fp;
use ark_poly::domain::Radix2EvaluationDomain;
use ark_poly::univariate::DensePolynomial;
use ark_poly::DenseUVPolynomial;
use ark_poly::EvaluationDomain;
use gpu_poly::fields::p18446744069414584321::Fq3;
use gpu_poly::fields::p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp as Fp252;
use gpu_poly::prelude::*;
use objc::rc::autoreleasepool;

#[test]
fn fft() {
    autoreleasepool(|| {
        let domains = [
            Radix2EvaluationDomain::new(2048).unwrap(),
            Radix2EvaluationDomain::new(4096).unwrap(),
            Radix2EvaluationDomain::new(65536).unwrap(),
            Radix2EvaluationDomain::new_coset(2048, Fp::GENERATOR).unwrap(),
            Radix2EvaluationDomain::new_coset(4096, Fp::GENERATOR).unwrap(),
        ];

        for (i, domain) in domains.into_iter().enumerate() {
            let poly = DensePolynomial::<Fp>::rand(domain.size() - 1, &mut ark_std::test_rng());
            let cpu_evals = domain.fft(&poly.coeffs);
            let mut gpu_evals = poly.coeffs.to_vec_in(PageAlignedAllocator);
            let mut fft = GpuFft::from(domain);
            fft.encode(&mut gpu_evals);
            fft.execute();

            for (j, (expected, actual)) in zip(cpu_evals, gpu_evals).enumerate() {
                assert_eq!(expected, actual, "domain ({i}) mismatch at index {j}");
            }
        }
    });
}

#[test]
fn fft_with_extension_field() {
    autoreleasepool(|| {
        let domains = [
            Radix2EvaluationDomain::new(2048).unwrap(),
            Radix2EvaluationDomain::new(4096).unwrap(),
            Radix2EvaluationDomain::new(65536).unwrap(),
            Radix2EvaluationDomain::new_coset(2048, Fp::GENERATOR).unwrap(),
            Radix2EvaluationDomain::new_coset(4096, Fp::GENERATOR).unwrap(),
        ];

        for (i, domain) in domains.into_iter().enumerate() {
            let poly = DensePolynomial::<Fq3>::rand(domain.size() - 1, &mut ark_std::test_rng());
            let cpu_evals = domain.fft(&poly.coeffs);
            let mut gpu_evals = poly.coeffs.to_vec_in(PageAlignedAllocator);
            let mut fft = GpuFft::from(domain);
            fft.encode(&mut gpu_evals);
            fft.execute();

            for (j, (expected, actual)) in zip(cpu_evals, gpu_evals).enumerate() {
                assert_eq!(expected, actual, "domain ({i}) mismatch at index {j}");
            }
        }
    });
}

#[test]
fn fft_with_256_bit_field() {
    autoreleasepool(|| {
        let domains = [
            Radix2EvaluationDomain::new(2048).unwrap(),
            Radix2EvaluationDomain::new(4096).unwrap(),
            Radix2EvaluationDomain::new_coset(2048, Fp252::GENERATOR).unwrap(),
            Radix2EvaluationDomain::new_coset(4096, Fp252::GENERATOR).unwrap(),
        ];

        for (i, domain) in domains.into_iter().enumerate() {
            let poly = DensePolynomial::<Fp252>::rand(domain.size() - 1, &mut ark_std::test_rng());
            let cpu_evals = domain.fft(&poly.coeffs);
            let mut gpu_evals = poly.coeffs.to_vec_in(PageAlignedAllocator);
            let mut fft = GpuFft::from(domain);
            fft.encode(&mut gpu_evals);
            fft.execute();

            for (j, (expected, actual)) in zip(cpu_evals, gpu_evals).enumerate() {
                assert_eq!(expected, actual, "domain ({i}) mismatch at index {j}");
            }
        }
    });
}

#[test]
fn ifft() {
    autoreleasepool(|| {
        let domains = [
            Radix2EvaluationDomain::new(2048).unwrap(),
            Radix2EvaluationDomain::new(4096).unwrap(),
            Radix2EvaluationDomain::new_coset(2048, Fp::GENERATOR).unwrap(),
            Radix2EvaluationDomain::new_coset(4096, Fp::GENERATOR).unwrap(),
        ];

        for (i, domain) in domains.into_iter().enumerate() {
            let poly = DensePolynomial::rand(domain.size() - 1, &mut ark_std::test_rng());
            let evals = poly.evaluate_over_domain_by_ref(domain).evals;

            let mut coeffs = evals.to_vec_in(PageAlignedAllocator);
            let mut ifft = GpuIfft::from(domain);
            ifft.encode(&mut coeffs);
            ifft.execute();

            for (j, (expected, actual)) in poly.coeffs.into_iter().zip(coeffs).enumerate() {
                assert_eq!(expected, actual, "domain ({i}) mismatch at index {j}");
            }
        }
    });
}

// TODO: evaluate_over_domain_by_ref needs to support DomainCoeff
// #[test]
// fn ifft_with_extension_field() {
//     autoreleasepool(|| {
//         let domains = [
//             Radix2EvaluationDomain::new(2048).unwrap(),
//             Radix2EvaluationDomain::new(4096).unwrap(),
//             Radix2EvaluationDomain::new_coset(2048, Fp::GENERATOR).unwrap(),
//             Radix2EvaluationDomain::new_coset(4096, Fp::GENERATOR).unwrap(),
//         ];

//         for (i, domain) in domains.into_iter().enumerate() {
//             let poly = DensePolynomial::<Fq3>::rand(domain.size() - 1, &mut
// ark_std::test_rng());             let evals =
// poly.evaluate_over_domain_by_ref(domain).evals;
//             let mut coeffs = evals.to_vec_in(PageAlignedAllocator);
//             let mut ifft = GpuIfft::from(domain);
//             ifft.encode(&mut coeffs);
//             ifft.execute();

//             for (j, (expected, actual)) in
// poly.coeffs.into_iter().zip(coeffs).enumerate() {
// assert_eq!(expected, actual, "domain ({i}) mismatch at index {j}");
//             }
//         }
//     });
// }
