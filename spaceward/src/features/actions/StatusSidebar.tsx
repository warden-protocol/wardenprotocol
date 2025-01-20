import "./animate.css";
import clsx from "clsx";
import { useContext, useEffect, useRef, useState } from "react";
import { sendTransaction as _sendTransaction } from "viem/actions";
import { getAction, parseEventLogs } from "viem/utils";
import { useConfig, usePublicClient, useWalletClient } from "wagmi";
import { readContractQueryOptions } from "wagmi/query"
import { walletContext } from "@cosmos-kit/react-lite";
import { ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";
import { useToast } from "@/components/ui/use-toast";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { getClient } from "@/hooks/useClient";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { QueuedAction, QueuedActionStatus, useActionsState } from "./hooks";
import { getActionHandler, GetStatus, handleCosmos, handleEth, handleEthRaw } from "./util";
import { TEMP_KEY, useKeySettingsState } from "../keys/state";
import Assets from "../keys/assets";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { capitalize } from "../modals/util";
import { queryCosmosClients } from "../assets/queries";
import actPrecompileAbi from "@/contracts/actPrecompileAbi";
import { env } from "@/env";
import { PRECOMPILE_ACT_ADDRESS } from "@/contracts/constants";
import { useConnectWallet } from "@web3-onboard/react";

interface ItemProps extends QueuedAction {
	single?: boolean;
}

const waitForVisibility = () => {
	if (document.visibilityState === "visible") {
		return Promise.resolve();
	}

	return new Promise<void>(resolve => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") {
				resolve();
				window.removeEventListener("visibilitychange", handleVisibilityChange);
			}
		};

		window.addEventListener("visibilitychange", handleVisibilityChange);
	});
};

