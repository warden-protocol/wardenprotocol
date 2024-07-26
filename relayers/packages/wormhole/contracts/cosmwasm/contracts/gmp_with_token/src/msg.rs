use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Binary, Uint128};
use cw20::Cw20ReceiveMsg;

#[cw_serde]
pub struct InstantiateMsg {
    pub admin: String,
    pub wormhole_core: String,
    pub wormhole_token_bridge_contract: String,
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(ParsedVAA)]
    VerifyVAA { vaa: Binary },
}

#[cw_serde]
pub enum ExecuteMsg {
    SetChainEmitter {
        chain_id: u16,
        emitter: Binary,
    },
    PostMessage {
        message: Binary,
        nonce: u32,
    },
    ReceiveMessage {
        vaa: Binary,
    },

    /// Submit a VAA to complete a wormhole payload3 token bridge transfer.
    /// This function will:
    /// 1. complete the wormhole token bridge transfer.
    /// 2. Lock the newly minted cw20 tokens.
    /// 3. CreateDenom (if it doesn't already exist)
    /// 4. Mint an equivalent amount of bank tokens using the token factory.
    /// 5. Send the minted bank tokens to the destination address.
    CompleteTransferAndConvert {
        /// VAA to submit. The VAA should be encoded in the standard wormhole
        /// wire format.
        vaa: Binary,
    },

    /// Convert bank tokens into the equivalent (locked) cw20 tokens and trigger a wormhole token bridge transfer.
    /// This function will:
    /// 1. Validate that the bank tokens originated from cw20 tokens that are locked in this contract.
    /// 2. Burn the bank tokens using the token factory.
    /// 3. Unlock the equivalent cw20 tokens.
    /// 4. Cross-call into the wormhole token bridge to initiate a cross-chain transfer.
    ConvertAndTransferWithPayload {
        target_chain: u16,
        target_contract: Binary,
        payload: Binary,
        fee: Uint128,
        nonce: u32,
    },

    /// Convert bank tokens into cw20 tokens using the token factory.
    /// This function will:
    /// 1. Validate that the bank tokens originated from cw20 tokens that are locked in this contract.
    /// 2. Burn the bank tokens using the token factory.
    /// 3. Unlock the equivalent cw20 tokens.
    /// 4. Send the unlocked cw20 tokens back to the caller.
    ConvertBankToCw20 {},

    /// Implements the CW20 receiver interface to recieve cw20 tokens and act on them.
    /// Cw20ReceiveMsg.msg will be deserialized into the ReceiveAction type.
    Receive(Cw20ReceiveMsg),
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
