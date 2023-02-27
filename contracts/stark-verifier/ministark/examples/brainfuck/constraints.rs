use crate::tables::Challenge;
use crate::tables::EvaluationArgumentHint;
use crate::tables::InputBaseColumn;
use crate::tables::InputExtensionColumn;
use crate::tables::InstructionBaseColumn;
use crate::tables::InstructionExtensionColumn;
use crate::tables::MemoryBaseColumn;
use crate::tables::MemoryExtensionColumn;
use crate::tables::OutputBaseColumn;
use crate::tables::OutputExtensionColumn;
use crate::tables::ProcessorBaseColumn;
use crate::tables::ProcessorExtensionColumn;
use crate::vm::OpCode;
use ark_ff::FftField;
use gpu_poly::GpuFftField;
use ministark::constraints::AlgebraicExpression;
use ministark::constraints::ExecutionTraceColumn;
use ministark::constraints::FieldConstant;
use ministark::constraints::Hint;
use ministark::constraints::VerifierChallenge;
use ministark::StarkExtensionOf;
use std::borrow::Borrow;

impl ProcessorBaseColumn {
    pub fn boundary_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use ProcessorBaseColumn::*;
        vec![
            Cycle.curr(),
            Ip.curr(),
            Mp.curr(),
            MemVal.curr(),
            MemValInv.curr(),
            Dummy.curr(),
        ]
    }

    pub fn transition_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use ProcessorBaseColumn::*;
        let one = FieldConstant::Fp(Fp::one());
        let two = one + one;
        let mem_val_is_zero = MemVal.curr() * MemValInv.curr() - one;
        let mut constraints = (None, None, None);

        use OpCode::*;
        for instr in OpCode::VALUES {
            // max degree: 4
            let mut instr_constraints = (None, None, None);

            match instr {
                IncrementPointer => {
                    instr_constraints.0 = Some(Ip.next() - Ip.curr() - one);
                    instr_constraints.1 = Some(Mp.next() - Mp.curr() - one);
                }
                DecrementPointer => {
                    instr_constraints.0 = Some(Ip.next() - Ip.curr() - one);
                    instr_constraints.1 = Some(Mp.next() - Mp.curr() + one);
                }
                Increment => {
                    instr_constraints.0 = Some(Ip.next() - Ip.curr() - one);
                    instr_constraints.1 = Some(Mp.next() - Mp.curr());
                    instr_constraints.2 = Some(MemVal.next() - MemVal.curr() - one);
                }
                Decrement => {
                    instr_constraints.0 = Some(Ip.next() - Ip.curr() - one);
                    instr_constraints.1 = Some(Mp.next() - Mp.curr());
                    instr_constraints.2 = Some(MemVal.next() - MemVal.curr() + one);
                }
                Write => {
                    instr_constraints.0 = Some(Ip.next() - Ip.curr() - one);
                    instr_constraints.1 = Some(Mp.next() - Mp.curr());
                }
                Read => {
                    instr_constraints.0 = Some(Ip.next() - Ip.curr() - one);
                    instr_constraints.1 = Some(Mp.next() - Mp.curr());
                    instr_constraints.2 = Some(MemVal.next() - MemVal.curr());
                }
                LoopBegin => {
                    instr_constraints.0 = Some(
                        MemVal.curr() * (Ip.next() - Ip.curr() - two)
                            + mem_val_is_zero.clone() * (Ip.next() - NextInstr.curr()),
                    );
                    instr_constraints.1 = Some(Mp.next() - Mp.curr());
                    instr_constraints.2 = Some(MemVal.next() - MemVal.curr());
                }
                LoopEnd => {
                    instr_constraints.0 = Some(
                        &mem_val_is_zero * (Ip.next() - Ip.curr() - two)
                            + MemVal.curr() * (Ip.next() - NextInstr.curr()),
                    );
                    instr_constraints.1 = Some(Mp.next() - Mp.curr());
                    instr_constraints.2 = Some(MemVal.next() - MemVal.curr());
                }
            }

            // max degree: 7
            let deselector = if_not_instr(instr, CurrInstr.curr());
            let update = |lhs, rhs| match (lhs, rhs) {
                (Some(lhs), Some(rhs)) => Some(lhs + &deselector * &rhs * CurrInstr.curr()),
                (None, Some(rhs)) => Some(&deselector * &rhs * CurrInstr.curr()),
                (v, _) => v,
            };

            // account for padding and deactivate all polynomials if curr instruction is 0
            constraints.0 = update(constraints.0, instr_constraints.0);
            constraints.1 = update(constraints.1, instr_constraints.1);
            constraints.2 = update(constraints.2, instr_constraints.2);
        }

        vec![
            constraints.0.unwrap(),
            constraints.1.unwrap(),
            constraints.2.unwrap(),
            // cycle independent constraints
            Cycle.next() - Cycle.curr() - one,
            MemVal.curr() * &mem_val_is_zero,
            MemValInv.curr() * &mem_val_is_zero,
            // dummy has to be zero or one
            (Dummy.next() - one) * Dummy.next(),
            // dummy indicates if the row is padding
            instr_zerofier(CurrInstr.curr()) * (Dummy.curr() - FieldConstant::Fp(Fp::one()))
                + CurrInstr.curr() * Dummy.curr(),
        ]
    }
}

