import clsx from "clsx";
import { useMemo, useReducer } from "react";
import SignTranactionModal from "@/features/assets/SignTransactionModal";
import { Icons } from "@/components/ui/icons-assets";
import { Icons as IconsCommon } from "@/components/ui/icons";
import GovernanceItem from "@/features/governance/Item";
import DetailsModal from "@/features/governance/DetailsModal";
import { useGovernance, useGovernanceTx } from "@/features/governance/hooks";
import { commonReducer } from "@/utils/common";
import { GovernanceState, SortKeys } from "@/features/governance/types";
import { LoaderCircle, XIcon } from "lucide-react";
import Portal from "@/components/ui/portal";
import VoteModal from "@/features/governance/VoteModal";
import VotesListModal from "@/features/governance/VotesListModal";
import { useStakingQueries } from "@/features/staking/hooks";
import { useAddressContext } from "@/hooks/useAddressContext";
import { ProposalStatus } from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";

export function GovernancePage() {
	const { address } = useAddressContext();

	const [state, dispatch] = useReducer(commonReducer<GovernanceState>, {
		txPending: false,
		step: "details",
		layout: "list",
		filterStatus: ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
		voteAmounts: {},
	});

	const { proposals: _proposals } = useGovernance({
		filter: state.filterStatus,
	});
	const proposals = useMemo(
		() =>
			!state.sortKey || !state.sortDirection
				? _proposals
				: _proposals?.sort((a, b) => {
						const sign = state.sortDirection === "asc" ? 1 : -1;
						switch (state.sortKey) {
							case "end":
								return (
									sign *
									(a.votingEnd.getTime() -
										b.votingEnd.getTime())
								);
							case "start":
								return (
									sign *
									(a.votingStart.getTime() -
										b.votingStart.getTime())
								);
							case "status":
								return sign * (a.status - b.status);
							case "votes":
								const cmp =
									(state.voteAmounts[a.id] ?? BigInt(0)) -
									(state.voteAmounts[b.id] ?? BigInt(0));

								return sign * Number(cmp);
							default:
								return 0;
						}
					}),
		[_proposals, state.sortKey, state.sortDirection, state.voteAmounts],
	);

	const { queryDelegations } = useStakingQueries(address);
	const noProposals = proposals?.length === 0;

	const votingDisabled =
		queryDelegations.data?.delegationResponses.length === 0;

	const selected =
		state.proposal && state.tally && state.votes
			? {
					proposal: state.proposal,
					tally: state.tally,
					votes: state.votes,
				}
			: undefined;

	function openSortDropdown(key: SortKeys) {
		return () => {
			if (state.sortDropdown === key) {
				dispatch({
					type: "sortDropdown",
					payload: undefined,
				});
			} else {
				dispatch({
					type: "sortDropdown",
					payload: key,
				});
			}
		};
	}

	function setSortDirection(direction: "asc" | "desc", key: SortKeys) {
		return () => {
			// todo cancel sorting

			dispatch({
				type: "set",
				payload: {
					sortDropdown: undefined,
					sortKey: key,
					sortDirection: direction,
				},
			});
		};
	}

	function setFilterStatus(filterStatus: ProposalStatus) {
		dispatch({
			type: "set",
			payload: { filterStatus, proposalDropdown: false },
		});
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<h2 className="text-5xl font-bold">Governance</h2>
			</div>

			<div className=" bg-fill-accent-secondary rounded-xl py-5 px-6 relative flex justify-between items-center isolate">
				<img
					src="/images/bnr-governance.png"
					alt=""
					className="absolute right-0 bottom-0 h-full object-contain z-[-1]"
				/>
				<div>
					<div className="text-xl font-bold">
						Suggest your proposals
					</div>
					<div className="h-2" />
					<div className="">
						Join the conversation around potentional governance
						proposals
					</div>
				</div>
				<a href="#" className="flex gap-2 items-center font-semibold">
					<Icons.externalLink className="invert dark:invert-0" />
					Visit Warden Forum
				</a>
			</div>

			<div className="flex justify-between items-center">
				<div
					className={clsx(
						"text-[32px] font-bold tracking-[0.12px] cursor-pointer ease-in duration-200",
					)}
				>
					Proposals
				</div>

				<div className="flex gap-2">
					<div className="gap-2">
						<div
							onClick={() =>
								dispatch({
									type: "proposalDropdown",
									payload: !state.proposalDropdown,
								})
							}
							className="cursor-pointer group relative h-8 rounded-2xl bg-card py-2 px-3 text-xs  flex items-center gap-[2px]"
						>
							{state.filterStatus ===
							ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED
								? "All Proposals"
								: state.filterStatus ===
									  ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
									? "Voting"
									: state.filterStatus ===
										  ProposalStatus.PROPOSAL_STATUS_PASSED
										? "Passed"
										: state.filterStatus ===
											  ProposalStatus.PROPOSAL_STATUS_REJECTED
											? "Rejected"
											: "Failed"}
							<Icons.chevronDown
								className={clsx({
									"rotate-180": state.proposalDropdown,
								})}
								stroke="currentColor"
							/>
							{state.proposalDropdown ? (
								<div className="w-[248px] bg-card text-sm rounded-lg  py-2 absolute z-10 bottom-[-8px] right-0 whitespace-nowrap backdrop-blur-[30px] translate-y-[100%] ">
									<div
										className="cursor-pointer h-10 px-4 flex items-center gap-3"
										onClick={() =>
											setFilterStatus(
												ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED,
											)
										}
									>
										All Proposals
										{state.filterStatus ===
											ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED && (
											<Icons.check
												stroke="currentColor"
												className="ml-auto"
											/>
										)}
									</div>
									<div
										className="cursor-pointer h-10 px-4 flex items-center gap-3"
										onClick={() =>
											setFilterStatus(
												ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
											)
										}
									>
										Voting
										{state.filterStatus ===
											ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD && (
											<Icons.check className="ml-auto" />
										)}
									</div>
									<div
										className="cursor-pointer h-10 px-4 flex items-center gap-3"
										onClick={() =>
											setFilterStatus(
												ProposalStatus.PROPOSAL_STATUS_PASSED,
											)
										}
									>
										Passed
										{state.filterStatus ===
											ProposalStatus.PROPOSAL_STATUS_PASSED && (
											<Icons.check className="ml-auto" />
										)}
									</div>
									<div
										className="cursor-pointer h-10 px-4 flex items-center gap-3"
										onClick={() =>
											setFilterStatus(
												ProposalStatus.PROPOSAL_STATUS_REJECTED,
											)
										}
									>
										Rejected
										{state.filterStatus ===
											ProposalStatus.PROPOSAL_STATUS_REJECTED && (
											<Icons.check className="ml-auto" />
										)}
									</div>
									<div
										className="cursor-pointer h-10 px-4 flex items-center gap-3"
										onClick={() =>
											setFilterStatus(
												ProposalStatus.PROPOSAL_STATUS_FAILED,
											)
										}
									>
										Failed
										{state.filterStatus ===
											ProposalStatus.PROPOSAL_STATUS_FAILED && (
											<Icons.check className="ml-auto" />
										)}
									</div>
								</div>
							) : null}
						</div>
					</div>

					<div className="h-8 rounded-2xl bg-card py-[2px] px-[2px] text-xs flex items-center gap-1 ">
						<div
							onClick={() =>
								dispatch({ type: "layout", payload: "list" })
							}
							className={clsx(
								"duration-200 ease-in flex items-center justify-center rounded-full w-6 h-6 cursor-pointer p-[2px]",
								{
									"bg-primary": state.layout === "list",
								},
							)}
						>
							<Icons.list
								className={clsx("duration-200 ease-in", {
									invert: state.layout === "list",
								})}
								stroke="currentColor"
							/>
						</div>
						<div
							onClick={() =>
								dispatch({ type: "layout", payload: "grid" })
							}
							className={clsx(
								"duration-200 ease-in flex items-center justify-center rounded-full w-6 h-6 cursor-pointer p-[2px]",
								{
									"bg-primary": state.layout === "grid",
								},
							)}
						>
							<Icons.grid
								className={clsx("duration-200 ease-in", {
									invert: state.layout === "grid",
								})}
								stroke="currentColor"
							/>
						</div>
					</div>
				</div>
			</div>

			<div
				className={clsx(
					state.layout === "list"
						? "bg-card rounded-xl border-border-secondary border-[1px] px-8 py-6"
						: noProposals
							? ""
							: "grid grid-cols-3 gap-6 pb-10",
				)}
			>
				{state.layout === "list" && (
					<div className="grid grid-cols-[24px_1fr_125px_140px_140px_140px_90px] gap-3 pb-2">
						<div className="text-sm	text-muted-foreground">#</div>
						<div className="text-sm w-fit text-muted-foreground">
							Title
						</div>
						<div
							onClick={openSortDropdown("status")}
							className="text-sm cursor-pointer relative w-fit text-muted-foreground flex items-center gap-1"
						>
							Status
							<Icons.chevronsUpDown stroke="currentColor" />
							{state.sortDropdown === "status" ? (
								<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
									<div
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										onClick={setSortDirection(
											"asc",
											"status",
										)}
									>
										<Icons.ascending stroke="currentColor" />
										<div className="text-sm whitespace-nowrap">
											Sort ascending
										</div>
									</div>
									<div
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										onClick={setSortDirection(
											"desc",
											"status",
										)}
									>
										<Icons.ascending
											className="rotate-180"
											stroke="currentColor"
										/>

										<div className="text-sm whitespace-nowrap">
											Sort descending
										</div>
									</div>
								</div>
							) : (
								<div></div>
							)}
						</div>
						<div
							onClick={openSortDropdown("votes")}
							className="text-sm cursor-pointer relative w-fit	text-muted-foreground flex items-center gap-1"
						>
							Votes
							<Icons.chevronsUpDown stroke="currentColor" />
							{state.sortDropdown === "votes" ? (
								<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px] z-10">
									<div
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										onClick={setSortDirection(
											"asc",
											"votes",
										)}
									>
										<Icons.ascending stroke="currentColor" />
										<div className="text-sm whitespace-nowrap">
											Sort ascending
										</div>
									</div>
									<div
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										onClick={setSortDirection(
											"desc",
											"votes",
										)}
									>
										<Icons.ascending
											className="rotate-180"
											stroke="currentColor"
										/>

										<div className="text-sm whitespace-nowrap">
											Sort descending
										</div>
									</div>
								</div>
							) : (
								<div></div>
							)}
						</div>
						<div
							onClick={openSortDropdown("start")}
							className="text-sm cursor-pointer relative w-fit	text-muted-foreground flex items-center gap-1"
						>
							Voting start
							<Icons.chevronsUpDown stroke="currentColor" />
							{state.sortDropdown === "start" ? (
								<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px] z-10">
									<div
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										onClick={setSortDirection(
											"asc",
											"start",
										)}
									>
										<Icons.ascending stroke="currentColor" />
										<div className="text-sm whitespace-nowrap">
											Sort ascending
										</div>
									</div>
									<div
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										onClick={setSortDirection(
											"desc",
											"start",
										)}
									>
										<Icons.ascending
											className="rotate-180"
											stroke="currentColor"
										/>

										<div className="text-sm whitespace-nowrap">
											Sort descending
										</div>
									</div>
								</div>
							) : (
								<div></div>
							)}
						</div>
						<div
							onClick={openSortDropdown("end")}
							className="text-sm cursor-pointer relative w-fit	text-muted-foreground flex items-center gap-1"
						>
							Voting end
							<Icons.chevronsUpDown stroke="currentColor" />
							{state.sortDropdown === "end" ? (
								<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
									<div
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										onClick={setSortDirection("asc", "end")}
									>
										<Icons.ascending stroke="currentColor" />
										<div className="text-sm whitespace-nowrap">
											Sort ascending
										</div>
									</div>
									<div
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										onClick={setSortDirection(
											"desc",
											"end",
										)}
									>
										<Icons.ascending
											className="rotate-180"
											stroke="currentColor"
										/>

										<div className="text-sm whitespace-nowrap">
											Sort descending
										</div>
									</div>
								</div>
							) : (
								<div></div>
							)}
						</div>
						<div></div>
					</div>
				)}

				{noProposals ? (
					<div className="h-[calc(100vh_-_120px)] min-h-[550px] flex flex-col justify-center items-center text-center">
						<Icons.noFile className="invert dark:invert-0" />
						<div className="h-[72px]" />
						<div className="text-5xl font-bold">
							No proposals yet
						</div>
						<div className="h-6" />
						<div className="">Suggest your proposals</div>
						<div className="h-12" />
						<button className="text-black bg-white h-[56px] rounded-lg justify-center text-base font-medium flex items-center gap-2 py-1 px-6">
							<Icons.externalLink stroke="currentColor" />
							Visit Warden Forum
						</button>
					</div>
				) : (
					proposals?.map((item) => (
						<GovernanceItem
							voteAmounts={state.voteAmounts}
							layout={state.layout}
							key={item.id}
							dispatch={dispatch}
							proposal={item}
						/>
					)) ?? (
						<div className="flex justify-center content-center w-full p-4">
							<LoaderCircle className="animate-spin" />
						</div>
					)
				)}
			</div>
			{selected || state.txPending ? (
				<Portal domId="intent-modal">
					<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
						{state.step !== "details" ? (
							<button
								onClick={() => {
									dispatch({
										type: "step",
										payload: "details",
									});
								}}
								className="absolute top-8 left-8 opacity-[0.5] hover:opacity-[100%] transition-all"
							>
								<IconsCommon.goBack />
							</button>
						) : null}

						{!state.txPending ? (
							<button
								onClick={() => {
									dispatch({
										type: "set",
										payload: {
											step: "details",
											proposal: undefined,
										},
									});
								}}
								className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
							>
								<XIcon />
							</button>
						) : null}

						{state.txPending ? (
							<SignTranactionModal />
						) : selected ? (
							state.step === "details" ? (
								<DetailsModal
									disabled={
										votingDisabled &&
										state.proposal?.status ===
											ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
									}
									dispatch={dispatch}
									{...selected}
								/>
							) : state.step === "vote" ? (
								<VoteModal dispatch={dispatch} {...selected} />
							) : (
								<VotesListModal {...selected} />
							)
						) : null}
					</div>
				</Portal>
			) : null}
		</div>
	);
}
