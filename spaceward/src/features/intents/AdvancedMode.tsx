import AddressUnit from "@/components/AddressUnit";
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
import { levenstein } from "./util";
import { useClickOutside } from "@/hooks/useClickOutside";

interface Result {
	code: string;
	isError: boolean;
	isUpdated: boolean;
}

interface InputState {
	code: string;
	focused: boolean;
	selection: number[];
	autocompleteItem: number;
}

type ErrorData = Record<number, ErrorEntry[]>;

const errors = () => {
	const data: ErrorData = {};

	const add = (index: number, entry: ErrorEntry) => {
		if (!data[index]) {
			data[index] = [];
		}

		data[index].push(entry);
	};

	return {
		get data() {
			return data;
		},
		add,
	};
};

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

interface Suggestion {
	value: string;
	tags: string[];
}

type NodeType = "expression" | "array";

interface CNode {
	id: string;
	range: [number, number];
	parent?: string;
	children: string[];
	value: string;
	type?: NodeType;
	tokens?: string[];
}

const trimSymbols = (value: string, symbols: string[]) => {
	let start = 0;
	let end = value.length - 1;

	while (symbols.includes(value[start])) {
		start++;
	}

	while (symbols.includes(value[end]) && end > start) {
		end--;
	}

	return value.substring(start, end + 1);
};

const normalize = (node: CNode, refs: Record<string, CNode>) => {
	const root = refs["R0"];

	if (!root) {
		throw new Error("Root node not found");
	}

	let value = root.value.substring(node.range[0], node.range[1] + 1);

	for (let i = node.children.length - 1; i >= 0; i--) {
		const child = refs[node.children[i]];

		const before = trimSymbols(
			value.substring(0, child.range[0] - node.range[0]).trim(),
			[" ", "("],
		);

		const after = trimSymbols(
			value.substring(child.range[1] - node.range[0] + 1).trim(),
			[" ", ")"],
		);

		value = `${before ? `${before} ` : ""}${child.id}${after ? ` ${after}` : ""}`;
	}

	return trimSymbols(value, [" ", "(", ")"]);
};

const tokenize = (node: CNode, refs: Record<string, CNode>) => {
	const normalized = normalize(node, refs);

	// TODO lookup for FROM keyword before node
	const type: NodeType =
		normalized.indexOf(",") >= 0 ? "array" : "expression";

	const tokens =
		type === "array"
			? normalized.split(",").map((x) => x.trim())
			: normalized.split(" ").filter(Boolean);

	return { tokens, type };
};

const getTokenPosition = (
	index: number,
	node: CNode,
	refs: Record<string, CNode>,
) => {
	const root = refs["R0"];

	if (!root) {
		throw new Error("Root node not found");
	}

	if (!node.tokens) {
		throw new Error("node not tokenized yet");
	}

	if (index === -1) {
		return node.range[1];
	}

	let start = node.range[0];

	for (let i = 0; i <= index; i++) {
		const token = node.tokens[i];

		if (token in refs) {
			start = refs[token].range[1] + 1;
		}
	}

	return root.value.indexOf(node.tokens[index], start);
};

const findByPosition = (pos: number, refs: Record<string, CNode>) => {
	const root = refs["R0"];
	let node = root; // start from root

	if (!node) {
		throw new Error("Root node not found");
	}

	let found: boolean;

	do {
		found = false;

		for (let id of node.children) {
			const child = refs[id];

			if (!child) {
				throw new Error(`Child node ${id} not found`);
			}

			if (pos >= child.range[0] && pos <= child.range[1]) {
				node = child;
				found = true;
				break;
			}
		}
	} while (found);

	const { type, tokens } = node;

	if (!tokens || !type) {
		throw new Error("node not tokenized yet");
	}

	const relPos = pos - node.range[0];
	let charAt = 0;
	let i = 0;

	while (charAt < node.value.length && i < tokens.length) {
		const token = tokens[i];

		if (refs[token]) {
			const ref = refs[token];
			charAt = ref.range[1] - ref.range[0] + 1;
		} else {
			const index = token ? node.value.indexOf(token, charAt) : charAt;

			if (index < 0) {
				throw new Error(`Token ${token} not found`);
			}

			const size = index - charAt + token.length;

			if (
				relPos >= charAt &&
				relPos <=
					// fixme possible error
					(size > 0 ? size : 1) + charAt
			) {
				break;
			}

			charAt += size;
		}

		++i;
	}

	return { node, index: i < tokens.length ? i : -1 };
};

