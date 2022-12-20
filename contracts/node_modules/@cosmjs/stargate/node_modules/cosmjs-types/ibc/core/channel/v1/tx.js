"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgAcknowledgementResponse = exports.MsgAcknowledgement = exports.MsgTimeoutOnCloseResponse = exports.MsgTimeoutOnClose = exports.MsgTimeoutResponse = exports.MsgTimeout = exports.MsgRecvPacketResponse = exports.MsgRecvPacket = exports.MsgChannelCloseConfirmResponse = exports.MsgChannelCloseConfirm = exports.MsgChannelCloseInitResponse = exports.MsgChannelCloseInit = exports.MsgChannelOpenConfirmResponse = exports.MsgChannelOpenConfirm = exports.MsgChannelOpenAckResponse = exports.MsgChannelOpenAck = exports.MsgChannelOpenTryResponse = exports.MsgChannelOpenTry = exports.MsgChannelOpenInitResponse = exports.MsgChannelOpenInit = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const channel_1 = require("../../../../ibc/core/channel/v1/channel");
const client_1 = require("../../../../ibc/core/client/v1/client");
exports.protobufPackage = "ibc.core.channel.v1";
const baseMsgChannelOpenInit = { portId: "", signer: "" };
exports.MsgChannelOpenInit = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channel !== undefined) {
            channel_1.Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenInit);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.channel = channel_1.Channel.decode(reader, reader.uint32());
                    break;
                case 3:
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
        const message = Object.assign({}, baseMsgChannelOpenInit);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channel =
            object.channel !== undefined && object.channel !== null ? channel_1.Channel.fromJSON(object.channel) : undefined;
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channel !== undefined &&
            (obj.channel = message.channel ? channel_1.Channel.toJSON(message.channel) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgChannelOpenInit);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channel =
            object.channel !== undefined && object.channel !== null
                ? channel_1.Channel.fromPartial(object.channel)
                : undefined;
        message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgChannelOpenInitResponse = {};
