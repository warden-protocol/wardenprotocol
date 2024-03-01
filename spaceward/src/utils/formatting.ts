import { ActionStatus } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/rest";
import { KeyType } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/rest";

export function prettyKeyType(type: KeyType | string) {
  switch (type) {
    case KeyType.KEYTYPEECDSASECP256K1:
      return "ECDSA (secp256k1)";
    case KeyType.KEYTYPEEDDSAED25519:
      return "EdDSA (ed25519)";
    default:
      return "Unknown";
  }
}

export function prettyActionStatus(s: ActionStatus | string) {
  switch (s) {
    case ActionStatus.ACTION_STATUS_PENDING:
      return "Pending approvals";
    case ActionStatus.ACTION_STATUS_COMPLETED:
      return "Completed";
    case ActionStatus.ACTION_STATUS_REVOKED:
      return "Revoked";
    default:
      return "Unknown";
  }
}

export function prettyBytes(b: Uint8Array) {
  return b.reduce((s, v) => s + v.toString(16).padStart(2, "0"), "");
}
