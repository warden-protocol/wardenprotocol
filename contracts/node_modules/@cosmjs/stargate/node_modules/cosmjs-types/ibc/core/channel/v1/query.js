"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryNextSequenceReceiveResponse = exports.QueryNextSequenceReceiveRequest = exports.QueryUnreceivedAcksResponse = exports.QueryUnreceivedAcksRequest = exports.QueryUnreceivedPacketsResponse = exports.QueryUnreceivedPacketsRequest = exports.QueryPacketAcknowledgementsResponse = exports.QueryPacketAcknowledgementsRequest = exports.QueryPacketAcknowledgementResponse = exports.QueryPacketAcknowledgementRequest = exports.QueryPacketReceiptResponse = exports.QueryPacketReceiptRequest = exports.QueryPacketCommitmentsResponse = exports.QueryPacketCommitmentsRequest = exports.QueryPacketCommitmentResponse = exports.QueryPacketCommitmentRequest = exports.QueryChannelConsensusStateResponse = exports.QueryChannelConsensusStateRequest = exports.QueryChannelClientStateResponse = exports.QueryChannelClientStateRequest = exports.QueryConnectionChannelsResponse = exports.QueryConnectionChannelsRequest = exports.QueryChannelsResponse = exports.QueryChannelsRequest = exports.QueryChannelResponse = exports.QueryChannelRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const channel_1 = require("../../../../ibc/core/channel/v1/channel");
const client_1 = require("../../../../ibc/core/client/v1/client");
const pagination_1 = require("../../../../cosmos/base/query/v1beta1/pagination");
const any_1 = require("../../../../google/protobuf/any");
exports.protobufPackage = "ibc.core.channel.v1";
const baseQueryChannelRequest = { portId: "", channelId: "" };
exports.QueryChannelRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.channelId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryChannelRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseQueryChannelResponse = {};
exports.QueryChannelResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.channel !== undefined) {
            channel_1.Channel.encode(message.channel, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelResponse);
        message.proof = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channel = channel_1.Channel.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelResponse);
        message.channel =
            object.channel !== undefined && object.channel !== null ? channel_1.Channel.fromJSON(object.channel) : undefined;
        message.proof =
            object.proof !== undefined && object.proof !== null ? bytesFromBase64(object.proof) : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.channel !== undefined &&
            (obj.channel = message.channel ? channel_1.Channel.toJSON(message.channel) : undefined);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryChannelResponse);
        message.channel =
            object.channel !== undefined && object.channel !== null
                ? channel_1.Channel.fromPartial(object.channel)
                : undefined;
        message.proof = (_a = object.proof) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        return message;
    },
};
const baseQueryChannelsRequest = {};
exports.QueryChannelsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelsRequest);
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryChannelsRequest);
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryChannelsResponse = {};
exports.QueryChannelsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.channels) {
            channel_1.IdentifiedChannel.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelsResponse);
        message.channels = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channels.push(channel_1.IdentifiedChannel.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.height = client_1.Height.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseQueryChannelsResponse);
        message.channels = ((_a = object.channels) !== null && _a !== void 0 ? _a : []).map((e) => channel_1.IdentifiedChannel.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromJSON(object.height) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.channels) {
            obj.channels = message.channels.map((e) => (e ? channel_1.IdentifiedChannel.toJSON(e) : undefined));
        }
        else {
            obj.channels = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        message.height !== undefined && (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryChannelsResponse);
        message.channels = ((_a = object.channels) === null || _a === void 0 ? void 0 : _a.map((e) => channel_1.IdentifiedChannel.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromPartial(object.height) : undefined;
        return message;
    },
};
const baseQueryConnectionChannelsRequest = { connection: "" };
exports.QueryConnectionChannelsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.connection !== "") {
            writer.uint32(10).string(message.connection);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryConnectionChannelsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.connection = reader.string();
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryConnectionChannelsRequest);
        message.connection =
            object.connection !== undefined && object.connection !== null ? String(object.connection) : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.connection !== undefined && (obj.connection = message.connection);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryConnectionChannelsRequest);
        message.connection = (_a = object.connection) !== null && _a !== void 0 ? _a : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryConnectionChannelsResponse = {};
