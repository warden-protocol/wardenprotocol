import { useQueryHooks } from "@/hooks/useClient";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { cosmos } from "@wardenprotocol/wardenjs";
import { useQueries } from "@tanstack/react-query";
import { /* useContext, */ useEffect, useMemo, useState } from "react";
import {
	balancesQueryCosmos,
	balancesQueryEth,
	fiatPricesQuery,
} from "./queries";
import type { CosmosQueryClient, PriceMapSlinky } from "./types";
// import { walletContext } from "@cosmos-kit/react-lite";

/** @deprecated move somewhere else */
export const COSMOS_CHAINS: {
	chainName: string;
	feeAmount: string;
	rpc: string;
}[] = [
	{
		chainName: "cosmoshubtestnet",
		feeAmount: "1000",
		rpc: "https://rpc.sentry-01.theta-testnet.polypore.xyz",
	},
	{
		chainName: /*"osmosis",*/ "osmosistestnet",
		feeAmount: "1500",
		rpc: "https://rpc.testnet.osmosis.zone",
	},
];

const DERIVE_ADDRESSES = [
	AddressType.ADDRESS_TYPE_ETHEREUM,
	AddressType.ADDRESS_TYPE_OSMOSIS,
];
export const useAssetQueries = (spaceId?: string | null) => {
	// const { walletManager } = useContext(walletContext);
	const { isReady, useKeysBySpaceId, slinky } = useQueryHooks();
	const [clients, setClients] = useState<[CosmosQueryClient, string][]>([]);

	const pairs = slinky.oracle.v1.useGetAllCurrencyPairs({
		options: { enabled: isReady, refetchInterval: Infinity },
		request: {},
	});

	const currencyPairs = useMemo(
		() =>
			pairs.data?.currencyPairs.map(({ Base, Quote }) => ({
				id: `${Base}/${Quote}`,
				token: Base,
			})) ?? [],
		[pairs.data],
	);

	const prices = slinky.oracle.v1.useGetPrices({
		options: {
			enabled: isReady && Boolean(currencyPairs.length),
		},
		request: {
			currencyPairIds: currencyPairs.map(({ id }) => id) ?? [],
		},
	});

	const priceMap = useMemo(() => {
		const priceMap =
			prices.data?.prices.reduce((acc, price, i) => {
				const pair = currencyPairs[i];

				if (!pair) {
					return acc;
				}

				return {
					...acc,
					// assume all quotes are in USD
					[pair.token]: {
						...price,
						ticker: pair.id,
						token: pair.token,
					},
				};
			}, {} as PriceMapSlinky);

		if (!priceMap) {
			return;
		}

		// fixme weth
		if (priceMap["ETH"]) {
			priceMap["WETH"] = {
				...priceMap["ETH"],
				token: "WETH",
				ticker: "WETH/USD",
			};
		}

		return priceMap;
	}, [prices.data, currencyPairs]);

	useEffect(() => {
		Promise.all(
			COSMOS_CHAINS.map(({ chainName, rpc }) => {
				// fixme use walletRepo(works okay with mainnets but not testnets) along with hardcoded values

				/*const repo = walletManager.getWalletRepo(chainName);
				repo.activate();

				*/ return /* repo.getRpcEndpoint().then((endpoint) =>*/ cosmos.ClientFactory.createRPCQueryClient(
					// fixme revert back to waleltRepo
					{
						rpcEndpoint: /*endpoint
								? typeof endpoint === "string"
									? endpoint
									: endpoint.url
								: `https://rpc.cosmos.directory/${chainName}`*/ rpc,
					},
				) /*,
					)*/
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
		balancesQueryEth(isReady && Boolean(priceMap), queryKeys.data?.keys, priceMap),
	);

	const queryBalancesCosmos = useQueries(
		balancesQueryCosmos(isReady && Boolean(priceMap), queryKeys.data?.keys, clients, priceMap),
	);

	const queryPrices = useQueries(fiatPricesQuery(isReady));

	return {
		queryKeys,
		queryBalances: [...queryBalancesEth, ...queryBalancesCosmos],
		queryPrices,
	};
};
