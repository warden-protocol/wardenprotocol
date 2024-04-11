/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { orderFromJSON, orderToJSON, Timeout } from "./channel";
export const protobufPackage = "ibc.core.channel.v1";
function createBaseUpgrade() {
    return { fields: undefined, timeout: undefined, nextSequenceSend: 0 };
}
export const Upgrade = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.fields !== undefined) {
            UpgradeFields.encode(message.fields, writer.uint32(10).fork()).ldelim();
        }
        if (message.timeout !== undefined) {
            Timeout.encode(message.timeout, writer.uint32(18).fork()).ldelim();
        }
        if (message.nextSequenceSend !== 0) {
            writer.uint32(24).uint64(message.nextSequenceSend);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpgrade();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.fields = UpgradeFields.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.timeout = Timeout.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.nextSequenceSend = longToNumber(reader.uint64());
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
            fields: isSet(object.fields) ? UpgradeFields.fromJSON(object.fields) : undefined,
            timeout: isSet(object.timeout) ? Timeout.fromJSON(object.timeout) : undefined,
            nextSequenceSend: isSet(object.nextSequenceSend) ? Number(object.nextSequenceSend) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.fields !== undefined) {
            obj.fields = UpgradeFields.toJSON(message.fields);
        }
        if (message.timeout !== undefined) {
            obj.timeout = Timeout.toJSON(message.timeout);
        }
        if (message.nextSequenceSend !== 0) {
            obj.nextSequenceSend = Math.round(message.nextSequenceSend);
        }
        return obj;
    },
    create(base) {
        return Upgrade.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseUpgrade();
        message.fields = (object.fields !== undefined && object.fields !== null)
            ? UpgradeFields.fromPartial(object.fields)
            : undefined;
        message.timeout = (object.timeout !== undefined && object.timeout !== null)
            ? Timeout.fromPartial(object.timeout)
            : undefined;
        message.nextSequenceSend = object.nextSequenceSend ?? 0;
        return message;
    },
};
function createBaseUpgradeFields() {
    return { ordering: 0, connectionHops: [], version: "" };
}
export const UpgradeFields = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.ordering !== 0) {
            writer.uint32(8).int32(message.ordering);
        }
        for (const v of message.connectionHops) {
            writer.uint32(18).string(v);
        }
        if (message.version !== "") {
            writer.uint32(26).string(message.version);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUpgradeFields();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.ordering = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.connectionHops.push(reader.string());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.version = reader.string();
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
            ordering: isSet(object.ordering) ? orderFromJSON(object.ordering) : 0,
            connectionHops: Array.isArray(object?.connectionHops) ? object.connectionHops.map((e) => String(e)) : [],
            version: isSet(object.version) ? String(object.version) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.ordering !== 0) {
            obj.ordering = orderToJSON(message.ordering);
        }
        if (message.connectionHops?.length) {
            obj.connectionHops = message.connectionHops;
        }
        if (message.version !== "") {
            obj.version = message.version;
        }
        return obj;
    },
    create(base) {
        return UpgradeFields.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseUpgradeFields();
        message.ordering = object.ordering ?? 0;
        message.connectionHops = object.connectionHops?.map((e) => e) || [];
        message.version = object.version ?? "";
        return message;
    },
};
function createBaseErrorReceipt() {
    return { sequence: 0, message: "" };
}
export const ErrorReceipt = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sequence !== 0) {
            writer.uint32(8).uint64(message.sequence);
        }
        if (message.message !== "") {
            writer.uint32(18).string(message.message);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseErrorReceipt();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.sequence = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.message = reader.string();
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
            sequence: isSet(object.sequence) ? Number(object.sequence) : 0,
            message: isSet(object.message) ? String(object.message) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sequence !== 0) {
            obj.sequence = Math.round(message.sequence);
        }
        if (message.message !== "") {
            obj.message = message.message;
        }
        return obj;
    },
    create(base) {
        return ErrorReceipt.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseErrorReceipt();
        message.sequence = object.sequence ?? 0;
        message.message = object.message ?? "";
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
