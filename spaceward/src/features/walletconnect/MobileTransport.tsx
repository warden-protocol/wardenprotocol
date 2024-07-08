import { useEffect, useMemo, useReducer, useState } from "react";
import QRCode from "react-qr-code";
import { Multiaddr, multiaddr } from "@multiformats/multiaddr";
import useLibp2p from "@/hooks/useLibp2p";
import { commonReducer } from "@/utils/common";
import { RemoteState } from "./types";
import { decodeRemoteMessage } from "./util";

interface MobileTransportProps {
	onData?: (data: Uint8Array) => void;
}
export default function MobileTransport(props: MobileTransportProps) {
	const { libp2p, relayMultiaddrs } = useLibp2p();
	const [multiaddrs, setMultiaddrs] = useState<Multiaddr[]>();
	const [peers, setPeers] = useState<string[]>([]);
	const [remoteState, dispatch] = useReducer(commonReducer<RemoteState>, {});

	const topic = useMemo(
		() =>
			`wc-mobile-transport-topic-${Date.now()}-${Math.floor(Math.random() * 65535)}`,
		[],
	);

	useEffect(() => {
		if (remoteState.data) {
			props.onData?.(remoteState.data);
		}
	}, [remoteState.data, props.onData]);

	useEffect(() => {
		let intervalId: number | undefined;

		function onSelfPeerUpdate() {
			if (!libp2p) {
				throw new Error("libp2p is not initialized");
			}

			const multiaddrs = libp2p.getMultiaddrs();
			setMultiaddrs(multiaddrs);
		}

		function onPubsubMessage(e: {
			detail: { topic: string; data: Uint8Array };
		}) {
			if (e.detail.topic !== topic) {
				return;
			}

			dispatch(decodeRemoteMessage(e.detail.data));
		}

		(async () => {
			if (!libp2p || !relayMultiaddrs?.length) {
				return;
			}

			libp2p.addEventListener("self:peer:update", onSelfPeerUpdate);
			libp2p.services.pubsub.addEventListener("message", onPubsubMessage);

			await libp2p.dial(multiaddr(relayMultiaddrs[0]));
			await libp2p.services.pubsub.subscribe(topic);

			intervalId = setInterval(() => {
				if (!libp2p) {
					return;
				}

				const peers = libp2p.services.pubsub.getSubscribers(topic);

				if (!peers.length) {
					dispatch({
						type: "set",
						payload: { ready: undefined, data: undefined },
					});
				}

				setPeers((p) => {
					const next = peers.map((p) => p.toString());

					// strict equal
					if (JSON.stringify(next) !== JSON.stringify(p)) {
						return next;
					}

					return p;
				});
			}, 1000) as any;
		})().catch(console.error);

		return () => {
			clearInterval(intervalId);
			libp2p?.services.pubsub.unsubscribe(topic);
			libp2p?.removeEventListener("self:peer:update", onSelfPeerUpdate);

			libp2p?.services.pubsub.removeEventListener(
				"message",
				onPubsubMessage,
			);
		};
	}, [libp2p, relayMultiaddrs]);

	// fixme select correct multiaddr or try all
	const ma = multiaddrs
		?.filter((ma) => !ma.toString().includes("127.0.0.1"))[0]
		.toString();

	const openUrl = ma
		? `${
				// fixme no window location
				window.location.origin
			}/?ma=${Buffer.from(ma.toString()).toString(
				"base64",
			)}&topic=${topic}`
		: undefined;

	return (
		<div className="w-full flex flex-col justify-center items-center m-4">
			{openUrl ? (
				peers.length ? (
					remoteState.ready ? (
						<p>Scan pairing QR on device</p>
					) : (
						<p>Please enable camera on device</p>
					)
				) : (
					<>
						<p className="mt-8 mb-4 text-sm">
							Scan QR code by mobile device or use this{" "}
							<a href={openUrl}>link</a>
						</p>
						<div className="p-4 bg-white">
							<QRCode value={openUrl} />
						</div>
					</>
				)
			) : (
				"Loading..."
			)}
		</div>
	);
}
