import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { MemberRequest, ProposalExecutorResult, VoteOption } from "./types";
export declare const protobufPackage = "cosmos.group.v1";
/** Since: cosmos-sdk 0.46 */
/** Exec defines modes of execution of a proposal on creation or on new vote. */
export declare enum Exec {
    /**
     * EXEC_UNSPECIFIED - An empty value means that there should be a separate
     * MsgExec request for the proposal to execute.
     */
    EXEC_UNSPECIFIED = 0,
    /**
     * EXEC_TRY - Try to execute the proposal immediately.
     * If the proposal is not allowed per the DecisionPolicy,
     * the proposal will still be open and could
     * be executed at a later point.
     */
    EXEC_TRY = 1,
    UNRECOGNIZED = -1
}
export declare function execFromJSON(object: any): Exec;
export declare function execToJSON(object: Exec): string;
/** MsgCreateGroup is the Msg/CreateGroup request type. */
export interface MsgCreateGroup {
    /** admin is the account address of the group admin. */
    admin: string;
    /** members defines the group members. */
    members: MemberRequest[];
    /** metadata is any arbitrary metadata to attached to the group. */
    metadata: string;
}
/** MsgCreateGroupResponse is the Msg/CreateGroup response type. */
export interface MsgCreateGroupResponse {
    /** group_id is the unique ID of the newly created group. */
    groupId: number;
}
/** MsgUpdateGroupMembers is the Msg/UpdateGroupMembers request type. */
export interface MsgUpdateGroupMembers {
    /** admin is the account address of the group admin. */
    admin: string;
    /** group_id is the unique ID of the group. */
    groupId: number;
    /**
     * member_updates is the list of members to update,
     * set weight to 0 to remove a member.
     */
    memberUpdates: MemberRequest[];
}
/** MsgUpdateGroupMembersResponse is the Msg/UpdateGroupMembers response type. */
export interface MsgUpdateGroupMembersResponse {
}
/** MsgUpdateGroupAdmin is the Msg/UpdateGroupAdmin request type. */
export interface MsgUpdateGroupAdmin {
    /** admin is the current account address of the group admin. */
    admin: string;
    /** group_id is the unique ID of the group. */
    groupId: number;
    /** new_admin is the group new admin account address. */
    newAdmin: string;
}
/** MsgUpdateGroupAdminResponse is the Msg/UpdateGroupAdmin response type. */
export interface MsgUpdateGroupAdminResponse {
}
/** MsgUpdateGroupMetadata is the Msg/UpdateGroupMetadata request type. */
export interface MsgUpdateGroupMetadata {
    /** admin is the account address of the group admin. */
    admin: string;
    /** group_id is the unique ID of the group. */
    groupId: number;
    /** metadata is the updated group's metadata. */
    metadata: string;
}
/** MsgUpdateGroupMetadataResponse is the Msg/UpdateGroupMetadata response type. */
export interface MsgUpdateGroupMetadataResponse {
}
/** MsgCreateGroupPolicy is the Msg/CreateGroupPolicy request type. */
export interface MsgCreateGroupPolicy {
    /** admin is the account address of the group admin. */
    admin: string;
    /** group_id is the unique ID of the group. */
    groupId: number;
    /** metadata is any arbitrary metadata attached to the group policy. */
    metadata: string;
    /** decision_policy specifies the group policy's decision policy. */
    decisionPolicy: Any | undefined;
}
/** MsgCreateGroupPolicyResponse is the Msg/CreateGroupPolicy response type. */
export interface MsgCreateGroupPolicyResponse {
    /** address is the account address of the newly created group policy. */
    address: string;
}
/** MsgUpdateGroupPolicyAdmin is the Msg/UpdateGroupPolicyAdmin request type. */
export interface MsgUpdateGroupPolicyAdmin {
    /** admin is the account address of the group admin. */
    admin: string;
    /** group_policy_address is the account address of the group policy. */
    groupPolicyAddress: string;
    /** new_admin is the new group policy admin. */
    newAdmin: string;
}
/** MsgUpdateGroupPolicyAdminResponse is the Msg/UpdateGroupPolicyAdmin response type. */
export interface MsgUpdateGroupPolicyAdminResponse {
}
/** MsgCreateGroupWithPolicy is the Msg/CreateGroupWithPolicy request type. */
export interface MsgCreateGroupWithPolicy {
    /** admin is the account address of the group and group policy admin. */
    admin: string;
    /** members defines the group members. */
    members: MemberRequest[];
    /** group_metadata is any arbitrary metadata attached to the group. */
    groupMetadata: string;
    /** group_policy_metadata is any arbitrary metadata attached to the group policy. */
    groupPolicyMetadata: string;
    /**
     * group_policy_as_admin is a boolean field, if set to true, the group policy account address will be used as group
     * and group policy admin.
     */
    groupPolicyAsAdmin: boolean;
    /** decision_policy specifies the group policy's decision policy. */
    decisionPolicy: Any | undefined;
}
/** MsgCreateGroupWithPolicyResponse is the Msg/CreateGroupWithPolicy response type. */
export interface MsgCreateGroupWithPolicyResponse {
    /** group_id is the unique ID of the newly created group with policy. */
    groupId: number;
    /** group_policy_address is the account address of the newly created group policy. */
    groupPolicyAddress: string;
}
/** MsgUpdateGroupPolicyDecisionPolicy is the Msg/UpdateGroupPolicyDecisionPolicy request type. */
export interface MsgUpdateGroupPolicyDecisionPolicy {
    /** admin is the account address of the group admin. */
    admin: string;
    /** group_policy_address is the account address of group policy. */
    groupPolicyAddress: string;
    /** decision_policy is the updated group policy's decision policy. */
    decisionPolicy: Any | undefined;
}
/** MsgUpdateGroupPolicyDecisionPolicyResponse is the Msg/UpdateGroupPolicyDecisionPolicy response type. */
export interface MsgUpdateGroupPolicyDecisionPolicyResponse {
}
/** MsgUpdateGroupPolicyMetadata is the Msg/UpdateGroupPolicyMetadata request type. */
export interface MsgUpdateGroupPolicyMetadata {
    /** admin is the account address of the group admin. */
    admin: string;
    /** group_policy_address is the account address of group policy. */
    groupPolicyAddress: string;
    /** metadata is the group policy metadata to be updated. */
    metadata: string;
}
/** MsgUpdateGroupPolicyMetadataResponse is the Msg/UpdateGroupPolicyMetadata response type. */
export interface MsgUpdateGroupPolicyMetadataResponse {
}
/** MsgSubmitProposal is the Msg/SubmitProposal request type. */
export interface MsgSubmitProposal {
    /** group_policy_address is the account address of group policy. */
    groupPolicyAddress: string;
    /**
     * proposers are the account addresses of the proposers.
     * Proposers signatures will be counted as yes votes.
     */
    proposers: string[];
    /** metadata is any arbitrary metadata attached to the proposal. */
    metadata: string;
    /** messages is a list of `sdk.Msg`s that will be executed if the proposal passes. */
    messages: Any[];
    /**
     * exec defines the mode of execution of the proposal,
     * whether it should be executed immediately on creation or not.
     * If so, proposers signatures are considered as Yes votes.
     */
    exec: Exec;
    /**
     * title is the title of the proposal.
     *
     * Since: cosmos-sdk 0.47
     */
    title: string;
    /**
     * summary is the summary of the proposal.
     *
     * Since: cosmos-sdk 0.47
     */
    summary: string;
}
/** MsgSubmitProposalResponse is the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponse {
    /** proposal is the unique ID of the proposal. */
    proposalId: number;
}
/** MsgWithdrawProposal is the Msg/WithdrawProposal request type. */
export interface MsgWithdrawProposal {
    /** proposal is the unique ID of the proposal. */
    proposalId: number;
    /** address is the admin of the group policy or one of the proposer of the proposal. */
    address: string;
}
/** MsgWithdrawProposalResponse is the Msg/WithdrawProposal response type. */
export interface MsgWithdrawProposalResponse {
}
/** MsgVote is the Msg/Vote request type. */
export interface MsgVote {
    /** proposal is the unique ID of the proposal. */
    proposalId: number;
    /** voter is the voter account address. */
    voter: string;
    /** option is the voter's choice on the proposal. */
    option: VoteOption;
    /** metadata is any arbitrary metadata attached to the vote. */
    metadata: string;
    /**
     * exec defines whether the proposal should be executed
     * immediately after voting or not.
     */
    exec: Exec;
}
/** MsgVoteResponse is the Msg/Vote response type. */
export interface MsgVoteResponse {
}
/** MsgExec is the Msg/Exec request type. */
export interface MsgExec {
    /** proposal is the unique ID of the proposal. */
    proposalId: number;
    /** executor is the account address used to execute the proposal. */
    executor: string;
}
/** MsgExecResponse is the Msg/Exec request type. */
export interface MsgExecResponse {
    /** result is the final result of the proposal execution. */
    result: ProposalExecutorResult;
}
/** MsgLeaveGroup is the Msg/LeaveGroup request type. */
export interface MsgLeaveGroup {
    /** address is the account address of the group member. */
    address: string;
    /** group_id is the unique ID of the group. */
    groupId: number;
}
/** MsgLeaveGroupResponse is the Msg/LeaveGroup response type. */
export interface MsgLeaveGroupResponse {
}
export declare const MsgCreateGroup: {
    encode(message: MsgCreateGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroup;
    fromJSON(object: any): MsgCreateGroup;
    toJSON(message: MsgCreateGroup): unknown;
    create<I extends {
        admin?: string;
        members?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[];
        metadata?: string;
    } & {
        admin?: string;
        members?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[] & ({
            address?: string;
            weight?: string;
            metadata?: string;
        } & {
            address?: string;
            weight?: string;
            metadata?: string;
        } & { [K in Exclude<keyof I["members"][number], keyof MemberRequest>]: never; })[] & { [K_1 in Exclude<keyof I["members"], keyof {
            address?: string;
            weight?: string;
            metadata?: string;
        }[]>]: never; };
        metadata?: string;
    } & { [K_2 in Exclude<keyof I, keyof MsgCreateGroup>]: never; }>(base?: I): MsgCreateGroup;
    fromPartial<I_1 extends {
        admin?: string;
        members?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[];
        metadata?: string;
    } & {
        admin?: string;
        members?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[] & ({
            address?: string;
            weight?: string;
            metadata?: string;
        } & {
            address?: string;
            weight?: string;
            metadata?: string;
        } & { [K_3 in Exclude<keyof I_1["members"][number], keyof MemberRequest>]: never; })[] & { [K_4 in Exclude<keyof I_1["members"], keyof {
            address?: string;
            weight?: string;
            metadata?: string;
        }[]>]: never; };
        metadata?: string;
    } & { [K_5 in Exclude<keyof I_1, keyof MsgCreateGroup>]: never; }>(object: I_1): MsgCreateGroup;
};
export declare const MsgCreateGroupResponse: {
    encode(message: MsgCreateGroupResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupResponse;
    fromJSON(object: any): MsgCreateGroupResponse;
    toJSON(message: MsgCreateGroupResponse): unknown;
    create<I extends {
        groupId?: number;
    } & {
        groupId?: number;
    } & { [K in Exclude<keyof I, "groupId">]: never; }>(base?: I): MsgCreateGroupResponse;
    fromPartial<I_1 extends {
        groupId?: number;
    } & {
        groupId?: number;
    } & { [K_1 in Exclude<keyof I_1, "groupId">]: never; }>(object: I_1): MsgCreateGroupResponse;
};
export declare const MsgUpdateGroupMembers: {
    encode(message: MsgUpdateGroupMembers, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupMembers;
    fromJSON(object: any): MsgUpdateGroupMembers;
    toJSON(message: MsgUpdateGroupMembers): unknown;
    create<I extends {
        admin?: string;
        groupId?: number;
        memberUpdates?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[];
    } & {
        admin?: string;
        groupId?: number;
        memberUpdates?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[] & ({
            address?: string;
            weight?: string;
            metadata?: string;
        } & {
            address?: string;
            weight?: string;
            metadata?: string;
        } & { [K in Exclude<keyof I["memberUpdates"][number], keyof MemberRequest>]: never; })[] & { [K_1 in Exclude<keyof I["memberUpdates"], keyof {
            address?: string;
            weight?: string;
            metadata?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof MsgUpdateGroupMembers>]: never; }>(base?: I): MsgUpdateGroupMembers;
    fromPartial<I_1 extends {
        admin?: string;
        groupId?: number;
        memberUpdates?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[];
    } & {
        admin?: string;
        groupId?: number;
        memberUpdates?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[] & ({
            address?: string;
            weight?: string;
            metadata?: string;
        } & {
            address?: string;
            weight?: string;
            metadata?: string;
        } & { [K_3 in Exclude<keyof I_1["memberUpdates"][number], keyof MemberRequest>]: never; })[] & { [K_4 in Exclude<keyof I_1["memberUpdates"], keyof {
            address?: string;
            weight?: string;
            metadata?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof MsgUpdateGroupMembers>]: never; }>(object: I_1): MsgUpdateGroupMembers;
};
export declare const MsgUpdateGroupMembersResponse: {
    encode(_: MsgUpdateGroupMembersResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupMembersResponse;
    fromJSON(_: any): MsgUpdateGroupMembersResponse;
    toJSON(_: MsgUpdateGroupMembersResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateGroupMembersResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateGroupMembersResponse;
};
export declare const MsgUpdateGroupAdmin: {
    encode(message: MsgUpdateGroupAdmin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupAdmin;
    fromJSON(object: any): MsgUpdateGroupAdmin;
    toJSON(message: MsgUpdateGroupAdmin): unknown;
    create<I extends {
        admin?: string;
        groupId?: number;
        newAdmin?: string;
    } & {
        admin?: string;
        groupId?: number;
        newAdmin?: string;
    } & { [K in Exclude<keyof I, keyof MsgUpdateGroupAdmin>]: never; }>(base?: I): MsgUpdateGroupAdmin;
    fromPartial<I_1 extends {
        admin?: string;
        groupId?: number;
        newAdmin?: string;
    } & {
        admin?: string;
        groupId?: number;
        newAdmin?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgUpdateGroupAdmin>]: never; }>(object: I_1): MsgUpdateGroupAdmin;
};
export declare const MsgUpdateGroupAdminResponse: {
    encode(_: MsgUpdateGroupAdminResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupAdminResponse;
    fromJSON(_: any): MsgUpdateGroupAdminResponse;
    toJSON(_: MsgUpdateGroupAdminResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateGroupAdminResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateGroupAdminResponse;
};
export declare const MsgUpdateGroupMetadata: {
    encode(message: MsgUpdateGroupMetadata, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupMetadata;
    fromJSON(object: any): MsgUpdateGroupMetadata;
    toJSON(message: MsgUpdateGroupMetadata): unknown;
    create<I extends {
        admin?: string;
        groupId?: number;
        metadata?: string;
    } & {
        admin?: string;
        groupId?: number;
        metadata?: string;
    } & { [K in Exclude<keyof I, keyof MsgUpdateGroupMetadata>]: never; }>(base?: I): MsgUpdateGroupMetadata;
    fromPartial<I_1 extends {
        admin?: string;
        groupId?: number;
        metadata?: string;
    } & {
        admin?: string;
        groupId?: number;
        metadata?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgUpdateGroupMetadata>]: never; }>(object: I_1): MsgUpdateGroupMetadata;
};
export declare const MsgUpdateGroupMetadataResponse: {
    encode(_: MsgUpdateGroupMetadataResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupMetadataResponse;
    fromJSON(_: any): MsgUpdateGroupMetadataResponse;
    toJSON(_: MsgUpdateGroupMetadataResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateGroupMetadataResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateGroupMetadataResponse;
};
export declare const MsgCreateGroupPolicy: {
    encode(message: MsgCreateGroupPolicy, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupPolicy;
    fromJSON(object: any): MsgCreateGroupPolicy;
    toJSON(message: MsgCreateGroupPolicy): unknown;
    create<I extends {
        admin?: string;
        groupId?: number;
        metadata?: string;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        admin?: string;
        groupId?: number;
        metadata?: string;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["decisionPolicy"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgCreateGroupPolicy>]: never; }>(base?: I): MsgCreateGroupPolicy;
    fromPartial<I_1 extends {
        admin?: string;
        groupId?: number;
        metadata?: string;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        admin?: string;
        groupId?: number;
        metadata?: string;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["decisionPolicy"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgCreateGroupPolicy>]: never; }>(object: I_1): MsgCreateGroupPolicy;
};
export declare const MsgCreateGroupPolicyResponse: {
    encode(message: MsgCreateGroupPolicyResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupPolicyResponse;
    fromJSON(object: any): MsgCreateGroupPolicyResponse;
    toJSON(message: MsgCreateGroupPolicyResponse): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): MsgCreateGroupPolicyResponse;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): MsgCreateGroupPolicyResponse;
};
export declare const MsgUpdateGroupPolicyAdmin: {
    encode(message: MsgUpdateGroupPolicyAdmin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyAdmin;
    fromJSON(object: any): MsgUpdateGroupPolicyAdmin;
    toJSON(message: MsgUpdateGroupPolicyAdmin): unknown;
    create<I extends {
        admin?: string;
        groupPolicyAddress?: string;
        newAdmin?: string;
    } & {
        admin?: string;
        groupPolicyAddress?: string;
        newAdmin?: string;
    } & { [K in Exclude<keyof I, keyof MsgUpdateGroupPolicyAdmin>]: never; }>(base?: I): MsgUpdateGroupPolicyAdmin;
    fromPartial<I_1 extends {
        admin?: string;
        groupPolicyAddress?: string;
        newAdmin?: string;
    } & {
        admin?: string;
        groupPolicyAddress?: string;
        newAdmin?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgUpdateGroupPolicyAdmin>]: never; }>(object: I_1): MsgUpdateGroupPolicyAdmin;
};
export declare const MsgUpdateGroupPolicyAdminResponse: {
    encode(_: MsgUpdateGroupPolicyAdminResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyAdminResponse;
    fromJSON(_: any): MsgUpdateGroupPolicyAdminResponse;
    toJSON(_: MsgUpdateGroupPolicyAdminResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateGroupPolicyAdminResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateGroupPolicyAdminResponse;
};
export declare const MsgCreateGroupWithPolicy: {
    encode(message: MsgCreateGroupWithPolicy, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupWithPolicy;
    fromJSON(object: any): MsgCreateGroupWithPolicy;
    toJSON(message: MsgCreateGroupWithPolicy): unknown;
    create<I extends {
        admin?: string;
        members?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[];
        groupMetadata?: string;
        groupPolicyMetadata?: string;
        groupPolicyAsAdmin?: boolean;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        admin?: string;
        members?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[] & ({
            address?: string;
            weight?: string;
            metadata?: string;
        } & {
            address?: string;
            weight?: string;
            metadata?: string;
        } & { [K in Exclude<keyof I["members"][number], keyof MemberRequest>]: never; })[] & { [K_1 in Exclude<keyof I["members"], keyof {
            address?: string;
            weight?: string;
            metadata?: string;
        }[]>]: never; };
        groupMetadata?: string;
        groupPolicyMetadata?: string;
        groupPolicyAsAdmin?: boolean;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I["decisionPolicy"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof MsgCreateGroupWithPolicy>]: never; }>(base?: I): MsgCreateGroupWithPolicy;
    fromPartial<I_1 extends {
        admin?: string;
        members?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[];
        groupMetadata?: string;
        groupPolicyMetadata?: string;
        groupPolicyAsAdmin?: boolean;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        admin?: string;
        members?: {
            address?: string;
            weight?: string;
            metadata?: string;
        }[] & ({
            address?: string;
            weight?: string;
            metadata?: string;
        } & {
            address?: string;
            weight?: string;
            metadata?: string;
        } & { [K_4 in Exclude<keyof I_1["members"][number], keyof MemberRequest>]: never; })[] & { [K_5 in Exclude<keyof I_1["members"], keyof {
            address?: string;
            weight?: string;
            metadata?: string;
        }[]>]: never; };
        groupMetadata?: string;
        groupPolicyMetadata?: string;
        groupPolicyAsAdmin?: boolean;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_6 in Exclude<keyof I_1["decisionPolicy"], keyof Any>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof MsgCreateGroupWithPolicy>]: never; }>(object: I_1): MsgCreateGroupWithPolicy;
};
export declare const MsgCreateGroupWithPolicyResponse: {
    encode(message: MsgCreateGroupWithPolicyResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupWithPolicyResponse;
    fromJSON(object: any): MsgCreateGroupWithPolicyResponse;
    toJSON(message: MsgCreateGroupWithPolicyResponse): unknown;
    create<I extends {
        groupId?: number;
        groupPolicyAddress?: string;
    } & {
        groupId?: number;
        groupPolicyAddress?: string;
    } & { [K in Exclude<keyof I, keyof MsgCreateGroupWithPolicyResponse>]: never; }>(base?: I): MsgCreateGroupWithPolicyResponse;
    fromPartial<I_1 extends {
        groupId?: number;
        groupPolicyAddress?: string;
    } & {
        groupId?: number;
        groupPolicyAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgCreateGroupWithPolicyResponse>]: never; }>(object: I_1): MsgCreateGroupWithPolicyResponse;
};
export declare const MsgUpdateGroupPolicyDecisionPolicy: {
    encode(message: MsgUpdateGroupPolicyDecisionPolicy, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyDecisionPolicy;
    fromJSON(object: any): MsgUpdateGroupPolicyDecisionPolicy;
    toJSON(message: MsgUpdateGroupPolicyDecisionPolicy): unknown;
    create<I extends {
        admin?: string;
        groupPolicyAddress?: string;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        admin?: string;
        groupPolicyAddress?: string;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["decisionPolicy"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgUpdateGroupPolicyDecisionPolicy>]: never; }>(base?: I): MsgUpdateGroupPolicyDecisionPolicy;
    fromPartial<I_1 extends {
        admin?: string;
        groupPolicyAddress?: string;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        admin?: string;
        groupPolicyAddress?: string;
        decisionPolicy?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["decisionPolicy"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgUpdateGroupPolicyDecisionPolicy>]: never; }>(object: I_1): MsgUpdateGroupPolicyDecisionPolicy;
};
export declare const MsgUpdateGroupPolicyDecisionPolicyResponse: {
    encode(_: MsgUpdateGroupPolicyDecisionPolicyResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyDecisionPolicyResponse;
    fromJSON(_: any): MsgUpdateGroupPolicyDecisionPolicyResponse;
    toJSON(_: MsgUpdateGroupPolicyDecisionPolicyResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateGroupPolicyDecisionPolicyResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateGroupPolicyDecisionPolicyResponse;
};
export declare const MsgUpdateGroupPolicyMetadata: {
    encode(message: MsgUpdateGroupPolicyMetadata, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyMetadata;
    fromJSON(object: any): MsgUpdateGroupPolicyMetadata;
    toJSON(message: MsgUpdateGroupPolicyMetadata): unknown;
    create<I extends {
        admin?: string;
        groupPolicyAddress?: string;
        metadata?: string;
    } & {
        admin?: string;
        groupPolicyAddress?: string;
        metadata?: string;
    } & { [K in Exclude<keyof I, keyof MsgUpdateGroupPolicyMetadata>]: never; }>(base?: I): MsgUpdateGroupPolicyMetadata;
    fromPartial<I_1 extends {
        admin?: string;
        groupPolicyAddress?: string;
        metadata?: string;
    } & {
        admin?: string;
        groupPolicyAddress?: string;
        metadata?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgUpdateGroupPolicyMetadata>]: never; }>(object: I_1): MsgUpdateGroupPolicyMetadata;
};
export declare const MsgUpdateGroupPolicyMetadataResponse: {
    encode(_: MsgUpdateGroupPolicyMetadataResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyMetadataResponse;
    fromJSON(_: any): MsgUpdateGroupPolicyMetadataResponse;
    toJSON(_: MsgUpdateGroupPolicyMetadataResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateGroupPolicyMetadataResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateGroupPolicyMetadataResponse;
};
export declare const MsgSubmitProposal: {
    encode(message: MsgSubmitProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitProposal;
    fromJSON(object: any): MsgSubmitProposal;
    toJSON(message: MsgSubmitProposal): unknown;
    create<I extends {
        groupPolicyAddress?: string;
        proposers?: string[];
        metadata?: string;
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
        exec?: Exec;
        title?: string;
        summary?: string;
    } & {
        groupPolicyAddress?: string;
        proposers?: string[] & string[] & { [K in Exclude<keyof I["proposers"], keyof string[]>]: never; };
        metadata?: string;
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["messages"][number], keyof Any>]: never; })[] & { [K_2 in Exclude<keyof I["messages"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
        exec?: Exec;
        title?: string;
        summary?: string;
    } & { [K_3 in Exclude<keyof I, keyof MsgSubmitProposal>]: never; }>(base?: I): MsgSubmitProposal;
    fromPartial<I_1 extends {
        groupPolicyAddress?: string;
        proposers?: string[];
        metadata?: string;
        messages?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
        exec?: Exec;
        title?: string;
        summary?: string;
    } & {
        groupPolicyAddress?: string;
        proposers?: string[] & string[] & { [K_4 in Exclude<keyof I_1["proposers"], keyof string[]>]: never; };
        metadata?: string;
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
        exec?: Exec;
        title?: string;
        summary?: string;
    } & { [K_7 in Exclude<keyof I_1, keyof MsgSubmitProposal>]: never; }>(object: I_1): MsgSubmitProposal;
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
export declare const MsgWithdrawProposal: {
    encode(message: MsgWithdrawProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawProposal;
    fromJSON(object: any): MsgWithdrawProposal;
    toJSON(message: MsgWithdrawProposal): unknown;
    create<I extends {
        proposalId?: number;
        address?: string;
    } & {
        proposalId?: number;
        address?: string;
    } & { [K in Exclude<keyof I, keyof MsgWithdrawProposal>]: never; }>(base?: I): MsgWithdrawProposal;
    fromPartial<I_1 extends {
        proposalId?: number;
        address?: string;
    } & {
        proposalId?: number;
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgWithdrawProposal>]: never; }>(object: I_1): MsgWithdrawProposal;
};
export declare const MsgWithdrawProposalResponse: {
    encode(_: MsgWithdrawProposalResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawProposalResponse;
    fromJSON(_: any): MsgWithdrawProposalResponse;
    toJSON(_: MsgWithdrawProposalResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgWithdrawProposalResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgWithdrawProposalResponse;
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
        exec?: Exec;
    } & {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
        exec?: Exec;
    } & { [K in Exclude<keyof I, keyof MsgVote>]: never; }>(base?: I): MsgVote;
    fromPartial<I_1 extends {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
        exec?: Exec;
    } & {
        proposalId?: number;
        voter?: string;
        option?: VoteOption;
        metadata?: string;
        exec?: Exec;
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
export declare const MsgExec: {
    encode(message: MsgExec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgExec;
    fromJSON(object: any): MsgExec;
    toJSON(message: MsgExec): unknown;
    create<I extends {
        proposalId?: number;
        executor?: string;
    } & {
        proposalId?: number;
        executor?: string;
    } & { [K in Exclude<keyof I, keyof MsgExec>]: never; }>(base?: I): MsgExec;
    fromPartial<I_1 extends {
        proposalId?: number;
        executor?: string;
    } & {
        proposalId?: number;
        executor?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgExec>]: never; }>(object: I_1): MsgExec;
};
export declare const MsgExecResponse: {
    encode(message: MsgExecResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecResponse;
    fromJSON(object: any): MsgExecResponse;
    toJSON(message: MsgExecResponse): unknown;
    create<I extends {
        result?: ProposalExecutorResult;
    } & {
        result?: ProposalExecutorResult;
    } & { [K in Exclude<keyof I, "result">]: never; }>(base?: I): MsgExecResponse;
    fromPartial<I_1 extends {
        result?: ProposalExecutorResult;
    } & {
        result?: ProposalExecutorResult;
    } & { [K_1 in Exclude<keyof I_1, "result">]: never; }>(object: I_1): MsgExecResponse;
};
export declare const MsgLeaveGroup: {
    encode(message: MsgLeaveGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgLeaveGroup;
    fromJSON(object: any): MsgLeaveGroup;
    toJSON(message: MsgLeaveGroup): unknown;
    create<I extends {
        address?: string;
        groupId?: number;
    } & {
        address?: string;
        groupId?: number;
    } & { [K in Exclude<keyof I, keyof MsgLeaveGroup>]: never; }>(base?: I): MsgLeaveGroup;
    fromPartial<I_1 extends {
        address?: string;
        groupId?: number;
    } & {
        address?: string;
        groupId?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgLeaveGroup>]: never; }>(object: I_1): MsgLeaveGroup;
};
export declare const MsgLeaveGroupResponse: {
    encode(_: MsgLeaveGroupResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgLeaveGroupResponse;
    fromJSON(_: any): MsgLeaveGroupResponse;
    toJSON(_: MsgLeaveGroupResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgLeaveGroupResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgLeaveGroupResponse;
};
/** Msg is the cosmos.group.v1 Msg service. */
export interface Msg {
    /** CreateGroup creates a new group with an admin account address, a list of members and some optional metadata. */
    CreateGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse>;
    /** UpdateGroupMembers updates the group members with given group id and admin address. */
    UpdateGroupMembers(request: MsgUpdateGroupMembers): Promise<MsgUpdateGroupMembersResponse>;
    /** UpdateGroupAdmin updates the group admin with given group id and previous admin address. */
    UpdateGroupAdmin(request: MsgUpdateGroupAdmin): Promise<MsgUpdateGroupAdminResponse>;
    /** UpdateGroupMetadata updates the group metadata with given group id and admin address. */
    UpdateGroupMetadata(request: MsgUpdateGroupMetadata): Promise<MsgUpdateGroupMetadataResponse>;
    /** CreateGroupPolicy creates a new group policy using given DecisionPolicy. */
    CreateGroupPolicy(request: MsgCreateGroupPolicy): Promise<MsgCreateGroupPolicyResponse>;
    /** CreateGroupWithPolicy creates a new group with policy. */
    CreateGroupWithPolicy(request: MsgCreateGroupWithPolicy): Promise<MsgCreateGroupWithPolicyResponse>;
    /** UpdateGroupPolicyAdmin updates a group policy admin. */
    UpdateGroupPolicyAdmin(request: MsgUpdateGroupPolicyAdmin): Promise<MsgUpdateGroupPolicyAdminResponse>;
    /** UpdateGroupPolicyDecisionPolicy allows a group policy's decision policy to be updated. */
    UpdateGroupPolicyDecisionPolicy(request: MsgUpdateGroupPolicyDecisionPolicy): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse>;
    /** UpdateGroupPolicyMetadata updates a group policy metadata. */
    UpdateGroupPolicyMetadata(request: MsgUpdateGroupPolicyMetadata): Promise<MsgUpdateGroupPolicyMetadataResponse>;
    /** SubmitProposal submits a new proposal. */
    SubmitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse>;
    /** WithdrawProposal withdraws a proposal. */
    WithdrawProposal(request: MsgWithdrawProposal): Promise<MsgWithdrawProposalResponse>;
    /** Vote allows a voter to vote on a proposal. */
    Vote(request: MsgVote): Promise<MsgVoteResponse>;
    /** Exec executes a proposal. */
    Exec(request: MsgExec): Promise<MsgExecResponse>;
    /** LeaveGroup allows a group member to leave the group. */
    LeaveGroup(request: MsgLeaveGroup): Promise<MsgLeaveGroupResponse>;
}
export declare const MsgServiceName = "cosmos.group.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    CreateGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse>;
    UpdateGroupMembers(request: MsgUpdateGroupMembers): Promise<MsgUpdateGroupMembersResponse>;
    UpdateGroupAdmin(request: MsgUpdateGroupAdmin): Promise<MsgUpdateGroupAdminResponse>;
    UpdateGroupMetadata(request: MsgUpdateGroupMetadata): Promise<MsgUpdateGroupMetadataResponse>;
    CreateGroupPolicy(request: MsgCreateGroupPolicy): Promise<MsgCreateGroupPolicyResponse>;
    CreateGroupWithPolicy(request: MsgCreateGroupWithPolicy): Promise<MsgCreateGroupWithPolicyResponse>;
    UpdateGroupPolicyAdmin(request: MsgUpdateGroupPolicyAdmin): Promise<MsgUpdateGroupPolicyAdminResponse>;
    UpdateGroupPolicyDecisionPolicy(request: MsgUpdateGroupPolicyDecisionPolicy): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse>;
    UpdateGroupPolicyMetadata(request: MsgUpdateGroupPolicyMetadata): Promise<MsgUpdateGroupPolicyMetadataResponse>;
    SubmitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse>;
    WithdrawProposal(request: MsgWithdrawProposal): Promise<MsgWithdrawProposalResponse>;
    Vote(request: MsgVote): Promise<MsgVoteResponse>;
    Exec(request: MsgExec): Promise<MsgExecResponse>;
    LeaveGroup(request: MsgLeaveGroup): Promise<MsgLeaveGroupResponse>;
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
