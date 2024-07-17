use anchor_lang::prelude::*;

pub use context::*;
pub use error::*;
pub use message::*;
pub use state::*;

pub mod context;
pub mod error;
pub mod message;
pub mod state;

declare_id!("DMmiXQDrEwgmt8qHLoqekCRByqJdPn2mYFnfd56FWFE2");

#[program]
pub mod gmp {
    use super::*;
    use anchor_lang::solana_program;
    use wormhole_anchor_sdk::wormhole;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let config = &mut ctx.accounts.config;

        // Set the owner of the config (effectively the owner of the program).
        config.owner = ctx.accounts.owner.key();

        // Set Wormhole related addresses.
        {
            let wormhole = &mut config.wormhole;

            // wormhole::BridgeData (Wormhole's program data).
            wormhole.bridge = ctx.accounts.wormhole_bridge.key();

            // wormhole::FeeCollector (lamports collector for posting messages).
            wormhole.fee_collector = ctx.accounts.wormhole_fee_collector.key();

            // wormhole::tracks # of messages posted by this program).
            wormhole.sequence = ctx.accounts.wormhole_sequence.key();
        }

        // Set default values for posting Wormhole messages (0 means no batching).
        config.batch_id = 0;

        config.finality = wormhole::Finality::Confirmed as u8;

        // Initialize our Wormhole emitter account. It is not required by the
        // Wormhole program that there is an actual account associated with the
        // emitter PDA. The emitter PDA is just a mechanism to have the program
        // sign for the `wormhole::post_message` instruction.
        ctx.accounts.wormhole_emitter.bump = *ctx
            .bumps
            .get("wormhole_emitter")
            .ok_or(GmpError::BumpNotFound)?;

        // This scope shows the steps of how to post a message with the Wormhole program.
        {
            let fee = ctx.accounts.wormhole_bridge.fee();
            if fee > 0 {
                solana_program::program::invoke(
                    &solana_program::system_instruction::transfer(
                        &ctx.accounts.owner.key(),
                        &ctx.accounts.wormhole_fee_collector.key(),
                        fee,
                    ),
                    &ctx.accounts.to_account_infos(),
                )?;
            }

            // Invoke `wormhole::post_message`. We are sending a Wormhole
            // message in the `initialize` instruction so the Wormhole program
            // can create a SequenceTracker account for our emitter.
            // `wormhole::post_message` requires two signers: one for the
            // emitter and another for the wormhole message data. Both of these
            // accounts are owned by this program.
            let wormhole_emitter = &ctx.accounts.wormhole_emitter;
            let config = &ctx.accounts.config;

            let mut payload: Vec<u8> = Vec::new();
            GmpMessage::serialize(
                &GmpMessage::Alive {
                    program_id: *ctx.program_id,
                },
                &mut payload,
            )?;

            wormhole::post_message(
                CpiContext::new_with_signer(
                    ctx.accounts.wormhole_program.to_account_info(),
                    wormhole::PostMessage {
                        config: ctx.accounts.wormhole_bridge.to_account_info(),
                        message: ctx.accounts.wormhole_message.to_account_info(),
                        emitter: wormhole_emitter.to_account_info(),
                        sequence: ctx.accounts.wormhole_sequence.to_account_info(),
                        payer: ctx.accounts.owner.to_account_info(),
                        fee_collector: ctx.accounts.wormhole_fee_collector.to_account_info(),
                        clock: ctx.accounts.clock.to_account_info(),
                        rent: ctx.accounts.rent.to_account_info(),
                        system_program: ctx.accounts.system_program.to_account_info(),
                    },
                    &[
                        &[
                            SEED_PREFIX_SENT,
                            &wormhole::INITIAL_SEQUENCE.to_le_bytes()[..],
                            &[*ctx
                                .bumps
                                .get("wormhole_message")
                                .ok_or(GmpError::BumpNotFound)?],
                        ],
                        &[wormhole::SEED_PREFIX_EMITTER, &[wormhole_emitter.bump]],
                    ],
                ),
                config.batch_id,
                payload,
                config.finality.try_into().unwrap(),
            )?;
        }

        Ok(())
    }

    /// This instruction registers a new foreign emitter (from another network)
    /// and saves the emitter information in a ForeignEmitter account.
    pub fn register_emitter(
        ctx: Context<RegisterEmitter>,
        chain: u16,
        address: [u8; 32],
    ) -> Result<()> {
        require!(
            chain > 0 && chain != wormhole::CHAIN_ID_SOLANA && !address.iter().all(|&x| x == 0),
            GmpError::InvalidForeignEmitter,
        );

        let emitter = &mut ctx.accounts.foreign_emitter;
        emitter.chain = chain;
        emitter.address = address;

        Ok(())
    }

    /// This instruction posts a Wormhole message of some arbitrary size
    /// in the form of bytes ([Vec<u8>]).
    pub fn send_message(ctx: Context<SendMessage>, message: Vec<u8>) -> Result<()> {
        let fee = ctx.accounts.wormhole_bridge.fee();
        if fee > 0 {
            solana_program::program::invoke(
                &solana_program::system_instruction::transfer(
                    &ctx.accounts.payer.key(),
                    &ctx.accounts.wormhole_fee_collector.key(),
                    fee,
                ),
                &ctx.accounts.to_account_infos(),
            )?;
        }

        let wormhole_emitter = &ctx.accounts.wormhole_emitter;
        let config = &ctx.accounts.config;

        let payload: Vec<u8> = GmpMessage::Command { message }.try_to_vec()?;

        wormhole::post_message(
            CpiContext::new_with_signer(
                ctx.accounts.wormhole_program.to_account_info(),
                wormhole::PostMessage {
                    config: ctx.accounts.wormhole_bridge.to_account_info(),
                    message: ctx.accounts.wormhole_message.to_account_info(),
                    emitter: wormhole_emitter.to_account_info(),
                    sequence: ctx.accounts.wormhole_sequence.to_account_info(),
                    payer: ctx.accounts.payer.to_account_info(),
                    fee_collector: ctx.accounts.wormhole_fee_collector.to_account_info(),
                    clock: ctx.accounts.clock.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                    system_program: ctx.accounts.system_program.to_account_info(),
                },
                &[
                    &[
                        SEED_PREFIX_SENT,
                        &ctx.accounts.wormhole_sequence.next_value().to_le_bytes()[..],
                        &[*ctx
                            .bumps
                            .get("wormhole_message")
                            .ok_or(GmpError::BumpNotFound)?],
                    ],
                    &[wormhole::SEED_PREFIX_EMITTER, &[wormhole_emitter.bump]],
                ],
            ),
            config.batch_id,
            payload,
            config.finality.try_into().unwrap(),
        )?;

        Ok(())
    }

    /// This instruction reads a posted verified Wormhole message and verifies
    /// that the payload is of type [GmpMessage::Command] (payload ID == 1).
    pub fn receive_message(ctx: Context<ReceiveMessage>, vaa_hash: [u8; 32]) -> Result<()> {
        let posted_message = &ctx.accounts.posted;

        if let GmpMessage::Command { message } = posted_message.data() {
            require!(
                message.len() <= MESSAGE_MAX_LENGTH,
                GmpError::InvalidMessage,
            );

            let received = &mut ctx.accounts.received;
            received.batch_id = posted_message.batch_id();
            received.wormhole_message_hash = vaa_hash;
            received.message = message.clone();

            Ok(())
        } else {
            Err(GmpError::InvalidMessage.into())
        }
    }
}
