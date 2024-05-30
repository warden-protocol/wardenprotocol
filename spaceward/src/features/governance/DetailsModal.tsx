import clsx from "clsx";
import Portal from "@/components/ui/portal";
import { useState } from "react";
import { Icons } from "@/components/ui/icons-assets";
import VoteModal from "./VoteModal";
import VotesListModal from "./VotesListModal";

const DetailsModal = ({ onHide }: { onHide: () => void }) => {
	const [isVotesListModal, setVotesListModal] = useState(false);
	const [isVoteModal, setVoteModal] = useState(false);

	if (isVotesListModal) {
		return (
			<VotesListModal
				onHide={() => setVotesListModal(false)}
				onHideAll={onHide}
			/>
		);
	}

	if (isVoteModal) {
		return (
			<VoteModal onHide={() => setVoteModal(false)} onHideAll={onHide} />
		);
	}

	return (
		<Portal domId="intent-modal">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={onHide}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] w-[520px] tracking-widepb-5">
					<div className="font-bold text-5xl mb-12 leading-[56px] text-center">
						Proposal details
					</div>

					<div className="relative z-50 bg-secondary-bg rounded-xl px-6 py-6">
						<div className="flex justify-between items-start gap-2 mb-1">
							<div className="font-bold text-xl">
								#1 Signaling Proposal: Creation of a Conflict
								Resolution Council
							</div>

							<div className="flex flex-col justify-center">
								<div
									className={clsx(
										"rounded-2xl py-1 px-2 text-xs w-fit bg-secondary-bg",
									)}
								>
									Voting
								</div>
							</div>
						</div>

						<div className="text-secondary-text">
							Create a framework that the community can invoke to
							extend governance proceedings to properly evaluate
							what is being discussed.
						</div>

						<div className="mt-4 mb-4 h-[1px] bg-secondary-bg"></div>

						<div className="flex justify-between mb-4">
							<div className="font-bold text-xl">2,456 votes</div>
							<div
								onClick={() => setVotesListModal(true)}
								className="font-semibold text-secondary-text cursor-pointer"
							>
								Show Votes
							</div>
						</div>

						<div className="flex bg-secondary-text rounded-[48px] h-1">
							<div className="w-[45%] h-1 rounded-[48px] bg-positive ml-[-4px] relattive z-[3]"></div>
							<div className="w-[25%] h-1 rounded-[48px] bg-negative ml-[-4px] relattive z-[2]"></div>
							<div className="w-[15%] h-1 rounded-[48px] bg-pixel-pink ml-[-4px] relattive z-[1]"></div>
						</div>

						<div className="flex gap-3 text-sm mt-4 mb-7">
							<div className="flex gap-1 items-center">
								<div className="rounded-full w-[6px] h-[6px] bg-primary" />
								Yes, 66%
							</div>

							<div className="flex gap-1 items-center">
								<div className="rounded-full w-[6px] h-[6px] bg-negative" />
								No, 30%
							</div>

							<div className="flex gap-1 items-center">
								<div className="rounded-full w-[6px] h-[6px] bg-pixel-pink" />
								No with veto, 3%
							</div>

							<div className="flex gap-1 items-center">
								<div className="rounded-full w-[6px] h-[6px] bg-secondary-text" />
								Abstain, 1%
							</div>
						</div>

						<div className="flex items-center justify-between mb-5">
							<div>Proposer</div>
							<div className="flex gap-1 items-center cursor-pointer">
								warden1gsrjh...9ahqx6vsen
								<Icons.externalLink />
							</div>
						</div>

						<div className="flex items-center justify-between mb-5">
							<div>Creation date</div>
							<div>5 May, 24</div>
						</div>

						<div className="flex items-center justify-between mb-5">
							<div>Voting Started</div>
							<div>12 May, 24</div>
						</div>

						<div className="flex items-center justify-between">
							<div>Voting end</div>
							<div>26 June, 24</div>
						</div>
					</div>

					<button
						onClick={() => setVoteModal(true)}
						className={clsx(
							`mt-12 bg-foreground h-14 flex items-center justify-center w-full font-semibold text-background hover:bg-accent transition-all duration-200`,
						)}
					>
						Vote
					</button>
				</div>
			</div>
		</Portal>
	);
};

export default DetailsModal;
