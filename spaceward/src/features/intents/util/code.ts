import { ERROR_CODES, FNS, OPS } from "./constants";
import type {
	CNode,
	ErrorData,
	ErrorEntry,
	IsTokenized,
	NodeType,
	RefDictionary,
} from "./types";

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

	let value = root.value.slice(...node.range);

	for (let i = node.children.length - 1; i >= 0; i--) {
		const child = refs[node.children[i]];

		const before = trimSymbols(
			value.substring(0, child.range[0] - node.range[0]).trim(),
			[" ", "("],
		);

		const after = trimSymbols(
			value.substring(child.range[1] - node.range[0]).trim(),
			[" ", ")"],
		);

		value = `${before ? `${before} ` : ""}${child.id}${
			after ? ` ${after}` : ""
		}`;
	}

	return trimSymbols(value, [" ", "(", ")"]);
};

const tokenize = (node: CNode, refs: RefDictionary) => {
	const normalized = normalize(node, refs);
	const root = refs[node.root];

	if (!root) {
		throw new Error("Root node not found");
	}

	let type: NodeType = "expression";

	if (node.parent) {
		const parent = refs[node.parent];

		if (!isTokenized(parent)) {
			throw new Error("invalid parent node");
		}

		const index = parent.tokens.indexOf(node.id);

		if (index < 0) {
			console.warn(`ref ${node.id} not found in parent ${parent.id}`);
		}

		if (index > 0) {
			if (parent.tokens[index - 1].toUpperCase() === "FROM") {
				type = "array";
			}
		}
	}

	let pos = node.range[0];

	const tokens =
		type === "array"
			? normalized
					.split(",")
					.flatMap((x) => x.split(" "))
					.map((x) => x.trim())
					.filter(Boolean)
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

		const start = node.value.indexOf(search, pos - node.range[0]);

		if (start < 0) {
			throw new Error(`Token ${token} not found`);
		}

		const _start = node.range[0] + start;
		const end = _start + length;
		tokenRanges.push([_start, end]);
		pos = end;
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
		range: [0, code.length],
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
					range: [v.start, i + 1],
					value: code.slice(v.start, i + 1),
					parent: v.parent,
					children: [],
					root: rootRef,
				};
			}
		} else if (Object.values(parens).includes(char as any)) {
			errs.add(i, {
				code: ERROR_CODES.OPEN_PARENTHESIS,
				message: "Missing opening parenthesis",
				node: refs[rootRef],
				tokenIndex: -1,
			});
		}
	}

	if (stack.length) {
		for (let i = 0; i < stack.length; i++) {
			const elem = stack[i];
			const range: [number, number] = [elem.start, code.length];

			refs[elem.ref] = {
				id: elem.ref,
				range,
				value: code.slice(...range),
				children: [],
				root: rootRef,
				parent: elem.parent,
			};

			errs.add(elem.start, {
				code: ERROR_CODES.CLOSE_PARENTHESIS,
				message: "Missing closing parenthesis",
				node: refs[elem.ref],
				tokenIndex: -1,
			});
		}
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
	const nodes = [refs[rootRef]];
	while (nodes.length) {
		const node = nodes.pop();

		if (!node) {
			throw new Error("invalid node");
		}

		const { id, children } = node;
		const { tokenRanges, tokens, type } = tokenize(refs[id], refs);
		refs[id].tokenRanges = tokenRanges;
		refs[id].tokens = tokens;
		refs[id].type = type;

		for (const child of children) {
			nodes.push(refs[child]);
		}
	}

	return { refs, errors: errs.data, rootRef };
};

export interface ACNode {
	next: ACNode[];
	parent?: ACNode;
	value?: string;
	description?: string;
}

export const NUM_VALUE = "$NUM";
export const ADR_VALUE = "$ADR";
export function hasEntries<T>(obj?: T): obj is T {
	return obj ? Boolean(Object.keys(obj).length) : false;
}

export function getFirstEntry<T>(obj?: T): [keyof T, T[keyof T]] | undefined {
	if (!hasEntries(obj)) {
		return;
	}

	const key = Object.keys(obj as any)[0] as keyof T;
	return [key, obj[key]];
}

export function getEntries<T>(obj?: T): [keyof T, T[keyof T]][] {
	if (!hasEntries(obj)) {
		return [];
	}

	return Object.entries(obj as any) as [keyof T, T[keyof T]][];
}

