import clsx from "clsx";
import { CheckIcon, Edit2Icon, XIcon, Trash } from "lucide-react";
import { Fragment, useCallback, useMemo, useReducer, useRef } from "react";
import type {
	ConditionType,
	SimpleIntent as Intent,
	IntentParams,
} from "@/types/intent";
import Portal from "@/components/ui/portal";
import AddressAvatar from "@/components/AddressAvatar";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Icons } from "@/components/ui/icons";
import AdvancedMode from "./AdvancedMode";
import CreateIntentModal from "./CreateIntentModal";
import IntentCondition from "./IntentCondition";
import ChangeAddressesModal from "./ChangeAddressesModal";
import AddAddressModal from "./AddAddressModal";
import type { ModalType } from "./types";
import AddressList from "./AddressList";
import { getFirstEntry, hasEntries } from "./util/code";
import { commonReducer } from "@/utils/common";

type IntentEditState = "advanced" | "simple";

interface State {
	diff: Partial<Intent>;
	editState?: IntentEditState;
	addDropdownVisible: boolean;
	addModalVisible: boolean;
	editDropdownVisible: boolean;
	txOverlayVisible: boolean;
	addAddressModalType: ModalType;
	changeAddressModalType: ModalType;
	changeAddresses: string[];
	changeAddressesCallback?: (addresses: string[]) => void;
	errors: Record<number, string | undefined>;
}

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
	const [state, dispatch] = useReducer(commonReducer<State>, {
		addDropdownVisible: false,
		addModalVisible: false,
		editDropdownVisible: false,
		txOverlayVisible: false,
		diff: {},
		addAddressModalType: "hidden",
		changeAddressModalType: "hidden",
		changeAddresses: [],
		errors: [],
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
			type: ModalType,
			onChange?: (addresses: string[]) => void,
		) => {
			if (type === "hidden") {
				dispatch({
					type: "set",
					payload: {
						changeAddresses: addresses,
						changeAddressesCallback: onChange,
						changeAddressModalType: type,
					},
				});

				return;
			}

			const modal: "changeAddressModalType" | "addAddressModalType" =
				(type === "person" ? intent.addresses : intent.whitelist)
					?.length
					? "changeAddressModalType"
					: "addAddressModalType";

			dispatch({
				type: "set",
				payload: {
					changeAddresses: addresses,
					[modal]: type,
					changeAddressesCallback: onChange,
				},
			});
		},
		[intent.addresses, intent.whitelist],
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

	// fixme
	const isWhitelistUpdated = diff.whitelist
		? JSON.stringify(_intent.whitelist ?? []) !==
			JSON.stringify(diff.whitelist)
		: false;

	const whitelistBlock =
		state.editState && intent.whitelist?.length ? (
			<div className="mt-8 pt-4 mb-4 relative">
				<div
					className="absolute text-[rgba(229,238,255,0.30)] text-xs left-1/2 top-0 translate-x-[-50%] translate-y-[-50%] w-full text-center
                    before:content-[''] before:w-[100%] before:h-[1px] before:bg-[rgba(229,238,255,0.30)] before:block before:top-1 before:left-0 before:absolute"
				/>
				<div className="mt-4 mb-4">
					<div className="text-xl bg-transparent flex justify-between items-center font-semibold">
						Whitelisted Addresses
						<div className="flex items-center gap-2">
							<div
								onClick={() => {
									dispatch({
										type: "diff",
										payload: {
											...state.diff,
											whitelist: [],
										},
									});
								}}
								className="group relative cursor-pointer"
							>
								<XIcon className="h-6 w-6 opacity-30" />

								<div className="opacity-0 w-fit bg-secondary-bg text-foreground text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-secondary-bg before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
									Remove Recipients
								</div>
							</div>
						</div>
					</div>
					<div className="text-muted-foreground text-sm mt-1">
						Only these addresses can receive transactions
					</div>
				</div>
				<AddressList
					addresses={intent.whitelist ?? []}
					onChange={(whitelist) =>
						dispatch({
							type: "diff",
							payload: { ...state.diff, whitelist },
						})
					}
					onAdd={() =>
						toggleChangeAddresses(
							intent.whitelist ?? [],
							"whitelist",
							(whitelist) =>
								dispatch({
									type: "diff",
									payload: { ...state.diff, whitelist },
								}),
						)
					}
					text="Add to whitelist"
				/>
			</div>
		) : null;

	return (
		<div
			className={clsx(
				`p-6 w-full rounded-xl bg-card relative`,
				isActive ? `border-accent border-2` : `border-0`,
			)}
			style={{ zIndex: Math.round(50 / (index + 1)) }}
		>
			<div
				className={clsx(
					`flex justify-between items-center border-[rgba(229,238,255,0.30)] relative z-40`,
					editState ? `border-b pb-5` : `pb-2`,
				)}
			>
				{editState ? (
					<input
						className="block w-full text-2xl bg-transparent outline-none focus:outline-none font-bold"
						placeholder="Rule Name"
						value={intent.name}
						onChange={(e) => {
							dispatch({
								type: "diff",
								payload: {
									...diff,
									name:
										e.target.value.length > 256
											? intent.name
											: e.target.value,
								},
							});
						}}
					/>
				) : (
					<div className="block w-full text-2xl bg-transparent outline-none focus:outline-none font-bold">
						{intent.name}
					</div>
				)}

				<div className="flex items-center gap-2">
					{editState ? (
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
							<Icons.plusCircle className="invert dark:invert-0" />

							<div
								className={clsx(
									`opacity-0 w-fit bg-secondary-bg text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-secondary-bg before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
									isCondition &&
										`opacity-0 group-hover:opacity-0`,
								)}
							>
								{editState === "simple"
									? `Add Сonditions or Whitelist Addres`
									: `Add Whitelist Address`}
							</div>

							{isCondition ? (
								<div className="bg-fill-quaternary backdrop-blur-[20px] absolute right-0 top-[40px] w-[240px]">
									{editState === "simple" ? (
										<div
											onClick={() => {
												dispatch({
													type: "addModalVisible",
													payload: true,
												});
											}}
											className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										>
											<Icons.fileInput className="invert dark:invert-0" />
											<div className="text-sm whitespace-nowrap">
												Add Approval Condition
											</div>
										</div>
									) : null}
									<div
										onClick={() => {
											toggleChangeAddresses(
												intent.whitelist ?? [],
												"whitelist",
												(whitelist) =>
													dispatch({
														type: "diff",
														payload: {
															...diff,
															whitelist,
														},
													}),
											);
										}}
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
									>
										<Icons.userPlus className="invert dark:invert-0" />
										<div className="text-sm whitespace-nowrap">
											Add Whitelist Address
										</div>
									</div>
									{!intent.id ? (
										<div
											onClick={() =>
												onIntentRemove(index)
											}
											className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
										>
											<Trash />

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
							<Edit2Icon
								strokeWidth={1}
								className="h-6 w-6 invert-1 dark:invert-0"
							/>
							<div
								className={clsx(
									`opacity-0 w-fit bg-secondary-bg text-foreground text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%] before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-secondary-bg before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]`,
								)}
							>
								Edit intent
							</div>
							{editDropdownVisible ? (
								<div className="bg-fill-quaternary backdrop-blur-[20px] absolute right-0 top-[40px] w-[240px]">
									<div
										onClick={() => {
											dispatch({
												type: "editState",
												payload: "simple",
											});
											dispatch({
												type: "addDropdownVisible",
												payload: false,
											});
										}}
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
									>
										<Icons.blocks className="invert dark:invert-0" />
										<div className="text-sm whitespace-nowrap">
											Edit
										</div>
									</div>
									<div
										onClick={() => {
											dispatch({
												type: "editState",
												payload: "advanced",
											});
											dispatch({
												type: "addDropdownVisible",
												payload: false,
											});
										}}
										className="cursor-pointer h-12 flex items-center px-[10px] gap-[22px] hover:bg-[rgba(229,238,255,0.3)] transition-all duration-300"
									>
										<Icons.wand className="invert dark:invert-0" />

										<div className="text-sm whitespace-nowrap">
											Edit in Advanced mode
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
								isActive ? `bg-pixel-pink` : `bg-foreground/30`,
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
					{(result) => {
						return (
							<>
								{whitelistBlock}
								<div className="mt-9 flex gap-2 items-center">
									<button
										onClick={async () => {
											if (
												(!result.isUpdated &&
													!isWhitelistUpdated) ||
												result.error
											) {
												return;
											}

											const isNewIntent = !intent.id;

											await onIntentSave({
												advanced: {
													definition: result.code,
													id: intent.id,
													name: intent.name,
													whitelist:
														state.diff.whitelist,
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
											(result.isUpdated ||
												isWhitelistUpdated) &&
												!result.error
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
										className="bg-[transparent] h-14 px-6 flex gap-2 items-center justify-center font-semibold text-foreground hover:text-accent transition-all duration-200"
									>
										<Icons.ban />
										Cancel
									</button>

									{result.error ? (
										<div className="text text-[#E54545]">
											{result.error}
										</div>
									) : null}
								</div>
							</>
						);
					}}
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
								onError={(error) => {
									const errors = { ...state.errors };

									if (!error) {
										delete errors[i];
									} else {
										errors[i] = error;
									}

									dispatch({
										type: "errors",
										payload: errors,
									});
								}}
								toggleChangeAddresses={toggleChangeAddresses}
								operator={
									i > 0 ? intent.operators[i - 1] : undefined
								}
							/>
						);
					})}

					{whitelistBlock}

					<div className="mt-9 flex gap-2 items-center">
						<button
							onClick={async () => {
								if (
									(!isUpdated && !isWhitelistUpdated) ||
									hasEntries(state.errors)
								) {
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
								(isUpdated || isWhitelistUpdated) &&
									!hasEntries(state.errors)
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
							)}
						>
							<Icons.ban />
							Cancel
						</button>

						{hasEntries(state.errors) ? (
							<div className="text text-[#E54545]">
								{getFirstEntry(state.errors)?.[1]}
							</div>
						) : null}
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
						) : null}
					</div>
					<div className="text-muted-foreground">
						{intent.conditions.map((condition, key) => (
							<Fragment key={key}>
								{key ? (
									<>{intent.operators[key - 1]}&nbsp;</>
								) : null}
								{condition.type === "joint" ? (
									`Joint approval`
								) : condition.type === "anyone" ? (
									`Approval by anyone`
								) : condition.type === "advanced" ? (
									`Advanced condition`
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

						<div className="max-w-[520px] w-[520px] text-center tracking-wide pb-5">
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

			{addConditionModal ? (
				<CreateIntentModal
					onClose={() =>
						dispatch({ type: "addModalVisible", payload: false })
					}
					index={index}
					addCondition={addCondition}
				/>
			) : null}
			{[state.changeAddressModalType, state.addAddressModalType].some(
				(type) => type !== "hidden",
			) ? (
				<Portal domId="intent-modal">
					<div className="bg-[rgba(64,64,64,0.40)] absolute left-0 top-0 w-full h-full backdrop-blur-[20px] flex items-center justify-center min-h-[600px]">
						{state.addAddressModalType !== "hidden" ? (
							<button
								onClick={() => {
									dispatch({
										type: "set",
										payload: {
											addAddressModalType: "hidden",
											changeAddressModalType:
												state.addAddressModalType,
										},
									});
								}}
								className="absolute top-8 left-8 opacity-[0.5] hover:opacity-[100%] transition-all"
							>
								<Icons.goBack />
							</button>
						) : null}

						<button
							onClick={() => {
								dispatch({
									type: "set",
									payload: {
										changeAddresses: [],
										changeAddressesCallback: undefined,
										changeAddressModalType: "hidden",
										addAddressModalType: "hidden",
									},
								});
							}}
							className="absolute top-8 right-8 opacity-[0.5] hover:opacity-[100%] transition-all"
						>
							<Icons.buttonClose />
						</button>

						{state.changeAddressModalType !== "hidden" ? (
							<ChangeAddressesModal
								onClose={() =>
									toggleChangeAddresses([], "hidden")
								}
								addresses={
									state.changeAddressModalType === "person"
										? intent.addresses
										: intent.whitelist ?? []
								}
								users={state.changeAddresses}
								showAddPerson={() =>
									dispatch({
										type: "set",
										payload: {
											addAddressModalType:
												state.changeAddressModalType,
											changeAddressModalType: "hidden",
										},
									})
								}
								onChange={state.changeAddressesCallback}
								type={state.changeAddressModalType}
							/>
						) : null}

						{state.addAddressModalType !== "hidden" ? (
							<AddAddressModal
								onDone={(user) => {
									const dedupe = (addrs: string[]) => {
										const unique = new Set(addrs);
										return Array.from(unique);
									};

									const addresses = dedupe([
										...(state.addAddressModalType ===
										"person"
											? intent.addresses
											: intent.whitelist ?? []),
										user,
									]);

									dispatch({
										type: "changeAddresses",
										payload: dedupe([
											...state.changeAddresses,
											user,
										]),
									});

									dispatch({
										type: "diff",
										payload:
											state.addAddressModalType ===
											"person"
												? { ...diff, addresses }
												: {
														...diff,
														whitelist: addresses,
													},
									});
								}}
								onPrevModal={() => {
									dispatch({
										type: "set",
										payload: {
											addAddressModalType: "hidden",
											changeAddressModalType:
												state.addAddressModalType,
										},
									});
								}}
								type={state.addAddressModalType}
							/>
						) : null}
					</div>
				</Portal>
			) : null}
		</div>
	);
};

export default IntentComponent;
