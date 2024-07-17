use anchor_lang::prelude::*;

use crate::error::GmpError;
use crate::state::config::Config;
use crate::state::foreign_emitter::ForeignEmitter;

#[derive(Accounts)]
#[instruction(chain: u16)]
pub struct RegisterEmitter<'info> {
    #[account(mut)]
    /// Signer for creating the [`ForeignEmitter`] account.
    pub owner: Signer<'info>,

    #[account(
        has_one = owner @ GmpError::OwnerOnly,
        seeds = [Config::SEED_PREFIX],
        bump
    )]
    /// The program requires that the `owner` specified in the
    /// context equals the pubkey specified in this account. Read-only.
    pub config: Account<'info, Config>,

    #[account(
        init_if_needed,
        payer = owner,
        seeds = [
            ForeignEmitter::SEED_PREFIX,
            &chain.to_le_bytes()[..]
        ],
        bump,
        space = ForeignEmitter::MAXIMUM_SIZE
    )]
    /// Registers or overwrites an emitter for a Wormhole chain ID.
    pub foreign_emitter: Account<'info, ForeignEmitter>,

    /// System program.
    pub system_program: Program<'info, System>,
}
