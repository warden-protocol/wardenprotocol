use ark_serialize::CanonicalDeserialize;
use ark_serialize::CanonicalSerialize;
// use more performant global allocator
#[cfg(not(target_env = "msvc"))]
use jemallocator::Jemalloc;
use ministark::Proof;
use ministark::ProofOptions;
use ministark::Prover;
use ministark::Trace;
use sandstorm::air::CairoAir;
use sandstorm::binary::CompiledProgram;
use sandstorm::binary::Memory;
use sandstorm::binary::RegisterStates;
use sandstorm::prover::CairoProver;
use sandstorm::trace::ExecutionTrace;
use std::fs;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;
use std::time::Instant;
use structopt::StructOpt;

#[cfg(not(target_env = "msvc"))]
#[global_allocator]
static GLOBAL: Jemalloc = Jemalloc;

#[derive(StructOpt, Debug)]
#[structopt(name = "sandstorm", about = "cairo prover")]
enum SandstormOptions {
    Prove {
        #[structopt(long, parse(from_os_str))]
        program: PathBuf,
        #[structopt(long, parse(from_os_str))]
        trace: PathBuf,
        #[structopt(long, parse(from_os_str))]
        memory: PathBuf,
        #[structopt(long, parse(from_os_str))]
        output: PathBuf,
    },
    Verify {
        #[structopt(long, parse(from_os_str))]
        program: PathBuf,
        #[structopt(long, parse(from_os_str))]
        proof: PathBuf,
    },
}

fn main() {
    // TODO:
    // proof options for 95 bit security level
    let num_queries = 20;
    let lde_blowup_factor = 4;
    let grinding_factor = 16;
    let fri_folding_factor = 8;
    let fri_max_remainder_size = 64;
    let options = ProofOptions::new(
        num_queries,
        lde_blowup_factor,
        grinding_factor,
        fri_folding_factor,
        fri_max_remainder_size,
    );

    // read command-line args
    match SandstormOptions::from_args() {
        SandstormOptions::Prove {
            program,
            trace,
            memory,
            output,
        } => prove(options, &program, &trace, &memory, &output),
        SandstormOptions::Verify { program, proof } => verify(options, &program, &proof),
    }
}

fn verify(options: ProofOptions, program_path: &PathBuf, proof_path: &PathBuf) {
    let program_file = File::open(program_path).expect("could not open program file");
    let program: CompiledProgram = serde_json::from_reader(program_file).unwrap();
    let proof_bytes = fs::read(proof_path).unwrap();
    let proof: Proof<CairoAir> = Proof::deserialize_compressed(proof_bytes.as_slice()).unwrap();
    let public_inputs = &proof.public_inputs;
    assert_eq!(program.get_public_memory(), public_inputs.public_memory);
    assert_eq!(options, proof.options);

    let now = Instant::now();
    proof.verify().unwrap();
    println!("Proof verified in: {:?}", now.elapsed());
}

fn prove(
    options: ProofOptions,
    program_path: &PathBuf,
    trace_path: &PathBuf,
    memory_path: &PathBuf,
    output_path: &PathBuf,
) {
    let now = Instant::now();

    let trace_file = File::open(trace_path).expect("could not open trace file");
    let register_states = RegisterStates::from_reader(trace_file);

    let program_file = File::open(program_path).expect("could not open program file");
    let program = serde_json::from_reader(program_file).unwrap();

    let memory_file = File::open(memory_path).expect("could not open memory file");
    let memory = Memory::from_reader(memory_file);

    let execution_trace = ExecutionTrace::new(memory, register_states, program);
    println!(
        "Generated execution trace (cols={}, rows={}) in {:.0?}",
        execution_trace.base_columns().num_cols(),
        execution_trace.base_columns().num_rows(),
        now.elapsed(),
    );

    let prover = CairoProver::new(options);
    let now = Instant::now();
    let proof = pollster::block_on(prover.generate_proof(execution_trace)).unwrap();
    println!("Proof generated in: {:?}", now.elapsed());
    println!(
        "Proof security (conjectured): {}bit",
        proof.conjectured_security_level()
    );

    let mut proof_bytes = Vec::new();
    proof.serialize_compressed(&mut proof_bytes).unwrap();
    println!("Proof size: {:?}KB", proof_bytes.len() / 1024);
    let mut f = File::create(output_path).unwrap();
    f.write_all(proof_bytes.as_slice()).unwrap();
    f.flush().unwrap();
    println!("Proof written to {}", output_path.as_path().display());
}
