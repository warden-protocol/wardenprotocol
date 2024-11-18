import { useCallback, useMemo } from "react";
import {
	Abi,
	AbiStateMutability,
	Account,
	Chain,
	ContractFunctionArgs,
	ContractFunctionName,
	encodeFunctionData,
	TransactionReceipt,
} from "viem";
import { Config, useWalletClient } from "wagmi";
import { readContractQueryOptions } from "wagmi/query";
import { StdSignDoc } from "@cosmjs/amino";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { cosmos } from "@wardenprotocol/wardenjs";
import { useSetChain } from "@web3-onboard/react";
import { createPersistantState } from "@/hooks/state";
import { assertChain } from "@/utils/contract";
import type { EthRequest } from "../modals/util";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useSpaceById } from "@/hooks/query/warden";
import { useTemplateById } from "@/hooks/query/act";
import { shieldStringify } from "@/utils/shield";
import { DEFAULT_EXPRESSION } from "../intents/hooks";
import actPrecompileAbi from "@/contracts/actPrecompileAbi";
import { PRECOMPILE_ACT_ADDRESS } from "@/contracts/constants";
import { env } from "@/env";

type TxRaw = Parameters<typeof cosmos.tx.v1beta1.TxRaw.encode>[0];

const getActionId = () =>
	`${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

export enum QueuedActionStatus {
	AwaitingSignature = 0x00,
	Signed = 0x01,
	Broadcast,
	AwaitingApprovals,
	ActionReady,
	// fixme rename
	AwaitingBroadcast,
	Success = 0x99,
	Failed = 0xff,
}

export interface WalletConnectParams {
	requestId: number;
	topic: string;
}

export interface SnapParams {
	requestId: string;
}

export const getActionByIdQueryOptions = (config: Config, actionId: bigint) =>
	readContractQueryOptions(config, {
		chainId: env.evmChainId,
		address: PRECOMPILE_ACT_ADDRESS,
		abi: actPrecompileAbi,
		functionName: "actionById",
		args: [actionId],
	});

type ActionQueryOptions = ReturnType<typeof getActionByIdQueryOptions>;

type Action =
	| Awaited<ReturnType<ActionQueryOptions["queryFn"]>>["action"]
	| undefined;

export interface QueuedAction {
	error?: unknown;
	hash?: `0x${string}`;
	receipt?: TransactionReceipt;
	call?: {
		abi: Abi;
		functionName: string;
		args: unknown;
	};
	request?: {
		to: `0x${string}`;
		data: `0x${string}`;
		account: Account;
		chain: Chain;
	};
	wc?: WalletConnectParams;
	snap?: SnapParams;
	chainName?: string;

	ethRequest?: EthRequest;

	txRaw?: TxRaw;
	data?: any;
	id: string;
	status: QueuedActionStatus;
	typeUrl?: string;
	response?: DeliverTxResponse;
	actionId?: bigint;
	action?: Action;
	networkType?: "eth" | "eth-raw" | "cosmos";
	value?: any;
	/** @deprecated fix naming */
	signDoc?: StdSignDoc;
	pubkey?: Uint8Array;
	title?: string;
	keyThemeIndex?: number;
}

export const useActionsState = createPersistantState<
	Record<string, QueuedAction | undefined>
>("queued-actions", {});

export function useActionHandler<
	abi extends Abi = Abi,
	mutability extends AbiStateMutability = AbiStateMutability,
	functionName extends ContractFunctionName<
		abi,
		mutability
	> = ContractFunctionName<abi, mutability>,
>(
	address: `0x${string}`,
	_abi: abi,
	_functionName: functionName,
	admin?: boolean,
) {
	const spaceId = useSpaceId();
	const client = useWalletClient().data;
	const { setData } = useActionsState();
	const [{ chains, connectedChain }, setChain] = useSetChain();
	const id = spaceId.spaceId ? BigInt(spaceId.spaceId) : undefined;

	const space = useSpaceById({ request: { id } });

	const approveTemplate = useTemplateById({
		request: {
			id: admin
				? space.data?.approveAdminTemplateId
				: space.data?.approveSignTemplateId,
		},
	});

	const rejectTemplate = useTemplateById({
		request: {
			id: admin
				? space.data?.rejectAdminTemplateId
				: space.data?.rejectSignTemplateId,
		},
	});

	const expectedApproveExpression = useMemo(() => {
		const expression = approveTemplate.data?.template.expression;
		return expression ? shieldStringify(expression) : DEFAULT_EXPRESSION;
	}, [approveTemplate.data?.template.expression]);

	const expectedRejectExpression = useMemo(() => {
		const expression = rejectTemplate.data?.template.expression;
		return expression ? shieldStringify(expression) : DEFAULT_EXPRESSION;
	}, [rejectTemplate.data?.template.expression]);

	const add = useCallback(
		async (
			args: ContractFunctionArgs<abi, mutability, functionName>,
			options?: {
				chainName?: string;
				ethRequest?: EthRequest;
				keyThemeIndex?: number;
				wc?: WalletConnectParams;
				snap?: SnapParams;
				title?: string;
				pubkey?: Uint8Array;
				signDoc?: StdSignDoc;
			},
		) => {
			await assertChain(chains, connectedChain, setChain);

			if (!client) {
				throw new Error("Wallet not connected");
			}

			const storeId = getActionId();
			const account = client.account;

			try {
				const call = {
					abi: _abi,
					functionName: _functionName,
					args,
				};

				const data = encodeFunctionData(call as any /** fixme types */);
				// todo estimate gas?

				const request = {
					to: address,
					data,
					account,
					chain: client.chain,
				};

				setData({
					[storeId]: {
						id: storeId,
						status: QueuedActionStatus.AwaitingSignature,
						call,
						request,
						chainName: options?.chainName,
						ethRequest: options?.ethRequest,
						pubkey: options?.pubkey,
						signDoc: options?.signDoc,
						keyThemeIndex: options?.keyThemeIndex,
						title: options?.title,
						wc: options?.wc,
						snap: options?.snap,
					},
				});

				return storeId;
			} catch (e) {
				console.error(e);

				setData({
					[storeId]: {
						id: storeId,
						status: QueuedActionStatus.Failed,
						error: e,
					},
				});
			}
		},
		[setData, client, chains, connectedChain, setChain],
	);

	return {
		add,
		expectedApproveExpression,
		expectedApproveQueryKey: approveTemplate.queryKey,
		expectedRejectExpression,
		expectedRejectQueryKey: rejectTemplate.queryKey,
	};
}
