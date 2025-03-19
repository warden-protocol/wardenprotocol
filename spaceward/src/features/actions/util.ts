import {
	fromBytes,
	toHex,
	serializeTransaction,
	TransactionSerializable,
	parseSignature,
	toBytes,
} from "viem";
import { fromBech32 } from "@cosmjs/encoding";
import { isDeliverTxSuccess, StargateClient } from "@cosmjs/stargate";
import { KeyringSnapRpcClient } from "@metamask/keyring-api";
import type { QueryClient, QueryKey } from "@tanstack/react-query";
import { IWalletKit } from "@reown/walletkit";
import { cosmos, warden } from "@wardenprotocol/wardenjs";
import { base64FromBytes } from "@wardenprotocol/wardenjs/codegen/helpers";
import { env } from "@/env";
import { getEnabledCosmosChains } from "@/config/tokens";
import type { getClient } from "@/hooks/useClient";
import { getBalanceQueryKey } from "@/features/assets/queries";
import { getProvider, isSupportedNetwork } from "@/lib/eth";
import { isUint8Array } from "@/lib/utils";
import type { QueuedAction } from "./hooks";
import { prepareTx } from "../modals/util";
import { readContractQueryKey } from "wagmi/query";
import { PRECOMPILE_WARDEN_ADDRESS } from "@/contracts/constants";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";

export type GetStatus = (
	client: Awaited<ReturnType<typeof getClient>>,
) => Promise<{
	pending: boolean;
	error: boolean;
	done: boolean;
	next?: "eth" | "eth-raw" | "cosmos";
	value?: any;
}>;

const getStatusDefault = async () => ({
	pending: false,
	error: false,
	done: true,
});

