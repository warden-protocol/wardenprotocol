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
export interface Grant {
    granter?: string;
    grantee?: string;
    allowance?: {
        "@type"?: string;
    };
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
export interface QueryAllowanceResponse {
    allowance?: {
        granter?: string;
        grantee?: string;
        allowance?: {
            "@type"?: string;
        };
    };
}
export interface QueryAllowancesByGranterResponse {
    allowances?: {
        granter?: string;
        grantee?: string;
        allowance?: {
            "@type"?: string;
        };
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryAllowancesResponse {
    allowances?: {
        granter?: string;
        grantee?: string;
        allowance?: {
            "@type"?: string;
        };
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export type MsgGrantAllowanceResponse = object;
export type MsgPruneAllowancesResponse = object;
export type MsgRevokeAllowanceResponse = object;
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
 * @title HTTP API Console cosmos.feegrant.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryAllowance
     * @request GET:/cosmos/feegrant/v1beta1/allowance/{granter}/{grantee}
     */
    queryAllowance: (granter: string, grantee: string, params?: RequestParams) => Promise<AxiosResponse<{
        allowance?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                "@type"?: string;
            };
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryAllowances
     * @request GET:/cosmos/feegrant/v1beta1/allowances/{grantee}
     */
    queryAllowances: (grantee: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        allowances?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                "@type"?: string;
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
     * @name QueryAllowancesByGranter
     * @request GET:/cosmos/feegrant/v1beta1/issued/{granter}
     */
    queryAllowancesByGranter: (granter: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        allowances?: {
            granter?: string;
            grantee?: string;
            allowance?: {
                "@type"?: string;
            };
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
}
