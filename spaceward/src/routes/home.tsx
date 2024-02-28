import Apps from "@/components/apps";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";
import NoActiveSpace from "@/components/no-active-space";

function Home() {
	const { spaceAddress } = useSpaceAddress();

	if (!spaceAddress) {
		return <NoActiveSpace />;
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<p className="text-muted-foreground">Total asset value</p>
					<span className="text-4xl font-bold">$243.00</span>
				</div>
				<div></div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="flex flex-col space-y-2">
					<span className="font-bold">Keys</span>
					<div className="border rounded-xl bg-card w-full h-64 p-6 flex flex-col space-y-2 items-center place-content-center">
						<span className="text-muted-foreground">
							Section coming soon
						</span>
					</div>
				</div>
				<div className="flex flex-col space-y-2">
					<span className="font-bold">Pending actions</span>
					<div className="border rounded-xl bg-card w-full h-64 p-6 flex flex-col space-y-2 items-center place-content-center">
						<span className="text-muted-foreground">
							Section coming soon
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col space-y-2">
				<span className="font-bold">Top Apps</span>
				<Apps />
			</div>
		</div>
	);
}

export default Home;
