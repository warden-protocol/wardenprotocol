import { KeyType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action"

export function prettyKeyType(type: KeyType | string) {
	switch (type) {
		case KeyType.KEY_TYPE_ECDSA_SECP256K1:
			return "ECDSA (secp256k1)";
		case KeyType.KEY_TYPE_EDDSA_ED25519:
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
