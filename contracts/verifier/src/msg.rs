use cosmwasm_schema::{cw_serde, QueryResponses};

#[cw_serde]
pub struct InstantiateMsg {
    pub result: String,
}

#[cw_serde]
pub enum ExecuteMsg {
    Verify {
        program_hash: Vec<u8>,
        stack_inputs: Vec<u64>,
        stack_outputs: Vec<u64>,
        proof: Vec<u8>,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    // GetCount returns the current count as a json-encoded number
    #[returns(GetResultResponse)]
    GetVerifResult {},
}

// We define a custom struct for each query response
#[cw_serde]
pub struct GetResultResponse {
    pub result: String,
}
