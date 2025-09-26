import { Actions } from "@/features/actions";
import { useConnectWallet } from "@web3-onboard/react";

export function ActionsPage() {
	const [{ wallet }] = useConnectWallet();
	const address = wallet?.accounts[0].address;

	if (!address) {
		return (
			<div className="px-4 mt-10">
				<h1 className="text-lg font-bold">Your actions</h1>
				<p>Connect your wallet to see your actions</p>
			</div>
		);
	}
	return (
		<div className="flex flex-col flex-1 px-8 py-4 space-y-8 overflow-x-auto">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl font-sans font-bold">Actions</h2>
				</div>
			</div>
			<Actions />
		</div>
	);
}
