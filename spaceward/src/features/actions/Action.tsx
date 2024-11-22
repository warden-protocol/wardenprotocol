import { Button } from "@/components/ui/button";
import { TxMsgDetails } from "@/components/TxMsgDetails";
import AddressAvatar from "@/components/AddressAvatar";
import { Copy } from "@/components/ui/copy";
import { timestampToDate } from "@/lib/datetime";
import { ActionVoteType } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action_vote";
import { createHumanReadableCondition } from "@/utils/shield";
import { usePublicClient, useWriteContract } from "wagmi";
import actPrecompileAbi from "@/contracts/actPrecompileAbi";
import { assertChain, handleContractWrite } from "@/utils/contract";
import { PRECOMPILE_ACT_ADDRESS } from "@/contracts/constants";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ActionModel } from "@/hooks/query/types";
import { fromBytes, isAddressEqual, toBytes } from "viem";
import { ActionStatus } from "@/hooks/query/act";
import { fromBech32 } from "@cosmjs/encoding";
import { QueryKey, useQueryClient } from "@tanstack/react-query";

export function Action({ action, queryKey }: { action: ActionModel, queryKey: QueryKey }) {
	const [{ wallet }] = useConnectWallet();
	const address = wallet?.accounts[0].address;
	const { writeContractAsync } = useWriteContract();
	const client = usePublicClient();
	const queryClient = useQueryClient();
	const [{ chains, connectedChain }, setChain] = useSetChain();

	async function voteFor(voteType: ActionVoteType) {
		await assertChain(chains, connectedChain, setChain);

		await handleContractWrite(
			() => writeContractAsync({
				address: PRECOMPILE_ACT_ADDRESS,
				abi: actPrecompileAbi,
				functionName: "voteForAction",
				args: [action.id, voteType],
				account: address,
				connector: wallet?.wagmiConnector,
			}),
			client,
		);

		queryClient.invalidateQueries({ queryKey });
	}

	if (!action.msg) {
		return <p>Missing action msg</p>;
	}

	const actionType = action.msg?.typeUrl;

	if (!actionType) {
		return <p>Missing action type</p>;
	}

	const approveParsed = createHumanReadableCondition(action.approveExpression);
	const rejectParsed = createHumanReadableCondition(action.rejectExpression);
	const vote = action.votes.find(v => isAddressEqual(v.participant, address ?? "0x"));

	return (
		<div className="border-0 p-0 m-0 pt-4 bg-transparent">
			<div className="p-0 flex flex-col flex-wrap gap-4 lg:gap-0 lg:flex-row">
				<div className="grid overflow-scroll basis-1/2 items-center gap-4">
					{action.msg ? <TxMsgDetails msg={{ typeUrl: action.msg.typeUrl, value: toBytes(action.msg.value) }} /> : null}
				</div>
				<div className="w-full basis-1/2 px-4 flex flex-col space-y-3">
					<span className="font-bold">Votes</span>
					{action.votes.map((vote) => {
						const date = timestampToDate(vote.votedAt);
						const shortTime = new Intl.DateTimeFormat("en", { timeStyle: "short" });

						return (
							<div
								className="flex flex-row space-x-2 items-center"
								key={vote.participant}
							>
								<div className="flex flex-col items-center">
									<AddressAvatar seed={vote.participant || ""} />
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
								{Object.values(approveParsed.references).map(_adr => {
									const adr = fromBytes(fromBech32(_adr).data, "hex");

									return (
										<span
											className="mr-2 text-sm text-muted-foreground"
											key={adr}
										>
											{adr.slice(0, 8)}...{adr.slice(-8)}
										</span>
									);
								})}
							</p>
							<p className="font-bold ml-auto basis-2/5 flex-grow-0 flex-shrink-0 break-words">{approveParsed.code}</p>
						</div>
						<div className="flex flex-row w-full">
							<p className="font-semibold basis-3/5 flex-grow-0 flex-shrink-0 break-words">Rejected by<br />
								{Object.values(rejectParsed.references).map(_adr => {
									const adr = fromBytes(fromBech32(_adr).data, "hex");

									return (
										<span
											className="mr-2 text-sm text-muted-foreground"
											key={adr}
										>
											{adr.slice(0, 8)}...{adr.slice(-8)}
										</span>
									);
								})}
							</p>
							<p className="font-bold ml-auto basis-2/5 flex-grow-0 flex-shrink-0 break-words">{rejectParsed.code}</p>
						</div>
					</div>
				</div>
			</div>
			{action.status === ActionStatus.Pending ? (
				<div className="mx-4 pt-6 px-2">
					<Button
						className="rounded-lg"
						size={"default"}
						disabled={vote?.voteType === ActionVoteType.VOTE_TYPE_APPROVED}
						onClick={async () => {
							await voteFor(ActionVoteType.VOTE_TYPE_APPROVED);
						}}
					>
						Approve
					</Button>

					<Button
						className="ml-2 rounded-lg"
						disabled={vote?.voteType === ActionVoteType.VOTE_TYPE_REJECTED}
						size={"default"}
						variant={"destructive"}
						onClick={async () => {
							await voteFor(ActionVoteType.VOTE_TYPE_REJECTED);
						}}
					>
						Reject
					</Button>
				</div>
			) : null}
		</div>
	);
}
