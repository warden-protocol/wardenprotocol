import { assets, chains } from "chain-registry";
import { fromBech32, toBech32 } from "@cosmjs/encoding";
import type { ExtendedHttpEndpoint, WalletManager } from "@cosmos-kit/core";
import { cosmos } from "@wardenprotocol/wardenjs";
import erc20Abi from "@/contracts/eip155/erc20Abi";
import aggregatorV3InterfaceABI from "@/contracts/eip155/priceFeedAbi";
import {
	COSMOS_PRICES,
	ERC20_TOKENS,
	getEnabledCosmosChains,
	getEnabledEthChains,
} from "@/config/tokens";
import { getProvider } from "@/lib/eth";
import { BalanceEntry, CosmosQueryClient, PriceMapSlinky } from "./types";
import { getCosmosChain } from "./util";
import { getContract, isAddress } from "viem";
import { KeyModel } from "@/hooks/query/types";
import { AddressType } from "@/hooks/query/warden";

type ChainName = Parameters<typeof getProvider>[0];

const assetsByChain: Record<string, (typeof assets)[number] | undefined> = {};
const chainByName: Record<string, (typeof chains)[number] | undefined> = {};

const getChainAssets = (chainName: string) => {
	if (chainName in assetsByChain) {
		return assetsByChain[chainName];
	}

	const chainAssets = assets.find((x) => x.chain_name === chainName);
	assetsByChain[chainName] = chainAssets;
	return chainAssets;
};

type UA<T> = T extends (infer U)[] ? U : T;
type AssetList = NonNullable<ReturnType<typeof getChainAssets>>;
const assetIndex: Record<
	string,
	Record<string, UA<AssetList["assets"]> | undefined>
> = {};

const getAsset = (chainAssets: AssetList, denom: string) => {
	if (!assetIndex[chainAssets.chain_name]) {
		assetIndex[chainAssets.chain_name] = {};
	}

	if (denom in assetIndex[chainAssets.chain_name]) {
		return assetIndex[chainAssets.chain_name][denom];
	}

	const asset = chainAssets.assets.find((x) => x.base === denom);
	assetIndex[chainAssets.chain_name][denom] = asset;
	return asset;
};

export const getBalanceQueryKey = (
	chainType: "cosmos" | "eip155",
	chainName: string,
	address: string,
) => {
	return ["balance", chainType, chainName, address];
};

const cosmosBalancesQuery = (params: {
	address?: string;
	enabled: boolean;
	chainName: string;
	client?: CosmosQueryClient;
	prices?: PriceMapSlinky;
}) => ({
	enabled: params.enabled,
	queryKey: getBalanceQueryKey(
		"cosmos",
		params.chainName,
		params.address ?? "",
	),
	queryFn: async () => {
		if (!params.address) {
			throw new Error("Address is required");
		}

		if (!params.client) {
			throw new Error("Client is required");
		}

		const chain = getCosmosChain(params.chainName);

		if (!chain) {
			throw new Error("Invalid chain name");
		}

		const balances = await params.client.cosmos.bank.v1beta1.allBalances({
			address: params.address,
		});

		const chainAssets = getChainAssets(params.chainName);

		if (!chainAssets) {
			throw new Error("Chain assets not found");
		}

		const result = balances.balances
			.filter(({ denom }) => {
				// fix for unknown ibc tokens
				return Boolean(getAsset(chainAssets, denom));
			})
			.map((x): BalanceEntry => {
				const asset = getAsset(chainAssets, x.denom)!;

				const exp = asset.denom_units.find(
					(unit) => unit.denom === asset.display,
				)?.exponent as number;

				const token = asset.symbol;
				const slinkyPrice = params.prices?.[token];

				const price =
					(slinkyPrice
						? BigInt(slinkyPrice.price?.price ?? 0)
						: COSMOS_PRICES[token]) ?? BigInt(0);

				const priceDecimals = slinkyPrice
					? Number(slinkyPrice.decimals)
					: 8;

				return {
					address: params.address!,
					balance: BigInt(x.amount),
					chainId: chain.chain_id,
					chainName: params.chainName,
					decimals: exp,
					// fixme
					price,
					priceDecimals,
					token,
					title: asset.name,
					type: "osmosis",
					logo:
						asset.logo_URIs?.svg ??
						asset.logo_URIs?.png ??
						// @ts-ignore
						asset.logo_URIs?.jpeg,
				};
			});

		if (!result.length) {
			const [native] = chainAssets.assets;
			const token = native.symbol;

			const price =
				(params.prices?.[token]
					? BigInt(params.prices[token].price?.price ?? 0)
					: COSMOS_PRICES[token]) ?? BigInt(0);

			const priceDecimals = params.prices?.[token]
				? Number(params.prices[token].decimals)
				: 8;

			result.push({
				address: params.address!,
				balance: BigInt(0),
				chainId: chainAssets.chain_name,
				chainName: params.chainName,
				decimals: native.denom_units[0].exponent,
				// fixme
				price,
				priceDecimals,
				token,
				title: native.name,
				type: "osmosis",
			});
		}

		return result;
	},
	refetchInterval: Infinity,
	staleTime: 15000,
});

