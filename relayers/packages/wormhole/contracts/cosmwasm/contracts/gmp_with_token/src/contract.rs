use crate::methods::{
    execute_instantiate, execute_post_message, execute_receive_message, execute_set_chain_emitter,
};
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, DepsMut, Env, MessageInfo, Response, StdResult};

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
            execute_post_message(&deps, &env, &mut info, chain_id, &message)
        }

        ExecuteMsg::ReceiveMessage { message } => {
            execute_receive_message(&deps, &mut info, &env, &message)
        }
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: DepsMut, env: Env, msg: QueryMsg) -> StdResult<Binary> {
    todo!() // to_json_binary(resulr)
}
