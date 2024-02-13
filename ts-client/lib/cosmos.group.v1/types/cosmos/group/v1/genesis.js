/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { GroupInfo, GroupMember, GroupPolicyInfo, Proposal, Vote } from "./types";
export const protobufPackage = "cosmos.group.v1";
function createBaseGenesisState() {
    return {
        groupSeq: 0,
        groups: [],
        groupMembers: [],
        groupPolicySeq: 0,
        groupPolicies: [],
        proposalSeq: 0,
        proposals: [],
        votes: [],
    };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupSeq !== 0) {
            writer.uint32(8).uint64(message.groupSeq);
        }
        for (const v of message.groups) {
            GroupInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.groupMembers) {
            GroupMember.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.groupPolicySeq !== 0) {
            writer.uint32(32).uint64(message.groupPolicySeq);
        }
        for (const v of message.groupPolicies) {
            GroupPolicyInfo.encode(v, writer.uint32(42).fork()).ldelim();
        }
        if (message.proposalSeq !== 0) {
            writer.uint32(48).uint64(message.proposalSeq);
        }
        for (const v of message.proposals) {
            Proposal.encode(v, writer.uint32(58).fork()).ldelim();
        }
        for (const v of message.votes) {
            Vote.encode(v, writer.uint32(66).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.groupSeq = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.groups.push(GroupInfo.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.groupMembers.push(GroupMember.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.groupPolicySeq = longToNumber(reader.uint64());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.groupPolicies.push(GroupPolicyInfo.decode(reader, reader.uint32()));
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.proposalSeq = longToNumber(reader.uint64());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.proposals.push(Proposal.decode(reader, reader.uint32()));
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.votes.push(Vote.decode(reader, reader.uint32()));
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
            groupSeq: isSet(object.groupSeq) ? Number(object.groupSeq) : 0,
            groups: Array.isArray(object?.groups) ? object.groups.map((e) => GroupInfo.fromJSON(e)) : [],
            groupMembers: Array.isArray(object?.groupMembers)
                ? object.groupMembers.map((e) => GroupMember.fromJSON(e))
                : [],
            groupPolicySeq: isSet(object.groupPolicySeq) ? Number(object.groupPolicySeq) : 0,
            groupPolicies: Array.isArray(object?.groupPolicies)
                ? object.groupPolicies.map((e) => GroupPolicyInfo.fromJSON(e))
                : [],
            proposalSeq: isSet(object.proposalSeq) ? Number(object.proposalSeq) : 0,
            proposals: Array.isArray(object?.proposals) ? object.proposals.map((e) => Proposal.fromJSON(e)) : [],
            votes: Array.isArray(object?.votes) ? object.votes.map((e) => Vote.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupSeq !== 0) {
            obj.groupSeq = Math.round(message.groupSeq);
        }
        if (message.groups?.length) {
            obj.groups = message.groups.map((e) => GroupInfo.toJSON(e));
        }
        if (message.groupMembers?.length) {
            obj.groupMembers = message.groupMembers.map((e) => GroupMember.toJSON(e));
        }
        if (message.groupPolicySeq !== 0) {
            obj.groupPolicySeq = Math.round(message.groupPolicySeq);
        }
        if (message.groupPolicies?.length) {
            obj.groupPolicies = message.groupPolicies.map((e) => GroupPolicyInfo.toJSON(e));
        }
        if (message.proposalSeq !== 0) {
            obj.proposalSeq = Math.round(message.proposalSeq);
        }
        if (message.proposals?.length) {
            obj.proposals = message.proposals.map((e) => Proposal.toJSON(e));
        }
        if (message.votes?.length) {
            obj.votes = message.votes.map((e) => Vote.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return GenesisState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.groupSeq = object.groupSeq ?? 0;
        message.groups = object.groups?.map((e) => GroupInfo.fromPartial(e)) || [];
        message.groupMembers = object.groupMembers?.map((e) => GroupMember.fromPartial(e)) || [];
        message.groupPolicySeq = object.groupPolicySeq ?? 0;
        message.groupPolicies = object.groupPolicies?.map((e) => GroupPolicyInfo.fromPartial(e)) || [];
        message.proposalSeq = object.proposalSeq ?? 0;
        message.proposals = object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
        message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
        return message;
    },
};
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
