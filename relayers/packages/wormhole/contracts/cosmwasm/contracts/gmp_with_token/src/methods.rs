use crate::msg::{GatewayIbcTokenBridgePayload, InstantiateMsg, MsgReplyId, PostMessageResponse};
use crate::state::{
    PostMessageIbcTransfer, PostMessageReply, PostMessageStatus, WormholeGatewayIbcConfig, ADMIN,
    CONTRACT_NAME, CONTRACT_VERSION, IBC_HOOKS_SENDER_PREFIX, POST_MESSAGE_INFLIGHT,
    POST_MESSAGE_RECOVERY, POST_MESSAGE_REPLY, WARDEN_PREFIX, WORMHOLE_CHAINS_EMITTERS,
    WORMHOLE_GATEWAY_IBC_CONFIG,
};
use crate::ContractError;
use bech32::{encode as bech32_encode, Bech32, Hrp};
use cosmwasm_std::{
    coins, to_json_string, BankMsg, CosmosMsg, IbcMsg, Reply, SubMsg, SubMsgResult,
};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{Binary, DepsMut, Env, MessageInfo, Response};
use cw2::set_contract_version;
use prost::Message;
use sha2::{Digest, Sha256};

pub fn execute_instantiate(
    deps: &mut DepsMut,
    msg: &InstantiateMsg,
) -> Result<Response, ContractError> {
    let admin_addr = deps.api.addr_validate(&msg.admin)?;

    ADMIN.set(deps.branch(), Some(admin_addr))?;

    WORMHOLE_GATEWAY_IBC_CONFIG.save(
        deps.storage,
        &WormholeGatewayIbcConfig {
            channel_id: msg.wormhole_ibc_channel_id.clone(),
            sender: deps.api.addr_validate(&msg.wormhole_ibc_sender)?,
            recipient: deps.api.addr_validate(&msg.wormhole_ibc_recipient)?,
            timeout_sec: msg.wormhole_ibc_timeout_sec,
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
) -> Result<Response, ContractError> {
    ADMIN
        .assert_admin(deps.as_ref(), &info.sender)
        .map_err(|err| ContractError::SetChainEmittorFailed {
            message: err.to_string(),
        })?;

    WORMHOLE_CHAINS_EMITTERS.save(deps.storage, chain_id, emitter)?;

    Ok(Response::default())
}

pub fn execute_receive_message(
    deps: &DepsMut,
    info: &mut MessageInfo,
    message: &Binary,
) -> Result<Response, ContractError> {
    let wormhole_gateway_ibc_config = WORMHOLE_GATEWAY_IBC_CONFIG.load(deps.storage)?;

    let expected_sender = derive_intermediate_sender(
        wormhole_gateway_ibc_config.channel_id.as_str(),
        wormhole_gateway_ibc_config.sender.as_str(),
    )?;

    if info.sender.clone().into_string() != expected_sender {
        return Err(ContractError::ReceiveMessageFailed {
            message: format!("invalid sender {} != {}", info.sender, expected_sender),
        });
    }

    let res = Response::default()
        .add_attribute("action", "execute_receive_message")
        .add_attribute("message", to_json_string(message)?);

    Ok(res)
}

pub fn execute_post_message(
    deps: &mut DepsMut,
    env: &Env,
    info: &mut MessageInfo,
    chain_id: u16,
    message: &Binary,
) -> Result<Response, ContractError> {
    let wormhole_gateway_ibc_config = WORMHOLE_GATEWAY_IBC_CONFIG.load(deps.storage)?;
    let target_chain_emitter = WORMHOLE_CHAINS_EMITTERS.load(deps.storage, chain_id)?;
    let reply = POST_MESSAGE_REPLY.may_load(deps.storage)?;

    let coin = cw_utils::one_coin(info).map_err(|error| ContractError::PostMessageFailed {
        message: error.to_string(),
    })?;

    if reply.is_some() {
        return Err(ContractError::PostMessageFailed {
            message: "reply is already exist".to_string(),
        });
    }

    POST_MESSAGE_REPLY.save(
        deps.storage,
        &PostMessageReply {
            channel_id: wormhole_gateway_ibc_config.channel_id.clone(),
            recipient: wormhole_gateway_ibc_config.recipient.clone().into_string(),
            denom: coin.denom.clone(),
            amount: coin.amount.u128(),
            sender: info.sender.clone(),
            block_time: env.block.time,
            contract: env.contract.address.clone(),
        },
    )?;

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

    let sub_msg = SubMsg::reply_on_success(msg, MsgReplyId::PostMessage.repr());

    let res = Response::new()
        .add_attribute("action", "execute_post_message")
        .add_attribute("chain_id", chain_id.to_string())
        .add_attribute("message", format!("{:?}", sub_msg))
        .add_submessage(sub_msg);

    Ok(res)
}

pub fn execute_post_message_reply(
    deps: &mut DepsMut,
    message: &Reply,
) -> Result<Response, ContractError> {
    let reply_result = match message.result.clone() {
        SubMsgResult::Ok(response) if response.msg_responses.is_empty() =>
        {
            #[allow(deprecated)]
            Ok(response.data.unwrap())
        }
        SubMsgResult::Ok(response) if !response.msg_responses.is_empty() =>
        {
            #[allow(deprecated)]
            Ok(response.msg_responses[0].value.clone())
        }
        SubMsgResult::Ok(_) | SubMsgResult::Err(_) => Err(ContractError::PostMessageFailed {
            message: format!("failed reply: {:?}", message.result),
        }),
    }?;

    let response = PostMessageResponse::decode(&reply_result[..]).map_err(|_e| {
        ContractError::PostMessageFailed {
            message: format!("failed to decode reply result: {reply_result}"),
        }
    })?;

    let reply = POST_MESSAGE_REPLY.load(deps.storage)?;
    POST_MESSAGE_REPLY.remove(deps.storage);

    POST_MESSAGE_INFLIGHT.save(
        deps.storage,
        (&reply.channel_id, response.sequence),
        &PostMessageIbcTransfer {
            channel_id: reply.channel_id.clone(),
            sequence: response.sequence,
            sender: reply.sender.clone(),
            amount: reply.amount,
            denom: reply.denom.clone(),
            status: PostMessageStatus::Sent,
        },
    )?;

    Ok(Response::new()
        .add_attribute("action", "execute_post_message_reply")
        .add_attribute("channel_id", reply.channel_id)
        .add_attribute("sequence", response.sequence.to_string())
        .add_attribute("sender", reply.sender)
        .add_attribute("amount", reply.amount.to_string())
        .add_attribute("denom", reply.denom))
}

pub fn execute_receive_lifecycle_completion(
    deps: &mut DepsMut,
    action: &str,
    fail_status: PostMessageStatus,
    source_channel_id: &String,
    sequence: u64,
    success: bool,
) -> Result<Response, ContractError> {
    let response = Response::new().add_attribute("action", action);

    let sent_message =
        POST_MESSAGE_INFLIGHT.may_load(deps.storage, (source_channel_id, sequence))?;
    let Some(inflight_sent_message) = sent_message else {
        return Ok(response.add_attribute("status", "unexpected call"));
    };

    POST_MESSAGE_INFLIGHT.remove(deps.storage, (source_channel_id, sequence));

    if success {
        return Ok(response.add_attribute("status", "message successfully delivered"));
    }

    let mut recovery = inflight_sent_message;
    let sender = recovery.sender.clone();

    POST_MESSAGE_RECOVERY.update(deps.storage, &sender, |items| {
        recovery.status = fail_status;
        let Some(mut items) = items else {
            return Ok::<_, ContractError>(vec![recovery]);
        };
        items.push(recovery);
        Ok(items)
    })?;

    Ok(response.add_attribute(
        "status",
        format!("recovery created for address: {:?}", sender),
    ))
}

pub fn execute_recover_funds(
    deps: &mut DepsMut,
    info: &MessageInfo,
) -> Result<Response, ContractError> {
    let recoveries = POST_MESSAGE_RECOVERY.load(deps.storage, &info.sender)?;

    let msgs = recoveries.into_iter().map(|r| BankMsg::Send {
        to_address: r.sender.into(),
        amount: coins(r.amount, r.denom),
    });

    Ok(Response::new().add_messages(msgs))
}

fn derive_intermediate_sender(
    channel: &str,
    original_sender: &str,
) -> Result<String, ContractError> {
    let mut sha = Sha256::new();

    sha.update(IBC_HOOKS_SENDER_PREFIX.as_bytes());

    let th = sha.finalize_reset();

    sha.update(th);
    sha.update(format!("{}/{}", channel, original_sender).as_bytes());

    bech32_encode::<Bech32>(
        Hrp::parse(WARDEN_PREFIX).map_err(|error| ContractError::HashDeriviationFailed {
            message: error.to_string(),
        })?,
        sha.clone().finalize().as_slice(),
    )
    .map_err(|error| ContractError::HashDeriviationFailed {
        message: error.to_string(),
    })
}
