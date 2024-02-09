import { keychains } from "@/client/identity";
import { useQuery } from "@tanstack/react-query";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import CardRow from "@/components/card-row";
import NewKeychainButton from "@/components/new-keychain-button";
import Address from "@/components/address";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ChooseKeychainButton from "@/components/choose-keychain-button";

function KeychainsPage() {
	const q = useQuery({ queryKey: ["keychains"], queryFn: () => keychains() });
	if (!q.data?.keychains) {
		return null;
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

				<NewKeychainButton />
			</div>

			<div className="space-y-6">
				{q.data?.keychains.map((kr) => (
					<Card key={kr.address}>
						<CardHeader>
							<CardTitle>Keychain {kr.address}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid w-full items-center gap-4">
								<CardRow label="Description">
									{kr.description}
								</CardRow>

								<CardRow label="Creator">
									<Address address={kr.creator} />
								</CardRow>

								<CardRow label="Active">
									{kr.isActive ? (
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
												<Address address={admin} />
											</li>
										))}
									</ul>
								</CardRow>

								<CardRow label="Parties">
									<ul>
										{kr.parties.map((p) => (
											<li key={p}>
												<Address address={p} />
											</li>
										))}
									</ul>
								</CardRow>
							</div>
						</CardContent>

						<CardFooter className="gap-4">
							{/* <ChooseKeychainButton keychainAddress={kr.address} /> */}

							<Link to={`/keychains/${kr.address}`}>
								<Button variant="secondary">
									Open details
								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}

export default KeychainsPage;
