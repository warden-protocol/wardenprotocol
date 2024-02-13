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
 * @title HTTP API Console cosmos.auth.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryAccountInfo
         * @request GET:/cosmos/auth/v1beta1/account_info/{address}
         */
        this.queryAccountInfo = (address, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/account_info/${address}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryAccounts
         * @request GET:/cosmos/auth/v1beta1/accounts
         */
        this.queryAccounts = (query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/accounts`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryAccount
         * @request GET:/cosmos/auth/v1beta1/accounts/{address}
         */
        this.queryAccount = (address, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/accounts/${address}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryAccountAddressById
         * @request GET:/cosmos/auth/v1beta1/address_by_id/{id}
         */
        this.queryAccountAddressByID = (id, query, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/address_by_id/${id}`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryBech32Prefix
         * @request GET:/cosmos/auth/v1beta1/bech32
         */
        this.queryBech32Prefix = (params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/bech32`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryAddressBytesToString
         * @request GET:/cosmos/auth/v1beta1/bech32/{address_bytes}
         */
        this.queryAddressBytesToString = (addressBytes, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/bech32/${addressBytes}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryAddressStringToBytes
         * @request GET:/cosmos/auth/v1beta1/bech32/{address_string}
         */
        this.queryAddressStringToBytes = (addressString, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/bech32/${addressString}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryModuleAccounts
         * @request GET:/cosmos/auth/v1beta1/module_accounts
         */
        this.queryModuleAccounts = (params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/module_accounts`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryModuleAccountByName
         * @request GET:/cosmos/auth/v1beta1/module_accounts/{name}
         */
        this.queryModuleAccountByName = (name, params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/module_accounts/${name}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryParams
         * @request GET:/cosmos/auth/v1beta1/params
         */
        this.queryParams = (params = {}) => this.request({
            path: `/cosmos/auth/v1beta1/params`,
            method: "GET",
            ...params,
        });
    }
}