exports.MsgChannelOpenInitResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenInitResponse);
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
        const message = Object.assign({}, baseMsgChannelOpenInitResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelOpenInitResponse);
        return message;
    },
};
const baseMsgChannelOpenTry = {
    portId: "",
    previousChannelId: "",
    counterpartyVersion: "",
    signer: "",
};
exports.MsgChannelOpenTry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.previousChannelId !== "") {
            writer.uint32(18).string(message.previousChannelId);
        }
        if (message.channel !== undefined) {
            channel_1.Channel.encode(message.channel, writer.uint32(26).fork()).ldelim();
        }
        if (message.counterpartyVersion !== "") {
            writer.uint32(34).string(message.counterpartyVersion);
        }
        if (message.proofInit.length !== 0) {
            writer.uint32(42).bytes(message.proofInit);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(58).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenTry);
        message.proofInit = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.previousChannelId = reader.string();
                    break;
                case 3:
                    message.channel = channel_1.Channel.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.counterpartyVersion = reader.string();
                    break;
                case 5:
                    message.proofInit = reader.bytes();
                    break;
                case 6:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 7:
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
        const message = Object.assign({}, baseMsgChannelOpenTry);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.previousChannelId =
            object.previousChannelId !== undefined && object.previousChannelId !== null
                ? String(object.previousChannelId)
                : "";
        message.channel =
            object.channel !== undefined && object.channel !== null ? channel_1.Channel.fromJSON(object.channel) : undefined;
        message.counterpartyVersion =
            object.counterpartyVersion !== undefined && object.counterpartyVersion !== null
                ? String(object.counterpartyVersion)
                : "";
        message.proofInit =
            object.proofInit !== undefined && object.proofInit !== null
                ? bytesFromBase64(object.proofInit)
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
        message.portId !== undefined && (obj.portId = message.portId);
        message.previousChannelId !== undefined && (obj.previousChannelId = message.previousChannelId);
        message.channel !== undefined &&
            (obj.channel = message.channel ? channel_1.Channel.toJSON(message.channel) : undefined);
        message.counterpartyVersion !== undefined && (obj.counterpartyVersion = message.counterpartyVersion);
        message.proofInit !== undefined &&
            (obj.proofInit = base64FromBytes(message.proofInit !== undefined ? message.proofInit : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = Object.assign({}, baseMsgChannelOpenTry);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.previousChannelId = (_b = object.previousChannelId) !== null && _b !== void 0 ? _b : "";
        message.channel =
            object.channel !== undefined && object.channel !== null
                ? channel_1.Channel.fromPartial(object.channel)
                : undefined;
        message.counterpartyVersion = (_c = object.counterpartyVersion) !== null && _c !== void 0 ? _c : "";
        message.proofInit = (_d = object.proofInit) !== null && _d !== void 0 ? _d : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.signer = (_e = object.signer) !== null && _e !== void 0 ? _e : "";
        return message;
    },
};
const baseMsgChannelOpenTryResponse = {};
exports.MsgChannelOpenTryResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenTryResponse);
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
        const message = Object.assign({}, baseMsgChannelOpenTryResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelOpenTryResponse);
        return message;
    },
};
const baseMsgChannelOpenAck = {
    portId: "",
    channelId: "",
    counterpartyChannelId: "",
    counterpartyVersion: "",
    signer: "",
};
exports.MsgChannelOpenAck = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.counterpartyChannelId !== "") {
            writer.uint32(26).string(message.counterpartyChannelId);
        }
        if (message.counterpartyVersion !== "") {
            writer.uint32(34).string(message.counterpartyVersion);
        }
        if (message.proofTry.length !== 0) {
            writer.uint32(42).bytes(message.proofTry);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(58).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenAck);
        message.proofTry = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.channelId = reader.string();
                    break;
                case 3:
                    message.counterpartyChannelId = reader.string();
                    break;
                case 4:
                    message.counterpartyVersion = reader.string();
                    break;
                case 5:
                    message.proofTry = reader.bytes();
                    break;
                case 6:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 7:
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
        const message = Object.assign({}, baseMsgChannelOpenAck);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.counterpartyChannelId =
            object.counterpartyChannelId !== undefined && object.counterpartyChannelId !== null
                ? String(object.counterpartyChannelId)
                : "";
        message.counterpartyVersion =
            object.counterpartyVersion !== undefined && object.counterpartyVersion !== null
                ? String(object.counterpartyVersion)
                : "";
        message.proofTry =
            object.proofTry !== undefined && object.proofTry !== null
                ? bytesFromBase64(object.proofTry)
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
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.counterpartyChannelId !== undefined &&
            (obj.counterpartyChannelId = message.counterpartyChannelId);
        message.counterpartyVersion !== undefined && (obj.counterpartyVersion = message.counterpartyVersion);
        message.proofTry !== undefined &&
            (obj.proofTry = base64FromBytes(message.proofTry !== undefined ? message.proofTry : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = Object.assign({}, baseMsgChannelOpenAck);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.counterpartyChannelId = (_c = object.counterpartyChannelId) !== null && _c !== void 0 ? _c : "";
        message.counterpartyVersion = (_d = object.counterpartyVersion) !== null && _d !== void 0 ? _d : "";
        message.proofTry = (_e = object.proofTry) !== null && _e !== void 0 ? _e : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.signer = (_f = object.signer) !== null && _f !== void 0 ? _f : "";
        return message;
    },
};
const baseMsgChannelOpenAckResponse = {};
exports.MsgChannelOpenAckResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenAckResponse);
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
        const message = Object.assign({}, baseMsgChannelOpenAckResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelOpenAckResponse);
        return message;
    },
};
const baseMsgChannelOpenConfirm = { portId: "", channelId: "", signer: "" };
exports.MsgChannelOpenConfirm = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.proofAck.length !== 0) {
            writer.uint32(26).bytes(message.proofAck);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenConfirm);
        message.proofAck = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.channelId = reader.string();
                    break;
                case 3:
                    message.proofAck = reader.bytes();
                    break;
                case 4:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseMsgChannelOpenConfirm);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
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
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.proofAck !== undefined &&
            (obj.proofAck = base64FromBytes(message.proofAck !== undefined ? message.proofAck : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = Object.assign({}, baseMsgChannelOpenConfirm);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.proofAck = (_c = object.proofAck) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.signer = (_d = object.signer) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
const baseMsgChannelOpenConfirmResponse = {};
exports.MsgChannelOpenConfirmResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenConfirmResponse);
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
        const message = Object.assign({}, baseMsgChannelOpenConfirmResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelOpenConfirmResponse);
        return message;
    },
};
const baseMsgChannelCloseInit = { portId: "", channelId: "", signer: "" };
exports.MsgChannelCloseInit = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelCloseInit);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.channelId = reader.string();
                    break;
                case 3:
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
        const message = Object.assign({}, baseMsgChannelCloseInit);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseMsgChannelCloseInit);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.signer = (_c = object.signer) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseMsgChannelCloseInitResponse = {};
