import { MasterPublicKey } from './masterPublicKey.js';

export interface VaultDerivationInfo {
  /** The BIP 44 derivation path of the vault. */
  derivation_path: string;
  /** The public key of the vault. */
  master_public_key: MasterPublicKey;
}
