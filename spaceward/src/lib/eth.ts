import { ethers } from "ethers";

const rpcMap = {
	"1": "https://cloudflare-eth.com",
	"5": "https://rpc.goerli.mudit.blog/",
	"10": "https://mainnet.optimism.io/",
	"56": "https://bsc-dataseed1.bnbchain.org",
	"137": "https://polygon-rpc.com/",
	"324": "https://mainnet.era.zksync.io/",
	"420": "https://goerli.optimism.io",
	"8453": "https://mainnet.base.org/",
	"42161": "https://arb1.arbitrum.io/rpc",
	"42220": "https://forno.celo.org",
	"43114": "https://api.avax.network/ext/bc/C/rpc",
	"44787": "https://alfajores-forno.celo-testnet.org",
	"80001": "https://rpc-mumbai.maticvigil.com",
	"81457": "https://rpc.blast.io/",
	"421613": "https://goerli-rollup.arbitrum.io/rpc",
	"7777777": "https://rpc.zora.energy/",
	"11155111": "https://rpc.sepolia.org/",
};

export const ETH_CHAINID_MAP = {
	mainnet: "1",
	goerli: "5",
	optimism: "10",
	bsc: "56",
	polygon: "137",
	zksync: "324",
	optimismGoerli: "420",
	base: "8453",
	arbitrum: "42161",
	celo: "42220",
	avalanche: "43114",
	celoTestnet: "44787",
	mumbai: "80001",
	blast: "81457",
	arbitrumGoerli: "421613",
	zora: "7777777",
	sepolia: "11155111",
} as const;

export const REVERSE_ETH_CHAINID_MAP = Object.fromEntries(
	Object.entries(ETH_CHAINID_MAP).map(([k, v]) => [v, k]),
) as Record<string, SupportedNetwork>;

type SupportedNetwork = keyof typeof ETH_CHAINID_MAP;
const providers: Partial<Record<SupportedNetwork, ethers.JsonRpcProvider>> = {};

export const isSupportedNetwork = (
	network?: string,
): network is SupportedNetwork =>
	Boolean(network && network in ETH_CHAINID_MAP);

export const getProvider = (type: SupportedNetwork) => {
	if (!providers[type]) {
		const chainId = ETH_CHAINID_MAP[type];

		if (!chainId) {
			throw new Error(`Unsupported network: ${type}`);
		}

		providers[type] = new ethers.JsonRpcProvider(rpcMap[chainId]);
	}

	return providers[type] as ethers.JsonRpcProvider;
};

export const getProviderByChainId = (chainId: string) => {
	const network = REVERSE_ETH_CHAINID_MAP[chainId];

	if (!network) {
		throw new Error(`Unsupported chainId: ${chainId}`);
	}

	return getProvider(network);
};

interface KnownAddress {
	address: `0x${string}`;
	networks: SupportedNetwork[];
	name: string;
	logo: string;
}

export const compareAddress = (a?: `0x${string}`, b?: `0x${string}`) =>
	a && b && a.toLowerCase() === b.toLowerCase();

/** @deprecated curated list for known addresses; should be moved to separate package or some kind of API */
export const KNOWN_ADDRESSES: KnownAddress[] = [
	{
		address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
		networks: ["mainnet"],
		logo: "https://etherscan.io/token/images/tethernew_32.png",
		name: "Tether USD",
	},
	{
		address: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
		networks: ["mainnet"],
		logo: "https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=032",
		name: "Uniswap",
	},
];