const createAutocompleteGraph = () => {
	const root: ACNode = { next: [] };

	const addOpNodes = (parent?: ACNode) => {
		for (const [name, { description }] of getEntries(OPS)) {
			const node: ACNode = {
				next: [root],
				parent,
				value: name,
				description,
			};
			parent?.next.push(node);
		}
	};

	for (const [name, descriptor] of getEntries(FNS)) {
		const node: ACNode = {
			next: [],
			value: name,
			parent: root,
			description: descriptor.description,
		};

		root.next.push(node);
		let prev = node;

		for (const arg of descriptor.args) {
			if (arg === "num") {
				const numNode: ACNode = {
					next: [],
					value: NUM_VALUE,
					parent: prev,
				};
				prev.next.push(numNode);
				prev = numNode;
			} else if (arg === "arr") {
				const fromNode: ACNode = {
					next: [],
					value: "FROM",
					parent: prev,
				};
				prev.next.push(fromNode);
				prev = fromNode;
				const parenthesesNode: ACNode = {
					next: [],
					value: "()",
					parent: prev,
				};
				prev.next.push(parenthesesNode);
				prev = parenthesesNode;
			}
		}

		addOpNodes(prev);
	}

	const parenthesesNode: ACNode = { next: [], value: "()", parent: root };
	addOpNodes(parenthesesNode);
	root.next.push(parenthesesNode);

	const adrNode: ACNode = {
		next: [],
		value: ADR_VALUE,
		parent: root,
		description: ADR_VALUE,
	};
	addOpNodes(adrNode);
	root.next.push(adrNode);

	const array: ACNode = {
		next: [],
		value: ADR_VALUE,
		description: ADR_VALUE,
	};
	array.next.push(array);
	return { array, expression: root };
};

export const findByPosition = (
	pos: number,
	refs: RefDictionary,
	rootRef: string,
) => {
	const root = refs[rootRef];
	if (!root) {
		throw new Error(`root node not found at ref ${rootRef}`);
	}

	let parent: CNode | undefined;
	let node = root; // start from root

	while (true) {
		if (pos < node.range[0] || pos > node.range[1]) {
			if (!isTokenized(node)) {
				throw new Error(`node ${node.id} not initialized`);
			}

			if (node.id !== root.id) {
				throw new Error(
					`position ${pos} out of node range ${node.range}`,
				);
			}

			return {
				index: -1,
				node,
				parent,
				prev: node.tokens.length - 1,
				end: false,
			};
		}

		let inChildren = false;

		for (const child of node.children) {
			if (pos >= refs[child].range[0] && pos < refs[child].range[1]) {
				parent = node;
				node = refs[child];
				inChildren = true;
				break;
			}
		}

		if (!inChildren) {
			break;
		}
	}

	if (!isTokenized(node)) {
		throw new Error(`node ${node.id} not initialized`);
	}

	let index = -1;
	let prev = -1;
	let end = false;

	for (let i = 0; i < node.tokenRanges.length; i++) {
		end = false;
		const range = node.tokenRanges[i];

		if (pos <= range[1] && pos >= range[0]) {
			index = i;
			end = range[1] === pos;
			break;
		} else if (range[0] >= pos && prev >= 0) {
			const pRange = node.tokenRanges[prev];

			if (pRange[1] <= pos) {
				break;
			} else if (pRange[0] > pos) {
				index = prev;
				break;
			}
		}

		prev = i;
	}

	return { index, node, parent, prev, end };
};

type ParseResult = ReturnType<typeof parseCode>;
type Lookup = ReturnType<typeof findByPosition>;
const graph = createAutocompleteGraph();

const getNext = ({ next }: ACNode) => {
	if (next.length === 1 && !next[0].value) {
		return next[0].next;
	}

	return next;
};

export const LOOKUP_SYMBOL = "#";

const stringify = (node: IsTokenized, refs: RefDictionary) => {
	const { type, tokens } = node;

	let value = tokens
		.map((x) => (x in refs ? refs[x].value : x))
		.join(type === "array" ? ", " : " ");

	let parent = node.parent;
	let id = node.id;

	while (parent) {
		const pNode = refs[parent];
		const prevValue = `(${value})`;

		if (!isTokenized(pNode)) {
			throw new Error("invalid parent node");
		}

		value = pNode.tokens
			.map((x) => (x === id ? prevValue : x in refs ? refs[x].value : x))
			.join(pNode.type === "array" ? ", " : " ");

		parent = pNode.parent;
		id = pNode.id;
	}

	return value;
};

export interface AutocompleteItem {
	value: string;
	lookupSymbol: string;
	title: string;
	description: string;
}

