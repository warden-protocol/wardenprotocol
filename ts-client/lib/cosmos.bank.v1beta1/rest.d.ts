export interface Any {
    "@type"?: string;
}
export interface Status {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: {
        "@type"?: string;
    }[];
}
export interface Coin {
    denom?: string;
    amount?: string;
}
export interface DenomOwner {
    address?: string;
    balance?: {
        denom?: string;
        amount?: string;
    };
}
export interface DenomUnit {
    denom?: string;
    /** @format int64 */
    exponent?: number;
    aliases?: string[];
}
export interface Metadata {
    description?: string;
    denom_units?: {
        denom?: string;
        exponent?: number;
        aliases?: string[];
    }[];
    base?: string;
    display?: string;
    name?: string;
    symbol?: string;
    uri?: string;
    uri_hash?: string;
}
export interface PageRequest {
    /** @format byte */
    key?: string;
    /** @format uint64 */
    offset?: string;
    /** @format uint64 */
    limit?: string;
    count_total?: boolean;
    reverse?: boolean;
}
export interface PageResponse {
    /** @format byte */
    next_key?: string;
    /** @format uint64 */
    total?: string;
}
export interface QueryAllBalancesResponse {
    balances?: {
        denom?: string;
        amount?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryBalanceResponse {
    balance?: {
        denom?: string;
        amount?: string;
    };
}
export interface QueryDenomMetadataByQueryStringResponse {
    metadata?: {
        description?: string;
        denom_units?: {
            denom?: string;
            exponent?: number;
            aliases?: string[];
        }[];
        base?: string;
        display?: string;
        name?: string;
        symbol?: string;
        uri?: string;
        uri_hash?: string;
    };
}
export interface QueryDenomMetadataResponse {
    metadata?: {
        description?: string;
        denom_units?: {
            denom?: string;
            exponent?: number;
            aliases?: string[];
        }[];
        base?: string;
        display?: string;
        name?: string;
        symbol?: string;
        uri?: string;
        uri_hash?: string;
    };
}
export interface QueryDenomOwnersByQueryResponse {
    denom_owners?: {
        address?: string;
        balance?: {
            denom?: string;
            amount?: string;
        };
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryDenomOwnersResponse {
    denom_owners?: {
        address?: string;
        balance?: {
            denom?: string;
            amount?: string;
        };
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryDenomsMetadataResponse {
    metadatas?: {
        description?: string;
        denom_units?: {
            denom?: string;
            exponent?: number;
            aliases?: string[];
        }[];
        base?: string;
        display?: string;
        name?: string;
        symbol?: string;
        uri?: string;
        uri_hash?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryParamsResponse {
    params?: {
        send_enabled?: {
            denom?: string;
            enabled?: boolean;
        }[];
        default_send_enabled?: boolean;
    };
}
export interface QuerySendEnabledResponse {
    send_enabled?: {
        denom?: string;
        enabled?: boolean;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QuerySpendableBalanceByDenomResponse {
    balance?: {
        denom?: string;
        amount?: string;
    };
}
export interface QuerySpendableBalancesResponse {
    balances?: {
        denom?: string;
        amount?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QuerySupplyOfResponse {
    amount?: {
        denom?: string;
        amount?: string;
    };
}
export interface QueryTotalSupplyResponse {
    supply?: {
        denom?: string;
        amount?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface V1Beta1Params {
    send_enabled?: {
        denom?: string;
        enabled?: boolean;
    }[];
    default_send_enabled?: boolean;
}
export interface V1Beta1SendEnabled {
    denom?: string;
    enabled?: boolean;
}
export interface Input {
    address?: string;
    coins?: {
        denom?: string;
        amount?: string;
    }[];
}
export type MsgMultiSendResponse = object;
export type MsgSendResponse = object;
export type MsgSetSendEnabledResponse = object;
export type MsgUpdateParamsResponse = object;
export interface Output {
    address?: string;
    coins?: {
        denom?: string;
        amount?: string;
    }[];
}
export interface Params {
    send_enabled?: {
        denom?: string;
        enabled?: boolean;
    }[];
    default_send_enabled?: boolean;
}
export interface SendEnabled {
    denom?: string;
    enabled?: boolean;
}
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData;
    private securityWorker?;
    private secure?;
    private format?;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    private mergeRequestParams;
    private createFormData;
    request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title HTTP API Console cosmos.bank.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryAllBalances
     * @request GET:/cosmos/bank/v1beta1/balances/{address}
     */
    queryAllBalances: (address: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
        resolve_denom?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        balances?: {
            denom?: string;
            amount?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryBalance
     * @request GET:/cosmos/bank/v1beta1/balances/{address}/by_denom
     */
    queryBalance: (address: string, query?: {
        denom?: string;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        balance?: {
            denom?: string;
            amount?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDenomOwners
     * @request GET:/cosmos/bank/v1beta1/denom_owners/{denom}
     */
    queryDenomOwners: (denom: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        denom_owners?: {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDenomOwnersByQuery
     * @request GET:/cosmos/bank/v1beta1/denom_owners_by_query
     */
    queryDenomOwnersByQuery: (query?: {
        denom?: string;
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        denom_owners?: {
            address?: string;
            balance?: {
                denom?: string;
                amount?: string;
            };
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDenomsMetadata
     * @request GET:/cosmos/bank/v1beta1/denoms_metadata
     */
    queryDenomsMetadata: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        metadatas?: {
            description?: string;
            denom_units?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uri_hash?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDenomMetadata
     * @request GET:/cosmos/bank/v1beta1/denoms_metadata/{denom}
     */
    queryDenomMetadata: (denom: string, params?: RequestParams) => Promise<AxiosResponse<{
        metadata?: {
            description?: string;
            denom_units?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uri_hash?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDenomMetadataByQueryString
     * @request GET:/cosmos/bank/v1beta1/denoms_metadata_by_query_string
     */
    queryDenomMetadataByQueryString: (query?: {
        denom?: string;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        metadata?: {
            description?: string;
            denom_units?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uri_hash?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/cosmos/bank/v1beta1/params
     */
    queryParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            send_enabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            default_send_enabled?: boolean;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QuerySendEnabled
     * @request GET:/cosmos/bank/v1beta1/send_enabled
     */
    querySendEnabled: (query?: {
        denoms?: string[];
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        send_enabled?: {
            denom?: string;
            enabled?: boolean;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QuerySpendableBalances
     * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}
     */
    querySpendableBalances: (address: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        balances?: {
            denom?: string;
            amount?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QuerySpendableBalanceByDenom
     * @request GET:/cosmos/bank/v1beta1/spendable_balances/{address}/by_denom
     */
    querySpendableBalanceByDenom: (address: string, query?: {
        denom?: string;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        balance?: {
            denom?: string;
            amount?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryTotalSupply
     * @request GET:/cosmos/bank/v1beta1/supply
     */
    queryTotalSupply: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        supply?: {
            denom?: string;
            amount?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QuerySupplyOf
     * @request GET:/cosmos/bank/v1beta1/supply/by_denom
     */
    querySupplyOf: (query?: {
        denom?: string;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        amount?: {
            denom?: string;
            amount?: string;
        };
    }>>;
}
