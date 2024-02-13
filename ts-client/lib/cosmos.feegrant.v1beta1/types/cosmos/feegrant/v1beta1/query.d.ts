import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Grant } from "./feegrant";
export declare const protobufPackage = "cosmos.feegrant.v1beta1";
/** Since: cosmos-sdk 0.43 */
/** QueryAllowanceRequest is the request type for the Query/Allowance RPC method. */
export interface QueryAllowanceRequest {
    /** granter is the address of the user granting an allowance of their funds. */
    granter: string;
    /** grantee is the address of the user being granted an allowance of another user's funds. */
    grantee: string;
}
/** QueryAllowanceResponse is the response type for the Query/Allowance RPC method. */
export interface QueryAllowanceResponse {
    /** allowance is a allowance granted for grantee by granter. */
    allowance: Grant | undefined;
}
/** QueryAllowancesRequest is the request type for the Query/Allowances RPC method. */
export interface QueryAllowancesRequest {
    grantee: string;
    /** pagination defines an pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryAllowancesResponse is the response type for the Query/Allowances RPC method. */
export interface QueryAllowancesResponse {
    /** allowances are allowance's granted for grantee by granter. */
    allowances: Grant[];
    /** pagination defines an pagination for the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryAllowancesByGranterRequest is the request type for the Query/AllowancesByGranter RPC method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QueryAllowancesByGranterRequest {
    granter: string;
    /** pagination defines an pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryAllowancesByGranterResponse is the response type for the Query/AllowancesByGranter RPC method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QueryAllowancesByGranterResponse {
    /** allowances that have been issued by the granter. */
    allowances: Grant[];
    /** pagination defines an pagination for the response. */
    pagination: PageResponse | undefined;
}
export declare const QueryAllowanceRequest: {
    encode(message: QueryAllowanceRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllowanceRequest;
    fromJSON(object: any): QueryAllowanceRequest;
    toJSON(message: QueryAllowanceRequest): unknown;
    create<I extends {
        granter?: string;
        grantee?: string;
    } & {
        granter?: string;
        grantee?: string;
    } & { [K in Exclude<keyof I, keyof QueryAllowanceRequest>]: never; }>(base?: I): QueryAllowanceRequest;
    fromPartial<I_1 extends {
        granter?: string;
        grantee?: string;
    } & {
        granter?: string;
        grantee?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryAllowanceRequest>]: never; }>(object: I_1): QueryAllowanceRequest;
};
export declare const QueryAllowanceResponse: {
    encode(message: QueryAllowanceResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllowanceResponse;
    fromJSON(object: any): QueryAllowanceResponse;
    toJSON(message: QueryAllowanceResponse): unknown;
    create<I extends {
        allowance?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
    } & {
        allowance?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["allowance"]["allowance"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_1 in Exclude<keyof I["allowance"], keyof Grant>]: never; };
    } & { [K_2 in Exclude<keyof I, "allowance">]: never; }>(base?: I): QueryAllowanceResponse;
    fromPartial<I_1 extends {
        allowance?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
    } & {
        allowance?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_3 in Exclude<keyof I_1["allowance"]["allowance"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_4 in Exclude<keyof I_1["allowance"], keyof Grant>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "allowance">]: never; }>(object: I_1): QueryAllowanceResponse;
};
export declare const QueryAllowancesRequest: {
    encode(message: QueryAllowancesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllowancesRequest;
    fromJSON(object: any): QueryAllowancesRequest;
    toJSON(message: QueryAllowancesRequest): unknown;
    create<I extends {
        grantee?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        grantee?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryAllowancesRequest>]: never; }>(base?: I): QueryAllowancesRequest;
    fromPartial<I_1 extends {
        grantee?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        grantee?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryAllowancesRequest>]: never; }>(object: I_1): QueryAllowancesRequest;
};
export declare const QueryAllowancesResponse: {
    encode(message: QueryAllowancesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllowancesResponse;
    fromJSON(object: any): QueryAllowancesResponse;
    toJSON(message: QueryAllowancesResponse): unknown;
    create<I extends {
        allowances?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        allowances?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["allowances"][number]["allowance"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_1 in Exclude<keyof I["allowances"][number], keyof Grant>]: never; })[] & { [K_2 in Exclude<keyof I["allowances"], keyof {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryAllowancesResponse>]: never; }>(base?: I): QueryAllowancesResponse;
    fromPartial<I_1 extends {
        allowances?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        allowances?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["allowances"][number]["allowance"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_6 in Exclude<keyof I_1["allowances"][number], keyof Grant>]: never; })[] & { [K_7 in Exclude<keyof I_1["allowances"], keyof {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryAllowancesResponse>]: never; }>(object: I_1): QueryAllowancesResponse;
};
export declare const QueryAllowancesByGranterRequest: {
    encode(message: QueryAllowancesByGranterRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllowancesByGranterRequest;
    fromJSON(object: any): QueryAllowancesByGranterRequest;
    toJSON(message: QueryAllowancesByGranterRequest): unknown;
    create<I extends {
        granter?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        granter?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryAllowancesByGranterRequest>]: never; }>(base?: I): QueryAllowancesByGranterRequest;
    fromPartial<I_1 extends {
        granter?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        granter?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryAllowancesByGranterRequest>]: never; }>(object: I_1): QueryAllowancesByGranterRequest;
};
export declare const QueryAllowancesByGranterResponse: {
    encode(message: QueryAllowancesByGranterResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllowancesByGranterResponse;
    fromJSON(object: any): QueryAllowancesByGranterResponse;
    toJSON(message: QueryAllowancesByGranterResponse): unknown;
    create<I extends {
        allowances?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        allowances?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["allowances"][number]["allowance"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_1 in Exclude<keyof I["allowances"][number], keyof Grant>]: never; })[] & { [K_2 in Exclude<keyof I["allowances"], keyof {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryAllowancesByGranterResponse>]: never; }>(base?: I): QueryAllowancesByGranterResponse;
    fromPartial<I_1 extends {
        allowances?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        allowances?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["allowances"][number]["allowance"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_6 in Exclude<keyof I_1["allowances"][number], keyof Grant>]: never; })[] & { [K_7 in Exclude<keyof I_1["allowances"], keyof {
            granter?: string;
            grantee?: string;
            allowance?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryAllowancesByGranterResponse>]: never; }>(object: I_1): QueryAllowancesByGranterResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Allowance returns granted allwance to the grantee by the granter. */
    Allowance(request: QueryAllowanceRequest): Promise<QueryAllowanceResponse>;
    /** Allowances returns all the grants for the given grantee address. */
    Allowances(request: QueryAllowancesRequest): Promise<QueryAllowancesResponse>;
    /**
     * AllowancesByGranter returns all the grants given by an address
     *
     * Since: cosmos-sdk 0.46
     */
    AllowancesByGranter(request: QueryAllowancesByGranterRequest): Promise<QueryAllowancesByGranterResponse>;
}
export declare const QueryServiceName = "cosmos.feegrant.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Allowance(request: QueryAllowanceRequest): Promise<QueryAllowanceResponse>;
    Allowances(request: QueryAllowancesRequest): Promise<QueryAllowancesResponse>;
    AllowancesByGranter(request: QueryAllowancesByGranterRequest): Promise<QueryAllowancesByGranterResponse>;
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
