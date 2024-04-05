/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";
import { Timestamp } from "../../google/protobuf/timestamp";
import { Intent } from "./intent";
export const protobufPackage = "warden.intent";
/** Current status of an action. */
export var ActionStatus;
(function (ActionStatus) {
    /** ACTION_STATUS_UNSPECIFIED - Unspecified status. */
    ActionStatus[ActionStatus["ACTION_STATUS_UNSPECIFIED"] = 0] = "ACTION_STATUS_UNSPECIFIED";
    /** ACTION_STATUS_PENDING - Action is pending approval. This is the initial status. */
    ActionStatus[ActionStatus["ACTION_STATUS_PENDING"] = 1] = "ACTION_STATUS_PENDING";
    /** ACTION_STATUS_COMPLETED - Intent has been satified, action has been executed. */
    ActionStatus[ActionStatus["ACTION_STATUS_COMPLETED"] = 2] = "ACTION_STATUS_COMPLETED";
    /** ACTION_STATUS_REVOKED - Action has been revoked by its creator. */
    ActionStatus[ActionStatus["ACTION_STATUS_REVOKED"] = 3] = "ACTION_STATUS_REVOKED";
    /** ACTION_STATUS_TIMEOUT - Action has been rejected since Btl is expired */
    ActionStatus[ActionStatus["ACTION_STATUS_TIMEOUT"] = 4] = "ACTION_STATUS_TIMEOUT";
    ActionStatus[ActionStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ActionStatus || (ActionStatus = {}));
export function actionStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "ACTION_STATUS_UNSPECIFIED":
            return ActionStatus.ACTION_STATUS_UNSPECIFIED;
        case 1:
        case "ACTION_STATUS_PENDING":
            return ActionStatus.ACTION_STATUS_PENDING;
        case 2:
        case "ACTION_STATUS_COMPLETED":
            return ActionStatus.ACTION_STATUS_COMPLETED;
        case 3:
        case "ACTION_STATUS_REVOKED":
            return ActionStatus.ACTION_STATUS_REVOKED;
        case 4:
        case "ACTION_STATUS_TIMEOUT":
            return ActionStatus.ACTION_STATUS_TIMEOUT;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ActionStatus.UNRECOGNIZED;
    }
}
export function actionStatusToJSON(object) {
    switch (object) {
        case ActionStatus.ACTION_STATUS_UNSPECIFIED:
            return "ACTION_STATUS_UNSPECIFIED";
        case ActionStatus.ACTION_STATUS_PENDING:
            return "ACTION_STATUS_PENDING";
        case ActionStatus.ACTION_STATUS_COMPLETED:
            return "ACTION_STATUS_COMPLETED";
        case ActionStatus.ACTION_STATUS_REVOKED:
            return "ACTION_STATUS_REVOKED";
        case ActionStatus.ACTION_STATUS_TIMEOUT:
            return "ACTION_STATUS_TIMEOUT";
        case ActionStatus.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseApprover() {
    return { address: "", approvedAt: undefined };
}
export const Approver = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.approvedAt !== undefined) {
            Timestamp.encode(toTimestamp(message.approvedAt), writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseApprover();
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
                    message.approvedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
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
            approvedAt: isSet(object.approvedAt) ? fromJsonTimestamp(object.approvedAt) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.approvedAt !== undefined) {
            obj.approvedAt = message.approvedAt.toISOString();
        }
        return obj;
    },
    create(base) {
        return Approver.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseApprover();
        message.address = object.address ?? "";
        message.approvedAt = object.approvedAt ?? undefined;
        return message;
    },
};
function createBaseAction() {
    return {
        id: 0,
        approvers: [],
        status: 0,
        msg: undefined,
        result: undefined,
        creator: "",
        btl: 0,
        createdAt: undefined,
        updatedAt: undefined,
        intent: undefined,
    };
}
export const Action = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        for (const v of message.approvers) {
            Approver.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.status !== 0) {
            writer.uint32(24).int32(message.status);
        }
        if (message.msg !== undefined) {
            Any.encode(message.msg, writer.uint32(42).fork()).ldelim();
        }
        if (message.result !== undefined) {
            Any.encode(message.result, writer.uint32(50).fork()).ldelim();
        }
        if (message.creator !== "") {
            writer.uint32(58).string(message.creator);
        }
        if (message.btl !== 0) {
            writer.uint32(64).uint64(message.btl);
        }
        if (message.createdAt !== undefined) {
            Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
        }
        if (message.updatedAt !== undefined) {
            Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(82).fork()).ldelim();
        }
        if (message.intent !== undefined) {
            Intent.encode(message.intent, writer.uint32(90).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseAction();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.approvers.push(Approver.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.status = reader.int32();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.msg = Any.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.result = Any.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.btl = longToNumber(reader.uint64());
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.intent = Intent.decode(reader, reader.uint32());
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
            id: isSet(object.id) ? Number(object.id) : 0,
            approvers: Array.isArray(object?.approvers) ? object.approvers.map((e) => Approver.fromJSON(e)) : [],
            status: isSet(object.status) ? actionStatusFromJSON(object.status) : 0,
            msg: isSet(object.msg) ? Any.fromJSON(object.msg) : undefined,
            result: isSet(object.result) ? Any.fromJSON(object.result) : undefined,
            creator: isSet(object.creator) ? String(object.creator) : "",
            btl: isSet(object.btl) ? Number(object.btl) : 0,
            createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
            updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
            intent: isSet(object.intent) ? Intent.fromJSON(object.intent) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.approvers?.length) {
            obj.approvers = message.approvers.map((e) => Approver.toJSON(e));
        }
        if (message.status !== 0) {
            obj.status = actionStatusToJSON(message.status);
        }
        if (message.msg !== undefined) {
            obj.msg = Any.toJSON(message.msg);
        }
        if (message.result !== undefined) {
            obj.result = Any.toJSON(message.result);
        }
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.btl !== 0) {
            obj.btl = Math.round(message.btl);
        }
        if (message.createdAt !== undefined) {
            obj.createdAt = message.createdAt.toISOString();
        }
        if (message.updatedAt !== undefined) {
            obj.updatedAt = message.updatedAt.toISOString();
        }
        if (message.intent !== undefined) {
            obj.intent = Intent.toJSON(message.intent);
        }
        return obj;
    },
    create(base) {
        return Action.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAction();
        message.id = object.id ?? 0;
        message.approvers = object.approvers?.map((e) => Approver.fromPartial(e)) || [];
        message.status = object.status ?? 0;
        message.msg = (object.msg !== undefined && object.msg !== null) ? Any.fromPartial(object.msg) : undefined;
        message.result = (object.result !== undefined && object.result !== null)
            ? Any.fromPartial(object.result)
            : undefined;
        message.creator = object.creator ?? "";
        message.btl = object.btl ?? 0;
        message.createdAt = object.createdAt ?? undefined;
        message.updatedAt = object.updatedAt ?? undefined;
        message.intent = (object.intent !== undefined && object.intent !== null)
            ? Intent.fromPartial(object.intent)
            : undefined;
        return message;
    },
};
function createBaseMsgActionCreated() {
    return { action: undefined };
}
export const MsgActionCreated = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.action !== undefined) {
            Action.encode(message.action, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgActionCreated();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.action = Action.decode(reader, reader.uint32());
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
        return { action: isSet(object.action) ? Action.fromJSON(object.action) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.action !== undefined) {
            obj.action = Action.toJSON(message.action);
        }
        return obj;
    },
    create(base) {
        return MsgActionCreated.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgActionCreated();
        message.action = (object.action !== undefined && object.action !== null)
            ? Action.fromPartial(object.action)
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
function toTimestamp(date) {
    const seconds = date.getTime() / 1000;
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = (t.seconds || 0) * 1000;
    millis += (t.nanos || 0) / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(Timestamp.fromJSON(o));
    }
}
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
