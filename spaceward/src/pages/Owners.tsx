import { useSpaceId } from "@/hooks/useSpaceId";
import { useModalState } from "@/features/modals/state";
import { PlusIcon } from "lucide-react";
import OwnerCard from "@/features/owners/OwnerCard";
import { useActionHandler } from "@/features/actions/hooks";
import { PRECOMPILE_WARDEN_ADDRESS } from "@/contracts/constants";
import wardenPrecompileAbi from "@/contracts/wardenPrecompileAbi";
import { isAddress } from "viem";
import { useSpaceById } from "@/hooks/query/warden";

export function OwnersPage() {
	const { spaceId } = useSpaceId();
	const { setData: setModal } = useModalState();

	const { add: removeSpaceOwner, expectedApproveExpression, expectedRejectExpression } = useActionHandler(
		PRECOMPILE_WARDEN_ADDRESS,
		wardenPrecompileAbi,
		"removeSpaceOwner"
	);

	const q = useSpaceById({
		request: { id: BigInt(spaceId || "") },
	});

	if (q.status === "loading") {
		return <div>Loading...</div>;
	}

	const space = q.data;

	if (!space) {
		return <p>Space not found</p>;
	}

	async function removeOwner(owner: string) {
		if (!space) {
			throw new Error("Space not found");
		}

		if (!isAddress(owner)) {
			throw new Error("Invalid owner address");
		}

		await removeSpaceOwner([
			space.id,
			owner,
			space.nonce,
			BigInt(0),
			expectedApproveExpression,
			expectedRejectExpression,
		], {
			title: "Remove owner",
		});
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl font-bold !tracking-[0.24px]">
						Owners
					</h2>
				</div>
				{spaceId ? (
					<div className="!ml-auto flex items-center">
						<div
							className="flex items-center text-label-primary text-base font-semibold capitalize rounded-sm bg-fill-quaternary p-2 mr-4 cursor-pointer"
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
					{space.owners.map((owner) => {
						return (
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
						)
					})}
					<div className="flex basis-1/4 flex-grow-0 flex-shrink-0 p-4">
						<div
							className="rounded-xl border-[1px] border-solid border-border-edge h-60 w-full cursor-pointer flex flex-col bg-secondary"
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
								<p className="text-label-secondary hidden xl:block text-xs">
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
