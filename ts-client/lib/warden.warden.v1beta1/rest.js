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
export var KeyRequestStatus;
(function (KeyRequestStatus) {
    KeyRequestStatus["KEY_REQUEST_STATUS_UNSPECIFIED"] = "KEY_REQUEST_STATUS_UNSPECIFIED";
    KeyRequestStatus["KEY_REQUEST_STATUS_PENDING"] = "KEY_REQUEST_STATUS_PENDING";
    KeyRequestStatus["KEY_REQUEST_STATUS_FULFILLED"] = "KEY_REQUEST_STATUS_FULFILLED";
    KeyRequestStatus["KEY_REQUEST_STATUS_REJECTED"] = "KEY_REQUEST_STATUS_REJECTED";
})(KeyRequestStatus || (KeyRequestStatus = {}));
export var KeyType;
(function (KeyType) {
    KeyType["KEY_TYPE_UNSPECIFIED"] = "KEY_TYPE_UNSPECIFIED";
    KeyType["KEYTYPEECDSASECP256K1"] = "KEY_TYPE_ECDSA_SECP256K1";
    KeyType["KEYTYPEEDDSAED25519"] = "KEY_TYPE_EDDSA_ED25519";
})(KeyType || (KeyType = {}));
export var SignRequestStatus;
(function (SignRequestStatus) {
    SignRequestStatus["SIGN_REQUEST_STATUS_UNSPECIFIED"] = "SIGN_REQUEST_STATUS_UNSPECIFIED";
    SignRequestStatus["SIGN_REQUEST_STATUS_PENDING"] = "SIGN_REQUEST_STATUS_PENDING";
    SignRequestStatus["SIGN_REQUEST_STATUS_FULFILLED"] = "SIGN_REQUEST_STATUS_FULFILLED";
    SignRequestStatus["SIGN_REQUEST_STATUS_REJECTED"] = "SIGN_REQUEST_STATUS_REJECTED";
})(SignRequestStatus || (SignRequestStatus = {}));
export var WalletType;
(function (WalletType) {
    WalletType["WALLET_TYPE_UNSPECIFIED"] = "WALLET_TYPE_UNSPECIFIED";
    WalletType["WALLET_TYPE_ETH"] = "WALLET_TYPE_ETH";
    WalletType["WALLET_TYPE_CELESTIA"] = "WALLET_TYPE_CELESTIA";
    WalletType["WALLET_TYPE_SUI"] = "WALLET_TYPE_SUI";
})(WalletType || (WalletType = {}));
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
 * @title HTTP API Console warden.warden.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QuerySignatureRequests
         * @request GET:/warden/warden/v1beta1/get_signature_requests
         */
        this.querySignatureRequests = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/get_signature_requests`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeyRequestById
         * @request GET:/warden/warden/v1beta1/key_request_by_id
         */
        this.queryKeyRequestById = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/key_request_by_id`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeyRequests
         * @request GET:/warden/warden/v1beta1/key_requests
         */
        this.queryKeyRequests = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/key_requests`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeychainByAddress
         * @request GET:/warden/warden/v1beta1/keychain_by_address
         */
        this.queryKeychainByAddress = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/keychain_by_address`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeychains
         * @request GET:/warden/warden/v1beta1/keychains
         */
        this.queryKeychains = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/keychains`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeys
         * @request GET:/warden/warden/v1beta1/keys
         */
        this.queryKeys = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/keys`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryParams
         * @request GET:/warden/warden/v1beta1/params
         */
        this.queryParams = (params = {}) => this.request({
            path: `/warden/warden/v1beta1/params`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySignTransactionRequestById
         * @request GET:/warden/warden/v1beta1/sign_transaction_request_by_id
         */
        this.querySignTransactionRequestById = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/sign_transaction_request_by_id`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySignTransactionRequests
         * @request GET:/warden/warden/v1beta1/sign_transaction_requests
         */
        this.querySignTransactionRequests = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/sign_transaction_requests`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySignatureRequestById
         * @request GET:/warden/warden/v1beta1/signature_pb_request_by_id
         */
        this.querySignatureRequestById = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/signature_pb_request_by_id`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySpaceByAddress
         * @request GET:/warden/warden/v1beta1/space_by_address
         */
        this.querySpaceByAddress = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/space_by_address`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySpaces
         * @request GET:/warden/warden/v1beta1/spaces
         */
        this.querySpaces = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/spaces`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySpacesByOwner
         * @request GET:/warden/warden/v1beta1/spaces_by_owner
         */
        this.querySpacesByOwner = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta1/spaces_by_owner`,
            method: "GET",
            query: query,
            ...params,
        });
    }
}
