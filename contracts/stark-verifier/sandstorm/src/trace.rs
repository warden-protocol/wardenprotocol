use alloc::vec;
use alloc::vec::Vec;
use ark_ff::FftField;
use ark_ff::batch_inversion;
use gpu_poly::GpuFftField;
use ministark::TraceInfo;
use ministark::challenges::Challenges;
use strum_macros::EnumIter;
use gpu_poly::GpuVec;
use gpu_poly::prelude::PageAlignedAllocator;
use ministark::Matrix;
use gpu_poly::fields::p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp;
use ministark::StarkExtensionOf;
use ministark::Trace;
use ark_ff::Zero;
use ministark::constraints::AlgebraicExpression;
use ark_ff::One;
use ministark::constraints::ExecutionTraceColumn;
use strum::IntoEnumIterator;
use crate::air::CYCLE_HEIGHT;
use crate::air::MEMORY_STEP;
use crate::air::MemoryPermutation;
use crate::air::PUBLIC_MEMORY_STEP;
use crate::air::RANGE_CHECK_STEP;
use crate::air::RangeCheckPermutation;
use crate::binary::CompiledProgram;
use crate::binary::Memory;
use crate::binary::RegisterState;
use crate::binary::RegisterStates;
#[cfg(feature = "parallel")]
use rayon::prelude::*;
use core::iter::zip;
use core::ops::Deref;

pub struct ExecutionTrace {
    pub public_memory_padding_address: usize,
    pub public_memory_padding_value: Fp,
    pub range_check_min: usize,
    pub range_check_max: usize,
    pub public_memory: Vec<(usize, Fp)>,
    pub initial_registers: RegisterState,
    pub final_registers: RegisterState,
    _register_states: RegisterStates,
    _program: CompiledProgram,
    _mem: Memory,
    _flags_column: GpuVec<Fp>,
    npc_column: GpuVec<Fp>,
    memory_column: GpuVec<Fp>,
    range_check_column: GpuVec<Fp>,
    _auxiliary_column: GpuVec<Fp>,
    base_trace: Matrix<Fp>,
}

