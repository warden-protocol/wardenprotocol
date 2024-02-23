import Intents from "@/components/intents";
import NewIntentButton from "@/components/new-intent-button";

function IntentsPage() {
	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">Intents</h2>
					<p className="text-muted-foreground">
						Discover all the intents that have been created on
						Warden Protocol.
					</p>
				</div>
				<div>
					<NewIntentButton />
				</div>
			</div>
			<Intents />
		</div>
	);
}

export default IntentsPage;
