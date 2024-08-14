import { ConditionType } from "@/types/intent";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type { Expression } from "@/types/shield";
import AdvancedMode from "./AdvancedMode";
import { ModalType } from "./types";
import AddressList from "./AddressList";
import { XIcon } from "lucide-react";
import { hasEntries } from "./util/code";

function flatDeepEqual<T>(a?: T, b?: T) {
	if (!a && !b) {
		return true;
	}

	if (!a || !b) {
		return false;
	}

	const ak = Object.keys(a);
	const bk = Object.keys(b);

	if (ak.length !== bk.length) {
		return false;
	}

	return ak.every((key) => (a as any)[key] === (b as any)[key]);
}

function ChangeHandler<T>({
	value,
	callback,
}: {
	value: T;
	callback: (v: T) => void;
}) {
	const prev = useRef<T>();
	const cb = useRef(callback);

	useEffect(() => {
		if (!flatDeepEqual(prev.current, value)) {
			cb.current(value);
		}
	}, [value]);

	useEffect(() => {
		prev.current = value;
		cb.current = callback;
	}, [value, callback]);

	return null;
}

const IntentCondition = ({
	expression,
	type,
	threshold,
	users,
	handleRemoveCondition,
	toggleChangeAddresses,
	onChange,
	onError,
	index,
	operator,
}: {
	expression: Expression;
	type: ConditionType;
	threshold?: string;
	users: string[];
	handleRemoveCondition: () => void;
	onChange: (condition: {
		type: ConditionType;
		group: string[];
		expression: Expression;
	}) => void;
	onError?: (error?: string) => void;
	index: number;
	operator?: "and" | "or";
	toggleChangeAddresses: (
		addresses: string[],
		type: ModalType,
		onChange?: (addresses: string[]) => void,
	) => void;
}) => {
	const [diff, setDiff] = useState<{
		type?: ConditionType;
		group?: string[];
		expression?: Expression;
		shield?: string;
	}>({});

	const condition = useMemo(
		() => ({ expression, type, group: users, ...diff }),
		[expression, type, users, diff],
	);

	useEffect(() => {
		if (hasEntries(diff)) {
			onChange({ ...condition });
		}
	}, [diff, condition, onChange]);

	const [isCountChange, setIsCountChange] = useState(false);
	const [warning, setWarning] = useState(false);

	return (
		<div className={clsx(index > 0 && `mt-8 pt-4 mb-4 relative`)}>
			{index > 0 && (
				<div
					className="absolute text-[rgba(229,238,255,0.30)] text-xs left-1/2 top-0 translate-x-[-50%] translate-y-[-50%] w-full text-center
                    before:content-[''] before:w-[calc(50%_-_16px)] before:h-[1px] before:bg-[rgba(229,238,255,0.30)] before:block before:top-1/2 before:left-0 before:absolute
                    after:content-[''] after:w-[calc(50%_-_16px)] after:h-[1px] after:bg-[rgba(229,238,255,0.30)] after:block after:top-1/2 after:right-0 after:absolute"
				>
					{operator?.toUpperCase()}
				</div>
			)}
			<div className="mt-4 mb-4">
				<div className="text-xl bg-transparent flex justify-between items-center font-semibold">
					{type === "advanced"
						? `Advanced condition`
						: type === "joint"
							? `Joint approval`
							: type == "anyone"
								? `Approval by anyone`
								: `Approval by certain amount`}
					<div className="flex items-center gap-2">
						{warning && (
							<img src="/images/alert-triangle.svg" alt="" />
						)}
						<div
							onClick={handleRemoveCondition}
							className="group relative cursor-pointer"
						>
							<XIcon className="h-6 w-6 opacity-30" />

							<div className="opacity-0 w-fit bg-[rgba(229,238,255,0.15)] text-white text-center text-xs rounded py-2 px-3 absolute z-10 group-hover:opacity-100 top-[-18px] left-1/2 pointer-events-none whitespace-nowrap	backdrop-blur-[20px] translate-x-[-50%] translate-y-[-100%]  before:content-[''] before:absolute before:left-[50%] before:bottom-0  before:border-[rgba(229,238,255,0.15)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[-45deg] before:translate-y-[50%] before:translate-x-[-50%]">
								Remove Condition
							</div>
						</div>
					</div>
				</div>
				<div className="text-muted-foreground text-sm mt-1">
					{type === "joint" ? (
						`Each approver must approve the transaction`
					) : type === "anyone" ? (
						`Any approver can approve the transaction`
					) : type === "advanced" ? (
						`Use an expression to set approval conditions`
					) : (
						<>
							Any{" "}
							<span
								onClick={() => {
									setIsCountChange(!isCountChange);
								}}
								className="min-w-[17px] text-center inline-block bg-secondary-bg border-[1px] border-border-edge px-[2px] text-foreground rounded-sm cursor-pointer relative"
							>
								{threshold}
								{isCountChange && (
									<div className="w-[56px] bg-secondary-bg absolute z-10 top-1/2 right-[calc(-100%_-_12px)] translate-x-[100%] backdrop-blur-[20px] translate-y-[-50%] before:content-[''] before:absolute before:left-[0] before:top-1/2  before:border-[rgba(229,238,255,0.3)] before:border-b-[8px]  before:border-l-[8px] before:border-t-[transparent]  before:border-r-[transparent] before:border-t-[8px]  before:border-r-[8px] before:w-0 before:h-0 before:rotate-[45deg] before:translate-y-[-50%] before:translate-x-[-50%]">
										<div className="flex flex-col gap-[2px] text-white text-center text-sm py-1 px-1 max-h-[120px] overflow-scroll no-scrollbar">
											{[2, 3, 4, 5, 6, 7, 8, 9].map(
												(item, key) => {
													return (
														<div
															className={clsx(
																`min-h-[24px] flex justify-center items-center text-label-secondary`,
																item.toString() ==
																	threshold &&
																	`text-foreground bg-secondary-bg`,
															)}
															key={key}
															onClick={() =>
																setDiff(
																	(diff) => ({
																		...diff,
																		type: `group:${item}`,
																	}),
																)
															}
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
							approvers should approve the transaction
						</>
					)}
				</div>
				{type === "advanced" ? (
					<AdvancedMode
						hideHeader
						expression={condition.expression ?? {}}
						addresses={condition.group}
						toggleChangeAddresses={toggleChangeAddresses}
					>
						{(result) => {
							const value = result.isUpdated
								? {
										code: result.code,
										error: result.error,
									}
								: undefined;

							return (
								<ChangeHandler
									value={value}
									callback={(v) => {
										const error = v?.error;
										setWarning(Boolean(error));
										onError?.(error);

										if (!error) {
											setDiff((diff) => {
												const _diff = { ...diff };

												if (!v) {
													delete _diff.shield;
												} else {
													_diff.shield = v.code;
												}

												return _diff;
											});
										} else {
											setDiff((diff) => {
												const _diff = { ...diff };
												delete _diff.shield;
												return _diff;
											});
										}
									}}
								/>
							);
						}}
					</AdvancedMode>
				) : (
					<AddressList
						warning={!users.length}
						addresses={users}
						onAdd={() =>
							toggleChangeAddresses(users, "person", (group) =>
								setDiff({
									...diff,
									group,
								}),
							)
						}
						onChange={(group) => setDiff({ ...diff, group })}
					/>
				)}
			</div>
		</div>
	);
};

export default IntentCondition;
