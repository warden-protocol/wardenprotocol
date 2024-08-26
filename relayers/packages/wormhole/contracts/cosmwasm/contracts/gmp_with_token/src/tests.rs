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

#[test]
fn test_execute_post_message() {
    use crate::methods::execute_instantiate;
    use crate::methods::execute_post_message;
    use crate::methods::execute_set_chain_emitter;
    use crate::msg::GatewayIbcTokenBridgePayload;
    use crate::msg::InstantiateMsg;
    use cosmwasm_std::coins;
    use cosmwasm_std::testing::message_info;
    use cosmwasm_std::testing::mock_dependencies;
    use cosmwasm_std::testing::mock_env;
    use cosmwasm_std::to_json_string;
    use cosmwasm_std::Binary;
    use cosmwasm_std::CosmosMsg;
    use cosmwasm_std::IbcMsg;

    let mut deps = mock_dependencies();
    let env = mock_env();

    let message = Binary::from_base64("d2FyZGVuIHRlc3QgbWVzc2FnZQo=").unwrap();
    let admin = deps.api.addr_make("admin");
    let sender = deps.api.addr_make("sender");
    let wormhole_ibc_channel_id = "channel-1".to_string();
    let wormhole_ibc_recipient = deps.api.addr_make("wormhole_ibc_recipient");
    let wormhole_ibc_sender = deps.api.addr_make("wormhole_ibc_sender");
    let wormhole_ibc_timeout_sec = 123;
    let coin = coins(1000, "uward");
    let ibc_timeout = env.block.time.plus_seconds(wormhole_ibc_timeout_sec).into();
    let chain_id = 1;
    let chain_emitter = Binary::from(vec![1; 32]);
    let payload = to_json_string(&GatewayIbcTokenBridgePayload::GatewayTransferWithPayload {
        chain: chain_id,
        contract: chain_emitter.clone(),
        payload: message.clone(),
        nonce: 0,
    })
    .unwrap();

    let msg = InstantiateMsg {
        admin: String::from(admin.clone()),
        wormhole_ibc_recipient: wormhole_ibc_recipient.clone().into_string(),
        wormhole_ibc_sender: wormhole_ibc_sender.clone().into_string(),
        wormhole_ibc_channel_id: wormhole_ibc_channel_id.clone(),
        wormhole_ibc_timeout_sec: 123,
    };

    execute_instantiate(&mut deps.as_mut(), &msg).unwrap();

    execute_set_chain_emitter(
        &mut deps.as_mut(),
        &message_info(&admin, &[]),
        chain_id,
        &chain_emitter,
    )
    .unwrap();

    let response = execute_post_message(
        &mut deps.as_mut(),
        &env,
        &mut message_info(&sender, &coin.clone()),
        chain_id,
        &Binary::from_base64("d2FyZGVuIHRlc3QgbWVzc2FnZQo=").unwrap(),
    )
    .unwrap();

    assert_eq!(response.messages.len(), 1);
    assert_eq!(
        response.messages[0].msg,
        CosmosMsg::Ibc(IbcMsg::Transfer {
            channel_id: wormhole_ibc_channel_id,
            to_address: wormhole_ibc_recipient.clone().into_string(),
            amount: coin.get(0).unwrap().clone(),
            timeout: ibc_timeout,
            memo: Some(payload.clone())
        })
    );
}