const eip155NativeBalanceQuery = ({
	enabled,
	chainName,
	address,
	prices,
}: {
	enabled: boolean;
	chainName: ChainName;
	address?: `0x${string}`;
	prices?: PriceMapSlinky;
}) => ({
	queryKey: [
		...getBalanceQueryKey("eip155", chainName, address ?? ""),
		"native",
	],
	queryFn: async (): Promise<BalanceEntry> => {
		if (!address || !isAddress(address)) {
			throw new Error("Address is required");
		}

		const { provider, tokenSymbol: token } = getProvider(chainName);
		const slinkyPrice = prices?.[token];

		// fixme remove chainlink pricefeed when all tokens are in slinky

		const balance = await provider.getBalance({ address });
		const network = provider.chain;

		const price: bigint = slinkyPrice
			? BigInt(slinkyPrice.price?.price ?? 0)
			: BigInt(0);

		const priceDecimals = slinkyPrice ? Number(slinkyPrice.decimals) : 8;

		return {
			address,
			balance,
			chainId: network.id.toString(),
			chainName,
			decimals: 18,
			price,
			priceDecimals,
			// fixme native token titles
			title: "Ethereum",
			// fixme native token names
			token,
			type: "eip155:native",
		};
	},
	refetchInterval: Infinity,
	staleTime: 15000,
	enabled: Boolean(address) && enabled,
});

const eip155ERC20BalanceQuery = ({
	enabled,
	chainName,
	address,
	token,
	priceFeed,
	prices,
	stablecoin,
}: {
	enabled: boolean;
	chainName: ChainName;
	address?: `0x${string}`;
	token?: `0x${string}`;
	stablecoin?: boolean;
	priceFeed?: `0x${string}`;
	prices?: PriceMapSlinky;
}) => ({
	enabled: enabled && Boolean(address && token),
	queryKey: [
		...getBalanceQueryKey("eip155", chainName, address ?? ""),
		`erc20:${token}`,
	],
	queryFn: async (): Promise<BalanceEntry> => {
		if (!address || !isAddress(address) || !token || !isAddress(token)) {
			throw new Error("Address and token are required");
		}

		const { provider } = getProvider(chainName);

		const contract = getContract({
			address: token,
			abi: erc20Abi,
			client: provider,
		});

		const [balance, decimals, symbol, name] = await Promise.all([
			contract.read.balanceOf([address]),
			contract.read.decimals(),
			contract.read.symbol(),
			contract.read.name(),
		]);

		const network = provider.chain;
		const slinkyPrice = prices?.[symbol];

		const price: bigint = stablecoin
			? BigInt("100000000")
			: slinkyPrice
				? BigInt(slinkyPrice.price?.price ?? 0)
				: BigInt(0);

		const priceDecimals = stablecoin
			? 8
			: slinkyPrice
				? Number(slinkyPrice.decimals)
				: 8;

		return {
			address,
			balance,
			chainId: network.id.toString(),
			chainName,
			decimals: Number(decimals),
			erc20Token: token,
			price,
			priceDecimals,
			title: name,
			token: symbol,
			type: "eip155:erc20",
		};
	},
	refetchInterval: Infinity,
	staleTime: 15000,
});

