import { walletContext } from "@cosmos-kit/react-lite";
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
import { AddressType, useKeysBySpaceId } from "@/hooks/query/warden";
import { KeyModel } from "@/hooks/query/types";
import { useConnectWallet } from "@web3-onboard/react";
const DERIVE_ADDRESSES = [AddressType.Ethereum, AddressType.Osmosis];

export const useAssetQueries = (spaceId?: string | null) => {
	const [{ wallet }] = useConnectWallet();
	const evmAddress = wallet?.accounts?.[0]?.address;
	const { walletManager } = useContext(walletContext);
	const { isReady, slinky } = useQueryHooks();
	const clients = useQuery({ ...(evmAddress ? queryCosmosClients(walletManager, evmAddress) : {}), enabled: Boolean(evmAddress) }).data;

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

	const keys = queryKeys.data?.[0] as KeyModel[] | undefined;

	const queryBalancesEth = useQueries(
		balancesQueryEth(isReady && Boolean(priceMap), evmAddress ?? "0x", keys, priceMap),
	);

	const queryBalancesCosmos = useQueries(
		balancesQueryCosmos(
			isReady && Boolean(priceMap),
			keys,
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
