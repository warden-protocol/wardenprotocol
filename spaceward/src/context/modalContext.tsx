import ModalRoot from "@/features/modals";
import type { SelectKeyParams, TransferParams } from "@/features/modals/types";
import { CommonActions, commonReducer } from "@/utils/common";
import { createContext, Dispatch, useReducer } from "react";
export type ModalType = "select-key" | "receive" | "send";

interface ModalParams {
	"select-key": SelectKeyParams;
	receive: TransferParams;
	send: TransferParams;
}

export interface ModalState {
	type?: ModalType;
	params?: ModalParams[ModalType];
}

export const ModalContext = createContext<{
	dispatch: Dispatch<CommonActions<ModalState>>;
}>({
	dispatch: () => {
		throw new Error("not implemented");
	},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(commonReducer<ModalState>, {});

	return (
		<ModalContext.Provider value={{ dispatch }}>
			{children}
			<ModalRoot {...state} />
		</ModalContext.Provider>
	);
}
