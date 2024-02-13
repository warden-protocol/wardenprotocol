import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryDenomTracesResponse } from "./types/ibc/applications/transfer/v1/query";
import { QueryDenomHashResponse } from "./types/ibc/applications/transfer/v1/query";
import { TransferAuthorization } from "./types/ibc/applications/transfer/v1/authz";
import { MsgTransferResponse } from "./types/ibc/applications/transfer/v1/tx";
import { MsgTransfer } from "./types/ibc/applications/transfer/v1/tx";
import { MsgUpdateParams } from "./types/ibc/applications/transfer/v1/tx";
import { QueryParamsResponse } from "./types/ibc/applications/transfer/v1/query";
import { QueryTotalEscrowForDenomRequest } from "./types/ibc/applications/transfer/v1/query";
import { QueryTotalEscrowForDenomResponse } from "./types/ibc/applications/transfer/v1/query";
import { Params } from "./types/ibc/applications/transfer/v1/transfer";
import { QueryDenomTracesRequest } from "./types/ibc/applications/transfer/v1/query";
import { QueryDenomHashRequest } from "./types/ibc/applications/transfer/v1/query";
import { QueryEscrowAddressResponse } from "./types/ibc/applications/transfer/v1/query";
import { MsgUpdateParamsResponse } from "./types/ibc/applications/transfer/v1/tx";
import { DenomTrace } from "./types/ibc/applications/transfer/v1/transfer";
import { QueryDenomTraceRequest } from "./types/ibc/applications/transfer/v1/query";
import { QueryEscrowAddressRequest } from "./types/ibc/applications/transfer/v1/query";
import { GenesisState } from "./types/ibc/applications/transfer/v1/genesis";
import { QueryParamsRequest } from "./types/ibc/applications/transfer/v1/query";
import { QueryDenomTraceResponse } from "./types/ibc/applications/transfer/v1/query";
import { Allocation } from "./types/ibc/applications/transfer/v1/authz";
export { QueryDenomTracesResponse, QueryDenomHashResponse, TransferAuthorization, MsgTransferResponse, MsgTransfer, MsgUpdateParams, QueryParamsResponse, QueryTotalEscrowForDenomRequest, QueryTotalEscrowForDenomResponse, Params, QueryDenomTracesRequest, QueryDenomHashRequest, QueryEscrowAddressResponse, MsgUpdateParamsResponse, DenomTrace, QueryDenomTraceRequest, QueryEscrowAddressRequest, GenesisState, QueryParamsRequest, QueryDenomTraceResponse, Allocation };
type sendQueryDenomTracesResponseParams = {
    value: QueryDenomTracesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDenomHashResponseParams = {
    value: QueryDenomHashResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTransferAuthorizationParams = {
    value: TransferAuthorization;
    fee?: StdFee;
    memo?: string;
};
type sendMsgTransferResponseParams = {
    value: MsgTransferResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgTransferParams = {
    value: MsgTransfer;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTotalEscrowForDenomRequestParams = {
    value: QueryTotalEscrowForDenomRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTotalEscrowForDenomResponseParams = {
    value: QueryTotalEscrowForDenomResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDenomTracesRequestParams = {
    value: QueryDenomTracesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDenomHashRequestParams = {
    value: QueryDenomHashRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryEscrowAddressResponseParams = {
    value: QueryEscrowAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendDenomTraceParams = {
    value: DenomTrace;
    fee?: StdFee;
    memo?: string;
};
type sendQueryDenomTraceRequestParams = {
    value: QueryDenomTraceRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryEscrowAddressRequestParams = {
    value: QueryEscrowAddressRequest;
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
type sendQueryDenomTraceResponseParams = {
    value: QueryDenomTraceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendAllocationParams = {
    value: Allocation;
    fee?: StdFee;
    memo?: string;
};
type queryDenomTracesResponseParams = {
    value: QueryDenomTracesResponse;
};
type queryDenomHashResponseParams = {
    value: QueryDenomHashResponse;
};
type transferAuthorizationParams = {
    value: TransferAuthorization;
};
type msgTransferResponseParams = {
    value: MsgTransferResponse;
};
type msgTransferParams = {
    value: MsgTransfer;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryTotalEscrowForDenomRequestParams = {
    value: QueryTotalEscrowForDenomRequest;
};
type queryTotalEscrowForDenomResponseParams = {
    value: QueryTotalEscrowForDenomResponse;
};
type paramsParams = {
    value: Params;
};
type queryDenomTracesRequestParams = {
    value: QueryDenomTracesRequest;
};
type queryDenomHashRequestParams = {
    value: QueryDenomHashRequest;
};
type queryEscrowAddressResponseParams = {
    value: QueryEscrowAddressResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type denomTraceParams = {
    value: DenomTrace;
};
type queryDenomTraceRequestParams = {
    value: QueryDenomTraceRequest;
};
type queryEscrowAddressRequestParams = {
    value: QueryEscrowAddressRequest;
};
type genesisStateParams = {
    value: GenesisState;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryDenomTraceResponseParams = {
    value: QueryDenomTraceResponse;
};
type allocationParams = {
    value: Allocation;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryDenomTracesResponse({ value, fee, memo }: sendQueryDenomTracesResponseParams): Promise<DeliverTxResponse>;
    sendQueryDenomHashResponse({ value, fee, memo }: sendQueryDenomHashResponseParams): Promise<DeliverTxResponse>;
    sendTransferAuthorization({ value, fee, memo }: sendTransferAuthorizationParams): Promise<DeliverTxResponse>;
    sendMsgTransferResponse({ value, fee, memo }: sendMsgTransferResponseParams): Promise<DeliverTxResponse>;
    sendMsgTransfer({ value, fee, memo }: sendMsgTransferParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryTotalEscrowForDenomRequest({ value, fee, memo }: sendQueryTotalEscrowForDenomRequestParams): Promise<DeliverTxResponse>;
    sendQueryTotalEscrowForDenomResponse({ value, fee, memo }: sendQueryTotalEscrowForDenomResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQueryDenomTracesRequest({ value, fee, memo }: sendQueryDenomTracesRequestParams): Promise<DeliverTxResponse>;
    sendQueryDenomHashRequest({ value, fee, memo }: sendQueryDenomHashRequestParams): Promise<DeliverTxResponse>;
    sendQueryEscrowAddressResponse({ value, fee, memo }: sendQueryEscrowAddressResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendDenomTrace({ value, fee, memo }: sendDenomTraceParams): Promise<DeliverTxResponse>;
    sendQueryDenomTraceRequest({ value, fee, memo }: sendQueryDenomTraceRequestParams): Promise<DeliverTxResponse>;
    sendQueryEscrowAddressRequest({ value, fee, memo }: sendQueryEscrowAddressRequestParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryDenomTraceResponse({ value, fee, memo }: sendQueryDenomTraceResponseParams): Promise<DeliverTxResponse>;
    sendAllocation({ value, fee, memo }: sendAllocationParams): Promise<DeliverTxResponse>;
    queryDenomTracesResponse({ value }: queryDenomTracesResponseParams): EncodeObject;
    queryDenomHashResponse({ value }: queryDenomHashResponseParams): EncodeObject;
    transferAuthorization({ value }: transferAuthorizationParams): EncodeObject;
    msgTransferResponse({ value }: msgTransferResponseParams): EncodeObject;
    msgTransfer({ value }: msgTransferParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryTotalEscrowForDenomRequest({ value }: queryTotalEscrowForDenomRequestParams): EncodeObject;
    queryTotalEscrowForDenomResponse({ value }: queryTotalEscrowForDenomResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    queryDenomTracesRequest({ value }: queryDenomTracesRequestParams): EncodeObject;
    queryDenomHashRequest({ value }: queryDenomHashRequestParams): EncodeObject;
    queryEscrowAddressResponse({ value }: queryEscrowAddressResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    denomTrace({ value }: denomTraceParams): EncodeObject;
    queryDenomTraceRequest({ value }: queryDenomTraceRequestParams): EncodeObject;
    queryEscrowAddressRequest({ value }: queryEscrowAddressRequestParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryDenomTraceResponse({ value }: queryDenomTraceResponseParams): EncodeObject;
    allocation({ value }: allocationParams): EncodeObject;
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
