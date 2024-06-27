use crate::methods::{
    execute_instantiate, execute_post_message, execute_receive_message, execute_set_chain_emitter,
    query_verify_vaas,
};
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_json_binary, Binary, DepsMut, Env, MessageInfo, Response, StdResult};

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
) -> StdResult<Response> {
    match msg {
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
