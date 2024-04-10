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
    authorization?: {
        "@type"?: string;
    };
    /** @format date-time */
    expiration?: string;
}
export interface GrantAuthorization {
    granter?: string;
    grantee?: string;
    authorization?: {
        "@type"?: string;
    };
    /** @format date-time */
    expiration?: string;
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
export interface QueryGranteeGrantsResponse {
    grants?: {
        granter?: string;
        grantee?: string;
        authorization?: {
            "@type"?: string;
        };
        expiration?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryGranterGrantsResponse {
    grants?: {
        granter?: string;
        grantee?: string;
        authorization?: {
            "@type"?: string;
        };
        expiration?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryGrantsResponse {
    grants?: {
        authorization?: {
            "@type"?: string;
        };
        expiration?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface MsgExecResponse {
    results?: string[];
}
export type MsgGrantResponse = object;
export type MsgRevokeResponse = object;
export interface V1Beta1Grant {
    authorization?: {
        "@type"?: string;
    };
    /** @format date-time */
    expiration?: string;
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
 * @title HTTP API Console cosmos.authz.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryGrants
     * @request GET:/cosmos/authz/v1beta1/grants
     */
    queryGrants: (query?: {
        granter?: string;
        grantee?: string;
        msg_type_url?: string;
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        grants?: {
            authorization?: {
                "@type"?: string;
            };
            expiration?: string;
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
     * @name QueryGranteeGrants
     * @request GET:/cosmos/authz/v1beta1/grants/grantee/{grantee}
     */
    queryGranteeGrants: (grantee: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        grants?: {
            granter?: string;
            grantee?: string;
            authorization?: {
                "@type"?: string;
            };
            expiration?: string;
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
     * @name QueryGranterGrants
     * @request GET:/cosmos/authz/v1beta1/grants/granter/{granter}
     */
    queryGranterGrants: (granter: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        grants?: {
            granter?: string;
            grantee?: string;
            authorization?: {
                "@type"?: string;
            };
            expiration?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
}
