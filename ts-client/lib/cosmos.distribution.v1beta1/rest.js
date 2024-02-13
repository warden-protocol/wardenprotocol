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
 * @title HTTP API Console cosmos.distribution.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryCommunityPool
         * @request GET:/cosmos/distribution/v1beta1/community_pool
         */
        this.queryCommunityPool = (params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/community_pool`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDelegationTotalRewards
         * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards
         */
        this.queryDelegationTotalRewards = (delegatorAddress, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDelegationRewards
         * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/rewards/{validator_address}
         */
        this.queryDelegationRewards = (delegatorAddress, validatorAddress, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/rewards/${validatorAddress}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDelegatorValidators
         * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/validators
         */
        this.queryDelegatorValidators = (delegatorAddress, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/validators`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDelegatorWithdrawAddress
         * @request GET:/cosmos/distribution/v1beta1/delegators/{delegator_address}/withdraw_address
         */
        this.queryDelegatorWithdrawAddress = (delegatorAddress, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/delegators/${delegatorAddress}/withdraw_address`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryParams
         * @request GET:/cosmos/distribution/v1beta1/params
         */
        this.queryParams = (params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/params`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryValidatorDistributionInfo
         * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}
         */
        this.queryValidatorDistributionInfo = (validatorAddress, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryValidatorCommission
         * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/commission
         */
        this.queryValidatorCommission = (validatorAddress, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/commission`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryValidatorOutstandingRewards
         * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/outstanding_rewards
         */
        this.queryValidatorOutstandingRewards = (validatorAddress, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/outstanding_rewards`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryValidatorSlashes
         * @request GET:/cosmos/distribution/v1beta1/validators/{validator_address}/slashes
         */
        this.queryValidatorSlashes = (validatorAddress, query, params = {}) => this.request({
            path: `/cosmos/distribution/v1beta1/validators/${validatorAddress}/slashes`,
            method: "GET",
            query: query,
            ...params,
        });
    }
}
