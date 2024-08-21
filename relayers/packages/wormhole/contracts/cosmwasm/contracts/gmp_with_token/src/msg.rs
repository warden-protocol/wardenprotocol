use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Binary;

#[cw_serde]
pub struct InstantiateMsg {
    pub admin: String,
    pub wormhole_ibc_channel_id: String,
    pub wormhole_ibc_sender: String,
    pub wormhole_ibc_recipient: String,
    pub wormhole_ibc_timeout_sec: u64,
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ParsedVAA)]
    VerifyVAA { vaa: Binary },
}

#[cw_serde]
pub enum ExecuteMsg {
    SetChainEmitter { chain_id: u16, emitter: Binary },
    PostMessage { chain_id: u16, message: Binary },
    ReceiveMessage { message: Binary },
}

#[cw_serde]
pub enum WormholeQueryMsg {
    VerifyVAA { vaa: Binary, block_time: u64 },
}

#[cw_serde]
pub enum WormholeExecuteMsg {
    SubmitVAA { vaa: Binary },
    PostMessage { message: Binary, nonce: u32 },
}

#[cw_serde]
pub struct ParsedVAA {
    pub version: u8,
    pub guardian_set_index: u32,
    pub timestamp: u32,
    pub nonce: u32,
    pub len_signers: u8,

    pub emitter_chain: u16,
    pub emitter_address: Vec<u8>,
    pub sequence: u64,
    pub consistency_level: u8,
    pub payload: Vec<u8>,

    pub hash: Vec<u8>,
}

#[cw_serde]
pub enum GatewayIbcTokenBridgePayload {
    GatewayTransferWithPayload {
        chain: u16,
        contract: Binary,
        payload: Binary,
        nonce: u32,
    },
}
