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
export interface QueryAnnualProvisionsResponse {
    /** @format byte */
    annual_provisions?: string;
}
export interface QueryInflationResponse {
    /** @format byte */
    inflation?: string;
}
export interface QueryParamsResponse {
    params?: {
        mint_denom?: string;
        inflation_rate_change?: string;
        inflation_max?: string;
        inflation_min?: string;
        goal_bonded?: string;
        blocks_per_year?: string;
    };
}
export interface V1Beta1Params {
    mint_denom?: string;
    inflation_rate_change?: string;
    inflation_max?: string;
    inflation_min?: string;
    goal_bonded?: string;
    /** @format uint64 */
    blocks_per_year?: string;
}
export type MsgUpdateParamsResponse = object;
export interface Params {
    mint_denom?: string;
    inflation_rate_change?: string;
    inflation_max?: string;
    inflation_min?: string;
    goal_bonded?: string;
    /** @format uint64 */
    blocks_per_year?: string;
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
 * @title HTTP API Console cosmos.mint.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryAnnualProvisions
     * @request GET:/cosmos/mint/v1beta1/annual_provisions
     */
    queryAnnualProvisions: (params?: RequestParams) => Promise<AxiosResponse<{
        annual_provisions?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryInflation
     * @request GET:/cosmos/mint/v1beta1/inflation
     */
    queryInflation: (params?: RequestParams) => Promise<AxiosResponse<{
        inflation?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/cosmos/mint/v1beta1/params
     */
    queryParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            mint_denom?: string;
            inflation_rate_change?: string;
            inflation_max?: string;
            inflation_min?: string;
            goal_bonded?: string;
            blocks_per_year?: string;
        };
    }>>;
}
