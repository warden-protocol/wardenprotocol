/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";
export const protobufPackage = "warden.intent";
function createBaseIntent() {
    return { id: 0, name: "", intent: undefined };
}
export const Intent = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.intent !== undefined) {
            Any.encode(message.intent, writer.uint32(26).fork()).ldelim();
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
                    message.name = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.intent = Any.decode(reader, reader.uint32());
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
            name: isSet(object.name) ? String(object.name) : "",
            intent: isSet(object.intent) ? Any.fromJSON(object.intent) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.name !== "") {
            obj.name = message.name;
        }
        if (message.intent !== undefined) {
            obj.intent = Any.toJSON(message.intent);
        }
        return obj;
    },
    create(base) {
        return Intent.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIntent();
        message.id = object.id ?? 0;
        message.name = object.name ?? "";
        message.intent = (object.intent !== undefined && object.intent !== null)
            ? Any.fromPartial(object.intent)
            : undefined;
        return message;
    },
};
function createBaseBoolparserIntent() {
    return { definition: "", participants: [] };
}
export const BoolparserIntent = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.definition !== "") {
            writer.uint32(10).string(message.definition);
        }
        for (const v of message.participants) {
            IntentParticipant.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBoolparserIntent();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.definition = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.participants.push(IntentParticipant.decode(reader, reader.uint32()));
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
            definition: isSet(object.definition) ? String(object.definition) : "",
            participants: Array.isArray(object?.participants)
                ? object.participants.map((e) => IntentParticipant.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.definition !== "") {
            obj.definition = message.definition;
        }
        if (message.participants?.length) {
            obj.participants = message.participants.map((e) => IntentParticipant.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return BoolparserIntent.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseBoolparserIntent();
        message.definition = object.definition ?? "";
        message.participants = object.participants?.map((e) => IntentParticipant.fromPartial(e)) || [];
        return message;
    },
};
function createBaseIntentParticipant() {
    return { abbreviation: "", address: "" };
}
export const IntentParticipant = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.abbreviation !== "") {
            writer.uint32(10).string(message.abbreviation);
        }
        if (message.address !== "") {
            writer.uint32(18).string(message.address);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIntentParticipant();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.abbreviation = reader.string();
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
            abbreviation: isSet(object.abbreviation) ? String(object.abbreviation) : "",
            address: isSet(object.address) ? String(object.address) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.abbreviation !== "") {
            obj.abbreviation = message.abbreviation;
        }
        if (message.address !== "") {
            obj.address = message.address;
        }
        return obj;
    },
    create(base) {
        return IntentParticipant.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIntentParticipant();
        message.abbreviation = object.abbreviation ?? "";
        message.address = object.address ?? "";
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
