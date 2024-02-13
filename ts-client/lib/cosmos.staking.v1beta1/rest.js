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
export var BondStatus;
(function (BondStatus) {
    BondStatus["BOND_STATUS_UNSPECIFIED"] = "BOND_STATUS_UNSPECIFIED";
    BondStatus["BOND_STATUS_UNBONDED"] = "BOND_STATUS_UNBONDED";
    BondStatus["BOND_STATUS_UNBONDING"] = "BOND_STATUS_UNBONDING";
    BondStatus["BOND_STATUS_BONDED"] = "BOND_STATUS_BONDED";
})(BondStatus || (BondStatus = {}));
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
 * @title HTTP API Console cosmos.staking.v1beta1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryDelegatorDelegations
         * @request GET:/cosmos/staking/v1beta1/delegations/{delegator_addr}
         */
        this.queryDelegatorDelegations = (delegatorAddr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/delegations/${delegatorAddr}`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryRedelegations
         * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/redelegations
         */
        this.queryRedelegations = (delegatorAddr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/redelegations`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDelegatorUnbondingDelegations
         * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/unbonding_delegations
         */
        this.queryDelegatorUnbondingDelegations = (delegatorAddr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/unbonding_delegations`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDelegatorValidators
         * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators
         */
        this.queryDelegatorValidators = (delegatorAddr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/validators`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDelegatorValidator
         * @request GET:/cosmos/staking/v1beta1/delegators/{delegator_addr}/validators/{validator_addr}
         */
        this.queryDelegatorValidator = (delegatorAddr, validatorAddr, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/delegators/${delegatorAddr}/validators/${validatorAddr}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryHistoricalInfo
         * @request GET:/cosmos/staking/v1beta1/historical_info/{height}
         */
        this.queryHistoricalInfo = (height, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/historical_info/${height}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryParams
         * @request GET:/cosmos/staking/v1beta1/params
         */
        this.queryParams = (params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/params`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryPool
         * @request GET:/cosmos/staking/v1beta1/pool
         */
        this.queryPool = (params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/pool`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryValidators
         * @request GET:/cosmos/staking/v1beta1/validators
         */
        this.queryValidators = (query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryValidator
         * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}
         */
        this.queryValidator = (validatorAddr, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators/${validatorAddr}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryValidatorDelegations
         * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations
         */
        this.queryValidatorDelegations = (validatorAddr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDelegation
         * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}
         */
        this.queryDelegation = (validatorAddr, delegatorAddr, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations/${delegatorAddr}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryUnbondingDelegation
         * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/delegations/{delegator_addr}/unbonding_delegation
         */
        this.queryUnbondingDelegation = (validatorAddr, delegatorAddr, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/delegations/${delegatorAddr}/unbonding_delegation`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryValidatorUnbondingDelegations
         * @request GET:/cosmos/staking/v1beta1/validators/{validator_addr}/unbonding_delegations
         */
        this.queryValidatorUnbondingDelegations = (validatorAddr, query, params = {}) => this.request({
            path: `/cosmos/staking/v1beta1/validators/${validatorAddr}/unbonding_delegations`,
            method: "GET",
            query: query,
            ...params,
        });
    }
}
