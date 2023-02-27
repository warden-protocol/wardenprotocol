#![feature(allocator_api)]

use ark_ff::One;
use ark_poly::EvaluationDomain;
use ark_poly::Radix2EvaluationDomain;
use ark_serialize::CanonicalSerialize;
use gpu_poly::allocator::PageAlignedAllocator;
use gpu_poly::fields::p18446744069414584321::Fp;
use ministark::constraints::AlgebraicExpression;
use ministark::constraints::ExecutionTraceColumn;
use ministark::constraints::FieldConstant;
use ministark::Air;
use ministark::Matrix;
use ministark::ProofOptions;
use ministark::Prover;
use ministark::Trace;
use ministark::TraceInfo;
use std::time::Instant;

struct FibTrace(Matrix<Fp>);

impl Trace for FibTrace {
    type Fp = Fp;
    type Fq = Fp;

    const NUM_BASE_COLUMNS: usize = 8;

    fn len(&self) -> usize {
        self.0.num_rows()
    }

    fn base_columns(&self) -> &Matrix<Self::Fp> {
        &self.0
    }
}

struct FibAir {
    options: ProofOptions,
    trace_info: TraceInfo,
    result: Fp,
    constraints: Vec<AlgebraicExpression<Fp>>,
}

impl FibAir {
    fn generate_boundary_constraints() -> Vec<AlgebraicExpression<Fp>> {
        let v0 = FieldConstant::Fp(Fp::one());
        let v1 = v0 + v0;
        let v2 = v0 * v1;
        let v3 = v1 * v2;
        let v4 = v2 * v3;
        let v5 = v3 * v4;
        let v6 = v4 * v5;
        let v7 = v5 * v6;

        vec![
            0.curr() - v0,
            1.curr() - v1,
            2.curr() - v2,
            3.curr() - v3,
            4.curr() - v4,
            5.curr() - v5,
            6.curr() - v6,
            7.curr() - v7,
        ]
    }

    fn generate_transition_constraints() -> Vec<AlgebraicExpression<Fp>> {
        vec![
            0.next() - 6.curr() * 7.curr(),
            1.next() - 7.curr() * 0.next(),
            2.next() - 0.next() * 1.next(),
            3.next() - 1.next() * 2.next(),
            4.next() - 2.next() * 3.next(),
            5.next() - 3.next() * 4.next(),
            6.next() - 4.next() * 5.next(),
            7.next() - 5.next() * 6.next(),
        ]
    }

    fn generate_terminal_constraints(result: Fp) -> Vec<AlgebraicExpression<Fp>> {
        vec![7.curr() - FieldConstant::Fp(result)]
    }
}

impl Air for FibAir {
    type Fp = Fp;
    type Fq = Fp;
    type PublicInputs = Fp;

    fn new(trace_info: TraceInfo, public_input: Fp, options: ProofOptions) -> Self {
        use AlgebraicExpression::*;
        let trace_len = trace_info.trace_len;
        let trace_xs = Radix2EvaluationDomain::<Fp>::new(trace_len).unwrap();
        // NOTE: =1
        let first_trace_x = FieldConstant::Fp(trace_xs.element(0));
        // NOTE: =trace_xs.group_gen_inv()
        let last_trace_x = FieldConstant::Fp(trace_xs.element(trace_len - 1));

        let boundary_constraints =
            Self::generate_boundary_constraints()
                .into_iter()
                .map(|constraint| {
                    // ensure constraint holds in the first row
                    // symbolically divide `(x - t_0)`
                    constraint / (X - first_trace_x)
                });

        let transition_constraints =
            Self::generate_transition_constraints()
                .into_iter()
                .map(|constraint| {
                    // ensure constraints hold in all rows except the last
                    // multiply by `(x - t_(n-1))` to remove the last term
                    // NOTE: `x^trace_len - 1 = (x - t_0)(x - t_1)...(x - t_(n-1))`
                    // NOTE: `t^(n-1) = t^(-1)`
                    constraint
                        * ((X - last_trace_x) / (X.pow(trace_len) - FieldConstant::Fp(Fp::one())))
                });

        let terminal_constraints = Self::generate_terminal_constraints(public_input)
            .into_iter()
            .map(|constraint| {
                // ensure constraint holds in the last row
                // symbolically divide `(x - t_0)`
                constraint / (X - last_trace_x)
            });

        FibAir {
            options,
            trace_info,
            result: public_input,
            constraints: boundary_constraints
                .chain(terminal_constraints)
                .chain(transition_constraints)
                .collect(),
        }
    }

