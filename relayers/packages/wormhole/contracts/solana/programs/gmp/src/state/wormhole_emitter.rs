use anchor_lang::prelude::*;
use wormhole_anchor_sdk::wormhole;

#[account]
#[derive(Default)]
pub struct WormholeEmitter {
    /// PDA bump.
    pub bump: u8,
}

impl WormholeEmitter {
    pub const MAXIMUM_SIZE: usize = 8 // discriminator
    + 1; // bump

    pub const SEED_PREFIX: &'static [u8; 7] = wormhole::SEED_PREFIX_EMITTER;
}
