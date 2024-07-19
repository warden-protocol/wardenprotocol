import MobileReader from "@/features/walletconnect/MobileReader";
import ReaderAssistant from "@/features/walletconnect/ReaderAssistant";
import {
	decodeRemoteMessage,
	encodeRemoteMessage,
} from "@/features/walletconnect/util";
import useLibp2p from "@/hooks/useLibp2p";
import { multiaddr } from "@multiformats/multiaddr";
import { useCallback, useEffect, useRef, useState } from "react";

const MobileAssistant = ({
	base64MultiAddress,
	topic,
}: {
	base64MultiAddress: string;
	topic: string;
}) => {
	const ma = Buffer.from(base64MultiAddress, "base64").toString("utf-8");
	const [isReader, setIsReader] = useState(false);
	const { libp2p } = useLibp2p();
	const [peers, setPeers] = useState<string[]>([]);
	const connected = Boolean(peers.length);
	const prevConnected = useRef(connected);
	const [disconnected, setDisconnected] = useState(false);
	const [metadata, setMetadata] = useState<{ title: string; icon: string }>();

	useEffect(() => {
		let intervalId: number | undefined;

		function onPubsubMessage(e: {
			detail: { topic: string; data: Uint8Array };
		}) {
			if (e.detail.topic !== topic) {
				return;
			}

			const message = decodeRemoteMessage(e.detail.data);
			console.log("message", message);

			if (message.type === "metadata") {
				try {
					const { title, icon } = JSON.parse(
						message.payload as string,
					);

					setMetadata({ title, icon });
				} catch (e) {
					console.error(e);
				}
			}
		}

		async function initConnection() {
			if (!libp2p) {
				return;
			}

			libp2p.services.pubsub.addEventListener("message", onPubsubMessage);
			const connection = await libp2p.dial(multiaddr(ma));
			await libp2p.services.pubsub.subscribe(topic);

			intervalId = setInterval(() => {
				if (!libp2p) {
					return;
				}

				const peers = libp2p.services.pubsub.getSubscribers(topic);

				setPeers((p) => {
					const next = peers.map((p) => p.toString());

					// strict equal
					if (JSON.stringify(next) !== JSON.stringify(p)) {
						return next;
					}

					return p;
				});
			}, 1000) as any;

			return connection;
		}

		initConnection().catch(console.error);

		return () => {
			clearInterval(intervalId);

			libp2p?.services.pubsub.removeEventListener(
				"message",
				onPubsubMessage,
			);

			libp2p?.services.pubsub.unsubscribe(topic);
			setPeers([]);
		};
	}, [libp2p, ma, topic]);

	const dispatch = useCallback(
		(action: Parameters<typeof encodeRemoteMessage>[0]) => {
			if (!connected || !libp2p) {
				return;
			}

			libp2p.services.pubsub.publish(topic, encodeRemoteMessage(action));
		},
		[libp2p, topic, connected],
	);

	if (!connected && prevConnected.current && !disconnected) {
		setDisconnected(true);
	}

	useEffect(() => {
		prevConnected.current = connected;
	}, [connected])

	return (
		<div>
			{metadata ? (
				<div className="w-full h-svh flex flex-col gap-2 items-center place-content-center px-6">
					<img
						className="w-[52px] h-[52px]"
						src={metadata.icon}
						alt={metadata.title}
					/>
					<p className="text-xl font-bold">
						{metadata.title} connected
					</p>
				</div>
			) : disconnected ? (
				<div className="w-full h-svh flex flex-col gap-2 items-center place-content-center px-6">
					You disconnected from tab
					<p className="text-xl font-bold">
						Please scan the QR Code again
					</p>
				</div>
			) : isReader ? (
				<div className="w-full h-svh flex flex-col gap-2 items-center place-content-center px-6">
					<MobileReader
						hideQRScaner={() => setIsReader(false)}
						dispatch={dispatch}
					/>
				</div>
			) : (
				<ReaderAssistant
					showQR={() => {
						setIsReader(true);
					}}
					enabled={connected}
				/>
			)}
		</div>
	);
};

export default MobileAssistant;
