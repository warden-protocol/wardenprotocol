import _m0 from "protobufjs/minimal";
import { Params } from "./mint";
export declare const protobufPackage = "cosmos.mint.v1beta1";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
}
/** QueryInflationRequest is the request type for the Query/Inflation RPC method. */
export interface QueryInflationRequest {
}
/**
 * QueryInflationResponse is the response type for the Query/Inflation RPC
 * method.
 */
export interface QueryInflationResponse {
    /** inflation is the current minting inflation value. */
    inflation: Uint8Array;
}
/**
 * QueryAnnualProvisionsRequest is the request type for the
 * Query/AnnualProvisions RPC method.
 */
export interface QueryAnnualProvisionsRequest {
}
/**
 * QueryAnnualProvisionsResponse is the response type for the
 * Query/AnnualProvisions RPC method.
 */
export interface QueryAnnualProvisionsResponse {
    /** annual_provisions is the current minting annual provisions value. */
    annualProvisions: Uint8Array;
}
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
            mintDenom?: string;
            inflationRateChange?: string;
            inflationMax?: string;
            inflationMin?: string;
            goalBonded?: string;
            blocksPerYear?: number;
        };
    } & {
        params?: {
            mintDenom?: string;
            inflationRateChange?: string;
            inflationMax?: string;
            inflationMin?: string;
            goalBonded?: string;
            blocksPerYear?: number;
        } & {
            mintDenom?: string;
            inflationRateChange?: string;
            inflationMax?: string;
            inflationMin?: string;
            goalBonded?: string;
            blocksPerYear?: number;
        } & { [K in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_1 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            mintDenom?: string;
            inflationRateChange?: string;
            inflationMax?: string;
            inflationMin?: string;
            goalBonded?: string;
            blocksPerYear?: number;
        };
    } & {
        params?: {
            mintDenom?: string;
            inflationRateChange?: string;
            inflationMax?: string;
            inflationMin?: string;
            goalBonded?: string;
            blocksPerYear?: number;
        } & {
            mintDenom?: string;
            inflationRateChange?: string;
            inflationMax?: string;
            inflationMin?: string;
            goalBonded?: string;
            blocksPerYear?: number;
        } & { [K_2 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QueryInflationRequest: {
    encode(_: QueryInflationRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryInflationRequest;
    fromJSON(_: any): QueryInflationRequest;
    toJSON(_: QueryInflationRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryInflationRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryInflationRequest;
};
export declare const QueryInflationResponse: {
    encode(message: QueryInflationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryInflationResponse;
    fromJSON(object: any): QueryInflationResponse;
    toJSON(message: QueryInflationResponse): unknown;
    create<I extends {
        inflation?: Uint8Array;
    } & {
        inflation?: Uint8Array;
    } & { [K in Exclude<keyof I, "inflation">]: never; }>(base?: I): QueryInflationResponse;
    fromPartial<I_1 extends {
        inflation?: Uint8Array;
    } & {
        inflation?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "inflation">]: never; }>(object: I_1): QueryInflationResponse;
};
export declare const QueryAnnualProvisionsRequest: {
    encode(_: QueryAnnualProvisionsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAnnualProvisionsRequest;
    fromJSON(_: any): QueryAnnualProvisionsRequest;
    toJSON(_: QueryAnnualProvisionsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryAnnualProvisionsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryAnnualProvisionsRequest;
};
export declare const QueryAnnualProvisionsResponse: {
    encode(message: QueryAnnualProvisionsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAnnualProvisionsResponse;
    fromJSON(object: any): QueryAnnualProvisionsResponse;
    toJSON(message: QueryAnnualProvisionsResponse): unknown;
    create<I extends {
        annualProvisions?: Uint8Array;
    } & {
        annualProvisions?: Uint8Array;
    } & { [K in Exclude<keyof I, "annualProvisions">]: never; }>(base?: I): QueryAnnualProvisionsResponse;
    fromPartial<I_1 extends {
        annualProvisions?: Uint8Array;
    } & {
        annualProvisions?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "annualProvisions">]: never; }>(object: I_1): QueryAnnualProvisionsResponse;
};
/** Query provides defines the gRPC querier service. */
export interface Query {
    /** Params returns the total set of minting parameters. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Inflation returns the current minting inflation value. */
    Inflation(request: QueryInflationRequest): Promise<QueryInflationResponse>;
    /** AnnualProvisions current minting annual provisions value. */
    AnnualProvisions(request: QueryAnnualProvisionsRequest): Promise<QueryAnnualProvisionsResponse>;
}
export declare const QueryServiceName = "cosmos.mint.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Inflation(request: QueryInflationRequest): Promise<QueryInflationResponse>;
    AnnualProvisions(request: QueryAnnualProvisionsRequest): Promise<QueryAnnualProvisionsResponse>;
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
