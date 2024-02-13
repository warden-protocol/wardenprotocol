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
 * @title HTTP API Console ibc.applications.fee.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryFeeEnabledChannel
         * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/ports/{port_id}/fee_enabled
         */
        this.queryFeeEnabledChannel = (channelId, portId, params = {}) => this.request({
            path: `/ibc/apps/fee/v1/channels/${channelId}/ports/${portId}/fee_enabled`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryIncentivizedPacketsForChannel
         * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/ports/{port_id}/incentivized_packets
         */
        this.queryIncentivizedPacketsForChannel = (channelId, portId, query, params = {}) => this.request({
            path: `/ibc/apps/fee/v1/channels/${channelId}/ports/${portId}/incentivized_packets`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryCounterpartyPayee
         * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/relayers/{relayer}/counterparty_payee
         */
        this.queryCounterpartyPayee = (channelId, relayer, params = {}) => this.request({
            path: `/ibc/apps/fee/v1/channels/${channelId}/relayers/${relayer}/counterparty_payee`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPayee
         * @request GET:/ibc/apps/fee/v1/channels/{channel_id}/relayers/{relayer}/payee
         */
        this.queryPayee = (channelId, relayer, params = {}) => this.request({
            path: `/ibc/apps/fee/v1/channels/${channelId}/relayers/${relayer}/payee`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryIncentivizedPacket
         * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/incentivized_packet
         */
        this.queryIncentivizedPacket = (packetIdChannelId, packetIdPortId, packetIdSequence, query, params = {}) => this.request({
            path: `/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/incentivized_packet`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryTotalAckFees
         * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_ack_fees
         */
        this.queryTotalAckFees = (packetIdChannelId, packetIdPortId, packetIdSequence, params = {}) => this.request({
            path: `/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_ack_fees`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryTotalRecvFees
         * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_recv_fees
         */
        this.queryTotalRecvFees = (packetIdChannelId, packetIdPortId, packetIdSequence, params = {}) => this.request({
            path: `/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_recv_fees`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryTotalTimeoutFees
         * @request GET:/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_timeout_fees
         */
        this.queryTotalTimeoutFees = (packetIdChannelId, packetIdPortId, packetIdSequence, params = {}) => this.request({
            path: `/ibc/apps/fee/v1/channels/{packet_id.channel_id}/ports/{packet_id.port_id}/sequences/{packet_id.sequence}/total_timeout_fees`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryFeeEnabledChannels
         * @request GET:/ibc/apps/fee/v1/fee_enabled
         */
        this.queryFeeEnabledChannels = (query, params = {}) => this.request({
            path: `/ibc/apps/fee/v1/fee_enabled`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryIncentivizedPackets
         * @request GET:/ibc/apps/fee/v1/incentivized_packets
         */
        this.queryIncentivizedPackets = (query, params = {}) => this.request({
            path: `/ibc/apps/fee/v1/incentivized_packets`,
            method: "GET",
            query: query,
            ...params,
        });
    }
}
