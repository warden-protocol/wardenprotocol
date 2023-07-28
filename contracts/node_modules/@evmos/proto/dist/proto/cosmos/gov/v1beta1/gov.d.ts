import * as dependency_1 from "./../../base/v1beta1/coin";
import * as dependency_4 from "./../../../google/protobuf/timestamp";
import * as dependency_5 from "./../../../google/protobuf/any";
import * as dependency_6 from "./../../../google/protobuf/duration";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.gov.v1beta1 {
    enum VoteOption {
        VOTE_OPTION_UNSPECIFIED = 0,
        VOTE_OPTION_YES = 1,
        VOTE_OPTION_ABSTAIN = 2,
        VOTE_OPTION_NO = 3,
        VOTE_OPTION_NO_WITH_VETO = 4
    }
    enum ProposalStatus {
        PROPOSAL_STATUS_UNSPECIFIED = 0,
        PROPOSAL_STATUS_DEPOSIT_PERIOD = 1,
        PROPOSAL_STATUS_VOTING_PERIOD = 2,
        PROPOSAL_STATUS_PASSED = 3,
        PROPOSAL_STATUS_REJECTED = 4,
        PROPOSAL_STATUS_FAILED = 5
    }
    class WeightedVoteOption extends pb_1.Message {
        constructor(data?: any[] | {
            option?: VoteOption;
            weight?: string;
        });
        get option(): VoteOption;
        set option(value: VoteOption);
        get weight(): string;
        set weight(value: string);
        static fromObject(data: {
            option?: VoteOption;
            weight?: string;
        }): WeightedVoteOption;
        toObject(): {
            option?: VoteOption | undefined;
            weight?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): WeightedVoteOption;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): WeightedVoteOption;
    }
    class TextProposal extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        static fromObject(data: {
            title?: string;
            description?: string;
        }): TextProposal;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TextProposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TextProposal;
    }
    class Deposit extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
            depositor?: string;
            amount?: dependency_1.cosmos.base.v1beta1.Coin[];
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get depositor(): string;
        set depositor(value: string);
        get amount(): dependency_1.cosmos.base.v1beta1.Coin[];
        set amount(value: dependency_1.cosmos.base.v1beta1.Coin[]);
        static fromObject(data: {
            proposal_id?: number;
            depositor?: string;
            amount?: ReturnType<typeof dependency_1.cosmos.base.v1beta1.Coin.prototype.toObject>[];
        }): Deposit;
        toObject(): {
            proposal_id?: number | undefined;
            depositor?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Deposit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Deposit;
    }
    class Proposal extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
            content?: dependency_5.google.protobuf.Any;
            status?: ProposalStatus;
            final_tally_result?: TallyResult;
            submit_time?: dependency_4.google.protobuf.Timestamp;
            deposit_end_time?: dependency_4.google.protobuf.Timestamp;
            total_deposit?: dependency_1.cosmos.base.v1beta1.Coin[];
            voting_start_time?: dependency_4.google.protobuf.Timestamp;
            voting_end_time?: dependency_4.google.protobuf.Timestamp;
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get content(): dependency_5.google.protobuf.Any;
        set content(value: dependency_5.google.protobuf.Any);
        get status(): ProposalStatus;
        set status(value: ProposalStatus);
        get final_tally_result(): TallyResult;
        set final_tally_result(value: TallyResult);
        get submit_time(): dependency_4.google.protobuf.Timestamp;
        set submit_time(value: dependency_4.google.protobuf.Timestamp);
        get deposit_end_time(): dependency_4.google.protobuf.Timestamp;
        set deposit_end_time(value: dependency_4.google.protobuf.Timestamp);
        get total_deposit(): dependency_1.cosmos.base.v1beta1.Coin[];
        set total_deposit(value: dependency_1.cosmos.base.v1beta1.Coin[]);
        get voting_start_time(): dependency_4.google.protobuf.Timestamp;
        set voting_start_time(value: dependency_4.google.protobuf.Timestamp);
        get voting_end_time(): dependency_4.google.protobuf.Timestamp;
        set voting_end_time(value: dependency_4.google.protobuf.Timestamp);
        static fromObject(data: {
            proposal_id?: number;
            content?: ReturnType<typeof dependency_5.google.protobuf.Any.prototype.toObject>;
            status?: ProposalStatus;
            final_tally_result?: ReturnType<typeof TallyResult.prototype.toObject>;
            submit_time?: ReturnType<typeof dependency_4.google.protobuf.Timestamp.prototype.toObject>;
            deposit_end_time?: ReturnType<typeof dependency_4.google.protobuf.Timestamp.prototype.toObject>;
            total_deposit?: ReturnType<typeof dependency_1.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            voting_start_time?: ReturnType<typeof dependency_4.google.protobuf.Timestamp.prototype.toObject>;
            voting_end_time?: ReturnType<typeof dependency_4.google.protobuf.Timestamp.prototype.toObject>;
        }): Proposal;
        toObject(): {
            proposal_id?: number | undefined;
            content?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            status?: ProposalStatus | undefined;
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
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Proposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Proposal;
    }
    class TallyResult extends pb_1.Message {
        constructor(data?: any[] | {
            yes?: string;
            abstain?: string;
            no?: string;
            no_with_veto?: string;
        });
        get yes(): string;
        set yes(value: string);
        get abstain(): string;
        set abstain(value: string);
        get no(): string;
        set no(value: string);
        get no_with_veto(): string;
        set no_with_veto(value: string);
        static fromObject(data: {
            yes?: string;
            abstain?: string;
            no?: string;
            no_with_veto?: string;
        }): TallyResult;
        toObject(): {
            yes?: string | undefined;
            abstain?: string | undefined;
            no?: string | undefined;
            no_with_veto?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TallyResult;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TallyResult;
    }
    class Vote extends pb_1.Message {
        constructor(data?: any[] | {
            proposal_id?: number;
            voter?: string;
            option?: VoteOption;
            options?: WeightedVoteOption[];
        });
        get proposal_id(): number;
        set proposal_id(value: number);
        get voter(): string;
        set voter(value: string);
        get option(): VoteOption;
        set option(value: VoteOption);
        get options(): WeightedVoteOption[];
        set options(value: WeightedVoteOption[]);
        static fromObject(data: {
            proposal_id?: number;
            voter?: string;
            option?: VoteOption;
            options?: ReturnType<typeof WeightedVoteOption.prototype.toObject>[];
        }): Vote;
        toObject(): {
            proposal_id?: number | undefined;
            voter?: string | undefined;
            option?: VoteOption | undefined;
            options?: {
                option?: VoteOption | undefined;
                weight?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Vote;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Vote;
    }
    class DepositParams extends pb_1.Message {
        constructor(data?: any[] | {
            min_deposit?: dependency_1.cosmos.base.v1beta1.Coin[];
            max_deposit_period?: dependency_6.google.protobuf.Duration;
        });
        get min_deposit(): dependency_1.cosmos.base.v1beta1.Coin[];
        set min_deposit(value: dependency_1.cosmos.base.v1beta1.Coin[]);
        get max_deposit_period(): dependency_6.google.protobuf.Duration;
        set max_deposit_period(value: dependency_6.google.protobuf.Duration);
        static fromObject(data: {
            min_deposit?: ReturnType<typeof dependency_1.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            max_deposit_period?: ReturnType<typeof dependency_6.google.protobuf.Duration.prototype.toObject>;
        }): DepositParams;
        toObject(): {
            min_deposit?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            max_deposit_period?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DepositParams;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DepositParams;
    }
    class VotingParams extends pb_1.Message {
        constructor(data?: any[] | {
            voting_period?: dependency_6.google.protobuf.Duration;
        });
        get voting_period(): dependency_6.google.protobuf.Duration;
        set voting_period(value: dependency_6.google.protobuf.Duration);
        static fromObject(data: {
            voting_period?: ReturnType<typeof dependency_6.google.protobuf.Duration.prototype.toObject>;
        }): VotingParams;
        toObject(): {
            voting_period?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): VotingParams;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): VotingParams;
    }
    class TallyParams extends pb_1.Message {
        constructor(data?: any[] | {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            veto_threshold?: Uint8Array;
        });
        get quorum(): Uint8Array;
        set quorum(value: Uint8Array);
        get threshold(): Uint8Array;
        set threshold(value: Uint8Array);
        get veto_threshold(): Uint8Array;
        set veto_threshold(value: Uint8Array);
        static fromObject(data: {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            veto_threshold?: Uint8Array;
        }): TallyParams;
        toObject(): {
            quorum?: Uint8Array | undefined;
            threshold?: Uint8Array | undefined;
            veto_threshold?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TallyParams;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TallyParams;
    }
}
//# sourceMappingURL=gov.d.ts.map