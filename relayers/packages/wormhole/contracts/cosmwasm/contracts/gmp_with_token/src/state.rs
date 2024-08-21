use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Binary};
#[allow(unused_imports)]
use cosmwasm_std::{StdResult, Storage};
use cw_controllers::Admin;
use cw_storage_plus::{Item, Map};

// version info for migration info
pub const WARDEN_PREFIX: &str = "warden";
pub const IBC_HOOKS_SENDER_PREFIX: &str = "ibc-wasm-hook-intermediary";
pub const CONTRACT_NAME: &str = "crates.io:wardenprotocol-wormhole-relayer";
pub const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

pub const ADMIN: Admin = Admin::new("admin");
pub const WORMHOLE_CHAINS_EMITTERS: Map<u16, Binary> = Map::new("wormhole_chains_emitters");
pub const WORMHOLE_GATEWAY_IBC_CONFIG: Item<WormholeGatewayIbcConfig> =
    Item::new("wormhole_gateway_ibc_config");

#[cw_serde]
pub struct WormholeGatewayIbcConfig {
    pub channel_id: String,
    pub recipient: Addr,
    pub sender: Addr,
    pub timeout_sec: u64,
}
