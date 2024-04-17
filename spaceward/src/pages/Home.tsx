import { HomeApps, TotalAssetValue, HomeAssets } from "@/features/home";

export function HomePage() {
	return (
		<div className="flex flex-col flex-1 px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<TotalAssetValue />
			</div>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
				<div className="flex flex-col space-y-2">
					<span className="font-bold">Assets</span>
					<div className="rounded-xl bg-card w-full max-h-80 flex flex-col overflow-scroll no-scrollbar">
						<HomeAssets />
					</div>
				</div>
				<div className="flex flex-col space-y-2">
					<span className="font-bold">Pending actions</span>
					<div className="rounded-xl bg-card w-full h-full max-h-80 p-6 flex flex-col space-y-2 items-center place-content-center">
						<span className="text-muted-foreground">
							Section coming soon
						</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col space-y-2">
				<span className="font-bold">Top dApps</span>
				<HomeApps />
			</div>
		</div>
	);
}
