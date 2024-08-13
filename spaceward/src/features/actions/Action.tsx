import { Button } from "@/components/ui/button";
import { TxMsgDetails } from "@/components/TxMsgDetails";
import { useAddressContext } from "@/hooks/useAddressContext";
import {
	Action as ActionModel,
	ActionStatus,
} from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action";
import AddressAvatar from "@/components/AddressAvatar";
import { Copy } from "@/components/ui/copy";
import { warden } from "@wardenprotocol/wardenjs";
import { useTx } from "@/hooks/useClient";
import { timestampToDate } from "@/lib/datetime";

export function Action({ action }: { action: ActionModel }) {
	const { address } = useAddressContext();
	const { tx } = useTx();
	const { approveAction } = warden.act.v1beta1.MessageComposer.withTypeUrl;

	if (!action.msg) {
		return <p>Missing action msg</p>;
	}

	const actionType = action.msg?.typeUrl;
	if (!actionType) {
		return <p>Missing action type</p>;
	}
	return (
		<div className="border-0 p-0 m-0 pt-4 bg-transparent">
			<div className="p-0 flex flex-col gap-4 lg:gap-0 lg:flex-row">
				<div className="grid overflow-scroll w-full lg:w-7/12 items-center gap-4">
					{action.msg ? <TxMsgDetails msg={action.msg} /> : null}
				</div>
				<div className="w-full lg:w-5/12 px-4 flex flex-col space-y-3">
					<span className="font-bold">Approvals</span>
					{action.approvers.map((approval) => {
						const date = timestampToDate(approval.approvedAt);
						const shortTime = new Intl.DateTimeFormat("en", {
							timeStyle: "short",
						});
						return (
							<div className="flex flex-row space-x-2 items-center">
								<div className="flex flex-col items-center">
									<AddressAvatar
										seed={approval.address || ""}
									/>
								</div>
								<div className="flex flex-col">
									<span>
										<Copy value={approval.address} split />
									</span>
									<span className="text-muted-foreground">
										{date.toLocaleDateString() +
											" " +
											shortTime.format(date)}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			{action.status === ActionStatus.ACTION_STATUS_PENDING ? (
				<div className="p-0 pt-6">
					<Button
						size={"sm"}
						onClick={async () => {
							tx(
								[
									approveAction({
										creator: address,
										actionId: action.id,
									}),
								],
								{},
							);
						}}
					>
						Approve
					</Button>
				</div>
			) : null}
		</div>
	);
}
