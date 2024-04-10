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
export interface Counterparty {
    port_id?: string;
    channel_id?: string;
}
export interface ErrorReceipt {
    /** @format uint64 */
    sequence?: string;
    message?: string;
}
export interface Height {
    /** @format uint64 */
    revision_number?: string;
    /** @format uint64 */
    revision_height?: string;
}
export interface IdentifiedChannel {
    state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN" | "STATE_CLOSED" | "STATE_FLUSHING" | "STATE_FLUSHCOMPLETE";
    ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
    counterparty?: {
        port_id?: string;
        channel_id?: string;
    };
    connection_hops?: string[];
    version?: string;
    port_id?: string;
    channel_id?: string;
    /** @format uint64 */
    upgrade_sequence?: string;
}
export interface IdentifiedClientState {
    client_id?: string;
    client_state?: {
        "@type"?: string;
    };
}
export declare enum Order {
    ORDER_NONE_UNSPECIFIED = "ORDER_NONE_UNSPECIFIED",
    ORDER_UNORDERED = "ORDER_UNORDERED",
    ORDER_ORDERED = "ORDER_ORDERED"
}
export interface PacketState {
    port_id?: string;
    channel_id?: string;
    /** @format uint64 */
    sequence?: string;
    /** @format byte */
    data?: string;
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
export interface QueryChannelClientStateResponse {
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
export interface QueryChannelConsensusStateResponse {
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
export interface QueryChannelParamsResponse {
    params?: {
        upgrade_timeout?: {
            height?: {
                revision_number?: string;
                revision_height?: string;
            };
            timestamp?: string;
        };
    };
}
export interface QueryChannelResponse {
    channel?: {
        state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN" | "STATE_CLOSED" | "STATE_FLUSHING" | "STATE_FLUSHCOMPLETE";
        ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
        counterparty?: {
            port_id?: string;
            channel_id?: string;
        };
        connection_hops?: string[];
        version?: string;
        upgrade_sequence?: string;
    };
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryChannelsResponse {
    channels?: {
        state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN" | "STATE_CLOSED" | "STATE_FLUSHING" | "STATE_FLUSHCOMPLETE";
        ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
        counterparty?: {
            port_id?: string;
            channel_id?: string;
        };
        connection_hops?: string[];
        version?: string;
        port_id?: string;
        channel_id?: string;
        upgrade_sequence?: string;
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
export interface QueryConnectionChannelsResponse {
    channels?: {
        state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN" | "STATE_CLOSED" | "STATE_FLUSHING" | "STATE_FLUSHCOMPLETE";
        ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
        counterparty?: {
            port_id?: string;
            channel_id?: string;
        };
        connection_hops?: string[];
        version?: string;
        port_id?: string;
        channel_id?: string;
        upgrade_sequence?: string;
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
export interface QueryNextSequenceReceiveResponse {
    /** @format uint64 */
    next_sequence_receive?: string;
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryNextSequenceSendResponse {
    /** @format uint64 */
    next_sequence_send?: string;
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryPacketAcknowledgementResponse {
    /** @format byte */
    acknowledgement?: string;
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryPacketAcknowledgementsResponse {
    acknowledgements?: {
        port_id?: string;
        channel_id?: string;
        sequence?: string;
        data?: string;
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
export interface QueryPacketCommitmentResponse {
    /** @format byte */
    commitment?: string;
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryPacketCommitmentsResponse {
    commitments?: {
        port_id?: string;
        channel_id?: string;
        sequence?: string;
        data?: string;
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
export interface QueryPacketReceiptResponse {
    received?: boolean;
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryUnreceivedAcksResponse {
    sequences?: string[];
    height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryUnreceivedPacketsResponse {
    sequences?: string[];
    height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryUpgradeErrorResponse {
    error_receipt?: {
        sequence?: string;
        message?: string;
    };
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export interface QueryUpgradeResponse {
    upgrade?: {
        fields?: {
            ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
            connection_hops?: string[];
            version?: string;
        };
        timeout?: {
            height?: {
                revision_number?: string;
                revision_height?: string;
            };
            timestamp?: string;
        };
        next_sequence_send?: string;
    };
    /** @format byte */
    proof?: string;
    proof_height?: {
        revision_number?: string;
        revision_height?: string;
    };
}
export declare enum State {
    STATE_UNINITIALIZED_UNSPECIFIED = "STATE_UNINITIALIZED_UNSPECIFIED",
    STATE_INIT = "STATE_INIT",
    STATE_TRYOPEN = "STATE_TRYOPEN",
    STATE_OPEN = "STATE_OPEN",
    STATE_CLOSED = "STATE_CLOSED",
    STATE_FLUSHING = "STATE_FLUSHING",
    STATE_FLUSHCOMPLETE = "STATE_FLUSHCOMPLETE"
}
export interface Timeout {
    height?: {
        revision_number?: string;
        revision_height?: string;
    };
    /** @format uint64 */
    timestamp?: string;
}
export interface UpgradeFields {
    ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
    connection_hops?: string[];
    version?: string;
}
export interface ChannelV1Params {
    upgrade_timeout?: {
        height?: {
            revision_number?: string;
            revision_height?: string;
        };
        timestamp?: string;
    };
}
export interface V1Channel {
    state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN" | "STATE_CLOSED" | "STATE_FLUSHING" | "STATE_FLUSHCOMPLETE";
    ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
    counterparty?: {
        port_id?: string;
        channel_id?: string;
    };
    connection_hops?: string[];
    version?: string;
    /** @format uint64 */
    upgrade_sequence?: string;
}
export interface V1Upgrade {
    fields?: {
        ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
        connection_hops?: string[];
        version?: string;
    };
    timeout?: {
        height?: {
            revision_number?: string;
            revision_height?: string;
        };
        timestamp?: string;
    };
    /** @format uint64 */
    next_sequence_send?: string;
}
export interface Channel {
    state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN" | "STATE_CLOSED" | "STATE_FLUSHING" | "STATE_FLUSHCOMPLETE";
    ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
    counterparty?: {
        port_id?: string;
        channel_id?: string;
    };
    connection_hops?: string[];
    version?: string;
    /** @format uint64 */
    upgrade_sequence?: string;
}
export interface MsgAcknowledgementResponse {
    result?: "RESPONSE_RESULT_TYPE_UNSPECIFIED" | "RESPONSE_RESULT_TYPE_NOOP" | "RESPONSE_RESULT_TYPE_SUCCESS" | "RESPONSE_RESULT_TYPE_FAILURE";
}
export type MsgChannelCloseConfirmResponse = object;
export type MsgChannelCloseInitResponse = object;
export type MsgChannelOpenAckResponse = object;
export type MsgChannelOpenConfirmResponse = object;
export interface MsgChannelOpenInitResponse {
    channel_id?: string;
    version?: string;
}
export interface MsgChannelOpenTryResponse {
    version?: string;
    channel_id?: string;
}
export interface MsgChannelUpgradeAckResponse {
    result?: "RESPONSE_RESULT_TYPE_UNSPECIFIED" | "RESPONSE_RESULT_TYPE_NOOP" | "RESPONSE_RESULT_TYPE_SUCCESS" | "RESPONSE_RESULT_TYPE_FAILURE";
}
export type MsgChannelUpgradeCancelResponse = object;
export interface MsgChannelUpgradeConfirmResponse {
    result?: "RESPONSE_RESULT_TYPE_UNSPECIFIED" | "RESPONSE_RESULT_TYPE_NOOP" | "RESPONSE_RESULT_TYPE_SUCCESS" | "RESPONSE_RESULT_TYPE_FAILURE";
}
export interface MsgChannelUpgradeInitResponse {
    upgrade?: {
        fields?: {
            ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
            connection_hops?: string[];
            version?: string;
        };
        timeout?: {
            height?: {
                revision_number?: string;
                revision_height?: string;
            };
            timestamp?: string;
        };
        next_sequence_send?: string;
    };
    /** @format uint64 */
    upgrade_sequence?: string;
}
export type MsgChannelUpgradeOpenResponse = object;
export type MsgChannelUpgradeTimeoutResponse = object;
export interface MsgChannelUpgradeTryResponse {
    upgrade?: {
        fields?: {
            ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
            connection_hops?: string[];
            version?: string;
        };
        timeout?: {
            height?: {
                revision_number?: string;
                revision_height?: string;
            };
            timestamp?: string;
        };
        next_sequence_send?: string;
    };
    /** @format uint64 */
    upgrade_sequence?: string;
    result?: "RESPONSE_RESULT_TYPE_UNSPECIFIED" | "RESPONSE_RESULT_TYPE_NOOP" | "RESPONSE_RESULT_TYPE_SUCCESS" | "RESPONSE_RESULT_TYPE_FAILURE";
}
export interface MsgPruneAcknowledgementsResponse {
    /** @format uint64 */
    total_pruned_sequences?: string;
    /** @format uint64 */
    total_remaining_sequences?: string;
}
export interface MsgRecvPacketResponse {
    result?: "RESPONSE_RESULT_TYPE_UNSPECIFIED" | "RESPONSE_RESULT_TYPE_NOOP" | "RESPONSE_RESULT_TYPE_SUCCESS" | "RESPONSE_RESULT_TYPE_FAILURE";
}
export interface MsgTimeoutOnCloseResponse {
    result?: "RESPONSE_RESULT_TYPE_UNSPECIFIED" | "RESPONSE_RESULT_TYPE_NOOP" | "RESPONSE_RESULT_TYPE_SUCCESS" | "RESPONSE_RESULT_TYPE_FAILURE";
}
export interface MsgTimeoutResponse {
    result?: "RESPONSE_RESULT_TYPE_UNSPECIFIED" | "RESPONSE_RESULT_TYPE_NOOP" | "RESPONSE_RESULT_TYPE_SUCCESS" | "RESPONSE_RESULT_TYPE_FAILURE";
}
export type MsgUpdateParamsResponse = object;
export interface Packet {
    /** @format uint64 */
    sequence?: string;
    source_port?: string;
    source_channel?: string;
    destination_port?: string;
    destination_channel?: string;
    /** @format byte */
    data?: string;
    timeout_height?: {
        revision_number?: string;
        revision_height?: string;
    };
    /** @format uint64 */
    timeout_timestamp?: string;
}
export declare enum ResponseResultType {
    RESPONSE_RESULT_TYPE_UNSPECIFIED = "RESPONSE_RESULT_TYPE_UNSPECIFIED",
    RESPONSE_RESULT_TYPE_NOOP = "RESPONSE_RESULT_TYPE_NOOP",
    RESPONSE_RESULT_TYPE_SUCCESS = "RESPONSE_RESULT_TYPE_SUCCESS",
    RESPONSE_RESULT_TYPE_FAILURE = "RESPONSE_RESULT_TYPE_FAILURE"
}
export interface Upgrade {
    fields?: {
        ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
        connection_hops?: string[];
        version?: string;
    };
    timeout?: {
        height?: {
            revision_number?: string;
            revision_height?: string;
        };
        timestamp?: string;
    };
    /** @format uint64 */
    next_sequence_send?: string;
}
export interface V1Timeout {
    height?: {
        revision_number?: string;
        revision_height?: string;
    };
    /** @format uint64 */
    timestamp?: string;
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
 * @title HTTP API Console ibc.core.channel.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryChannels
     * @request GET:/ibc/core/channel/v1/channels
     */
    queryChannels: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        channels?: {
            state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN" | "STATE_CLOSED" | "STATE_FLUSHING" | "STATE_FLUSHCOMPLETE";
            ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
            counterparty?: {
                port_id?: string;
                channel_id?: string;
            };
            connection_hops?: string[];
            version?: string;
            port_id?: string;
            channel_id?: string;
            upgrade_sequence?: string;
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
     * @name QueryChannel
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}
     */
    queryChannel: (channelId: string, portId: string, params?: RequestParams) => Promise<AxiosResponse<{
        channel?: {
            state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN" | "STATE_CLOSED" | "STATE_FLUSHING" | "STATE_FLUSHCOMPLETE";
            ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
            counterparty?: {
                port_id?: string;
                channel_id?: string;
            };
            connection_hops?: string[];
            version?: string;
            upgrade_sequence?: string;
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
     * @name QueryChannelClientState
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/client_state
     */
    queryChannelClientState: (channelId: string, portId: string, params?: RequestParams) => Promise<AxiosResponse<{
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
     * @name QueryChannelConsensusState
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/consensus_state/revision/{revision_number}/height/{revision_height}
     */
    queryChannelConsensusState: (channelId: string, portId: string, revisionNumber: string, revisionHeight: string, params?: RequestParams) => Promise<AxiosResponse<{
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
     * @name QueryNextSequenceReceive
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence
     */
    queryNextSequenceReceive: (channelId: string, portId: string, params?: RequestParams) => Promise<AxiosResponse<{
        next_sequence_receive?: string;
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
     * @name QueryNextSequenceSend
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence_send
     */
    queryNextSequenceSend: (channelId: string, portId: string, params?: RequestParams) => Promise<AxiosResponse<{
        next_sequence_send?: string;
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
     * @name QueryPacketAcknowledgements
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acknowledgements
     */
    queryPacketAcknowledgements: (channelId: string, portId: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
        packet_commitment_sequences?: string[];
    }, params?: RequestParams) => Promise<AxiosResponse<{
        acknowledgements?: {
            port_id?: string;
            channel_id?: string;
            sequence?: string;
            data?: string;
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
     * @name QueryPacketAcknowledgement
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acks/{sequence}
     */
    queryPacketAcknowledgement: (channelId: string, portId: string, sequence: string, params?: RequestParams) => Promise<AxiosResponse<{
        acknowledgement?: string;
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
     * @name QueryPacketCommitments
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments
     */
    queryPacketCommitments: (channelId: string, portId: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        commitments?: {
            port_id?: string;
            channel_id?: string;
            sequence?: string;
            data?: string;
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
     * @name QueryUnreceivedAcks
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_ack_sequences}/unreceived_acks
     */
    queryUnreceivedAcks: (channelId: string, portId: string, packetAckSequences: string[], params?: RequestParams) => Promise<AxiosResponse<{
        sequences?: string[];
        height?: {
            revision_number?: string;
            revision_height?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryUnreceivedPackets
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_commitment_sequences}/unreceived_packets
     */
    queryUnreceivedPackets: (channelId: string, portId: string, packetCommitmentSequences: string[], params?: RequestParams) => Promise<AxiosResponse<{
        sequences?: string[];
        height?: {
            revision_number?: string;
            revision_height?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryPacketCommitment
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{sequence}
     */
    queryPacketCommitment: (channelId: string, portId: string, sequence: string, params?: RequestParams) => Promise<AxiosResponse<{
        commitment?: string;
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
     * @name QueryPacketReceipt
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_receipts/{sequence}
     */
    queryPacketReceipt: (channelId: string, portId: string, sequence: string, params?: RequestParams) => Promise<AxiosResponse<{
        received?: boolean;
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
     * @name QueryUpgrade
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/upgrade
     */
    queryUpgrade: (channelId: string, portId: string, params?: RequestParams) => Promise<AxiosResponse<{
        upgrade?: {
            fields?: {
                ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
                connection_hops?: string[];
                version?: string;
            };
            timeout?: {
                height?: {
                    revision_number?: string;
                    revision_height?: string;
                };
                timestamp?: string;
            };
            next_sequence_send?: string;
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
     * @name QueryUpgradeError
     * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/upgrade_error
     */
    queryUpgradeError: (channelId: string, portId: string, params?: RequestParams) => Promise<AxiosResponse<{
        error_receipt?: {
            sequence?: string;
            message?: string;
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
     * @name QueryConnectionChannels
     * @request GET:/ibc/core/channel/v1/connections/{connection}/channels
     */
    queryConnectionChannels: (connection: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        channels?: {
            state?: "STATE_UNINITIALIZED_UNSPECIFIED" | "STATE_INIT" | "STATE_TRYOPEN" | "STATE_OPEN" | "STATE_CLOSED" | "STATE_FLUSHING" | "STATE_FLUSHCOMPLETE";
            ordering?: "ORDER_NONE_UNSPECIFIED" | "ORDER_UNORDERED" | "ORDER_ORDERED";
            counterparty?: {
                port_id?: string;
                channel_id?: string;
            };
            connection_hops?: string[];
            version?: string;
            port_id?: string;
            channel_id?: string;
            upgrade_sequence?: string;
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
     * @name QueryChannelParams
     * @request GET:/ibc/core/channel/v1/params
     */
    queryChannelParams: (params?: RequestParams) => Promise<AxiosResponse<{
        params?: {
            upgrade_timeout?: {
                height?: {
                    revision_number?: string;
                    revision_height?: string;
                };
                timestamp?: string;
            };
        };
    }>>;
}
