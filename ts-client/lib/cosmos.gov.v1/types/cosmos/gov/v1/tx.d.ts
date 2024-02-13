import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Coin } from "../../base/v1beta1/coin";
import { Params, VoteOption, WeightedVoteOption } from "./gov";
export declare const protobufPackage = "cosmos.gov.v1";
/** Since: cosmos-sdk 0.46 */
/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 */
export interface MsgSubmitProposal {
    /** messages are the arbitrary messages to be executed if proposal passes. */
    messages: Any[];
    /** initial_deposit is the deposit value that must be paid at proposal submission. */
    initialDeposit: Coin[];
    /** proposer is the account address of the proposer. */
    proposer: string;
    /** metadata is any arbitrary metadata attached to the proposal. */
    metadata: string;
    /**
     * title is the title of the proposal.
     *
     * Since: cosmos-sdk 0.47
     */
    title: string;
    /**
     * summary is the summary of the proposal
     *
     * Since: cosmos-sdk 0.47
     */
    summary: string;
    /**
     * expedited defines if the proposal is expedited or not
     *
     * Since: cosmos-sdk 0.50
     */
    expedited: boolean;
}
/** MsgSubmitProposalResponse defines the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponse {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
}
/**
 * MsgExecLegacyContent is used to wrap the legacy content field into a message.
 * This ensures backwards compatibility with v1beta1.MsgSubmitProposal.
 */
