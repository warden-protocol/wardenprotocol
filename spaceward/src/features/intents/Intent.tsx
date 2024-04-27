import {
	ConditionType,
	SimpleIntent as Intent,
	IntentParams,
} from "@/types/intent";
import clsx from "clsx";
import { Fragment, useCallback, useMemo, useReducer, useRef } from "react";
import AdvancedMode from "./AdvancedMode";
import CreateIntentModal from "./CreateIntentModal";
import IntentCondition from "./IntentCondition";
import Portal from "@/components/ui/portal";
import AddressAvatar from "@/components/AddressAvatar";
import { CheckIcon, Edit2Icon, XIcon } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import ChangeAddressesModal from "./ChangeAddressesModal";
import AddAddressModal from "./AddAddressModal";

type IntentEditState = "advanced" | "simple";

interface State {
	diff: Partial<Intent>;
	editState?: IntentEditState;
	addDropdownVisible: boolean;
	addModalVisible: boolean;
	editDropdownVisible: boolean;
	txOverlayVisible: boolean;
	addAddressModalVisible: boolean;
	changeAddressModalVisible: boolean;
	changeAddresses: string[];
	changeAddressesCallback?: (addresses: string[]) => void;
}

type _Actions<T extends keyof State> = {
	type: T;
	payload: State[T];
};

type Actions = _Actions<keyof State> | { type: "set"; payload: Partial<State> };

