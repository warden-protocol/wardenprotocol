import clsx from "clsx";
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import "./animate.css";
import { ActionVoteType } from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/action_vote";
import { usePublicClient, useWriteContract } from "wagmi";
import actPrecompileAbi from "@/contracts/actPrecompileAbi";
import { assertChain, handleContractWrite } from "@/utils/contract";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { PRECOMPILE_ACT_ADDRESS } from "@/contracts/constants";
import { ActionStatus, useActionsByAddress } from "@/hooks/query/act";
import { isAddressEqual } from "viem";
import { useQueryClient } from "@tanstack/react-query";

export default function ApproveSidebar() {
	const [open, setOpen] = useState(false);
	const [{ wallet }] = useConnectWallet();
	const address = wallet?.accounts[0].address;

	const { data, queryKey } = useActionsByAddress({
		request: {
			address,
			status: ActionStatus.Pending
		}
	});

	const { writeContractAsync } = useWriteContract();
	const client = usePublicClient();
	const queryClient = useQueryClient();
	const [{ chains, connectedChain }, setChain] = useSetChain();

	async function voteFor(actionId: bigint, voteType: ActionVoteType) {
		await assertChain(chains, connectedChain, setChain);

		await handleContractWrite(
			() => writeContractAsync({
				address: PRECOMPILE_ACT_ADDRESS,
				abi: actPrecompileAbi,
				functionName: "voteForAction",
				args: [actionId, voteType],
				account: address,
				connector: wallet?.wagmiConnector,
			}),
			client,
		);

		queryClient.invalidateQueries({ queryKey });
	}

	const actions = data?.actions.filter(
		action => !action.votes.find(
			vote => isAddressEqual(vote.participant, address ?? "0x")
		)
	);

	const hidden = !actions?.length;
	const action = actions?.[0];

	const title = action?.msg?.typeUrl
		?.replace(
			"/warden.warden.v1beta2.Msg",
			"",
		)
		.replace(
			"/warden.warden.v1beta3.Msg",
			"",
		)
		.replace(
			/([A-Z])/g,
			" $1",
		)
		.trim();

	return (
		<div
			className={clsx(
				"flex flex-col mx-2 p-3 rounded-lg bg-fill-quaternary relative select-none mb-2",
				{
					hidden,
					"border-progress": !hidden,
				},
			)}
		>
			<div>
				<Popover.Root open={!hidden && open} modal={true}
					onOpenChange={() => setOpen(v => !v)}
				>
					<div
						className={clsx("flex flex-col")}
					>
						<div className="flex items-center">
							<p className="text-lg font-semibold">{title}</p>
						</div>

						<p className="text-sm text-gray-500 mb-2">
							Awaiting your approval
						</p>
						{/* progress bar */}
						<Popover.Trigger asChild>
							<Button
								className={clsx(
									"flex items-center rounded-lg justify-center gap-2 h-10 font-semibold w-full duration-200 hover:text-background z-10",
									{
										"hover:bg-fill-accent-primary hover:text-background":
											true,
									},
									{
										"bg-fill-quaternary text-muted-foreground":
											false,
									},
								)}
							>
								View
							</Button>
						</Popover.Trigger>
					</div >
					<Popover.Portal>
						<Popover.Content
							side="left"
							sideOffset={20}
							className="p-0 select-none z-50"
						>
							<div className="flex flex-col p-2 w-96 bg-secondary m-2 rounded-lg border-border-edge border-2">
								<p className="text-lg font-semibold">{title}</p>
								<p className="text-sm text-gray-500">From {action?.creator.slice(0, 12)}...{action?.creator.slice(-8)}</p>
								<Button
									className="w-full flex items-center justify-center gap-2 rounded-lg my-2 font-semibold hover:text-background"
									onClick={() => {
										if (!action) {
											return;
										}

										voteFor(
											action.id,
											ActionVoteType.VOTE_TYPE_APPROVED,
										)
									}}
								>
									Approve
								</Button>
								<Button
									className="w-full flex items-center justify-center gap-2 rounded-lg bg-negative font-semibold text-primary hover:bg-destructive"
									onClick={() => {
										if (!action) {
											return;
										}

										voteFor(
											action.id,
											ActionVoteType.VOTE_TYPE_REJECTED,
										)
									}}
								>
									Reject
								</Button>
							</div>
						</Popover.Content>
					</Popover.Portal>
				</Popover.Root>
			</div>
		</div >
	);
}
