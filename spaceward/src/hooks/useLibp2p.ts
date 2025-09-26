import { env } from "@/env";
import { gossipsub } from "@chainsafe/libp2p-gossipsub";
import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { circuitRelayTransport } from "@libp2p/circuit-relay-v2";
import { dcutr } from "@libp2p/dcutr";
import { identify, type Identify } from "@libp2p/identify";
import { webRTC } from "@libp2p/webrtc";
import { webSockets } from "@libp2p/websockets";
import * as filters from "@libp2p/websockets/filters";
import { useQuery } from "@tanstack/react-query";
import { createLibp2p, type Libp2p } from "libp2p";

let libp2p:
	| Libp2p<{
			identify: Identify;
			pubsub: ReturnType<ReturnType<typeof gossipsub>>;
			dcutr: unknown;
	  }>
	| undefined;

async function getLibp2p() {
	if (libp2p) {
		return libp2p;
	}

	libp2p = await createLibp2p({
		addresses: {
			listen: [
				// create listeners for incoming WebRTC connection attempts on all
				// available Circuit Relay connections
				"/webrtc",
			],
		},
		transports: [
			// the WebSocket transport lets us dial a local relay
			webSockets({
				// this allows non-secure WebSocket connections for purposes of the demo
				filter: filters.all,
			}),
			// support dialing/listening on WebRTC addresses
			webRTC(),
			// support dialing/listening on Circuit Relay addresses
			circuitRelayTransport({
				// make a reservation on any discovered relays - this will let other
				// peers use the relay to contact us
				discoverRelays: 1,
			}),
		],
		// a connection encrypter is necessary to dial the relay
		connectionEncryption: [noise()],
		// a stream muxer is necessary to dial the relay
		streamMuxers: [yamux()],
		connectionGater: {
			denyDialMultiaddr: () => {
				// by default we refuse to dial local addresses from browsers since they
				// are usually sent by remote peers broadcasting undialable multiaddrs and
				// cause errors to appear in the console but in this example we are
				// explicitly connecting to a local node so allow all addresses
				return false;
			},
		},
		services: {
			identify: identify(),
			pubsub: gossipsub(),
			dcutr: dcutr(),
		},
		connectionManager: {
			minConnections: 0,
		},
	});

	return libp2p;
}

export default function useLibp2p() {
	const libp2pQuery = useQuery({
		queryKey: ["libp2p"],
		queryFn: getLibp2p,
		refetchInterval: Infinity,
		staleTime: Infinity,
	});

	const hostname: string | undefined = env.p2pRelayURL.split("/")[2];

	const relayInfoQuery = useQuery({
		queryKey: ["relay-multiaddr"],
		queryFn: async () => {
			const response = await fetch(env.p2pRelayURL);

			const json: {
				peerId?: string
			} = await response.json();

			return json.peerId;
		},
		refetchInterval: Infinity,
		staleTime: Infinity,
	});

	return {
		libp2p: libp2pQuery.data,
		peerId: relayInfoQuery.data,
		hostname
	};
}
