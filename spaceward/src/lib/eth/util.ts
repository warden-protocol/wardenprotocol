import { ethers } from "ethers";
import { ETH_CHAINID_MAP, ETH_RPC_URL } from "./constants";

export const REVERSE_ETH_CHAINID_MAP = Object.fromEntries(
	Object.entries(ETH_CHAINID_MAP).map(([k, v]) => [v, k]),
) as Record<string, SupportedNetwork | undefined>;

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

		let retry = 0;
		const getUrl = () =>
			ETH_RPC_URL[chainId][retry % ETH_RPC_URL[chainId].length];

		const url = getUrl();
		const req = new ethers.FetchRequest(url);
		req.timeout = 10000;
		req.setThrottleParams({ maxAttempts: 12 });

		req.retryFunc = async (request, response, attempt) => {
			console.log("ethers.FetchRequest::retryFunc", {
				request,
				response,
				attempt,
				type,
			});

			retry++;
			const url = getUrl();
			console.log({ url, retry });
			req.url = url;
			return true;
		};

		providers[type] = new ethers.JsonRpcProvider(req, undefined, {
			batchMaxCount: 10,
			batchStallTime: 100,
			staticNetwork: ethers.Network.from(BigInt(chainId)),
		});
	}

	const provider = providers[type]!.provider;
	return provider;
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
