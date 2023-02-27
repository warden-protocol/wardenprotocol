#![feature(int_roundings)]

use ark_serialize::CanonicalDeserialize;
use ark_serialize::CanonicalSerialize;
use gpu_poly::fields::p3618502788666131213697322783095070105623107215331596699973092056135872020481::Fp;
use ark_ff::One;
use ministark::Air;
use ministark::ProofOptions;
use ministark::TraceInfo;
use ministark::constraints::AlgebraicExpression;
use crate::rescue::Rescue;

mod rescue;

#[derive(Clone, Copy, CanonicalSerialize, CanonicalDeserialize)]
struct RescueInfo {
    input: [Fp; 2],
    output: [Fp; 2],
}

struct RescueAir {
    options: ProofOptions,
    trace_info: TraceInfo,
    rescue_info: RescueInfo,
    constraints: Vec<AlgebraicExpression<Fp>>,
}

impl RescueAir {
    fn generate_constraints(_input: [Fp; 2]) -> Vec<AlgebraicExpression<Fp>> {
        // vec![0.curr() - input[0], 1.curr() - input[1]]
        todo!()
    }
}

impl Air for RescueAir {
    type Fp = Fp;
    type Fq = Fp;
    type PublicInputs = RescueInfo;

    fn new(trace_info: TraceInfo, rescue_info: RescueInfo, options: ProofOptions) -> Self {
        RescueAir {
            options,
            trace_info,
            rescue_info,
            constraints: Self::generate_constraints(rescue_info.input),
        }
    }

    fn constraints(&self) -> Vec<AlgebraicExpression<Fp>> {
        self.constraints.clone()
    }

    fn pub_inputs(&self) -> &RescueInfo {
        &self.rescue_info
    }

    fn trace_info(&self) -> &TraceInfo {
        &self.trace_info
    }

    fn options(&self) -> &ProofOptions {
        &self.options
    }
}

fn main() {
    let state_width = 4; /* =m */
    // TODO: this may not be accurate. Generate with Algorithm 7
    let rounds = 14; /* =N */
    let security_level = 256;
    let capacity = 2;
    let digest_size = 2;

    let mut hasher = Rescue::new(state_width, capacity, rounds, security_level, digest_size);
    hasher.update(Fp::one());
    hasher.update(Fp::one());
    let _output = hasher.finish();

    todo!("Rescue example is a WIP");
}