    fn options(&self) -> &ProofOptions {
        &self.options
    }

    fn pub_inputs(&self) -> &Self::PublicInputs {
        &self.result
    }

    fn trace_info(&self) -> &TraceInfo {
        &self.trace_info
    }

    fn constraints(&self) -> Vec<AlgebraicExpression<Self::Fq>> {
        self.constraints.clone()
    }
}

struct FibProver(ProofOptions);

impl Prover for FibProver {
    type Fp = Fp;
    type Fq = Fp;
    type Air = FibAir;
    type Trace = FibTrace;

    fn new(options: ProofOptions) -> Self {
        FibProver(options)
    }

    fn options(&self) -> ProofOptions {
        self.0
    }

    fn get_pub_inputs(&self, trace: &FibTrace) -> <<Self as Prover>::Air as Air>::PublicInputs {
        // get the last item in the trace
        *trace.0[7].last().unwrap()
    }
}

fn gen_trace(n: usize) -> FibTrace {
    assert!(n.is_power_of_two());
    assert!(n > 8);

    let num_rows = n / 8;

    let mut col0 = Vec::with_capacity_in(num_rows, PageAlignedAllocator);
    let mut col1 = Vec::with_capacity_in(num_rows, PageAlignedAllocator);
    let mut col2 = Vec::with_capacity_in(num_rows, PageAlignedAllocator);
    let mut col3 = Vec::with_capacity_in(num_rows, PageAlignedAllocator);
    let mut col4 = Vec::with_capacity_in(num_rows, PageAlignedAllocator);
    let mut col5 = Vec::with_capacity_in(num_rows, PageAlignedAllocator);
    let mut col6 = Vec::with_capacity_in(num_rows, PageAlignedAllocator);
    let mut col7 = Vec::with_capacity_in(num_rows, PageAlignedAllocator);

    let mut v0 = Fp::one();
    let mut v1 = v0 + v0;
    let mut v2 = v0 * v1;
    let mut v3 = v1 * v2;
    let mut v4 = v2 * v3;
    let mut v5 = v3 * v4;
    let mut v6 = v4 * v5;
    let mut v7 = v5 * v6;

    for _ in 0..num_rows {
        col0.push(v0);
        col1.push(v1);
        col2.push(v2);
        col3.push(v3);
        col4.push(v4);
        col5.push(v5);
        col6.push(v6);
        col7.push(v7);

        v0 = v6 * v7;
        v1 = v7 * v0;
        v2 = v0 * v1;
        v3 = v1 * v2;
        v4 = v2 * v3;
        v5 = v3 * v4;
        v6 = v4 * v5;
        v7 = v5 * v6;
    }

    FibTrace(Matrix::new(vec![
        col0, col1, col2, col3, col4, col5, col6, col7,
    ]))
}

fn main() {
    let options = ProofOptions::new(32, 4, 8, 8, 64);
    let prover = FibProver::new(options);
    let now = Instant::now();
    let trace = gen_trace(1048576 * 32);
    println!("Trace generated in: {:?}", now.elapsed());

    let now = Instant::now();
    let proof = pollster::block_on(prover.generate_proof(trace)).unwrap();
    println!("Proof generated in: {:?}", now.elapsed());
    let mut proof_bytes = Vec::new();
    proof.serialize_compressed(&mut proof_bytes).unwrap();
    println!("Result: {:?}", proof_bytes.len());

    proof.verify().unwrap();
}
