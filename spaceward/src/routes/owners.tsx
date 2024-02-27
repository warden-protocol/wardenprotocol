import AddSpaceOwnerForm from "@/components/add-space-owner-form";
import { useSpaceAddress } from "@/hooks/useSpaceAddress";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import useWardenWarden from "@/hooks/useWardenWarden";
import { Space as SpaceModel } from "wardenprotocol-warden-client-ts/lib/warden.warden/rest";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import AddressAvatar from "@/components/address-avatar";

function Owners() {
	const { spaceAddress } = useSpaceAddress();
	const { address } = useAddressContext();

	const client = useClient();
	const toast = useToast();
	const sendMsgRemoveSpaceOwner =
		client.WardenWarden.tx.sendMsgRemoveSpaceOwner;
	const { QuerySpaceByAddress } = useWardenWarden();
	const wsQuery = QuerySpaceByAddress({ address: spaceAddress }, {});
	const space = wsQuery.data?.space as Required<SpaceModel>;

	if (!space) {
		return (
			<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">
							Space {spaceAddress} not found
						</h2>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">Owners</h2>
					<p className="text-muted-foreground">
						With default intents, owners will be able to perform
						actions such as adding other owners or signing
						transactions.
					</p>
				</div>
			</div>
			<div>
				<div className="grid w-full items-center gap-4">
					<div className="flex flex-col">
						{space.owners.map((owner) => (
							<div
								key={owner}
								className="group w-full flex items-center justify-between first:rounded-t-lg border border-b-0 px-4 py-4 border-t overflow-clip last:border-b hover:bg-card"
							>
								<div className="flex flex-row space-x-4 items-center">
									<AddressAvatar
										seed={owner || ""}
										disableTooltip
									/>
									<span>{owner}</span>
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
													spaceAddress,
													owner,
													btl: 0,
												},
											}),
											toast
										);
									}}
								>
									Remove
								</Button>
							</div>
						))}
						<div className="group w-full flex items-center justify-between px-4 py-4 border rounded-b-lg">
							<AddSpaceOwnerForm
								addr={address}
								spaceAddr={spaceAddress}
							/>
						</div>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
}

export default Owners;
