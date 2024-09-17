use anchor_lang::{AnchorDeserialize, AnchorSerialize};
use std::io;
use wormhole_anchor_sdk::token_bridge;

const PAYLOAD_ID_PAYLOAD: u8 = 1;

#[derive(Clone, Copy)]
pub enum GmpMessage {
    Payload { recipient: [u8; 32] },
}

impl AnchorSerialize for GmpMessage {
    fn serialize<W: io::Write>(&self, writer: &mut W) -> io::Result<()> {
        match self {
            GmpMessage::Payload { recipient } => {
                PAYLOAD_ID_PAYLOAD.serialize(writer)?;
                recipient.serialize(writer)
            }
        }
    }
}

impl AnchorDeserialize for GmpMessage {
    fn deserialize(buf: &mut &[u8]) -> io::Result<Self> {
        match buf[0] {
            PAYLOAD_ID_PAYLOAD => Ok(GmpMessage::Payload {
                recipient: <[u8; 32]>::deserialize(&mut &buf[1..33])?,
            }),
            _ => Err(io::Error::new(
                io::ErrorKind::InvalidInput,
                "invalid payload ID",
            )),
        }
    }
}

pub type PostedGmpMessage = token_bridge::PostedTransferWith<GmpMessage>;
