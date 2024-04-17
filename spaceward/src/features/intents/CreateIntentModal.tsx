import Portal from "@/components/ui/portal";
import { ConditionType } from "@/types/intent";
import { XIcon } from "lucide-react";

const CreateIntentModal = ({
	onClose,
	index,
	handleCreateIntent,
	addCondition,
}: {
	onClose: () => void;
	index: number;
	handleCreateIntent?: (name: string, condition: ConditionType) => void;
	addCondition?: (newCondition: ConditionType) => void;
}) => {
	const handleClick = (name: string, condition: ConditionType) => {
		if (index !== -1 && addCondition) {
			addCondition(condition);
			onClose();
		} else if (handleCreateIntent) {
			handleCreateIntent(name, condition);
			onClose();
		}
	};
	return (
		<Portal domId="intent-modal">
			<div className="bg-[rgba(64,64,64,0.40)] absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[480px]">
				<button
					onClick={onClose}
					className="absolute top-8 right-8 opacity-50 hover:opacity-100 transition-all"
				>
					<XIcon className="h-6 w-6" />
				</button>

				<div className="max-w-[520px] text-center tracking-wide px-5 pb-5">
					<div className="font-display text-5xl mb-6">
						Select an approval condition
					</div>
					<div>How will transactions be approved</div>

					<div className="mt-12 flex flex-col gap-2 text-left">
						<div
							onClick={() => {
								handleClick("Intent name", "joint");
							}}
							className="flex items-center gap-3 py-5 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,174,238,0.15)]">
								<img src="/images/user-group.svg" alt="" />
							</div>
							<div>
								<p className="font-semibold">Joint approval</p>
								<p className="text-muted-foreground text-xs">
									Each approver must approve the transaction
								</p>
							</div>
							<div className="ml-auto">
								<img src="/images/chevron-right.svg" alt="" />
							</div>
						</div>

						<div
							onClick={() => {
								handleClick("Intent name", "group:2");
							}}
							className="flex items-center gap-3 py-5 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,174,238,0.15)]">
								<img src="/images/users-2.svg" alt="" />
							</div>
							<div>
								<p className="font-semibold">
									Approval by certain amount
								</p>
								<p className="text-muted-foreground text-xs">
									Set how many approvers should approve the
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
							<div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(255,174,238,0.15)]">
								<img src="/images/user-check-2.svg" alt="" />
							</div>
							<div>
								<p className="font-semibold">
									Approval by anyone
								</p>
								<p className="text-muted-foreground text-xs">
									Any approver can approve the transaction
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
