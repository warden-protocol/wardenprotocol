import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

const apps = [
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
		name: "Aave",
		url: "https://staging.aave.com/",
		logo: "/logos/aave.svg",
		description: "Earn interest, borrow assets, and build applications.",
	},
];

function HomeApps() {
	return (
		<div className="grid grid-cols-3 gap-4">
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

export default HomeApps;
