#[cfg(test)]
mod tests {
    use crate::helpers::CwContract;
    use crate::msg::InstantiateMsg;
    use cosmwasm_std::{Addr, Coin, Empty, Uint128};
    use cw_multi_test::{App, AppBuilder, Contract, ContractWrapper, Executor};
    use rs_merkle::{
        algorithms::Bitcoin, proof_serializers::BitcoinProofSerializer, Hasher, MerkleProof,
        MerkleTree,
    };
    use std::fs::File;
    use std::io::{BufReader, Read, Write};

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

        #[test]
        fn verify() {
            let (mut _app, _cw_contract) = proper_instantiate();

            // BTC Block #125552
            let leaves: Vec<[u8; 32]> = [
                "51d37bdd871c9e1f4d5541be67a6ab625e32028744d7d4609d0c37747b40cd2d",
                "60c25dda8d41f8d3d7d5c6249e2ea1b05a25bf7ae2ad6d904b512b31f997e1a1",
                "01f314cdd8566d3e5dbdd97de2d9fbfbfd6873e916a00d48758282cbb81a45b9",
                "b519286a1040da6ad83c783eb2872659eaf57b1bec088e614776ffe7dc8f6d01",
            ]
            .iter()
            .map(|x| hex::decode(x).unwrap().try_into().unwrap())
            // .rev()
            .collect();

            let merkle_tree = MerkleTree::<Bitcoin>::from_leaves(&leaves);
            let indices_to_prove = vec![2, 3];
            let leaves_to_prove = leaves.get(2..4).ok_or("can't get leaves to prove").unwrap();
            let merkle_root = merkle_tree
                .root()
                .ok_or("couldn't get the merkle root")
                .unwrap();

            let merkle_root_manual = Bitcoin::concat_and_hash(
                &Bitcoin::concat_and_hash(&leaves[0], Some(&leaves[1])),
                Some(&Bitcoin::concat_and_hash(&leaves[2], Some(&leaves[3]))),
            );
            let merkle_root_expected: [u8; 32] =
                hex::decode("2b12fcf1b09288fcaff797d71e950e71ae42b91e8bdb2304758dfcffc2b620e3")
                    .unwrap()
                    .try_into()
                    .unwrap();

            println!("Merkle Root:          {}", hex::encode(merkle_root));
            println!(
                "Expected Root Actual: {}",
                hex::encode(merkle_root_expected)
            );
            println!("Expected Root Manual: {}", hex::encode(merkle_root_manual));

            File::create("../merkle.proof")
                .unwrap()
                .write_all(&merkle_tree.proof(&indices_to_prove).to_bytes())
                .unwrap();

            let f = File::open("../merkle.proof").unwrap();
            let mut reader = BufReader::new(f);
            let mut buffer = Vec::new();
            reader.read_to_end(&mut buffer).unwrap();

            let proof: MerkleProof<Bitcoin> =
                MerkleProof::deserialize::<BitcoinProofSerializer>(&buffer).unwrap();

            match proof.verify(
                merkle_root_manual, //merkle_root,
                &indices_to_prove,
                leaves_to_prove,
                leaves.len(),
            ) {
                true => {
                    let s = "\nMerkle proof successfully verified!\n";
                    println!("{}", s);
                }
                false => {
                    let s = "\nVerification of Merkle proof failed!\n";
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

            // let cosmos_msg = _cw_contract.call(msg).unwrap();
            // _app.execute(Addr::unchecked(USER), cosmos_msg).unwrap();
        }
    }
}
