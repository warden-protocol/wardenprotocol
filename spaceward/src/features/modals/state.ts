import { createGlobalState } from "@/hooks/state";

import type {
	CreateKeyParams,
	SelectAssetParams,
	SelectKeyParams,
	TransferParams,
} from "./types";

export type ModalType =
	| "create-key"
	| "select-key"
	| "receive"
	| "send"
	| "select-asset"
	| "walletconnect"
	| "dapps-modal"
	| "approve-action";

interface ModalParams {
	"create-key": CreateKeyParams;
	"select-asset": SelectAssetParams;
	"select-key": SelectKeyParams;
	receive: TransferParams;
	send: TransferParams;
	walletconnect: {};
	"dapps-modal": {};
	"approve-action": {};
}

export interface ModalState {
	type?: ModalType;
	params?: ModalParams[ModalType];
	/** @deprecated fixme, seems to be a hacky way to handle background tasks */
	background: Partial<ModalParams>;
}

export const useModalState = createGlobalState<ModalState>("modal", {
	background: {},
});
