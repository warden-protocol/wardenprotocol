#[cfg(test)]
mod tests {
    use crate::helpers::CwContract;
    use crate::msg::InstantiateMsg;
    use cosmwasm_std::{Addr, Coin, Empty, Uint128};
    use cw_multi_test::{App, AppBuilder, Contract, ContractWrapper, Executor};

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
            result: "No verifications have yet been attempted.".to_string(),
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

            let msg = ExecuteMsg::Verify {
                program: std::str::from_utf8(&std::fs::read("../test.bin").unwrap()).unwrap().to_string(),
                proof: std::str::from_utf8(&std::fs::read("../b64cairo.proof").unwrap()).unwrap().to_string(),
            };

            let cosmos_msg = cw_template_contract.call(msg).unwrap();
            app.execute(Addr::unchecked(USER), cosmos_msg).unwrap();
        }
    }
}
