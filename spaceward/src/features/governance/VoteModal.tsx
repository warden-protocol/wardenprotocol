import { VoteOption } from "@wardenprotocol/wardenjs/codegen/cosmos/group/v1/types";
import { useGovernanceTx } from "./hooks";
import { GovernanceDispatch, ProposalParsed } from "./types";

const VoteModal = ({
	dispatch,
	proposal,
}: {
	dispatch: GovernanceDispatch;
	proposal: ProposalParsed;
}) => {
	const { submitVoteTx } = useGovernanceTx(dispatch);

	return (
		<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
			<div className="font-bold text-5xl mb-6 leading-[56px]">Vote</div>

			<div className="mb-12">
				#{proposal.id} {proposal.name}: {proposal.description}
			</div>

			<div className=" flex flex-col gap-5">
				<div
					onClick={async () => {
						await submitVoteTx(
							proposal.id,
							VoteOption.VOTE_OPTION_YES,
						);

						dispatch({
							type: "set",
							payload: {
								proposal: undefined,
								tally: undefined,
								votes: undefined,
								step: "details",
							},
						});
					}}
					className="cursor-pointer bg-secondary-bg rounded-lg p-6 flex gap-3"
				>
					<div className="relative rounded-full border-[1px] border-checkbox w-6 h-6" />
					Yes
				</div>

				<div
					onClick={async () => {
						await submitVoteTx(
							proposal.id,
							VoteOption.VOTE_OPTION_NO,
						);

						dispatch({
							type: "set",
							payload: {
								proposal: undefined,
								tally: undefined,
								votes: undefined,
								step: "details",
							},
						});
					}}
					className="cursor-pointer bg-secondary-bg rounded-lg p-6 flex gap-3"
				>
					<div className="relative rounded-full border-[1px] border-checkbox w-6 h-6" />
					No
				</div>

				<div
					onClick={async () => {
						await submitVoteTx(
							proposal.id,
							VoteOption.VOTE_OPTION_NO_WITH_VETO,
						);

						dispatch({
							type: "set",
							payload: {
								proposal: undefined,
								tally: undefined,
								votes: undefined,
								step: "details",
							},
						});
					}}
					className="cursor-pointer bg-secondary-bg rounded-lg p-6 flex gap-3"
				>
					<div className="relative rounded-full border-[1px] border-checkbox w-6 h-6" />
					No with veto
				</div>

				<div
					onClick={async () => {
						await submitVoteTx(
							proposal.id,
							VoteOption.VOTE_OPTION_ABSTAIN,
						);

						dispatch({
							type: "set",
							payload: {
								proposal: undefined,
								tally: undefined,
								votes: undefined,
								step: "details",
							},
						});
					}}
					className="cursor-pointer bg-secondary-bg rounded-lg p-6 flex gap-3"
				>
					<div className="relative rounded-full border-[1px] border-checkbox w-6 h-6" />
					Abstain
				</div>
			</div>
		</div>
	);
};

export default VoteModal;
