import { User } from '../user.js';
import { VaultRef } from '../vault/vaultRef.js';
import { ManagedTransationData } from './managedTransactionData.js';

export interface BlackBoxSignature {
  /** The unique identifier of the object in the Fordefi platform. */
  id: string;
  /** The date and time when the object was created. */
  created_at: Date;
  /** The date and time when the object was last modified. Any change to any field of the resource is considered a modification. */
  modified_at: Date;
  /**
   * Managed transaction data.
   * Presented if the transaction was initiated from the Fordefi system itself, in contrast to unmanaged transactions
   * (which are, for example, transfers of funds into a vault visible to Fordefi).
   */
  managed_transaction_data: ManagedTransationData;
  /** The transaction signatures. */
  signatures: Signature[];
  /** An optional transaction note. */
  note?: string;
  /** - `automatically_set` if the transaction was automatically set as spam by Fordefi
   * - `manually_set` if the transaction was manually set as spam by a user,
   * - `unset` if the transaction was not set as spam. */
  spam_state?: SpamState;
  /** The direction of the transaction. */
  direction: 'incoming' | 'outcoming';
  /** Black Box signature type. */
  type: string;
  /** The state of the black box signature. */
  state: BlackBoxSignatureState;
  /** The state changes of the black box signature. */
  state_changes: BlackBoxStateChange[];
  /** The payload requested to be signed, represented in base64 format. */
  payload: string;
  /** Represents a reference to a vault in the Fordefi platform */
  vault: VaultRef;
  details: ECDSASignatureDetails;
}

export interface Signature {
  /** Signature on the data, encoded in base64 format. */
  data: string;
  /** The user who created this signature, null if the signature wasn’t created by a Fordefi user. */
  signed_by?: User;
}

export type SpamState = 'automatically_set' | 'manually_set' | 'unset';

export type BlackBoxSignatureState =
  | 'waiting_for_approval'
  | 'approved'
  | 'signed'
  | 'completed'
  | 'error_signing'
  | 'aborted';

export interface BlackBoxStateChange {
  /** The date and time when the state was changed. */
  changed_at: Date;
  /** The previous state of the black box signature. */
  previous_state?: BlackBoxSignatureState;
  /** The new state of the black box signature. */
  new_state: BlackBoxSignatureState;
}

export interface ECDSASignatureDetails {
  signature?: ECDSASignature;
  hash_binary: string;
  hash_integer: string;
  type: string; // KeyType?
}

export interface ECDSASignature {
  r: string;
  s: string;
  v: string;
}
