import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { DenomTrace, Params } from "./transfer";
export declare const protobufPackage = "ibc.applications.transfer.v1";
/**
 * QueryDenomTraceRequest is the request type for the Query/DenomTrace RPC
 * method
 */
export interface QueryDenomTraceRequest {
    /** hash (in hex format) or denom (full denom with ibc prefix) of the denomination trace information. */
    hash: string;
}
/**
 * QueryDenomTraceResponse is the response type for the Query/DenomTrace RPC
 * method.
 */
export interface QueryDenomTraceResponse {
    /** denom_trace returns the requested denomination trace information. */
    denomTrace: DenomTrace | undefined;
}
/**
 * QueryConnectionsRequest is the request type for the Query/DenomTraces RPC
 * method
 */
export interface QueryDenomTracesRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryConnectionsResponse is the response type for the Query/DenomTraces RPC
 * method.
 */
export interface QueryDenomTracesResponse {
    /** denom_traces returns all denominations trace information. */
    denomTraces: DenomTrace[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
}
/**
 * QueryDenomHashRequest is the request type for the Query/DenomHash RPC
 * method
 */
export interface QueryDenomHashRequest {
    /** The denomination trace ([port_id]/[channel_id])+/[denom] */
    trace: string;
}
/**
 * QueryDenomHashResponse is the response type for the Query/DenomHash RPC
 * method.
 */
export interface QueryDenomHashResponse {
    /** hash (in hex format) of the denomination trace information. */
    hash: string;
}
/** QueryEscrowAddressRequest is the request type for the EscrowAddress RPC method. */
export interface QueryEscrowAddressRequest {
    /** unique port identifier */
    portId: string;
    /** unique channel identifier */
    channelId: string;
}
/** QueryEscrowAddressResponse is the response type of the EscrowAddress RPC method. */
export interface QueryEscrowAddressResponse {
    /** the escrow account address */
    escrowAddress: string;
}
/** QueryTotalEscrowForDenomRequest is the request type for TotalEscrowForDenom RPC method. */
export interface QueryTotalEscrowForDenomRequest {
    denom: string;
}
/** QueryTotalEscrowForDenomResponse is the response type for TotalEscrowForDenom RPC method. */
export interface QueryTotalEscrowForDenomResponse {
    amount: Coin | undefined;
}
export declare const QueryDenomTraceRequest: {
    encode(message: QueryDenomTraceRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTraceRequest;
    fromJSON(object: any): QueryDenomTraceRequest;
    toJSON(message: QueryDenomTraceRequest): unknown;
    create<I extends {
        hash?: string;
    } & {
        hash?: string;
    } & { [K in Exclude<keyof I, "hash">]: never; }>(base?: I): QueryDenomTraceRequest;
    fromPartial<I_1 extends {
        hash?: string;
    } & {
        hash?: string;
    } & { [K_1 in Exclude<keyof I_1, "hash">]: never; }>(object: I_1): QueryDenomTraceRequest;
};
export declare const QueryDenomTraceResponse: {
    encode(message: QueryDenomTraceResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTraceResponse;
    fromJSON(object: any): QueryDenomTraceResponse;
    toJSON(message: QueryDenomTraceResponse): unknown;
    create<I extends {
        denomTrace?: {
            path?: string;
            baseDenom?: string;
        };
    } & {
        denomTrace?: {
            path?: string;
            baseDenom?: string;
        } & {
            path?: string;
            baseDenom?: string;
        } & { [K in Exclude<keyof I["denomTrace"], keyof DenomTrace>]: never; };
    } & { [K_1 in Exclude<keyof I, "denomTrace">]: never; }>(base?: I): QueryDenomTraceResponse;
    fromPartial<I_1 extends {
        denomTrace?: {
            path?: string;
            baseDenom?: string;
        };
    } & {
        denomTrace?: {
            path?: string;
            baseDenom?: string;
        } & {
            path?: string;
            baseDenom?: string;
        } & { [K_2 in Exclude<keyof I_1["denomTrace"], keyof DenomTrace>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "denomTrace">]: never; }>(object: I_1): QueryDenomTraceResponse;
};
export declare const QueryDenomTracesRequest: {
    encode(message: QueryDenomTracesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTracesRequest;
    fromJSON(object: any): QueryDenomTracesRequest;
    toJSON(message: QueryDenomTracesRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryDenomTracesRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryDenomTracesRequest;
};
export declare const QueryDenomTracesResponse: {
    encode(message: QueryDenomTracesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomTracesResponse;
    fromJSON(object: any): QueryDenomTracesResponse;
    toJSON(message: QueryDenomTracesResponse): unknown;
    create<I extends {
        denomTraces?: {
            path?: string;
            baseDenom?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        denomTraces?: {
            path?: string;
            baseDenom?: string;
        }[] & ({
            path?: string;
            baseDenom?: string;
        } & {
            path?: string;
            baseDenom?: string;
        } & { [K in Exclude<keyof I["denomTraces"][number], keyof DenomTrace>]: never; })[] & { [K_1 in Exclude<keyof I["denomTraces"], keyof {
            path?: string;
            baseDenom?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryDenomTracesResponse>]: never; }>(base?: I): QueryDenomTracesResponse;
    fromPartial<I_1 extends {
        denomTraces?: {
            path?: string;
            baseDenom?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        denomTraces?: {
            path?: string;
            baseDenom?: string;
        }[] & ({
            path?: string;
            baseDenom?: string;
        } & {
            path?: string;
            baseDenom?: string;
        } & { [K_4 in Exclude<keyof I_1["denomTraces"][number], keyof DenomTrace>]: never; })[] & { [K_5 in Exclude<keyof I_1["denomTraces"], keyof {
            path?: string;
            baseDenom?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryDenomTracesResponse>]: never; }>(object: I_1): QueryDenomTracesResponse;
};
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryParamsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    create<I extends {
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        };
    } & {
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & { [K in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_1 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        };
    } & {
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & { [K_2 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QueryDenomHashRequest: {
    encode(message: QueryDenomHashRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomHashRequest;
    fromJSON(object: any): QueryDenomHashRequest;
    toJSON(message: QueryDenomHashRequest): unknown;
    create<I extends {
        trace?: string;
    } & {
        trace?: string;
    } & { [K in Exclude<keyof I, "trace">]: never; }>(base?: I): QueryDenomHashRequest;
    fromPartial<I_1 extends {
        trace?: string;
    } & {
        trace?: string;
    } & { [K_1 in Exclude<keyof I_1, "trace">]: never; }>(object: I_1): QueryDenomHashRequest;
};
export declare const QueryDenomHashResponse: {
    encode(message: QueryDenomHashResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomHashResponse;
    fromJSON(object: any): QueryDenomHashResponse;
    toJSON(message: QueryDenomHashResponse): unknown;
    create<I extends {
        hash?: string;
    } & {
        hash?: string;
    } & { [K in Exclude<keyof I, "hash">]: never; }>(base?: I): QueryDenomHashResponse;
    fromPartial<I_1 extends {
        hash?: string;
    } & {
        hash?: string;
    } & { [K_1 in Exclude<keyof I_1, "hash">]: never; }>(object: I_1): QueryDenomHashResponse;
};
export declare const QueryEscrowAddressRequest: {
    encode(message: QueryEscrowAddressRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryEscrowAddressRequest;
    fromJSON(object: any): QueryEscrowAddressRequest;
    toJSON(message: QueryEscrowAddressRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof QueryEscrowAddressRequest>]: never; }>(base?: I): QueryEscrowAddressRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryEscrowAddressRequest>]: never; }>(object: I_1): QueryEscrowAddressRequest;
};
export declare const QueryEscrowAddressResponse: {
    encode(message: QueryEscrowAddressResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryEscrowAddressResponse;
    fromJSON(object: any): QueryEscrowAddressResponse;
    toJSON(message: QueryEscrowAddressResponse): unknown;
    create<I extends {
        escrowAddress?: string;
    } & {
        escrowAddress?: string;
    } & { [K in Exclude<keyof I, "escrowAddress">]: never; }>(base?: I): QueryEscrowAddressResponse;
    fromPartial<I_1 extends {
        escrowAddress?: string;
    } & {
        escrowAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "escrowAddress">]: never; }>(object: I_1): QueryEscrowAddressResponse;
};
export declare const QueryTotalEscrowForDenomRequest: {
    encode(message: QueryTotalEscrowForDenomRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalEscrowForDenomRequest;
    fromJSON(object: any): QueryTotalEscrowForDenomRequest;
    toJSON(message: QueryTotalEscrowForDenomRequest): unknown;
    create<I extends {
        denom?: string;
    } & {
        denom?: string;
    } & { [K in Exclude<keyof I, "denom">]: never; }>(base?: I): QueryTotalEscrowForDenomRequest;
    fromPartial<I_1 extends {
        denom?: string;
    } & {
        denom?: string;
    } & { [K_1 in Exclude<keyof I_1, "denom">]: never; }>(object: I_1): QueryTotalEscrowForDenomRequest;
};
export declare const QueryTotalEscrowForDenomResponse: {
    encode(message: QueryTotalEscrowForDenomResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalEscrowForDenomResponse;
    fromJSON(object: any): QueryTotalEscrowForDenomResponse;
    toJSON(message: QueryTotalEscrowForDenomResponse): unknown;
    create<I extends {
        amount?: {
            denom?: string;
            amount?: string;
        };
    } & {
        amount?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["amount"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, "amount">]: never; }>(base?: I): QueryTotalEscrowForDenomResponse;
    fromPartial<I_1 extends {
        amount?: {
            denom?: string;
            amount?: string;
        };
    } & {
        amount?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["amount"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "amount">]: never; }>(object: I_1): QueryTotalEscrowForDenomResponse;
};
/** Query provides defines the gRPC querier service. */
export interface Query {
    /** DenomTraces queries all denomination traces. */
    DenomTraces(request: QueryDenomTracesRequest): Promise<QueryDenomTracesResponse>;
    /** DenomTrace queries a denomination trace information. */
    DenomTrace(request: QueryDenomTraceRequest): Promise<QueryDenomTraceResponse>;
    /** Params queries all parameters of the ibc-transfer module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** DenomHash queries a denomination hash information. */
    DenomHash(request: QueryDenomHashRequest): Promise<QueryDenomHashResponse>;
    /** EscrowAddress returns the escrow address for a particular port and channel id. */
    EscrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse>;
    /** TotalEscrowForDenom returns the total amount of tokens in escrow based on the denom. */
    TotalEscrowForDenom(request: QueryTotalEscrowForDenomRequest): Promise<QueryTotalEscrowForDenomResponse>;
}
export declare const QueryServiceName = "ibc.applications.transfer.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    DenomTraces(request: QueryDenomTracesRequest): Promise<QueryDenomTracesResponse>;
    DenomTrace(request: QueryDenomTraceRequest): Promise<QueryDenomTraceResponse>;
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    DenomHash(request: QueryDenomHashRequest): Promise<QueryDenomHashResponse>;
    EscrowAddress(request: QueryEscrowAddressRequest): Promise<QueryEscrowAddressResponse>;
    TotalEscrowForDenom(request: QueryTotalEscrowForDenomRequest): Promise<QueryTotalEscrowForDenomResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
