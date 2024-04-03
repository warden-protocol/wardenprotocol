import { useState } from "react";
import Portal from "./ui/portal";
import { Condition } from "@/routes/intents";

const CreateIntentModal = ({
	onClose,
	intentId,
	handleCreateIntent,
	handleChangeIntent,
}: {
	onClose: () => void;
	intentId?: number;
	handleCreateIntent?: (name: string, condition: Condition) => void;
	handleChangeIntent?: (id: number, newCondition: Condition) => void;
}) => {
	const handleClick = (name: string, condition: Condition) => {
		if (intentId && handleChangeIntent) {
			handleChangeIntent(intentId, condition);
			onClose();
		}
		if (handleCreateIntent) {
			handleCreateIntent(name, condition);
			onClose();
		}
	};
	return (
		<Portal domId="intent-modal">
			<div className="bg-[rgba(64,64,64,0.40)] absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[480px]">
				<button
					onClick={onClose}
					className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
				>
					<img src="/images/button-close.svg" alt="" />
				</button>

				<div className="max-w-[520px] text-center tracking-wide px-5 pb-5">
					<div className="font-bold text-5xl mb-6 leading-[56px]">
						Select an approval condition
					</div>
					<div>How will transactions be approved in the Space</div>

					<div className="mt-12 flex flex-col gap-2 text-left">
						<div
							onClick={() => {
								handleClick("Intent name", "joint");
							}}
							className="flex items-center gap-3 py-5 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 bg-[rgba(255,174,238,0.15)]">
								<img src="/images/user-group.svg" alt="" />
							</div>
							<div>
								<p className="font-semibold">Joint approval</p>
								<p className="text-[rgba(229,238,255,0.60)] text-xs">
									Each person must approve the transaction
								</p>
							</div>
							<div className="ml-auto">
								<img src="/images/chevron-right.svg" alt="" />
							</div>
						</div>

						<div
							onClick={() => {
								handleClick("Intent name", "group");
							}}
							className="flex items-center gap-3 py-5 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 bg-[rgba(255,174,238,0.15)]">
								<img src="/images/users-2.svg" alt="" />
							</div>
							<div>
								<p className="font-semibold">
									Approval by certain amount
								</p>
								<p className="text-[rgba(229,238,255,0.60)] text-xs">
									Set amount of persons should approve the
									transaction
								</p>
							</div>
							<div className="ml-auto">
								<img src="/images/chevron-right.svg" alt="" />
							</div>
						</div>

						<div
							onClick={() => {
								handleClick("Intent name", "anyone");
							}}
							className="flex items-center gap-3 py-5 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 bg-[rgba(255,174,238,0.15)]">
								<img src="/images/user-check-2.svg" alt="" />
							</div>
							<div>
								<p className="font-semibold">
									Approval by anyone
								</p>
								<p className="text-[rgba(229,238,255,0.60)] text-xs">
									Any person can approve the transaction
								</p>
							</div>
							<div className="ml-auto">
								<img src="/images/chevron-right.svg" alt="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Portal>
	);
};
export default CreateIntentModal;
