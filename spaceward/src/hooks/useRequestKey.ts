import { useState } from "react";
import { useNewAction } from "./useAction";
import { warden } from "@wardenprotocol/wardenjs";
import { MsgNewKeyRequest, MsgNewKeyRequestResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/tx";
import { KeyRequest, KeyRequestStatus, KeyType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { getClient } from "./useClient";
import { ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export enum KeyRequesterState {
	IDLE = "idle",
	BROADCAST_KEY_REQUEST = "broadcast_key_request",
	AWAITING_APPROVALS = "awaiting_approvals",
	WAITING_KEYCHAIN = "waiting_keychain",
	KEY_FULFILLED = "key_fulfilled",
	ERROR = "error",
}

const { MsgNewActionResponse } = warden.act.v1beta1;

export default function useRequestKey() {
	const [state, setState] = useState<KeyRequesterState>(
		KeyRequesterState.IDLE,
	);
	const [error, setError] = useState<string | undefined>(undefined);
	const [keyRequest, setKeyRequest] = useState<KeyRequest | undefined>(
		undefined,
	);

	const { newAction, authority } = useNewAction(MsgNewKeyRequest);

	async function sendRequestKey(keychainId: bigint, spaceId: bigint) {
		if (!authority) throw new Error("no authority");

		return await newAction({
			spaceId,
			keychainId,
			ruleId: BigInt(0),
			keyType: KeyType.KEY_TYPE_ECDSA_SECP256K1,
			authority,
		}, {});
	}

	return {
		state,
		keyRequest,
		error,
		requestKey: async (
			keychainId: bigint,
			spaceId: bigint,
		) => {
			try {
				setState(KeyRequesterState.BROADCAST_KEY_REQUEST);

				const client = await getClient();

				const res = await sendRequestKey(keychainId, spaceId);
				if (!res) {
					console.error("failed to broadcast tx");
					throw new Error("failed to broadcast tx");
				}

				if (res.code !== 0) {
					console.error("tx failed", res);
					throw new Error(`tx failed with code: ${res.code}`);
				}

				const actionCreated = MsgNewActionResponse.decode(res.msgResponses[0].value);
				const actionId = actionCreated.id;

				// wait for action to be completed
				setState(KeyRequesterState.AWAITING_APPROVALS);
				let keyRequestId = null;
				// eslint-disable-next-line no-constant-condition
				while (true) {
					const res = await client.warden.act.v1beta1.actionById({
						id: actionId,
					});

					if (
						res.action?.status !== ActionStatus.ACTION_STATUS_PENDING &&
						res.action?.status !== ActionStatus.ACTION_STATUS_COMPLETED
					) {
						throw new Error(
							`action failed: ${JSON.stringify(res.action)}`,
						);
					}

					if (res.action?.result?.typeUrl !== MsgNewKeyRequestResponse.typeUrl) {
						throw new Error(`unexpected action result type: ${res.action?.result?.typeUrl}. Expected ${MsgNewKeyRequestResponse.typeUrl}`);
					}

					if (res.action?.result?.value) {
						keyRequestId = MsgNewKeyRequestResponse.decode(res.action?.result.value).id;
						if (keyRequestId) {
							break;
						}
					}

					await sleep(1000);
				}

				// wait for request to be processed by keychain
				setState(KeyRequesterState.WAITING_KEYCHAIN);
				// eslint-disable-next-line no-constant-condition
				while (true) {
					const res = await client.warden.warden.v1beta3.keyRequestById({
						id: keyRequestId,
					});

					const keyRequest = res.keyRequest;
					setKeyRequest(keyRequest);
					if (
						keyRequest?.status === KeyRequestStatus.KEY_REQUEST_STATUS_PENDING
					) {
						await sleep(1000);
						continue;
					}

					if (
						keyRequest?.status ===
						KeyRequestStatus.KEY_REQUEST_STATUS_FULFILLED
					) {
						setState(KeyRequesterState.KEY_FULFILLED);
						return;
					}

					throw new Error(
						`key request rejected with reason: ${keyRequest?.rejectReason}`,
					);
				}
			} catch (e) {
				setError(`${e}`);
				setState(KeyRequesterState.ERROR);
			}
		},
		reset: () => {
			if (
				state === KeyRequesterState.KEY_FULFILLED ||
				state === KeyRequesterState.ERROR ||
				state === KeyRequesterState.AWAITING_APPROVALS
			) {
				setState(KeyRequesterState.IDLE);
			}
		},
	};
}
