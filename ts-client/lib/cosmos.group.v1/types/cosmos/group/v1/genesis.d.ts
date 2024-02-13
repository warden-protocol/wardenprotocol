import _m0 from "protobufjs/minimal";
import { GroupInfo, GroupMember, GroupPolicyInfo, Proposal, Vote } from "./types";
export declare const protobufPackage = "cosmos.group.v1";
/** Since: cosmos-sdk 0.46 */
/** GenesisState defines the group module's genesis state. */
export interface GenesisState {
    /**
     * group_seq is the group table orm.Sequence,
     * it is used to get the next group ID.
     */
    groupSeq: number;
    /** groups is the list of groups info. */
    groups: GroupInfo[];
    /** group_members is the list of groups members. */
    groupMembers: GroupMember[];
    /**
     * group_policy_seq is the group policy table orm.Sequence,
     * it is used to generate the next group policy account address.
     */
    groupPolicySeq: number;
    /** group_policies is the list of group policies info. */
    groupPolicies: GroupPolicyInfo[];
    /**
     * proposal_seq is the proposal table orm.Sequence,
     * it is used to get the next proposal ID.
     */
    proposalSeq: number;
    /** proposals is the list of proposals. */
    proposals: Proposal[];
    /** votes is the list of votes. */
    votes: Vote[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        groupSeq?: number;
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[];
        groupMembers?: {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[];
        groupPolicySeq?: number;
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[];
        proposalSeq?: number;
        proposals?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[];
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[];
    } & {
        groupSeq?: number;
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[] & ({
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & { [K in Exclude<keyof I["groups"][number], keyof GroupInfo>]: never; })[] & { [K_1 in Exclude<keyof I["groups"], keyof {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[]>]: never; };
        groupMembers?: {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[] & ({
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        } & {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            } & {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            } & { [K_2 in Exclude<keyof I["groupMembers"][number]["member"], keyof import("./types").Member>]: never; };
        } & { [K_3 in Exclude<keyof I["groupMembers"][number], keyof GroupMember>]: never; })[] & { [K_4 in Exclude<keyof I["groupMembers"], keyof {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[]>]: never; };
        groupPolicySeq?: number;
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[] & ({
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
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
            } & { [K_5 in Exclude<keyof I["groupPolicies"][number]["decisionPolicy"], keyof import("../../../google/protobuf/any").Any>]: never; };
            createdAt?: Date;
        } & { [K_6 in Exclude<keyof I["groupPolicies"][number], keyof GroupPolicyInfo>]: never; })[] & { [K_7 in Exclude<keyof I["groupPolicies"], keyof {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[]>]: never; };
        proposalSeq?: number;
        proposals?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[] & ({
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
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
            proposers?: string[] & string[] & { [K_8 in Exclude<keyof I["proposals"][number]["proposers"], keyof string[]>]: never; };
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
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
            } & { [K_9 in Exclude<keyof I["proposals"][number]["finalTallyResult"], keyof import("./types").TallyResult>]: never; };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[] & ({
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_10 in Exclude<keyof I["proposals"][number]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_11 in Exclude<keyof I["proposals"][number]["messages"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
            title?: string;
            summary?: string;
        } & { [K_12 in Exclude<keyof I["proposals"][number], keyof Proposal>]: never; })[] & { [K_13 in Exclude<keyof I["proposals"], keyof {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[]>]: never; };
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[] & ({
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & { [K_14 in Exclude<keyof I["votes"][number], keyof Vote>]: never; })[] & { [K_15 in Exclude<keyof I["votes"], keyof {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[]>]: never; };
    } & { [K_16 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        groupSeq?: number;
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[];
        groupMembers?: {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[];
        groupPolicySeq?: number;
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[];
        proposalSeq?: number;
        proposals?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[];
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[];
    } & {
        groupSeq?: number;
        groups?: {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[] & ({
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        } & { [K_17 in Exclude<keyof I_1["groups"][number], keyof GroupInfo>]: never; })[] & { [K_18 in Exclude<keyof I_1["groups"], keyof {
            id?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            totalWeight?: string;
            createdAt?: Date;
        }[]>]: never; };
        groupMembers?: {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[] & ({
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        } & {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            } & {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            } & { [K_19 in Exclude<keyof I_1["groupMembers"][number]["member"], keyof import("./types").Member>]: never; };
        } & { [K_20 in Exclude<keyof I_1["groupMembers"][number], keyof GroupMember>]: never; })[] & { [K_21 in Exclude<keyof I_1["groupMembers"], keyof {
            groupId?: number;
            member?: {
                address?: string;
                weight?: string;
                metadata?: string;
                addedAt?: Date;
            };
        }[]>]: never; };
        groupPolicySeq?: number;
        groupPolicies?: {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[] & ({
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
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
            } & { [K_22 in Exclude<keyof I_1["groupPolicies"][number]["decisionPolicy"], keyof import("../../../google/protobuf/any").Any>]: never; };
            createdAt?: Date;
        } & { [K_23 in Exclude<keyof I_1["groupPolicies"][number], keyof GroupPolicyInfo>]: never; })[] & { [K_24 in Exclude<keyof I_1["groupPolicies"], keyof {
            address?: string;
            groupId?: number;
            admin?: string;
            metadata?: string;
            version?: number;
            decisionPolicy?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            createdAt?: Date;
        }[]>]: never; };
        proposalSeq?: number;
        proposals?: {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[] & ({
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
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
            proposers?: string[] & string[] & { [K_25 in Exclude<keyof I_1["proposals"][number]["proposers"], keyof string[]>]: never; };
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
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
            } & { [K_26 in Exclude<keyof I_1["proposals"][number]["finalTallyResult"], keyof import("./types").TallyResult>]: never; };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[] & ({
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_27 in Exclude<keyof I_1["proposals"][number]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_28 in Exclude<keyof I_1["proposals"][number]["messages"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
            title?: string;
            summary?: string;
        } & { [K_29 in Exclude<keyof I_1["proposals"][number], keyof Proposal>]: never; })[] & { [K_30 in Exclude<keyof I_1["proposals"], keyof {
            id?: number;
            groupPolicyAddress?: string;
            metadata?: string;
            proposers?: string[];
            submitTime?: Date;
            groupVersion?: number;
            groupPolicyVersion?: number;
            status?: import("./types").ProposalStatus;
            finalTallyResult?: {
                yesCount?: string;
                abstainCount?: string;
                noCount?: string;
                noWithVetoCount?: string;
            };
            votingPeriodEnd?: Date;
            executorResult?: import("./types").ProposalExecutorResult;
            messages?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
            title?: string;
            summary?: string;
        }[]>]: never; };
        votes?: {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[] & ({
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        } & { [K_31 in Exclude<keyof I_1["votes"][number], keyof Vote>]: never; })[] & { [K_32 in Exclude<keyof I_1["votes"], keyof {
            proposalId?: number;
            voter?: string;
            option?: import("./types").VoteOption;
            metadata?: string;
            submitTime?: Date;
        }[]>]: never; };
    } & { [K_33 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
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
