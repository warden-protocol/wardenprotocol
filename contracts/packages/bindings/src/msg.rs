use crate::key::KeyType;
use cosmwasm_schema::cw_serde;
use cosmwasm_std::{CosmosMsg, CustomMsg};

/// WardenMsg is an override of CosmosMsg::Custom to add support for Warden Protocol's custom message types
#[cw_serde]
pub enum WardenProtocolMsg {
    Warden(WardenMsg),
}

impl CustomMsg for WardenProtocolMsg {}

/// WardenMsg captures all possible messages we can return to Warden Protocol's native warden module
#[cw_serde]
pub enum WardenMsg {
    NewKeyRequest {
        space_id: u64,
        keychain_id: u64,
        key_type: KeyType,
        timeout_height: u64,
        intent_id: u64,
    },
}

// this is a helper to be able to return these as CosmosMsg easier
impl Into<CosmosMsg<WardenProtocolMsg>> for WardenProtocolMsg {
    fn into(self) -> CosmosMsg<WardenProtocolMsg> {
        CosmosMsg::Custom(self)
    }
}

// and another helper, so we can return WardenMsg::NewKeyRequest{..}.into() as a CosmosMsg
impl Into<CosmosMsg<WardenProtocolMsg>> for WardenMsg {
    fn into(self) -> CosmosMsg<WardenProtocolMsg> {
        CosmosMsg::Custom(WardenProtocolMsg::Warden(self))
    }
}
