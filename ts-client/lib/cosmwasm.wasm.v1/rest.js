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
export var AccessType;
(function (AccessType) {
    AccessType["ACCESS_TYPE_UNSPECIFIED"] = "ACCESS_TYPE_UNSPECIFIED";
    AccessType["ACCESS_TYPE_NOBODY"] = "ACCESS_TYPE_NOBODY";
    AccessType["ACCESS_TYPE_EVERYBODY"] = "ACCESS_TYPE_EVERYBODY";
    AccessType["ACCESS_TYPE_ANY_OF_ADDRESSES"] = "ACCESS_TYPE_ANY_OF_ADDRESSES";
})(AccessType || (AccessType = {}));
export var ContractCodeHistoryOperationType;
(function (ContractCodeHistoryOperationType) {
    ContractCodeHistoryOperationType["CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED"] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED";
    ContractCodeHistoryOperationType["CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT"] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT";
    ContractCodeHistoryOperationType["CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE"] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE";
    ContractCodeHistoryOperationType["CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS"] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS";
})(ContractCodeHistoryOperationType || (ContractCodeHistoryOperationType = {}));
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
 * @title HTTP API Console cosmwasm.wasm.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryCodes
         * @request GET:/cosmwasm/wasm/v1/code
         */
        this.queryCodes = (query, params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/code`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryCode
         * @request GET:/cosmwasm/wasm/v1/code/{code_id}
         */
        this.queryCode = (codeId, params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/code/${codeId}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryContractsByCode
         * @request GET:/cosmwasm/wasm/v1/code/{code_id}/contracts
         */
        this.queryContractsByCode = (codeId, query, params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/code/${codeId}/contracts`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryParams
         * @request GET:/cosmwasm/wasm/v1/codes/params
         */
        this.queryParams = (params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/codes/params`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPinnedCodes
         * @request GET:/cosmwasm/wasm/v1/codes/pinned
         */
        this.queryPinnedCodes = (query, params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/codes/pinned`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryContractInfo
         * @request GET:/cosmwasm/wasm/v1/contract/{address}
         */
        this.queryContractInfo = (address, params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/contract/${address}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryContractHistory
         * @request GET:/cosmwasm/wasm/v1/contract/{address}/history
         */
        this.queryContractHistory = (address, query, params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/contract/${address}/history`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRawContractState
         * @request GET:/cosmwasm/wasm/v1/contract/{address}/raw/{query_data}
         */
        this.queryRawContractState = (address, queryData, params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/contract/${address}/raw/${queryData}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySmartContractState
         * @request GET:/cosmwasm/wasm/v1/contract/{address}/smart/{query_data}
         */
        this.querySmartContractState = (address, queryData, params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/contract/${address}/smart/${queryData}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryAllContractState
         * @request GET:/cosmwasm/wasm/v1/contract/{address}/state
         */
        this.queryAllContractState = (address, query, params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/contract/${address}/state`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryContractsByCreator
         * @request GET:/cosmwasm/wasm/v1/contracts/creator/{creator_address}
         */
        this.queryContractsByCreator = (creatorAddress, query, params = {}) => this.request({
            path: `/cosmwasm/wasm/v1/contracts/creator/${creatorAddress}`,
            method: "GET",
            query: query,
            ...params,
        });
    }
}
