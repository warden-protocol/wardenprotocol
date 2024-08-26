import type { StdSignDoc } from "@keplr-wallet/types";
import { env } from "@/env";
import { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
import { useNewAction } from "./useAction";
import { warden } from "@wardenprotocol/wardenjs";
import { useEnqueueAction } from "@/features/actions/hooks";

/** @deprecated todo rename */
export function useKeychainSigner() {
	const { getMessage, authority } = useNewAction(
		warden.warden.v1beta3.MsgNewSignRequest,
	);

	const { addAction } = useEnqueueAction(getMessage);

	async function signAmino(
		key: Pick<QueryKeyResponse, "key">,
		signDoc: StdSignDoc,
		chainName: string,
		wc?: {
			requestId: number;
			topic: string;
		},
	) {
		if (!authority) {
			throw new Error("no authority");
		}

		if (!env.aminoAnalyzerContract) {
			throw new Error(
				"Missing aminoAnalyzerContract. Can't use Osmosis transactions.",
			);
		}

		return await addAction(
			{
				authority,
				keyId: key.key.id,
				analyzers: [env.aminoAnalyzerContract],
				input: Uint8Array.from(
					JSON.stringify(signDoc)
						.split("")
						.map((c) => c.charCodeAt(0)),
				),
				// @ts-expect-error telescope generated code doesn't handle empty array correctly, use `undefined` instead of `[]`
				encryptionKey: undefined,
			},
			{
				pubkey: key.key.publicKey,
				chainName,
				signDoc,
				walletConnectRequestId: wc?.requestId,
				walletConnectTopic: wc?.topic,
			},
		);
	}

	return {
		signAmino,
	};
}
