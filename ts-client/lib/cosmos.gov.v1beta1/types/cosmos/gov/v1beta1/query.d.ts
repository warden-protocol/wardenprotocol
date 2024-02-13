import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Deposit, DepositParams, Proposal, ProposalStatus, TallyParams, TallyResult, Vote, VotingParams } from "./gov";
export declare const protobufPackage = "cosmos.gov.v1beta1";
/** QueryProposalRequest is the request type for the Query/Proposal RPC method. */
export interface QueryProposalRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
}
/** QueryProposalResponse is the response type for the Query/Proposal RPC method. */
export interface QueryProposalResponse {
    proposal: Proposal | undefined;
}
/** QueryProposalsRequest is the request type for the Query/Proposals RPC method. */
export interface QueryProposalsRequest {
    /** proposal_status defines the status of the proposals. */
    proposalStatus: ProposalStatus;
    /** voter defines the voter address for the proposals. */
    voter: string;
    /** depositor defines the deposit addresses from the proposals. */
    depositor: string;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * QueryProposalsResponse is the response type for the Query/Proposals RPC
 * method.
 */
export interface QueryProposalsResponse {
    /** proposals defines all the requested governance proposals. */
    proposals: Proposal[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryVoteRequest is the request type for the Query/Vote RPC method. */
export interface QueryVoteRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
    /** voter defines the voter address for the proposals. */
    voter: string;
}
/** QueryVoteResponse is the response type for the Query/Vote RPC method. */
export interface QueryVoteResponse {
    /** vote defines the queried vote. */
    vote: Vote | undefined;
}
/** QueryVotesRequest is the request type for the Query/Votes RPC method. */
export interface QueryVotesRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryVotesResponse is the response type for the Query/Votes RPC method. */
export interface QueryVotesResponse {
    /** votes defines the queried votes. */
    votes: Vote[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryParamsRequest is the request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
    /**
     * params_type defines which parameters to query for, can be one of "voting",
     * "tallying" or "deposit".
     */
    paramsType: string;
}
/** QueryParamsResponse is the response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** voting_params defines the parameters related to voting. */
    votingParams: VotingParams | undefined;
    /** deposit_params defines the parameters related to deposit. */
    depositParams: DepositParams | undefined;
    /** tally_params defines the parameters related to tally. */
    tallyParams: TallyParams | undefined;
}
/** QueryDepositRequest is the request type for the Query/Deposit RPC method. */
export interface QueryDepositRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
    /** depositor defines the deposit addresses from the proposals. */
    depositor: string;
}
/** QueryDepositResponse is the response type for the Query/Deposit RPC method. */
export interface QueryDepositResponse {
    /** deposit defines the requested deposit. */
    deposit: Deposit | undefined;
}
/** QueryDepositsRequest is the request type for the Query/Deposits RPC method. */
export interface QueryDepositsRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
}
/** QueryDepositsResponse is the response type for the Query/Deposits RPC method. */
export interface QueryDepositsResponse {
    /** deposits defines the requested deposits. */
    deposits: Deposit[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryTallyResultRequest is the request type for the Query/Tally RPC method. */
export interface QueryTallyResultRequest {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
}
/** QueryTallyResultResponse is the response type for the Query/Tally RPC method. */
export interface QueryTallyResultResponse {
    /** tally defines the requested tally. */
    tally: TallyResult | undefined;
}
export declare const QueryProposalRequest: {
    encode(message: QueryProposalRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalRequest;
    fromJSON(object: any): QueryProposalRequest;
    toJSON(message: QueryProposalRequest): unknown;
    create<I extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K in Exclude<keyof I, "proposalId">]: never; }>(base?: I): QueryProposalRequest;
    fromPartial<I_1 extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K_1 in Exclude<keyof I_1, "proposalId">]: never; }>(object: I_1): QueryProposalRequest;
};
export declare const QueryProposalResponse: {
    encode(message: QueryProposalResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalResponse;
    fromJSON(object: any): QueryProposalResponse;
    toJSON(message: QueryProposalResponse): unknown;
    create<I extends {
        proposal?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        };
    } & {
        proposal?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        } & {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["proposal"]["content"], keyof import("../../../google/protobuf/any").Any>]: never; };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            } & {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            } & { [K_1 in Exclude<keyof I["proposal"]["finalTallyResult"], keyof TallyResult>]: never; };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_2 in Exclude<keyof I["proposal"]["totalDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_3 in Exclude<keyof I["proposal"]["totalDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            votingStartTime?: Date;
            votingEndTime?: Date;
        } & { [K_4 in Exclude<keyof I["proposal"], keyof Proposal>]: never; };
    } & { [K_5 in Exclude<keyof I, "proposal">]: never; }>(base?: I): QueryProposalResponse;
    fromPartial<I_1 extends {
        proposal?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        };
    } & {
        proposal?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        } & {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_6 in Exclude<keyof I_1["proposal"]["content"], keyof import("../../../google/protobuf/any").Any>]: never; };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            } & {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            } & { [K_7 in Exclude<keyof I_1["proposal"]["finalTallyResult"], keyof TallyResult>]: never; };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_8 in Exclude<keyof I_1["proposal"]["totalDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_9 in Exclude<keyof I_1["proposal"]["totalDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            votingStartTime?: Date;
            votingEndTime?: Date;
        } & { [K_10 in Exclude<keyof I_1["proposal"], keyof Proposal>]: never; };
    } & { [K_11 in Exclude<keyof I_1, "proposal">]: never; }>(object: I_1): QueryProposalResponse;
};
export declare const QueryProposalsRequest: {
    encode(message: QueryProposalsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalsRequest;
    fromJSON(object: any): QueryProposalsRequest;
    toJSON(message: QueryProposalsRequest): unknown;
    create<I extends {
        proposalStatus?: ProposalStatus;
        voter?: string;
        depositor?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        proposalStatus?: ProposalStatus;
        voter?: string;
        depositor?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryProposalsRequest>]: never; }>(base?: I): QueryProposalsRequest;
    fromPartial<I_1 extends {
        proposalStatus?: ProposalStatus;
        voter?: string;
        depositor?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        proposalStatus?: ProposalStatus;
        voter?: string;
        depositor?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryProposalsRequest>]: never; }>(object: I_1): QueryProposalsRequest;
};
export declare const QueryProposalsResponse: {
    encode(message: QueryProposalsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalsResponse;
    fromJSON(object: any): QueryProposalsResponse;
    toJSON(message: QueryProposalsResponse): unknown;
    create<I extends {
        proposals?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        proposals?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        }[] & ({
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        } & {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["proposals"][number]["content"], keyof import("../../../google/protobuf/any").Any>]: never; };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            } & {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            } & { [K_1 in Exclude<keyof I["proposals"][number]["finalTallyResult"], keyof TallyResult>]: never; };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_2 in Exclude<keyof I["proposals"][number]["totalDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_3 in Exclude<keyof I["proposals"][number]["totalDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            votingStartTime?: Date;
            votingEndTime?: Date;
        } & { [K_4 in Exclude<keyof I["proposals"][number], keyof Proposal>]: never; })[] & { [K_5 in Exclude<keyof I["proposals"], keyof {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I, keyof QueryProposalsResponse>]: never; }>(base?: I): QueryProposalsResponse;
    fromPartial<I_1 extends {
        proposals?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        proposals?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        }[] & ({
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        } & {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_8 in Exclude<keyof I_1["proposals"][number]["content"], keyof import("../../../google/protobuf/any").Any>]: never; };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            } & {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            } & { [K_9 in Exclude<keyof I_1["proposals"][number]["finalTallyResult"], keyof TallyResult>]: never; };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_10 in Exclude<keyof I_1["proposals"][number]["totalDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_11 in Exclude<keyof I_1["proposals"][number]["totalDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            votingStartTime?: Date;
            votingEndTime?: Date;
        } & { [K_12 in Exclude<keyof I_1["proposals"][number], keyof Proposal>]: never; })[] & { [K_13 in Exclude<keyof I_1["proposals"], keyof {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: ProposalStatus;
            finalTallyResult?: {
                yes?: string;
                abstain?: string;
                no?: string;
                noWithVeto?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_14 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_15 in Exclude<keyof I_1, keyof QueryProposalsResponse>]: never; }>(object: I_1): QueryProposalsResponse;
};
export declare const QueryVoteRequest: {
    encode(message: QueryVoteRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVoteRequest;
    fromJSON(object: any): QueryVoteRequest;
    toJSON(message: QueryVoteRequest): unknown;
    create<I extends {
        proposalId?: number;
        voter?: string;
    } & {
        proposalId?: number;
        voter?: string;
    } & { [K in Exclude<keyof I, keyof QueryVoteRequest>]: never; }>(base?: I): QueryVoteRequest;
    fromPartial<I_1 extends {
        proposalId?: number;
        voter?: string;
    } & {
        proposalId?: number;
        voter?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryVoteRequest>]: never; }>(object: I_1): QueryVoteRequest;
};
export declare const QueryVoteResponse: {
    encode(message: QueryVoteResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVoteResponse;
    fromJSON(object: any): QueryVoteResponse;
    toJSON(message: QueryVoteResponse): unknown;
    create<I extends {
        vote?: {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        };
    } & {
        vote?: {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[] & ({
                option?: import("./gov").VoteOption;
                weight?: string;
            } & {
                option?: import("./gov").VoteOption;
                weight?: string;
            } & { [K in Exclude<keyof I["vote"]["options"][number], keyof import("./gov").WeightedVoteOption>]: never; })[] & { [K_1 in Exclude<keyof I["vote"]["options"], keyof {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["vote"], keyof Vote>]: never; };
    } & { [K_3 in Exclude<keyof I, "vote">]: never; }>(base?: I): QueryVoteResponse;
    fromPartial<I_1 extends {
        vote?: {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        };
    } & {
        vote?: {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[] & ({
                option?: import("./gov").VoteOption;
                weight?: string;
            } & {
                option?: import("./gov").VoteOption;
                weight?: string;
            } & { [K_4 in Exclude<keyof I_1["vote"]["options"][number], keyof import("./gov").WeightedVoteOption>]: never; })[] & { [K_5 in Exclude<keyof I_1["vote"]["options"], keyof {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["vote"], keyof Vote>]: never; };
    } & { [K_7 in Exclude<keyof I_1, "vote">]: never; }>(object: I_1): QueryVoteResponse;
};
export declare const QueryVotesRequest: {
    encode(message: QueryVotesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesRequest;
    fromJSON(object: any): QueryVotesRequest;
    toJSON(message: QueryVotesRequest): unknown;
    create<I extends {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryVotesRequest>]: never; }>(base?: I): QueryVotesRequest;
    fromPartial<I_1 extends {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryVotesRequest>]: never; }>(object: I_1): QueryVotesRequest;
};
export declare const QueryVotesResponse: {
    encode(message: QueryVotesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesResponse;
    fromJSON(object: any): QueryVotesResponse;
    toJSON(message: QueryVotesResponse): unknown;
    create<I extends {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        }[] & ({
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[] & ({
                option?: import("./gov").VoteOption;
                weight?: string;
            } & {
                option?: import("./gov").VoteOption;
                weight?: string;
            } & { [K in Exclude<keyof I["votes"][number]["options"][number], keyof import("./gov").WeightedVoteOption>]: never; })[] & { [K_1 in Exclude<keyof I["votes"][number]["options"], keyof {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["votes"][number], keyof Vote>]: never; })[] & { [K_3 in Exclude<keyof I["votes"], keyof {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof QueryVotesResponse>]: never; }>(base?: I): QueryVotesResponse;
    fromPartial<I_1 extends {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        }[] & ({
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[] & ({
                option?: import("./gov").VoteOption;
                weight?: string;
            } & {
                option?: import("./gov").VoteOption;
                weight?: string;
            } & { [K_6 in Exclude<keyof I_1["votes"][number]["options"][number], keyof import("./gov").WeightedVoteOption>]: never; })[] & { [K_7 in Exclude<keyof I_1["votes"][number]["options"], keyof {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[]>]: never; };
        } & { [K_8 in Exclude<keyof I_1["votes"][number], keyof Vote>]: never; })[] & { [K_9 in Exclude<keyof I_1["votes"], keyof {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_10 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof QueryVotesResponse>]: never; }>(object: I_1): QueryVotesResponse;
};
export declare const QueryParamsRequest: {
    encode(message: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(object: any): QueryParamsRequest;
    toJSON(message: QueryParamsRequest): unknown;
    create<I extends {
        paramsType?: string;
    } & {
        paramsType?: string;
    } & { [K in Exclude<keyof I, "paramsType">]: never; }>(base?: I): QueryParamsRequest;
    fromPartial<I_1 extends {
        paramsType?: string;
    } & {
        paramsType?: string;
    } & { [K_1 in Exclude<keyof I_1, "paramsType">]: never; }>(object: I_1): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    create<I extends {
        votingParams?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        };
        depositParams?: {
            minDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        };
        tallyParams?: {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        };
    } & {
        votingParams?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        } & {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K in Exclude<keyof I["votingParams"]["votingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_1 in Exclude<keyof I["votingParams"], "votingPeriod">]: never; };
        depositParams?: {
            minDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        } & {
            minDeposit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_2 in Exclude<keyof I["depositParams"]["minDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_3 in Exclude<keyof I["depositParams"]["minDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_4 in Exclude<keyof I["depositParams"]["maxDepositPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_5 in Exclude<keyof I["depositParams"], keyof DepositParams>]: never; };
        tallyParams?: {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        } & {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        } & { [K_6 in Exclude<keyof I["tallyParams"], keyof TallyParams>]: never; };
    } & { [K_7 in Exclude<keyof I, keyof QueryParamsResponse>]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        votingParams?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        };
        depositParams?: {
            minDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        };
        tallyParams?: {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        };
    } & {
        votingParams?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        } & {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_8 in Exclude<keyof I_1["votingParams"]["votingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_9 in Exclude<keyof I_1["votingParams"], "votingPeriod">]: never; };
        depositParams?: {
            minDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        } & {
            minDeposit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_10 in Exclude<keyof I_1["depositParams"]["minDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_11 in Exclude<keyof I_1["depositParams"]["minDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_12 in Exclude<keyof I_1["depositParams"]["maxDepositPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_13 in Exclude<keyof I_1["depositParams"], keyof DepositParams>]: never; };
        tallyParams?: {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        } & {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        } & { [K_14 in Exclude<keyof I_1["tallyParams"], keyof TallyParams>]: never; };
    } & { [K_15 in Exclude<keyof I_1, keyof QueryParamsResponse>]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QueryDepositRequest: {
    encode(message: QueryDepositRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDepositRequest;
    fromJSON(object: any): QueryDepositRequest;
    toJSON(message: QueryDepositRequest): unknown;
    create<I extends {
        proposalId?: number;
        depositor?: string;
    } & {
        proposalId?: number;
        depositor?: string;
    } & { [K in Exclude<keyof I, keyof QueryDepositRequest>]: never; }>(base?: I): QueryDepositRequest;
    fromPartial<I_1 extends {
        proposalId?: number;
        depositor?: string;
    } & {
        proposalId?: number;
        depositor?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryDepositRequest>]: never; }>(object: I_1): QueryDepositRequest;
};
export declare const QueryDepositResponse: {
    encode(message: QueryDepositResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDepositResponse;
    fromJSON(object: any): QueryDepositResponse;
    toJSON(message: QueryDepositResponse): unknown;
    create<I extends {
        deposit?: {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        };
    } & {
        deposit?: {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K in Exclude<keyof I["deposit"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_1 in Exclude<keyof I["deposit"]["amount"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["deposit"], keyof Deposit>]: never; };
    } & { [K_3 in Exclude<keyof I, "deposit">]: never; }>(base?: I): QueryDepositResponse;
    fromPartial<I_1 extends {
        deposit?: {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        };
    } & {
        deposit?: {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_4 in Exclude<keyof I_1["deposit"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_5 in Exclude<keyof I_1["deposit"]["amount"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["deposit"], keyof Deposit>]: never; };
    } & { [K_7 in Exclude<keyof I_1, "deposit">]: never; }>(object: I_1): QueryDepositResponse;
};
export declare const QueryDepositsRequest: {
    encode(message: QueryDepositsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDepositsRequest;
    fromJSON(object: any): QueryDepositsRequest;
    toJSON(message: QueryDepositsRequest): unknown;
    create<I extends {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryDepositsRequest>]: never; }>(base?: I): QueryDepositsRequest;
    fromPartial<I_1 extends {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        proposalId?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryDepositsRequest>]: never; }>(object: I_1): QueryDepositsRequest;
};
export declare const QueryDepositsResponse: {
    encode(message: QueryDepositsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryDepositsResponse;
    fromJSON(object: any): QueryDepositsResponse;
    toJSON(message: QueryDepositsResponse): unknown;
    create<I extends {
        deposits?: {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        deposits?: {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K in Exclude<keyof I["deposits"][number]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_1 in Exclude<keyof I["deposits"][number]["amount"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["deposits"][number], keyof Deposit>]: never; })[] & { [K_3 in Exclude<keyof I["deposits"], keyof {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof QueryDepositsResponse>]: never; }>(base?: I): QueryDepositsResponse;
    fromPartial<I_1 extends {
        deposits?: {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        deposits?: {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_6 in Exclude<keyof I_1["deposits"][number]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_7 in Exclude<keyof I_1["deposits"][number]["amount"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_8 in Exclude<keyof I_1["deposits"][number], keyof Deposit>]: never; })[] & { [K_9 in Exclude<keyof I_1["deposits"], keyof {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_10 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof QueryDepositsResponse>]: never; }>(object: I_1): QueryDepositsResponse;
};
export declare const QueryTallyResultRequest: {
    encode(message: QueryTallyResultRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTallyResultRequest;
    fromJSON(object: any): QueryTallyResultRequest;
    toJSON(message: QueryTallyResultRequest): unknown;
    create<I extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K in Exclude<keyof I, "proposalId">]: never; }>(base?: I): QueryTallyResultRequest;
    fromPartial<I_1 extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K_1 in Exclude<keyof I_1, "proposalId">]: never; }>(object: I_1): QueryTallyResultRequest;
};
export declare const QueryTallyResultResponse: {
    encode(message: QueryTallyResultResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTallyResultResponse;
    fromJSON(object: any): QueryTallyResultResponse;
    toJSON(message: QueryTallyResultResponse): unknown;
    create<I extends {
        tally?: {
            yes?: string;
            abstain?: string;
            no?: string;
            noWithVeto?: string;
        };
    } & {
        tally?: {
            yes?: string;
            abstain?: string;
            no?: string;
            noWithVeto?: string;
        } & {
            yes?: string;
            abstain?: string;
            no?: string;
            noWithVeto?: string;
        } & { [K in Exclude<keyof I["tally"], keyof TallyResult>]: never; };
    } & { [K_1 in Exclude<keyof I, "tally">]: never; }>(base?: I): QueryTallyResultResponse;
    fromPartial<I_1 extends {
        tally?: {
            yes?: string;
            abstain?: string;
            no?: string;
            noWithVeto?: string;
        };
    } & {
        tally?: {
            yes?: string;
            abstain?: string;
            no?: string;
            noWithVeto?: string;
        } & {
            yes?: string;
            abstain?: string;
            no?: string;
            noWithVeto?: string;
        } & { [K_2 in Exclude<keyof I_1["tally"], keyof TallyResult>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "tally">]: never; }>(object: I_1): QueryTallyResultResponse;
};
/** Query defines the gRPC querier service for gov module */
export interface Query {
    /** Proposal queries proposal details based on ProposalID. */
    Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
    /** Proposals queries all proposals based on given status. */
    Proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse>;
    /** Vote queries voted information based on proposalID, voterAddr. */
    Vote(request: QueryVoteRequest): Promise<QueryVoteResponse>;
    /** Votes queries votes of a given proposal. */
    Votes(request: QueryVotesRequest): Promise<QueryVotesResponse>;
    /** Params queries all parameters of the gov module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Deposit queries single deposit information based on proposalID, depositor address. */
    Deposit(request: QueryDepositRequest): Promise<QueryDepositResponse>;
    /** Deposits queries all deposits of a single proposal. */
    Deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse>;
    /** TallyResult queries the tally of a proposal vote. */
    TallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
}
export declare const QueryServiceName = "cosmos.gov.v1beta1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
    Proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse>;
    Vote(request: QueryVoteRequest): Promise<QueryVoteResponse>;
    Votes(request: QueryVotesRequest): Promise<QueryVotesResponse>;
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Deposit(request: QueryDepositRequest): Promise<QueryDepositResponse>;
    Deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse>;
    TallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
