use anchor_lang::prelude::*;

use crate::GmpWithTokenError;
use crate::RedeemerConfig;

#[derive(Accounts)]
pub struct UpdateRelayerFee<'info> {
    #[account(mut)]
    /// CHECK: Owner of the program set in the [`RedeemerConfig`] account.
    pub owner: UncheckedAccount<'info>,

    #[account(
        mut,
        has_one = owner @ GmpWithTokenError::OwnerOnly,
        seeds = [RedeemerConfig::SEED_PREFIX],
        bump
    )]
    /// Redeemer Config account. The `owner` must equals the pubkey specified
    /// in this account. Mutable.
    pub config: Box<Account<'info, RedeemerConfig>>,

    /// System program.
    pub system_program: Program<'info, System>,
}