impl ProcessorExtensionColumn {
    pub fn boundary_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use ProcessorExtensionColumn::*;
        vec![InputEvaluation.curr(), OutputEvaluation.curr()]
    }

    pub fn terminal_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use Challenge::Alpha;
        use Challenge::Beta;
        use Challenge::A;
        use Challenge::B;
        use Challenge::C;
        use ProcessorBaseColumn::*;
        use ProcessorExtensionColumn::*;
        let one = FieldConstant::Fp(Fp::one());
        vec![
            // instruction permutation:
            // 1. instruction and processor are not padding
            InstructionBaseColumn::CurrInstr.curr()
                * (Dummy.curr() - one)
                * (InstructionExtensionColumn::ProcessorPermutation.curr()
                    * (Alpha.challenge()
                        - A.challenge() * InstructionBaseColumn::Ip.curr()
                        - B.challenge() * InstructionBaseColumn::CurrInstr.curr()
                        - C.challenge() * InstructionBaseColumn::NextInstr.curr())
                    - InstructionPermutation.curr()
                        * (Alpha.challenge()
                            - A.challenge() * Ip.curr()
                            - B.challenge() * CurrInstr.curr()
                            - C.challenge() * NextInstr.curr()))
                // 2. instruction is padding but processor is not
                + instr_zerofier(InstructionBaseColumn::CurrInstr.curr())
                    * (Dummy.curr() - one)
                    * (InstructionExtensionColumn::ProcessorPermutation.curr()
                        - InstructionPermutation.curr()
                            * (Alpha.challenge()
                                - A.challenge() * Ip.curr()
                                - B.challenge() * CurrInstr.curr()
                                - C.challenge() * NextInstr.curr()))
                // 3. processor is padding but instruction is not
                + InstructionBaseColumn::CurrInstr.curr()
                    * Dummy.curr()
                    * (InstructionExtensionColumn::ProcessorPermutation.curr()
                        * (Alpha.challenge()
                            - A.challenge() * InstructionBaseColumn::Ip.curr()
                            - B.challenge() * InstructionBaseColumn::CurrInstr.curr()
                            - C.challenge() * InstructionBaseColumn::NextInstr.curr())
                        - InstructionPermutation.curr())
                // 4. processor and instruction are padding
                + instr_zerofier(InstructionBaseColumn::CurrInstr.curr())
                * Dummy.curr()
                * (InstructionExtensionColumn::ProcessorPermutation.curr()
                    - InstructionPermutation.curr()),
            // memory permutation:
            // 1. memory and processor are not padding
            (MemoryBaseColumn::Dummy.curr() - one)
                * (Dummy.curr() - one)
                * (MemoryExtensionColumn::Permutation.curr()
                    * (Beta.challenge()
                        - Challenge::D.challenge() * MemoryBaseColumn::Cycle.curr()
                        - Challenge::E.challenge() * MemoryBaseColumn::Mp.curr()
                        - Challenge::F.challenge() * MemoryBaseColumn::MemVal.curr())
                    - MemoryPermutation.curr()
                        * (Beta.challenge()
                            - Challenge::D.challenge() * Cycle.curr()
                            - Challenge::E.challenge() * Mp.curr()
                            - Challenge::F.challenge() * MemVal.curr()))
                // 2. memory table is padding but processor table is not
                + MemoryBaseColumn::Dummy.curr()
                    * (Dummy.curr() - one)
                    * (MemoryExtensionColumn::Permutation.curr()
                        - MemoryPermutation.curr()
                            * (Beta.challenge()
                                - Challenge::D.challenge() * Cycle.curr()
                                - Challenge::E.challenge() * Mp.curr()
                                - Challenge::F.challenge() * MemVal.curr()))
                // 3. processor is padding but memory table is not
                + (MemoryBaseColumn::Dummy.curr() - one)
                    * Dummy.curr()
                    * (MemoryExtensionColumn::Permutation.curr()
                        * (Beta.challenge()
                            - Challenge::D.challenge() * MemoryBaseColumn::Cycle.curr()
                            - Challenge::E.challenge() * MemoryBaseColumn::Mp.curr()
                            - Challenge::F.challenge() * MemoryBaseColumn::MemVal.curr())
                        - MemoryPermutation.curr())
                // 4. processor and instruction are padding
                + MemoryBaseColumn::Dummy.curr()
                    * Dummy.curr()
                    * (MemoryExtensionColumn::Permutation.curr() - MemoryPermutation.curr()),
            // input evaluation:
            InputEvaluation.curr() - EvaluationArgumentHint::Input.hint(),
            // output evaluation:
            OutputEvaluation.curr() - EvaluationArgumentHint::Output.hint(),
        ]
    }

    pub fn transition_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use Challenge::Alpha;
        use Challenge::Beta;
        use Challenge::Delta;
        use Challenge::Gamma;
        use Challenge::A;
        use Challenge::B;
        use Challenge::C;
        use ProcessorBaseColumn::*;
        use ProcessorExtensionColumn::*;

        vec![
            // running product for instruction table permutation
            CurrInstr.curr()
                * (InstructionPermutation.curr()
                    * (Alpha.challenge()
                        - A.challenge() * Ip.curr()
                        - B.challenge() * CurrInstr.curr()
                        - C.challenge() * NextInstr.curr())
                    - InstructionPermutation.next())
                + Dummy.curr() * (InstructionPermutation.curr() - InstructionPermutation.next()),
            // running product for memory table permutation
            CurrInstr.curr()
                * (MemoryPermutation.curr()
                    * (Beta.challenge()
                        - Challenge::D.challenge() * Cycle.curr()
                        - Challenge::E.challenge() * Mp.curr()
                        - Challenge::F.challenge() * MemVal.curr())
                    - MemoryPermutation.next())
                * Dummy.curr()
                * (MemoryPermutation.curr() - MemoryPermutation.next()),
            // running evaluation for input tape
            CurrInstr.curr()
                * if_not_instr(OpCode::Read, CurrInstr.curr())
                * (InputEvaluation.next()
                    - Gamma.challenge() * InputEvaluation.curr()
                    - MemVal.next())
                + if_instr(OpCode::Read, CurrInstr.curr())
                    * (InputEvaluation.next() - InputEvaluation.curr()),
            // running evaluation for output tape
            CurrInstr.curr()
                * if_not_instr(OpCode::Write, CurrInstr.curr())
                * (OutputEvaluation.next()
                    - OutputEvaluation.curr() * Delta.challenge()
                    - MemVal.curr())
                + if_instr(OpCode::Write, CurrInstr.curr())
                    * (OutputEvaluation.next() - OutputEvaluation.curr()),
        ]
    }
}

