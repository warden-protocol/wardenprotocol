import { useEffect, useState } from "react";
import { Icons } from "@/components/ui/icons";
import { useWeb3Wallet } from "@/hooks/useWeb3Wallet";
import { useWebRTCTransport } from "@/hooks/useWebRTCTransport";
import WCPair from "./WCPair";
import WCBindSpace from "./WCBindSpace";
import { approveSession, rejectSession } from "../walletconnect/util";
import { useModalContext } from "@/context/modalContext";

/** @deprecated move export */
export const wcUriRegex = /^wc:[0-9a-f]+@.+/i;

export default function WalletConnectModal() {
	const { dispatch } = useModalContext();
	const [error, setError] = useState<Error>();
	const [loading, setLoading] = useState(false);
	const [uri, setUri] = useState("");

	const webRTC = useWebRTCTransport();

	const { w, sessionProposals, sessionRequests, activeSessions } =
		useWeb3Wallet("wss://relay.walletconnect.org");

	useEffect(() => {
		if (webRTC.data) {
			setUri(Buffer.from(webRTC.data).toString("utf-8"));
		}
	}, [webRTC.data]);

	useEffect(() => {
		(async () => {
			setError(undefined);

			if (uri) {
				try {
					if (!wcUriRegex.test(uri)) {
						throw new Error("Wrong URI format");
					}

					setLoading(true);
					await w?.pair({ uri });
					console.log("WalletConnect session paired");
				} catch (error) {
					setError(error as Error);
				} finally {
					setLoading(false);
				}
			}
		})();
	}, [uri]);

	return (
		<div className="max-w-[520px] w-[520px] pb-5">
			{webRTC.peers.length && !uri ? (
				<div className="flex items-center justify-between gap-2">
					<div>
						<p className="text-5xl font-display font-bold pb-2 tracking-[0.24px]">
							{webRTC.ready ? (
								<>
									Scan QR Code
									<br />
									on your mobile
								</>
							) : (
								"Enable camera"
							)}
						</p>
						<p>To connect dApp</p>
					</div>
				</div>
			) : sessionProposals.length ? (
				<WCBindSpace
					enabled={Boolean(w)}
					loading={loading}
					onApprove={async (proposal, spaceId, addresses) => {
						if (!w) {
							return;
						}

						try {
							setLoading(true);

							webRTC.sendMetadata(
								proposal.proposer.metadata.name,
								proposal.proposer.metadata.icons[0],
							);

							await approveSession(
								w,
								spaceId,
								proposal,
								addresses,
							);

							dispatch({ type: "type", payload: undefined });
						} catch (error) {
							console.error(error);
							setLoading(false);
						}
					}}
					onReject={async (proposal) => {
						if (!w) {
							return;
						}

						try {
							setLoading(true);
							await rejectSession(w, proposal.id);
							dispatch({ type: "type", payload: undefined });
						} catch (error) {
							console.error(error);
						}

						setLoading(false);
					}}
					proposal={sessionProposals[0]}
				/>
			) : loading ? (
				<div />
			) : (
				<>
					<div className="flex items-center justify-between gap-2">
						<div>
							<p className="text-5xl font-display font-bold pb-2 tracking-[0.24px]">
								Connect dApp
							</p>
							<p>
								Paste a paring code to connect a dApp to Space
							</p>
						</div>
						<Icons.walletconnect />
					</div>
					<WCPair
						assistantUrl={webRTC?.url}
						error={error}
						onWcUriChange={setUri}
						wcUri={uri}
					/>
				</>
			)}
		</div>
	);
}
