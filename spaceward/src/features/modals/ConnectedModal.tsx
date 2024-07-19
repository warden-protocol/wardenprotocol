import { Button } from "@/components/ui/button";
import { Icons as IconsAssets } from "@/components/ui/icons-assets";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { useModalContext } from "@/context/modalContext";
import { SessionTypes } from "@walletconnect/types";

export default function ConnectedModal() {
	const { w, activeSessions } = useWeb3Wallet(
		"wss://relay.walletconnect.org",
	);

	const { dispatch: modalDispatch } = useModalContext();

	const sessionsByApp = activeSessions.reduce<
		Record<string, SessionTypes.Struct[]>
	>((acc, s) => {
		const next = { ...acc };
		const url = s.peer.metadata.url;

		if (!next[url]) {
			next[url] = [s];
		} else {
			next[url] = [...next[url], s];
		}

		return next;
	}, {});

	return (
		<div className="max-w-[520px] w-[520px] pb-5">
			<div className="flex flex-col gap-12">
				<p className="text-5xl font-display font-bold pb-2 tracking-[0.24px] text-center">
					Connected dApps
				</p>

				{Object.entries(sessionsByApp).map(([url, sessions]) => {
					const [s] = sessions;

					return (
						<div key={url}>
							<div className="bg-fill-quaternary p-6 rounded-xl w-full flex flex-col gap-6">
								<a
									href={s.peer.metadata.url}
									className="flex gap-3 items-center"
									target="_blank"
								>
									<img
										className="w-10 h-10 stroke-current shrink-0 rounded-[10px]"
										src={
											s.peer.metadata.icons[0].startsWith(
												"http",
											)
												? s.peer.metadata.icons[0]
												: `${s.peer.metadata.url}${s.peer.metadata.icons[0]}`
										}
									/>

									<div>
										<div className="text-xl	font-bold">
											{s.peer.metadata.name}
										</div>
										<div className="text-label-secondary">
											{s.peer.metadata.url.replace(
												"https://",
												"",
											)}
										</div>
									</div>

									<IconsAssets.chevronRight className="ml-auto" />
								</a>

								{sessions.map((s) => (
									<div className="flex gap-3 items-center" key={s.topic}>
										<img
											src="/images/somewallet.png"
											className="w-10 h-10 object-contain shrink-0"
											alt=""
										/>

										<div>
											Space #
											{localStorage.getItem(
												`WALLETCONNECT_SESSION_WS_${s.topic}`,
											) || ""}
										</div>

										<button
											disabled={!w}
											onClick={async () => {
												await w!.disconnectSession({
													topic: s.topic,
													reason: {
														code: 1,
														message:
															"user disconnected",
													},
												});
											}}
											className="ml-auto rounded bg-fill-quaternary backdrop-blur-[20px] h-8 py-1 px-4 flex items-center justify-center w-fit font-semibold text-base duration-300 hover:bg-fill-accent-secondary"
										>
											Disconnect
										</button>
									</div>
								))}
							</div>
						</div>
					);
				})}

				<Button
					onClick={modalDispatch.bind(null, {
						type: "set",
						payload: {
							type: "walletconnect",
							params: undefined,
						},
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
