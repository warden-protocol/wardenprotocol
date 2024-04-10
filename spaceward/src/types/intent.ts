export type ConditionType = "joint" | `group:${number}` | "anyone";

export interface SimpleIntent {
	id?: number;
	name: string;
	addresses: string[];
	conditions: { type: ConditionType; group: string[] }[];
	operators: ("and" | "or")[];
}
