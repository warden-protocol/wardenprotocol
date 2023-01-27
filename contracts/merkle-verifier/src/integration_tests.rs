#[cfg(test)]
mod tests {
    use crate::helpers::CwContract;
    use crate::msg::InstantiateMsg;
    use base64::{engine::general_purpose::STANDARD, Engine};
    use cosmwasm_std::{Addr, Coin, Empty, Uint128};
    use cw_multi_test::{App, AppBuilder, Contract, ContractWrapper, Executor};
    use rs_merkle::{algorithms::Sha256, Hasher, MerkleProof, MerkleTree};
    use std::fs::File;
    use std::io::{BufReader, Read, Write};
    use winter_crypto::Digest;

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
            let (mut app, cw_contract) = proper_instantiate();

            let leaves: Vec<[u8; 32]> = ["a", "b", "c", "d", "e", "f"]
                .iter()
                .map(|x| Sha256::hash(x.as_bytes()))
                .collect();
            let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);
            let indices_to_prove = vec![3, 4];
            let leaves_to_prove = leaves.get(3..5).ok_or("can't get leaves to prove").unwrap();
            let merkle_root = merkle_tree
                .root()
                .ok_or("couldn't get the merkle root")
                .unwrap();

            println!("{:?}{:?}", leaves_to_prove, merkle_root);

            File::create("../merkle.proof")
                .unwrap()
                .write_all(
                    STANDARD
                        .encode(&merkle_tree.proof(&indices_to_prove).to_bytes())
                        .as_bytes(),
                )
                .unwrap();

            let f = File::open("../merkle.proof").unwrap();
            let mut reader = BufReader::new(f);
            let mut buffer = Vec::new();
            reader.read_to_end(&mut buffer).unwrap();

            match MerkleProof::<Sha256>::try_from(&STANDARD.decode(&buffer).unwrap()[..])
                .unwrap()
                .verify(
                    merkle_root,
                    &indices_to_prove,
                    leaves_to_prove,
                    leaves.len(),
                ) {
                true => {
                    let s = "\nMerkle proof successfully verified!\n";
                    println!("{}", s);
                }
                false => {
                    let s = "\nVerification failed!\n";
                    println!("{}", s);
                }
            };

            // let msg = ExecuteMsg::Verify {
            //     hash: program.hash().as_bytes().to_vec(),
            //     inputs: vec![],
            //     outputs: vec![outputs.stack().to_vec(), outputs.overflow_addrs().to_vec()],
            //     // proof: std::str::from_utf8(&proof.to_bytes()).unwrap().to_string()
            //     proof: std::str::from_utf8(&buffer).unwrap().to_string(),
            // };

            // let cosmos_msg = cw_contract.call(msg).unwrap();
            // app.execute(Addr::unchecked(USER), cosmos_msg).unwrap();
        }
    }
}
