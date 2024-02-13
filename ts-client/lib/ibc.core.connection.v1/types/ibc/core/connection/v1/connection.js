/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { MerklePrefix } from "../../commitment/v1/commitment";
export const protobufPackage = "ibc.core.connection.v1";
/**
 * State defines if a connection is in one of the following states:
 * INIT, TRYOPEN, OPEN or UNINITIALIZED.
 */
export var State;
(function (State) {
    /** STATE_UNINITIALIZED_UNSPECIFIED - Default State */
    State[State["STATE_UNINITIALIZED_UNSPECIFIED"] = 0] = "STATE_UNINITIALIZED_UNSPECIFIED";
    /** STATE_INIT - A connection end has just started the opening handshake. */
    State[State["STATE_INIT"] = 1] = "STATE_INIT";
    /**
     * STATE_TRYOPEN - A connection end has acknowledged the handshake step on the counterparty
     * chain.
     */
    State[State["STATE_TRYOPEN"] = 2] = "STATE_TRYOPEN";
    /** STATE_OPEN - A connection end has completed the handshake. */
    State[State["STATE_OPEN"] = 3] = "STATE_OPEN";
    State[State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(State || (State = {}));
export function stateFromJSON(object) {
    switch (object) {
        case 0:
        case "STATE_UNINITIALIZED_UNSPECIFIED":
            return State.STATE_UNINITIALIZED_UNSPECIFIED;
        case 1:
        case "STATE_INIT":
            return State.STATE_INIT;
        case 2:
        case "STATE_TRYOPEN":
            return State.STATE_TRYOPEN;
        case 3:
        case "STATE_OPEN":
            return State.STATE_OPEN;
        case -1:
        case "UNRECOGNIZED":
        default:
            return State.UNRECOGNIZED;
    }
}
export function stateToJSON(object) {
    switch (object) {
        case State.STATE_UNINITIALIZED_UNSPECIFIED:
            return "STATE_UNINITIALIZED_UNSPECIFIED";
        case State.STATE_INIT:
            return "STATE_INIT";
        case State.STATE_TRYOPEN:
            return "STATE_TRYOPEN";
        case State.STATE_OPEN:
            return "STATE_OPEN";
        case State.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseConnectionEnd() {
    return { clientId: "", versions: [], state: 0, counterparty: undefined, delayPeriod: 0 };
}
export const ConnectionEnd = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        for (const v of message.versions) {
            Version.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(24).int32(message.state);
        }
        if (message.counterparty !== undefined) {
            Counterparty.encode(message.counterparty, writer.uint32(34).fork()).ldelim();
        }
        if (message.delayPeriod !== 0) {
            writer.uint32(40).uint64(message.delayPeriod);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConnectionEnd();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.versions.push(Version.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.state = reader.int32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.counterparty = Counterparty.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.delayPeriod = longToNumber(reader.uint64());
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            versions: Array.isArray(object?.versions) ? object.versions.map((e) => Version.fromJSON(e)) : [],
            state: isSet(object.state) ? stateFromJSON(object.state) : 0,
            counterparty: isSet(object.counterparty) ? Counterparty.fromJSON(object.counterparty) : undefined,
            delayPeriod: isSet(object.delayPeriod) ? Number(object.delayPeriod) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.versions?.length) {
            obj.versions = message.versions.map((e) => Version.toJSON(e));
        }
        if (message.state !== 0) {
            obj.state = stateToJSON(message.state);
        }
        if (message.counterparty !== undefined) {
            obj.counterparty = Counterparty.toJSON(message.counterparty);
        }
        if (message.delayPeriod !== 0) {
            obj.delayPeriod = Math.round(message.delayPeriod);
        }
        return obj;
    },
    create(base) {
        return ConnectionEnd.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseConnectionEnd();
        message.clientId = object.clientId ?? "";
        message.versions = object.versions?.map((e) => Version.fromPartial(e)) || [];
        message.state = object.state ?? 0;
        message.counterparty = (object.counterparty !== undefined && object.counterparty !== null)
            ? Counterparty.fromPartial(object.counterparty)
            : undefined;
        message.delayPeriod = object.delayPeriod ?? 0;
        return message;
    },
};
function createBaseIdentifiedConnection() {
    return { id: "", clientId: "", versions: [], state: 0, counterparty: undefined, delayPeriod: 0 };
}
export const IdentifiedConnection = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.clientId !== "") {
            writer.uint32(18).string(message.clientId);
        }
        for (const v of message.versions) {
            Version.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(32).int32(message.state);
        }
        if (message.counterparty !== undefined) {
            Counterparty.encode(message.counterparty, writer.uint32(42).fork()).ldelim();
        }
        if (message.delayPeriod !== 0) {
            writer.uint32(48).uint64(message.delayPeriod);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIdentifiedConnection();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.id = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.clientId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.versions.push(Version.decode(reader, reader.uint32()));
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.state = reader.int32();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.counterparty = Counterparty.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.delayPeriod = longToNumber(reader.uint64());
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
            id: isSet(object.id) ? String(object.id) : "",
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            versions: Array.isArray(object?.versions) ? object.versions.map((e) => Version.fromJSON(e)) : [],
            state: isSet(object.state) ? stateFromJSON(object.state) : 0,
            counterparty: isSet(object.counterparty) ? Counterparty.fromJSON(object.counterparty) : undefined,
            delayPeriod: isSet(object.delayPeriod) ? Number(object.delayPeriod) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== "") {
            obj.id = message.id;
        }
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.versions?.length) {
            obj.versions = message.versions.map((e) => Version.toJSON(e));
        }
        if (message.state !== 0) {
            obj.state = stateToJSON(message.state);
        }
        if (message.counterparty !== undefined) {
            obj.counterparty = Counterparty.toJSON(message.counterparty);
        }
        if (message.delayPeriod !== 0) {
            obj.delayPeriod = Math.round(message.delayPeriod);
        }
        return obj;
    },
    create(base) {
        return IdentifiedConnection.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIdentifiedConnection();
        message.id = object.id ?? "";
        message.clientId = object.clientId ?? "";
        message.versions = object.versions?.map((e) => Version.fromPartial(e)) || [];
        message.state = object.state ?? 0;
        message.counterparty = (object.counterparty !== undefined && object.counterparty !== null)
            ? Counterparty.fromPartial(object.counterparty)
            : undefined;
        message.delayPeriod = object.delayPeriod ?? 0;
        return message;
    },
};
function createBaseCounterparty() {
    return { clientId: "", connectionId: "", prefix: undefined };
}
export const Counterparty = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.connectionId !== "") {
            writer.uint32(18).string(message.connectionId);
        }
        if (message.prefix !== undefined) {
            MerklePrefix.encode(message.prefix, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCounterparty();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.connectionId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.prefix = MerklePrefix.decode(reader, reader.uint32());
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
            prefix: isSet(object.prefix) ? MerklePrefix.fromJSON(object.prefix) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.connectionId !== "") {
            obj.connectionId = message.connectionId;
        }
        if (message.prefix !== undefined) {
            obj.prefix = MerklePrefix.toJSON(message.prefix);
        }
        return obj;
    },
    create(base) {
        return Counterparty.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCounterparty();
        message.clientId = object.clientId ?? "";
        message.connectionId = object.connectionId ?? "";
        message.prefix = (object.prefix !== undefined && object.prefix !== null)
            ? MerklePrefix.fromPartial(object.prefix)
            : undefined;
        return message;
    },
};
function createBaseClientPaths() {
    return { paths: [] };
}
export const ClientPaths = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.paths) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseClientPaths();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.paths.push(reader.string());
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
        return { paths: Array.isArray(object?.paths) ? object.paths.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.paths?.length) {
            obj.paths = message.paths;
        }
        return obj;
    },
    create(base) {
        return ClientPaths.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseClientPaths();
        message.paths = object.paths?.map((e) => e) || [];
        return message;
    },
};
function createBaseConnectionPaths() {
    return { clientId: "", paths: [] };
}
export const ConnectionPaths = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        for (const v of message.paths) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConnectionPaths();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.paths.push(reader.string());
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            paths: Array.isArray(object?.paths) ? object.paths.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.paths?.length) {
            obj.paths = message.paths;
        }
        return obj;
    },
    create(base) {
        return ConnectionPaths.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseConnectionPaths();
        message.clientId = object.clientId ?? "";
        message.paths = object.paths?.map((e) => e) || [];
        return message;
    },
};
function createBaseVersion() {
    return { identifier: "", features: [] };
}
export const Version = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.identifier !== "") {
            writer.uint32(10).string(message.identifier);
        }
        for (const v of message.features) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVersion();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.identifier = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.features.push(reader.string());
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
            identifier: isSet(object.identifier) ? String(object.identifier) : "",
            features: Array.isArray(object?.features) ? object.features.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.identifier !== "") {
            obj.identifier = message.identifier;
        }
        if (message.features?.length) {
            obj.features = message.features;
        }
        return obj;
    },
    create(base) {
        return Version.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseVersion();
        message.identifier = object.identifier ?? "";
        message.features = object.features?.map((e) => e) || [];
        return message;
    },
};
function createBaseParams() {
    return { maxExpectedTimePerBlock: 0 };
}
export const Params = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.maxExpectedTimePerBlock !== 0) {
            writer.uint32(8).uint64(message.maxExpectedTimePerBlock);
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
                    message.maxExpectedTimePerBlock = longToNumber(reader.uint64());
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
            maxExpectedTimePerBlock: isSet(object.maxExpectedTimePerBlock) ? Number(object.maxExpectedTimePerBlock) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.maxExpectedTimePerBlock !== 0) {
            obj.maxExpectedTimePerBlock = Math.round(message.maxExpectedTimePerBlock);
        }
        return obj;
    },
    create(base) {
        return Params.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.maxExpectedTimePerBlock = object.maxExpectedTimePerBlock ?? 0;
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
