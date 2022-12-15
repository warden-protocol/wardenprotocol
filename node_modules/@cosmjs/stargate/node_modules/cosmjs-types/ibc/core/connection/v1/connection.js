"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = exports.ConnectionPaths = exports.ClientPaths = exports.Counterparty = exports.IdentifiedConnection = exports.ConnectionEnd = exports.stateToJSON = exports.stateFromJSON = exports.State = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const commitment_1 = require("../../../../ibc/core/commitment/v1/commitment");
exports.protobufPackage = "ibc.core.connection.v1";
/**
 * State defines if a connection is in one of the following states:
 * INIT, TRYOPEN, OPEN or UNINITIALIZED.
 */
var State;
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
})(State = exports.State || (exports.State = {}));
function stateFromJSON(object) {
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
exports.stateFromJSON = stateFromJSON;
function stateToJSON(object) {
    switch (object) {
        case State.STATE_UNINITIALIZED_UNSPECIFIED:
            return "STATE_UNINITIALIZED_UNSPECIFIED";
        case State.STATE_INIT:
            return "STATE_INIT";
        case State.STATE_TRYOPEN:
            return "STATE_TRYOPEN";
        case State.STATE_OPEN:
            return "STATE_OPEN";
        default:
            return "UNKNOWN";
    }
}
exports.stateToJSON = stateToJSON;
const baseConnectionEnd = { clientId: "", state: 0, delayPeriod: long_1.default.UZERO };
exports.ConnectionEnd = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        for (const v of message.versions) {
            exports.Version.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(24).int32(message.state);
        }
        if (message.counterparty !== undefined) {
            exports.Counterparty.encode(message.counterparty, writer.uint32(34).fork()).ldelim();
        }
        if (!message.delayPeriod.isZero()) {
            writer.uint32(40).uint64(message.delayPeriod);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseConnectionEnd);
        message.versions = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.versions.push(exports.Version.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.state = reader.int32();
                    break;
                case 4:
                    message.counterparty = exports.Counterparty.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.delayPeriod = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseConnectionEnd);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.versions = ((_a = object.versions) !== null && _a !== void 0 ? _a : []).map((e) => exports.Version.fromJSON(e));
        message.state = object.state !== undefined && object.state !== null ? stateFromJSON(object.state) : 0;
        message.counterparty =
            object.counterparty !== undefined && object.counterparty !== null
                ? exports.Counterparty.fromJSON(object.counterparty)
                : undefined;
        message.delayPeriod =
            object.delayPeriod !== undefined && object.delayPeriod !== null
                ? long_1.default.fromString(object.delayPeriod)
                : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        if (message.versions) {
            obj.versions = message.versions.map((e) => (e ? exports.Version.toJSON(e) : undefined));
        }
        else {
            obj.versions = [];
        }
        message.state !== undefined && (obj.state = stateToJSON(message.state));
        message.counterparty !== undefined &&
            (obj.counterparty = message.counterparty ? exports.Counterparty.toJSON(message.counterparty) : undefined);
        message.delayPeriod !== undefined && (obj.delayPeriod = (message.delayPeriod || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseConnectionEnd);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.versions = ((_b = object.versions) === null || _b === void 0 ? void 0 : _b.map((e) => exports.Version.fromPartial(e))) || [];
        message.state = (_c = object.state) !== null && _c !== void 0 ? _c : 0;
        message.counterparty =
            object.counterparty !== undefined && object.counterparty !== null
                ? exports.Counterparty.fromPartial(object.counterparty)
                : undefined;
        message.delayPeriod =
            object.delayPeriod !== undefined && object.delayPeriod !== null
                ? long_1.default.fromValue(object.delayPeriod)
                : long_1.default.UZERO;
        return message;
    },
};
const baseIdentifiedConnection = { id: "", clientId: "", state: 0, delayPeriod: long_1.default.UZERO };
exports.IdentifiedConnection = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.clientId !== "") {
            writer.uint32(18).string(message.clientId);
        }
        for (const v of message.versions) {
            exports.Version.encode(v, writer.uint32(26).fork()).ldelim();
        }
        if (message.state !== 0) {
            writer.uint32(32).int32(message.state);
        }
        if (message.counterparty !== undefined) {
            exports.Counterparty.encode(message.counterparty, writer.uint32(42).fork()).ldelim();
        }
        if (!message.delayPeriod.isZero()) {
            writer.uint32(48).uint64(message.delayPeriod);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseIdentifiedConnection);
        message.versions = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.clientId = reader.string();
                    break;
                case 3:
                    message.versions.push(exports.Version.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.state = reader.int32();
                    break;
                case 5:
                    message.counterparty = exports.Counterparty.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.delayPeriod = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseIdentifiedConnection);
        message.id = object.id !== undefined && object.id !== null ? String(object.id) : "";
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.versions = ((_a = object.versions) !== null && _a !== void 0 ? _a : []).map((e) => exports.Version.fromJSON(e));
        message.state = object.state !== undefined && object.state !== null ? stateFromJSON(object.state) : 0;
        message.counterparty =
            object.counterparty !== undefined && object.counterparty !== null
                ? exports.Counterparty.fromJSON(object.counterparty)
                : undefined;
        message.delayPeriod =
            object.delayPeriod !== undefined && object.delayPeriod !== null
                ? long_1.default.fromString(object.delayPeriod)
                : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.clientId !== undefined && (obj.clientId = message.clientId);
        if (message.versions) {
            obj.versions = message.versions.map((e) => (e ? exports.Version.toJSON(e) : undefined));
        }
        else {
            obj.versions = [];
        }
        message.state !== undefined && (obj.state = stateToJSON(message.state));
        message.counterparty !== undefined &&
            (obj.counterparty = message.counterparty ? exports.Counterparty.toJSON(message.counterparty) : undefined);
        message.delayPeriod !== undefined && (obj.delayPeriod = (message.delayPeriod || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = Object.assign({}, baseIdentifiedConnection);
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        message.clientId = (_b = object.clientId) !== null && _b !== void 0 ? _b : "";
        message.versions = ((_c = object.versions) === null || _c === void 0 ? void 0 : _c.map((e) => exports.Version.fromPartial(e))) || [];
        message.state = (_d = object.state) !== null && _d !== void 0 ? _d : 0;
        message.counterparty =
            object.counterparty !== undefined && object.counterparty !== null
                ? exports.Counterparty.fromPartial(object.counterparty)
                : undefined;
        message.delayPeriod =
            object.delayPeriod !== undefined && object.delayPeriod !== null
                ? long_1.default.fromValue(object.delayPeriod)
                : long_1.default.UZERO;
        return message;
    },
};
const baseCounterparty = { clientId: "", connectionId: "" };
exports.Counterparty = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.connectionId !== "") {
            writer.uint32(18).string(message.connectionId);
        }
        if (message.prefix !== undefined) {
            commitment_1.MerklePrefix.encode(message.prefix, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCounterparty);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.connectionId = reader.string();
                    break;
                case 3:
                    message.prefix = commitment_1.MerklePrefix.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCounterparty);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.connectionId =
            object.connectionId !== undefined && object.connectionId !== null ? String(object.connectionId) : "";
        message.prefix =
            object.prefix !== undefined && object.prefix !== null
                ? commitment_1.MerklePrefix.fromJSON(object.prefix)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.connectionId !== undefined && (obj.connectionId = message.connectionId);
        message.prefix !== undefined &&
            (obj.prefix = message.prefix ? commitment_1.MerklePrefix.toJSON(message.prefix) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseCounterparty);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.connectionId = (_b = object.connectionId) !== null && _b !== void 0 ? _b : "";
        message.prefix =
            object.prefix !== undefined && object.prefix !== null
                ? commitment_1.MerklePrefix.fromPartial(object.prefix)
                : undefined;
        return message;
    },
};
const baseClientPaths = { paths: "" };
exports.ClientPaths = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.paths) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseClientPaths);
        message.paths = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.paths.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseClientPaths);
        message.paths = ((_a = object.paths) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.paths) {
            obj.paths = message.paths.map((e) => e);
        }
        else {
            obj.paths = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseClientPaths);
        message.paths = ((_a = object.paths) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
const baseConnectionPaths = { clientId: "", paths: "" };
exports.ConnectionPaths = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        for (const v of message.paths) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseConnectionPaths);
        message.paths = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.paths.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseConnectionPaths);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.paths = ((_a = object.paths) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        if (message.paths) {
            obj.paths = message.paths.map((e) => e);
        }
        else {
            obj.paths = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseConnectionPaths);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.paths = ((_b = object.paths) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        return message;
    },
};
const baseVersion = { identifier: "", features: "" };
exports.Version = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.identifier !== "") {
            writer.uint32(10).string(message.identifier);
        }
        for (const v of message.features) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseVersion);
        message.features = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identifier = reader.string();
                    break;
                case 2:
                    message.features.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseVersion);
        message.identifier =
            object.identifier !== undefined && object.identifier !== null ? String(object.identifier) : "";
        message.features = ((_a = object.features) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.identifier !== undefined && (obj.identifier = message.identifier);
        if (message.features) {
            obj.features = message.features.map((e) => e);
        }
        else {
            obj.features = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseVersion);
        message.identifier = (_a = object.identifier) !== null && _a !== void 0 ? _a : "";
        message.features = ((_b = object.features) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=connection.js.map