impl ExecutionTrace {
    pub fn new(mem: Memory, register_states: RegisterStates, program: CompiledProgram) -> Self {
        #[cfg(debug_assertions)]
        program.validate();

        let num_cycles = register_states.len();
        assert!(num_cycles.is_power_of_two());
        let trace_len = num_cycles * CYCLE_HEIGHT;
        assert!(trace_len >= TraceInfo::MIN_TRACE_LENGTH);
        let public_memory = program.get_public_memory();

        let mut flags_column = Vec::new_in(PageAlignedAllocator);
        flags_column.resize(trace_len, Fp::zero());

        let mut zeros_column = Vec::new_in(PageAlignedAllocator);
        zeros_column.resize(trace_len, Fp::zero());

        // set `padding_address == padding_value` to make filling the column easy
        // let public_memory_padding_address = public_memory_padding_address(&mem,
        // &register_states);
        let (public_memory_padding_address, public_memory_padding_value) =
            program.get_padding_address_and_value();
        let mut npc_column = Vec::new_in(PageAlignedAllocator);
        npc_column.resize(trace_len, public_memory_padding_value);

        let (ordered_rc_vals, ordered_rc_padding_vals) =
            ordered_range_check_values(num_cycles, &mem, &register_states);
        let range_check_min = *ordered_rc_vals.first().unwrap();
        let range_check_max = *ordered_rc_vals.last().unwrap();
        let range_check_padding_value = Fp::from(range_check_max as u64);
        let mut ordered_rc_vals = ordered_rc_vals.into_iter();
        let mut ordered_rc_padding_vals = ordered_rc_padding_vals.into_iter();
        let mut range_check_column = Vec::new_in(PageAlignedAllocator);
        range_check_column.resize(trace_len, range_check_padding_value);

        let mut auxiliary_column = Vec::new_in(PageAlignedAllocator);
        auxiliary_column.resize(trace_len, Fp::zero());

        let (range_check_cycles, _) = range_check_column.as_chunks_mut::<CYCLE_HEIGHT>();
        let (auxiliary_cycles, _) = auxiliary_column.as_chunks_mut::<CYCLE_HEIGHT>();
        let (npc_cycles, _) = npc_column.as_chunks_mut::<CYCLE_HEIGHT>();
        let (flag_cycles, _) = flags_column.as_chunks_mut::<CYCLE_HEIGHT>();

        ark_std::cfg_iter_mut!(range_check_cycles)
            .zip(auxiliary_cycles)
            .zip(npc_cycles)
            .zip(flag_cycles)
            .zip(register_states.deref())
            .for_each(
                |((((rc_cycle, aux_cycle), npc_cycle), flag_cycle), registers)| {
                    let &RegisterState { pc, ap, fp } = registers;
                    let word = mem[pc].unwrap();
                    debug_assert!(!word.get_flag(Flag::Zero));

                    // range check all offset values
                    let off_dst = (word.get_off_dst() as u64).into();
                    let off_op0 = (word.get_off_op0() as u64).into();
                    let off_op1 = (word.get_off_op1() as u64).into();
                    let dst_addr = (word.get_dst_addr(ap, fp) as u64).into();
                    let op0_addr = (word.get_op0_addr(ap, fp) as u64).into();
                    let op1_addr = (word.get_op1_addr(pc, ap, fp, &mem) as u64).into();
                    let dst = word.get_dst(ap, fp, &mem);
                    let op0 = word.get_op0(ap, fp, &mem);
                    let op1 = word.get_op1(pc, ap, fp, &mem);
                    let res = word.get_res(pc, ap, fp, &mem);
                    let tmp0 = word.get_tmp0(ap, fp, &mem);
                    let tmp1 = word.get_tmp1(pc, ap, fp, &mem);

                    // FLAGS
                    for flag in Flag::iter() {
                        flag_cycle[flag as usize] = word.get_flag_prefix(flag).into();
                    }

                    // NPC
                    npc_cycle[Npc::Pc as usize] = (pc as u64).into();
                    npc_cycle[Npc::Instruction as usize] = word.into();
                    npc_cycle[Npc::MemOp0Addr as usize] = op0_addr;
                    npc_cycle[Npc::MemOp0 as usize] = op0;
                    npc_cycle[Npc::MemDstAddr as usize] = dst_addr;
                    npc_cycle[Npc::MemDst as usize] = dst;
                    npc_cycle[Npc::MemOp1Addr as usize] = op1_addr;
                    npc_cycle[Npc::MemOp1 as usize] = op1;
                    for offset in (0..CYCLE_HEIGHT).step_by(PUBLIC_MEMORY_STEP) {
                        npc_cycle[offset + Npc::PubMemAddr as usize] = Fp::zero();
                        npc_cycle[offset + Npc::PubMemVal as usize] = Fp::zero();
                    }

                    // MEMORY
                    // handled after this loop

                    // RANGE CHECK
                    rc_cycle[RangeCheck::OffDst as usize] = off_dst;
                    rc_cycle[RangeCheck::Ap as usize] = (ap as u64).into();
                    rc_cycle[RangeCheck::OffOp1 as usize] = off_op1;
                    rc_cycle[RangeCheck::Op0MulOp1 as usize] = op0 * op1;
                    rc_cycle[RangeCheck::OffOp0 as usize] = off_op0;
                    rc_cycle[RangeCheck::Fp as usize] = (fp as u64).into();
                    rc_cycle[RangeCheck::Res as usize] = res;
                    // RangeCheck::Ordered and RangeCheck::Unused are handled after cycle padding

                    // COL8 - TODO: better name
                    aux_cycle[Auxiliary::Tmp0 as usize] = tmp0;
                    aux_cycle[Auxiliary::Tmp1 as usize] = tmp1;
                },
            );

        for cycle_offset in (0..trace_len).step_by(CYCLE_HEIGHT) {
            let rc_virtual_row = &mut range_check_column[cycle_offset..cycle_offset + CYCLE_HEIGHT];

            // overwrite the range check padding cell with remaining padding values
            // TODO: this might not be enough
            rc_virtual_row[RangeCheck::Unused as usize] =
                if let Some(val) = ordered_rc_padding_vals.next() {
                    // Last range check is currently unused so stuff in the padding values there
                    (val as u64).into()
                } else {
                    range_check_padding_value
                };

            // add remaining ordered range check values
            for offset in (0..CYCLE_HEIGHT).step_by(RANGE_CHECK_STEP) {
                rc_virtual_row[offset + RangeCheck::Ordered as usize] =
                    if let Some(val) = ordered_rc_vals.next() {
                        (val as u64).into()
                    } else {
                        range_check_padding_value
                    };
            }
        }

        // ensure range check values have been fully consumed
        assert!(ordered_rc_padding_vals.next().is_none());
        assert!(ordered_rc_vals.next().is_none());

        // generate the memory column by ordering memory accesses
        let memory_column = get_ordered_memory_accesses(trace_len, &npc_column, &program);

        let base_trace = Matrix::new(vec![
            flags_column.to_vec_in(PageAlignedAllocator),
            zeros_column.to_vec_in(PageAlignedAllocator),
            zeros_column.to_vec_in(PageAlignedAllocator),
            zeros_column.to_vec_in(PageAlignedAllocator),
            zeros_column.to_vec_in(PageAlignedAllocator),
            npc_column.to_vec_in(PageAlignedAllocator),
            memory_column.to_vec_in(PageAlignedAllocator),
            range_check_column.to_vec_in(PageAlignedAllocator),
            auxiliary_column.to_vec_in(PageAlignedAllocator),
        ]);

        let initial_registers = *register_states.first().unwrap();
        let final_registers = *register_states.last().unwrap();

        ExecutionTrace {
            public_memory_padding_address,
            public_memory_padding_value,
            range_check_min,
            range_check_max,
            public_memory,
            initial_registers,
            final_registers,
            npc_column,
            memory_column,
            range_check_column,
            base_trace,
            _flags_column: flags_column,
            _auxiliary_column: auxiliary_column,
            _mem: mem,
            _register_states: register_states,
            _program: program,
        }
    }
}

