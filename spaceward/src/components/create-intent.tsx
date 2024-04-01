import { useState } from "react";
import clsx from "clsx";
import AddressUnit from "./address-unit";

const INTENTS = [
	{
		name: "DC",
		address: "0xD35dFbA4E4Cf21F56E2E7bC6fDb2c6A5C2410df8",
	},
	{
		name: "AC",
		address: "0xD35dFbA4E4Cf21F56E2E7bC6fDb2c6A5C2410df8",
	},
	{
		name: "OK",
		address: "0xD35dFbA4E4Cf21F56E2E7bC6fDb2c6A5C2410df8",
	},
	{
		name: "LK",
		address: "0xD35dFbA4E4Cf21F56E2E7bC6fDb2c6A5C2410df8",
	},
];

const CreateIntent = () => {
	const [isIntentActive, setIsIntentActive] = useState(false);
	const [isCondition, setIsCondition] = useState(false);
	const [isApprovalAmount, setIsApprovalAmount] = useState(true);
	const [isCountChange, setIsCountChange] = useState(false);
	const [warning, setWarning] = useState(false);

	const [approvalAmount, setApprovalAmount] = useState(2);

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
					value="Intent 1"
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
						{isCondition ? (
							<div className="bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[40px] w-[240px]">
								<div
									onClick={() => {
										setIsApprovalAmount(true);
									}}
									className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
								>
									<img src="/images/file-input.svg" alt="" />
									<div className="text-sm whitespace-nowrap">
										Add Approval Condition
									</div>
								</div>
								<div className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300">
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
						onClick={() => setIsIntentActive(!isIntentActive)}
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

			<div className="mt-4 mb-4">
				<div className="text-xl bg-transparent flex justify-between items-center font-bold">
					Joint approval
					<div className="group relative cursor-pointer">
						<img src="/images/x.svg" alt="" />
						<div className="opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
							Remove Condition
						</div>
					</div>
				</div>
				<div className="text-[rgba(229,238,255,0.60)] mt-1">
					Each person must approve the transaction
				</div>
				<div className="mt-8 flex items-center gap-[8px] flex-wrap">
					{INTENTS.map((intent, key) => {
						return <AddressUnit intent={intent} key={key} />;
					})}
					<button className="text-sm	text-[#FFAEEE] flex w-fit items-center gap-[10px] h-12">
						<img src="/images/plus.svg" alt="" />
						Add Persons
					</button>
				</div>
			</div>

			{isApprovalAmount ? (
				<div className="mt-8 pt-4 mb-4 relative">
					<div
						className="absolute text-[rgba(229,238,255,0.30)] text-xs left-1/2 top-0 translate-x-[-50%] translate-y-[-50%] w-full text-center
                    before:content-[''] before:w-[calc(50%_-_16px)] before:h-[1px] before:bg-[rgba(229,238,255,0.30)] before:block before:top-1/2 before:left-0 before:absolute
                    after:content-[''] after:w-[calc(50%_-_16px)] after:h-[1px] after:bg-[rgba(229,238,255,0.30)] after:block after:top-1/2 after:right-0 after:absolute"
					>
						OR
					</div>

					<div className="mt-4 mb-4">
						<div className="text-xl bg-transparent flex justify-between items-center font-bold">
							Approval by certain amount
							<div className="flex items-center gap-2">
								{warning && (
									<img
										src="/images/alert-triangle.svg"
										alt=""
									/>
								)}
								<div className="group relative cursor-pointer">
									<img src="/images/x.svg" alt="" />
									<div className="opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
										Remove Condition
									</div>
								</div>
							</div>
						</div>
						<div className="text-[rgba(229,238,255,0.60)] mt-1">
							Any{" "}
							<span
								onClick={() => {
									setIsCountChange(!isCountChange);
								}}
								className="min-w-[17px] text-center inline-block bg-[rgba(229,238,255,0.15)] border-[1px] border-[rgba(229,238,255,0.30)] px-[2px] text-white rounded-sm cursor-pointer relative"
							>
								{approvalAmount}
								{isCountChange && (
									<div className="w-[56px] bg-[rgba(229,238,255,0.15)] absolute z-10 top-1/2 right-[calc(-100%_-_12px)] translate-x-[100%] backdrop-blur-[20px] translate-y-[-50%] before:content-[''] before:absolute before:left-[0] before:top-1/2  before:border-[rgba(229,238,255,0.3)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[45deg] before:translate-y-[-50%] before:translate-x-[-50%]">
										<div className="flex flex-col gap-[2px] text-white text-center text-sm py-1 px-1 max-h-[120px] overflow-scroll no-scrollbar">
											{[2, 3, 4, 5, 6, 7, 8, 9].map(
												(item, key) => {
													return (
														<div
															className={clsx(
																`min-h-[24px] flex justify-center items-center text-[rgba(229,238,255,0.60)]`,
																item ==
																	approvalAmount &&
																	`text-white bg-[rgba(229,238,255,0.15)]`,
															)}
															key={key}
															onClick={() => {
																setApprovalAmount(
																	item,
																);
															}}
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
						</div>
						<div className="mt-8 flex items-center gap-[8px] flex-wrap">
							{INTENTS.map((intent, key) => {
								return (
									<AddressUnit intent={intent} key={key} />
								);
							})}
							<button
								className={clsx(
									`text-sm flex w-fit items-center gap-[10px] h-12`,
									warning
										? `text-[#E54545]`
										: `text-[#FFAEEE]`,
								)}
							>
								{warning ? (
									<img
										src="/images/alert-triangle.svg"
										alt=""
									/>
								) : (
									<img src="/images/plus.svg" alt="" />
								)}
								Add Persons
							</button>
						</div>
					</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default CreateIntent;
