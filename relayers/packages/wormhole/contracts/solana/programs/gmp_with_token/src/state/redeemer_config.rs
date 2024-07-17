use anchor_lang::prelude::*;
use wormhole_anchor_sdk::token_bridge;

#[derive(Default, AnchorSerialize, AnchorDeserialize, Copy, Clone, PartialEq, Eq)]
pub struct InboundTokenBridgeAddresses {
    pub config: Pubkey,
    pub custody_signer: Pubkey,
    pub mint_authority: Pubkey,
}

#[account]
#[derive(Default)]
pub struct RedeemerConfig {
    pub owner: Pubkey,
    pub bump: u8,
    pub token_bridge: InboundTokenBridgeAddresses,

    pub relayer_fee: u32,
    pub relayer_fee_precision: u32,
}

impl RedeemerConfig {
    pub const MAXIMUM_SIZE: usize = 8 // discriminator
        + 32 // owner
        + 1 // bump
        + 32 // config
        + 32 // custody_signer
        + 32 // mint_authority
        + 4 // relayer_fee
        + 4; // relayer_fee_precision

    pub const SEED_PREFIX: &'static [u8; 8] = token_bridge::SEED_PREFIX_REDEEMER;

    pub fn compute_relayer_amount(&self, amount: u64) -> u64 {
        (amount * self.relayer_fee as u64) / self.relayer_fee_precision as u64
    }
}