export const autocomplete = (
	lookup: Lookup,
	parseResult: ParseResult,
): AutocompleteItem[] => {
	const { refs, rootRef, errors } = parseResult;
	const root = refs[rootRef];

	if (!isTokenized(root)) {
		throw new Error("root node not initialized");
	}

	const exact = lookup.index >= 0;
	let index = exact ? lookup.index : lookup.prev;
	let acNode = graph[lookup.node.type];
	let next: ACNode | undefined;

	if (hasEntries(errors)) {
		const [_pos, [error]] = getFirstEntry(errors)!;
		const pos = Number(_pos);

		switch (error.code) {
			case ERROR_CODES.CLOSE_PARENTHESIS: {
				const result =
					root.value.slice(0, pos + 1) +
					")" +
					LOOKUP_SYMBOL +
					root.value.slice(pos + 1);

				return [
					{
						value: result,
						lookupSymbol: LOOKUP_SYMBOL,
						title: ")",
						description: "Add closing parenthesis",
					},
				];
			}

			case ERROR_CODES.OPEN_PARENTHESIS: {
				const result =
					root.value.slice(0, pos) +
					"(" +
					LOOKUP_SYMBOL +
					root.value.slice(pos);

				return [
					{
						value: result,
						lookupSymbol: LOOKUP_SYMBOL,
						title: "(",
						description: "Add opening parenthesis",
					},
				];
			}

			default: {
				console.warn(errors);
				throw new Error("not implemented");
			}
		}
	} else if (index < 0) {
		return getNext(acNode).map((x) => {
			const tokens = [...lookup.node.tokens];
			tokens.splice(0, 0, `${x.value ?? ""}${LOOKUP_SYMBOL}`);
			const node = { ...lookup.node, tokens };

			return {
				value: stringify(node, refs),
				lookupSymbol: LOOKUP_SYMBOL,
				title: x.value ?? "",
				description: x.description ?? "",
			};
		});
	}

	let fixup = false;

	for (let i = 0; i <= index; i++) {
		const token = lookup.node.tokens[i];

		next = getNext(acNode).find((child) => {
			switch (child.value) {
				case NUM_VALUE: {
					return Number.isFinite(Number(token));
				}

				case ADR_VALUE: {
					return token.toUpperCase().startsWith("ADR");
				}

				default: {
					if (token in refs) {
						return child.value === "()";
					} else {
						return token.toUpperCase() === child.value;
					}
				}
			}
		});

		if (!next) {
			index = i;
			next = acNode;
			fixup = true;
			break;
		} else {
			acNode = next;
		}
	}

	if (!next) {
		console.warn(lookup);
		throw new Error("unreachable error; investigate if thrown");
	}

	const variants =
		exact && !lookup.end
			? next.value
				? [next]
				: next.next
			: getNext(next);

	let target = exact && !lookup.end ? index : index + 1;

	if (fixup) {
		target = index;
	}

	return variants.map((x) => {
		const tokens = [...lookup.node.tokens];

		tokens.splice(
			target,
			// fixme looks hacky
			fixup ? 1 : exact ? (lookup.end ? 0 : 1) : 0,
			`${x.value ?? ""}${LOOKUP_SYMBOL}`,
		);

		const node = { ...lookup.node, tokens };

		return {
			value: stringify(node, refs),
			lookupSymbol: LOOKUP_SYMBOL,
			title: x.value ?? "",
			description: x.description ?? "",
		};
	});
};

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
							code: ERROR_CODES.UNEXPECTED_TOKEN_IN_ARRAY,
							value: token,
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
			const { value } = OPS[token];

			if (i === node.tokens.length - 1) {
				errs.add(i, {
					node,
					tokenIndex: i,
					message: `Unexpected end of expression`,
				});
			}

			result += ` ${value} `;
		} else if (token in FNS) {
			const fn = FNS[token];
			const argc = fn.args.length;

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
				const type = fn.args[j];

				switch (type) {
					case "num": {
						const tokenIndex = i + j;
						const value = node.tokens[tokenIndex];
						args.push(value);

						if (!Number.isFinite(parseInt(value, 10))) {
							errs.add(tokenIndex, {
								node,
								tokenIndex,
								message: `${token} function expects arg[${j}] to be a number`,
								code: ERROR_CODES.EXPECTED_ARG_TYPE,
								value: "num",
							});
						}

						break;
					}

					case "arr": {
						const fromIndex = i + j;

						if (node.tokens[fromIndex]?.toUpperCase() !== "FROM") {
							errs.add(fromIndex, {
								node,
								tokenIndex: fromIndex,
								message: "FROM expected",
								code: ERROR_CODES.EXPECTED_ARG_TYPE,
								value: "util",
							});

							continue;
						}

						const arrIndex = ++i + j;
						const refId = node.tokens[arrIndex];

						if (!refs[refId]) {
							errs.add(arrIndex, {
								node,
								tokenIndex: arrIndex,
								message: `Ref[${refId}] not found`,
								code: refId
									? ERROR_CODES.UNEXPECTED_TOKEN
									: ERROR_CODES.EXPECTED_ARG_TYPE,
								value: refId ? refId : "ref",
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
						break;
					}

					default: {
						errs.add(i + j, {
							node,
							tokenIndex: i + j,
							message: `Unexpected arg type: ${type}`,
							code: ERROR_CODES.EXPECTED_ARG_TYPE,
							value: type,
						});

						break;
					}
				}
			}

			i += argc - 1;
			result += `${token.toLowerCase()}(${args.join(", ")})`;
		} else if (token.toUpperCase().startsWith("ADR")) {
			// todo check correct index
			const addrIndex = parseInt(token.substring(3), 10) - 1;

			if (!addresses[addrIndex]) {
				errs.add(i, {
					node,
					tokenIndex: i,
					message: `Address not found: ${token}`,
					code: ERROR_CODES.UNEXPECTED_TOKEN,
					value: token,
				});
			}

			result += addresses[addrIndex];
		} else {
			errs.add(i, {
				node,
				tokenIndex: i,
				message: `Unexpected token: ${token}`,
				code: ERROR_CODES.UNEXPECTED_TOKEN,
				value: token,
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
