#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_json_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, PageRequest, Response,
    StdResult,
};
use cw2::set_contract_version;

use bindings::key::KeyType;
use bindings::msg::WardenMsg;
use bindings::querier::WardenQuerier;
use bindings::query::AddressType;
use bindings::{QueryKeysResponse, WardenProtocolMsg, WardenProtocolQuery};

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, QueryMsg};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:wardenprotocol-sample";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut<WardenProtocolQuery>,
    _env: Env,
    _info: MessageInfo,
    _msg: Empty,
) -> StdResult<Response> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut<WardenProtocolQuery>,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response<WardenProtocolMsg>, ContractError> {
    match msg {
        ExecuteMsg::NewKeyRequest {
            space_id,
            keychain_id,
            key_type,
            timeout_height,
            intent_id,
        } => execute_new_key_request(
            deps,
            env,
            info,
            space_id,
            keychain_id,
            key_type,
            timeout_height,
            intent_id,
        ),
    }
}

fn execute_new_key_request(
    _deps: DepsMut<WardenProtocolQuery>,
    _env: Env,
    _info: MessageInfo,
    space_id: u64,
    keychain_id: u64,
    key_type: KeyType,
    timeout_height: u64,
    intent_id: u64,
) -> Result<Response<WardenProtocolMsg>, ContractError> {
    let msg = WardenMsg::NewKeyRequest {
        space_id,
        keychain_id,
        key_type,
        timeout_height,
        intent_id,
    };
    let res = Response::new()
        .add_message(msg)
        .add_attribute("action", "new_key_request");
    Ok(res)
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps<WardenProtocolQuery>, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::WardenAllKeys {
            pagination,
            derive_addresses,
        } => to_json_binary(&query_warden_all_keys(deps, pagination, derive_addresses)?),
    }
}

pub fn query_warden_all_keys(
    deps: Deps<WardenProtocolQuery>,
    pagination: PageRequest,
    derive_addresses: Vec<AddressType>,
) -> StdResult<QueryKeysResponse> {
    let querier = WardenQuerier::new(&deps.querier);
    let response = querier.query_warden_all_keys(pagination, derive_addresses)?;
    Ok(response)
}
