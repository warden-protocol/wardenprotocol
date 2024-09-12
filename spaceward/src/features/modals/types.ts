import type { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import type { QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
import type { ModalType } from "./state";
import { ReactNode } from "react";

export interface CreateKeyParams {
	next?: ModalType;
	spaceId?: string;
	keychainId?: bigint;
}

export interface TransferParams {
	address?: string;
	type?: AddressType;
	token?: string;
	chainName?: string;
	keyResponse?: QueryKeyResponse;
}

export interface SelectAssetParams {
	keyResponse?: QueryKeyResponse;
}

export interface ConfirmParams {
	content?: ReactNode;
	onConfirm?: () => Promise<void>;
	onCancel?: () => Promise<void>;
}

export type ModalParams<T extends {}> = {
	hidden?: boolean;
} & T;
