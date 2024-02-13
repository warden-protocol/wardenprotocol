/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { GroupInfo, GroupMember, GroupPolicyInfo, Proposal, TallyResult, Vote } from "./types";

export const protobufPackage = "cosmos.group.v1";

/** Since: cosmos-sdk 0.46 */

/** QueryGroupInfoRequest is the Query/GroupInfo request type. */
export interface QueryGroupInfoRequest {
  /** group_id is the unique ID of the group. */
  groupId: number;
}

/** QueryGroupInfoResponse is the Query/GroupInfo response type. */
export interface QueryGroupInfoResponse {
  /** info is the GroupInfo of the group. */
  info: GroupInfo | undefined;
}

/** QueryGroupPolicyInfoRequest is the Query/GroupPolicyInfo request type. */
export interface QueryGroupPolicyInfoRequest {
  /** address is the account address of the group policy. */
  address: string;
}

/** QueryGroupPolicyInfoResponse is the Query/GroupPolicyInfo response type. */
export interface QueryGroupPolicyInfoResponse {
  /** info is the GroupPolicyInfo of the group policy. */
  info: GroupPolicyInfo | undefined;
}

/** QueryGroupMembersRequest is the Query/GroupMembers request type. */
export interface QueryGroupMembersRequest {
  /** group_id is the unique ID of the group. */
  groupId: number;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryGroupMembersResponse is the Query/GroupMembersResponse response type. */
export interface QueryGroupMembersResponse {
  /** members are the members of the group with given group_id. */
  members: GroupMember[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryGroupsByAdminRequest is the Query/GroupsByAdmin request type. */
export interface QueryGroupsByAdminRequest {
  /** admin is the account address of a group's admin. */
  admin: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryGroupsByAdminResponse is the Query/GroupsByAdminResponse response type. */
export interface QueryGroupsByAdminResponse {
  /** groups are the groups info with the provided admin. */
  groups: GroupInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryGroupPoliciesByGroupRequest is the Query/GroupPoliciesByGroup request type. */
export interface QueryGroupPoliciesByGroupRequest {
  /** group_id is the unique ID of the group policy's group. */
  groupId: number;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryGroupPoliciesByGroupResponse is the Query/GroupPoliciesByGroup response type. */
export interface QueryGroupPoliciesByGroupResponse {
  /** group_policies are the group policies info associated with the provided group. */
  groupPolicies: GroupPolicyInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryGroupPoliciesByAdminRequest is the Query/GroupPoliciesByAdmin request type. */
export interface QueryGroupPoliciesByAdminRequest {
  /** admin is the admin address of the group policy. */
  admin: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryGroupPoliciesByAdminResponse is the Query/GroupPoliciesByAdmin response type. */
export interface QueryGroupPoliciesByAdminResponse {
  /** group_policies are the group policies info with provided admin. */
  groupPolicies: GroupPolicyInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryProposalRequest is the Query/Proposal request type. */
export interface QueryProposalRequest {
  /** proposal_id is the unique ID of a proposal. */
  proposalId: number;
}

/** QueryProposalResponse is the Query/Proposal response type. */
export interface QueryProposalResponse {
  /** proposal is the proposal info. */
  proposal: Proposal | undefined;
}

/** QueryProposalsByGroupPolicyRequest is the Query/ProposalByGroupPolicy request type. */
export interface QueryProposalsByGroupPolicyRequest {
  /** address is the account address of the group policy related to proposals. */
  address: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryProposalsByGroupPolicyResponse is the Query/ProposalByGroupPolicy response type. */
export interface QueryProposalsByGroupPolicyResponse {
  /** proposals are the proposals with given group policy. */
  proposals: Proposal[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryVoteByProposalVoterRequest is the Query/VoteByProposalVoter request type. */
export interface QueryVoteByProposalVoterRequest {
  /** proposal_id is the unique ID of a proposal. */
  proposalId: number;
  /** voter is a proposal voter account address. */
  voter: string;
}

/** QueryVoteByProposalVoterResponse is the Query/VoteByProposalVoter response type. */
export interface QueryVoteByProposalVoterResponse {
  /** vote is the vote with given proposal_id and voter. */
  vote: Vote | undefined;
}

/** QueryVotesByProposalRequest is the Query/VotesByProposal request type. */
export interface QueryVotesByProposalRequest {
  /** proposal_id is the unique ID of a proposal. */
  proposalId: number;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryVotesByProposalResponse is the Query/VotesByProposal response type. */
export interface QueryVotesByProposalResponse {
  /** votes are the list of votes for given proposal_id. */
  votes: Vote[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryVotesByVoterRequest is the Query/VotesByVoter request type. */
export interface QueryVotesByVoterRequest {
  /** voter is a proposal voter account address. */
  voter: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryVotesByVoterResponse is the Query/VotesByVoter response type. */
export interface QueryVotesByVoterResponse {
  /** votes are the list of votes by given voter. */
  votes: Vote[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryGroupsByMemberRequest is the Query/GroupsByMember request type. */
export interface QueryGroupsByMemberRequest {
  /** address is the group member address. */
  address: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QueryGroupsByMemberResponse is the Query/GroupsByMember response type. */
export interface QueryGroupsByMemberResponse {
  /** groups are the groups info with the provided group member. */
  groups: GroupInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

/** QueryTallyResultRequest is the Query/TallyResult request type. */
export interface QueryTallyResultRequest {
  /** proposal_id is the unique id of a proposal. */
  proposalId: number;
}

/** QueryTallyResultResponse is the Query/TallyResult response type. */
export interface QueryTallyResultResponse {
  /** tally defines the requested tally. */
  tally: TallyResult | undefined;
}

/**
 * QueryGroupsRequest is the Query/Groups request type.
 *
 * Since: cosmos-sdk 0.47.1
 */
export interface QueryGroupsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest | undefined;
}

/**
 * QueryGroupsResponse is the Query/Groups response type.
 *
 * Since: cosmos-sdk 0.47.1
 */
export interface QueryGroupsResponse {
  /** `groups` is all the groups present in state. */
  groups: GroupInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse | undefined;
}

function createBaseQueryGroupInfoRequest(): QueryGroupInfoRequest {
  return { groupId: 0 };
}

export const QueryGroupInfoRequest = {
  encode(message: QueryGroupInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint64(message.groupId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupInfoRequest();
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

  fromJSON(object: any): QueryGroupInfoRequest {
    return { groupId: isSet(object.groupId) ? Number(object.groupId) : 0 };
  },

  toJSON(message: QueryGroupInfoRequest): unknown {
    const obj: any = {};
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupInfoRequest>, I>>(base?: I): QueryGroupInfoRequest {
    return QueryGroupInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupInfoRequest>, I>>(object: I): QueryGroupInfoRequest {
    const message = createBaseQueryGroupInfoRequest();
    message.groupId = object.groupId ?? 0;
    return message;
  },
};

function createBaseQueryGroupInfoResponse(): QueryGroupInfoResponse {
  return { info: undefined };
}

export const QueryGroupInfoResponse = {
  encode(message: QueryGroupInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.info !== undefined) {
      GroupInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.info = GroupInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupInfoResponse {
    return { info: isSet(object.info) ? GroupInfo.fromJSON(object.info) : undefined };
  },

  toJSON(message: QueryGroupInfoResponse): unknown {
    const obj: any = {};
    if (message.info !== undefined) {
      obj.info = GroupInfo.toJSON(message.info);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupInfoResponse>, I>>(base?: I): QueryGroupInfoResponse {
    return QueryGroupInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupInfoResponse>, I>>(object: I): QueryGroupInfoResponse {
    const message = createBaseQueryGroupInfoResponse();
    message.info = (object.info !== undefined && object.info !== null) ? GroupInfo.fromPartial(object.info) : undefined;
    return message;
  },
};

function createBaseQueryGroupPolicyInfoRequest(): QueryGroupPolicyInfoRequest {
  return { address: "" };
}

export const QueryGroupPolicyInfoRequest = {
  encode(message: QueryGroupPolicyInfoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPolicyInfoRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupPolicyInfoRequest();
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

  fromJSON(object: any): QueryGroupPolicyInfoRequest {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: QueryGroupPolicyInfoRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupPolicyInfoRequest>, I>>(base?: I): QueryGroupPolicyInfoRequest {
    return QueryGroupPolicyInfoRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupPolicyInfoRequest>, I>>(object: I): QueryGroupPolicyInfoRequest {
    const message = createBaseQueryGroupPolicyInfoRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryGroupPolicyInfoResponse(): QueryGroupPolicyInfoResponse {
  return { info: undefined };
}

export const QueryGroupPolicyInfoResponse = {
  encode(message: QueryGroupPolicyInfoResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.info !== undefined) {
      GroupPolicyInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPolicyInfoResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupPolicyInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.info = GroupPolicyInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupPolicyInfoResponse {
    return { info: isSet(object.info) ? GroupPolicyInfo.fromJSON(object.info) : undefined };
  },

  toJSON(message: QueryGroupPolicyInfoResponse): unknown {
    const obj: any = {};
    if (message.info !== undefined) {
      obj.info = GroupPolicyInfo.toJSON(message.info);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupPolicyInfoResponse>, I>>(base?: I): QueryGroupPolicyInfoResponse {
    return QueryGroupPolicyInfoResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupPolicyInfoResponse>, I>>(object: I): QueryGroupPolicyInfoResponse {
    const message = createBaseQueryGroupPolicyInfoResponse();
    message.info = (object.info !== undefined && object.info !== null)
      ? GroupPolicyInfo.fromPartial(object.info)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupMembersRequest(): QueryGroupMembersRequest {
  return { groupId: 0, pagination: undefined };
}

export const QueryGroupMembersRequest = {
  encode(message: QueryGroupMembersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint64(message.groupId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupMembersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupMembersRequest();
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

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupMembersRequest {
    return {
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupMembersRequest): unknown {
    const obj: any = {};
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupMembersRequest>, I>>(base?: I): QueryGroupMembersRequest {
    return QueryGroupMembersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupMembersRequest>, I>>(object: I): QueryGroupMembersRequest {
    const message = createBaseQueryGroupMembersRequest();
    message.groupId = object.groupId ?? 0;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupMembersResponse(): QueryGroupMembersResponse {
  return { members: [], pagination: undefined };
}

export const QueryGroupMembersResponse = {
  encode(message: QueryGroupMembersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.members) {
      GroupMember.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupMembersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupMembersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.members.push(GroupMember.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupMembersResponse {
    return {
      members: Array.isArray(object?.members) ? object.members.map((e: any) => GroupMember.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupMembersResponse): unknown {
    const obj: any = {};
    if (message.members?.length) {
      obj.members = message.members.map((e) => GroupMember.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupMembersResponse>, I>>(base?: I): QueryGroupMembersResponse {
    return QueryGroupMembersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupMembersResponse>, I>>(object: I): QueryGroupMembersResponse {
    const message = createBaseQueryGroupMembersResponse();
    message.members = object.members?.map((e) => GroupMember.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupsByAdminRequest(): QueryGroupsByAdminRequest {
  return { admin: "", pagination: undefined };
}

export const QueryGroupsByAdminRequest = {
  encode(message: QueryGroupsByAdminRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsByAdminRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupsByAdminRequest();
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

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupsByAdminRequest {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupsByAdminRequest): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupsByAdminRequest>, I>>(base?: I): QueryGroupsByAdminRequest {
    return QueryGroupsByAdminRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupsByAdminRequest>, I>>(object: I): QueryGroupsByAdminRequest {
    const message = createBaseQueryGroupsByAdminRequest();
    message.admin = object.admin ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupsByAdminResponse(): QueryGroupsByAdminResponse {
  return { groups: [], pagination: undefined };
}

export const QueryGroupsByAdminResponse = {
  encode(message: QueryGroupsByAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.groups) {
      GroupInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsByAdminResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupsByAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groups.push(GroupInfo.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupsByAdminResponse {
    return {
      groups: Array.isArray(object?.groups) ? object.groups.map((e: any) => GroupInfo.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupsByAdminResponse): unknown {
    const obj: any = {};
    if (message.groups?.length) {
      obj.groups = message.groups.map((e) => GroupInfo.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupsByAdminResponse>, I>>(base?: I): QueryGroupsByAdminResponse {
    return QueryGroupsByAdminResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupsByAdminResponse>, I>>(object: I): QueryGroupsByAdminResponse {
    const message = createBaseQueryGroupsByAdminResponse();
    message.groups = object.groups?.map((e) => GroupInfo.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupPoliciesByGroupRequest(): QueryGroupPoliciesByGroupRequest {
  return { groupId: 0, pagination: undefined };
}

export const QueryGroupPoliciesByGroupRequest = {
  encode(message: QueryGroupPoliciesByGroupRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.groupId !== 0) {
      writer.uint32(8).uint64(message.groupId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPoliciesByGroupRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupPoliciesByGroupRequest();
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

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupPoliciesByGroupRequest {
    return {
      groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupPoliciesByGroupRequest): unknown {
    const obj: any = {};
    if (message.groupId !== 0) {
      obj.groupId = Math.round(message.groupId);
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupPoliciesByGroupRequest>, I>>(
    base?: I,
  ): QueryGroupPoliciesByGroupRequest {
    return QueryGroupPoliciesByGroupRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupPoliciesByGroupRequest>, I>>(
    object: I,
  ): QueryGroupPoliciesByGroupRequest {
    const message = createBaseQueryGroupPoliciesByGroupRequest();
    message.groupId = object.groupId ?? 0;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupPoliciesByGroupResponse(): QueryGroupPoliciesByGroupResponse {
  return { groupPolicies: [], pagination: undefined };
}

export const QueryGroupPoliciesByGroupResponse = {
  encode(message: QueryGroupPoliciesByGroupResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.groupPolicies) {
      GroupPolicyInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPoliciesByGroupResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupPoliciesByGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupPolicies.push(GroupPolicyInfo.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupPoliciesByGroupResponse {
    return {
      groupPolicies: Array.isArray(object?.groupPolicies)
        ? object.groupPolicies.map((e: any) => GroupPolicyInfo.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupPoliciesByGroupResponse): unknown {
    const obj: any = {};
    if (message.groupPolicies?.length) {
      obj.groupPolicies = message.groupPolicies.map((e) => GroupPolicyInfo.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupPoliciesByGroupResponse>, I>>(
    base?: I,
  ): QueryGroupPoliciesByGroupResponse {
    return QueryGroupPoliciesByGroupResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupPoliciesByGroupResponse>, I>>(
    object: I,
  ): QueryGroupPoliciesByGroupResponse {
    const message = createBaseQueryGroupPoliciesByGroupResponse();
    message.groupPolicies = object.groupPolicies?.map((e) => GroupPolicyInfo.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupPoliciesByAdminRequest(): QueryGroupPoliciesByAdminRequest {
  return { admin: "", pagination: undefined };
}

export const QueryGroupPoliciesByAdminRequest = {
  encode(message: QueryGroupPoliciesByAdminRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPoliciesByAdminRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupPoliciesByAdminRequest();
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

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupPoliciesByAdminRequest {
    return {
      admin: isSet(object.admin) ? String(object.admin) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupPoliciesByAdminRequest): unknown {
    const obj: any = {};
    if (message.admin !== "") {
      obj.admin = message.admin;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupPoliciesByAdminRequest>, I>>(
    base?: I,
  ): QueryGroupPoliciesByAdminRequest {
    return QueryGroupPoliciesByAdminRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupPoliciesByAdminRequest>, I>>(
    object: I,
  ): QueryGroupPoliciesByAdminRequest {
    const message = createBaseQueryGroupPoliciesByAdminRequest();
    message.admin = object.admin ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupPoliciesByAdminResponse(): QueryGroupPoliciesByAdminResponse {
  return { groupPolicies: [], pagination: undefined };
}

export const QueryGroupPoliciesByAdminResponse = {
  encode(message: QueryGroupPoliciesByAdminResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.groupPolicies) {
      GroupPolicyInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupPoliciesByAdminResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupPoliciesByAdminResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groupPolicies.push(GroupPolicyInfo.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupPoliciesByAdminResponse {
    return {
      groupPolicies: Array.isArray(object?.groupPolicies)
        ? object.groupPolicies.map((e: any) => GroupPolicyInfo.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupPoliciesByAdminResponse): unknown {
    const obj: any = {};
    if (message.groupPolicies?.length) {
      obj.groupPolicies = message.groupPolicies.map((e) => GroupPolicyInfo.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupPoliciesByAdminResponse>, I>>(
    base?: I,
  ): QueryGroupPoliciesByAdminResponse {
    return QueryGroupPoliciesByAdminResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupPoliciesByAdminResponse>, I>>(
    object: I,
  ): QueryGroupPoliciesByAdminResponse {
    const message = createBaseQueryGroupPoliciesByAdminResponse();
    message.groupPolicies = object.groupPolicies?.map((e) => GroupPolicyInfo.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryProposalRequest(): QueryProposalRequest {
  return { proposalId: 0 };
}

export const QueryProposalRequest = {
  encode(message: QueryProposalRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalRequest();
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

  fromJSON(object: any): QueryProposalRequest {
    return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
  },

  toJSON(message: QueryProposalRequest): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryProposalRequest>, I>>(base?: I): QueryProposalRequest {
    return QueryProposalRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryProposalRequest>, I>>(object: I): QueryProposalRequest {
    const message = createBaseQueryProposalRequest();
    message.proposalId = object.proposalId ?? 0;
    return message;
  },
};

function createBaseQueryProposalResponse(): QueryProposalResponse {
  return { proposal: undefined };
}

export const QueryProposalResponse = {
  encode(message: QueryProposalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.proposal = Proposal.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryProposalResponse {
    return { proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined };
  },

  toJSON(message: QueryProposalResponse): unknown {
    const obj: any = {};
    if (message.proposal !== undefined) {
      obj.proposal = Proposal.toJSON(message.proposal);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryProposalResponse>, I>>(base?: I): QueryProposalResponse {
    return QueryProposalResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryProposalResponse>, I>>(object: I): QueryProposalResponse {
    const message = createBaseQueryProposalResponse();
    message.proposal = (object.proposal !== undefined && object.proposal !== null)
      ? Proposal.fromPartial(object.proposal)
      : undefined;
    return message;
  },
};

function createBaseQueryProposalsByGroupPolicyRequest(): QueryProposalsByGroupPolicyRequest {
  return { address: "", pagination: undefined };
}

export const QueryProposalsByGroupPolicyRequest = {
  encode(message: QueryProposalsByGroupPolicyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalsByGroupPolicyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalsByGroupPolicyRequest();
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
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryProposalsByGroupPolicyRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryProposalsByGroupPolicyRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryProposalsByGroupPolicyRequest>, I>>(
    base?: I,
  ): QueryProposalsByGroupPolicyRequest {
    return QueryProposalsByGroupPolicyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryProposalsByGroupPolicyRequest>, I>>(
    object: I,
  ): QueryProposalsByGroupPolicyRequest {
    const message = createBaseQueryProposalsByGroupPolicyRequest();
    message.address = object.address ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryProposalsByGroupPolicyResponse(): QueryProposalsByGroupPolicyResponse {
  return { proposals: [], pagination: undefined };
}

export const QueryProposalsByGroupPolicyResponse = {
  encode(message: QueryProposalsByGroupPolicyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.proposals) {
      Proposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryProposalsByGroupPolicyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalsByGroupPolicyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.proposals.push(Proposal.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryProposalsByGroupPolicyResponse {
    return {
      proposals: Array.isArray(object?.proposals) ? object.proposals.map((e: any) => Proposal.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryProposalsByGroupPolicyResponse): unknown {
    const obj: any = {};
    if (message.proposals?.length) {
      obj.proposals = message.proposals.map((e) => Proposal.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryProposalsByGroupPolicyResponse>, I>>(
    base?: I,
  ): QueryProposalsByGroupPolicyResponse {
    return QueryProposalsByGroupPolicyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryProposalsByGroupPolicyResponse>, I>>(
    object: I,
  ): QueryProposalsByGroupPolicyResponse {
    const message = createBaseQueryProposalsByGroupPolicyResponse();
    message.proposals = object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryVoteByProposalVoterRequest(): QueryVoteByProposalVoterRequest {
  return { proposalId: 0, voter: "" };
}

export const QueryVoteByProposalVoterRequest = {
  encode(message: QueryVoteByProposalVoterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVoteByProposalVoterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVoteByProposalVoterRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVoteByProposalVoterRequest {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      voter: isSet(object.voter) ? String(object.voter) : "",
    };
  },

  toJSON(message: QueryVoteByProposalVoterRequest): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.voter !== "") {
      obj.voter = message.voter;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVoteByProposalVoterRequest>, I>>(base?: I): QueryVoteByProposalVoterRequest {
    return QueryVoteByProposalVoterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVoteByProposalVoterRequest>, I>>(
    object: I,
  ): QueryVoteByProposalVoterRequest {
    const message = createBaseQueryVoteByProposalVoterRequest();
    message.proposalId = object.proposalId ?? 0;
    message.voter = object.voter ?? "";
    return message;
  },
};

function createBaseQueryVoteByProposalVoterResponse(): QueryVoteByProposalVoterResponse {
  return { vote: undefined };
}

export const QueryVoteByProposalVoterResponse = {
  encode(message: QueryVoteByProposalVoterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vote !== undefined) {
      Vote.encode(message.vote, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVoteByProposalVoterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVoteByProposalVoterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.vote = Vote.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVoteByProposalVoterResponse {
    return { vote: isSet(object.vote) ? Vote.fromJSON(object.vote) : undefined };
  },

  toJSON(message: QueryVoteByProposalVoterResponse): unknown {
    const obj: any = {};
    if (message.vote !== undefined) {
      obj.vote = Vote.toJSON(message.vote);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVoteByProposalVoterResponse>, I>>(
    base?: I,
  ): QueryVoteByProposalVoterResponse {
    return QueryVoteByProposalVoterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVoteByProposalVoterResponse>, I>>(
    object: I,
  ): QueryVoteByProposalVoterResponse {
    const message = createBaseQueryVoteByProposalVoterResponse();
    message.vote = (object.vote !== undefined && object.vote !== null) ? Vote.fromPartial(object.vote) : undefined;
    return message;
  },
};

function createBaseQueryVotesByProposalRequest(): QueryVotesByProposalRequest {
  return { proposalId: 0, pagination: undefined };
}

export const QueryVotesByProposalRequest = {
  encode(message: QueryVotesByProposalRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesByProposalRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVotesByProposalRequest();
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

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVotesByProposalRequest {
    return {
      proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryVotesByProposalRequest): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVotesByProposalRequest>, I>>(base?: I): QueryVotesByProposalRequest {
    return QueryVotesByProposalRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVotesByProposalRequest>, I>>(object: I): QueryVotesByProposalRequest {
    const message = createBaseQueryVotesByProposalRequest();
    message.proposalId = object.proposalId ?? 0;
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryVotesByProposalResponse(): QueryVotesByProposalResponse {
  return { votes: [], pagination: undefined };
}

export const QueryVotesByProposalResponse = {
  encode(message: QueryVotesByProposalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.votes) {
      Vote.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesByProposalResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVotesByProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.votes.push(Vote.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVotesByProposalResponse {
    return {
      votes: Array.isArray(object?.votes) ? object.votes.map((e: any) => Vote.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryVotesByProposalResponse): unknown {
    const obj: any = {};
    if (message.votes?.length) {
      obj.votes = message.votes.map((e) => Vote.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVotesByProposalResponse>, I>>(base?: I): QueryVotesByProposalResponse {
    return QueryVotesByProposalResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVotesByProposalResponse>, I>>(object: I): QueryVotesByProposalResponse {
    const message = createBaseQueryVotesByProposalResponse();
    message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryVotesByVoterRequest(): QueryVotesByVoterRequest {
  return { voter: "", pagination: undefined };
}

export const QueryVotesByVoterRequest = {
  encode(message: QueryVotesByVoterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.voter !== "") {
      writer.uint32(10).string(message.voter);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesByVoterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVotesByVoterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.voter = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVotesByVoterRequest {
    return {
      voter: isSet(object.voter) ? String(object.voter) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryVotesByVoterRequest): unknown {
    const obj: any = {};
    if (message.voter !== "") {
      obj.voter = message.voter;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVotesByVoterRequest>, I>>(base?: I): QueryVotesByVoterRequest {
    return QueryVotesByVoterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVotesByVoterRequest>, I>>(object: I): QueryVotesByVoterRequest {
    const message = createBaseQueryVotesByVoterRequest();
    message.voter = object.voter ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryVotesByVoterResponse(): QueryVotesByVoterResponse {
  return { votes: [], pagination: undefined };
}

export const QueryVotesByVoterResponse = {
  encode(message: QueryVotesByVoterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.votes) {
      Vote.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryVotesByVoterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVotesByVoterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.votes.push(Vote.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryVotesByVoterResponse {
    return {
      votes: Array.isArray(object?.votes) ? object.votes.map((e: any) => Vote.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryVotesByVoterResponse): unknown {
    const obj: any = {};
    if (message.votes?.length) {
      obj.votes = message.votes.map((e) => Vote.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryVotesByVoterResponse>, I>>(base?: I): QueryVotesByVoterResponse {
    return QueryVotesByVoterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryVotesByVoterResponse>, I>>(object: I): QueryVotesByVoterResponse {
    const message = createBaseQueryVotesByVoterResponse();
    message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupsByMemberRequest(): QueryGroupsByMemberRequest {
  return { address: "", pagination: undefined };
}

export const QueryGroupsByMemberRequest = {
  encode(message: QueryGroupsByMemberRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsByMemberRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupsByMemberRequest();
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
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupsByMemberRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupsByMemberRequest): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupsByMemberRequest>, I>>(base?: I): QueryGroupsByMemberRequest {
    return QueryGroupsByMemberRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupsByMemberRequest>, I>>(object: I): QueryGroupsByMemberRequest {
    const message = createBaseQueryGroupsByMemberRequest();
    message.address = object.address ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupsByMemberResponse(): QueryGroupsByMemberResponse {
  return { groups: [], pagination: undefined };
}

export const QueryGroupsByMemberResponse = {
  encode(message: QueryGroupsByMemberResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.groups) {
      GroupInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsByMemberResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupsByMemberResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groups.push(GroupInfo.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupsByMemberResponse {
    return {
      groups: Array.isArray(object?.groups) ? object.groups.map((e: any) => GroupInfo.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupsByMemberResponse): unknown {
    const obj: any = {};
    if (message.groups?.length) {
      obj.groups = message.groups.map((e) => GroupInfo.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupsByMemberResponse>, I>>(base?: I): QueryGroupsByMemberResponse {
    return QueryGroupsByMemberResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupsByMemberResponse>, I>>(object: I): QueryGroupsByMemberResponse {
    const message = createBaseQueryGroupsByMemberResponse();
    message.groups = object.groups?.map((e) => GroupInfo.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryTallyResultRequest(): QueryTallyResultRequest {
  return { proposalId: 0 };
}

export const QueryTallyResultRequest = {
  encode(message: QueryTallyResultRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposalId !== 0) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTallyResultRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTallyResultRequest();
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

  fromJSON(object: any): QueryTallyResultRequest {
    return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
  },

  toJSON(message: QueryTallyResultRequest): unknown {
    const obj: any = {};
    if (message.proposalId !== 0) {
      obj.proposalId = Math.round(message.proposalId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTallyResultRequest>, I>>(base?: I): QueryTallyResultRequest {
    return QueryTallyResultRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTallyResultRequest>, I>>(object: I): QueryTallyResultRequest {
    const message = createBaseQueryTallyResultRequest();
    message.proposalId = object.proposalId ?? 0;
    return message;
  },
};

function createBaseQueryTallyResultResponse(): QueryTallyResultResponse {
  return { tally: undefined };
}

export const QueryTallyResultResponse = {
  encode(message: QueryTallyResultResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.tally !== undefined) {
      TallyResult.encode(message.tally, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTallyResultResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTallyResultResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.tally = TallyResult.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTallyResultResponse {
    return { tally: isSet(object.tally) ? TallyResult.fromJSON(object.tally) : undefined };
  },

  toJSON(message: QueryTallyResultResponse): unknown {
    const obj: any = {};
    if (message.tally !== undefined) {
      obj.tally = TallyResult.toJSON(message.tally);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTallyResultResponse>, I>>(base?: I): QueryTallyResultResponse {
    return QueryTallyResultResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTallyResultResponse>, I>>(object: I): QueryTallyResultResponse {
    const message = createBaseQueryTallyResultResponse();
    message.tally = (object.tally !== undefined && object.tally !== null)
      ? TallyResult.fromPartial(object.tally)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupsRequest(): QueryGroupsRequest {
  return { pagination: undefined };
}

export const QueryGroupsRequest = {
  encode(message: QueryGroupsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryGroupsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupsRequest>, I>>(base?: I): QueryGroupsRequest {
    return QueryGroupsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupsRequest>, I>>(object: I): QueryGroupsRequest {
    const message = createBaseQueryGroupsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryGroupsResponse(): QueryGroupsResponse {
  return { groups: [], pagination: undefined };
}

export const QueryGroupsResponse = {
  encode(message: QueryGroupsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.groups) {
      GroupInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGroupsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGroupsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.groups.push(GroupInfo.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryGroupsResponse {
    return {
      groups: Array.isArray(object?.groups) ? object.groups.map((e: any) => GroupInfo.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryGroupsResponse): unknown {
    const obj: any = {};
    if (message.groups?.length) {
      obj.groups = message.groups.map((e) => GroupInfo.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryGroupsResponse>, I>>(base?: I): QueryGroupsResponse {
    return QueryGroupsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryGroupsResponse>, I>>(object: I): QueryGroupsResponse {
    const message = createBaseQueryGroupsResponse();
    message.groups = object.groups?.map((e) => GroupInfo.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query is the cosmos.group.v1 Query service. */
export interface Query {
  /** GroupInfo queries group info based on group id. */
  GroupInfo(request: QueryGroupInfoRequest): Promise<QueryGroupInfoResponse>;
  /** GroupPolicyInfo queries group policy info based on account address of group policy. */
  GroupPolicyInfo(request: QueryGroupPolicyInfoRequest): Promise<QueryGroupPolicyInfoResponse>;
  /** GroupMembers queries members of a group by group id. */
  GroupMembers(request: QueryGroupMembersRequest): Promise<QueryGroupMembersResponse>;
  /** GroupsByAdmin queries groups by admin address. */
  GroupsByAdmin(request: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponse>;
  /** GroupPoliciesByGroup queries group policies by group id. */
  GroupPoliciesByGroup(request: QueryGroupPoliciesByGroupRequest): Promise<QueryGroupPoliciesByGroupResponse>;
  /** GroupPoliciesByAdmin queries group policies by admin address. */
  GroupPoliciesByAdmin(request: QueryGroupPoliciesByAdminRequest): Promise<QueryGroupPoliciesByAdminResponse>;
  /** Proposal queries a proposal based on proposal id. */
  Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
  /** ProposalsByGroupPolicy queries proposals based on account address of group policy. */
  ProposalsByGroupPolicy(request: QueryProposalsByGroupPolicyRequest): Promise<QueryProposalsByGroupPolicyResponse>;
  /** VoteByProposalVoter queries a vote by proposal id and voter. */
  VoteByProposalVoter(request: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponse>;
  /** VotesByProposal queries a vote by proposal id. */
  VotesByProposal(request: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponse>;
  /** VotesByVoter queries a vote by voter. */
  VotesByVoter(request: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponse>;
  /** GroupsByMember queries groups by member address. */
  GroupsByMember(request: QueryGroupsByMemberRequest): Promise<QueryGroupsByMemberResponse>;
  /**
   * TallyResult returns the tally result of a proposal. If the proposal is
   * still in voting period, then this query computes the current tally state,
   * which might not be final. On the other hand, if the proposal is final,
   * then it simply returns the `final_tally_result` state stored in the
   * proposal itself.
   */
  TallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
  /**
   * Groups queries all groups in state.
   *
   * Since: cosmos-sdk 0.47.1
   */
  Groups(request: QueryGroupsRequest): Promise<QueryGroupsResponse>;
}

export const QueryServiceName = "cosmos.group.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.GroupInfo = this.GroupInfo.bind(this);
    this.GroupPolicyInfo = this.GroupPolicyInfo.bind(this);
    this.GroupMembers = this.GroupMembers.bind(this);
    this.GroupsByAdmin = this.GroupsByAdmin.bind(this);
    this.GroupPoliciesByGroup = this.GroupPoliciesByGroup.bind(this);
    this.GroupPoliciesByAdmin = this.GroupPoliciesByAdmin.bind(this);
    this.Proposal = this.Proposal.bind(this);
    this.ProposalsByGroupPolicy = this.ProposalsByGroupPolicy.bind(this);
    this.VoteByProposalVoter = this.VoteByProposalVoter.bind(this);
    this.VotesByProposal = this.VotesByProposal.bind(this);
    this.VotesByVoter = this.VotesByVoter.bind(this);
    this.GroupsByMember = this.GroupsByMember.bind(this);
    this.TallyResult = this.TallyResult.bind(this);
    this.Groups = this.Groups.bind(this);
  }
  GroupInfo(request: QueryGroupInfoRequest): Promise<QueryGroupInfoResponse> {
    const data = QueryGroupInfoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GroupInfo", data);
    return promise.then((data) => QueryGroupInfoResponse.decode(_m0.Reader.create(data)));
  }

  GroupPolicyInfo(request: QueryGroupPolicyInfoRequest): Promise<QueryGroupPolicyInfoResponse> {
    const data = QueryGroupPolicyInfoRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GroupPolicyInfo", data);
    return promise.then((data) => QueryGroupPolicyInfoResponse.decode(_m0.Reader.create(data)));
  }

  GroupMembers(request: QueryGroupMembersRequest): Promise<QueryGroupMembersResponse> {
    const data = QueryGroupMembersRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GroupMembers", data);
    return promise.then((data) => QueryGroupMembersResponse.decode(_m0.Reader.create(data)));
  }

  GroupsByAdmin(request: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponse> {
    const data = QueryGroupsByAdminRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GroupsByAdmin", data);
    return promise.then((data) => QueryGroupsByAdminResponse.decode(_m0.Reader.create(data)));
  }

  GroupPoliciesByGroup(request: QueryGroupPoliciesByGroupRequest): Promise<QueryGroupPoliciesByGroupResponse> {
    const data = QueryGroupPoliciesByGroupRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GroupPoliciesByGroup", data);
    return promise.then((data) => QueryGroupPoliciesByGroupResponse.decode(_m0.Reader.create(data)));
  }

  GroupPoliciesByAdmin(request: QueryGroupPoliciesByAdminRequest): Promise<QueryGroupPoliciesByAdminResponse> {
    const data = QueryGroupPoliciesByAdminRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GroupPoliciesByAdmin", data);
    return promise.then((data) => QueryGroupPoliciesByAdminResponse.decode(_m0.Reader.create(data)));
  }

  Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse> {
    const data = QueryProposalRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Proposal", data);
    return promise.then((data) => QueryProposalResponse.decode(_m0.Reader.create(data)));
  }

  ProposalsByGroupPolicy(request: QueryProposalsByGroupPolicyRequest): Promise<QueryProposalsByGroupPolicyResponse> {
    const data = QueryProposalsByGroupPolicyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ProposalsByGroupPolicy", data);
    return promise.then((data) => QueryProposalsByGroupPolicyResponse.decode(_m0.Reader.create(data)));
  }

  VoteByProposalVoter(request: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponse> {
    const data = QueryVoteByProposalVoterRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VoteByProposalVoter", data);
    return promise.then((data) => QueryVoteByProposalVoterResponse.decode(_m0.Reader.create(data)));
  }

  VotesByProposal(request: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponse> {
    const data = QueryVotesByProposalRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VotesByProposal", data);
    return promise.then((data) => QueryVotesByProposalResponse.decode(_m0.Reader.create(data)));
  }

  VotesByVoter(request: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponse> {
    const data = QueryVotesByVoterRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "VotesByVoter", data);
    return promise.then((data) => QueryVotesByVoterResponse.decode(_m0.Reader.create(data)));
  }

  GroupsByMember(request: QueryGroupsByMemberRequest): Promise<QueryGroupsByMemberResponse> {
    const data = QueryGroupsByMemberRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "GroupsByMember", data);
    return promise.then((data) => QueryGroupsByMemberResponse.decode(_m0.Reader.create(data)));
  }

  TallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse> {
    const data = QueryTallyResultRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TallyResult", data);
    return promise.then((data) => QueryTallyResultResponse.decode(_m0.Reader.create(data)));
  }

  Groups(request: QueryGroupsRequest): Promise<QueryGroupsResponse> {
    const data = QueryGroupsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Groups", data);
    return promise.then((data) => QueryGroupsResponse.decode(_m0.Reader.create(data)));
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
