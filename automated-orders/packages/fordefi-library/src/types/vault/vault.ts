import { User } from '../user.js';
import { ChainsAddress } from './chainAddress.js';
import { EnrichedChain } from './enrichedChain.js';
import { Keyset } from './keyset.js';
import { VaultDerivationInfo } from './vault.derivationInfo.js';
import { VaultGroup } from './vault.group.js';
import { VaultType } from './vault.type.js';
import { UtxoVaultAddress } from './vault.utxoAddress.js';

/** Represents vault in the Fordefi platform */
export interface VaultBase {
  /** The unique identifier of the object in the Fordefi platform. */
  id: string;
  /** The date and time when the object was created. */
  created_at: Date;
  /** The date and time when the object was last modified. Any change to any field of the resource is considered a modification. */
  modified_at: Date;
  /** The name of the vault. */
  name: string;
  /** Represents a reference to a user in the Fordefi platform */
  created_by: User;
  /** @deprecated */
  derivation_path: string;
  /** The compressed public key of the vault. As defined in the SEC1 standard: https://www.secg.org/SEC1-Ver-1.0.pdf. */
  public_key_compressed: string;
  /** Decompressed public key */
  public_key: Buffer;
  /** The derivation info of the vault. */
  derivation_info: VaultDerivationInfo;
  /** Represents a reference to a keyset in the Fordefi platform */
  keyset: Keyset;
  /** The user who owns the keyset of the vault. If not provided, the vault is owned by the organization. */
  key_holder?: User;
  /** Represents a reference to a vault group in the Fordefi platform */
  vault_group: VaultGroup;
  /** Details of pending vault movement to another vault group. */
  pending_vault_group_action?: {
    type: string;
    vault_group_id?: string;
    vault_group_name?: string;
  };
  /** State of the vault */
  state: string;
  /** Vault type */
  type: VaultType;
}

export interface EvmVault extends VaultBase {
  /** The address of the vault on Evm chain types */
  address: string;
}

export interface CosmosVault extends VaultBase {
  /** The address of the vault on Cosmos chains (hex represention without chain prefix). */
  main_address: string;
  /** List of addresses of the vault on each chain (bech32 format) with chain info */
  chain_addresses: ChainsAddress[];
}

export interface UtxoVault extends VaultBase {
  /** The UTXO chain. */
  chain: EnrichedChain;
  /** The default address of the vault on the chain. */
  default_address: UtxoVaultAddress;
  /** The default name of the next address to be created. */
  default_next_address_name: string;
}

export interface SolanaVault extends VaultBase {
  /** The address of the vault in the Solana blockchain. */
  address: string;
}

export interface BlackboxVault extends VaultBase {
  details: {
    /** ECDSA over the Stark curve signing scheme or ECDSA over the secp256k1 curve signing scheme. */
    type: KeyType;
    /** @deprecated */
    public_key?: string;
    /** The stark public key, represented in hex format. - only if key_type=ecdsa_stark  */
    stark_key?: string;
  };
}

export interface Vaults {
  total: number;
  page: number;
  size: number;
  vaults: Vault[];
}

export type Vault = EvmVault | CosmosVault | SolanaVault | UtxoVault | BlackboxVault;