impl Trace for ExecutionTrace {
    const NUM_BASE_COLUMNS: usize = 9;
    const NUM_EXTENSION_COLUMNS: usize = 1;
    type Fp = Fp;
    type Fq = Fp;

    fn base_columns(&self) -> &Matrix<Self::Fp> {
        &self.base_trace
    }

    fn build_extension_columns(&self, challenges: &Challenges<Fp>) -> Option<Matrix<Fp>> {
        // TODO: multithread
        // Generate memory permutation product
        // ===================================
        // see distinction between (a', v') and (a, v) in the Cairo paper.
        let z = challenges[MemoryPermutation::Z];
        let alpha = challenges[MemoryPermutation::A];
        let program_order_accesses = self.npc_column.array_chunks::<MEMORY_STEP>();
        let address_order_accesses = self.memory_column.array_chunks::<MEMORY_STEP>();
        let mut mem_perm_numerators = Vec::new();
        let mut mem_perm_denominators = Vec::new();
        let mut numerator_acc = Fp::one();
        let mut denominator_acc = Fp::one();
        for (&[a, v], &[a_prime, v_prime]) in program_order_accesses.zip(address_order_accesses) {
            numerator_acc *= z - (a + alpha * v);
            denominator_acc *= z - (a_prime + alpha * v_prime);
            mem_perm_numerators.push(numerator_acc);
            mem_perm_denominators.push(denominator_acc);
        }
        batch_inversion(&mut mem_perm_denominators);

        // Generate range check permutation product
        // ========================================
        let z = challenges[RangeCheckPermutation::Z];
        let range_check_chunks = self.range_check_column.array_chunks::<RANGE_CHECK_STEP>();
        let mut rc_perm_numerators = Vec::new();
        let mut rc_perm_denominators = Vec::new();
        let mut numerator_acc = Fp::one();
        let mut denominator_acc = Fp::one();
        for chunk in range_check_chunks {
            numerator_acc *= z - chunk[RangeCheck::OffDst as usize];
            denominator_acc *= z - chunk[RangeCheck::Ordered as usize];
            rc_perm_numerators.push(numerator_acc);
            rc_perm_denominators.push(denominator_acc);
        }
        batch_inversion(&mut rc_perm_denominators);
        debug_assert!((numerator_acc / denominator_acc).is_one());

        let mut permutation_column = Vec::new_in(PageAlignedAllocator);
        permutation_column.resize(self.base_columns().num_rows(), Fp::zero());

        // Insert intermediate memory permutation results
        for (i, (n, d)) in zip(mem_perm_numerators, mem_perm_denominators).enumerate() {
            permutation_column[i * MEMORY_STEP + Permutation::Memory as usize] = n * d;
        }

        // Insert intermediate range check results
        for (i, (n, d)) in zip(rc_perm_numerators, rc_perm_denominators).enumerate() {
            permutation_column[i * RANGE_CHECK_STEP + Permutation::RangeCheck as usize] = n * d;
        }

        Some(Matrix::new(vec![permutation_column]))
    }
}

/// Cairo flag
/// https://eprint.iacr.org/2021/1063.pdf section 9
#[derive(Clone, Copy, EnumIter, PartialEq, Eq)]
pub enum Flag {
    // Group: [FlagGroup::DstReg]
    DstReg = 0,

    // Group: [FlagGroup::Op0]
    Op0Reg = 1,

