import * as dependency_1 from "./../../base/query/v1beta1/pagination";
import * as dependency_4 from "./gov";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.gov.v1beta1 {
    class QueryProposalRequest extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        static fromObject(data: {
            proposal_id?: number;
        }): QueryProposalRequest;
        toObject(): {
            proposal_id?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryProposalRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryProposalRequest;
    }
    class QueryProposalResponse extends pb_1.Message {
        constructor(data?: any[] | {
            proposal?: dependency_4.cosmos.gov.v1beta1.Proposal;
        });
        get proposal(): dependency_4.cosmos.gov.v1beta1.Proposal;
        set proposal(value: dependency_4.cosmos.gov.v1beta1.Proposal);
        static fromObject(data: {
            proposal?: ReturnType<typeof dependency_4.cosmos.gov.v1beta1.Proposal.prototype.toObject>;
        }): QueryProposalResponse;
        toObject(): {
            proposal?: {
                proposal_id?: number | undefined;
                content?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                status?: dependency_4.cosmos.gov.v1beta1.ProposalStatus | undefined;
                final_tally_result?: {
                    yes?: string | undefined;
                    abstain?: string | undefined;
                    no?: string | undefined;
                    no_with_veto?: string | undefined;
                } | undefined;
                submit_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                deposit_end_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                total_deposit?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                voting_start_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                voting_end_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryProposalResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryProposalResponse;
    }
    class QueryProposalsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_status?: dependency_4.cosmos.gov.v1beta1.ProposalStatus;
            voter?: string;
            depositor?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get proposal_status(): dependency_4.cosmos.gov.v1beta1.ProposalStatus;
        set proposal_status(value: dependency_4.cosmos.gov.v1beta1.ProposalStatus);
        get voter(): string;
        set voter(value: string);
        get depositor(): string;
        set depositor(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            proposal_status?: dependency_4.cosmos.gov.v1beta1.ProposalStatus;
            voter?: string;
            depositor?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryProposalsRequest;
        toObject(): {
            proposal_status?: dependency_4.cosmos.gov.v1beta1.ProposalStatus | undefined;
            voter?: string | undefined;
            depositor?: string | undefined;
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryProposalsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryProposalsRequest;
    }
    class QueryProposalsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            proposals?: dependency_4.cosmos.gov.v1beta1.Proposal[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get proposals(): dependency_4.cosmos.gov.v1beta1.Proposal[];
        set proposals(value: dependency_4.cosmos.gov.v1beta1.Proposal[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            proposals?: ReturnType<typeof dependency_4.cosmos.gov.v1beta1.Proposal.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryProposalsResponse;
        toObject(): {
            proposals?: {
                proposal_id?: number | undefined;
                content?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                status?: dependency_4.cosmos.gov.v1beta1.ProposalStatus | undefined;
                final_tally_result?: {
                    yes?: string | undefined;
                    abstain?: string | undefined;
                    no?: string | undefined;
                    no_with_veto?: string | undefined;
                } | undefined;
                submit_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                deposit_end_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                total_deposit?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                voting_start_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                voting_end_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryProposalsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryProposalsResponse;
    }
    class QueryVoteRequest extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
            voter?: string;
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get voter(): string;
        set voter(value: string);
        static fromObject(data: {
            proposal_id?: number;
            voter?: string;
        }): QueryVoteRequest;
        toObject(): {
            proposal_id?: number | undefined;
            voter?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryVoteRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryVoteRequest;
    }
    class QueryVoteResponse extends pb_1.Message {
        constructor(data?: any[] | {
            vote?: dependency_4.cosmos.gov.v1beta1.Vote;
        });
        get vote(): dependency_4.cosmos.gov.v1beta1.Vote;
        set vote(value: dependency_4.cosmos.gov.v1beta1.Vote);
        static fromObject(data: {
            vote?: ReturnType<typeof dependency_4.cosmos.gov.v1beta1.Vote.prototype.toObject>;
        }): QueryVoteResponse;
        toObject(): {
            vote?: {
                proposal_id?: number | undefined;
                voter?: string | undefined;
                option?: dependency_4.cosmos.gov.v1beta1.VoteOption | undefined;
                options?: {
                    option?: dependency_4.cosmos.gov.v1beta1.VoteOption | undefined;
                    weight?: string | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryVoteResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryVoteResponse;
    }
    class QueryVotesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            proposal_id?: number;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryVotesRequest;
        toObject(): {
            proposal_id?: number | undefined;
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryVotesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryVotesRequest;
    }
    class QueryVotesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            votes?: dependency_4.cosmos.gov.v1beta1.Vote[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get votes(): dependency_4.cosmos.gov.v1beta1.Vote[];
        set votes(value: dependency_4.cosmos.gov.v1beta1.Vote[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            votes?: ReturnType<typeof dependency_4.cosmos.gov.v1beta1.Vote.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryVotesResponse;
        toObject(): {
            votes?: {
                proposal_id?: number | undefined;
                voter?: string | undefined;
                option?: dependency_4.cosmos.gov.v1beta1.VoteOption | undefined;
                options?: {
                    option?: dependency_4.cosmos.gov.v1beta1.VoteOption | undefined;
                    weight?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryVotesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryVotesResponse;
    }
    class QueryParamsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            params_type?: string;
        });
        get params_type(): string;
        set params_type(value: string);
        static fromObject(data: {
            params_type?: string;
        }): QueryParamsRequest;
        toObject(): {
            params_type?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsRequest;
    }
    class QueryParamsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            voting_params?: dependency_4.cosmos.gov.v1beta1.VotingParams;
            deposit_params?: dependency_4.cosmos.gov.v1beta1.DepositParams;
            tally_params?: dependency_4.cosmos.gov.v1beta1.TallyParams;
        });
        get voting_params(): dependency_4.cosmos.gov.v1beta1.VotingParams;
        set voting_params(value: dependency_4.cosmos.gov.v1beta1.VotingParams);
        get deposit_params(): dependency_4.cosmos.gov.v1beta1.DepositParams;
        set deposit_params(value: dependency_4.cosmos.gov.v1beta1.DepositParams);
        get tally_params(): dependency_4.cosmos.gov.v1beta1.TallyParams;
        set tally_params(value: dependency_4.cosmos.gov.v1beta1.TallyParams);
        static fromObject(data: {
            voting_params?: ReturnType<typeof dependency_4.cosmos.gov.v1beta1.VotingParams.prototype.toObject>;
            deposit_params?: ReturnType<typeof dependency_4.cosmos.gov.v1beta1.DepositParams.prototype.toObject>;
            tally_params?: ReturnType<typeof dependency_4.cosmos.gov.v1beta1.TallyParams.prototype.toObject>;
        }): QueryParamsResponse;
        toObject(): {
            voting_params?: {
                voting_period?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
            deposit_params?: {
                min_deposit?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                max_deposit_period?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
            tally_params?: {
                quorum?: Uint8Array | undefined;
                threshold?: Uint8Array | undefined;
                veto_threshold?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryParamsResponse;
    }
    class QueryDepositRequest extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
            depositor?: string;
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get depositor(): string;
        set depositor(value: string);
        static fromObject(data: {
            proposal_id?: number;
            depositor?: string;
        }): QueryDepositRequest;
        toObject(): {
            proposal_id?: number | undefined;
            depositor?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDepositRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDepositRequest;
    }
    class QueryDepositResponse extends pb_1.Message {
        constructor(data?: any[] | {
            deposit?: dependency_4.cosmos.gov.v1beta1.Deposit;
        });
        get deposit(): dependency_4.cosmos.gov.v1beta1.Deposit;
        set deposit(value: dependency_4.cosmos.gov.v1beta1.Deposit);
        static fromObject(data: {
            deposit?: ReturnType<typeof dependency_4.cosmos.gov.v1beta1.Deposit.prototype.toObject>;
        }): QueryDepositResponse;
        toObject(): {
            deposit?: {
                proposal_id?: number | undefined;
                depositor?: string | undefined;
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDepositResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDepositResponse;
    }
    class QueryDepositsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            proposal_id?: number;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryDepositsRequest;
        toObject(): {
            proposal_id?: number | undefined;
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDepositsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDepositsRequest;
    }
    class QueryDepositsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            deposits?: dependency_4.cosmos.gov.v1beta1.Deposit[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get deposits(): dependency_4.cosmos.gov.v1beta1.Deposit[];
        set deposits(value: dependency_4.cosmos.gov.v1beta1.Deposit[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            deposits?: ReturnType<typeof dependency_4.cosmos.gov.v1beta1.Deposit.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryDepositsResponse;
        toObject(): {
            deposits?: {
                proposal_id?: number | undefined;
                depositor?: string | undefined;
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryDepositsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryDepositsResponse;
    }
    class QueryTallyResultRequest extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        static fromObject(data: {
            proposal_id?: number;
        }): QueryTallyResultRequest;
        toObject(): {
            proposal_id?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryTallyResultRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryTallyResultRequest;
    }
    class QueryTallyResultResponse extends pb_1.Message {
        constructor(data?: any[] | {
            tally?: dependency_4.cosmos.gov.v1beta1.TallyResult;
        });
        get tally(): dependency_4.cosmos.gov.v1beta1.TallyResult;
        set tally(value: dependency_4.cosmos.gov.v1beta1.TallyResult);
        static fromObject(data: {
            tally?: ReturnType<typeof dependency_4.cosmos.gov.v1beta1.TallyResult.prototype.toObject>;
        }): QueryTallyResultResponse;
        toObject(): {
            tally?: {
                yes?: string | undefined;
                abstain?: string | undefined;
                no?: string | undefined;
                no_with_veto?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryTallyResultResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryTallyResultResponse;
    }
}
//# sourceMappingURL=query.d.ts.map