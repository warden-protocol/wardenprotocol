import { useState } from "react";
import { warden } from "@wardenprotocol/wardenjs";
import {
	SignRequest,
	SignRequestStatus,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/signature";
import { isDeliverTxSuccess } from "@cosmjs/stargate";
import { useNewAction } from "./useAction";
import { getClient } from "./useClient";
import { ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";
import { MsgNewSignRequestResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/tx";

export enum SignRequesterState {
	IDLE = "idle",
	BROADCAST_SIGN_REQUEST = "broadcast_sign_request",
	AWAITING_APPROVALS = "awaiting_approvals",
	WAITING_KEYCHAIN = "waiting_keychain",
	SIGNATURE_FULFILLED = "signature_fulfilled",
	ERROR = "error",
}

const { MsgNewActionResponse } = warden.act.v1beta1;
const { MsgNewSignRequest } = warden.warden.v1beta3;

export default function useRequestSignature() {
	const [state, setState] = useState<SignRequesterState>(
		SignRequesterState.IDLE,
	);
	const [error, setError] = useState<string | undefined>(undefined);
	const [SignRequest, setSignRequest] = useState<SignRequest | undefined>(
		undefined,
	);

	const { newAction, authority } = useNewAction(MsgNewSignRequest);
	async function sendRequestSignature(
		keyId: bigint,
		analyzers: string[],
		input: Uint8Array,
	) {
		if (!authority) throw new Error("no authority");

		return await newAction(
			{
				authority,
				keyId,
				analyzers,
				input,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore: telescope generated code doesn't handle empty array correctly, use `undefined` instead of `[]`
				encryptionKey: undefined,
			},
			{},
		);
	}

	return {
		state,
		SignRequest,
		error,
		requestSignature: async (
			keyId: bigint,
			analyzers: string[],
			data: Uint8Array,
		) => {
			try {
				setState(SignRequesterState.BROADCAST_SIGN_REQUEST);

				const client = await getClient();

				const res = await sendRequestSignature(
					keyId,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore: telescope generated code doesn't handle empty array correctly, use `undefined` instead of `[]`
					analyzers?.length === 0 ? undefined : analyzers,
					data,
				);

				if (!res) {
					throw new Error("failed to broadcast tx");
				}

				if (!isDeliverTxSuccess(res)) {
					console.error("tx failed", res);
					throw new Error(`tx failed with code: ${res.code}`);
				}

				// parse tx msg response
				const actionCreatedAny = res.msgResponses[0];
				const actionCreated = MsgNewActionResponse.decode(
					actionCreatedAny.value,
				);
				const actionId = actionCreated.id;

				// wait for action to be completed
				setState(SignRequesterState.AWAITING_APPROVALS);
				let SignRequestId = null;
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
						MsgNewSignRequestResponse.typeUrl
					) {
						throw new Error(
							`unexpected action result type: ${res.action?.result?.typeUrl}. Expected ${MsgNewSignRequestResponse.typeUrl}`,
						);
					}

					if (res.action?.result?.value) {
						SignRequestId = MsgNewSignRequestResponse.decode(
							res.action?.result.value,
						).id;
						if (SignRequestId) {
							break;
						}
					}

					await sleep(1000);
				}

				// wait for sign request to be processed by keychain
				setState(SignRequesterState.WAITING_KEYCHAIN);
				// eslint-disable-next-line no-constant-condition
				while (true) {
					const res =
						await client.warden.warden.v1beta3.signRequestById({
							id: SignRequestId,
						});
					const signRequest = res?.signRequest;
					setSignRequest(signRequest);

					if (
						signRequest?.status ===
						SignRequestStatus.SIGN_REQUEST_STATUS_PENDING
					) {
						await sleep(1000);
						continue;
					}

					if (
						signRequest?.status ===
							SignRequestStatus.SIGN_REQUEST_STATUS_FULFILLED &&
						signRequest.signedData
					) {
						setState(SignRequesterState.SIGNATURE_FULFILLED);
						return signRequest.signedData;
					}

					throw new Error(
						`sign request rejected with reason: ${signRequest?.rejectReason}`,
					);
				}
			} catch (e) {
				setError(`${e}`);
				setState(SignRequesterState.ERROR);
			}
		},
		reset: () => {
			if (
				state === SignRequesterState.SIGNATURE_FULFILLED ||
				state === SignRequesterState.ERROR ||
				state === SignRequesterState.AWAITING_APPROVALS
			) {
				setState(SignRequesterState.IDLE);
			}
		},
	};
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
