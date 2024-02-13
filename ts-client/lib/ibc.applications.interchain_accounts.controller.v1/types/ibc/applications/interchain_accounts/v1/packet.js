/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
export const protobufPackage = "ibc.applications.interchain_accounts.v1";
/**
 * Type defines a classification of message issued from a controller chain to its associated interchain accounts
 * host
 */
export var Type;
(function (Type) {
    /** TYPE_UNSPECIFIED - Default zero value enumeration */
    Type[Type["TYPE_UNSPECIFIED"] = 0] = "TYPE_UNSPECIFIED";
    /** TYPE_EXECUTE_TX - Execute a transaction on an interchain accounts host chain */
    Type[Type["TYPE_EXECUTE_TX"] = 1] = "TYPE_EXECUTE_TX";
    Type[Type["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Type || (Type = {}));
export function typeFromJSON(object) {
    switch (object) {
        case 0:
        case "TYPE_UNSPECIFIED":
            return Type.TYPE_UNSPECIFIED;
        case 1:
        case "TYPE_EXECUTE_TX":
            return Type.TYPE_EXECUTE_TX;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Type.UNRECOGNIZED;
    }
}
export function typeToJSON(object) {
    switch (object) {
        case Type.TYPE_UNSPECIFIED:
            return "TYPE_UNSPECIFIED";
        case Type.TYPE_EXECUTE_TX:
            return "TYPE_EXECUTE_TX";
        case Type.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseInterchainAccountPacketData() {
    return { type: 0, data: new Uint8Array(0), memo: "" };
}
export const InterchainAccountPacketData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        if (message.memo !== "") {
            writer.uint32(26).string(message.memo);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseInterchainAccountPacketData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.type = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.memo = reader.string();
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
            type: isSet(object.type) ? typeFromJSON(object.type) : 0,
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
            memo: isSet(object.memo) ? String(object.memo) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.type !== 0) {
            obj.type = typeToJSON(message.type);
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        if (message.memo !== "") {
            obj.memo = message.memo;
        }
        return obj;
    },
    create(base) {
        return InterchainAccountPacketData.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseInterchainAccountPacketData();
        message.type = object.type ?? 0;
        message.data = object.data ?? new Uint8Array(0);
        message.memo = object.memo ?? "";
        return message;
    },
};
function createBaseCosmosTx() {
    return { messages: [] };
}
export const CosmosTx = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.messages) {
            Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCosmosTx();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.messages.push(Any.decode(reader, reader.uint32()));
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
        return { messages: Array.isArray(object?.messages) ? object.messages.map((e) => Any.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.messages?.length) {
            obj.messages = message.messages.map((e) => Any.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return CosmosTx.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCosmosTx();
        message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
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
function isSet(value) {
    return value !== null && value !== undefined;
}
