import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import type { AddressResponse, QueryKeyResponse } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/query";
import type { ModalType } from "@/context/modalContext";

export interface SelectKeyParams {
	addresses?: (AddressResponse & { keyId: bigint })[];
	next?: ModalType;
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
