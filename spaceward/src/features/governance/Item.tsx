import clsx from "clsx";
import type {
	GovernanceDispatch,
	GovernanceState,
	ProposalParsed,
} from "./types";
import { formatStatus, formatResult, formatDate } from "./util";
import { useQueryHooks } from "@/hooks/useClient";
import type {
	TallyResult,
	Vote,
} from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";
import { bigintToFixed } from "@/lib/math";
import VotesChart from "./Chart";
import { useRef } from "react";

interface ItemProps {
	dispatch: GovernanceDispatch;
	proposal: ProposalParsed;
}

export default function GovernanceItem(
	props: ItemProps & {
		layout: GovernanceState["layout"];
		voteAmounts: Record<string, bigint>;
	},
) {
	const { layout, proposal, dispatch } = props;

	const {
		cosmos: {
			gov: { v1: governance },
		},
	} = useQueryHooks();

	const votesQuery = governance.useVotes({
		request: {
			proposalId: BigInt(proposal.id),
		},
	});

	const tallyResultQuery = governance.useTallyResult({
		request: {
			proposalId: BigInt(proposal.id),
		},
	});

	const result = formatResult(tallyResultQuery.data?.tally);
	const skipUpdate = useRef(false);

	if (
		!skipUpdate.current &&
		result?.total &&
		props.voteAmounts[proposal.id] !== result.total
	) {
		skipUpdate.current = true;

		setTimeout(() => {
			props.dispatch({
				type: "voteAmounts",
				payload: { ...props.voteAmounts, [proposal.id]: result.total },
			});

			skipUpdate.current = false;
		});
	}

	return layout === "list" ? (
		<GovernanceItemRow
			dispatch={dispatch}
			proposal={proposal}
			votes={votesQuery.data?.votes}
			tally={tallyResultQuery.data?.tally}
		/>
	) : (
		<GovernanceItemCard
			dispatch={dispatch}
			proposal={proposal}
			votes={votesQuery.data?.votes}
			tally={tallyResultQuery.data?.tally}
		/>
	);
}

interface ItemDataProps {
	votes?: Vote[];
	tally?: TallyResult;
}

function GovernanceItemRow({
	dispatch,
	proposal,
	votes,
	tally,
}: ItemProps & ItemDataProps) {
	const result = formatResult(tally);
	const status = formatStatus(proposal);
	const enabled = Boolean(proposal && tally && votes);

	return (
		<div className="grid grid-cols-[24px_180px_0.8fr_1.1fr_1fr_1fr_90px] gap-3 h-[72px]  border-t-[1px] border-secondary-bg">
			<div className="flex flex-col justify-center">
				<div className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary-bg text-xs">
					{proposal.id}
				</div>
			</div>

			<div className="flex flex-col justify-center max-w-[216px]">
				<div className="truncate whitespace-nowrap text-ellipsis overflow-hidden block">
					{proposal.name}
				</div>
			</div>

			<div className="flex flex-col justify-center">
				<div
					className={clsx(
						"rounded-2xl py-1 px-2 text-xs w-fit",
						status.classNames,
					)}
				>
					{status.text}
				</div>
			</div>

			<div className="flex flex-col justify-center">
				<div className="flex items-center gap-3">
					{result ? (
						<div className="group relative">
							<VotesChart
								type="pie"
								result={{
									...result,
								}}
							/>
							<div className="opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
								<div className="flex gap-2 items-center">
									<div className="bg-positive w-[6px] h-[6px] rounded-full" />
									Yes, {result.yesPercent}%
								</div>
								<div className="flex gap-2 items-center">
									<div className="bg-negative w-[6px] h-[6px] rounded-full" />
									No, {result.noPercent}%
								</div>
								<div className="flex gap-2 items-center">
									<div className="bg-pixel-pink w-[6px] h-[6px] rounded-full" />
									No with veto, {result.noWithVetoPercent}%
								</div>
								<div className="flex gap-2 items-center">
									<div className="bg-fill-gray w-[6px] h-[6px] rounded-full" />
									Abstain, {result.abstainPercent}%
								</div>
							</div>
						</div>
					) : null}

					{bigintToFixed(result?.total ?? BigInt(0), {
						compact: true,
						decimals: 18,
						display: 0,
					})}
				</div>
			</div>

			<div className="flex items-center">
				{formatDate(proposal.votingStart)}
			</div>

			<div className="flex flex-col justify-center">
				{formatDate(proposal.votingEnd)}
			</div>

			<div className="flex flex-col justify-center items-end">
				<button
					onClick={() => {
						if (!enabled) {
							return;
						}

						dispatch({
							type: "set",
							payload: { proposal, tally, votes },
						});
					}}
					className={clsx(
						"cursor-pointer font-semibold bg-black text-white dark:bg-secondary-bg py-[6px] px-4 rounded hover:bg-fill-accent-secondary ease-in duration-100 w-fit",
						{ "pointer-events-none": !enabled },
					)}
				>
					Open
				</button>
			</div>
		</div>
	);
}

function GovernanceItemCard({
	dispatch,
	proposal,
	votes,
	tally,
}: ItemProps & ItemDataProps) {
	const result = formatResult(tally);
	const status = formatStatus(proposal);
	const enabled = Boolean(proposal && tally && votes);

	return (
		<div
			className={clsx(
				"rounded-xl bg-card   cursor-pointer hover:outline-1px outline-offset-0 outline-pixel-pink  hover:outline ease-out duration-200",
				{ "pointer-events-none": !enabled },
			)}
			onClick={() => {
				if (!enabled) {
					return;
				}

				dispatch({
					type: "set",
					payload: { proposal, tally, votes },
				});
			}}
		>
			<div className="py-5 px-6 flex flex-col justify-between h-[208px]">
				<div className="flex justify-between gap-4">
					<div className="font-semibold">
						#{proposal.id} {proposal.name}
					</div>

					<div
						className={clsx(
							"rounded-2xl py-1 px-2 text-xs w-fit h-fit",
							status.classNames,
						)}
					>
						{status.text}
					</div>
				</div>

				<div className="flex items-center gap-3">
					{result ? (
						<div className="group relative">
							<VotesChart
								type="pie"
								result={{
									...result,
								}}
							/>

							<div className="opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
								<div className="flex gap-2 items-center">
									<div className="bg-positive w-[6px] h-[6px] rounded-full" />
									Yes, {result.yesPercent}%
								</div>
								<div className="flex gap-2 items-center">
									<div className="bg-negative w-[6px] h-[6px] rounded-full" />
									No, {result.noPercent}%
								</div>
								<div className="flex gap-2 items-center">
									<div className="bg-pixel-pink w-[6px] h-[6px] rounded-full" />
									No with veto, {result.noWithVetoPercent}%
								</div>
								<div className="flex gap-2 items-center">
									<div className="bg-fill-gray w-[6px] h-[6px] rounded-full" />
									Abstain, {result.abstainPercent}%
								</div>
							</div>
						</div>
					) : null}
					{bigintToFixed(result?.total ?? BigInt(0), {
						compact: true,
						decimals: 18,
						display: 0,
					})}{" "}
					votes
				</div>
			</div>
			<div className="bg-fill-quaternary p-6 flex justify-between rounded-br-xl rounded-bl-xl">
				<div>
					<div className="text-muted-foreground text-xs">
						Voting start
					</div>
					<div>{formatDate(proposal.votingStart)}</div>
				</div>
				<div className="text-right">
					<div className="text-muted-foreground text-xs">
						Voting end
					</div>
					<div>{formatDate(proposal.votingEnd)}</div>
				</div>
			</div>
		</div>
	);
}