function ActionItem({ single, ...item }: ItemProps) {
	const publicClient = usePublicClient();
	const walletClient = useWalletClient().data;
	const queryClient = useQueryClient();
	const { walletManager } = useContext(walletContext);
	const [{ wallet }] = useConnectWallet();
	const account = wallet?.accounts?.[0];
	const address = account?.address;
	const cosmosClients = useQuery({ ...(address ? queryCosmosClients(walletManager, address!) : {}), enabled: Boolean(address) }).data;
	const clientsRef = useRef(cosmosClients);
	clientsRef.current = cosmosClients;
	const { data: ks, setData: setKeySettings } = useKeySettingsState();
	const { toast } = useToast()
	const config = useConfig();
	const { w } = useWeb3Wallet(env.wcWalletRelayUrl);
	const { setData } = useActionsState();

	const type = typeof item.keyThemeIndex !== "undefined" ?
		"key" : item.wc ?
			"wc" : item.snap ?
				"snap" : undefined

	const ready = Boolean(walletClient && publicClient);

	useEffect(() => {
		if (!ready) {
			return;
		}

		let canceled = false;
		let cancel: () => void;
		let timeout: number | undefined;

		const promise = new Promise<void>((_, reject) => {
			cancel = () => {
				canceled = true;
				reject(new Error("cancelled"));
			}
		})

		const sendTransaction = getAction(
			walletClient!,
			_sendTransaction,
			"sendTransaction",
		);

		console.log("processing", item);
		async function processItem() {
			if (canceled || !address) {
				return;
			}

			switch (item.status) {
				case QueuedActionStatus.AwaitingSignature: {
					try {
						if (!item.request) {
							throw new Error("no request", { cause: { item } });
						}

						if (!publicClient) {
							throw new Error("no public client", { cause: { item } });
						}

						const gas = (await publicClient.estimateContractGas({
							abi: item.call!.abi,
							functionName: item.call!.functionName,
							args: item.call!.args as any,
							address: item.request.to,
						})) * BigInt(2);

						const hash = await sendTransaction({ ...item.request, gas });

						setData({
							[item.id]: {
								...item,
								hash,
								status: QueuedActionStatus.Signed,
							},
						});
					} catch (e) {
						console.error("failed to sign", e);

						setData({
							[item.id]: {
								...item,
								error: e,
								status: QueuedActionStatus.Failed,
							},
						});

						toast({
							title: "Failed",
							description: (e as any)?.message ?? "Could not sign transaction",
							duration: 10000,
						});
					}

					break;
				}

				case QueuedActionStatus.Signed: {
					try {
						if (!item.hash) {
							throw new Error("no hash", { cause: { item } });
						}

						console.log("waiting for receipt", item.hash);
						const receipt = await publicClient?.waitForTransactionReceipt({ hash: item.hash });
						console.log("receipt", receipt);

						if (receipt?.status !== "success") {
							throw new Error("transaction failed", { cause: { item, receipt } });
						}

						let actionId: bigint | undefined;

						for (const log of parseEventLogs({ abi: actPrecompileAbi, logs: receipt.logs })) {
							if (log.eventName !== "CreateAction") {
								continue;
							}

							actionId = log.args.actionId;
						}

						if (!actionId) {
							throw new Error("no action id", { cause: { item, receipt } });
						}

						console.log("action id", actionId);

						setData({
							[item.id]: {
								...item,
								actionId,
								receipt,
								status: QueuedActionStatus.Broadcast,
							},
						});
					} catch (e) {
						console.error("failed to wait for receipt", e, (e as any)?.cause);

						setData({
							[item.id]: {
								...item,
								error: e,
								status: QueuedActionStatus.Failed,
							},
						});

						toast({
							title: "Failed",
							description: (e as any)?.message ?? "Transaction encountered an error",
							duration: 10000,
						});
					}

					break;
				}

				case QueuedActionStatus.Broadcast:
				case QueuedActionStatus.AwaitingApprovals: {
					async function checkAction() {
						if (canceled || !item.actionId) {
							return;
						}

						const queryOptions = readContractQueryOptions(config, {
							chainId: env.evmChainId,
							address: PRECOMPILE_ACT_ADDRESS,
							abi: actPrecompileAbi,
							functionName: "actionById",
							args: [item.actionId],
						});

						let action: Awaited<ReturnType<typeof queryOptions.queryFn>>["action"] | undefined;

						try {

							const res = await queryClient.fetchQuery(
								// @ts-expect-error fixme update @tanstack/react-query version to > 5
								queryOptions
							);

							action = res.action;
						} catch (e) {
							console.error("failed to get action", e);
						}

						if (
							action?.status === ActionStatus.ACTION_STATUS_COMPLETED
						) {
							setData({
								[item.id]: {
									...item,
									status: QueuedActionStatus.ActionReady,
									action,
								},
							});
						} else if (
							action?.status === ActionStatus.ACTION_STATUS_PENDING
						) {
							timeout = setTimeout(
								checkAction,
								1000,
							) as unknown as number;
						} else if (action?.status === ActionStatus.ACTION_STATUS_REVOKED) {
							console.error("action revoked", action);

							toast({
								title: "Failed",
								description: "Action revoked",
								duration: 10000,
							});

							setData({
								[item.id]: {
									...item,
									status: QueuedActionStatus.Failed,
									action,
								}
							})
						} else {
							console.error("action failed", action);

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
					break;
				}

				case QueuedActionStatus.ActionReady: {
					let [getStatus, queryKeys]: [GetStatus | undefined, QueryKey[]] = [undefined, []];

					try {
						const res = getActionHandler(item);
						getStatus = res.getStatus;
						queryKeys = res.queryKeys;
					} catch (e) {
						console.error(e);

						toast({
							title: "Failed",
							description: (e as Error)?.message ?? "Action failed",
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

					async function checkResult() {
						if (canceled || !getStatus) {
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
							for (const queryKey of queryKeys) {
								queryClient.invalidateQueries({ queryKey });
							}

							if (!status.next) {
								toast({
									title: "Success",
									description: "Action successful",
									duration: 10000,
								});
							}

							if (type === "key" && typeof status.value === "bigint") {
								const keyId = status.value;
								const settings = { ...ks?.settings, [keyId.toString()]: ks?.settings?.[TEMP_KEY] };
								delete settings[TEMP_KEY];
								setKeySettings({ settings })
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
					break;
				}

				case QueuedActionStatus.AwaitingBroadcast: {
					let res: boolean | undefined;

					try {
						if (item.networkType === "eth-raw") {
							res = await handleEthRaw({ action: item, w });
						} else if (item.networkType === "eth") {
							res = await handleEth({ action: item, w, queryClient });
						} else if (item.networkType === "cosmos") {
							const [, , rpcEndpoint] = clientsRef.current?.find((v) => v[1] === item?.chainName) ?? [];
							res = await handleCosmos({ address, action: item, w, queryClient, rpcEndpoint });
						}
					} catch (e) {
						console.error("broadcast failed", e);

						toast({
							title: "Failed",
							description: (e as Error)?.message ?? "Unexpected error",
							duration: 10000,
						});

						setData({
							[item.id]: {
								...item,
								status: QueuedActionStatus.Failed,
							},
						});
					}

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

					break;
				}

				default: {
					console.error("not implemented", item.status);
				}
			}
		}

		Promise.race([promise, waitForVisibility()])
			.then(processItem)
			.catch(err => {
				console.error(err);
			})


		return () => {
			cancel?.();

			if (timeout) {
				clearTimeout(timeout);
			}
		}
	}, [item.status, ready]);

	return (
		<div
			className={clsx("flex flex-col", {
				"mx-2 p-3 rounded-lg": !single,
			})}
		>
			<div className="flex items-center">
				{type === "key" ? <Assets.themeSelector className="w-8 h-5 mr-2" themeIndex={item.keyThemeIndex ?? 0} /> : null}
				<p className="text-lg font-semibold">{item.title ?? "Action"}</p>
			</div>

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
									? `Awaiting broadcast on ${capitalize(item.chainName)}`
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
							width: `${item.status === QueuedActionStatus.Success
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
		</div >
	);
}

export default function StatusSidebar() {
	const [hide, setHide] = useState(true);
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
					<Popover onOpenChange={open => {
						setHide(!open);
					}}>
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
							className={clsx("p-0", { hidden: hide })}
							forceMount={hide ? true : undefined}
						>
							<div className={"bg-fill-quaternary max-h-80 overflow-auto"}>
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
