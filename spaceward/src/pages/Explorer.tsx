import { Explorer } from "@/features/explorer";

export function ExplorerPage() {
	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl font-sans font-bold">Explorer</h2>
					<p className="text-muted-foreground text-sm">
						Information about the current state of Warden Protocol
					</p>
				</div>
			</div>
			<Explorer />
		</div>
	);
}
