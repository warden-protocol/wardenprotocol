import { useClickOutside } from "@/hooks/useClickOutside";
import { Expression } from "@/types/shield";
import { ActionsFromState, SetAction } from "@/types/util";
import { createHumanReadableCondition } from "@/utils/shield";
import clsx from "clsx";

import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from "react";

import AddressList from "./AddressList";
import type { ModalType } from "./types";

import {
	findError,
	hasEntries,
	isTokenized,
	parseCode,
	autocomplete,
	toShield,
	findByPosition,
	NUM_VALUE,
	ADR_VALUE,
	AutocompleteItem,
} from "./util/code";

import type { CNode } from "./util/types";
import { isAddress, toBytes } from "viem";
import { toBech32 } from "@cosmjs/encoding";

interface Result {
	code: string;
	error?: string;
	isUpdated: boolean;
}

interface InputState {
	code: string;
	focused: boolean;
	selection: number[];
	autocompleteItem: number;
}

const getPosition = (
	selection: number[],
	prevSelection?: number[] | undefined,
) => {
	if (selection[0] === selection[1] || !prevSelection) {
		return selection[0];
	}

	const index = selection.findIndex((v, i) => v !== prevSelection[i]);
	return index === -1 ? selection[0] : selection[index];
};

const reducer = (
	state: InputState,
	action:
		| ActionsFromState<InputState, keyof InputState>
		| SetAction<InputState>,
) =>
	action.type === "set"
		? { ...state, ...action.payload }
		: { ...state, [action.type]: action.payload };

interface AutocompleteParams {
	addresses: string[];
	index?: number;
}

const getTokenPosition = (index: number, node: CNode) => {
	if (!isTokenized(node)) {
		throw new Error("current node not initialized");
	}

	if (index === -1) {
		return node.range[1];
	}

	return node.tokenRanges[index][0];
};

const useInput = (code: string, params?: Omit<AutocompleteParams, "index">) => {
	const prev = useRef<InputState | null>(null);

	const [state, dispatch] = useReducer(reducer, {
		code,
		autocompleteItem: 0,
		focused: false,
		selection: [0, 0],
	});

	const position = getPosition(state.selection, prev.current?.selection);
	const result = useMemo(() => parseCode(state.code), [state.code]);
	const ref = useRef<HTMLInputElement | null>(null);

	const lookup = useMemo(
		() => findByPosition(position, result.refs, result.rootRef),
		[position, result],
	);

	const shield = useMemo(() => {
		if (hasEntries(result.errors)) {
			return undefined;
		}

		const { refs, rootRef } = result;
		const root = refs[rootRef];
		return toShield(root, refs, params?.addresses ?? []);
	}, [result, params?.addresses]);

	const items = useMemo(
		() =>
			autocomplete(lookup, result).flatMap((x) => {
				if (x.title === NUM_VALUE) {
					return Array.from({ length: 5 }).map(
						(_, i): AutocompleteItem => ({
							...x,
							title: String(i + 1),
							value: x.value.replace(NUM_VALUE, String(i + 1)),
						}),
					);
				} else if (x.title === ADR_VALUE) {
					return params?.addresses.map(
						(adr, i): AutocompleteItem => ({
							...x,
							title: `ADR${i + 1}`,
							value: x.value.replace(ADR_VALUE, `ADR${i + 1}`),
							description: adr,
						}),
					);
				}

				return x;
			}),
		[lookup, result, params?.addresses],
	);

	const numSuggest = items.length;

	useEffect(() => {
		dispatch({ type: "autocompleteItem", payload: 0 });
	}, [numSuggest]);

	const updateSelection = useCallback(() => {
		const elem = ref.current;

		if (
			!elem ||
			typeof elem.selectionStart !== "number" ||
			typeof elem.selectionEnd !== "number"
		) {
			return;
		}

		const selection = [elem.selectionStart, elem.selectionEnd];
		dispatch({ type: "selection", payload: selection });
	}, []);

	const setPosition = useCallback(
		(pos: number) => {
			const elem = ref.current;

			if (!elem) {
				return;
			}

			elem.setSelectionRange(pos, pos);
			updateSelection();
			elem.focus();
		},
		[updateSelection],
	);

	const autoComplete = useCallback(
		(i: number) => {
			const item = items[i];

			if (!item) {
				return;
			}

			const { value, lookupSymbol } = item;
			const nextPos = value.indexOf(lookupSymbol);
			const code = value.replace(lookupSymbol, "");
			dispatch({ type: "code", payload: code });
			setTimeout(() => setPosition(nextPos), 0);
		},
		[items, setPosition],
	);

	const handlers = useMemo(
		() =>
			({
				onFocus: () => {
					updateSelection();
					dispatch({ type: "focused", payload: true });
				},
				onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
					if (e.key === "ArrowDown") {
						e.preventDefault();

						const next = (state.autocompleteItem + 1) % numSuggest;
						dispatch({ type: "autocompleteItem", payload: next });
					} else if (e.key === "ArrowUp") {
						e.preventDefault();

						const next =
							(state.autocompleteItem - 1 + numSuggest) %
							numSuggest;

						dispatch({ type: "autocompleteItem", payload: next });
					} else if (e.key === "Enter") {
						autoComplete(state.autocompleteItem);
					}

					updateSelection();
				},
				onKeyUp: () => {
					updateSelection();
				},
				onMouseDown: () => {
					updateSelection();
				},
				onMouseUp: () => {
					updateSelection();
				},
			}) as const,
		[updateSelection, state.autocompleteItem, numSuggest, autoComplete],
	);

	useEffect(() => {
		prev.current = state;
	}, [state]);

	return {
		handlers,
		lookup,
		position,
		parsed: result,
		ref,
		shield,
		state,
		suggestions: items,
		dispatch,
		updateSelection,
		setPosition,
		autoComplete,
	};
};

