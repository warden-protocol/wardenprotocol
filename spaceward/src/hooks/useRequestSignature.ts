import { useState } from "react";
import { Any } from "cosmjs-types/google/protobuf/any";
import { warden } from "@wardenprotocol/wardenjs";
import {
	SignMethod,
	SignRequest,
	SignRequestStatus,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/signature";
import { isDeliverTxSuccess } from "@cosmjs/stargate";
import { useNewAction } from "./useAction";
import { getClient } from "./useClient";
import { ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";
import { MsgNewSignatureRequestResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/tx";

export enum SignatureRequesterState {
	IDLE = "idle",
	BROADCAST_SIGNATURE_REQUEST = "broadcast_signature_request",
	AWAITING_APPROVALS = "awaiting_approvals",
	WAITING_KEYCHAIN = "waiting_keychain",
	SIGNATURE_FULFILLED = "signature_fulfilled",
	ERROR = "error",
}

const { MsgNewActionResponse } = warden.act.v1beta1;
const { MsgNewSignatureRequest } = warden.warden.v1beta2;

export default function useRequestSignature() {
	const [state, setState] = useState<SignatureRequesterState>(
		SignatureRequesterState.IDLE,
	);
	const [error, setError] = useState<string | undefined>(undefined);
	const [signatureRequest, setSignatureRequest] = useState<
		SignRequest | undefined
	>(undefined);

	const { newAction, authority } = useNewAction(MsgNewSignatureRequest);
	async function sendRequestSignature(
		keyId: bigint,
		analyzers: string[],
		input: Uint8Array,
		signMethod: SignMethod,
		metadata: Any,
	) {
		if (!authority) throw new Error("no authority");

		return await newAction(
			{
				authority,
				keyId,
				analyzers,
				input,
				signMethod,
				metadata,
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore: telescope generated code doesn't handle empty array correctly, use `undefined` instead of `[]`
				encryptionKey: undefined,
			},
			{},
		);
	}

	return {
		state,
		signatureRequest,
		error,
		requestSignature: async (
			keyId: bigint,
			analyzers: string[],
			data: Uint8Array,
			metadata: Any | undefined,
			signMethod: SignMethod = SignMethod.SIGN_METHOD_BLACK_BOX,
		) => {
			try {
				setState(SignatureRequesterState.BROADCAST_SIGNATURE_REQUEST);

				const client = await getClient();

				const res = await sendRequestSignature(
					keyId,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore: telescope generated code doesn't handle empty array correctly, use `undefined` instead of `[]`
					analyzers?.length === 0 ? undefined : analyzers,
					data,
					signMethod,
					metadata,
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
				setState(SignatureRequesterState.AWAITING_APPROVALS);
				let signatureRequestId = null;
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
						MsgNewSignatureRequestResponse.typeUrl
					) {
						throw new Error(
							`unexpected action result type: ${res.action?.result?.typeUrl}. Expected ${MsgNewSignatureRequestResponse.typeUrl}`,
						);
					}

					if (res.action?.result?.value) {
						signatureRequestId =
							MsgNewSignatureRequestResponse.decode(
								res.action?.result.value,
							).id;
						if (signatureRequestId) {
							break;
						}
					}

					await sleep(1000);
				}

				// wait for sign request to be processed by keychain
				setState(SignatureRequesterState.WAITING_KEYCHAIN);
				// eslint-disable-next-line no-constant-condition
				while (true) {
					const res =
						await client.warden.warden.v1beta2.signatureRequestById(
							{
								id: signatureRequestId,
							},
						);
					const signRequest = res?.signRequest;
					setSignatureRequest(signRequest);

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
						setState(SignatureRequesterState.SIGNATURE_FULFILLED);
						return signRequest.signedData;
					}

					throw new Error(
						`sign request rejected with reason: ${signRequest?.rejectReason}`,
					);
				}
			} catch (e) {
				setError(`${e}`);
				setState(SignatureRequesterState.ERROR);
			}
		},
		reset: () => {
			if (
				state === SignatureRequesterState.SIGNATURE_FULFILLED ||
				state === SignatureRequesterState.ERROR ||
				state === SignatureRequesterState.AWAITING_APPROVALS
			) {
				setState(SignatureRequesterState.IDLE);
			}
		},
	};
}

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
