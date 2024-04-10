/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Expression } from "../../shield/ast/ast";
export const protobufPackage = "warden.intent";
function createBaseIntent() {
    return { id: 0, creator: "", name: "", expression: undefined };
}
export const Intent = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.creator !== "") {
            writer.uint32(18).string(message.creator);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.expression !== undefined) {
            Expression.encode(message.expression, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIntent();
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
                    message.creator = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.expression = Expression.decode(reader, reader.uint32());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            name: isSet(object.name) ? String(object.name) : "",
            expression: isSet(object.expression) ? Expression.fromJSON(object.expression) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.name !== "") {
            obj.name = message.name;
        }
        if (message.expression !== undefined) {
            obj.expression = Expression.toJSON(message.expression);
        }
        return obj;
    },
    create(base) {
        return Intent.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIntent();
        message.id = object.id ?? 0;
        message.creator = object.creator ?? "";
        message.name = object.name ?? "";
        message.expression = (object.expression !== undefined && object.expression !== null)
            ? Expression.fromPartial(object.expression)
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
