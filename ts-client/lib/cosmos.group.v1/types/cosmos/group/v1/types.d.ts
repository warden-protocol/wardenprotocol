import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
export declare const protobufPackage = "cosmos.group.v1";
/** Since: cosmos-sdk 0.46 */
/** VoteOption enumerates the valid vote options for a given proposal. */
export declare enum VoteOption {
    /**
     * VOTE_OPTION_UNSPECIFIED - VOTE_OPTION_UNSPECIFIED defines an unspecified vote option which will
     * return an error.
     */
    VOTE_OPTION_UNSPECIFIED = 0,
    /** VOTE_OPTION_YES - VOTE_OPTION_YES defines a yes vote option. */
    VOTE_OPTION_YES = 1,
    /** VOTE_OPTION_ABSTAIN - VOTE_OPTION_ABSTAIN defines an abstain vote option. */
    VOTE_OPTION_ABSTAIN = 2,
    /** VOTE_OPTION_NO - VOTE_OPTION_NO defines a no vote option. */
    VOTE_OPTION_NO = 3,
    /** VOTE_OPTION_NO_WITH_VETO - VOTE_OPTION_NO_WITH_VETO defines a no with veto vote option. */
    VOTE_OPTION_NO_WITH_VETO = 4,
    UNRECOGNIZED = -1
}
export declare function voteOptionFromJSON(object: any): VoteOption;
export declare function voteOptionToJSON(object: VoteOption): string;
/** ProposalStatus defines proposal statuses. */
export declare enum ProposalStatus {
    /** PROPOSAL_STATUS_UNSPECIFIED - An empty value is invalid and not allowed. */
    PROPOSAL_STATUS_UNSPECIFIED = 0,
    /** PROPOSAL_STATUS_SUBMITTED - Initial status of a proposal when submitted. */
    PROPOSAL_STATUS_SUBMITTED = 1,
    /**
     * PROPOSAL_STATUS_ACCEPTED - Final status of a proposal when the final tally is done and the outcome
     * passes the group policy's decision policy.
     */
    PROPOSAL_STATUS_ACCEPTED = 2,
    /**
     * PROPOSAL_STATUS_REJECTED - Final status of a proposal when the final tally is done and the outcome
     * is rejected by the group policy's decision policy.
     */
    PROPOSAL_STATUS_REJECTED = 3,
    /**
     * PROPOSAL_STATUS_ABORTED - Final status of a proposal when the group policy is modified before the
     * final tally.
     */
    PROPOSAL_STATUS_ABORTED = 4,
    /**
     * PROPOSAL_STATUS_WITHDRAWN - A proposal can be withdrawn before the voting start time by the owner.
     * When this happens the final status is Withdrawn.
     */
    PROPOSAL_STATUS_WITHDRAWN = 5,
    UNRECOGNIZED = -1
}
export declare function proposalStatusFromJSON(object: any): ProposalStatus;
export declare function proposalStatusToJSON(object: ProposalStatus): string;
/** ProposalExecutorResult defines types of proposal executor results. */
export declare enum ProposalExecutorResult {
    /** PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED - An empty value is not allowed. */
    PROPOSAL_EXECUTOR_RESULT_UNSPECIFIED = 0,
    /** PROPOSAL_EXECUTOR_RESULT_NOT_RUN - We have not yet run the executor. */
    PROPOSAL_EXECUTOR_RESULT_NOT_RUN = 1,
    /** PROPOSAL_EXECUTOR_RESULT_SUCCESS - The executor was successful and proposed action updated state. */
    PROPOSAL_EXECUTOR_RESULT_SUCCESS = 2,
    /** PROPOSAL_EXECUTOR_RESULT_FAILURE - The executor returned an error and proposed action didn't update state. */
    PROPOSAL_EXECUTOR_RESULT_FAILURE = 3,
    UNRECOGNIZED = -1
}
export declare function proposalExecutorResultFromJSON(object: any): ProposalExecutorResult;
export declare function proposalExecutorResultToJSON(object: ProposalExecutorResult): string;
/**
 * Member represents a group member with an account address,
 * non-zero weight, metadata and added_at timestamp.
 */