const OPS = {
	AND: {
		precedence: 1,
		value: "&&",
	},
	OR: {
		precedence: 2,
		value: "||",
	},
} as const;

const FNS = { ALL: 1, ANY: 2 } as const; // by arg count

const parseCode = (code: string) => {
	const refs: Record<string, CNode> = {};

	const errs = errors();

	let count = 0;
	const getRef = () => `R${count++}`;
	const rootRef = getRef();

	refs[rootRef] = {
		id: rootRef,
		range: [0, code.length - 1],
		children: [],
		value: code,
	};

	const parens = { "(": ")" } as const; // by closing symbol

	// build parenthesis refs
	const stack: {
		close: string;
		start: number;
		ref: string;
		parent?: string;
	}[] = [];

	for (let i = 0; i < code.length; i++) {
		const char = code[i];

		if (parens[char as keyof typeof parens]) {
			const close = parens[char as keyof typeof parens];

			const parent = stack.length ? stack[stack.length - 1].ref : rootRef;

			const ref = getRef();
			stack.push({ close, start: i, ref, parent });
		} else if (char === stack[stack.length - 1]?.close) {
			const v = stack.pop();

			if (!v) {
				errs.add(i, {
					node: refs[rootRef],
					message: "Unexpected closing parenthesis",
					tokenIndex: -1,
				});
			} else {
				refs[v.ref] = {
					id: v.ref,
					range: [v.start, i],
					value: code.slice(v.start, i + 1),
					parent: v.parent,
					children: [],
				};
			}
		} else if (Object.values(parens).includes(char as any)) {
			errs.add(i, {
				node: refs[rootRef],
				message: "Missing opening parenthesis",
				tokenIndex: -1,
			});
		}
	}

	if (stack.length) {
		errs.add(stack[stack.length - 1].start, {
			node: refs[rootRef],
			message: "Missing closing parenthesis",
			tokenIndex: -1,
		});
	}

	const refList = Object.keys(refs);

	// reverse refs
	for (const id of refList) {
		const parentId = refs[id].parent;

		if (parentId && parentId in refs) {
			refs[parentId].children.push(refs[id].id);
		}
	}

	// tokenize
	for (const id of refList) {
		const { tokens, type } = tokenize(refs[id], refs);
		refs[id].tokens = tokens;
		refs[id].type = type;
	}

	// fixme better determine arrays
	for (const id of refList) {
		const parentId = refs[id].parent;

		if (parentId && parentId in refs) {
			const parent = refs[parentId];
			const index = parent.tokens?.findIndex((x) => x === id) ?? -1;

			if (index > 0) {
				if (parent.tokens?.[index - 1].toUpperCase() === "FROM") {
					refs[id].type = "array";
				}
			}
		}
	}

	return { refs, errors: errs.data, rootRef };
};

function hasEntries<T>(obj?: T): obj is T {
	return obj ? Boolean(Object.keys(obj).length) : false;
}

interface ErrorEntry {
	node: CNode;
	tokenIndex: number;
	message: string;
}

const findError = (
	errors: ErrorData,
	callback: (entry: ErrorEntry, index: number) => boolean,
) => {
	for (const [_index, entries] of Object.entries(errors)) {
		const index = Number(_index);

		for (const entry of entries) {
			if (callback(entry, index)) {
				return [index, entry] as const;
			}
		}
	}
};

