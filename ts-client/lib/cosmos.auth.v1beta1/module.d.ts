import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgUpdateParams } from "./types/cosmos/auth/v1beta1/tx";
import { QueryAccountInfoRequest } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountsResponse } from "./types/cosmos/auth/v1beta1/query";
import { QueryModuleAccountsResponse } from "./types/cosmos/auth/v1beta1/query";
import { QueryModuleAccountByNameRequest } from "./types/cosmos/auth/v1beta1/query";
import { AddressBytesToStringRequest } from "./types/cosmos/auth/v1beta1/query";
import { AddressStringToBytesResponse } from "./types/cosmos/auth/v1beta1/query";
import { MsgUpdateParamsResponse } from "./types/cosmos/auth/v1beta1/tx";
import { Params } from "./types/cosmos/auth/v1beta1/auth";
import { QueryAccountsRequest } from "./types/cosmos/auth/v1beta1/query";
import { QueryParamsResponse } from "./types/cosmos/auth/v1beta1/query";
import { QueryModuleAccountByNameResponse } from "./types/cosmos/auth/v1beta1/query";
import { AddressBytesToStringResponse } from "./types/cosmos/auth/v1beta1/query";
import { ModuleCredential } from "./types/cosmos/auth/v1beta1/auth";
import { QueryAccountResponse } from "./types/cosmos/auth/v1beta1/query";
import { QueryModuleAccountsRequest } from "./types/cosmos/auth/v1beta1/query";
import { GenesisState } from "./types/cosmos/auth/v1beta1/genesis";
import { QueryParamsRequest } from "./types/cosmos/auth/v1beta1/query";
import { Bech32PrefixResponse } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountRequest } from "./types/cosmos/auth/v1beta1/query";
import { AddressStringToBytesRequest } from "./types/cosmos/auth/v1beta1/query";
import { BaseAccount } from "./types/cosmos/auth/v1beta1/auth";
import { ModuleAccount } from "./types/cosmos/auth/v1beta1/auth";
import { QueryAccountAddressByIDRequest } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountAddressByIDResponse } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountInfoResponse } from "./types/cosmos/auth/v1beta1/query";
import { Bech32PrefixRequest } from "./types/cosmos/auth/v1beta1/query";
export { MsgUpdateParams, QueryAccountInfoRequest, QueryAccountsResponse, QueryModuleAccountsResponse, QueryModuleAccountByNameRequest, AddressBytesToStringRequest, AddressStringToBytesResponse, MsgUpdateParamsResponse, Params, QueryAccountsRequest, QueryParamsResponse, QueryModuleAccountByNameResponse, AddressBytesToStringResponse, ModuleCredential, QueryAccountResponse, QueryModuleAccountsRequest, GenesisState, QueryParamsRequest, Bech32PrefixResponse, QueryAccountRequest, AddressStringToBytesRequest, BaseAccount, ModuleAccount, QueryAccountAddressByIDRequest, QueryAccountAddressByIDResponse, QueryAccountInfoResponse, Bech32PrefixRequest };
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountInfoRequestParams = {
    value: QueryAccountInfoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountsResponseParams = {
    value: QueryAccountsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleAccountsResponseParams = {
    value: QueryModuleAccountsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleAccountByNameRequestParams = {
    value: QueryModuleAccountByNameRequest;
    fee?: StdFee;
    memo?: string;
};
type sendAddressBytesToStringRequestParams = {
    value: AddressBytesToStringRequest;
    fee?: StdFee;
    memo?: string;
};
type sendAddressStringToBytesResponseParams = {
    value: AddressStringToBytesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountsRequestParams = {
    value: QueryAccountsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleAccountByNameResponseParams = {
    value: QueryModuleAccountByNameResponse;
    fee?: StdFee;
    memo?: string;
};
type sendAddressBytesToStringResponseParams = {
    value: AddressBytesToStringResponse;
    fee?: StdFee;
    memo?: string;
};
type sendModuleCredentialParams = {
    value: ModuleCredential;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountResponseParams = {
    value: QueryAccountResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleAccountsRequestParams = {
    value: QueryModuleAccountsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendBech32PrefixResponseParams = {
    value: Bech32PrefixResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountRequestParams = {
    value: QueryAccountRequest;
    fee?: StdFee;
    memo?: string;
};
type sendAddressStringToBytesRequestParams = {
    value: AddressStringToBytesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendBaseAccountParams = {
    value: BaseAccount;
    fee?: StdFee;
    memo?: string;
};
type sendModuleAccountParams = {
    value: ModuleAccount;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountAddressByIDRequestParams = {
    value: QueryAccountAddressByIDRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountAddressByIDResponseParams = {
    value: QueryAccountAddressByIDResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountInfoResponseParams = {
    value: QueryAccountInfoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendBech32PrefixRequestParams = {
    value: Bech32PrefixRequest;
    fee?: StdFee;
    memo?: string;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type queryAccountInfoRequestParams = {
    value: QueryAccountInfoRequest;
};
type queryAccountsResponseParams = {
    value: QueryAccountsResponse;
};
type queryModuleAccountsResponseParams = {
    value: QueryModuleAccountsResponse;
};
type queryModuleAccountByNameRequestParams = {
    value: QueryModuleAccountByNameRequest;
};
type addressBytesToStringRequestParams = {
    value: AddressBytesToStringRequest;
};
type addressStringToBytesResponseParams = {
    value: AddressStringToBytesResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type paramsParams = {
    value: Params;
};
type queryAccountsRequestParams = {
    value: QueryAccountsRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryModuleAccountByNameResponseParams = {
    value: QueryModuleAccountByNameResponse;
};
type addressBytesToStringResponseParams = {
    value: AddressBytesToStringResponse;
};
type moduleCredentialParams = {
    value: ModuleCredential;
};
type queryAccountResponseParams = {
    value: QueryAccountResponse;
};
type queryModuleAccountsRequestParams = {
    value: QueryModuleAccountsRequest;
};
type genesisStateParams = {
    value: GenesisState;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type bech32PrefixResponseParams = {
    value: Bech32PrefixResponse;
};
type queryAccountRequestParams = {
    value: QueryAccountRequest;
};
type addressStringToBytesRequestParams = {
    value: AddressStringToBytesRequest;
};
type baseAccountParams = {
    value: BaseAccount;
};
type moduleAccountParams = {
    value: ModuleAccount;
};
type queryAccountAddressByIdrequestParams = {
    value: QueryAccountAddressByIDRequest;
};
type queryAccountAddressByIdresponseParams = {
    value: QueryAccountAddressByIDResponse;
};
type queryAccountInfoResponseParams = {
    value: QueryAccountInfoResponse;
};
type bech32PrefixRequestParams = {
    value: Bech32PrefixRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendQueryAccountInfoRequest({ value, fee, memo }: sendQueryAccountInfoRequestParams): Promise<DeliverTxResponse>;
    sendQueryAccountsResponse({ value, fee, memo }: sendQueryAccountsResponseParams): Promise<DeliverTxResponse>;
    sendQueryModuleAccountsResponse({ value, fee, memo }: sendQueryModuleAccountsResponseParams): Promise<DeliverTxResponse>;
    sendQueryModuleAccountByNameRequest({ value, fee, memo }: sendQueryModuleAccountByNameRequestParams): Promise<DeliverTxResponse>;
    sendAddressBytesToStringRequest({ value, fee, memo }: sendAddressBytesToStringRequestParams): Promise<DeliverTxResponse>;
    sendAddressStringToBytesResponse({ value, fee, memo }: sendAddressStringToBytesResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQueryAccountsRequest({ value, fee, memo }: sendQueryAccountsRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryModuleAccountByNameResponse({ value, fee, memo }: sendQueryModuleAccountByNameResponseParams): Promise<DeliverTxResponse>;
    sendAddressBytesToStringResponse({ value, fee, memo }: sendAddressBytesToStringResponseParams): Promise<DeliverTxResponse>;
    sendModuleCredential({ value, fee, memo }: sendModuleCredentialParams): Promise<DeliverTxResponse>;
    sendQueryAccountResponse({ value, fee, memo }: sendQueryAccountResponseParams): Promise<DeliverTxResponse>;
    sendQueryModuleAccountsRequest({ value, fee, memo }: sendQueryModuleAccountsRequestParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendBech32PrefixResponse({ value, fee, memo }: sendBech32PrefixResponseParams): Promise<DeliverTxResponse>;
    sendQueryAccountRequest({ value, fee, memo }: sendQueryAccountRequestParams): Promise<DeliverTxResponse>;
    sendAddressStringToBytesRequest({ value, fee, memo }: sendAddressStringToBytesRequestParams): Promise<DeliverTxResponse>;
    sendBaseAccount({ value, fee, memo }: sendBaseAccountParams): Promise<DeliverTxResponse>;
    sendModuleAccount({ value, fee, memo }: sendModuleAccountParams): Promise<DeliverTxResponse>;
    sendQueryAccountAddressByIDRequest({ value, fee, memo }: sendQueryAccountAddressByIDRequestParams): Promise<DeliverTxResponse>;
    sendQueryAccountAddressByIDResponse({ value, fee, memo }: sendQueryAccountAddressByIDResponseParams): Promise<DeliverTxResponse>;
    sendQueryAccountInfoResponse({ value, fee, memo }: sendQueryAccountInfoResponseParams): Promise<DeliverTxResponse>;
    sendBech32PrefixRequest({ value, fee, memo }: sendBech32PrefixRequestParams): Promise<DeliverTxResponse>;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    queryAccountInfoRequest({ value }: queryAccountInfoRequestParams): EncodeObject;
    queryAccountsResponse({ value }: queryAccountsResponseParams): EncodeObject;
    queryModuleAccountsResponse({ value }: queryModuleAccountsResponseParams): EncodeObject;
    queryModuleAccountByNameRequest({ value }: queryModuleAccountByNameRequestParams): EncodeObject;
    addressBytesToStringRequest({ value }: addressBytesToStringRequestParams): EncodeObject;
    addressStringToBytesResponse({ value }: addressStringToBytesResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    queryAccountsRequest({ value }: queryAccountsRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryModuleAccountByNameResponse({ value }: queryModuleAccountByNameResponseParams): EncodeObject;
    addressBytesToStringResponse({ value }: addressBytesToStringResponseParams): EncodeObject;
    moduleCredential({ value }: moduleCredentialParams): EncodeObject;
    queryAccountResponse({ value }: queryAccountResponseParams): EncodeObject;
    queryModuleAccountsRequest({ value }: queryModuleAccountsRequestParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    bech32PrefixResponse({ value }: bech32PrefixResponseParams): EncodeObject;
    queryAccountRequest({ value }: queryAccountRequestParams): EncodeObject;
    addressStringToBytesRequest({ value }: addressStringToBytesRequestParams): EncodeObject;
    baseAccount({ value }: baseAccountParams): EncodeObject;
    moduleAccount({ value }: moduleAccountParams): EncodeObject;
    queryAccountAddressByIdrequest({ value }: queryAccountAddressByIdrequestParams): EncodeObject;
    queryAccountAddressByIdresponse({ value }: queryAccountAddressByIdresponseParams): EncodeObject;
    queryAccountInfoResponse({ value }: queryAccountInfoResponseParams): EncodeObject;
    bech32PrefixRequest({ value }: bech32PrefixRequestParams): EncodeObject;
};
interface QueryClientOptions {
    addr: string;
}
export declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Api<unknown>;
declare class SDKModule {
    query: ReturnType<typeof queryClient>;
    tx: ReturnType<typeof txClient>;
    structure: Record<string, unknown>;
    registry: Array<[string, GeneratedType]>;
    constructor(client: IgniteClient);
    updateTX(client: IgniteClient): void;
}
declare const IgntModule: (test: IgniteClient) => {
    module: {
        CosmosAuthV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