export interface Member {
    /** address is the member's account address. */
    address: string;
    /** weight is the member's voting weight that should be greater than 0. */
    weight: string;
    /** metadata is any arbitrary metadata attached to the member. */
    metadata: string;
    /** added_at is a timestamp specifying when a member was added. */
    addedAt: Date | undefined;
}
/**
 * MemberRequest represents a group member to be used in Msg server requests.
 * Contrary to `Member`, it doesn't have any `added_at` field
 * since this field cannot be set as part of requests.
 */
export interface MemberRequest {
    /** address is the member's account address. */
    address: string;
    /** weight is the member's voting weight that should be greater than 0. */
    weight: string;
    /** metadata is any arbitrary metadata attached to the member. */
    metadata: string;
}
/**
 * ThresholdDecisionPolicy is a decision policy where a proposal passes when it
 * satisfies the two following conditions:
 * 1. The sum of all `YES` voter's weights is greater or equal than the defined
 *    `threshold`.
 * 2. The voting and execution periods of the proposal respect the parameters
 *    given by `windows`.
 */
export interface ThresholdDecisionPolicy {
    /**
     * threshold is the minimum weighted sum of `YES` votes that must be met or
     * exceeded for a proposal to succeed.
     */
    threshold: string;
    /** windows defines the different windows for voting and execution. */
    windows: DecisionPolicyWindows | undefined;
}
/**
 * PercentageDecisionPolicy is a decision policy where a proposal passes when
 * it satisfies the two following conditions:
 * 1. The percentage of all `YES` voters' weights out of the total group weight
 *    is greater or equal than the given `percentage`.
 * 2. The voting and execution periods of the proposal respect the parameters
 *    given by `windows`.
 */
export interface PercentageDecisionPolicy {
    /**
     * percentage is the minimum percentage of the weighted sum of `YES` votes must
     * meet for a proposal to succeed.
     */
    percentage: string;
    /** windows defines the different windows for voting and execution. */
    windows: DecisionPolicyWindows | undefined;
}
/** DecisionPolicyWindows defines the different windows for voting and execution. */
export interface DecisionPolicyWindows {
    /**
     * voting_period is the duration from submission of a proposal to the end of voting period
     * Within this times votes can be submitted with MsgVote.
     */
    votingPeriod: Duration | undefined;
    /**
     * min_execution_period is the minimum duration after the proposal submission
     * where members can start sending MsgExec. This means that the window for
     * sending a MsgExec transaction is:
     * `[ submission + min_execution_period ; submission + voting_period + max_execution_period]`
     * where max_execution_period is a app-specific config, defined in the keeper.
     * If not set, min_execution_period will default to 0.
     *
     * Please make sure to set a `min_execution_period` that is smaller than
     * `voting_period + max_execution_period`, or else the above execution window
     * is empty, meaning that all proposals created with this decision policy
     * won't be able to be executed.
     */
    minExecutionPeriod: Duration | undefined;
}
/** GroupInfo represents the high-level on-chain information for a group. */
export interface GroupInfo {
    /** id is the unique ID of the group. */
    id: number;
    /** admin is the account address of the group's admin. */
    admin: string;
    /**
     * metadata is any arbitrary metadata to attached to the group.
     * the recommended format of the metadata is to be found here: https://docs.cosmos.network/v0.47/modules/group#group-1
     */
    metadata: string;
    /**
     * version is used to track changes to a group's membership structure that
     * would break existing proposals. Whenever any members weight is changed,
     * or any member is added or removed this version is incremented and will
     * cause proposals based on older versions of this group to fail
     */
    version: number;
    /** total_weight is the sum of the group members' weights. */
    totalWeight: string;
    /** created_at is a timestamp specifying when a group was created. */
    createdAt: Date | undefined;
}
/** GroupMember represents the relationship between a group and a member. */
export interface GroupMember {
    /** group_id is the unique ID of the group. */
    groupId: number;
    /** member is the member data. */
    member: Member | undefined;
}
/** GroupPolicyInfo represents the high-level on-chain information for a group policy. */
export interface GroupPolicyInfo {
    /** address is the account address of group policy. */
    address: string;
    /** group_id is the unique ID of the group. */
    groupId: number;
    /** admin is the account address of the group admin. */
    admin: string;
    /**
     * metadata is any arbitrary metadata attached to the group policy.
     * the recommended format of the metadata is to be found here:
     * https://docs.cosmos.network/v0.47/modules/group#decision-policy-1
     */
    metadata: string;
    /**
     * version is used to track changes to a group's GroupPolicyInfo structure that
     * would create a different result on a running proposal.
     */
    version: number;
    /** decision_policy specifies the group policy's decision policy. */
    decisionPolicy: Any | undefined;
    /** created_at is a timestamp specifying when a group policy was created. */
    createdAt: Date | undefined;
}
/**
 * Proposal defines a group proposal. Any member of a group can submit a proposal
 * for a group policy to decide upon.
 * A proposal consists of a set of `sdk.Msg`s that will be executed if the proposal
 * passes as well as some optional metadata associated with the proposal.
 */
