import { ethers } from "ethers";
import useRequestSignature from "./useRequestSignature";
import { env } from "@/env";

export function useEthereumTx() {
	const { state, error, requestSignature, reset } = useRequestSignature();

	const signRaw = async (keyId: bigint, input: Uint8Array) => {
		return await requestSignature(
			keyId,
			[],
			input,
		);
	};

	const signEthereumTx = async (keyId: bigint, tx: ethers.Transaction) => {
		if (!env.ethereumAnalyzerContract) {
			console.warn("Missing ethereumAnalyzerContract. Can't use Ethereum transactions.");
			return;
		}

		const signature = await requestSignature(
			keyId,
			[env.ethereumAnalyzerContract],
			ethers.getBytes(tx.unsignedSerialized),
		);
		if (!signature) {
			return;
		}

		// add the signature to the transaction
		const signedTx = tx.clone();
		signedTx.signature = ethers.hexlify(signature);

		return signedTx;
	};

	return {
		state,
		error,
		reset,
		signRaw,
		signEthereumTx,
	}
}
