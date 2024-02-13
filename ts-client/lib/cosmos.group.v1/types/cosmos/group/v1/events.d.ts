import _m0 from "protobufjs/minimal";
import { ProposalExecutorResult, ProposalStatus, TallyResult } from "./types";
export declare const protobufPackage = "cosmos.group.v1";
/** Since: cosmos-sdk 0.46 */
/** EventCreateGroup is an event emitted when a group is created. */
export interface EventCreateGroup {
    /** group_id is the unique ID of the group. */
    groupId: number;
}
/** EventUpdateGroup is an event emitted when a group is updated. */
export interface EventUpdateGroup {
    /** group_id is the unique ID of the group. */
    groupId: number;
}
/** EventCreateGroupPolicy is an event emitted when a group policy is created. */
export interface EventCreateGroupPolicy {
    /** address is the account address of the group policy. */
    address: string;
}
/** EventUpdateGroupPolicy is an event emitted when a group policy is updated. */
export interface EventUpdateGroupPolicy {
    /** address is the account address of the group policy. */
    address: string;
}
/** EventSubmitProposal is an event emitted when a proposal is created. */
export interface EventSubmitProposal {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: number;
}
/** EventWithdrawProposal is an event emitted when a proposal is withdrawn. */
export interface EventWithdrawProposal {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: number;
}
/** EventVote is an event emitted when a voter votes on a proposal. */
export interface EventVote {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: number;
}
/** EventExec is an event emitted when a proposal is executed. */
export interface EventExec {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: number;
    /** result is the proposal execution result. */
    result: ProposalExecutorResult;
    /** logs contains error logs in case the execution result is FAILURE. */
    logs: string;
}
/** EventLeaveGroup is an event emitted when group member leaves the group. */
export interface EventLeaveGroup {
    /** group_id is the unique ID of the group. */
    groupId: number;
    /** address is the account address of the group member. */
    address: string;
}
/** EventProposalPruned is an event emitted when a proposal is pruned. */
export interface EventProposalPruned {
    /** proposal_id is the unique ID of the proposal. */
    proposalId: number;
    /** status is the proposal status (UNSPECIFIED, SUBMITTED, ACCEPTED, REJECTED, ABORTED, WITHDRAWN). */
    status: ProposalStatus;
    /** tally_result is the proposal tally result (when applicable). */
    tallyResult: TallyResult | undefined;
}
export declare const EventCreateGroup: {
    encode(message: EventCreateGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventCreateGroup;
    fromJSON(object: any): EventCreateGroup;
    toJSON(message: EventCreateGroup): unknown;
    create<I extends {
        groupId?: number;
    } & {
        groupId?: number;
    } & { [K in Exclude<keyof I, "groupId">]: never; }>(base?: I): EventCreateGroup;
    fromPartial<I_1 extends {
        groupId?: number;
    } & {
        groupId?: number;
    } & { [K_1 in Exclude<keyof I_1, "groupId">]: never; }>(object: I_1): EventCreateGroup;
};
export declare const EventUpdateGroup: {
    encode(message: EventUpdateGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventUpdateGroup;
    fromJSON(object: any): EventUpdateGroup;
    toJSON(message: EventUpdateGroup): unknown;
    create<I extends {
        groupId?: number;
    } & {
        groupId?: number;
    } & { [K in Exclude<keyof I, "groupId">]: never; }>(base?: I): EventUpdateGroup;
    fromPartial<I_1 extends {
        groupId?: number;
    } & {
        groupId?: number;
    } & { [K_1 in Exclude<keyof I_1, "groupId">]: never; }>(object: I_1): EventUpdateGroup;
};
export declare const EventCreateGroupPolicy: {
    encode(message: EventCreateGroupPolicy, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventCreateGroupPolicy;
    fromJSON(object: any): EventCreateGroupPolicy;
    toJSON(message: EventCreateGroupPolicy): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): EventCreateGroupPolicy;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): EventCreateGroupPolicy;
};
export declare const EventUpdateGroupPolicy: {
    encode(message: EventUpdateGroupPolicy, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventUpdateGroupPolicy;
    fromJSON(object: any): EventUpdateGroupPolicy;
    toJSON(message: EventUpdateGroupPolicy): unknown;
    create<I extends {
        address?: string;
    } & {
        address?: string;
    } & { [K in Exclude<keyof I, "address">]: never; }>(base?: I): EventUpdateGroupPolicy;
    fromPartial<I_1 extends {
        address?: string;
    } & {
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, "address">]: never; }>(object: I_1): EventUpdateGroupPolicy;
};
export declare const EventSubmitProposal: {
    encode(message: EventSubmitProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventSubmitProposal;
    fromJSON(object: any): EventSubmitProposal;
    toJSON(message: EventSubmitProposal): unknown;
    create<I extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K in Exclude<keyof I, "proposalId">]: never; }>(base?: I): EventSubmitProposal;
    fromPartial<I_1 extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K_1 in Exclude<keyof I_1, "proposalId">]: never; }>(object: I_1): EventSubmitProposal;
};
export declare const EventWithdrawProposal: {
    encode(message: EventWithdrawProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventWithdrawProposal;
    fromJSON(object: any): EventWithdrawProposal;
    toJSON(message: EventWithdrawProposal): unknown;
    create<I extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K in Exclude<keyof I, "proposalId">]: never; }>(base?: I): EventWithdrawProposal;
    fromPartial<I_1 extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K_1 in Exclude<keyof I_1, "proposalId">]: never; }>(object: I_1): EventWithdrawProposal;
};
export declare const EventVote: {
    encode(message: EventVote, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventVote;
    fromJSON(object: any): EventVote;
    toJSON(message: EventVote): unknown;
    create<I extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K in Exclude<keyof I, "proposalId">]: never; }>(base?: I): EventVote;
    fromPartial<I_1 extends {
        proposalId?: number;
    } & {
        proposalId?: number;
    } & { [K_1 in Exclude<keyof I_1, "proposalId">]: never; }>(object: I_1): EventVote;
};
export declare const EventExec: {
    encode(message: EventExec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventExec;
    fromJSON(object: any): EventExec;
    toJSON(message: EventExec): unknown;
    create<I extends {
        proposalId?: number;
        result?: ProposalExecutorResult;
        logs?: string;
    } & {
        proposalId?: number;
        result?: ProposalExecutorResult;
        logs?: string;
    } & { [K in Exclude<keyof I, keyof EventExec>]: never; }>(base?: I): EventExec;
    fromPartial<I_1 extends {
        proposalId?: number;
        result?: ProposalExecutorResult;
        logs?: string;
    } & {
        proposalId?: number;
        result?: ProposalExecutorResult;
        logs?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof EventExec>]: never; }>(object: I_1): EventExec;
};
export declare const EventLeaveGroup: {
    encode(message: EventLeaveGroup, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventLeaveGroup;
    fromJSON(object: any): EventLeaveGroup;
    toJSON(message: EventLeaveGroup): unknown;
    create<I extends {
        groupId?: number;
        address?: string;
    } & {
        groupId?: number;
        address?: string;
    } & { [K in Exclude<keyof I, keyof EventLeaveGroup>]: never; }>(base?: I): EventLeaveGroup;
    fromPartial<I_1 extends {
        groupId?: number;
        address?: string;
    } & {
        groupId?: number;
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof EventLeaveGroup>]: never; }>(object: I_1): EventLeaveGroup;
};
export declare const EventProposalPruned: {
    encode(message: EventProposalPruned, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): EventProposalPruned;
    fromJSON(object: any): EventProposalPruned;
    toJSON(message: EventProposalPruned): unknown;
    create<I extends {
        proposalId?: number;
        status?: ProposalStatus;
        tallyResult?: {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        };
    } & {
        proposalId?: number;
        status?: ProposalStatus;
        tallyResult?: {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        } & {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        } & { [K in Exclude<keyof I["tallyResult"], keyof TallyResult>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof EventProposalPruned>]: never; }>(base?: I): EventProposalPruned;
    fromPartial<I_1 extends {
        proposalId?: number;
        status?: ProposalStatus;
        tallyResult?: {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        };
    } & {
        proposalId?: number;
        status?: ProposalStatus;
        tallyResult?: {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        } & {
            yesCount?: string;
            abstainCount?: string;
            noCount?: string;
            noWithVetoCount?: string;
        } & { [K_2 in Exclude<keyof I_1["tallyResult"], keyof TallyResult>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof EventProposalPruned>]: never; }>(object: I_1): EventProposalPruned;
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
