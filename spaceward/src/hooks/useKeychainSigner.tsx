import type { StdSignDoc } from "@keplr-wallet/types";
import { env } from "@/env";
import { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
import { useActionHandler } from "@/features/actions/hooks";
import { useQueryHooks } from "./useClient";
import { useSpaceId } from "./useSpaceId";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";
import { PRECOMPILE_WARDEN_ADDRESS } from "@/contracts/constants";
import { shieldStringify } from "@/utils/shield";
import { fromBech32 } from "@cosmjs/encoding";
import { fromBytes } from "viem";
import { DEFAULT_EXPRESSION } from "@/features/intents/hooks";

/** @deprecated todo rename */
export function useKeychainSigner() {
	const { isReady, useSpaceById, useTemplateById } = useQueryHooks();
	const spaceId = useSpaceId().spaceId;

	const space = useSpaceById({
		request: {
			id: BigInt(spaceId ?? 0)
		},
		options: {
			enabled: !!spaceId && isReady
		}
	}).data?.space;

	const approveSignTemplate = useTemplateById({
		request: {
			id: BigInt(space?.approveSignTemplateId ?? 0)
		},
		options: {
			enabled: !!space?.approveSignTemplateId && isReady
		}
	}).data?.template;

	const { add } = useActionHandler(
		PRECOMPILE_WARDEN_ADDRESS,
		wardenPrecompileAbi,
		"newSignRequest"
	);

	async function signAmino(
		key: Pick<QueryKeyResponse, "key">,
		signDoc: StdSignDoc,
		chainName: string,
		options?: {
			title?: string,
			wc?: {
				requestId: number;
				topic: string;
			},
		}
	) {
		if (!space) {
			throw new Error("no space");
		}


		if (!env.aminoAnalyzerContract) {
			throw new Error(
				"Missing aminoAnalyzerContract. Can't use Osmosis transactions.",
			);
		}
		const expectedApproveExpression = approveSignTemplate?.expression
			? shieldStringify(approveSignTemplate.expression)
			: DEFAULT_EXPRESSION;

		const analyzer = fromBytes(fromBech32(env.aminoAnalyzerContract).data, "hex");

		return await add(
			[
				key.key.id,
				fromBytes(Uint8Array.from(
					JSON.stringify(signDoc)
						.split("")
						.map((c) => c.charCodeAt(0))), "hex"),
				[analyzer],
				// todo implement encryption key
				"0x",
				// todo implement max keychain fees
				[],
				space.nonce,
				BigInt(0),
				expectedApproveExpression,
				DEFAULT_EXPRESSION
			],
			{
				pubkey: key.key.publicKey,
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
