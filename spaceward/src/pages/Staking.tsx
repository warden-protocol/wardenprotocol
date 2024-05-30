import { useState } from "react";
import clsx from "clsx";
import SignTranactionModal from "@/features/assets/SignTransactionModal";
import { Icons } from "@/components/ui/icons-assets";
import StakeModal from "@/features/staking/StakeModal";
import Validators from "@/features/staking/Validators";
import Delegations from "@/features/staking/Delegations";
import StakingHeading from "@/features/staking/StakingHeading";

export function StakingPage() {
	const [activeTab, setActiveTab] = useState("validators");
	const [sortDropdown, setSortDropdown] = useState("");
	const [stakeModal, setStakeModal] = useState<string>();
	const [isSignTransactionModal, setIsSignTransactionModal] = useState(false);

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<div>
					<h2 className="text-5xl font-bold">Staking</h2>
					<p className="text-muted-foreground"></p>
				</div>
			</div>

			<StakingHeading />

			<div className="bg-tertiary rounded-xl border-border-secondary border-[1px] px-8 py-6">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-3">
						<div
							className={clsx(
								"text-2xl font-bold tracking-[0.12px] cursor-pointer ease-in duration-200",
								activeTab !== "validators" &&
									"text-tertiary-text",
							)}
							onClick={() => setActiveTab("validators")}
						>
							Validators
						</div>

						<div
							className={clsx(
								"text-2xl font-bold tracking-[0.12px] cursor-pointer ease-in duration-200",
								activeTab !== "staking" && "text-tertiary-text",
							)}
							onClick={() => setActiveTab("staking")}
						>
							My staking
						</div>
					</div>

					<div className="flex gap-2">
						<div className="gap-2">
							<div className="group relative z-10 cursor-pointer h-8 rounded-2xl bg-tertiary-text py-2 px-3 text-xs text-white flex items-center gap-1 ">
								<Icons.infoWhite />
								APR 16.5%
								<div
									className={clsx(
										`w-[220px] opacity-0 bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
									)}
								>
									APR is estimated percentage of your staked
									tokens that you will earn, on top of your
									staked tokens. The validators commission
									will be subtracted from it
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="h-4" />

				<div className="grid grid-cols-[1fr_150px_150px_150px_200px] gap-3 pb-2">
					<div className="text-sm	text-secondary-text">Name</div>
					<div
						onClick={() => {
							if (sortDropdown === "commision") {
								setSortDropdown("");
							} else {
								setSortDropdown("commision");
							}
						}}
						className="text-sm cursor-pointer w-fit	text-secondary-text flex items-center gap-1 group relative"
					>
						Commision
						<Icons.chevronsUpDown />
						{sortDropdown === "commision" ? (
							<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending />
									<div className="text-sm whitespace-nowrap">
										Sort ascending
									</div>
								</div>
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending className="rotate-180" />

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
						onClick={() => {
							if (sortDropdown === "voting") {
								setSortDropdown("");
							} else {
								setSortDropdown("voting");
							}
						}}
						className="text-sm cursor-pointer relative w-fit text-secondary-text flex items-center gap-1"
					>
						Voting power
						<Icons.chevronsUpDown />
						{sortDropdown === "voting" ? (
							<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending />
									<div className="text-sm whitespace-nowrap">
										Sort ascending
									</div>
								</div>
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending className="rotate-180" />

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
						onClick={() => {
							if (sortDropdown === "status") {
								setSortDropdown("");
							} else {
								setSortDropdown("status");
							}
						}}
						className="text-sm cursor-pointer relative w-fit	text-secondary-text flex items-center gap-1"
					>
						Status
						<Icons.chevronsUpDown />
						{sortDropdown === "status" ? (
							<div className="rounded-lg overflow-hidden	bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[28px] w-[240px]">
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending />
									<div className="text-sm whitespace-nowrap">
										Sort ascending
									</div>
								</div>
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
									<Icons.ascending className="rotate-180" />

									<div className="text-sm whitespace-nowrap">
										Sort descending
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div className="text-sm	text-secondary-text text-right">
						{activeTab == "staking" && "Amount staked"}
					</div>
				</div>

				{activeTab == "staking" ? (
					<Delegations openStakeModal={setStakeModal} />
				) : (
					<Validators openStakeModal={setStakeModal} />
				)}
			</div>

			{stakeModal && (
				<StakeModal
					validatorAddress={stakeModal}
					onHide={() => setStakeModal(undefined)}
				/>
			)}

			{isSignTransactionModal && (
				<SignTranactionModal
					onHide={() => setIsSignTransactionModal(false)}
				/>
			)}
		</div>
	);
}
