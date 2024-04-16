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
    AllKeys { pagination: PageRequest, derive_wallets: Vec<WalletType> },
}

pub type WalletType = i32;

#[cw_serde]
pub struct PageResponse {
    next_key: Option<Binary>,
    total: Option<u64>,
}

#[cw_serde]
pub struct WalletKeyResponse {
    address: Addr,
    #[serde(rename = "type")]
    wallet_type: WalletType
}

#[cw_serde]
pub struct QueryKeyResponse {
    key: Key,
    wallets: Vec<WalletKeyResponse>
}
#[cw_serde]
pub struct AllKeysResponse {
    pagination: PageResponse,
    keys: Option<QueryKeyResponse>,
}