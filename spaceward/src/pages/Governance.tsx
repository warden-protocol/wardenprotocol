import { useState } from "react";
import clsx from "clsx";
import SignTranactionModal from "@/features/assets/SignTransactionModal";
import { Icons } from "@/components/ui/icons-assets";
import GovernanceRow from "@/features/governance/ItemRow";
import GovernanceCard from "@/features/governance/ItemCard";
import DetailsModal from "@/features/governance/DetailsModal";
import CantVoteModal from "@/features/governance/CantVoteModal";

const PLACEHOLDER = [
	{
		name: "Signaling Proposal: Creation some text and more more",
		status: "Voting",
		votes: 12341,
		votingStart: new Date(1717077597194),
		votingEnd: new Date(1717477597194),
	},
	{
		name: "Signaling Proposal: Creation some text",
		status: "Passed",
		votes: 1123,
		votingStart: new Date(1717077597194),
		votingEnd: new Date(1717477597194),
	},
	{
		name: "Signaling Proposal: Creation some text",
		status: "Rejected",
		votes: 19941,
		votingStart: new Date(1711077597194),
		votingEnd: new Date(1717877597194),
	},
	{
		name: "Signaling Proposal: Creation some text",
		status: "Failed",
		votes: 1241,
		votingStart: new Date(1707077597194),
		votingEnd: new Date(1737477597194),
	},
	{
		name: "Signaling Proposal: Creation some text and more more",
		status: "Voting",
		votes: 12341,
		votingStart: new Date(1717077597194),
		votingEnd: new Date(1717477597194),
	},
	{
		name: "Signaling Proposal: Creation some text",
		status: "Passed",
		votes: 1123,
		votingStart: new Date(1717077597194),
		votingEnd: new Date(1717477597194),
	},
];

export function GovernancePage() {
	const [sortDropdown, setSortDropdown] = useState("");
	const [layout, setLayout] = useState<"list" | "grid">("list");

	const [isSignTransactionModal, setIsSignTransactionModal] = useState(false);
	const [isProposalsDropdown, setIsProposalsDropdown] = useState(false);

	const [noProposals, setNoProposals] = useState(false);

	const [isDetailsModal, setDetailsModal] = useState(false);
	const [isCantVoteModal, setCantVoteModal] = useState(false);

	if (noProposals) {
		return (
			<div className="h-[calc(100vh_-_120px)] min-h-[550px] flex flex-col justify-center items-center text-center">
				<Icons.noFile />
				<div className="h-[72px]" />
				<div className="text-5xl font-bold">No proposals yet</div>
				<div className="h-6" />
				<div className="">Suggest your proposals</div>
				<div className="h-12" />
				<button className="text-black bg-white h-[56px] rounded-lg justify-center text-base font-medium flex items-center gap-2 py-1 px-6">
					<Icons.externalLink className="invert" />
					Visit Warden Forum
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2">
				<h2 className="text-5xl font-bold">Governance</h2>
			</div>

			<div className="bg-banner rounded-xl py-5 px-6 relative flex justify-between items-center isolate">
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
					<div className="text-secondary-text">
						Join the conversation around potentional governance
						proposals
					</div>
				</div>
				<a href="#" className="flex gap-2 items-center font-semibold">
					<Icons.externalLink />
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
								setIsProposalsDropdown(!isProposalsDropdown)
							}
							className="cursor-pointer group relative h-8 rounded-2xl bg-secondary-bg py-2 px-3 text-xs text-white flex items-center gap-[2px]"
						>
							All Proposals
							<Icons.chevronDown
								className={
									isProposalsDropdown ? "rotate-180" : ""
								}
							/>
							{isProposalsDropdown && (
								<div className="w-[248px] bg-secondary-bg text-white text-sm rounded-lg  py-2 absolute z-10 bottom-[-8px] right-0 whitespace-nowrap backdrop-blur-[30px] translate-y-[100%] ">
									<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
										All Proposals
										<Icons.check className="ml-auto" />
									</div>
									<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
										Voting
									</div>
									<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
										Passed
									</div>
									<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
										Rejected
									</div>
									<div className="cursor-pointer h-10 px-4 flex items-center gap-3">
										Failed
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="h-8 rounded-2xl bg-secondary-bg py-[2px] px-[2px] text-xs text-white flex items-center gap-1 ">
						<div
							onClick={() => setLayout("list")}
							className={clsx(
								"duration-200 ease-in flex items-center justify-center rounded-full w-6 h-6 cursor-pointer",
								layout == "list" && "bg-white",
							)}
						>
							<Icons.list
								className={clsx(
									"duration-200 ease-in",
									layout == "list" && "invert",
								)}
							/>
						</div>
						<div
							onClick={() => setLayout("grid")}
							className={clsx(
								"duration-200 ease-in flex items-center justify-center rounded-full w-6 h-6 cursor-pointer",
								layout == "grid" && "bg-white",
							)}
						>
							<Icons.grid
								className={clsx(
									"duration-200 ease-in",
									layout == "grid" && "invert",
								)}
							/>
						</div>
					</div>
				</div>
			</div>

			<div
				className={clsx(
					layout == "list"
						? "bg-tertiary rounded-xl border-border-secondary border-[1px] px-8 py-6"
						: "grid grid-cols-3 gap-6 pb-10",
				)}
			>
				{layout == "list" && (
					<div className="grid grid-cols-[24px_1fr_125px_140px_140px_140px_90px] gap-3 pb-2">
						<div className="text-sm	text-secondary-text">#</div>
						<div className="text-sm w-fit text-secondary-text">
							Title
						</div>
						<div
							onClick={() => {
								if (sortDropdown === "status") {
									setSortDropdown("");
								} else {
									setSortDropdown("status");
								}
							}}
							className="text-sm cursor-pointer relative w-fit text-secondary-text flex items-center gap-1"
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
						<div
							onClick={() => {
								if (sortDropdown === "votes") {
									setSortDropdown("");
								} else {
									setSortDropdown("votes");
								}
							}}
							className="text-sm cursor-pointer relative w-fit	text-secondary-text flex items-center gap-1"
						>
							Votes
							<Icons.chevronsUpDown />
							{sortDropdown === "votes" ? (
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
								if (sortDropdown === "start") {
									setSortDropdown("");
								} else {
									setSortDropdown("start");
								}
							}}
							className="text-sm cursor-pointer relative w-fit	text-secondary-text flex items-center gap-1"
						>
							Voting start
							<Icons.chevronsUpDown />
							{sortDropdown === "start" ? (
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
								if (sortDropdown === "end") {
									setSortDropdown("");
								} else {
									setSortDropdown("end");
								}
							}}
							className="text-sm cursor-pointer relative w-fit	text-secondary-text flex items-center gap-1"
						>
							Voting end
							<Icons.chevronsUpDown />
							{sortDropdown === "end" ? (
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
						<div></div>
					</div>
				)}

				{PLACEHOLDER.map((item, key) => {
					if (layout == "list") {
						return (
							<div>
								<GovernanceRow
									key={key}
									place={key + 1}
									item={item}
								/>
							</div>
						);
					} else {
						return (
							<GovernanceCard
								key={key}
								place={key + 1}
								item={item}
							/>
						);
					}
				})}
			</div>

			{isDetailsModal && (
				<DetailsModal onHide={() => setDetailsModal(false)} />
			)}

			{isSignTransactionModal && (
				<SignTranactionModal
					onHide={() => setIsSignTransactionModal(false)}
				/>
			)}

			{isCantVoteModal && (
				<CantVoteModal onHide={() => setCantVoteModal(false)} />
			)}
		</div>
	);
}
