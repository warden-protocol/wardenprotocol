import { useAddressContext } from "@/def-hooks/addressContext";
import Actions from "@/components/actions";

function ActionsPage() {
	const { address } = useAddressContext();
	if (!address) {
		return (
			<div className="px-6 mt-10">
				<h1 className="text-lg font-bold">Your actions</h1>
				<p>Connect your wallet to see your actions</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">Actions</h2>
				</div>
			</div>
			<div>
				<h3>
					TODO: Currently showing all actions, need to filter by space address
				</h3>
			</div>
			<Actions />
		</div>
	);
}

export default ActionsPage;
