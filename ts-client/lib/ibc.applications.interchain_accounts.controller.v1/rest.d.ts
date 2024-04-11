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
export interface QueryInterchainAccountResponse {
    address?: string;
}
export interface QueryParamsResponse {
    params?: {
        controller_enabled?: boolean;
    };
}
export interface V1Params {
    controller_enabled?: boolean;
}
export interface InterchainAccountPacketData {
    type?: "TYPE_UNSPECIFIED" | "TYPE_EXECUTE_TX";
    /** @format byte */
    data?: string;
    memo?: string;
}
export interface MsgRegisterInterchainAccountResponse {
    channel_id?: string;
    port_id?: string;
}
export interface MsgSendTxResponse {
    /** @format uint64 */
    sequence?: string;
}
export type MsgUpdateParamsResponse = object;
export declare enum Order {
    ORDER_NONE_UNSPECIFIED = "ORDER_NONE_UNSPECIFIED",
    ORDER_UNORDERED = "ORDER_UNORDERED",
    ORDER_ORDERED = "ORDER_ORDERED"
}
export interface ControllerV1Params {
    controller_enabled?: boolean;
}
export declare enum V1Type {
    TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
    TYPE_EXECUTE_TX = "TYPE_EXECUTE_TX"
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
 * @title HTTP API Console ibc.applications.interchain_accounts.controller.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryInterchainAccount
     * @request GET:/ibc/apps/interchain_accounts/controller/v1/owners/{owner}/connections/{connection_id}
     */
    queryInterchainAccount: (owner: string, connectionId: string, params?: RequestParams) => Promise<AxiosResponse<{
        address?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/ibc/apps/interchain_accounts/controller/v1/params
     */
    queryParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            controller_enabled?: boolean;
        };
    }>>;
}
