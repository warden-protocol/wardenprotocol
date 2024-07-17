use anchor_lang::prelude::*;
use wormhole_anchor_sdk::wormhole;

use crate::error::GmpError;
use crate::state::config::Config;
use crate::state::wormhole_emitter::WormholeEmitter;

pub const SEED_PREFIX_SENT: &[u8; 4] = b"sent";

#[derive(Accounts)]
pub struct SendMessage<'info> {
    #[account(mut)]
    /// Payer will pay Wormhole fee to post a message.
    pub payer: Signer<'info>,

    #[account(
        seeds = [Config::SEED_PREFIX],
        bump,
    )]
    /// Wormhole PDAs specified in the config are checked
    /// against the Wormhole accounts in this context. Read-only.
    pub config: Account<'info, Config>,

    /// Wormhole program.
    pub wormhole_program: Program<'info, wormhole::program::Wormhole>,

    #[account(
        mut,
        address = config.wormhole.bridge @ GmpError::InvalidWormholeConfig
    )]
    /// Wormhole bridge data.
    /// [`wormhole::post_message`] requires this account be mutable.
    pub wormhole_bridge: Account<'info, wormhole::BridgeData>,

    #[account(
        mut,
        address = config.wormhole.fee_collector @ GmpError::InvalidWormholeFeeCollector
    )]
    /// Wormhole fee collector.
    /// [`wormhole::post_message`] requires this account be mutable.
    pub wormhole_fee_collector: Account<'info, wormhole::FeeCollector>,

    #[account(
        seeds = [WormholeEmitter::SEED_PREFIX],
        bump,
    )]
    /// Program's emitter account. Read-only.
    pub wormhole_emitter: Account<'info, WormholeEmitter>,

    #[account(
        mut,
        address = config.wormhole.sequence @ GmpError::InvalidWormholeSequence
    )]
    /// Emitter's sequence account.
    /// [`wormhole::post_message`] requires this account be mutable.
    pub wormhole_sequence: Account<'info, wormhole::SequenceTracker>,

    #[account(
        mut,
        seeds = [
            SEED_PREFIX_SENT,
            &wormhole_sequence.next_value().to_le_bytes()[..]
        ],
        bump,
    )]
    /// CHECK: Wormhole Message.
    /// [`wormhole::post_message`] requires this account be mutable.
    pub wormhole_message: UncheckedAccount<'info>,

    /// System program.
    pub system_program: Program<'info, System>,

    /// Clock sysvar.
    pub clock: Sysvar<'info, Clock>,

    /// Rent sysvar.
    pub rent: Sysvar<'info, Rent>,
}
