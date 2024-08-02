use cosmwasm_std::{
    from_slice,
    testing::{mock_dependencies, mock_env, mock_info, MockApi, MockQuerier, MockStorage},
    Coin, OwnedDeps, Response, Storage,
};
use cosmwasm_storage::to_length_prefixed;

use cw_wormhole::{
    contract::instantiate,
    msg::InstantiateMsg,
    state::{ConfigInfo, GuardianAddress, GuardianSetInfo, CONFIG_KEY},
};

static INITIALIZER: &str = "initializer";
static GOV_ADDR: &[u8] = b"GOVERNANCE_ADDRESS";

fn get_config_info<S: Storage>(storage: &S) -> ConfigInfo {
    let key = to_length_prefixed(CONFIG_KEY);
    let data = storage.get(&key).expect("data should exist");
    from_slice(&data).expect("invalid data")
}

fn do_init(guardians: &[GuardianAddress]) -> OwnedDeps<MockStorage, MockApi, MockQuerier> {
    let mut deps = mock_dependencies();
    let init_msg = InstantiateMsg {
        gov_chain: 0,
        gov_address: GOV_ADDR.into(),
        initial_guardian_set: GuardianSetInfo {
            addresses: guardians.to_vec(),
            expiration_time: 100,
        },
        guardian_set_expirity: 50,
        chain_id: 18,
        fee_denom: "uluna".to_string(),
    };
    let env = mock_env();
    let info = mock_info(INITIALIZER, &[]);
    let res: Response = instantiate(deps.as_mut(), env, info, init_msg).unwrap();
    assert_eq!(0, res.messages.len());

    // query the store directly
    assert_eq!(
        get_config_info(&deps.storage),
        ConfigInfo {
            guardian_set_index: 0,
            guardian_set_expirity: 50,
            gov_chain: 0,
            gov_address: GOV_ADDR.to_vec(),
            fee: Coin::new(0, "uluna"),
            chain_id: 18,
            fee_denom: "uluna".to_string(),
        }
    );
    deps
}

#[test]
fn init_works() {
    let guardians = [GuardianAddress {
        bytes: hex::decode("beFA429d57cD18b7F8A4d91A2da9AB4AF05d0FBe")
            .expect("Decoding failed")
            .into(),
    }];
    let _deps = do_init(&guardians);
}
