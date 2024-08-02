use cosmwasm_std::{Binary, Coin};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::state::{GuardianAddress, GuardianSetInfo};

pub type HumanAddr = String;

/// The instantiation parameters of the core bridge contract. See
/// [`crate::state::ConfigInfo`] for more details on what these fields mean.
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct InstantiateMsg {
    pub gov_chain: u16,
    pub gov_address: Binary,

    /// Guardian set to initialise the contract with.
    pub initial_guardian_set: GuardianSetInfo,
    pub guardian_set_expirity: u64,

    pub chain_id: u16,
    pub fee_denom: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    SubmitVAA { vaa: Binary },
    PostMessage { message: Binary, nonce: u32 },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct MigrateMsg {}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GuardianSetInfo {},
    VerifyVAA { vaa: Binary, block_time: u64 },
    GetState {},
    QueryAddressHex { address: HumanAddr },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct GuardianSetInfoResponse {
    pub guardian_set_index: u32,         // Current guardian set index
    pub addresses: Vec<GuardianAddress>, // List of querdian addresses
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct WrappedRegistryResponse {
    pub address: HumanAddr,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct GetStateResponse {
    pub fee: Coin,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub struct GetAddressHexResponse {
    pub hex: String,
}
