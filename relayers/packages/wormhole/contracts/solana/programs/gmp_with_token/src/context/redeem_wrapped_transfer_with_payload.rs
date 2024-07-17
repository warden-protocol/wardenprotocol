use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{Token, TokenAccount};
use wormhole_anchor_sdk::{token_bridge, wormhole};

use super::SEED_PREFIX_TMP;
use crate::state::{ForeignContract, RedeemerConfig};
use crate::{GmpWithTokenError, PostedGmpMessage};

#[derive(Accounts)]
#[instruction(vaa_hash: [u8; 32])]
pub struct RedeemWrappedTransferWithPayload<'info> {
    #[account(mut)]
    /// Payer will pay Wormhole fee to transfer tokens and create temporary
    /// token account.
    pub payer: Signer<'info>,

    #[account(
        mut,
        constraint = payer.key() == recipient.key() || payer_token_account.key() == anchor_spl::associated_token::get_associated_token_address(&payer.key(), &token_bridge_wrapped_mint.key()) @ GmpWithTokenError::InvalidPayerAta
    )]
    /// CHECK: Payer's token account. If payer != recipient, must be an
    /// associated token account.
    pub payer_token_account: UncheckedAccount<'info>,

    #[account(
        seeds = [RedeemerConfig::SEED_PREFIX],
        bump
    )]
    /// Redeemer Config account. Acts as the Token Bridge redeemer, which signs
    /// for the complete transfer instruction. Read-only.
    pub config: Box<Account<'info, RedeemerConfig>>,

    #[account(
        seeds = [
            ForeignContract::SEED_PREFIX,
            &vaa.emitter_chain().to_le_bytes()[..]
        ],
        bump,
        constraint = foreign_contract.verify(&vaa) @ GmpWithTokenError::InvalidForeignContract
    )]
    /// Foreign Contract account. The registered contract specified in this
    /// account must agree with the target address for the Token Bridge's token
    /// transfer. Read-only.
    pub foreign_contract: Box<Account<'info, ForeignContract>>,

    #[account(
        mut,
        seeds = [
            token_bridge::WrappedMint::SEED_PREFIX,
            &vaa.data().token_chain().to_be_bytes(),
            vaa.data().token_address()
        ],
        bump,
        seeds::program = token_bridge_program
    )]
    /// Token Bridge wrapped mint info. This is the SPL token that will be
    /// bridged from the foreign contract. The wrapped mint PDA must agree
    /// with the native token's metadata in the wormhole message. Mutable.
    pub token_bridge_wrapped_mint: Box<Account<'info, token_bridge::WrappedMint>>,

    #[account(
        mut,
        associated_token::mint = token_bridge_wrapped_mint,
        associated_token::authority = recipient
    )]
    /// Recipient associated token account.
    pub recipient_token_account: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    /// CHECK: recipient may differ from payer if a relayer paid for this
    /// transaction.
    pub recipient: UncheckedAccount<'info>,

    #[account(
        init,
        payer = payer,
        seeds = [
            SEED_PREFIX_TMP,
            token_bridge_wrapped_mint.key().as_ref(),
        ],
        bump,
        token::mint = token_bridge_wrapped_mint,
        token::authority = config
    )]
    /// Program's temporary token account. This account is created before the
    /// instruction is invoked to temporarily take custody of the payer's
    /// tokens. When the tokens are finally bridged in, the tokens will be
    /// transferred to the destination token accounts. This account will have
    /// zero balance and can be closed.
    pub tmp_token_account: Box<Account<'info, TokenAccount>>,

    /// Wormhole program.
    pub wormhole_program: Program<'info, wormhole::program::Wormhole>,

    /// Token Bridge program.
    pub token_bridge_program: Program<'info, token_bridge::program::TokenBridge>,

    #[account(
        seeds = [
            token_bridge::WrappedMeta::SEED_PREFIX,
            token_bridge_wrapped_mint.key().as_ref()
        ],
        bump,
        seeds::program = token_bridge_program
    )]
    /// Token Bridge program's wrapped metadata, which stores info
    /// about the token from its native chain:
    ///   * Wormhole Chain ID
    ///   * Token's native contract address
    ///   * Token's native decimals
    pub token_bridge_wrapped_meta: Account<'info, token_bridge::WrappedMeta>,

    #[account(
        address = config.token_bridge.config @ GmpWithTokenError::InvalidTokenBridgeConfig
    )]
    /// Token Bridge config. Read-only.
    pub token_bridge_config: Account<'info, token_bridge::Config>,

    #[account(
        seeds = [
            wormhole::SEED_PREFIX_POSTED_VAA,
            &vaa_hash
        ],
        bump,
        seeds::program = wormhole_program,
        constraint = vaa.data().to() == crate::ID || vaa.data().to() == config.key() @ GmpWithTokenError::InvalidTransferToAddress,
        constraint = vaa.data().to_chain() == wormhole::CHAIN_ID_SOLANA @ GmpWithTokenError::InvalidTransferToChain,
        constraint = vaa.data().token_chain() != wormhole::CHAIN_ID_SOLANA @ GmpWithTokenError::InvalidTransferTokenChain
    )]
    /// Verified Wormhole message account. The Wormhole program verified
    /// signatures and posted the account data here. Read-only.
    pub vaa: Box<Account<'info, PostedGmpMessage>>,

    #[account(mut)]
    /// CHECK: Token Bridge claim account. It stores a boolean, whose value
    /// is true if the bridged assets have been claimed. If the transfer has
    /// not been redeemed, this account will not exist yet.
    pub token_bridge_claim: UncheckedAccount<'info>,

    #[account(
        address = foreign_contract.token_bridge_foreign_endpoint @ GmpWithTokenError::InvalidTokenBridgeForeignEndpoint
    )]
    /// Token Bridge foreign endpoint. This account should really be one
    /// endpoint per chain, but the PDA allows for multiple endpoints for each
    /// chain! We store the proper endpoint for the emitter chain.
    pub token_bridge_foreign_endpoint: Account<'info, token_bridge::EndpointRegistration>,

    #[account(
        address = config.token_bridge.mint_authority @ GmpWithTokenError::InvalidTokenBridgeMintAuthority
    )]
    /// CHECK: Token Bridge custody signer. Read-only.
    pub token_bridge_mint_authority: UncheckedAccount<'info>,

    /// System program.
    pub system_program: Program<'info, System>,

    /// Token program.
    pub token_program: Program<'info, Token>,

    /// Associated Token program.
    pub associated_token_program: Program<'info, AssociatedToken>,

    /// Rent sysvar.
    pub rent: Sysvar<'info, Rent>,
}
