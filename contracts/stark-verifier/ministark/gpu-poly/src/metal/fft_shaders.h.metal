#ifndef fft_shaders_h
#define fft_shaders_h

#include <metal_stdlib>
#include "felt_u256.h.metal"
#include "felt_u128.h.metal"
#include "felt_u64.h.metal"
#include "permute.h.metal"
using namespace metal;

// Performs a single itteration of Cooley-Tuckey FFT
// Code is has been optimized and may be difficult to reason about
template<typename CoeffFieldT, typename TwiddleFieldT = CoeffFieldT> kernel void
FftSingle(device CoeffFieldT *vals [[ buffer(0) ]],
        constant TwiddleFieldT *twiddles [[ buffer(1) ]],
        unsigned global_tid [[ thread_position_in_grid ]]) {
    unsigned input_step = (N / NUM_BOXES) / 2;
    unsigned box_id = global_tid / input_step;
    unsigned target_index = box_id * input_step * 2 + (global_tid % input_step);

    TwiddleFieldT twiddle = twiddles[box_id];
    CoeffFieldT p = vals[target_index];
    CoeffFieldT tmp = vals[target_index + input_step];
    CoeffFieldT q = tmp * twiddle;

    vals[target_index] = p + q;
    vals[target_index + input_step] = p - q;
}

// Performs bit reversal.
// A useful transformation after a Cooley-Tuckey FFT to put outputs in order.
template<typename FieldT> kernel void
BitReverse(device FieldT *vals [[ buffer(0) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    // ctz(N) is essentially equal to log2(N) since N is a power of two
    unsigned ri = reverse_bits(i) >> (sizeof(i) * 8 - ctz(N));

    if (i < ri) {
        // Swap positions
        FieldT tmp = vals[i];
        vals[i] = vals[ri];
        vals[ri] = tmp;
    }
}


// TODO: not being used. Consider removing
template<typename FieldT> kernel void
GenerateTwiddles(device FieldT *dst [[ buffer(0) ]],
        constant FieldT &root [[ buffer(1) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    unsigned ri = reverse_bits(i) >> (sizeof(i) * 8 - ctz(N));
    FieldT tmp = root;
    dst[i] = tmp.pow(ri);
}

// Performs multiple itteration stages of Cooley-Tuckey FFT
// Code is has been optimized and may be difficult to reason about
// TODO: Figure out poor perf reasons. Unrolls might cause instruction cache misses.
// TODO: Theoretically should be faster due to use of threadgroup memory... but it's not :(
template<typename CoeffFieldT, typename TwiddleFieldT = CoeffFieldT> kernel void
FftMultiple(device CoeffFieldT *vals [[ buffer(0) ]],
        constant TwiddleFieldT *twiddles [[ buffer(1) ]],
        threadgroup CoeffFieldT *shared_array [[ threadgroup(0) ]],
        unsigned group_id [[ threadgroup_position_in_grid ]],
        unsigned local_tid [[ thread_index_in_threadgroup ]]) {
#pragma unroll
    for (unsigned iteration_num = 0; iteration_num < (N / (THREADGROUP_FFT_SIZE / 2) / NUM_BOXES); iteration_num++) {
        unsigned global_tid = local_tid + iteration_num * (THREADGROUP_FFT_SIZE / 2);
        shared_array[global_tid] = vals[global_tid + group_id * (N / NUM_BOXES)];
    }

// #pragma unroll
    for (unsigned boxes = NUM_BOXES; boxes < N; boxes *= 2) {
        unsigned input_step = (N / boxes) / 2;

#pragma unroll
        for (unsigned iteration_num = 0; iteration_num < N / THREADGROUP_FFT_SIZE / NUM_BOXES; iteration_num++) {
            unsigned global_tid = local_tid + iteration_num * (THREADGROUP_FFT_SIZE / 2);
            unsigned box_id = global_tid / input_step;
            unsigned target_index = box_id * input_step * 2 + (global_tid % input_step);

            CoeffFieldT p = shared_array[target_index];
            TwiddleFieldT twiddle = twiddles[box_id + group_id * (boxes / NUM_BOXES)];
            CoeffFieldT tmp = shared_array[target_index + input_step];
            CoeffFieldT q = tmp * twiddle;

            shared_array[target_index] = p + q;
            shared_array[target_index + input_step] = p - q;
        }

        threadgroup_barrier(mem_flags::mem_threadgroup);
    }

#pragma unroll
    for (unsigned iteration_num = 0; iteration_num < (N / (THREADGROUP_FFT_SIZE / 2) / NUM_BOXES); iteration_num++) {
        // copy back to global from shared
        unsigned global_tid = local_tid + iteration_num * (THREADGROUP_FFT_SIZE / 2);
        vals[global_tid + group_id * (N / NUM_BOXES)] = shared_array[global_tid];
    }
}


// ===========================================================
// FFT for Fp=270497897142230380135924736767050121217
// - 128 bit prime field
// - from Stark Anatomy series
template [[ host_name("fft_single_fp270497897142230380135924736767050121217") ]] kernel void
FftSingle<p270497897142230380135924736767050121217::Fp>(
        device p270497897142230380135924736767050121217::Fp*,
        constant p270497897142230380135924736767050121217::Fp*,
        unsigned);
template [[ host_name("fft_multiple_fp270497897142230380135924736767050121217") ]] kernel void
FftMultiple<p270497897142230380135924736767050121217::Fp>(
        device p270497897142230380135924736767050121217::Fp*,
        constant p270497897142230380135924736767050121217::Fp*,
        threadgroup p270497897142230380135924736767050121217::Fp*,
        unsigned,
        unsigned);
// ===========================================================
// FFT for Fp=18446744069414584321
// - 64 bit prime field (2^64−2^32+1 = 18446744069414584321)
// - Polygon filed (usesed by Miden and Zero)
// - Prime has many nice properties
template [[ host_name("bit_reverse_p18446744069414584321_fp") ]] kernel void
BitReverse<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        unsigned);
template [[ host_name("generate_twiddles_p18446744069414584321_fp") ]] kernel void
GenerateTwiddles<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp&,
        unsigned);
template [[ host_name("fft_single_p18446744069414584321_fp") ]] kernel void
FftSingle<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        unsigned);
template [[ host_name("fft_multiple_p18446744069414584321_fp") ]] kernel void
FftMultiple<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        threadgroup p18446744069414584321::Fp*,
        unsigned,
        unsigned);
