use crate::error::{ContractError, Never};
use crate::msg::{
    ExecuteMsg, GetBalancesResponse, GetWatchlistResponse, InstantiateMsg, PacketMsg, QueryMsg,
};
use crate::state::{ChannelInfo, State, CHANNEL_INFO, STATE};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, from_slice, to_binary, Binary, Deps, DepsMut, Env, Event, IbcBasicResponse,
    IbcChannel, IbcChannelCloseMsg, IbcChannelConnectMsg, IbcChannelOpenMsg, IbcEndpoint, IbcMsg,
    IbcOrder, IbcPacketAckMsg, IbcPacketReceiveMsg, IbcPacketTimeoutMsg, IbcReceiveResponse,
    IbcTimeout, MessageInfo, Response, StdResult,
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
            updates: HashMap::new(),
            balances: HashMap::new(),
            ibc_connected: false,
        },
    )?;
    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Watch { address, threshold } => execute::watch(deps, address, threshold),
        ExecuteMsg::Unwatch { address } => execute::unwatch(deps, address),
        ExecuteMsg::UpdateBalances { new_balances } => {
            execute::update_balances(deps, env, new_balances)
        }
        ExecuteMsg::EditThreshold { address, threshold } => {
            execute::edit_threshold(deps, address, threshold)
        }
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn ibc_channel_open(
    _deps: DepsMut,
    _env: Env,
    msg: IbcChannelOpenMsg,
) -> Result<(), ContractError> {
    enforce_order_and_version(msg.channel(), msg.counterparty_version())?;
    Ok(())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn ibc_channel_connect(
    deps: DepsMut,
    _env: Env,
    msg: IbcChannelConnectMsg,
) -> Result<IbcBasicResponse, ContractError> {
    enforce_order_and_version(msg.channel(), msg.counterparty_version())?;

    let channel: IbcChannel = msg.into();
    let info = ChannelInfo {
        id: channel.endpoint.channel_id,
        counterparty_endpoint: channel.counterparty_endpoint,
        connection_id: channel.connection_id,
    };
    CHANNEL_INFO.save(deps.storage, "ibc-channel", &info)?;

    STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
        state.ibc_connected = true;
        Ok(state)
    })?;

    Ok(IbcBasicResponse::default())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn ibc_channel_close(
    _deps: DepsMut,
    _env: Env,
    _msg: IbcChannelCloseMsg,
) -> Result<IbcBasicResponse, ContractError> {
    Ok(IbcBasicResponse::new())
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn ibc_packet_receive(
    deps: DepsMut,
    _env: Env,
    msg: IbcPacketReceiveMsg,
) -> Result<IbcReceiveResponse, Never> {
    (|| {
        let packet = msg.packet;
        let msg: PacketMsg = from_slice(&packet.data)?;
        match msg {
            PacketMsg::Watch { address, threshold } => {
                execute::watch(deps, address, threshold).map(|_| IbcReceiveResponse::new())
            }
        }
    })()
    .or_else(|e| {
        Ok(IbcReceiveResponse::new()
            .set_ack((ContractError::InvalidPacket.to_string() + &e.to_string()).as_bytes())
            .add_event(Event::new("ibc").add_attribute("packet", "receive")))
    })
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn ibc_packet_ack(
    _deps: DepsMut,
    _env: Env,
    _ack: IbcPacketAckMsg,
) -> Result<IbcBasicResponse, ContractError> {
    Ok(IbcBasicResponse::new().add_attribute("method", "ibc_packet_ack"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn ibc_packet_timeout(
    _deps: DepsMut,
    _env: Env,
    _msg: IbcPacketTimeoutMsg,
) -> Result<IbcBasicResponse, ContractError> {
    Ok(IbcBasicResponse::new().add_attribute("method", "ibc_packet_timeout"))
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
        match STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            state.watchlist.insert(address, threshold);
            Ok(state)
        }) {
            Ok(_) => Ok(Response::new().add_attribute("action", "watching")),
            Err(_) => Err(ContractError::CannotAddToWatchlist),
        }
    }

    pub fn unwatch(deps: DepsMut, address: String) -> Result<Response, ContractError> {
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            state.watchlist.remove(&address);
            Ok(state)
        })?;
        Ok(Response::new().add_attribute("action", "unwatched"))
    }

    pub fn update_balances(
        deps: DepsMut,
        env: Env,
        new_balances: HashMap<String, String>,
    ) -> Result<Response, ContractError> {
        let mut dispatch = false;
        let mut update = "".to_string();
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            for (address, balance) in new_balances.iter() {
                if let None = state.watchlist.get(address) {
                    continue;
                }
                update = address.clone() + ":" + &balance;
                if let Some(logged_event) = state.updates.get_mut(&update) {
                    logged_event.0 += 1; // increment event counter
                } else {
                    state.updates.insert(update.clone(), (1, false));
                }
                // if update count >= threshold
                if &state.updates.get(&update).unwrap().0 >= state.watchlist.get(address).unwrap()
                    && !state.updates.get(&update).unwrap().1
                {
                    state.updates.get_mut(&update).unwrap().1 = true;
                    if let Some(addr) = state.balances.get_mut(address) {
                        *addr = balance.clone();
                    } else {
                        state.balances.insert(address.clone(), balance.clone());
                    }
                    dispatch = true;
                }
            }
            Ok(state)
        })?;
        if dispatch && !update.is_empty() {
            dispatch_ibc_tx(deps, env, update)?;
        };
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

    fn dispatch_ibc_tx(deps: DepsMut, env: Env, update: String) -> Result<Response, ContractError> {
        // let channel_info = CHANNEL_INFO.load(deps.storage, "ibc-channel")?;
        let channel_info = ChannelInfo {
            id: "channel-0".to_string(),
            counterparty_endpoint: IbcEndpoint {
                port_id: "watchlist".to_string(),
                channel_id: "channel-0".to_string(),
            },
            connection_id: "connection-0".to_string(),
        };
        let state = STATE.load(deps.storage)?;
        if !state.ibc_connected {
            // TODO: throw some error
        }
        let packet = IbcMsg::SendPacket {
            channel_id: channel_info.id,
            data: to_binary(&update).unwrap(),
            timeout: IbcTimeout::with_timestamp(env.block.time.plus_seconds(300)),
        };
        Ok(Response::new()
            .add_message(packet)
            .add_attribute("action", "tx_dispatched"))
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    let state = STATE.load(deps.storage)?;
    match msg {
        QueryMsg::GetWatchlist {} => {
            if state.watchlist.is_empty() {
                return to_binary("");
            }
            to_binary(&query::get_watchlist(deps)?)
        }
        QueryMsg::GetBalances {} => {
            if state.balances.is_empty() {
                return to_binary("");
            }
            to_binary(&query::get_balances(deps)?)
        }
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
    pub fn get_balances(deps: Deps) -> StdResult<GetBalancesResponse> {
        let state = STATE.load(deps.storage)?;
        Ok(GetBalancesResponse {
            balances: state.balances,
        })
    }
}
