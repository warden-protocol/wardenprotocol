use cosmwasm_std::{Binary, CanonicalAddr, Coin, StdResult, Uint128};
use cw_storage_plus::{Item, Map};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use sha3::{Digest, Keccak256};

use crate::byte_utils::ByteUtils;
use crate::error::ContractError;
use crate::msg::HumanAddr;

// Lock assets fee amount and denomination
pub const FEE_AMOUNT: u128 = 0;

pub const CONFIG: Item<ConfigInfo> = Item::new("CONFIG");
pub const GUARDIAN_SET: Map<u32, GuardianSetInfo> = Map::new("GUARDIAN_SET");
pub const SEQUENCE: Item<u64> = Item::new("SEQUENCE");
pub const WRAPPED_ASSET: Item<HumanAddr> = Item::new("WRAPPED_ASSET");
pub const WRAPPED_ASSET_ADDRESS: Item<Vec<u8>> = Item::new("WRAPPED_ASSET_ADDRESS");

/// Legacy version of [`ConfigInfo`]. Required for the migration.  In
/// particular, the last two fields of [`ConfigInfo`] have been added after the
/// Terra2 contract's deployment, which means that Terra2 needs to be migrated.
/// See [`crate::contract::migrate`] for details on why this is necessary.
/// Once the migration has been executed, this struct (and the corresponding
/// migration logic) can be deleted.
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ConfigInfoLegacy {
    /// Current active guardian set
    pub guardian_set_index: u32,

    /// Period for which a guardian set stays active after it has been replaced.
    /// The typo is an easter egg.
    pub guardian_set_expirity: u64,

    /// Governance chain (typically Solana, i.e. chain id 1)
    pub gov_chain: u16,

    /// Address of governance contract (typically 0x0000000000000000000000000000000000000000000000000000000000000004)
    pub gov_address: Vec<u8>,

    // Message sending fee
    pub fee: Coin,
}

/// Information about this contract's general parameters.
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ConfigInfo {
    /// Current active guardian set
    pub guardian_set_index: u32,

    /// Period for which a guardian set stays active after it has been replaced.
    /// The typo is an easter egg.
    pub guardian_set_expirity: u64,

    /// Governance chain (typically Solana, i.e. chain id 1)
    pub gov_chain: u16,

    /// Address of governance contract (typically 0x0000000000000000000000000000000000000000000000000000000000000004)
    pub gov_address: Vec<u8>,

    // Message sending fee
    pub fee: Coin,

    /// The wormhole id of the current chain.
    pub chain_id: u16,

    /// The denom in which transaction fees and wormhole fees are paid.
    /// Typically the native denom of the current chain.
    pub fee_denom: String,
}

// Validator Action Approval(VAA) data
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct ParsedVAA {
    pub version: u8,
    pub guardian_set_index: u32,
    pub timestamp: u32,
    pub nonce: u32,
    pub len_signers: u8,

    pub emitter_chain: u16,
    pub emitter_address: Vec<u8>,
    pub sequence: u64,
    pub consistency_level: u8,
    pub payload: Vec<u8>,

    pub hash: Vec<u8>,
}

impl ParsedVAA {
    /* VAA format:

    header (length 6):
    0   uint8   version (0x01)
    1   uint32  guardian set index
    5   uint8   len signatures

    per signature (length 66):
    0   uint8       index of the signer (in guardian keys)
    1   [65]uint8   signature

    body:
    0   uint32      timestamp (unix in seconds)
    4   uint32      nonce
    8   uint16      emitter_chain
    10  [32]uint8   emitter_address
    42  uint64      sequence
    50  uint8       consistency_level
    51  []uint8     payload
    */

    pub const HEADER_LEN: usize = 6;
    pub const SIGNATURE_LEN: usize = 66;

    pub const GUARDIAN_SET_INDEX_POS: usize = 1;
    pub const LEN_SIGNER_POS: usize = 5;

    pub const VAA_NONCE_POS: usize = 4;
    pub const VAA_EMITTER_CHAIN_POS: usize = 8;
    pub const VAA_EMITTER_ADDRESS_POS: usize = 10;
    pub const VAA_SEQUENCE_POS: usize = 42;
    pub const VAA_CONSISTENCY_LEVEL_POS: usize = 50;
    pub const VAA_PAYLOAD_POS: usize = 51;

    // Signature data offsets in the signature block
    pub const SIG_DATA_POS: usize = 1;
    // Signature length minus recovery id at the end
    pub const SIG_DATA_LEN: usize = 64;
    // Recovery byte is last after the main signature
    pub const SIG_RECOVERY_POS: usize = Self::SIG_DATA_POS + Self::SIG_DATA_LEN;

