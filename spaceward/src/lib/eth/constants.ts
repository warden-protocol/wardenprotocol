// taken from https://chainlist.org
export const ETH_CHAIN_CONFIG: Record<
	string,
	{ rpc: string[]; token?: string }
> = {
	"1": { rpc: ["https://cloudflare-eth.com", "https://eth.llamarpc.com"] },
	"5": { rpc: ["https://rpc.goerli.mudit.blog/"] },
	"10": {
		rpc: ["https://mainnet.optimism.io/", "https://optimism.llamarpc.com"],
	},
	"56": {
		rpc: [
			"https://bsc-dataseed1.bnbchain.org",
			"https://binance.llamarpc.com",
		],
		token: "BNB",
	},
	"137": {
		rpc: ["https://polygon-rpc.com/", "https://polygon.llamarpc.com"],
	},
	"324": { rpc: ["https://mainnet.era.zksync.io/"] },
	"420": { rpc: ["https://goerli.optimism.io"] },
	"8453": { rpc: ["https://mainnet.base.org/", "https://base.llamarpc.com"] },
	"42161": {
		rpc: ["https://arb1.arbitrum.io/rpc", "https://arbitrum.llamarpc.com"],
	},
	"42220": { rpc: ["https://forno.celo.org"] },
	"43114": { rpc: ["https://api.avax.network/ext/bc/C/rpc"] },
	"44787": { rpc: ["https://alfajores-forno.celo-testnet.org"] },
	"80001": { rpc: ["https://rpc-mumbai.maticvigil.com"] },
	"81457": { rpc: ["https://rpc.blast.io/"] },
	"421613": { rpc: ["https://goerli-rollup.arbitrum.io/rpc"] },
	"7777777": { rpc: ["https://rpc.zora.energy/"] },
	"11155111": {
		rpc: [
			"https://ethereum-sepolia.rpc.subquery.network/public",
			"https://rpc.sepolia.org/",
			"https://ethereum-sepolia.blockpi.network/v1/rpc/public",
			"https://sepolia.gateway.tenderly.co",
		],
	},
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
