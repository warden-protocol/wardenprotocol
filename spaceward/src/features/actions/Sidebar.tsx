import clsx from "clsx";
import { useEffect } from "react";
import { useChain } from "@cosmos-kit/react-lite";
import { env } from "@/env";
import { QueuedAction, QueuedActionStatus, useActionsState } from "./hooks";
import { getClient, getSigningClient } from "@/hooks/useClient";
import { cosmos, warden } from "@wardenprotocol/wardenjs";
import { isDeliverTxSuccess, StargateClient } from "@cosmjs/stargate";
import { ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";
import { hexlify, Transaction } from "ethers";
import { getProvider, isSupportedNetwork } from "@/lib/eth";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import "./animate.css";
import { isUint8Array } from "@/lib/utils";
import { prepareTx } from "../modals/util";
import { COSMOS_CHAINS } from "@/config/tokens";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { base64FromBytes } from "@wardenprotocol/wardenjs/codegen/helpers";
import { useToast } from "@/components/ui/use-toast";

interface ItemProps extends QueuedAction {
	single?: boolean;
}

type GetStatus = (client: Awaited<ReturnType<typeof getClient>>) => Promise<{
	pending: boolean;
	error: boolean;
	done: boolean;
	next?: "eth" | "eth-raw" | "cosmos";
	value?: any;
}>;

function ActionItem({ single, ...item }: ItemProps) {
	const { toast } = useToast();
	const { w } = useWeb3Wallet("wss://relay.walletconnect.org");
	const { setData } = useActionsState();

	const { getOfflineSignerDirect: getOfflineSigner } = useChain(
		env.cosmoskitChainName,
	);

	useEffect(() => {
		if (item.status === QueuedActionStatus.Signed) {
			const signer = getOfflineSigner();
			let cancel = false;

			getSigningClient(signer)
				.then((client) => {
					if (cancel) {
						return;
					}

					const txRaw = cosmos.tx.v1beta1.TxRaw.encode(item.txRaw);
					return client.broadcastTx(Uint8Array.from(txRaw.finish()));
				})
				.then((res) => {
					if (!res || cancel) {
						return;
					}

					if (isDeliverTxSuccess(res)) {
						setData({
							[item.id]: {
								...item,
								status: QueuedActionStatus.Broadcast,
								response: res,
							},
						});
					} else {
						console.error("Failed to broadcast", res);

						toast({
							title: "Failed",
							description: "Could not broadcast transaction",
							duration: 10000,
						});

						setData({
							[item.id]: {
								...item,
								status: QueuedActionStatus.Failed,
								response: res,
							},
						});
					}
				})
				.catch((err) => {
					toast({
						title: "Failed",
						description: err.message ?? "Unexpected error",
						duration: 10000,
					});

					setData({
						[item.id]: {
							...item,
							status: QueuedActionStatus.Failed,
						},
					});

					console.error(err);
				});

			return () => {
				cancel = true;
			};
		} else if (item.status === QueuedActionStatus.Broadcast) {
			const actionCreatedAny = item.response?.msgResponses[0];
			let actionId: bigint | undefined;

			if (!actionCreatedAny) {
				console.error("no action created");
				return;
			}

			if (item.typeUrl === warden.act.v1beta1.MsgNewAction.typeUrl) {
				const actionCreated =
					warden.act.v1beta1.MsgNewActionResponse.decode(
						actionCreatedAny.value,
					);

				actionId = actionCreated.id;
			} else {
				console.error("unexpected action type", item.typeUrl);
			}

			if (actionId) {
				setData({
					[item.id]: {
						...item,
						actionId,
						status: QueuedActionStatus.AwaitingApprovals,
					},
				});
			}
		} else if (item.status === QueuedActionStatus.AwaitingApprovals) {
			let cancel = false;
			let timeout: number | undefined;

			async function checkAction() {
				if (cancel || !item.actionId) {
					return;
				}

				const client = await getClient();

				const res = await client.warden.act.v1beta1.actionById({
					id: item.actionId,
				});

				if (
					res.action?.status === ActionStatus.ACTION_STATUS_COMPLETED
				) {
					const { action } = res;

					setData({
						[item.id]: {
							...item,
							status: QueuedActionStatus.ActionReady,
							action,
						},
					});
				} else if (
					res.action?.status === ActionStatus.ACTION_STATUS_PENDING
				) {
					timeout = setTimeout(
						checkAction,
						1000,
					) as unknown as number;
				} else {
					console.error("action failed", res);
					toast({
						title: "Failed",
						description: "Unexpected action status",
						duration: 10000,
					});

					setData({
						[item.id]: {
							...item,
							status: QueuedActionStatus.Failed,
						},
					});
				}
			}

			checkAction();

			return () => {
				cancel = true;
				clearTimeout(timeout);
			};
		} else if (item.status === QueuedActionStatus.ActionReady) {
			let cancel = false;
			let timeout: number | undefined;
			let getStatus: GetStatus | undefined;

			switch (item.action?.result?.typeUrl) {
				case warden.warden.v1beta3.MsgNewSignRequestResponse.typeUrl: {
					const { id } =
						warden.warden.v1beta3.MsgNewSignRequestResponse.decode(
							item.action.result.value,
						);

					getStatus = (client) =>
						client.warden.warden.v1beta3
							.signRequestById({ id })
							.then(({ signRequest }) => {
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
											item.data as Parameters<
												typeof warden.warden.v1beta3.MsgNewSignRequest.encode
											>[0]
										).analyzers;
										const {
											walletConnectRequestId,
											walletConnectTopic,
										} = item;

										return {
											pending: false,
											error: false,
											done: true,
											next: analyzers.includes(
												env.ethereumAnalyzerContract,
											)
												? "eth"
												: analyzers.includes(
															env.aminoAnalyzerContract,
													  )
													? "cosmos"
													: // fixme
														walletConnectRequestId &&
														  walletConnectTopic
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
							});

					break;
				}
				default:
					console.warn("unknown action", item.action);
			}

			async function checkResult() {
				if (cancel || !getStatus) {
					return;
				}

				const client = await getClient();
				const status = await getStatus(client);

				if (status.error) {
					toast({
						title: "Failed",
						description: "Action failed",
						duration: 10000,
					});
					setData({
						[item.id]: {
							...item,
							status: QueuedActionStatus.Failed,
						},
					});
				} else if (status.pending) {
					setTimeout(checkResult, 1000);
				} else if (status.done) {
					if (!status.next) {
						toast({
							title: "Success",
							description: "Action successful",
							duration: 10000,
						});
					}
					setData({
						[item.id]: status.next
							? {
									...item,
									status: QueuedActionStatus.AwaitingBroadcast,
									networkType: status.next,
									value: status.value,
								}
							: {
									...item,
									status: QueuedActionStatus.Success,
								},
					});
				}
			}

			checkResult();

			return () => {
				cancel = true;
				clearTimeout(timeout);
			};
		} else if (item.status === QueuedActionStatus.AwaitingBroadcast) {
			let promise: Promise</*TransactionReceipt*/ {} | null> | undefined;

			switch (item.networkType) {
				case "eth-raw": {
					const {
						value,
						walletConnectRequestId,
						walletConnectTopic,
					} = item;

					if (!value) {
						console.error("missing value");
						return;
					}

					if (!walletConnectRequestId || !walletConnectTopic) {
						promise = Promise.reject(
							new Error("only walletconnect supported"),
						);
					} else if (!w) {
						promise = Promise.reject(
							new Error("walletconnect not initialized"),
						);
					} else {
						promise = w
							.respondSessionRequest({
								topic: walletConnectTopic,
								response: {
									jsonrpc: "2.0",
									id: walletConnectRequestId,
									result: hexlify(value),
								},
							})
							.then(() => true);
					}

					break;
				}
				case "eth": {
					const {
						chainName,
						tx,
						value,
						walletConnectRequestId,
						walletConnectTopic,
					} = item;

					if (!tx || !value) {
						console.error("missing tx or value");
						return;
					}

					if (!isSupportedNetwork(chainName)) {
						console.error("unsupported network", chainName);
						return;
					}

					const signedTx = Transaction.from(tx);
					signedTx.signature = hexlify(value);
					const provider = getProvider(chainName);

					promise = provider
						.broadcastTransaction(signedTx.serialized)
						.then((res) => {
							if (walletConnectRequestId && walletConnectTopic) {
								if (!w) {
									throw new Error(
										"walletconnect not initialized",
									);
								}

								return (
									w
										.respondSessionRequest({
											topic: walletConnectTopic,
											response: {
												jsonrpc: "2.0",
												id: walletConnectRequestId,
												result: res.hash,
											},
										})
										// fixme
										.then(() => true)
								);
							}

							return provider.waitForTransaction(res.hash);
						});

					break;
				}

				case "cosmos": {
					const {
						chainName,
						signDoc,
						value,
						pubkey,
						walletConnectRequestId,
						walletConnectTopic,
					} = item;

					if (!chainName || !signDoc || !pubkey) {
						console.error(
							"missing chainName, signDoc, value, pubkey",
						);
						return;
					}

					const chain = COSMOS_CHAINS.find(
						(item) => item.chainName === chainName,
					);

					if (!chain) {
						console.error("chain not found", chainName);
						return;
					}

					if (!isUint8Array(value)) {
						console.error("value is not Uint8Array");
						return;
					}

					let sig = value;

					if (sig.length === 65) {
						sig = sig.slice(0, -1);
					}

					if (sig.length !== 64) {
						console.error("unexpected signature length");
						return;
					}

					if (walletConnectRequestId && walletConnectTopic) {
						if (!w) {
							promise = Promise.reject(
								new Error("walletconnect not initialized"),
							);
						} else {
							promise = w
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
													value: base64FromBytes(
														pubkey,
													),
												},
											},
										},
									},
								})
								// fixme
								.then(() => true);
						}
					} else {
						const { signedTxBodyBytes, signedAuthInfoBytes } =
							prepareTx(signDoc, pubkey);

						const txRaw = cosmos.tx.v1beta1.TxRaw.fromPartial({
							bodyBytes: signedTxBodyBytes,
							authInfoBytes: signedAuthInfoBytes,
							signatures: [sig],
						});

						promise = StargateClient.connect(chain.rpc)
							.then((client) => {
								return client.broadcastTx(
									cosmos.tx.v1beta1.TxRaw.encode(
										txRaw,
									).finish(),
									// fixme
								);
							})
							.then((res) => {
								if (!isDeliverTxSuccess(res)) {
									console.error("broadcast failed", res);
									throw new Error("broadcast failed");
								}

								return res as any;
							});
					}

					break;
				}

				default:
					console.error("not implemented", item.networkType);
			}

			if (!promise) {
				return;
			}

			promise
				.then((res) => {
					if (!res) {
						toast({
							title: "Failed",
							description: "Transaction failed",
							duration: 10000,
						});

						setData({
							[item.id]: {
								...item,
								status: QueuedActionStatus.Failed,
							},
						});
						return;
					}

					toast({
						title: "Success",
						description: "Transaction successful",
						duration: 10000,
					});

					setData({
						[item.id]: {
							...item,
							status: QueuedActionStatus.Success,
						},
					});
				})
				.catch((err) => {
					console.error("broadcast failed", err);

					toast({
						title: "Failed",
						description: err.message ?? "Unexpected error",
						duration: 10000,
					});

					setData({
						[item.id]: {
							...item,
							status: QueuedActionStatus.Failed,
						},
					});
				});
		}
	}, [item.status]);

	return (
		<div
			className={clsx("flex flex-col", {
				"mx-2 p-3 rounded-lg": !single,
			})}
		>
			<p className="text-lg font-semibold">Action</p>

			<p className="text-sm text-gray-500 mb-2">
				{item.status === QueuedActionStatus.Signed
					? "Awaiting broadcast"
					: item.status === QueuedActionStatus.Broadcast
						? "Awaiting action result"
						: item.status === QueuedActionStatus.AwaitingApprovals
							? "Awaiting approvals"
							: item.status === QueuedActionStatus.ActionReady
								? "Action ready"
								: item.status ===
									  QueuedActionStatus.AwaitingBroadcast
									? "Awaiting broadcast"
									: item.status === QueuedActionStatus.Success
										? "Success"
										: item.status ===
											  QueuedActionStatus.Failed
											? "Failed"
											: "Unknown"}
			</p>
			{/* progress bar */}
			<div className="flex items-center gap-2">
				<div className="flex-1 h-1 bg-fill-quaternary rounded-lg">
					<div
						className="h-1 bg-accent rounded-lg"
						style={{
							width: `${
								item.status === QueuedActionStatus.Success
									? 100
									: (item.status /
											(QueuedActionStatus.AwaitingBroadcast +
												1)) *
										100
							}%`,
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default function ActionSidebar() {
	const { data } = useActionsState();
	const storeIds = Object.keys(data ?? {});

	const filtered = storeIds.filter((id) => {
		const action = data?.[id];
		return (
			action &&
			action.status !== QueuedActionStatus.Failed &&
			action.status !== QueuedActionStatus.Success
		);
	});

	const total = filtered.length;
	const hidden = !total;
	const first = data?.[filtered[0]];

	return (
		<div
			className={clsx(
				"flex flex-col mx-2 p-3 rounded-lg bg-fill-quaternary",
				{
					hidden,
					"border-progress": !hidden,
				},
			)}
		>
			<div>
				{total === 1 ? (
					first ? (
						<ActionItem single {...data?.[filtered[0]]!} />
					) : null
				) : (
					<Popover>
						<PopoverTrigger asChild>
							<div className="flex flex-col relative cursor-pointer">
								<p className="text-lg font-semibold">
									{total} transactions
								</p>

								<p className="text-sm text-gray-500 mb-2">
									In progress..
								</p>
							</div>
						</PopoverTrigger>
						<PopoverContent
							side="left"
							sideOffset={20}
							className="p-0"
						>
							<div className="bg-fill-quaternary">
								{filtered.map((id) => {
									const action = data?.[id];

									return action ? (
										<ActionItem key={id} {...action} />
									) : null;
								})}
							</div>
						</PopoverContent>
					</Popover>
				)}
			</div>
		</div>
	);
}
