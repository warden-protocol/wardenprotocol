use cosmwasm_schema::{cw_serde, QueryResponses};

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    UpdateAddr { address: String },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(GetWatchlistAddrResponse)]
    GetWatchlistAddr {},
}

#[cw_serde]
pub struct GetWatchlistAddrResponse {
    pub watchlist_addr: String,
}
