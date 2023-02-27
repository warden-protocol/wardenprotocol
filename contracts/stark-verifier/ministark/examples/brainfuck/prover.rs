use crate::air::BrainfuckAir;
use crate::air::ExecutionInfo;
use crate::trace::BrainfuckTrace;
use gpu_poly::fields::p18446744069414584321::Fp;
use gpu_poly::fields::p18446744069414584321::Fq3;
use ministark::ProofOptions;
use ministark::Prover;

pub struct BrainfuckProver(ProofOptions);

impl Prover for BrainfuckProver {
    type Fp = Fp;
    type Fq = Fq3;
    type Air = BrainfuckAir;
    type Trace = BrainfuckTrace;

    fn new(options: ProofOptions) -> Self {
        BrainfuckProver(options)
    }

    fn options(&self) -> ProofOptions {
        self.0
    }

    fn get_pub_inputs(&self, trace: &BrainfuckTrace) -> ExecutionInfo {
        let meta = trace.meta();
        ExecutionInfo {
            source_code: meta.source_code.to_string(),
            input: meta.input.to_vec(),
            output: meta.output.to_vec(),
        }
    }
}
