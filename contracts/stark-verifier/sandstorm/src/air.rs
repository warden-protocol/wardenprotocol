use alloc::vec::Vec;
use ark_serialize::CanonicalDeserialize;
use ark_serialize::CanonicalSerialize;
use ministark::ProofOptions;
use ministark::TraceInfo;
use ark_ff::One;
use ark_ff::Field;
use crate::utils;
use ministark::challenges::Challenges;
use ministark::constraints::AlgebraicExpression;
use ark_poly::domain::EvaluationDomain;
use ministark::Air;
use gpu_poly::fields::p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp;
use ministark::constraints::ExecutionTraceColumn;
use ministark::constraints::FieldConstant;
use ministark::constraints::Hint;
use ministark::constraints::VerifierChallenge as _;
use ministark::hints::Hints;
use crate::trace::Auxiliary;
use crate::trace::Flag;
use crate::trace::Mem;
use crate::trace::Npc;
use crate::trace::Permutation;
use crate::trace::RangeCheck;

// must be a power-of-two
pub const CYCLE_HEIGHT: usize = 16;
pub const PUBLIC_MEMORY_STEP: usize = 8;
pub const MEMORY_STEP: usize = 2;
pub const RANGE_CHECK_STEP: usize = 4;

pub struct CairoAir {
    info: TraceInfo,
    options: ProofOptions,
    inputs: ExecutionInfo,
}

// Section 9.2 https://eprint.iacr.org/2021/1063.pdf
#[derive(CanonicalSerialize, CanonicalDeserialize, Clone)]
pub struct ExecutionInfo {
    pub initial_ap: Fp,
    pub initial_pc: Fp,
    pub final_ap: Fp,
    pub final_pc: Fp,
    pub range_check_min: usize,
    pub range_check_max: usize,
    pub public_memory: Vec<(usize, Fp)>,
    pub public_memory_padding_address: usize,
    pub public_memory_padding_value: Fp,
}

impl Air for CairoAir {
    type Fp = Fp;
    type Fq = Fp;
    type PublicInputs = ExecutionInfo;

    fn new(info: TraceInfo, inputs: ExecutionInfo, options: ministark::ProofOptions) -> Self {
        CairoAir {
            info,
            options,
            inputs,
        }
    }

    fn pub_inputs(&self) -> &Self::PublicInputs {
        &self.inputs
    }

    fn trace_info(&self) -> &ministark::TraceInfo {
        &self.info
    }

    fn options(&self) -> &ministark::ProofOptions {
        &self.options
    }

    fn get_hints(&self, challenges: &Challenges<Self::Fq>) -> Hints<Self::Fq> {
        use PublicInputHint::*;

        let ExecutionInfo {
            initial_ap,
            initial_pc,
            final_ap,
            final_pc,
            range_check_min,
            range_check_max,
            public_memory,
            public_memory_padding_address,
            public_memory_padding_value,
        } = &self.inputs;

        let memory_product = utils::compute_public_memory_quotient(
            challenges[MemoryPermutation::Z],
            challenges[MemoryPermutation::A],
            self.trace_len(),
            public_memory,
            (*public_memory_padding_address as u64).into(),
            *public_memory_padding_value,
        );

        assert!(range_check_min <= range_check_max);
        assert!(*range_check_max < 2usize.pow(16));

        Hints::new(vec![
            (InitialAp.index(), *initial_ap),
            (InitialPc.index(), *initial_pc),
            (FinalAp.index(), *final_ap),
            (FinalPc.index(), *final_pc),
            // TODO: this is a wrong value. Must fix
            (MemoryProduct.index(), memory_product),
            (RangeCheckProduct.index(), Fp::one()),
            (RangeCheckMin.index(), (*range_check_min as u64).into()),
            (RangeCheckMax.index(), (*range_check_max as u64).into()),
        ])
    }

