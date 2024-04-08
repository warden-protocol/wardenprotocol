import { ConditionType, SimpleIntent as Intent } from "@/types/intent";
import clsx from "clsx";
import { Fragment, useCallback, useMemo, useState } from "react";
import CreateIntentModal from "./create-intent-modal";
import IntentCondition from "./intent-condition";
import Portal from "./ui/portal";
import AddressAvatar from "./address-avatar";

const IntentComponent = ({
	intent: _intent,
	index,
	isActive,
	onIntentRemove,
	onIntentSave,
	onIntentToggle,
}: {
	index: number;
	intent: Intent;
	isActive: boolean;
	onIntentRemove: (index: number) => void;
	onIntentSave: (intent: Intent) => Promise<void>;
	onIntentToggle?: () => void;
}) => {
	const [diff, setDiff] = useState<Partial<Intent>>({});
	const intent = useMemo(() => ({ ..._intent, ...diff }), [diff, _intent]);
	const [isCondition, setIsCondition] = useState(false);
	const [isApproveIntent, setIsApproveIntent] = useState(false);
	const [addConditionModal, setAddConditionModal] = useState(false);

	const [isEditState, setIsEditState] = useState(false);

	const addCondition = useCallback(
		(condition: ConditionType) => {
			const conditions = [
				...intent.conditions,
				{ type: condition, group: [] },
			];

			const operators = [...intent.operators, "or"] as ("or" | "and")[];

			setDiff((prev) => ({
				...prev,
				conditions,
				operators,
			}));
		},
		[intent],
	);

	const removeCondition = useCallback(
		(index: number) => {
			const conditions = [
				...intent.conditions.filter((_, i) => i !== index),
			];

			const operators = [
				...intent.operators.filter((_, i) =>
					i ? index - 1 === i : !i,
				),
			];

			setDiff((prev) => ({
				...prev,
				conditions,
				operators,
			}));
		},
		[intent],
	);

	const { addresses: _, ...rest } = diff; // do not show update if only addresses field was updated
	const isUpdated = Boolean(Object.keys(rest).length) || !intent.id;

	return (
		<div
			className={clsx(
				`border-[1px] px-4 py-4  max-w-[680px]`,
				isActive
					? `border-[#FFAEEE]`
					: ` border-[rgba(229,238,255,0.30)]`,
			)}
		>
			<div
				className={clsx(
					`flex justify-between items-center border-[rgba(229,238,255,0.30)] `,
					isEditState ? `border-b-[1px] pb-5` : `pb-2`,
				)}
			>
				{isEditState ? (
					<div className="block w-full text-2xl bg-transparent outline-none focus:outline-none font-bold">
						{intent.name}
					</div>
				) : (
					<input
						className="block w-full text-2xl bg-transparent outline-none focus:outline-none font-bold"
						placeholder="Name"
						value={intent.name}
						onChange={(e) => {
							setDiff((prev) => ({
								...prev,
								name: e.target.value,
							}));
						}}
					/>
				)}

				<div className="flex items-center gap-2">
					{isEditState ? (
						<div
							onClick={() => {
								setIsCondition(!isCondition);
							}}
							className={clsx(
								`cursor-pointer relative group flex items-center justify-center w-8 h-8 rounded-full hover:bg-[rgba(255,174,238,0.15)] transition-all duration-300`,
							)}
						>
							<img src="/images/plus-circle.svg" alt="" />

							<div
								className={clsx(
									`opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
									isCondition &&
										`opacity-0 group-hover:opacity-0`,
								)}
							>
								Add Сonditions
							</div>

							{isCondition ? (
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
									{!intent.id ? (
										<div
											onClick={() =>
												onIntentRemove(index)
											}
											className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										>
											<img
												src="/images/trash.svg"
												alt=""
											/>
											<div className="text-sm whitespace-nowrap text-[#E54545]">
												Remove
											</div>
										</div>
									) : null}
								</div>
							) : (
								<div></div>
							)}
						</div>
					) : (
						<button
							onClick={() => {
								setIsEditState(true);
							}}
							className="group relative"
						>
							<img src="/images/edit-icon.svg" alt="" />
							<div
								className={clsx(
									`opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
								)}
							>
								Edit intent
							</div>
						</button>
					)}

					<div
						className={clsx(
							`w-[52px] h-8 rounded-2xl px-[2px] py-[2px] relative cursor-pointer transition-all duration-300`,
							isActive
								? `bg-[#FFAEEE]`
								: `bg-[rgba(229,238,255,0.30)] `,
						)}
						onClick={async () => {
							if (onIntentToggle) {
								setIsApproveIntent(true);

								try {
									await onIntentToggle();
								} catch (e) {
									console.error(e);
								}

								setIsApproveIntent(false);
							}
						}}
					>
						<div
							className={clsx(
								`w-7 h-7 rounded-full bg-white absolute top-[2px] transition-all duration-300`,
								isActive
									? `left-[calc(100%_-_2px)] translate-x-[-100%]`
									: `left-[2px]`,
							)}
						></div>
					</div>
				</div>
			</div>

			{isEditState ? (
				<div>
					{intent.conditions.map((condition, i) => {
						const isGroup = condition.type.startsWith("group:");

						const [type, threshold] = isGroup
							? condition.type.split(":")
							: [condition.type];

						return (
							<IntentCondition
								key={`${type}-${i}`}
								allAddresses={intent.addresses}
								threshold={isGroup ? threshold : undefined}
								users={condition.group}
								type={condition.type}
								handleRemoveCondition={removeCondition.bind(
									null,
									i,
								)}
								index={i}
								onChange={(condition) => {
									const conditions = [...intent.conditions];
									conditions[i] = condition;
									setDiff((prev) => ({
										...prev,
										conditions,
									}));
								}}
								onUserAdd={(user) => {
									const unique = new Set<string>();

									const addresses = [
										...intent.addresses,
										user,
									].filter((x) => {
										if (unique.has(x)) {
											return false;
										}

										unique.add(x);
										return true;
									});

									setDiff((prev) => ({ ...prev, addresses }));
								}}
							/>
						);
					})}

					<div className="mt-9 flex gap-2 items-center">
						<button
							onClick={async () => {
								if (!isUpdated) {
									return;
								}

								const isNewIntent = !intent.id;
								await onIntentSave(intent);
								setDiff({});

								if (isNewIntent) {
									onIntentRemove(index);
								}

								setIsEditState(false);
							}}
							className={clsx(
								`bg-[#FFF] h-14 px-6 flex gap-2 items-center justify-center font-semibold text-[#000] hover:bg-[#FFAEEE] transition-all duration-200`,
								isUpdated
									? ``
									: `opacity-[0.3] pointer-events-none`,
							)}
						>
							<img src="/images/check.svg" alt="" />
							Save
						</button>

						<button
							onClick={() => {
								setDiff({});
								setIsEditState(false);
							}}
							className={clsx(
								`bg-[transparent] h-14 px-6 flex gap-2 items-center justify-center font-semibold text-[#FFF] hover:text-[#FFAEEE] transition-all duration-200`,
								// Object.keys(diff).length || !intent.id
								// 	? ``
								// 	: `opacity-[0.3] pointer-events-none`,
							)}
						>
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g id="icon/ban">
									<g id="Union">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12C21.5 6.75329 17.2467 2.5 12 2.5ZM1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12Z"
											fill="currentColor"
											fillOpacity="1"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M4.54645 4.54645C4.74171 4.35118 5.05829 4.35118 5.25355 4.54645L19.4536 18.7464C19.6488 18.9417 19.6488 19.2583 19.4536 19.4536C19.2583 19.6488 18.9417 19.6488 18.7464 19.4536L4.54645 5.25355C4.35118 5.05829 4.35118 4.74171 4.54645 4.54645Z"
											fill="currentColor"
											fillOpacity="1"
										/>
									</g>
								</g>
							</svg>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<div className="flex gap-2 text-[rgba(229,238,255,0.60)]">
					<div className="flex items-center">
						{intent.addresses.slice(0, 2).map((address, key) => (
							<div className="w-6 h-6 rounded-full mr-[-8px]">
								<AddressAvatar seed={address} key={key} sm />
							</div>
						))}
						{intent.addresses.length > 2 ? (
							<div className="relative z-[2] flex items-center justify-center rounded-full w-6 h-6 min-w-6 min-h-6 border-solid bg-[#232527] text-xs text-[#FFAEEE] border-[#232527] border-[1px] ">
								+{intent.addresses.length - 2}
							</div>
						) : (
							<></>
						)}
					</div>
					{intent.conditions.map((condition, key) => (
						<Fragment key={key}>
							{key ? (
								<>{intent.operators[key - 1]}&nbsp;</>
							) : null}
							{condition.type == "joint" ? (
								`Joint approval`
							) : condition.type == "anyone" ? (
								`Approval by anyone`
							) : (
								<>
									Approval by {condition.type.slice(6)} of{" "}
									{condition.group.length}
								</>
							)}{" "}
						</Fragment>
					))}
				</div>
			)}

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
					index={index}
					addCondition={addCondition}
				/>
			)}
		</div>
	);
};

export default IntentComponent;
