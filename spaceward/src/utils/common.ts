import type { ActionsFromState, SetAction } from "@/types/util";

export type CommonActions<S extends {}> =
	| ActionsFromState<S, keyof S>
	| SetAction<S>;

export const commonReducer = <S extends {}>(
	state: S,
	action: CommonActions<S>,
) =>
	action.type === "set"
		? { ...state, ...action.payload }
		: {
				...state,
				[action.type]: action.payload,
			};