    // Group: [FlagGroup::Op1Src]
    Op1Imm = 2,
    Op1Fp = 3,
    Op1Ap = 4,

    // Group: [FlagGroup::ResLogic]
    ResAdd = 5,
    ResMul = 6,

    // Group: [FlagGroup::PcUpdate]
    PcJumpAbs = 7,
    PcJumpRel = 8,
    PcJnz = 9,

    // Group: [FlagGroup::ApUpdate]
    ApAdd = 10,
    ApAdd1 = 11,

    // Group: [FlagGroup::Opcode]
    OpcodeCall = 12,
    OpcodeRet = 13,
    OpcodeAssertEq = 14,

    // 0 - padding to make flag cells a power-of-2
    Zero = 15,
}

impl ExecutionTraceColumn for Flag {
    fn index(&self) -> usize {
        0
    }

    fn offset<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
        cycle_offset: isize,
    ) -> AlgebraicExpression<Fp, Fq> {
        use AlgebraicExpression::Trace;
        // Get the individual bit (as opposed to the bit prefix)
        let col = self.index();
        let trace_offset = CYCLE_HEIGHT as isize * cycle_offset;
        let flag_offset = trace_offset + *self as isize;
        Trace(col, flag_offset) - (Trace(col, flag_offset + 1) + Trace(col, flag_offset + 1))
    }
}

// NPC? not sure what it means yet - next program counter?
// Trace column 5
// Perhaps control flow is a better name for this column
#[derive(Clone, Copy)]
pub enum Npc {
    // TODO: first word of each instruction?
    Pc = 0, // Program counter
    Instruction = 1,
    PubMemAddr = 2,
    PubMemVal = 3,
    MemOp0Addr = 4,
    MemOp0 = 5,
    MemDstAddr = 8,
    MemDst = 9,
    // NOTE: cycle cells 10 and 11 is occupied by PubMemAddr since the public memory step is 8.
    // This means it applies twice (2, 3) then (8+2, 8+3) within a single 16 row cycle.
    MemOp1Addr = 12,
    MemOp1 = 13,
}

impl ExecutionTraceColumn for Npc {
    fn index(&self) -> usize {
        5
    }

    fn offset<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
        offset: isize,
    ) -> AlgebraicExpression<Fp, Fq> {
        let step = match self {
            Npc::PubMemAddr | Npc::PubMemVal => PUBLIC_MEMORY_STEP,
            _ => CYCLE_HEIGHT,
        } as isize;
        let column = self.index();
        let trace_offset = step * offset + *self as isize;
        AlgebraicExpression::Trace(column, trace_offset)
    }
}

// Trace column 6 - memory
#[derive(Clone, Copy)]
pub enum Mem {
    // TODO = 0,
    Address = 0,
    Value = 1,
}

impl ExecutionTraceColumn for Mem {
    fn index(&self) -> usize {
        6
    }

    fn offset<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
        mem_offset: isize,
    ) -> AlgebraicExpression<Fp, Fq> {
        let column = self.index();
        let trace_offset = MEMORY_STEP as isize * mem_offset + *self as isize;
        AlgebraicExpression::Trace(column, trace_offset)
    }
}

// Trace column 7
#[derive(Clone, Copy)]
pub enum RangeCheck {
    OffDst = 0,
    Ordered = 2, // Stores ordered values for the range check
    Ap = 3,      // Allocation pointer (ap)
    // TODO 2
    OffOp1 = 4,
    // Ordered = 6 - trace step is 4
    Op0MulOp1 = 7, // =op0*op1
    OffOp0 = 8,
    // Ordered = 10 - trace step is 4
    Fp = 11,     // Frame pointer (fp)
    Unused = 12, // an unused range checked value (gets stuffed with padding)
    // Ordered = 14 - trace step is 4
    Res = 15,
}

impl ExecutionTraceColumn for RangeCheck {
    fn index(&self) -> usize {
        7
    }

    fn offset<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
        cycle_offset: isize,
    ) -> AlgebraicExpression<Fp, Fq> {
        let step = match self {
            RangeCheck::Ordered => RANGE_CHECK_STEP,
            _ => CYCLE_HEIGHT,
        } as isize;
        let column = self.index();
        let trace_offset = step * cycle_offset + *self as isize;
        AlgebraicExpression::Trace(column, trace_offset)
    }
}

// Auxiliary column 8
#[derive(Clone, Copy)]
pub enum Auxiliary {
    Tmp0 = 0,
    Tmp1 = 8,
}

impl ExecutionTraceColumn for Auxiliary {
    fn index(&self) -> usize {
        8
    }