const is0x = (address: string): address is `0x${string}` =>
	address.startsWith("0x");

const DEFAULT_BECH32_PREFIX = getCosmosChain("osmosis")!.bech32_prefix;

export const balancesQueryCosmos = (
	enabled: boolean,
	keys?: KeyModel[],
	clients?: [CosmosQueryClient, string, string][],
	prices?: PriceMapSlinky,
) => {
	const byAddress: Record<string, KeyModel> = {};
	// debug:
	// cosmos1clpqr4nrk4khgkxj78fcwwh6dl3uw4ep4tgu9q - cosmostation
	// const debugAddress = "osmo1clpqr4nrk4khgkxj78fcwwh6dl3uw4epasmvnj"; // cosmostation

	const addresses =
		keys?.flatMap((key) =>
			key.addresses
				.filter(({ addressType }) => addressType === AddressType.Osmosis)
				.map(({ addressValue }) => {
					byAddress[addressValue] = key;
					return addressValue;
				}),
		) ?? [];

	// debug
	/* if (keys?.length) {
		byAddress[debugAddress] = {
			key: keys?.[0].key,
			addresses: [
				{
					type: 0,
					address: debugAddress,
				},
			],
		};

		addresses.push(debugAddress);
	} */

	const select = (results: BalanceEntry[]) => {
		const _address = results[0]?.address;

		if (!_address) {
			throw new Error("Expected not empty result");
		}

		const address = toBech32(
			DEFAULT_BECH32_PREFIX,
			fromBech32(_address).data,
		);

		const key = byAddress[address] ?? keys?.[0]!;

		return {
			results,
			key,
		};
	};

	const queries = (clients ?? []).flatMap(([client, chainName]) => {
		const targetPrefix = getCosmosChain(chainName)?.bech32_prefix;

		if (!targetPrefix) {
			throw new Error("Invalid chain name");
		}

		return addresses.map((_address) => {
			const { data } = fromBech32(_address);
			const address = toBech32(targetPrefix, data);

			return {
				...cosmosBalancesQuery({
					enabled,
					chainName,
					address,
					client,
					prices,
				}),
				select,
			};
		});
	});

	return { queries };
};

export const balancesQueryEth = (
	enabled: boolean,
	address: `0x${string}`,
	keys?: KeyModel[],
	prices?: PriceMapSlinky,
) => {
	const enabledEthChains = getEnabledEthChains(address)
	const byAddress: Record<string, KeyModel> = {};
	// debug
	// const debugAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // vitalik.eth

	const eth =
		keys?.flatMap((key) =>
			key.addresses
				.filter(
					({ addressType }) => addressType === AddressType.Ethereum,
				)
				.map(({ addressValue }) => {
					byAddress[addressValue] = key;
					return addressValue;
				})
				.filter(is0x),
		) ?? [];

	// debug
	/* if (keys?.length) {
		byAddress[debugAddress] = {
			key: keys?.[0].key,
			addresses: [
				{
					type: 0,
					address: debugAddress,
				},
			],
		};

		eth.push(debugAddress);
	} */

	const select = (result: BalanceEntry) => ({
		results: [result],
		key: byAddress[result.address],
	});

	const queries = [
		...enabledEthChains.flatMap(({ chainName }) => {
			return eth.map((address) => ({
				...eip155NativeBalanceQuery({
					enabled,
					chainName,
					address,
					prices,
				}),
				select,
			}));
		}),
		...ERC20_TOKENS.filter(({ chainName }) =>
			// fixme not optimal
			enabledEthChains.find((x) => x.chainName === chainName),
		).flatMap(({ chainName, address: token, priceFeed, stablecoin }) =>
			eth.map((address) => ({
				...eip155ERC20BalanceQuery({
					enabled,
					chainName,
					address,
					token,
					priceFeed,
					stablecoin,
					prices,
				}),
				select,
			})),
		),
	];

	return { queries };
};

