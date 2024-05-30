import Portal from "@/components/ui/portal";
import { useState } from "react";
import SignTranactionModal from "../assets/SignTransactionModal";

const VoteModal = ({
	onHide,
	onHideAll,
}: {
	onHide: () => void;
	onHideAll: () => void;
}) => {
	const [isSign, setIsSign] = useState(false);

	if (isSign) return <SignTranactionModal onHide={() => setIsSign(false)} />;

	return (
		<Portal domId="intent-modal">
			<div className="bg-overlay absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
				<button
					onClick={onHide}
					className="absolute top-8 left-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/goback.svg" alt="" />
				</button>
				<button
					onClick={onHideAll}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
					<div className="font-bold text-5xl mb-6 leading-[56px]">
						Vote
					</div>

					<div className="mb-12">
						#1 Signaling Proposal: Creation of a Conflict Resolution
						Council
					</div>

					<div className=" flex flex-col gap-5">
						<div
							onClick={() => setIsSign(true)}
							className="cursor-pointer bg-secondary-bg rounded-lg p-6 flex gap-3"
						>
							<div className="relative rounded-full border-[1px] border-checkbox w-6 h-6" />
							Yes
						</div>

						<div
							onClick={() => setIsSign(true)}
							className="cursor-pointer bg-secondary-bg rounded-lg p-6 flex gap-3"
						>
							<div className="relative rounded-full border-[1px] border-checkbox w-6 h-6" />
							No
						</div>

						<div
							onClick={() => setIsSign(true)}
							className="cursor-pointer bg-secondary-bg rounded-lg p-6 flex gap-3"
						>
							<div className="relative rounded-full border-[1px] border-checkbox w-6 h-6" />
							No with veto
						</div>

						<div
							onClick={() => setIsSign(true)}
							className="cursor-pointer bg-secondary-bg rounded-lg p-6 flex gap-3"
						>
							<div className="relative rounded-full border-[1px] border-checkbox w-6 h-6" />
							Abstain
						</div>
					</div>
				</div>
			</div>
		</Portal>
	);
};

export default VoteModal;
