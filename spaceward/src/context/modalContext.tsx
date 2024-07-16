import ModalRoot from "@/features/modals";
import type {
	SelectAssetParams,
	SelectKeyParams,
	TransferParams,
} from "@/features/modals/types";
import { CommonActions, commonReducer } from "@/utils/common";
import { createContext, Dispatch, useContext, useReducer } from "react";
export type ModalType =
	| "select-key"
	| "receive"
	| "send"
	| "select-asset"
	| "walletconnect";

interface ModalParams {
	"select-asset": SelectAssetParams;
	"select-key": SelectKeyParams;
	receive: TransferParams;
	send: TransferParams;
	walletconnect: undefined;
}

export interface ModalState {
	type?: ModalType;
	params?: ModalParams[ModalType];
}

const ModalContext = createContext<{
	dispatch: Dispatch<CommonActions<ModalState>>;
}>({
	dispatch: () => {
		throw new Error("not implemented");
	},
});

export const useModalContext = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(commonReducer<ModalState>, {});

	return (
		<ModalContext.Provider value={{ dispatch }}>
			{children}
			<ModalRoot {...state} />
		</ModalContext.Provider>
	);
}
