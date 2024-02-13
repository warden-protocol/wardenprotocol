/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
export const protobufPackage = "cosmos.slashing.v1beta1";
function createBaseValidatorSigningInfo() {
    return {
        address: "",
        startHeight: 0,
        indexOffset: 0,
        jailedUntil: undefined,
        tombstoned: false,
        missedBlocksCounter: 0,
    };
}
export const ValidatorSigningInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.startHeight !== 0) {
            writer.uint32(16).int64(message.startHeight);
        }
        if (message.indexOffset !== 0) {
            writer.uint32(24).int64(message.indexOffset);
        }
        if (message.jailedUntil !== undefined) {
            Timestamp.encode(toTimestamp(message.jailedUntil), writer.uint32(34).fork()).ldelim();
        }
        if (message.tombstoned === true) {
            writer.uint32(40).bool(message.tombstoned);
        }
        if (message.missedBlocksCounter !== 0) {
            writer.uint32(48).int64(message.missedBlocksCounter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseValidatorSigningInfo();
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
                    message.startHeight = longToNumber(reader.int64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.indexOffset = longToNumber(reader.int64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.jailedUntil = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.tombstoned = reader.bool();
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.missedBlocksCounter = longToNumber(reader.int64());
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
            startHeight: isSet(object.startHeight) ? Number(object.startHeight) : 0,
            indexOffset: isSet(object.indexOffset) ? Number(object.indexOffset) : 0,
            jailedUntil: isSet(object.jailedUntil) ? fromJsonTimestamp(object.jailedUntil) : undefined,
            tombstoned: isSet(object.tombstoned) ? Boolean(object.tombstoned) : false,
            missedBlocksCounter: isSet(object.missedBlocksCounter) ? Number(object.missedBlocksCounter) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.startHeight !== 0) {
            obj.startHeight = Math.round(message.startHeight);
        }
        if (message.indexOffset !== 0) {
            obj.indexOffset = Math.round(message.indexOffset);
        }
        if (message.jailedUntil !== undefined) {
            obj.jailedUntil = message.jailedUntil.toISOString();
        }
        if (message.tombstoned === true) {
            obj.tombstoned = message.tombstoned;
        }
        if (message.missedBlocksCounter !== 0) {
            obj.missedBlocksCounter = Math.round(message.missedBlocksCounter);
        }
        return obj;
    },
    create(base) {
        return ValidatorSigningInfo.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseValidatorSigningInfo();
        message.address = object.address ?? "";
        message.startHeight = object.startHeight ?? 0;
        message.indexOffset = object.indexOffset ?? 0;
        message.jailedUntil = object.jailedUntil ?? undefined;
        message.tombstoned = object.tombstoned ?? false;
        message.missedBlocksCounter = object.missedBlocksCounter ?? 0;
        return message;
    },
};
function createBaseParams() {
    return {
        signedBlocksWindow: 0,
        minSignedPerWindow: new Uint8Array(0),
        downtimeJailDuration: undefined,
        slashFractionDoubleSign: new Uint8Array(0),
        slashFractionDowntime: new Uint8Array(0),
    };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.signedBlocksWindow !== 0) {
            writer.uint32(8).int64(message.signedBlocksWindow);
        }
        if (message.minSignedPerWindow.length !== 0) {
            writer.uint32(18).bytes(message.minSignedPerWindow);
        }
        if (message.downtimeJailDuration !== undefined) {
            Duration.encode(message.downtimeJailDuration, writer.uint32(26).fork()).ldelim();
        }
        if (message.slashFractionDoubleSign.length !== 0) {
            writer.uint32(34).bytes(message.slashFractionDoubleSign);
        }
        if (message.slashFractionDowntime.length !== 0) {
            writer.uint32(42).bytes(message.slashFractionDowntime);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.signedBlocksWindow = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.minSignedPerWindow = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.downtimeJailDuration = Duration.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.slashFractionDoubleSign = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.slashFractionDowntime = reader.bytes();
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
            signedBlocksWindow: isSet(object.signedBlocksWindow) ? Number(object.signedBlocksWindow) : 0,
            minSignedPerWindow: isSet(object.minSignedPerWindow)
                ? bytesFromBase64(object.minSignedPerWindow)
                : new Uint8Array(0),
            downtimeJailDuration: isSet(object.downtimeJailDuration)
                ? Duration.fromJSON(object.downtimeJailDuration)
                : undefined,
            slashFractionDoubleSign: isSet(object.slashFractionDoubleSign)
                ? bytesFromBase64(object.slashFractionDoubleSign)
                : new Uint8Array(0),
            slashFractionDowntime: isSet(object.slashFractionDowntime)
                ? bytesFromBase64(object.slashFractionDowntime)
                : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.signedBlocksWindow !== 0) {
            obj.signedBlocksWindow = Math.round(message.signedBlocksWindow);
        }
        if (message.minSignedPerWindow.length !== 0) {
            obj.minSignedPerWindow = base64FromBytes(message.minSignedPerWindow);
        }
        if (message.downtimeJailDuration !== undefined) {
            obj.downtimeJailDuration = Duration.toJSON(message.downtimeJailDuration);
        }
        if (message.slashFractionDoubleSign.length !== 0) {
            obj.slashFractionDoubleSign = base64FromBytes(message.slashFractionDoubleSign);
        }
        if (message.slashFractionDowntime.length !== 0) {
            obj.slashFractionDowntime = base64FromBytes(message.slashFractionDowntime);
        }
        return obj;
    },
    create(base) {
        return Params.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.signedBlocksWindow = object.signedBlocksWindow ?? 0;
        message.minSignedPerWindow = object.minSignedPerWindow ?? new Uint8Array(0);
        message.downtimeJailDuration = (object.downtimeJailDuration !== undefined && object.downtimeJailDuration !== null)
            ? Duration.fromPartial(object.downtimeJailDuration)
            : undefined;
        message.slashFractionDoubleSign = object.slashFractionDoubleSign ?? new Uint8Array(0);
        message.slashFractionDowntime = object.slashFractionDowntime ?? new Uint8Array(0);
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
function bytesFromBase64(b64) {
    if (tsProtoGlobalThis.Buffer) {
        return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = tsProtoGlobalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (tsProtoGlobalThis.Buffer) {
        return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return tsProtoGlobalThis.btoa(bin.join(""));
    }
}
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
