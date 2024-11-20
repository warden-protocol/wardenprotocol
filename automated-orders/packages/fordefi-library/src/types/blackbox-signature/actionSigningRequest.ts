import { User } from '../user.js';

export interface ActionSigningRequest {
  /** A list of required signers. A signer can be a person or an API Signer. */
  signers: {
    /** Represents a reference to a user in the Fordefi platform */
    user: User;
    /** When the signer received/signed the action */
    modified_at: Date;
    /** Whether the signer signed the action */
    has_signed: boolean;
  }[];
}
