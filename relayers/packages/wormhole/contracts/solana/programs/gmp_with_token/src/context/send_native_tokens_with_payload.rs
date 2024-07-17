use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Mint, Token, TokenAccount};
use wormhole_anchor_sdk::{token_bridge, wormhole};

use super::{SEED_PREFIX_BRIDGED, SEED_PREFIX_TMP};
use crate::state::{ForeignContract, SenderConfig};
use crate::GmpWithTokenError;

#[derive(Accounts)]
#[instruction(
    batch_id: u32,
    amount: u64,
    recipient_address: [u8; 32],
    recipient_chain: u16,
)]
pub struct SendNativeTokensWithPayload<'info> {
    /// Payer will pay Wormhole fee to transfer tokens and create temporary
    /// token account.
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        seeds = [SenderConfig::SEED_PREFIX],
        bump
    )]
    /// Sender Config account. Acts as the signer for the Token Bridge token
    /// transfer. Read-only.
    pub config: Box<Account<'info, SenderConfig>>,

    #[account(
        seeds = [
            ForeignContract::SEED_PREFIX,
            &recipient_chain.to_le_bytes()[..]
        ],
        bump,
    )]
    /// Foreign Contract account. Send tokens to the contract specified in this
    /// account. The Token Bridge program does not have any requirements for outbound
    /// transfers for the recipient chain to be registered. This account provides
    /// extra protection against sending tokens to an unregistered Wormhole chain ID.
    /// Read-only.
    pub foreign_contract: Box<Account<'info, ForeignContract>>,

    #[account(mut)]
    /// Mint info. This is the SPL token that will be bridged over to the
    /// foreign contract. Mutable.
    pub mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = payer,
    )]
    /// Payer's associated token account. We may want to make this a generic
    /// token account in the future.
    pub from_token_account: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = payer,
        seeds = [
            SEED_PREFIX_TMP,
            mint.key().as_ref(),
        ],
        bump,
        token::mint = mint,
        token::authority = config,
    )]
    /// Program's temporary token account. This account is created before the
    /// instruction is invoked to temporarily take custody of the payer's
    /// tokens. When the tokens are finally bridged out, the token account
    /// will have zero balance and can be closed.
    pub tmp_token_account: Box<Account<'info, TokenAccount>>,

    /// Wormhole program.
    pub wormhole_program: Program<'info, wormhole::program::Wormhole>,

    /// Token Bridge program.
    pub token_bridge_program: Program<'info, token_bridge::program::TokenBridge>,

    #[account(
        address = config.token_bridge.config @ GmpWithTokenError::InvalidTokenBridgeConfig
    )]
    /// Token Bridge config. Read-only.
    pub token_bridge_config: Account<'info, token_bridge::Config>,

    #[account(
        mut,
        seeds = [mint.key().as_ref()],
        bump,
        seeds::program = token_bridge_program
    )]
    /// CHECK: Token Bridge custody. This is the Token Bridge program's token
    /// account that holds this mint's balance. This account needs to be
    /// unchecked because a token account may not have been created for this
    /// mint yet. Mutable.
    pub token_bridge_custody: UncheckedAccount<'info>,

    #[account(
        address = config.token_bridge.authority_signer @ GmpWithTokenError::InvalidTokenBridgeAuthoritySigner
    )]
    /// CHECK: Token Bridge authority signer. Read-only.
    pub token_bridge_authority_signer: UncheckedAccount<'info>,

    #[account(
        address = config.token_bridge.custody_signer @ GmpWithTokenError::InvalidTokenBridgeCustodySigner
    )]
    /// CHECK: Token Bridge custody signer. Read-only.
    pub token_bridge_custody_signer: UncheckedAccount<'info>,

    #[account(
        mut,
        address = config.token_bridge.wormhole_bridge @ GmpWithTokenError::InvalidWormholeBridge,
    )]
    /// Wormhole bridge data. Mutable.
    pub wormhole_bridge: Box<Account<'info, wormhole::BridgeData>>,

    #[account(
        mut,
        seeds = [
            SEED_PREFIX_BRIDGED,
            &token_bridge_sequence.next_value().to_le_bytes()[..]
        ],
        bump,
    )]
    /// CHECK: Wormhole Message. Token Bridge program writes info about the
    /// tokens transferred in this account for our program. Mutable.
    pub wormhole_message: UncheckedAccount<'info>,

    #[account(
        mut,
        address = config.token_bridge.emitter @ GmpWithTokenError::InvalidTokenBridgeEmitter
    )]
    /// CHECK: Token Bridge emitter. Read-only.
    pub token_bridge_emitter: UncheckedAccount<'info>,

    #[account(
        mut,
        address = config.token_bridge.sequence @ GmpWithTokenError::InvalidTokenBridgeSequence
    )]
    /// CHECK: Token Bridge sequence. Mutable.
    pub token_bridge_sequence: Account<'info, wormhole::SequenceTracker>,

    #[account(
        mut,
        address = config.token_bridge.wormhole_fee_collector @ GmpWithTokenError::InvalidWormholeFeeCollector
    )]
    /// Wormhole fee collector. Mutable.
    pub wormhole_fee_collector: Account<'info, wormhole::FeeCollector>,

    /// System program.
    pub system_program: Program<'info, System>,

    /// Token program.
    pub token_program: Program<'info, Token>,

    /// Associated Token program.
    pub associated_token_program: Program<'info, AssociatedToken>,

    /// Clock sysvar.
    pub clock: Sysvar<'info, Clock>,

    /// Rent sysvar.
    pub rent: Sysvar<'info, Rent>,
}
