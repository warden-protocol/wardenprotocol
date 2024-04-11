import { Button } from "../../components/ui/button";
import { TxMsgDetails } from "../../components/tx-msg-details";
import { useAddressContext } from "@/hooks/useAddressContext";
import {
	ActionStatus,
	Action as ActionModel,
} from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/rest";
import { useClient } from "@/hooks/useClient";
import { useToast } from "../../components/ui/use-toast";
import { monitorTx } from "@/hooks/keplr";
import AddressAvatar from "../../components/address-avatar";

export function Action({ action }: { action: Required<ActionModel> }) {
	const { address } = useAddressContext();
	const toast = useToast();
	const client = useClient();
	const sendMsgApproveAction = client.WardenIntent.tx.sendMsgApproveAction;

	if (!action.msg) {
		return <p>Missing action msg</p>;
	}

	const actionType = action.msg["@type"];
	if (!actionType) {
		return <p>Missing action type</p>;
	}
	return (
		<div className="border-0 p-0 m-0 pt-4 bg-transparent">
			<div className="p-0 flex flex-row">
				<div className="grid w-7/12 items-center gap-4 border-r">
					{action.msg ? (
						<TxMsgDetails msg={action.msg as any} />
					) : null}
				</div>
				<div className="w-5/12 px-4 flex flex-col space-y-3">
					<span className="font-bold">Approvals</span>
					{action.approvers.map((approval) => {
						const date = approval.approved_at
							? new Date(approval.approved_at)
							: "";
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
									<span>{approval.address}</span>
									<span className="text-muted-foreground">
										{date !== "" &&
											date.toLocaleDateString() +
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
							monitorTx(
								sendMsgApproveAction({
									value: {
										creator: address,
										actionType,
										actionId: parseInt(action.id, 10),
										intentPayload: undefined,
									},
								}),
								toast,
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
