export interface BinaryHashPayload {
  format: 'hash_binary';
  /** The payload to sign, according to the standard ECDSA binary representation, encoded in base64 format. Reference: https://www.rfc-editor.org/rfc/rfc6979#section-2.3.2 */
  hash_binary: string;
}

export interface IntegerHashPayload {
  format: 'hash_integer';
  // The payload to sign, as a big-endian integer.
  hash_integer: number;
}

export type BlackBoxSignaturePayload = BinaryHashPayload | IntegerHashPayload;
