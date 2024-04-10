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
export var ProposalExecutorResult;
(function (ProposalExecutorResult) {
    ProposalExecutorResult["PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED"] = "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED";
    ProposalExecutorResult["PROPOSAL_EXECUTOR_RESULT_NOT_RUN"] = "PROPOSAL_EXECUTOR_RESULT_NOT_RUN";
    ProposalExecutorResult["PROPOSAL_EXECUTOR_RESULT_SUCCESS"] = "PROPOSAL_EXECUTOR_RESULT_SUCCESS";
    ProposalExecutorResult["PROPOSAL_EXECUTOR_RESULT_FAILURE"] = "PROPOSAL_EXECUTOR_RESULT_FAILURE";
})(ProposalExecutorResult || (ProposalExecutorResult = {}));
export var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus["PROPOSAL_STATUS_UNSPECIFIED"] = "PROPOSAL_STATUS_UNSPECIFIED";
    ProposalStatus["PROPOSAL_STATUS_SUBMITTED"] = "PROPOSAL_STATUS_SUBMITTED";
    ProposalStatus["PROPOSAL_STATUS_ACCEPTED"] = "PROPOSAL_STATUS_ACCEPTED";
    ProposalStatus["PROPOSAL_STATUS_REJECTED"] = "PROPOSAL_STATUS_REJECTED";
    ProposalStatus["PROPOSAL_STATUS_ABORTED"] = "PROPOSAL_STATUS_ABORTED";
    ProposalStatus["PROPOSAL_STATUS_WITHDRAWN"] = "PROPOSAL_STATUS_WITHDRAWN";
})(ProposalStatus || (ProposalStatus = {}));
export var VoteOption;
(function (VoteOption) {
    VoteOption["VOTE_OPTION_UNSPECIFIED"] = "VOTE_OPTION_UNSPECIFIED";
    VoteOption["VOTE_OPTION_YES"] = "VOTE_OPTION_YES";
    VoteOption["VOTE_OPTION_ABSTAIN"] = "VOTE_OPTION_ABSTAIN";
    VoteOption["VOTE_OPTION_NO"] = "VOTE_OPTION_NO";
    VoteOption["VOTE_OPTION_NO_WITH_VETO"] = "VOTE_OPTION_NO_WITH_VETO";
})(VoteOption || (VoteOption = {}));
export var V1Exec;
(function (V1Exec) {
    V1Exec["EXEC_UNSPECIFIED"] = "EXEC_UNSPECIFIED";
    V1Exec["EXEC_TRY"] = "EXEC_TRY";
})(V1Exec || (V1Exec = {}));
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
 * @title HTTP API Console cosmos.group.v1
 */
export class Api extends HttpClient {
    constructor() {
        super(...arguments);
        /**
         * No description
         *
         * @tags Query
         * @name QueryGroupInfo
         * @request GET:/cosmos/group/v1/group_info/{group_id}
         */
        this.queryGroupInfo = (groupId, params = {}) => this.request({
            path: `/cosmos/group/v1/group_info/${groupId}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryGroupMembers
         * @request GET:/cosmos/group/v1/group_members/{group_id}
         */
        this.queryGroupMembers = (groupId, query, params = {}) => this.request({
            path: `/cosmos/group/v1/group_members/${groupId}`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryGroupPoliciesByAdmin
         * @request GET:/cosmos/group/v1/group_policies_by_admin/{admin}
         */
        this.queryGroupPoliciesByAdmin = (admin, query, params = {}) => this.request({
            path: `/cosmos/group/v1/group_policies_by_admin/${admin}`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryGroupPoliciesByGroup
         * @request GET:/cosmos/group/v1/group_policies_by_group/{group_id}
         */
        this.queryGroupPoliciesByGroup = (groupId, query, params = {}) => this.request({
            path: `/cosmos/group/v1/group_policies_by_group/${groupId}`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryGroupPolicyInfo
         * @request GET:/cosmos/group/v1/group_policy_info/{address}
         */
        this.queryGroupPolicyInfo = (address, params = {}) => this.request({
            path: `/cosmos/group/v1/group_policy_info/${address}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryGroups
         * @request GET:/cosmos/group/v1/groups
         */
        this.queryGroups = (query, params = {}) => this.request({
            path: `/cosmos/group/v1/groups`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryGroupsByAdmin
         * @request GET:/cosmos/group/v1/groups_by_admin/{admin}
         */
        this.queryGroupsByAdmin = (admin, query, params = {}) => this.request({
            path: `/cosmos/group/v1/groups_by_admin/${admin}`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryGroupsByMember
         * @request GET:/cosmos/group/v1/groups_by_member/{address}
         */
        this.queryGroupsByMember = (address, query, params = {}) => this.request({
            path: `/cosmos/group/v1/groups_by_member/${address}`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryProposal
         * @request GET:/cosmos/group/v1/proposal/{proposal_id}
         */
        this.queryProposal = (proposalId, params = {}) => this.request({
            path: `/cosmos/group/v1/proposal/${proposalId}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryTallyResult
         * @request GET:/cosmos/group/v1/proposals/{proposal_id}/tally
         */
        this.queryTallyResult = (proposalId, params = {}) => this.request({
            path: `/cosmos/group/v1/proposals/${proposalId}/tally`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryProposalsByGroupPolicy
         * @request GET:/cosmos/group/v1/proposals_by_group_policy/{address}
         */
        this.queryProposalsByGroupPolicy = (address, query, params = {}) => this.request({
            path: `/cosmos/group/v1/proposals_by_group_policy/${address}`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryVoteByProposalVoter
         * @request GET:/cosmos/group/v1/vote_by_proposal_voter/{proposal_id}/{voter}
         */
        this.queryVoteByProposalVoter = (proposalId, voter, params = {}) => this.request({
            path: `/cosmos/group/v1/vote_by_proposal_voter/${proposalId}/${voter}`,
            method: "GET",
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryVotesByProposal
         * @request GET:/cosmos/group/v1/votes_by_proposal/{proposal_id}
         */
        this.queryVotesByProposal = (proposalId, query, params = {}) => this.request({
            path: `/cosmos/group/v1/votes_by_proposal/${proposalId}`,
            method: "GET",
            query: query,
            ...params,
        });
        /**
         * No description
         *
         * @tags Query
         * @name QueryVotesByVoter
         * @request GET:/cosmos/group/v1/votes_by_voter/{voter}
         */
        this.queryVotesByVoter = (voter, query, params = {}) => this.request({
            path: `/cosmos/group/v1/votes_by_voter/${voter}`,
            method: "GET",
            query: query,
            ...params,
        });
    }
}
