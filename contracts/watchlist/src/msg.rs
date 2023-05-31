use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::CustomQuery;
use std::collections::HashMap;

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    UpdateWatchlist {
        address: String,
        threshold: u8,
    },
    UpdatePolicies {
        address: String,
        policy: String,
    },
    UpdateBalances {
        new_balances: HashMap<String, String>,
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

#[cw_serde]
#[derive(QueryResponses)]
pub enum BlackbirdQuery {
    #[returns(VerifyResponse)]
    Verify { policy: String, payload: String },
}
#[cw_serde]
pub struct VerifyResponse {
    pub result: bool,
}

impl CustomQuery for BlackbirdQuery {}
