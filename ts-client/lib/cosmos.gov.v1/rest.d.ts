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
export interface Coin {
    denom?: string;
    amount?: string;
}
export interface DepositParams {
    min_deposit?: {
        denom?: string;
        amount?: string;
    }[];
    max_deposit_period?: string;
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
export declare enum ProposalStatus {
    PROPOSAL_STATUS_UNSPECIFIED = "PROPOSAL_STATUS_UNSPECIFIED",
    PROPOSAL_STATUS_DEPOSIT_PERIOD = "PROPOSAL_STATUS_DEPOSIT_PERIOD",
    PROPOSAL_STATUS_VOTING_PERIOD = "PROPOSAL_STATUS_VOTING_PERIOD",
    PROPOSAL_STATUS_PASSED = "PROPOSAL_STATUS_PASSED",
    PROPOSAL_STATUS_REJECTED = "PROPOSAL_STATUS_REJECTED",
    PROPOSAL_STATUS_FAILED = "PROPOSAL_STATUS_FAILED"
}
export interface QueryConstitutionResponse {
    constitution?: string;
}
export interface QueryDepositResponse {
    deposit?: {
        proposal_id?: string;
        depositor?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[];
    };
}
export interface QueryDepositsResponse {
    deposits?: {
        proposal_id?: string;
        depositor?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[];
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface QueryParamsResponse {
    voting_params?: {
        voting_period?: string;
    };
    deposit_params?: {
        min_deposit?: {
            denom?: string;
            amount?: string;
        }[];
        max_deposit_period?: string;
    };
    tally_params?: {
        quorum?: string;
        threshold?: string;
        veto_threshold?: string;
    };
    params?: {
        min_deposit?: {
            denom?: string;
            amount?: string;
        }[];
        max_deposit_period?: string;
        voting_period?: string;
        quorum?: string;
        threshold?: string;
        veto_threshold?: string;
        min_initial_deposit_ratio?: string;
        proposal_cancel_ratio?: string;
        proposal_cancel_dest?: string;
        expedited_voting_period?: string;
        expedited_threshold?: string;
        expedited_min_deposit?: {
            denom?: string;
            amount?: string;
        }[];
        burn_vote_quorum?: boolean;
        burn_proposal_deposit_prevote?: boolean;
        burn_vote_veto?: boolean;
        min_deposit_ratio?: string;
    };
}
export interface QueryProposalResponse {
    proposal?: {
        id?: string;
        messages?: {
            "@type"?: string;
        }[];
        status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_DEPOSIT_PERIOD" | "PROPOSAL_STATUS_VOTING_PERIOD" | "PROPOSAL_STATUS_PASSED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_FAILED";
        final_tally_result?: {
            yes_count?: string;
            abstain_count?: string;
            no_count?: string;
            no_with_veto_count?: string;
        };
        submit_time?: string;
        deposit_end_time?: string;
        total_deposit?: {
            denom?: string;
            amount?: string;
        }[];
        voting_start_time?: string;
        voting_end_time?: string;
        metadata?: string;
        title?: string;
        summary?: string;
        proposer?: string;
        expedited?: boolean;
        failed_reason?: string;
    };
}
export interface QueryProposalsResponse {
    proposals?: {
        id?: string;
        messages?: {
            "@type"?: string;
        }[];
        status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_DEPOSIT_PERIOD" | "PROPOSAL_STATUS_VOTING_PERIOD" | "PROPOSAL_STATUS_PASSED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_FAILED";
        final_tally_result?: {
            yes_count?: string;
            abstain_count?: string;
            no_count?: string;
            no_with_veto_count?: string;
        };
        submit_time?: string;
        deposit_end_time?: string;
        total_deposit?: {
            denom?: string;
            amount?: string;
        }[];
        voting_start_time?: string;
        voting_end_time?: string;
        metadata?: string;
        title?: string;
        summary?: string;
        proposer?: string;
        expedited?: boolean;
        failed_reason?: string;
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
export interface QueryVoteResponse {
    vote?: {
        proposal_id?: string;
        voter?: string;
        options?: {
            option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
            weight?: string;
        }[];
        metadata?: string;
    };
}
export interface QueryVotesResponse {
    votes?: {
        proposal_id?: string;
        voter?: string;
        options?: {
            option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
            weight?: string;
        }[];
        metadata?: string;
    }[];
    pagination?: {
        next_key?: string;
        total?: string;
    };
}
export interface TallyParams {
    quorum?: string;
    threshold?: string;
    veto_threshold?: string;
}
export declare enum VoteOption {
    VOTE_OPTION_UNSPECIFIED = "VOTE_OPTION_UNSPECIFIED",
    VOTE_OPTION_YES = "VOTE_OPTION_YES",
    VOTE_OPTION_ABSTAIN = "VOTE_OPTION_ABSTAIN",
    VOTE_OPTION_NO = "VOTE_OPTION_NO",
    VOTE_OPTION_NO_WITH_VETO = "VOTE_OPTION_NO_WITH_VETO"
}
export interface VotingParams {
    voting_period?: string;
}
export interface WeightedVoteOption {
    option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
    weight?: string;
}
export interface V1Deposit {
    /** @format uint64 */
    proposal_id?: string;
    depositor?: string;
    amount?: {
        denom?: string;
        amount?: string;
    }[];
}
export interface V1Params {
    min_deposit?: {
        denom?: string;
        amount?: string;
    }[];
    max_deposit_period?: string;
    voting_period?: string;
    quorum?: string;
    threshold?: string;
    veto_threshold?: string;
    min_initial_deposit_ratio?: string;
    proposal_cancel_ratio?: string;
    proposal_cancel_dest?: string;
    expedited_voting_period?: string;
    expedited_threshold?: string;
    expedited_min_deposit?: {
        denom?: string;
        amount?: string;
    }[];
    burn_vote_quorum?: boolean;
    burn_proposal_deposit_prevote?: boolean;
    burn_vote_veto?: boolean;
    min_deposit_ratio?: string;
}
export interface V1Proposal {
    /** @format uint64 */
    id?: string;
    messages?: {
        "@type"?: string;
    }[];
    status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_DEPOSIT_PERIOD" | "PROPOSAL_STATUS_VOTING_PERIOD" | "PROPOSAL_STATUS_PASSED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_FAILED";
    final_tally_result?: {
        yes_count?: string;
        abstain_count?: string;
        no_count?: string;
        no_with_veto_count?: string;
    };
    /** @format date-time */
    submit_time?: string;
    /** @format date-time */
    deposit_end_time?: string;
    total_deposit?: {
        denom?: string;
        amount?: string;
    }[];
    /** @format date-time */
    voting_start_time?: string;
    /** @format date-time */
    voting_end_time?: string;
    metadata?: string;
    title?: string;
    summary?: string;
    proposer?: string;
    expedited?: boolean;
    failed_reason?: string;
}
export interface V1TallyResult {
    yes_count?: string;
    abstain_count?: string;
    no_count?: string;
    no_with_veto_count?: string;
}
export interface V1Vote {
    /** @format uint64 */
    proposal_id?: string;
    voter?: string;
    options?: {
        option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
        weight?: string;
    }[];
    metadata?: string;
}
export interface MsgCancelProposalResponse {
    /** @format uint64 */
    proposal_id?: string;
    /** @format date-time */
    canceled_time?: string;
    /** @format uint64 */
    canceled_height?: string;
}
export type MsgDepositResponse = object;
export type MsgExecLegacyContentResponse = object;
export interface MsgSubmitProposalResponse {
    /** @format uint64 */
    proposal_id?: string;
}
export type MsgUpdateParamsResponse = object;
export type MsgVoteResponse = object;
export type MsgVoteWeightedResponse = object;
export interface Params {
    min_deposit?: {
        denom?: string;
        amount?: string;
    }[];
    max_deposit_period?: string;
    voting_period?: string;
    quorum?: string;
    threshold?: string;
    veto_threshold?: string;
    min_initial_deposit_ratio?: string;
    proposal_cancel_ratio?: string;
    proposal_cancel_dest?: string;
    expedited_voting_period?: string;
    expedited_threshold?: string;
    expedited_min_deposit?: {
        denom?: string;
        amount?: string;
    }[];
    burn_vote_quorum?: boolean;
    burn_proposal_deposit_prevote?: boolean;
    burn_vote_veto?: boolean;
    min_deposit_ratio?: string;
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
 * @title HTTP API Console cosmos.gov.v1
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags Query
     * @name QueryConstitution
     * @request GET:/cosmos/gov/v1/constitution
     */
    queryConstitution: (params?: RequestParams) => Promise<AxiosResponse<{
        constitution?: string;
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryParams
     * @request GET:/cosmos/gov/v1/params/{params_type}
     */
    queryParams: (paramsType: string, params?: RequestParams) => Promise<AxiosResponse<{
        voting_params?: {
            voting_period?: string;
        };
        deposit_params?: {
            min_deposit?: {
                denom?: string;
                amount?: string;
            }[];
            max_deposit_period?: string;
        };
        tally_params?: {
            quorum?: string;
            threshold?: string;
            veto_threshold?: string;
        };
        params?: {
            min_deposit?: {
                denom?: string;
                amount?: string;
            }[];
            max_deposit_period?: string;
            voting_period?: string;
            quorum?: string;
            threshold?: string;
            veto_threshold?: string;
            min_initial_deposit_ratio?: string;
            proposal_cancel_ratio?: string;
            proposal_cancel_dest?: string;
            expedited_voting_period?: string;
            expedited_threshold?: string;
            expedited_min_deposit?: {
                denom?: string;
                amount?: string;
            }[];
            burn_vote_quorum?: boolean;
            burn_proposal_deposit_prevote?: boolean;
            burn_vote_veto?: boolean;
            min_deposit_ratio?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryProposals
     * @request GET:/cosmos/gov/v1/proposals
     */
    queryProposals: (query?: {
        proposal_status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_DEPOSIT_PERIOD" | "PROPOSAL_STATUS_VOTING_PERIOD" | "PROPOSAL_STATUS_PASSED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_FAILED";
        voter?: string;
        depositor?: string;
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        proposals?: {
            id?: string;
            messages?: {
                "@type"?: string;
            }[];
            status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_DEPOSIT_PERIOD" | "PROPOSAL_STATUS_VOTING_PERIOD" | "PROPOSAL_STATUS_PASSED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_FAILED";
            final_tally_result?: {
                yes_count?: string;
                abstain_count?: string;
                no_count?: string;
                no_with_veto_count?: string;
            };
            submit_time?: string;
            deposit_end_time?: string;
            total_deposit?: {
                denom?: string;
                amount?: string;
            }[];
            voting_start_time?: string;
            voting_end_time?: string;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failed_reason?: string;
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
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}
     */
    queryProposal: (proposalId: string, params?: RequestParams) => Promise<AxiosResponse<{
        proposal?: {
            id?: string;
            messages?: {
                "@type"?: string;
            }[];
            status?: "PROPOSAL_STATUS_UNSPECIFIED" | "PROPOSAL_STATUS_DEPOSIT_PERIOD" | "PROPOSAL_STATUS_VOTING_PERIOD" | "PROPOSAL_STATUS_PASSED" | "PROPOSAL_STATUS_REJECTED" | "PROPOSAL_STATUS_FAILED";
            final_tally_result?: {
                yes_count?: string;
                abstain_count?: string;
                no_count?: string;
                no_with_veto_count?: string;
            };
            submit_time?: string;
            deposit_end_time?: string;
            total_deposit?: {
                denom?: string;
                amount?: string;
            }[];
            voting_start_time?: string;
            voting_end_time?: string;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failed_reason?: string;
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryDeposits
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/deposits
     */
    queryDeposits: (proposalId: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        deposits?: {
            proposal_id?: string;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
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
     * @name QueryDeposit
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/deposits/{depositor}
     */
    queryDeposit: (proposalId: string, depositor: string, params?: RequestParams) => Promise<AxiosResponse<{
        deposit?: {
            proposal_id?: string;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        };
    }>>;
    /**
     * No description
     *
     * @tags Query
     * @name QueryTallyResult
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/tally
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
     * @name QueryVotes
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/votes
     */
    queryVotes: (proposalId: string, query?: {
        "pagination.key"?: string;
        "pagination.offset"?: string;
        "pagination.limit"?: string;
        "pagination.count_total"?: boolean;
        "pagination.reverse"?: boolean;
    }, params?: RequestParams) => Promise<AxiosResponse<{
        votes?: {
            proposal_id?: string;
            voter?: string;
            options?: {
                option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
                weight?: string;
            }[];
            metadata?: string;
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
     * @name QueryVote
     * @request GET:/cosmos/gov/v1/proposals/{proposal_id}/votes/{voter}
     */
    queryVote: (proposalId: string, voter: string, params?: RequestParams) => Promise<AxiosResponse<{
        vote?: {
            proposal_id?: string;
            voter?: string;
            options?: {
                option?: "VOTE_OPTION_UNSPECIFIED" | "VOTE_OPTION_YES" | "VOTE_OPTION_ABSTAIN" | "VOTE_OPTION_NO" | "VOTE_OPTION_NO_WITH_VETO";
                weight?: string;
            }[];
            metadata?: string;
        };
    }>>;
}
