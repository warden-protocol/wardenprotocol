import type { Expression } from "./shield";

export type ConditionType = "joint" | `group:${number}` | "anyone" | "advanced";

/** @deprecated rename to smth like ParsedIntent */
export interface SimpleIntent {
	id?: number;
	name: string;
	addresses: string[];
	conditions: {
		type: ConditionType;
		group: string[];
		expression: Expression;
	}[];
	operators: ("and" | "or")[];
	raw: Expression;
}

export interface IntentParams {
	simple?: SimpleIntent;
	advanced?: { definition: string; name: string; id?: number };
}
