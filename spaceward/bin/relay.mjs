import { noise } from "@chainsafe/libp2p-noise";
import { yamux } from "@chainsafe/libp2p-yamux";
import { circuitRelayServer } from "@libp2p/circuit-relay-v2";
import { identify } from "@libp2p/identify";
import { webSockets } from "@libp2p/websockets";
import * as filters from "@libp2p/websockets/filters";
import { createLibp2p } from "libp2p";
import { accessSync, readFileSync } from "node:fs";

const port = process.env.RELAY_LISTEN_PORT ?? 3339;
const keyFile = process.env.KEY_FILE;
const certFile = process.env.CERT_FILE;
let ssl = false;
let peerId;

try {
	accessSync(keyFile);
	accessSync(certFile);
	ssl = true;
} catch {
	console.error("No SSL key/cert provided, running in insecure mode");
}

const module = ssl ? import("https") : import("http");

const { key, cert } = ssl
	? {
			key: readFileSync(keyFile),
			cert: readFileSync(certFile),
		}
	: { key: undefined, cert: undefined };

const handler = (req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	});

	if (!peerId) {
		res.statusCode = 500;
		res.end(JSON.stringify({ error: "No peerId" }));
	}

	res.end(
		JSON.stringify({
			peerId,
		}),
	);
};

module
	.then(async (srv) => {
		const server = ssl
			? srv.createServer({ key, cert }, handler)
			: srv.createServer(handler);

		const node = await createLibp2p({
			addresses: {
				// todo use dnsaddr
				// https://github.com/multiformats/multiaddr/blob/master/protocols/DNSADDR.md
				listen: [`/ip4/0.0.0.0/tcp/${port}/${ssl ? "wss" : "ws"}`],
			},
			transports: [
				webSockets({
					filter: filters.all,
					server,
				}),
			],
			connectionEncryption: [noise()],
			streamMuxers: [yamux()],
			services: {
				identify: identify(),
				relay: circuitRelayServer({
					reservations: {
						maxReservations: Infinity,
					},
				}),
			},
			connectionManager: {
				minConnections: 0,
			},
		});

		peerId = node.peerId.toString();
		console.log(`Listening on :${port}, peerId=${peerId}` );
	})
	.catch(console.error);
