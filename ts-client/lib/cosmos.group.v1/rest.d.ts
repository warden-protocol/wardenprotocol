export interface Any {
    "@type"?: string;
}
export interface Status {
    /** @format int32 */
    code?: number;
    message?: string;
    details?: {
        "@type"?: string;
    }[];
}
export interface GroupMember {
    /** @format uint64 */
    group_id?: string;
    member?: {
        address?: string;
        weight?: string;
        metadata?: string;
        added_at?: string;
    };
}
export interface Member {
    address?: string;
    weight?: string;
    metadata?: string;
    /** @format date-time */
    added_at?: string;
}
export interface PageRequest {
    /** @format byte */
    key?: string;
    /** @format uint64 */
    offset?: string;
    /** @format uint64 */
    limit?: string;
    count_total?: boolean;
    reverse?: boolean;
}
export interface PageResponse {
    /** @format byte */
    next_key?: string;
    /** @format uint64 */
    total?: string;
}
export declare enum ProposalExecutorResult {
    PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED = "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED",
    PROPOSAL_EXECUTOR_RESULT_NOT_RUN = "PROPOSAL_EXECUTOR_RESULT_NOT_RUN",
    PROPOSAL_EXECUTOR_RESULT_SUCCESS = "PROPOSAL_EXECUTOR_RESULT_SUCCESS",
    PROPOSAL_EXECUTOR_RESULT_FAILURE = "PROPOSAL_EXECUTOR_RESULT_FAILURE"
}
export declare enum ProposalStatus {
    PROPOSAL_STATUS_UNSPECIFIED = "PROPOSAL_STATUS_UNSPECIFIED",
    PROPOSAL_STATUS_SUBMITTED = "PROPOSAL_STATUS_SUBMITTED",
    PROPOSAL_STATUS_ACCEPTED = "PROPOSAL_STATUS_ACCEPTED",
    PROPOSAL_STATUS_REJECTED = "PROPOSAL_STATUS_REJECTED",
    PROPOSAL_STATUS_ABORTED = "PROPOSAL_STATUS_ABORTED",
    PROPOSAL_STATUS_WITHDRAWN = "PROPOSAL_STATUS_WITHDRAWN"
}
export interface QueryGroupInfoResponse {
    info?: {
        id?: string;
        admin?: string;
        metadata?: string;
        version?: string;
        total_weight?: string;
        created_at?: string;
    };
}
export interface QueryGroupMembersResponse {
    members?: {
        group_id?: string;
        member?: {
            address?: string;
            weight?: string;
            metadata?: string;
            added_at?: string;
        };
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryGroupPoliciesByAdminResponse {
    group_policies?: {
        address?: string;
        group_id?: string;
        admin?: string;
        metadata?: string;
        version?: string;
        decision_policy?: {
            "@type"?: string;
        };
        created_at?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryGroupPoliciesByGroupResponse {
    group_policies?: {
        address?: string;
        group_id?: string;
        admin?: string;
        metadata?: string;
        version?: string;
        decision_policy?: {
            "@type"?: string;
        };
        created_at?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryGroupPolicyInfoResponse {
    info?: {
        address?: string;
        group_id?: string;
        admin?: string;
        metadata?: string;
        version?: string;
        decision_policy?: {
            "@type"?: string;
        };
        created_at?: string;
    };
}
export interface QueryGroupsByAdminResponse {
    groups?: {
        id?: string;
        admin?: string;
        metadata?: string;
        version?: string;
        total_weight?: string;
        created_at?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryGroupsByMemberResponse {
    groups?: {
        id?: string;
        admin?: string;
        metadata?: string;
        version?: string;
        total_weight?: string;
        created_at?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryGroupsResponse {
    groups?: {
        id?: string;
        admin?: string;
        metadata?: string;
        version?: string;
        total_weight?: string;
        created_at?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryProposalResponse {
    proposal?: {
        id?: string;
        group_policy_address?: string;
        metadata?: string;
        proposers?: string[];
        submit_time?: string;
        group_version?: string;
        group_policy_version?: string;
        status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_SUBMITTED" | "PROPOSAL_STATUS_ACCEPTED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_ABORTED" | "PROPOSAL_STATUS_WITHDRAWN";
        final_tally_result?: {
            yes_count?: string;
            abstain_count?: string;
            no_count?: string;
            no_with_veto_count?: string;
        };
        voting_period_end?: string;
        executor_result?: "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED" | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN" | "PROPOSAL_EXECUTOR_RESULT_SUCCESS" | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
        messages?: {
            "@type"?: string;
        }[];
        title?: string;
        summary?: string;
    };
}
export interface QueryProposalsByGroupPolicyResponse {
    proposals?: {
        id?: string;
        group_policy_address?: string;
        metadata?: string;
        proposers?: string[];
        submit_time?: string;
        group_version?: string;
        group_policy_version?: string;
        status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_SUBMITTED" | "PROPOSAL_STATUS_ACCEPTED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_ABORTED" | "PROPOSAL_STATUS_WITHDRAWN";
        final_tally_result?: {
            yes_count?: string;
            abstain_count?: string;
            no_count?: string;
            no_with_veto_count?: string;
        };
        voting_period_end?: string;
        executor_result?: "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED" | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN" | "PROPOSAL_EXECUTOR_RESULT_SUCCESS" | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
        messages?: {
            "@type"?: string;
        }[];
        title?: string;
        summary?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryTallyResultResponse {
    tally?: {
        yes_count?: string;
        abstain_count?: string;
        no_count?: string;
        no_with_veto_count?: string;
    };
}
export interface QueryVoteByProposalVoterResponse {
    vote?: {
        proposal_id?: string;
        voter?: string;
        option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
        metadata?: string;
        submit_time?: string;
    };
}
export interface QueryVotesByProposalResponse {
    votes?: {
        proposal_id?: string;
        voter?: string;
        option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
        metadata?: string;
        submit_time?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryVotesByVoterResponse {
    votes?: {
        proposal_id?: string;
        voter?: string;
        option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
        metadata?: string;
        submit_time?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface Vote {
    /** @format uint64 */
    proposal_id?: string;
    voter?: string;
    option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
    metadata?: string;
    /** @format date-time */
    submit_time?: string;
}
export declare enum VoteOption {
    VOTE_OPTION_UNSPECIFIED = "VOTE_OPTION_UNSPECIFIED",
    VOTE_OPTION_YES = "VOTE_OPTION_YES",
    VOTE_OPTION_ABSTAIN = "VOTE_OPTION_ABSTAIN",
    VOTE_OPTION_NO = "VOTE_OPTION_NO",
    VOTE_OPTION_NO_WITH_VETO = "VOTE_OPTION_NO_WITH_VETO"
}
export interface V1GroupInfo {
    /** @format uint64 */
    id?: string;
    admin?: string;
    metadata?: string;
    /** @format uint64 */
    version?: string;
    total_weight?: string;
    /** @format date-time */
    created_at?: string;
}
export interface V1GroupPolicyInfo {
    address?: string;
    /** @format uint64 */
    group_id?: string;
    admin?: string;
    metadata?: string;
    /** @format uint64 */
    version?: string;
    decision_policy?: {
        "@type"?: string;
    };
    /** @format date-time */
    created_at?: string;
}
export interface V1Proposal {
    /** @format uint64 */
    id?: string;
    group_policy_address?: string;
    metadata?: string;
    proposers?: string[];
    /** @format date-time */
    submit_time?: string;
    /** @format uint64 */
    group_version?: string;
    /** @format uint64 */
    group_policy_version?: string;
    status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_SUBMITTED" | "PROPOSAL_STATUS_ACCEPTED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_ABORTED" | "PROPOSAL_STATUS_WITHDRAWN";
    final_tally_result?: {
        yes_count?: string;
        abstain_count?: string;
        no_count?: string;
        no_with_veto_count?: string;
    };
    /** @format date-time */
    voting_period_end?: string;
    executor_result?: "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED" | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN" | "PROPOSAL_EXECUTOR_RESULT_SUCCESS" | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
    messages?: {
        "@type"?: string;
    }[];
    title?: string;
    summary?: string;
}
export interface V1TallyResult {
    yes_count?: string;
    abstain_count?: string;
    no_count?: string;
    no_with_veto_count?: string;
}
export interface MemberRequest {
    address?: string;
    weight?: string;
    metadata?: string;
}
export interface MsgCreateGroupPolicyResponse {
    address?: string;
}
export interface MsgCreateGroupResponse {
    /** @format uint64 */
    group_id?: string;
}
export interface MsgCreateGroupWithPolicyResponse {
    /** @format uint64 */
    group_id?: string;
    group_policy_address?: string;
}
export interface MsgExecResponse {
    result?: "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED" | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN" | "PROPOSAL_EXECUTOR_RESULT_SUCCESS" | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
}
export type MsgLeaveGroupResponse = object;
export interface MsgSubmitProposalResponse {
    /** @format uint64 */
    proposal_id?: string;
}
export type MsgUpdateGroupAdminResponse = object;
export type MsgUpdateGroupMembersResponse = object;
export type MsgUpdateGroupMetadataResponse = object;
export type MsgUpdateGroupPolicyAdminResponse = object;
export type MsgUpdateGroupPolicyDecisionPolicyResponse = object;
export type MsgUpdateGroupPolicyMetadataResponse = object;
export type MsgVoteResponse = object;
export type MsgWithdrawProposalResponse = object;
export declare enum V1Exec {
    EXEC_UNSPECIFIED = "EXEC_UNSPECIFIED",
    EXEC_TRY = "EXEC_TRY"
}
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export declare enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export declare class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    private securityData;
    private securityWorker?;
    private secure?;
    private format?;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    private mergeRequestParams;
    private createFormData;
    request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T>>;
}
/**
 * @title HTTP API Console cosmos.group.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryGroupInfo
     * @request GET:/cosmos/group/v1/group_info/{group_id}
     */
    queryGroupInfo: (groupId: string, params?: RequestParams) => Promise<AxiosResponse<{
        info?: {
            id?: string;
            admin?: string;
            metadata?: string;
            version?: string;
            total_weight?: string;
            created_at?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryGroupMembers
     * @request GET:/cosmos/group/v1/group_members/{group_id}
     */
    queryGroupMembers: (groupId: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        members?: {
            group_id?: string;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                added_at?: string;
            };
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryGroupPoliciesByAdmin
     * @request GET:/cosmos/group/v1/group_policies_by_admin/{admin}
     */
    queryGroupPoliciesByAdmin: (admin: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        group_policies?: {
            address?: string;
            group_id?: string;
            admin?: string;
            metadata?: string;
            version?: string;
            decision_policy?: {
                "@type"?: string;
            };
            created_at?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryGroupPoliciesByGroup
     * @request GET:/cosmos/group/v1/group_policies_by_group/{group_id}
     */
    queryGroupPoliciesByGroup: (groupId: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        group_policies?: {
            address?: string;
            group_id?: string;
            admin?: string;
            metadata?: string;
            version?: string;
            decision_policy?: {
                "@type"?: string;
            };
            created_at?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryGroupPolicyInfo
     * @request GET:/cosmos/group/v1/group_policy_info/{address}
     */
    queryGroupPolicyInfo: (address: string, params?: RequestParams) => Promise<AxiosResponse<{
        info?: {
            address?: string;
            group_id?: string;
            admin?: string;
            metadata?: string;
            version?: string;
            decision_policy?: {
                "@type"?: string;
            };
            created_at?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryGroups
     * @request GET:/cosmos/group/v1/groups
     */
    queryGroups: (query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        groups?: {
            id?: string;
            admin?: string;
            metadata?: string;
            version?: string;
            total_weight?: string;
            created_at?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryGroupsByAdmin
     * @request GET:/cosmos/group/v1/groups_by_admin/{admin}
     */
    queryGroupsByAdmin: (admin: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        groups?: {
            id?: string;
            admin?: string;
            metadata?: string;
            version?: string;
            total_weight?: string;
            created_at?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryGroupsByMember
     * @request GET:/cosmos/group/v1/groups_by_member/{address}
     */
    queryGroupsByMember: (address: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        groups?: {
            id?: string;
            admin?: string;
            metadata?: string;
            version?: string;
            total_weight?: string;
            created_at?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryProposal
     * @request GET:/cosmos/group/v1/proposal/{proposal_id}
     */
    queryProposal: (proposalId: string, params?: RequestParams) => Promise<AxiosResponse<{
        proposal?: {
            id?: string;
            group_policy_address?: string;
            metadata?: string;
            proposers?: string[];
            submit_time?: string;
            group_version?: string;
            group_policy_version?: string;
            status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_SUBMITTED" | "PROPOSAL_STATUS_ACCEPTED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_ABORTED" | "PROPOSAL_STATUS_WITHDRAWN";
            final_tally_result?: {
                yes_count?: string;
                abstain_count?: string;
                no_count?: string;
                no_with_veto_count?: string;
            };
            voting_period_end?: string;
            executor_result?: "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED" | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN" | "PROPOSAL_EXECUTOR_RESULT_SUCCESS" | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
            messages?: {
                "@type"?: string;
            }[];
            title?: string;
            summary?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryTallyResult
     * @request GET:/cosmos/group/v1/proposals/{proposal_id}/tally
     */
    queryTallyResult: (proposalId: string, params?: RequestParams) => Promise<AxiosResponse<{
        tally?: {
            yes_count?: string;
            abstain_count?: string;
            no_count?: string;
            no_with_veto_count?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryProposalsByGroupPolicy
     * @request GET:/cosmos/group/v1/proposals_by_group_policy/{address}
     */
    queryProposalsByGroupPolicy: (address: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        proposals?: {
            id?: string;
            group_policy_address?: string;
            metadata?: string;
            proposers?: string[];
            submit_time?: string;
            group_version?: string;
            group_policy_version?: string;
            status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_SUBMITTED" | "PROPOSAL_STATUS_ACCEPTED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_ABORTED" | "PROPOSAL_STATUS_WITHDRAWN";
            final_tally_result?: {
                yes_count?: string;
                abstain_count?: string;
                no_count?: string;
                no_with_veto_count?: string;
            };
            voting_period_end?: string;
            executor_result?: "PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED" | "PROPOSAL_EXECUTOR_RESULT_NOT_RUN" | "PROPOSAL_EXECUTOR_RESULT_SUCCESS" | "PROPOSAL_EXECUTOR_RESULT_FAILURE";
            messages?: {
                "@type"?: string;
            }[];
            title?: string;
            summary?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryVoteByProposalVoter
     * @request GET:/cosmos/group/v1/vote_by_proposal_voter/{proposal_id}/{voter}
     */
    queryVoteByProposalVoter: (proposalId: string, voter: string, params?: RequestParams) => Promise<AxiosResponse<{
        vote?: {
            proposal_id?: string;
            voter?: string;
            option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
            metadata?: string;
            submit_time?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryVotesByProposal
     * @request GET:/cosmos/group/v1/votes_by_proposal/{proposal_id}
     */
    queryVotesByProposal: (proposalId: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        votes?: {
            proposal_id?: string;
            voter?: string;
            option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
            metadata?: string;
            submit_time?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryVotesByVoter
     * @request GET:/cosmos/group/v1/votes_by_voter/{voter}
     */
    queryVotesByVoter: (voter: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        votes?: {
            proposal_id?: string;
            voter?: string;
            option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
            metadata?: string;
            submit_time?: string;
        }[];
        pagination?: {
            next_key?: string;
            total?: string;
        };
    }>>;
}
