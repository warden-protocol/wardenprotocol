import { Link } from "react-router-dom";

function Apps() {
	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">Apps</h2>
					<p className="text-muted-foreground"></p>
				</div>
			</div>
			<div className="grid gap-6 grid-cols-3">
				<div className="border rounded-xl p-6">
					<Link to="/apps/open?url=https://react-app.walletconnect.com/">
						<h3 className="text-xl">WC React App</h3>
					</Link>
				</div>
				<div className="border rounded-xl p-6">
					<Link to="/apps/open?url=https://testnet.app.squidrouter.com/">
						<h3 className="text-xl">Squid</h3>
					</Link>
				</div>
				<div className="border rounded-xl p-6">
					<Link to="/apps/open?url=https://app.uniswap.org/">
						<h3 className="text-xl">UniSwap</h3>
					</Link>
				</div>
				<div className="border rounded-xl p-6">
					<Link to="/apps/open?url=https://gov.lyra.finance/">
						<h3 className="text-xl">Lyra</h3>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Apps;
