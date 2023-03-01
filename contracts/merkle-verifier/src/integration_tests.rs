#[cfg(test)]
mod tests {
    use crate::helpers::CwContract;
    use crate::msg::InstantiateMsg;
    use cosmwasm_std::{Addr, Coin, Empty, Uint128};
    use cw_multi_test::{App, AppBuilder, Contract, ContractWrapper, Executor};
    use rs_merkle::{MerkleTree, MerkleProof, Hasher};
    use rs_merkle::algorithms::{Sha256, Bitcoin};
    use rs_merkle::proof_serializers::BitcoinProofSerializer;

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

        #[test]
        fn verify() {
            let (mut app, cw_contract) = proper_instantiate();

            let leaves: Vec<[u8; 32]> = ["a", "b", "c", "d", "e", "f"]
                .iter()
                .map(|x| Sha256::hash(x.as_bytes()))
                .collect();
            let merkle_tree = MerkleTree::<Bitcoin>::from_leaves(&leaves);
            let indices_to_prove = vec![3, 4];
            let leaves_to_prove = leaves.get(3..5).ok_or("can't get leaves to prove").unwrap();
            let merkle_root = merkle_tree
                .root()
                .ok_or("couldn't get the merkle root")
                .unwrap();
            println!("{:?}{:?}", leaves_to_prove, merkle_root);

            // let tree = MerkleTree::<Bitcoin>::new();
            // let other_tree: MerkleTree<Bitcoin> = MerkleTree::new();

            let proof_bytes: Vec<u8> = vec![
                46, 125, 44, 3, 169, 80, 122, 226, 101, 236, 245, 181, 53, 104, 133, 165, 51, 147, 162,
                2, 157, 36, 19, 148, 153, 114, 101, 161, 162, 90, 239, 198, 37, 47, 16, 200, 54, 16,
                235, 202, 26, 5, 156, 11, 174, 130, 85, 235, 162, 249, 91, 228, 209, 215, 188, 250,
                137, 215, 36, 138, 130, 217, 241, 17, 229, 160, 31, 238, 20, 224, 237, 92, 72, 113, 79,
                34, 24, 15, 37, 173, 131, 101, 181, 63, 151, 121, 247, 157, 196, 163, 215, 233, 57, 99,
                249, 74,
            ];

            let proof: MerkleProof<Bitcoin> = MerkleProof::deserialize::<BitcoinProofSerializer>(&proof_bytes).unwrap();

            match proof.verify(
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
