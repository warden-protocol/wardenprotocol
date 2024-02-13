/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "warden.warden";
function createBaseSpace() {
    return { address: "", creator: "", owners: [], adminIntentId: 0, signIntentId: 0 };
}
export const Space = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.creator !== "") {
            writer.uint32(18).string(message.creator);
        }
        for (const v of message.owners) {
            writer.uint32(26).string(v);
        }
        if (message.adminIntentId !== 0) {
            writer.uint32(40).uint64(message.adminIntentId);
        }
        if (message.signIntentId !== 0) {
            writer.uint32(48).uint64(message.signIntentId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseSpace();
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
                    message.creator = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.owners.push(reader.string());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.adminIntentId = longToNumber(reader.uint64());
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.signIntentId = longToNumber(reader.uint64());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            owners: Array.isArray(object?.owners) ? object.owners.map((e) => String(e)) : [],
            adminIntentId: isSet(object.adminIntentId) ? Number(object.adminIntentId) : 0,
            signIntentId: isSet(object.signIntentId) ? Number(object.signIntentId) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.owners?.length) {
            obj.owners = message.owners;
        }
        if (message.adminIntentId !== 0) {
            obj.adminIntentId = Math.round(message.adminIntentId);
        }
        if (message.signIntentId !== 0) {
            obj.signIntentId = Math.round(message.signIntentId);
        }
        return obj;
    },
    create(base) {
        return Space.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseSpace();
        message.address = object.address ?? "";
        message.creator = object.creator ?? "";
        message.owners = object.owners?.map((e) => e) || [];
        message.adminIntentId = object.adminIntentId ?? 0;
        message.signIntentId = object.signIntentId ?? 0;
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
