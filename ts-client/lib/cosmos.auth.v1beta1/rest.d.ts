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
export interface AddressBytesToStringResponse {
    address_string?: string;
}
export interface AddressStringToBytesResponse {
    /** @format byte */
    address_bytes?: string;
}
export interface BaseAccount {
    address?: string;
    pub_key?: {
        "@type"?: string;
    };
    /** @format uint64 */
    account_number?: string;
    /** @format uint64 */
    sequence?: string;
}
export interface Bech32PrefixResponse {
    bech32_prefix?: string;
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
export interface QueryAccountAddressByIDResponse {
    account_address?: string;
}
export interface QueryAccountInfoResponse {
    info?: {
        address?: string;
        pub_key?: {
            "@type"?: string;
        };
        account_number?: string;
        sequence?: string;
    };
}
export interface QueryAccountResponse {
    account?: {
        "@type"?: string;
    };
}
export interface QueryAccountsResponse {
    accounts?: {
        "@type"?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryModuleAccountByNameResponse {
    account?: {
        "@type"?: string;
    };
}
export interface QueryModuleAccountsResponse {
    accounts?: {
        "@type"?: string;
    }[];
}
export interface QueryParamsResponse {
    params?: {
        max_memo_characters?: string;
        tx_sig_limit?: string;
        tx_size_cost_per_byte?: string;
        sig_verify_cost_ed25519?: string;
        sig_verify_cost_secp256k1?: string;
    };
}
export interface V1Beta1Params {
    /** @format uint64 */
    max_memo_characters?: string;
    /** @format uint64 */
    tx_sig_limit?: string;
    /** @format uint64 */
    tx_size_cost_per_byte?: string;
    /** @format uint64 */
    sig_verify_cost_ed25519?: string;
    /** @format uint64 */
    sig_verify_cost_secp256k1?: string;
}
export type MsgUpdateParamsResponse = object;
export interface Params {
    /** @format uint64 */
    max_memo_characters?: string;
    /** @format uint64 */
    tx_sig_limit?: string;
    /** @format uint64 */
    tx_size_cost_per_byte?: string;
    /** @format uint64 */
    sig_verify_cost_ed25519?: string;
    /** @format uint64 */
    sig_verify_cost_secp256k1?: string;
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
 * @title HTTP API Console cosmos.auth.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryAccountInfo
     * @request GET:/cosmos/auth/v1beta1/account_info/{address}
     */
    queryAccountInfo: (address: string, params?: RequestParams) => Promise<AxiosResponse<{
        info?: {
            address?: string;
            pub_key?: {
                "@type"?: string;
            };
            account_number?: string;
            sequence?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryAccounts
     * @request GET:/cosmos/auth/v1beta1/accounts
     */
    queryAccounts: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        accounts?: {
            "@type"?: string;
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
     * @name QueryAccount
     * @request GET:/cosmos/auth/v1beta1/accounts/{address}
     */
    queryAccount: (address: string, params?: RequestParams) => Promise<AxiosResponse<{
        account?: {
            "@type"?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryAccountAddressById
     * @request GET:/cosmos/auth/v1beta1/address_by_id/{id}
     */
    queryAccountAddressByID: (id: string, query?: {
        account_id?: string;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        account_address?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryBech32Prefix
     * @request GET:/cosmos/auth/v1beta1/bech32
     */
    queryBech32Prefix: (params?: RequestParams) => Promise<AxiosResponse<{
        bech32_prefix?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryAddressBytesToString
     * @request GET:/cosmos/auth/v1beta1/bech32/{address_bytes}
     */
    queryAddressBytesToString: (addressBytes: string, params?: RequestParams) => Promise<AxiosResponse<{
        address_string?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryAddressStringToBytes
     * @request GET:/cosmos/auth/v1beta1/bech32/{address_string}
     */
    queryAddressStringToBytes: (addressString: string, params?: RequestParams) => Promise<AxiosResponse<{
        address_bytes?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryModuleAccounts
     * @request GET:/cosmos/auth/v1beta1/module_accounts
     */
    queryModuleAccounts: (params?: RequestParams) => Promise<AxiosResponse<{
        accounts?: {
            "@type"?: string;
        }[];
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryModuleAccountByName
     * @request GET:/cosmos/auth/v1beta1/module_accounts/{name}
     */
    queryModuleAccountByName: (name: string, params?: RequestParams) => Promise<AxiosResponse<{
        account?: {
            "@type"?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/cosmos/auth/v1beta1/params
     */
    queryParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            max_memo_characters?: string;
            tx_sig_limit?: string;
            tx_size_cost_per_byte?: string;
            sig_verify_cost_ed25519?: string;
            sig_verify_cost_secp256k1?: string;
        };
    }>>;
}
