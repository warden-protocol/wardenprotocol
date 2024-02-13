/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
export const protobufPackage = "tendermint.version";
function createBaseApp() {
    return { protocol: 0, software: "" };
}
export const App = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.protocol !== 0) {
            writer.uint32(8).uint64(message.protocol);
        }
        if (message.software !== "") {
            writer.uint32(18).string(message.software);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseApp();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.protocol = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.software = reader.string();
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
            protocol: isSet(object.protocol) ? Number(object.protocol) : 0,
            software: isSet(object.software) ? String(object.software) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.protocol !== 0) {
            obj.protocol = Math.round(message.protocol);
        }
        if (message.software !== "") {
            obj.software = message.software;
        }
        return obj;
    },
    create(base) {
        return App.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseApp();
        message.protocol = object.protocol ?? 0;
        message.software = object.software ?? "";
        return message;
    },
};
function createBaseConsensus() {
    return { block: 0, app: 0 };
}
export const Consensus = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.block !== 0) {
            writer.uint32(8).uint64(message.block);
        }
        if (message.app !== 0) {
            writer.uint32(16).uint64(message.app);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConsensus();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.block = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.app = longToNumber(reader.uint64());
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
        return { block: isSet(object.block) ? Number(object.block) : 0, app: isSet(object.app) ? Number(object.app) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.block !== 0) {
            obj.block = Math.round(message.block);
        }
        if (message.app !== 0) {
            obj.app = Math.round(message.app);
        }
        return obj;
    },
    create(base) {
        return Consensus.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseConsensus();
        message.block = object.block ?? 0;
        message.app = object.app ?? 0;
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
