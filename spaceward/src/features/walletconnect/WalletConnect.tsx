import { Link } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { Icons } from "@/components/ui/icons";
import { useModalState } from "../modals/state";
import { useEffect, useRef } from "react";

export function WalletConnect() {
	const { resolvedTheme } = useTheme();

	const { sessionRequests, activeSessions } = useWeb3Wallet(
		"wss://relay.walletconnect.org",
	);

	const reqCount = sessionRequests.length;
	const prevRC = useRef(reqCount);

	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { data: modal, setData: setModal } = useModalState();

	if (
		reqCount &&
		!prevRC.current &&
		(modal?.type !== "approve-action" ||
			!modal.background["approve-action"])
	) {
		setModal({ type: "approve-action", params: {} });
	}

	useEffect(() => {
		prevRC.current = reqCount;
	}, [sessionRequests.length]);

	return (
		<div>
			<Button
				variant="ghost"
				size="icon"
				className={cn(
					"h-16 w-16 rounded-none border-0 hover:bg-transparent flex items-center place-content-center group",
					sessionRequests.length > 0 && "animate-pulse",
				)}
				onClick={setModal.bind(null, {
					type: sessionRequests.length
						? "approve-action"
						: "walletconnect",
					params: undefined,
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
							sessionRequests.length > 0 && "animate-bounce",
						)}
					>
						<g id="icon/connect dapp">
							<path
								id="Union"
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M5.5 4C4.11929 4 3 5.11929 3 6.5V17.5C3 18.8807 4.11929 20 5.5 20H14.5C14.7761 20 15 19.7761 15 19.5C15 19.2239 14.7761 19 14.5 19H5.5C4.67157 19 4 18.3284 4 17.5V9H20V13.5C20 13.7761 20.2239 14 20.5 14C20.7761 14 21 13.7761 21 13.5V6.5C21 5.11929 19.8807 4 18.5 4H5.5ZM4 6.5C4 5.67157 4.67157 5 5.5 5H7V8H4V6.5ZM8 5H11V8H8V5ZM12 8H20V6.5C20 5.67157 19.3284 5 18.5 5H12V8ZM21 16.5C21 16.2239 20.7761 16 20.5 16C20.2239 16 20 16.2239 20 16.5V19H17.5C17.2239 19 17 19.2239 17 19.5C17 19.7761 17.2239 20 17.5 20H20V22.5C20 22.7761 20.2239 23 20.5 23C20.7761 23 21 22.7761 21 22.5V20H23.5C23.7761 20 24 19.7761 24 19.5C24 19.2239 23.7761 19 23.5 19H21V16.5Z"
								fill="currentColor"
							/>
						</g>
					</svg>
				</div>
			</Button>

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
					onClick={setModal.bind(null, {
						type: "dapps-modal",
						params: undefined,
					})}
				>
					<div className="m-2 w-12 h-12 rounded-full border-2 border-card overflow-clip p-0 flex items-center place-content-center group-hover:ring-2 ring-foreground">
						<Icons.wcSessionList className="invert dark:invert-0" />
					</div>
				</Button>
			) : null}
		</div>
	);
}
