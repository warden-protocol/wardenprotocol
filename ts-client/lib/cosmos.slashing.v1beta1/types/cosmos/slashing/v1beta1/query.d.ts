import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Params, ValidatorSigningInfo } from "./slashing";
export declare const protobufPackage = "cosmos.slashing.v1beta1";
/** QueryParamsRequest is the request type for the Query/Params RPC method */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is the response type for the Query/Params RPC method */
export interface QueryParamsResponse {
    params: Params | undefined;
}
/**
 * QuerySigningInfoRequest is the request type for the Query/SigningInfo RPC
 * method
 */
export interface QuerySigningInfoRequest {
    /** cons_address is the address to query signing info of */
    consAddress: string;
}
/**
 * QuerySigningInfoResponse is the response type for the Query/SigningInfo RPC
 * method
 */
export interface QuerySigningInfoResponse {
    /** val_signing_info is the signing info of requested val cons address */
    valSigningInfo: ValidatorSigningInfo | undefined;
}
/**
 * QuerySigningInfosRequest is the request type for the Query/SigningInfos RPC
 * method
 */
export interface QuerySigningInfosRequest {
    pagination: PageRequest | undefined;
}
/**
 * QuerySigningInfosResponse is the response type for the Query/SigningInfos RPC
 * method
 */
export interface QuerySigningInfosResponse {
    /** info is the signing info of all validators */
    info: ValidatorSigningInfo[];
    pagination: PageResponse | undefined;
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
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        };
    } & {
        params?: {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        } & {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K in Exclude<keyof I["params"]["downtimeJailDuration"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_2 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        };
    } & {
        params?: {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        } & {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_3 in Exclude<keyof I_1["params"]["downtimeJailDuration"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        } & { [K_4 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QuerySigningInfoRequest: {
    encode(message: QuerySigningInfoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySigningInfoRequest;
    fromJSON(object: any): QuerySigningInfoRequest;
    toJSON(message: QuerySigningInfoRequest): unknown;
    create<I extends {
        consAddress?: string;
    } & {
        consAddress?: string;
    } & { [K in Exclude<keyof I, "consAddress">]: never; }>(base?: I): QuerySigningInfoRequest;
    fromPartial<I_1 extends {
        consAddress?: string;
    } & {
        consAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "consAddress">]: never; }>(object: I_1): QuerySigningInfoRequest;
};
export declare const QuerySigningInfoResponse: {
    encode(message: QuerySigningInfoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySigningInfoResponse;
    fromJSON(object: any): QuerySigningInfoResponse;
    toJSON(message: QuerySigningInfoResponse): unknown;
    create<I extends {
        valSigningInfo?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        };
    } & {
        valSigningInfo?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & { [K in Exclude<keyof I["valSigningInfo"], keyof ValidatorSigningInfo>]: never; };
    } & { [K_1 in Exclude<keyof I, "valSigningInfo">]: never; }>(base?: I): QuerySigningInfoResponse;
    fromPartial<I_1 extends {
        valSigningInfo?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        };
    } & {
        valSigningInfo?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & { [K_2 in Exclude<keyof I_1["valSigningInfo"], keyof ValidatorSigningInfo>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "valSigningInfo">]: never; }>(object: I_1): QuerySigningInfoResponse;
};
export declare const QuerySigningInfosRequest: {
    encode(message: QuerySigningInfosRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySigningInfosRequest;
    fromJSON(object: any): QuerySigningInfosRequest;
    toJSON(message: QuerySigningInfosRequest): unknown;
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
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QuerySigningInfosRequest;
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
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QuerySigningInfosRequest;
};
export declare const QuerySigningInfosResponse: {
    encode(message: QuerySigningInfosResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySigningInfosResponse;
    fromJSON(object: any): QuerySigningInfosResponse;
    toJSON(message: QuerySigningInfosResponse): unknown;
    create<I extends {
        info?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        info?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        }[] & ({
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & { [K in Exclude<keyof I["info"][number], keyof ValidatorSigningInfo>]: never; })[] & { [K_1 in Exclude<keyof I["info"], keyof {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QuerySigningInfosResponse>]: never; }>(base?: I): QuerySigningInfosResponse;
    fromPartial<I_1 extends {
        info?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        info?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        }[] & ({
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & { [K_4 in Exclude<keyof I_1["info"][number], keyof ValidatorSigningInfo>]: never; })[] & { [K_5 in Exclude<keyof I_1["info"], keyof {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QuerySigningInfosResponse>]: never; }>(object: I_1): QuerySigningInfosResponse;
};
/** Query provides defines the gRPC querier service */
export interface Query {
    /** Params queries the parameters of slashing module */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** SigningInfo queries the signing info of given cons address */
    SigningInfo(request: QuerySigningInfoRequest): Promise<QuerySigningInfoResponse>;
    /** SigningInfos queries signing info of all validators */
    SigningInfos(request: QuerySigningInfosRequest): Promise<QuerySigningInfosResponse>;
}
export declare const QueryServiceName = "cosmos.slashing.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    SigningInfo(request: QuerySigningInfoRequest): Promise<QuerySigningInfoResponse>;
    SigningInfos(request: QuerySigningInfosRequest): Promise<QuerySigningInfosResponse>;
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
