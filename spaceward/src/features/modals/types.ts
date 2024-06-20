import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import type { AddressResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/query";
import type { ModalType } from "@/context/modalContext";

export interface SelectKeyParams {
	addresses?: AddressResponse[];
	next?: ModalType
}

export interface TransferParams {
	address?: string;
	type?: AddressType;
	token?: string;
	chainName?: string;
}
