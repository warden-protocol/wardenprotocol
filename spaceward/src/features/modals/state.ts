import { createGlobalState } from "@/hooks/state";

import type {
	ConfirmParams,
	CreateKeyParams,
	SelectAssetParams,
	TransferParams,
} from "./types";

export type ModalType =
	| "add-owner"
	| "approve-action"
	| "approve-snap"
	| "create-key"
	| "confirm"
	| "dapps-modal"
	| "receive"
	| "select-asset"
	| "send"
	| "walletconnect";

interface ModalParams {
	"add-owner": {};
	"approve-action": {};
	"approve-snap": {};
	"create-key": CreateKeyParams;
	"confirm": ConfirmParams;
	"dapps-modal": {};
	receive: TransferParams;
	"select-asset": SelectAssetParams;
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
