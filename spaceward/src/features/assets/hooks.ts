import { walletContext } from "@cosmos-kit/react-lite";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { useQueryHooks } from "@/hooks/useClient";
import {
	balancesQueryCosmos,
	balancesQueryEth,
	fiatPricesQuery,
	queryCosmosClients,
} from "./queries";
import type { PriceMapSlinky } from "./types";

const DERIVE_ADDRESSES = [
	AddressType.ADDRESS_TYPE_ETHEREUM,
	AddressType.ADDRESS_TYPE_OSMOSIS,
];

export const useAssetQueries = (spaceId?: string | null) => {
	const { walletManager } = useContext(walletContext);
	const { isReady, useKeysBySpaceId, slinky } = useQueryHooks();
	const clients = useQuery(queryCosmosClients(walletManager)).data;

	const pairs = slinky.oracle.v1.useGetAllCurrencyPairs({
		options: { enabled: isReady, refetchInterval: Infinity },
		request: {},
	});

	const currencyPairs = useMemo(
		() =>
			pairs.data?.currencyPairs.map(({ base: Base, quote: Quote }) => ({
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
			}, {} as PriceMapSlinky) ??
			// fixme slinky not working
			{};

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
		balancesQueryEth(
			isReady && Boolean(priceMap),
			queryKeys.data?.keys,
			priceMap,
		),
	);

	const queryBalancesCosmos = useQueries(
		balancesQueryCosmos(
			isReady && Boolean(priceMap),
			queryKeys.data?.keys,
			clients,
			priceMap,
		),
	);

	const queryPrices = useQueries(fiatPricesQuery(isReady));

	return {
		queryKeys,
		queryBalances: [...queryBalancesEth, ...queryBalancesCosmos],
		queryPrices,
	};
};
