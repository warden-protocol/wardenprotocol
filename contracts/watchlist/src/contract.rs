use crate::error::ContractError;
use crate::msg::{ExecuteMsg, GetWatchlistResponse, InstantiateMsg, QueryMsg};
use crate::state::{State, STATE};
// use base64::{engine::general_purpose::STANDARD, Engine};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
};
use std::collections::HashMap;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    STATE.save(
        deps.storage,
        &State {
            watchlist: HashMap::new(),
            events: HashMap::new(),
        },
    )?;
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
        ExecuteMsg::Watch { address, threshold } => execute::watch(deps, address, threshold),
        ExecuteMsg::Unwatch { address } => execute::unwatch(deps, address),
        ExecuteMsg::SubmitEvent { address, event } => execute::submit_event(deps, address, event),
        ExecuteMsg::EditThreshold { address, threshold } => {
            execute::edit_threshold(deps, address, threshold)
        }
    }
}

pub mod execute {
    use super::*;
    pub fn watch(deps: DepsMut, address: String, threshold: u8) -> Result<Response, ContractError> {
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            state.watchlist.insert(address, threshold);
            Ok(state)
        })?;
        Ok(Response::new().add_attribute("action", "watching"))
    }
    pub fn unwatch(deps: DepsMut, address: String) -> Result<Response, ContractError> {
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            state.watchlist.remove(&address);
            Ok(state)
        })?;
        Ok(Response::new().add_attribute("action", "unwatched"))
    }
    pub fn submit_event(
        deps: DepsMut,
        address: String,
        event: Vec<u8>,
    ) -> Result<Response, ContractError> {
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            if state.watchlist.get(&address) == None {
                return Err(ContractError::CustomError {
                    val: "address not in watchlist".to_string(),
                });
            }
            match state.events.get_mut(&event) {
                Some(&mut event) => event.0 += 1,
                _ => {
                    state.events.insert(event, (1, false));
                    ()
                }
            }
            if &state.events.get(&event).unwrap().0 >= state.watchlist.get(&address).unwrap()
                && !state.events.get(&event).unwrap().1
            {
                state.events.get_mut(&event).unwrap().1 = true;
                dispatch_ibc_tx(address, event);
            }
            Ok(state)
        })?;
        Ok(Response::new().add_attribute("action", "submitted"))
    }
    fn dispatch_ibc_tx(address: String, event: Vec<u8>) -> Result<Response, ContractError> {
        Ok(Response::new().add_attribute("action", "tx_dispatched"))
    }
    pub fn edit_threshold(
        deps: DepsMut,
        address: String,
        threshold: u8,
    ) -> Result<Response, ContractError> {
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            match state.watchlist.get_mut(&address) {
                Some(&mut address) => address = threshold,
                _ => {
                    return Err(ContractError::CustomError {
                        val: "address not in watchlist".to_string(),
                    });
                }
            }
            Ok(state)
        })?;
        Ok(Response::new().add_attribute("action", "edited"))
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetWatchlist {} => to_binary(&query::get_watchlist(deps)?),
    }
}

pub mod query {
    use super::*;
    pub fn get_watchlist(deps: Deps) -> StdResult<GetWatchlistResponse> {
        let state = STATE.load(deps.storage)?;
        Ok(GetWatchlistResponse {
            watchlist: state.watchlist,
        })
    }
}
