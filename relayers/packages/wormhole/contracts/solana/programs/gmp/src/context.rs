use anchor_lang::prelude::*;
use wormhole_anchor_sdk::wormhole;

use crate::error::GmpError;
use crate::message::GmpMessage;
use crate::state::{Config, ForeignEmitter, Received, WormholeEmitter};

pub const SEED_PREFIX_SENT: &[u8; 4] = b"sent";

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    /// Initializer will be the owner of the program. The owner posts a Wormhole message
    ///  indicating that the program is alive.
    pub owner: Signer<'info>,

    #[account(
        init,
        payer = owner,
        seeds = [Config::SEED_PREFIX],
        bump,
        space = Config::MAXIMUM_SIZE,

    )]
    /// Config account, which saves program data useful for other instructions.
    pub config: Account<'info, Config>,

    /// Wormhole program.
    pub wormhole_program: Program<'info, wormhole::program::Wormhole>,

    #[account(
        mut,
        seeds = [wormhole::BridgeData::SEED_PREFIX],
        bump,
        seeds::program = wormhole_program,
    )]
    /// Wormhole bridge data account (its config).
    /// [`wormhole::post_message`] requires this account be mutable.
    pub wormhole_bridge: Account<'info, wormhole::BridgeData>,

    #[account(
        mut,
        seeds = [wormhole::FeeCollector::SEED_PREFIX],
        bump,
        seeds::program = wormhole_program
    )]
    /// Wormhole fee collector account (if there is a fee).
    /// [`wormhole::post_message`] requires this account be mutable.
    pub wormhole_fee_collector: Account<'info, wormhole::FeeCollector>,

    #[account(
        init,
        payer = owner,
        seeds = [WormholeEmitter::SEED_PREFIX],
        bump,
        space = WormholeEmitter::MAXIMUM_SIZE
    )]
    /// This program's emitter account.
    /// [`wormhole::post_message`] only needs it to be read-only.
    pub wormhole_emitter: Account<'info, WormholeEmitter>,

    #[account(
        mut,
        seeds = [
            wormhole::SequenceTracker::SEED_PREFIX,
            wormhole_emitter.key().as_ref()
        ],
        bump,
        seeds::program = wormhole_program
    )]
    /// CHECK: Emitter's sequence account. This is not created until the first
    /// message is posted, so it needs to be an [UncheckedAccount] for the
    /// [`initialize`](crate::initialize) instruction.
    /// [`wormhole::post_message`] requires this account be mutable.
    pub wormhole_sequence: UncheckedAccount<'info>,

    #[account(
        mut,
        seeds = [
            SEED_PREFIX_SENT,
            &wormhole::INITIAL_SEQUENCE.to_le_bytes()[..]
        ],
        bump,
    )]
    /// CHECK: Wormhole message account. The Wormhole program writes to this
    /// account, which requires this program's signature.
    /// [`wormhole::post_message`] requires this account be mutable.
    pub wormhole_message: UncheckedAccount<'info>,

    /// Clock sysvar.
    pub clock: Sysvar<'info, Clock>,

    /// Rent sysvar.
    pub rent: Sysvar<'info, Rent>,

    /// System program.
    pub system_program: Program<'info, System>,
}

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

#[derive(Accounts)]
#[instruction(vaa_hash: [u8; 32])]
pub struct ReceiveMessage<'info> {
    #[account(mut)]
    /// Payer will initialize an account that tracks his own message IDs.
    pub payer: Signer<'info>,

    #[account(
        seeds = [Config::SEED_PREFIX],
        bump,
    )]
    /// Wormhole PDAs specified in the config are checked
    /// against the Wormhole accounts in this context. Read-only.
    pub config: Account<'info, Config>,

    // Wormhole program.
    pub wormhole_program: Program<'info, wormhole::program::Wormhole>,

    #[account(
        seeds = [
            wormhole::SEED_PREFIX_POSTED_VAA,
            &vaa_hash
        ],
        bump,
        seeds::program = wormhole_program
    )]
    /// Verified Wormhole message account. The Wormhole program verified
    /// signatures and posted the account data here. Read-only.
    pub posted: Account<'info, wormhole::PostedVaa<GmpMessage>>,

    #[account(
        seeds = [
            ForeignEmitter::SEED_PREFIX,
            &posted.emitter_chain().to_le_bytes()[..]
        ],
        bump,
        constraint = foreign_emitter.verify(posted.emitter_address()) @ GmpError::InvalidForeignEmitter
    )]
    /// The posted message's `emitter_address` must agree with the one
    /// registered for this message's `emitter_chain` (chain ID). Read-only.
    pub foreign_emitter: Account<'info, ForeignEmitter>,

    #[account(
        init,
        payer = payer,
        seeds = [
            Received::SEED_PREFIX,
            &posted.emitter_chain().to_le_bytes()[..],
            &posted.sequence().to_le_bytes()[..]
        ],
        bump,
        space = Received::MAXIMUM_SIZE
    )]
    /// [`receive_message`](crate::receive_message) will deserialize the Wormhole
    /// message's payload and save it to this account. This account cannot be overwritten,
    /// and will prevent Wormhole message replay with the same sequence.
    pub received: Account<'info, Received>,

    /// System program.
    pub system_program: Program<'info, System>,
}
