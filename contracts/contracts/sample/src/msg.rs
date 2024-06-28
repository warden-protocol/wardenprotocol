use bindings::key::KeyType;
use bindings::query::AddressType;
use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::PageRequest;

#[cw_serde]
pub enum ExecuteMsg {
    NewKeyRequest {
        space_id: u64,
        keychain_id: u64,
        key_type: KeyType,
        timeout_height: u64,
        intent_id: u64,
    },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(bindings::QueryKeysResponse)]
    WardenAllKeys {
        pagination: PageRequest,
        derive_addresses: Vec<AddressType>,
    },
}
