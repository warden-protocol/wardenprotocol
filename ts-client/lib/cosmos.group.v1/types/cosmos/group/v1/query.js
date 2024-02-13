/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { GroupInfo, GroupMember, GroupPolicyInfo, Proposal, TallyResult, Vote } from "./types";
export const protobufPackage = "cosmos.group.v1";
function createBaseQueryGroupInfoRequest() {
    return { groupId: 0 };
}
export const QueryGroupInfoRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupId !== 0) {
            writer.uint32(8).uint64(message.groupId);
        }
        return writer;
    },
    decode(input, length) {
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
                    message.groupId = longToNumber(reader.uint64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { groupId: isSet(object.groupId) ? Number(object.groupId) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupId !== 0) {
            obj.groupId = Math.round(message.groupId);
        }
        return obj;
    },
    create(base) {
        return QueryGroupInfoRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupInfoRequest();
        message.groupId = object.groupId ?? 0;
        return message;
    },
};
function createBaseQueryGroupInfoResponse() {
    return { info: undefined };
}
export const QueryGroupInfoResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.info !== undefined) {
            GroupInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return { info: isSet(object.info) ? GroupInfo.fromJSON(object.info) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.info !== undefined) {
            obj.info = GroupInfo.toJSON(message.info);
        }
        return obj;
    },
    create(base) {
        return QueryGroupInfoResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupInfoResponse();
        message.info = (object.info !== undefined && object.info !== null) ? GroupInfo.fromPartial(object.info) : undefined;
        return message;
    },
};
function createBaseQueryGroupPolicyInfoRequest() {
    return { address: "" };
}
export const QueryGroupPolicyInfoRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return { address: isSet(object.address) ? String(object.address) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        return obj;
    },
    create(base) {
        return QueryGroupPolicyInfoRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupPolicyInfoRequest();
        message.address = object.address ?? "";
        return message;
    },
};
function createBaseQueryGroupPolicyInfoResponse() {
    return { info: undefined };
}
export const QueryGroupPolicyInfoResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.info !== undefined) {
            GroupPolicyInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return { info: isSet(object.info) ? GroupPolicyInfo.fromJSON(object.info) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.info !== undefined) {
            obj.info = GroupPolicyInfo.toJSON(message.info);
        }
        return obj;
    },
    create(base) {
        return QueryGroupPolicyInfoResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupPolicyInfoResponse();
        message.info = (object.info !== undefined && object.info !== null)
            ? GroupPolicyInfo.fromPartial(object.info)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupMembersRequest() {
    return { groupId: 0, pagination: undefined };
}
export const QueryGroupMembersRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupId !== 0) {
            writer.uint32(8).uint64(message.groupId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
                    message.groupId = longToNumber(reader.uint64());
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
    fromJSON(object) {
        return {
            groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupId !== 0) {
            obj.groupId = Math.round(message.groupId);
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupMembersRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupMembersRequest();
        message.groupId = object.groupId ?? 0;
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupMembersResponse() {
    return { members: [], pagination: undefined };
}
export const QueryGroupMembersResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.members) {
            GroupMember.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            members: Array.isArray(object?.members) ? object.members.map((e) => GroupMember.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.members?.length) {
            obj.members = message.members.map((e) => GroupMember.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupMembersResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupMembersResponse();
        message.members = object.members?.map((e) => GroupMember.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupsByAdminRequest() {
    return { admin: "", pagination: undefined };
}
export const QueryGroupsByAdminRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.admin !== "") {
            writer.uint32(10).string(message.admin);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            admin: isSet(object.admin) ? String(object.admin) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.admin !== "") {
            obj.admin = message.admin;
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupsByAdminRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupsByAdminRequest();
        message.admin = object.admin ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupsByAdminResponse() {
    return { groups: [], pagination: undefined };
}
export const QueryGroupsByAdminResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.groups) {
            GroupInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            groups: Array.isArray(object?.groups) ? object.groups.map((e) => GroupInfo.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groups?.length) {
            obj.groups = message.groups.map((e) => GroupInfo.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupsByAdminResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupsByAdminResponse();
        message.groups = object.groups?.map((e) => GroupInfo.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupPoliciesByGroupRequest() {
    return { groupId: 0, pagination: undefined };
}
export const QueryGroupPoliciesByGroupRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupId !== 0) {
            writer.uint32(8).uint64(message.groupId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
                    message.groupId = longToNumber(reader.uint64());
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
    fromJSON(object) {
        return {
            groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupId !== 0) {
            obj.groupId = Math.round(message.groupId);
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupPoliciesByGroupRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupPoliciesByGroupRequest();
        message.groupId = object.groupId ?? 0;
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupPoliciesByGroupResponse() {
    return { groupPolicies: [], pagination: undefined };
}
export const QueryGroupPoliciesByGroupResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.groupPolicies) {
            GroupPolicyInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            groupPolicies: Array.isArray(object?.groupPolicies)
                ? object.groupPolicies.map((e) => GroupPolicyInfo.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupPolicies?.length) {
            obj.groupPolicies = message.groupPolicies.map((e) => GroupPolicyInfo.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupPoliciesByGroupResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupPoliciesByGroupResponse();
        message.groupPolicies = object.groupPolicies?.map((e) => GroupPolicyInfo.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupPoliciesByAdminRequest() {
    return { admin: "", pagination: undefined };
}
export const QueryGroupPoliciesByAdminRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.admin !== "") {
            writer.uint32(10).string(message.admin);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            admin: isSet(object.admin) ? String(object.admin) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.admin !== "") {
            obj.admin = message.admin;
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupPoliciesByAdminRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupPoliciesByAdminRequest();
        message.admin = object.admin ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupPoliciesByAdminResponse() {
    return { groupPolicies: [], pagination: undefined };
}
export const QueryGroupPoliciesByAdminResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.groupPolicies) {
            GroupPolicyInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            groupPolicies: Array.isArray(object?.groupPolicies)
                ? object.groupPolicies.map((e) => GroupPolicyInfo.fromJSON(e))
                : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupPolicies?.length) {
            obj.groupPolicies = message.groupPolicies.map((e) => GroupPolicyInfo.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupPoliciesByAdminResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupPoliciesByAdminResponse();
        message.groupPolicies = object.groupPolicies?.map((e) => GroupPolicyInfo.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryProposalRequest() {
    return { proposalId: 0 };
}
export const QueryProposalRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
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
                    message.proposalId = longToNumber(reader.uint64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        return obj;
    },
    create(base) {
        return QueryProposalRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryProposalRequest();
        message.proposalId = object.proposalId ?? 0;
        return message;
    },
};
function createBaseQueryProposalResponse() {
    return { proposal: undefined };
}
export const QueryProposalResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposal !== undefined) {
            Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return { proposal: isSet(object.proposal) ? Proposal.fromJSON(object.proposal) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposal !== undefined) {
            obj.proposal = Proposal.toJSON(message.proposal);
        }
        return obj;
    },
    create(base) {
        return QueryProposalResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryProposalResponse();
        message.proposal = (object.proposal !== undefined && object.proposal !== null)
            ? Proposal.fromPartial(object.proposal)
            : undefined;
        return message;
    },
};
function createBaseQueryProposalsByGroupPolicyRequest() {
    return { address: "", pagination: undefined };
}
export const QueryProposalsByGroupPolicyRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            address: isSet(object.address) ? String(object.address) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryProposalsByGroupPolicyRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryProposalsByGroupPolicyRequest();
        message.address = object.address ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryProposalsByGroupPolicyResponse() {
    return { proposals: [], pagination: undefined };
}
export const QueryProposalsByGroupPolicyResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.proposals) {
            Proposal.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            proposals: Array.isArray(object?.proposals) ? object.proposals.map((e) => Proposal.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposals?.length) {
            obj.proposals = message.proposals.map((e) => Proposal.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryProposalsByGroupPolicyResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryProposalsByGroupPolicyResponse();
        message.proposals = object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryVoteByProposalVoterRequest() {
    return { proposalId: 0, voter: "" };
}
export const QueryVoteByProposalVoterRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        return writer;
    },
    decode(input, length) {
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
                    message.proposalId = longToNumber(reader.uint64());
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
    fromJSON(object) {
        return {
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            voter: isSet(object.voter) ? String(object.voter) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.voter !== "") {
            obj.voter = message.voter;
        }
        return obj;
    },
    create(base) {
        return QueryVoteByProposalVoterRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryVoteByProposalVoterRequest();
        message.proposalId = object.proposalId ?? 0;
        message.voter = object.voter ?? "";
        return message;
    },
};
function createBaseQueryVoteByProposalVoterResponse() {
    return { vote: undefined };
}
export const QueryVoteByProposalVoterResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.vote !== undefined) {
            Vote.encode(message.vote, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return { vote: isSet(object.vote) ? Vote.fromJSON(object.vote) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.vote !== undefined) {
            obj.vote = Vote.toJSON(message.vote);
        }
        return obj;
    },
    create(base) {
        return QueryVoteByProposalVoterResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryVoteByProposalVoterResponse();
        message.vote = (object.vote !== undefined && object.vote !== null) ? Vote.fromPartial(object.vote) : undefined;
        return message;
    },
};
function createBaseQueryVotesByProposalRequest() {
    return { proposalId: 0, pagination: undefined };
}
export const QueryVotesByProposalRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
                    message.proposalId = longToNumber(reader.uint64());
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
    fromJSON(object) {
        return {
            proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0,
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryVotesByProposalRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryVotesByProposalRequest();
        message.proposalId = object.proposalId ?? 0;
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryVotesByProposalResponse() {
    return { votes: [], pagination: undefined };
}
export const QueryVotesByProposalResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.votes) {
            Vote.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            votes: Array.isArray(object?.votes) ? object.votes.map((e) => Vote.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.votes?.length) {
            obj.votes = message.votes.map((e) => Vote.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryVotesByProposalResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryVotesByProposalResponse();
        message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryVotesByVoterRequest() {
    return { voter: "", pagination: undefined };
}
export const QueryVotesByVoterRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.voter !== "") {
            writer.uint32(10).string(message.voter);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            voter: isSet(object.voter) ? String(object.voter) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.voter !== "") {
            obj.voter = message.voter;
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryVotesByVoterRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryVotesByVoterRequest();
        message.voter = object.voter ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryVotesByVoterResponse() {
    return { votes: [], pagination: undefined };
}
export const QueryVotesByVoterResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.votes) {
            Vote.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            votes: Array.isArray(object?.votes) ? object.votes.map((e) => Vote.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.votes?.length) {
            obj.votes = message.votes.map((e) => Vote.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryVotesByVoterResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryVotesByVoterResponse();
        message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupsByMemberRequest() {
    return { address: "", pagination: undefined };
}
export const QueryGroupsByMemberRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            address: isSet(object.address) ? String(object.address) : "",
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupsByMemberRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupsByMemberRequest();
        message.address = object.address ?? "";
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupsByMemberResponse() {
    return { groups: [], pagination: undefined };
}
export const QueryGroupsByMemberResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.groups) {
            GroupInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            groups: Array.isArray(object?.groups) ? object.groups.map((e) => GroupInfo.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groups?.length) {
            obj.groups = message.groups.map((e) => GroupInfo.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupsByMemberResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupsByMemberResponse();
        message.groups = object.groups?.map((e) => GroupInfo.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryTallyResultRequest() {
    return { proposalId: 0 };
}
export const QueryTallyResultRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
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
                    message.proposalId = longToNumber(reader.uint64());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { proposalId: isSet(object.proposalId) ? Number(object.proposalId) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        return obj;
    },
    create(base) {
        return QueryTallyResultRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTallyResultRequest();
        message.proposalId = object.proposalId ?? 0;
        return message;
    },
};
function createBaseQueryTallyResultResponse() {
    return { tally: undefined };
}
export const QueryTallyResultResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.tally !== undefined) {
            TallyResult.encode(message.tally, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return { tally: isSet(object.tally) ? TallyResult.fromJSON(object.tally) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.tally !== undefined) {
            obj.tally = TallyResult.toJSON(message.tally);
        }
        return obj;
    },
    create(base) {
        return QueryTallyResultResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryTallyResultResponse();
        message.tally = (object.tally !== undefined && object.tally !== null)
            ? TallyResult.fromPartial(object.tally)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupsRequest() {
    return { pagination: undefined };
}
export const QueryGroupsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupsRequest();
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryGroupsResponse() {
    return { groups: [], pagination: undefined };
}
export const QueryGroupsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.groups) {
            GroupInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
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
    fromJSON(object) {
        return {
            groups: Array.isArray(object?.groups) ? object.groups.map((e) => GroupInfo.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groups?.length) {
            obj.groups = message.groups.map((e) => GroupInfo.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryGroupsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryGroupsResponse();
        message.groups = object.groups?.map((e) => GroupInfo.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
export const QueryServiceName = "cosmos.group.v1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
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
    GroupInfo(request) {
        const data = QueryGroupInfoRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "GroupInfo", data);
        return promise.then((data) => QueryGroupInfoResponse.decode(_m0.Reader.create(data)));
    }
    GroupPolicyInfo(request) {
        const data = QueryGroupPolicyInfoRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "GroupPolicyInfo", data);
        return promise.then((data) => QueryGroupPolicyInfoResponse.decode(_m0.Reader.create(data)));
    }
    GroupMembers(request) {
        const data = QueryGroupMembersRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "GroupMembers", data);
        return promise.then((data) => QueryGroupMembersResponse.decode(_m0.Reader.create(data)));
    }
    GroupsByAdmin(request) {
        const data = QueryGroupsByAdminRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "GroupsByAdmin", data);
        return promise.then((data) => QueryGroupsByAdminResponse.decode(_m0.Reader.create(data)));
    }
    GroupPoliciesByGroup(request) {
        const data = QueryGroupPoliciesByGroupRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "GroupPoliciesByGroup", data);
        return promise.then((data) => QueryGroupPoliciesByGroupResponse.decode(_m0.Reader.create(data)));
    }
    GroupPoliciesByAdmin(request) {
        const data = QueryGroupPoliciesByAdminRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "GroupPoliciesByAdmin", data);
        return promise.then((data) => QueryGroupPoliciesByAdminResponse.decode(_m0.Reader.create(data)));
    }
    Proposal(request) {
        const data = QueryProposalRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Proposal", data);
        return promise.then((data) => QueryProposalResponse.decode(_m0.Reader.create(data)));
    }
    ProposalsByGroupPolicy(request) {
        const data = QueryProposalsByGroupPolicyRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ProposalsByGroupPolicy", data);
        return promise.then((data) => QueryProposalsByGroupPolicyResponse.decode(_m0.Reader.create(data)));
    }
    VoteByProposalVoter(request) {
        const data = QueryVoteByProposalVoterRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "VoteByProposalVoter", data);
        return promise.then((data) => QueryVoteByProposalVoterResponse.decode(_m0.Reader.create(data)));
    }
    VotesByProposal(request) {
        const data = QueryVotesByProposalRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "VotesByProposal", data);
        return promise.then((data) => QueryVotesByProposalResponse.decode(_m0.Reader.create(data)));
    }
    VotesByVoter(request) {
        const data = QueryVotesByVoterRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "VotesByVoter", data);
        return promise.then((data) => QueryVotesByVoterResponse.decode(_m0.Reader.create(data)));
    }
    GroupsByMember(request) {
        const data = QueryGroupsByMemberRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "GroupsByMember", data);
        return promise.then((data) => QueryGroupsByMemberResponse.decode(_m0.Reader.create(data)));
    }
    TallyResult(request) {
        const data = QueryTallyResultRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "TallyResult", data);
        return promise.then((data) => QueryTallyResultResponse.decode(_m0.Reader.create(data)));
    }
    Groups(request) {
        const data = QueryGroupsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Groups", data);
        return promise.then((data) => QueryGroupsResponse.decode(_m0.Reader.create(data)));
    }
}
const tsProtoGlobalThis = (() => {
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
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
