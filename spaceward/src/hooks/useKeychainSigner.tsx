import type { StdSignDoc, StdSignature } from "@keplr-wallet/types";
import useRequestSignature from "./useRequestSignature";
import { env } from "@/env";
import { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
import {
	AddressType,
	KeyType,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { useMemo } from "react";
import { fixAddress } from "@/features/modals/ReceiveAssets";
import { useNewAction } from "./useAction";
import { warden } from "@wardenprotocol/wardenjs";
import { useEnqueueAction } from "@/features/actions/hooks";

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

const getOfflineSigner = ({
	chainName,
	keys,
}: {
	chainName?: string;
	keys?: QueryKeyResponse[];
}): OfflineAminoSigner => {
	return {
		getAccounts: async () => {
			if (!keys) {
				throw new Error("No keys found");
			}

			return keys.map(({ key, addresses }) => {
				const address = fixAddress(
					addresses.find(
						(a) => a.type === AddressType.ADDRESS_TYPE_OSMOSIS,
					),
					chainName,
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
		// @ts-expect-error this method is not called
		signAmino: async (signerAddress, signDoc) => {
			if (!env.aminoAnalyzerContract) {
				throw new Error(
					"Missing aminoAnalyzerContract. Can't use Osmosis transactions.",
				);
			}

			throw new Error("should not be called");
			/*
			const key = keys?.find(({ addresses }) =>
				addresses.some(
					({ address, type }) =>
						type === AddressType.ADDRESS_TYPE_OSMOSIS &&
						Buffer.from(fromBech32(address).data).toString(
							"base64",
						) ===
							Buffer.from(
								fromBech32(signerAddress).data,
							).toString("base64"),
				),
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
			*/
		},
	};
};

export function useKeychainSigner({
	chainName,
	keys,
}: {
	chainName?: string;
	keys?: QueryKeyResponse[];
}) {
	const signer = useMemo(() => getOfflineSigner({ keys, chainName }), [keys]);

	const { getMessage, authority } = useNewAction(
		warden.warden.v1beta3.MsgNewSignRequest,
	);

	const { addAction } = useEnqueueAction(getMessage);

	async function signAmino(key: QueryKeyResponse, signDoc: StdSignDoc, chainName: string) {
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
				signDoc
			},
		);
	}

	return {
		/** @deprecated */
		signer,
		signAmino
	};
}