export default function AdvancedMode({
	addresses: _addresses,
	children,
	expression,
	hideHeader,
	toggleChangeAddresses,
}: {
	addresses?: string[];
	children?: (v: Result) => ReactNode;
	expression: Expression;
	hideHeader?: boolean;
	toggleChangeAddresses: (
		addresses: string[],
		type: ModalType,
		onChange?: (addresses: string[]) => void,
	) => void;
}) {
	const humanReadable = useMemo(
		() => createHumanReadableCondition(expression),
		[expression],
	);

	const [addresses, setAddresses] = useState(_addresses ?? []);
	const input = useInput(humanReadable.code, { addresses });
	const isUpdated = input.state.code !== humanReadable.code;
	const formRef = useRef<HTMLFormElement | null>(null);

	useClickOutside(formRef, () => {
		input.dispatch({ type: "focused", payload: false });
	});

	function onCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		input.dispatch({ type: "code", payload: value });
	}

	const error = useMemo(() => {
		const parseErrors = input.parsed.errors;

		if (hasEntries(parseErrors)) {
			for (const [index, entries] of Object.entries(parseErrors)) {
				const i = Number(index);
				const [entry] = entries;

				return {
					type: "parseError" as const,
					i,
					...entry,
				};
			}
		}

		const shield = input.shield;

		if (!shield?.errors) {
			return undefined;
		}

		// fixme 3 iterations sounds like overkill
		const error =
			findError(shield.errors, (entry) => {
				return (
					entry.node.id === input.lookup.node?.id &&
					entry.tokenIndex === input.lookup.index
				);
			}) ??
			findError(
				shield.errors,
				(entry) => entry.node.id === input.lookup?.node.id,
			) ??
			findError(shield.errors, () => true);

		if (error) {
			return {
				type: "shieldError" as const,
				i: error[0],
				...error[1],
			};
		}
	}, [input.lookup, input.shield, input.parsed.errors]);

	const arrNodes = Object.values(input.parsed.refs).filter(
		(node) => node.type === "array",
	);

	// fixme hotfix for https://github.com/warden-protocol/wardenprotocol/issues/365
	const warning = Boolean(
		arrNodes.length && !arrNodes.flatMap((node) => node.tokens).length,
	);

	const getCode = () => {
		let code = input.shield?.value ?? "";

		for (const address of addresses) {
			if (isAddress(address)) {
				code = code.replace(address, toBech32("warden", toBytes(address)));
			}
		}

		return code;
	}

	return (
		<div>
			{!hideHeader ? (
				<div className="mt-4 mb-4">
					<div className="text-xl bg-transparent flex justify-between items-center font-bold">
						Advanced mode
					</div>
					<div className="text-label-secondary mt-1">
						Use an expression to set approval conditions
					</div>
				</div>
			) : null}

			<AddressList
				warning={!addresses.length}
				addresses={addresses}
				onChange={setAddresses}
				onAdd={() =>
					toggleChangeAddresses(addresses, "person", setAddresses)
				}
				withEditorLabel
			/>

			<form
				onSubmit={(e) => e.preventDefault()}
				action=""
				className={clsx(
					`relative mt-8 text-left flex items-center justify-between gap-2 bg-fill-quaternary px-4 h-[60px]`,
				)}
				ref={formRef}
			>
				<div className="w-full flex items-center gap-[6px]">
					<label
						className="text-label-secondary text-xs"
						htmlFor="address"
					>
						f(x)
					</label>

					<input
						autoComplete="off"
						className="block w-full bg-transparent outline-none focus:outline-none"
						id="code"
						onChange={onCodeChange}
						value={input.state.code}
						ref={input.ref}
						{...input.handlers}
						placeholder="Write condition"
					/>

					<div
						className={clsx(
							"absolute top-[64px] left-0",
							"flex flex-col w-full z-20",
							"bg-[#302F36] text-white",
							{
								hidden: !input.state.focused,
							},
						)}
					>
						{
							/* fixme pass parenthesis parsing error at position */ error ||
								error ? (
								<div
									className={clsx(
										"flex justify-center flex-col h-12 w-full px-3 cursor-pointer text",
										"text-[#E54545]",
									)}
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();

										if (error) {
											const position =
												error.type === "parseError"
													? error.i
													: getTokenPosition(
														error.tokenIndex,
														error.node,
													);

											input.setPosition(position);
										}
									}}
								>
									<p>{error?.message} </p>
								</div>
							) : null
						}
						{input.suggestions.map((item, i) => {
							const selected = input.state.autocompleteItem === i;

							return (
								<div
									key={`${i}${item?.value}`}
									className={clsx(
										"flex justify-center flex-col h-12 w-full px-3 cursor-pointer",
										"hover:bg-fill-quaternary",
										{
											"bg-fill-quaternary": selected,
										},
									)}
									onClick={() => input.autoComplete(i)}
								>
									{item?.title}
									{item?.description && (
										<div className="text-xs text-label-secondary leading-none">
											{item.description}
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</form>

			{children?.({
				code: getCode(),
				error:
					addresses.length && !warning
						? error?.message
						: "Please add at least one approver",
				isUpdated,
			})}
		</div>
	);
}
