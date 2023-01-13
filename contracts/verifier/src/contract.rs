#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
use crate::error::ContractError;
use crate::msg::{ExecuteMsg, GetResultResponse, QueryMsg};
use crate::state::{State, STATE};

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: String,
) -> Result<Response, ContractError> {
    STATE.save(deps.storage, &State { result: "".to_string() })?;
    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Verify {} => execute::verify(deps),
    }
}

pub mod execute {
    use super::*;
    pub fn verify(deps: DepsMut) -> Result<Response, ContractError> {
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            // make changes to state var here
            // state.result = miden_verifier::verify();
            Ok(state)
        })?;
        Ok(Response::new().add_attribute("action", "verify"))
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetVerifResult {} => to_binary( &query::result(deps)? )
    }
}

pub mod query {
    use super::*;
    pub fn result(deps: Deps) -> StdResult<GetResultResponse> {
        let state = STATE.load(deps.storage)?;
        Ok(GetResultResponse { result: state.result })
    }
}
