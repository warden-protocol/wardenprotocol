import _m0 from "protobufjs/minimal";
import { Deposit, DepositParams, Params, Proposal, TallyParams, Vote, VotingParams } from "./gov";
export declare const protobufPackage = "cosmos.gov.v1";
/** Since: cosmos-sdk 0.46 */
/** GenesisState defines the gov module's genesis state. */
export interface GenesisState {
    /** starting_proposal_id is the ID of the starting proposal. */
    startingProposalId: number;
    /** deposits defines all the deposits present at genesis. */
    deposits: Deposit[];
    /** votes defines all the votes present at genesis. */
    votes: Vote[];
    /** proposals defines all the proposals present at genesis. */
    proposals: Proposal[];
    /**
     * Deprecated: Prefer to use `params` instead.
     * deposit_params defines all the paramaters of related to deposit.
     *
     * @deprecated
     */
    depositParams: DepositParams | undefined;
    /**
     * Deprecated: Prefer to use `params` instead.
     * voting_params defines all the paramaters of related to voting.
     *
     * @deprecated
     */
    votingParams: VotingParams | undefined;
    /**
     * Deprecated: Prefer to use `params` instead.
     * tally_params defines all the paramaters of related to tally.
     *
     * @deprecated
     */
    tallyParams: TallyParams | undefined;
    /**
     * params defines all the paramaters of x/gov module.
     *
     * Since: cosmos-sdk 0.47
     */
    params: Params | undefined;
    /**
     * The constitution allows builders to lay a foundation and define purpose.
     * This is an immutable string set in genesis.
     * There are no amendments, to go outside of scope, just fork.
     * constitution is an immutable string in genesis for a chain builder to lay out their vision, ideas and ideals.
     *
     * Since: cosmos-sdk 0.50
     */
    constitution: string;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        startingProposalId?: number;
        deposits?: {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        votes?: {
            proposalId?: number;
            voter?: string;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
            metadata?: string;
        }[];
        proposals?: {
            id?: number;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            status?: import("./gov").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failedReason?: string;
        }[];
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
        votingParams?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        };
        tallyParams?: {
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
        };
        params?: {
            minDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
            minInitialDepositRatio?: string;
            proposalCancelRatio?: string;
            proposalCancelDest?: string;
            expeditedVotingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            expeditedThreshold?: string;
            expeditedMinDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            burnVoteQuorum?: boolean;
            burnProposalDepositPrevote?: boolean;
            burnVoteVeto?: boolean;
            minDepositRatio?: string;
        };
        constitution?: string;
    } & {
        startingProposalId?: number;
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
        votes?: {
            proposalId?: number;
            voter?: string;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
            metadata?: string;
        }[] & ({
            proposalId?: number;
            voter?: string;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
            metadata?: string;
        } & {
            proposalId?: number;
            voter?: string;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[] & ({
                option?: import("./gov").VoteOption;
                weight?: string;
            } & {
                option?: import("./gov").VoteOption;
                weight?: string;
            } & { [K_4 in Exclude<keyof I["votes"][number]["options"][number], keyof import("./gov").WeightedVoteOption>]: never; })[] & { [K_5 in Exclude<keyof I["votes"][number]["options"], keyof {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[]>]: never; };
            metadata?: string;
        } & { [K_6 in Exclude<keyof I["votes"][number], keyof Vote>]: never; })[] & { [K_7 in Exclude<keyof I["votes"], keyof {
            proposalId?: number;
            voter?: string;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
            metadata?: string;
        }[]>]: never; };
        proposals?: {
            id?: number;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            status?: import("./gov").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failedReason?: string;
        }[] & ({
            id?: number;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            status?: import("./gov").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failedReason?: string;
        } & {
            id?: number;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[] & ({
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_8 in Exclude<keyof I["proposals"][number]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_9 in Exclude<keyof I["proposals"][number]["messages"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
            status?: import("./gov").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & { [K_10 in Exclude<keyof I["proposals"][number]["finalTallyResult"], keyof import("./gov").TallyResult>]: never; };
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
            } & { [K_11 in Exclude<keyof I["proposals"][number]["totalDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_12 in Exclude<keyof I["proposals"][number]["totalDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            votingStartTime?: Date;
            votingEndTime?: Date;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failedReason?: string;
        } & { [K_13 in Exclude<keyof I["proposals"][number], keyof Proposal>]: never; })[] & { [K_14 in Exclude<keyof I["proposals"], keyof {
            id?: number;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            status?: import("./gov").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failedReason?: string;
        }[]>]: never; };
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
            } & { [K_15 in Exclude<keyof I["depositParams"]["minDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_16 in Exclude<keyof I["depositParams"]["minDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_17 in Exclude<keyof I["depositParams"]["maxDepositPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_18 in Exclude<keyof I["depositParams"], keyof DepositParams>]: never; };
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
            } & { [K_19 in Exclude<keyof I["votingParams"]["votingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_20 in Exclude<keyof I["votingParams"], "votingPeriod">]: never; };
        tallyParams?: {
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
        } & {
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
        } & { [K_21 in Exclude<keyof I["tallyParams"], keyof TallyParams>]: never; };
        params?: {
            minDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
            minInitialDepositRatio?: string;
            proposalCancelRatio?: string;
            proposalCancelDest?: string;
            expeditedVotingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            expeditedThreshold?: string;
            expeditedMinDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            burnVoteQuorum?: boolean;
            burnProposalDepositPrevote?: boolean;
            burnVoteVeto?: boolean;
            minDepositRatio?: string;
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
            } & { [K_22 in Exclude<keyof I["params"]["minDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_23 in Exclude<keyof I["params"]["minDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_24 in Exclude<keyof I["params"]["maxDepositPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_25 in Exclude<keyof I["params"]["votingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
            minInitialDepositRatio?: string;
            proposalCancelRatio?: string;
            proposalCancelDest?: string;
            expeditedVotingPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_26 in Exclude<keyof I["params"]["expeditedVotingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            expeditedThreshold?: string;
            expeditedMinDeposit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_27 in Exclude<keyof I["params"]["expeditedMinDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_28 in Exclude<keyof I["params"]["expeditedMinDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            burnVoteQuorum?: boolean;
            burnProposalDepositPrevote?: boolean;
            burnVoteVeto?: boolean;
            minDepositRatio?: string;
        } & { [K_29 in Exclude<keyof I["params"], keyof Params>]: never; };
        constitution?: string;
    } & { [K_30 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        startingProposalId?: number;
        deposits?: {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        votes?: {
            proposalId?: number;
            voter?: string;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
            metadata?: string;
        }[];
        proposals?: {
            id?: number;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            status?: import("./gov").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failedReason?: string;
        }[];
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
        votingParams?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        };
        tallyParams?: {
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
        };
        params?: {
            minDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
            minInitialDepositRatio?: string;
            proposalCancelRatio?: string;
            proposalCancelDest?: string;
            expeditedVotingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            expeditedThreshold?: string;
            expeditedMinDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            burnVoteQuorum?: boolean;
            burnProposalDepositPrevote?: boolean;
            burnVoteVeto?: boolean;
            minDepositRatio?: string;
        };
        constitution?: string;
    } & {
        startingProposalId?: number;
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
            } & { [K_31 in Exclude<keyof I_1["deposits"][number]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_32 in Exclude<keyof I_1["deposits"][number]["amount"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_33 in Exclude<keyof I_1["deposits"][number], keyof Deposit>]: never; })[] & { [K_34 in Exclude<keyof I_1["deposits"], keyof {
            proposalId?: number;
            depositor?: string;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        votes?: {
            proposalId?: number;
            voter?: string;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
            metadata?: string;
        }[] & ({
            proposalId?: number;
            voter?: string;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
            metadata?: string;
        } & {
            proposalId?: number;
            voter?: string;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[] & ({
                option?: import("./gov").VoteOption;
                weight?: string;
            } & {
                option?: import("./gov").VoteOption;
                weight?: string;
            } & { [K_35 in Exclude<keyof I_1["votes"][number]["options"][number], keyof import("./gov").WeightedVoteOption>]: never; })[] & { [K_36 in Exclude<keyof I_1["votes"][number]["options"], keyof {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[]>]: never; };
            metadata?: string;
        } & { [K_37 in Exclude<keyof I_1["votes"][number], keyof Vote>]: never; })[] & { [K_38 in Exclude<keyof I_1["votes"], keyof {
            proposalId?: number;
            voter?: string;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
            metadata?: string;
        }[]>]: never; };
        proposals?: {
            id?: number;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            status?: import("./gov").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failedReason?: string;
        }[] & ({
            id?: number;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            status?: import("./gov").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failedReason?: string;
        } & {
            id?: number;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[] & ({
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_39 in Exclude<keyof I_1["proposals"][number]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_40 in Exclude<keyof I_1["proposals"][number]["messages"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
            status?: import("./gov").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            } & { [K_41 in Exclude<keyof I_1["proposals"][number]["finalTallyResult"], keyof import("./gov").TallyResult>]: never; };
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
            } & { [K_42 in Exclude<keyof I_1["proposals"][number]["totalDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_43 in Exclude<keyof I_1["proposals"][number]["totalDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            votingStartTime?: Date;
            votingEndTime?: Date;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failedReason?: string;
        } & { [K_44 in Exclude<keyof I_1["proposals"][number], keyof Proposal>]: never; })[] & { [K_45 in Exclude<keyof I_1["proposals"], keyof {
            id?: number;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            status?: import("./gov").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            submitTime?: Date;
            depositEndTime?: Date;
            totalDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            votingStartTime?: Date;
            votingEndTime?: Date;
            metadata?: string;
            title?: string;
            summary?: string;
            proposer?: string;
            expedited?: boolean;
            failedReason?: string;
        }[]>]: never; };
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
            } & { [K_46 in Exclude<keyof I_1["depositParams"]["minDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_47 in Exclude<keyof I_1["depositParams"]["minDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_48 in Exclude<keyof I_1["depositParams"]["maxDepositPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_49 in Exclude<keyof I_1["depositParams"], keyof DepositParams>]: never; };
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
            } & { [K_50 in Exclude<keyof I_1["votingParams"]["votingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_51 in Exclude<keyof I_1["votingParams"], "votingPeriod">]: never; };
        tallyParams?: {
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
        } & {
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
        } & { [K_52 in Exclude<keyof I_1["tallyParams"], keyof TallyParams>]: never; };
        params?: {
            minDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
            minInitialDepositRatio?: string;
            proposalCancelRatio?: string;
            proposalCancelDest?: string;
            expeditedVotingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            expeditedThreshold?: string;
            expeditedMinDeposit?: {
                denom?: string;
                amount?: string;
            }[];
            burnVoteQuorum?: boolean;
            burnProposalDepositPrevote?: boolean;
            burnVoteVeto?: boolean;
            minDepositRatio?: string;
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
            } & { [K_53 in Exclude<keyof I_1["params"]["minDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_54 in Exclude<keyof I_1["params"]["minDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_55 in Exclude<keyof I_1["params"]["maxDepositPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_56 in Exclude<keyof I_1["params"]["votingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            quorum?: string;
            threshold?: string;
            vetoThreshold?: string;
            minInitialDepositRatio?: string;
            proposalCancelRatio?: string;
            proposalCancelDest?: string;
            expeditedVotingPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_57 in Exclude<keyof I_1["params"]["expeditedVotingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            expeditedThreshold?: string;
            expeditedMinDeposit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_58 in Exclude<keyof I_1["params"]["expeditedMinDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_59 in Exclude<keyof I_1["params"]["expeditedMinDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            burnVoteQuorum?: boolean;
            burnProposalDepositPrevote?: boolean;
            burnVoteVeto?: boolean;
            minDepositRatio?: string;
        } & { [K_60 in Exclude<keyof I_1["params"], keyof Params>]: never; };
        constitution?: string;
    } & { [K_61 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
};
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
