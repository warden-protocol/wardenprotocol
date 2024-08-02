use cosmwasm_std::{Binary, CanonicalAddr};
use cw_storage_plus::Item;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

// Created at initialization and reference original asset and bridge address
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct WrappedAssetInfo {
    pub asset_chain: u16,      // Asset chain id
    pub asset_address: Binary, // Asset smart contract address on the original chain
    pub bridge: CanonicalAddr, // Bridge address, authorized to mint and burn wrapped tokens
}

pub const CONTRACT_NAME: &str = "crates.io:cw20-base";
pub const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

pub const WRAPPED_ASSET: Item<WrappedAssetInfo> = Item::new("WRAPPED_ASSET");
