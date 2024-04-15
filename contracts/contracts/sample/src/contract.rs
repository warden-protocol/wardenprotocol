use cosmwasm_std::{
    Addr, Api, DepsMut, Empty, Env, MessageInfo, Response,
    StdResult,
};
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cw2::set_contract_version;

use bindings::msg::{KeyType, WardenMsg};
use bindings::WardenProtocolMsg;

use crate::error::ContractError;
use crate::msg::ExecuteMsg;

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:wardenprotocol-sample";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: Empty,
) -> StdResult<Response> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    Ok(Response::default())
}

pub fn map_validate(api: &dyn Api, admins: &[String]) -> StdResult<Vec<Addr>> {
    admins.iter().map(|addr| api.addr_validate(addr)).collect()
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response<WardenProtocolMsg>, ContractError> {
    match msg {
        ExecuteMsg::NewKeyRequest { space_id, keychain_id, key_type, btl, intent_id } => execute_new_key_request(deps, env, info, space_id, keychain_id, key_type, btl, intent_id)
    }
}

fn execute_new_key_request(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    space_id: u64,
    keychain_id: u64,
    key_type: KeyType,
    btl: u64,
    intent_id: u64,
) -> Result<Response<WardenProtocolMsg>, ContractError> {
    let msg = WardenMsg::NewKeyRequest {
        space_id,
        keychain_id,
        key_type,
        btl,
        intent_id,
    };
    let res = Response::new()
        .add_message(msg)
        .add_attribute("action", "new_key_request");
    Ok(res)
}
