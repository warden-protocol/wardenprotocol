use crate::error::{ContractError, Never};
use crate::msg::{
    BlackbirdQuery, ExecuteMsg, GetBalancesResponse, GetWatchlistResponse, InstantiateMsg,
    PacketMsg, QueryMsg,
};
use crate::state::{ChannelInfo, State, CHANNEL_INFO, STATE};
#[cfg(not(feature = "library"))]
use cosmwasm_std::{
    entry_point, from_slice, to_binary, Binary, Deps, DepsMut, Env, Event, IbcBasicResponse,
    IbcChannel, IbcChannelCloseMsg, IbcChannelConnectMsg, IbcChannelOpenMsg, IbcEndpoint, IbcMsg,
    IbcOrder, IbcPacketAckMsg, IbcPacketReceiveMsg, IbcPacketTimeoutMsg, IbcReceiveResponse,
    IbcTimeout, MessageInfo, QueryRequest, Response, StdResult,
};
use std::collections::HashMap;

pub const IBC_VERSION: &str = "watchlist-v0.2";
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
            policies: HashMap::new(),
            balances: HashMap::new(),
            ibc_connected: false,
        },
    )?;
    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut<BlackbirdQuery>,
    env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::UpdateWatchlist { address, threshold } => {
            execute::update_watchlist(deps, address, threshold)
        }
        ExecuteMsg::UpdatePolicy { address, policy } => {
            execute::update_policy(deps, address, policy)
        }
        ExecuteMsg::UpdateBalances { new_balances } => {
            execute::update_balances(deps, env, new_balances)
        }
    }
}

pub mod execute {
    use super::*;
    pub fn update_watchlist(
        deps: DepsMut<BlackbirdQuery>,
        address: String,
        threshold: u8,
    ) -> Result<Response, ContractError> {
        match STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            if let Some(addr_threshold) = state.watchlist.get_mut(&address) {
                *addr_threshold = threshold;
                if threshold < 1 {
                    state.watchlist.remove(&address);
                }
            } else {
                state.watchlist.insert(address, threshold);
            }
            Ok(state)
        }) {
            Ok(_) => Ok(Response::new().add_attribute("action", "updated watchlist")),
            Err(_) => Err(ContractError::CannotUpdateWatchlist),
        }
    }

    pub fn update_policy(
        deps: DepsMut<BlackbirdQuery>,
        address: String,
        policy: String,
    ) -> Result<Response, ContractError> {
        match STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            if let Some(addr_policy) = state.policies.get_mut(&address) {
                *addr_policy = policy.clone();
                if policy.is_empty() {
                    state.policies.remove(&address);
                }
            } else {
                state.policies.insert(address, policy);
            }
            Ok(state)
        }) {
            Ok(_) => Ok(Response::new().add_attribute("action", "updated policies")),
            Err(_) => Err(ContractError::CannotUpdatePolicies),
        }
    }

    pub fn update_balances(
        deps: DepsMut<BlackbirdQuery>,
        env: Env,
        new_balances: HashMap<String, String>,
    ) -> Result<Response, ContractError> {
        let mut dispatch = false;
        let mut update = "".to_owned();
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            for (address, balance) in new_balances.iter() {
                if state.watchlist.get(address).is_none() {
                    continue;
                }
                update = format!("{}:{}", address, balance);
                let event = state.updates.entry(update.clone()).or_insert((0, false));
                event.0 += 1; // increment event counter

                // if update count >= threshold && event not dispatched
                if event.0 >= *state.watchlist.get(address).unwrap() && !event.1 {
                    let addr = state
                        .balances
                        .entry(address.clone())
                        .or_insert(balance.clone());
                    *addr = balance.clone();

                    if deps
                        .querier
                        .query(&QueryRequest::Custom(BlackbirdQuery::Verify {
                            policy: state.policies.get(address).unwrap().to_owned(),
                            payload: "foo:1".to_owned(),
                        }))
                        .unwrap()
                    {
                        event.1 = true;
                        dispatch = true;
                    }
                }
            }
            Ok(state)
        })?;
        if dispatch && !update.is_empty() {
            dispatch_ibc_tx(deps, env, update)?;
        };
        Ok(Response::new().add_attribute("action", "submitted"))
    }

    fn dispatch_ibc_tx(
        deps: DepsMut<BlackbirdQuery>,
        env: Env,
        update: String,
    ) -> Result<Response, ContractError> {
        // let channel_info = CHANNEL_INFO.load(deps.storage, "ibc-channel")?;
        let channel_info = ChannelInfo {
            id: "channel-0".to_owned(),
            counterparty_endpoint: IbcEndpoint {
                port_id: "watchlist".to_owned(),
                channel_id: "channel-0".to_owned(),
            },
            connection_id: "connection-0".to_owned(),
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
    deps: DepsMut<BlackbirdQuery>,
    _env: Env,
    msg: IbcPacketReceiveMsg,
) -> Result<IbcReceiveResponse, Never> {
    (|| {
        let packet = msg.packet;
        let msg: PacketMsg = from_slice(&packet.data)?;
        match msg {
            PacketMsg::Watch { address, threshold } => {
                execute::update_watchlist(deps, address, threshold)
                    .map(|_| IbcReceiveResponse::new())
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
                version: version.to_owned(),
            });
        }
    }
    if channel.order != IBC_ORDERING {
        return Err(ContractError::OnlyOrderedChannel {});
    }
    Ok(())
}
