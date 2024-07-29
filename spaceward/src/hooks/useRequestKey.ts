import { useNewAction } from "./useAction";
import { warden } from "@wardenprotocol/wardenjs";
import {
	MsgNewKeyRequest,
	MsgNewKeyRequestResponse,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/tx";
import {
	KeyRequest,
	KeyRequestStatus,
	KeyType,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { getClient } from "./useClient";
import { ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";
import { createGlobalState } from "./state";
import { TEMP_KEY, useKeySettingsState } from "@/features/keys/state";
import { useEffect, useRef } from "react";

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

const useRequestKeyState = createGlobalState("request-key", {
	state: KeyRequesterState.IDLE,
	keyRequest: undefined as KeyRequest | undefined,
	error: undefined as string | undefined,
});

export default function useRequestKey() {
	const { data, setData, resetData } = useRequestKeyState();
	const { data: ks, setData: setKeySettings } = useKeySettingsState();
	/** @deprecated fixme hack */
	const ksRef = useRef(ks);

	useEffect(() => {
		ksRef.current = ks;
	}, [ks])

	const { newAction, authority } = useNewAction(MsgNewKeyRequest);

	async function sendRequestKey(keychainId: bigint, spaceId: bigint) {
		if (!authority) throw new Error("no authority");

		return await newAction(
			{
				spaceId,
				keychainId,
				ruleId: BigInt(0),
				keyType: KeyType.KEY_TYPE_ECDSA_SECP256K1,
				authority,
			},
			{},
		);
	}

	return {
		state: data?.state ?? KeyRequesterState.IDLE,
		keyRequest: data?.keyRequest,
		error: data?.error,
		requestKey: async (keychainId: bigint, spaceId: bigint) => {
			try {
				setData({ state: KeyRequesterState.BROADCAST_KEY_REQUEST });

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

				const actionCreated = MsgNewActionResponse.decode(
					res.msgResponses[0].value,
				);
				const actionId = actionCreated.id;

				// wait for action to be completed
				setData({ state: KeyRequesterState.AWAITING_APPROVALS });
				let keyRequestId = null;
				// eslint-disable-next-line no-constant-condition
				while (true) {
					const res = await client.warden.act.v1beta1.actionById({
						id: actionId,
					});

					if (
						res.action?.status !==
							ActionStatus.ACTION_STATUS_PENDING &&
						res.action?.status !==
							ActionStatus.ACTION_STATUS_COMPLETED
					) {
						throw new Error(
							`action failed: ${JSON.stringify(res.action)}`,
						);
					}

					if (
						res.action?.result?.typeUrl !==
						MsgNewKeyRequestResponse.typeUrl
					) {
						throw new Error(
							`unexpected action result type: ${res.action?.result?.typeUrl}. Expected ${MsgNewKeyRequestResponse.typeUrl}`,
						);
					}

					if (res.action?.result?.value) {
						keyRequestId = MsgNewKeyRequestResponse.decode(
							res.action?.result.value,
						).id;
						if (keyRequestId) {
							break;
						}
					}

					await sleep(1000);
				}

				// wait for request to be processed by keychain
				setData({ state: KeyRequesterState.WAITING_KEYCHAIN });
				// eslint-disable-next-line no-constant-condition
				while (true) {
					const res =
						await client.warden.warden.v1beta3.keyRequestById({
							id: keyRequestId,
						});

					const keyRequest = res.keyRequest;
					setData({ keyRequest });

					if (
						keyRequest?.status ===
						KeyRequestStatus.KEY_REQUEST_STATUS_PENDING
					) {
						await sleep(1000);
						continue;
					}

					if (
						keyRequest?.status ===
						KeyRequestStatus.KEY_REQUEST_STATUS_FULFILLED
					) {
						setKeySettings({
							settings: {
								...ksRef.current?.settings,
								[keyRequest.id.toString()]:
									ksRef.current?.settings[TEMP_KEY],
								[TEMP_KEY]: undefined,
							},
						});

						setData({ state: KeyRequesterState.KEY_FULFILLED });
						return;
					}

					throw new Error(
						`key request rejected with reason: ${keyRequest?.rejectReason}`,
					);
				}
			} catch (e) {
				setData({ state: KeyRequesterState.ERROR, error: `${e}` });
			}
		},
		reset: () => {
			if (
				data?.state === KeyRequesterState.KEY_FULFILLED ||
				data?.state === KeyRequesterState.ERROR ||
				data?.state === KeyRequesterState.AWAITING_APPROVALS
			) {
				resetData();
			}
		},
	};
}
