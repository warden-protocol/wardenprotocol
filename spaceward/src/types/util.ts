export type ActionsFromState<T extends {}, K extends keyof T> = {
	type: K;
	payload: T[K];
};

export type SetAction<T extends {}> = {
	type: "set";
	payload: Partial<T>;
};

export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
