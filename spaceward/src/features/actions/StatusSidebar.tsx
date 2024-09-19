import clsx from "clsx";
import { useContext, useEffect } from "react";
import { isDeliverTxSuccess } from "@cosmjs/stargate";
import { useChain, walletContext } from "@cosmos-kit/react-lite";
import { cosmos, warden } from "@wardenprotocol/wardenjs";
import { Action, ActionStatus } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";
import { useToast } from "@/components/ui/use-toast";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { env } from "@/env";
import { getClient, getSigningClient } from "@/hooks/useClient";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import "./animate.css";
import { QueuedAction, QueuedActionStatus, useActionsState } from "./hooks";
import { getActionHandler, GetStatus, handleCosmos, handleEth, handleEthRaw } from "./util";
import { TEMP_KEY, useKeySettingsState } from "../keys/state";
import Assets from "../keys/assets";
import { useQueryClient } from "@tanstack/react-query";

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
	const queryClient = useQueryClient();
	const { walletManager } = useContext(walletContext);
	const { data: ks, setData: setKeySettings } = useKeySettingsState();
	const { toast } = useToast()
	const { w } = useWeb3Wallet("wss://relay.walletconnect.org");
	const { setData } = useActionsState();

	const { getOfflineSignerDirect: getOfflineSigner } = useChain(
		env.cosmoskitChainName,
	);

	const type = typeof item.keyThemeIndex !== "undefined" ?
		"key" : (["walletConnectRequestId", "walletConnectTopic"] as const).every(key => typeof item[key] !== "undefined") ?
			"wc" : typeof item.snapRequestId ?
				"snap" : undefined

	useEffect(() => {
		let canceled = false;
		let cancel: () => void;
		let timeout: number | undefined;

		const promise = new Promise<void>((_, reject) => {
			cancel = () => {
				canceled = true;
				reject(new Error("cancelled"));
			}
		})

		async function processItem() {
			if (canceled) {
				return;
			}

			switch (item.status) {
				case QueuedActionStatus.Signed: {
					const signer = getOfflineSigner();
					const client = await getSigningClient(signer);
					const txRaw = cosmos.tx.v1beta1.TxRaw.encode(item.txRaw);
					const res = await client.broadcastTx(Uint8Array.from(txRaw.finish()));

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

					break;
				}

				case QueuedActionStatus.Broadcast: {
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

					break;
				}

				case QueuedActionStatus.AwaitingApprovals: {
					async function checkAction() {
						if (canceled || !item.actionId) {
							return;
						}

						const client = await getClient();
						let action: Action | undefined;

						try {
							const res = await client.warden.act.v1beta1.actionById({
								id: item.actionId,
							});

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
					let getStatus: GetStatus | undefined;

					try {
						getStatus = getActionHandler(item).getStatus;
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
							res = await handleCosmos({ action: item, w, walletManager, queryClient });
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
	}, [item.status]);

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
