import { KeyType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { KeyType as KeyTypeOld } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/intent/action";
import { ActionStatus as ActionStatusOld } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/rest";

export function prettyKeyType(type: KeyType | KeyTypeOld | string) {
	switch (type) {
		case KeyType.KEY_TYPE_ECDSA_SECP256K1:
		case KeyTypeOld.KEYTYPEECDSASECP256K1:
			return "ECDSA (secp256k1)";
		case KeyType.KEY_TYPE_EDDSA_ED25519:
		case KeyTypeOld.KEYTYPEEDDSAED25519:
			return "EdDSA (ed25519)";
		default:
			return "Unknown";
	}
}

export function prettyActionStatus(s: ActionStatus | ActionStatusOld | string) {
	switch (s) {
		case ActionStatus.ACTION_STATUS_PENDING:
		case ActionStatusOld.ACTION_STATUS_PENDING:
			return "Pending approvals";
		case ActionStatus.ACTION_STATUS_COMPLETED:
		case ActionStatusOld.ACTION_STATUS_COMPLETED:
			return "Completed";
		case ActionStatus.ACTION_STATUS_REVOKED:
		case ActionStatusOld.ACTION_STATUS_REVOKED:
			return "Revoked";
		default:
			return "Unknown";
	}
}

export function prettyBytes(b: Uint8Array) {
	return b.reduce((s, v) => s + v.toString(16).padStart(2, "0"), "");
}
