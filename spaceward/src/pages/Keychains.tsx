import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardRow from "@/components/ui/card-row";
import AddressAvatar from "@/components/AddressAvatar";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { Keychain } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";

export function KeychainsPage() {
	const { QueryKeychains } = useWardenWardenV1Beta2();
	const q = QueryKeychains({}, {}, 10);

	if (q.status === "loading") {
		return <div>Loading keychains...</div>;
	}

	const keychains = (q.data?.pages.flatMap((p) => p.keychains || []) ||
		[]) as Required<Keychain>[];
	if (keychains.length === 0) {
		return (
			<div>
				<p>No keychains found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">Keychains</h2>
					<p className="text-muted-foreground">
						A keychain is a trusted party that holds your private
						keys.
					</p>
				</div>
			</div>
			<div className="space-y-6">
				{keychains.map((kr) => (
					<Card key={kr.id}>
						<CardHeader>
							<CardTitle>Keychain #{kr.id}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid w-full items-center gap-4">
								<CardRow label="Description">
									{kr.description}
								</CardRow>

								<CardRow label="Creator">
									<AddressAvatar seed={kr.creator} />
								</CardRow>

								<CardRow label="Active">
									{kr.is_active ? (
										<span className="font-bold text-green-600">
											Active
										</span>
									) : (
										"Inactive"
									)}
								</CardRow>

								<CardRow label="Admins">
									<ul>
										{kr.admins.map((admin) => (
											<li key={admin}>
												<AddressAvatar seed={admin} />
											</li>
										))}
									</ul>
								</CardRow>

								<CardRow label="Parties">
									<ul>
										{kr.parties.map((p) => (
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
