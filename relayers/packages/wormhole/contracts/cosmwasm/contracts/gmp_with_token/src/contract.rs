use crate::methods::{
    execute_instantiate, execute_post_message, execute_post_message_reply,
    execute_receive_lifecycle_completion, execute_receive_message, execute_recover_funds,
    execute_set_chain_emitter,
};
use crate::msg::{ExecuteMsg, IBCLifecycleComplete, InstantiateMsg, MsgReplyId, SudoMsg};
use crate::state::PostMessageStatus;
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{DepsMut, Env, MessageInfo, Reply, Response, StdError, StdResult};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    mut deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    execute_instantiate(&mut deps, &msg)
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    mut deps: DepsMut,
    env: Env,
    mut info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
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
pub fn sudo(mut deps: DepsMut, _env: Env, msg: SudoMsg) -> StdResult<Response> {
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
pub fn reply(mut deps: DepsMut, _env: Env, reply: Reply) -> StdResult<Response> {
    match MsgReplyId::from_repr(reply.id) {
        Some(MsgReplyId::PostMessage) => execute_post_message_reply(&mut deps, &reply),

        None => Err(StdError::generic_err(format!(
            "invalid reply id: {}",
            reply.id
        ))),
    }
}
