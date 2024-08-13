import { Icons } from "@/components/ui/icons-assets";
import StakingCard from "@/features/dashboard/StakingCard";
import { useStakingQueries } from "@/features/staking/hooks";
import { getDelegationsData, getValidatorData } from "@/features/staking/util";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useQueryHooks } from "@/hooks/useClient";
import { ProposalStatus } from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";
import { LoaderCircle } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function GovernanceDashboard() {
	const { address } = useAddressContext();
	const { queryTotalRewards, queryDelegations } = useStakingQueries(address);

	const { availableWard: stakedWard } = useMemo(
		() => getDelegationsData(queryDelegations.data?.delegationResponses),
		[queryDelegations.data],
	);

	const {
		cosmos: {
			gov: { v1: governance },
		},
		isReady,
	} = useQueryHooks();

	const proposalsQuery = governance.useProposals({
		request: {
			proposalStatus: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
			voter: address,
			depositor: "",
		},
		options: {
			enabled: isReady,
		},
	});

	const proposalsVoting = proposalsQuery.data?.proposals.length;
	return (
		<div className="grid grid-cols-2 gap-6">
			<Link
				to="/governance"
				className="cursor-pointer group bg-pink-secondary overflow-hidden rounded-2xl py-5 px-6 relative isolate"
			>
				<img
					src="/images/dashboard-governance.png"
					className="absolute right-0 bottom-0 h-full object-contain z-[-1]"
					alt=""
				/>
				<div className="font-bold text-2xl mb-4 flex items-center justify-between">
					Governance
					{proposalsVoting ? (
						<div className="group-hover:opacity-100 opacity-0 ease-in duration-300 rounded-full w-8 h-8 flex items-center justify-center bg-background">
							<Icons.chevronDown
								className="-rotate-90 w-6 h-6"
								stroke="currentColor"
							/>
						</div>
					) : (
						<></>
					)}
				</div>

				{proposalsQuery.status === "loading" ? (
					<LoaderCircle className="animate-spin mt-2" />
				) : proposalsVoting ? (
					<div className="flex gap-3 items-center">
						<div className="rounded-full w-10 h-10 flex items-center justify-center text-pixel-pink text-xl	bg-pink-secondary">
							{proposalsVoting}
						</div>
						Active votes
					</div>
				) : (
					<button className="rounded h-10 px-5 font-semibold bg-fill-quaternary duration-300 ease-out hover:bg-pink-secondary">
						Vote
					</button>
				)}
			</Link>

			<StakingCard
				total={queryTotalRewards.data?.total}
				stakedWard={stakedWard}
			/>
		</div>
	);
}
