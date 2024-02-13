/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { proposalExecutorResultFromJSON, proposalExecutorResultToJSON, proposalStatusFromJSON, proposalStatusToJSON, TallyResult, } from "./types";
export const protobufPackage = "cosmos.group.v1";
function createBaseEventCreateGroup() {
    return { groupId: 0 };
}
export const EventCreateGroup = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupId !== 0) {
            writer.uint32(8).uint64(message.groupId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCreateGroup();
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
        return EventCreateGroup.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEventCreateGroup();
        message.groupId = object.groupId ?? 0;
        return message;
    },
};
function createBaseEventUpdateGroup() {
    return { groupId: 0 };
}
export const EventUpdateGroup = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupId !== 0) {
            writer.uint32(8).uint64(message.groupId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventUpdateGroup();
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
        return EventUpdateGroup.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEventUpdateGroup();
        message.groupId = object.groupId ?? 0;
        return message;
    },
};
function createBaseEventCreateGroupPolicy() {
    return { address: "" };
}
export const EventCreateGroupPolicy = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCreateGroupPolicy();
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
        return EventCreateGroupPolicy.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEventCreateGroupPolicy();
        message.address = object.address ?? "";
        return message;
    },
};
function createBaseEventUpdateGroupPolicy() {
    return { address: "" };
}
export const EventUpdateGroupPolicy = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventUpdateGroupPolicy();
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
        return EventUpdateGroupPolicy.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEventUpdateGroupPolicy();
        message.address = object.address ?? "";
        return message;
    },
};
function createBaseEventSubmitProposal() {
    return { proposalId: 0 };
}
export const EventSubmitProposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventSubmitProposal();
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
        return EventSubmitProposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEventSubmitProposal();
        message.proposalId = object.proposalId ?? 0;
        return message;
    },
};
function createBaseEventWithdrawProposal() {
    return { proposalId: 0 };
}
export const EventWithdrawProposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventWithdrawProposal();
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
        return EventWithdrawProposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEventWithdrawProposal();
        message.proposalId = object.proposalId ?? 0;
        return message;
    },
};
function createBaseEventVote() {
    return { proposalId: 0 };
}
export const EventVote = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventVote();
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
        return EventVote.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEventVote();
        message.proposalId = object.proposalId ?? 0;
        return message;
    },
};
function createBaseEventExec() {
    return { proposalId: 0, result: 0, logs: "" };
}
export const EventExec = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.result !== 0) {
            writer.uint32(16).int32(message.result);
        }
        if (message.logs !== "") {
            writer.uint32(26).string(message.logs);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventExec();
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
                    if (tag !== 16) {
                        break;
                    }
                    message.result = reader.int32();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.logs = reader.string();
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
            result: isSet(object.result) ? proposalExecutorResultFromJSON(object.result) : 0,
            logs: isSet(object.logs) ? String(object.logs) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.result !== 0) {
            obj.result = proposalExecutorResultToJSON(message.result);
        }
        if (message.logs !== "") {
            obj.logs = message.logs;
        }
        return obj;
    },
    create(base) {
        return EventExec.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEventExec();
        message.proposalId = object.proposalId ?? 0;
        message.result = object.result ?? 0;
        message.logs = object.logs ?? "";
        return message;
    },
};
function createBaseEventLeaveGroup() {
    return { groupId: 0, address: "" };
}
export const EventLeaveGroup = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.groupId !== 0) {
            writer.uint32(8).uint64(message.groupId);
        }
        if (message.address !== "") {
            writer.uint32(18).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventLeaveGroup();
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
        return {
            groupId: isSet(object.groupId) ? Number(object.groupId) : 0,
            address: isSet(object.address) ? String(object.address) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.groupId !== 0) {
            obj.groupId = Math.round(message.groupId);
        }
        if (message.address !== "") {
            obj.address = message.address;
        }
        return obj;
    },
    create(base) {
        return EventLeaveGroup.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEventLeaveGroup();
        message.groupId = object.groupId ?? 0;
        message.address = object.address ?? "";
        return message;
    },
};
function createBaseEventProposalPruned() {
    return { proposalId: 0, status: 0, tallyResult: undefined };
}
export const EventProposalPruned = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.proposalId !== 0) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.status !== 0) {
            writer.uint32(16).int32(message.status);
        }
        if (message.tallyResult !== undefined) {
            TallyResult.encode(message.tallyResult, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventProposalPruned();
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
                    if (tag !== 16) {
                        break;
                    }
                    message.status = reader.int32();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.tallyResult = TallyResult.decode(reader, reader.uint32());
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
            status: isSet(object.status) ? proposalStatusFromJSON(object.status) : 0,
            tallyResult: isSet(object.tallyResult) ? TallyResult.fromJSON(object.tallyResult) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.proposalId !== 0) {
            obj.proposalId = Math.round(message.proposalId);
        }
        if (message.status !== 0) {
            obj.status = proposalStatusToJSON(message.status);
        }
        if (message.tallyResult !== undefined) {
            obj.tallyResult = TallyResult.toJSON(message.tallyResult);
        }
        return obj;
    },
    create(base) {
        return EventProposalPruned.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseEventProposalPruned();
        message.proposalId = object.proposalId ?? 0;
        message.status = object.status ?? 0;
        message.tallyResult = (object.tallyResult !== undefined && object.tallyResult !== null)
            ? TallyResult.fromPartial(object.tallyResult)
            : undefined;
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
