import { KeyType } from "../proto/fusionchain/treasury/key_pb";

export function prettyKeyType(type: KeyType) {
  switch (type) {
    case KeyType.ECDSA_SECP256K1:
      return "ECDSA (secp256k1)";
    case KeyType.EDDSA_ED25519:
      return "EdDSA (ed25519)";
    default:
      return "Unknown";
  }
}

export function prettyBytes(b: Uint8Array) {
  return b.reduce((s, v) => s + v.toString(16).padStart(2, "0"), "");
}
