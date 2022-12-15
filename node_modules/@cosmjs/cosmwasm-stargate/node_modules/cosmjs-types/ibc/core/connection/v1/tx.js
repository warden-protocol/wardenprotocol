"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgConnectionOpenConfirmResponse = exports.MsgConnectionOpenConfirm = exports.MsgConnectionOpenAckResponse = exports.MsgConnectionOpenAck = exports.MsgConnectionOpenTryResponse = exports.MsgConnectionOpenTry = exports.MsgConnectionOpenInitResponse = exports.MsgConnectionOpenInit = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const connection_1 = require("../../../../ibc/core/connection/v1/connection");
const any_1 = require("../../../../google/protobuf/any");
const client_1 = require("../../../../ibc/core/client/v1/client");
exports.protobufPackage = "ibc.core.connection.v1";
const baseMsgConnectionOpenInit = { clientId: "", delayPeriod: long_1.default.UZERO, signer: "" };
exports.MsgConnectionOpenInit = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.counterparty !== undefined) {
            connection_1.Counterparty.encode(message.counterparty, writer.uint32(18).fork()).ldelim();
        }
        if (message.version !== undefined) {
            connection_1.Version.encode(message.version, writer.uint32(26).fork()).ldelim();
        }
        if (!message.delayPeriod.isZero()) {
            writer.uint32(32).uint64(message.delayPeriod);
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgConnectionOpenInit);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.counterparty = connection_1.Counterparty.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.version = connection_1.Version.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.delayPeriod = reader.uint64();
                    break;
                case 5:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgConnectionOpenInit);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.counterparty =
            object.counterparty !== undefined && object.counterparty !== null
                ? connection_1.Counterparty.fromJSON(object.counterparty)
                : undefined;
        message.version =
            object.version !== undefined && object.version !== null ? connection_1.Version.fromJSON(object.version) : undefined;
        message.delayPeriod =
            object.delayPeriod !== undefined && object.delayPeriod !== null
                ? long_1.default.fromString(object.delayPeriod)
                : long_1.default.UZERO;
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.counterparty !== undefined &&
            (obj.counterparty = message.counterparty ? connection_1.Counterparty.toJSON(message.counterparty) : undefined);
        message.version !== undefined &&
            (obj.version = message.version ? connection_1.Version.toJSON(message.version) : undefined);
        message.delayPeriod !== undefined && (obj.delayPeriod = (message.delayPeriod || long_1.default.UZERO).toString());
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgConnectionOpenInit);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.counterparty =
            object.counterparty !== undefined && object.counterparty !== null
                ? connection_1.Counterparty.fromPartial(object.counterparty)
                : undefined;
        message.version =
            object.version !== undefined && object.version !== null
                ? connection_1.Version.fromPartial(object.version)
                : undefined;
        message.delayPeriod =
            object.delayPeriod !== undefined && object.delayPeriod !== null
                ? long_1.default.fromValue(object.delayPeriod)
                : long_1.default.UZERO;
        message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgConnectionOpenInitResponse = {};
exports.MsgConnectionOpenInitResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgConnectionOpenInitResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgConnectionOpenInitResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgConnectionOpenInitResponse);
        return message;
    },
};
const baseMsgConnectionOpenTry = {
    clientId: "",
    previousConnectionId: "",
    delayPeriod: long_1.default.UZERO,
    signer: "",
};
exports.MsgConnectionOpenTry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.previousConnectionId !== "") {
            writer.uint32(18).string(message.previousConnectionId);
        }
        if (message.clientState !== undefined) {
            any_1.Any.encode(message.clientState, writer.uint32(26).fork()).ldelim();
        }
        if (message.counterparty !== undefined) {
            connection_1.Counterparty.encode(message.counterparty, writer.uint32(34).fork()).ldelim();
        }
        if (!message.delayPeriod.isZero()) {
            writer.uint32(40).uint64(message.delayPeriod);
        }
        for (const v of message.counterpartyVersions) {
            connection_1.Version.encode(v, writer.uint32(50).fork()).ldelim();
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(58).fork()).ldelim();
        }
        if (message.proofInit.length !== 0) {
            writer.uint32(66).bytes(message.proofInit);
        }
        if (message.proofClient.length !== 0) {
            writer.uint32(74).bytes(message.proofClient);
        }
        if (message.proofConsensus.length !== 0) {
            writer.uint32(82).bytes(message.proofConsensus);
        }
        if (message.consensusHeight !== undefined) {
            client_1.Height.encode(message.consensusHeight, writer.uint32(90).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(98).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgConnectionOpenTry);
        message.counterpartyVersions = [];
        message.proofInit = new Uint8Array();
        message.proofClient = new Uint8Array();
        message.proofConsensus = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.previousConnectionId = reader.string();
                    break;
                case 3:
                    message.clientState = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.counterparty = connection_1.Counterparty.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.delayPeriod = reader.uint64();
                    break;
                case 6:
                    message.counterpartyVersions.push(connection_1.Version.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.proofInit = reader.bytes();
                    break;
                case 9:
                    message.proofClient = reader.bytes();
                    break;
                case 10:
                    message.proofConsensus = reader.bytes();
                    break;
                case 11:
                    message.consensusHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 12:
                    message.signer = reader.string();
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
        const message = Object.assign({}, baseMsgConnectionOpenTry);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.previousConnectionId =
            object.previousConnectionId !== undefined && object.previousConnectionId !== null
                ? String(object.previousConnectionId)
                : "";
        message.clientState =
            object.clientState !== undefined && object.clientState !== null
                ? any_1.Any.fromJSON(object.clientState)
                : undefined;
        message.counterparty =
            object.counterparty !== undefined && object.counterparty !== null
                ? connection_1.Counterparty.fromJSON(object.counterparty)
                : undefined;
        message.delayPeriod =
            object.delayPeriod !== undefined && object.delayPeriod !== null
                ? long_1.default.fromString(object.delayPeriod)
                : long_1.default.UZERO;
        message.counterpartyVersions = ((_a = object.counterpartyVersions) !== null && _a !== void 0 ? _a : []).map((e) => connection_1.Version.fromJSON(e));
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        message.proofInit =
            object.proofInit !== undefined && object.proofInit !== null
                ? bytesFromBase64(object.proofInit)
                : new Uint8Array();
        message.proofClient =
            object.proofClient !== undefined && object.proofClient !== null
                ? bytesFromBase64(object.proofClient)
                : new Uint8Array();
        message.proofConsensus =
            object.proofConsensus !== undefined && object.proofConsensus !== null
                ? bytesFromBase64(object.proofConsensus)
                : new Uint8Array();
        message.consensusHeight =
            object.consensusHeight !== undefined && object.consensusHeight !== null
                ? client_1.Height.fromJSON(object.consensusHeight)
                : undefined;
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.previousConnectionId !== undefined && (obj.previousConnectionId = message.previousConnectionId);
        message.clientState !== undefined &&
            (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : undefined);
        message.counterparty !== undefined &&
            (obj.counterparty = message.counterparty ? connection_1.Counterparty.toJSON(message.counterparty) : undefined);
        message.delayPeriod !== undefined && (obj.delayPeriod = (message.delayPeriod || long_1.default.UZERO).toString());
        if (message.counterpartyVersions) {
            obj.counterpartyVersions = message.counterpartyVersions.map((e) => (e ? connection_1.Version.toJSON(e) : undefined));
        }
        else {
            obj.counterpartyVersions = [];
        }
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.proofInit !== undefined &&
            (obj.proofInit = base64FromBytes(message.proofInit !== undefined ? message.proofInit : new Uint8Array()));
        message.proofClient !== undefined &&
            (obj.proofClient = base64FromBytes(message.proofClient !== undefined ? message.proofClient : new Uint8Array()));
        message.proofConsensus !== undefined &&
            (obj.proofConsensus = base64FromBytes(message.proofConsensus !== undefined ? message.proofConsensus : new Uint8Array()));
        message.consensusHeight !== undefined &&
            (obj.consensusHeight = message.consensusHeight ? client_1.Height.toJSON(message.consensusHeight) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g;
        const message = Object.assign({}, baseMsgConnectionOpenTry);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.previousConnectionId = (_b = object.previousConnectionId) !== null && _b !== void 0 ? _b : "";
        message.clientState =
            object.clientState !== undefined && object.clientState !== null
                ? any_1.Any.fromPartial(object.clientState)
                : undefined;
        message.counterparty =
            object.counterparty !== undefined && object.counterparty !== null
                ? connection_1.Counterparty.fromPartial(object.counterparty)
                : undefined;
        message.delayPeriod =
            object.delayPeriod !== undefined && object.delayPeriod !== null
                ? long_1.default.fromValue(object.delayPeriod)
                : long_1.default.UZERO;
        message.counterpartyVersions = ((_c = object.counterpartyVersions) === null || _c === void 0 ? void 0 : _c.map((e) => connection_1.Version.fromPartial(e))) || [];
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.proofInit = (_d = object.proofInit) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.proofClient = (_e = object.proofClient) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.proofConsensus = (_f = object.proofConsensus) !== null && _f !== void 0 ? _f : new Uint8Array();
        message.consensusHeight =
            object.consensusHeight !== undefined && object.consensusHeight !== null
                ? client_1.Height.fromPartial(object.consensusHeight)
                : undefined;
        message.signer = (_g = object.signer) !== null && _g !== void 0 ? _g : "";
        return message;
    },
};
const baseMsgConnectionOpenTryResponse = {};
exports.MsgConnectionOpenTryResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgConnectionOpenTryResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgConnectionOpenTryResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgConnectionOpenTryResponse);
        return message;
    },
};
const baseMsgConnectionOpenAck = { connectionId: "", counterpartyConnectionId: "", signer: "" };
exports.MsgConnectionOpenAck = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.connectionId !== "") {
            writer.uint32(10).string(message.connectionId);
        }
        if (message.counterpartyConnectionId !== "") {
            writer.uint32(18).string(message.counterpartyConnectionId);
        }
        if (message.version !== undefined) {
            connection_1.Version.encode(message.version, writer.uint32(26).fork()).ldelim();
        }
        if (message.clientState !== undefined) {
            any_1.Any.encode(message.clientState, writer.uint32(34).fork()).ldelim();
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(42).fork()).ldelim();
        }
        if (message.proofTry.length !== 0) {
            writer.uint32(50).bytes(message.proofTry);
        }
        if (message.proofClient.length !== 0) {
            writer.uint32(58).bytes(message.proofClient);
        }
        if (message.proofConsensus.length !== 0) {
            writer.uint32(66).bytes(message.proofConsensus);
        }
        if (message.consensusHeight !== undefined) {
            client_1.Height.encode(message.consensusHeight, writer.uint32(74).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(82).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgConnectionOpenAck);
        message.proofTry = new Uint8Array();
        message.proofClient = new Uint8Array();
        message.proofConsensus = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.connectionId = reader.string();
                    break;
                case 2:
                    message.counterpartyConnectionId = reader.string();
                    break;
                case 3:
                    message.version = connection_1.Version.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.clientState = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.proofTry = reader.bytes();
                    break;
                case 7:
                    message.proofClient = reader.bytes();
                    break;
                case 8:
                    message.proofConsensus = reader.bytes();
                    break;
                case 9:
                    message.consensusHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgConnectionOpenAck);
        message.connectionId =
            object.connectionId !== undefined && object.connectionId !== null ? String(object.connectionId) : "";
        message.counterpartyConnectionId =
            object.counterpartyConnectionId !== undefined && object.counterpartyConnectionId !== null
                ? String(object.counterpartyConnectionId)
                : "";
        message.version =
            object.version !== undefined && object.version !== null ? connection_1.Version.fromJSON(object.version) : undefined;
        message.clientState =
            object.clientState !== undefined && object.clientState !== null
                ? any_1.Any.fromJSON(object.clientState)
                : undefined;
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        message.proofTry =
            object.proofTry !== undefined && object.proofTry !== null
                ? bytesFromBase64(object.proofTry)
                : new Uint8Array();
        message.proofClient =
            object.proofClient !== undefined && object.proofClient !== null
                ? bytesFromBase64(object.proofClient)
                : new Uint8Array();
        message.proofConsensus =
            object.proofConsensus !== undefined && object.proofConsensus !== null
                ? bytesFromBase64(object.proofConsensus)
                : new Uint8Array();
        message.consensusHeight =
            object.consensusHeight !== undefined && object.consensusHeight !== null
                ? client_1.Height.fromJSON(object.consensusHeight)
                : undefined;
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.connectionId !== undefined && (obj.connectionId = message.connectionId);
        message.counterpartyConnectionId !== undefined &&
            (obj.counterpartyConnectionId = message.counterpartyConnectionId);
        message.version !== undefined &&
            (obj.version = message.version ? connection_1.Version.toJSON(message.version) : undefined);
        message.clientState !== undefined &&
            (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : undefined);
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.proofTry !== undefined &&
            (obj.proofTry = base64FromBytes(message.proofTry !== undefined ? message.proofTry : new Uint8Array()));
        message.proofClient !== undefined &&
            (obj.proofClient = base64FromBytes(message.proofClient !== undefined ? message.proofClient : new Uint8Array()));
        message.proofConsensus !== undefined &&
            (obj.proofConsensus = base64FromBytes(message.proofConsensus !== undefined ? message.proofConsensus : new Uint8Array()));
        message.consensusHeight !== undefined &&
            (obj.consensusHeight = message.consensusHeight ? client_1.Height.toJSON(message.consensusHeight) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = Object.assign({}, baseMsgConnectionOpenAck);
        message.connectionId = (_a = object.connectionId) !== null && _a !== void 0 ? _a : "";
        message.counterpartyConnectionId = (_b = object.counterpartyConnectionId) !== null && _b !== void 0 ? _b : "";
        message.version =
            object.version !== undefined && object.version !== null
                ? connection_1.Version.fromPartial(object.version)
                : undefined;
        message.clientState =
            object.clientState !== undefined && object.clientState !== null
                ? any_1.Any.fromPartial(object.clientState)
                : undefined;
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.proofTry = (_c = object.proofTry) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.proofClient = (_d = object.proofClient) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.proofConsensus = (_e = object.proofConsensus) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.consensusHeight =
            object.consensusHeight !== undefined && object.consensusHeight !== null
                ? client_1.Height.fromPartial(object.consensusHeight)
                : undefined;
        message.signer = (_f = object.signer) !== null && _f !== void 0 ? _f : "";
        return message;
    },
};
const baseMsgConnectionOpenAckResponse = {};
exports.MsgConnectionOpenAckResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgConnectionOpenAckResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgConnectionOpenAckResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgConnectionOpenAckResponse);
        return message;
    },
};
const baseMsgConnectionOpenConfirm = { connectionId: "", signer: "" };
exports.MsgConnectionOpenConfirm = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.connectionId !== "") {
            writer.uint32(10).string(message.connectionId);
        }
        if (message.proofAck.length !== 0) {
            writer.uint32(18).bytes(message.proofAck);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(34).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgConnectionOpenConfirm);
        message.proofAck = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.connectionId = reader.string();
                    break;
                case 2:
                    message.proofAck = reader.bytes();
                    break;
                case 3:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgConnectionOpenConfirm);
        message.connectionId =
            object.connectionId !== undefined && object.connectionId !== null ? String(object.connectionId) : "";
        message.proofAck =
            object.proofAck !== undefined && object.proofAck !== null
                ? bytesFromBase64(object.proofAck)
                : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.connectionId !== undefined && (obj.connectionId = message.connectionId);
        message.proofAck !== undefined &&
            (obj.proofAck = base64FromBytes(message.proofAck !== undefined ? message.proofAck : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseMsgConnectionOpenConfirm);
        message.connectionId = (_a = object.connectionId) !== null && _a !== void 0 ? _a : "";
        message.proofAck = (_b = object.proofAck) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.signer = (_c = object.signer) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseMsgConnectionOpenConfirmResponse = {};
exports.MsgConnectionOpenConfirmResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgConnectionOpenConfirmResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgConnectionOpenConfirmResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgConnectionOpenConfirmResponse);
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.ConnectionOpenInit = this.ConnectionOpenInit.bind(this);
        this.ConnectionOpenTry = this.ConnectionOpenTry.bind(this);
        this.ConnectionOpenAck = this.ConnectionOpenAck.bind(this);
        this.ConnectionOpenConfirm = this.ConnectionOpenConfirm.bind(this);
    }
    ConnectionOpenInit(request) {
        const data = exports.MsgConnectionOpenInit.encode(request).finish();
        const promise = this.rpc.request("ibc.core.connection.v1.Msg", "ConnectionOpenInit", data);
        return promise.then((data) => exports.MsgConnectionOpenInitResponse.decode(new minimal_1.default.Reader(data)));
    }
    ConnectionOpenTry(request) {
        const data = exports.MsgConnectionOpenTry.encode(request).finish();
        const promise = this.rpc.request("ibc.core.connection.v1.Msg", "ConnectionOpenTry", data);
        return promise.then((data) => exports.MsgConnectionOpenTryResponse.decode(new minimal_1.default.Reader(data)));
    }
    ConnectionOpenAck(request) {
        const data = exports.MsgConnectionOpenAck.encode(request).finish();
        const promise = this.rpc.request("ibc.core.connection.v1.Msg", "ConnectionOpenAck", data);
        return promise.then((data) => exports.MsgConnectionOpenAckResponse.decode(new minimal_1.default.Reader(data)));
    }
    ConnectionOpenConfirm(request) {
        const data = exports.MsgConnectionOpenConfirm.encode(request).finish();
        const promise = this.rpc.request("ibc.core.connection.v1.Msg", "ConnectionOpenConfirm", data);
        return promise.then((data) => exports.MsgConnectionOpenConfirmResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
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
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=tx.js.map