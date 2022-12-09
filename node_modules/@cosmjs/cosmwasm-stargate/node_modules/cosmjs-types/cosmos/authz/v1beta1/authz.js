"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grant = exports.GenericAuthorization = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../google/protobuf/any");
const timestamp_1 = require("../../../google/protobuf/timestamp");
exports.protobufPackage = "cosmos.authz.v1beta1";
const baseGenericAuthorization = { msg: "" };
exports.GenericAuthorization = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.msg !== "") {
            writer.uint32(10).string(message.msg);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseGenericAuthorization);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.msg = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseGenericAuthorization);
        message.msg = object.msg !== undefined && object.msg !== null ? String(object.msg) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.msg !== undefined && (obj.msg = message.msg);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseGenericAuthorization);
        message.msg = (_a = object.msg) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseGrant = {};
exports.Grant = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.authorization !== undefined) {
            any_1.Any.encode(message.authorization, writer.uint32(10).fork()).ldelim();
        }
        if (message.expiration !== undefined) {
            timestamp_1.Timestamp.encode(message.expiration, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseGrant);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.authorization = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.expiration = timestamp_1.Timestamp.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseGrant);
        message.authorization =
            object.authorization !== undefined && object.authorization !== null
                ? any_1.Any.fromJSON(object.authorization)
                : undefined;
        message.expiration =
            object.expiration !== undefined && object.expiration !== null
                ? fromJsonTimestamp(object.expiration)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.authorization !== undefined &&
            (obj.authorization = message.authorization ? any_1.Any.toJSON(message.authorization) : undefined);
        message.expiration !== undefined && (obj.expiration = fromTimestamp(message.expiration).toISOString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseGrant);
        message.authorization =
            object.authorization !== undefined && object.authorization !== null
                ? any_1.Any.fromPartial(object.authorization)
                : undefined;
        message.expiration =
            object.expiration !== undefined && object.expiration !== null
                ? timestamp_1.Timestamp.fromPartial(object.expiration)
                : undefined;
        return message;
    },
};
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
//# sourceMappingURL=authz.js.map