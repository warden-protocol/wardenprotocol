import { env } from "@/env";
import { getProvider } from "../lib/eth";
import { ALLOWED_MAINNET_ADDRESSES } from "./whitelists";

type ChainName = Parameters<typeof getProvider>[0];

export const MULTICALL3_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";

export const ERC20_TOKENS: {
	chainName: ChainName;
	address: `0x${string}`;
	// taken from https://docs.chain.link/data-feeds/price-feeds/addresses
	priceFeed?: `0x${string}`;
	stablecoin?: boolean;
}[] = [
	/* Arbitrum One */
	{
		chainName: "arbitrum",
		// ARB
		address: "0x912ce59144191c1204e64559fe8253a0e49e6548",
		priceFeed: "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6",
	},
	{
		chainName: "arbitrum",
		// USDC native
		address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
		stablecoin: true,
	},
	{
		chainName: "arbitrum",
		// USDT
		address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
		stablecoin: true,
	},
	/* Base */
	// warp
	{
		chainName: "base",
		address: "0x3c8665472ec5aF30981B06B4E0143663EBeDcc1E",
	},
	/* Binance smart chain */
	// ada
	{
		chainName: "bsc",
		address: "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47",
	},
	// doge
	{
		chainName: "bsc",
		address: "0xba2ae424d960c26247dd6c32edc70b295c744c43",
	},
	// fil
	{
		chainName: "bsc",
		address: "0x0d8ce2a99bb6e3b7db580ed848240e4a0f9ae153",
	},
	/** Ethereum Mainnet */
	// aave,
	{
		chainName: "mainnet",
		address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
	},
	// aevo,
	{
		chainName: "mainnet",
		address: "0xB528edBef013aff855ac3c50b381f253aF13b997",
	},
	// agix
	{
		chainName: "mainnet",
		address: "0x5B7533812759B45C2B44C19e320ba2cD2681b542",
	},
	// ape
	{
		chainName: "mainnet",
		address: "0x4d224452801aced8b2f0aebe155379bb5d594381",
	},
	// arkm
	{
		chainName: "mainnet",
		address: "0x6e2a43be0b1d33b726f0ca3b8de60b3482b8b050",
	},
	// blur
	{
		chainName: "mainnet",
		address: "0x5283d291dbcf85356a21ba090e6db59121208b44",
	},
	// bonk
	{
		chainName: "mainnet",
		address: "0x1151CB3d861920e07a38e03eEAd12C32178567F6",
	},
	// comp
	{
		chainName: "mainnet",
		address: "0xc00e94cb662c3520282e6f5717214004a7f26888",
	},
	// crv
	{
		chainName: "mainnet",
		address: "0xD533a949740bb3306d119CC777fa900bA034cd52",
	},
	// fet
	{
		chainName: "mainnet",
		address: "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85",
	},
	// grt
	{
		chainName: "mainnet",
		address: "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
	},
	// imx
	{
		chainName: "mainnet",
		address: "0xf57e7e7c23978c3caec3c3548e3d615c346e79ff",
	},
	// inj
	{
		chainName: "mainnet",
		address: "0xe28b3b32b6c345a34ff64674606124dd5aceca30",
	},
	// ldo
	{
		chainName: "mainnet",
		address: "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
	},
	// link
	{
		chainName: "mainnet",
		address: "0x514910771af9ca656af840dff83e8264ecf986ca",
	},
	// mana
	{
		chainName: "mainnet",
		address: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
	},
	// pepe
	{
		chainName: "mainnet",
		address: "0x6982508145454ce325ddbe47a25d4ec3d2311933",
	},
	// rndr
	{
		chainName: "mainnet",
		address: "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24",
	},
	// shib
	{
		chainName: "mainnet",
		address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce",
	},
	// snx
	{
		chainName: "mainnet",
		address: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
	},
	// strk
	{
		chainName: "mainnet",
		address: "0x74232704659ef37c08995e386a2e26cc27a8d7b1",
	},
	// uni
	{
		chainName: "mainnet",
		address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
	},
	// usdt
	{
		chainName: "mainnet",
		address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		stablecoin: true,
	},
	// wld
	{
		chainName: "mainnet",
		address: "0x163f8c2467924be0ae7b5347228cabf260318753",
	},
	// woo
	{
		chainName: "mainnet",
		address: "0x4691937a7508860f876c9c0a2a617e7d9e945d4b",
	},
	// usdc
	{
		chainName: "mainnet",
		address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
		stablecoin: true,
	},
	/* Optimism */
	// op
	{
		chainName: "optimism",
		address: "0x4200000000000000000000000000000000000042",
	},
	// ETH Sepolia testnet
	// weth
	{
		chainName: "sepolia",
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

const _ENABLED_ETH_CHAINS: {
	chainName: ChainName;
	testnet?: boolean;
}[] = [
	{ chainName: "arbitrum" },
	{ chainName: "astar" },
	{ chainName: "avalanche" },
	{ chainName: "base" },
	{ chainName: "bsc" },
	{ chainName: "classic" },
	{ chainName: "mainnet" },
	{ chainName: "optimism" },
	{ chainName: "polygon" },
	{ chainName: "sepolia", testnet: true },
];

export const getEnabledEthChains = (address: `0x${string}`) => {
	const isAllowed = ALLOWED_MAINNET_ADDRESSES.includes(address.toLowerCase() as `0x${string}`);

	return _ENABLED_ETH_CHAINS.filter(({ testnet }) =>
		isAllowed ? true : Boolean(testnet),
	);
}

/** @deprecated in favor of whitelists */
export const ENABLED_ETH_CHAINS = _ENABLED_ETH_CHAINS.filter(({ testnet }) =>
	env.networkVisibility === "all"
		? true
		: env.networkVisibility === "mainnet"
			? !testnet
			: Boolean(testnet),
);

const _COSMOS_CHAINS: {
	chainName: string;
	feeAmount?: string;
	rpc?: string[]; // todo support multiple rpc
	testnet?: boolean;
}[] = [
	{
		chainName: "axelar",
	},
	{
		chainName: "celestia",
	},
	{
		chainName: "cosmoshub",
	},
	{
		chainName: "dydx",
	},
	{
		chainName: "osmosis",
	},
	{
		chainName: "sei",
	},
	/*{
		chainName: "thorchain",
	},*/
	{
		chainName: "cosmoshubtestnet",
		feeAmount: "1000",
		rpc: [
			"https://cosmoshub-testnet.rpc.kjnodes.com",
			"https://rpc.sentry-01.theta-testnet.polypore.xyz",
		],

		testnet: true,
	},
	{
		chainName: "osmosistestnet",
		feeAmount: "1500",
		rpc: ["https://rpc.testnet.osmosis.zone"],
		testnet: true,
	},
];

export const getEnabledCosmosChains = (address: `0x${string}`) => {
	const isAllowed = ALLOWED_MAINNET_ADDRESSES.includes(address.toLowerCase() as `0x${string}`);

	return _COSMOS_CHAINS.filter(({ testnet }) =>
		isAllowed ? true : Boolean(testnet),
	);
}

/** @deprecated in favor of whitelists */
export const COSMOS_CHAINS = _COSMOS_CHAINS.filter(({ testnet }) =>
	env.networkVisibility === "all"
		? true
		: env.networkVisibility === "mainnet"
			? !testnet
			: Boolean(testnet),
);
