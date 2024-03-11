/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "warden.warden";
function createBaseKeychain() {
    return {
        id: 0,
        creator: "",
        description: "",
        admins: [],
        parties: [],
        adminIntentId: 0,
        fees: undefined,
        isActive: false,
    };
}
export const Keychain = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.creator !== "") {
            writer.uint32(18).string(message.creator);
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        for (const v of message.admins) {
            writer.uint32(34).string(v);
        }
        for (const v of message.parties) {
            writer.uint32(42).string(v);
        }
        if (message.adminIntentId !== 0) {
            writer.uint32(48).uint64(message.adminIntentId);
        }
        if (message.fees !== undefined) {
            KeychainFees.encode(message.fees, writer.uint32(58).fork()).ldelim();
        }
        if (message.isActive === true) {
            writer.uint32(64).bool(message.isActive);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseKeychain();
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
                    message.description = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.admins.push(reader.string());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.parties.push(reader.string());
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.adminIntentId = longToNumber(reader.uint64());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.fees = KeychainFees.decode(reader, reader.uint32());
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.isActive = reader.bool();
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
            description: isSet(object.description) ? String(object.description) : "",
            admins: Array.isArray(object?.admins) ? object.admins.map((e) => String(e)) : [],
            parties: Array.isArray(object?.parties) ? object.parties.map((e) => String(e)) : [],
            adminIntentId: isSet(object.adminIntentId) ? Number(object.adminIntentId) : 0,
            fees: isSet(object.fees) ? KeychainFees.fromJSON(object.fees) : undefined,
            isActive: isSet(object.isActive) ? Boolean(object.isActive) : false,
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
        if (message.description !== "") {
            obj.description = message.description;
        }
        if (message.admins?.length) {
            obj.admins = message.admins;
        }
        if (message.parties?.length) {
            obj.parties = message.parties;
        }
        if (message.adminIntentId !== 0) {
            obj.adminIntentId = Math.round(message.adminIntentId);
        }
        if (message.fees !== undefined) {
            obj.fees = KeychainFees.toJSON(message.fees);
        }
        if (message.isActive === true) {
            obj.isActive = message.isActive;
        }
        return obj;
    },
    create(base) {
        return Keychain.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseKeychain();
        message.id = object.id ?? 0;
        message.creator = object.creator ?? "";
        message.description = object.description ?? "";
        message.admins = object.admins?.map((e) => e) || [];
        message.parties = object.parties?.map((e) => e) || [];
        message.adminIntentId = object.adminIntentId ?? 0;
        message.fees = (object.fees !== undefined && object.fees !== null)
            ? KeychainFees.fromPartial(object.fees)
            : undefined;
        message.isActive = object.isActive ?? false;
        return message;
    },
};
function createBaseKeychainFees() {
    return { keyReq: 0, sigReq: 0 };
}
export const KeychainFees = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.keyReq !== 0) {
            writer.uint32(8).int64(message.keyReq);
        }
        if (message.sigReq !== 0) {
            writer.uint32(16).int64(message.sigReq);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseKeychainFees();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.keyReq = longToNumber(reader.int64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.sigReq = longToNumber(reader.int64());
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
            keyReq: isSet(object.keyReq) ? Number(object.keyReq) : 0,
            sigReq: isSet(object.sigReq) ? Number(object.sigReq) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.keyReq !== 0) {
            obj.keyReq = Math.round(message.keyReq);
        }
        if (message.sigReq !== 0) {
            obj.sigReq = Math.round(message.sigReq);
        }
        return obj;
    },
    create(base) {
        return KeychainFees.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseKeychainFees();
        message.keyReq = object.keyReq ?? 0;
        message.sigReq = object.sigReq ?? 0;
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
