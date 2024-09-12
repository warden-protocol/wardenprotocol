import clsx from "clsx";
import { Icons } from "@/components/ui/icons-assets";
import type { GovernanceDispatch, ProposalParsed } from "./types";
import {
	ProposalStatus,
	type TallyResult,
	type Vote,
} from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";
import { formatDate, formatResult, formatStatus } from "./util";
import { bigintToFixed } from "@/lib/math";
import VotesChart from "./Chart";

const DetailsModal = ({
	dispatch,
	proposal,
	votes,
	tally,
	disabled,
}: {
	disabled?: boolean;
	dispatch: GovernanceDispatch;
	proposal: ProposalParsed;
	votes: Vote[];
	tally: TallyResult;
}) => {
	if (disabled) {
		return (
			<div className="max-w-[520px] w-[520px] text-center tracking-wide">
				<Icons.alertModal className="mb-[72px] mx-auto" />

				<div className="font-bold text-5xl mb-6 leading-[56px]">
					You can&apos;t vote
				</div>
				<div>
					You are not allowed to vote for this proposal because your
					WARD tokens are not staked for validator
				</div>

				<button
					onClick={() =>
						dispatch({
							type: "set",
							payload: {
								proposal: undefined,
								votes: undefined,
								tally: undefined,
							},
						})
					}
					className="mt-12 rounded-lg	mx-auto max-w-[240px] bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-200"
				>
					Close
				</button>
			</div>
		);
	}

	const result = formatResult(tally);
	const status = formatStatus(proposal);

	return (
		<div className="max-w-[520px] w-[520px] tracking-widepb-5">
			<div className="font-bold text-5xl mb-12 leading-[56px] text-center">
				Proposal details
			</div>

			<div className="relative z-50 bg-secondary-bg rounded-xl px-6 py-6">
				<div className="flex justify-between items-start gap-2 mb-1">
					<div className="font-bold text-xl">
						#{proposal.id} {proposal.name}
					</div>

					<div className="flex flex-col justify-center">
						<div
							className={clsx(
								"rounded-2xl py-1 px-2 text-xs w-fit bg-secondary-bg",
								status.classNames,
							)}
						>
							{status.text}
						</div>
					</div>
				</div>

				<div className="text-muted-foreground">
					{proposal.description}
				</div>

				<div className="mt-4 mb-4 h-[1px] bg-secondary-bg"></div>

				<div className="flex justify-between mb-4">
					<div className="font-bold text-xl">
						{bigintToFixed(result?.total, {
							compact: true,
							decimals: 18,
							display: 2,
						})}{" "}
						votes
					</div>
					{votes.length ? (
						<div
							onClick={() => {
								dispatch({ type: "step", payload: "votes" });
							}}
							className="font-semibold text-muted-foreground cursor-pointer"
						>
							Show Voters
						</div>
					) : null}
				</div>

				<VotesChart type="line" result={result} />

				<div className="flex gap-3 text-sm mt-4 mb-7">
					<div className="flex gap-1 items-center">
						<div className="rounded-full w-[6px] h-[6px] bg-primary" />
						Yes, {result?.yesPercent}%
					</div>

					<div className="flex gap-1 items-center">
						<div className="rounded-full w-[6px] h-[6px] bg-negative" />
						No, {result?.noPercent}%
					</div>

					<div className="flex gap-1 items-center">
						<div className="rounded-full w-[6px] h-[6px] bg-pixel-pink" />
						No with veto, {result?.noWithVetoPercent}%
					</div>

					<div className="flex gap-1 items-center">
						<div className="rounded-full w-[6px] h-[6px] bg-secondary-text" />
						Abstain, {result?.abstainPercent}%
					</div>
				</div>

				{/* <div className="flex items-center justify-between mb-5">
					// fixme proposer address not queried
					<div>Proposer</div>
					<div className="flex gap-1 items-center cursor-pointer">
						warden1gsrjh...9ahqx6vsen
						<Icons.externalLink />
					</div>
				</div> */}

				{proposal.link ? (
					<div className="flex items-center justify-between mb-5">
						<div>Link</div>
						<a
							className="flex gap-1 items-center cursor-pointer"
							target="_blank"
							href={proposal.link}
						>
							{proposal.link.length > 32
								? `${proposal.link.slice(0, 14)}..${proposal.link.slice(-14)}`
								: proposal.link}
							<Icons.externalLink />
						</a>
					</div>
				) : null}

				<div className="flex items-center justify-between mb-5">
					<div>Creation date</div>
					<div>5 May, 24</div>
				</div>

				<div className="flex items-center justify-between mb-5">
					<div>Voting Started</div>
					<div>{formatDate(proposal.votingStart)}</div>
				</div>

				<div className="flex items-center justify-between">
					<div>Voting end</div>
					<div>{formatDate(proposal.votingEnd)}</div>
				</div>
			</div>

			{proposal.status ===
			ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD ? (
				<button
					onClick={() => dispatch({ type: "step", payload: "vote" })}
					className={clsx(
						`mt-12 rounded-lg bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-200`,
					)}
				>
					Vote
				</button>
			) : null}
		</div>
	);
};

export default DetailsModal;
