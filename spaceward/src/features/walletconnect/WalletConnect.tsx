import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import useRequestSignature from "@/hooks/useRequestSignature";
import SignRequestDialog from "@/components/SignRequestDialog";
import * as Popover from "@radix-ui/react-popover";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEthereumTx } from "@/hooks/useEthereumTx";
import { useModalContext } from "@/context/modalContext";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { approveRequest } from "./util";
import { Icons } from "@/components/ui/icons";

export function WalletConnect() {
	const [open, setOpen] = useState(false);
	const { resolvedTheme } = useTheme();
	const eth = useEthereumTx();
	const cosm = useRequestSignature();

	const { w, sessionRequests, activeSessions } = useWeb3Wallet(
		"wss://relay.walletconnect.org",
	);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (sessionRequests.length > 0) {
			setOpen(true);
		}
	}, [sessionRequests]);

	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { dispatch: modalDispatch } = useModalContext();

	return (
		<div>
			<Popover.Root
				modal={true}
				open={open}
				onOpenChange={() => setOpen(!open)}
			>
				{sessionRequests.length ? (
					<Popover.Trigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className={cn(
								"h-16 w-16 rounded-none border-0 hover:bg-transparent flex items-center place-content-center group",
								"animate-pulse",
							)}
						>
							<div className="m-2 w-12 h-12 rounded-full border-2 border-card overflow-clip p-0 flex items-center place-content-center group-hover:ring-2 ring-foreground">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className={cn(
										"h-[3rem]",
										sessionRequests.length > 0 &&
											"animate-bounce",
									)}
									focusable="false"
									aria-hidden="true"
								>
									<path
										d="M6.09442 8.34459C9.35599 5.21847 14.644 5.21847 17.9056 8.34459L18.2981 8.72082C18.4612 8.87713 18.4612 9.13055 18.2981 9.28686L16.9554 10.5739C16.8738 10.652 16.7416 10.652 16.6601 10.5739L16.1199 10.0561C13.8445 7.87528 10.1555 7.87528 7.88012 10.0561L7.30164 10.6106C7.2201 10.6887 7.0879 10.6887 7.00636 10.6106L5.66357 9.32358C5.50049 9.16727 5.50049 8.91385 5.66357 8.75754L6.09442 8.34459ZM20.6826 11.0063L21.8777 12.1517C22.0408 12.308 22.0408 12.5615 21.8777 12.7178L16.489 17.8828C16.3259 18.0391 16.0615 18.0391 15.8984 17.8828C15.8984 17.8828 15.8984 17.8828 15.8984 17.8828L12.0739 14.217C12.0331 14.1779 11.967 14.1779 11.9262 14.217C11.9262 14.217 11.9262 14.217 11.9262 14.217L8.10172 17.8828C7.93865 18.0391 7.67424 18.0391 7.51116 17.8828C7.51116 17.8828 7.51117 17.8828 7.51116 17.8828L2.12231 12.7177C1.95923 12.5614 1.95923 12.308 2.12231 12.1517L3.31739 11.0062C3.48047 10.8499 3.74487 10.8499 3.90795 11.0062L7.73258 14.672C7.77335 14.7111 7.83945 14.7111 7.88022 14.672C7.88022 14.672 7.88022 14.672 7.88022 14.672L11.7047 11.0062C11.8677 10.8499 12.1321 10.8499 12.2952 11.0062C12.2952 11.0062 12.2952 11.0062 12.2952 11.0062L16.1198 14.672C16.1606 14.7111 16.2267 14.7111 16.2675 14.672L20.0921 11.0063C20.2551 10.85 20.5195 10.85 20.6826 11.0063Z"
										fill="currentColor"
									></path>
								</svg>
							</div>
						</Button>
					</Popover.Trigger>
				) : (
					<Button
						variant="ghost"
						size="icon"
						className={cn(
							"h-16 w-16 rounded-none border-0 hover:bg-transparent flex items-center place-content-center group",
							sessionRequests.length > 0 && "animate-pulse",
						)}
						onClick={modalDispatch.bind(null, {
							type: "set",
							payload: {
								type: "walletconnect",
								params: undefined,
							},
						})}
					>
						<div className="m-2 w-12 h-12 rounded-full border-2 border-card overflow-clip p-0 flex items-center place-content-center group-hover:ring-2 ring-foreground">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className={cn(
									"h-[3rem]",
									sessionRequests.length > 0 &&
										"animate-bounce",
								)}
								focusable="false"
								aria-hidden="true"
							>
								<path
									d="M6.09442 8.34459C9.35599 5.21847 14.644 5.21847 17.9056 8.34459L18.2981 8.72082C18.4612 8.87713 18.4612 9.13055 18.2981 9.28686L16.9554 10.5739C16.8738 10.652 16.7416 10.652 16.6601 10.5739L16.1199 10.0561C13.8445 7.87528 10.1555 7.87528 7.88012 10.0561L7.30164 10.6106C7.2201 10.6887 7.0879 10.6887 7.00636 10.6106L5.66357 9.32358C5.50049 9.16727 5.50049 8.91385 5.66357 8.75754L6.09442 8.34459ZM20.6826 11.0063L21.8777 12.1517C22.0408 12.308 22.0408 12.5615 21.8777 12.7178L16.489 17.8828C16.3259 18.0391 16.0615 18.0391 15.8984 17.8828C15.8984 17.8828 15.8984 17.8828 15.8984 17.8828L12.0739 14.217C12.0331 14.1779 11.967 14.1779 11.9262 14.217C11.9262 14.217 11.9262 14.217 11.9262 14.217L8.10172 17.8828C7.93865 18.0391 7.67424 18.0391 7.51116 17.8828C7.51116 17.8828 7.51117 17.8828 7.51116 17.8828L2.12231 12.7177C1.95923 12.5614 1.95923 12.308 2.12231 12.1517L3.31739 11.0062C3.48047 10.8499 3.74487 10.8499 3.90795 11.0062L7.73258 14.672C7.77335 14.7111 7.83945 14.7111 7.88022 14.672C7.88022 14.672 7.88022 14.672 7.88022 14.672L11.7047 11.0062C11.8677 10.8499 12.1321 10.8499 12.2952 11.0062C12.2952 11.0062 12.2952 11.0062 12.2952 11.0062L16.1198 14.672C16.1606 14.7111 16.2267 14.7111 16.2675 14.672L20.0921 11.0063C20.2551 10.85 20.5195 10.85 20.6826 11.0063Z"
									fill="currentColor"
								></path>
							</svg>
						</div>
					</Button>
				)}
				<Popover.Portal>
					<Popover.Content
						side={isDesktop ? "left" : "bottom"}
						sideOffset={8}
						className="bg-transparent w-screen rounded-none h-screen overflow-scroll no-scrollbar"
					>
						<div
							className="inset-0 bg-card/40 backdrop-blur-md absolute"
							onClick={() =>
								sessionRequests.length === 0
									? setOpen(false)
									: null
							}
						></div>
						<div className="p-3 md:p-4 pt-0 flex flex-col space-y-4 w-[600px] max-w-full bg-card fixed h-[calc(100vh-16px)] rounded-xl top-2 right-0">
							<SignRequestDialog
								state={eth.state}
								error={eth.error}
								reset={() => {
									eth.reset();
									setOpen(false);
								}}
							/>
							<SignRequestDialog
								state={cosm.state}
								error={cosm.error}
								reset={() => {
									cosm.reset();
									setOpen(false);
								}}
							/>
							{sessionRequests.length > 0 ? (
								<div>
									<div className="flex flex-col space-y-2">
										<span className="font-bold">
											Incoming request
										</span>
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
																onError={(
																	e,
																) => {
																	const target =
																		e.target as HTMLImageElement;
																	target.src =
																		resolvedTheme &&
																		resolvedTheme ===
																			"light"
																			? "/app-fallback.svg"
																			: "/app-fallback-dark.svg";
																	target.onerror =
																		null;
																}}
																src={
																	activeSessions
																		.find(
																			(
																				s,
																			) =>
																				s.topic ===
																				req.topic,
																		)
																		?.peer.metadata.icons[0].startsWith(
																			"http",
																		)
																		? activeSessions.find(
																				(
																					s,
																				) =>
																					s.topic ===
																					req.topic,
																			)
																				?.peer
																				.metadata
																				.icons[0]
																		: `${activeSessions.find((s) => s.topic === req.topic)?.peer.metadata.url}${activeSessions.find((s) => s.topic === req.topic)?.peer.metadata.icons[0]}`
																}
															/>
															<div className="flex flex-col">
																<span className="text-sm">
																	{
																		req
																			.params
																			.request
																			.method
																	}
																</span>
																<span className="text-sm text-muted-foreground">
																	{
																		activeSessions.find(
																			(
																				s,
																			) =>
																				s.topic ===
																				req.topic,
																		)?.peer
																			.metadata
																			.name
																	}
																</span>
															</div>
														</div>
														<div>
															<Button
																disabled={
																	!w ||
																	loading
																}
																size={"sm"}
																onClick={async () => {
																	setLoading(
																		true,
																	);
																	try {
																		await approveRequest(
																			{
																				w,
																				eth,
																				cosm,
																				req,
																			},
																		);
																	} finally {
																		setLoading(
																			false,
																		);
																	}
																}}
															>
																{loading
																	? "Loading..."
																	: "Approve"}
															</Button>
														</div>
													</div>
												</div>
												<SignRequestDialog
													state={cosm.state}
													error={cosm.error}
													reset={cosm.reset}
												/>
											</div>
										))}
									</div>
								</div>
							) : (
								<></>
							)}
						</div>
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
			{isDesktop && activeSessions.length ? (
				<div className="flex flex-col flex-wrap bg-background rounded-xl mx-2 gap-2">
					{activeSessions.map((s) => (
						<div key={s.peer.publicKey}>
							<Link to={`/apps/open?url=${s.peer.metadata.url}`}>
								<div className="flex flex-row w-12 h-12 items-center place-content-center">
									<img
										className="w-6 h-6 stroke-current"
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
											s.peer.metadata.icons[0].startsWith(
												"http",
											)
												? s.peer.metadata.icons[0]
												: `${s.peer.metadata.url}${s.peer.metadata.icons[0]}`
										}
									/>
								</div>
							</Link>
						</div>
					))}
				</div>
			) : null}
			{activeSessions.length ? (
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						"h-16 w-16 rounded-none border-0 hover:bg-transparent flex items-center place-content-center group",
					)}
					onClick={modalDispatch.bind(null, {
						type: "set",
						payload: {
							type: "dapps-modal",
							params: undefined,
						},
					})}
				>
					<div className="m-2 w-12 h-12 rounded-full border-2 border-card overflow-clip p-0 flex items-center place-content-center group-hover:ring-2 ring-foreground">
						<Icons.wcSessionList />
					</div>
				</Button>
			) : null}
		</div>
	);
}
