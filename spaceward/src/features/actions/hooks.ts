import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { useChain } from "@cosmos-kit/react";
import { cosmos, warden } from "@wardenprotocol/wardenjs";
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

export interface TxRawBase64 {
	bodyBytes: string;
	authInfoBytes: string;
	signatures: string[];
}

export const txRawBase64Encode = (txRaw: TxRaw): TxRawBase64 => ({
	bodyBytes: Buffer.from(txRaw.bodyBytes).toString("base64"),
	authInfoBytes: Buffer.from(txRaw.authInfoBytes).toString("base64"),
	signatures: txRaw.signatures.map((s) => Buffer.from(s).toString("base64")),
});

export const txRawBase64Decode = (txRaw: TxRawBase64): TxRaw => ({
	bodyBytes: Buffer.from(txRaw.bodyBytes, "base64"),
	authInfoBytes: Buffer.from(txRaw.authInfoBytes, "base64"),
	signatures: txRaw.signatures.map((s) => Buffer.from(s, "base64")),
});

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
	b64Tx: TxRawBase64;
	data: any;
	id: string;
	chainName?: string;
	status: QueuedActionStatus;
	typeUrl: string;
	response?: DeliverTxResponse;
	actionId?: bigint;
	action?: Action;
	networkType?: "eth" | "cosmos";
	value?: any;
	tx?: TransactionLike;
	signDoc?: StdSignDoc;
	pubkey?: Uint8Array;
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
		} = {},
		actionTimeoutHeight = 0,
	) {
		const { chainName, tx, pubkey, signDoc, ...opts } = _opts;

		if (!address) {
			throw new Error("Wallet not connected");
		}

		const storeId = getActionId();
		const signer = getOfflineSigner();
		const client = await getSigningClient(signer);
		const msg = getMessage(data, actionTimeoutHeight);
		const fee = opts.fee || defaultFee;
		const signedTx = await client.sign(address, [msg], fee, "");
		const b64Tx = txRawBase64Encode(signedTx);

		setData({
			[storeId]: {
				b64Tx,
				id: storeId,
				typeUrl: msg.typeUrl,
				data,
				status: QueuedActionStatus.Signed,
				chainName,
				tx,
				signDoc,
				pubkey
			},
		});

		return storeId;
	}

	return { addAction };
}
