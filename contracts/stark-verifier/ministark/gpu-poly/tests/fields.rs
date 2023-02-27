#![cfg(target_arch = "aarch64")]
#![feature(allocator_api)]

use ark_ff::UniformRand;
use gpu_poly::prelude::PageAlignedAllocator;
use gpu_poly::prelude::PLANNER;
use gpu_poly::stage::MulPowStage;
use gpu_poly::utils::buffer_mut_no_copy;
use gpu_poly::utils::buffer_no_copy;
use objc::rc::autoreleasepool;

pub mod p18446744069414584321 {
    use super::*;
    use ark_ff::Field;
    use gpu_poly::fields::p18446744069414584321::Fp;
    use gpu_poly::fields::p18446744069414584321::Fq3;

    #[test]
    fn mul_pow_fp() {
        autoreleasepool(|| {
            let n = 2048;
            let mut rng = &mut ark_std::test_rng();
            let mut a = (0..n)
                .map(|_| Fp::rand(&mut rng))
                .collect::<Vec<Fp>>()
                .to_vec_in(PageAlignedAllocator);
            let b = (0..n)
                .map(|_| Fp::rand(&mut rng))
                .collect::<Vec<Fp>>()
                .to_vec_in(PageAlignedAllocator);
            let expected = a
                .iter()
                .copied()
                .zip(&b)
                .map(|(mut a, b)| {
                    a *= b;
                    a
                })
                .collect::<Vec<Fp>>()
                .to_vec_in(PageAlignedAllocator);
            let command_queue = &PLANNER.command_queue;
            let mut a_buffer = buffer_mut_no_copy(command_queue.device(), &mut a);
            let b_buffer = buffer_no_copy(command_queue.device(), &b);
            let command_buffer = command_queue.new_command_buffer();

            let multiplier = MulPowStage::<Fp>::new(&PLANNER.library, n);
            multiplier.encode(command_buffer, &mut a_buffer, &b_buffer, 1, 0);
            command_buffer.commit();
            command_buffer.wait_until_completed();

            for (i, (expected, actual)) in expected.into_iter().zip(a).enumerate() {
                assert_eq!(expected, actual, "mismatch at index {i}");
            }
        });
    }

    #[test]
    fn mul_pow_fq3_by_fp() {
        autoreleasepool(|| {
            let n = 2048;
            let mut rng = &mut ark_std::test_rng();
            let mut a = (0..n)
                .map(|_| Fq3::rand(&mut rng))
                .collect::<Vec<Fq3>>()
                .to_vec_in(PageAlignedAllocator);
            let b = (0..n)
                .map(|_| Fp::rand(&mut rng))
                .collect::<Vec<Fp>>()
                .to_vec_in(PageAlignedAllocator);
            let expected = a
                .iter()
                .copied()
                .zip(&b)
                .map(|(mut a, b)| {
                    a *= b;
                    a
                })
                .collect::<Vec<Fq3>>()
                .to_vec_in(PageAlignedAllocator);
            let command_queue = &PLANNER.command_queue;
            let mut a_buffer = buffer_mut_no_copy(command_queue.device(), &mut a);
            let b_buffer = buffer_no_copy(command_queue.device(), &b);
            let command_buffer = command_queue.new_command_buffer();

            let multiplier = MulPowStage::<Fq3, Fp>::new(&PLANNER.library, n);
            multiplier.encode(command_buffer, &mut a_buffer, &b_buffer, 1, 0);
            command_buffer.commit();
            command_buffer.wait_until_completed();

            for (i, (expected, actual)) in expected.into_iter().zip(a).enumerate() {
                assert_eq!(expected, actual, "mismatch at index {i}");
            }
        });
    }

    #[test]
    fn mul_pow_fq3() {
        autoreleasepool(|| {
            use ark_ff::One;
            println!("{:?}", Fq3::one());

            let n = 2048;
            let mut rng = &mut ark_std::test_rng();
            let mut a = (0..n)
                .map(|_| Fq3::rand(&mut rng))
                .collect::<Vec<Fq3>>()
                .to_vec_in(PageAlignedAllocator);
            let b = (0..n)
                .map(|_| Fq3::rand(&mut rng))
                .collect::<Vec<Fq3>>()
                .to_vec_in(PageAlignedAllocator);
            let expected = a
                .iter()
                .copied()
                .zip(&b)
                .map(|(mut a, b)| {
                    a *= b.square() * b;
                    a
                })
                .collect::<Vec<Fq3>>()
                .to_vec_in(PageAlignedAllocator);
            let command_queue = &PLANNER.command_queue;
            let mut a_buffer = buffer_mut_no_copy(command_queue.device(), &mut a);
            let b_buffer = buffer_no_copy(command_queue.device(), &b);
            let command_buffer = command_queue.new_command_buffer();

            let multiplier = MulPowStage::<Fq3>::new(&PLANNER.library, n);
            multiplier.encode(command_buffer, &mut a_buffer, &b_buffer, 3, 0);
            command_buffer.commit();
            command_buffer.wait_until_completed();

            for (i, (expected, actual)) in expected.into_iter().zip(a).enumerate() {
                assert_eq!(expected, actual, "mismatch at index {i}");
            }
        });
    }
}
