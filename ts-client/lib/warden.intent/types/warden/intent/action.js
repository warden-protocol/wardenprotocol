/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";
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
function createBaseAction() {
    return { id: 0, approvers: [], status: 0, intentId: 0, msg: undefined, creator: "", btl: 0 };
}
export const Action = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        for (const v of message.approvers) {
            writer.uint32(18).string(v);
        }
        if (message.status !== 0) {
            writer.uint32(24).int32(message.status);
        }
        if (message.intentId !== 0) {
            writer.uint32(32).uint64(message.intentId);
        }
        if (message.msg !== undefined) {
            Any.encode(message.msg, writer.uint32(42).fork()).ldelim();
        }
        if (message.creator !== "") {
            writer.uint32(50).string(message.creator);
        }
        if (message.btl !== 0) {
            writer.uint32(56).uint64(message.btl);
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
                    message.approvers.push(reader.string());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.status = reader.int32();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.intentId = longToNumber(reader.uint64());
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
                    message.creator = reader.string();
                    continue;
                case 7:
                    if (tag !== 56) {
                        break;
                    }
                    message.btl = longToNumber(reader.uint64());
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
            approvers: Array.isArray(object?.approvers) ? object.approvers.map((e) => String(e)) : [],
            status: isSet(object.status) ? actionStatusFromJSON(object.status) : 0,
            intentId: isSet(object.intentId) ? Number(object.intentId) : 0,
            msg: isSet(object.msg) ? Any.fromJSON(object.msg) : undefined,
            creator: isSet(object.creator) ? String(object.creator) : "",
            btl: isSet(object.btl) ? Number(object.btl) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.approvers?.length) {
            obj.approvers = message.approvers;
        }
        if (message.status !== 0) {
            obj.status = actionStatusToJSON(message.status);
        }
        if (message.intentId !== 0) {
            obj.intentId = Math.round(message.intentId);
        }
        if (message.msg !== undefined) {
            obj.msg = Any.toJSON(message.msg);
        }
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.btl !== 0) {
            obj.btl = Math.round(message.btl);
        }
        return obj;
    },
    create(base) {
        return Action.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseAction();
        message.id = object.id ?? 0;
        message.approvers = object.approvers?.map((e) => e) || [];
        message.status = object.status ?? 0;
        message.intentId = object.intentId ?? 0;
        message.msg = (object.msg !== undefined && object.msg !== null) ? Any.fromPartial(object.msg) : undefined;
        message.creator = object.creator ?? "";
        message.btl = object.btl ?? 0;
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
