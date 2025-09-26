import { createPublicClient, http, fallback } from "viem";
import * as chains from "viem/chains";
import { capitalize } from "@/features/modals/util";
import { ETH_CHAINID_MAP, ETH_CHAIN_CONFIG } from "./constants";

type SupportedNetwork = keyof typeof ETH_CHAINID_MAP;

export const REVERSE_ETH_CHAINID_MAP = Object.fromEntries(
	Object.entries(ETH_CHAINID_MAP).map(([k, v]) => [v, k]),
) as Record<string, SupportedNetwork | undefined>;


function createProviderCompat(type: SupportedNetwork) {
	const chain = chains[type];

	/** old provider params
	 * batchMaxCount: 10,
	 * batchStallTime: 100,
	 * staticNetwork: ethers.Network.from(BigInt(chainId)),
	 */

	const rpcs = ETH_CHAIN_CONFIG[chain.id]?.rpc;

	if (!rpcs) {
		throw new Error(`Unsupported network: ${type}`);
	}

	const client = createPublicClient({
		batch: {
			multicall: true,
		},
		chain,
		transport: fallback([
			...rpcs.map((url) => http(url)),
			http(),
		]),
	});

	return client;
}

const providers: Partial<
	Record<SupportedNetwork, ReturnType<typeof createProviderCompat>>
> = {};

export const isSupportedNetwork = (
	network?: string,
): network is SupportedNetwork =>
	Boolean(network && network in ETH_CHAINID_MAP);

export const getProvider = (type: SupportedNetwork) => {
	const chainId = ETH_CHAINID_MAP[type];
	const config = ETH_CHAIN_CONFIG[chainId];
	const tokenSymbol = config?.token?.symbol ?? "ETH";
	const tokenName = config?.token?.name ?? "Ethereum";
	const title = config?.title ?? capitalize(type);

	if (!providers[type]) {
		if (!chainId || !config) {
			throw new Error(`Unsupported network: ${type}`);
		}

		providers[type] = createProviderCompat(type);
	}

	const provider = providers[type];
	return { provider, tokenSymbol, tokenName, title };
};

export const getProviderByChainId = (chainId: string) => {
	const network = REVERSE_ETH_CHAINID_MAP[chainId];

	if (!network) {
		throw new Error(`Unsupported chainId: ${chainId}`);
	}

	return getProvider(network).provider;
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
