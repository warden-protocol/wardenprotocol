use cosmwasm_schema::{cw_serde};
use bindings::msg::KeyType;

#[cw_serde]
pub enum ExecuteMsg
{
    NewKeyRequest {
        space_id: u64,
        keychain_id: u64,
        key_type: KeyType,
        btl: u64,
        intent_id: u64,
    },
}
