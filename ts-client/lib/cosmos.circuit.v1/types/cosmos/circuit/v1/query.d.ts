import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { GenesisAccountPermissions, Permissions } from "./types";
export declare const protobufPackage = "cosmos.circuit.v1";
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequest {
    address: string;
}
/** AccountResponse is the response type for the Query/Account RPC method. */
export interface AccountResponse {
    permission: Permissions | undefined;
}
/** QueryAccountsRequest is the request type for the Query/Accounts RPC method. */
export interface QueryAccountsRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** AccountsResponse is the response type for the Query/Accounts RPC method. */
export interface AccountsResponse {
    accounts: GenesisAccountPermissions[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryDisableListRequest is the request type for the Query/DisabledList RPC method. */
export interface QueryDisabledListRequest {
}
/** DisabledListResponse is the response type for the Query/DisabledList RPC method. */
export interface DisabledListResponse {
    disabledList: string[];
}
export declare const QueryAccountRequest: {
    encode(message: QueryAccountRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountRequest;
    fromJSON(object: any): QueryAccountRequest;
    toJSON(message: QueryAccountRequest): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): QueryAccountRequest;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): QueryAccountRequest;
};
export declare const AccountResponse: {
    encode(message: AccountResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountResponse;
    fromJSON(object: any): AccountResponse;
    toJSON(message: AccountResponse): unknown;
    create<I extends {
        permission?: {
            level?: import("./types").Permissions_Level;
            limitTypeUrls?: string[];
        };
    } & {
        permission?: {
            level?: import("./types").Permissions_Level;
            limitTypeUrls?: string[];
        } & {
            level?: import("./types").Permissions_Level;
            limitTypeUrls?: string[] & string[] & { [K in Exclude<keyof I["permission"]["limitTypeUrls"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["permission"], keyof Permissions>]: never; };
    } & { [K_2 in Exclude<keyof I, "permission">]: never; }>(base?: I): AccountResponse;
    fromPartial<I_1 extends {
        permission?: {
            level?: import("./types").Permissions_Level;
            limitTypeUrls?: string[];
        };
    } & {
        permission?: {
            level?: import("./types").Permissions_Level;
            limitTypeUrls?: string[];
        } & {
            level?: import("./types").Permissions_Level;
            limitTypeUrls?: string[] & string[] & { [K_3 in Exclude<keyof I_1["permission"]["limitTypeUrls"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["permission"], keyof Permissions>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "permission">]: never; }>(object: I_1): AccountResponse;
};
export declare const QueryAccountsRequest: {
    encode(message: QueryAccountsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountsRequest;
    fromJSON(object: any): QueryAccountsRequest;
    toJSON(message: QueryAccountsRequest): unknown;
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
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryAccountsRequest;
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
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryAccountsRequest;
};
export declare const AccountsResponse: {
    encode(message: AccountsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccountsResponse;
    fromJSON(object: any): AccountsResponse;
    toJSON(message: AccountsResponse): unknown;
    create<I extends {
        accounts?: {
            address?: string;
            permissions?: {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[];
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        accounts?: {
            address?: string;
            permissions?: {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[];
            };
        }[] & ({
            address?: string;
            permissions?: {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[];
            };
        } & {
            address?: string;
            permissions?: {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[];
            } & {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[] & string[] & { [K in Exclude<keyof I["accounts"][number]["permissions"]["limitTypeUrls"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["accounts"][number]["permissions"], keyof Permissions>]: never; };
        } & { [K_2 in Exclude<keyof I["accounts"][number], keyof GenesisAccountPermissions>]: never; })[] & { [K_3 in Exclude<keyof I["accounts"], keyof {
            address?: string;
            permissions?: {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[];
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof AccountsResponse>]: never; }>(base?: I): AccountsResponse;
    fromPartial<I_1 extends {
        accounts?: {
            address?: string;
            permissions?: {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[];
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        accounts?: {
            address?: string;
            permissions?: {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[];
            };
        }[] & ({
            address?: string;
            permissions?: {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[];
            };
        } & {
            address?: string;
            permissions?: {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[];
            } & {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[] & string[] & { [K_6 in Exclude<keyof I_1["accounts"][number]["permissions"]["limitTypeUrls"], keyof string[]>]: never; };
            } & { [K_7 in Exclude<keyof I_1["accounts"][number]["permissions"], keyof Permissions>]: never; };
        } & { [K_8 in Exclude<keyof I_1["accounts"][number], keyof GenesisAccountPermissions>]: never; })[] & { [K_9 in Exclude<keyof I_1["accounts"], keyof {
            address?: string;
            permissions?: {
                level?: import("./types").Permissions_Level;
                limitTypeUrls?: string[];
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_10 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof AccountsResponse>]: never; }>(object: I_1): AccountsResponse;
};
export declare const QueryDisabledListRequest: {
    encode(_: QueryDisabledListRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDisabledListRequest;
    fromJSON(_: any): QueryDisabledListRequest;
    toJSON(_: QueryDisabledListRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryDisabledListRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryDisabledListRequest;
};
export declare const DisabledListResponse: {
    encode(message: DisabledListResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DisabledListResponse;
    fromJSON(object: any): DisabledListResponse;
    toJSON(message: DisabledListResponse): unknown;
    create<I extends {
        disabledList?: string[];
    } & {
        disabledList?: string[] & string[] & { [K in Exclude<keyof I["disabledList"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "disabledList">]: never; }>(base?: I): DisabledListResponse;
    fromPartial<I_1 extends {
        disabledList?: string[];
    } & {
        disabledList?: string[] & string[] & { [K_2 in Exclude<keyof I_1["disabledList"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "disabledList">]: never; }>(object: I_1): DisabledListResponse;
};
/** Query defines the circuit gRPC querier service. */
export interface Query {
    /** Account returns account permissions. */
    Account(request: QueryAccountRequest): Promise<AccountResponse>;
    /** Account returns account permissions. */
    Accounts(request: QueryAccountsRequest): Promise<AccountsResponse>;
    /** DisabledList returns a list of disabled message urls */
    DisabledList(request: QueryDisabledListRequest): Promise<DisabledListResponse>;
}
export declare const QueryServiceName = "cosmos.circuit.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Account(request: QueryAccountRequest): Promise<AccountResponse>;
    Accounts(request: QueryAccountsRequest): Promise<AccountsResponse>;
    DisabledList(request: QueryDisabledListRequest): Promise<DisabledListResponse>;
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
