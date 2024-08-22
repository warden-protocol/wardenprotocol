use crate::methods::{
    execute_instantiate, execute_post_message, execute_post_message_reply,
    execute_receive_lifecycle_completion, execute_receive_message, execute_recover_funds,
    execute_set_chain_emitter,
};
use crate::msg::{
    ExecuteMsg, IBCLifecycleComplete, InstantiateMsg, MigrateMsg, MsgReplyId, QueryMsg, SudoMsg,
};
use crate::state::{
    PostMessageStatus, ADMIN, POST_MESSAGE_RECOVERY, WORMHOLE_CHAINS_EMITTERS,
    WORMHOLE_GATEWAY_IBC_CONFIG,
};
use crate::ContractError;
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Reply, Response, StdResult,
};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    mut deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    execute_instantiate(&mut deps, &msg)
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, msg: MigrateMsg) -> Result<Response, ContractError> {
    match msg {}
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    mut deps: DepsMut,
    env: Env,
    mut info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::SetChainEmitter { chain_id, emitter } => {
            execute_set_chain_emitter(&mut deps, &info, chain_id, &emitter)
        }

        ExecuteMsg::PostMessage { chain_id, message } => {
            execute_post_message(&mut deps, &env, &mut info, chain_id, &message)
        }

        ExecuteMsg::ReceiveMessage { message } => {
            execute_receive_message(&deps, &mut info, &message)
        }

        ExecuteMsg::RecoverFunds {} => execute_recover_funds(&mut deps, &info),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Admin {} => to_json_binary(&ADMIN.get(deps)?),

        QueryMsg::ChainEmitter { chain_id } => {
            WORMHOLE_CHAINS_EMITTERS.load(deps.storage, chain_id)
        }

        QueryMsg::WormholeGatewayIbcConfig {} => {
            to_json_binary(&WORMHOLE_GATEWAY_IBC_CONFIG.load(deps.storage)?)
        }

        QueryMsg::PostMessageRecovery { account } => to_json_binary(
            &POST_MESSAGE_RECOVERY
                .may_load(deps.storage, &account)?
                .or(Some(vec![])),
        ),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn sudo(mut deps: DepsMut, _env: Env, msg: SudoMsg) -> Result<Response, ContractError> {
    match msg {
        SudoMsg::IBCLifecycleComplete(IBCLifecycleComplete::IBCAck {
            channel,
            sequence,
            ack: _,
            success,
        }) => execute_receive_lifecycle_completion(
            &mut deps,
            "execute_receive_ack",
            PostMessageStatus::AckFailure,
            &channel,
            sequence,
            success,
        ),

        SudoMsg::IBCLifecycleComplete(IBCLifecycleComplete::IBCTimeout { channel, sequence }) => {
            execute_receive_lifecycle_completion(
                &mut deps,
                "execute_receive_timeout",
                PostMessageStatus::TimedOut,
                &channel,
                sequence,
                false,
            )
        }
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(mut deps: DepsMut, _env: Env, reply: Reply) -> Result<Response, ContractError> {
    match MsgReplyId::from_repr(reply.id) {
        Some(MsgReplyId::PostMessage) => execute_post_message_reply(&mut deps, &reply),

        None => Err(ContractError::ReplyFailed {
            message: format!("invalid reply id: {:?}", reply.id),
        }),
    }
}
