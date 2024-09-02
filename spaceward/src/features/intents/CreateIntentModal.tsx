import { Icons } from "@/components/ui/icons";
import Portal from "@/components/ui/portal";
import { ConditionType } from "@/types/intent";
import { XIcon } from "lucide-react";

const CreateIntentModal = ({
	onClose,
	index,
	handleCreateIntent,
	addCondition,
	length,
}: {
	onClose: () => void;
	index: number;
	handleCreateIntent?: (name: string, condition: ConditionType) => void;
	addCondition?: (newCondition: ConditionType) => void;
	length?: number;
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
			<div className="bg-[rgba(64,64,64,0.40)] absolute left-0 top-0 w-full h-full backdrop-blur-md flex items-center justify-center min-h-[480px]">
				<button
					onClick={onClose}
					className="absolute top-8 right-8 opacity-50 hover:opacity-100 transition-all"
				>
					<XIcon className="h-6 w-6" />
				</button>

				<div className="max-w-[520px] text-center tracking-wide pb-5">
					<div className="font-bold text-5xl mb-6">
						Select an approval condition
					</div>
					<div>How will transactions be approved</div>

					<div className="mt-12 flex flex-col gap-2 text-left">
						<div
							onClick={() => {
								handleClick(
									`#${(length ?? 0) + 1} Rule name`,
									"joint",
								);
							}}
							className="tracking-normal flex items-center gap-3 py-5 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded bg-fill-accent-secondary">
								<Icons.userGroup />
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
								handleClick(
									`#${(length ?? 0) + 1} Rule name`,
									"group:2",
								);
							}}
							className="tracking-normal flex items-center gap-3 py-5 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded bg-fill-accent-secondary">
								<Icons.usersAmount />
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
								handleClick(
									`#${(length ?? 0) + 1} Rule name`,
									"anyone",
								);
							}}
							className="tracking-normal flex items-center gap-3 py-5 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded bg-fill-accent-secondary">
								<Icons.usersCheck />
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

						<div
							onClick={() => {
								handleClick(
									`#${(length ?? 0) + 1} Rule name`,
									"advanced",
								);
							}}
							className="tracking-normal flex items-center gap-3 py-5 cursor-pointer"
						>
							<div className="flex items-center justify-center w-10 h-10 rounded bg-fill-accent-secondary">
								<Icons.userCog />
							</div>

							<div>
								<p className="font-semibold flex items-center gap-1">
									Advanced mode
									<div className="text-xs	font-normal	leading-3 flex items-center gap-[2px] rounded-2xl	bg-[rgba(229,238,255,0.15)] backdrop-blur-md py-1 pl-1 pr-2 h-6">
										<Icons.star />
										For experts
									</div>
								</p>
								<p className="text-muted-foreground text-xs">
									Create your transaction approval rules
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
