import _m0 from "protobufjs/minimal";
import { ParamChange } from "./params";
export declare const protobufPackage = "cosmos.params.v1beta1";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
    /** subspace defines the module to query the parameter for. */
    subspace: string;
    /** key defines the key of the parameter in the subspace. */
    key: string;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** param defines the queried parameter. */
    param: ParamChange | undefined;
}
/**
 * QuerySubspacesRequest defines a request type for querying for all registered
 * subspaces and all keys for a subspace.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QuerySubspacesRequest {
}
/**
 * QuerySubspacesResponse defines the response types for querying for all
 * registered subspaces and all keys for a subspace.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QuerySubspacesResponse {
    subspaces: Subspace[];
}
/**
 * Subspace defines a parameter subspace name and all the keys that exist for
 * the subspace.
 *
 * Since: cosmos-sdk 0.46
 */
export interface Subspace {
    subspace: string;
    keys: string[];
}
export declare const QueryParamsRequest: {
    encode(message: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(object: any): QueryParamsRequest;
    toJSON(message: QueryParamsRequest): unknown;
    create<I extends {
        subspace?: string;
        key?: string;
    } & {
        subspace?: string;
        key?: string;
    } & { [K in Exclude<keyof I, keyof QueryParamsRequest>]: never; }>(base?: I): QueryParamsRequest;
    fromPartial<I_1 extends {
        subspace?: string;
        key?: string;
    } & {
        subspace?: string;
        key?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryParamsRequest>]: never; }>(object: I_1): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    create<I extends {
        param?: {
            subspace?: string;
            key?: string;
            value?: string;
        };
    } & {
        param?: {
            subspace?: string;
            key?: string;
            value?: string;
        } & {
            subspace?: string;
            key?: string;
            value?: string;
        } & { [K in Exclude<keyof I["param"], keyof ParamChange>]: never; };
    } & { [K_1 in Exclude<keyof I, "param">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        param?: {
            subspace?: string;
            key?: string;
            value?: string;
        };
    } & {
        param?: {
            subspace?: string;
            key?: string;
            value?: string;
        } & {
            subspace?: string;
            key?: string;
            value?: string;
        } & { [K_2 in Exclude<keyof I_1["param"], keyof ParamChange>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "param">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QuerySubspacesRequest: {
    encode(_: QuerySubspacesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySubspacesRequest;
    fromJSON(_: any): QuerySubspacesRequest;
    toJSON(_: QuerySubspacesRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QuerySubspacesRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QuerySubspacesRequest;
};
export declare const QuerySubspacesResponse: {
    encode(message: QuerySubspacesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySubspacesResponse;
    fromJSON(object: any): QuerySubspacesResponse;
    toJSON(message: QuerySubspacesResponse): unknown;
    create<I extends {
        subspaces?: {
            subspace?: string;
            keys?: string[];
        }[];
    } & {
        subspaces?: {
            subspace?: string;
            keys?: string[];
        }[] & ({
            subspace?: string;
            keys?: string[];
        } & {
            subspace?: string;
            keys?: string[] & string[] & { [K in Exclude<keyof I["subspaces"][number]["keys"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["subspaces"][number], keyof Subspace>]: never; })[] & { [K_2 in Exclude<keyof I["subspaces"], keyof {
            subspace?: string;
            keys?: string[];
        }[]>]: never; };
    } & { [K_3 in Exclude<keyof I, "subspaces">]: never; }>(base?: I): QuerySubspacesResponse;
    fromPartial<I_1 extends {
        subspaces?: {
            subspace?: string;
            keys?: string[];
        }[];
    } & {
        subspaces?: {
            subspace?: string;
            keys?: string[];
        }[] & ({
            subspace?: string;
            keys?: string[];
        } & {
            subspace?: string;
            keys?: string[] & string[] & { [K_4 in Exclude<keyof I_1["subspaces"][number]["keys"], keyof string[]>]: never; };
        } & { [K_5 in Exclude<keyof I_1["subspaces"][number], keyof Subspace>]: never; })[] & { [K_6 in Exclude<keyof I_1["subspaces"], keyof {
            subspace?: string;
            keys?: string[];
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, "subspaces">]: never; }>(object: I_1): QuerySubspacesResponse;
};
export declare const Subspace: {
    encode(message: Subspace, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Subspace;
    fromJSON(object: any): Subspace;
    toJSON(message: Subspace): unknown;
    create<I extends {
        subspace?: string;
        keys?: string[];
    } & {
        subspace?: string;
        keys?: string[] & string[] & { [K in Exclude<keyof I["keys"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof Subspace>]: never; }>(base?: I): Subspace;
    fromPartial<I_1 extends {
        subspace?: string;
        keys?: string[];
    } & {
        subspace?: string;
        keys?: string[] & string[] & { [K_2 in Exclude<keyof I_1["keys"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof Subspace>]: never; }>(object: I_1): Subspace;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /**
     * Params queries a specific parameter of a module, given its subspace and
     * key.
     */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /**
     * Subspaces queries for all registered subspaces and all keys for a subspace.
     *
     * Since: cosmos-sdk 0.46
     */
    Subspaces(request: QuerySubspacesRequest): Promise<QuerySubspacesResponse>;
}
export declare const QueryServiceName = "cosmos.params.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Subspaces(request: QuerySubspacesRequest): Promise<QuerySubspacesResponse>;
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
