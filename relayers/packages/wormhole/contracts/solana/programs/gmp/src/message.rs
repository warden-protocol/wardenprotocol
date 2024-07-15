use anchor_lang::{prelude::Pubkey, AnchorDeserialize, AnchorSerialize};
use std::io;

const PAYLOAD_ID_ALIVE: u8 = 0;
const PAYLOAD_ID_COMMAND: u8 = 1;

pub const GMP_MESSAGE_MAX_LENGTH: usize = 512;

#[derive(Clone)]
pub enum GmpMessage {
    Alive { program_id: Pubkey },
    Command { message: Vec<u8> },
}

impl AnchorSerialize for GmpMessage {
    fn serialize<W: io::Write>(&self, writer: &mut W) -> io::Result<()> {
        match self {
            GmpMessage::Alive { program_id } => {
                PAYLOAD_ID_ALIVE.serialize(writer)?;
                program_id.serialize(writer)
            }
            GmpMessage::Command { message } => {
                if message.len() > GMP_MESSAGE_MAX_LENGTH {
                    Err(io::Error::new(
                        io::ErrorKind::InvalidInput,
                        format!("message exceeds {GMP_MESSAGE_MAX_LENGTH} bytes"),
                    ))
                } else {
                    PAYLOAD_ID_COMMAND.serialize(writer)?;
                    (message.len() as u16).to_be_bytes().serialize(writer)?;
                    for item in message {
                        item.serialize(writer)?;
                    }
                    Ok(())
                }
            }
        }
    }
}

impl AnchorDeserialize for GmpMessage {
    fn deserialize(buf: &mut &[u8]) -> io::Result<Self> {
        match buf[0] {
            PAYLOAD_ID_ALIVE => Ok(GmpMessage::Alive {
                program_id: Pubkey::try_from(&buf[1..33]).unwrap(),
            }),
            PAYLOAD_ID_COMMAND => {
                let length = {
                    let mut out = [0u8; 2];
                    out.copy_from_slice(&buf[1..3]);
                    u16::from_be_bytes(out) as usize
                };
                if length > GMP_MESSAGE_MAX_LENGTH {
                    Err(io::Error::new(
                        io::ErrorKind::InvalidInput,
                        format!("message exceeds {GMP_MESSAGE_MAX_LENGTH} bytes"),
                    ))
                } else {
                    Ok(GmpMessage::Command {
                        message: buf[3..(3 + length)].to_vec(),
                    })
                }
            }
            _ => Err(io::Error::new(
                io::ErrorKind::InvalidInput,
                "invalid payload ID",
            )),
        }
    }
}
