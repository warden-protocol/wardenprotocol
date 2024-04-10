export interface Any {
    "@type"?: string;
}
export interface ConfigResponse {
    minimum_gas_price?: string;
    pruning_keep_recent?: string;
    pruning_interval?: string;
    /** @format uint64 */
    halt_height?: string;
}
export interface StatusResponse {
    /** @format uint64 */
    earliest_store_height?: string;
    /** @format uint64 */
    height?: string;
    /** @format date-time */
    timestamp?: string;
    /** @format byte */
    app_hash?: string;
    /** @format byte */
    validator_hash?: string;
}
export interface RpcStatus {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: {
        "@type"?: string;
    }[];
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
 * @title HTTP API Console cosmos.base.node.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Service
     * @name ServiceConfig
     * @request GET:/cosmos/base/node/v1beta1/config
     */
    serviceConfig: (params?: RequestParams) => Promise<AxiosResponse<{
        minimum_gas_price?: string;
        pruning_keep_recent?: string;
        pruning_interval?: string;
        halt_height?: string;
    }>>;
    /**
     * No description
     *
     * @tags Service
     * @name ServiceStatus
     * @request GET:/cosmos/base/node/v1beta1/status
     */
    serviceStatus: (params?: RequestParams) => Promise<AxiosResponse<{
        earliest_store_height?: string;
        height?: string;
        timestamp?: string;
        app_hash?: string;
        validator_hash?: string;
    }>>;
}
