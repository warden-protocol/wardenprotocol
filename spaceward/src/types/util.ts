export type ActionsFromState<T extends {}, K extends keyof T> = {
	type: K;
	payload: T[K];
};

export type SetAction<T extends {}> = {
	type: "set";
	payload: Partial<T>;
};

export type DeepWriteable<T> = {
	-readonly [P in keyof T]: DeepWriteable<T[P]>;
};

export type Concat<T extends string[], S extends string = ""> = T extends [
	infer F,
	...infer R,
]
	? F extends string
		? R extends string[]
			? `${F}${S}${Concat<R, S>}`
			: never
		: never
	: "";
