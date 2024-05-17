import Long from "long";
import { ethers } from "ethers";
import useRequestSignature from "./useRequestSignature";
import { env } from "@/env";

export function useEthereumTx() {
	const { state, error, requestSignature, reset } = useRequestSignature();

	const signRaw = async (keyId: Long, input: Uint8Array) => {
		return await requestSignature(
			keyId,
			[],
			input,
			undefined,
		);
	};

	const signEthereumTx = async (keyId: Long, tx: ethers.Transaction) => {
		if (!env.ethereumAnalyzerContract) {
			console.warn("Missing ethereumAnalyzerContract. Can't use Ethereum transactions.");
			return;
		}

		const signature = await requestSignature(
			keyId,
			[env.ethereumAnalyzerContract],
			ethers.getBytes(tx.unsignedSerialized),
			undefined,
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
