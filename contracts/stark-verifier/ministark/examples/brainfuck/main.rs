#![feature(allocator_api)]

use air::BrainfuckAir;
use ark_serialize::CanonicalDeserialize;
use ark_serialize::CanonicalSerialize;
use ministark::Proof;
use ministark::ProofOptions;
use ministark::Prover;
use ministark::Trace;
use std::fs;
use std::fs::File;
use std::io::Write;
use std::path::PathBuf;
use std::time::Instant;
use structopt::StructOpt;
use trace::BrainfuckTrace;
use vm::simulate;

mod air;
mod constraints;
mod prover;
mod tables;
mod trace;
mod vm;

#[derive(StructOpt, Debug)]
#[structopt(name = "BrainSTARK", about = "miniSTARK brainfuck prover and verifier")]
enum BrainfuckOptions {
    Prove {
        src: PathBuf,
        #[structopt(long, parse(from_os_str))]
        dst: PathBuf,
        #[structopt(long, default_value = "")]
        input: String,
    },
    Verify {
        src: PathBuf,
        #[structopt(long, parse(from_os_str))]
        proof: PathBuf,
        #[structopt(long, default_value = "")]
        input: String,
        #[structopt(long)]
        output: String,
    },
}

fn main() {
    // proof options for 128 bit security level
    let num_queries = 29;
    let lde_blowup_factor = 16;
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
    match BrainfuckOptions::from_args() {
        BrainfuckOptions::Prove { src, dst, input } => prove(options, src, input, dst),
        BrainfuckOptions::Verify {
            src,
            proof,
            input,
            output,
        } => verify(options, src, input, output, proof),
    }
}

fn prove(options: ProofOptions, source_code_path: PathBuf, input: String, output_path: PathBuf) {
    let source_code = fs::read_to_string(source_code_path).unwrap();
    let mut output = Vec::new();

    let now = Instant::now();
    let trace = simulate(source_code, &mut input.as_bytes(), &mut output);
    println!(
        "Generated execution trace (cols={}, rows={}) in {:.0?}",
        trace.base_columns().num_cols(),
        trace.base_columns().num_rows(),
        now.elapsed(),
    );
    println!(
        "Program output: \"{}\"",
        String::from_utf8(output.clone()).unwrap()
    );

    let prover = prover::BrainfuckProver::new(options);
    let proof = pollster::block_on(prover.generate_proof(trace));
    println!("Proof generated in: {:.0?}", now.elapsed());
    let proof = proof.unwrap();
    println!(
        "Proof security (conjectured): {}bit",
        proof.conjectured_security_level()
    );

    let mut proof_bytes = Vec::new();
    proof.serialize_compressed(&mut proof_bytes).unwrap();
    println!("Proof size: {:?}KB", proof_bytes.len() / 1024);
    let mut f = File::create(&output_path).unwrap();
    f.write_all(proof_bytes.as_slice()).unwrap();
    f.flush().unwrap();
    println!("Proof written to {}", output_path.as_path().display());
}

fn verify(
    options: ProofOptions,
    source_code_path: PathBuf,
    input: String,
    output: String,
    proof_path: PathBuf,
) {
    let source_code = fs::read_to_string(source_code_path).unwrap();
    let proof_bytes = fs::read(proof_path).unwrap();
    let proof: Proof<BrainfuckAir> = Proof::deserialize_compressed(proof_bytes.as_slice()).unwrap();
    assert_eq!(input.as_bytes(), proof.public_inputs.input);
    assert_eq!(output.as_bytes(), proof.public_inputs.output);
    assert_eq!(source_code, proof.public_inputs.source_code);
    assert_eq!(options, proof.options);

    let now = Instant::now();
    proof.verify().unwrap();
    println!("Proof verified in: {:?}", now.elapsed());
}
