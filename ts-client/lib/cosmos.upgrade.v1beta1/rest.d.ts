export interface Any {
    "@type"?: string;
}
export interface ModuleVersion {
    name?: string;
    /** @format uint64 */
    version?: string;
}
export interface Plan {
    name?: string;
    /** @format date-time */
    time?: string;
    /** @format int64 */
    height?: string;
    info?: string;
    upgraded_client_state?: {
        "@type"?: string;
    };
}
export interface QueryAppliedPlanResponse {
    /** @format int64 */
    height?: string;
}
export interface QueryAuthorityResponse {
    address?: string;
}
export interface QueryCurrentPlanResponse {
    plan?: {
        name?: string;
        time?: string;
        height?: string;
        info?: string;
        upgraded_client_state?: {
            "@type"?: string;
        };
    };
}
export interface QueryModuleVersionsResponse {
    module_versions?: {
        name?: string;
        version?: string;
    }[];
}
export interface QueryUpgradedConsensusStateResponse {
    /** @format byte */
    upgraded_consensus_state?: string;
}
export interface Status {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: {
        "@type"?: string;
    }[];
}
export type MsgCancelUpgradeResponse = object;
export type MsgSoftwareUpgradeResponse = object;
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
 * @title HTTP API Console cosmos.upgrade.v1beta1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryAppliedPlan
     * @request GET:/cosmos/upgrade/v1beta1/applied_plan/{name}
     */
    queryAppliedPlan: (name: string, params?: RequestParams) => Promise<AxiosResponse<{
        height?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryAuthority
     * @request GET:/cosmos/upgrade/v1beta1/authority
     */
    queryAuthority: (params?: RequestParams) => Promise<AxiosResponse<{
        address?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryCurrentPlan
     * @request GET:/cosmos/upgrade/v1beta1/current_plan
     */
    queryCurrentPlan: (params?: RequestParams) => Promise<AxiosResponse<{
        plan?: {
            name?: string;
            time?: string;
            height?: string;
            info?: string;
            upgraded_client_state?: {
                "@type"?: string;
            };
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryModuleVersions
     * @request GET:/cosmos/upgrade/v1beta1/module_versions
     */
    queryModuleVersions: (query?: {
        module_name?: string;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        module_versions?: {
            name?: string;
            version?: string;
        }[];
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryUpgradedConsensusState
     * @request GET:/cosmos/upgrade/v1beta1/upgraded_consensus_state/{last_height}
     */
    queryUpgradedConsensusState: (lastHeight: string, params?: RequestParams) => Promise<AxiosResponse<{
        upgraded_consensus_state?: string;
    }>>;
}