// ===========================================================
// FFT for cubic extension of Fp=18446744069414584321
template [[ host_name("bit_reverse_p18446744069414584321_fq3") ]] kernel void
BitReverse<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        unsigned);
template [[ host_name("fft_single_p18446744069414584321_fq3") ]] kernel void
FftSingle<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp*,
        unsigned);
template [[ host_name("fft_multiple_p18446744069414584321_fq3") ]] kernel void
FftMultiple<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp*,
        threadgroup p18446744069414584321::Fq3*,
        unsigned,
        unsigned);
// ===========================================================
// FFT for Fp=3618502788666131213697322783095070105623107215331596699973092056135872020481
// StarkWare's field
template [[ host_name("bit_reverse_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
BitReverse<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        unsigned);
template [[ host_name("fft_single_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
FftSingle<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        unsigned);
template [[ host_name("fft_multiple_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
FftMultiple<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        threadgroup p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        unsigned,
        unsigned);
// ===========================================================













// template<typename Fp, typename Fq = Fp> kernel void
// FibEval(constant Fp *t0 [[ buffer(0) ]],
//         constant Fp *t1 [[ buffer(1) ]],
//         constant Fp *t2 [[ buffer(2) ]],
//         constant Fp *t3 [[ buffer(3) ]],
//         constant Fp *t4 [[ buffer(4) ]],
//         constant Fp *t5 [[ buffer(5) ]],
//         constant Fp *t6 [[ buffer(6) ]],
//         constant Fp *t7 [[ buffer(7) ]],
//         constant Fp *t8 [[ buffer(8) ]],
//         constant Fp *t9 [[ buffer(9) ]],
//         constant Fp *t10 [[ buffer(10) ]],
//         constant Fp *t11 [[ buffer(11) ]],
//         constant Fp *t12 [[ buffer(12) ]],
//         constant Fp *t13 [[ buffer(13) ]],
//         constant Fp *t14 [[ buffer(14) ]],
//         constant Fp *t15 [[ buffer(15) ]],
//         constant Fp *t16 [[ buffer(16) ]],
//         constant Fp *t17 [[ buffer(17) ]],
//         constant Fp *t18 [[ buffer(18) ]],
//         constant Fp *t19 [[ buffer(19) ]],
//         constant Fp *t20 [[ buffer(20) ]],
//         constant Fp *t21 [[ buffer(21) ]],
//         constant Fp *t22 [[ buffer(22) ]],
//         constant Fp *t23 [[ buffer(23) ]],
//         constant Fp *t24 [[ buffer(24) ]],
//         constant Fp *t25 [[ buffer(25) ]],
//         constant Fp *t26 [[ buffer(26) ]],
//         constant Fp *t27 [[ buffer(27) ]],
//         constant Fp *t28 [[ buffer(28) ]],
//         constant Fp *t29 [[ buffer(29) ]],
//         device Fp *res [[ buffer(30) ]],
//         unsigned i [[ thread_position_in_grid ]]) {
//     Fp tmp = t0[i];
//     Fp tmp1 = t1[i];
//     tmp = tmp + tmp1;
//     Fp tmp2 = t2[i];
//     tmp = tmp + tmp2;
//     Fp tmp3 = t3[i];
//     tmp = tmp + tmp3;
//     Fp tmp4 = t4[i];
//     tmp = tmp + tmp4;
//     Fp tmp5 = t5[i];
//     tmp = tmp + tmp5;
//     Fp tmp6 = t6[i];
//     tmp = tmp + tmp6;
//     Fp tmp7 = t7[i];
//     tmp = tmp + tmp7;
//     Fp tmp8 = t8[i];
//     tmp = tmp + tmp8;
//     Fp tmp9 = t9[i];
//     tmp = tmp + tmp9;
//     Fp tmp10 = t10[i];
//     tmp = tmp + tmp10;
//     Fp tmp11 = t11[i];
//     tmp = tmp + tmp11;
//     Fp tmp12 = t12[i];
//     tmp = tmp + tmp12;
//     Fp tmp13 = t13[i];
//     tmp = tmp + tmp13;
//     Fp tmp14 = t14[i];
//     tmp = tmp + tmp14;
//     Fp tmp15 = t15[i];
//     tmp = tmp + tmp15;
//     Fp tmp16 = t16[i];
//     tmp = tmp + tmp16;
//     Fp tmp17 = t17[i];
//     tmp = tmp + tmp17;
//     Fp tmp18 = t18[i];
//     tmp = tmp + tmp18;
//     Fp tmp19 = t19[i];
//     tmp = tmp + tmp19;
//     Fp tmp20 = t20[i];
//     tmp = tmp + tmp20;
//     Fp tmp21 = t21[i];
//     tmp = tmp + tmp21;
//     Fp tmp22 = t22[i];
//     tmp = tmp + tmp22;
//     Fp tmp23 = t23[i];
//     tmp = tmp + tmp23;
//     Fp tmp24 = t24[i];
//     tmp = tmp + tmp24;
//     Fp tmp25 = t25[i];
//     tmp = tmp + tmp25;
//     Fp tmp26 = t26[i];
//     tmp = tmp + tmp26;
//     Fp tmp27 = t27[i];
//     tmp = tmp + tmp27;
//     Fp tmp28 = t28[i];
//     tmp = tmp + tmp28;
//     Fp tmp29 = t29[i];
//     tmp = tmp + tmp29;
//     res[i] = tmp;
// }

// template [[ host_name("fib_eval") ]] kernel void
// FibEval<p18446744069414584321::Fp>(
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         constant p18446744069414584321::Fp*,
//         device p18446744069414584321::Fp*,
//         unsigned);

#endif /* fft_shaders_h */