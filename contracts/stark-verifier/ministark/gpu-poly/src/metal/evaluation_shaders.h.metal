#ifndef evaluation_shaders_h
#define evaluation_shaders_h

#include <metal_stdlib>
#include "felt_u128.h.metal"
#include "felt_u64.h.metal"
#include "permute.h.metal"
using namespace metal;


template<typename FieldT> kernel void
InverseInPlace(device FieldT *dst [[ buffer(0) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    FieldT v = dst[i];
    dst[i] = v.inverse();
}

template<typename FieldT> kernel void
ExpInPlace(device FieldT *dst [[ buffer(0) ]],
        constant unsigned &exponent [[ buffer(1) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    FieldT v = dst[i];
    dst[i] = v.pow(exponent);
}

template<typename FieldT> kernel void
NegInPlace(device FieldT *dst [[ buffer(0) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    FieldT v = dst[i];
    dst[i] = v.neg();
}

template<typename FieldT> kernel void
InverseInto(device FieldT *dst [[ buffer(0) ]],
        constant FieldT *src [[ buffer(1) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    FieldT v = src[i];
    dst[i] = v.inverse();
}

template<typename FieldT> kernel void
ExpInto(device FieldT *dst [[ buffer(0) ]],
        constant FieldT *src [[ buffer(1) ]],
        constant unsigned &exponent [[ buffer(2) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    FieldT v = src[i];
    dst[i] = v.pow(exponent);
}

template<typename FieldT> kernel void
NegInto(device FieldT *dst [[ buffer(0) ]],
        constant FieldT *src [[ buffer(1) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    FieldT v = src[i];
    dst[i] = v.neg();
}

template<typename LHSFieldT, typename RHSFieldT = LHSFieldT> kernel void
MulAssign(device LHSFieldT *lhs [[ buffer(0) ]],
        constant RHSFieldT *rhs [[ buffer(1) ]],
        constant unsigned &shift [[ buffer(2) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    LHSFieldT lhs_val = lhs[i];
    RHSFieldT rhs_val = rhs[(i + shift) % N];
    lhs[i] = lhs_val * rhs_val;
}

template<typename LHSFieldT, typename RHSFieldT = LHSFieldT> kernel void
AddAssign(device LHSFieldT *lhs_vals [[ buffer(0) ]],
        constant RHSFieldT *rhs_vals [[ buffer(1) ]],
        constant unsigned &shift [[ buffer(2) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    LHSFieldT lhs = lhs_vals[i];
    RHSFieldT rhs = rhs_vals[(i + shift) % N];
    lhs_vals[i] = lhs + rhs;
}


template<typename LHSFieldT, typename RHSFieldT = LHSFieldT> kernel void
MulInto(device LHSFieldT *dst [[ buffer(0) ]],
        constant LHSFieldT *lhs [[ buffer(1) ]],
        constant RHSFieldT *rhs [[ buffer(2) ]],
        constant unsigned &shift [[ buffer(3) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    LHSFieldT lhs_val = lhs[i];
    RHSFieldT rhs_val = rhs[(i + shift) % N];
    dst[i] = lhs_val * rhs_val;
}

template<typename LHSFieldT, typename RHSFieldT = LHSFieldT> kernel void
AddInto(device LHSFieldT *dst_vals [[ buffer(0) ]],
        constant LHSFieldT *lhs_vals [[ buffer(1) ]],
        constant RHSFieldT *rhs_vals [[ buffer(2) ]],
        constant unsigned &shift [[ buffer(3) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    LHSFieldT lhs = lhs_vals[i];
    RHSFieldT rhs = rhs_vals[(i + shift) % N];
    dst_vals[i] = lhs + rhs;
}

template<typename LHSFieldT, typename RHSFieldT = LHSFieldT> kernel void
MulIntoConst(device LHSFieldT *dst_vals [[ buffer(0) ]],
        constant LHSFieldT *lhs_vals [[ buffer(1) ]],
        constant RHSFieldT &rhs_val [[ buffer(2) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    LHSFieldT lhs = lhs_vals[i];
    RHSFieldT rhs = rhs_val;
    dst_vals[i] = lhs * rhs;
}

template<typename LHSFieldT, typename RHSFieldT = LHSFieldT> kernel void
AddIntoConst(device LHSFieldT *dst_vals [[ buffer(0) ]],
        constant LHSFieldT *lhs_vals [[ buffer(1) ]],
        constant RHSFieldT &rhs_val [[ buffer(2) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    LHSFieldT lhs = lhs_vals[i];
    RHSFieldT rhs = rhs_val;
    dst_vals[i] = lhs + rhs;
}

template<typename LHSFieldT, typename RHSFieldT = LHSFieldT> kernel void
ConvertInto(device LHSFieldT *dst_vals [[ buffer(0) ]],
        constant RHSFieldT *src_vals [[ buffer(1) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    RHSFieldT val = src_vals[i];
    dst_vals[i] = LHSFieldT(val);
}

template<typename LHSFieldT, typename RHSFieldT = LHSFieldT> kernel void
MulAssignConst(device LHSFieldT *dst_vals [[ buffer(0) ]],
        constant RHSFieldT &val [[ buffer(1) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    LHSFieldT dst = dst_vals[i];
    RHSFieldT tmp = val;
    dst_vals[i] = dst * tmp;
}

template<typename LHSFieldT, typename RHSFieldT = LHSFieldT> kernel void
AddAssignConst(device LHSFieldT *dst_vals [[ buffer(0) ]],
        constant RHSFieldT &val [[ buffer(1) ]],
        unsigned i [[ thread_position_in_grid ]]) {
    LHSFieldT dst = dst_vals[i];
    RHSFieldT tmp = val;
    dst_vals[i] = dst + tmp;
}

// TODO: I want to move fft unrelated kernels into their own .metal
// lhs[i] *= rhs[i + shift] ^ exponent
template<typename LHSFieldT, typename RHSFieldT = LHSFieldT> kernel void
MulPow(device LHSFieldT *lhs [[ buffer(0) ]],
        constant RHSFieldT *rhs [[ buffer(1) ]],
        constant unsigned &exponent [[ buffer(2) ]],
        constant unsigned &shift [[ buffer(3) ]],
        unsigned global_tid [[ thread_position_in_grid ]]) {
    unsigned lhs_idx = global_tid;
    unsigned rhs_idx = (global_tid + shift) % N;

    LHSFieldT lhs_val = lhs[lhs_idx];
    RHSFieldT rhs_val = rhs[rhs_idx];
    lhs[lhs_idx] = lhs_val * rhs_val.pow(exponent);
}

template<typename FieldT> kernel void
FillBuff(device FieldT *dst [[ buffer(0) ]],
        constant FieldT &value [[ buffer(1) ]],
        unsigned global_tid [[ thread_position_in_grid ]]) {
    dst[global_tid] = value;
}

// ===========================================================
// Evaluation for Fp=18446744069414584321
template [[ host_name("add_assign_LHS_p18446744069414584321_fp_RHS_p18446744069414584321_fp") ]] kernel void
AddAssign<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("convert_into_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fp") ]] kernel void
ConvertInto<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp*,
        unsigned);
template [[ host_name("convert_into_LHS_p18446744069414584321_fp_RHS_p18446744069414584321_fp") ]] kernel void
ConvertInto<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        unsigned);
template [[ host_name("add_assign_const_LHS_p18446744069414584321_fp_RHS_p18446744069414584321_fp") ]] kernel void
AddAssignConst<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp&,
        unsigned);
template [[ host_name("mul_assign_LHS_p18446744069414584321_fp_RHS_p18446744069414584321_fp") ]] kernel void
MulAssign<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("mul_assign_const_LHS_p18446744069414584321_fp_RHS_p18446744069414584321_fp") ]] kernel void
MulAssignConst<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp&,
        unsigned);
template [[ host_name("add_into_LHS_p18446744069414584321_fp_RHS_p18446744069414584321_fp") ]] kernel void
AddInto<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("add_into_const_LHS_p18446744069414584321_fp_RHS_p18446744069414584321_fp") ]] kernel void
AddIntoConst<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp&,
        unsigned);
template [[ host_name("mul_into_LHS_p18446744069414584321_fp_RHS_p18446744069414584321_fp") ]] kernel void
MulInto<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("mul_into_const_LHS_p18446744069414584321_fp_RHS_p18446744069414584321_fp") ]] kernel void
MulIntoConst<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp&,
        unsigned);
template [[ host_name("mul_pow_LHS_p18446744069414584321_fp_RHS_p18446744069414584321_fp") ]] kernel void
MulPow<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        constant unsigned&,
        unsigned);
template [[ host_name("inverse_in_place_p18446744069414584321_fp") ]] kernel void
InverseInPlace<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        unsigned);
template [[ host_name("exp_in_place_p18446744069414584321_fp") ]] kernel void
ExpInPlace<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("neg_in_place_p18446744069414584321_fp") ]] kernel void
NegInPlace<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        unsigned);
template [[ host_name("inverse_into_p18446744069414584321_fp") ]] kernel void
InverseInto<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        unsigned);
template [[ host_name("exp_into_p18446744069414584321_fp") ]] kernel void
ExpInto<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("neg_into_p18446744069414584321_fp") ]] kernel void
NegInto<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp*,
        unsigned);
template [[ host_name("fill_buff_p18446744069414584321_fp") ]] kernel void
FillBuff<p18446744069414584321::Fp>(
        device p18446744069414584321::Fp*,
        constant p18446744069414584321::Fp&,
        unsigned);
// ===========================================================
// Evaluation for cubic extension of Fp=18446744069414584321
template [[ host_name("add_assign_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fq3") ]] kernel void
AddAssign<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant unsigned&,
        unsigned);
template [[ host_name("add_assign_const_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fq3") ]] kernel void
AddAssignConst<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3&,
        unsigned);
template [[ host_name("add_assign_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fp") ]] kernel void
AddAssign<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("add_assign_const_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fp") ]] kernel void
AddAssignConst<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp&,
        unsigned);