impl MemoryBaseColumn {
    pub fn boundary_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use MemoryBaseColumn::*;
        vec![Cycle.curr(), Mp.curr(), MemVal.curr()]
    }

    pub fn transition_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use MemoryBaseColumn::*;
        let one = FieldConstant::Fp(Fp::one());
        vec![
            // 1. memory pointer increases by one or zero
            // note: remember table is sorted by memory address
            (Mp.next() - Mp.curr() - one) * (Mp.next() - Mp.curr()),
            //
            // 2. the memory value changes only if (a.) the memory pointer does not increase or
            // (b.) the cycle count increases by one.These constraints are implied by 3.
            //
            // 3. if the memory pointer increases by one, then the memory value must be set to zero
            (Mp.next() - Mp.curr()) * MemVal.next(),
            // 4. dummy has to be zero or one
            (Dummy.next() - one) * Dummy.next(),
            // 5. if dummy is set the memory pointer can not change
            (Mp.next() - Mp.curr()) * Dummy.curr(),
            // 6. if dummy is set the memory value can not change
            (MemVal.next() - MemVal.curr()) * Dummy.curr(),
            // 7. if the memory pointer remains the same, then the cycle has to increase by one
            (Mp.next() - Mp.curr() - one) * (Cycle.next() - Cycle.curr() - one),
        ]
    }
}