    fn constraints(&self) -> Vec<AlgebraicExpression<Fp>> {
        use AlgebraicExpression::*;
        use PublicInputHint::*;
        // TODO: figure out why this value
        let trace_domain = self.trace_domain();
        let g = trace_domain.group_gen();
        let n = trace_domain.size();
        let one = Constant(FieldConstant::Fp(Fp::one()));
        let two = Constant(FieldConstant::<Fp>::Fp(Fp::from(2u32)));
        let four = Constant(FieldConstant::<Fp>::Fp(Fp::from(4u32)));
        let offset_size = two.pow(16);
        let half_offset_size = two.pow(15);

        // cpu/decode/flag_op1_base_op0_0
        let cpu_decode_flag_op1_base_op0_0: AlgebraicExpression<Fp> =
            &one - (Flag::Op1Imm.curr() + Flag::Op1Ap.curr() + Flag::Op1Fp.curr());
        // cpu/decode/flag_res_op1_0
        let cpu_decode_flag_res_op1_0: AlgebraicExpression<Fp> =
            &one - (Flag::ResAdd.curr() + Flag::ResMul.curr() + Flag::PcJnz.curr());
        // cpu/decode/flag_pc_update_regular_0
        let cpu_decode_flag_pc_update_regular_0: AlgebraicExpression<Fp> =
            &one - (Flag::PcJumpAbs.curr() + Flag::PcJumpRel.curr() + Flag::PcJnz.curr());
        // cpu/decode/fp_update_regular_0
        let cpu_decode_fp_update_regular_0: AlgebraicExpression<Fp> =
            &one - (Flag::OpcodeCall.curr() + Flag::OpcodeRet.curr());

        // NOTE: npc_reg_0 = pc + instruction_size
        // NOTE: instruction_size = fOP1_IMM + 1
        let npc_reg_0 = Npc::Pc.curr() + Flag::Op1Imm.curr() + &one;

        let memory_address_diff_0: AlgebraicExpression<Fp> =
            Mem::Address.next() - Mem::Address.curr();

        let rc16_diff_0: AlgebraicExpression<Fp> =
            RangeCheck::Ordered.next() - RangeCheck::Ordered.curr();

        // TODO: builtins
        let pedersen_hash0_ec_subset_sub_b0 = Trace(3, 0) - (Trace(3, 1) + Trace(3, 1));
        let _pedersen_hash0_ec_subset_sum_b0_neg = &one - &pedersen_hash0_ec_subset_sub_b0;
        let rc_builtin_value0_0 = Trace(7, 12);
        let rc_builtin_value1_0 = &rc_builtin_value0_0 * &offset_size + Trace(7, 44);
        let rc_builtin_value2_0 = &rc_builtin_value1_0 * &offset_size + Trace(7, 76);
        let rc_builtin_value3_0 = &rc_builtin_value2_0 * &offset_size + Trace(7, 108);
        let rc_builtin_value4_0 = &rc_builtin_value3_0 * &offset_size + Trace(7, 140);
        let rc_builtin_value5_0 = &rc_builtin_value4_0 * &offset_size + Trace(7, 172);
        let rc_builtin_value6_0 = &rc_builtin_value5_0 * &offset_size + Trace(7, 204);
        let _rc_builtin_value7_0 = &rc_builtin_value6_0 * &offset_size + Trace(7, 236);
        let _ecdsa_sig0_doubling_key_x_squared: AlgebraicExpression<Fp> = Trace(8, 4) * Trace(8, 4);
        let ecdsa_sig0_exponentiate_generator_b0 = Trace(8, 34) - (Trace(8, 162) + Trace(8, 162));
        let _ecdsa_sig0_exponentiate_generator_b0_neg = &one - ecdsa_sig0_exponentiate_generator_b0;
        let ecdsa_sig0_exponentiate_key_b0 = Trace(8, 12) - (Trace(8, 76) + Trace(8, 76));
        let _ecdsa_sig0_exponentiate_key_b0_neg = &one - &ecdsa_sig0_exponentiate_key_b0;
        let _bitwise_sum_var_0_0: AlgebraicExpression<Fp> = Trace(7, 1)
            + Trace(7, 17) * two.pow(1)
            + Trace(7, 33) * two.pow(2)
            + Trace(7, 49) * two.pow(3)
            + Trace(7, 65) * two.pow(64)
            + Trace(7, 81) * two.pow(65)
            + Trace(7, 97) * two.pow(66)
            + Trace(7, 113) * two.pow(67);
        let _bitwise_sum_var_8_0: AlgebraicExpression<Fp> = Trace(7, 129) * two.pow(129)
            + Trace(7, 145) * two.pow(130)
            + Trace(7, 161) * two.pow(131)
            + Trace(7, 177) * two.pow(132)
            + Trace(7, 193) * two.pow(193)
            + Trace(7, 209) * two.pow(194)
            + Trace(7, 255) * two.pow(195)
            + Trace(7, 241) * two.pow(196);

        // example for trace length n=64
        // =============================
        // x^(n/16)                 = (x - ω_0)(x - ω_16)(x - ω_32)(x - ω_48)
        // x^(n/16) - c             = (x - c*ω_0)(x - c*ω_16)(x - c*ω_32)(x - c*ω_48)
        // x^(n/16) - ω^(n/16)      = (x - ω_1)(x - ω_17)(x - ω_33)(x - ω_49)
        // x^(n/16) - ω^(n/16)^(15) = (x - ω_15)(x - ω_31)(x - ω_47)(x - ω_63)
        let flag0_offset =
            FieldConstant::Fp(g.pow([(Flag::Zero as usize * n / CYCLE_HEIGHT) as u64]));
        let flag0_zerofier = X.pow(n / CYCLE_HEIGHT) - flag0_offset;
        let flags_zerofier = &flag0_zerofier / (X.pow(n) - &one);

        // check decoded flag values are 0 or 1
        // NOTE: This expression is a bit confusing. The zerofier forces this constraint
        // to apply in all rows of the trace therefore it applies to all flags (not just
        // DstReg). Funnily enough any flag here would work (it just wouldn't be SHARP
        // compatible).
        let cpu_decode_opcode_rc_b =
            (Flag::DstReg.curr() * Flag::DstReg.curr() - Flag::DstReg.curr()) * &flags_zerofier;

        // The first word of each instruction:
        // ┌─────────────────────────────────────────────────────────────────────────┐
        // │                     off_dst (biased representation)                     │
        // ├─────────────────────────────────────────────────────────────────────────┤
        // │                     off_op0 (biased representation)                     │
        // ├─────────────────────────────────────────────────────────────────────────┤
        // │                     off_op1 (biased representation)                     │
        // ├─────┬─────┬───────┬───────┬───────────┬────────┬───────────────────┬────┤
        // │ dst │ op0 │  op1  │  res  │    pc     │   ap   │      opcode       │ 0  │
        // │ reg │ reg │  src  │ logic │  update   │ update │                   │    │
        // ├─────┼─────┼───┬───┼───┬───┼───┬───┬───┼───┬────┼────┬────┬────┬────┼────┤
        // │  0  │  1  │ 2 │ 3 │ 4 │ 5 │ 6 │ 7 │ 8 │ 9 │ 10 │ 11 │ 12 │ 13 │ 14 │ 15 │
        // └─────┴─────┴───┴───┴───┴───┴───┴───┴───┴───┴────┴────┴────┴────┴────┴────┘
        let whole_flag_prefix = Trace(0, 0);
        // NOTE: Forces the `0` flag prefix to =0 in every cycle.
        let cpu_decode_opcode_rc_zero = &whole_flag_prefix / flag0_zerofier;

        // force constraint to apply every 16 trace rows (every cairo cycle)
        // e.g. (x - ω_0)(x - ω_16)(x - ω_32)(x - ω_48) for n=64
        let all_cycles_zerofier = X.pow(n / CYCLE_HEIGHT) - &one;
        let cpu_decode_opcode_rc_input = (Npc::Instruction.curr()
            - (((&whole_flag_prefix * &offset_size + RangeCheck::OffOp1.curr()) * &offset_size
                + RangeCheck::OffOp0.curr())
                * &offset_size
                + RangeCheck::OffDst.curr()))
            / &all_cycles_zerofier;

        // constraint for the Op1Src flag group - forces vals 000, 100, 010 or 001
        let cpu_decode_flag_op1_base_op0_bit = (&cpu_decode_flag_op1_base_op0_0
            * &cpu_decode_flag_op1_base_op0_0
            - &cpu_decode_flag_op1_base_op0_0)
            / &all_cycles_zerofier;

        // forces only one or none of ResAdd, ResMul or PcJnz to be 1
        // TODO: Why the F is PcJnz in here? Res flag group is only bit 5 and 6
        // NOTE: looks like it's a handy optimization to calculate next_fp and next_ap
        let cpu_decode_flag_res_op1_bit = (&cpu_decode_flag_res_op1_0 * &cpu_decode_flag_res_op1_0
            - &cpu_decode_flag_res_op1_0)
            / &all_cycles_zerofier;

        // constraint forces PcUpdate flag to be 000, 100, 010 or 001
        let cpu_decode_flag_pc_update_regular_bit = (&cpu_decode_flag_pc_update_regular_0
            * &cpu_decode_flag_pc_update_regular_0
            - &cpu_decode_flag_pc_update_regular_0)
            / &all_cycles_zerofier;

        // forces max only OpcodeRet or OpcodeAssertEq to be 1
        // TODO: why OpcodeCall not included? that would make whole flag group
        let cpu_decode_fp_update_regular_bit = (&cpu_decode_fp_update_regular_0
            * &cpu_decode_fp_update_regular_0
            - &cpu_decode_fp_update_regular_0)
            / &all_cycles_zerofier;

        // cpu/operands/mem_dst_addr
        // NOTE: Pseudo code from cairo whitepaper
        // ```
        // if dst_reg == 0:
        //     dst = m(ap + offdst)
        // else:
        //     dst = m(fp + offdst)
        // ```
        // NOTE: Trace(5, 8) dest mem address
        let cpu_operands_mem_dst_addr = (Npc::MemDstAddr.curr() + &half_offset_size
            - (Flag::DstReg.curr() * RangeCheck::Fp.curr()
                + (&one - Flag::DstReg.curr()) * RangeCheck::Ap.curr()
                + RangeCheck::OffDst.curr()))
            / &all_cycles_zerofier;

        // whitepaper pseudocode
        // ```
        // # Compute op0.
        // if op0_reg == 0:
        //     op0 = m(-->>ap + offop0<<--)
        // else:
        //     op0 = m(-->>fp + offop0<<--)
        // ```
        // NOTE: StarkEx contracts as: cpu_operands_mem0_addr
        let cpu_operands_mem_op0_addr = (Npc::MemOp0Addr.curr() + &half_offset_size
            - (Flag::Op0Reg.curr() * RangeCheck::Fp.curr()
                + (&one - Flag::Op0Reg.curr()) * RangeCheck::Ap.curr()
                + RangeCheck::OffOp0.curr()))
            / &all_cycles_zerofier;

        // NOTE: StarkEx contracts as: cpu_operands_mem1_addr
        let cpu_operands_mem_op1_addr = (Npc::MemOp1Addr.curr() + &half_offset_size
            - (Flag::Op1Imm.curr() * Npc::Pc.curr()
                + Flag::Op1Ap.curr() * RangeCheck::Ap.curr()
                + Flag::Op1Fp.curr() * RangeCheck::Fp.curr()
                + &cpu_decode_flag_op1_base_op0_0 * Npc::MemOp0.curr()
                + RangeCheck::OffOp1.curr()))
            / &all_cycles_zerofier;

        // op1 * op0
        // NOTE: starkex cpu/operands/ops_mul
        let cpu_operands_ops_mul = (RangeCheck::Op0MulOp1.curr()
            - Npc::MemOp0.curr() * Npc::MemOp1.curr())
            / &all_cycles_zerofier;

        // From cairo whitepaper
        // ```
        // # Compute res.
        // if pc_update == 4:
        //     if res_logic == 0 && opcode == 0 && ap_update != 1:
        //         res = Unused
        //     else:
        //         Undefined Behavior
        // else if pc_update = 0, 1 or 2:
        //     switch res_logic:
        //         case 0: res = op1
        //         case 1: res = op0 + op1
        //         case 2: res = op0 * op1
        //         default: Undefined Behavior
        // else: Undefined Behavior
        // ```
        // NOTE: this constraint only handles:
        // ```
        // else if pc_update = 0, 1 or 2:
        //   switch res_logic:
        //     case 0: res = op1
        //     case 1: res = op0 + op1
        //     case 2: res = op0 * op1
        // ```
        let cpu_operands_res = ((&one - Flag::PcJnz.curr()) * RangeCheck::Res.curr()
            - (Flag::ResAdd.curr() * (Npc::MemOp0.curr() + Npc::MemOp1.curr())
                + Flag::ResMul.curr() * RangeCheck::Op0MulOp1.curr()
                + &cpu_decode_flag_res_op1_0 * Npc::MemOp1.curr()))
            / &all_cycles_zerofier;

        // example for trace length n=64
        // =============================
        // all_cycles_zerofier              = (x - ω_0)(x - ω_16)(x - ω_32)(x - ω_48)
        // X - ω^(16*(n/16 - 1))           = x - ω^n/w^16 = x - 1/w_16 = x - w_48
        // (X - w_48) / all_cycles_zerofier = (x - ω_0)(x - ω_16)(x - ω_32)
        let last_cycle_zerofier =
            X - FieldConstant::Fp(g.pow([(CYCLE_HEIGHT * (n / CYCLE_HEIGHT - 1)) as u64]));
        let all_cycles_except_last_zerofier = &last_cycle_zerofier / &all_cycles_zerofier;

        // Updating the program counter
        // ============================
        // This is not as straight forward as the other constraints. Read section 9.5
        // Updating pc to understand.

        // from whitepaper `t0 = fPC_JNZ * dst`
        let cpu_update_registers_update_pc_tmp0 = (Auxiliary::Tmp0.curr()
            - Flag::PcJnz.curr() * Npc::MemDst.curr())
            * &all_cycles_except_last_zerofier;

        // From the whitepaper "To verify that we make a regular update if dst = 0, we
        // need an auxiliary variable, v (to fill the trace in the case dst != 0, set v
        // = dst^(−1)): `fPC_JNZ * (dst * v − 1) * (next_pc − (pc + instruction_size)) =
        // 0` NOTE: if fPC_JNZ=1 then `res` is "unused" and repurposed as our
        // temporary variable `v`. The value assigned to v is `dst^(−1)`.
        // NOTE: `t1 = t0 * v`
        let cpu_update_registers_update_pc_tmp1 = (Auxiliary::Tmp1.curr()
            - Auxiliary::Tmp0.curr() * RangeCheck::Res.curr())
            * &all_cycles_except_last_zerofier;

        // There are two constraints here bundled in one. The first is `t0 * (next_pc −
        // (pc + op1)) = 0` (ensures if dst != 0 a relative jump is made) and the second
        // is `(1−fPC_JNZ) * next_pc - (regular_update * (pc + instruction_size) +
        // fPC_JUMP_ABS * res + fPC_JUMP_REL * (pc + res)) = 0` (handles update except
        // for jnz). Note that due to the flag group constraints for PcUpdate if jnz=1
        // then the second constraint is trivially 0=0 and if jnz=0 then the first
        // constraint is trivially 0=0. For this reason we can bundle these constraints
        // into one.
        // TODO: fix padding bug
        let cpu_update_registers_update_pc_pc_cond_negative = ((&one - Flag::PcJnz.curr())
            * Npc::Pc.next()
            + Auxiliary::Tmp0.curr() * (Npc::Pc.next() - (Npc::Pc.curr() + Npc::MemOp1.curr()))
            - (&cpu_decode_flag_pc_update_regular_0 * &npc_reg_0
                + Flag::PcJumpAbs.curr() * RangeCheck::Res.curr()
                + Flag::PcJumpRel.curr() * (Npc::Pc.curr() + RangeCheck::Res.curr())))
            * &all_cycles_except_last_zerofier;

        // ensure `if dst == 0: pc + instruction_size == next_pc`
        let cpu_update_registers_update_pc_pc_cond_positive =
            ((Auxiliary::Tmp1.curr() - Flag::PcJnz.curr()) * (Npc::Pc.next() - npc_reg_0))
                * &all_cycles_except_last_zerofier;

        // Updating the allocation pointer
        // ===============================
        // TODO: seems fishy don't see how `next_ap = ap + fAP_ADD · res + fAP_ADD1 · 1
        // + fOPCODE_CALL · 2` meets the pseudo code in the whitepaper
        // Ok, it does kinda make sense. move the `opcode == 1` statement inside and
        // move the switch to the outside and it's more clear.
        let cpu_update_registers_update_ap_ap_update = (RangeCheck::Ap.next()
            - (RangeCheck::Ap.curr()
                + Flag::ApAdd.curr() * RangeCheck::Res.curr()
                + Flag::ApAdd1.curr()
                + Flag::OpcodeCall.curr() * &two))
            * &all_cycles_except_last_zerofier;

        // Updating the frame pointer
        // ==========================
        // This handles all fp update except the `op0 == pc + instruction_size`, `res =
        // dst` and `dst == fp` assertions.
        // TODO: fix padding bug
        let cpu_update_registers_update_fp_fp_update = (RangeCheck::Fp.next()
            - (&cpu_decode_fp_update_regular_0 * RangeCheck::Fp.curr()
                + Flag::OpcodeRet.curr() * Npc::MemDst.curr()
                + Flag::OpcodeCall.curr() * (RangeCheck::Ap.curr() + &two)))
            * &all_cycles_except_last_zerofier;

        // push registers to memory (see section 8.4 in the whitepaper).
        // These are essentially the assertions for assert `op0 == pc +
        // instruction_size` and `assert dst == fp`.
        let cpu_opcodes_call_push_fp = (Flag::OpcodeCall.curr()
            * (Npc::MemDst.curr() - RangeCheck::Fp.curr()))
            / &all_cycles_zerofier;
        let cpu_opcodes_call_push_pc = (Flag::OpcodeCall.curr()
            * (Npc::MemOp0.curr() - (Npc::Pc.curr() + Flag::Op1Imm.curr() + &one)))
            / &all_cycles_zerofier;

        // make sure all offsets are valid for the call opcode
        // ===================================================
        // checks `if opcode == OpcodeCall: assert off_dst = 2^15`
        // this is supplementary to the constraints above because
        // offsets are in the range [-2^15, 2^15) encoded using
        // biased representation
        let cpu_opcodes_call_off0 = (Flag::OpcodeCall.curr()
            * (RangeCheck::OffDst.curr() - &half_offset_size))
            / &all_cycles_zerofier;
        // checks `if opcode == OpcodeCall: assert off_op0 = 2^15 + 1`
        // TODO: why +1?
        let cpu_opcodes_call_off1 = (Flag::OpcodeCall.curr()
            * (RangeCheck::OffOp0.curr() - (&half_offset_size + &one)))
            / &all_cycles_zerofier;
        // TODO: I don't understand this one - Flag::OpcodeCall.curr() is 0 or 1. Why
        // not just replace `Flag::OpcodeCall.curr() + Flag::OpcodeCall.curr() +
        // &one + &one` with `4`
        let cpu_opcodes_call_flags = (Flag::OpcodeCall.curr()
            * (Flag::OpcodeCall.curr() + Flag::OpcodeCall.curr() + &one + &one
                - (Flag::DstReg.curr() + Flag::Op0Reg.curr() + &four)))
            / &all_cycles_zerofier;
        // checks `if opcode == OpcodeRet: assert off_dst = 2^15 - 2`
        // TODO: why -2 🤯? Instruction size?
        let cpu_opcodes_ret_off0 = (Flag::OpcodeRet.curr()
            * (RangeCheck::OffDst.curr() + &two - &half_offset_size))
            / &all_cycles_zerofier;
        // checks `if opcode == OpcodeRet: assert off_op1 = 2^15 - 1`
        // TODO: why -1?
        let cpu_opcodes_ret_off2 = (Flag::OpcodeRet.curr()
            * (RangeCheck::OffOp1.curr() + &one - &half_offset_size))
            / &all_cycles_zerofier;
        // checks `if OpcodeRet: assert PcJumpAbs=1, DstReg=1, Op1Fp=1, ResLogic=0`
        let cpu_opcodes_ret_flags = (Flag::OpcodeRet.curr()
            * (Flag::PcJumpAbs.curr()
                + Flag::DstReg.curr()
                + Flag::Op1Fp.curr()
                + &cpu_decode_flag_res_op1_0
                - &four))
            / &all_cycles_zerofier;
        // handles the "assert equal" instruction. Represents this pseudo code from the
        // whitepaper `assert res = dst`.
        let cpu_opcodes_assert_eq_assert_eq = (Flag::OpcodeAssertEq.curr()
            * (Npc::MemDst.curr() - RangeCheck::Res.curr()))
            / &all_cycles_zerofier;

        let first_row_zerofier = X - &one;

        // boundary constraint expression for initial registers
        let initial_ap = (RangeCheck::Ap.curr() - InitialAp.hint()) / &first_row_zerofier;
        let initial_fp = (RangeCheck::Fp.curr() - InitialAp.hint()) / &first_row_zerofier;
        let initial_pc = (Npc::Pc.curr() - InitialPc.hint()) / &first_row_zerofier;

        // boundary constraint expression for final registers
        let final_ap = (RangeCheck::Ap.curr() - FinalAp.hint()) / &last_cycle_zerofier;
        let final_fp = (RangeCheck::Fp.curr() - InitialAp.hint()) / &last_cycle_zerofier;
        let final_pc = (Npc::Pc.curr() - FinalPc.hint()) / &last_cycle_zerofier;

        // examples for trace length n=8
        // =============================
        // x^(n/2) - 1             = (x - ω_0)(x - ω_2)(x - ω_4)(x - ω_6)
        // x - ω^(2*(n/2 - 1))     = x - ω^n/w^2 = x - 1/w_2 = x - w_6
        // (x - w_6) / x^(n/2) - 1 = (x - ω_0)(x - ω_2)(x - ω_4)
        let every_second_row_zerofier = X.pow(n / 2) - &one;
        let second_last_row_zerofier = X - FieldConstant::Fp(g.pow([2 * (n as u64 / 2 - 1)]));
        let every_second_row_except_last_zerofier =
            &second_last_row_zerofier / &every_second_row_zerofier;

        // Memory access constraints
        // =========================
        // All these constraints make more sense once you understand how the permutation
        // column is calculated (look at get_ordered_memory_accesses()). Sections 9.8
        // and 9.7 of the Cairo paper justify these constraints.
        // memory permutation boundary constraint
        let memory_multi_column_perm_perm_init0 = ((MemoryPermutation::Z.challenge()
            - (Mem::Address.curr() + MemoryPermutation::A.challenge() * Mem::Value.curr()))
            * Permutation::Memory.curr()
            + Npc::Pc.curr()
            + MemoryPermutation::A.challenge() * Npc::Instruction.curr()
            - MemoryPermutation::Z.challenge())
            / &first_row_zerofier;
        // memory permutation transition constraint
        // NOTE: memory entries are stacked in the trace like so:
        // ┌─────┬───────────┬─────┐
        // │ ... │    ...    │ ... │
        // ├─────┼───────────┼─────┤
        // │ ... │ address 0 │ ... │
        // ├─────┼───────────┼─────┤
        // │ ... │  value 0  │ ... │
        // ├─────┼───────────┼─────┤
        // │ ... │ address 1 │ ... │
        // ├─────┼───────────┼─────┤
        // │ ... │  value 1  │ ... │
        // ├─────┼───────────┼─────┤
        // │ ... │    ...    │ ... │
        // └─────┴───────────┴─────┘
        let memory_multi_column_perm_perm_step0 = ((MemoryPermutation::Z.challenge()
            - (Mem::Address.next() + MemoryPermutation::A.challenge() * Mem::Value.next()))
            * Permutation::Memory.next()
            - (MemoryPermutation::Z.challenge()
                - (Npc::PubMemAddr.curr()
                    + MemoryPermutation::A.challenge() * Npc::PubMemVal.curr()))
                * Permutation::Memory.curr())
            * &every_second_row_except_last_zerofier;
        // Check the last permutation value to verify public memory
        let memory_multi_column_perm_perm_last =
            (Permutation::Memory.curr() - MemoryProduct.hint()) / &second_last_row_zerofier;
        // Constraint expression for memory/diff_is_bit
        // checks the address doesn't change or increases by 1
        // "Continuity" constraint in cairo whitepaper 9.7.2
        let memory_diff_is_bit = (&memory_address_diff_0 * &memory_address_diff_0
            - &memory_address_diff_0)
            * &every_second_row_except_last_zerofier;
        // if the address stays the same then the value stays the same
        // "Single-valued" constraint in cairo whitepaper 9.7.2.
        // cairo uses nondeterministic read-only memory so if the address is the same
        // the value should also stay the same.
        let memory_is_func = ((&memory_address_diff_0 - &one)
            * (Mem::Value.curr() - Mem::Value.next()))
            * &every_second_row_except_last_zerofier;
        // boundary condition stating the first memory address == 1
        let memory_initial_addr = (Mem::Address.curr() - &one) / &first_row_zerofier;
        // applies every 8 rows
        let every_eighth_row_zerofier = X.pow(n / 8) - &one;
        // Read cairo whitepaper section 9.8 as to why the public memory cells are 0.
        // The high level is that the way public memory works is that the prover is
        // forced (with these constraints) to exclude the public memory from one of
        // the permuration products. This means the running permuration column
        // terminates with more-or-less the permutation of just the public input. The
        // verifier can relatively cheaply calculate this terminal. The constraint for
        // this terminal is `memory_multi_column_perm_perm_last`.
        let public_memory_addr_zero = Npc::PubMemAddr.curr() / &every_eighth_row_zerofier;
        let public_memory_value_zero = Npc::PubMemVal.curr() / &every_eighth_row_zerofier;

        // examples for trace length n=16
        // =====================================
        // x^(n/4) - 1              = (x - ω_0)(x - ω_4)(x - ω_8)(x - ω_12)
        // x - ω^(4*(n/4 - 1))      = x - ω^n/w^4 = x - 1/w_4 = x - w_12
        // (x - w_12) / x^(n/4) - 1 = (x - ω_0)(x - ω_4)(x - ω_8)
        let every_fourth_row_zerofier = X.pow(n / 4) - &one;
        let fourth_last_row_zerofier = X - FieldConstant::Fp(g.pow([4 * (n as u64 / 4 - 1)]));
        let every_fourth_row_except_last_zerofier =
            &fourth_last_row_zerofier / &every_fourth_row_zerofier;

        // Range check constraints
        // =======================
        // Look at memory to understand the general approach to permutation.
        // More info in section 9.9 of the Cairo paper.
        let rc16_perm_init0 = ((RangeCheckPermutation::Z.challenge() - RangeCheck::Ordered.curr())
            * Permutation::RangeCheck.curr()
            + RangeCheck::OffDst.curr()
            - RangeCheckPermutation::Z.challenge())
            / &first_row_zerofier;
        let rc16_perm_step0 = ((RangeCheckPermutation::Z.challenge() - RangeCheck::Ordered.next())
            * Permutation::RangeCheck.next()
            - (RangeCheckPermutation::Z.challenge() - RangeCheck::OffOp1.curr())
                * Permutation::RangeCheck.curr())
            * &every_fourth_row_except_last_zerofier;
        let rc16_perm_last =
            (Permutation::RangeCheck.curr() - RangeCheckProduct.hint()) / &fourth_last_row_zerofier;
        // Check the value increases by 0 or 1
        let rc16_diff_is_bit =
            (&rc16_diff_0 * &rc16_diff_0 - &rc16_diff_0) * &every_fourth_row_except_last_zerofier;
        // Prover sends the minimim and maximum as a public input.
        // Verifier checks the RC min and max fall within [0, 2^16).
        let rc16_minimum =
            (RangeCheck::Ordered.curr() - RangeCheckMin.hint()) / &first_row_zerofier;
        let rc16_maximum =
            (RangeCheck::Ordered.curr() - RangeCheckMax.hint()) / &fourth_last_row_zerofier;

        // TODO: find out what diluted constraints are for. Might be starkex specific

        // Pedersen builtin
        // ================
        // pedersen/hash0/ec_subset_sum/bit_unpacking/last_one_is_zero
        // column8_row82 * (column3_row0 - (column3_row1 + column3_row1))

        // NOTE: for composition OODs only seem to involve one random per constraint
        vec![
            cpu_decode_opcode_rc_b,
            cpu_decode_opcode_rc_zero,
            cpu_decode_opcode_rc_input,
            cpu_decode_flag_op1_base_op0_bit,
            cpu_decode_flag_res_op1_bit,
            cpu_decode_flag_pc_update_regular_bit,
            cpu_decode_fp_update_regular_bit,
            cpu_operands_mem_dst_addr,
            cpu_operands_mem_op0_addr,
            cpu_operands_mem_op1_addr,
            cpu_operands_ops_mul,
            cpu_operands_res,
            cpu_update_registers_update_pc_tmp0,
            cpu_update_registers_update_pc_tmp1,
            cpu_update_registers_update_pc_pc_cond_negative,
            cpu_update_registers_update_pc_pc_cond_positive,
            cpu_update_registers_update_ap_ap_update,
            cpu_update_registers_update_fp_fp_update,
            cpu_opcodes_call_push_fp,
            cpu_opcodes_call_push_pc,
            cpu_opcodes_call_off0,
            cpu_opcodes_call_off1,
            cpu_opcodes_call_flags,
            cpu_opcodes_ret_off0,
            cpu_opcodes_ret_off2,
            cpu_opcodes_ret_flags,
            cpu_opcodes_assert_eq_assert_eq,
            initial_ap,
            initial_fp,
            initial_pc,
            final_ap,
            final_fp,
            final_pc,
            memory_multi_column_perm_perm_init0,
            memory_multi_column_perm_perm_step0,
            memory_multi_column_perm_perm_last,
            memory_diff_is_bit,
            memory_is_func,
            memory_initial_addr,
            public_memory_addr_zero,
            public_memory_value_zero,
            rc16_perm_init0,
            rc16_perm_step0,
            rc16_perm_last,
            rc16_diff_is_bit,
            rc16_minimum,
            rc16_maximum,
        ]
    }
}

#[derive(Clone, Copy)]
pub enum PublicInputHint {
    InitialAp,
    InitialPc,
    FinalAp,
    FinalPc,
    MemoryProduct, // TODO
    RangeCheckProduct,
    RangeCheckMin,
    RangeCheckMax,
}

impl Hint for PublicInputHint {
    fn index(&self) -> usize {
        *self as usize
    }
}

/// Symbolic memory permutation challenges
/// Note section 9.7.2 from Cairo whitepaper
/// (z − (address + α * value))
#[derive(Clone, Copy)]
pub enum MemoryPermutation {
    Z = 0, // =z
    A = 1, // =α
}

impl ministark::constraints::VerifierChallenge for MemoryPermutation {
    fn index(&self) -> usize {
        *self as usize
    }
}

/// Symbolic range check permutation challenges
/// Note section 9.7.2 from Cairo whitepaper
/// (z − value)
#[derive(Clone, Copy)]
pub enum RangeCheckPermutation {
    Z = 2, // =z
}

impl ministark::constraints::VerifierChallenge for RangeCheckPermutation {
    fn index(&self) -> usize {
        *self as usize
    }
}
