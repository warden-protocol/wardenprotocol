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
export var BroadcastMode;
(function (BroadcastMode) {
    BroadcastMode["BROADCAST_MODE_UNSPECIFIED"] = "BROADCAST_MODE_UNSPECIFIED";
    BroadcastMode["BROADCAST_MODE_BLOCK"] = "BROADCAST_MODE_BLOCK";
    BroadcastMode["BROADCAST_MODE_SYNC"] = "BROADCAST_MODE_SYNC";
    BroadcastMode["BROADCAST_MODE_ASYNC"] = "BROADCAST_MODE_ASYNC";
})(BroadcastMode || (BroadcastMode = {}));
export var OrderBy;
(function (OrderBy) {
    OrderBy["ORDER_BY_UNSPECIFIED"] = "ORDER_BY_UNSPECIFIED";
    OrderBy["ORDER_BY_ASC"] = "ORDER_BY_ASC";
    OrderBy["ORDER_BY_DESC"] = "ORDER_BY_DESC";
})(OrderBy || (OrderBy = {}));
export var SignMode;
(function (SignMode) {
    SignMode["SIGN_MODE_UNSPECIFIED"] = "SIGN_MODE_UNSPECIFIED";
    SignMode["SIGN_MODE_DIRECT"] = "SIGN_MODE_DIRECT";
    SignMode["SIGN_MODE_TEXTUAL"] = "SIGN_MODE_TEXTUAL";
    SignMode["SIGN_MODE_DIRECT_AUX"] = "SIGN_MODE_DIRECT_AUX";
    SignMode["SIGN_MODE_LEGACY_AMINO_JSON"] = "SIGN_MODE_LEGACY_AMINO_JSON";
    SignMode["SIGNMODEEIP191"] = "SIGN_MODE_EIP_191";
})(SignMode || (SignMode = {}));
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
 * @title HTTP API Console cosmos.tx.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Service
         * @name ServiceTxDecode
         * @request POST:/cosmos/tx/v1beta1/decode
         */
        this.serviceTxDecode = (body, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/decode`,
            method: "POST",
            body: body,
            type: ContentType.Json,
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceTxDecodeAmino
         * @request POST:/cosmos/tx/v1beta1/decode/amino
         */
        this.serviceTxDecodeAmino = (body, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/decode/amino`,
            method: "POST",
            body: body,
            type: ContentType.Json,
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceTxEncode
         * @request POST:/cosmos/tx/v1beta1/encode
         */
        this.serviceTxEncode = (body, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/encode`,
            method: "POST",
            body: body,
            type: ContentType.Json,
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceTxEncodeAmino
         * @request POST:/cosmos/tx/v1beta1/encode/amino
         */
        this.serviceTxEncodeAmino = (body, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/encode/amino`,
            method: "POST",
            body: body,
            type: ContentType.Json,
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceSimulate
         * @request POST:/cosmos/tx/v1beta1/simulate
         */
        this.serviceSimulate = (body, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/simulate`,
            method: "POST",
            body: body,
            type: ContentType.Json,
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetTxsEvent
         * @request GET:/cosmos/tx/v1beta1/txs
         */
        this.serviceGetTxsEvent = (query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceBroadcastTx
         * @request POST:/cosmos/tx/v1beta1/txs
         */
        this.serviceBroadcastTx = (body, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs`,
            method: "POST",
            body: body,
            type: ContentType.Json,
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetBlockWithTxs
         * @request GET:/cosmos/tx/v1beta1/txs/block/{height}
         */
        this.serviceGetBlockWithTxs = (height, query, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs/block/${height}`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Service
         * @name ServiceGetTx
         * @request GET:/cosmos/tx/v1beta1/txs/{hash}
         */
        this.serviceGetTx = (hash, params = {}) => this.request({
            path: `/cosmos/tx/v1beta1/txs/${hash}`,
            method: "GET",
            ...params,
        });
    }
}
