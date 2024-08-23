#[test]
fn test_initialization() {
    use crate::contract::instantiate;
    use crate::msg::InstantiateMsg;
    use crate::state::ADMIN;
    use crate::state::WORMHOLE_GATEWAY_IBC_CONFIG;
    use cosmwasm_std::testing::message_info;
    use cosmwasm_std::testing::mock_dependencies;
    use cosmwasm_std::testing::MockApi;
    use cosmwasm_std::testing::{mock_env, MOCK_CONTRACT_ADDR};
    use cosmwasm_std::Addr;

    let mut deps = mock_dependencies();
    let mut env = mock_env();

    env.contract.address = Addr::unchecked(MOCK_CONTRACT_ADDR);
    deps.api = MockApi::default().with_prefix("warden");

    let admin = deps.api.addr_make("admin");
    let wormhole_ibc_channel_id = "channel-1".to_string();
    let wormhole_ibc_recipient = deps.api.addr_make("wormhole_ibc_recipient");
    let wormhole_ibc_sender = deps.api.addr_make("wormhole_ibc_sender");
    let wormhole_ibc_timeout_sec = 123;

    let msg = InstantiateMsg {
        admin: String::from(admin.clone()),
        wormhole_ibc_recipient: wormhole_ibc_recipient.clone().into_string(),
        wormhole_ibc_sender: wormhole_ibc_sender.clone().into_string(),
        wormhole_ibc_channel_id: wormhole_ibc_channel_id,
        wormhole_ibc_timeout_sec: 123,
    };

    instantiate(
        deps.as_mut(),
        mock_env(),
        message_info(&env.contract.address, &[]),
        msg,
    )
    .unwrap();

    let gateway_config = WORMHOLE_GATEWAY_IBC_CONFIG
        .load(deps.as_ref().storage)
        .unwrap();

    assert_eq!(
        String::from(ADMIN.get(deps.as_ref()).unwrap().unwrap()),
        String::from(admin)
    );
    assert_eq!(gateway_config.channel_id, "channel-1".to_string());
    assert_eq!(gateway_config.timeout_sec, wormhole_ibc_timeout_sec);
    assert_eq!(
        gateway_config.recipient,
        wormhole_ibc_recipient.into_string()
    );
    assert_eq!(gateway_config.sender, wormhole_ibc_sender.into_string());
}

#[test]
fn test_execute_set_chain_emitter() {
    use crate::methods::execute_set_chain_emitter;
    use crate::state::ADMIN;
    use crate::state::WORMHOLE_CHAINS_EMITTERS;
    use crate::ContractError;
    use cosmwasm_std::testing::{message_info, mock_dependencies};
    use cosmwasm_std::Addr;
    use cosmwasm_std::Binary;
    use cosmwasm_std::Response;

    let mut deps = mock_dependencies();
    ADMIN
        .set(deps.as_mut(), Some(Addr::unchecked("admin")))
        .unwrap();

    assert_eq!(
        execute_set_chain_emitter(
            &mut deps.as_mut(),
            &message_info(&Addr::unchecked("sender"), &[]),
            1,
            &Binary::from(vec![3, 2, 1])
        )
        .unwrap_err(),
        ContractError::Unauthorized {
            message: "Caller is not admin".to_string()
        }
    );

    assert_eq!(
        execute_set_chain_emitter(
            &mut deps.as_mut(),
            &message_info(&Addr::unchecked("admin"), &[]),
            1,
            &Binary::from(vec![1; 32])
        )
        .unwrap(),
        Response::default()
    );

    assert_eq!(
        WORMHOLE_CHAINS_EMITTERS
            .load(deps.as_ref().storage, 1)
            .unwrap(),
        [1; 32]
    );
}

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
