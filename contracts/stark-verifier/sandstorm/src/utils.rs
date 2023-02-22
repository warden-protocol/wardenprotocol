use gpu_poly::fields::p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp;
use crate::air::PUBLIC_MEMORY_STEP;
use ark_ff::Field;

/// Computes the value of the public memory quotient:
/// Adapted from https://github.com/starkware-libs/starkex-contracts
pub fn compute_public_memory_quotient(
    z: Fp,
    alpha: Fp,
    trace_len: usize,
    public_memory: &[(usize, Fp)],
    public_memory_padding_address: Fp,
    public_memory_padding_value: Fp,
) -> Fp {
    // the actual number of public memory cells
    let n = public_memory.len();
    // the num of cells allocated for the pub mem (include padding)
    let s = trace_len / PUBLIC_MEMORY_STEP;

    // numerator = (z - (0 + alpha * 0))^S,
    let numerator = z.pow([s as u64]);
    // denominator = \prod_i( z - (addr_i + alpha * value_i) ),
    let denominator = public_memory
        .iter()
        .map(|(a, v)| z - (Fp::from(*a as u64) + alpha * v))
        .product::<Fp>();
    // padding = (z - (padding_addr + alpha * padding_value))^(S - N),
    let padding = (z - (public_memory_padding_address + alpha * public_memory_padding_value))
        .pow([(s - n) as u64]);

    // numerator / (denominator * padding)
    numerator / (denominator * padding)
}
