import { hexlify, Transaction } from "ethers";
import { WalletManager } from "@cosmos-kit/core";
import { isDeliverTxSuccess, StargateClient } from "@cosmjs/stargate";
import { KeyringSnapRpcClient } from "@metamask/keyring-api";
import type { QueryClient } from "@tanstack/react-query";
import { IWeb3Wallet } from "@walletconnect/web3wallet";
import { cosmos, warden } from "@wardenprotocol/wardenjs";
import { base64FromBytes } from "@wardenprotocol/wardenjs/codegen/helpers";
import { env } from "@/env";
import { COSMOS_CHAINS } from "@/config/tokens";
import type { getClient } from "@/hooks/useClient";
import { getBalanceQueryKey } from "@/features/assets/queries";
import { getProvider, isSupportedNetwork } from "@/lib/eth";
import { isUint8Array } from "@/lib/utils";
import type { QueuedAction } from "./hooks";
import { prepareTx } from "../modals/util";

export type GetStatus = (
	client: Awaited<ReturnType<typeof getClient>>,
) => Promise<{
	pending: boolean;
	error: boolean;
	done: boolean;
	next?: "eth" | "eth-raw" | "cosmos";
	value?: any;
}>;

export const getActionHandler = ({
	action,
	data,
	snapRequestId,
	walletConnectRequestId,
	walletConnectTopic,
}: QueuedAction) => {
	let getStatus: GetStatus;

	if (!action?.result) {
		throw new Error("invalid action result");
	}

	const { typeUrl, value } = action.result;

	switch (typeUrl) {
		case warden.warden.v1beta3.MsgNewSignRequestResponse.typeUrl: {
			const { id } =
				warden.warden.v1beta3.MsgNewSignRequestResponse.decode(value);

			getStatus = async (client) => {
				const { signRequest } =
					await client.warden.warden.v1beta3.signRequestById({
						id,
					});

				switch (signRequest?.status) {
					case warden.warden.v1beta3.SignRequestStatus
						.SIGN_REQUEST_STATUS_PENDING:
						return {
							pending: true,
							error: false,
							done: false,
						};
					case warden.warden.v1beta3.SignRequestStatus
						.SIGN_REQUEST_STATUS_FULFILLED:
						const analyzers = (
							data as Parameters<
								typeof warden.warden.v1beta3.MsgNewSignRequest.encode
							>[0]
						).analyzers;

						return {
							pending: false,
							error: false,
							done: true,
							next: analyzers.includes(
								env.ethereumAnalyzerContract,
							)
								? "eth"
								: analyzers.includes(env.aminoAnalyzerContract)
									? "cosmos"
									: // fixme
										(walletConnectRequestId &&
												walletConnectTopic) ||
										  snapRequestId
										? "eth-raw"
										: undefined,
							value: signRequest?.signedData,
						};

					default:
						return {
							pending: false,
							error: true,
							done: true,
						};
				}
			};
			break;
		}
		case warden.warden.v1beta3.MsgNewKeyRequestResponse.typeUrl: {
			const { id } =
				warden.warden.v1beta3.MsgNewKeyRequestResponse.decode(value);

			getStatus = async (client) => {
				const { keyRequest } =
					await client.warden.warden.v1beta3.keyRequestById({
						id,
					});

				switch (keyRequest?.status) {
					case warden.warden.v1beta3.KeyRequestStatus
						.KEY_REQUEST_STATUS_PENDING:
						return {
							pending: true,
							error: false,
							done: false,
						};
					case warden.warden.v1beta3.KeyRequestStatus
						.KEY_REQUEST_STATUS_FULFILLED:
						return {
							pending: false,
							error: false,
							done: true,
							value: keyRequest.id,
						};
					default:
						return {
							pending: false,
							error: true,
							done: true,
						};
				}
			};
			break;
		}
		case warden.warden.v1beta3.MsgUpdateSpaceResponse.typeUrl: {
			getStatus = async () => ({
				pending: false,
				error: false,
				done: true,
			});

			break;
		}
		default:
			throw new Error(`action type not implemented: ${typeUrl}`);
	}

	return { getStatus };
};

export const handleEthRaw = async ({
	action,
	w,
}: {
	action: QueuedAction;
	w: IWeb3Wallet | null;
}) => {
	const { value } = action;

	if (!value) {
		throw new Error("missing value");
	}

	// fixme
	const type =
		typeof action.keyThemeIndex !== "undefined"
			? "key"
			: (["walletConnectRequestId", "walletConnectTopic"] as const).every(
						(key) => typeof action[key] !== "undefined",
				  )
				? "wc"
				: typeof action.snapRequestId
					? "snap"
					: undefined;

	switch (type) {
		case "wc":
			if (!w) {
				throw new Error("walletconnect not initialized");
			}

			return await w
				.respondSessionRequest({
					topic: action.walletConnectTopic!,
					response: {
						jsonrpc: "2.0",
						id: action.walletConnectRequestId!,
						result: hexlify(value),
					},
					// fixme
				})
				.then(() => true);
		case "snap":
			const keyringSnapClient = new KeyringSnapRpcClient(
				env.snapOrigin,
				window.ethereum,
			);

			return await keyringSnapClient
				.approveRequest(
					action.snapRequestId!,
					{
						result: hexlify(value),
					},
					// fixme
				)
				.then(() => true);
		case "key": // should never happen in this case
		default:
			throw new Error(`action type not implemented: ${type}`);
	}
};

