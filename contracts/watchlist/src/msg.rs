use cosmwasm_schema::{cw_serde, QueryResponses};
use std::collections::HashMap;

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    Watch {
        address: String,
        threshold: u8,
    },
    Unwatch {
        address: String,
    },
    UpdateBalances {
        new_balances: HashMap<String, String>,
    },
    EditThreshold {
        address: String,
        threshold: u8,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(GetWatchlistResponse)]
    GetWatchlist {},
    #[returns(GetBalancesResponse)]
    GetBalances {},
}

// We define a custom struct for each query response
#[cw_serde]
pub struct GetWatchlistResponse {
    pub watchlist: HashMap<String, u8>,
}
#[cw_serde]
pub struct GetBalancesResponse {
    pub balances: HashMap<String, String>,
}

#[cw_serde]
pub enum PacketMsg {
    Watch { address: String, threshold: u8 },
}
