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
export interface QueryDenomHashResponse {
    hash?: string;
}
export interface QueryDenomTraceResponse {
    denom_trace?: {
        path?: string;
        base_denom?: string;
    };
}
export interface QueryDenomTracesResponse {
    denom_traces?: {
        path?: string;
        base_denom?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryEscrowAddressResponse {
    escrow_address?: string;
}
export interface QueryParamsResponse {
    params?: {
        send_enabled?: boolean;
        receive_enabled?: boolean;
    };
}
export interface QueryTotalEscrowForDenomResponse {
    amount?: {
        denom?: string;
        amount?: string;
    };
}
export interface V1DenomTrace {
    path?: string;
    base_denom?: string;
}
export interface V1Params {
    send_enabled?: boolean;
    receive_enabled?: boolean;
}
export interface Height {
    /** @format uint64 */
    revision_number?: string;
    /** @format uint64 */
    revision_height?: string;
}
export interface MsgTransferResponse {
    /** @format uint64 */
    sequence?: string;
}
export type MsgUpdateParamsResponse = object;
export interface TransferV1Params {
    send_enabled?: boolean;
    receive_enabled?: boolean;
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
 * @title HTTP API Console ibc.applications.transfer.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryEscrowAddress
     * @request GET:/ibc/apps/transfer/v1/channels/{channel_id}/ports/{port_id}/escrow_address
     */
    queryEscrowAddress: (channelId: string, portId: string, params?: RequestParams) => Promise<AxiosResponse<{
        escrow_address?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDenomHash
     * @request GET:/ibc/apps/transfer/v1/denom_hashes/{trace}
     */
    queryDenomHash: (trace: string, params?: RequestParams) => Promise<AxiosResponse<{
        hash?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDenomTraces
     * @request GET:/ibc/apps/transfer/v1/denom_traces
     */
    queryDenomTraces: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        denom_traces?: {
            path?: string;
            base_denom?: string;
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
     * @name QueryDenomTrace
     * @request GET:/ibc/apps/transfer/v1/denom_traces/{hash}
     */
    queryDenomTrace: (hash: string, params?: RequestParams) => Promise<AxiosResponse<{
        denom_trace?: {
            path?: string;
            base_denom?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryTotalEscrowForDenom
     * @request GET:/ibc/apps/transfer/v1/denoms/{denom}/total_escrow
     */
    queryTotalEscrowForDenom: (denom: string, params?: RequestParams) => Promise<AxiosResponse<{
        amount?: {
            denom?: string;
            amount?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/ibc/apps/transfer/v1/params
     */
    queryParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            send_enabled?: boolean;
            receive_enabled?: boolean;
        };
    }>>;
}
