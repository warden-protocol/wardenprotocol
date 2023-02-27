#![feature(allocator_api)]
#![cfg(feature = "gpu")]
use ark_ff::FftField;
use ark_ff::Field;
use ark_ff::One;
use ark_ff::UniformRand;
use ark_ff::Zero;
use ark_poly::univariate::DensePolynomial;
use ark_poly::DenseUVPolynomial;
use ark_poly::EvaluationDomain;
use ark_poly::Polynomial;
use ark_poly::Radix2EvaluationDomain;
use ark_std::rand::seq::SliceRandom;
use ark_std::rand::Rng;
use gpu_poly::allocator::PageAlignedAllocator;
use gpu_poly::fields::p18446744069414584321::Fp;
use gpu_poly::fields::p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp as Fp256;
use gpu_poly::fields::p18446744069414584321::Fq3;
use gpu_poly::prelude::PLANNER;
use gpu_poly::utils::buffer_no_copy;
use gpu_poly::GpuFftField;
use gpu_poly::GpuField;
use ministark::calculator::lde_calculator;
use ministark::constraints::AlgebraicExpression;
use ministark::constraints::ExecutionTraceColumn;
use ministark::constraints::FieldConstant;
use ministark::constraints::VerifierChallenge;
use ministark::utils;
use ministark::Air;
use ministark::Matrix;
use ministark::ProofOptions;
use ministark::StarkExtensionOf;
use ministark::TraceInfo;
use core::marker::PhantomData;

#[test]
#[cfg(feature = "gpu")]
fn evaluate_x_lde() {
    use AlgebraicExpression::*;
    let lde_blowup_factor = 4;
    let trace_len = 2048;
    let trace_info = TraceInfo::new(1, 0, trace_len, None);
    let options = ProofOptions::new(1, lde_blowup_factor, 0, 1, 1);
    let test_air = TestAir::<Fp>::new(trace_info, (), options);
    let lde_domain = test_air.lde_domain();
    let five = Fp::from(5u32);
    let expr: AlgebraicExpression<Fp> = (X.pow(3) / X - X + FieldConstant::Fp(five)).pow(21) / X;

    let result = lde_calculator(
        &test_air,
        expr,
        &|_| unreachable!(),
        &|_| unreachable!(),
        &mut |_| unreachable!(),
    );

    for (i, (v, x)) in result.0[0].iter().zip(lde_domain.elements()).enumerate() {
        assert_eq!(*v, (x.pow([2]) - x + five).pow([21]) / x, "mismatch at {i}");
    }
}

#[test]
#[cfg(feature = "gpu")]
fn evaluate_x_lde_with_fp_and_fq() {
    use AlgebraicExpression::*;
    let lde_blowup_factor = 4;
    let trace_len = 2048;
    let trace_info = TraceInfo::new(1, 0, trace_len, None);
    let options = ProofOptions::new(1, lde_blowup_factor, 0, 1, 1);
    let test_air = TestAir::<Fp, Fq3>::new(trace_info, (), options);
    let lde_domain = test_air.lde_domain();
    let five = Fp::from(5u32);
    let extension_element = Fq3::from_base_prime_field_elems(&[five, five, five]).unwrap();
    let expr = Constant(FieldConstant::Fq(extension_element)) / X;

    let result = lde_calculator(
        &test_air,
        expr,
        &|_| unreachable!(),
        &|_| unreachable!(),
        &mut |_| unreachable!(),
    );

    for (i, (v, x)) in result.0[0].iter().zip(lde_domain.elements()).enumerate() {
        assert_eq!(*v, Fq3::from(x) * extension_element, "mismatch at {i}");
    }
}

#[test]
#[cfg(feature = "gpu")]
fn evaluate_x_inverse_lde() {
    use AlgebraicExpression::*;
    let lde_blowup_factor = 4;
    let trace_len = 2048;
    let trace_info = TraceInfo::new(1, 0, trace_len, None);
    let options = ProofOptions::new(1, lde_blowup_factor, 0, 1, 1);
    let test_air = TestAir::<Fp>::new(trace_info, (), options);
    let lde_domain = test_air.lde_domain();
    let expr: AlgebraicExpression<Fp> = Constant(FieldConstant::Fp(Fp::one())) / X;

    let result = lde_calculator(
        &test_air,
        expr,
        &|_| unreachable!(),
        &|_| unreachable!(),
        &mut |_| unreachable!(),
    );

    for (i, (v, x)) in result.0[0].iter().zip(lde_domain.elements()).enumerate() {
        assert_eq!(*v, Fp::one() / x, "mismatch at {i}");
    }
}

#[test]
#[cfg(feature = "gpu")]
fn evaluate_trace_lde() {
    let command_queue = &PLANNER.command_queue;
    let device = command_queue.device();
    let lde_blowup_factor = 1;
    let trace_len = 2048;
    let n = trace_len * lde_blowup_factor;
    let trace_info = TraceInfo::new(1, 0, trace_len, None);
    let options = ProofOptions::new(1, lde_blowup_factor as u8, 0, 1, 1);
    let test_air = TestAir::<Fp>::new(trace_info, (), options);
    let trace = gen_fib_matrix(n);
    let expr: AlgebraicExpression<Fp> =
        0.next() - 1.curr() - 0.curr() + FieldConstant::Fp(Fp::one());

    let result = lde_calculator(
        &test_air,
        expr,
        &|_| unreachable!(),
        &|_| unreachable!(),
        &mut |i| {
            let col = trace.0[i].to_vec_in(PageAlignedAllocator);
            let gpu_buffer = buffer_no_copy(device, &col);
            ministark::constraints::EvaluationLde::Fp(col, gpu_buffer)
        },
    );

    for v in &result.0[0][0..result.num_rows() - 1] {
        assert_eq!(*v, Fp::one());
    }
}

#[test]
#[cfg(feature = "gpu")]
fn evaluate_constant_lde() {
    let command_queue = &PLANNER.command_queue;
    let device = command_queue.device();
    let lde_blowup_factor = 1;
    let trace_len = 2048;
    let n = trace_len * lde_blowup_factor;
    let trace_info = TraceInfo::new(1, 0, trace_len, None);
    let options = ProofOptions::new(1, lde_blowup_factor as u8, 0, 1, 1);
    let test_air = TestAir::<Fp256>::new(trace_info, (), options);
    let trace = Matrix::new(vec![vec![Fp256::one(); n].to_vec_in(PageAlignedAllocator)]);
    let one = AlgebraicExpression::Constant(FieldConstant::Fp(Fp256::one()));
    let expr: AlgebraicExpression<Fp256> = one - 0.curr();

    let result = lde_calculator(
        &test_air,
        expr,
        &|_| unreachable!(),
        &|_| unreachable!(),
        &mut |i| {
            let col = trace.0[i].to_vec_in(PageAlignedAllocator);
            let gpu_buffer = buffer_no_copy(device, &col);
            ministark::constraints::EvaluationLde::Fp(col, gpu_buffer)
        },
    );

    for v in &result.0[0][0..result.num_rows() - 1] {
        assert_eq!(*v, Fp256::zero());
    }
}
