type NodeType = "expression" | "array";

export interface CNode {
	id: string;
	children: string[];
	parent?: string;
	range: [number, number];
	root: string;
	value: string;
	type?: NodeType;
	tokenRanges?: [number, number][];
	tokens?: string[];
}

export type RefDictionary = Record<string, CNode>;

type IsTokenized = CNode &
	Required<Pick<CNode, "tokenRanges" | "tokens" | "type">>;

interface ErrorEntry {
	node: CNode;
	tokenIndex: number;
	message: string;
}

type ErrorData = Record<number, ErrorEntry[]>;

export const FNS = { ALL: 1, ANY: 2 } as const; // by arg count

export const OPS = {
	AND: {
		precedence: 1,
		value: "&&",
	},
	OR: {
		precedence: 2,
		value: "||",
	},
} as const;

export const isTokenized = (node?: CNode): node is IsTokenized =>
	Boolean(node?.type && node?.tokenRanges && node?.tokens);

export const errors = () => {
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

export const findError = (
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

const normalize = (node: CNode, refs: RefDictionary) => {
	const root = refs[node.root];

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

const tokenize = (node: CNode, refs: RefDictionary) => {
	const normalized = normalize(node, refs);

	const root = refs[node.root];

	if (!root) {
		throw new Error("Root node not found");
	}

	// TODO lookup for FROM keyword before node
	const type: NodeType =
		normalized.indexOf(",") >= 0 ? "array" : "expression";

	let pos = node.range[0];

	const tokens =
		type === "array"
			? normalized.split(",").map((x) => x.trim())
			: normalized.split(" ").filter(Boolean);

	const tokenRanges: [number, number][] = [];

	// get range for token in original string
	for (const token of tokens) {
		if (!token) {
			tokenRanges.push([pos, pos]);
			continue;
		}

		const { search, length } =
			token in refs
				? {
						search: refs[token].value,
						length: refs[token].range[1] - refs[token].range[0],
					}
				: { search: token, length: token.length };
		const start = root.value.indexOf(search, pos);

		if (start < 0) {
			throw new Error(`Token ${token} not found`);
		}

		const end = start + length - 1; // +1 ?

		tokenRanges.push([start, end]);
		pos = end + 1;
	}

	return { tokenRanges, tokens, type };
};

export const parseCode = (code: string) => {
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
		root: rootRef,
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
					root: rootRef,
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
		const { tokenRanges, tokens, type } = tokenize(refs[id], refs);
		refs[id].tokenRanges = tokenRanges;
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

export function hasEntries<T>(obj?: T): obj is T {
	return obj ? Boolean(Object.keys(obj).length) : false;
}

export const toShield = (
	node: CNode,
	refs: RefDictionary,
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

export const replaceAt = (
	str: string,
	replacement: string,
	range: [number, number],
) => {
	const start = str.substring(0, range[0]);
	const end = str.substring(range[1] + 1);
	return `${start}${replacement}${end}`;
};

export const wrapParenthesis = (wrap: boolean, value: string) =>
	wrap ? `(${value})` : value;
