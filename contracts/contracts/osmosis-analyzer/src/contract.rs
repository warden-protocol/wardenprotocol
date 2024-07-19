use crate::error::ContractError;
use crate::msg::{ExecuteMsg, OsmosisAnalyzerResult, QueryMsg};
use crate::osmosis;
use bindings::WardenProtocolQuery;
use analyzers_core::msg::AnalyzeResult;
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdError, StdResult};
use cw2::set_contract_version;

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:wardenprotocol-osmosis-analyzer";
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
        ExecuteMsg::Analyze { input } => analyze(input),
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps<WardenProtocolQuery>, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {}
}

pub fn analyze(input: Binary) -> Result<Response, ContractError> {
    let tx = osmosis::parse(input)
        .map_err(|e| -> ContractError { StdError::generic_err(e.to_string()).into() })?;

    let result = AnalyzeResult::new_with_data(tx.signature_hash.into(), OsmosisAnalyzerResult {});

    let ser_result = serde_json_wasm::to_vec(&result)
        .map_err(|e| -> ContractError { StdError::generic_err(e.to_string()).into() })?;
    let res = Response::new().set_data(ser_result);
    Ok(res)
}
