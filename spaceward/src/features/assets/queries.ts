import { ethers } from "ethers";
import { getProvider } from "@/lib/eth";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/query";
import { BalanceEntry } from "./types";
import erc20Abi from "@/contracts/eip155/erc20Abi";
import aggregatorV3InterfaceABI from "@/contracts/eip155/priceFeedAbi";
import { queries } from "@testing-library/react";

type ChainName = Parameters<typeof getProvider>[0];

const ERC20_TOKENS: {
	chainName: ChainName;
	address: `0x${string}`;
	priceFeed?: `0x${string}`;
	stablecoin?: boolean;
}[] = [
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
		sepolia: undefined,
	};

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
	enabled: enabled && Boolean(address && token),
});

const is0x = (address: string): address is `0x${string}` =>
	address.startsWith("0x");

export const balancesQuery = (
	enabled: boolean,
	/** @deprecated fixme params, we need only address */
	keys?: Pick<QueryKeyResponse, "addresses">[],
) => {
	const eth: `0x${string}`[] = [];
	// TODO add osmosis

	for (const key of keys ?? []) {
		for (const address of key.addresses) {
			if (
				is0x(address.address) &&
				address.type === AddressType.ADDRESS_TYPE_ETHEREUM
			) {
				eth.push(address.address);
			}
		}
	}

	const queries = [
		...(["arbitrum", "sepolia", "mainnet"] as const).flatMap(
			(chainName) => {
				return eth.map((address) =>
					eip155NativeBalanceQuery({ enabled, chainName, address }),
				);
			},
		),
		...ERC20_TOKENS.flatMap(
			({ chainName, address: token, priceFeed, stablecoin }) =>
				eth.map((address) =>
					eip155ERC20BalanceQuery({
						enabled,
						chainName,
						address,
						token,
						priceFeed,
						stablecoin,
					}),
				),
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
