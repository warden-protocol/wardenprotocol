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
export var BlockIDFlag;
(function (BlockIDFlag) {
    BlockIDFlag["BLOCK_ID_FLAG_UNKNOWN"] = "BLOCK_ID_FLAG_UNKNOWN";
    BlockIDFlag["BLOCK_ID_FLAG_ABSENT"] = "BLOCK_ID_FLAG_ABSENT";
    BlockIDFlag["BLOCK_ID_FLAG_COMMIT"] = "BLOCK_ID_FLAG_COMMIT";
    BlockIDFlag["BLOCK_ID_FLAG_NIL"] = "BLOCK_ID_FLAG_NIL";
})(BlockIDFlag || (BlockIDFlag = {}));
export var SignedMsgType;
(function (SignedMsgType) {
    SignedMsgType["SIGNED_MSG_TYPE_UNKNOWN"] = "SIGNED_MSG_TYPE_UNKNOWN";
    SignedMsgType["SIGNED_MSG_TYPE_PREVOTE"] = "SIGNED_MSG_TYPE_PREVOTE";
    SignedMsgType["SIGNED_MSG_TYPE_PRECOMMIT"] = "SIGNED_MSG_TYPE_PRECOMMIT";
    SignedMsgType["SIGNED_MSG_TYPE_PROPOSAL"] = "SIGNED_MSG_TYPE_PROPOSAL";
})(SignedMsgType || (SignedMsgType = {}));
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
 * @title HTTP API Console cosmos.base.tendermint.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Service
         * @name ServiceAbciQuery
         * @request GET:/cosmos/base/tendermint/v1beta1/abci_query
         */
        this.serviceABCIQuery = (query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/abci_query`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetLatestBlock
         * @request GET:/cosmos/base/tendermint/v1beta1/blocks/latest
         */
        this.serviceGetLatestBlock = (params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/blocks/latest`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetBlockByHeight
         * @request GET:/cosmos/base/tendermint/v1beta1/blocks/{height}
         */
        this.serviceGetBlockByHeight = (height, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/blocks/${height}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetNodeInfo
         * @request GET:/cosmos/base/tendermint/v1beta1/node_info
         */
        this.serviceGetNodeInfo = (params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/node_info`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetSyncing
         * @request GET:/cosmos/base/tendermint/v1beta1/syncing
         */
        this.serviceGetSyncing = (params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/syncing`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetLatestValidatorSet
         * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/latest
         */
        this.serviceGetLatestValidatorSet = (query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/validatorsets/latest`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetValidatorSetByHeight
         * @request GET:/cosmos/base/tendermint/v1beta1/validatorsets/{height}
         */
        this.serviceGetValidatorSetByHeight = (height, query, params = {}) => this.request({
            path: `/cosmos/base/tendermint/v1beta1/validatorsets/${height}`,
            method: "GET",
            query: query,
            ...params,
        });
    }
}
