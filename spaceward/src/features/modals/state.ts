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
<<<<<<< HEAD
	| "dapps-modal"
	| "approve-action";
=======
	| "dapps-modal";
>>>>>>> 101ad6746282e503c8e79ccad7b1edab01778e06

interface ModalParams {
	"create-key": CreateKeyParams;
	"select-asset": SelectAssetParams;
	"select-key": SelectKeyParams;
	receive: TransferParams;
	send: TransferParams;
<<<<<<< HEAD
	walletconnect: {};
	"dapps-modal": {};
	"approve-action": {};
=======
	walletconnect: undefined;
	"dapps-modal": undefined;
>>>>>>> 101ad6746282e503c8e79ccad7b1edab01778e06
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
