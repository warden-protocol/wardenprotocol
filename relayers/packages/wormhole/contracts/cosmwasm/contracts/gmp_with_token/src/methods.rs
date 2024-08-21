use crate::msg::{GatewayIbcTokenBridgePayload, InstantiateMsg};
use crate::state::{
    WormholeGatewayIbcConfig, ADMIN, CONTRACT_NAME, CONTRACT_VERSION, IBC_HOOKS_SENDER_PREFIX,
    WARDEN_PREFIX, WORMHOLE_CHAINS_EMITTERS, WORMHOLE_GATEWAY_IBC_CONFIG,
};
use bech32::{encode as bech32_encode, Bech32, Hrp};
use cosmwasm_std::{to_json_string, CosmosMsg, IbcMsg};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{Binary, DepsMut, Env, MessageInfo, Response, StdError, StdResult};
use cw2::set_contract_version;
use sha2::{Digest, Sha256};

pub fn execute_instantiate(deps: &mut DepsMut, msg: &InstantiateMsg) -> StdResult<Response> {
    let admin_addr = deps.api.addr_validate(&msg.admin)?;

    ADMIN.set(deps.branch(), Some(admin_addr))?;

    WORMHOLE_GATEWAY_IBC_CONFIG.save(
        deps.storage,
        &WormholeGatewayIbcConfig {
            channel_id: msg.wormhole_ibc_channel_id.clone(),
            sender: deps.api.addr_validate(&msg.wormhole_ibc_sender)?,
            recipient: deps.api.addr_validate(&msg.wormhole_ibc_recipient)?,
            timeout_sec: msg.wormhole_ibc_timeout_sec.clone(),
        },
    )?;

    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    Ok(Response::default().add_attribute("version", CONTRACT_VERSION))
}

pub fn execute_set_chain_emitter(
    deps: &mut DepsMut,
    info: &MessageInfo,
    chain_id: u16,
    emitter: &Binary,
) -> StdResult<Response> {
    ADMIN
        .assert_admin(deps.as_ref(), &info.sender)
        .map_err(|err| StdError::generic_err(err.to_string()))?;

    WORMHOLE_CHAINS_EMITTERS.save(deps.storage, chain_id, &emitter)?;

    Ok(Response::default())
}

pub fn execute_receive_message(
    deps: &DepsMut,
    info: &mut MessageInfo,
    env: &Env,
    message: &Binary,
) -> StdResult<Response> {
    // let parsed_vaa: ParsedVAA = query_verify_vaas(deps, env, None, vaa)?;

    // let expected_emitter = WORMHOLE_CHAINS_EMITTERS.load(deps.storage, parsed_vaa.emitter_chain)?;

    // if parsed_vaa.emitter_address != expected_emitter {
    //     return Err(StdError::generic_err("invalid emitter address"));
    // }

    // let payload = String::from_utf8(parsed_vaa.payload).expect("invalid utf8");

    let wormhole_gateway_ibc_config = WORMHOLE_GATEWAY_IBC_CONFIG.load(deps.storage)?;

    let payload = String::from_utf8(message.to_vec()).expect("invalid utf8");

    let expected_sender = derive_intermediate_sender(
        wormhole_gateway_ibc_config.channel_id.as_str(),
        wormhole_gateway_ibc_config.sender.as_str(),
    )?;

    if info.sender.clone().into_string() != expected_sender {
        return Err(StdError::generic_err(format!(
            "invalid sender {} != {}",
            info.sender, expected_sender
        )));
    }

    let res = Response::default()
        .add_attribute("action", "execute_receive_message")
        .add_attribute("message", payload);

    Ok(res)
}

pub fn execute_post_message(
    deps: &DepsMut,
    env: &Env,
    info: &mut MessageInfo,
    chain_id: u16,
    message: &Binary,
) -> StdResult<Response> {
    let wormhole_gateway_ibc_config = WORMHOLE_GATEWAY_IBC_CONFIG.load(deps.storage)?;
    let target_chain_emitter = WORMHOLE_CHAINS_EMITTERS.load(deps.storage, chain_id)?;

    let coin = match info.funds.pop() {
        Some(coin) => coin,
        None => return Err(StdError::generic_err("coin is missing")),
    };

    if !info.funds.is_empty() {
        return Err(StdError::generic_err("only one coin can be ibc trasferred"));
    }

    let ibc_timeout = env
        .block
        .time
        .plus_seconds(wormhole_gateway_ibc_config.timeout_sec)
        .into();

    let payload = to_json_string(&GatewayIbcTokenBridgePayload::GatewayTransferWithPayload {
        chain: chain_id,
        contract: target_chain_emitter,
        payload: message.clone(),
        nonce: 0,
    })?;

    let msg = CosmosMsg::Ibc(IbcMsg::Transfer {
        channel_id: wormhole_gateway_ibc_config.channel_id,
        to_address: wormhole_gateway_ibc_config.recipient.to_string(),
        amount: coin,
        timeout: ibc_timeout,
        memo: Some(payload.clone()),
    });

    let res = Response::new()
        .add_message(msg)
        .add_attribute("action", "execute_post_message")
        .add_attribute("chain_id", chain_id.to_string())
        .add_attribute("message", payload);

    Ok(res)
}

pub fn derive_intermediate_sender(channel: &str, original_sender: &str) -> StdResult<String> {
    let mut sha = Sha256::new();

    sha.update(IBC_HOOKS_SENDER_PREFIX.as_bytes());

    let th = sha.finalize_reset();

    sha.update(th);
    sha.update(format!("{}/{}", channel, original_sender).as_bytes());

    Ok(bech32_encode::<Bech32>(
        Hrp::parse(WARDEN_PREFIX).map_err(|error| StdError::generic_err(error.to_string()))?,
        sha.clone().finalize().as_slice(),
    )
    .map_err(|error| StdError::generic_err(error.to_string()))?)
}

pub fn prefixed_sha256(prefix: &str, address: &str) -> [u8; 32] {
    let mut hasher = Sha256::default();

    hasher.update(prefix.as_bytes());
    let prefix_hash = hasher.finalize();

    let mut hasher = Sha256::default();

    hasher.update(prefix_hash);
    hasher.update(address.as_bytes());

    hasher.finalize().into()
}
