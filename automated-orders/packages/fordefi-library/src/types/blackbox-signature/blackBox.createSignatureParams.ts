import { BlackBoxSignaturePayload } from './blackBox.signaturePayload.js';
import { SignerType } from './signature.signerType.js';

export interface CreateBlackBoxSignatureRequestParams {
  /** The unique identifier of the vault. */
  vault_id: string;
  /** An optional transaction note. */
  note?: string;
  /** The signer of the transaction. */
  signer_type: SignerType;
  type: 'black_box_signature';
  /** Data to sign */
  details: BlackBoxSignaturePayload;
}
