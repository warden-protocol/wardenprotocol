import { env } from "@/env";
import {
	SnapParams,
	useActionHandler,
	WalletConnectParams,
} from "@/features/actions/hooks";
import { fromBytes, serializeTransaction, TransactionSerializable } from "viem";
import { EthRequest } from "@/features/modals/util";
import { PRECOMPILE_WARDEN_ADDRESS } from "@/contracts/constants";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";
import { useSpaceId } from "./useSpaceId";
import { fromBech32 } from "@cosmjs/encoding";
import { useSpaceById } from "./query/warden";

export function useEthereumTx() {
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

	const signRaw = async (
		keyId: bigint,
		input: Uint8Array,
		options?: {
			wc?: WalletConnectParams;
			snap?: SnapParams;
		},
	) => {
		if (!space) {
			throw new Error("no space");
		}

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
				expectedRejectExpression,
				0, // BROADCAST_TYPE_DISABLED
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
		},
	) => {
		if (!space) {
			throw new Error("no space");
		}

		if (!env.ethereumAnalyzerContract) {
			throw new Error(
				"Missing ethereumAnalyzerContract. Can't use Ethereum transactions.",
			);
		}

		const analyzer = fromBytes(
			fromBech32(env.ethereumAnalyzerContract).data,
			"hex",
		);

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
				expectedRejectExpression,
				0, // BROADCAST_TYPE_DISABLED
			],
			{ ...options, chainName, ethRequest: _tx },
		);
	};

	return {
		signRaw,
		signEthereumTx,
	};
}
