import { Intent as IntentModel } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/rest";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

export default function Intent({ intent }: { intent: IntentModel }) {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{intent.name}</CardTitle>
				<CardDescription>Intent #{intent.id}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid w-full items-center gap-4">
					<div className="flex flex-col space-y-1 overflow-x-scroll">
						<span className="text-sm font-bold">Definition</span>
						<pre>{intent.definition}</pre>
					</div>
				</div>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}