impl MemoryExtensionColumn {
    pub fn transition_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use Challenge::Beta;
        use MemoryBaseColumn::*;
        use MemoryExtensionColumn::*;
        // Only progress permutation if dummy != 1
        vec![
            (Permutation.next()
                - Permutation.curr()
                    * (Beta.challenge()
                        - Challenge::D.challenge() * Cycle.curr()
                        - Challenge::E.challenge() * Mp.curr()
                        - Challenge::F.challenge() * MemVal.curr()))
                * (Dummy.curr() - FieldConstant::Fp(Fp::one()))
                + (Permutation.next() - Permutation.curr()) * Dummy.curr(),
        ]
    }
}

impl InstructionBaseColumn {
    pub fn boundary_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use InstructionBaseColumn::*;
        vec![Ip.curr()]
    }

    pub fn transition_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use InstructionBaseColumn::*;
        let one = FieldConstant::Fp(Fp::one());
        vec![
            // instruction pointer increases by 0 or 1
            (Ip.next() - Ip.curr() - one) * (Ip.next() - Ip.curr()),
            // if address increases the next instruction in the current row must equal the current
            // instruction in the next row
            // NOTE: redundant because it is implied by the evaluation argument
            // (Ip.next() - Ip.curr()) * (NextInstr.curr() - CurrInstr.next()),
            // if address is the same, then current instruction is also
            (Ip.next() - Ip.curr() - one) * (CurrInstr.next() - CurrInstr.curr()),
            // if address is the same, then next instruction is also
            (Ip.next() - Ip.curr() - one) * (NextInstr.next() - NextInstr.curr()),
            // dummy has to be zero or one
            // (Dummy.next() - one) * Dummy.next(),
            // // dummy indicates if the row should be included in the permutation argument
            // instr_zerofier(CurrInstr.curr()) * (Dummy.curr() - one)
            //     // + (Ip.curr() - Ip.next()) * (Dummy.curr() - one)
            //     // + CurrInstr.curr() * Dummy.curr(),
        ]
    }
}

