import type { ExtendedHttpEndpoint } from "@cosmos-kit/core";
import { useChain } from "@cosmos-kit/react-lite";
import { useQuery } from "@tanstack/react-query";
import { cosmos } from "@wardenprotocol/wardenjs";
import { useEffect, useState } from "react";
import { CosmosQueryClient } from "./types";
import { cosmosBalancesQuery } from "./queries";

interface HandlerProps {}

function ChainProvider({ chainName }: { chainName: string }) {
	const { getRpcEndpoint } = useChain(chainName);
	const [client, setClient] = useState<CosmosQueryClient>();
	const [rpc, setRpc] = useState<string>();

	const query = useQuery(
		cosmosBalancesQuery({
			address: "osmo10wpr6aftr80y73utlmk2vucxxj4m3v3sk8ck76",
			enabled: Boolean(client),
			chainName,
			client,
		}),
	);

	console.log(query.data);

	useEffect(() => {
		async function initRpc() {
			let endpoint = await getRpcEndpoint();

			if (!endpoint) {
				console.info("no rpc endpoint — using a fallback");
				endpoint = `https://rpc.cosmos.directory/${chainName}`;
			}

			setRpc(
				typeof endpoint === "string"
					? endpoint
					: (endpoint as ExtendedHttpEndpoint).url,
			);
		}

		initRpc();
	}, [getRpcEndpoint]);

	useEffect(() => {
		async function initClient() {
			if (!rpc) {
				return;
			}

			setClient(
				await cosmos.ClientFactory.createRPCQueryClient({
					rpcEndpoint: rpc,
				}),
			);
		}

		initClient();
	}, [rpc]);

	return null;
}

const CHAINS = ["osmosis"];

/** @deprecated move this logic upper */
export default function CosmosAssetHandler(props: HandlerProps) {
	return CHAINS.map((chainName) => (
		<ChainProvider chainName={chainName} key={chainName} />
	));
}
