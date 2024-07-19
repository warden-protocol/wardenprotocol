import { assets } from "chain-registry";
import { ethers } from "ethers";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
import erc20Abi from "@/contracts/eip155/erc20Abi";
import aggregatorV3InterfaceABI from "@/contracts/eip155/priceFeedAbi";
import { getProvider } from "@/lib/eth";
import { BalanceEntry, CosmosQueryClient } from "./types";

type ChainName = Parameters<typeof getProvider>[0];

const ERC20_TOKENS: {
	chainName: ChainName;
	address: `0x${string}`;
	// taken from https://docs.chain.link/data-feeds/price-feeds/addresses
	priceFeed?: `0x${string}`;
	stablecoin?: boolean;
}[] = [
	{
		chainName: "arbitrum",
		// ARB
		address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
		priceFeed: "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6",
	},
	{
		chainName: "arbitrum",
		// USDT
		address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
		stablecoin: true,
	},
	{
		chainName: "mainnet",
		// USDT
		address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		stablecoin: true,
	},
	{
		chainName: "arbitrum",
		// USDC native
		address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
		stablecoin: true,
	},
];

const EIP_155_NATIVE_PRICE_FEEDS: Record<ChainName, `0x${string}` | undefined> =
	{
		mainnet: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
		arbitrum: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
		sepolia: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
	};

export const cosmosBalancesQuery = (params: {
	address?: string;
	enabled: boolean;
	chainName: string;
	client?: CosmosQueryClient;
}) => ({
	enabled: params.enabled,
	queryKey: ["cosmos", params.chainName, "balance", params.address],
	queryFn: async () => {
		if (!params.address) {
			throw new Error("Address is required");
		}

		if (!params.client) {
			throw new Error("Client is required");
		}

		const balances = await params.client.cosmos.bank.v1beta1.allBalances({
			address: params.address,
		});

		// todo need not to do find on each query
		const chainAssets = assets.find(
			(x) => x.chain_name === params.chainName,
		);

		if (!chainAssets) {
			throw new Error("Chain assets not found");
		}

		return balances.balances.map((x): BalanceEntry => {
			// todo optimise
			const asset = chainAssets!.assets.find((y) => y.base === x.denom);

			if (!asset) {
				throw new Error("Asset not found");
			}

			const exp = asset.denom_units.find(
				(unit) => unit.denom === asset.display,
			)?.exponent as number;

			return {
				address: params.address!,
				balance: BigInt(x.amount),
				chainId: chainAssets?.chain_name,
				chainName: params.chainName,
				decimals: exp,
				price: BigInt(0),
				priceDecimals: 8,
				token: asset?.symbol ?? "",
				title: asset?.name ?? "",
				type: "osmosis",
			};
		});
	},
	refetchInterval: Infinity,
	staleTime: 15000,
});

