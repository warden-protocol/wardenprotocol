import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Multiaddr, multiaddr } from "@multiformats/multiaddr";
import useLibp2p from "@/hooks/useLibp2p";
import { commonReducer } from "@/utils/common";
import { RemoteState } from "@/features/walletconnect/types";
import {
	decodeRemoteMessage,
	encodeRemoteMessage,
} from "@/features/walletconnect/util";

export const useWebRTCTransport = () => {
	const { libp2p, peerId, hostname } = useLibp2p();
	const [host, port] = hostname?.split(":") ?? [];
	const [multiaddrs, setMultiaddrs] = useState<Multiaddr[]>();
	const [peers, setPeers] = useState<string[]>([]);
	const [remoteState, dispatch] = useReducer(commonReducer<RemoteState>, {});

	const topic = useMemo(
		() =>
			`wc-mobile-transport-topic-${Date.now()}-${Math.floor(Math.random() * 65535)}`,
		[],
	);

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
			if (!libp2p || !peerId || !host) {
				return;
			}

			libp2p.addEventListener("self:peer:update", onSelfPeerUpdate);
			libp2p.services.pubsub.addEventListener("message", onPubsubMessage);
			const connections = libp2p.getConnections();
			const multiaddrs = libp2p.getMultiaddrs();

			if (multiaddrs.length) {
				setMultiaddrs(multiaddrs);
			}

			if (!connections.find((c) => c.remotePeer.toString() === peerId)) {
				await libp2p.dial(
					multiaddr(`/dns4/${host}/tcp/${port}/wss/p2p/${peerId}`),
				);
			}

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
	}, [libp2p, peerId, host, port]);

	const ma = multiaddrs
		?.filter((ma) => ma.toString().includes(host))[0]
		.toString();

	const url = ma
		? `${
				// fixme no window location
				window.location.origin
			}/?ma=${Buffer.from(ma.toString()).toString(
				"base64",
			)}&topic=${topic}`
		: undefined;

	const sendMetadata = useCallback(
		function sendMetadata(title: string, icon: string) {
			libp2p?.services.pubsub.publish(
				topic,
				encodeRemoteMessage({
					type: "metadata",
					payload: JSON.stringify({ title, icon }),
				}),
			);
		},
		[libp2p, topic],
	);

	return {
		url,
		peers,
		sendMetadata,
		...remoteState,
	};
};
