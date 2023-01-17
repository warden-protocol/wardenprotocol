#[cfg(test)]
mod tests {
    use crate::helpers::CwContract;
    use crate::msg::InstantiateMsg;
    use cosmwasm_std::{Addr, Coin, Empty, Uint128};
    use cw_multi_test::{App, AppBuilder, Contract, ContractWrapper, Executor};
    // use std::fs::File;
    // use std::io::BufReader;
    // use std::io::Read;

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
            result: "".to_string(),
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
            let (mut app, cw_template_contract) = proper_instantiate();

            // let f = File::open("../midenBTC.proof").unwrap();
            // let mut reader = BufReader::new(f);
            // let mut buffer = Vec::new();
            // reader.read_to_end(&mut buffer).unwrap();
            // let outputs = vec![vec![1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], vec![0, 276171]]

            let assembler = miden_assembly::Assembler::default();
            let source = "begin push.3 push.5 add end";
            let program = assembler.compile(source).unwrap();
            let (outputs, proof) = miden_prover::prove(
                &program,
                &miden_prover::ProgramInputs::none(),
                &miden_prover::ProofOptions::default(),
            )
            .unwrap();

            let msg = ExecuteMsg::Verify {
                hash: source.into(),
                inputs: vec![],
                outputs: vec![outputs.stack().to_vec(), outputs.overflow_addrs().to_vec()],
                proof: proof.to_bytes(),
            };

            let cosmos_msg = cw_template_contract.call(msg).unwrap();
            app.execute(Addr::unchecked(USER), cosmos_msg).unwrap();
        }
    }
}
