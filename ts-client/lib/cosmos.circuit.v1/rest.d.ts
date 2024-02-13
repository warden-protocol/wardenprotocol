export interface AccountResponse {
    permission?: {
        level?: "LEVEL_NONE_UNSPECIFIED" | "LEVEL_SOME_MSGS" | "LEVEL_ALL_MSGS" | "LEVEL_SUPER_ADMIN";
        limit_type_urls?: string[];
    };
}
export interface AccountsResponse {
    accounts?: {
        address?: string;
        permissions?: {
            level?: "LEVEL_NONE_UNSPECIFIED" | "LEVEL_SOME_MSGS" | "LEVEL_ALL_MSGS" | "LEVEL_SUPER_ADMIN";
            limit_type_urls?: string[];
        };
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface Any {
    "@type"?: string;
}
export interface DisabledListResponse {
    disabled_list?: string[];
}
export interface GenesisAccountPermissions {
    address?: string;
    permissions?: {
        level?: "LEVEL_NONE_UNSPECIFIED" | "LEVEL_SOME_MSGS" | "LEVEL_ALL_MSGS" | "LEVEL_SUPER_ADMIN";
        limit_type_urls?: string[];
    };
}
export declare enum Level {
    LEVEL_NONE_UNSPECIFIED = "LEVEL_NONE_UNSPECIFIED",
    LEVEL_SOME_MSGS = "LEVEL_SOME_MSGS",
    LEVEL_ALL_MSGS = "LEVEL_ALL_MSGS",
    LEVEL_SUPER_ADMIN = "LEVEL_SUPER_ADMIN"
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
export interface Permissions {
    level?: "LEVEL_NONE_UNSPECIFIED" | "LEVEL_SOME_MSGS" | "LEVEL_ALL_MSGS" | "LEVEL_SUPER_ADMIN";
    limit_type_urls?: string[];
}
export interface Status {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: {
        "@type"?: string;
    }[];
}
export interface MsgAuthorizeCircuitBreakerResponse {
    success?: boolean;
}
export interface MsgResetCircuitBreakerResponse {
    success?: boolean;
}
export interface MsgTripCircuitBreakerResponse {
    success?: boolean;
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
 * @title HTTP API Console cosmos.circuit.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryAccounts
     * @request GET:/cosmos/circuit/v1/accounts
     */
    queryAccounts: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        accounts?: {
            address?: string;
            permissions?: {
                level?: "LEVEL_NONE_UNSPECIFIED" | "LEVEL_SOME_MSGS" | "LEVEL_ALL_MSGS" | "LEVEL_SUPER_ADMIN";
                limit_type_urls?: string[];
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
     * @name QueryAccount
     * @request GET:/cosmos/circuit/v1/accounts/{address}
     */
    queryAccount: (address: string, params?: RequestParams) => Promise<AxiosResponse<{
        permission?: {
            level?: "LEVEL_NONE_UNSPECIFIED" | "LEVEL_SOME_MSGS" | "LEVEL_ALL_MSGS" | "LEVEL_SUPER_ADMIN";
            limit_type_urls?: string[];
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDisabledList
     * @request GET:/cosmos/circuit/v1/disable_list
     */
    queryDisabledList: (params?: RequestParams) => Promise<AxiosResponse<{
        disabled_list?: string[];
    }>>;
}
