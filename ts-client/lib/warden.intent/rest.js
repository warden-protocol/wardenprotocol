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
export var ActionStatus;
(function (ActionStatus) {
    ActionStatus["ACTION_STATUS_UNSPECIFIED"] = "ACTION_STATUS_UNSPECIFIED";
    ActionStatus["ACTION_STATUS_PENDING"] = "ACTION_STATUS_PENDING";
    ActionStatus["ACTION_STATUS_COMPLETED"] = "ACTION_STATUS_COMPLETED";
    ActionStatus["ACTION_STATUS_REVOKED"] = "ACTION_STATUS_REVOKED";
    ActionStatus["ACTION_STATUS_TIMEOUT"] = "ACTION_STATUS_TIMEOUT";
})(ActionStatus || (ActionStatus = {}));
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
 * @title HTTP API Console warden.intent
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryActions
         * @request GET:/wardenprotocol/warden/intent/actions
         */
        this.queryActions = (query, params = {}) => this.request({
            path: `/wardenprotocol/warden/intent/actions`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryActionsByAddress
         * @request GET:/wardenprotocol/warden/intent/actions_by_address
         */
        this.queryActionsByAddress = (query, params = {}) => this.request({
            path: `/wardenprotocol/warden/intent/actions_by_address`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryIntentById
         * @request GET:/wardenprotocol/warden/intent/intent_by_id
         */
        this.queryIntentById = (query, params = {}) => this.request({
            path: `/wardenprotocol/warden/intent/intent_by_id`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryIntents
         * @request GET:/wardenprotocol/warden/intent/intents
         */
        this.queryIntents = (query, params = {}) => this.request({
            path: `/wardenprotocol/warden/intent/intents`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryParams
         * @request GET:/wardenprotocol/warden/intent/params
         */
        this.queryParams = (params = {}) => this.request({
            path: `/wardenprotocol/warden/intent/params`,
            method: "GET",
            ...params,
        });
    }
}
