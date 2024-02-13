import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Coin } from "../../base/v1beta1/coin";
import { Metadata, Params, SendEnabled } from "./bank";
export declare const protobufPackage = "cosmos.bank.v1beta1";
/** QueryBalanceRequest is the request type for the Query/Balance RPC method. */
export interface QueryBalanceRequest {
    /** address is the address to query balances for. */
    address: string;
    /** denom is the coin denom to query balances for. */
    denom: string;
}
/** QueryBalanceResponse is the response type for the Query/Balance RPC method. */
export interface QueryBalanceResponse {
    /** balance is the balance of the coin. */
    balance: Coin | undefined;
}
/** QueryBalanceRequest is the request type for the Query/AllBalances RPC method. */
export interface QueryAllBalancesRequest {
    /** address is the address to query balances for. */
    address: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
    /**
     * resolve_denom is the flag to resolve the denom into a human-readable form from the metadata.
     *
     * Since: cosmos-sdk 0.50
     */
    resolveDenom: boolean;
}
/**
 * QueryAllBalancesResponse is the response type for the Query/AllBalances RPC
 * method.
 */
export interface QueryAllBalancesResponse {
    /** balances is the balances of all the coins. */
    balances: Coin[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QuerySpendableBalancesRequest defines the gRPC request structure for querying
 * an account's spendable balances.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QuerySpendableBalancesRequest {
    /** address is the address to query spendable balances for. */
    address: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QuerySpendableBalancesResponse defines the gRPC response structure for querying
 * an account's spendable balances.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QuerySpendableBalancesResponse {
    /** balances is the spendable balances of all the coins. */
    balances: Coin[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QuerySpendableBalanceByDenomRequest defines the gRPC request structure for
 * querying an account's spendable balance for a specific denom.
 *
 * Since: cosmos-sdk 0.47
 */
export interface QuerySpendableBalanceByDenomRequest {
    /** address is the address to query balances for. */
    address: string;
    /** denom is the coin denom to query balances for. */
    denom: string;
}
/**
 * QuerySpendableBalanceByDenomResponse defines the gRPC response structure for
 * querying an account's spendable balance for a specific denom.
 *
 * Since: cosmos-sdk 0.47
 */
export interface QuerySpendableBalanceByDenomResponse {
    /** balance is the balance of the coin. */
    balance: Coin | undefined;
}
/**
 * QueryTotalSupplyRequest is the request type for the Query/TotalSupply RPC
 * method.
 */
export interface QueryTotalSupplyRequest {
    /**
     * pagination defines an optional pagination for the request.
     *
     * Since: cosmos-sdk 0.43
     */
    pagination: PageRequest | undefined;
}
/**
 * QueryTotalSupplyResponse is the response type for the Query/TotalSupply RPC
 * method
 */
export interface QueryTotalSupplyResponse {
    /** supply is the supply of the coins */
    supply: Coin[];
    /**
     * pagination defines the pagination in the response.
     *
     * Since: cosmos-sdk 0.43
     */
    pagination: PageResponse | undefined;
}
/** QuerySupplyOfRequest is the request type for the Query/SupplyOf RPC method. */
export interface QuerySupplyOfRequest {
    /** denom is the coin denom to query balances for. */
    denom: string;
}
/** QuerySupplyOfResponse is the response type for the Query/SupplyOf RPC method. */
export interface QuerySupplyOfResponse {
    /** amount is the supply of the coin. */
    amount: Coin | undefined;
}
/** QueryParamsRequest defines the request type for querying x/bank parameters. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse defines the response type for querying x/bank parameters. */
export interface QueryParamsResponse {
    /** params provides the parameters of the bank module. */
    params: Params | undefined;
}
/** QueryDenomsMetadataRequest is the request type for the Query/DenomsMetadata RPC method. */
export interface QueryDenomsMetadataRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryDenomsMetadataResponse is the response type for the Query/DenomsMetadata RPC
 * method.
 */
export interface QueryDenomsMetadataResponse {
    /** metadata provides the client information for all the registered tokens. */
    metadatas: Metadata[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryDenomMetadataRequest is the request type for the Query/DenomMetadata RPC method. */
export interface QueryDenomMetadataRequest {
    /** denom is the coin denom to query the metadata for. */
    denom: string;
}
/**
 * QueryDenomMetadataResponse is the response type for the Query/DenomMetadata RPC
 * method.
 */
export interface QueryDenomMetadataResponse {
    /** metadata describes and provides all the client information for the requested token. */
    metadata: Metadata | undefined;
}
/**
 * QueryDenomMetadataByQueryStringRequest is the request type for the Query/DenomMetadata RPC method.
 * Identical with QueryDenomMetadataRequest but receives denom as query string.
 */
export interface QueryDenomMetadataByQueryStringRequest {
    /** denom is the coin denom to query the metadata for. */
    denom: string;
}
/**
 * QueryDenomMetadataByQueryStringResponse is the response type for the Query/DenomMetadata RPC
 * method. Identical with QueryDenomMetadataResponse but receives denom as query string in request.
 */
export interface QueryDenomMetadataByQueryStringResponse {
    /** metadata describes and provides all the client information for the requested token. */
    metadata: Metadata | undefined;
}
/**
 * QueryDenomOwnersRequest defines the request type for the DenomOwners RPC query,
 * which queries for a paginated set of all account holders of a particular
 * denomination.
 */
export interface QueryDenomOwnersRequest {
    /** denom defines the coin denomination to query all account holders for. */
    denom: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * DenomOwner defines structure representing an account that owns or holds a
 * particular denominated token. It contains the account address and account
 * balance of the denominated token.
 *
 * Since: cosmos-sdk 0.46
 */
export interface DenomOwner {
    /** address defines the address that owns a particular denomination. */
    address: string;
    /** balance is the balance of the denominated coin for an account. */
    balance: Coin | undefined;
}
/**
 * QueryDenomOwnersResponse defines the RPC response of a DenomOwners RPC query.
 *
 * Since: cosmos-sdk 0.46
 */
export interface QueryDenomOwnersResponse {
    denomOwners: DenomOwner[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QueryDenomOwnersByQueryRequest defines the request type for the DenomOwnersByQuery RPC query,
 * which queries for a paginated set of all account holders of a particular
 * denomination.
 *
 * Since: cosmos-sdk 0.50.3
 */
export interface QueryDenomOwnersByQueryRequest {
    /** denom defines the coin denomination to query all account holders for. */
    denom: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryDenomOwnersByQueryResponse defines the RPC response of a DenomOwnersByQuery RPC query.
 *
 * Since: cosmos-sdk 0.50.3
 */
export interface QueryDenomOwnersByQueryResponse {
    denomOwners: DenomOwner[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/**
 * QuerySendEnabledRequest defines the RPC request for looking up SendEnabled entries.
 *
 * Since: cosmos-sdk 0.47
 */
export interface QuerySendEnabledRequest {
    /** denoms is the specific denoms you want look up. Leave empty to get all entries. */
    denoms: string[];
    /**
     * pagination defines an optional pagination for the request. This field is
     * only read if the denoms field is empty.
     */
    pagination: PageRequest | undefined;
}
/**
 * QuerySendEnabledResponse defines the RPC response of a SendEnable query.
 *
 * Since: cosmos-sdk 0.47
 */
export interface QuerySendEnabledResponse {
    sendEnabled: SendEnabled[];
    /**
     * pagination defines the pagination in the response. This field is only
     * populated if the denoms field in the request is empty.
     */
    pagination: PageResponse | undefined;
}
export declare const QueryBalanceRequest: {
    encode(message: QueryBalanceRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryBalanceRequest;
    fromJSON(object: any): QueryBalanceRequest;
    toJSON(message: QueryBalanceRequest): unknown;
    create<I extends {
        address?: string;
        denom?: string;
    } & {
        address?: string;
        denom?: string;
    } & { [K in Exclude<keyof I, keyof QueryBalanceRequest>]: never; }>(base?: I): QueryBalanceRequest;
    fromPartial<I_1 extends {
        address?: string;
        denom?: string;
    } & {
        address?: string;
        denom?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryBalanceRequest>]: never; }>(object: I_1): QueryBalanceRequest;
};
export declare const QueryBalanceResponse: {
    encode(message: QueryBalanceResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryBalanceResponse;
    fromJSON(object: any): QueryBalanceResponse;
    toJSON(message: QueryBalanceResponse): unknown;
    create<I extends {
        balance?: {
            denom?: string;
            amount?: string;
        };
    } & {
        balance?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["balance"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, "balance">]: never; }>(base?: I): QueryBalanceResponse;
    fromPartial<I_1 extends {
        balance?: {
            denom?: string;
            amount?: string;
        };
    } & {
        balance?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["balance"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "balance">]: never; }>(object: I_1): QueryBalanceResponse;
};
export declare const QueryAllBalancesRequest: {
    encode(message: QueryAllBalancesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllBalancesRequest;
    fromJSON(object: any): QueryAllBalancesRequest;
    toJSON(message: QueryAllBalancesRequest): unknown;
    create<I extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        resolveDenom?: boolean;
    } & {
        address?: string;
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
        resolveDenom?: boolean;
    } & { [K_1 in Exclude<keyof I, keyof QueryAllBalancesRequest>]: never; }>(base?: I): QueryAllBalancesRequest;
    fromPartial<I_1 extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        resolveDenom?: boolean;
    } & {
        address?: string;
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
        resolveDenom?: boolean;
    } & { [K_3 in Exclude<keyof I_1, keyof QueryAllBalancesRequest>]: never; }>(object: I_1): QueryAllBalancesRequest;
};
export declare const QueryAllBalancesResponse: {
    encode(message: QueryAllBalancesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllBalancesResponse;
    fromJSON(object: any): QueryAllBalancesResponse;
    toJSON(message: QueryAllBalancesResponse): unknown;
    create<I extends {
        balances?: {
            denom?: string;
            amount?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        balances?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["balances"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["balances"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryAllBalancesResponse>]: never; }>(base?: I): QueryAllBalancesResponse;
    fromPartial<I_1 extends {
        balances?: {
            denom?: string;
            amount?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        balances?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_4 in Exclude<keyof I_1["balances"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I_1["balances"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryAllBalancesResponse>]: never; }>(object: I_1): QueryAllBalancesResponse;
};
export declare const QuerySpendableBalancesRequest: {
    encode(message: QuerySpendableBalancesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpendableBalancesRequest;
    fromJSON(object: any): QuerySpendableBalancesRequest;
    toJSON(message: QuerySpendableBalancesRequest): unknown;
    create<I extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        address?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QuerySpendableBalancesRequest>]: never; }>(base?: I): QuerySpendableBalancesRequest;
    fromPartial<I_1 extends {
        address?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        address?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QuerySpendableBalancesRequest>]: never; }>(object: I_1): QuerySpendableBalancesRequest;
};
export declare const QuerySpendableBalancesResponse: {
    encode(message: QuerySpendableBalancesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpendableBalancesResponse;
    fromJSON(object: any): QuerySpendableBalancesResponse;
    toJSON(message: QuerySpendableBalancesResponse): unknown;
    create<I extends {
        balances?: {
            denom?: string;
            amount?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        balances?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["balances"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["balances"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QuerySpendableBalancesResponse>]: never; }>(base?: I): QuerySpendableBalancesResponse;
    fromPartial<I_1 extends {
        balances?: {
            denom?: string;
            amount?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        balances?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_4 in Exclude<keyof I_1["balances"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I_1["balances"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QuerySpendableBalancesResponse>]: never; }>(object: I_1): QuerySpendableBalancesResponse;
};
export declare const QuerySpendableBalanceByDenomRequest: {
    encode(message: QuerySpendableBalanceByDenomRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpendableBalanceByDenomRequest;
    fromJSON(object: any): QuerySpendableBalanceByDenomRequest;
    toJSON(message: QuerySpendableBalanceByDenomRequest): unknown;
    create<I extends {
        address?: string;
        denom?: string;
    } & {
        address?: string;
        denom?: string;
    } & { [K in Exclude<keyof I, keyof QuerySpendableBalanceByDenomRequest>]: never; }>(base?: I): QuerySpendableBalanceByDenomRequest;
    fromPartial<I_1 extends {
        address?: string;
        denom?: string;
    } & {
        address?: string;
        denom?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QuerySpendableBalanceByDenomRequest>]: never; }>(object: I_1): QuerySpendableBalanceByDenomRequest;
};
export declare const QuerySpendableBalanceByDenomResponse: {
    encode(message: QuerySpendableBalanceByDenomResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySpendableBalanceByDenomResponse;
    fromJSON(object: any): QuerySpendableBalanceByDenomResponse;
    toJSON(message: QuerySpendableBalanceByDenomResponse): unknown;
    create<I extends {
        balance?: {
            denom?: string;
            amount?: string;
        };
    } & {
        balance?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["balance"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, "balance">]: never; }>(base?: I): QuerySpendableBalanceByDenomResponse;
    fromPartial<I_1 extends {
        balance?: {
            denom?: string;
            amount?: string;
        };
    } & {
        balance?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["balance"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "balance">]: never; }>(object: I_1): QuerySpendableBalanceByDenomResponse;
};
export declare const QueryTotalSupplyRequest: {
    encode(message: QueryTotalSupplyRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalSupplyRequest;
    fromJSON(object: any): QueryTotalSupplyRequest;
    toJSON(message: QueryTotalSupplyRequest): unknown;
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
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryTotalSupplyRequest;
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
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryTotalSupplyRequest;
};
export declare const QueryTotalSupplyResponse: {
    encode(message: QueryTotalSupplyResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalSupplyResponse;
    fromJSON(object: any): QueryTotalSupplyResponse;
    toJSON(message: QueryTotalSupplyResponse): unknown;
    create<I extends {
        supply?: {
            denom?: string;
            amount?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        supply?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["supply"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["supply"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryTotalSupplyResponse>]: never; }>(base?: I): QueryTotalSupplyResponse;
    fromPartial<I_1 extends {
        supply?: {
            denom?: string;
            amount?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        supply?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_4 in Exclude<keyof I_1["supply"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I_1["supply"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryTotalSupplyResponse>]: never; }>(object: I_1): QueryTotalSupplyResponse;
};
export declare const QuerySupplyOfRequest: {
    encode(message: QuerySupplyOfRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySupplyOfRequest;
    fromJSON(object: any): QuerySupplyOfRequest;
    toJSON(message: QuerySupplyOfRequest): unknown;
    create<I extends {
        denom?: string;
    } & {
        denom?: string;
    } & { [K in Exclude<keyof I, "denom">]: never; }>(base?: I): QuerySupplyOfRequest;
    fromPartial<I_1 extends {
        denom?: string;
    } & {
        denom?: string;
    } & { [K_1 in Exclude<keyof I_1, "denom">]: never; }>(object: I_1): QuerySupplyOfRequest;
};
export declare const QuerySupplyOfResponse: {
    encode(message: QuerySupplyOfResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySupplyOfResponse;
    fromJSON(object: any): QuerySupplyOfResponse;
    toJSON(message: QuerySupplyOfResponse): unknown;
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
    } & { [K_1 in Exclude<keyof I, "amount">]: never; }>(base?: I): QuerySupplyOfResponse;
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
    } & { [K_3 in Exclude<keyof I_1, "amount">]: never; }>(object: I_1): QuerySupplyOfResponse;
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
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        };
    } & {
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        } & {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[] & ({
                denom?: string;
                enabled?: boolean;
            } & {
                denom?: string;
                enabled?: boolean;
            } & { [K in Exclude<keyof I["params"]["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_1 in Exclude<keyof I["params"]["sendEnabled"], keyof {
                denom?: string;
                enabled?: boolean;
            }[]>]: never; };
            defaultSendEnabled?: boolean;
        } & { [K_2 in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_3 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        };
    } & {
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        } & {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[] & ({
                denom?: string;
                enabled?: boolean;
            } & {
                denom?: string;
                enabled?: boolean;
            } & { [K_4 in Exclude<keyof I_1["params"]["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_5 in Exclude<keyof I_1["params"]["sendEnabled"], keyof {
                denom?: string;
                enabled?: boolean;
            }[]>]: never; };
            defaultSendEnabled?: boolean;
        } & { [K_6 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_7 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QueryDenomsMetadataRequest: {
    encode(message: QueryDenomsMetadataRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsMetadataRequest;
    fromJSON(object: any): QueryDenomsMetadataRequest;
    toJSON(message: QueryDenomsMetadataRequest): unknown;
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
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryDenomsMetadataRequest;
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
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryDenomsMetadataRequest;
};
export declare const QueryDenomsMetadataResponse: {
    encode(message: QueryDenomsMetadataResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsMetadataResponse;
    fromJSON(object: any): QueryDenomsMetadataResponse;
    toJSON(message: QueryDenomsMetadataResponse): unknown;
    create<I extends {
        metadatas?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        metadatas?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[] & ({
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[] & ({
                denom?: string;
                exponent?: number;
                aliases?: string[];
            } & {
                denom?: string;
                exponent?: number;
                aliases?: string[] & string[] & { [K in Exclude<keyof I["metadatas"][number]["denomUnits"][number]["aliases"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["metadatas"][number]["denomUnits"][number], keyof import("./bank").DenomUnit>]: never; })[] & { [K_2 in Exclude<keyof I["metadatas"][number]["denomUnits"], keyof {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[]>]: never; };
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & { [K_3 in Exclude<keyof I["metadatas"][number], keyof Metadata>]: never; })[] & { [K_4 in Exclude<keyof I["metadatas"], keyof {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_5 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_6 in Exclude<keyof I, keyof QueryDenomsMetadataResponse>]: never; }>(base?: I): QueryDenomsMetadataResponse;
    fromPartial<I_1 extends {
        metadatas?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        metadatas?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[] & ({
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[] & ({
                denom?: string;
                exponent?: number;
                aliases?: string[];
            } & {
                denom?: string;
                exponent?: number;
                aliases?: string[] & string[] & { [K_7 in Exclude<keyof I_1["metadatas"][number]["denomUnits"][number]["aliases"], keyof string[]>]: never; };
            } & { [K_8 in Exclude<keyof I_1["metadatas"][number]["denomUnits"][number], keyof import("./bank").DenomUnit>]: never; })[] & { [K_9 in Exclude<keyof I_1["metadatas"][number]["denomUnits"], keyof {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[]>]: never; };
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & { [K_10 in Exclude<keyof I_1["metadatas"][number], keyof Metadata>]: never; })[] & { [K_11 in Exclude<keyof I_1["metadatas"], keyof {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_12 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof QueryDenomsMetadataResponse>]: never; }>(object: I_1): QueryDenomsMetadataResponse;
};
export declare const QueryDenomMetadataRequest: {
    encode(message: QueryDenomMetadataRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomMetadataRequest;
    fromJSON(object: any): QueryDenomMetadataRequest;
    toJSON(message: QueryDenomMetadataRequest): unknown;
    create<I extends {
        denom?: string;
    } & {
        denom?: string;
    } & { [K in Exclude<keyof I, "denom">]: never; }>(base?: I): QueryDenomMetadataRequest;
    fromPartial<I_1 extends {
        denom?: string;
    } & {
        denom?: string;
    } & { [K_1 in Exclude<keyof I_1, "denom">]: never; }>(object: I_1): QueryDenomMetadataRequest;
};
export declare const QueryDenomMetadataResponse: {
    encode(message: QueryDenomMetadataResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomMetadataResponse;
    fromJSON(object: any): QueryDenomMetadataResponse;
    toJSON(message: QueryDenomMetadataResponse): unknown;
    create<I extends {
        metadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        };
    } & {
        metadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[] & ({
                denom?: string;
                exponent?: number;
                aliases?: string[];
            } & {
                denom?: string;
                exponent?: number;
                aliases?: string[] & string[] & { [K in Exclude<keyof I["metadata"]["denomUnits"][number]["aliases"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["metadata"]["denomUnits"][number], keyof import("./bank").DenomUnit>]: never; })[] & { [K_2 in Exclude<keyof I["metadata"]["denomUnits"], keyof {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[]>]: never; };
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & { [K_3 in Exclude<keyof I["metadata"], keyof Metadata>]: never; };
    } & { [K_4 in Exclude<keyof I, "metadata">]: never; }>(base?: I): QueryDenomMetadataResponse;
    fromPartial<I_1 extends {
        metadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        };
    } & {
        metadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[] & ({
                denom?: string;
                exponent?: number;
                aliases?: string[];
            } & {
                denom?: string;
                exponent?: number;
                aliases?: string[] & string[] & { [K_5 in Exclude<keyof I_1["metadata"]["denomUnits"][number]["aliases"], keyof string[]>]: never; };
            } & { [K_6 in Exclude<keyof I_1["metadata"]["denomUnits"][number], keyof import("./bank").DenomUnit>]: never; })[] & { [K_7 in Exclude<keyof I_1["metadata"]["denomUnits"], keyof {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[]>]: never; };
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & { [K_8 in Exclude<keyof I_1["metadata"], keyof Metadata>]: never; };
    } & { [K_9 in Exclude<keyof I_1, "metadata">]: never; }>(object: I_1): QueryDenomMetadataResponse;
};
export declare const QueryDenomMetadataByQueryStringRequest: {
    encode(message: QueryDenomMetadataByQueryStringRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomMetadataByQueryStringRequest;
    fromJSON(object: any): QueryDenomMetadataByQueryStringRequest;
    toJSON(message: QueryDenomMetadataByQueryStringRequest): unknown;
    create<I extends {
        denom?: string;
    } & {
        denom?: string;
    } & { [K in Exclude<keyof I, "denom">]: never; }>(base?: I): QueryDenomMetadataByQueryStringRequest;
    fromPartial<I_1 extends {
        denom?: string;
    } & {
        denom?: string;
    } & { [K_1 in Exclude<keyof I_1, "denom">]: never; }>(object: I_1): QueryDenomMetadataByQueryStringRequest;
};
export declare const QueryDenomMetadataByQueryStringResponse: {
    encode(message: QueryDenomMetadataByQueryStringResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomMetadataByQueryStringResponse;
    fromJSON(object: any): QueryDenomMetadataByQueryStringResponse;
    toJSON(message: QueryDenomMetadataByQueryStringResponse): unknown;
    create<I extends {
        metadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        };
    } & {
        metadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[] & ({
                denom?: string;
                exponent?: number;
                aliases?: string[];
            } & {
                denom?: string;
                exponent?: number;
                aliases?: string[] & string[] & { [K in Exclude<keyof I["metadata"]["denomUnits"][number]["aliases"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["metadata"]["denomUnits"][number], keyof import("./bank").DenomUnit>]: never; })[] & { [K_2 in Exclude<keyof I["metadata"]["denomUnits"], keyof {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[]>]: never; };
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & { [K_3 in Exclude<keyof I["metadata"], keyof Metadata>]: never; };
    } & { [K_4 in Exclude<keyof I, "metadata">]: never; }>(base?: I): QueryDenomMetadataByQueryStringResponse;
    fromPartial<I_1 extends {
        metadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        };
    } & {
        metadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[] & ({
                denom?: string;
                exponent?: number;
                aliases?: string[];
            } & {
                denom?: string;
                exponent?: number;
                aliases?: string[] & string[] & { [K_5 in Exclude<keyof I_1["metadata"]["denomUnits"][number]["aliases"], keyof string[]>]: never; };
            } & { [K_6 in Exclude<keyof I_1["metadata"]["denomUnits"][number], keyof import("./bank").DenomUnit>]: never; })[] & { [K_7 in Exclude<keyof I_1["metadata"]["denomUnits"], keyof {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[]>]: never; };
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & { [K_8 in Exclude<keyof I_1["metadata"], keyof Metadata>]: never; };
    } & { [K_9 in Exclude<keyof I_1, "metadata">]: never; }>(object: I_1): QueryDenomMetadataByQueryStringResponse;
};
export declare const QueryDenomOwnersRequest: {
    encode(message: QueryDenomOwnersRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomOwnersRequest;
    fromJSON(object: any): QueryDenomOwnersRequest;
    toJSON(message: QueryDenomOwnersRequest): unknown;
    create<I extends {
        denom?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        denom?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryDenomOwnersRequest>]: never; }>(base?: I): QueryDenomOwnersRequest;
    fromPartial<I_1 extends {
        denom?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        denom?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryDenomOwnersRequest>]: never; }>(object: I_1): QueryDenomOwnersRequest;
};
export declare const DenomOwner: {
    encode(message: DenomOwner, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DenomOwner;
    fromJSON(object: any): DenomOwner;
    toJSON(message: DenomOwner): unknown;
    create<I extends {
        address?: string;
        balance?: {
            denom?: string;
            amount?: string;
        };
    } & {
        address?: string;
        balance?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["balance"], keyof Coin>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof DenomOwner>]: never; }>(base?: I): DenomOwner;
    fromPartial<I_1 extends {
        address?: string;
        balance?: {
            denom?: string;
            amount?: string;
        };
    } & {
        address?: string;
        balance?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I_1["balance"], keyof Coin>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof DenomOwner>]: never; }>(object: I_1): DenomOwner;
};
export declare const QueryDenomOwnersResponse: {
    encode(message: QueryDenomOwnersResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomOwnersResponse;
    fromJSON(object: any): QueryDenomOwnersResponse;
    toJSON(message: QueryDenomOwnersResponse): unknown;
    create<I extends {
        denomOwners?: {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        denomOwners?: {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[] & ({
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        } & {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K in Exclude<keyof I["denomOwners"][number]["balance"], keyof Coin>]: never; };
        } & { [K_1 in Exclude<keyof I["denomOwners"][number], keyof DenomOwner>]: never; })[] & { [K_2 in Exclude<keyof I["denomOwners"], keyof {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryDenomOwnersResponse>]: never; }>(base?: I): QueryDenomOwnersResponse;
    fromPartial<I_1 extends {
        denomOwners?: {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        denomOwners?: {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[] & ({
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        } & {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_5 in Exclude<keyof I_1["denomOwners"][number]["balance"], keyof Coin>]: never; };
        } & { [K_6 in Exclude<keyof I_1["denomOwners"][number], keyof DenomOwner>]: never; })[] & { [K_7 in Exclude<keyof I_1["denomOwners"], keyof {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryDenomOwnersResponse>]: never; }>(object: I_1): QueryDenomOwnersResponse;
};
export declare const QueryDenomOwnersByQueryRequest: {
    encode(message: QueryDenomOwnersByQueryRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomOwnersByQueryRequest;
    fromJSON(object: any): QueryDenomOwnersByQueryRequest;
    toJSON(message: QueryDenomOwnersByQueryRequest): unknown;
    create<I extends {
        denom?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        denom?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryDenomOwnersByQueryRequest>]: never; }>(base?: I): QueryDenomOwnersByQueryRequest;
    fromPartial<I_1 extends {
        denom?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        denom?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryDenomOwnersByQueryRequest>]: never; }>(object: I_1): QueryDenomOwnersByQueryRequest;
};
export declare const QueryDenomOwnersByQueryResponse: {
    encode(message: QueryDenomOwnersByQueryResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomOwnersByQueryResponse;
    fromJSON(object: any): QueryDenomOwnersByQueryResponse;
    toJSON(message: QueryDenomOwnersByQueryResponse): unknown;
    create<I extends {
        denomOwners?: {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        denomOwners?: {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[] & ({
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        } & {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K in Exclude<keyof I["denomOwners"][number]["balance"], keyof Coin>]: never; };
        } & { [K_1 in Exclude<keyof I["denomOwners"][number], keyof DenomOwner>]: never; })[] & { [K_2 in Exclude<keyof I["denomOwners"], keyof {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryDenomOwnersByQueryResponse>]: never; }>(base?: I): QueryDenomOwnersByQueryResponse;
    fromPartial<I_1 extends {
        denomOwners?: {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        denomOwners?: {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[] & ({
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        } & {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_5 in Exclude<keyof I_1["denomOwners"][number]["balance"], keyof Coin>]: never; };
        } & { [K_6 in Exclude<keyof I_1["denomOwners"][number], keyof DenomOwner>]: never; })[] & { [K_7 in Exclude<keyof I_1["denomOwners"], keyof {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryDenomOwnersByQueryResponse>]: never; }>(object: I_1): QueryDenomOwnersByQueryResponse;
};
export declare const QuerySendEnabledRequest: {
    encode(message: QuerySendEnabledRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySendEnabledRequest;
    fromJSON(object: any): QuerySendEnabledRequest;
    toJSON(message: QuerySendEnabledRequest): unknown;
    create<I extends {
        denoms?: string[];
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        denoms?: string[] & string[] & { [K in Exclude<keyof I["denoms"], keyof string[]>]: never; };
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
        } & { [K_1 in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QuerySendEnabledRequest>]: never; }>(base?: I): QuerySendEnabledRequest;
    fromPartial<I_1 extends {
        denoms?: string[];
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        denoms?: string[] & string[] & { [K_3 in Exclude<keyof I_1["denoms"], keyof string[]>]: never; };
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
        } & { [K_4 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QuerySendEnabledRequest>]: never; }>(object: I_1): QuerySendEnabledRequest;
};
export declare const QuerySendEnabledResponse: {
    encode(message: QuerySendEnabledResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySendEnabledResponse;
    fromJSON(object: any): QuerySendEnabledResponse;
    toJSON(message: QuerySendEnabledResponse): unknown;
    create<I extends {
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[] & ({
            denom?: string;
            enabled?: boolean;
        } & {
            denom?: string;
            enabled?: boolean;
        } & { [K in Exclude<keyof I["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_1 in Exclude<keyof I["sendEnabled"], keyof {
            denom?: string;
            enabled?: boolean;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QuerySendEnabledResponse>]: never; }>(base?: I): QuerySendEnabledResponse;
    fromPartial<I_1 extends {
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[] & ({
            denom?: string;
            enabled?: boolean;
        } & {
            denom?: string;
            enabled?: boolean;
        } & { [K_4 in Exclude<keyof I_1["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_5 in Exclude<keyof I_1["sendEnabled"], keyof {
            denom?: string;
            enabled?: boolean;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QuerySendEnabledResponse>]: never; }>(object: I_1): QuerySendEnabledResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Balance queries the balance of a single coin for a single account. */
    Balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
    /**
     * AllBalances queries the balance of all coins for a single account.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     */
    AllBalances(request: QueryAllBalancesRequest): Promise<QueryAllBalancesResponse>;
    /**
     * SpendableBalances queries the spendable balance of all coins for a single
     * account.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     *
     * Since: cosmos-sdk 0.46
     */
    SpendableBalances(request: QuerySpendableBalancesRequest): Promise<QuerySpendableBalancesResponse>;
    /**
     * SpendableBalanceByDenom queries the spendable balance of a single denom for
     * a single account.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     *
     * Since: cosmos-sdk 0.47
     */
    SpendableBalanceByDenom(request: QuerySpendableBalanceByDenomRequest): Promise<QuerySpendableBalanceByDenomResponse>;
    /**
     * TotalSupply queries the total supply of all coins.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     */
    TotalSupply(request: QueryTotalSupplyRequest): Promise<QueryTotalSupplyResponse>;
    /**
     * SupplyOf queries the supply of a single coin.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     */
    SupplyOf(request: QuerySupplyOfRequest): Promise<QuerySupplyOfResponse>;
    /** Params queries the parameters of x/bank module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** DenomMetadata queries the client metadata of a given coin denomination. */
    DenomMetadata(request: QueryDenomMetadataRequest): Promise<QueryDenomMetadataResponse>;
    /** DenomMetadataByQueryString queries the client metadata of a given coin denomination. */
    DenomMetadataByQueryString(request: QueryDenomMetadataByQueryStringRequest): Promise<QueryDenomMetadataByQueryStringResponse>;
    /**
     * DenomsMetadata queries the client metadata for all registered coin
     * denominations.
     */
    DenomsMetadata(request: QueryDenomsMetadataRequest): Promise<QueryDenomsMetadataResponse>;
    /**
     * DenomOwners queries for all account addresses that own a particular token
     * denomination.
     *
     * When called from another module, this query might consume a high amount of
     * gas if the pagination field is incorrectly set.
     *
     * Since: cosmos-sdk 0.46
     */
    DenomOwners(request: QueryDenomOwnersRequest): Promise<QueryDenomOwnersResponse>;
    /**
     * DenomOwnersByQuery queries for all account addresses that own a particular token
     * denomination.
     *
     * Since: cosmos-sdk 0.50.3
     */
    DenomOwnersByQuery(request: QueryDenomOwnersByQueryRequest): Promise<QueryDenomOwnersByQueryResponse>;
    /**
     * SendEnabled queries for SendEnabled entries.
     *
     * This query only returns denominations that have specific SendEnabled settings.
     * Any denomination that does not have a specific setting will use the default
     * params.default_send_enabled, and will not be returned by this query.
     *
     * Since: cosmos-sdk 0.47
     */
    SendEnabled(request: QuerySendEnabledRequest): Promise<QuerySendEnabledResponse>;
}
export declare const QueryServiceName = "cosmos.bank.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
    AllBalances(request: QueryAllBalancesRequest): Promise<QueryAllBalancesResponse>;
    SpendableBalances(request: QuerySpendableBalancesRequest): Promise<QuerySpendableBalancesResponse>;
    SpendableBalanceByDenom(request: QuerySpendableBalanceByDenomRequest): Promise<QuerySpendableBalanceByDenomResponse>;
    TotalSupply(request: QueryTotalSupplyRequest): Promise<QueryTotalSupplyResponse>;
    SupplyOf(request: QuerySupplyOfRequest): Promise<QuerySupplyOfResponse>;
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    DenomMetadata(request: QueryDenomMetadataRequest): Promise<QueryDenomMetadataResponse>;
    DenomMetadataByQueryString(request: QueryDenomMetadataByQueryStringRequest): Promise<QueryDenomMetadataByQueryStringResponse>;
    DenomsMetadata(request: QueryDenomsMetadataRequest): Promise<QueryDenomsMetadataResponse>;
    DenomOwners(request: QueryDenomOwnersRequest): Promise<QueryDenomOwnersResponse>;
    DenomOwnersByQuery(request: QueryDenomOwnersByQueryRequest): Promise<QueryDenomOwnersByQueryResponse>;
    SendEnabled(request: QuerySendEnabledRequest): Promise<QuerySendEnabledResponse>;
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
