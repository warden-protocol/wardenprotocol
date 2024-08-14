use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Binary;

#[cw_serde]
pub enum ExecuteMsg {
    InferenceRequestCallback {
        id: u64,
        creator: Option<String>,
        input: Option<Binary>,
        output: Option<Binary>,
        error: Option<String>,
        created_at: Option<u64>,
        updated_at: Option<u64>,
        contract_callback: Option<String>,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {}