template [[ host_name("add_into_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fq3") ]] kernel void
AddInto<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant unsigned&,
        unsigned);
template [[ host_name("add_into_const_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fq3") ]] kernel void
AddIntoConst<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3&,
        unsigned);
template [[ host_name("add_into_const_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fp") ]] kernel void
AddIntoConst<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp&,
        unsigned);
template [[ host_name("add_into_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fp") ]] kernel void
AddInto<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("mul_assign_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fq3") ]] kernel void
MulAssign<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant unsigned&,
        unsigned);
template [[ host_name("mul_assign_const_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fq3") ]] kernel void
MulAssignConst<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3&,
        unsigned);
template [[ host_name("mul_into_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fq3") ]] kernel void
MulInto<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant unsigned&,
        unsigned);
template [[ host_name("mul_into_const_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fq3") ]] kernel void
MulIntoConst<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3&,
        unsigned);
template [[ host_name("fill_buff_p18446744069414584321_fq3") ]] kernel void
FillBuff<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3&,
        unsigned);
template [[ host_name("mul_assign_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fp") ]] kernel void
MulAssign<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("mul_assign_const_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fp") ]] kernel void
MulAssignConst<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp&,
        unsigned);
template [[ host_name("mul_into_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fp") ]] kernel void
MulInto<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("mul_into_const_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fp") ]] kernel void
MulIntoConst<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp&,
        unsigned);