const toShield = (
	node: CNode,
	refs: Record<string, CNode>,
	addresses: string[],
) => {
	if (!node.tokens) {
		throw new Error("node not tokenized");
	}

	const errs = errors();

	if (node.type === "array") {
		return {
			errors: errs.data,
			value: `[${node.tokens
				.map((token, i) => {
					if (token.toUpperCase().startsWith("ADR")) {
						const index = parseInt(token.substring(3), 10) - 1;

						if (!Number.isFinite(index) || index < 0) {
							errs.add(i, {
								node,
								tokenIndex: i,
								message: `Expected address in ADR{number} format`,
							});

							return "false";
						} else if (!addresses[index]) {
							errs.add(i, {
								node,
								tokenIndex: i,
								message: `Address not found: ADR${index + 1}`,
							});

							return "false";
						}

						return addresses[index];
					} else {
						errs.add(i, {
							node,
							tokenIndex: i,
							message: `Unexpected token: ${token}`,
						});

						return "false";
					}
				})
				.join(", ")}]`,
		};
	}

	let result = "";

	for (let i = 0; i < node.tokens.length; ++i) {
		const token: string = node.tokens[i].toUpperCase();

		if (token in refs) {
			const ref = refs[token];

			if (ref.type === "array") {
				errs.add(i, {
					node,
					tokenIndex: i,
					message: `Unexpected ref: ${token}`,
				});

				continue;
			} else {
				const { errors, value } = toShield(ref, refs, addresses);

				for (const _errors of Object.values(errors)) {
					for (const err of _errors) {
						errs.add(i, err);
					}
				}

				result += `(${value})`;
			}
		} else if (token in OPS) {
			const { value } = OPS[token as keyof typeof OPS];
			result += ` ${value} `;
		} else if (token in FNS) {
			const argc: number | undefined = FNS[token as keyof typeof FNS];

			if (!argc) {
				errs.add(i, {
					node,
					tokenIndex: i,
					message: `Incorrect argc[${argc}] of function[${token}]`,
				});

				continue;
			}

			const args: string[] = [];
			++i;

			for (let j = 0; j < argc; j++) {
				// assume that array is last argument
				if (j === argc - 1) {
					if (node.tokens[i + j]?.toUpperCase() === "FROM") {
						++i;
						const refId = node.tokens[i + j];

						if (!refs[refId]) {
							errs.add(i + j, {
								node,
								tokenIndex: i + j,
								message: `Ref[${refId}] not found`,
							});

							continue;
						}

						const { errors, value } = toShield(
							refs[refId],
							refs,
							addresses,
						);

						for (const _errors of Object.values(errors)) {
							for (const err of _errors) {
								errs.add(i + j, err);
							}
						}

						args.push(value);
					} else {
						errs.add(i + j, {
							node,
							tokenIndex: i + j,
							message: "FROM expected",
						});
					}
				} else {
					args.push(node.tokens[i + j]);
				}
			}

			i += argc - 1;
			result += `${token.toLowerCase()}(${args.join(", ")})`;
		} else if (token.toUpperCase().startsWith("ADR")) {
			// todo check correct index
			result += addresses[parseInt(token.substring(3), 10) - 1];
		} else {
			errs.add(i, {
				node,
				tokenIndex: i,
				message: `Unexpected token: ${token}`,
			});
		}
	}

	return { errors: errs.data, value: result };
};

interface ParseResult {
	ok: boolean;
	result?: ReturnType<typeof parseCode>;
	message?: string;
}

const SUGGESTIONS: Suggestion[] = [
	{ value: "ANY", tags: ["root", "call"] },
	{ value: "ALL", tags: ["root", "call"] },
	{ value: "()", tags: ["root", "group", "array"] },
	{ value: "AND", tags: ["op"] },
	{ value: "OR", tags: ["op"] },
	{ value: "ADR", tags: ["ref"] },
	{ value: "FROM", tags: ["util"] },
];

