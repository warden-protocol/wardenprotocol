use cosmwasm_schema::cw_serde;
#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{
    to_json_binary, Binary, Deps, DepsMut, Empty, Env, MessageInfo, Response, StdResult, from_json
};
use cw2::set_contract_version;
use cw_storage_plus::{Item, Map};

use bindings::msg::WardenMsg;
use bindings::{WardenProtocolMsg, WardenProtocolQuery};

use crate::error::ContractError;
use crate::msg::{ExecuteMsg, FutureResult, QueryMsg};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:wardenprotocol-sample";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

pub const COUNT: Item<u64> = Item::new("count");
pub const FUTURES_MAP: Map<u64, String> = Map::new("futures_map");

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
        ExecuteMsg::DoStuff {
            input
        } => execute_do_stuff(
            deps,
            env,
            info,
            input,
        ),
        ExecuteMsg::FutureReady {
            output,
        } => execute_callback(
            deps,
            env,
            info,
            output,
        ),
    }
}

#[cw_serde]
struct FutureInput {
    id: u64,
    input: String,
}

#[cw_serde]
struct FutureOutput {
    id: u64,
    output: String,
}

fn execute_do_stuff(
    deps: DepsMut<WardenProtocolQuery>,
    _env: Env,
    _info: MessageInfo,
    input: String,
) -> Result<Response<WardenProtocolMsg>, ContractError> {
    // load the next ID
    let count = COUNT.may_load(deps.storage)?.unwrap_or(0);

    // prepare the future to be executed
    let input_length = input.len();
    let msg = WardenMsg::ExecuteFuture {
        input: to_json_binary(&FutureInput{
            id: count,
            input,
        }).unwrap(),
        output: to_json_binary(&FutureOutput{
            id: count,
            output: format!("I'm the output of an AI model :] Your input length was {}.", input_length),
        }).unwrap(),
    };

    // update the count
    COUNT.save(deps.storage, &(count+1))?;

    let res = Response::new()
        .add_message(msg);
    Ok(res)
}

fn execute_callback(
    deps: DepsMut<WardenProtocolQuery>,
    _env: Env,
    _info: MessageInfo,
    output: Binary,
) -> Result<Response<WardenProtocolMsg>, ContractError> {
    // this is called by x/warden when the result of the execution is ready

    let result: FutureOutput = from_json(output)?;

    FUTURES_MAP.save(deps.storage, result.id, &result.output)?;

    Ok(Response::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps<WardenProtocolQuery>, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetFutureResult { id } => {
            let output = FUTURES_MAP.load(_deps.storage, id)?;
            to_json_binary(&FutureResult{ output })
        }
    }
}
