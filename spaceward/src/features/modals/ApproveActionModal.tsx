import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons as IconsAssets } from "@/components/ui/icons-assets";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { useTheme } from "next-themes";
import { approveRequest } from "../walletconnect/util";
import { useEthereumTx } from "@/hooks/useEthereumTx";
import SignRequestDialog from "@/components/SignRequestDialog";
import useRequestSignature from "@/hooks/useRequestSignature";
import { ModalParams } from "./types";
import { useModalState } from "./state";
import clsx from "clsx";

export default function ApproveModal({ hidden }: ModalParams<{}>) {
	const { w, sessionRequests, activeSessions } = useWeb3Wallet(
		"wss://relay.walletconnect.org",
	);

	const eth = useEthereumTx();
	const cosm = useRequestSignature();

	const [loading, setLoading] = useState(false);

	const { setData: setModal } = useModalState();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (sessionRequests.length > 0) {
			setOpen(true);
		}
	}, [sessionRequests]);
	const { resolvedTheme } = useTheme();

	return (
		<div className={clsx("max-w-[520px] w-[520px] pb-5", { hidden })}>
			<div className="flex flex-col gap-12">
				<p className="text-5xl font-display font-bold pb-2 tracking-[0.24px] text-center">
					Approve the action
				</p>

				<div className="flex flex-col space-y-2">
					{sessionRequests.map((req) => (
						<div
							key={req.id}
							className="grow p-4 border rounded-md"
						>
							<div>
								<div className="flex flex-row gap-2 justify-between">
									<div className="flex flex-row gap-4 items-center">
										<img
											className="w-10 h-10 stroke-current"
											onError={(e) => {
												const target =
													e.target as HTMLImageElement;
												target.src =
													resolvedTheme &&
													resolvedTheme === "light"
														? "/app-fallback.svg"
														: "/app-fallback-dark.svg";
												target.onerror = null;
											}}
											src={
												activeSessions
													.find(
														(s) =>
															s.topic ===
															req.topic,
													)
													?.peer.metadata.icons[0].startsWith(
														"http",
													)
													? activeSessions.find(
															(s) =>
																s.topic ===
																req.topic,
														)?.peer.metadata
															.icons[0]
													: `${activeSessions.find((s) => s.topic === req.topic)?.peer.metadata.url}${activeSessions.find((s) => s.topic === req.topic)?.peer.metadata.icons[0]}`
											}
										/>
										<div className="flex flex-col">
											<span className="text-sm">
												{req.params.request.method}
											</span>
											<span className="text-sm text-muted-foreground">
												{
													activeSessions.find(
														(s) =>
															s.topic ===
															req.topic,
													)?.peer.metadata.name
												}
											</span>
										</div>
									</div>
									<div>
										<Button
											disabled={!w || loading}
											size={"sm"}
											onClick={async () => {
												setLoading(true);
												try {
													await approveRequest({
														w,
														eth,
														cosm,
														req,
													});
												} finally {
													setLoading(false);
												}
											}}
										>
											{loading ? "Loading..." : "Approve"}
										</Button>
									</div>
								</div>
							</div>
							<SignRequestDialog
								state={cosm.state}
								error={cosm.error}
								reset={() => {
									cosm.reset();
									setOpen(false);
								}}
							/>
						</div>
					))}
				</div>

				<Button
					onClick={setModal.bind(null, {
						type: "walletconnect",
						params: undefined,
					})}
					className="flex items-center rounded-lg justify-center gap-2 h-[56px] font-semibold"
				>
					<IconsAssets.walletConnect />
					Connect New dApp
				</Button>
			</div>
		</div>
	);
}
