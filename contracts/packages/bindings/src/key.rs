use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Binary};

pub type KeyType = i32;

#[cw_serde]
pub struct Key {
    id: u64,
    space_id: u64,
    keychain_id: u64,
    #[serde(rename = "type")]
    key_type: KeyType,
    public_key: Binary,
    intent_id: u64,
}