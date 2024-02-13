import _m0 from "protobufjs/minimal";
import { Deposit, DepositParams, Proposal, TallyParams, Vote, VotingParams } from "./gov";
export declare const protobufPackage = "cosmos.gov.v1beta1";
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
    /** deposit_params defines all the parameters related to deposit. */
    depositParams: DepositParams | undefined;
    /** voting_params defines all the parameters related to voting. */
    votingParams: VotingParams | undefined;
    /** tally_params defines all the parameters related to tally. */
    tallyParams: TallyParams | undefined;
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
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        }[];
        proposals?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: import("./gov").ProposalStatus;
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
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        };
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
            } & { [K_4 in Exclude<keyof I["votes"][number]["options"][number], keyof import("./gov").WeightedVoteOption>]: never; })[] & { [K_5 in Exclude<keyof I["votes"][number]["options"], keyof {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I["votes"][number], keyof Vote>]: never; })[] & { [K_7 in Exclude<keyof I["votes"], keyof {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        }[]>]: never; };
        proposals?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: import("./gov").ProposalStatus;
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
            status?: import("./gov").ProposalStatus;
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
            } & { [K_8 in Exclude<keyof I["proposals"][number]["content"], keyof import("../../../google/protobuf/any").Any>]: never; };
            status?: import("./gov").ProposalStatus;
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
            } & { [K_9 in Exclude<keyof I["proposals"][number]["finalTallyResult"], keyof import("./gov").TallyResult>]: never; };
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
            } & { [K_10 in Exclude<keyof I["proposals"][number]["totalDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_11 in Exclude<keyof I["proposals"][number]["totalDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            votingStartTime?: Date;
            votingEndTime?: Date;
        } & { [K_12 in Exclude<keyof I["proposals"][number], keyof Proposal>]: never; })[] & { [K_13 in Exclude<keyof I["proposals"], keyof {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: import("./gov").ProposalStatus;
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
            } & { [K_14 in Exclude<keyof I["depositParams"]["minDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_15 in Exclude<keyof I["depositParams"]["minDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_16 in Exclude<keyof I["depositParams"]["maxDepositPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_17 in Exclude<keyof I["depositParams"], keyof DepositParams>]: never; };
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
            } & { [K_18 in Exclude<keyof I["votingParams"]["votingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_19 in Exclude<keyof I["votingParams"], "votingPeriod">]: never; };
        tallyParams?: {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        } & {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        } & { [K_20 in Exclude<keyof I["tallyParams"], keyof TallyParams>]: never; };
    } & { [K_21 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
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
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        }[];
        proposals?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: import("./gov").ProposalStatus;
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
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        };
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
            } & { [K_22 in Exclude<keyof I_1["deposits"][number]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_23 in Exclude<keyof I_1["deposits"][number]["amount"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_24 in Exclude<keyof I_1["deposits"][number], keyof Deposit>]: never; })[] & { [K_25 in Exclude<keyof I_1["deposits"], keyof {
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
            } & { [K_26 in Exclude<keyof I_1["votes"][number]["options"][number], keyof import("./gov").WeightedVoteOption>]: never; })[] & { [K_27 in Exclude<keyof I_1["votes"][number]["options"], keyof {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[]>]: never; };
        } & { [K_28 in Exclude<keyof I_1["votes"][number], keyof Vote>]: never; })[] & { [K_29 in Exclude<keyof I_1["votes"], keyof {
            proposalId?: number;
            voter?: string;
            option?: import("./gov").VoteOption;
            options?: {
                option?: import("./gov").VoteOption;
                weight?: string;
            }[];
        }[]>]: never; };
        proposals?: {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: import("./gov").ProposalStatus;
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
            status?: import("./gov").ProposalStatus;
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
            } & { [K_30 in Exclude<keyof I_1["proposals"][number]["content"], keyof import("../../../google/protobuf/any").Any>]: never; };
            status?: import("./gov").ProposalStatus;
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
            } & { [K_31 in Exclude<keyof I_1["proposals"][number]["finalTallyResult"], keyof import("./gov").TallyResult>]: never; };
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
            } & { [K_32 in Exclude<keyof I_1["proposals"][number]["totalDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_33 in Exclude<keyof I_1["proposals"][number]["totalDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            votingStartTime?: Date;
            votingEndTime?: Date;
        } & { [K_34 in Exclude<keyof I_1["proposals"][number], keyof Proposal>]: never; })[] & { [K_35 in Exclude<keyof I_1["proposals"], keyof {
            proposalId?: number;
            content?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            status?: import("./gov").ProposalStatus;
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
            } & { [K_36 in Exclude<keyof I_1["depositParams"]["minDeposit"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_37 in Exclude<keyof I_1["depositParams"]["minDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_38 in Exclude<keyof I_1["depositParams"]["maxDepositPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_39 in Exclude<keyof I_1["depositParams"], keyof DepositParams>]: never; };
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
            } & { [K_40 in Exclude<keyof I_1["votingParams"]["votingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
        } & { [K_41 in Exclude<keyof I_1["votingParams"], "votingPeriod">]: never; };
        tallyParams?: {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        } & {
            quorum?: Uint8Array;
            threshold?: Uint8Array;
            vetoThreshold?: Uint8Array;
        } & { [K_42 in Exclude<keyof I_1["tallyParams"], keyof TallyParams>]: never; };
    } & { [K_43 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
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
