import Long from "long";
import { useState } from "react";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useClient, useTx } from "./useClient";
import { MsgNewSignatureRequestResponse } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/module";
import {
	SignRequest,
	SignRequestStatus,
} from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { decodeBase64 } from "ethers";
import { Any } from "cosmjs-types/google/protobuf/any";
import { warden } from "@wardenprotocol/wardenjs";
import { SignMethod } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/signature";
import { isDeliverTxSuccess } from "@cosmjs/stargate";
import { MsgActionCreated } from "@wardenprotocol/wardenjs/codegen/warden/intent/action";

export enum SignatureRequesterState {
	IDLE = "idle",
	BROADCAST_SIGNATURE_REQUEST = "broadcast_signature_request",
	AWAITING_APPROVALS = "awaiting_approvals",
	WAITING_KEYCHAIN = "waiting_keychain",
	SIGNATURE_FULFILLED = "signature_fulfilled",
	ERROR = "error",
}

export default function useRequestSignature() {
	const { address } = useAddressContext();
	const [state, setState] = useState<SignatureRequesterState>(
		SignatureRequesterState.IDLE,
	);
	const [error, setError] = useState<string | undefined>(undefined);
	const [signatureRequest, setSignatureRequest] = useState<
		SignRequest | undefined
	>(undefined);
	const client = useClient();
	const querySignatureRequestById =
		client.WardenWardenV1Beta2.query.querySignatureRequestById;

	const { tx } = useTx();

	return {
		state,
		signatureRequest,
		error,
		requestSignature: async (
			keyId: number | Long,
			analyzers: string[],
			data: Uint8Array,
			metadata: Any | undefined,
			signMethod: SignMethod = SignMethod.SIGN_METHOD_BLACK_BOX,
		) => {
			try {
				setState(SignatureRequesterState.BROADCAST_SIGNATURE_REQUEST);

				const { newSignatureRequest } = warden.warden.v1beta2.MessageComposer.withTypeUrl;
				const res = await tx(
					[
						newSignatureRequest({
							creator: address,
							keyId: keyId instanceof Long
								? keyId
								: Long.fromNumber(keyId),
							btl: Long.fromNumber(0),
							signMethod,
							input: data,
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-ignore: telescope generated code doesn't handle empty array correctly, use `undefined` instead of `[]`
							analyzers: analyzers?.length === 0
								? undefined
								: analyzers,
							metadata,
						}),
					],
					{},
				);

				if (!res) {
					throw new Error("failed to broadcast tx");
				}

				if (!isDeliverTxSuccess(res)) {
					throw new Error(`tx failed: ${JSON.stringify(res)}`);
				}

				// parse tx msg response
				const actionCreatedAny = res.msgResponses[0];
				const actionCreated = MsgActionCreated.decode(actionCreatedAny.value);
				const actionId = actionCreated.action?.id;

				// wait for action to be completed
				setState(SignatureRequesterState.AWAITING_APPROVALS);
				let signatureRequestId = null;
				// eslint-disable-next-line no-constant-condition
				while (true) {
					const res = await client.WardenIntent.query.queryActionById(
						{ id: `${actionId}` },
					);
					if (
						res.data.action?.status !== "ACTION_STATUS_PENDING" &&
						res.data.action?.status !== "ACTION_STATUS_COMPLETED"
					) {
						throw new Error(
							`action failed: ${JSON.stringify(res.data.action)}`,
						);
					}

					signatureRequestId = (
						res.data.action
							?.result as MsgNewSignatureRequestResponse | null
					)?.id;
					if (signatureRequestId) {
						break;
					}

					await sleep(1000);
				}

				// wait for sign request to be processed by keychain
				setState(SignatureRequesterState.WAITING_KEYCHAIN);
				// eslint-disable-next-line no-constant-condition
				while (true) {
					const res = await querySignatureRequestById({
						id: signatureRequestId.toString(),
					});
					const signRequest = res?.data
						.sign_request as Required<SignRequest>;
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
						signRequest.signed_data
					) {
						setState(SignatureRequesterState.SIGNATURE_FULFILLED);
						return decodeBase64(signRequest.signed_data);
					}

					throw new Error(
						`sign request rejected with reason: ${signRequest?.reject_reason}`,
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
