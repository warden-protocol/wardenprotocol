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
export interface ParamChange {
    subspace?: string;
    key?: string;
    value?: string;
}
export interface QueryParamsResponse {
    param?: {
        subspace?: string;
        key?: string;
        value?: string;
    };
}
export interface QuerySubspacesResponse {
    subspaces?: {
        subspace?: string;
        keys?: string[];
    }[];
}
export interface Subspace {
    subspace?: string;
    keys?: string[];
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
 * @title HTTP API Console cosmos.params.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/cosmos/params/v1beta1/params
     */
    queryParams: (query?: {
        subspace?: string;
        key?: string;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        param?: {
            subspace?: string;
            key?: string;
            value?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QuerySubspaces
     * @request GET:/cosmos/params/v1beta1/subspaces
     */
    querySubspaces: (params?: RequestParams) => Promise<AxiosResponse<{
        subspaces?: {
            subspace?: string;
            keys?: string[];
        }[];
    }>>;
}
