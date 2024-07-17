import { useQueryHooks } from "@/hooks/useClient";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { cosmos } from "@wardenprotocol/wardenjs";
import { useQueries } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import {
	balancesQueryCosmos,
	balancesQueryEth,
	fiatPricesQuery,
} from "./queries";
import type { CosmosQueryClient } from "./types";
import { walletContext } from "@cosmos-kit/react-lite";

const COSMOS_CHAINS = ["osmosis"];

const DERIVE_ADDRESSES = [
	AddressType.ADDRESS_TYPE_ETHEREUM,
	AddressType.ADDRESS_TYPE_OSMOSIS,
];
export const useAssetQueries = (spaceId?: string | null) => {
	const { walletManager } = useContext(walletContext);
	const { isReady, useKeysBySpaceId } = useQueryHooks();
	const [clients, setClients] = useState<[CosmosQueryClient, string][]>([]);

	useEffect(() => {
		Promise.all(
			COSMOS_CHAINS.map((chainName) => {
				const repo = walletManager.getWalletRepo(chainName);
				repo.activate();

				return repo
					.getRpcEndpoint()
					.then((endpoint) =>
						cosmos.ClientFactory.createRPCQueryClient({
							rpcEndpoint: endpoint
								? typeof endpoint === "string"
									? endpoint
									: endpoint.url
								: `https://rpc.cosmos.directory/${chainName}`,
						}),
					)
					.then(
						(client) =>
							[client, chainName] as [CosmosQueryClient, string],
					);
			}),
		).then((clients) => {
			setClients(clients);
		});
	}, []);

	const queryKeys = useKeysBySpaceId({
		request: {
			spaceId: spaceId ? BigInt(spaceId) : BigInt(0),
			deriveAddresses: DERIVE_ADDRESSES,
		},
		options: {
			enabled: isReady && Boolean(spaceId),
		},
	});

	const queryBalancesEth = useQueries(
		balancesQueryEth(isReady, queryKeys.data?.keys),
	);

	const queryBalancesCosmos = useQueries(
		balancesQueryCosmos(isReady, queryKeys.data?.keys, clients),
	);

	const queryPrices = useQueries(fiatPricesQuery(isReady));

	return {
		queryKeys,
		queryBalances: [...queryBalancesEth, ...queryBalancesCosmos],
		queryPrices,
	};
};
