use crate::error::ContractError;
use crate::msg::{ExecuteMsg, GetWatchlistAddrResponse, InstantiateMsg, QueryMsg};
use crate::state::{State, STATE};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};

static ADMIN: &str = "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j";

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    STATE.save(
        deps.storage,
        &State {
            watchlist_addr: "".to_string(),
        },
    )?;
    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::UpdateAddr { address } => execute::update_addr(deps, info, address),
    }
}

pub mod execute {
    use super::*;
    pub fn update_addr(
        deps: DepsMut,
        info: MessageInfo,
        address: String,
    ) -> Result<Response, ContractError> {
        if info.sender.as_str() != ADMIN {
            return Err(ContractError::NotAdmin {});
        }
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            state.watchlist_addr = address;
            Ok(state)
        })?;
        Ok(Response::new().add_attribute("action", "updated"))
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetWatchlistAddr {} => to_binary(&query::get_watchlist_addr(deps)?),
    }
}

pub mod query {
    use super::*;
    pub fn get_watchlist_addr(deps: Deps) -> StdResult<GetWatchlistAddrResponse> {
        let state = STATE.load(deps.storage)?;
        Ok(GetWatchlistAddrResponse {
            watchlist_addr: state.watchlist_addr,
        })
    }
}
