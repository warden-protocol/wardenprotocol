import { useState } from "react";
import clsx from "clsx";
import Portal from "./ui/portal";
import { ConditionType, Intent } from "@/routes/intents";
import CreateIntentModal from "./create-intent-modal";
import IntentCondition from "./intent-condition";

const IntentComponent = ({
	intent,
	index,
	onIntentRemove,
	handleChangeIntent,
	handleRemoveCondition,
	handleUpdateUsers,
	handleSaveIntent,
}: {
	index: number;
	intent: Intent;
	onIntentRemove: (index: number) => void;
	handleChangeIntent?: (index: number, newCondition: ConditionType) => void;
	handleRemoveCondition: (
		intentIndex: number,
		conditionIndex: number,
	) => void;
	handleUpdateUsers: (
		intentIndex: number,
		conditionIndex: number,
		users: string[],
	) => void;
	handleSaveIntent: () => void;
}) => {
	const [isIntentActive, setIsIntentActive] = useState(false);
	const [isCondition, setIsCondition] = useState(false);
	const [isApproveIntent, setIsApproveIntent] = useState(false);
	const [addConditionModal, setAddConditionModal] = useState(false);

	return (
		<div
			className={clsx(
				`border-[1px] px-4 py-4  max-w-[680px]`,
				isIntentActive
					? `border-[#FFAEEE]`
					: ` border-[rgba(229,238,255,0.30)]`,
			)}
		>
			<div className="flex justify-between items-center border-b-[1px] border-[rgba(229,238,255,0.30)] pb-5">
				<input
					className="block w-full text-2xl bg-transparent outline-none focus:outline-none font-bold"
					placeholder="Name"
					value={intent.name}
				/>
				<div className="flex items-center gap-2">
					<div
						onClick={() => {
							setIsCondition(!isCondition);
						}}
						className={clsx(
							`cursor-pointer relative group flex items-center justify-center w-8 h-8 rounded-full hover:bg-[rgba(255,174,238,0.15)] transition-all duration-300`,
						)}
					>
						{!intent.id ? (
							<>
								<svg
									width="4"
									height="18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M2 8.5C1.72386 8.5 1.5 8.72386 1.5 9C1.5 9.27614 1.72386 9.5 2 9.5C2.27614 9.5 2.5 9.27614 2.5 9C2.5 8.72386 2.27614 8.5 2 8.5ZM0.5 9C0.5 8.17157 1.17157 7.5 2 7.5C2.82843 7.5 3.5 8.17157 3.5 9C3.5 9.82843 2.82843 10.5 2 10.5C1.17157 10.5 0.5 9.82843 0.5 9Z"
										fill="#FFAEEE"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M2 1.5C1.72386 1.5 1.5 1.72386 1.5 2C1.5 2.27614 1.72386 2.5 2 2.5C2.27614 2.5 2.5 2.27614 2.5 2C2.5 1.72386 2.27614 1.5 2 1.5ZM0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2C3.5 2.82843 2.82843 3.5 2 3.5C1.17157 3.5 0.5 2.82843 0.5 2Z"
										fill="#FFAEEE"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M2 15.5C1.72386 15.5 1.5 15.7239 1.5 16C1.5 16.2761 1.72386 16.5 2 16.5C2.27614 16.5 2.5 16.2761 2.5 16C2.5 15.7239 2.27614 15.5 2 15.5ZM0.5 16C0.5 15.1716 1.17157 14.5 2 14.5C2.82843 14.5 3.5 15.1716 3.5 16C3.5 16.8284 2.82843 17.5 2 17.5C1.17157 17.5 0.5 16.8284 0.5 16Z"
										fill="#FFAEEE"
									/>
								</svg>

								<div
									className={clsx(
										`opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
										isCondition &&
											`opacity-0 group-hover:opacity-0`,
									)}
								>
									Add Сondition or Remove
								</div>
							</>
						) : null}

						{isCondition && !intent.id ? (
							<div className="bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[40px] w-[240px]">
								<div
									onClick={() => {
										setAddConditionModal(true);
									}}
									className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
								>
									<img
										src="/images/file-input.svg"
										alt="Add Approval Condition"
									/>
									<div className="text-sm whitespace-nowrap">
										Add Approval Condition
									</div>
								</div>
								<div
									onClick={() => {
										setAddConditionModal(true);
										handleSaveIntent();
									}}
									className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
								>
									<img
										src="/images/file-input.svg"
										alt="Add Approval Condition"
									/>
									<div className="text-sm whitespace-nowrap">
										Save
									</div>
								</div>
								<div
									onClick={() => onIntentRemove(index)}
									className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
								>
									<img src="/images/trash.svg" alt="" />
									<div className="text-sm whitespace-nowrap text-[#E54545]">
										Remove
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<div
						className={clsx(
							`w-[52px] h-8 rounded-2xl px-[2px] py-[2px] relative cursor-pointer transition-all duration-300`,
							isIntentActive
								? `bg-[#FFAEEE]`
								: `bg-[rgba(229,238,255,0.30)] `,
						)}
						onClick={() => {
							setIsIntentActive(!isIntentActive);
							setIsApproveIntent(true);
						}}
					>
						<div
							className={clsx(
								`w-7 h-7 rounded-full bg-white absolute top-[2px] transition-all duration-300`,
								isIntentActive
									? `left-[calc(100%_-_2px)] translate-x-[-100%]`
									: `left-[2px]`,
							)}
						></div>
					</div>
				</div>
			</div>

			{intent.conditions.map((condition, key) => (
				<IntentCondition
					key={key}
					allAddresses={intent.addresses}
					threshold={
						condition.type.startsWith("group:")
							? condition.type.split(":")[1]
							: undefined
					}
					users={condition.group}
					type={condition.type}
					handleRemoveCondition={handleRemoveCondition}
					handleUpdateUsers={handleUpdateUsers}
					intent={intent}
					intentIndex={index}
					index={key}
				/>
			))}

			{isApproveIntent && (
				<Portal domId="intent-modal">
					<div className="bg-[rgba(64,64,64,0.40)] absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
						<button
							onClick={() => {
								setIsApproveIntent(false);
							}}
							className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
						>
							<img src="/images/button-close.svg" alt="" />
						</button>

						<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
							<div className="font-bold text-5xl mb-6 leading-[56px]">
								Approve the Intent in&nbsp;your&nbsp;wallet
							</div>
							<div>
								Open the browser extension if it didn&apos;t.
							</div>
						</div>
					</div>
				</Portal>
			)}

			{addConditionModal && (
				<CreateIntentModal
					onClose={() => setAddConditionModal(false)}
					intentId={intent.id}
					handleChangeIntent={handleChangeIntent}
				/>
			)}
		</div>
	);
};

export default IntentComponent;
