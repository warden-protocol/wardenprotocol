use cosmwasm_schema::cw_serde;
use cosmwasm_std::Binary;
use enum_repr::EnumRepr;

#[EnumRepr(type = "u64")]
pub enum MsgReplyId {
    PostMessage = 1,
}

#[derive(Clone, PartialEq, Eq, ::prost::Message)]
pub struct PostMessageResponse {
    #[prost(uint64, tag = "1")]
    pub sequence: u64,
}

#[cw_serde]
pub struct InstantiateMsg {
    pub admin: String,
    pub wormhole_ibc_channel_id: String,
    pub wormhole_ibc_sender: String,
    pub wormhole_ibc_recipient: String,
    pub wormhole_ibc_timeout_sec: u64,
}

#[cw_serde]
pub enum ExecuteMsg {
    SetChainEmitter { chain_id: u16, emitter: Binary },
    PostMessage { chain_id: u16, message: Binary },
    ReceiveMessage { message: Binary },
    RecoverFunds {},
}

#[cw_serde]
pub enum GatewayIbcTokenBridgePayload {
    #[serde(rename = "gateway_transfer_with_payload")]
    GatewayTransferWithPayload {
        chain: u16,
        contract: Binary,
        payload: Binary,
        nonce: u32,
    },
}

#[cw_serde]
pub enum SudoMsg {
    #[serde(rename = "ibc_lifecycle_complete")]
    IBCLifecycleComplete(IBCLifecycleComplete),
}

#[cw_serde]
pub enum IBCLifecycleComplete {
    #[serde(rename = "ibc_ack")]
    IBCAck {
        channel: String,
        sequence: u64,
        ack: String,
        success: bool,
    },
    #[serde(rename = "ibc_timeout")]
    IBCTimeout { channel: String, sequence: u64 },
}
