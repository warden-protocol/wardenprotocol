import { Icons } from "@/components/ui/icons-assets";
import AssetTransactionModal from "@/features/assets/AssetTransactionModal.tsx";
import SelectKeyModal from "@/features/assets/SelectKeyModal";
import { useMemo, useReducer, useState } from "react";
import { NewKeyButton } from "@/features/keys";
import { useSpaceId } from "@/hooks/useSpaceId";
import Keys from "@/features/dashboard/Keys";
import { useRules } from "./Intents";
import Intent from "@/features/dashboard/Intent";
import { getValidatorData } from "@/features/staking/util";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useStakingQueries } from "@/features/staking/hooks";
import StakingCard from "@/features/dashboard/StakingCard";
import { Actions } from "@/features/dashboard/Actions";
import DashboardGraph from "@/features/dashboard/DashboardGraph";
import { Link } from "react-router-dom";
import { commonReducer } from "@/utils/common";
import { ProposalStatus } from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";
import { useQueryHooks } from "@/hooks/useClient";
import { LoaderCircle } from "lucide-react";

interface DashboardState {
	isEmpty: boolean;
	hasOwners: boolean;
	hasVotes: boolean;
	isSelectKeyModal: boolean;
}

export function DashboardPage() {
	const [state, dispatch] = useReducer(commonReducer<DashboardState>, {
		isEmpty: false,
		hasOwners: false,
		hasVotes: false,
		isSelectKeyModal: false,
	});

	const { spaceId } = useSpaceId();

	const [isShowTransactionModal, setIsShowTransactionModal] = useState({
		isShown: false,
		type: "deposit",
	});

	const { activeRuleId } = useRules();

	const { address } = useAddressContext();

	const { queryTotalRewards, queryValidators } = useStakingQueries(address);

	const { stakedWard } = useMemo(
		() => getValidatorData(queryValidators.data?.validators),
		[queryValidators.data?.validators],
	);

	const {
		useSpaceById,
		cosmos: {
			gov: { v1: governance },
		},
	} = useQueryHooks();
	const q = useSpaceById({ request: { id: BigInt(spaceId || "") } });

	const proposalsQuery = governance.useProposals({
		request: {
			proposalStatus: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
			voter: address,
			depositor: "",
		},
	});

	if (q.status === "loading") {
		return <div>Loading...</div>;
	}

	const space = q.data?.space;
	if (!space) {
		return <p>Space not found</p>;
	}

	const proposalsVoting = proposalsQuery.data?.proposals.length;

	return (
		<div className="px-8 py-4">
			<h2 className="text-5xl mb-10 font-bold">Dashboard</h2>

			<div className="grid gap-6 grid-cols-[2fr_1fr]">
				{state.isEmpty ? (
					<div className="relative isolate flex flex-col items-center justify-center text-center bg-card  border-[1px] border-border-secondary rounded-2xl">
						<img
							className="absolute left-0 top-0 z-[-1] w-full h-full object-cover"
							src="/images/nokeys.png"
							alt=""
						/>
						<div className="font-bold text-2xl">No Keys found</div>
						<div className="text-muted-foreground">
							First add a key to start receiving assets
						</div>

						<NewKeyButton />
					</div>
				) : (
					<DashboardGraph />
				)}

				<div className="bg-card py-6 px-8 border-[1px] border-border-secondary rounded-2xl">
					<div className="font-bold text-[32px] text-center mb-4">
						#{spaceId} Space
					</div>

					{state.isEmpty || !spaceId ? (
						<></>
					) : (
						<div className="flex gap-2 justify-center min-h-[56px]">
							<Keys spaceId={spaceId} />

							<div
								onClick={() =>
									dispatch({
										type: "isSelectKeyModal",
										payload: true,
									})
								}
								className="cursor-pointer max-h-8 bg-background flex items-center justify-center min-w-12 border-[1px] border-border-secondary rounded"
							>
								<Icons.plus
									className="w-4 h-4"
									stroke="currentColor"
								/>
							</div>
						</div>
					)}

					<div className="mb-[22px] mt-1 h-[1px] bg-background" />

					<Link
						to="/intents"
						className="py-[10px] flex justify-between items-center gap-3 cursor-pointer"
					>
						<div className="flex gap-3 items-center">
							<Icons.activeIntent stroke="currentColor" />
							Active Intent
						</div>

						{activeRuleId ? (
							<Intent activeIntentId={activeRuleId} />
						) : (
							<div className="text-pixel-pink flex items-center">
								Add
								<Icons.chevronPink stroke="currentColor" />
							</div>
						)}
					</Link>
					<Link
						to="/owners"
						className="py-[10px]  flex justify-between items-center gap-3 cursor-pointer"
					>
						<div className="flex gap-3 items-center">
							<Icons.group stroke="currentColor" />
							Owners
						</div>

						{state.hasOwners ? (
							<div className="text-muted-foreground flex items-center">
								{space?.owners?.length}
								<Icons.chevronSecondary stroke="currentColor" />
							</div>
						) : (
							<div className="text-muted-foreground flex items-center">
								You
								<Icons.chevronSecondary stroke="currentColor" />
							</div>
						)}
					</Link>
				</div>
			</div>

			<div className="my-6 h-[1px] bg-background" />

			<div className="grid gap-6 grid-cols-[2fr_1fr] mb-5">
				{state.isEmpty ? (
					<div className="bg-card border-[1px] flex-col gap-5 border-border-secondary rounded-2xl flex items-center justify-center text-center">
						<Icons.arrowLeftRight stroke="currentColor" />
						<div className="text-xl	font-bold">No actions yet</div>
					</div>
				) : (
					<div>
						<div className="grid grid-cols-2 gap-6">
							<Link
								to="/governance"
								className="cursor-pointer group bg-pink-secondary border-[1px] border-border-secondary overflow-hidden rounded-2xl py-5 px-6 relative isolate"
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
								{proposalsVoting == undefined ? (
									<LoaderCircle className="animate-spin mt-2" />
								) : proposalsVoting ? (
									<div className="flex gap-3 items-center">
										<div className="rounded-full w-10 h-10 flex items-center justify-center text-pixel-pink text-xl	bg-pink-secondary">
											{proposalsVoting}
										</div>
										Active votes
									</div>
								) : (
									<button className="rounded h-10 px-5 font-semibold bg-background duration-300 ease-out hover:bg-pink-secondary">
										Vote
									</button>
								)}
							</Link>

							<StakingCard
								total={queryTotalRewards.data?.total}
								stakedWard={stakedWard}
							/>
						</div>

						<div className="bg-card  py-5 px-6 mt-6 border-[1px] border-border-secondary rounded-2xl">
							<div className="flex justify-between items-center gap-2 mb-3">
								<div className="font-bold text-2xl flex items-center justify-between">
									Last actions
								</div>
								<Link
									to="/actions"
									className="font-semibold text-muted-foreground"
								>
									See All
								</Link>
							</div>
							<Actions />
						</div>
					</div>
				)}

				<div>
					<div className="py-5 px-6 border-[1px] border-bg-secondary rounded-2xl">
						<div className="flex justify-between items-center gap-2 mb-3">
							<div className="font-bold text-2xl flex items-center justify-between">
								Top dApps
							</div>
							<Link
								to="/apps"
								className="font-semibold text-muted-foreground"
							>
								See All
							</Link>
						</div>

						<Link
							to="/apps/open?url=https://app.uniswap.org/swap?chain=sepolia"
							className="flex items-center rounded-lg p-3 ease-out duration-300 gap-3 hover:bg-background cursor-pointer"
						>
							<img
								className="w-10 h-10 object-cover overflow-hidden rounded-[10px]"
								src="/images/uniswap.jpg"
								alt=""
							/>
							<div>
								<div>Uniswap</div>
								<div className="text-xs text-muted-foreground">
									The most popular DEX
								</div>
							</div>
						</Link>

						<Link
							to="/apps/open?url=https://testnet.app.squidrouter.com/"
							className="flex items-center rounded-lg p-3 ease-out duration-300 gap-3 hover:bg-background cursor-pointer"
						>
							<img
								className="w-10 h-10 object-cover overflow-hidden rounded-[10px]"
								src="/images/squid.jpg"
								alt=""
							/>
							<div>
								<div>Squid</div>
								<div className="text-xs text-muted-foreground">
									Cross-chain DEX
								</div>
							</div>
						</Link>

						<Link
							to="/apps/open?url=https://testnet.osmosis.zone/?to=ATOM&from=OSMO"
							className="flex items-center rounded-lg p-3 ease-out duration-300 gap-3 hover:bg-background cursor-pointer"
						>
							<img
								className="w-10 h-10 object-cover overflow-hidden rounded-[10px]"
								src="/images/osmosis.png"
								alt=""
							/>
							<div>
								<div>Osmosis</div>
								<div className="text-xs text-muted-foreground">
									The premier DEX
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>

			{state.isSelectKeyModal && (
				<SelectKeyModal
					onHide={() => {
						setIsShowTransactionModal({
							isShown: true,
							type: "send",
						});
						dispatch({
							type: "isSelectKeyModal",
							payload: false,
						});
					}}
					showTransactionModal={(type) =>
						setIsShowTransactionModal({ isShown: true, type: type })
					}
				/>
			)}

			{isShowTransactionModal.isShown && (
				<AssetTransactionModal
					onHide={() =>
						setIsShowTransactionModal({
							isShown: false,
							type: "send",
						})
					}
					onHideAll={() => {
						setIsShowTransactionModal({
							isShown: false,
							type: "send",
						});
						dispatch({
							type: "isSelectKeyModal",
							payload: false,
						});
					}}
					type={isShowTransactionModal.type}
				/>
			)}
		</div>
	);
}
