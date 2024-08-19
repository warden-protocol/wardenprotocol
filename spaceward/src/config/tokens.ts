import { getProvider } from "../lib/eth";

type ChainName = Parameters<typeof getProvider>[0];

export const ERC20_TOKENS: {
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
	{
		chainName: "sepolia",
		// WETH
		address: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
		// same as native
		priceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
	},
];

export const EIP_155_NATIVE_PRICE_FEEDS: Partial<
	Record<ChainName, `0x${string}` | undefined>
> = {
	mainnet: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
	arbitrum: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
	sepolia: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
};

/** @deprecated remove hardcoded values when all tokens are in slinky */
export const COSMOS_PRICES: Record<string, bigint | undefined> = {
	ATOM: BigInt(5.775 * 10 ** 8),
	OSMO: BigInt(0.4446 * 10 ** 8),
};

export const ENABLED_ETH_CHAINS: ChainName[] = [
	/*"mainnet", "arbitrum",*/ "sepolia",
];

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

