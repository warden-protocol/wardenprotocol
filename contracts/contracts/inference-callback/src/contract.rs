use crate::error::ContractError;
use crate::msg::{ExecuteMsg, QueryMsg};
use bindings::WardenProtocolQuery;
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult};
use cw2::set_contract_version;

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:wardenprotocol-inference-callback";
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
    _deps: DepsMut<WardenProtocolQuery>,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::InferenceRequestCallback {
            id,
            creator,
            input,
            output,
            error,
            created_at,
            updated_at,
            contract_callback,
        } => process_inference_request(
            id,
            creator,
            input,
            output,
            error,
            created_at,
            updated_at,
            contract_callback,
        ),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps<WardenProtocolQuery>, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {}
}

pub fn process_inference_request(
    id: u64,
    creator: Option<String>,
    _input: Option<Binary>,
    _output: Option<Binary>,
    error: Option<String>,
    created_at: Option<u64>,
    updated_at: Option<u64>,
    _contract_callback: Option<String>,
) -> Result<Response, ContractError> {
    let res = Response::new()
        .set_data(Binary::from(b"hello world from contract"))
        .add_attribute("id", id.to_string())
        .add_attribute("creator", creator.unwrap_or_default())
        .add_attribute("error", error.unwrap_or_default())
        .add_attribute("created_at", created_at.unwrap_or_default().to_string())
        .add_attribute("updated_at", updated_at.unwrap_or_default().to_string());
    Ok(res)
}
