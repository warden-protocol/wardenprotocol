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
export var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus["PROPOSAL_STATUS_UNSPECIFIED"] = "PROPOSAL_STATUS_UNSPECIFIED";
    ProposalStatus["PROPOSAL_STATUS_DEPOSIT_PERIOD"] = "PROPOSAL_STATUS_DEPOSIT_PERIOD";
    ProposalStatus["PROPOSAL_STATUS_VOTING_PERIOD"] = "PROPOSAL_STATUS_VOTING_PERIOD";
    ProposalStatus["PROPOSAL_STATUS_PASSED"] = "PROPOSAL_STATUS_PASSED";
    ProposalStatus["PROPOSAL_STATUS_REJECTED"] = "PROPOSAL_STATUS_REJECTED";
    ProposalStatus["PROPOSAL_STATUS_FAILED"] = "PROPOSAL_STATUS_FAILED";
})(ProposalStatus || (ProposalStatus = {}));
export var VoteOption;
(function (VoteOption) {
    VoteOption["VOTE_OPTION_UNSPECIFIED"] = "VOTE_OPTION_UNSPECIFIED";
    VoteOption["VOTE_OPTION_YES"] = "VOTE_OPTION_YES";
    VoteOption["VOTE_OPTION_ABSTAIN"] = "VOTE_OPTION_ABSTAIN";
    VoteOption["VOTE_OPTION_NO"] = "VOTE_OPTION_NO";
    VoteOption["VOTE_OPTION_NO_WITH_VETO"] = "VOTE_OPTION_NO_WITH_VETO";
})(VoteOption || (VoteOption = {}));
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
 * @title HTTP API Console cosmos.gov.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryConstitution
         * @request GET:/cosmos/gov/v1/constitution
         */
        this.queryConstitution = (params = {}) => this.request({
            path: `/cosmos/gov/v1/constitution`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryParams
         * @request GET:/cosmos/gov/v1/params/{params_type}
         */
        this.queryParams = (paramsType, params = {}) => this.request({
            path: `/cosmos/gov/v1/params/${paramsType}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryProposals
         * @request GET:/cosmos/gov/v1/proposals
         */
        this.queryProposals = (query, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryProposal
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}
         */
        this.queryProposal = (proposalId, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposalId}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDeposits
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/deposits
         */
        this.queryDeposits = (proposalId, query, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposalId}/deposits`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryDeposit
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/deposits/{depositor}
         */
        this.queryDeposit = (proposalId, depositor, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposalId}/deposits/${depositor}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryTallyResult
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/tally
         */
        this.queryTallyResult = (proposalId, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposalId}/tally`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryVotes
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/votes
         */
        this.queryVotes = (proposalId, query, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposalId}/votes`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryVote
         * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/votes/{voter}
         */
        this.queryVote = (proposalId, voter, params = {}) => this.request({
            path: `/cosmos/gov/v1/proposals/${proposalId}/votes/${voter}`,
            method: "GET",
            ...params,
        });
    }
}
