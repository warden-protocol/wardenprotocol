import { AddSpaceOwnerForm } from "@/features/owners";
import { useSpaceId } from "@/hooks/useSpaceId";
import { Button } from "@/components/ui/button";
import AddressAvatar from "@/components/AddressAvatar";
import { Copy } from "@/components/ui/copy";
import { warden } from "@wardenprotocol/wardenjs";
import { useNewAction } from "@/hooks/useAction";
import { useQueryHooks } from "@/hooks/useClient";

const { MsgRemoveSpaceOwner } = warden.warden.v1beta3;

export function OwnersPage() {
	const { spaceId } = useSpaceId();

	const { newAction, authority } = useNewAction(MsgRemoveSpaceOwner);

	const { useSpaceById } = useQueryHooks();
	const q = useSpaceById({ request: { id: BigInt(spaceId || "") } });

	if (q.status === "loading") {
		return <div>Loading...</div>;
	}

	const space = q.data?.space;
	if (!space) {
		return <p>Space not found</p>;
	}

	async function removeOwner(owner: string) {
		if (!spaceId) return;
		if (!authority) return;
		await newAction(
			{
				owner,
				spaceId: BigInt(spaceId),
				authority,
			},
			{},
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl">Owners</h2>
					<p className="text-muted-foreground hidden xl:block text-sm">
						With default intents, owners will be able to perform
						actions such as adding other owners or signing
						transactions.
					</p>
				</div>
			</div>
			<div>
				<div className="w-full items-center bg-card rounded-xl p-4">
					<div className="flex flex-col space-y-4">
						{space.owners.map((owner) => (
							<div
								key={owner}
								className="group w-full flex items-center justify-between bg-background rounded-lg p-4 overflow-scroll"
							>
								<div className="flex flex-row space-x-4 items-center">
									<AddressAvatar
										seed={owner || ""}
										disableTooltip
									/>
									<span>
										<Copy value={owner} split />
									</span>
								</div>

								<Button
									variant="destructive"
									size={"sm"}
									className="opacity-40 group-hover:opacity-100"
									onClick={() => {
										removeOwner(owner);
									}}
								>
									Remove
								</Button>
							</div>
						))}
						<div className="group w-full overflow-scroll flex items-center justify-between">
							<AddSpaceOwnerForm spaceId={spaceId || ""} />
						</div>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
}
