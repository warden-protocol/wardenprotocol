/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import {
  MemberRequest,
  ProposalExecutorResult,
  proposalExecutorResultFromJSON,
  proposalExecutorResultToJSON,
  VoteOption,
  voteOptionFromJSON,
  voteOptionToJSON,
} from "./types";

export const protobufPackage = "cosmos.group.v1";

/** Since: cosmos-sdk 0.46 */

/** Exec defines modes of execution of a proposal on creation or on new vote. */
export enum Exec {
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
  UNRECOGNIZED = -1,
}

export function execFromJSON(object: any): Exec {
  switch (object) {
    case 0:
    case "EXEC_UNSPECIFIED":
      return Exec.EXEC_UNSPECIFIED;
    case 1:
    case "EXEC_TRY":
      return Exec.EXEC_TRY;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Exec.UNRECOGNIZED;
  }
}

export function execToJSON(object: Exec): string {
  switch (object) {
    case Exec.EXEC_UNSPECIFIED:
      return "EXEC_UNSPECIFIED";
    case Exec.EXEC_TRY:
      return "EXEC_TRY";
    case Exec.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

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

function createBaseMsgCreateGroup(): MsgCreateGroup {
  return { admin: "", members: [], metadata: "" };
}

export const MsgCreateGroup = {
  encode(message: MsgCreateGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    for (const v of message.members) {
      MemberRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.members.push(MemberRequest.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroup {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      members: Array.isArray(object?.members) ? object.members.map((e: any) => MemberRequest.fromJSON(e)) : [],
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgCreateGroup): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.members?.length) {
      obj.members = message.members.map((e) => MemberRequest.toJSON(e));
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateGroup>, I>>(base?: I): MsgCreateGroup {
    return MsgCreateGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGroup>, I>>(object: I): MsgCreateGroup {
    const message = createBaseMsgCreateGroup();
    message.admin = object.admin ?? "";
    message.members = object.members?.map((e) => MemberRequest.fromPartial(e)) || [];
    message.metadata = object.metadata ?? "";
    return message;
  },
};

function createBaseMsgCreateGroupResponse(): MsgCreateGroupResponse {
  return { groupId: 0 };
}

export const MsgCreateGroupResponse = {
  encode(message: MsgCreateGroupResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint64(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.groupId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupResponse {
    return { groupId: isSet(object.groupId) ? Number(object.groupId) : 0 };
  },

  toJSON(message: MsgCreateGroupResponse): unknown {
    const obj: any = {};
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateGroupResponse>, I>>(base?: I): MsgCreateGroupResponse {
    return MsgCreateGroupResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGroupResponse>, I>>(object: I): MsgCreateGroupResponse {
    const message = createBaseMsgCreateGroupResponse();
    message.groupId = object.groupId ?? 0;
    return message;
  },
};

function createBaseMsgUpdateGroupMembers(): MsgUpdateGroupMembers {
  return { admin: "", groupId: 0, memberUpdates: [] };
}

export const MsgUpdateGroupMembers = {
  encode(message: MsgUpdateGroupMembers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupId !== 0) {
      writer.uint32(16).uint64(message.groupId);
    }
    for (const v of message.memberUpdates) {
      MemberRequest.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupMembers {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMembers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.groupId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.memberUpdates.push(MemberRequest.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupMembers {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
      memberUpdates: Array.isArray(object?.memberUpdates)
        ? object.memberUpdates.map((e: any) => MemberRequest.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgUpdateGroupMembers): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    if (message.memberUpdates?.length) {
      obj.memberUpdates = message.memberUpdates.map((e) => MemberRequest.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupMembers>, I>>(base?: I): MsgUpdateGroupMembers {
    return MsgUpdateGroupMembers.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupMembers>, I>>(object: I): MsgUpdateGroupMembers {
    const message = createBaseMsgUpdateGroupMembers();
    message.admin = object.admin ?? "";
    message.groupId = object.groupId ?? 0;
    message.memberUpdates = object.memberUpdates?.map((e) => MemberRequest.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgUpdateGroupMembersResponse(): MsgUpdateGroupMembersResponse {
  return {};
}

export const MsgUpdateGroupMembersResponse = {
  encode(_: MsgUpdateGroupMembersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupMembersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMembersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupMembersResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupMembersResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupMembersResponse>, I>>(base?: I): MsgUpdateGroupMembersResponse {
    return MsgUpdateGroupMembersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupMembersResponse>, I>>(_: I): MsgUpdateGroupMembersResponse {
    const message = createBaseMsgUpdateGroupMembersResponse();
    return message;
  },
};

function createBaseMsgUpdateGroupAdmin(): MsgUpdateGroupAdmin {
  return { admin: "", groupId: 0, newAdmin: "" };
}

export const MsgUpdateGroupAdmin = {
  encode(message: MsgUpdateGroupAdmin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupId !== 0) {
      writer.uint32(16).uint64(message.groupId);
    }
    if (message.newAdmin !== "") {
      writer.uint32(26).string(message.newAdmin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupAdmin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.groupId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newAdmin = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupAdmin {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
      newAdmin: isSet(object.newAdmin) ? String(object.newAdmin) : "",
    };
  },

  toJSON(message: MsgUpdateGroupAdmin): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    if (message.newAdmin !== "") {
      obj.newAdmin = message.newAdmin;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupAdmin>, I>>(base?: I): MsgUpdateGroupAdmin {
    return MsgUpdateGroupAdmin.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupAdmin>, I>>(object: I): MsgUpdateGroupAdmin {
    const message = createBaseMsgUpdateGroupAdmin();
    message.admin = object.admin ?? "";
    message.groupId = object.groupId ?? 0;
    message.newAdmin = object.newAdmin ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupAdminResponse(): MsgUpdateGroupAdminResponse {
  return {};
}

export const MsgUpdateGroupAdminResponse = {
  encode(_: MsgUpdateGroupAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupAdminResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupAdminResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupAdminResponse>, I>>(base?: I): MsgUpdateGroupAdminResponse {
    return MsgUpdateGroupAdminResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupAdminResponse>, I>>(_: I): MsgUpdateGroupAdminResponse {
    const message = createBaseMsgUpdateGroupAdminResponse();
    return message;
  },
};

function createBaseMsgUpdateGroupMetadata(): MsgUpdateGroupMetadata {
  return { admin: "", groupId: 0, metadata: "" };
}

export const MsgUpdateGroupMetadata = {
  encode(message: MsgUpdateGroupMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupId !== 0) {
      writer.uint32(16).uint64(message.groupId);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.groupId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupMetadata {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgUpdateGroupMetadata): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupMetadata>, I>>(base?: I): MsgUpdateGroupMetadata {
    return MsgUpdateGroupMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupMetadata>, I>>(object: I): MsgUpdateGroupMetadata {
    const message = createBaseMsgUpdateGroupMetadata();
    message.admin = object.admin ?? "";
    message.groupId = object.groupId ?? 0;
    message.metadata = object.metadata ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupMetadataResponse(): MsgUpdateGroupMetadataResponse {
  return {};
}

export const MsgUpdateGroupMetadataResponse = {
  encode(_: MsgUpdateGroupMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupMetadataResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupMetadataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupMetadataResponse>, I>>(base?: I): MsgUpdateGroupMetadataResponse {
    return MsgUpdateGroupMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupMetadataResponse>, I>>(_: I): MsgUpdateGroupMetadataResponse {
    const message = createBaseMsgUpdateGroupMetadataResponse();
    return message;
  },
};

function createBaseMsgCreateGroupPolicy(): MsgCreateGroupPolicy {
  return { admin: "", groupId: 0, metadata: "", decisionPolicy: undefined };
}

export const MsgCreateGroupPolicy = {
  encode(message: MsgCreateGroupPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupId !== 0) {
      writer.uint32(16).uint64(message.groupId);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.decisionPolicy !== undefined) {
      Any.encode(message.decisionPolicy, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.groupId = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.decisionPolicy = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupPolicy {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      decisionPolicy: isSet(object.decisionPolicy) ? Any.fromJSON(object.decisionPolicy) : undefined,
    };
  },

  toJSON(message: MsgCreateGroupPolicy): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.decisionPolicy !== undefined) {
      obj.decisionPolicy = Any.toJSON(message.decisionPolicy);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateGroupPolicy>, I>>(base?: I): MsgCreateGroupPolicy {
    return MsgCreateGroupPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGroupPolicy>, I>>(object: I): MsgCreateGroupPolicy {
    const message = createBaseMsgCreateGroupPolicy();
    message.admin = object.admin ?? "";
    message.groupId = object.groupId ?? 0;
    message.metadata = object.metadata ?? "";
    message.decisionPolicy = (object.decisionPolicy !== undefined && object.decisionPolicy !== null)
      ? Any.fromPartial(object.decisionPolicy)
      : undefined;
    return message;
  },
};

function createBaseMsgCreateGroupPolicyResponse(): MsgCreateGroupPolicyResponse {
  return { address: "" };
}

export const MsgCreateGroupPolicyResponse = {
  encode(message: MsgCreateGroupPolicyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupPolicyResponse {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: MsgCreateGroupPolicyResponse): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateGroupPolicyResponse>, I>>(base?: I): MsgCreateGroupPolicyResponse {
    return MsgCreateGroupPolicyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGroupPolicyResponse>, I>>(object: I): MsgCreateGroupPolicyResponse {
    const message = createBaseMsgCreateGroupPolicyResponse();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyAdmin(): MsgUpdateGroupPolicyAdmin {
  return { admin: "", groupPolicyAddress: "", newAdmin: "" };
}

export const MsgUpdateGroupPolicyAdmin = {
  encode(message: MsgUpdateGroupPolicyAdmin, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupPolicyAddress !== "") {
      writer.uint32(18).string(message.groupPolicyAddress);
    }
    if (message.newAdmin !== "") {
      writer.uint32(26).string(message.newAdmin);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyAdmin {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.groupPolicyAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newAdmin = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupPolicyAdmin {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : "",
      newAdmin: isSet(object.newAdmin) ? String(object.newAdmin) : "",
    };
  },

  toJSON(message: MsgUpdateGroupPolicyAdmin): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.groupPolicyAddress !== "") {
      obj.groupPolicyAddress = message.groupPolicyAddress;
    }
    if (message.newAdmin !== "") {
      obj.newAdmin = message.newAdmin;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupPolicyAdmin>, I>>(base?: I): MsgUpdateGroupPolicyAdmin {
    return MsgUpdateGroupPolicyAdmin.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupPolicyAdmin>, I>>(object: I): MsgUpdateGroupPolicyAdmin {
    const message = createBaseMsgUpdateGroupPolicyAdmin();
    message.admin = object.admin ?? "";
    message.groupPolicyAddress = object.groupPolicyAddress ?? "";
    message.newAdmin = object.newAdmin ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyAdminResponse(): MsgUpdateGroupPolicyAdminResponse {
  return {};
}

export const MsgUpdateGroupPolicyAdminResponse = {
  encode(_: MsgUpdateGroupPolicyAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyAdminResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupPolicyAdminResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupPolicyAdminResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupPolicyAdminResponse>, I>>(
    base?: I,
  ): MsgUpdateGroupPolicyAdminResponse {
    return MsgUpdateGroupPolicyAdminResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupPolicyAdminResponse>, I>>(
    _: I,
  ): MsgUpdateGroupPolicyAdminResponse {
    const message = createBaseMsgUpdateGroupPolicyAdminResponse();
    return message;
  },
};

function createBaseMsgCreateGroupWithPolicy(): MsgCreateGroupWithPolicy {
  return {
    admin: "",
    members: [],
    groupMetadata: "",
    groupPolicyMetadata: "",
    groupPolicyAsAdmin: false,
    decisionPolicy: undefined,
  };
}

export const MsgCreateGroupWithPolicy = {
  encode(message: MsgCreateGroupWithPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    for (const v of message.members) {
      MemberRequest.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.groupMetadata !== "") {
      writer.uint32(26).string(message.groupMetadata);
    }
    if (message.groupPolicyMetadata !== "") {
      writer.uint32(34).string(message.groupPolicyMetadata);
    }
    if (message.groupPolicyAsAdmin === true) {
      writer.uint32(40).bool(message.groupPolicyAsAdmin);
    }
    if (message.decisionPolicy !== undefined) {
      Any.encode(message.decisionPolicy, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupWithPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupWithPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.members.push(MemberRequest.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.groupMetadata = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.groupPolicyMetadata = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.groupPolicyAsAdmin = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.decisionPolicy = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupWithPolicy {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      members: Array.isArray(object?.members) ? object.members.map((e: any) => MemberRequest.fromJSON(e)) : [],
      groupMetadata: isSet(object.groupMetadata) ? String(object.groupMetadata) : "",
      groupPolicyMetadata: isSet(object.groupPolicyMetadata) ? String(object.groupPolicyMetadata) : "",
      groupPolicyAsAdmin: isSet(object.groupPolicyAsAdmin) ? Boolean(object.groupPolicyAsAdmin) : false,
      decisionPolicy: isSet(object.decisionPolicy) ? Any.fromJSON(object.decisionPolicy) : undefined,
    };
  },

  toJSON(message: MsgCreateGroupWithPolicy): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.members?.length) {
      obj.members = message.members.map((e) => MemberRequest.toJSON(e));
    }
    if (message.groupMetadata !== "") {
      obj.groupMetadata = message.groupMetadata;
    }
    if (message.groupPolicyMetadata !== "") {
      obj.groupPolicyMetadata = message.groupPolicyMetadata;
    }
    if (message.groupPolicyAsAdmin === true) {
      obj.groupPolicyAsAdmin = message.groupPolicyAsAdmin;
    }
    if (message.decisionPolicy !== undefined) {
      obj.decisionPolicy = Any.toJSON(message.decisionPolicy);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateGroupWithPolicy>, I>>(base?: I): MsgCreateGroupWithPolicy {
    return MsgCreateGroupWithPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGroupWithPolicy>, I>>(object: I): MsgCreateGroupWithPolicy {
    const message = createBaseMsgCreateGroupWithPolicy();
    message.admin = object.admin ?? "";
    message.members = object.members?.map((e) => MemberRequest.fromPartial(e)) || [];
    message.groupMetadata = object.groupMetadata ?? "";
    message.groupPolicyMetadata = object.groupPolicyMetadata ?? "";
    message.groupPolicyAsAdmin = object.groupPolicyAsAdmin ?? false;
    message.decisionPolicy = (object.decisionPolicy !== undefined && object.decisionPolicy !== null)
      ? Any.fromPartial(object.decisionPolicy)
      : undefined;
    return message;
  },
};

function createBaseMsgCreateGroupWithPolicyResponse(): MsgCreateGroupWithPolicyResponse {
  return { groupId: 0, groupPolicyAddress: "" };
}

export const MsgCreateGroupWithPolicyResponse = {
  encode(message: MsgCreateGroupWithPolicyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint64(message.groupId);
    }
    if (message.groupPolicyAddress !== "") {
      writer.uint32(18).string(message.groupPolicyAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateGroupWithPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateGroupWithPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.groupId = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.groupPolicyAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateGroupWithPolicyResponse {
    return {
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
      groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : "",
    };
  },

  toJSON(message: MsgCreateGroupWithPolicyResponse): unknown {
    const obj: any = {};
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    if (message.groupPolicyAddress !== "") {
      obj.groupPolicyAddress = message.groupPolicyAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateGroupWithPolicyResponse>, I>>(
    base?: I,
  ): MsgCreateGroupWithPolicyResponse {
    return MsgCreateGroupWithPolicyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateGroupWithPolicyResponse>, I>>(
    object: I,
  ): MsgCreateGroupWithPolicyResponse {
    const message = createBaseMsgCreateGroupWithPolicyResponse();
    message.groupId = object.groupId ?? 0;
    message.groupPolicyAddress = object.groupPolicyAddress ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyDecisionPolicy(): MsgUpdateGroupPolicyDecisionPolicy {
  return { admin: "", groupPolicyAddress: "", decisionPolicy: undefined };
}

export const MsgUpdateGroupPolicyDecisionPolicy = {
  encode(message: MsgUpdateGroupPolicyDecisionPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupPolicyAddress !== "") {
      writer.uint32(18).string(message.groupPolicyAddress);
    }
    if (message.decisionPolicy !== undefined) {
      Any.encode(message.decisionPolicy, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyDecisionPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.groupPolicyAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.decisionPolicy = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupPolicyDecisionPolicy {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : "",
      decisionPolicy: isSet(object.decisionPolicy) ? Any.fromJSON(object.decisionPolicy) : undefined,
    };
  },

  toJSON(message: MsgUpdateGroupPolicyDecisionPolicy): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.groupPolicyAddress !== "") {
      obj.groupPolicyAddress = message.groupPolicyAddress;
    }
    if (message.decisionPolicy !== undefined) {
      obj.decisionPolicy = Any.toJSON(message.decisionPolicy);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupPolicyDecisionPolicy>, I>>(
    base?: I,
  ): MsgUpdateGroupPolicyDecisionPolicy {
    return MsgUpdateGroupPolicyDecisionPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupPolicyDecisionPolicy>, I>>(
    object: I,
  ): MsgUpdateGroupPolicyDecisionPolicy {
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicy();
    message.admin = object.admin ?? "";
    message.groupPolicyAddress = object.groupPolicyAddress ?? "";
    message.decisionPolicy = (object.decisionPolicy !== undefined && object.decisionPolicy !== null)
      ? Any.fromPartial(object.decisionPolicy)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyDecisionPolicyResponse(): MsgUpdateGroupPolicyDecisionPolicyResponse {
  return {};
}

export const MsgUpdateGroupPolicyDecisionPolicyResponse = {
  encode(_: MsgUpdateGroupPolicyDecisionPolicyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyDecisionPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupPolicyDecisionPolicyResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupPolicyDecisionPolicyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupPolicyDecisionPolicyResponse>, I>>(
    base?: I,
  ): MsgUpdateGroupPolicyDecisionPolicyResponse {
    return MsgUpdateGroupPolicyDecisionPolicyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupPolicyDecisionPolicyResponse>, I>>(
    _: I,
  ): MsgUpdateGroupPolicyDecisionPolicyResponse {
    const message = createBaseMsgUpdateGroupPolicyDecisionPolicyResponse();
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyMetadata(): MsgUpdateGroupPolicyMetadata {
  return { admin: "", groupPolicyAddress: "", metadata: "" };
}

export const MsgUpdateGroupPolicyMetadata = {
  encode(message: MsgUpdateGroupPolicyMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.groupPolicyAddress !== "") {
      writer.uint32(18).string(message.groupPolicyAddress);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.admin = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.groupPolicyAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateGroupPolicyMetadata {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: MsgUpdateGroupPolicyMetadata): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.groupPolicyAddress !== "") {
      obj.groupPolicyAddress = message.groupPolicyAddress;
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupPolicyMetadata>, I>>(base?: I): MsgUpdateGroupPolicyMetadata {
    return MsgUpdateGroupPolicyMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupPolicyMetadata>, I>>(object: I): MsgUpdateGroupPolicyMetadata {
    const message = createBaseMsgUpdateGroupPolicyMetadata();
    message.admin = object.admin ?? "";
    message.groupPolicyAddress = object.groupPolicyAddress ?? "";
    message.metadata = object.metadata ?? "";
    return message;
  },
};

function createBaseMsgUpdateGroupPolicyMetadataResponse(): MsgUpdateGroupPolicyMetadataResponse {
  return {};
}

export const MsgUpdateGroupPolicyMetadataResponse = {
  encode(_: MsgUpdateGroupPolicyMetadataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateGroupPolicyMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateGroupPolicyMetadataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateGroupPolicyMetadataResponse {
    return {};
  },

  toJSON(_: MsgUpdateGroupPolicyMetadataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateGroupPolicyMetadataResponse>, I>>(
    base?: I,
  ): MsgUpdateGroupPolicyMetadataResponse {
    return MsgUpdateGroupPolicyMetadataResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateGroupPolicyMetadataResponse>, I>>(
    _: I,
  ): MsgUpdateGroupPolicyMetadataResponse {
    const message = createBaseMsgUpdateGroupPolicyMetadataResponse();
    return message;
  },
};

function createBaseMsgSubmitProposal(): MsgSubmitProposal {
  return { groupPolicyAddress: "", proposers: [], metadata: "", messages: [], exec: 0, title: "", summary: "" };
}

export const MsgSubmitProposal = {
  encode(message: MsgSubmitProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupPolicyAddress !== "") {
      writer.uint32(10).string(message.groupPolicyAddress);
    }
    for (const v of message.proposers) {
      writer.uint32(18).string(v!);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.exec !== 0) {
      writer.uint32(40).int32(message.exec);
    }
    if (message.title !== "") {
      writer.uint32(50).string(message.title);
    }
    if (message.summary !== "") {
      writer.uint32(58).string(message.summary);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupPolicyAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proposers.push(reader.string());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.messages.push(Any.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.exec = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.title = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.summary = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitProposal {
    return {
      groupPolicyAddress: isSet(object.groupPolicyAddress) ? String(object.groupPolicyAddress) : "",
      proposers: Array.isArray(object?.proposers) ? object.proposers.map((e: any) => String(e)) : [],
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      messages: Array.isArray(object?.messages) ? object.messages.map((e: any) => Any.fromJSON(e)) : [],
      exec: isSet(object.exec) ? execFromJSON(object.exec) : 0,
      title: isSet(object.title) ? String(object.title) : "",
      summary: isSet(object.summary) ? String(object.summary) : "",
    };
  },

  toJSON(message: MsgSubmitProposal): unknown {
    const obj: any = {};
    if (message.groupPolicyAddress !== "") {
      obj.groupPolicyAddress = message.groupPolicyAddress;
    }
    if (message.proposers?.length) {
      obj.proposers = message.proposers;
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.messages?.length) {
      obj.messages = message.messages.map((e) => Any.toJSON(e));
    }
    if (message.exec !== 0) {
      obj.exec = execToJSON(message.exec);
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.summary !== "") {
      obj.summary = message.summary;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSubmitProposal>, I>>(base?: I): MsgSubmitProposal {
    return MsgSubmitProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSubmitProposal>, I>>(object: I): MsgSubmitProposal {
    const message = createBaseMsgSubmitProposal();
    message.groupPolicyAddress = object.groupPolicyAddress ?? "";
    message.proposers = object.proposers?.map((e) => e) || [];
    message.metadata = object.metadata ?? "";
    message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
    message.exec = object.exec ?? 0;
    message.title = object.title ?? "";
    message.summary = object.summary ?? "";
    return message;
  },
};

function createBaseMsgSubmitProposalResponse(): MsgSubmitProposalResponse {
  return { proposalId: 0 };
}

export const MsgSubmitProposalResponse = {
  encode(message: MsgSubmitProposalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitProposalResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitProposalResponse {
    return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
  },

  toJSON(message: MsgSubmitProposalResponse): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgSubmitProposalResponse>, I>>(base?: I): MsgSubmitProposalResponse {
    return MsgSubmitProposalResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgSubmitProposalResponse>, I>>(object: I): MsgSubmitProposalResponse {
    const message = createBaseMsgSubmitProposalResponse();
    message.proposalId = object.proposalId ?? 0;
    return message;
  },
};

function createBaseMsgWithdrawProposal(): MsgWithdrawProposal {
  return { proposalId: 0, address: "" };
}

export const MsgWithdrawProposal = {
  encode(message: MsgWithdrawProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawProposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgWithdrawProposal {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: MsgWithdrawProposal): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgWithdrawProposal>, I>>(base?: I): MsgWithdrawProposal {
    return MsgWithdrawProposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgWithdrawProposal>, I>>(object: I): MsgWithdrawProposal {
    const message = createBaseMsgWithdrawProposal();
    message.proposalId = object.proposalId ?? 0;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseMsgWithdrawProposalResponse(): MsgWithdrawProposalResponse {
  return {};
}

export const MsgWithdrawProposalResponse = {
  encode(_: MsgWithdrawProposalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawProposalResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgWithdrawProposalResponse {
    return {};
  },

  toJSON(_: MsgWithdrawProposalResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgWithdrawProposalResponse>, I>>(base?: I): MsgWithdrawProposalResponse {
    return MsgWithdrawProposalResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgWithdrawProposalResponse>, I>>(_: I): MsgWithdrawProposalResponse {
    const message = createBaseMsgWithdrawProposalResponse();
    return message;
  },
};

function createBaseMsgVote(): MsgVote {
  return { proposalId: 0, voter: "", option: 0, metadata: "", exec: 0 };
}

export const MsgVote = {
  encode(message: MsgVote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    if (message.option !== 0) {
      writer.uint32(24).int32(message.option);
    }
    if (message.metadata !== "") {
      writer.uint32(34).string(message.metadata);
    }
    if (message.exec !== 0) {
      writer.uint32(40).int32(message.exec);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVote {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.voter = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.option = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.exec = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgVote {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      voter: isSet(object.voter) ? String(object.voter) : "",
      option: isSet(object.option) ? voteOptionFromJSON(object.option) : 0,
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      exec: isSet(object.exec) ? execFromJSON(object.exec) : 0,
    };
  },

  toJSON(message: MsgVote): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.voter !== "") {
      obj.voter = message.voter;
    }
    if (message.option !== 0) {
      obj.option = voteOptionToJSON(message.option);
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.exec !== 0) {
      obj.exec = execToJSON(message.exec);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgVote>, I>>(base?: I): MsgVote {
    return MsgVote.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgVote>, I>>(object: I): MsgVote {
    const message = createBaseMsgVote();
    message.proposalId = object.proposalId ?? 0;
    message.voter = object.voter ?? "";
    message.option = object.option ?? 0;
    message.metadata = object.metadata ?? "";
    message.exec = object.exec ?? 0;
    return message;
  },
};

function createBaseMsgVoteResponse(): MsgVoteResponse {
  return {};
}

export const MsgVoteResponse = {
  encode(_: MsgVoteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVoteResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVoteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgVoteResponse {
    return {};
  },

  toJSON(_: MsgVoteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgVoteResponse>, I>>(base?: I): MsgVoteResponse {
    return MsgVoteResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgVoteResponse>, I>>(_: I): MsgVoteResponse {
    const message = createBaseMsgVoteResponse();
    return message;
  },
};

function createBaseMsgExec(): MsgExec {
  return { proposalId: 0, executor: "" };
}

export const MsgExec = {
  encode(message: MsgExec, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.executor !== "") {
      writer.uint32(18).string(message.executor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExec {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.executor = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExec {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      executor: isSet(object.executor) ? String(object.executor) : "",
    };
  },

  toJSON(message: MsgExec): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.executor !== "") {
      obj.executor = message.executor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExec>, I>>(base?: I): MsgExec {
    return MsgExec.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExec>, I>>(object: I): MsgExec {
    const message = createBaseMsgExec();
    message.proposalId = object.proposalId ?? 0;
    message.executor = object.executor ?? "";
    return message;
  },
};

function createBaseMsgExecResponse(): MsgExecResponse {
  return { result: 0 };
}

export const MsgExecResponse = {
  encode(message: MsgExecResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(16).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgExecResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgExecResponse {
    return { result: isSet(object.result) ? proposalExecutorResultFromJSON(object.result) : 0 };
  },

  toJSON(message: MsgExecResponse): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = proposalExecutorResultToJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgExecResponse>, I>>(base?: I): MsgExecResponse {
    return MsgExecResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgExecResponse>, I>>(object: I): MsgExecResponse {
    const message = createBaseMsgExecResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgLeaveGroup(): MsgLeaveGroup {
  return { address: "", groupId: 0 };
}

export const MsgLeaveGroup = {
  encode(message: MsgLeaveGroup, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.groupId !== 0) {
      writer.uint32(16).uint64(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLeaveGroup {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLeaveGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.groupId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgLeaveGroup {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
    };
  },

  toJSON(message: MsgLeaveGroup): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgLeaveGroup>, I>>(base?: I): MsgLeaveGroup {
    return MsgLeaveGroup.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgLeaveGroup>, I>>(object: I): MsgLeaveGroup {
    const message = createBaseMsgLeaveGroup();
    message.address = object.address ?? "";
    message.groupId = object.groupId ?? 0;
    return message;
  },
};

function createBaseMsgLeaveGroupResponse(): MsgLeaveGroupResponse {
  return {};
}

export const MsgLeaveGroupResponse = {
  encode(_: MsgLeaveGroupResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLeaveGroupResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLeaveGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgLeaveGroupResponse {
    return {};
  },

  toJSON(_: MsgLeaveGroupResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgLeaveGroupResponse>, I>>(base?: I): MsgLeaveGroupResponse {
    return MsgLeaveGroupResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgLeaveGroupResponse>, I>>(_: I): MsgLeaveGroupResponse {
    const message = createBaseMsgLeaveGroupResponse();
    return message;
  },
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
  UpdateGroupPolicyDecisionPolicy(
    request: MsgUpdateGroupPolicyDecisionPolicy,
  ): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse>;
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

export const MsgServiceName = "cosmos.group.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateGroup = this.CreateGroup.bind(this);
    this.UpdateGroupMembers = this.UpdateGroupMembers.bind(this);
    this.UpdateGroupAdmin = this.UpdateGroupAdmin.bind(this);
    this.UpdateGroupMetadata = this.UpdateGroupMetadata.bind(this);
    this.CreateGroupPolicy = this.CreateGroupPolicy.bind(this);
    this.CreateGroupWithPolicy = this.CreateGroupWithPolicy.bind(this);
    this.UpdateGroupPolicyAdmin = this.UpdateGroupPolicyAdmin.bind(this);
    this.UpdateGroupPolicyDecisionPolicy = this.UpdateGroupPolicyDecisionPolicy.bind(this);
    this.UpdateGroupPolicyMetadata = this.UpdateGroupPolicyMetadata.bind(this);
    this.SubmitProposal = this.SubmitProposal.bind(this);
    this.WithdrawProposal = this.WithdrawProposal.bind(this);
    this.Vote = this.Vote.bind(this);
    this.Exec = this.Exec.bind(this);
    this.LeaveGroup = this.LeaveGroup.bind(this);
  }
  CreateGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse> {
    const data = MsgCreateGroup.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateGroup", data);
    return promise.then((data) => MsgCreateGroupResponse.decode(_m0.Reader.create(data)));
  }

  UpdateGroupMembers(request: MsgUpdateGroupMembers): Promise<MsgUpdateGroupMembersResponse> {
    const data = MsgUpdateGroupMembers.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateGroupMembers", data);
    return promise.then((data) => MsgUpdateGroupMembersResponse.decode(_m0.Reader.create(data)));
  }

  UpdateGroupAdmin(request: MsgUpdateGroupAdmin): Promise<MsgUpdateGroupAdminResponse> {
    const data = MsgUpdateGroupAdmin.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateGroupAdmin", data);
    return promise.then((data) => MsgUpdateGroupAdminResponse.decode(_m0.Reader.create(data)));
  }

  UpdateGroupMetadata(request: MsgUpdateGroupMetadata): Promise<MsgUpdateGroupMetadataResponse> {
    const data = MsgUpdateGroupMetadata.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateGroupMetadata", data);
    return promise.then((data) => MsgUpdateGroupMetadataResponse.decode(_m0.Reader.create(data)));
  }

  CreateGroupPolicy(request: MsgCreateGroupPolicy): Promise<MsgCreateGroupPolicyResponse> {
    const data = MsgCreateGroupPolicy.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateGroupPolicy", data);
    return promise.then((data) => MsgCreateGroupPolicyResponse.decode(_m0.Reader.create(data)));
  }

  CreateGroupWithPolicy(request: MsgCreateGroupWithPolicy): Promise<MsgCreateGroupWithPolicyResponse> {
    const data = MsgCreateGroupWithPolicy.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateGroupWithPolicy", data);
    return promise.then((data) => MsgCreateGroupWithPolicyResponse.decode(_m0.Reader.create(data)));
  }

  UpdateGroupPolicyAdmin(request: MsgUpdateGroupPolicyAdmin): Promise<MsgUpdateGroupPolicyAdminResponse> {
    const data = MsgUpdateGroupPolicyAdmin.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateGroupPolicyAdmin", data);
    return promise.then((data) => MsgUpdateGroupPolicyAdminResponse.decode(_m0.Reader.create(data)));
  }

  UpdateGroupPolicyDecisionPolicy(
    request: MsgUpdateGroupPolicyDecisionPolicy,
  ): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse> {
    const data = MsgUpdateGroupPolicyDecisionPolicy.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateGroupPolicyDecisionPolicy", data);
    return promise.then((data) => MsgUpdateGroupPolicyDecisionPolicyResponse.decode(_m0.Reader.create(data)));
  }

  UpdateGroupPolicyMetadata(request: MsgUpdateGroupPolicyMetadata): Promise<MsgUpdateGroupPolicyMetadataResponse> {
    const data = MsgUpdateGroupPolicyMetadata.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateGroupPolicyMetadata", data);
    return promise.then((data) => MsgUpdateGroupPolicyMetadataResponse.decode(_m0.Reader.create(data)));
  }

  SubmitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse> {
    const data = MsgSubmitProposal.encode(request).finish();
    const promise = this.rpc.request(this.service, "SubmitProposal", data);
    return promise.then((data) => MsgSubmitProposalResponse.decode(_m0.Reader.create(data)));
  }

  WithdrawProposal(request: MsgWithdrawProposal): Promise<MsgWithdrawProposalResponse> {
    const data = MsgWithdrawProposal.encode(request).finish();
    const promise = this.rpc.request(this.service, "WithdrawProposal", data);
    return promise.then((data) => MsgWithdrawProposalResponse.decode(_m0.Reader.create(data)));
  }

  Vote(request: MsgVote): Promise<MsgVoteResponse> {
    const data = MsgVote.encode(request).finish();
    const promise = this.rpc.request(this.service, "Vote", data);
    return promise.then((data) => MsgVoteResponse.decode(_m0.Reader.create(data)));
  }

  Exec(request: MsgExec): Promise<MsgExecResponse> {
    const data = MsgExec.encode(request).finish();
    const promise = this.rpc.request(this.service, "Exec", data);
    return promise.then((data) => MsgExecResponse.decode(_m0.Reader.create(data)));
  }

  LeaveGroup(request: MsgLeaveGroup): Promise<MsgLeaveGroupResponse> {
    const data = MsgLeaveGroup.encode(request).finish();
    const promise = this.rpc.request(this.service, "LeaveGroup", data);
    return promise.then((data) => MsgLeaveGroupResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
