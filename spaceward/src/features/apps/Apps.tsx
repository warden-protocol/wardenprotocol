import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";

const apps = [
	// {
	// 	name: "Marginly",
	// 	url: "https://app.marginly.com/blastSepolia",
	// 	logo: "/logos/marginly.svg",
	// 	description:
	// 		"Marginly is a decentralized protocol that enables the creation of synthetic assets.",
	// },
	{
		name: "UniSwap",
		url: "https://app.uniswap.org/swap?chain=sepolia",
		logo: "/logos/uniswap.svg",
		description:
			"UniSwap is a decentralized finance protocol that is used to exchange cryptocurrencies.",
	},
	{
		name: "Squid",
		url: "https://testnet.app.squidrouter.com/",
		logo: "/logos/squid.svg",
		description:
			"Squid allows any token to be swapped between blockchains, and unlocks access to apps across chains in a single click.",
	},
	{
		name: "PancakeSwap",
		url: "https://pancakeswap.finance/swap?chain=sepolia",
		logo: "/logos/pancakeswap.svg",
		description:
			"Trade, earn, and own crypto on the all-in-one multichain DEX.",
	},
	// {
	// 	name: "Aave",
	// 	url: "https://app.aave.com/",
	// 	logo: "/logos/aave.svg",
	// 	description: "Earn interest, borrow assets, and build applications.",
	// },

	// {
	// 	name: "Lyra",
	// 	url: "https://gov.lyra.finance/",
	// 	logo: "/logos/lyra.svg",
	// 	description:
	// 		"Lyra is a decentralized protocol that enables the creation of synthetic assets.",
	// },
	{
		name: "Bitbond",
		url: "https://tokentool.bitbond.com/",
		// logo: "/logos/bitbond.svg",
		description:
			"Create, manage and distribute tokens effortlessly across leading EVM chains.",
	},
	// {
	// 	name: "Maple Finance",
	// 	url: "https://app.sepolia.eth.maple.finance",
	// 	logo: "/logos/maple.svg",
	// 	description: "Decentralised corporate credit market.",
	// },
	// {
	// 	name: "1inch",
	// 	url: "https://app.1inch.io/",
	// 	logo: "/logos/1inch.svg",
	// 	description:
	// 		"1inch is a decentralized exchange aggregator that sources liquidity from various exchanges and is capable of splitting a single trade transaction across multiple DEXs.",
	// },
	// {
	// 	name: "WC React App",
	// 	url: "https://react-app.walletconnect.com/",
	// 	logo: "/logos/walletconnect.svg",
	// 	description:
	// 		"Website for testing WalletConnect integrations with React.",
	// },
	// {
	// 	name: "Aave",
	// 	url: "https://staging.aave.com/",
	// 	// logo: "/logos/aave.svg",
	// 	description: "Earn interest, borrow assets, and build applications.",
	// },

	{
		name: "CowSwap",
		url: "https://swap.cow.fi/#/11155111/swap/ETH",
		// logo: "/logos/cowswap.svg",
		description:
			"CoW Protocol finds the lowest price for your trade across all exchanges and aggregators.",
	},
	// {
	// 	name: "OpenSea",
	// 	url: "https://testnets.opensea.io/",
	// 	logo: "/logos/opensea.svg",
	// 	description:
	// 		"OpenSea is a peer-to-peer marketplace for rare digital items and crypto collectibles.",
	// },
	// {
	// 	name: "Splits",
	// 	url: "https://app.splits.org/accounts/?chainId=11155111",
	// 	// logo: "/logos/splits.svg",
	// 	description: "Splits makes onchain payments easy.",
	// },
	// {
	// 	name: "Castle",
	// 	url: "https://castle.link/portfolio/new",
	// 	// logo: "/logos/castle.svg",
	// 	description:
	// 		"From secure wallets to seamless trading, grow your portfolio with ease.",
	// },
	// {
	// 	name: "Fractal",
	// 	url: "https://app.fractalframework.xyz/create",
	// 	// logo: "/logos/fractal.svg",
	// 	description:
	// 		"Fractal extends Safe treasuries into on-chain hierarchies of permissions, token flows, and governance.",
	// },
	{
		name: "Hedgy",
		url: "https://app.hedgey.finance/",
		// logo: "/logos/hedgy.svg",
		description:
			"Token vesting, lockups, grants and distributions for your team, investors and community.",
	},
	// {
	// 	name: "Parcel",
	// 	url: "https://v3.parcel.money/",
	// 	logo: "/logos/parcel.svg",
	// 	description: "Payroll and payments for onchain orgs.",
	// },
	// {
	// 	name: "Sablier",
	// 	url: "https://app.sablier.com/",
	// 	// logo: "/logos/sablier.svg",
	// 	description:
	// 		"Infrastructure for money streaming and token distribution.",
	// },
];

export function Apps() {
	return (
		<div className="grid xl:grid-cols-3 gap-4">
			{apps.map((app) => (
				<Link to={`/apps/open?url=${app.url}`}>
					<div className="border relative bg-card rounded-xl w-full p-6 flex flex-col space-y-1 hover:ring-foreground hover:ring-2 flex-grow h-full">
						{app.logo && (
							<div>
								<img
									src={app.logo}
									alt={app.name}
									className="w-16 h-16"
								/>
							</div>
						)}
						<span className="text-lg font-bold pt-2">
							{app.name}
						</span>
						<span className="text-sm text-muted-foreground">
							{app.description}
						</span>
						<Badge className="absolute top-4 right-4">EVM</Badge>
					</div>
				</Link>
			))}
		</div>
	);
}