impl InstructionExtensionColumn {
    pub fn boundary_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use Challenge::A;
        use Challenge::B;
        use Challenge::C;
        use InstructionBaseColumn::*;
        use InstructionExtensionColumn::*;
        vec![
            ProgramEvaluation.curr()
                - A.challenge() * Ip.curr()
                - B.challenge() * CurrInstr.curr()
                - C.challenge() * NextInstr.curr(),
        ]
    }

    pub fn terminal_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use InstructionExtensionColumn::*;
        vec![ProgramEvaluation.curr() - EvaluationArgumentHint::Instruction.hint()]
    }

    pub fn transition_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use Challenge::Alpha;
        use Challenge::Eta;
        use Challenge::A;
        use Challenge::B;
        use Challenge::C;
        use InstructionBaseColumn::*;
        use InstructionExtensionColumn::*;
        let one = FieldConstant::Fp(Fp::one());
        vec![
            // - processor permutation changes correctly if ip changes
            // - processor permutation doesn't change if `curr_instr=0` i.e. padding
            // - processor permutation doesn't change if `ip` stays the same
            CurrInstr.curr()
                * (Ip.curr() - Ip.next() + one)
                * (ProcessorPermutation.next()
                    - ProcessorPermutation.curr()
                        * (Alpha.challenge()
                            - A.challenge() * Ip.next()
                            - B.challenge() * CurrInstr.next()
                            - C.challenge() * NextInstr.next()))
                + instr_zerofier(CurrInstr.curr())
                    * (ProcessorPermutation.next() - ProcessorPermutation.curr())
                + (Ip.curr() - Ip.next())
                    * (ProcessorPermutation.curr() - ProcessorPermutation.next()),
            // - no evaluation change if `ip` remains the same
            // - evaluation change if `ip` changes
            (Ip.next() - Ip.curr() - one) * (ProgramEvaluation.next() - ProgramEvaluation.curr())
                + (Ip.next() - Ip.curr())
                    * (ProgramEvaluation.next()
                        - ProgramEvaluation.curr() * Eta.challenge()
                        - A.challenge() * Ip.next()
                        - B.challenge() * CurrInstr.next()
                        - C.challenge() * NextInstr.next()),
        ]
    }
}

impl InputExtensionColumn {
    pub fn boundary_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use InputBaseColumn::*;
        use InputExtensionColumn::*;
        vec![Evaluation.curr() - Value.curr()]
    }

    pub fn terminal_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use InputExtensionColumn::*;
        vec![
            Evaluation.curr()
                - EvaluationArgumentHint::Input.hint() * EvaluationArgumentHint::InputOffset.hint(),
        ]
    }

    pub fn transition_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use Challenge::Gamma;
        use InputBaseColumn::*;
        use InputExtensionColumn::*;
        vec![Evaluation.curr() * Gamma.challenge() + Value.next() - Evaluation.next()]
    }
}

impl OutputExtensionColumn {
    pub fn boundary_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use OutputBaseColumn::*;
        use OutputExtensionColumn::*;
        vec![Evaluation.curr() - Value.curr()]
    }

    pub fn terminal_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use OutputExtensionColumn::*;
        vec![
            Evaluation.curr()
                - EvaluationArgumentHint::Output.hint()
                    * EvaluationArgumentHint::OutputOffset.hint(),
        ]
    }

    pub fn transition_constraints<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    ) -> Vec<AlgebraicExpression<Fp, Fq>> {
        use Challenge::Delta;
        use OutputBaseColumn::*;
        use OutputExtensionColumn::*;
        vec![Evaluation.curr() * Delta.challenge() + Value.next() - Evaluation.next()]
    }
}

fn instr_zerofier<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    instr: impl Borrow<AlgebraicExpression<Fp, Fq>>,
) -> AlgebraicExpression<Fp, Fq> {
    OpCode::VALUES
        .into_iter()
        .map(|opcode| instr.borrow() - FieldConstant::Fp(Fp::from(opcode as u64)))
        .product()
}

/// returns a polynomial in X that evaluates to 0 in all instructions except
/// for one provided
fn if_not_instr<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    instr: OpCode,
    indeterminate: impl Borrow<AlgebraicExpression<Fp, Fq>>,
) -> AlgebraicExpression<Fp, Fq> {
    OpCode::VALUES
        .into_iter()
        .filter_map(|opcode| {
            if opcode != instr {
                Some(indeterminate.borrow() - FieldConstant::Fp(Fp::from(opcode as u64)))
            } else {
                None
            }
        })
        .product()
}

fn if_instr<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
    instr: OpCode,
    indeterminate: impl Borrow<AlgebraicExpression<Fp, Fq>>,
) -> AlgebraicExpression<Fp, Fq> {
    indeterminate.borrow() - FieldConstant::Fp(Fp::from(instr as u64))
}