exports.MsgChannelCloseInitResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelCloseInitResponse);
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
        const message = Object.assign({}, baseMsgChannelCloseInitResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelCloseInitResponse);
        return message;
    },
};
const baseMsgChannelCloseConfirm = { portId: "", channelId: "", signer: "" };
exports.MsgChannelCloseConfirm = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.proofInit.length !== 0) {
            writer.uint32(26).bytes(message.proofInit);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelCloseConfirm);
        message.proofInit = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.channelId = reader.string();
                    break;
                case 3:
                    message.proofInit = reader.bytes();
                    break;
                case 4:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseMsgChannelCloseConfirm);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.proofInit =
            object.proofInit !== undefined && object.proofInit !== null
                ? bytesFromBase64(object.proofInit)
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
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.proofInit !== undefined &&
            (obj.proofInit = base64FromBytes(message.proofInit !== undefined ? message.proofInit : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = Object.assign({}, baseMsgChannelCloseConfirm);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.proofInit = (_c = object.proofInit) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.signer = (_d = object.signer) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
const baseMsgChannelCloseConfirmResponse = {};
exports.MsgChannelCloseConfirmResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelCloseConfirmResponse);
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
        const message = Object.assign({}, baseMsgChannelCloseConfirmResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelCloseConfirmResponse);
        return message;
    },
};
const baseMsgRecvPacket = { signer: "" };
exports.MsgRecvPacket = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.packet !== undefined) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.proofCommitment.length !== 0) {
            writer.uint32(18).bytes(message.proofCommitment);
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
        const message = Object.assign({}, baseMsgRecvPacket);
        message.proofCommitment = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.packet = channel_1.Packet.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proofCommitment = reader.bytes();
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
        const message = Object.assign({}, baseMsgRecvPacket);
        message.packet =
            object.packet !== undefined && object.packet !== null ? channel_1.Packet.fromJSON(object.packet) : undefined;
        message.proofCommitment =
            object.proofCommitment !== undefined && object.proofCommitment !== null
                ? bytesFromBase64(object.proofCommitment)
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
        message.packet !== undefined && (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : undefined);
        message.proofCommitment !== undefined &&
            (obj.proofCommitment = base64FromBytes(message.proofCommitment !== undefined ? message.proofCommitment : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgRecvPacket);
        message.packet =
            object.packet !== undefined && object.packet !== null ? channel_1.Packet.fromPartial(object.packet) : undefined;
        message.proofCommitment = (_a = object.proofCommitment) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgRecvPacketResponse = {};
exports.MsgRecvPacketResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgRecvPacketResponse);
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
        const message = Object.assign({}, baseMsgRecvPacketResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgRecvPacketResponse);
        return message;
    },
};
const baseMsgTimeout = { nextSequenceRecv: long_1.default.UZERO, signer: "" };
exports.MsgTimeout = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.packet !== undefined) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.proofUnreceived.length !== 0) {
            writer.uint32(18).bytes(message.proofUnreceived);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        if (!message.nextSequenceRecv.isZero()) {
            writer.uint32(32).uint64(message.nextSequenceRecv);
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgTimeout);
        message.proofUnreceived = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.packet = channel_1.Packet.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proofUnreceived = reader.bytes();
                    break;
                case 3:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.nextSequenceRecv = reader.uint64();
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
        const message = Object.assign({}, baseMsgTimeout);
        message.packet =
            object.packet !== undefined && object.packet !== null ? channel_1.Packet.fromJSON(object.packet) : undefined;
        message.proofUnreceived =
            object.proofUnreceived !== undefined && object.proofUnreceived !== null
                ? bytesFromBase64(object.proofUnreceived)
                : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        message.nextSequenceRecv =
            object.nextSequenceRecv !== undefined && object.nextSequenceRecv !== null
                ? long_1.default.fromString(object.nextSequenceRecv)
                : long_1.default.UZERO;
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.packet !== undefined && (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : undefined);
        message.proofUnreceived !== undefined &&
            (obj.proofUnreceived = base64FromBytes(message.proofUnreceived !== undefined ? message.proofUnreceived : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.nextSequenceRecv !== undefined &&
            (obj.nextSequenceRecv = (message.nextSequenceRecv || long_1.default.UZERO).toString());
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgTimeout);
        message.packet =
            object.packet !== undefined && object.packet !== null ? channel_1.Packet.fromPartial(object.packet) : undefined;
        message.proofUnreceived = (_a = object.proofUnreceived) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.nextSequenceRecv =
            object.nextSequenceRecv !== undefined && object.nextSequenceRecv !== null
                ? long_1.default.fromValue(object.nextSequenceRecv)
                : long_1.default.UZERO;
        message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgTimeoutResponse = {};
exports.MsgTimeoutResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgTimeoutResponse);
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
        const message = Object.assign({}, baseMsgTimeoutResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgTimeoutResponse);
        return message;
    },
};
const baseMsgTimeoutOnClose = { nextSequenceRecv: long_1.default.UZERO, signer: "" };
exports.MsgTimeoutOnClose = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.packet !== undefined) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.proofUnreceived.length !== 0) {
            writer.uint32(18).bytes(message.proofUnreceived);
        }
        if (message.proofClose.length !== 0) {
            writer.uint32(26).bytes(message.proofClose);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        if (!message.nextSequenceRecv.isZero()) {
            writer.uint32(40).uint64(message.nextSequenceRecv);
        }
        if (message.signer !== "") {
            writer.uint32(50).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgTimeoutOnClose);
        message.proofUnreceived = new Uint8Array();
        message.proofClose = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.packet = channel_1.Packet.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proofUnreceived = reader.bytes();
                    break;
                case 3:
                    message.proofClose = reader.bytes();
                    break;
                case 4:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.nextSequenceRecv = reader.uint64();
                    break;
                case 6:
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
        const message = Object.assign({}, baseMsgTimeoutOnClose);
        message.packet =
            object.packet !== undefined && object.packet !== null ? channel_1.Packet.fromJSON(object.packet) : undefined;
        message.proofUnreceived =
            object.proofUnreceived !== undefined && object.proofUnreceived !== null
                ? bytesFromBase64(object.proofUnreceived)
                : new Uint8Array();
        message.proofClose =
            object.proofClose !== undefined && object.proofClose !== null
                ? bytesFromBase64(object.proofClose)
                : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        message.nextSequenceRecv =
            object.nextSequenceRecv !== undefined && object.nextSequenceRecv !== null
                ? long_1.default.fromString(object.nextSequenceRecv)
                : long_1.default.UZERO;
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.packet !== undefined && (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : undefined);
        message.proofUnreceived !== undefined &&
            (obj.proofUnreceived = base64FromBytes(message.proofUnreceived !== undefined ? message.proofUnreceived : new Uint8Array()));
        message.proofClose !== undefined &&
            (obj.proofClose = base64FromBytes(message.proofClose !== undefined ? message.proofClose : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.nextSequenceRecv !== undefined &&
            (obj.nextSequenceRecv = (message.nextSequenceRecv || long_1.default.UZERO).toString());
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseMsgTimeoutOnClose);
        message.packet =
            object.packet !== undefined && object.packet !== null ? channel_1.Packet.fromPartial(object.packet) : undefined;
        message.proofUnreceived = (_a = object.proofUnreceived) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proofClose = (_b = object.proofClose) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.nextSequenceRecv =
            object.nextSequenceRecv !== undefined && object.nextSequenceRecv !== null
                ? long_1.default.fromValue(object.nextSequenceRecv)
                : long_1.default.UZERO;
        message.signer = (_c = object.signer) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseMsgTimeoutOnCloseResponse = {};
exports.MsgTimeoutOnCloseResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgTimeoutOnCloseResponse);
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
        const message = Object.assign({}, baseMsgTimeoutOnCloseResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgTimeoutOnCloseResponse);
        return message;
    },
};
const baseMsgAcknowledgement = { signer: "" };
exports.MsgAcknowledgement = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.packet !== undefined) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.acknowledgement.length !== 0) {
            writer.uint32(18).bytes(message.acknowledgement);
        }
        if (message.proofAcked.length !== 0) {
            writer.uint32(26).bytes(message.proofAcked);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgAcknowledgement);
        message.acknowledgement = new Uint8Array();
        message.proofAcked = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.packet = channel_1.Packet.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.acknowledgement = reader.bytes();
                    break;
                case 3:
                    message.proofAcked = reader.bytes();
                    break;
                case 4:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseMsgAcknowledgement);
        message.packet =
            object.packet !== undefined && object.packet !== null ? channel_1.Packet.fromJSON(object.packet) : undefined;
        message.acknowledgement =
            object.acknowledgement !== undefined && object.acknowledgement !== null
                ? bytesFromBase64(object.acknowledgement)
                : new Uint8Array();
        message.proofAcked =
            object.proofAcked !== undefined && object.proofAcked !== null
                ? bytesFromBase64(object.proofAcked)
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
        message.packet !== undefined && (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : undefined);
        message.acknowledgement !== undefined &&
            (obj.acknowledgement = base64FromBytes(message.acknowledgement !== undefined ? message.acknowledgement : new Uint8Array()));
        message.proofAcked !== undefined &&
            (obj.proofAcked = base64FromBytes(message.proofAcked !== undefined ? message.proofAcked : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseMsgAcknowledgement);
        message.packet =
            object.packet !== undefined && object.packet !== null ? channel_1.Packet.fromPartial(object.packet) : undefined;
        message.acknowledgement = (_a = object.acknowledgement) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proofAcked = (_b = object.proofAcked) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        message.signer = (_c = object.signer) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseMsgAcknowledgementResponse = {};
exports.MsgAcknowledgementResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgAcknowledgementResponse);
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
        const message = Object.assign({}, baseMsgAcknowledgementResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgAcknowledgementResponse);
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.ChannelOpenInit = this.ChannelOpenInit.bind(this);
        this.ChannelOpenTry = this.ChannelOpenTry.bind(this);
        this.ChannelOpenAck = this.ChannelOpenAck.bind(this);
        this.ChannelOpenConfirm = this.ChannelOpenConfirm.bind(this);
        this.ChannelCloseInit = this.ChannelCloseInit.bind(this);
        this.ChannelCloseConfirm = this.ChannelCloseConfirm.bind(this);
        this.RecvPacket = this.RecvPacket.bind(this);
        this.Timeout = this.Timeout.bind(this);
        this.TimeoutOnClose = this.TimeoutOnClose.bind(this);
        this.Acknowledgement = this.Acknowledgement.bind(this);
    }
    ChannelOpenInit(request) {
        const data = exports.MsgChannelOpenInit.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenInit", data);
        return promise.then((data) => exports.MsgChannelOpenInitResponse.decode(new minimal_1.default.Reader(data)));
    }
    ChannelOpenTry(request) {
        const data = exports.MsgChannelOpenTry.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenTry", data);
        return promise.then((data) => exports.MsgChannelOpenTryResponse.decode(new minimal_1.default.Reader(data)));
    }
    ChannelOpenAck(request) {
        const data = exports.MsgChannelOpenAck.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenAck", data);
        return promise.then((data) => exports.MsgChannelOpenAckResponse.decode(new minimal_1.default.Reader(data)));
    }
    ChannelOpenConfirm(request) {
        const data = exports.MsgChannelOpenConfirm.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenConfirm", data);
        return promise.then((data) => exports.MsgChannelOpenConfirmResponse.decode(new minimal_1.default.Reader(data)));
    }
    ChannelCloseInit(request) {
        const data = exports.MsgChannelCloseInit.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelCloseInit", data);
        return promise.then((data) => exports.MsgChannelCloseInitResponse.decode(new minimal_1.default.Reader(data)));
    }
    ChannelCloseConfirm(request) {
        const data = exports.MsgChannelCloseConfirm.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelCloseConfirm", data);
        return promise.then((data) => exports.MsgChannelCloseConfirmResponse.decode(new minimal_1.default.Reader(data)));
    }
    RecvPacket(request) {
        const data = exports.MsgRecvPacket.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "RecvPacket", data);
        return promise.then((data) => exports.MsgRecvPacketResponse.decode(new minimal_1.default.Reader(data)));
    }
    Timeout(request) {
        const data = exports.MsgTimeout.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "Timeout", data);
        return promise.then((data) => exports.MsgTimeoutResponse.decode(new minimal_1.default.Reader(data)));
    }
    TimeoutOnClose(request) {
        const data = exports.MsgTimeoutOnClose.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "TimeoutOnClose", data);
        return promise.then((data) => exports.MsgTimeoutOnCloseResponse.decode(new minimal_1.default.Reader(data)));
    }
    Acknowledgement(request) {
        const data = exports.MsgAcknowledgement.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "Acknowledgement", data);
        return promise.then((data) => exports.MsgAcknowledgementResponse.decode(new minimal_1.default.Reader(data)));
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