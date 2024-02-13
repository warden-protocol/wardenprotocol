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
export interface ConsensusStateWithHeight {
    height?: {
        revision_number?: string;
        revision_height?: string;
    };
    consensus_state?: {
        "@type"?: string;
    };
}
export interface Height {
    /** @format uint64 */
    revision_number?: string;
    /** @format uint64 */
    revision_height?: string;
}
export interface IdentifiedClientState {
    client_id?: string;
    client_state?: {
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
export interface Params {
    allowed_clients?: string[];
}
export interface QueryClientParamsResponse {
    params?: {
        allowed_clients?: string[];
    };
}
export interface QueryClientStateResponse {
    client_state?: {
        "@type"?: string;
    };
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryClientStatesResponse {
    client_states?: {
        client_id?: string;
        client_state?: {
            "@type"?: string;
        };
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryClientStatusResponse {
    status?: string;
}
export interface QueryConsensusStateHeightsResponse {
    consensus_state_heights?: {
        revision_number?: string;
        revision_height?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryConsensusStateResponse {
    consensus_state?: {
        "@type"?: string;
    };
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryConsensusStatesResponse {
    consensus_states?: {
        height?: {
            revision_number?: string;
            revision_height?: string;
        };
        consensus_state?: {
            "@type"?: string;
        };
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryUpgradedClientStateResponse {
    upgraded_client_state?: {
        "@type"?: string;
    };
}
export interface QueryUpgradedConsensusStateResponse {
    upgraded_consensus_state?: {
        "@type"?: string;
    };
}
export type MsgCreateClientResponse = object;
export type MsgIBCSoftwareUpgradeResponse = object;
export type MsgRecoverClientResponse = object;
export type MsgSubmitMisbehaviourResponse = object;
export type MsgUpdateClientResponse = object;
export type MsgUpdateParamsResponse = object;
export type MsgUpgradeClientResponse = object;
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
 * @title HTTP API Console ibc.core.client.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryClientStates
     * @request GET:/ibc/core/client/v1/client_states
     */
    queryClientStates: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        client_states?: {
            client_id?: string;
            client_state?: {
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
     * @name QueryClientState
     * @request GET:/ibc/core/client/v1/client_states/{client_id}
     */
    queryClientState: (clientId: string, params?: RequestParams) => Promise<AxiosResponse<{
        client_state?: {
            "@type"?: string;
        };
        proof?: string;
        proof_height?: {
            revision_number?: string;
            revision_height?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryClientStatus
     * @request GET:/ibc/core/client/v1/client_status/{client_id}
     */
    queryClientStatus: (clientId: string, params?: RequestParams) => Promise<AxiosResponse<{
        status?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryConsensusStates
     * @request GET:/ibc/core/client/v1/consensus_states/{client_id}
     */
    queryConsensusStates: (clientId: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        consensus_states?: {
            height?: {
                revision_number?: string;
                revision_height?: string;
            };
            consensus_state?: {
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
     * @name QueryConsensusStateHeights
     * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/heights
     */
    queryConsensusStateHeights: (clientId: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        consensus_state_heights?: {
            revision_number?: string;
            revision_height?: string;
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
     * @name QueryConsensusState
     * @request GET:/ibc/core/client/v1/consensus_states/{client_id}/revision/{revision_number}/height/{revision_height}
     */
    queryConsensusState: (clientId: string, revisionNumber: string, revisionHeight: string, query?: {
        latest_height?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        consensus_state?: {
            "@type"?: string;
        };
        proof?: string;
        proof_height?: {
            revision_number?: string;
            revision_height?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryClientParams
     * @request GET:/ibc/core/client/v1/params
     */
    queryClientParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            allowed_clients?: string[];
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryUpgradedClientState
     * @request GET:/ibc/core/client/v1/upgraded_client_states
     */
    queryUpgradedClientState: (params?: RequestParams) => Promise<AxiosResponse<{
        upgraded_client_state?: {
            "@type"?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryUpgradedConsensusState
     * @request GET:/ibc/core/client/v1/upgraded_consensus_states
     */
    queryUpgradedConsensusState: (params?: RequestParams) => Promise<AxiosResponse<{
        upgraded_consensus_state?: {
            "@type"?: string;
        };
    }>>;
}
