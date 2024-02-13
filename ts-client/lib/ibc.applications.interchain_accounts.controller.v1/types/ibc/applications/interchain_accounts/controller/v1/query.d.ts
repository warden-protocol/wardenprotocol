import _m0 from "protobufjs/minimal";
import { Params } from "./controller";
export declare const protobufPackage = "ibc.applications.interchain_accounts.controller.v1";
/** QueryInterchainAccountRequest is the request type for the Query/InterchainAccount RPC method. */
export interface QueryInterchainAccountRequest {
    owner: string;
    connectionId: string;
}
/** QueryInterchainAccountResponse the response type for the Query/InterchainAccount RPC method. */
export interface QueryInterchainAccountResponse {
    address: string;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
}
export declare const QueryInterchainAccountRequest: {
    encode(message: QueryInterchainAccountRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryInterchainAccountRequest;
    fromJSON(object: any): QueryInterchainAccountRequest;
    toJSON(message: QueryInterchainAccountRequest): unknown;
    create<I extends {
        owner?: string;
        connectionId?: string;
    } & {
        owner?: string;
        connectionId?: string;
    } & { [K in Exclude<keyof I, keyof QueryInterchainAccountRequest>]: never; }>(base?: I): QueryInterchainAccountRequest;
    fromPartial<I_1 extends {
        owner?: string;
        connectionId?: string;
    } & {
        owner?: string;
        connectionId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryInterchainAccountRequest>]: never; }>(object: I_1): QueryInterchainAccountRequest;
};
export declare const QueryInterchainAccountResponse: {
    encode(message: QueryInterchainAccountResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryInterchainAccountResponse;
    fromJSON(object: any): QueryInterchainAccountResponse;
    toJSON(message: QueryInterchainAccountResponse): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): QueryInterchainAccountResponse;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): QueryInterchainAccountResponse;
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
            controllerEnabled?: boolean;
        };
    } & {
        params?: {
            controllerEnabled?: boolean;
        } & {
            controllerEnabled?: boolean;
        } & { [K in Exclude<keyof I["params"], "controllerEnabled">]: never; };
    } & { [K_1 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            controllerEnabled?: boolean;
        };
    } & {
        params?: {
            controllerEnabled?: boolean;
        } & {
            controllerEnabled?: boolean;
        } & { [K_2 in Exclude<keyof I_1["params"], "controllerEnabled">]: never; };
    } & { [K_3 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
/** Query provides defines the gRPC querier service. */
export interface Query {
    /** InterchainAccount returns the interchain account address for a given owner address on a given connection */
    InterchainAccount(request: QueryInterchainAccountRequest): Promise<QueryInterchainAccountResponse>;
    /** Params queries all parameters of the ICA controller submodule. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export declare const QueryServiceName = "ibc.applications.interchain_accounts.controller.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    InterchainAccount(request: QueryInterchainAccountRequest): Promise<QueryInterchainAccountResponse>;
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
