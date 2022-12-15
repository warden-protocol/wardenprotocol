"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.ValidatorSigningInfo = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const timestamp_1 = require("../../../google/protobuf/timestamp");
const duration_1 = require("../../../google/protobuf/duration");
exports.protobufPackage = "cosmos.slashing.v1beta1";
const baseValidatorSigningInfo = {
    address: "",
    startHeight: long_1.default.ZERO,
    indexOffset: long_1.default.ZERO,
    tombstoned: false,
    missedBlocksCounter: long_1.default.ZERO,
};
exports.ValidatorSigningInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (!message.startHeight.isZero()) {
            writer.uint32(16).int64(message.startHeight);
        }
        if (!message.indexOffset.isZero()) {
            writer.uint32(24).int64(message.indexOffset);
        }
        if (message.jailedUntil !== undefined) {
            timestamp_1.Timestamp.encode(message.jailedUntil, writer.uint32(34).fork()).ldelim();
        }
        if (message.tombstoned === true) {
            writer.uint32(40).bool(message.tombstoned);
        }
        if (!message.missedBlocksCounter.isZero()) {
            writer.uint32(48).int64(message.missedBlocksCounter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidatorSigningInfo);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.startHeight = reader.int64();
                    break;
                case 3:
                    message.indexOffset = reader.int64();
                    break;
                case 4:
                    message.jailedUntil = timestamp_1.Timestamp.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.tombstoned = reader.bool();
                    break;
                case 6:
                    message.missedBlocksCounter = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseValidatorSigningInfo);
        message.address = object.address !== undefined && object.address !== null ? String(object.address) : "";
        message.startHeight =
            object.startHeight !== undefined && object.startHeight !== null
                ? long_1.default.fromString(object.startHeight)
                : long_1.default.ZERO;
        message.indexOffset =
            object.indexOffset !== undefined && object.indexOffset !== null
                ? long_1.default.fromString(object.indexOffset)
                : long_1.default.ZERO;
        message.jailedUntil =
            object.jailedUntil !== undefined && object.jailedUntil !== null
                ? fromJsonTimestamp(object.jailedUntil)
                : undefined;
        message.tombstoned =
            object.tombstoned !== undefined && object.tombstoned !== null ? Boolean(object.tombstoned) : false;
        message.missedBlocksCounter =
            object.missedBlocksCounter !== undefined && object.missedBlocksCounter !== null
                ? long_1.default.fromString(object.missedBlocksCounter)
                : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.startHeight !== undefined && (obj.startHeight = (message.startHeight || long_1.default.ZERO).toString());
        message.indexOffset !== undefined && (obj.indexOffset = (message.indexOffset || long_1.default.ZERO).toString());
        message.jailedUntil !== undefined && (obj.jailedUntil = fromTimestamp(message.jailedUntil).toISOString());
        message.tombstoned !== undefined && (obj.tombstoned = message.tombstoned);
        message.missedBlocksCounter !== undefined &&
            (obj.missedBlocksCounter = (message.missedBlocksCounter || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseValidatorSigningInfo);
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        message.startHeight =
            object.startHeight !== undefined && object.startHeight !== null
                ? long_1.default.fromValue(object.startHeight)
                : long_1.default.ZERO;
        message.indexOffset =
            object.indexOffset !== undefined && object.indexOffset !== null
                ? long_1.default.fromValue(object.indexOffset)
                : long_1.default.ZERO;
        message.jailedUntil =
            object.jailedUntil !== undefined && object.jailedUntil !== null
                ? timestamp_1.Timestamp.fromPartial(object.jailedUntil)
                : undefined;
        message.tombstoned = (_b = object.tombstoned) !== null && _b !== void 0 ? _b : false;
        message.missedBlocksCounter =
            object.missedBlocksCounter !== undefined && object.missedBlocksCounter !== null
                ? long_1.default.fromValue(object.missedBlocksCounter)
                : long_1.default.ZERO;
        return message;
    },
};
const baseParams = { signedBlocksWindow: long_1.default.ZERO };
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.signedBlocksWindow.isZero()) {
            writer.uint32(8).int64(message.signedBlocksWindow);
        }
        if (message.minSignedPerWindow.length !== 0) {
            writer.uint32(18).bytes(message.minSignedPerWindow);
        }
        if (message.downtimeJailDuration !== undefined) {
            duration_1.Duration.encode(message.downtimeJailDuration, writer.uint32(26).fork()).ldelim();
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
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseParams);
        message.minSignedPerWindow = new Uint8Array();
        message.slashFractionDoubleSign = new Uint8Array();
        message.slashFractionDowntime = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signedBlocksWindow = reader.int64();
                    break;
                case 2:
                    message.minSignedPerWindow = reader.bytes();
                    break;
                case 3:
                    message.downtimeJailDuration = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.slashFractionDoubleSign = reader.bytes();
                    break;
                case 5:
                    message.slashFractionDowntime = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseParams);
        message.signedBlocksWindow =
            object.signedBlocksWindow !== undefined && object.signedBlocksWindow !== null
                ? long_1.default.fromString(object.signedBlocksWindow)
                : long_1.default.ZERO;
        message.minSignedPerWindow =
            object.minSignedPerWindow !== undefined && object.minSignedPerWindow !== null
                ? bytesFromBase64(object.minSignedPerWindow)
                : new Uint8Array();
        message.downtimeJailDuration =
            object.downtimeJailDuration !== undefined && object.downtimeJailDuration !== null
                ? duration_1.Duration.fromJSON(object.downtimeJailDuration)
                : undefined;
        message.slashFractionDoubleSign =
            object.slashFractionDoubleSign !== undefined && object.slashFractionDoubleSign !== null
                ? bytesFromBase64(object.slashFractionDoubleSign)
                : new Uint8Array();
        message.slashFractionDowntime =
            object.slashFractionDowntime !== undefined && object.slashFractionDowntime !== null
                ? bytesFromBase64(object.slashFractionDowntime)
                : new Uint8Array();
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.signedBlocksWindow !== undefined &&
            (obj.signedBlocksWindow = (message.signedBlocksWindow || long_1.default.ZERO).toString());
        message.minSignedPerWindow !== undefined &&
            (obj.minSignedPerWindow = base64FromBytes(message.minSignedPerWindow !== undefined ? message.minSignedPerWindow : new Uint8Array()));
        message.downtimeJailDuration !== undefined &&
            (obj.downtimeJailDuration = message.downtimeJailDuration
                ? duration_1.Duration.toJSON(message.downtimeJailDuration)
                : undefined);
        message.slashFractionDoubleSign !== undefined &&
            (obj.slashFractionDoubleSign = base64FromBytes(message.slashFractionDoubleSign !== undefined ? message.slashFractionDoubleSign : new Uint8Array()));
        message.slashFractionDowntime !== undefined &&
            (obj.slashFractionDowntime = base64FromBytes(message.slashFractionDowntime !== undefined ? message.slashFractionDowntime : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseParams);
        message.signedBlocksWindow =
            object.signedBlocksWindow !== undefined && object.signedBlocksWindow !== null
                ? long_1.default.fromValue(object.signedBlocksWindow)
                : long_1.default.ZERO;
        message.minSignedPerWindow = (_a = object.minSignedPerWindow) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.downtimeJailDuration =
            object.downtimeJailDuration !== undefined && object.downtimeJailDuration !== null
                ? duration_1.Duration.fromPartial(object.downtimeJailDuration)
                : undefined;
        message.slashFractionDoubleSign = (_b = object.slashFractionDoubleSign) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.slashFractionDowntime = (_c = object.slashFractionDowntime) !== null && _c !== void 0 ? _c : new Uint8Array();
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (const byte of arr) {
        bin.push(String.fromCharCode(byte));
    }
    return btoa(bin.join(""));
}
function toTimestamp(date) {
    const seconds = numberToLong(date.getTime() / 1000);
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds.toNumber() * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return toTimestamp(o);
    }
    else if (typeof o === "string") {
        return toTimestamp(new Date(o));
    }
    else {
        return timestamp_1.Timestamp.fromJSON(o);
    }
}
function numberToLong(number) {
    return long_1.default.fromNumber(number);
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=slashing.js.map