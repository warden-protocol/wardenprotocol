import type { StdSignDoc } from "@keplr-wallet/types";
import { env } from "@/env";
import { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
import { warden } from "@wardenprotocol/wardenjs";
import { useEnqueueAction } from "@/features/actions/hooks";
import { useNewAction } from "./useAction";
import { useNonce } from "./useNonce";

/** @deprecated todo rename */
export function useKeychainSigner() {
	const nonce = useNonce();
	const { getMessage, authority } = useNewAction(
		warden.warden.v1beta3.MsgNewSignRequest,
	);

	const { addAction } = useEnqueueAction(getMessage);

	async function signAmino(
		key: Pick<QueryKeyResponse, "key">,
		signDoc: StdSignDoc,
		chainName: string,
		title: string,
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
				// fixme
				encryptionKey: undefined as any,
				maxKeychainFees: undefined as any,
				nonce
			},
			{
				pubkey: key.key.publicKey,
				chainName,
				signDoc,
				walletConnectRequestId: wc?.requestId,
				walletConnectTopic: wc?.topic,
				title
			},
		);
	}

	return {
		signAmino,
	};
}
