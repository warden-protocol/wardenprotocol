import { AddSpaceOwnerForm } from "@/features/owners";
import { useSpaceId } from "@/hooks/useSpaceId";
import { useAddressContext } from "@/hooks/useAddressContext";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { Space as SpaceModel } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import AddressAvatar from "@/components/AddressAvatar";
import { Copy } from "@/components/ui/copy";

export function OwnersPage() {
	const { spaceId } = useSpaceId();
	const { address } = useAddressContext();

	const client = useClient();
	const { toast } = useToast();
	const sendMsgRemoveSpaceOwner =
		client.WardenWardenV1Beta2.tx.sendMsgRemoveSpaceOwner;
	const { QuerySpaceById } = useWardenWardenV1Beta2();
	const wsQuery = QuerySpaceById({ id: spaceId }, {});
	const space = wsQuery.data?.space as Required<SpaceModel>;

	if (!space) {
		return <p>Space not found</p>;
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
										monitorTx(
											sendMsgRemoveSpaceOwner({
												value: {
													creator: address,
													spaceId: Number(spaceId),
													owner,
													btl: 0,
												},
											}),
											toast,
										);
									}}
								>
									Remove
								</Button>
							</div>
						))}
						<div className="group w-full overflow-scroll flex items-center justify-between">
							<AddSpaceOwnerForm
								addr={address}
								spaceId={spaceId || ""}
							/>
						</div>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
}
