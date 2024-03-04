import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryTotalEscrowForDenomRequest } from "./types/ibc/applications/transfer/v1/query";
import { MsgTransfer } from "./types/ibc/applications/transfer/v1/tx";
import { QueryDenomTracesRequest } from "./types/ibc/applications/transfer/v1/query";
import { QueryDenomHashResponse } from "./types/ibc/applications/transfer/v1/query";
import { GenesisState } from "./types/ibc/applications/transfer/v1/genesis";
import { QueryDenomTraceRequest } from "./types/ibc/applications/transfer/v1/query";
import { QueryParamsRequest } from "./types/ibc/applications/transfer/v1/query";
import { MsgTransferResponse } from "./types/ibc/applications/transfer/v1/tx";
import { MsgUpdateParamsResponse } from "./types/ibc/applications/transfer/v1/tx";
import { QueryDenomTraceResponse } from "./types/ibc/applications/transfer/v1/query";
import { QueryDenomTracesResponse } from "./types/ibc/applications/transfer/v1/query";
import { QueryDenomHashRequest } from "./types/ibc/applications/transfer/v1/query";
import { MsgUpdateParams } from "./types/ibc/applications/transfer/v1/tx";
import { Params } from "./types/ibc/applications/transfer/v1/transfer";
import { Allocation } from "./types/ibc/applications/transfer/v1/authz";
import { QueryEscrowAddressResponse } from "./types/ibc/applications/transfer/v1/query";
import { QueryTotalEscrowForDenomResponse } from "./types/ibc/applications/transfer/v1/query";
import { DenomTrace } from "./types/ibc/applications/transfer/v1/transfer";
import { TransferAuthorization } from "./types/ibc/applications/transfer/v1/authz";
import { QueryParamsResponse } from "./types/ibc/applications/transfer/v1/query";
import { QueryEscrowAddressRequest } from "./types/ibc/applications/transfer/v1/query";
export { QueryTotalEscrowForDenomRequest, MsgTransfer, QueryDenomTracesRequest, QueryDenomHashResponse, GenesisState, QueryDenomTraceRequest, QueryParamsRequest, MsgTransferResponse, MsgUpdateParamsResponse, QueryDenomTraceResponse, QueryDenomTracesResponse, QueryDenomHashRequest, MsgUpdateParams, Params, Allocation, QueryEscrowAddressResponse, QueryTotalEscrowForDenomResponse, DenomTrace, TransferAuthorization, QueryParamsResponse, QueryEscrowAddressRequest };
type sendQueryTotalEscrowForDenomRequestParams = {
    value: QueryTotalEscrowForDenomRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgTransferParams = {
    value: MsgTransfer;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDenomTracesRequestParams = {
    value: QueryDenomTracesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDenomHashResponseParams = {
    value: QueryDenomHashResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDenomTraceRequestParams = {
    value: QueryDenomTraceRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgTransferResponseParams = {
    value: MsgTransferResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDenomTraceResponseParams = {
    value: QueryDenomTraceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDenomTracesResponseParams = {
    value: QueryDenomTracesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDenomHashRequestParams = {
    value: QueryDenomHashRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendAllocationParams = {
    value: Allocation;
    fee?: StdFee;
    memo?: string;
};
type sendQueryEscrowAddressResponseParams = {
    value: QueryEscrowAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTotalEscrowForDenomResponseParams = {
    value: QueryTotalEscrowForDenomResponse;
    fee?: StdFee;
    memo?: string;
};
type sendDenomTraceParams = {
    value: DenomTrace;
    fee?: StdFee;
    memo?: string;
};
type sendTransferAuthorizationParams = {
    value: TransferAuthorization;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryEscrowAddressRequestParams = {
    value: QueryEscrowAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type queryTotalEscrowForDenomRequestParams = {
    value: QueryTotalEscrowForDenomRequest;
};
type msgTransferParams = {
    value: MsgTransfer;
};
type queryDenomTracesRequestParams = {
    value: QueryDenomTracesRequest;
};
type queryDenomHashResponseParams = {
    value: QueryDenomHashResponse;
};
type genesisStateParams = {
    value: GenesisState;
};
type queryDenomTraceRequestParams = {
    value: QueryDenomTraceRequest;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type msgTransferResponseParams = {
    value: MsgTransferResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type queryDenomTraceResponseParams = {
    value: QueryDenomTraceResponse;
};
type queryDenomTracesResponseParams = {
    value: QueryDenomTracesResponse;
};
type queryDenomHashRequestParams = {
    value: QueryDenomHashRequest;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type paramsParams = {
    value: Params;
};
type allocationParams = {
    value: Allocation;
};
type queryEscrowAddressResponseParams = {
    value: QueryEscrowAddressResponse;
};
type queryTotalEscrowForDenomResponseParams = {
    value: QueryTotalEscrowForDenomResponse;
};
type denomTraceParams = {
    value: DenomTrace;
};
type transferAuthorizationParams = {
    value: TransferAuthorization;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryEscrowAddressRequestParams = {
    value: QueryEscrowAddressRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryTotalEscrowForDenomRequest({ value, fee, memo }: sendQueryTotalEscrowForDenomRequestParams): Promise<DeliverTxResponse>;
    sendMsgTransfer({ value, fee, memo }: sendMsgTransferParams): Promise<DeliverTxResponse>;
    sendQueryDenomTracesRequest({ value, fee, memo }: sendQueryDenomTracesRequestParams): Promise<DeliverTxResponse>;
    sendQueryDenomHashResponse({ value, fee, memo }: sendQueryDenomHashResponseParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQueryDenomTraceRequest({ value, fee, memo }: sendQueryDenomTraceRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendMsgTransferResponse({ value, fee, memo }: sendMsgTransferResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryDenomTraceResponse({ value, fee, memo }: sendQueryDenomTraceResponseParams): Promise<DeliverTxResponse>;
    sendQueryDenomTracesResponse({ value, fee, memo }: sendQueryDenomTracesResponseParams): Promise<DeliverTxResponse>;
    sendQueryDenomHashRequest({ value, fee, memo }: sendQueryDenomHashRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendAllocation({ value, fee, memo }: sendAllocationParams): Promise<DeliverTxResponse>;
    sendQueryEscrowAddressResponse({ value, fee, memo }: sendQueryEscrowAddressResponseParams): Promise<DeliverTxResponse>;
    sendQueryTotalEscrowForDenomResponse({ value, fee, memo }: sendQueryTotalEscrowForDenomResponseParams): Promise<DeliverTxResponse>;
    sendDenomTrace({ value, fee, memo }: sendDenomTraceParams): Promise<DeliverTxResponse>;
    sendTransferAuthorization({ value, fee, memo }: sendTransferAuthorizationParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryEscrowAddressRequest({ value, fee, memo }: sendQueryEscrowAddressRequestParams): Promise<DeliverTxResponse>;
    queryTotalEscrowForDenomRequest({ value }: queryTotalEscrowForDenomRequestParams): EncodeObject;
    msgTransfer({ value }: msgTransferParams): EncodeObject;
    queryDenomTracesRequest({ value }: queryDenomTracesRequestParams): EncodeObject;
    queryDenomHashResponse({ value }: queryDenomHashResponseParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    queryDenomTraceRequest({ value }: queryDenomTraceRequestParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    msgTransferResponse({ value }: msgTransferResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    queryDenomTraceResponse({ value }: queryDenomTraceResponseParams): EncodeObject;
    queryDenomTracesResponse({ value }: queryDenomTracesResponseParams): EncodeObject;
    queryDenomHashRequest({ value }: queryDenomHashRequestParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    allocation({ value }: allocationParams): EncodeObject;
    queryEscrowAddressResponse({ value }: queryEscrowAddressResponseParams): EncodeObject;
    queryTotalEscrowForDenomResponse({ value }: queryTotalEscrowForDenomResponseParams): EncodeObject;
    denomTrace({ value }: denomTraceParams): EncodeObject;
    transferAuthorization({ value }: transferAuthorizationParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryEscrowAddressRequest({ value }: queryEscrowAddressRequestParams): EncodeObject;
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
        IbcApplicationsTransferV1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
