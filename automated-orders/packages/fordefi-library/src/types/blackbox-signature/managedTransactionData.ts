import { User } from '../user.js';
import { VaultRef } from '../vault/vaultRef.js';
import { ActionSigningRequest } from './actionSigningRequest.js';
import { PolicyMatch } from './policyMatch.js';
import { SignerType } from './signature.signerType.js';

export interface ManagedTransationData {
  /** Represents a reference to a user in the Fordefi platform */
  created_by: User;
  /** The user who aborted the transaction, null if the transaction was not aborted. */
  aborted_by?: User;
  /** Represents a device sign request for an action in the Foredefi platform */
  device_signing_request?: ActionSigningRequest;
  /** The approval request. */
  approval_request?: ApprovalRequest;
  /** The policy match. */
  policy_match?: PolicyMatch;
  /** SignedRawData represents signed raw data with timestamp and URL. */
  signed_create_request?: SignedRawData;
  /** The type of signer of the transaction. */
  signer_type: SignerType;
  risks: Risk[];
  /** The translated error message received from the node if it was rejected by it. */
  error_pushing_to_blockchain_message?: string;
  /** The error message received from the node if it was rejected by it. */
  original_error_pushing_to_blockchain_message?: string;
  /** Represents a reference to a vault in the Fordefi platform */
  vault: VaultRef;
  /** Optional idempotence ID of a transaction. */
  idempotence_id?: string;
  /** Does current user has permissions to the origin vault according to its vault group permissions. */
  has_current_user_vault_permissions: boolean;
  /** Batch data if the transaction is part of a batch. */
  batch_data?: BatchData;
  /** The push mode of the transaction. It can be one of the following:
   * - `auto`: The transaction is pushed automatically by Fordefi.
   * - `manual`: The transaction should be pushed manually by the user using a 3rd party.
   */
  push_mode?: 'auto' | 'manual';
}

export interface SignedRawData {
  raw_data: '';
  timestamp_signature: {
    signature: string;
    timestamp: number;
  };
  url_path: string;
}

export interface BatchData {}

export interface Risk {}

export interface ApprovalRequest {}
