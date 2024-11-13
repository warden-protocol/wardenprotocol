import type { ReactNode } from "react";
import type { AddressType } from "@/hooks/query/warden";
import type { KeyModel } from "@/hooks/query/types";
import type { ModalType } from "./state";

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
	keyResponse?: KeyModel;
}

export interface SelectAssetParams {
	keyResponse?: KeyModel;
}

export interface ConfirmParams {
	content?: ReactNode;
	onConfirm?: () => Promise<void>;
	onCancel?: () => Promise<void>;
}

export type ModalParams<T extends {}> = {
	hidden?: boolean;
} & T;
