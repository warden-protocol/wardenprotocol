use crate::error::ContractError;
use crate::methods::{
    execute_instantiate, execute_post_message, execute_submit_vaa, query_address_hex,
    query_guardian_set_info, query_parse_and_verify_vaa, query_state,
};
use crate::msg::{ExecuteMsg, InstantiateMsg, MigrateMsg, QueryMsg};

#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
use k256::ecdsa::recoverable::{Id as RecoverableId, Signature as RecoverableSignature};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, _msg: MigrateMsg) -> StdResult<Response> {
    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    execute_instantiate(deps, msg)
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        #[cfg(feature = "full")]
        ExecuteMsg::PostMessage { message, nonce } => {
            execute_post_message(deps, env, info, message.as_slice(), nonce)
        }

        ExecuteMsg::SubmitVAA { vaa } => execute_submit_vaa(deps, env, vaa.as_slice()),

        // When in "shutdown" mode, we reject any other action
        #[cfg(not(feature = "full"))]
        _ => Err(ContractError::InvalidVAAAction),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GuardianSetInfo {} => to_json_binary(&query_guardian_set_info(deps)?),
        QueryMsg::VerifyVAA { vaa, block_time } => to_json_binary(&query_parse_and_verify_vaa(
            deps,
            vaa.as_slice(),
            block_time,
        )?),
        QueryMsg::GetState {} => to_json_binary(&query_state(deps)?),
        QueryMsg::QueryAddressHex { address } => {
            to_json_binary(&query_address_hex(deps, &address)?)
        }
    }
}