const useInput = (code: string) => {
	const prev = useRef<InputState | null>(null);

	const [state, dispatch] = useReducer(reducer, {
		code,
		autocompleteItem: 0,
		focused: false,
		selection: [0, 0],
	});

	const position = getPosition(state.selection, prev.current?.selection);

	const parsed: ParseResult = useMemo(() => {
		try {
			// const node = jsep(state.code);
			const result = parseCode(state.code);
			return { ok: true, result };
		} catch (e) {
			return { ok: false, message: (e as Error).message };
		}
	}, [state.code]);

	const ref = useRef<HTMLInputElement | null>(null);

	const _node = useMemo(
		() =>
			parsed.result && !Object.keys(parsed.result.errors).length
				? findByPosition(position, parsed.result.refs)
				: undefined,
		[position, parsed.result],
	);

	const search: { tags: string[]; val?: string } = useMemo(() => {
		const tags: string[] = [];
		const refs = parsed.result?.refs;

		if (!_node) {
			return { tags };
		}

		const { node, index } = _node;

		if (!refs || !node.type || !node.tokens) {
			return { tags };
		}

		if (node?.type === "array") {
			tags.push("ref");
		} else {
			if (!node.tokens?.length) {
				tags.push("root");
				return { tags };
			}

			if (index === 0) {
				tags.push("root");
			} else if (index < 0) {
				const last = node.tokens.slice(-1)[0].toUpperCase();

				if (last in refs) {
					tags.push("op");
				} else if (last in OPS) {
					tags.push("call");
					tags.push("group");
				} else if (last in FNS) {
					tags.push("util");
				}
			}
		}

		const token = index >= 0 ? node.tokens[index] : undefined;
		return { tags, val: token };
	}, [_node, parsed.result?.refs]);

	const suggestions = useMemo(() => {
		const THRESHOLD = 2;

		return SUGGESTIONS.map((x) => {
			return {
				...x,
				distance: search.val
					? levenstein(search.val.toUpperCase(), x.value)
					: 0,
			};
		})
			.filter((x) => {
				if (!search.tags.every((tag) => x.tags.includes(tag))) {
					return false;
				}

				if (search.val) {
					return x.distance! <= THRESHOLD;
				}

				return true;
			})
			.sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
	}, [search]);

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

	useEffect(() => {
		prev.current = state;
	}, [state]);

	return {
		ref,
		state,
		position,
		parsed,
		node: _node,
		suggestions,
		dispatch,
		updateSelection,
		setPosition,
	};
};

