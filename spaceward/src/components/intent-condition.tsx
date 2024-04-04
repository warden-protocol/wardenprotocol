import { ConditionType, Intent } from "@/routes/intents";
import AddressUnit from "./address-unit";
import { useState } from "react";
import clsx from "clsx";
import Portal from "./ui/portal";
import PersonSelect from "./person-select";
import AddPersonModal from "./add-person-modal";

const IntentCondition = ({
	intent,
	type,
	allAddresses,
	threshold,
	users,
	handleRemoveCondition,
	index,
}: {
	type: ConditionType;
	allAddresses: string[];
	threshold?: string;
	users?: string[];
	handleRemoveCondition: (id: number, conditionIndex: number) => void;
	intent: Intent;
	index: number;
}) => {
	const [isCountChange, setIsCountChange] = useState(false);
	const [isPersonsModal, setIsPersonsModal] = useState(false);
	const [isAddPerson, setIsAddPerson] = useState(false);

	const [warning, setWarning] = useState(false);

	console.log(index);

	return (
		<div className={clsx(index > 0 && `mt-8 pt-4 mb-4 relative`)}>
			{index > 0 && (
				<div
					className="absolute text-[rgba(229,238,255,0.30)] text-xs left-1/2 top-0 translate-x-[-50%] translate-y-[-50%] w-full text-center
                    before:content-[''] before:w-[calc(50%_-_16px)] before:h-[1px] before:bg-[rgba(229,238,255,0.30)] before:block before:top-1/2 before:left-0 before:absolute
                    after:content-[''] after:w-[calc(50%_-_16px)] after:h-[1px] after:bg-[rgba(229,238,255,0.30)] after:block after:top-1/2 after:right-0 after:absolute"
				>
					OR
				</div>
			)}
			<div className="mt-4 mb-4">
				<div className="text-xl bg-transparent flex justify-between items-center font-bold">
					{type == "joint"
						? `Joint approval`
						: type == "anyone"
							? `Approval by anyone`
							: `Approval by certain amount`}
					<div className="flex items-center gap-2">
						{warning && (
							<img src="/images/alert-triangle.svg" alt="" />
						)}
						<div
							onClick={() =>
								handleRemoveCondition(intent.id, index)
							}
							className="group relative cursor-pointer"
						>
							<img src="/images/x.svg" alt="" />
							<div className="opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
								Remove Condition
							</div>
						</div>
					</div>
				</div>
				<div className="text-[rgba(229,238,255,0.60)] mt-1">
					{type == "joint" ? (
						`Each person must approve the transaction`
					) : type == "anyone" ? (
						`Any person can approve the transaction`
					) : (
						<>
							Any{" "}
							<span
								onClick={() => {
									setIsCountChange(!isCountChange);
								}}
								className="min-w-[17px] text-center inline-block bg-[rgba(229,238,255,0.15)] border-[1px] border-[rgba(229,238,255,0.30)] px-[2px] text-white rounded-sm cursor-pointer relative"
							>
								{threshold}
								{isCountChange && (
									<div className="w-[56px] bg-[rgba(229,238,255,0.15)] absolute z-10 top-1/2 right-[calc(-100%_-_12px)] translate-x-[100%] backdrop-blur-[20px] translate-y-[-50%] before:content-[''] before:absolute before:left-[0] before:top-1/2  before:border-[rgba(229,238,255,0.3)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[45deg] before:translate-y-[-50%] before:translate-x-[-50%]">
										<div className="flex flex-col gap-[2px] text-white text-center text-sm py-1 px-1 max-h-[120px] overflow-scroll no-scrollbar">
											{[2, 3, 4, 5, 6, 7, 8, 9].map(
												(item, key) => {
													return (
														<div
															className={clsx(
																`min-h-[24px] flex justify-center items-center text-[rgba(229,238,255,0.60)]`,
																item.toString() ==
																	threshold &&
																	`text-white bg-[rgba(229,238,255,0.15)]`,
															)}
															key={key}
															// onClick={() => {
															// 	setApprovalAmount(
															// 		item,
															// 	);
															// }}
														>
															{item}
														</div>
													);
												},
											)}
										</div>
									</div>
								)}
							</span>{" "}
							persons should approve the transaction
						</>
					)}
				</div>
				<div className="mt-8 flex items-center gap-[8px] flex-wrap">
					{users?.map((user, key) => {
						return <AddressUnit address={user} key={key} />;
					})}
					<button
						onClick={() => {
							setIsPersonsModal(true);
						}}
						className={clsx(
							`text-sm flex w-fit items-center gap-[10px] h-12`,
							warning ? `text-[#E54545]` : `text-[#FFAEEE]`,
						)}
					>
						{warning ? (
							<img src="/images/alert-triangle.svg" alt="" />
						) : (
							<img src="/images/plus.svg" alt="" />
						)}
						Add Persons
					</button>
				</div>

				{isPersonsModal && (
					<Portal domId="intent-modal">
						<div className="bg-[rgba(64,64,64,0.40)] absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
							<button
								onClick={() => {
									setIsPersonsModal(false);
								}}
								className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
							>
								<img src="/images/button-close.svg" alt="" />
							</button>

							<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
								<div className="font-bold text-5xl mb-6 leading-[56px]">
									Select the persons
								</div>
								<div>Who should approve the transactions</div>

								<div className="mt-12 flex justify-between items-center text-[rgba(229,238,255,0.60)] font-semibold">
									<button
										onClick={() => {
											setIsAddPerson(true);
											setIsPersonsModal(false);
										}}
										className="px-5 hover:text-white transition-all duration-200"
									>
										Add Person
									</button>
									<button className="px-5 hover:text-white transition-all duration-200">
										Select All
									</button>
								</div>
								<div className="flex flex-col text-left">
									{allAddresses
										?.slice(0, 4)
										.map((address, key) => (
											<PersonSelect
												address={address}
												key={key}
											/>
										))}
								</div>

								<div className="mt-12 pt-6 border-[rgba(229,238,255,0.30)] border-t-[1px]">
									<button
										onClick={() => {
											setIsPersonsModal(false);
										}}
										className="bg-[#FFF] h-14 flex items-center justify-center w-full font-semibold text-[#000] hover:bg-[#FFAEEE] transition-all duration-200"
									>
										Done
									</button>
								</div>
							</div>
						</div>
					</Portal>
				)}

				{isAddPerson && (
					<AddPersonModal
						onPrevModal={() => {
							setIsPersonsModal(true);
						}}
						onClose={() => setIsAddPerson(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default IntentCondition;
