export const isSet = <T>(value?: T | null | undefined): value is T =>
	Boolean(value);