export const getActionHandler = ({ action, call, wc, snap }: QueuedAction) => {
	let getStatus: GetStatus;
	const queryKeys: QueryKey[] = [];

	if (!action?.result) {
		throw new Error("invalid action result");
	}

	const { typeUrl, value } = action.result;

	switch (typeUrl) {
		case warden.warden.v1beta3.MsgNewSignRequestResponse.typeUrl: {
			const { id } =
				warden.warden.v1beta3.MsgNewSignRequestResponse.decode(
					toBytes(value),
				);

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
						const analyzers = (call?.args as any)?.[2] as
							| `0x${string}`[]
							| undefined;

						return {
							pending: false,
							error: false,
							done: true,
							next: analyzers?.includes(
								fromBytes(
									fromBech32(env.ethereumAnalyzerContract)
										.data,
									"hex",
								),
							)
								? "eth"
								: analyzers?.includes(
											fromBytes(
												fromBech32(
													env.aminoAnalyzerContract,
												).data,
												"hex",
											),
									  )
									? "cosmos"
									: wc || snap
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
			queryKeys.push(
				readContractQueryKey({
					chainId: env.evmChainId,
					address: PRECOMPILE_WARDEN_ADDRESS,
					abi: wardenPrecompileAbi,
					functionName: "keysBySpaceId",
				}),
			);

			const { id } =
				warden.warden.v1beta3.MsgNewKeyRequestResponse.decode(
					toBytes(value),
				);

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

		case warden.warden.v1beta3.MsgUpdateSpaceResponse.typeUrl:
		case warden.warden.v1beta3.MsgAddSpaceOwnerResponse.typeUrl:
		case warden.warden.v1beta3.MsgRemoveSpaceOwnerResponse.typeUrl: {
			const _spaceId = BigInt((call?.args as any)?.[0] ?? 0);

			if (_spaceId) {
				queryKeys.push(
					readContractQueryKey({
						chainId: env.evmChainId,
						address: PRECOMPILE_WARDEN_ADDRESS,
						abi: wardenPrecompileAbi,
						functionName: "spaceById",
						args: [_spaceId],
					}),
				);
			}

			getStatus = getStatusDefault;
			break;
		}
		default:
			throw new Error(`action type not implemented: ${typeUrl}`);
	}

	return { getStatus, queryKeys };
};

export const handleEthRaw = async ({
	action,
	w,
}: {
	action: QueuedAction;
	w: IWalletKit | null;
}) => {
	const { value } = action;

	if (!value) {
		throw new Error("missing value");
	}

	// fixme
	const type =
		typeof action.keyThemeIndex !== "undefined"
			? "key"
			: action.wc
				? "wc"
				: action.snap
					? "snap"
					: undefined;

	switch (type) {
		case "wc":
			if (!action.wc) {
				throw new Error("walletconnect params not set");
			}

			if (!w) {
				throw new Error("walletconnect not initialized");
			}

			return await w
				.respondSessionRequest({
					topic: action.wc.topic,
					response: {
						jsonrpc: "2.0",
						id: action.wc.requestId,
						result: toHex(value),
					},
					// fixme
				})
				.then(() => true);
		case "snap":
			if (!action.snap) {
				throw new Error("snap params not set");
			}

			const keyringSnapClient = new KeyringSnapRpcClient(
				env.snapOrigin,
				window.ethereum,
			);

			return await keyringSnapClient
				.approveRequest(action.snap.requestId, {
					result: toHex(value),
				})
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
	w: IWalletKit | null;
	queryClient: QueryClient;
}) => {
	const { chainName, value, snap, wc, ethRequest } = action;

	if (!ethRequest || !value) {
		throw new Error("missing tx or value");
	}

	if (!isSupportedNetwork(chainName)) {
		throw new Error("unsupported network");
	}

	const signature = parseSignature(toHex(value));
	const serialized = serializeTransaction(
		ethRequest as TransactionSerializable,
		signature,
	);

	if (snap) {
		const keyringSnapClient = new KeyringSnapRpcClient(
			env.snapOrigin,
			window.ethereum,
		);

		const { r, s, yParity } = signature;
		const req = await keyringSnapClient.getRequest(snap.requestId);

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

	const hash = await provider.sendRawTransaction({
		serializedTransaction: serialized,
	});

	if (wc) {
		if (!w) {
			throw new Error("walletconnect not initialized");
		}

		await w.respondSessionRequest({
			topic: wc.topic,
			response: {
				jsonrpc: "2.0",
				id: wc.requestId,
				result: hash,
			},
		});

		return true;
	}

	return provider.waitForTransactionReceipt({ hash }).then(() => {
		queryClient.invalidateQueries({
			queryKey: getBalanceQueryKey("eip155", chainName, "").slice(0, -1),
		});

		return true;
	});
};

export const handleCosmos = async ({
	address,
	action,
	w,
	queryClient,
	rpcEndpoint,
}: {
	address: `0x${string}`;
	action: QueuedAction;
	w: IWalletKit | null;
	rpcEndpoint?: string;
	queryClient: QueryClient;
}) => {
	const { chainName, value, signDoc, pubkey, wc } = action;

	if (!chainName || !signDoc || !pubkey) {
		throw new Error("missing chainName, signDoc, pubkey");
	}

	const chain = getEnabledCosmosChains(address).find(
		(item) => item.chainName === chainName,
	);

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

	if (wc) {
		if (!w) {
			throw new Error("walletconnect not initialized");
		}

		return await w
			.respondSessionRequest({
				topic: wc.topic,
				response: {
					jsonrpc: "2.0",
					id: wc.requestId,
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

	if (!rpcEndpoint) {
		throw new Error("missing rpcEndpoint");
	}

	const client = await StargateClient.connect(rpcEndpoint);

	const res = await client.broadcastTx(
		cosmos.tx.v1beta1.TxRaw.encode(txRaw).finish(),
	);

	if (!isDeliverTxSuccess(res)) {
		throw new Error("broadcast failed");
	}

	queryClient.invalidateQueries({
		queryKey: getBalanceQueryKey("cosmos", chainName, "").slice(0, -1),
	});

	return true;
};
