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
export var State;
(function (State) {
    State["STATE_UNINITIALIZED_UNSPECIFIED"] = "STATE_UNINITIALIZED_UNSPECIFIED";
    State["STATE_INIT"] = "STATE_INIT";
    State["STATE_TRYOPEN"] = "STATE_TRYOPEN";
    State["STATE_OPEN"] = "STATE_OPEN";
})(State || (State = {}));
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
 * @title HTTP API Console ibc.core.connection.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryClientConnections
         * @request GET:/ibc/core/connection/v1/client_connections/{client_id}
         */
        this.queryClientConnections = (clientId, params = {}) => this.request({
            path: `/ibc/core/connection/v1/client_connections/${clientId}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryConnections
         * @request GET:/ibc/core/connection/v1/connections
         */
        this.queryConnections = (query, params = {}) => this.request({
            path: `/ibc/core/connection/v1/connections`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryConnection
         * @request GET:/ibc/core/connection/v1/connections/{connection_id}
         */
        this.queryConnection = (connectionId, params = {}) => this.request({
            path: `/ibc/core/connection/v1/connections/${connectionId}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryConnectionClientState
         * @request GET:/ibc/core/connection/v1/connections/{connection_id}/client_state
         */
        this.queryConnectionClientState = (connectionId, params = {}) => this.request({
            path: `/ibc/core/connection/v1/connections/${connectionId}/client_state`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryConnectionConsensusState
         * @request GET:/ibc/core/connection/v1/connections/{connection_id}/consensus_state/revision/{revision_number}/height/{revision_height}
         */
        this.queryConnectionConsensusState = (connectionId, revisionNumber, revisionHeight, params = {}) => this.request({
            path: `/ibc/core/connection/v1/connections/${connectionId}/consensus_state/revision/${revisionNumber}/height/${revisionHeight}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryConnectionParams
         * @request GET:/ibc/core/connection/v1/params
         */
        this.queryConnectionParams = (params = {}) => this.request({
            path: `/ibc/core/connection/v1/params`,
            method: "GET",
            ...params,
        });
    }
}
