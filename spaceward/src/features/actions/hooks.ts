import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { useChain } from "@cosmos-kit/react";
import { cosmos } from "@wardenprotocol/wardenjs";
import { createPersistantState } from "../../hooks/state";
import { useNewAction } from "../../hooks/useAction";
import { getSigningClient, TxOptions } from "../../hooks/useClient";
import { env } from "../../env";
import { Action } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";
import { TransactionLike } from "ethers";
import { StdSignDoc } from "@cosmjs/amino";

type TxRaw = Parameters<typeof cosmos.tx.v1beta1.TxRaw.encode>[0];

const getActionId = () =>
	`${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

const defaultFee: StdFee = {
	gas: "200000",
	amount: [{ denom: "uward", amount: "250" }],
};

export enum QueuedActionStatus {
	Signed = 0x00,
	Broadcast,
	AwaitingApprovals,
	ActionReady,
	AwaitingBroadcast,
	Success = 0x99,
	Failed = 0xff,
}

export interface QueuedAction {
	txRaw: TxRaw;
	data: any;
	id: string;
	chainName?: string;
	status: QueuedActionStatus;
	typeUrl: string;
	response?: DeliverTxResponse;
	actionId?: bigint;
	action?: Action;
	networkType?: "eth" | "eth-raw" | "cosmos";
	value?: any;
	/** @deprecated fix naming */
	tx?: TransactionLike;
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

export function useEnqueueAction<Data>(
	getMessage: ReturnType<typeof useNewAction<Data>>["getMessage"],
) {
	const { address, getOfflineSignerDirect: getOfflineSigner } = useChain(
		env.cosmoskitChainName,
	);

	const { setData } = useActionsState();

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
		const signer = getOfflineSigner();
		const client = await getSigningClient(signer);
		const msg = getMessage(data, actionTimeoutHeight);
		const fee = opts.fee || defaultFee;
		const signedTx = await client.sign(address, [msg], fee, "");

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
