#[cfg(test)]
mod tests {
    use crate::helpers::CwContract;
    use crate::msg::InstantiateMsg;
    // use base64::{engine::general_purpose::STANDARD, Engine};
    use ark_serialize::CanonicalDeserialize;
    use cosmwasm_std::{Addr, Coin, Empty, Uint128};
    use cw_multi_test::{App, AppBuilder, Contract, ContractWrapper, Executor};
    use ministark::Proof;
    use sandstorm::{air::CairoAir, binary::CompiledProgram};
    use std::fs::File;
    use std::io::{BufReader, Read, Write};
    // use serde::Serialize;

    pub fn contract_template() -> Box<dyn Contract<Empty>> {
        let contract = ContractWrapper::new(
            crate::contract::execute,
            crate::contract::instantiate,
            crate::contract::query,
        );
        Box::new(contract)
    }

    const USER: &str = "USER";
    const ADMIN: &str = "ADMIN";
    const NATIVE_DENOM: &str = "denom";

    fn mock_app() -> App {
        AppBuilder::new().build(|router, _, storage| {
            router
                .bank
                .init_balance(
                    storage,
                    &Addr::unchecked(USER),
                    vec![Coin {
                        denom: NATIVE_DENOM.to_string(),
                        amount: Uint128::new(1),
                    }],
                )
                .unwrap();
        })
    }

    fn proper_instantiate() -> (App, CwContract) {
        let mut app = mock_app();
        let code_id = app.store_code(contract_template());

        let msg = InstantiateMsg {
            result: "foo".to_string(),
        };
        let cw_contract_addr = app
            .instantiate_contract(code_id, Addr::unchecked(ADMIN), &msg, &[], "test", None)
            .unwrap();
        let cw_contract = CwContract(cw_contract_addr);
        (app, cw_contract)
    }

    mod verify {
        use super::*;
        use crate::msg::ExecuteMsg;

        #[test]
        fn verify() {
            // let (mut app, cw_template_contract) = proper_instantiate();

            // let assembler = miden_assembly::Assembler::default();
            // let source = "begin push.3 push.5 add end";
            // let program = assembler.compile(source).unwrap();

            // let (outputs, proof) = miden_prover::prove(
            //     &program,
            //     &miden_prover::ProgramInputs::none(),
            //     &miden_prover::ProofOptions::default(),
            // )
            // .unwrap();

            // let mut proof_file = File::create("../example.proof").unwrap();
            // proof_file
            //     .write_all(STANDARD.encode(&proof.to_bytes()).as_bytes())
            //     .unwrap();

            // let f = File::open("../example.proof").unwrap();
            // let mut reader = BufReader::new(f);
            // let mut buffer = Vec::new();
            // reader.read_to_end(&mut buffer).unwrap();

            // let msg = ExecuteMsg::Verify {
            //     hash: program.hash().as_bytes().to_vec(),
            //     inputs: vec![],
            //     outputs: vec![outputs.stack().to_vec(), outputs.overflow_addrs().to_vec()],
            //     // proof: std::str::from_utf8(&proof.to_bytes()).unwrap().to_string()
            //     proof: std::str::from_utf8(&buffer).unwrap().to_string(),
            // };

            // let cosmos_msg = cw_template_contract.call(msg).unwrap();
            // app.execute(Addr::unchecked(USER), cosmos_msg).unwrap();

            // let f = File::open("../test.json").unwrap();
            // let mut reader = BufReader::new(f);
            // let mut buffer = Vec::new();
            // reader.read_to_end(&mut buffer).unwrap();

            // let mut proof_file = File::create("../b64test.json").unwrap();
            // proof_file
            //     .write_all(STANDARD.encode(buffer).as_bytes())
            //     .unwrap();

            let program_file = File::open("../test.json").expect("could not open program file");
            let program: CompiledProgram = serde_json::from_reader(program_file).unwrap();
            let encoded_program: Vec<u8> = bincode::serialize(&program).unwrap();

            // let proof_file = File::open("../cairo.proof").expect("could not open proof file");
            let proof_bytes = std::fs::read("../cairo.proof").unwrap();
            let proof: Proof<CairoAir> =
                Proof::deserialize_compressed(proof_bytes.as_slice()).unwrap();
            let public_inputs = &proof.public_inputs;
            assert_eq!(program.get_public_memory(), public_inputs.public_memory);
            // let encoded_proof: Vec<u8> = bincode::serialize(&proof).unwrap();
            let encoded_proof: Vec<u8> = proof.into();

            let mut output = File::create("../proof.bin").unwrap();
            output.write_all(&encoded_proof).unwrap();
        }
    }
}