const EURO_PRICE_FEED = "0xb49f677943BC038e9857d61E7d053CaA2C1734C1";
const GBP_PRICE_FEED = "0x5c0Ab2d9b5a7ed9f470386e82BB36A3613cDd4b5";

const FIAT_PRICE_FEEDS: Record<string, `0x${string}`> = {
	eur: EURO_PRICE_FEED,
	gbp: GBP_PRICE_FEED,
};

const fiatPriceQuery = (enabled: boolean, name: string) => {
	if (!(name in FIAT_PRICE_FEEDS)) {
		throw new Error("Invalid fiat currency");
	}

	const { provider } = getProvider("mainnet");

	const contract = getContract({
		address: FIAT_PRICE_FEEDS[name],
		abi: aggregatorV3InterfaceABI,
		client: provider,
	});

	return {
		enabled,
		queryKey: ["fiatPrice", name],
		queryFn: async () => {
			const price: bigint =
				(await contract.read.latestRoundData())?.[1] ?? BigInt(0);
			BigInt(0);

			return {
				name,
				value: price,
				decimals: 8,
			};
		},
	} as const;
};

export const fiatPricesQuery = (enabled: boolean) => {
	return {
		queries: Object.keys(FIAT_PRICE_FEEDS).map((name) => {
			return fiatPriceQuery(enabled, name);
		}),
	};
};

const rpcClients: Record<
	string,
	{ client: CosmosQueryClient; rpcEndpoint: string } | undefined
> = {};
const rpcRetry: Record<string, number> = {};

const checkHealth = async (
	client: CosmosQueryClient | undefined,
	chainName: string,
) => {
	if (!client) {
		return false;
	}

	let chain = chainByName[chainName];

	if (!chain) {
		chain = chains.find((x) => x.chain_name === chainName);

		if (!chain) {
			console.warn("chain not found", { chainName });
			return false;
		}

		chainByName[chainName] = chain;
	}

	const header = (
		await client.cosmos.base.tendermint.v1beta1.getLatestBlock({})
	).block?.header;

	const isChainIdValid = header?.chainId === chain.chain_id;
	// todo check against block height and block time
	return isChainIdValid;
};

export const queryCosmosClients = (walletManager: WalletManager, address: `0x${string}`) => {
	const enabledCosmosChains = getEnabledCosmosChains(address)

	return {
		queryKey: ["cosmos", "rpcClients"],
		queryFn: async () => {
			const clients: [CosmosQueryClient, string, string][] = [];

			for (let i = 0; i < enabledCosmosChains.length; i++) {
				const { chainName, rpc } = enabledCosmosChains[i];
				const retries = (rpc?.length ?? 0) + 1;

				for (let i = 0; i < retries; i++) {
					let { client, rpcEndpoint } = rpcClients[chainName] ?? {};
					const retry = (rpcRetry[chainName] ?? 0) % (retries + 1);
					rpcRetry[chainName] = retry + 1;

					if (!client || !rpcEndpoint) {
						let endpoint: ExtendedHttpEndpoint | string;

						if (!rpc?.[retry]) {
							const repo = walletManager.getWalletRepo(chainName);
							repo.activate();

							try {
								endpoint = await repo.getRpcEndpoint();
							} catch (e) {
								console.error(e);
								endpoint = `https://rpc.cosmos.directory/${chainName}`;
							}
						} else {
							endpoint = rpc[retry];
						}

						rpcEndpoint =
							typeof endpoint === "string"
								? endpoint
								: endpoint.url;

						try {
							client =
								await cosmos.ClientFactory.createRPCQueryClient(
									{
										rpcEndpoint,
									},
								);
						} catch (e) {
							console.error(e);
							continue;
						}
					}

					if (await checkHealth(client, chainName)) {
						rpcClients[chainName] = { client, rpcEndpoint };
						clients.push([client, chainName, rpcEndpoint]);
						break;
					} else if (rpcClients[chainName]) {
						delete rpcClients[chainName];
					}
				}
			}

			return clients;
		},
	} as const;
};
