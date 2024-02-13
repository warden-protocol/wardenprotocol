import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { Bech32PrefixResponse } from "./types/cosmos/auth/v1beta1/query";
import { GenesisState } from "./types/cosmos/auth/v1beta1/genesis";
import { QueryParamsResponse } from "./types/cosmos/auth/v1beta1/query";
import { Bech32PrefixRequest } from "./types/cosmos/auth/v1beta1/query";
import { ModuleAccount } from "./types/cosmos/auth/v1beta1/auth";
import { QueryModuleAccountByNameRequest } from "./types/cosmos/auth/v1beta1/query";
import { QueryParamsRequest } from "./types/cosmos/auth/v1beta1/query";
import { AddressBytesToStringRequest } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountAddressByIDResponse } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountResponse } from "./types/cosmos/auth/v1beta1/query";
import { Params } from "./types/cosmos/auth/v1beta1/auth";
import { ModuleCredential } from "./types/cosmos/auth/v1beta1/auth";
import { QueryModuleAccountsResponse } from "./types/cosmos/auth/v1beta1/query";
import { QueryModuleAccountByNameResponse } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountInfoRequest } from "./types/cosmos/auth/v1beta1/query";
import { MsgUpdateParamsResponse } from "./types/cosmos/auth/v1beta1/tx";
import { QueryModuleAccountsRequest } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountAddressByIDRequest } from "./types/cosmos/auth/v1beta1/query";
import { BaseAccount } from "./types/cosmos/auth/v1beta1/auth";
import { QueryAccountRequest } from "./types/cosmos/auth/v1beta1/query";
import { AddressBytesToStringResponse } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountsRequest } from "./types/cosmos/auth/v1beta1/query";
import { QueryAccountInfoResponse } from "./types/cosmos/auth/v1beta1/query";
import { MsgUpdateParams } from "./types/cosmos/auth/v1beta1/tx";
import { QueryAccountsResponse } from "./types/cosmos/auth/v1beta1/query";
import { AddressStringToBytesRequest } from "./types/cosmos/auth/v1beta1/query";
import { AddressStringToBytesResponse } from "./types/cosmos/auth/v1beta1/query";
export { Bech32PrefixResponse, GenesisState, QueryParamsResponse, Bech32PrefixRequest, ModuleAccount, QueryModuleAccountByNameRequest, QueryParamsRequest, AddressBytesToStringRequest, QueryAccountAddressByIDResponse, QueryAccountResponse, Params, ModuleCredential, QueryModuleAccountsResponse, QueryModuleAccountByNameResponse, QueryAccountInfoRequest, MsgUpdateParamsResponse, QueryModuleAccountsRequest, QueryAccountAddressByIDRequest, BaseAccount, QueryAccountRequest, AddressBytesToStringResponse, QueryAccountsRequest, QueryAccountInfoResponse, MsgUpdateParams, QueryAccountsResponse, AddressStringToBytesRequest, AddressStringToBytesResponse };
type sendBech32PrefixResponseParams = {
    value: Bech32PrefixResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendBech32PrefixRequestParams = {
    value: Bech32PrefixRequest;
    fee?: StdFee;
    memo?: string;
};
type sendModuleAccountParams = {
    value: ModuleAccount;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleAccountByNameRequestParams = {
    value: QueryModuleAccountByNameRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendAddressBytesToStringRequestParams = {
    value: AddressBytesToStringRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountAddressByIDResponseParams = {
    value: QueryAccountAddressByIDResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountResponseParams = {
    value: QueryAccountResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendModuleCredentialParams = {
    value: ModuleCredential;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleAccountsResponseParams = {
    value: QueryModuleAccountsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleAccountByNameResponseParams = {
    value: QueryModuleAccountByNameResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountInfoRequestParams = {
    value: QueryAccountInfoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleAccountsRequestParams = {
    value: QueryModuleAccountsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountAddressByIDRequestParams = {
    value: QueryAccountAddressByIDRequest;
    fee?: StdFee;
    memo?: string;
};
type sendBaseAccountParams = {
    value: BaseAccount;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountRequestParams = {
    value: QueryAccountRequest;
    fee?: StdFee;
    memo?: string;
};
type sendAddressBytesToStringResponseParams = {
    value: AddressBytesToStringResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountsRequestParams = {
    value: QueryAccountsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountInfoResponseParams = {
    value: QueryAccountInfoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAccountsResponseParams = {
    value: QueryAccountsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendAddressStringToBytesRequestParams = {
    value: AddressStringToBytesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendAddressStringToBytesResponseParams = {
    value: AddressStringToBytesResponse;
    fee?: StdFee;
    memo?: string;
};
type bech32PrefixResponseParams = {
    value: Bech32PrefixResponse;
};
type genesisStateParams = {
    value: GenesisState;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type bech32PrefixRequestParams = {
    value: Bech32PrefixRequest;
};
type moduleAccountParams = {
    value: ModuleAccount;
};
type queryModuleAccountByNameRequestParams = {
    value: QueryModuleAccountByNameRequest;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type addressBytesToStringRequestParams = {
    value: AddressBytesToStringRequest;
};
type queryAccountAddressByIdresponseParams = {
    value: QueryAccountAddressByIDResponse;
};
type queryAccountResponseParams = {
    value: QueryAccountResponse;
};
type paramsParams = {
    value: Params;
};
type moduleCredentialParams = {
    value: ModuleCredential;
};
type queryModuleAccountsResponseParams = {
    value: QueryModuleAccountsResponse;
};
type queryModuleAccountByNameResponseParams = {
    value: QueryModuleAccountByNameResponse;
};
type queryAccountInfoRequestParams = {
    value: QueryAccountInfoRequest;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type queryModuleAccountsRequestParams = {
    value: QueryModuleAccountsRequest;
};
type queryAccountAddressByIdrequestParams = {
    value: QueryAccountAddressByIDRequest;
};
type baseAccountParams = {
    value: BaseAccount;
};
type queryAccountRequestParams = {
    value: QueryAccountRequest;
};
type addressBytesToStringResponseParams = {
    value: AddressBytesToStringResponse;
};
type queryAccountsRequestParams = {
    value: QueryAccountsRequest;
};
type queryAccountInfoResponseParams = {
    value: QueryAccountInfoResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type queryAccountsResponseParams = {
    value: QueryAccountsResponse;
};
type addressStringToBytesRequestParams = {
    value: AddressStringToBytesRequest;
};
type addressStringToBytesResponseParams = {
    value: AddressStringToBytesResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendBech32PrefixResponse({ value, fee, memo }: sendBech32PrefixResponseParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendBech32PrefixRequest({ value, fee, memo }: sendBech32PrefixRequestParams): Promise<DeliverTxResponse>;
    sendModuleAccount({ value, fee, memo }: sendModuleAccountParams): Promise<DeliverTxResponse>;
    sendQueryModuleAccountByNameRequest({ value, fee, memo }: sendQueryModuleAccountByNameRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendAddressBytesToStringRequest({ value, fee, memo }: sendAddressBytesToStringRequestParams): Promise<DeliverTxResponse>;
    sendQueryAccountAddressByIDResponse({ value, fee, memo }: sendQueryAccountAddressByIDResponseParams): Promise<DeliverTxResponse>;
    sendQueryAccountResponse({ value, fee, memo }: sendQueryAccountResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendModuleCredential({ value, fee, memo }: sendModuleCredentialParams): Promise<DeliverTxResponse>;
    sendQueryModuleAccountsResponse({ value, fee, memo }: sendQueryModuleAccountsResponseParams): Promise<DeliverTxResponse>;
    sendQueryModuleAccountByNameResponse({ value, fee, memo }: sendQueryModuleAccountByNameResponseParams): Promise<DeliverTxResponse>;
    sendQueryAccountInfoRequest({ value, fee, memo }: sendQueryAccountInfoRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryModuleAccountsRequest({ value, fee, memo }: sendQueryModuleAccountsRequestParams): Promise<DeliverTxResponse>;
    sendQueryAccountAddressByIDRequest({ value, fee, memo }: sendQueryAccountAddressByIDRequestParams): Promise<DeliverTxResponse>;
    sendBaseAccount({ value, fee, memo }: sendBaseAccountParams): Promise<DeliverTxResponse>;
    sendQueryAccountRequest({ value, fee, memo }: sendQueryAccountRequestParams): Promise<DeliverTxResponse>;
    sendAddressBytesToStringResponse({ value, fee, memo }: sendAddressBytesToStringResponseParams): Promise<DeliverTxResponse>;
    sendQueryAccountsRequest({ value, fee, memo }: sendQueryAccountsRequestParams): Promise<DeliverTxResponse>;
    sendQueryAccountInfoResponse({ value, fee, memo }: sendQueryAccountInfoResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendQueryAccountsResponse({ value, fee, memo }: sendQueryAccountsResponseParams): Promise<DeliverTxResponse>;
    sendAddressStringToBytesRequest({ value, fee, memo }: sendAddressStringToBytesRequestParams): Promise<DeliverTxResponse>;
    sendAddressStringToBytesResponse({ value, fee, memo }: sendAddressStringToBytesResponseParams): Promise<DeliverTxResponse>;
    bech32PrefixResponse({ value }: bech32PrefixResponseParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    bech32PrefixRequest({ value }: bech32PrefixRequestParams): EncodeObject;
    moduleAccount({ value }: moduleAccountParams): EncodeObject;
    queryModuleAccountByNameRequest({ value }: queryModuleAccountByNameRequestParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    addressBytesToStringRequest({ value }: addressBytesToStringRequestParams): EncodeObject;
    queryAccountAddressByIdresponse({ value }: queryAccountAddressByIdresponseParams): EncodeObject;
    queryAccountResponse({ value }: queryAccountResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    moduleCredential({ value }: moduleCredentialParams): EncodeObject;
    queryModuleAccountsResponse({ value }: queryModuleAccountsResponseParams): EncodeObject;
    queryModuleAccountByNameResponse({ value }: queryModuleAccountByNameResponseParams): EncodeObject;
    queryAccountInfoRequest({ value }: queryAccountInfoRequestParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    queryModuleAccountsRequest({ value }: queryModuleAccountsRequestParams): EncodeObject;
    queryAccountAddressByIdrequest({ value }: queryAccountAddressByIdrequestParams): EncodeObject;
    baseAccount({ value }: baseAccountParams): EncodeObject;
    queryAccountRequest({ value }: queryAccountRequestParams): EncodeObject;
    addressBytesToStringResponse({ value }: addressBytesToStringResponseParams): EncodeObject;
    queryAccountsRequest({ value }: queryAccountsRequestParams): EncodeObject;
    queryAccountInfoResponse({ value }: queryAccountInfoResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    queryAccountsResponse({ value }: queryAccountsResponseParams): EncodeObject;
    addressStringToBytesRequest({ value }: addressStringToBytesRequestParams): EncodeObject;
    addressStringToBytesResponse({ value }: addressStringToBytesResponseParams): EncodeObject;
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