export const handleEth = async ({
	action,
	w,
	queryClient,
}: {
	action: QueuedAction;
	w: IWeb3Wallet | null;
	queryClient: QueryClient;
}) => {
	const {
		chainName,
		value,
		snapRequestId,
		walletConnectRequestId,
		walletConnectTopic,
		tx,
	} = action;

	if (!tx || !value) {
		throw new Error("missing tx or value");
	}

	if (!isSupportedNetwork(chainName)) {
		throw new Error("unsupported network");
	}

	const signedTx = Transaction.from({ ...tx });
	signedTx.signature = hexlify(value);

	if (snapRequestId) {
		const keyringSnapClient = new KeyringSnapRpcClient(
			env.snapOrigin,
			window.ethereum,
		);

		const { r, s, yParity } = signedTx.signature!;
		const req = await keyringSnapClient.getRequest(snapRequestId);

		return await keyringSnapClient
			.approveRequest(req.id, {
				result: {
					r,
					s,
					v: `0x${yParity}`,
				},
			})
			// fixme
			.then(() => true);
	}

	const { provider } = getProvider(chainName);
	const res = await provider.broadcastTransaction(signedTx.serialized);

	if (walletConnectRequestId && walletConnectTopic) {
		if (!w) {
			throw new Error("walletconnect not initialized");
		}

		return await w
			.respondSessionRequest({
				topic: walletConnectTopic,
				response: {
					jsonrpc: "2.0",
					id: walletConnectRequestId,
					result: res.hash,
				},
			})
			// fixme
			.then(() => true);
	}

	return provider.waitForTransaction(res.hash).then(() => {
		queryClient.invalidateQueries({
			queryKey: getBalanceQueryKey("eip155", chainName, "").slice(0, -1),
		});

		return true;
	});
};

export const handleCosmos = async ({
	action,
	w,
	walletManager,
	queryClient,
}: {
	action: QueuedAction;
	w: IWeb3Wallet | null;
	walletManager: WalletManager;
	queryClient: QueryClient;
}) => {
	const {
		chainName,
		value,
		signDoc,
		pubkey,
		walletConnectRequestId,
		walletConnectTopic,
	} = action;

	if (!chainName || !signDoc || !pubkey) {
		throw new Error("missing chainName, signDoc, pubkey");
	}

	const chain = COSMOS_CHAINS.find((item) => item.chainName === chainName);

	if (!chain) {
		throw new Error("chain not found");
	}

	if (!isUint8Array(value)) {
		throw new Error("value is not Uint8Array");
	}

	let sig = value;

	if (sig.length === 65) {
		sig = sig.slice(0, -1);
	}

	if (sig.length !== 64) {
		throw new Error("unexpected signature length");
	}

	if (walletConnectRequestId && walletConnectTopic) {
		if (!w) {
			throw new Error("walletconnect not initialized");
		}

		return await w
			.respondSessionRequest({
				topic: walletConnectTopic,
				response: {
					jsonrpc: "2.0",
					id: walletConnectRequestId,
					result: {
						signed: signDoc,
						signature: {
							signature: base64FromBytes(sig),
							pub_key: {
								type: "tendermint/PubKeySecp256k1",
								value: base64FromBytes(pubkey),
							},
						},
					},
				},
			})
			// fixme
			.then(() => {
				// todo
				// possibly add a timeout, as walletconnect with cosmos does not wait for tx result

				queryClient.invalidateQueries({
					queryKey: getBalanceQueryKey("cosmos", chainName, "").slice(
						0,
						-1,
					),
				});

				return true;
			});
	}

	const { signedTxBodyBytes, signedAuthInfoBytes } = prepareTx(
		signDoc,
		pubkey,
	);

	const txRaw = cosmos.tx.v1beta1.TxRaw.fromPartial({
		bodyBytes: signedTxBodyBytes,
		authInfoBytes: signedAuthInfoBytes,
		signatures: [sig],
	});

	let rpc: string;
	if (chain.rpc) {
		[rpc] = chain.rpc;
	} else {
		const repo = walletManager.getWalletRepo(chainName);
		repo.activate();
		const endpoint = await repo.getRpcEndpoint();

		rpc = endpoint
			? typeof endpoint === "string"
				? endpoint
				: endpoint.url
			: "https://rpc.cosmos.directory/" + chainName;
	}

	const client = await StargateClient.connect(rpc);
	const res = await client.broadcastTx(
		cosmos.tx.v1beta1.TxRaw.encode(txRaw).finish(),
	);

	if (!isDeliverTxSuccess(res)) {
		throw new Error("broadcast failed");
	}

	return true;
};
