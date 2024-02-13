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
export interface ConnectionEnd {
    client_id?: string;
    versions?: {
        identifier?: string;
        features?: string[];
    }[];
    state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
    counterparty?: {
        client_id?: string;
        connection_id?: string;
        prefix?: {
            key_prefix?: string;
        };
    };
    /** @format uint64 */
    delay_period?: string;
}
export interface Counterparty {
    client_id?: string;
    connection_id?: string;
    prefix?: {
        key_prefix?: string;
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
export interface IdentifiedConnection {
    id?: string;
    client_id?: string;
    versions?: {
        identifier?: string;
        features?: string[];
    }[];
    state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
    counterparty?: {
        client_id?: string;
        connection_id?: string;
        prefix?: {
            key_prefix?: string;
        };
    };
    /** @format uint64 */
    delay_period?: string;
}
export interface MerklePrefix {
    /** @format byte */
    key_prefix?: string;
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
export interface QueryClientConnectionsResponse {
    connection_paths?: string[];
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryConnectionClientStateResponse {
    identified_client_state?: {
        client_id?: string;
        client_state?: {
            "@type"?: string;
        };
    };
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryConnectionConsensusStateResponse {
    consensus_state?: {
        "@type"?: string;
    };
    client_id?: string;
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryConnectionParamsResponse {
    params?: {
        max_expected_time_per_block?: string;
    };
}
export interface QueryConnectionResponse {
    connection?: {
        client_id?: string;
        versions?: {
            identifier?: string;
            features?: string[];
        }[];
        state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
        counterparty?: {
            client_id?: string;
            connection_id?: string;
            prefix?: {
                key_prefix?: string;
            };
        };
        delay_period?: string;
    };
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryConnectionsResponse {
    connections?: {
        id?: string;
        client_id?: string;
        versions?: {
            identifier?: string;
            features?: string[];
        }[];
        state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
        counterparty?: {
            client_id?: string;
            connection_id?: string;
            prefix?: {
                key_prefix?: string;
            };
        };
        delay_period?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
    height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export declare enum State {
    STATE_UNINITIALIZED_UNSPECIFIED = "STATE_UNINITIALIZED_UNSPECIFIED",
    STATE_INIT = "STATE_INIT",
    STATE_TRYOPEN = "STATE_TRYOPEN",
    STATE_OPEN = "STATE_OPEN"
}
export interface Version {
    identifier?: string;
    features?: string[];
}
export interface ConnectionV1Params {
    /** @format uint64 */
    max_expected_time_per_block?: string;
}
export type MsgConnectionOpenAckResponse = object;
export type MsgConnectionOpenConfirmResponse = object;
export type MsgConnectionOpenInitResponse = object;
export type MsgConnectionOpenTryResponse = object;
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
 * @title HTTP API Console ibc.core.connection.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryClientConnections
     * @request GET:/ibc/core/connection/v1/client_connections/{client_id}
     */
    queryClientConnections: (clientId: string, params?: RequestParams) => Promise<AxiosResponse<{
        connection_paths?: string[];
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
     * @name QueryConnections
     * @request GET:/ibc/core/connection/v1/connections
     */
    queryConnections: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        connections?: {
            id?: string;
            client_id?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
            counterparty?: {
                client_id?: string;
                connection_id?: string;
                prefix?: {
                    key_prefix?: string;
                };
            };
            delay_period?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
        height?: {
            revision_number?: string;
            revision_height?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryConnection
     * @request GET:/ibc/core/connection/v1/connections/{connection_id}
     */
    queryConnection: (connectionId: string, params?: RequestParams) => Promise<AxiosResponse<{
        connection?: {
            client_id?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN";
            counterparty?: {
                client_id?: string;
                connection_id?: string;
                prefix?: {
                    key_prefix?: string;
                };
            };
            delay_period?: string;
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
     * @name QueryConnectionClientState
     * @request GET:/ibc/core/connection/v1/connections/{connection_id}/client_state
     */
    queryConnectionClientState: (connectionId: string, params?: RequestParams) => Promise<AxiosResponse<{
        identified_client_state?: {
            client_id?: string;
            client_state?: {
                "@type"?: string;
            };
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
     * @name QueryConnectionConsensusState
     * @request GET:/ibc/core/connection/v1/connections/{connection_id}/consensus_state/revision/{revision_number}/height/{revision_height}
     */
    queryConnectionConsensusState: (connectionId: string, revisionNumber: string, revisionHeight: string, params?: RequestParams) => Promise<AxiosResponse<{
        consensus_state?: {
            "@type"?: string;
        };
        client_id?: string;
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
     * @name QueryConnectionParams
     * @request GET:/ibc/core/connection/v1/params
     */
    queryConnectionParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            max_expected_time_per_block?: string;
        };
    }>>;
}
