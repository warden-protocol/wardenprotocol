pub trait BrainfuckColumn {
    const FIRST_TRACE_COL_INDEX: usize;
    const LAST_TRACE_COL_INDEX: usize;
    const NUM_TRACE_COLUMNS: usize = Self::LAST_TRACE_COL_INDEX - Self::FIRST_TRACE_COL_INDEX + 1;
}

#[derive(Clone, Copy)]
pub enum Challenge {
    A,
    B,
    C,
    D,
    E,
    F,
    Alpha,
    Beta,
    Gamma,
    Delta,
    Eta,
}

impl ministark::constraints::VerifierChallenge for Challenge {
    fn index(&self) -> usize {
        *self as usize
    }
}

#[derive(Clone, Copy)]
pub enum EvaluationArgumentHint {
    Instruction,
    Input,
    InputOffset,
    Output,
    OutputOffset,
}

impl ministark::constraints::Hint for EvaluationArgumentHint {
    fn index(&self) -> usize {
        *self as usize
    }
}

#[derive(Clone, Copy)]
pub enum ProcessorBaseColumn {
    Cycle,
    Ip, // instruction pointer
    CurrInstr,
    NextInstr,
    Mp, // memory pointer
    MemVal,
    MemValInv,
    Dummy, // indicate if a row is padding
}

#[derive(Clone, Copy)]
pub enum ProcessorExtensionColumn {
    InstructionPermutation, // 18
    MemoryPermutation,
    InputEvaluation,
    OutputEvaluation,
}

#[derive(Clone, Copy)]
pub enum MemoryBaseColumn {
    Cycle,
    Mp,
    MemVal,
    Dummy,
}

#[derive(Clone, Copy)]
pub enum MemoryExtensionColumn {
    Permutation,
}

#[derive(Clone, Copy)]
pub enum InstructionBaseColumn {
    Ip,
    CurrInstr, // 13
    NextInstr,
    // Dummy, // indicate if a row is padding
}

#[derive(Clone, Copy)]
pub enum InstructionExtensionColumn {
    ProcessorPermutation,
    ProgramEvaluation,
}

#[derive(Clone, Copy)]
pub enum InputBaseColumn {
    Value,
}

#[derive(Clone, Copy)]
pub enum InputExtensionColumn {
    Evaluation,
}

#[derive(Clone, Copy)]
pub enum OutputBaseColumn {
    Value,
}

#[derive(Clone, Copy)]
pub enum OutputExtensionColumn {
    Evaluation,
}

impl BrainfuckColumn for ProcessorBaseColumn {
    const FIRST_TRACE_COL_INDEX: usize = ProcessorBaseColumn::Cycle as usize;
    const LAST_TRACE_COL_INDEX: usize = ProcessorBaseColumn::Dummy as usize;
}

impl BrainfuckColumn for MemoryBaseColumn {
    const FIRST_TRACE_COL_INDEX: usize = ProcessorBaseColumn::LAST_TRACE_COL_INDEX + 1;
    const LAST_TRACE_COL_INDEX: usize = Self::FIRST_TRACE_COL_INDEX + Self::Dummy as usize;
}

impl BrainfuckColumn for InstructionBaseColumn {
    const FIRST_TRACE_COL_INDEX: usize = MemoryBaseColumn::LAST_TRACE_COL_INDEX + 1;
    const LAST_TRACE_COL_INDEX: usize = Self::FIRST_TRACE_COL_INDEX + Self::NextInstr as usize;
}

impl BrainfuckColumn for InputBaseColumn {
    const FIRST_TRACE_COL_INDEX: usize = InstructionBaseColumn::LAST_TRACE_COL_INDEX + 1;
    const LAST_TRACE_COL_INDEX: usize = Self::FIRST_TRACE_COL_INDEX + Self::Value as usize;
}

impl BrainfuckColumn for OutputBaseColumn {
    const FIRST_TRACE_COL_INDEX: usize = InputBaseColumn::LAST_TRACE_COL_INDEX + 1;
    const LAST_TRACE_COL_INDEX: usize = Self::FIRST_TRACE_COL_INDEX + Self::Value as usize;
}

impl BrainfuckColumn for ProcessorExtensionColumn {
    const FIRST_TRACE_COL_INDEX: usize = OutputBaseColumn::LAST_TRACE_COL_INDEX + 1;
    const LAST_TRACE_COL_INDEX: usize =
        Self::FIRST_TRACE_COL_INDEX + Self::OutputEvaluation as usize;
}

impl BrainfuckColumn for MemoryExtensionColumn {
    const FIRST_TRACE_COL_INDEX: usize = ProcessorExtensionColumn::LAST_TRACE_COL_INDEX + 1;
    const LAST_TRACE_COL_INDEX: usize = Self::FIRST_TRACE_COL_INDEX + Self::Permutation as usize;
}

impl BrainfuckColumn for InstructionExtensionColumn {
    const FIRST_TRACE_COL_INDEX: usize = MemoryExtensionColumn::LAST_TRACE_COL_INDEX + 1;
    const LAST_TRACE_COL_INDEX: usize =
        Self::FIRST_TRACE_COL_INDEX + Self::ProgramEvaluation as usize;
}

impl BrainfuckColumn for InputExtensionColumn {
    const FIRST_TRACE_COL_INDEX: usize = InstructionExtensionColumn::LAST_TRACE_COL_INDEX + 1;
    const LAST_TRACE_COL_INDEX: usize = Self::FIRST_TRACE_COL_INDEX + Self::Evaluation as usize;
}

impl BrainfuckColumn for OutputExtensionColumn {
    const FIRST_TRACE_COL_INDEX: usize = InputExtensionColumn::LAST_TRACE_COL_INDEX + 1;
    const LAST_TRACE_COL_INDEX: usize = Self::FIRST_TRACE_COL_INDEX + Self::Evaluation as usize;
}

macro_rules! impl_column {
    ($t:ty) => {
        impl ministark::constraints::ExecutionTraceColumn for $t {
            fn index(&self) -> usize {
                Self::FIRST_TRACE_COL_INDEX + *self as usize
            }
        }
    };
}

impl_column!(ProcessorBaseColumn);
impl_column!(ProcessorExtensionColumn);

impl_column!(MemoryBaseColumn);
impl_column!(MemoryExtensionColumn);

impl_column!(InstructionBaseColumn);
impl_column!(InstructionExtensionColumn);

impl_column!(InputBaseColumn);
impl_column!(InputExtensionColumn);

impl_column!(OutputBaseColumn);
impl_column!(OutputExtensionColumn);
