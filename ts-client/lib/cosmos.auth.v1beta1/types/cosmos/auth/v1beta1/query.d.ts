import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { BaseAccount, Params } from "./auth";
export declare const protobufPackage = "cosmos.auth.v1beta1";
/**
 * QueryAccountsRequest is the request type for the Query/Accounts RPC method.
 *
 * Since: cosmos-sdk 0.43
 */
export interface QueryAccountsRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryAccountsResponse is the response type for the Query/Accounts RPC method.
 *
 * Since: cosmos-sdk 0.43
 */
export interface QueryAccountsResponse {
    /** accounts are the existing accounts */
    accounts: Any[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryAccountRequest is the request type for the Query/Account RPC method. */
export interface QueryAccountRequest {
    /** address defines the address to query for. */
    address: string;
}
/** QueryAccountResponse is the response type for the Query/Account RPC method. */
export interface QueryAccountResponse {
    /** account defines the account of the corresponding address. */
    account: Any | undefined;
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
 * QueryModuleAccountsRequest is the request type for the Query/ModuleAccounts RPC method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QueryModuleAccountsRequest {
}
/**
 * QueryModuleAccountsResponse is the response type for the Query/ModuleAccounts RPC method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QueryModuleAccountsResponse {
    accounts: Any[];
}
/** QueryModuleAccountByNameRequest is the request type for the Query/ModuleAccountByName RPC method. */
export interface QueryModuleAccountByNameRequest {
    name: string;
}
/** QueryModuleAccountByNameResponse is the response type for the Query/ModuleAccountByName RPC method. */
export interface QueryModuleAccountByNameResponse {
    account: Any | undefined;
}
/**
 * Bech32PrefixRequest is the request type for Bech32Prefix rpc method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface Bech32PrefixRequest {
}
/**
 * Bech32PrefixResponse is the response type for Bech32Prefix rpc method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface Bech32PrefixResponse {
    bech32Prefix: string;
}
/**
 * AddressBytesToStringRequest is the request type for AddressString rpc method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface AddressBytesToStringRequest {
    addressBytes: Uint8Array;
}
/**
 * AddressBytesToStringResponse is the response type for AddressString rpc method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface AddressBytesToStringResponse {
    addressString: string;
}
/**
 * AddressStringToBytesRequest is the request type for AccountBytes rpc method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface AddressStringToBytesRequest {
    addressString: string;
}
/**
 * AddressStringToBytesResponse is the response type for AddressBytes rpc method.
 *
 * Since: cosmos-sdk 0.46
 */
export interface AddressStringToBytesResponse {
    addressBytes: Uint8Array;
}
/**
 * QueryAccountAddressByIDRequest is the request type for AccountAddressByID rpc method
 *
 * Since: cosmos-sdk 0.46.2
 */
export interface QueryAccountAddressByIDRequest {
    /**
     * Deprecated, use account_id instead
     *
     * id is the account number of the address to be queried. This field
     * should have been an uint64 (like all account numbers), and will be
     * updated to uint64 in a future version of the auth query.
     *
     * @deprecated
     */
    id: number;
    /**
     * account_id is the account number of the address to be queried.
     *
     * Since: cosmos-sdk 0.47
     */
    accountId: number;
}
/**
 * QueryAccountAddressByIDResponse is the response type for AccountAddressByID rpc method
 *
 * Since: cosmos-sdk 0.46.2
 */
export interface QueryAccountAddressByIDResponse {
    accountAddress: string;
}
/**
 * QueryAccountInfoRequest is the Query/AccountInfo request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface QueryAccountInfoRequest {
    /** address is the account address string. */
    address: string;
}
/**
 * QueryAccountInfoResponse is the Query/AccountInfo response type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface QueryAccountInfoResponse {
    /** info is the account info which is represented by BaseAccount. */
    info: BaseAccount | undefined;
}
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
export declare const QueryAccountsResponse: {
    encode(message: QueryAccountsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountsResponse;
    fromJSON(object: any): QueryAccountsResponse;
    toJSON(message: QueryAccountsResponse): unknown;
    create<I extends {
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["accounts"][number], keyof Any>]: never; })[] & { [K_1 in Exclude<keyof I["accounts"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryAccountsResponse>]: never; }>(base?: I): QueryAccountsResponse;
    fromPartial<I_1 extends {
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_4 in Exclude<keyof I_1["accounts"][number], keyof Any>]: never; })[] & { [K_5 in Exclude<keyof I_1["accounts"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryAccountsResponse>]: never; }>(object: I_1): QueryAccountsResponse;
};
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
export declare const QueryAccountResponse: {
    encode(message: QueryAccountResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountResponse;
    fromJSON(object: any): QueryAccountResponse;
    toJSON(message: QueryAccountResponse): unknown;
    create<I extends {
        account?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        account?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["account"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, "account">]: never; }>(base?: I): QueryAccountResponse;
    fromPartial<I_1 extends {
        account?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        account?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["account"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "account">]: never; }>(object: I_1): QueryAccountResponse;
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
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        };
    } & {
        params?: {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        } & {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        } & { [K in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_1 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        };
    } & {
        params?: {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        } & {
            maxMemoCharacters?: number;
            txSigLimit?: number;
            txSizeCostPerByte?: number;
            sigVerifyCostEd25519?: number;
            sigVerifyCostSecp256k1?: number;
        } & { [K_2 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QueryModuleAccountsRequest: {
    encode(_: QueryModuleAccountsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryModuleAccountsRequest;
    fromJSON(_: any): QueryModuleAccountsRequest;
    toJSON(_: QueryModuleAccountsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryModuleAccountsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryModuleAccountsRequest;
};
export declare const QueryModuleAccountsResponse: {
    encode(message: QueryModuleAccountsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryModuleAccountsResponse;
    fromJSON(object: any): QueryModuleAccountsResponse;
    toJSON(message: QueryModuleAccountsResponse): unknown;
    create<I extends {
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["accounts"][number], keyof Any>]: never; })[] & { [K_1 in Exclude<keyof I["accounts"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "accounts">]: never; }>(base?: I): QueryModuleAccountsResponse;
    fromPartial<I_1 extends {
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        accounts?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["accounts"][number], keyof Any>]: never; })[] & { [K_4 in Exclude<keyof I_1["accounts"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "accounts">]: never; }>(object: I_1): QueryModuleAccountsResponse;
};
export declare const QueryModuleAccountByNameRequest: {
    encode(message: QueryModuleAccountByNameRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryModuleAccountByNameRequest;
    fromJSON(object: any): QueryModuleAccountByNameRequest;
    toJSON(message: QueryModuleAccountByNameRequest): unknown;
    create<I extends {
        name?: string;
    } & {
        name?: string;
    } & { [K in Exclude<keyof I, "name">]: never; }>(base?: I): QueryModuleAccountByNameRequest;
    fromPartial<I_1 extends {
        name?: string;
    } & {
        name?: string;
    } & { [K_1 in Exclude<keyof I_1, "name">]: never; }>(object: I_1): QueryModuleAccountByNameRequest;
};
export declare const QueryModuleAccountByNameResponse: {
    encode(message: QueryModuleAccountByNameResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryModuleAccountByNameResponse;
    fromJSON(object: any): QueryModuleAccountByNameResponse;
    toJSON(message: QueryModuleAccountByNameResponse): unknown;
    create<I extends {
        account?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        account?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["account"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, "account">]: never; }>(base?: I): QueryModuleAccountByNameResponse;
    fromPartial<I_1 extends {
        account?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        account?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["account"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "account">]: never; }>(object: I_1): QueryModuleAccountByNameResponse;
};
export declare const Bech32PrefixRequest: {
    encode(_: Bech32PrefixRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Bech32PrefixRequest;
    fromJSON(_: any): Bech32PrefixRequest;
    toJSON(_: Bech32PrefixRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): Bech32PrefixRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): Bech32PrefixRequest;
};
export declare const Bech32PrefixResponse: {
    encode(message: Bech32PrefixResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Bech32PrefixResponse;
    fromJSON(object: any): Bech32PrefixResponse;
    toJSON(message: Bech32PrefixResponse): unknown;
    create<I extends {
        bech32Prefix?: string;
    } & {
        bech32Prefix?: string;
    } & { [K in Exclude<keyof I, "bech32Prefix">]: never; }>(base?: I): Bech32PrefixResponse;
    fromPartial<I_1 extends {
        bech32Prefix?: string;
    } & {
        bech32Prefix?: string;
    } & { [K_1 in Exclude<keyof I_1, "bech32Prefix">]: never; }>(object: I_1): Bech32PrefixResponse;
};
export declare const AddressBytesToStringRequest: {
    encode(message: AddressBytesToStringRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddressBytesToStringRequest;
    fromJSON(object: any): AddressBytesToStringRequest;
    toJSON(message: AddressBytesToStringRequest): unknown;
    create<I extends {
        addressBytes?: Uint8Array;
    } & {
        addressBytes?: Uint8Array;
    } & { [K in Exclude<keyof I, "addressBytes">]: never; }>(base?: I): AddressBytesToStringRequest;
    fromPartial<I_1 extends {
        addressBytes?: Uint8Array;
    } & {
        addressBytes?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "addressBytes">]: never; }>(object: I_1): AddressBytesToStringRequest;
};
export declare const AddressBytesToStringResponse: {
    encode(message: AddressBytesToStringResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddressBytesToStringResponse;
    fromJSON(object: any): AddressBytesToStringResponse;
    toJSON(message: AddressBytesToStringResponse): unknown;
    create<I extends {
        addressString?: string;
    } & {
        addressString?: string;
    } & { [K in Exclude<keyof I, "addressString">]: never; }>(base?: I): AddressBytesToStringResponse;
    fromPartial<I_1 extends {
        addressString?: string;
    } & {
        addressString?: string;
    } & { [K_1 in Exclude<keyof I_1, "addressString">]: never; }>(object: I_1): AddressBytesToStringResponse;
};
export declare const AddressStringToBytesRequest: {
    encode(message: AddressStringToBytesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddressStringToBytesRequest;
    fromJSON(object: any): AddressStringToBytesRequest;
    toJSON(message: AddressStringToBytesRequest): unknown;
    create<I extends {
        addressString?: string;
    } & {
        addressString?: string;
    } & { [K in Exclude<keyof I, "addressString">]: never; }>(base?: I): AddressStringToBytesRequest;
    fromPartial<I_1 extends {
        addressString?: string;
    } & {
        addressString?: string;
    } & { [K_1 in Exclude<keyof I_1, "addressString">]: never; }>(object: I_1): AddressStringToBytesRequest;
};
export declare const AddressStringToBytesResponse: {
    encode(message: AddressStringToBytesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AddressStringToBytesResponse;
    fromJSON(object: any): AddressStringToBytesResponse;
    toJSON(message: AddressStringToBytesResponse): unknown;
    create<I extends {
        addressBytes?: Uint8Array;
    } & {
        addressBytes?: Uint8Array;
    } & { [K in Exclude<keyof I, "addressBytes">]: never; }>(base?: I): AddressStringToBytesResponse;
    fromPartial<I_1 extends {
        addressBytes?: Uint8Array;
    } & {
        addressBytes?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "addressBytes">]: never; }>(object: I_1): AddressStringToBytesResponse;
};
export declare const QueryAccountAddressByIDRequest: {
    encode(message: QueryAccountAddressByIDRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountAddressByIDRequest;
    fromJSON(object: any): QueryAccountAddressByIDRequest;
    toJSON(message: QueryAccountAddressByIDRequest): unknown;
    create<I extends {
        id?: number;
        accountId?: number;
    } & {
        id?: number;
        accountId?: number;
    } & { [K in Exclude<keyof I, keyof QueryAccountAddressByIDRequest>]: never; }>(base?: I): QueryAccountAddressByIDRequest;
    fromPartial<I_1 extends {
        id?: number;
        accountId?: number;
    } & {
        id?: number;
        accountId?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryAccountAddressByIDRequest>]: never; }>(object: I_1): QueryAccountAddressByIDRequest;
};
export declare const QueryAccountAddressByIDResponse: {
    encode(message: QueryAccountAddressByIDResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountAddressByIDResponse;
    fromJSON(object: any): QueryAccountAddressByIDResponse;
    toJSON(message: QueryAccountAddressByIDResponse): unknown;
    create<I extends {
        accountAddress?: string;
    } & {
        accountAddress?: string;
    } & { [K in Exclude<keyof I, "accountAddress">]: never; }>(base?: I): QueryAccountAddressByIDResponse;
    fromPartial<I_1 extends {
        accountAddress?: string;
    } & {
        accountAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "accountAddress">]: never; }>(object: I_1): QueryAccountAddressByIDResponse;
};
export declare const QueryAccountInfoRequest: {
    encode(message: QueryAccountInfoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountInfoRequest;
    fromJSON(object: any): QueryAccountInfoRequest;
    toJSON(message: QueryAccountInfoRequest): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): QueryAccountInfoRequest;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): QueryAccountInfoRequest;
};
export declare const QueryAccountInfoResponse: {
    encode(message: QueryAccountInfoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAccountInfoResponse;
    fromJSON(object: any): QueryAccountInfoResponse;
    toJSON(message: QueryAccountInfoResponse): unknown;
    create<I extends {
        info?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        };
    } & {
        info?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        } & {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["info"]["pubKey"], keyof Any>]: never; };
            accountNumber?: number;
            sequence?: number;
        } & { [K_1 in Exclude<keyof I["info"], keyof BaseAccount>]: never; };
    } & { [K_2 in Exclude<keyof I, "info">]: never; }>(base?: I): QueryAccountInfoResponse;
    fromPartial<I_1 extends {
        info?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        };
    } & {
        info?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        } & {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_3 in Exclude<keyof I_1["info"]["pubKey"], keyof Any>]: never; };
            accountNumber?: number;
            sequence?: number;
        } & { [K_4 in Exclude<keyof I_1["info"], keyof BaseAccount>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "info">]: never; }>(object: I_1): QueryAccountInfoResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /**
     * Accounts returns all the existing accounts.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     *
     * Since: cosmos-sdk 0.43
     */
    Accounts(request: QueryAccountsRequest): Promise<QueryAccountsResponse>;
    /** Account returns account details based on address. */
    Account(request: QueryAccountRequest): Promise<QueryAccountResponse>;
    /**
     * AccountAddressByID returns account address based on account number.
     *
     * Since: cosmos-sdk 0.46.2
     */
    AccountAddressByID(request: QueryAccountAddressByIDRequest): Promise<QueryAccountAddressByIDResponse>;
    /** Params queries all parameters. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /**
     * ModuleAccounts returns all the existing module accounts.
     *
     * Since: cosmos-sdk 0.46
     */
    ModuleAccounts(request: QueryModuleAccountsRequest): Promise<QueryModuleAccountsResponse>;
    /** ModuleAccountByName returns the module account info by module name */
    ModuleAccountByName(request: QueryModuleAccountByNameRequest): Promise<QueryModuleAccountByNameResponse>;
    /**
     * Bech32Prefix queries bech32Prefix
     *
     * Since: cosmos-sdk 0.46
     */
    Bech32Prefix(request: Bech32PrefixRequest): Promise<Bech32PrefixResponse>;
    /**
     * AddressBytesToString converts Account Address bytes to string
     *
     * Since: cosmos-sdk 0.46
     */
    AddressBytesToString(request: AddressBytesToStringRequest): Promise<AddressBytesToStringResponse>;
    /**
     * AddressStringToBytes converts Address string to bytes
     *
     * Since: cosmos-sdk 0.46
     */
    AddressStringToBytes(request: AddressStringToBytesRequest): Promise<AddressStringToBytesResponse>;
    /**
     * AccountInfo queries account info which is common to all account types.
     *
     * Since: cosmos-sdk 0.47
     */
    AccountInfo(request: QueryAccountInfoRequest): Promise<QueryAccountInfoResponse>;
}
export declare const QueryServiceName = "cosmos.auth.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Accounts(request: QueryAccountsRequest): Promise<QueryAccountsResponse>;
    Account(request: QueryAccountRequest): Promise<QueryAccountResponse>;
    AccountAddressByID(request: QueryAccountAddressByIDRequest): Promise<QueryAccountAddressByIDResponse>;
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    ModuleAccounts(request: QueryModuleAccountsRequest): Promise<QueryModuleAccountsResponse>;
    ModuleAccountByName(request: QueryModuleAccountByNameRequest): Promise<QueryModuleAccountByNameResponse>;
    Bech32Prefix(request: Bech32PrefixRequest): Promise<Bech32PrefixResponse>;
    AddressBytesToString(request: AddressBytesToStringRequest): Promise<AddressBytesToStringResponse>;
    AddressStringToBytes(request: AddressStringToBytesRequest): Promise<AddressStringToBytesResponse>;
    AccountInfo(request: QueryAccountInfoRequest): Promise<QueryAccountInfoResponse>;
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
