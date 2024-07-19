use anchor_lang::prelude::*;

use crate::PostedGmpMessage;

#[account]
#[derive(Default)]
pub struct ForeignContract {
    pub chain: u16,
    pub address: [u8; 32],
    pub token_bridge_foreign_endpoint: Pubkey,
}

impl ForeignContract {
    pub const MAXIMUM_SIZE: usize = 8 // discriminator
        + 2 // chain
        + 32 // address
        + 32; // token_bridge_foreign_endpoint

    pub const SEED_PREFIX: &'static [u8; 16] = b"foreign_contract";

    pub fn verify(&self, vaa: &PostedGmpMessage) -> bool {
        vaa.emitter_chain() == self.chain && *vaa.data().from_address() == self.address
    }
}
