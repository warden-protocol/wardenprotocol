use anchor_lang::prelude::*;

#[derive(Default, AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct WormholeAddresses {
    pub bridge: Pubkey,
    pub fee_collector: Pubkey,
    pub sequence: Pubkey,
}

impl WormholeAddresses {
    pub const LEN: usize = 32 // config
        + 32 // fee_collector
        + 32; // sequence
}

#[account]
#[derive(Default)]
pub struct Config {
    /// Program's owner.
    pub owner: Pubkey,
    /// Wormhole program's relevant addresses.
    pub wormhole: WormholeAddresses,
    /// Just zero, but saving this information in this account anyway (nonce).
    pub batch_id: u32,
    /// Consistency level
    pub finality: u8,
}

impl Config {
    pub const MAXIMUM_SIZE: usize = 8 // discriminator
        + 32 // owner
        + WormholeAddresses::LEN
        + 4 // batch_id
        + 1; // finality

    pub const SEED_PREFIX: &'static [u8; 6] = b"config";
}
