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
export interface QueryParamsResponse {
    params?: {
        signed_blocks_window?: string;
        min_signed_per_window?: string;
        downtime_jail_duration?: string;
        slash_fraction_double_sign?: string;
        slash_fraction_downtime?: string;
    };
}
export interface QuerySigningInfoResponse {
    val_signing_info?: {
        address?: string;
        start_height?: string;
        index_offset?: string;
        jailed_until?: string;
        tombstoned?: boolean;
        missed_blocks_counter?: string;
    };
}
export interface QuerySigningInfosResponse {
    info?: {
        address?: string;
        start_height?: string;
        index_offset?: string;
        jailed_until?: string;
        tombstoned?: boolean;
        missed_blocks_counter?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface ValidatorSigningInfo {
    address?: string;
    /** @format int64 */
    start_height?: string;
    /** @format int64 */
    index_offset?: string;
    /** @format date-time */
    jailed_until?: string;
    tombstoned?: boolean;
    /** @format int64 */
    missed_blocks_counter?: string;
}
export interface V1Beta1Params {
    /** @format int64 */
    signed_blocks_window?: string;
    /** @format byte */
    min_signed_per_window?: string;
    downtime_jail_duration?: string;
    /** @format byte */
    slash_fraction_double_sign?: string;
    /** @format byte */
    slash_fraction_downtime?: string;
}
export type MsgUnjailResponse = object;
export type MsgUpdateParamsResponse = object;
export interface Params {
    /** @format int64 */
    signed_blocks_window?: string;
    /** @format byte */
    min_signed_per_window?: string;
    downtime_jail_duration?: string;
    /** @format byte */
    slash_fraction_double_sign?: string;
    /** @format byte */
    slash_fraction_downtime?: string;
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
 * @title HTTP API Console cosmos.slashing.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/cosmos/slashing/v1beta1/params
     */
    queryParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            signed_blocks_window?: string;
            min_signed_per_window?: string;
            downtime_jail_duration?: string;
            slash_fraction_double_sign?: string;
            slash_fraction_downtime?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QuerySigningInfos
     * @request GET:/cosmos/slashing/v1beta1/signing_infos
     */
    querySigningInfos: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        info?: {
            address?: string;
            start_height?: string;
            index_offset?: string;
            jailed_until?: string;
            tombstoned?: boolean;
            missed_blocks_counter?: string;
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
     * @name QuerySigningInfo
     * @request GET:/cosmos/slashing/v1beta1/signing_infos/{cons_address}
     */
    querySigningInfo: (consAddress: string, params?: RequestParams) => Promise<AxiosResponse<{
        val_signing_info?: {
            address?: string;
            start_height?: string;
            index_offset?: string;
            jailed_until?: string;
            tombstoned?: boolean;
            missed_blocks_counter?: string;
        };
    }>>;
}
