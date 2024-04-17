import { Chain, AssetList } from "@chain-registry/types";
import { env } from "@/env";

export const wardenprotocollocal: Chain = {
	chain_name: "wardenprotocollocal",
	status: "live",
	network_type: "testnet",
	pretty_name: "Warden Protocol (local)",
	chain_id: "wardenprotocol",
	bech32_prefix: "warden",
	daemon_name: "wardend",
	node_home: "$HOME/.warden",
	key_algos: ["secp256k1"],
	slip44: 118,
	fees: {
		fee_tokens: [
			{
				denom: "uward",
				fixed_min_gas_price: 0.005,
				low_gas_price: 0.01,
				average_gas_price: 0.025,
				high_gas_price: 0.03,
			},
		],
	},
	staking: {
		staking_tokens: [
			{
				denom: "uward",
			},
		],
	},
	codebase: {
		git_repo: "https://github.com/warden-protocol/wardenprotocol",
		recommended_version: "v0.1.0",
		compatible_versions: ["v0.1.0"],
		cosmos_sdk_version: "0.50",
		consensus: {
			type: "cometbft",
			version: "0.38",
		},
		cosmwasm_enabled: false,
		genesis: {
			genesis_url:
				"https://raw.githubusercontent.com/warden-protocol/networks/main/testnet-alfama/genesis.json",
		},
		versions: [
			{
				name: "v0.1.0",
				recommended_version: "v0.1.0",
				compatible_versions: ["v0.1.0"],
				cosmos_sdk_version: "0.50",
				consensus: {
					type: "cometbft",
					version: "0.38",
				},
				cosmwasm_enabled: false,
			},
		],
	},
	apis: {
		rpc: [
			{
				address: env.rpcURL,
				provider: "Warden Protocol",
			},
		],
		rest: [
			{
				address: env.apiURL,
				provider: "Warden Protocol",
			},
		],
		grpc: [],
	},
	logo_URIs: {
		png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
	},
	keywords: ["local"],
	images: [
		{
			png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
		},
	],
};

export const wardenprotocollocalAssets: AssetList = {
	chain_name: "wardenprotocollocal",
	assets: [
		{
			description: "The native token of Warden Protocol Testnet",
			denom_units: [
				{
					denom: "uward",
					exponent: 0,
				},
				{
					denom: "ward",
					exponent: 6,
				},
			],
			base: "uward",
			name: "Ward",
			display: "ward",
			symbol: "WARD",
			logo_URIs: {
				png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
				svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.svg",
			},
			images: [
				{
					png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
					svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.svg",
				},
			],
		},
	],
};

export const wardenprotocoldevnet: Chain = {
	chain_name: "wardenprotocoldevnet",
	status: "live",
	network_type: "testnet",
	pretty_name: "Warden Protocol (devnet)",
	chain_id: "wardenprotocol",
	bech32_prefix: "warden",
	daemon_name: "wardend",
	node_home: "$HOME/.warden",
	key_algos: ["secp256k1"],
	slip44: 118,
	fees: {
		fee_tokens: [
			{
				denom: "uward",
				fixed_min_gas_price: 0.005,
				low_gas_price: 0.01,
				average_gas_price: 0.025,
				high_gas_price: 0.03,
			},
		],
	},
	staking: {
		staking_tokens: [
			{
				denom: "uward",
			},
		],
	},
	codebase: {
		git_repo: "https://github.com/warden-protocol/wardenprotocol",
		recommended_version: "v0.1.0",
		compatible_versions: ["v0.1.0"],
		cosmos_sdk_version: "0.50",
		consensus: {
			type: "cometbft",
			version: "0.38",
		},
		cosmwasm_enabled: false,
		genesis: {
			genesis_url:
				"https://raw.githubusercontent.com/warden-protocol/networks/main/testnet-alfama/genesis.json",
		},
		versions: [
			{
				name: "v0.1.0",
				recommended_version: "v0.1.0",
				compatible_versions: ["v0.1.0"],
				cosmos_sdk_version: "0.50",
				consensus: {
					type: "cometbft",
					version: "0.38",
				},
				cosmwasm_enabled: false,
			},
		],
	},
	apis: {
		rpc: [
			{
				address: env.rpcURL,
				provider: "Warden Protocol",
			},
		],
		rest: [
			{
				address: env.apiURL,
				provider: "Warden Protocol",
			},
		],
		grpc: [],
	},
	logo_URIs: {
		png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
	},
	keywords: ["local"],
	images: [
		{
			png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
		},
	],
};

export const wardenprotocoldevnetAssets: AssetList = {
	chain_name: "wardenprotocoldevnet",
	assets: [
		{
			description: "The native token of Warden Protocol Testnet",
			denom_units: [
				{
					denom: "uward",
					exponent: 0,
				},
				{
					denom: "ward",
					exponent: 6,
				},
			],
			base: "uward",
			name: "Ward",
			display: "ward",
			symbol: "WARD",
			logo_URIs: {
				png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
				svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.svg",
			},
			images: [
				{
					png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
					svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.svg",
				},
			],
		},
	],
};

export const wardenprotocolbuenavista: Chain = {
	chain_name: "wardenprotocolbuenavista",
	status: "live",
	network_type: "testnet",
	pretty_name: "Warden Protocol Buenavista",
	chain_id: "buenavista",
	bech32_prefix: "warden",
	daemon_name: "wardend",
	node_home: "$HOME/.warden",
	key_algos: ["secp256k1"],
	slip44: 118,
	fees: {
		fee_tokens: [
			{
				denom: "uward",
				fixed_min_gas_price: 0.005,
				low_gas_price: 0.01,
				average_gas_price: 0.025,
				high_gas_price: 0.03,
			},
		],
	},
	staking: {
		staking_tokens: [
			{
				denom: "uward",
			},
		],
	},
	codebase: {
		git_repo: "https://github.com/warden-protocol/wardenprotocol",
		recommended_version: "v0.1.0",
		compatible_versions: ["v0.1.0"],
		cosmos_sdk_version: "0.50",
		consensus: {
			type: "cometbft",
			version: "0.38",
		},
		cosmwasm_enabled: false,
		genesis: {
			genesis_url:
				"https://raw.githubusercontent.com/warden-protocol/networks/main/testnet-alfama/genesis.json",
		},
		versions: [
			{
				name: "v0.1.0",
				recommended_version: "v0.1.0",
				compatible_versions: ["v0.1.0"],
				cosmos_sdk_version: "0.50",
				consensus: {
					type: "cometbft",
					version: "0.38",
				},
				cosmwasm_enabled: false,
			},
		],
	},
	apis: {
		rpc: [
			{
				address: env.rpcURL,
				provider: "Warden Protocol",
			},
		],
		rest: [
			{
				address: env.apiURL,
				provider: "Warden Protocol",
			},
		],
		grpc: [],
	},
	logo_URIs: {
		png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
	},
	keywords: ["local"],
	images: [
		{
			png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
		},
	],
};

export const wardenprotocolbuenavistaAssets: AssetList = {
	chain_name: "wardenprotocolbuenavista",
	assets: [
		{
			description: "The native token of Warden Protocol Testnet",
			denom_units: [
				{
					denom: "uward",
					exponent: 0,
				},
				{
					denom: "ward",
					exponent: 6,
				},
			],
			base: "uward",
			name: "Ward",
			display: "ward",
			symbol: "WARD",
			logo_URIs: {
				png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
				svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.svg",
			},
			images: [
				{
					png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.png",
					svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/wardenprotocol/images/ward.svg",
				},
			],
		},
	],
};
