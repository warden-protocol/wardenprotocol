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

interface Result {
	code: string;
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
	console.log({ normalized });

	// TODO lookup for FROM keyword before node
	let type: NodeType = normalized.indexOf(",") >= 0 ? "array" : "expression";

	const tokens =
		type === "array"
			? normalized.split(",").map((x) => x.trim())
			: normalized.split(" ").filter(Boolean);

	if (tokens.find((x) => x.toUpperCase().startsWith("ADR"))) {
		type = "array";
	}

	return { tokens, type };
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

const OPS = { AND: 1, OR: 2 } as const; // by precedence
const FNS = { ALL: 1, ANY: 2 } as const; // by arg count

const parseCode = (code: string) => {
	const refs: Record<string, CNode> = {};

	const errors: Record<number, string> = {};

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
				errors[i] = "Unexpected closing parenthesis";
			} else {
				refs[v.ref] = {
					id: v.ref,
					range: [v.start, i],
					value: code.slice(v.start, i + 1),
					parent: v.parent,
					children: [],
				};
			}
		}
	}

	const refList = Object.keys(refs);

	// reverse refs
	for (const id of refList) {
		const parentId = refs[id].parent;

		if (parentId) {
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

		if (parentId) {
			const parent = refs[parentId];
			const index = parent.tokens?.findIndex((x) => x === id) ?? -1;

			if (index > 0) {
				if (parent.tokens?.[index - 1].toUpperCase() === "FROM") {
					refs[id].type = "array";
				}
			}
		}
	}

	return { refs, errors, rootRef };
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
		() => findByPosition(position, parsed.result?.refs ?? {}),
		[position, parsed.result],
	);

	const search: { tags: string[]; val?: string } = useMemo(() => {
		const tags: string[] = [];
		const refs = parsed.result?.refs;
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
		return SUGGESTIONS.filter((x) => {
			if (!search.tags.every((tag) => x.tags.includes(tag))) {
				return false;
			}

			if (search.val) {
				return x.value.indexOf(search.val.toUpperCase()) >= 0;
			}

			return true;
		});
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

	function onCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		input.dispatch({ type: "code", payload: value });
	}

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
						onBlur={() =>
							input.dispatch({ type: "focused", payload: false })
						}
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

			{children?.({ code: input.state.code, isUpdated })}
		</div>
	);
}
