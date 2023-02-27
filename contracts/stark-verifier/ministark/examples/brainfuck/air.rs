use crate::tables;
use crate::tables::Challenge;
use crate::tables::EvaluationArgumentHint;
use crate::vm::compile;
use ark_ff::Field;
use ark_ff::One;
use ark_ff::Zero;
use ark_poly::EvaluationDomain;
use ark_poly::Radix2EvaluationDomain;
use ark_serialize::CanonicalDeserialize;
use ark_serialize::CanonicalSerialize;
use gpu_poly::fields::p18446744069414584321::Fp;
use gpu_poly::fields::p18446744069414584321::Fq3;
use ministark::challenges::Challenges;
use ministark::constraints::AlgebraicExpression;
use ministark::constraints::FieldConstant;
use ministark::constraints::Hint;
use ministark::constraints::VerifierChallenge;
use ministark::hints::Hints;
use ministark::Air;
use ministark::ProofOptions;
use ministark::TraceInfo;

#[derive(CanonicalSerialize, CanonicalDeserialize, Clone)]
pub struct ExecutionInfo {
    pub source_code: String,
    pub input: Vec<u8>,
    pub output: Vec<u8>,
}

pub struct BrainfuckAir {
    options: ProofOptions,
    trace_info: TraceInfo,
    execution_info: ExecutionInfo,
    constraints: Vec<AlgebraicExpression<Fp, Fq3>>,
}

impl Air for BrainfuckAir {
    type Fp = Fp;
    type Fq = Fq3;
    type PublicInputs = ExecutionInfo;

    fn new(trace_info: TraceInfo, execution_info: ExecutionInfo, options: ProofOptions) -> Self {
        use AlgebraicExpression::*;
        let one = FieldConstant::Fp(Fp::one());
        let trace_len = trace_info.trace_len;
        let trace_xs = Radix2EvaluationDomain::<Fp>::new(trace_len).unwrap();
        let first_trace_x = FieldConstant::Fp(trace_xs.element(0));
        let last_trace_x = FieldConstant::Fp(trace_xs.element(trace_len - 1));

        let transition_constraints = [
            tables::ProcessorBaseColumn::transition_constraints(),
            tables::ProcessorExtensionColumn::transition_constraints(),
            tables::MemoryBaseColumn::transition_constraints(),
            tables::MemoryExtensionColumn::transition_constraints(),
            tables::InstructionBaseColumn::transition_constraints(),
            tables::InstructionExtensionColumn::transition_constraints(),
            tables::InputExtensionColumn::transition_constraints(),
            tables::OutputExtensionColumn::transition_constraints(),
        ]
        .into_iter()
        .flatten()
        .map(|constraint| {
            // ensure constraints hold in all rows except the last
            // multiply by `(x - t_(n-1))` to remove the last term
            // NOTE: `x^trace_len - 1 = (x - t_0)(x - t_1)...(x - t_(n-1))`
            // NOTE: `t^(n-1) = t^(-1)`
            constraint * ((X - last_trace_x) / (X.pow(trace_len) - one))
        });

        let boundary_constraints = [
            tables::ProcessorBaseColumn::boundary_constraints(),
            tables::ProcessorExtensionColumn::boundary_constraints(),
            tables::MemoryBaseColumn::boundary_constraints(),
            tables::InstructionBaseColumn::boundary_constraints(),
            tables::InstructionExtensionColumn::boundary_constraints(),
            tables::InputExtensionColumn::boundary_constraints(),
            tables::OutputExtensionColumn::boundary_constraints(),
        ]
        .into_iter()
        .flatten()
        .map(|constraint| {
            // ensure constraint holds in the first row
            // symbolically divide `(x - t_0)`
            constraint / (X - first_trace_x)
        });

        let terminal_constraints = [
            tables::ProcessorExtensionColumn::terminal_constraints(),
            tables::InstructionExtensionColumn::terminal_constraints(),
            tables::InputExtensionColumn::terminal_constraints(),
            tables::OutputExtensionColumn::terminal_constraints(),
        ]
        .into_iter()
        .flatten()
        .map(|constraint| {
            // ensure constraint holds in the last row
            // symbolically divide `(x - t_(n-1))`
            // NOTE: `t^(n-1) = t^(-1)`
            constraint / (X - last_trace_x)
        });

        BrainfuckAir {
            options,
            trace_info,
            execution_info,
            constraints: transition_constraints
                .chain(boundary_constraints)
                .chain(terminal_constraints)
                .collect(),
        }
    }

    fn get_hints(&self, challenges: &Challenges<Self::Fq>) -> Hints<Self::Fq> {
        use Challenge::*;
        use EvaluationArgumentHint::*;

        let ExecutionInfo {
            source_code,
            input,
            output,
        } = &self.execution_info;
        let trace_len = self.trace_info().trace_len;

        let (input_eval_arg, input_eval_offset) =
            io_terminal_helper(input, challenges[Gamma.index()], trace_len);
        let (output_eval_arg, output_eval_offset) =
            io_terminal_helper(output, challenges[Delta.index()], trace_len);
        let instruction_eval_arg = compute_instruction_evaluation_argument(source_code, challenges);

        Hints::new(vec![
            (Instruction.index(), instruction_eval_arg),
            (Input.index(), input_eval_arg),
            (InputOffset.index(), input_eval_offset),
            (Output.index(), output_eval_arg),
            (OutputOffset.index(), output_eval_offset),
        ])
    }

    fn options(&self) -> &ProofOptions {
        &self.options
    }

    fn pub_inputs(&self) -> &Self::PublicInputs {
        &self.execution_info
    }

    fn constraints(&self) -> Vec<AlgebraicExpression<Self::Fp, Self::Fq>> {
        self.constraints.clone()
    }

    fn trace_info(&self) -> &TraceInfo {
        &self.trace_info
    }
}

// Computes the evaluation terminal for the instruction table
fn compute_instruction_evaluation_argument(source_code: &str, challenges: &Challenges<Fq3>) -> Fq3 {
    use Challenge::Eta;
    use Challenge::A;
    use Challenge::B;
    use Challenge::C;
    let mut program = compile(source_code);
    // add padding
    program.push(0);
    // let prev_ip = None;
    let mut acc = Fq3::zero();
    for (ip, curr_instr) in program.iter().copied().enumerate() {
        let next_instr = program.get(ip + 1).copied().unwrap_or(0);
        acc = acc * challenges[Eta.index()]
            + challenges[A.index()] * Fp::from(ip as u64)
            + challenges[B.index()] * Fp::from(curr_instr as u64)
            + challenges[C.index()] * Fp::from(next_instr as u64);
    }
    acc
}

// Computes the evaluation terminal for the input and output table
// output is of the form `(evaluatoin_argument, evaluation_offset)`
fn io_terminal_helper<F: Field>(symbols: &[u8], challenge: F, trace_len: usize) -> (F, F) {
    let mut acc = F::zero();
    for symbol in symbols {
        acc = challenge * acc + F::from(*symbol as u64);
    }
    let evaluation_argument = acc;
    // from BrainSTARK
    // In every additional row, the running evaluation variable is
    // multiplied by another `challenge` factor. So we multiply by
    // `challenge^(trace_len - num_symbols)` to get the value of
    // the evaluation terminal after all 2^k trace rows.
    let offset = challenge.pow([(trace_len - symbols.len()) as u64]);
    (evaluation_argument, offset)
}
