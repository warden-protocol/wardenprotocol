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
import { ActionVoteType } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action_vote";
import { createHumanReadableCondition } from "@/utils/shield";

export function Action({ action }: { action: ActionModel }) {
	const { address } = useAddressContext();
	const { tx } = useTx();
	const { voteForAction: approveAction } = warden.act.v1beta1.MessageComposer.withTypeUrl;

	if (!action.msg) {
		return <p>Missing action msg</p>;
	}

	const actionType = action.msg?.typeUrl;

	if (!actionType) {
		return <p>Missing action type</p>;
	}

	const approveParsed = createHumanReadableCondition(action.approveExpression);
	const rejectParsed = createHumanReadableCondition(action.rejectExpression);

	return (
		<div className="border-0 p-0 m-0 pt-4 bg-transparent">
			<div className="p-0 flex flex-col flex-wrap gap-4 lg:gap-0 lg:flex-row">
				<div className="grid overflow-scroll basis-1/2 items-center gap-4">
					{action.msg ? <TxMsgDetails msg={action.msg} /> : null}
				</div>
				<div className="w-full basis-1/2 px-4 flex flex-col space-y-3">
					<span className="font-bold">Votes</span>
					{action.votes.map((vote) => {
						const date = timestampToDate(vote.votedAt);
						const shortTime = new Intl.DateTimeFormat("en", {
							timeStyle: "short",
						});
						return (
							<div className="flex flex-row space-x-2 items-center">
								<div className="flex flex-col items-center">
									<AddressAvatar
										seed={vote.participant || ""}
									/>
								</div>
								<div className="flex flex-col">
									<span>
										<Copy value={vote.participant} split />
									</span>
									<span className="text-muted-foreground">
										{date.toLocaleDateString() +
											" " +
											shortTime.format(date)}
									</span>
									<span className="text-muted-foreground">
										{vote.voteType === ActionVoteType.VOTE_TYPE_APPROVED ? "Approved" : "Rejected"}
									</span>

								</div>
							</div>
						);
					})}
				</div>
				<div className="basis-1/2 mx-4 p-2">
					<div className="flex flex-col w-full">
						<p className="font-bold text-2xl mb-2">Rule</p>
						<div className="flex flex-row w-full mb-2">
							<p className="font-semibold basis-3/5 flex-grow-0 flex-shrink-0 break-words">Approved by<br />
								{Object.values(approveParsed.references).map(adr => <span className="mr-2 text-sm text-muted-foreground" key={adr}>{adr.slice(0, 8)}...{adr.slice(-8)} </span>)}
							</p>
							<p className="font-bold ml-auto basis-2/5 flex-grow-0 flex-shrink-0 break-words">{approveParsed.code}</p>
						</div>
						<div className="flex flex-row w-full">
							<p className="font-semibold basis-3/5 flex-grow-0 flex-shrink-0 break-words">Rejected by<br />
								{Object.values(rejectParsed.references).map(adr => <span className="mr-2 text-sm text-muted-foreground" key={adr}>{adr.slice(0, 8)}...{adr.slice(-8)} </span>)}
							</p>
							<p className="font-bold ml-auto basis-2/5 flex-grow-0 flex-shrink-0 break-words">{rejectParsed.code}</p>
						</div>
					</div>
				</div>
			</div>
			{action.status === ActionStatus.ACTION_STATUS_PENDING ? (
				<div className="mx-4 pt-6 px-2">
					<Button
						className="rounded-lg"
						size={"default"}
						disabled={action.votes.some((vote) => vote.participant === address && vote.voteType === ActionVoteType.VOTE_TYPE_APPROVED)}
						onClick={async () => {
							tx(
								[
									approveAction({
										participant: address,
										voteType: ActionVoteType.VOTE_TYPE_APPROVED,
										actionId: action.id,
									}),
								],
								{},
							);
						}}
					>
						Approve
					</Button>

					<Button
						className="ml-2 rounded-lg"
						disabled={action.votes.some((vote) => vote.participant === address && vote.voteType === ActionVoteType.VOTE_TYPE_REJECTED)}
						size={"default"}
						variant={"destructive"}
						onClick={async () => {
							tx(
								[
									approveAction({
										participant: address,
										voteType: ActionVoteType.VOTE_TYPE_REJECTED,
										actionId: action.id,
									}),
								],
								{},
							);
						}}
					>
						Reject
					</Button>
				</div>
			) : null}
		</div>
	);
}
