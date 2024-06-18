import { Icons } from "@/components/ui/icons-assets";
import AssetTransactionModal from "@/features/assets/AssetTransactionModal.tsx";
import SelectKeyModal from "@/features/assets/SelectKeyModal";
import { useMemo, useState } from "react";
import { NewKeyButton } from "@/features/keys";
import { useSpaceId } from "@/hooks/useSpaceId";
import Keys from "@/features/dashboard/Keys";
import { useIntents } from "./Intents";
import Intent from "@/features/dashboard/Intent";
import { formatReward, getValidatorData } from "@/features/staking/util";
import { useAddressContext } from "@/hooks/useAddressContext";
import { useStakingQueries } from "@/features/staking/hooks";
import StakingCard from "@/features/dashboard/StakingCard";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { Space as SpaceModel } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { Actions } from "@/features/dashboard/Actions";
import DashboardGraph from "@/features/dashboard/DashboardGraph";

export function DashboardPage() {
	const { spaceId } = useSpaceId();

	const [isSelectKeyModal, setIsSelectKeyModal] = useState(false);

	const [isEmpty, setIsEmpty] = useState(false);

	const [hasOwners, setHasOwners] = useState(true);

	const [hasVotes, setHasVotes] = useState(false);

	const [isShowTransactionModal, setIsShowTransactionModal] = useState({
		isShown: false,
		type: "deposit",
	});

	const { activeIntentId } = useIntents();

	const { address } = useAddressContext();

	const { queryTotalRewards, queryValidators } = useStakingQueries(address);

	const { stakedWard } = useMemo(
		() => getValidatorData(queryValidators.data?.validators),
		[queryValidators.data?.validators],
	);

	const { QuerySpaceById } = useWardenWardenV1Beta2();
	const wsQuery = QuerySpaceById({ id: spaceId }, {});
	const space = wsQuery.data?.space as Required<SpaceModel>;

	return (
		<div className="px-8 py-4">
			<h2 className="text-5xl mb-10 font-bold">Dashboard</h2>

			<div className="grid gap-6 grid-cols-[2fr_1fr]">
				{isEmpty ? (
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

					{isEmpty || !spaceId ? (
						<></>
					) : (
						<div className="flex gap-2 justify-center min-h-[56px]">
							<Keys spaceId={spaceId} />

							<div
								onClick={() => setIsSelectKeyModal(true)}
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

					<a
						href="/intents"
						className="py-[10px] flex justify-between items-center gap-3 cursor-pointer"
					>
						<div className="flex gap-3 items-center">
							<Icons.activeIntent stroke="currentColor" />
							Active Intent
						</div>

						{activeIntentId ? (
							<Intent activeIntentId={activeIntentId} />
						) : (
							<div className="text-pixel-pink flex items-center">
								Add
								<Icons.chevronPink stroke="currentColor" />
							</div>
						)}
					</a>
					<a
						href="/owners"
						className="py-[10px]  flex justify-between items-center gap-3 cursor-pointer"
					>
						<div className="flex gap-3 items-center">
							<Icons.group stroke="currentColor" />
							Owners
						</div>

						{hasOwners ? (
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
					</a>
				</div>
			</div>

			<div className="my-6 h-[1px] bg-background" />

			<div className="grid gap-6 grid-cols-[2fr_1fr] mb-5">
				{isEmpty ? (
					<div className="bg-card border-[1px] flex-col gap-5 border-border-secondary rounded-2xl flex items-center justify-center text-center">
						<Icons.arrowLeftRight stroke="currentColor" />
						<div className="text-xl	font-bold">No actions yet</div>
					</div>
				) : (
					<div>
						<div className="grid grid-cols-2 gap-6">
							<a
								href="/governance"
								className="cursor-pointer group bg-pink-secondary border-[1px] border-border-secondary overflow-hidden rounded-2xl py-5 px-6 relative isolate"
							>
								<img
									src="/images/dashboard-governance.png"
									className="absolute right-0 bottom-0 h-full object-contain z-[-1]"
									alt=""
								/>
								<div className="font-bold text-2xl mb-4 flex items-center justify-between">
									Governance
									{hasVotes ? (
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
								{hasVotes ? (
									<div className="flex gap-3 items-center">
										<div className="rounded-full w-10 h-10 flex items-center justify-center text-pixel-pink text-xl	bg-pink-secondary">
											3
										</div>
										Active votes
									</div>
								) : (
									<button className="rounded h-10 px-5 font-semibold bg-background duration-300 ease-out hover:bg-pink-secondary">
										Vote
									</button>
								)}
							</a>

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
								<a
									href="/actions"
									className="font-semibold text-muted-foreground"
								>
									See All
								</a>
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
							<a
								href="/apps"
								className="font-semibold text-muted-foreground"
							>
								See All
							</a>
						</div>

						<a
							href="https://spaceward.buenavista.wardenprotocol.org/apps/open?url=https://app.uniswap.org/swap?chain=sepolia"
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
						</a>

						<a
							href="https://spaceward.buenavista.wardenprotocol.org/apps/open?url=https://testnet.app.squidrouter.com/"
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
						</a>

						<a
							href="https://spaceward.buenavista.wardenprotocol.org/apps/open?url=https://testnet.osmosis.zone/?to=ATOM&from=OSMO"
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
						</a>
					</div>
				</div>
			</div>

			{isSelectKeyModal && (
				<SelectKeyModal
					onHide={() => setIsSelectKeyModal(false)}
					showTransactionModal={(type) => {
						setIsShowTransactionModal({
							isShown: true,
							type: type,
						});
					}}
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
						setIsSelectKeyModal(false);
					}}
					type={isShowTransactionModal.type}
				/>
			)}
		</div>
	);
}