export interface MsgExecLegacyContent {
    /** content is the proposal's content. */
    content: Any | undefined;
    /** authority must be the gov module address. */
    authority: string;
}
/** MsgExecLegacyContentResponse defines the Msg/ExecLegacyContent response type. */
export interface MsgExecLegacyContentResponse {
}
/** MsgVote defines a message to cast a vote. */
export interface MsgVote {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
    /** voter is the voter address for the proposal. */
    voter: string;
    /** option defines the vote option. */
    option: VoteOption;
    /** metadata is any arbitrary metadata attached to the Vote. */
    metadata: string;
}
/** MsgVoteResponse defines the Msg/Vote response type. */
export interface MsgVoteResponse {
}
/** MsgVoteWeighted defines a message to cast a vote. */
export interface MsgVoteWeighted {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
    /** voter is the voter address for the proposal. */
    voter: string;
    /** options defines the weighted vote options. */
    options: WeightedVoteOption[];
    /** metadata is any arbitrary metadata attached to the VoteWeighted. */
    metadata: string;
}
/** MsgVoteWeightedResponse defines the Msg/VoteWeighted response type. */
export interface MsgVoteWeightedResponse {
}
/** MsgDeposit defines a message to submit a deposit to an existing proposal. */
export interface MsgDeposit {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
    /** depositor defines the deposit addresses from the proposals. */
    depositor: string;
    /** amount to be deposited by depositor. */
    amount: Coin[];
}
/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponse {
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /**
     * params defines the x/gov parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {
}
/**
 * MsgCancelProposal is the Msg/CancelProposal request type.
 *
 * Since: cosmos-sdk 0.50
 */
export interface MsgCancelProposal {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
    /** proposer is the account address of the proposer. */
    proposer: string;
}
/**
 * MsgCancelProposalResponse defines the response structure for executing a
 * MsgCancelProposal message.
 *
 * Since: cosmos-sdk 0.50
 */
export interface MsgCancelProposalResponse {
    /** proposal_id defines the unique id of the proposal. */
    proposalId: number;
    /** canceled_time is the time when proposal is canceled. */
    canceledTime: Date | undefined;
    /** canceled_height defines the block height at which the proposal is canceled. */
    canceledHeight: number;
}
export declare const MsgSubmitProposal: {
    encode(message: MsgSubmitProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitProposal;
    fromJSON(object: any): MsgSubmitProposal;
    toJSON(message: MsgSubmitProposal): unknown;
    create<I extends {
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
        initialDeposit?: {
            denom?: string;
            amount?: string;
        }[];
        proposer?: string;
        metadata?: string;
        title?: string;
        summary?: string;
        expedited?: boolean;
    } & {
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["messages"][number], keyof Any>]: never; })[] & { [K_1 in Exclude<keyof I["messages"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
        initialDeposit?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I["initialDeposit"][number], keyof Coin>]: never; })[] & { [K_3 in Exclude<keyof I["initialDeposit"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        proposer?: string;
        metadata?: string;
        title?: string;
        summary?: string;
        expedited?: boolean;
    } & { [K_4 in Exclude<keyof I, keyof MsgSubmitProposal>]: never; }>(base?: I): MsgSubmitProposal;
    fromPartial<I_1 extends {
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
        initialDeposit?: {
            denom?: string;
            amount?: string;
        }[];
        proposer?: string;
        metadata?: string;
        title?: string;
        summary?: string;
        expedited?: boolean;
    } & {
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_5 in Exclude<keyof I_1["messages"][number], keyof Any>]: never; })[] & { [K_6 in Exclude<keyof I_1["messages"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
        initialDeposit?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_7 in Exclude<keyof I_1["initialDeposit"][number], keyof Coin>]: never; })[] & { [K_8 in Exclude<keyof I_1["initialDeposit"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        proposer?: string;
        metadata?: string;
        title?: string;
        summary?: string;
        expedited?: boolean;
    } & { [K_9 in Exclude<keyof I_1, keyof MsgSubmitProposal>]: never; }>(object: I_1): MsgSubmitProposal;
};
export declare const MsgSubmitProposalResponse: {
    encode(message: MsgSubmitProposalResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitProposalResponse;
    fromJSON(object: any): MsgSubmitProposalResponse;
    toJSON(message: MsgSubmitProposalResponse): unknown;
    create<I extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K in Exclude<keyof I, "proposalId">]: never; }>(base?: I): MsgSubmitProposalResponse;
    fromPartial<I_1 extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K_1 in Exclude<keyof I_1, "proposalId">]: never; }>(object: I_1): MsgSubmitProposalResponse;
};
export declare const MsgExecLegacyContent: {
    encode(message: MsgExecLegacyContent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecLegacyContent;
    fromJSON(object: any): MsgExecLegacyContent;
    toJSON(message: MsgExecLegacyContent): unknown;
    create<I extends {
        content?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        authority?: string;
    } & {
        content?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["content"], keyof Any>]: never; };
        authority?: string;
    } & { [K_1 in Exclude<keyof I, keyof MsgExecLegacyContent>]: never; }>(base?: I): MsgExecLegacyContent;
    fromPartial<I_1 extends {
        content?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        authority?: string;
    } & {
        content?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["content"], keyof Any>]: never; };
        authority?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgExecLegacyContent>]: never; }>(object: I_1): MsgExecLegacyContent;
};
export declare const MsgExecLegacyContentResponse: {
    encode(_: MsgExecLegacyContentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecLegacyContentResponse;
    fromJSON(_: any): MsgExecLegacyContentResponse;
    toJSON(_: MsgExecLegacyContentResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgExecLegacyContentResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgExecLegacyContentResponse;
};
export declare const MsgVote: {
    encode(message: MsgVote, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgVote;
    fromJSON(object: any): MsgVote;
    toJSON(message: MsgVote): unknown;
    create<I extends {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
    } & {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
    } & { [K in Exclude<keyof I, keyof MsgVote>]: never; }>(base?: I): MsgVote;
    fromPartial<I_1 extends {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
    } & {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgVote>]: never; }>(object: I_1): MsgVote;
};
export declare const MsgVoteResponse: {
    encode(_: MsgVoteResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgVoteResponse;
    fromJSON(_: any): MsgVoteResponse;
    toJSON(_: MsgVoteResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgVoteResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgVoteResponse;
};
export declare const MsgVoteWeighted: {
    encode(message: MsgVoteWeighted, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgVoteWeighted;
    fromJSON(object: any): MsgVoteWeighted;
    toJSON(message: MsgVoteWeighted): unknown;
    create<I extends {
        proposalId?: number;
        voter?: string;
        options?: {
            option?: VoteOption;
            weight?: string;
        }[];
        metadata?: string;
    } & {
        proposalId?: number;
        voter?: string;
        options?: {
            option?: VoteOption;
            weight?: string;
        }[] & ({
            option?: VoteOption;
            weight?: string;
        } & {
            option?: VoteOption;
            weight?: string;
        } & { [K in Exclude<keyof I["options"][number], keyof WeightedVoteOption>]: never; })[] & { [K_1 in Exclude<keyof I["options"], keyof {
            option?: VoteOption;
            weight?: string;
        }[]>]: never; };
        metadata?: string;
    } & { [K_2 in Exclude<keyof I, keyof MsgVoteWeighted>]: never; }>(base?: I): MsgVoteWeighted;
    fromPartial<I_1 extends {
        proposalId?: number;
        voter?: string;
        options?: {
            option?: VoteOption;
            weight?: string;
        }[];
        metadata?: string;
    } & {
        proposalId?: number;
        voter?: string;
        options?: {
            option?: VoteOption;
            weight?: string;
        }[] & ({
            option?: VoteOption;
            weight?: string;
        } & {
            option?: VoteOption;
            weight?: string;
        } & { [K_3 in Exclude<keyof I_1["options"][number], keyof WeightedVoteOption>]: never; })[] & { [K_4 in Exclude<keyof I_1["options"], keyof {
            option?: VoteOption;
            weight?: string;
        }[]>]: never; };
        metadata?: string;
    } & { [K_5 in Exclude<keyof I_1, keyof MsgVoteWeighted>]: never; }>(object: I_1): MsgVoteWeighted;
};
export declare const MsgVoteWeightedResponse: {
    encode(_: MsgVoteWeightedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgVoteWeightedResponse;
    fromJSON(_: any): MsgVoteWeightedResponse;
    toJSON(_: MsgVoteWeightedResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgVoteWeightedResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgVoteWeightedResponse;
};
export declare const MsgDeposit: {
    encode(message: MsgDeposit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeposit;
    fromJSON(object: any): MsgDeposit;
    toJSON(message: MsgDeposit): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["amount"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof MsgDeposit>]: never; }>(base?: I): MsgDeposit;
    fromPartial<I_1 extends {
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
        } & { [K_3 in Exclude<keyof I_1["amount"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof MsgDeposit>]: never; }>(object: I_1): MsgDeposit;
};
export declare const MsgDepositResponse: {
    encode(_: MsgDepositResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositResponse;
    fromJSON(_: any): MsgDepositResponse;
    toJSON(_: MsgDepositResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgDepositResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgDepositResponse;
};
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        authority?: string;
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
    } & {
        authority?: string;
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
            } & { [K in Exclude<keyof I["params"]["minDeposit"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["params"]["minDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_2 in Exclude<keyof I["params"]["maxDepositPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_3 in Exclude<keyof I["params"]["votingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
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
            } & { [K_4 in Exclude<keyof I["params"]["expeditedVotingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
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
            } & { [K_5 in Exclude<keyof I["params"]["expeditedMinDeposit"][number], keyof Coin>]: never; })[] & { [K_6 in Exclude<keyof I["params"]["expeditedMinDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            burnVoteQuorum?: boolean;
            burnProposalDepositPrevote?: boolean;
            burnVoteVeto?: boolean;
            minDepositRatio?: string;
        } & { [K_7 in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_8 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        authority?: string;
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
    } & {
        authority?: string;
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
            } & { [K_9 in Exclude<keyof I_1["params"]["minDeposit"][number], keyof Coin>]: never; })[] & { [K_10 in Exclude<keyof I_1["params"]["minDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            maxDepositPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_11 in Exclude<keyof I_1["params"]["maxDepositPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_12 in Exclude<keyof I_1["params"]["votingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
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
            } & { [K_13 in Exclude<keyof I_1["params"]["expeditedVotingPeriod"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
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
            } & { [K_14 in Exclude<keyof I_1["params"]["expeditedMinDeposit"][number], keyof Coin>]: never; })[] & { [K_15 in Exclude<keyof I_1["params"]["expeditedMinDeposit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            burnVoteQuorum?: boolean;
            burnProposalDepositPrevote?: boolean;
            burnVoteVeto?: boolean;
            minDepositRatio?: string;
        } & { [K_16 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_17 in Exclude<keyof I_1, keyof MsgUpdateParams>]: never; }>(object: I_1): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateParamsResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateParamsResponse;
};
export declare const MsgCancelProposal: {
    encode(message: MsgCancelProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelProposal;
    fromJSON(object: any): MsgCancelProposal;
    toJSON(message: MsgCancelProposal): unknown;
    create<I extends {
        proposalId?: number;
        proposer?: string;
    } & {
        proposalId?: number;
        proposer?: string;
    } & { [K in Exclude<keyof I, keyof MsgCancelProposal>]: never; }>(base?: I): MsgCancelProposal;
    fromPartial<I_1 extends {
        proposalId?: number;
        proposer?: string;
    } & {
        proposalId?: number;
        proposer?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgCancelProposal>]: never; }>(object: I_1): MsgCancelProposal;
};
export declare const MsgCancelProposalResponse: {
    encode(message: MsgCancelProposalResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelProposalResponse;
    fromJSON(object: any): MsgCancelProposalResponse;
    toJSON(message: MsgCancelProposalResponse): unknown;
    create<I extends {
        proposalId?: number;
        canceledTime?: Date | undefined;
        canceledHeight?: number;
    } & {
        proposalId?: number;
        canceledTime?: Date | undefined;
        canceledHeight?: number;
    } & { [K in Exclude<keyof I, keyof MsgCancelProposalResponse>]: never; }>(base?: I): MsgCancelProposalResponse;
    fromPartial<I_1 extends {
        proposalId?: number;
        canceledTime?: Date | undefined;
        canceledHeight?: number;
    } & {
        proposalId?: number;
        canceledTime?: Date | undefined;
        canceledHeight?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgCancelProposalResponse>]: never; }>(object: I_1): MsgCancelProposalResponse;
};
/** Msg defines the gov Msg service. */
export interface Msg {
    /** SubmitProposal defines a method to create new proposal given the messages. */
    SubmitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse>;
    /**
     * ExecLegacyContent defines a Msg to be in included in a MsgSubmitProposal
     * to execute a legacy content-based proposal.
     */
    ExecLegacyContent(request: MsgExecLegacyContent): Promise<MsgExecLegacyContentResponse>;
    /** Vote defines a method to add a vote on a specific proposal. */
    Vote(request: MsgVote): Promise<MsgVoteResponse>;
    /** VoteWeighted defines a method to add a weighted vote on a specific proposal. */
    VoteWeighted(request: MsgVoteWeighted): Promise<MsgVoteWeightedResponse>;
    /** Deposit defines a method to add deposit on a specific proposal. */
    Deposit(request: MsgDeposit): Promise<MsgDepositResponse>;
    /**
     * UpdateParams defines a governance operation for updating the x/gov module
     * parameters. The authority is defined in the keeper.
     *
     * Since: cosmos-sdk 0.47
     */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /**
     * CancelProposal defines a method to cancel governance proposal
     *
     * Since: cosmos-sdk 0.50
     */
    CancelProposal(request: MsgCancelProposal): Promise<MsgCancelProposalResponse>;
}
export declare const MsgServiceName = "cosmos.gov.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    SubmitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse>;
    ExecLegacyContent(request: MsgExecLegacyContent): Promise<MsgExecLegacyContentResponse>;
    Vote(request: MsgVote): Promise<MsgVoteResponse>;
    VoteWeighted(request: MsgVoteWeighted): Promise<MsgVoteWeightedResponse>;
    Deposit(request: MsgDeposit): Promise<MsgDepositResponse>;
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    CancelProposal(request: MsgCancelProposal): Promise<MsgCancelProposalResponse>;
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
