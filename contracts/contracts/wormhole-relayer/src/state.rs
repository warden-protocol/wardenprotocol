use cosmwasm_std::Addr;
#[allow(unused_imports)]
use cosmwasm_std::{StdResult, Storage};
use cw_controllers::Admin;
use cw_storage_plus::{Item, Map};

// version info for migration info
pub const CONTRACT_NAME: &str = "crates.io:wardenprotocol-wormhole-relayer";
pub const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

pub const ADMIN: Admin = Admin::new("admin");
pub const WORMHOLE_CORE_CONTRACT: Item<Addr> = Item::new("wormhole_core_contract");
pub const WORMHOLE_CHAINS_EMITTERS: Map<u16, [u8; 32]> = Map::new("wormhole_chains_emitters");
