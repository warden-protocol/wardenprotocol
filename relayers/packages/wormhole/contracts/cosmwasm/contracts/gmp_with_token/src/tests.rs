// #[test]
// fn test_initialization() {
//     use crate::contract::instantiate;
//     use crate::msg::InstantiateMsg;
//     use crate::state::ADMIN;
//     use crate::state::WORMHOLE_CORE_CONTRACT;
//     use cosmwasm_std::testing::mock_dependencies;
//     use cosmwasm_std::testing::mock_info;
//     use cosmwasm_std::testing::MockApi;
//     use cosmwasm_std::testing::{mock_env, MOCK_CONTRACT_ADDR};
//     use cosmwasm_std::Addr;

//     let mut deps = mock_dependencies();
//     let mut env = mock_env();

//     env.contract.address = Addr::unchecked(MOCK_CONTRACT_ADDR);
//     deps.api = MockApi::default().with_prefix("warden");

//     let admin = deps.api.addr_make("admin");
//     let wormhole_core = deps.api.addr_make("mock_wormhole_core_bridge");

//     let msg = InstantiateMsg {
//         admin: String::from(admin.clone()),
//         wormhole_core: String::from(wormhole_core.clone()),
//         wormhole_ibc_channel_id:,
//         wormhole_ibc_contract:,
//         wormhole_ibc_timeout_sec:
//     };

//     instantiate(
//         deps.as_mut(),
//         mock_env(),
//         mock_info(MOCK_CONTRACT_ADDR, &[]),
//         msg,
//     )
//     .unwrap();

//     assert_eq!(
//         String::from(ADMIN.get(deps.as_ref()).unwrap().unwrap()),
//         String::from(admin)
//     );

//     assert_eq!(
//         String::from(WORMHOLE_CORE_CONTRACT.load(deps.as_ref().storage).unwrap()),
//         String::from(wormhole_core)
//     );
// }

// #[test]
// fn test_execute_set_chain_emitter() {
//     use crate::methods::execute_set_chain_emitter;
//     use crate::state::ADMIN;
//     use crate::state::WORMHOLE_CHAINS_EMITTERS;
//     use cosmwasm_std::testing::{mock_dependencies, mock_info};
//     use cosmwasm_std::Addr;
//     use cosmwasm_std::Binary;
//     use cosmwasm_std::Response;
//     use cosmwasm_std::StdError;

//     let mut deps = mock_dependencies();
//     ADMIN
//         .set(deps.as_mut(), Some(Addr::unchecked("admin")))
//         .unwrap();

//     assert_eq!(
//         execute_set_chain_emitter(
//             &mut deps.as_mut(),
//             &mock_info("sender", &[]),
//             1,
//             &Binary::from(vec![3, 2, 1])
//         )
//         .unwrap_err(),
//         StdError::generic_err("Caller is not admin")
//     );

//     assert_eq!(
//         execute_set_chain_emitter(
//             &mut deps.as_mut(),
//             &mock_info("admin", &[]),
//             1,
//             &Binary::from(vec![3, 2, 1])
//         )
//         .unwrap_err(),
//         StdError::invalid_data_size(32, 3)
//     );

//     assert_eq!(
//         execute_set_chain_emitter(
//             &mut deps.as_mut(),
//             &mock_info("admin", &[]),
//             1,
//             &Binary::from(vec![1; 32])
//         )
//         .unwrap(),
//         Response::default()
//     );

//     assert_eq!(
//         WORMHOLE_CHAINS_EMITTERS
//             .load(deps.as_ref().storage, 1)
//             .unwrap(),
//         [1; 32]
//     );
// }

// #[test]
// fn test_execute_post_message() {
//     use crate::methods::execute_post_message;
//     use crate::msg::WormholeExecuteMsg;
//     use crate::state::WORMHOLE_CORE_CONTRACT;
//     use cosmwasm_std::testing::mock_dependencies;
//     use cosmwasm_std::to_json_binary;
//     use cosmwasm_std::{Binary, CosmosMsg, WasmMsg};

//     let mut deps = mock_dependencies();
//     let wormhole_core = deps.api.addr_make("mock_wormhole_core_bridge");
//     let message = Binary::from_base64("d2FyZGVuIHRlc3QgbWVzc2FnZQo=").unwrap();

//     WORMHOLE_CORE_CONTRACT
//         .save(deps.as_mut().storage, &wormhole_core)
//         .unwrap();

//     let response = execute_post_message(&deps.as_mut(), 1, &message).unwrap();

//     assert_eq!(response.messages.len(), 1);
//     assert_eq!(
//         response.messages[0].msg,
//         CosmosMsg::Wasm(WasmMsg::Execute {
//             contract_addr: wormhole_core.into_string(),
//             funds: vec![],
//             msg: to_json_binary(&WormholeExecuteMsg::PostMessage {
//                 message: message.clone(),
//                 nonce: 1u32,
//             })
//             .unwrap()
//         })
//     );
// }

#[test]
fn test_execute_post_message() {
    use crate::methods::derive_intermediate_sender;
    use crate::methods::execute_post_message;
    use crate::msg::WormholeExecuteMsg;
    // use crate::state::WORMHOLE_CORE_CONTRACT;
    // use cosmwasm_std::testing::mock_dependencies;
    use cosmwasm_std::to_json_binary;
    use cosmwasm_std::{Binary, CosmosMsg, WasmMsg};

    let _asd =
        derive_intermediate_sender("channel-0", "juno12smx2wdlyttvyzvzg54y2vnqwq2qjatezqwqxu");
    let asd = derive_intermediate_sender("0", "juno12smx2wdlyttvyzvzg54y2vnqwq2qjatezqwqxu");
}
