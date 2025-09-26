use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Binary;

#[cw_serde]
pub enum ExecuteMsg {
    Analyze { input: Binary },
}

#[cw_serde]
pub struct OsmosisAnalyzerResult {}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {}