template [[ host_name("mul_pow_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fq3") ]] kernel void
MulPow<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        constant unsigned&,
        constant unsigned&,
        unsigned);
template [[ host_name("mul_pow_LHS_p18446744069414584321_fq3_RHS_p18446744069414584321_fp") ]] kernel void
MulPow<p18446744069414584321::Fq3, p18446744069414584321::Fp>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fp*,
        constant unsigned&,
        constant unsigned&,
        unsigned);
// template [[ host_name("inverse_in_place_p18446744069414584321_fq3") ]] kernel void
// InverseInPlace<p18446744069414584321::Fq3>(
//         device p18446744069414584321::Fq3*,
//         unsigned);
template [[ host_name("neg_in_place_p18446744069414584321_fq3") ]] kernel void
NegInPlace<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        unsigned);
// template [[ host_name("inverse_into_p18446744069414584321_fq3") ]] kernel void
// InverseInto<p18446744069414584321::Fq3>(
//         device p18446744069414584321::Fq3*,
//         constant p18446744069414584321::Fq3*,
//         unsigned);
template [[ host_name("neg_into_p18446744069414584321_fq3") ]] kernel void
NegInto<p18446744069414584321::Fq3>(
        device p18446744069414584321::Fq3*,
        constant p18446744069414584321::Fq3*,
        unsigned);
// ===========================================================
// Evaluation for Fp=3618502788666131213697322783095070105623107215331596699973092056135872020481
template [[ host_name("add_assign_LHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp_RHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
AddAssign<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("convert_into_LHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp_RHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
ConvertInto<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        unsigned);
template [[ host_name("add_assign_const_LHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp_RHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
AddAssignConst<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp&,
        unsigned);
template [[ host_name("mul_assign_LHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp_RHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
MulAssign<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("mul_assign_const_LHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp_RHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
MulAssignConst<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp&,
        unsigned);
template [[ host_name("add_into_LHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp_RHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
AddInto<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("add_into_const_LHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp_RHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
AddIntoConst<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp&,
        unsigned);
template [[ host_name("mul_into_LHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp_RHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
MulInto<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("mul_into_const_LHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp_RHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
MulIntoConst<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp&,
        unsigned);
template [[ host_name("mul_pow_LHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp_RHS_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
MulPow<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant unsigned&,
        constant unsigned&,
        unsigned);
template [[ host_name("inverse_in_place_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
InverseInPlace<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        unsigned);
template [[ host_name("exp_in_place_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
ExpInPlace<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("neg_in_place_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
NegInPlace<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        unsigned);
template [[ host_name("inverse_into_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
InverseInto<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        unsigned);
template [[ host_name("exp_into_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
ExpInto<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant unsigned&,
        unsigned);
template [[ host_name("neg_into_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
NegInto<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        unsigned);
template [[ host_name("fill_buff_p3618502788666131213697322783095070105623107215331596699973092056135872020481_fp") ]] kernel void
FillBuff<p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp>(
        device p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp*,
        constant p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp&,
        unsigned);
// ===========================================================

#endif /* evaluation_shaders_h */
