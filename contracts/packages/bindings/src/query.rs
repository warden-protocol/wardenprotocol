use cosmwasm_schema::cw_serde;
use cosmwasm_std::{CustomQuery, Addr, PageRequest};
use cosmwasm_std::{Binary};
use crate::key::Key;

#[cw_serde]
pub enum WardenProtocolQuery {
    Warden(WardenQuery),
}

impl CustomQuery for WardenProtocolQuery {}

#[cw_serde]
pub enum WardenQuery {
    AllKeys { pagination: PageRequest, derive_addresses: Vec<AddressType> },
}

pub type AddressType = i32;

#[cw_serde]
pub struct PageResponse {
    next_key: Option<Binary>,
    total: Option<u64>,
}

#[cw_serde]
pub struct AddressResponse {
    address: Addr,
    #[serde(rename = "type")]
    address_type: AddressType
}

#[cw_serde]
pub struct QueryKeyResponse {
    key: Key,
    addresses: Vec<AddressResponse>
}
#[cw_serde]
pub struct QueryKeysResponse {
    pagination: PageResponse,
    keys: Option<QueryKeyResponse>,
}