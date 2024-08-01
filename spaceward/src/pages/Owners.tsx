import { useSpaceId } from "@/hooks/useSpaceId";
import { warden } from "@wardenprotocol/wardenjs";
import { useNewAction } from "@/hooks/useAction";
import { useQueryHooks } from "@/hooks/useClient";
import { useModalState } from "@/features/modals/state";
import { PlusIcon } from "lucide-react";
import OwnerCard from "@/features/owners/OwnerCard";

const { MsgRemoveSpaceOwner } = warden.warden.v1beta3;

export function OwnersPage() {
	const { spaceId } = useSpaceId();
	const { setData: setModal } = useModalState();

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
					<h2 className="text-5xl font-bold">Owners</h2>
				</div>
				{spaceId ? (
					<div className="!ml-auto flex items-center">
						<div
							className="flex items-center text-muted-foreground text-sm rounded-sm bg-fill-quaternary p-2 mr-4 cursor-pointer"
							onClick={setModal.bind(null, {
								type: "add-owner",
								params: {},
							})}
						>
							<PlusIcon className="h-4 w-4 mr-2" />
							Add new
						</div>
					</div>
				) : null}
			</div>
			<div className="h-full flex-1 flex-col space-y-8 flex">
				<div className="flex flex-row flex-wrap -mx-3 -mt-4">
					{space.owners.map((owner) => (
						<div
							className="flex basis-1/4 flex-grow-0 flex-shrink-0 p-4"
							key={owner}
						>
							<OwnerCard
								owner={owner}
								onRemove={() => {
									if (typeof window === "undefined") {
										return;
									}

									const confirmed =
										window.confirm("Are you sure?");

									if (!confirmed) {
										return;
									}

									removeOwner(owner);
								}}
							/>
						</div>
					))}
					<div className="flex basis-1/4 flex-grow-0 flex-shrink-0 p-4">
						<div
							className="rounded-xl h-60 w-full cursor-pointer flex flex-col bg-fill-quaternary"
							onClick={setModal.bind(null, {
								type: "add-owner",
								params: {},
							})}
						>
							<div className="flex items-center mx-6 mt-6">
								<p className="text-base font-semibold">
									New
									<br />
									Owner
								</p>
								<div className="ml-auto h-10 w-10 rounded-full bg-fill-quaternary flex justify-center items-center">
									<PlusIcon className="stroke-label-tertiary" />
								</div>
							</div>
							<div className="mt-auto mb-8 mx-6">
								<p className="text-muted-foreground hidden xl:block text-sm">
									With default rules, owners will be able to
									perform actions such as adding other owners
									or signing transactions.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