    fn offset<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
        cycle_offset: isize,
    ) -> AlgebraicExpression<Fp, Fq> {
        let column = self.index();
        let trace_offset = CYCLE_HEIGHT as isize * cycle_offset + *self as isize;
        AlgebraicExpression::Trace(column, trace_offset)
    }
}

// Trace column 6 - permutations
#[derive(Clone, Copy)]
pub enum Permutation {
    // TODO = 0,
    Memory = 0,
    RangeCheck = 1,
}

impl ExecutionTraceColumn for Permutation {
    fn index(&self) -> usize {
        9
    }

    fn offset<Fp: GpuFftField + FftField, Fq: StarkExtensionOf<Fp>>(
        &self,
        offset: isize,
    ) -> AlgebraicExpression<Fp, Fq> {
        let column = self.index();
        let trace_offset = match self {
            Permutation::Memory => MEMORY_STEP as isize * offset + *self as isize,
            Permutation::RangeCheck => 4 * offset + *self as isize,
        };
        AlgebraicExpression::Trace(column, trace_offset)
    }
}

/// Returns the (unpadded) range check column values
/// Currently only offset (off_dst, off_op0, off_op1) are used
/// Output is of the form `(ordered_vals, padding_vals)`
fn ordered_range_check_values(
    num_cycles: usize,
    mem: &Memory,
    register_states: &RegisterStates,
) -> (Vec<usize>, Vec<usize>) {
    let mut res = Vec::new();
    for &RegisterState { pc, .. } in register_states.iter() {
        // TODO: this seems wasteful. Could combine with public_memory_padding_address?
        let word = mem[pc].unwrap();
        let cycle_rc_values = [word.get_off_dst(), word.get_off_op0(), word.get_off_op1()];
        res.push(cycle_rc_values);
    }

    // The trace is padded to a power-of-two by copying the trace rows of the last
    // cycle. These copied values need to be accounted for in the range check.
    res.resize(num_cycles, *res.last().unwrap());

    // Get the individual range check values in order
    let mut res = res.flatten().to_vec();
    res.sort();

    // range check values need to be continuos therefore any gaps
    // e.g. [..., 3, 4, 7, 8, ...] need to be filled with [5, 6] as padding.
    let mut padding = Vec::new();
    for &[a, b] in res.array_windows() {
        for v in a + 1..b {
            padding.push(v);
        }
    }

    // Add padding to the ordered vals (res)
    for v in &padding {
        res.push(*v);
    }

    // re-sort the values.
    // padding is already sorted.
    res.sort();

    (res, padding)
}

// TODO: support input, output and builtins
// Output is of the form `(ordered_mem_column, padding_vals)`
fn get_ordered_memory_accesses(
    trace_len: usize,
    npc_column: &[Fp],
    program: &CompiledProgram,
) -> Vec<Fp, PageAlignedAllocator> {
    // the number of cells allocated for the public memory
    let num_pub_mem_cells = trace_len / PUBLIC_MEMORY_STEP;
    let pub_mem = program.get_public_memory();
    let pub_mem_accesses = pub_mem.iter().map(|&(a, v)| [(a as u64).into(), v]);
    let (padding_address, padding_value) = program.get_padding_address_and_value();
    let padding_entry = [(padding_address as u64).into(), padding_value];

    // order all memory accesses by address
    // memory accesses are of the form [address, value]
    let mut ordered_accesses = npc_column
        .array_chunks()
        .copied()
        .chain((0..num_pub_mem_cells - pub_mem_accesses.len()).map(|_| padding_entry))
        .chain(pub_mem_accesses)
        .collect::<Vec<[Fp; MEMORY_STEP]>>();

    ordered_accesses.sort();

    // justification for this is explained in section 9.8 of the Cairo paper https://eprint.iacr.org/2021/1063.pdf.
    // SHARP requires the first address to start at address 1
    let (zeros, ordered_accesses) = ordered_accesses.split_at(num_pub_mem_cells);
    assert!(zeros.iter().all(|[a, v]| a.is_zero() && v.is_zero()));
    assert!(ordered_accesses[0][0].is_one());

    // check memory is "continuous" and "single valued"
    ordered_accesses
        .array_windows()
        .enumerate()
        .for_each(|(i, &[[a, v], [a_next, v_next]])| {
            assert!(
                (a == a_next && v == v_next) || a == a_next - Fp::one(),
                "mismatch at {i}: a={a}, v={v}, a_next={a_next}, v_next={v_next}"
            );
        });

    ordered_accesses.flatten().to_vec_in(PageAlignedAllocator)
}
