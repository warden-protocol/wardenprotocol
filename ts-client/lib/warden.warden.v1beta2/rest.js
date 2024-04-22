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
export var AddressType;
(function (AddressType) {
    AddressType["ADDRESS_TYPE_UNSPECIFIED"] = "ADDRESS_TYPE_UNSPECIFIED";
    AddressType["ADDRESS_TYPE_ETHEREUM"] = "ADDRESS_TYPE_ETHEREUM";
    AddressType["ADDRESS_TYPE_OSMOSIS"] = "ADDRESS_TYPE_OSMOSIS";
})(AddressType || (AddressType = {}));
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
export var ActionStatus;
(function (ActionStatus) {
    ActionStatus["ACTION_STATUS_UNSPECIFIED"] = "ACTION_STATUS_UNSPECIFIED";
    ActionStatus["ACTION_STATUS_PENDING"] = "ACTION_STATUS_PENDING";
    ActionStatus["ACTION_STATUS_COMPLETED"] = "ACTION_STATUS_COMPLETED";
    ActionStatus["ACTION_STATUS_REVOKED"] = "ACTION_STATUS_REVOKED";
    ActionStatus["ACTION_STATUS_TIMEOUT"] = "ACTION_STATUS_TIMEOUT";
})(ActionStatus || (ActionStatus = {}));
export var SignMethod;
(function (SignMethod) {
    SignMethod["SIGN_METHOD_BLACK_BOX"] = "SIGN_METHOD_BLACK_BOX";
    SignMethod["SIGN_METHOD_ETH"] = "SIGN_METHOD_ETH";
    SignMethod["SIGN_METHOD_OSMOSIS"] = "SIGN_METHOD_OSMOSIS";
})(SignMethod || (SignMethod = {}));
export var TokenType;
(function (TokenType) {
    TokenType["ILLEGAL"] = "ILLEGAL";
    TokenType["EOF"] = "EOF";
    TokenType["IDENT"] = "IDENT";
    TokenType["INT"] = "INT";
    TokenType["COMMA"] = "COMMA";
    TokenType["SEMICOLON"] = "SEMICOLON";
    TokenType["LPAREN"] = "LPAREN";
    TokenType["RPAREN"] = "RPAREN";
    TokenType["LBRACKET"] = "LBRACKET";
    TokenType["RBRACKET"] = "RBRACKET";
    TokenType["AND"] = "AND";
    TokenType["OR"] = "OR";
    TokenType["TRUE"] = "TRUE";
    TokenType["FALSE"] = "FALSE";
})(TokenType || (TokenType = {}));
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
 * @title HTTP API Console warden.warden.v1beta2
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QuerySignatureRequests
         * @request GET:/warden/warden/v1beta2/get_signature_requests
         */
        this.querySignatureRequests = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/get_signature_requests`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeyById
         * @request GET:/warden/warden/v1beta2/key_by_id
         */
        this.queryKeyById = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/key_by_id`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeyRequestById
         * @request GET:/warden/warden/v1beta2/key_request_by_id
         */
        this.queryKeyRequestById = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/key_request_by_id`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeyRequests
         * @request GET:/warden/warden/v1beta2/key_requests
         */
        this.queryKeyRequests = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/key_requests`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeychainById
         * @request GET:/warden/warden/v1beta2/keychain_by_id
         */
        this.queryKeychainById = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/keychain_by_id`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeychains
         * @request GET:/warden/warden/v1beta2/keychains
         */
        this.queryKeychains = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/keychains`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryAllKeys
         * @request GET:/warden/warden/v1beta2/keys
         */
        this.queryAllKeys = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/keys`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryKeysBySpaceId
         * @request GET:/warden/warden/v1beta2/keys_by_space_id
         */
        this.queryKeysBySpaceId = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/keys_by_space_id`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryParams
         * @request GET:/warden/warden/v1beta2/params
         */
        this.queryParams = (params = {}) => this.request({
            path: `/warden/warden/v1beta2/params`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySignatureRequestById
         * @request GET:/warden/warden/v1beta2/signature_pb_request_by_id
         */
        this.querySignatureRequestById = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/signature_pb_request_by_id`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySpaceById
         * @request GET:/warden/warden/v1beta2/space_by_address
         */
        this.querySpaceById = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/space_by_address`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySpaces
         * @request GET:/warden/warden/v1beta2/spaces
         */
        this.querySpaces = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/spaces`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QuerySpacesByOwner
         * @request GET:/warden/warden/v1beta2/spaces_by_owner
         */
        this.querySpacesByOwner = (query, params = {}) => this.request({
            path: `/warden/warden/v1beta2/spaces_by_owner`,
            method: "GET",
            query: query,
            ...params,
        });
    }
}
