import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { useTheme } from "next-themes";
import { approveRequest } from "../walletconnect/util";
import { useEthereumTx } from "@/hooks/useEthereumTx";
import { useKeychainSigner } from "@/hooks/useKeychainSigner";
import { Assets } from "@/features/walletconnect/assets";
import { ModalParams } from "./types";
import { useModalState } from "./state";
import clsx from "clsx";
import { usePublicClient } from "wagmi";
import { env } from "@/env";
import { useConnectWallet } from "@web3-onboard/react";

export default function ApproveModal({ hidden }: ModalParams<{}>) {
	const [{ wallet }] = useConnectWallet();
	const address = wallet?.accounts?.[0]?.address;
	const { w, sessionRequests, activeSessions } = useWeb3Wallet(
		env.wcWalletRelayUrl,
	);

	const eth = useEthereumTx();
	const cosm = useKeychainSigner();
	const [loading, setLoading] = useState(false);
	const { setData: setModal } = useModalState();
	const { resolvedTheme } = useTheme();
	const [request /*, ...awaitingRequests*/] = sessionRequests;
	const session = activeSessions.find((s) => s.topic === request?.topic);
	const client = usePublicClient();

	if (!request) {
		setModal({ type: undefined, params: undefined });
		return null;
	}

	return (
		<div className={clsx("max-w-[520px] w-[520px] pb-5", { hidden })}>
			<div className="flex flex-col gap-12">
				<div className="rounded-full mx-auto relative bg-white w-[100px] h-[100px] flex items-center justify-center">
					<img
						className="w-[52px] h-[52px] stroke-current"
						onError={(e) => {
							const target = e.target as HTMLImageElement;
							target.src =
								resolvedTheme && resolvedTheme === "light"
									? "/app-fallback.svg"
									: "/app-fallback-dark.svg";
							target.onerror = null;
						}}
						src={
							session?.peer.metadata.icons[0]?.startsWith("http")
								? session?.peer.metadata.icons[0]
								: `${session?.peer.metadata.url}${session?.peer.metadata.icons[0]}`
						}
					/>

					<div className="rounded-full absolute -right-3 -bottom-3 w-9 h-9 bg-fill-quaternary flex items-center justify-center">
						<Assets.approveDoc />
					</div>
				</div>

				<div>
					<div className="text-5xl font-display mb-6 font-bold tracking-[0.24px] text-center">
						Approve the action
					</div>

					<div className="text-center">
						{session?.peer.metadata.name} is going to execute the
						transaction
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<Button
						disabled={!w || loading}
						onClick={async () => {
							if (!address) {
								return;
							}

							let req = sessionRequests[0];
							setLoading(true);

							try {
								const close = await approveRequest({
									address,
									w,
									eth,
									cosm,
									req,
									client,
								});

								if (close) {
									setModal({
										type: undefined,
										params: undefined,
									});
								}
							} finally {
								setLoading(false);
							}
						}}
						className="flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold"
					>
						{loading ? "Loading..." : "Approve"}
					</Button>

					<Button
						disabled={!w || loading}
						onClick={() => {
							if (!request || !w || loading) {
								return;
							}

							w.respondSessionRequest({
								topic: request.topic,
								response: {
									jsonrpc: "2.0",
									id: request.id,
									error: {
										code: 1,
										message: "User rejected request",
									},
								},
							});
						}}
						className="w-full flex items-center justify-center transition-colors focus-visible:outline-none hover:bg-accent hover:text-background rounded-lg h-[56px] bg-fill-quaternary text-display font-semibold shrink-0 "
					>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
}
