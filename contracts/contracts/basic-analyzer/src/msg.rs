use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Binary;

#[cw_serde]
pub enum ExecuteMsg {
    Analyze { input: Binary },
}

#[cw_serde]
pub struct BasicAnalyzerResult {
    pub length: u64,
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {}
