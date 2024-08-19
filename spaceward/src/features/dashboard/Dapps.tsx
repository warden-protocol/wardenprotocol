import { Link } from "react-router-dom";

export default function DappsDashboard() {
	return (
		<div>
			<div className="py-5 px-6 border-[1px] border-bg-secondary rounded-2xl">
				<div className="flex justify-between items-center gap-2 mb-3">
					<div className="font-bold text-2xl flex items-center justify-between tracking-[0.12px]">
						Top dApps
					</div>
					<Link
						to="/apps"
						className="font-semibold text-muted-foreground"
					>
						See All
					</Link>
				</div>

				<Link
					to="/apps/open?url=https://app.uniswap.org/swap?chain=sepolia"
					className="flex items-center rounded-lg p-3 ease-out duration-300 gap-3 hover:bg-background cursor-pointer"
				>
					<img
						className="w-10 h-10 object-cover overflow-hidden rounded-[10px]"
						src="/images/uniswap.jpg"
						alt=""
					/>
					<div>
						<div>Uniswap</div>
						<div className="text-xs text-muted-foreground">
						The most popular DEX
					</div>
					</div>
				</Link>

				<Link
					to="/apps/open?url=https://testnet.app.squidrouter.com/"
					className="flex items-center rounded-lg p-3 ease-out duration-300 gap-3 hover:bg-background cursor-pointer"
				>
					<img
						className="w-10 h-10 object-cover overflow-hidden rounded-[10px]"
						src="/images/squid.jpg"
						alt=""
					/>
					<div>
						<div>Squid</div>
						<div className="text-xs text-muted-foreground">
						Cross-chain DEX
					</div>
					</div>
				</Link>

				<Link
					to="/apps/open?url=https://testnet.osmosis.zone/?to=OSMO&from=ATOM"
					className="flex items-center rounded-lg p-3 ease-out duration-300 gap-3 hover:bg-background cursor-pointer"
				>
					<img
						className="w-10 h-10 object-cover overflow-hidden rounded-[10px]"
						src="/images/osmosis.png"
						alt=""
					/>
					<div>
						<div>Osmosis</div>
						<div className="text-xs text-muted-foreground">
						The premier DEX
					</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
