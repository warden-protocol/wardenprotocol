use anchor_lang::prelude::*;
use wormhole_anchor_sdk::token_bridge;

#[derive(Default, AnchorSerialize, AnchorDeserialize, Copy, Clone, PartialEq, Eq)]
pub struct OutboundTokenBridgeAddresses {
    pub config: Pubkey,
    pub authority_signer: Pubkey,
    pub custody_signer: Pubkey,
    pub emitter: Pubkey,
    pub sequence: Pubkey,

    pub wormhole_bridge: Pubkey,
    pub wormhole_fee_collector: Pubkey,
}

#[account]
#[derive(Default)]
pub struct SenderConfig {
    pub owner: Pubkey,
    pub bump: u8,
    pub token_bridge: OutboundTokenBridgeAddresses,

    pub finality: u8,
}

impl SenderConfig {
    pub const MAXIMUM_SIZE: usize = 8 // discriminator
        + 32 // owner
        + 1 // bump
        + 32 // config
        + 32 // authority_signer
        + 32 // custody_signer
        + 32 // token_bridge_emitter
        + 32 // token_bridge_sequence
        + 32 // wormhole_bridge
        + 32 // wormhole_fee_collector
        + 1; // finality

    pub const SEED_PREFIX: &'static [u8; 6] = token_bridge::SEED_PREFIX_SENDER;
}
