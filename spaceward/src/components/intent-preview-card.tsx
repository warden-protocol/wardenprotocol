import { Card, CardDescription, CardHeader } from "./ui/card";
import Intent from "./intent";
import useWardenIntent from "@/hooks/useWardenIntent";

export default function IntentPreviewCard({ id }: { id: string }) {
	const { QueryIntentById } = useWardenIntent();
	const q = QueryIntentById(
		{ id },
		{ refetchInterval: Infinity, retry: false }
	);

	const idInt = parseInt(id, 10);

	if (idInt === 0) {
		return (
			<Card>
				<CardHeader>
					<CardDescription>Default intent applied</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	if (q.status === "loading") {
		return (
			<Card>
				<CardHeader>
					<CardDescription>Loading intent #{id}...</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	if (q.status === "error") {
		return (
			<Card>
				<CardHeader>
					<CardDescription>Error loading intent</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	if (!q.data?.intent) {
		return null;
	}

	return <Intent intent={q.data?.intent} />;
}