exports.QueryConnectionChannelsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.channels) {
            channel_1.IdentifiedChannel.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryConnectionChannelsResponse);
        message.channels = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channels.push(channel_1.IdentifiedChannel.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.height = client_1.Height.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseQueryConnectionChannelsResponse);
        message.channels = ((_a = object.channels) !== null && _a !== void 0 ? _a : []).map((e) => channel_1.IdentifiedChannel.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromJSON(object.height) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.channels) {
            obj.channels = message.channels.map((e) => (e ? channel_1.IdentifiedChannel.toJSON(e) : undefined));
        }
        else {
            obj.channels = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        message.height !== undefined && (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryConnectionChannelsResponse);
        message.channels = ((_a = object.channels) === null || _a === void 0 ? void 0 : _a.map((e) => channel_1.IdentifiedChannel.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromPartial(object.height) : undefined;
        return message;
    },
};
const baseQueryChannelClientStateRequest = { portId: "", channelId: "" };
exports.QueryChannelClientStateRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelClientStateRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.channelId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelClientStateRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryChannelClientStateRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseQueryChannelClientStateResponse = {};
exports.QueryChannelClientStateResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.identifiedClientState !== undefined) {
            client_1.IdentifiedClientState.encode(message.identifiedClientState, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelClientStateResponse);
        message.proof = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identifiedClientState = client_1.IdentifiedClientState.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelClientStateResponse);
        message.identifiedClientState =
            object.identifiedClientState !== undefined && object.identifiedClientState !== null
                ? client_1.IdentifiedClientState.fromJSON(object.identifiedClientState)
                : undefined;
        message.proof =
            object.proof !== undefined && object.proof !== null ? bytesFromBase64(object.proof) : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.identifiedClientState !== undefined &&
            (obj.identifiedClientState = message.identifiedClientState
                ? client_1.IdentifiedClientState.toJSON(message.identifiedClientState)
                : undefined);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryChannelClientStateResponse);
        message.identifiedClientState =
            object.identifiedClientState !== undefined && object.identifiedClientState !== null
                ? client_1.IdentifiedClientState.fromPartial(object.identifiedClientState)
                : undefined;
        message.proof = (_a = object.proof) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        return message;
    },
};
const baseQueryChannelConsensusStateRequest = {
    portId: "",
    channelId: "",
    revisionNumber: long_1.default.UZERO,
    revisionHeight: long_1.default.UZERO,
};
exports.QueryChannelConsensusStateRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (!message.revisionNumber.isZero()) {
            writer.uint32(24).uint64(message.revisionNumber);
        }
        if (!message.revisionHeight.isZero()) {
            writer.uint32(32).uint64(message.revisionHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelConsensusStateRequest);
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
                    message.revisionNumber = reader.uint64();
                    break;
                case 4:
                    message.revisionHeight = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelConsensusStateRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.revisionNumber =
            object.revisionNumber !== undefined && object.revisionNumber !== null
                ? long_1.default.fromString(object.revisionNumber)
                : long_1.default.UZERO;
        message.revisionHeight =
            object.revisionHeight !== undefined && object.revisionHeight !== null
                ? long_1.default.fromString(object.revisionHeight)
                : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.revisionNumber !== undefined &&
            (obj.revisionNumber = (message.revisionNumber || long_1.default.UZERO).toString());
        message.revisionHeight !== undefined &&
            (obj.revisionHeight = (message.revisionHeight || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryChannelConsensusStateRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.revisionNumber =
            object.revisionNumber !== undefined && object.revisionNumber !== null
                ? long_1.default.fromValue(object.revisionNumber)
                : long_1.default.UZERO;
        message.revisionHeight =
            object.revisionHeight !== undefined && object.revisionHeight !== null
                ? long_1.default.fromValue(object.revisionHeight)
                : long_1.default.UZERO;
        return message;
    },
};
const baseQueryChannelConsensusStateResponse = { clientId: "" };
exports.QueryChannelConsensusStateResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.consensusState !== undefined) {
            any_1.Any.encode(message.consensusState, writer.uint32(10).fork()).ldelim();
        }
        if (message.clientId !== "") {
            writer.uint32(18).string(message.clientId);
        }
        if (message.proof.length !== 0) {
            writer.uint32(26).bytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelConsensusStateResponse);
        message.proof = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.consensusState = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.clientId = reader.string();
                    break;
                case 3:
                    message.proof = reader.bytes();
                    break;
                case 4:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelConsensusStateResponse);
        message.consensusState =
            object.consensusState !== undefined && object.consensusState !== null
                ? any_1.Any.fromJSON(object.consensusState)
                : undefined;
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.proof =
            object.proof !== undefined && object.proof !== null ? bytesFromBase64(object.proof) : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.consensusState !== undefined &&
            (obj.consensusState = message.consensusState ? any_1.Any.toJSON(message.consensusState) : undefined);
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryChannelConsensusStateResponse);
        message.consensusState =
            object.consensusState !== undefined && object.consensusState !== null
                ? any_1.Any.fromPartial(object.consensusState)
                : undefined;
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.proof = (_b = object.proof) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        return message;
    },
};
const baseQueryPacketCommitmentRequest = { portId: "", channelId: "", sequence: long_1.default.UZERO };
exports.QueryPacketCommitmentRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (!message.sequence.isZero()) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketCommitmentRequest);
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
                    message.sequence = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketCommitmentRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.sequence =
            object.sequence !== undefined && object.sequence !== null
                ? long_1.default.fromString(object.sequence)
                : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.sequence !== undefined && (obj.sequence = (message.sequence || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryPacketCommitmentRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.sequence =
            object.sequence !== undefined && object.sequence !== null
                ? long_1.default.fromValue(object.sequence)
                : long_1.default.UZERO;
        return message;
    },
};
const baseQueryPacketCommitmentResponse = {};
exports.QueryPacketCommitmentResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.commitment.length !== 0) {
            writer.uint32(10).bytes(message.commitment);
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketCommitmentResponse);
        message.commitment = new Uint8Array();
        message.proof = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.commitment = reader.bytes();
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketCommitmentResponse);
        message.commitment =
            object.commitment !== undefined && object.commitment !== null
                ? bytesFromBase64(object.commitment)
                : new Uint8Array();
        message.proof =
            object.proof !== undefined && object.proof !== null ? bytesFromBase64(object.proof) : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.commitment !== undefined &&
            (obj.commitment = base64FromBytes(message.commitment !== undefined ? message.commitment : new Uint8Array()));
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryPacketCommitmentResponse);
        message.commitment = (_a = object.commitment) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proof = (_b = object.proof) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        return message;
    },
};
const baseQueryPacketCommitmentsRequest = { portId: "", channelId: "" };
exports.QueryPacketCommitmentsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketCommitmentsRequest);
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
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketCommitmentsRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryPacketCommitmentsRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryPacketCommitmentsResponse = {};
exports.QueryPacketCommitmentsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.commitments) {
            channel_1.PacketState.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketCommitmentsResponse);
        message.commitments = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.commitments.push(channel_1.PacketState.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.height = client_1.Height.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseQueryPacketCommitmentsResponse);
        message.commitments = ((_a = object.commitments) !== null && _a !== void 0 ? _a : []).map((e) => channel_1.PacketState.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromJSON(object.height) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.commitments) {
            obj.commitments = message.commitments.map((e) => (e ? channel_1.PacketState.toJSON(e) : undefined));
        }
        else {
            obj.commitments = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        message.height !== undefined && (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryPacketCommitmentsResponse);
        message.commitments = ((_a = object.commitments) === null || _a === void 0 ? void 0 : _a.map((e) => channel_1.PacketState.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromPartial(object.height) : undefined;
        return message;
    },
};
const baseQueryPacketReceiptRequest = { portId: "", channelId: "", sequence: long_1.default.UZERO };
exports.QueryPacketReceiptRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (!message.sequence.isZero()) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketReceiptRequest);
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
                    message.sequence = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketReceiptRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.sequence =
            object.sequence !== undefined && object.sequence !== null
                ? long_1.default.fromString(object.sequence)
                : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.sequence !== undefined && (obj.sequence = (message.sequence || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryPacketReceiptRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.sequence =
            object.sequence !== undefined && object.sequence !== null
                ? long_1.default.fromValue(object.sequence)
                : long_1.default.UZERO;
        return message;
    },
};
const baseQueryPacketReceiptResponse = { received: false };
exports.QueryPacketReceiptResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.received === true) {
            writer.uint32(16).bool(message.received);
        }
        if (message.proof.length !== 0) {
            writer.uint32(26).bytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketReceiptResponse);
        message.proof = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    message.received = reader.bool();
                    break;
                case 3:
                    message.proof = reader.bytes();
                    break;
                case 4:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketReceiptResponse);
        message.received =
            object.received !== undefined && object.received !== null ? Boolean(object.received) : false;
        message.proof =
            object.proof !== undefined && object.proof !== null ? bytesFromBase64(object.proof) : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.received !== undefined && (obj.received = message.received);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryPacketReceiptResponse);
        message.received = (_a = object.received) !== null && _a !== void 0 ? _a : false;
        message.proof = (_b = object.proof) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        return message;
    },
};
const baseQueryPacketAcknowledgementRequest = { portId: "", channelId: "", sequence: long_1.default.UZERO };
exports.QueryPacketAcknowledgementRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (!message.sequence.isZero()) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketAcknowledgementRequest);
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
                    message.sequence = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketAcknowledgementRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.sequence =
            object.sequence !== undefined && object.sequence !== null
                ? long_1.default.fromString(object.sequence)
                : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.sequence !== undefined && (obj.sequence = (message.sequence || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryPacketAcknowledgementRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.sequence =
            object.sequence !== undefined && object.sequence !== null
                ? long_1.default.fromValue(object.sequence)
                : long_1.default.UZERO;
        return message;
    },
};
const baseQueryPacketAcknowledgementResponse = {};
exports.QueryPacketAcknowledgementResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.acknowledgement.length !== 0) {
            writer.uint32(10).bytes(message.acknowledgement);
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketAcknowledgementResponse);
        message.acknowledgement = new Uint8Array();
        message.proof = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.acknowledgement = reader.bytes();
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketAcknowledgementResponse);
        message.acknowledgement =
            object.acknowledgement !== undefined && object.acknowledgement !== null
                ? bytesFromBase64(object.acknowledgement)
                : new Uint8Array();
        message.proof =
            object.proof !== undefined && object.proof !== null ? bytesFromBase64(object.proof) : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.acknowledgement !== undefined &&
            (obj.acknowledgement = base64FromBytes(message.acknowledgement !== undefined ? message.acknowledgement : new Uint8Array()));
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryPacketAcknowledgementResponse);
        message.acknowledgement = (_a = object.acknowledgement) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proof = (_b = object.proof) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        return message;
    },
};
const baseQueryPacketAcknowledgementsRequest = { portId: "", channelId: "" };
exports.QueryPacketAcknowledgementsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketAcknowledgementsRequest);
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
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketAcknowledgementsRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryPacketAcknowledgementsRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryPacketAcknowledgementsResponse = {};
exports.QueryPacketAcknowledgementsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.acknowledgements) {
            channel_1.PacketState.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketAcknowledgementsResponse);
        message.acknowledgements = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.acknowledgements.push(channel_1.PacketState.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.height = client_1.Height.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseQueryPacketAcknowledgementsResponse);
        message.acknowledgements = ((_a = object.acknowledgements) !== null && _a !== void 0 ? _a : []).map((e) => channel_1.PacketState.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromJSON(object.height) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.acknowledgements) {
            obj.acknowledgements = message.acknowledgements.map((e) => (e ? channel_1.PacketState.toJSON(e) : undefined));
        }
        else {
            obj.acknowledgements = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        message.height !== undefined && (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryPacketAcknowledgementsResponse);
        message.acknowledgements = ((_a = object.acknowledgements) === null || _a === void 0 ? void 0 : _a.map((e) => channel_1.PacketState.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromPartial(object.height) : undefined;
        return message;
    },
};
const baseQueryUnreceivedPacketsRequest = {
    portId: "",
    channelId: "",
    packetCommitmentSequences: long_1.default.UZERO,
};
exports.QueryUnreceivedPacketsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        writer.uint32(26).fork();
        for (const v of message.packetCommitmentSequences) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryUnreceivedPacketsRequest);
        message.packetCommitmentSequences = [];
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
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.packetCommitmentSequences.push(reader.uint64());
                        }
                    }
                    else {
                        message.packetCommitmentSequences.push(reader.uint64());
                    }
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
        const message = Object.assign({}, baseQueryUnreceivedPacketsRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.packetCommitmentSequences = ((_a = object.packetCommitmentSequences) !== null && _a !== void 0 ? _a : []).map((e) => long_1.default.fromString(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        if (message.packetCommitmentSequences) {
            obj.packetCommitmentSequences = message.packetCommitmentSequences.map((e) => (e || long_1.default.UZERO).toString());
        }
        else {
            obj.packetCommitmentSequences = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseQueryUnreceivedPacketsRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.packetCommitmentSequences = ((_c = object.packetCommitmentSequences) === null || _c === void 0 ? void 0 : _c.map((e) => long_1.default.fromValue(e))) || [];
        return message;
    },
};
const baseQueryUnreceivedPacketsResponse = { sequences: long_1.default.UZERO };
exports.QueryUnreceivedPacketsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.sequences) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryUnreceivedPacketsResponse);
        message.sequences = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.sequences.push(reader.uint64());
                        }
                    }
                    else {
                        message.sequences.push(reader.uint64());
                    }
                    break;
                case 2:
                    message.height = client_1.Height.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseQueryUnreceivedPacketsResponse);
        message.sequences = ((_a = object.sequences) !== null && _a !== void 0 ? _a : []).map((e) => long_1.default.fromString(e));
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromJSON(object.height) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.sequences) {
            obj.sequences = message.sequences.map((e) => (e || long_1.default.UZERO).toString());
        }
        else {
            obj.sequences = [];
        }
        message.height !== undefined && (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryUnreceivedPacketsResponse);
        message.sequences = ((_a = object.sequences) === null || _a === void 0 ? void 0 : _a.map((e) => long_1.default.fromValue(e))) || [];
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromPartial(object.height) : undefined;
        return message;
    },
};
const baseQueryUnreceivedAcksRequest = { portId: "", channelId: "", packetAckSequences: long_1.default.UZERO };
exports.QueryUnreceivedAcksRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        writer.uint32(26).fork();
        for (const v of message.packetAckSequences) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryUnreceivedAcksRequest);
        message.packetAckSequences = [];
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
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.packetAckSequences.push(reader.uint64());
                        }
                    }
                    else {
                        message.packetAckSequences.push(reader.uint64());
                    }
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
        const message = Object.assign({}, baseQueryUnreceivedAcksRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        message.packetAckSequences = ((_a = object.packetAckSequences) !== null && _a !== void 0 ? _a : []).map((e) => long_1.default.fromString(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        if (message.packetAckSequences) {
            obj.packetAckSequences = message.packetAckSequences.map((e) => (e || long_1.default.UZERO).toString());
        }
        else {
            obj.packetAckSequences = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseQueryUnreceivedAcksRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        message.packetAckSequences = ((_c = object.packetAckSequences) === null || _c === void 0 ? void 0 : _c.map((e) => long_1.default.fromValue(e))) || [];
        return message;
    },
};
const baseQueryUnreceivedAcksResponse = { sequences: long_1.default.UZERO };
exports.QueryUnreceivedAcksResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.sequences) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryUnreceivedAcksResponse);
        message.sequences = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.sequences.push(reader.uint64());
                        }
                    }
                    else {
                        message.sequences.push(reader.uint64());
                    }
                    break;
                case 2:
                    message.height = client_1.Height.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseQueryUnreceivedAcksResponse);
        message.sequences = ((_a = object.sequences) !== null && _a !== void 0 ? _a : []).map((e) => long_1.default.fromString(e));
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromJSON(object.height) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.sequences) {
            obj.sequences = message.sequences.map((e) => (e || long_1.default.UZERO).toString());
        }
        else {
            obj.sequences = [];
        }
        message.height !== undefined && (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryUnreceivedAcksResponse);
        message.sequences = ((_a = object.sequences) === null || _a === void 0 ? void 0 : _a.map((e) => long_1.default.fromValue(e))) || [];
        message.height =
            object.height !== undefined && object.height !== null ? client_1.Height.fromPartial(object.height) : undefined;
        return message;
    },
};
const baseQueryNextSequenceReceiveRequest = { portId: "", channelId: "" };
exports.QueryNextSequenceReceiveRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryNextSequenceReceiveRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.channelId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryNextSequenceReceiveRequest);
        message.portId = object.portId !== undefined && object.portId !== null ? String(object.portId) : "";
        message.channelId =
            object.channelId !== undefined && object.channelId !== null ? String(object.channelId) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.portId !== undefined && (obj.portId = message.portId);
        message.channelId !== undefined && (obj.channelId = message.channelId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryNextSequenceReceiveRequest);
        message.portId = (_a = object.portId) !== null && _a !== void 0 ? _a : "";
        message.channelId = (_b = object.channelId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseQueryNextSequenceReceiveResponse = { nextSequenceReceive: long_1.default.UZERO };
exports.QueryNextSequenceReceiveResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.nextSequenceReceive.isZero()) {
            writer.uint32(8).uint64(message.nextSequenceReceive);
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proofHeight !== undefined) {
            client_1.Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryNextSequenceReceiveResponse);
        message.proof = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nextSequenceReceive = reader.uint64();
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proofHeight = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryNextSequenceReceiveResponse);
        message.nextSequenceReceive =
            object.nextSequenceReceive !== undefined && object.nextSequenceReceive !== null
                ? long_1.default.fromString(object.nextSequenceReceive)
                : long_1.default.UZERO;
        message.proof =
            object.proof !== undefined && object.proof !== null ? bytesFromBase64(object.proof) : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromJSON(object.proofHeight)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.nextSequenceReceive !== undefined &&
            (obj.nextSequenceReceive = (message.nextSequenceReceive || long_1.default.UZERO).toString());
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryNextSequenceReceiveResponse);
        message.nextSequenceReceive =
            object.nextSequenceReceive !== undefined && object.nextSequenceReceive !== null
                ? long_1.default.fromValue(object.nextSequenceReceive)
                : long_1.default.UZERO;
        message.proof = (_a = object.proof) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Channel = this.Channel.bind(this);
        this.Channels = this.Channels.bind(this);
        this.ConnectionChannels = this.ConnectionChannels.bind(this);
        this.ChannelClientState = this.ChannelClientState.bind(this);
        this.ChannelConsensusState = this.ChannelConsensusState.bind(this);
        this.PacketCommitment = this.PacketCommitment.bind(this);
        this.PacketCommitments = this.PacketCommitments.bind(this);
        this.PacketReceipt = this.PacketReceipt.bind(this);
        this.PacketAcknowledgement = this.PacketAcknowledgement.bind(this);
        this.PacketAcknowledgements = this.PacketAcknowledgements.bind(this);
        this.UnreceivedPackets = this.UnreceivedPackets.bind(this);
        this.UnreceivedAcks = this.UnreceivedAcks.bind(this);
        this.NextSequenceReceive = this.NextSequenceReceive.bind(this);
    }
    Channel(request) {
        const data = exports.QueryChannelRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channel", data);
        return promise.then((data) => exports.QueryChannelResponse.decode(new minimal_1.default.Reader(data)));
    }
    Channels(request) {
        const data = exports.QueryChannelsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channels", data);
        return promise.then((data) => exports.QueryChannelsResponse.decode(new minimal_1.default.Reader(data)));
    }
    ConnectionChannels(request) {
        const data = exports.QueryConnectionChannelsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "ConnectionChannels", data);
        return promise.then((data) => exports.QueryConnectionChannelsResponse.decode(new minimal_1.default.Reader(data)));
    }
    ChannelClientState(request) {
        const data = exports.QueryChannelClientStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelClientState", data);
        return promise.then((data) => exports.QueryChannelClientStateResponse.decode(new minimal_1.default.Reader(data)));
    }
    ChannelConsensusState(request) {
        const data = exports.QueryChannelConsensusStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelConsensusState", data);
        return promise.then((data) => exports.QueryChannelConsensusStateResponse.decode(new minimal_1.default.Reader(data)));
    }
    PacketCommitment(request) {
        const data = exports.QueryPacketCommitmentRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitment", data);
        return promise.then((data) => exports.QueryPacketCommitmentResponse.decode(new minimal_1.default.Reader(data)));
    }
    PacketCommitments(request) {
        const data = exports.QueryPacketCommitmentsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitments", data);
        return promise.then((data) => exports.QueryPacketCommitmentsResponse.decode(new minimal_1.default.Reader(data)));
    }
    PacketReceipt(request) {
        const data = exports.QueryPacketReceiptRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketReceipt", data);
        return promise.then((data) => exports.QueryPacketReceiptResponse.decode(new minimal_1.default.Reader(data)));
    }
    PacketAcknowledgement(request) {
        const data = exports.QueryPacketAcknowledgementRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgement", data);
        return promise.then((data) => exports.QueryPacketAcknowledgementResponse.decode(new minimal_1.default.Reader(data)));
    }
    PacketAcknowledgements(request) {
        const data = exports.QueryPacketAcknowledgementsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgements", data);
        return promise.then((data) => exports.QueryPacketAcknowledgementsResponse.decode(new minimal_1.default.Reader(data)));
    }
    UnreceivedPackets(request) {
        const data = exports.QueryUnreceivedPacketsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedPackets", data);
        return promise.then((data) => exports.QueryUnreceivedPacketsResponse.decode(new minimal_1.default.Reader(data)));
    }
    UnreceivedAcks(request) {
        const data = exports.QueryUnreceivedAcksRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedAcks", data);
        return promise.then((data) => exports.QueryUnreceivedAcksResponse.decode(new minimal_1.default.Reader(data)));
    }
    NextSequenceReceive(request) {
        const data = exports.QueryNextSequenceReceiveRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "NextSequenceReceive", data);
        return promise.then((data) => exports.QueryNextSequenceReceiveResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
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
//# sourceMappingURL=query.js.map