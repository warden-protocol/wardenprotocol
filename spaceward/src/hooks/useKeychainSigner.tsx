import type { StdSignDoc } from "@keplr-wallet/types";
import { env } from "@/env";
import { useActionHandler } from "@/features/actions/hooks";
import { useSpaceId } from "./useSpaceId";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";
import { PRECOMPILE_WARDEN_ADDRESS } from "@/contracts/constants";
import { fromBech32 } from "@cosmjs/encoding";
import { fromBytes, toBytes } from "viem";
import { useSpaceById } from "./query/warden";
import { KeyModel } from "./query/types";

/** @deprecated todo rename */
export function useKeychainSigner() {
	const spaceId = useSpaceId().spaceId;

	const space = useSpaceById({
		request: {
			id: BigInt(spaceId ?? 0),
		},
	}).data;

	const { add, expectedApproveExpression, expectedRejectExpression } =
		useActionHandler(
			PRECOMPILE_WARDEN_ADDRESS,
			wardenPrecompileAbi,
			"newSignRequest",
		);

	async function signAmino(
		key: Pick<KeyModel, "key">,
		signDoc: StdSignDoc,
		chainName: string,
		options?: {
			title?: string;
			wc?: {
				requestId: number;
				topic: string;
			};
		},
	) {
		if (!space) {
			throw new Error("no space");
		}

		if (!env.aminoAnalyzerContract) {
			throw new Error(
				"Missing aminoAnalyzerContract. Can't use Osmosis transactions.",
			);
		}

		const analyzer = fromBytes(
			fromBech32(env.aminoAnalyzerContract).data,
			"hex",
		);

		return await add(
			[
				key.key.id,
				fromBytes(
					Uint8Array.from(
						JSON.stringify(signDoc)
							.split("")
							.map((c) => c.charCodeAt(0)),
					),
					"hex",
				),
				[analyzer],
				// todo implement encryption key
				"0x",
				// todo implement max keychain fees
				[],
				space.nonce,
				BigInt(0),
				expectedApproveExpression,
				expectedRejectExpression,
				0, // BROADCAST_TYPE_DISABLED
			],
			{
				pubkey: toBytes(key.key.publicKey),
				chainName,
				signDoc,
				wc: options?.wc,
				title: options?.title,
			},
		);
	}

	return {
		signAmino,
	};
}