const eip155NativeBalanceQuery = ({
	enabled,
	chainName,
	address,
}: {
	enabled: boolean;
	chainName: ChainName;
	address?: `0x${string}`;
}) => ({
	queryKey: ["eip155", chainName, "native", address],
	queryFn: async (): Promise<BalanceEntry> => {
		if (!address) {
			throw new Error("Address is required");
		}

		const priceFeed = EIP_155_NATIVE_PRICE_FEEDS[chainName];
		const priceFeedContract = priceFeed
			? new ethers.Contract(
					priceFeed,
					aggregatorV3InterfaceABI,
					getProvider(chainName),
				)
			: undefined;
		const provider = getProvider(chainName);
		const balance = await provider.getBalance(address);
		const network = await provider.getNetwork();

		const price: bigint =
			(priceFeedContract
				? await priceFeedContract.latestRoundData()
				: undefined
			)?.answer ?? BigInt(0);

		return {
			address,
			balance,
			chainId: network.chainId.toString(),
			chainName,
			decimals: 18,
			price,
			priceDecimals: 8,
			// fixme native token titles
			title: "Ethereum",
			// fixme native token names
			token: "ETH",
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
	stablecoin,
}: {
	enabled: boolean;
	chainName: ChainName;
	address?: `0x${string}`;
	token?: `0x${string}`;
	stablecoin?: boolean;
	priceFeed?: `0x${string}`;
}) => ({
	enabled: enabled && Boolean(address && token),
	queryKey: ["eip155", chainName, "erc20", address, token],
	queryFn: async (): Promise<BalanceEntry> => {
		if (!address || !token) {
			throw new Error("Address and token are required");
		}

		const provider = getProvider(chainName);
		const contract = new ethers.Contract(token, erc20Abi, provider);

		const priceFeedContract = priceFeed
			? new ethers.Contract(
					priceFeed,
					aggregatorV3InterfaceABI,
					getProvider(chainName),
				)
			: undefined;

		const balance = await contract.balanceOf(address);
		const decimals = await contract.decimals();
		const symbol = await contract.symbol();
		const name = await contract.name();
		const network = await provider.getNetwork();

		const price: bigint = stablecoin
			? BigInt("100000000")
			: (priceFeedContract
					? await priceFeedContract.latestRoundData()
					: undefined
				)?.answer ?? BigInt(0);

		return {
			address,
			balance,
			chainId: network.chainId.toString(),
			chainName,
			decimals: Number(decimals),
			erc20Token: token,
			price,
			priceDecimals: 8,
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

export const balancesQueryCosmos = (
	enabled: boolean,
	keys?: QueryKeyResponse[],
	clients?: [CosmosQueryClient, string][],
) => {
	const byAddress: Record<string, QueryKeyResponse> = {};

	const addresses =
		keys?.flatMap((key) =>
			key.addresses
				.filter(({ type }) => type === AddressType.ADDRESS_TYPE_OSMOSIS)
				.map(({ address }) => {
					byAddress[address] = key;
					return address;
				}),
		) ?? [];

	const select = (results: BalanceEntry[]) => {
		const key = results[0]?.address
			? byAddress[results[0].address]
			: keys?.[0]!;

		return {
			results,
			key,
		};
	};

	const queries = (clients ?? []).flatMap(([client, chainName]) => {
		return addresses.map((address) => {
			return {
				...cosmosBalancesQuery({
					enabled,
					chainName,
					address,
					client,
				}),
				select,
			};
		});
	});

	return { queries };
};

export const balancesQueryEth = (
	enabled: boolean,
	keys?: QueryKeyResponse[],
) => {
	const byAddress: Record<string, QueryKeyResponse> = {};

	const eth =
		keys?.flatMap((key) =>
			key.addresses
				.filter(
					({ type }) => type === AddressType.ADDRESS_TYPE_ETHEREUM,
				)
				.map(({ address }) => {
					byAddress[address] = key;
					return address;
				})
				.filter(is0x),
		) ?? [];

	const select = (result: BalanceEntry) => ({
		results: [result],
		key: byAddress[result.address],
	});

	const queries = [
		...(["arbitrum", "sepolia", "mainnet"] as const).flatMap(
			(chainName) => {
				return eth.map((address) => ({
					...eip155NativeBalanceQuery({
						enabled,
						chainName,
						address,
					}),
					select,
				}));
			},
		),
		...ERC20_TOKENS.flatMap(
			({ chainName, address: token, priceFeed, stablecoin }) =>
				eth.map((address) => ({
					...eip155ERC20BalanceQuery({
						enabled,
						chainName,
						address,
						token,
						priceFeed,
						stablecoin,
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

	const provider = getProvider("mainnet");

	const priceFeedContract = new ethers.Contract(
		FIAT_PRICE_FEEDS[name],
		aggregatorV3InterfaceABI,
		provider,
	);

	return {
		enabled,
		queryKey: ["fiatPrice", name],
		queryFn: async () => {
			const price: bigint =
				(await priceFeedContract.latestRoundData())?.answer ??
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
