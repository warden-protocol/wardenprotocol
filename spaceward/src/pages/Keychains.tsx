import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardRow from "@/components/ui/card-row";
import AddressAvatar from "@/components/AddressAvatar";
import { useQueryHooks } from "@/hooks/useClient";

export function KeychainsPage() {
	const { useKeychains } = useQueryHooks();
	const q = useKeychains({});

	if (q.status === "loading") {
		return <div>Loading keychains...</div>;
	}

	const keychains = q.data?.keychains;
	if (!keychains || keychains.length === 0) {
		return (
			<div>
				<p>No keychains found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl">Keychains</h2>
					<p className="text-muted-foreground text-sm">
						A keychain is a trusted operator that holds your private
						keys.
					</p>
				</div>
			</div>
			<div className="space-y-6">
				{keychains.map((kc) => (
					<Card key={kc.id}>
						<CardHeader>
							<CardTitle>Keychain #{kc.id.toString()}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid w-full items-center gap-4">
								<CardRow label="Description">
									{kc.description}
								</CardRow>

								<CardRow label="Creator">
									<AddressAvatar seed={kc.creator} />
								</CardRow>

								<CardRow label="Admins">
									<ul>
										{kc.admins.map((admin) => (
											<li key={admin}>
												<AddressAvatar seed={admin} />
											</li>
										))}
									</ul>
								</CardRow>

								<CardRow label="Writers">
									<ul>
										{kc.writers.map((p) => (
											<li key={p}>
												<AddressAvatar seed={p} />
											</li>
										))}
									</ul>
								</CardRow>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
