use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::CosmosMsg;
use std::collections::HashMap;

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    Watch { address: String, threshold: u8 },
    Unwatch { address: String },
    SubmitEvent { address: String, event: Vec<u8> },
    EditThreshold { address: String, threshold: u8 },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    // GetCount returns the current count as a json-encoded number
    #[returns(GetWatchlistResponse)]
    GetWatchlist {},
}

// We define a custom struct for each query response
#[cw_serde]
pub struct GetWatchlistResponse {
    pub watchlist: HashMap<String, u8>,
}

#[cw_serde]
pub enum PacketMsg {
    Watch { address: String, threshold: u8 },
}
