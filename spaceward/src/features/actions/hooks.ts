import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { useChain } from "@cosmos-kit/react";
import { cosmos } from "@wardenprotocol/wardenjs";
import { createPersistantState } from "../../hooks/state";
import { useNewAction } from "../../hooks/useAction";
import { TxOptions, useTx } from "../../hooks/useClient";
import { env } from "../../env";
import { Action } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";
import { TransactionLike } from "ethers";
import { StdSignDoc } from "@cosmjs/amino";
import { useWalletClient } from "wagmi";
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
import { useCallback } from "react";
import { assertChain } from "@/utils/contract";
import { useSetChain } from "@web3-onboard/react";

type TxRaw = Parameters<typeof cosmos.tx.v1beta1.TxRaw.encode>[0];

const getActionId = () =>
	`${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

const defaultFee: StdFee = {
	gas: "220000",
	amount: [{ denom: "award", amount: "250000000000000" }],
};

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
	walletConnectRequestId?: number;
	walletConnectTopic?: string;
	snapRequestId?: string;
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
>(address: `0x${string}`, _abi: abi, _functionName: functionName) {
	const client = useWalletClient().data;
	const { setData } = useActionsState();
	const [{ chains, connectedChain }, setChain] = useSetChain();

	const add = useCallback(
		async (
			args: ContractFunctionArgs<abi, mutability, functionName>,
			options?: {
				chainName?: string;
				title?: string;
				keyThemeIndex?: number;
				wc?: WalletConnectParams;
				snap?: SnapParams;
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

	return { add };
}

export function useEnqueueAction<Data>(
	getMessage: ReturnType<typeof useNewAction<Data>>["getMessage"],
) {
	const { address } = useChain(env.cosmoskitChainName);
	const { setData } = useActionsState();
	const { sign } = useTx();

	async function addAction(
		data: Parameters<typeof getMessage>[0],
		// fixme
		_opts: TxOptions & {
			chainName?: string;
			tx?: TransactionLike;
			signDoc?: StdSignDoc;
			pubkey?: Uint8Array;
			title?: string;
			keyThemeIndex?: number;
			walletConnectRequestId?: number;
			walletConnectTopic?: string;
			snapRequestId?: string;
		} = {},
		actionTimeoutHeight = 0,
	) {
		const {
			chainName,
			tx,
			pubkey,
			signDoc,
			title,
			snapRequestId,
			keyThemeIndex,
			walletConnectRequestId,
			walletConnectTopic,
			...opts
		} = _opts;

		if (!address) {
			throw new Error("Wallet not connected");
		}

		const storeId = getActionId();
		const msg = getMessage(data, actionTimeoutHeight);
		const fee = opts.fee || defaultFee;
		const signedTx = await sign([msg], { fee });

		setData({
			[storeId]: {
				txRaw: signedTx,
				id: storeId,
				typeUrl: msg.typeUrl,
				data,
				status: QueuedActionStatus.Signed,
				chainName,
				pubkey,
				signDoc,
				title,
				snapRequestId,
				tx,
				keyThemeIndex,
				walletConnectRequestId,
				walletConnectTopic,
			},
		});

		return storeId;
	}

	return { addAction };
}
