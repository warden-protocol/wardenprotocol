import { ethers } from "ethers";
import { warden } from "@wardenprotocol/wardenjs";
import { env } from "@/env";
import { useEnqueueAction } from "@/features/actions/hooks";
import { useNewAction } from "./useAction";
import { useNonce } from "./useNonce";

export function useEthereumTx() {
	const nonce = useNonce();
	const { getMessage, authority } = useNewAction(
		warden.warden.v1beta3.MsgNewSignRequest,
	);

	const { addAction } = useEnqueueAction(getMessage);

	const signRaw = async (
		keyId: bigint,
		input: Uint8Array,

		wc?: {
			requestId: number;
			topic: string;
		},
		snap?: {
			requestId: string;
		}
	) => {
		if (!authority) {
			throw new Error("no authority");
		}

		return await addAction(
			{
				authority,
				keyId,
				analyzers: [],
				input,
				nonce,
				// fixme
				encryptionKey: undefined as any,
				maxKeychainFees: undefined as any,
			},
			{
				walletConnectRequestId: wc?.requestId,
				walletConnectTopic: wc?.topic,
				snapRequestId: snap?.requestId
			},
		);
	};

	const signEthereumTx = async (
		keyId: bigint,
		_tx: ethers.TransactionLike,
		chainName: string,
		title: string,
		wc?: {
			requestId: number;
			topic: string;
		},
		snap?: {
			requestId: string;
		}
	) => {
		if (!authority) {
			throw new Error("no authority");
		}

		if (!env.ethereumAnalyzerContract) {
			console.warn(
				"Missing ethereumAnalyzerContract. Can't use Ethereum transactions.",
			);

			return;
		}

		const tx = ethers.Transaction.from(_tx);

		return await addAction(
			{
				analyzers: [env.ethereumAnalyzerContract],
				authority,
				input: ethers.getBytes(tx.unsignedSerialized),
				keyId,
				nonce,
				// fixme
				encryptionKey: undefined as any,
				maxKeychainFees: undefined as any,
			},
			{
				tx: _tx,
				chainName,
				walletConnectRequestId: wc?.requestId,
				walletConnectTopic: wc?.topic,
				snapRequestId: snap?.requestId,
				title
			},
		);
	};

	return {
		signRaw,
		signEthereumTx,
	};
}
