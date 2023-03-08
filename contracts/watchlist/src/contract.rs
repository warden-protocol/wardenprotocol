use crate::error::ContractError;
use crate::msg::{ExecuteMsg, GetWatchlistResponse, InstantiateMsg, QueryMsg};
use crate::state::{ChannelInfo, State, CHANNEL_INFO, STATE};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, IbcBasicResponse, IbcChannel,
    IbcChannelConnectMsg, IbcChannelOpenMsg, IbcEndpoint, IbcMsg, IbcOrder, IbcTimeout,
    IbcTimeoutBlock, MessageInfo, Response, StdResult,
};
use std::collections::HashMap;

pub const IBC_VERSION: &str = "watchlist-v1";
pub const IBC_ORDERING: IbcOrder = IbcOrder::Unordered;

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

#[cfg_attr(not(feature = "library"), entry_point)]
/// enforces ordering and versioning constraints
pub fn ibc_channel_open(
    _deps: DepsMut,
    _env: Env,
    msg: IbcChannelOpenMsg,
) -> Result<(), ContractError> {
    enforce_order_and_version(msg.channel(), msg.counterparty_version())?;
    Ok(())
}

#[cfg_attr(not(feature = "library"), entry_point)]
/// record the channel in CHANNEL_INFO
pub fn ibc_channel_connect(
    deps: DepsMut,
    _env: Env,
    msg: IbcChannelConnectMsg,
) -> Result<IbcBasicResponse, ContractError> {
    // we need to check the counter party version in try and ack (sometimes here)
    enforce_order_and_version(msg.channel(), msg.counterparty_version())?;

    let channel: IbcChannel = msg.into();
    let info = ChannelInfo {
        id: channel.endpoint.channel_id,
        counterparty_endpoint: channel.counterparty_endpoint,
        connection_id: channel.connection_id,
    };
    CHANNEL_INFO.save(deps.storage, &info.id, &info)?;

    Ok(IbcBasicResponse::default())
}

fn enforce_order_and_version(
    channel: &IbcChannel,
    counterparty_version: Option<&str>,
) -> Result<(), ContractError> {
    if channel.version != IBC_VERSION {
        return Err(ContractError::InvalidIbcVersion {
            version: channel.version.clone(),
        });
    }
    if let Some(version) = counterparty_version {
        if version != IBC_VERSION {
            return Err(ContractError::InvalidIbcVersion {
                version: version.to_string(),
            });
        }
    }
    if channel.order != IBC_ORDERING {
        return Err(ContractError::OnlyOrderedChannel {});
    }
    Ok(())
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
                return Err(ContractError::AddressNotInWatchlist);
            }
            if let Some(logged_event) = state.events.get_mut(&event) {
                logged_event.0 += 1; // Increases event counter
            } else {
                state.events.insert(event.clone(), (1, false));
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
    pub fn edit_threshold(
        deps: DepsMut,
        address: String,
        threshold: u8,
    ) -> Result<Response, ContractError> {
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            if let Some(addr_threshold) = state.watchlist.get_mut(&address) {
                *addr_threshold = threshold;
            } else {
                return Err(ContractError::AddressNotInWatchlist);
            }
            Ok(state)
        })?;
        Ok(Response::new().add_attribute("action", "edited"))
    }
    fn dispatch_ibc_tx(address: String, event: Vec<u8>) -> Result<Response, ContractError> {
        let endpoint = IbcEndpoint {
            port_id: 0.to_string(),
            channel_id: 0.to_string(),
        };
        let channel = IbcChannel::new(
            endpoint.clone(),
            endpoint,
            IBC_ORDERING,
            IBC_VERSION,
            0.to_string(),
        );
        let msg = IbcChannelOpenMsg::new_init(channel);
        IbcMsg::SendPacket {
            channel_id: 0.to_string(),
            data: to_binary(&event).unwrap(),
            timeout: IbcTimeout::with_block(IbcTimeoutBlock {
                revision: 0,
                height: 0,
            }), //TODO change this
        };
        Ok(Response::new().add_attribute("action", "tx_dispatched"))
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
