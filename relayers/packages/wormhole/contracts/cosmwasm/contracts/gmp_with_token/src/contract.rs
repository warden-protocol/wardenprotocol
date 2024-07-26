use crate::methods::{
    execute_convert_and_transfer_with_payload, execute_instantiate, execute_post_message,
    execute_receive_message, execute_set_chain_emitter, query_verify_vaas,
};
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
use crate::ContractError;
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_json_binary, Binary, DepsMut, Env, MessageInfo, Reply, Response, StdResult};

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
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::ConvertAndTransferWithPayload {
            target_chain,
            target_contract,
            payload,
            fee,
            nonce,
        } => execute_convert_and_transfer_with_payload(
            deps,
            info,
            env,
            target_chain,
            target_contract,
            payload,
            fee,
            nonce,
        ),

        ExecuteMsg::SetChainEmitter { chain_id, emitter } => {
            execute_set_chain_emitter(&mut deps, &info, chain_id, &emitter)
        }

        ExecuteMsg::PostMessage { message, nonce } => execute_post_message(&deps, nonce, &message),

        ExecuteMsg::ReceiveMessage { vaa } => execute_receive_message(&deps, &env, &vaa),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: DepsMut, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::VerifyVAA { vaa } => to_json_binary(&query_verify_vaas(&deps, &env, None, &vaa)?),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(deps: DepsMut, env: Env, msg: Reply) -> StdResult<Response> {
    match msg.id {
        COMPLETE_TRANSFER_REPLY_ID => handle_transfer_reply(deps, msg),
        id => Err(StdError::generic_err(format!("Unknown reply id: {}", id))),
    }

    Ok(Response::default())
}
