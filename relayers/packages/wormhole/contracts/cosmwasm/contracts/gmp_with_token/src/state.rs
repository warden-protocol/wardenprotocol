use cosmwasm_schema::cw_serde;
use cosmwasm_std::{Addr, Binary, Timestamp};
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
pub const POST_MESSAGE_REPLY: Item<PostMessageReply> = Item::new("post_message_reply");
pub const POST_MESSAGE_INFLIGHT: Map<(&str, u64), PostMessageIbcTransfer> =
    Map::new("post_message_inflight");
pub const POST_MESSAGE_RECOVERY: Map<&Addr, Vec<PostMessageIbcTransfer>> =
    Map::new("post_message_recovery");

#[cw_serde]
pub struct WormholeGatewayIbcConfig {
    pub channel_id: String,
    pub recipient: String,
    pub sender: String,
    pub timeout_sec: u64,
}

#[cw_serde]
pub struct PostMessageReply {
    pub channel_id: String,
    pub recipient: String,
    pub denom: String,
    pub amount: u128,
    pub sender: Addr,
    pub contract: Addr,
    pub block_time: Timestamp,
}

#[cw_serde]
pub enum PostMessageStatus {
    Sent,
    AckSuccess,
    AckFailure,
    TimedOut,
}

#[cw_serde]
pub struct PostMessageIbcTransfer {
    pub sender: Addr,
    pub channel_id: String,
    pub sequence: u64,
    pub amount: u128,
    pub denom: String,
    pub status: PostMessageStatus,
}
