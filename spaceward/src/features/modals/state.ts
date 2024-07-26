import { createGlobalState } from "@/hooks/state";

import type {
	CreateKeyParams,
	SelectAssetParams,
	SelectKeyParams,
	TransferParams,
} from "./types";

export type ModalType =
	| "add-owner"
	| "approve-action"
	| "create-key"
	| "dapps-modal"
	| "receive"
	| "select-asset"
	| "select-key"
	| "send"
	| "walletconnect";

interface ModalParams {
	"add-owner": {};
	"approve-action": {};
	"create-key": CreateKeyParams;
	"dapps-modal": {};
	receive: TransferParams;
	"select-asset": SelectAssetParams;
	"select-key": SelectKeyParams;
	send: TransferParams;
	walletconnect: {};
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
