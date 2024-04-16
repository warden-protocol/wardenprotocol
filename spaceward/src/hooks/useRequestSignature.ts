import Long from "long";
import { TxMsgData } from "cosmjs-types/cosmos/base/abci/v1beta1/abci";
import { useState } from "react";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useToast } from "@/components/ui/use-toast";
import { useClient } from "./useClient";
import { monitorTx } from "./keplr";
import { MsgNewSignatureRequestResponse } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/module";
import {
	SignRequest,
	SignRequestStatus,
} from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { decodeBase64 } from "ethers";
import { MsgActionCreated } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/module";
import { SignMethod } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/types/warden/warden/v1beta2/signature";
import { Any } from "cosmjs-types/google/protobuf/any";

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
	const { toast } = useToast();
	const client = useClient();
	const sendMsgNewSignatureRequest =
		client.WardenWardenV1Beta2.tx.sendMsgNewSignatureRequest;
	const querySignatureRequestById =
		client.WardenWardenV1Beta2.query.querySignatureRequestById;

	return {
		state,
		signatureRequest,
		error,
		requestSignature: async (
			keyId: number | Long,
			method: SignMethod,
			data: Uint8Array,
			metadata: Any | undefined,
		) => {
			try {
				setState(SignatureRequesterState.BROADCAST_SIGNATURE_REQUEST);

				const res = await monitorTx(
					sendMsgNewSignatureRequest({
						value: {
							creator: address,
							keyId:
								keyId instanceof Long
									? keyId.toNumber()
									: keyId,
							dataForSigning: data,
							btl: 0,
							signMethod: method,
							metadata,
						},
					}),
					toast,
				);

				if (!res) {
					throw new Error("failed to broadcast tx");
				}

				if (res.tx_response?.code !== 0 || !res.tx_response.data) {
					throw new Error(`tx failed: ${JSON.stringify(res)}`);
				}

				// parse tx msg response
				const bytes = Uint8Array.from(
					res.tx_response.data
						.match(/.{1,2}/g)
						?.map((byte) => parseInt(byte, 16)) || [],
				);
				const msgData = TxMsgData.decode(bytes);
				const actionCreated = MsgActionCreated.decode(
					msgData.msgResponses[0].value,
				);
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
