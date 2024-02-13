import _m0 from "protobufjs/minimal";
import { Params } from "./host";
export declare const protobufPackage = "ibc.applications.interchain_accounts.host.v1";
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
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
            hostEnabled?: boolean;
            allowMessages?: string[];
        };
    } & {
        params?: {
            hostEnabled?: boolean;
            allowMessages?: string[];
        } & {
            hostEnabled?: boolean;
            allowMessages?: string[] & string[] & { [K in Exclude<keyof I["params"]["allowMessages"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_2 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            hostEnabled?: boolean;
            allowMessages?: string[];
        };
    } & {
        params?: {
            hostEnabled?: boolean;
            allowMessages?: string[];
        } & {
            hostEnabled?: boolean;
            allowMessages?: string[] & string[] & { [K_3 in Exclude<keyof I_1["params"]["allowMessages"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
/** Query provides defines the gRPC querier service. */
export interface Query {
    /** Params queries all parameters of the ICA host submodule. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export declare const QueryServiceName = "ibc.applications.interchain_accounts.host.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
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