    pub fn deserialize(data: &[u8]) -> StdResult<Self> {
        let version = data.get_u8(0);

        // Load 4 bytes starting from index 1
        let guardian_set_index: u32 = data.get_u32(Self::GUARDIAN_SET_INDEX_POS);
        let len_signers = data.get_u8(Self::LEN_SIGNER_POS) as usize;
        let body_offset: usize = Self::HEADER_LEN + Self::SIGNATURE_LEN * len_signers;

        // Hash the body
        if body_offset >= data.len() {
            return ContractError::InvalidVAA.std_err();
        }
        let body = &data[body_offset..];
        let mut hasher = Keccak256::new();
        hasher.update(body);
        let hash = hasher.finalize().to_vec();

        // Rehash the hash
        let mut hasher = Keccak256::new();
        hasher.update(hash);
        let hash = hasher.finalize().to_vec();

        // Signatures valid, apply VAA
        if body_offset + Self::VAA_PAYLOAD_POS > data.len() {
            return ContractError::InvalidVAA.std_err();
        }

        let timestamp = data.get_u32(body_offset);
        let nonce = data.get_u32(body_offset + Self::VAA_NONCE_POS);
        let emitter_chain = data.get_u16(body_offset + Self::VAA_EMITTER_CHAIN_POS);
        let emitter_address = data
            .get_bytes32(body_offset + Self::VAA_EMITTER_ADDRESS_POS)
            .to_vec();
        let sequence = data.get_u64(body_offset + Self::VAA_SEQUENCE_POS);
        let consistency_level = data.get_u8(body_offset + Self::VAA_CONSISTENCY_LEVEL_POS);
        let payload = data[body_offset + Self::VAA_PAYLOAD_POS..].to_vec();

        Ok(ParsedVAA {
            version,
            guardian_set_index,
            timestamp,
            nonce,
            len_signers: len_signers as u8,
            emitter_chain,
            emitter_address,
            sequence,
            consistency_level,
            payload,
            hash,
        })
    }
}

// Guardian address
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct GuardianAddress {
    pub bytes: Binary, // 20-byte addresses
}

#[cfg(test)]
use hex;

#[cfg(test)]
impl GuardianAddress {
    pub fn from(string: &str) -> GuardianAddress {
        GuardianAddress {
            bytes: hex::decode(string).expect("Decoding failed").into(),
        }
    }
}

// Guardian set information
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct GuardianSetInfo {
    pub addresses: Vec<GuardianAddress>,
    // List of guardian addresses
    pub expiration_time: u64, // Guardian set expiration time
}

impl GuardianSetInfo {
    pub fn quorum(&self) -> usize {
        // allow quorum of 0 for testing purposes...
        if self.addresses.is_empty() {
            return 0;
        }
        ((self.addresses.len() * 10 / 3) * 2) / 10 + 1
    }
}

// Wormhole contract generic information
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct WormholeInfo {
    // Period for which a guardian set stays active after it has been replaced
    pub guardian_set_expirity: u64,
}

pub struct GovernancePacket {
    pub module: Vec<u8>,
    pub action: u8,
    pub chain: u16,
    pub payload: Vec<u8>,
}

impl GovernancePacket {
    pub fn deserialize(data: &[u8]) -> StdResult<Self> {
        let module = data.get_bytes32(0).to_vec();
        let action = data.get_u8(32);
        let chain = data.get_u16(33);
        let payload = data[35..].to_vec();

        Ok(GovernancePacket {
            module,
            action,
            chain,
            payload,
        })
    }
}

// action 1
pub struct ContractUpgrade {
    pub new_contract: u64,
}

// action 2
pub struct GuardianSetUpgrade {
    pub new_guardian_set_index: u32,
    pub new_guardian_set: GuardianSetInfo,
}

impl ContractUpgrade {
    pub fn deserialize(data: &[u8]) -> StdResult<Self> {
        let new_contract = data.get_u64(24);
        Ok(ContractUpgrade { new_contract })
    }
}

impl GuardianSetUpgrade {
    pub fn deserialize(data: &[u8]) -> StdResult<Self> {
        const ADDRESS_LEN: usize = 20;

        let new_guardian_set_index = data.get_u32(0);

        let n_guardians = data.get_u8(4);

        let mut addresses = vec![];

        for i in 0..n_guardians {
            let pos = 5 + (i as usize) * ADDRESS_LEN;
            if pos + ADDRESS_LEN > data.len() {
                return ContractError::InvalidVAA.std_err();
            }

            addresses.push(GuardianAddress {
                bytes: data[pos..pos + ADDRESS_LEN].to_vec().into(),
            });
        }

        let new_guardian_set = GuardianSetInfo {
            addresses,
            expiration_time: 0,
        };

        Ok(GuardianSetUpgrade {
            new_guardian_set_index,
            new_guardian_set,
        })
    }
}

// action 3
pub struct SetFee {
    pub fee: Coin,
}

impl SetFee {
    pub fn deserialize(data: &[u8], fee_denom: String) -> StdResult<Self> {
        let (_, amount) = data.get_u256(0);
        let fee = Coin {
            denom: fee_denom,
            amount: Uint128::new(amount),
        };
        Ok(SetFee { fee })
    }
}

// action 4
pub struct TransferFee {
    pub amount: Coin,
    pub recipient: CanonicalAddr,
}

impl TransferFee {
    pub fn deserialize(data: &[u8], fee_denom: String) -> StdResult<Self> {
        let recipient = data.get_address(0);

        let (_, amount) = data.get_u256(32);
        let amount = Coin {
            denom: fee_denom,
            amount: Uint128::new(amount),
        };
        Ok(TransferFee { amount, recipient })
    }
}
