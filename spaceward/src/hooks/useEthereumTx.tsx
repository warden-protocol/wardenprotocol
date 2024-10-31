import { env } from "@/env";
import { SnapParams, useActionHandler, WalletConnectParams } from "@/features/actions/hooks";
import { fromBytes, serializeTransaction, TransactionSerializable } from "viem";
import { EthRequest } from "@/features/modals/util";
import { PRECOMPILE_WARDEN_ADDRESS } from "@/contracts/constants";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";
import { DEFAULT_EXPRESSION } from "@/features/intents/hooks";
import { useQueryHooks } from "./useClient";
import { useSpaceId } from "./useSpaceId";
import { shieldStringify } from "@/utils/shield";
import { fromBech32 } from "@cosmjs/encoding";

export function useEthereumTx() {
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

	const signRaw = async (
		keyId: bigint,
		input: Uint8Array,
		options?: {
			wc?: WalletConnectParams;
			snap?: SnapParams;
		}
	) => {
		if (!space) {
			throw new Error("no space");
		}

		const expectedApproveExpression = approveSignTemplate?.expression
			? shieldStringify(approveSignTemplate.expression)
			: DEFAULT_EXPRESSION;

		return await add(
			[
				keyId,
				fromBytes(input, "hex"),
				[],
				// todo implement encryption key
				"0x",
				// todo implement max keychain fees
				[],
				space.nonce,
				BigInt(0),
				expectedApproveExpression,
				DEFAULT_EXPRESSION
			],
			options,
		);
	};

	const signEthereumTx = async (
		keyId: bigint,
		_tx: EthRequest,
		chainName: string,
		options?: {
			wc?: WalletConnectParams;
			snap?: SnapParams;
			title?: string;
		}
	) => {
		if (!space) {
			throw new Error("no space");
		}

		if (!env.ethereumAnalyzerContract) {
			throw new Error(
				"Missing ethereumAnalyzerContract. Can't use Ethereum transactions.",
			);
		}

		const expectedApproveExpression = approveSignTemplate?.expression
			? shieldStringify(approveSignTemplate.expression)
			: DEFAULT_EXPRESSION;

		const analyzer = fromBytes(fromBech32(env.ethereumAnalyzerContract).data, "hex");

		return await add(
			[
				keyId,
				serializeTransaction(_tx as TransactionSerializable),
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
			{ ...options, chainName, ethRequest: _tx }
		);
	};

	return {
		signRaw,
		signEthereumTx,
	};
}
