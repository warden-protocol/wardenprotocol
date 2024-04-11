/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
export var Order;
(function (Order) {
    Order["ORDER_NONE_UNSPECIFIED"] = "ORDER_NONE_UNSPECIFIED";
    Order["ORDER_UNORDERED"] = "ORDER_UNORDERED";
    Order["ORDER_ORDERED"] = "ORDER_ORDERED";
})(Order || (Order = {}));
export var State;
(function (State) {
    State["STATE_UNINITIALIZED_UNSPECIFIED"] = "STATE_UNINITIALIZED_UNSPECIFIED";
    State["STATE_INIT"] = "STATE_INIT";
    State["STATE_TRYOPEN"] = "STATE_TRYOPEN";
    State["STATE_OPEN"] = "STATE_OPEN";
    State["STATE_CLOSED"] = "STATE_CLOSED";
    State["STATE_FLUSHING"] = "STATE_FLUSHING";
    State["STATE_FLUSHCOMPLETE"] = "STATE_FLUSHCOMPLETE";
})(State || (State = {}));
export var ResponseResultType;
(function (ResponseResultType) {
    ResponseResultType["RESPONSE_RESULT_TYPE_UNSPECIFIED"] = "RESPONSE_RESULT_TYPE_UNSPECIFIED";
    ResponseResultType["RESPONSE_RESULT_TYPE_NOOP"] = "RESPONSE_RESULT_TYPE_NOOP";
    ResponseResultType["RESPONSE_RESULT_TYPE_SUCCESS"] = "RESPONSE_RESULT_TYPE_SUCCESS";
    ResponseResultType["RESPONSE_RESULT_TYPE_FAILURE"] = "RESPONSE_RESULT_TYPE_FAILURE";
})(ResponseResultType || (ResponseResultType = {}));
import axios from "axios";
export var ContentType;
(function (ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})(ContentType || (ContentType = {}));
export class HttpClient {
    constructor({ securityWorker, secure, format, ...axiosConfig } = {}) {
        this.securityData = null;
        this.setSecurityData = (data) => {
            this.securityData = data;
        };
        this.request = async ({ secure, path, type, query, format, body, ...params }) => {
            const secureParams = ((typeof secure === "boolean" ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
                {};
            const requestParams = this.mergeRequestParams(params, secureParams);
            const responseFormat = (format && this.format) || void 0;
            if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
                requestParams.headers.common = { Accept: "*/*" };
                requestParams.headers.post = {};
                requestParams.headers.put = {};
                body = this.createFormData(body);
            }
            return this.instance.request({
                ...requestParams,
                headers: {
                    ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
                    ...(requestParams.headers || {}),
                },
                params: query,
                responseType: responseFormat,
                data: body,
                url: path,
            });
        };
        this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }
    mergeRequestParams(params1, params2) {
        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.instance.defaults.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }
    createFormData(input) {
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            formData.append(key, property instanceof Blob
                ? property
                : typeof property === "object" && property !== null
                    ? JSON.stringify(property)
                    : `${property}`);
            return formData;
        }, new FormData());
    }
}
/**
 * @title HTTP API Console ibc.core.channel.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryChannels
         * @request GET:/ibc/core/channel/v1/channels
         */
        this.queryChannels = (query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryChannel
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}
         */
        this.queryChannel = (channelId, portId, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryChannelClientState
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/client_state
         */
        this.queryChannelClientState = (channelId, portId, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/client_state`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryChannelConsensusState
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/consensus_state/revision/{revision_number}/height/{revision_height}
         */
        this.queryChannelConsensusState = (channelId, portId, revisionNumber, revisionHeight, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/consensus_state/revision/${revisionNumber}/height/${revisionHeight}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryNextSequenceReceive
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence
         */
        this.queryNextSequenceReceive = (channelId, portId, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/next_sequence`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryNextSequenceSend
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/next_sequence_send
         */
        this.queryNextSequenceSend = (channelId, portId, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/next_sequence_send`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPacketAcknowledgements
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acknowledgements
         */
        this.queryPacketAcknowledgements = (channelId, portId, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_acknowledgements`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPacketAcknowledgement
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_acks/{sequence}
         */
        this.queryPacketAcknowledgement = (channelId, portId, sequence, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_acks/${sequence}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPacketCommitments
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments
         */
        this.queryPacketCommitments = (channelId, portId, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryUnreceivedAcks
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_ack_sequences}/unreceived_acks
         */
        this.queryUnreceivedAcks = (channelId, portId, packetAckSequences, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments/${packetAckSequences}/unreceived_acks`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryUnreceivedPackets
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{packet_commitment_sequences}/unreceived_packets
         */
        this.queryUnreceivedPackets = (channelId, portId, packetCommitmentSequences, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments/${packetCommitmentSequences}/unreceived_packets`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPacketCommitment
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_commitments/{sequence}
         */
        this.queryPacketCommitment = (channelId, portId, sequence, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_commitments/${sequence}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPacketReceipt
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/packet_receipts/{sequence}
         */
        this.queryPacketReceipt = (channelId, portId, sequence, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/packet_receipts/${sequence}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryUpgrade
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/upgrade
         */
        this.queryUpgrade = (channelId, portId, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/upgrade`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryUpgradeError
         * @request GET:/ibc/core/channel/v1/channels/{channel_id}/ports/{port_id}/upgrade_error
         */
        this.queryUpgradeError = (channelId, portId, params = {}) => this.request({
            path: `/ibc/core/channel/v1/channels/${channelId}/ports/${portId}/upgrade_error`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryConnectionChannels
         * @request GET:/ibc/core/channel/v1/connections/{connection}/channels
         */
        this.queryConnectionChannels = (connection, query, params = {}) => this.request({
            path: `/ibc/core/channel/v1/connections/${connection}/channels`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryChannelParams
         * @request GET:/ibc/core/channel/v1/params
         */
        this.queryChannelParams = (params = {}) => this.request({
            path: `/ibc/core/channel/v1/params`,
            method: "GET",
            ...params,
        });
    }
}