export default function AdvancedMode({
	children,
	expression,
	addresses: _addresses,
	toggleChangeAddresses,
}: {
	children?: (v: Result) => ReactNode;
	expression: Expression;
	addresses?: string[];
	toggleChangeAddresses: (
		addresses: string[],
		visible: boolean,
		onChange?: (addresses: string[]) => void,
	) => void;
}) {
	const humanReadable = useMemo(
		() => createHumanReadableCondition(expression),
		[expression],
	);

	const [addresses, setAddresses] = useState(_addresses ?? []);
	const input = useInput(humanReadable.code);
	const isUpdated = input.state.code !== humanReadable.code;

	const formRef = useRef<HTMLFormElement | null>(null);

	useClickOutside(formRef, () => {
		input.dispatch({ type: "focused", payload: false });
	});

	function onCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		input.dispatch({ type: "code", payload: value });
	}

	const shield = useMemo(() => {
		if (!input.parsed.result || hasEntries(input.parsed.result.errors)) {
			return undefined;
		}

		const { refs, rootRef } = input.parsed.result;
		const root = refs[rootRef];
		return toShield(root, refs, addresses);
	}, [input.parsed.result, addresses]);

	const error = useMemo(() => {
		const parseErrors = input.parsed.result?.errors;

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

		if (!shield?.errors) {
			return undefined;
		}

		// fixme 3 iterations sounds like overkill
		const error =
			findError(shield.errors, (entry) => {
				return (
					entry.node.id === input.node?.node.id &&
					entry.tokenIndex === input.node.index
				);
			}) ??
			findError(
				shield.errors,
				(entry) => entry.node.id === input.node?.node.id,
			) ??
			findError(shield.errors, () => true);

		if (error) {
			return {
				type: "shieldError" as const,
				i: error[0],
				...error[1],
			};
		}
	}, [input.node, shield?.errors, input.parsed.result?.errors]);

	return (
		<div>
			<div className="mt-4 mb-4">
				<div className="text-xl bg-transparent flex justify-between items-center font-bold">
					Advanced mode
				</div>
				<div className="text-[rgba(229,238,255,0.60)] mt-1">
					Use an expression to set approval conditions
				</div>
			</div>

			<div className="mt-8 flex items-center gap-[8px] flex-wrap">
				{addresses?.map((user, i) => {
					return (
						<AddressUnit
							address={user}
							key={`${user}:${i}`}
							onRemove={() => {
								setAddresses([
									...addresses.filter((u) => u !== user),
								]);
							}}
						/>
					);
				})}
				<button
					onClick={() => {
						toggleChangeAddresses(addresses, true, setAddresses);
					}}
					className={clsx(
						`text-sm flex w-fit items-center gap-[10px] h-12`,
					)}
				>
					<img src="/images/plus.svg" alt="" />
					Add approver
				</button>
			</div>
			<form
				action=""
				className={clsx(
					`relative mt-8 text-left flex items-center justify-between gap-2 bg-[rgba(229,238,255,0.15)] px-4 h-[60px]`,
				)}
				ref={formRef}
			>
				<div className="w-full flex items-center gap-[6px]">
					<label
						className="text-[rgba(229,238,255,0.60)] text-xs"
						htmlFor="address"
					>
						f(x)
					</label>

					<input
						className="block w-full bg-transparent outline-none focus:outline-none"
						id="code"
						onChange={onCodeChange}
						value={input.state.code}
						ref={input.ref}
						onFocus={() => {
							input.updateSelection();
							input.dispatch({ type: "focused", payload: true });
						}}
						onKeyDown={input.updateSelection}
						onKeyUp={input.updateSelection}
						onMouseDown={input.updateSelection}
						onMouseUp={input.updateSelection}
						placeholder="Write condition"
					/>

					<div
						className={clsx(
							"absolute top-[64px] left-0",
							"flex flex-col w-full z-10",
							"bg-[#302F36] text-white",
							{
								hidden: !input.state.focused,
							},
						)}
					>
						{
							/* fixme pass parenthesis parsing error at position */ error ||
							input.parsed.message ? (
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
															input.parsed.result!
																.refs,
														);

											input.setPosition(position);
										}
									}}
								>
									{error?.message ?? input.parsed.message}{" "}
								</div>
							) : null
						}
						{input.suggestions.map(({ value }, i) => {
							const selected = input.state.autocompleteItem === i;

							return (
								<div
									key={`${i}${value}`}
									className={clsx(
										"flex justify-center flex-col h-12 w-full px-3 cursor-pointer",
										{
											"bg-[rgba(229,238,255,0.15)]":
												selected,
										},
									)}
									onClick={() => {
										const {
											node: _node,
											parsed: { result },
										} = input;

										if (!_node) {
											return;
										}

										const { node, index } = _node;

										const pos = getTokenPosition(
											index,
											node,
											result!.refs,
										);

										if (!node.tokens) {
											throw new Error(
												"node not tokenized yet",
											);
										}

										const before =
											input.state.code.substring(0, pos);

										const after =
											input.state.code.substring(
												index >= 0
													? pos +
															node.tokens[index]
																.length
													: pos,
											);

										input.dispatch({
											type: "code",
											payload: `${before}${value}${after}`,
										});

										setTimeout(
											() =>
												input.setPosition(
													pos + value.length,
												),
											0,
										);
									}}
								>
									{value}
									{selected && (
										<div className="text-xs text-[rgba(229,238,255,0.60)] leading-none">
											Add address
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</form>

			{children?.({
				code: shield?.value ?? "",
				isError: Boolean(
					!input.parsed.ok ||
						Object.keys(shield?.errors ?? {}).length,
				),
				isUpdated,
			})}
		</div>
	);
}
