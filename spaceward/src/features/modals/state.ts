import { createGlobalState } from "@/hooks/state";
import { SelectAssetParams, SelectKeyParams, TransferParams } from "./types";

export type ModalType =
	| "select-key"
	| "receive"
	| "send"
	| "select-asset"
	| "walletconnect"
	| "dapps-modal";

interface ModalParams {
	"select-asset": SelectAssetParams;
	"select-key": SelectKeyParams;
	receive: TransferParams;
	send: TransferParams;
	walletconnect: undefined;
	"dapps-modal": undefined;
}

export interface ModalState {
	type?: ModalType;
	params?: ModalParams[ModalType];
}

export const useModalState = createGlobalState<ModalState>("modal", {});
