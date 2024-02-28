import { Link } from "react-router-dom";

const apps = [
	{
		name: "Squid",
		url: "https://testnet.app.squidrouter.com/",
		logo: "/logos/squid.svg",
		description:
			"Squid allows any token to be swapped between blockchains, and unlocks access to apps across chains in a single click.",
	},
	{
		name: "UniSwap",
		url: "https://app.uniswap.org/swap?chain=sepolia",
		logo: "/logos/uniswap.svg",
		description:
			"UniSwap is a decentralized finance protocol that is used to exchange cryptocurrencies.",
	},
	// {
	// 	name: "Lyra",
	// 	url: "https://gov.lyra.finance/",
	// 	logo: "/logos/lyra.svg",
	// 	description:
	// 		"Lyra is a decentralized protocol that enables the creation of synthetic assets.",
	// },
	// {
	// 	name: "Bitbond",
	// 	url: "https://tokentool.bitbond.com/",
	// 	logo: "/logos/bitbond.svg",
	// 	description:
	// 		"Create, manage and distribute tokens effortlessly across leading EVM chains.",
	// },
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
	{
		name: "WC React App",
		url: "https://react-app.walletconnect.com/",
		logo: "/logos/walletconnect.svg",
		description:
			"Website for testing WalletConnect integrations with React.",
	},
];

function Apps() {
	return (
		<div className="grid grid-cols-3 gap-4">
			{apps.map((app) => (
				<Link to={`/apps/open?url=${app.url}`}>
					<div className="border bg-card rounded-xl w-full p-6 flex flex-col space-y-1 hover:ring-foreground hover:ring-2 flex-grow h-full">
						<div>
							<img
								src={app.logo}
								alt={app.name}
								className="w-16 h-16"
							/>
						</div>
						<span className="text-lg font-bold pt-2">
							{app.name}
						</span>
						<span className="text-sm text-muted-foreground">
							{app.description}
						</span>
					</div>
				</Link>
			))}
		</div>
	);
}

export default Apps;
