import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Grant, GrantAuthorization } from "./authz";
export declare const protobufPackage = "cosmos.authz.v1beta1";
/** Since: cosmos-sdk 0.43 */
/** QueryGrantsRequest is the request type for the Query/Grants RPC method. */
export interface QueryGrantsRequest {
    granter: string;
    grantee: string;
    /** Optional, msg_type_url, when set, will query only grants matching given msg type. */
    msgTypeUrl: string;
    /** pagination defines an pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryGrantsResponse is the response type for the Query/Authorizations RPC method. */
export interface QueryGrantsResponse {
    /** authorizations is a list of grants granted for grantee by granter. */
    grants: Grant[];
    /** pagination defines an pagination for the response. */
    pagination: PageResponse | undefined;
}
/** QueryGranterGrantsRequest is the request type for the Query/GranterGrants RPC method. */
export interface QueryGranterGrantsRequest {
    granter: string;
    /** pagination defines an pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryGranterGrantsResponse is the response type for the Query/GranterGrants RPC method. */
export interface QueryGranterGrantsResponse {
    /** grants is a list of grants granted by the granter. */
    grants: GrantAuthorization[];
    /** pagination defines an pagination for the response. */
    pagination: PageResponse | undefined;
}
/** QueryGranteeGrantsRequest is the request type for the Query/GranteeGrants RPC method. */
export interface QueryGranteeGrantsRequest {
    grantee: string;
    /** pagination defines an pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryGranteeGrantsResponse is the response type for the Query/GranteeGrants RPC method. */
export interface QueryGranteeGrantsResponse {
    /** grants is a list of grants granted to the grantee. */
    grants: GrantAuthorization[];
    /** pagination defines an pagination for the response. */
    pagination: PageResponse | undefined;
}
export declare const QueryGrantsRequest: {
    encode(message: QueryGrantsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGrantsRequest;
    fromJSON(object: any): QueryGrantsRequest;
    toJSON(message: QueryGrantsRequest): unknown;
    create<I extends {
        granter?: string;
        grantee?: string;
        msgTypeUrl?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        granter?: string;
        grantee?: string;
        msgTypeUrl?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryGrantsRequest>]: never; }>(base?: I): QueryGrantsRequest;
    fromPartial<I_1 extends {
        granter?: string;
        grantee?: string;
        msgTypeUrl?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        granter?: string;
        grantee?: string;
        msgTypeUrl?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryGrantsRequest>]: never; }>(object: I_1): QueryGrantsRequest;
};
export declare const QueryGrantsResponse: {
    encode(message: QueryGrantsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGrantsResponse;
    fromJSON(object: any): QueryGrantsResponse;
    toJSON(message: QueryGrantsResponse): unknown;
    create<I extends {
        grants?: {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        grants?: {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[] & ({
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        } & {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["grants"][number]["authorization"], keyof import("../../../google/protobuf/any").Any>]: never; };
            expiration?: Date;
        } & { [K_1 in Exclude<keyof I["grants"][number], keyof Grant>]: never; })[] & { [K_2 in Exclude<keyof I["grants"], keyof {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryGrantsResponse>]: never; }>(base?: I): QueryGrantsResponse;
    fromPartial<I_1 extends {
        grants?: {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        grants?: {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[] & ({
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        } & {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["grants"][number]["authorization"], keyof import("../../../google/protobuf/any").Any>]: never; };
            expiration?: Date;
        } & { [K_6 in Exclude<keyof I_1["grants"][number], keyof Grant>]: never; })[] & { [K_7 in Exclude<keyof I_1["grants"], keyof {
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryGrantsResponse>]: never; }>(object: I_1): QueryGrantsResponse;
};
export declare const QueryGranterGrantsRequest: {
    encode(message: QueryGranterGrantsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGranterGrantsRequest;
    fromJSON(object: any): QueryGranterGrantsRequest;
    toJSON(message: QueryGranterGrantsRequest): unknown;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryGranterGrantsRequest>]: never; }>(base?: I): QueryGranterGrantsRequest;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryGranterGrantsRequest>]: never; }>(object: I_1): QueryGranterGrantsRequest;
};
export declare const QueryGranterGrantsResponse: {
    encode(message: QueryGranterGrantsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGranterGrantsResponse;
    fromJSON(object: any): QueryGranterGrantsResponse;
    toJSON(message: QueryGranterGrantsResponse): unknown;
    create<I extends {
        grants?: {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        grants?: {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[] & ({
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        } & {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["grants"][number]["authorization"], keyof import("../../../google/protobuf/any").Any>]: never; };
            expiration?: Date;
        } & { [K_1 in Exclude<keyof I["grants"][number], keyof GrantAuthorization>]: never; })[] & { [K_2 in Exclude<keyof I["grants"], keyof {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryGranterGrantsResponse>]: never; }>(base?: I): QueryGranterGrantsResponse;
    fromPartial<I_1 extends {
        grants?: {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        grants?: {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[] & ({
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        } & {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["grants"][number]["authorization"], keyof import("../../../google/protobuf/any").Any>]: never; };
            expiration?: Date;
        } & { [K_6 in Exclude<keyof I_1["grants"][number], keyof GrantAuthorization>]: never; })[] & { [K_7 in Exclude<keyof I_1["grants"], keyof {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryGranterGrantsResponse>]: never; }>(object: I_1): QueryGranterGrantsResponse;
};
export declare const QueryGranteeGrantsRequest: {
    encode(message: QueryGranteeGrantsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGranteeGrantsRequest;
    fromJSON(object: any): QueryGranteeGrantsRequest;
    toJSON(message: QueryGranteeGrantsRequest): unknown;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryGranteeGrantsRequest>]: never; }>(base?: I): QueryGranteeGrantsRequest;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryGranteeGrantsRequest>]: never; }>(object: I_1): QueryGranteeGrantsRequest;
};
export declare const QueryGranteeGrantsResponse: {
    encode(message: QueryGranteeGrantsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryGranteeGrantsResponse;
    fromJSON(object: any): QueryGranteeGrantsResponse;
    toJSON(message: QueryGranteeGrantsResponse): unknown;
    create<I extends {
        grants?: {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        grants?: {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[] & ({
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        } & {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["grants"][number]["authorization"], keyof import("../../../google/protobuf/any").Any>]: never; };
            expiration?: Date;
        } & { [K_1 in Exclude<keyof I["grants"][number], keyof GrantAuthorization>]: never; })[] & { [K_2 in Exclude<keyof I["grants"], keyof {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryGranteeGrantsResponse>]: never; }>(base?: I): QueryGranteeGrantsResponse;
    fromPartial<I_1 extends {
        grants?: {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        grants?: {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[] & ({
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        } & {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["grants"][number]["authorization"], keyof import("../../../google/protobuf/any").Any>]: never; };
            expiration?: Date;
        } & { [K_6 in Exclude<keyof I_1["grants"][number], keyof GrantAuthorization>]: never; })[] & { [K_7 in Exclude<keyof I_1["grants"], keyof {
            granter?: string;
            grantee?: string;
            authorization?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            expiration?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryGranteeGrantsResponse>]: never; }>(object: I_1): QueryGranteeGrantsResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Returns list of `Authorization`, granted to the grantee by the granter. */
    Grants(request: QueryGrantsRequest): Promise<QueryGrantsResponse>;
    /**
     * GranterGrants returns list of `GrantAuthorization`, granted by granter.
     *
     * Since: cosmos-sdk 0.46
     */
    GranterGrants(request: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponse>;
    /**
     * GranteeGrants returns a list of `GrantAuthorization` by grantee.
     *
     * Since: cosmos-sdk 0.46
     */
    GranteeGrants(request: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponse>;
}
export declare const QueryServiceName = "cosmos.authz.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Grants(request: QueryGrantsRequest): Promise<QueryGrantsResponse>;
    GranterGrants(request: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponse>;
    GranteeGrants(request: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponse>;
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
