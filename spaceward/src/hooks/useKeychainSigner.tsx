import type { StdSignDoc, StdSignature } from "@keplr-wallet/types";
import useRequestSignature from "./useRequestSignature";
import { env } from "@/env";
import { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/query";
import {
	AddressType,
	KeyType,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { base64FromBytes } from "@wardenprotocol/wardenjs/codegen/helpers";
import { useMemo } from "react";

type Algo = "secp256k1" | "ed25519" | "sr25519";
interface AccountData {
	/** A printable address (typically bech32 encoded) */
	readonly address: string;
	readonly algo: Algo;
	readonly pubkey: Uint8Array;
}
interface AminoSignResponse {
	/**
	 * The sign doc that was signed.
	 * This may be different from the input signDoc when the signer modifies it as part of the signing process.
	 */
	readonly signed: StdSignDoc;
	readonly signature: StdSignature;
}
interface OfflineAminoSigner {
	/**
	 * Get AccountData array from wallet. Rejects if not enabled.
	 */
	readonly getAccounts: () => Promise<readonly AccountData[]>;
	/**
	 * Request signature from whichever key corresponds to provided bech32-encoded address. Rejects if not enabled.
	 *
	 * The signer implementation may offer the user the ability to override parts of the signDoc. It must
	 * return the doc that was signed in the response.
	 *
	 * @param signerAddress The address of the account that should sign the transaction
	 * @param signDoc The content that should be signed
	 */
	readonly signAmino: (
		signerAddress: string,
		signDoc: StdSignDoc,
	) => Promise<AminoSignResponse>;
}

type RequestSignature = ReturnType<
	typeof useRequestSignature
>["requestSignature"];

const getOfflineSigner = ({
	keys,
	requestSignature,
}: {
	requestSignature: RequestSignature;
	keys?: QueryKeyResponse[];
}): OfflineAminoSigner => {
	return {
		getAccounts: async () => {
			if (!keys) {
				throw new Error("No keys found");
			}

			return keys.map(({ key, addresses }) => {
				const address = addresses.find(
					(a) => a.type === AddressType.ADDRESS_TYPE_OSMOSIS,
				);

				if (!address) {
					throw new Error("No osmosis address found");
				}

				const algo =
					key.type === KeyType.KEY_TYPE_ECDSA_SECP256K1
						? "secp256k1"
						: key.type === KeyType.KEY_TYPE_EDDSA_ED25519
							? "ed25519"
							: undefined;

				if (!algo) {
					throw new Error("Unsupported key type");
				}

				return {
					address: address.address,
					algo,
					pubkey: key.publicKey,
				};
			});
		},
		signAmino: async (signerAddress, signDoc) => {
			if (!env.aminoAnalyzerContract) {
				throw new Error(
					"Missing aminoAnalyzerContract. Can't use Osmosis transactions.",
				);
			}

			const key = keys?.find(({ addresses }) =>
				addresses.some(({ address }) => address === signerAddress),
			);

			if (!key) {
				throw new Error("No key found");
			}

			let signature = await requestSignature(
				key.key.id,
				[env.aminoAnalyzerContract],
				Uint8Array.from(
					JSON.stringify(signDoc)
						.split("")
						.map((c) => c.charCodeAt(0)),
				),
			);
			if (signature?.length === 65) {
				signature = signature.slice(0, -1);
			}

			if (signature?.length !== 64) {
				throw new Error("unexpected signature length");
			}

			const pkType =
				key.key.type === KeyType.KEY_TYPE_ECDSA_SECP256K1
					? "tendermint/PubKeySecp256k1"
					: undefined;

			if (!pkType) {
				throw new Error("Unsupported key type");
			}

			return {
				signed: signDoc,
				signature: {
					signature: base64FromBytes(signature),
					pub_key: {
						type: pkType,
						value: base64FromBytes(key.key.publicKey),
					},
				},
			};
		},
	};
};

export function useKeychainSigner({
	keys,
}: {
	keys?: QueryKeyResponse[];
}) {
	const { requestSignature, ...rest } = useRequestSignature();

	const signer = useMemo(
		() => getOfflineSigner({ keys, requestSignature }),
		[keys, requestSignature],
	);

	return {
		...rest,
		requestSignature,
		signer,
	};
}
