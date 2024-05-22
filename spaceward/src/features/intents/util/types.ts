
export type NodeType = "expression" | "array";

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

export type IsTokenized = CNode &
	Required<Pick<CNode, "tokenRanges" | "tokens" | "type">>;

export interface ErrorEntry {
	node: CNode;
	tokenIndex: number;
	message: string;
	code?: string;
	value?: string;
}

export type ErrorData = Record<number, ErrorEntry[]>;
type ArgumentType = "num" | "arr";

export interface FunctionDescriptor {
	args: ArgumentType[];
	name: string;
	description?: string;
}

export interface OperatorDescriptor {
	precedence: number;
	value: string;
	description?: string
}