const reducer = (state: State, action: Actions) =>
	action.type === "set"
		? { ...state, ...action.payload }
		: {
				...state,
				[action.type]: action.payload,
			};

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
	onIntentSave: (params: IntentParams) => Promise<void>;
	onIntentToggle?: () => void;
}) => {
	const [state, dispatch] = useReducer(reducer, {
		addDropdownVisible: false,
		addModalVisible: false,
		editDropdownVisible: false,
		txOverlayVisible: false,
		diff: {},
		addAddressModalVisible: false,
		changeAddressModalVisible: false,
		changeAddresses: [],
	});

	const {
		editState,
		diff,
		addDropdownVisible: isCondition,
		addModalVisible: addConditionModal,
		editDropdownVisible,
		txOverlayVisible: isApproveIntent,
	} = state;

	const intent = useMemo(() => ({ ..._intent, ...diff }), [diff, _intent]);
	const editDropdownRef = useRef<HTMLButtonElement>(null);

	useClickOutside(editDropdownRef, () =>
		dispatch({ type: "editDropdownVisible", payload: false }),
	);

	const toggleChangeAddresses = useCallback(
		(
			addresses: string[],
			visible: boolean,
			onChange?: (addresses: string[]) => void,
		) => {
			dispatch({
				type: "set",
				payload: {
					changeAddresses: addresses,
					changeAddressModalVisible: visible,
					changeAddressesCallback: onChange,
				},
			});
		},
		[],
	);

	const addCondition = useCallback(
		(condition: ConditionType) => {
			const conditions = [
				...intent.conditions,
				{ type: condition, group: [], expression: {} },
			];

			const operators = [...intent.operators, "or"] as ("or" | "and")[];

			dispatch({
				type: "diff",
				payload: { ...diff, conditions, operators },
			});
		},
		[intent, diff],
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

			dispatch({
				type: "diff",
				payload: { ...diff, conditions, operators },
			});
		},
		[intent, diff],
	);

	const { addresses: _, ...rest } = diff; // do not show update if only addresses field was updated
	const isUpdated = Boolean(Object.keys(rest).length) || !intent.id;

	return (
		<div
			className={clsx(
				`p-6 w-full rounded-xl bg-card`,
				isActive ? `border-accent border-2` : `border-0`,
			)}
		>
			<div
				className={clsx(
					`flex justify-between items-center border-[rgba(229,238,255,0.30)] `,
					editState ? `border-b pb-5` : `pb-2`,
				)}
			>
				{editState ? (
					<input
						className="block w-full text-2xl bg-transparent outline-none focus:outline-none font-bold"
						placeholder="Intent Name"
						value={intent.name}
						onChange={(e) => {
							dispatch({
								type: "diff",
								payload: { ...diff, name: e.target.value },
							});
						}}
					/>
				) : (
					<div className="block w-full text-2xl bg-transparent outline-none focus:outline-none font-bold">
						{intent.name}
					</div>
				)}

				<div className="flex items-center gap-2">
					{editState === "advanced" ? (
						<div />
					) : editState === "simple" ? (
						<div
							onClick={() => {
								dispatch({
									type: "addDropdownVisible",
									payload: !isCondition,
								});
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
											dispatch({
												type: "addModalVisible",
												payload: true,
											});
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
								dispatch({
									type: "editDropdownVisible",
									payload: true,
								});
							}}
							ref={editDropdownRef}
							className="group relative z-10"
						>
							<Edit2Icon strokeWidth={1} className="h-6 w-6" />
							<div
								className={clsx(
									`opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
								)}
							>
								Edit intent
							</div>
							{editDropdownVisible ? (
								<div className="bg-[rgba(229,238,255,0.15)] backdrop-blur-[20px] absolute right-0 top-[40px] w-[240px]">
									<div
										onClick={() => {
											dispatch({
												type: "editState",
												payload: "simple",
											});
										}}
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
									>
										<img
											src="/images/file-input.svg"
											alt="simple"
										/>
										<div className="text-sm whitespace-nowrap">
											Standard mode
										</div>
									</div>
									<div
										onClick={() =>
											dispatch({
												type: "editState",
												payload: "advanced",
											})
										}
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
									>
										<img
											src="/images/file-input.svg"
											alt="advanced"
										/>
										<div className="text-sm whitespace-nowrap">
											Advanced mode
										</div>
									</div>
								</div>
							) : (
								<div></div>
							)}
						</button>
					)}

					{intent.id ? (
						<div
							className={clsx(
								`w-14 h-8 rounded-2xl px-1 py-1 relative cursor-pointer transition-all duration-300`,
								isActive ? `bg-accent` : `bg-foreground/30`,
							)}
							onClick={async () => {
								if (onIntentToggle) {
									dispatch({
										type: "txOverlayVisible",
										payload: true,
									});

									try {
										await onIntentToggle();
									} catch (e) {
										console.error(e);
									}

									dispatch({
										type: "txOverlayVisible",
										payload: false,
									});
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
					) : null}
				</div>
			</div>

			{editState === "advanced" ? (
				<AdvancedMode
					addresses={intent.addresses}
					expression={intent.raw}
					toggleChangeAddresses={toggleChangeAddresses}
				>
					{(result) => (
						<div className="mt-9 flex gap-2 items-center">
							<button
								onClick={async () => {
									if (!result.isUpdated) {
										return;
									}

									const isNewIntent = !intent.id;

									await onIntentSave({
										advanced: {
											definition: result.code,
											id: intent.id,
											name: intent.name,
										},
									});

									dispatch({
										type: "set",
										payload: {
											diff: {},
											editState: undefined,
										},
									});

									if (isNewIntent) {
										onIntentRemove(index);
									}
								}}
								className={clsx(
									`bg-foreground h-11 px-6 flex gap-2 items-center justify-center font-semibold text-background hover:bg-accent transition-all duration-200`,
									result.isUpdated
										? ``
										: `opacity-[0.3] pointer-events-none`,
								)}
							>
								<CheckIcon
									strokeWidth={1}
									className="h-6 w-6"
								/>
								Save
							</button>

							<button
								onClick={() => {
									dispatch({
										type: "set",
										payload: {
											editState: undefined,
											diff: {},
										},
									});
								}}
								className={clsx(
									`bg-[transparent] h-14 px-6 flex gap-2 items-center justify-center font-semibold text-foreground hover:text-accent transition-all duration-200`,
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
					)}
				</AdvancedMode>
			) : editState === "simple" ? (
				<div>
					{intent.conditions.map((condition, i) => {
						const isGroup = condition.type.startsWith("group:");

						const [type, threshold] = isGroup
							? condition.type.split(":")
							: [condition.type];

						return (
							<IntentCondition
								expression={condition.expression}
								key={`${type}-${i}`}
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

									dispatch({
										type: "diff",
										payload: { ...diff, conditions },
									});
								}}
								toggleChangeAddresses={toggleChangeAddresses}
								operator={
									i > 0 ? intent.operators[i - 1] : undefined
								}
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
								await onIntentSave({ simple: intent });

								dispatch({
									type: "set",
									payload: { diff: {}, editState: undefined },
								});

								if (isNewIntent) {
									onIntentRemove(index);
								}
							}}
							className={clsx(
								`bg-foreground h-11 px-6 flex gap-2 items-center justify-center font-semibold text-background hover:bg-accent transition-all duration-200`,
								isUpdated
									? ``
									: `opacity-[0.3] pointer-events-none`,
							)}
						>
							<CheckIcon strokeWidth={1} className="h-6 w-6" />
							Save
						</button>

						<button
							onClick={() => {
								dispatch({
									type: "set",
									payload: { editState: undefined, diff: {} },
								});
							}}
							className={clsx(
								`bg-[transparent] h-14 px-6 flex gap-2 items-center justify-center font-semibold text-foreground hover:text-accent transition-all duration-200`,
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
				<div className="flex gap-4">
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
					<div className="text-muted-foreground">
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
				</div>
			)}

			{isApproveIntent && (
				<Portal domId="intent-modal">
					<div className="bg-[rgba(64,64,64,0.40)] absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
						<button
							onClick={() => {
								dispatch({
									type: "txOverlayVisible",
									payload: false,
								});
							}}
							className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
						>
							<XIcon className="h-6 w-6" />
						</button>

						<div className="max-w-[520px] w-[520px] text-center tracking-widepb-5">
							<div className="font-bold text-5xl mb-6 leading-[56px]">
								Approve the Intent in&nbsp;your&nbsp;wallet
							</div>
							<div>
								Open the browser extension if it didn&apos;t
								open automatically.
							</div>
						</div>
					</div>
				</Portal>
			)}

			{addConditionModal && (
				<CreateIntentModal
					onClose={() =>
						dispatch({ type: "addModalVisible", payload: false })
					}
					index={index}
					addCondition={addCondition}
				/>
			)}

			{state.changeAddressModalVisible && (
				<ChangeAddressesModal
					onClose={() => toggleChangeAddresses([], false)}
					addresses={intent.addresses}
					users={state.changeAddresses}
					showAddPerson={() =>
						dispatch({
							type: "addAddressModalVisible",
							payload: true,
						})
					}
					onChange={state.changeAddressesCallback}
				/>
			)}

			{state.addAddressModalVisible && (
				<AddAddressModal
					onDone={(user) => {
						const unique = new Set<string>();

						const addresses = [...intent.addresses, user].filter(
							(x) => {
								if (unique.has(x)) {
									return false;
								}

								unique.add(x);
								return true;
							},
						);

						dispatch({
							type: "diff",
							payload: { ...diff, addresses },
						});
					}}
					onPrevModal={() => {
						dispatch({
							type: "set",
							payload: {
								addAddressModalVisible: false,
								changeAddressModalVisible: true,
							},
						});
					}}
					onClose={() =>
						dispatch({
							type: "set",
							payload: {
								changeAddresses: [],
								changeAddressesCallback: undefined,
								addAddressModalVisible: false,
							},
						})
					}
				/>
			)}
		</div>
	);
};

export default IntentComponent;