export interface Proposal {
    /** id is the unique id of the proposal. */
    id: number;
    /** group_policy_address is the account address of group policy. */
    groupPolicyAddress: string;
    /**
     * metadata is any arbitrary metadata attached to the proposal.
     * the recommended format of the metadata is to be found here:
     * https://docs.cosmos.network/v0.47/modules/group#proposal-4
     */
    metadata: string;
    /** proposers are the account addresses of the proposers. */
    proposers: string[];
    /** submit_time is a timestamp specifying when a proposal was submitted. */
    submitTime: Date | undefined;
    /**
     * group_version tracks the version of the group at proposal submission.
     * This field is here for informational purposes only.
     */
    groupVersion: number;
    /**
     * group_policy_version tracks the version of the group policy at proposal submission.
     * When a decision policy is changed, existing proposals from previous policy
     * versions will become invalid with the `ABORTED` status.
     * This field is here for informational purposes only.
     */
    groupPolicyVersion: number;
    /** status represents the high level position in the life cycle of the proposal. Initial value is Submitted. */
    status: ProposalStatus;
    /**
     * final_tally_result contains the sums of all weighted votes for this
     * proposal for each vote option. It is empty at submission, and only
     * populated after tallying, at voting period end or at proposal execution,
     * whichever happens first.
     */
    finalTallyResult: TallyResult | undefined;
    /**
     * voting_period_end is the timestamp before which voting must be done.
     * Unless a successful MsgExec is called before (to execute a proposal whose
     * tally is successful before the voting period ends), tallying will be done
     * at this point, and the `final_tally_result`and `status` fields will be
     * accordingly updated.
     */
    votingPeriodEnd: Date | undefined;
    /** executor_result is the final result of the proposal execution. Initial value is NotRun. */
    executorResult: ProposalExecutorResult;
    /** messages is a list of `sdk.Msg`s that will be executed if the proposal passes. */
    messages: Any[];
    /**
     * title is the title of the proposal
     *
     * Since: cosmos-sdk 0.47
     */
    title: string;
    /**
     * summary is a short summary of the proposal
     *
     * Since: cosmos-sdk 0.47
     */
    summary: string;
}
/** TallyResult represents the sum of weighted votes for each vote option. */
export interface TallyResult {
    /** yes_count is the weighted sum of yes votes. */
    yesCount: string;
    /** abstain_count is the weighted sum of abstainers. */
    abstainCount: string;
    /** no_count is the weighted sum of no votes. */
    noCount: string;
    /** no_with_veto_count is the weighted sum of veto. */
    noWithVetoCount: string;
}
/** Vote represents a vote for a proposal.string metadata */
export interface Vote {
    /** proposal is the unique ID of the proposal. */
    proposalId: number;
    /** voter is the account address of the voter. */
    voter: string;
    /** option is the voter's choice on the proposal. */
    option: VoteOption;
    /**
     * metadata is any arbitrary metadata attached to the vote.
     * the recommended format of the metadata is to be found here: https://docs.cosmos.network/v0.47/modules/group#vote-2
     */
    metadata: string;
    /** submit_time is the timestamp when the vote was submitted. */
    submitTime: Date | undefined;
}
export declare const Member: {
    encode(message: Member, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Member;
    fromJSON(object: any): Member;
    toJSON(message: Member): unknown;
    create<I extends {
        address?: string;
        weight?: string;
        metadata?: string;
        addedAt?: Date | undefined;
    } & {
        address?: string;
        weight?: string;
        metadata?: string;
        addedAt?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof Member>]: never; }>(base?: I): Member;
    fromPartial<I_1 extends {
        address?: string;
        weight?: string;
        metadata?: string;
        addedAt?: Date | undefined;
    } & {
        address?: string;
        weight?: string;
        metadata?: string;
        addedAt?: Date | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Member>]: never; }>(object: I_1): Member;
};
export declare const MemberRequest: {
    encode(message: MemberRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MemberRequest;
    fromJSON(object: any): MemberRequest;
    toJSON(message: MemberRequest): unknown;
    create<I extends {
        address?: string;
        weight?: string;
        metadata?: string;
    } & {
        address?: string;
        weight?: string;
        metadata?: string;
    } & { [K in Exclude<keyof I, keyof MemberRequest>]: never; }>(base?: I): MemberRequest;
    fromPartial<I_1 extends {
        address?: string;
        weight?: string;
        metadata?: string;
    } & {
        address?: string;
        weight?: string;
        metadata?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MemberRequest>]: never; }>(object: I_1): MemberRequest;
};
export declare const ThresholdDecisionPolicy: {
    encode(message: ThresholdDecisionPolicy, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ThresholdDecisionPolicy;
    fromJSON(object: any): ThresholdDecisionPolicy;
    toJSON(message: ThresholdDecisionPolicy): unknown;
    create<I extends {
        threshold?: string;
        windows?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            minExecutionPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        };
    } & {
        threshold?: string;
        windows?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            minExecutionPeriod?: {
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
            } & { [K in Exclude<keyof I["windows"]["votingPeriod"], keyof Duration>]: never; };
            minExecutionPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_1 in Exclude<keyof I["windows"]["minExecutionPeriod"], keyof Duration>]: never; };
        } & { [K_2 in Exclude<keyof I["windows"], keyof DecisionPolicyWindows>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof ThresholdDecisionPolicy>]: never; }>(base?: I): ThresholdDecisionPolicy;
    fromPartial<I_1 extends {
        threshold?: string;
        windows?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            minExecutionPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        };
    } & {
        threshold?: string;
        windows?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            minExecutionPeriod?: {
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
            } & { [K_4 in Exclude<keyof I_1["windows"]["votingPeriod"], keyof Duration>]: never; };
            minExecutionPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_5 in Exclude<keyof I_1["windows"]["minExecutionPeriod"], keyof Duration>]: never; };
        } & { [K_6 in Exclude<keyof I_1["windows"], keyof DecisionPolicyWindows>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof ThresholdDecisionPolicy>]: never; }>(object: I_1): ThresholdDecisionPolicy;
};
export declare const PercentageDecisionPolicy: {
    encode(message: PercentageDecisionPolicy, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PercentageDecisionPolicy;
    fromJSON(object: any): PercentageDecisionPolicy;
    toJSON(message: PercentageDecisionPolicy): unknown;
    create<I extends {
        percentage?: string;
        windows?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            minExecutionPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        };
    } & {
        percentage?: string;
        windows?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            minExecutionPeriod?: {
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
            } & { [K in Exclude<keyof I["windows"]["votingPeriod"], keyof Duration>]: never; };
            minExecutionPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_1 in Exclude<keyof I["windows"]["minExecutionPeriod"], keyof Duration>]: never; };
        } & { [K_2 in Exclude<keyof I["windows"], keyof DecisionPolicyWindows>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof PercentageDecisionPolicy>]: never; }>(base?: I): PercentageDecisionPolicy;
    fromPartial<I_1 extends {
        percentage?: string;
        windows?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            minExecutionPeriod?: {
                seconds?: number;
                nanos?: number;
            };
        };
    } & {
        percentage?: string;
        windows?: {
            votingPeriod?: {
                seconds?: number;
                nanos?: number;
            };
            minExecutionPeriod?: {
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
            } & { [K_4 in Exclude<keyof I_1["windows"]["votingPeriod"], keyof Duration>]: never; };
            minExecutionPeriod?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_5 in Exclude<keyof I_1["windows"]["minExecutionPeriod"], keyof Duration>]: never; };
        } & { [K_6 in Exclude<keyof I_1["windows"], keyof DecisionPolicyWindows>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof PercentageDecisionPolicy>]: never; }>(object: I_1): PercentageDecisionPolicy;
};
export declare const DecisionPolicyWindows: {
    encode(message: DecisionPolicyWindows, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DecisionPolicyWindows;
    fromJSON(object: any): DecisionPolicyWindows;
    toJSON(message: DecisionPolicyWindows): unknown;
    create<I extends {
        votingPeriod?: {
            seconds?: number;
            nanos?: number;
        };
        minExecutionPeriod?: {
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
        } & { [K in Exclude<keyof I["votingPeriod"], keyof Duration>]: never; };
        minExecutionPeriod?: {
            seconds?: number;
            nanos?: number;
        } & {
            seconds?: number;
            nanos?: number;
        } & { [K_1 in Exclude<keyof I["minExecutionPeriod"], keyof Duration>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof DecisionPolicyWindows>]: never; }>(base?: I): DecisionPolicyWindows;
    fromPartial<I_1 extends {
        votingPeriod?: {
            seconds?: number;
            nanos?: number;
        };
        minExecutionPeriod?: {
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
        } & { [K_3 in Exclude<keyof I_1["votingPeriod"], keyof Duration>]: never; };
        minExecutionPeriod?: {
            seconds?: number;
            nanos?: number;
        } & {
            seconds?: number;
            nanos?: number;
        } & { [K_4 in Exclude<keyof I_1["minExecutionPeriod"], keyof Duration>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof DecisionPolicyWindows>]: never; }>(object: I_1): DecisionPolicyWindows;
};
export declare const GroupInfo: {
    encode(message: GroupInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GroupInfo;
    fromJSON(object: any): GroupInfo;
    toJSON(message: GroupInfo): unknown;
    create<I extends {
        id?: number;
        admin?: string;
        metadata?: string;
        version?: number;
        totalWeight?: string;
        createdAt?: Date | undefined;
    } & {
        id?: number;
        admin?: string;
        metadata?: string;
        version?: number;
        totalWeight?: string;
        createdAt?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof GroupInfo>]: never; }>(base?: I): GroupInfo;
    fromPartial<I_1 extends {
        id?: number;
        admin?: string;
        metadata?: string;
        version?: number;
        totalWeight?: string;
        createdAt?: Date | undefined;
    } & {
        id?: number;
        admin?: string;
        metadata?: string;
        version?: number;
        totalWeight?: string;
        createdAt?: Date | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof GroupInfo>]: never; }>(object: I_1): GroupInfo;
};
export declare const GroupMember: {
    encode(message: GroupMember, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GroupMember;
    fromJSON(object: any): GroupMember;
    toJSON(message: GroupMember): unknown;
    create<I extends {
        groupId?: number;
        member?: {
            address?: string;
            weight?: string;
            metadata?: string;
            addedAt?: Date | undefined;
        };
    } & {
        groupId?: number;
        member?: {
            address?: string;
            weight?: string;
            metadata?: string;
            addedAt?: Date | undefined;
        } & {
            address?: string;
            weight?: string;
            metadata?: string;
            addedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["member"], keyof Member>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof GroupMember>]: never; }>(base?: I): GroupMember;
    fromPartial<I_1 extends {
        groupId?: number;
        member?: {
            address?: string;
            weight?: string;
            metadata?: string;
            addedAt?: Date | undefined;
        };
    } & {
        groupId?: number;
        member?: {
            address?: string;
            weight?: string;
            metadata?: string;
            addedAt?: Date | undefined;
        } & {
            address?: string;
            weight?: string;
            metadata?: string;
            addedAt?: Date | undefined;
        } & { [K_2 in Exclude<keyof I_1["member"], keyof Member>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof GroupMember>]: never; }>(object: I_1): GroupMember;
};
export declare const GroupPolicyInfo: {
    encode(message: GroupPolicyInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GroupPolicyInfo;
    fromJSON(object: any): GroupPolicyInfo;
    toJSON(message: GroupPolicyInfo): unknown;
    create<I extends {
        address?: string;
        groupId?: number;
        admin?: string;
        metadata?: string;
        version?: number;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        createdAt?: Date | undefined;
    } & {
        address?: string;
        groupId?: number;
        admin?: string;
        metadata?: string;
        version?: number;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["decisionPolicy"], keyof Any>]: never; };
        createdAt?: Date | undefined;
    } & { [K_1 in Exclude<keyof I, keyof GroupPolicyInfo>]: never; }>(base?: I): GroupPolicyInfo;
    fromPartial<I_1 extends {
        address?: string;
        groupId?: number;
        admin?: string;
        metadata?: string;
        version?: number;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        createdAt?: Date | undefined;
    } & {
        address?: string;
        groupId?: number;
        admin?: string;
        metadata?: string;
        version?: number;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["decisionPolicy"], keyof Any>]: never; };
        createdAt?: Date | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof GroupPolicyInfo>]: never; }>(object: I_1): GroupPolicyInfo;
};
export declare const Proposal: {
    encode(message: Proposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Proposal;
    fromJSON(object: any): Proposal;
    toJSON(message: Proposal): unknown;
    create<I extends {
        id?: number;
        groupPolicyAddress?: string;
        metadata?: string;
        proposers?: string[];
        submitTime?: Date | undefined;
        groupVersion?: number;
        groupPolicyVersion?: number;
        status?: ProposalStatus;
        finalTallyResult?: {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        };
        votingPeriodEnd?: Date | undefined;
        executorResult?: ProposalExecutorResult;
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
        title?: string;
        summary?: string;
    } & {
        id?: number;
        groupPolicyAddress?: string;
        metadata?: string;
        proposers?: string[] & string[] & { [K in Exclude<keyof I["proposers"], keyof string[]>]: never; };
        submitTime?: Date | undefined;
        groupVersion?: number;
        groupPolicyVersion?: number;
        status?: ProposalStatus;
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
        } & { [K_1 in Exclude<keyof I["finalTallyResult"], keyof TallyResult>]: never; };
        votingPeriodEnd?: Date | undefined;
        executorResult?: ProposalExecutorResult;
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I["messages"][number], keyof Any>]: never; })[] & { [K_3 in Exclude<keyof I["messages"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
        title?: string;
        summary?: string;
    } & { [K_4 in Exclude<keyof I, keyof Proposal>]: never; }>(base?: I): Proposal;
    fromPartial<I_1 extends {
        id?: number;
        groupPolicyAddress?: string;
        metadata?: string;
        proposers?: string[];
        submitTime?: Date | undefined;
        groupVersion?: number;
        groupPolicyVersion?: number;
        status?: ProposalStatus;
        finalTallyResult?: {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        };
        votingPeriodEnd?: Date | undefined;
        executorResult?: ProposalExecutorResult;
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
        title?: string;
        summary?: string;
    } & {
        id?: number;
        groupPolicyAddress?: string;
        metadata?: string;
        proposers?: string[] & string[] & { [K_5 in Exclude<keyof I_1["proposers"], keyof string[]>]: never; };
        submitTime?: Date | undefined;
        groupVersion?: number;
        groupPolicyVersion?: number;
        status?: ProposalStatus;
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
        } & { [K_6 in Exclude<keyof I_1["finalTallyResult"], keyof TallyResult>]: never; };
        votingPeriodEnd?: Date | undefined;
        executorResult?: ProposalExecutorResult;
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_7 in Exclude<keyof I_1["messages"][number], keyof Any>]: never; })[] & { [K_8 in Exclude<keyof I_1["messages"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
        title?: string;
        summary?: string;
    } & { [K_9 in Exclude<keyof I_1, keyof Proposal>]: never; }>(object: I_1): Proposal;
};
export declare const TallyResult: {
    encode(message: TallyResult, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TallyResult;
    fromJSON(object: any): TallyResult;
    toJSON(message: TallyResult): unknown;
    create<I extends {
        yesCount?: string;
        abstainCount?: string;
        noCount?: string;
        noWithVetoCount?: string;
    } & {
        yesCount?: string;
        abstainCount?: string;
        noCount?: string;
        noWithVetoCount?: string;
    } & { [K in Exclude<keyof I, keyof TallyResult>]: never; }>(base?: I): TallyResult;
    fromPartial<I_1 extends {
        yesCount?: string;
        abstainCount?: string;
        noCount?: string;
        noWithVetoCount?: string;
    } & {
        yesCount?: string;
        abstainCount?: string;
        noCount?: string;
        noWithVetoCount?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof TallyResult>]: never; }>(object: I_1): TallyResult;
};
export declare const Vote: {
    encode(message: Vote, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Vote;
    fromJSON(object: any): Vote;
    toJSON(message: Vote): unknown;
    create<I extends {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
        submitTime?: Date | undefined;
    } & {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
        submitTime?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof Vote>]: never; }>(base?: I): Vote;
    fromPartial<I_1 extends {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
        submitTime?: Date | undefined;
    } & {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
        submitTime?: Date | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Vote>]: never; }>(object: I_1): Vote;
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
