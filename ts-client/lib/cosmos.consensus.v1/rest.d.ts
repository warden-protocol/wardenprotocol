export interface ABCIParams {
    /** @format int64 */
    vote_extensions_enable_height?: string;
}
export interface Any {
    "@type"?: string;
}
export interface BlockParams {
    /** @format int64 */
    max_bytes?: string;
    /** @format int64 */
    max_gas?: string;
}
export interface ConsensusParams {
    block?: {
        max_bytes?: string;
        max_gas?: string;
    };
    evidence?: {
        max_age_num_blocks?: string;
        max_age_duration?: string;
        max_bytes?: string;
    };
    validator?: {
        pub_key_types?: string[];
    };
    version?: {
        app?: string;
    };
    abci?: {
        vote_extensions_enable_height?: string;
    };
}
export interface EvidenceParams {
    /** @format int64 */
    max_age_num_blocks?: string;
    max_age_duration?: string;
    /** @format int64 */
    max_bytes?: string;
}
export interface QueryParamsResponse {
    params?: {
        block?: {
            max_bytes?: string;
            max_gas?: string;
        };
        evidence?: {
            max_age_num_blocks?: string;
            max_age_duration?: string;
            max_bytes?: string;
        };
        validator?: {
            pub_key_types?: string[];
        };
        version?: {
            app?: string;
        };
        abci?: {
            vote_extensions_enable_height?: string;
        };
    };
}
export interface Status {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: {
        "@type"?: string;
    }[];
}
export interface ValidatorParams {
    pub_key_types?: string[];
}
export interface VersionParams {
    /** @format uint64 */
    app?: string;
}
export type MsgUpdateParamsResponse = object;
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
 * @title HTTP API Console cosmos.consensus.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/cosmos/consensus/v1/params
     */
    queryParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            block?: {
                max_bytes?: string;
                max_gas?: string;
            };
            evidence?: {
                max_age_num_blocks?: string;
                max_age_duration?: string;
                max_bytes?: string;
            };
            validator?: {
                pub_key_types?: string[];
            };
            version?: {
                app?: string;
            };
            abci?: {
                vote_extensions_enable_height?: string;
            };
        };
    }>>;
}
