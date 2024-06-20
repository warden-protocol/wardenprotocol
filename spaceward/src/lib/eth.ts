import { ethers } from "ethers";

const urls = {
	arbitrum:
		"https://dawn-fabled-choice.arbitrum-mainnet.quiknode.pro/fabc06ac1ea3dc8bb35eb3754464747e9b85a15d/",
	sepolia: "https://rpc2.sepolia.org",
	mainnet: "https://eth.llamarpc.com",
} as const;

type SupportedNetwork = keyof typeof urls;

const providers: Partial<Record<SupportedNetwork, ethers.JsonRpcProvider>> = {};

export const getProvider = (type: SupportedNetwork) => {
	if (!providers[type]) {
		providers[type] = new ethers.JsonRpcProvider(urls[type]);
	}

	return providers[type] as ethers.JsonRpcProvider;
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
