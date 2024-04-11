/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Height } from "../../client/v1/client";
import { Channel, Packet, Params, stateFromJSON, stateToJSON } from "./channel";
import { ErrorReceipt, Upgrade, UpgradeFields } from "./upgrade";
export const protobufPackage = "ibc.core.channel.v1";
/** ResponseResultType defines the possible outcomes of the execution of a message */
export var ResponseResultType;
(function (ResponseResultType) {
    /** RESPONSE_RESULT_TYPE_UNSPECIFIED - Default zero value enumeration */
    ResponseResultType[ResponseResultType["RESPONSE_RESULT_TYPE_UNSPECIFIED"] = 0] = "RESPONSE_RESULT_TYPE_UNSPECIFIED";
    /** RESPONSE_RESULT_TYPE_NOOP - The message did not call the IBC application callbacks (because, for example, the packet had already been relayed) */
    ResponseResultType[ResponseResultType["RESPONSE_RESULT_TYPE_NOOP"] = 1] = "RESPONSE_RESULT_TYPE_NOOP";
    /** RESPONSE_RESULT_TYPE_SUCCESS - The message was executed successfully */
    ResponseResultType[ResponseResultType["RESPONSE_RESULT_TYPE_SUCCESS"] = 2] = "RESPONSE_RESULT_TYPE_SUCCESS";
    /** RESPONSE_RESULT_TYPE_FAILURE - The message was executed unsuccessfully */
    ResponseResultType[ResponseResultType["RESPONSE_RESULT_TYPE_FAILURE"] = 3] = "RESPONSE_RESULT_TYPE_FAILURE";
    ResponseResultType[ResponseResultType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(ResponseResultType || (ResponseResultType = {}));
export function responseResultTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "RESPONSE_RESULT_TYPE_UNSPECIFIED":
            return ResponseResultType.RESPONSE_RESULT_TYPE_UNSPECIFIED;
        case 1:
        case "RESPONSE_RESULT_TYPE_NOOP":
            return ResponseResultType.RESPONSE_RESULT_TYPE_NOOP;
        case 2:
        case "RESPONSE_RESULT_TYPE_SUCCESS":
            return ResponseResultType.RESPONSE_RESULT_TYPE_SUCCESS;
        case 3:
        case "RESPONSE_RESULT_TYPE_FAILURE":
            return ResponseResultType.RESPONSE_RESULT_TYPE_FAILURE;
        case -1:
        case "UNRECOGNIZED":
        default:
            return ResponseResultType.UNRECOGNIZED;
    }
}
export function responseResultTypeToJSON(object) {
    switch (object) {
        case ResponseResultType.RESPONSE_RESULT_TYPE_UNSPECIFIED:
            return "RESPONSE_RESULT_TYPE_UNSPECIFIED";
        case ResponseResultType.RESPONSE_RESULT_TYPE_NOOP:
            return "RESPONSE_RESULT_TYPE_NOOP";
        case ResponseResultType.RESPONSE_RESULT_TYPE_SUCCESS:
            return "RESPONSE_RESULT_TYPE_SUCCESS";
        case ResponseResultType.RESPONSE_RESULT_TYPE_FAILURE:
            return "RESPONSE_RESULT_TYPE_FAILURE";
        case ResponseResultType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseMsgChannelOpenInit() {
    return { portId: "", channel: undefined, signer: "" };
}
export const MsgChannelOpenInit = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channel !== undefined) {
            Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelOpenInit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channel = Channel.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channel !== undefined) {
            obj.channel = Channel.toJSON(message.channel);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelOpenInit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelOpenInit();
        message.portId = object.portId ?? "";
        message.channel = (object.channel !== undefined && object.channel !== null)
            ? Channel.fromPartial(object.channel)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelOpenInitResponse() {
    return { channelId: "", version: "" };
}
export const MsgChannelOpenInitResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.channelId !== "") {
            writer.uint32(10).string(message.channelId);
        }
        if (message.version !== "") {
            writer.uint32(18).string(message.version);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelOpenInitResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.version = reader.string();
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
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            version: isSet(object.version) ? String(object.version) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.version !== "") {
            obj.version = message.version;
        }
        return obj;
    },
    create(base) {
        return MsgChannelOpenInitResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelOpenInitResponse();
        message.channelId = object.channelId ?? "";
        message.version = object.version ?? "";
        return message;
    },
};
function createBaseMsgChannelOpenTry() {
    return {
        portId: "",
        previousChannelId: "",
        channel: undefined,
        counterpartyVersion: "",
        proofInit: new Uint8Array(0),
        proofHeight: undefined,
        signer: "",
    };
}
export const MsgChannelOpenTry = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.previousChannelId !== "") {
            writer.uint32(18).string(message.previousChannelId);
        }
        if (message.channel !== undefined) {
            Channel.encode(message.channel, writer.uint32(26).fork()).ldelim();
        }
        if (message.counterpartyVersion !== "") {
            writer.uint32(34).string(message.counterpartyVersion);
        }
        if (message.proofInit.length !== 0) {
            writer.uint32(42).bytes(message.proofInit);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(58).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelOpenTry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.previousChannelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.channel = Channel.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.counterpartyVersion = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.proofInit = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            previousChannelId: isSet(object.previousChannelId) ? String(object.previousChannelId) : "",
            channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined,
            counterpartyVersion: isSet(object.counterpartyVersion) ? String(object.counterpartyVersion) : "",
            proofInit: isSet(object.proofInit) ? bytesFromBase64(object.proofInit) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.previousChannelId !== "") {
            obj.previousChannelId = message.previousChannelId;
        }
        if (message.channel !== undefined) {
            obj.channel = Channel.toJSON(message.channel);
        }
        if (message.counterpartyVersion !== "") {
            obj.counterpartyVersion = message.counterpartyVersion;
        }
        if (message.proofInit.length !== 0) {
            obj.proofInit = base64FromBytes(message.proofInit);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelOpenTry.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelOpenTry();
        message.portId = object.portId ?? "";
        message.previousChannelId = object.previousChannelId ?? "";
        message.channel = (object.channel !== undefined && object.channel !== null)
            ? Channel.fromPartial(object.channel)
            : undefined;
        message.counterpartyVersion = object.counterpartyVersion ?? "";
        message.proofInit = object.proofInit ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelOpenTryResponse() {
    return { version: "", channelId: "" };
}
export const MsgChannelOpenTryResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.version !== "") {
            writer.uint32(10).string(message.version);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelOpenTryResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.version = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
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
            version: isSet(object.version) ? String(object.version) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.version !== "") {
            obj.version = message.version;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        return obj;
    },
    create(base) {
        return MsgChannelOpenTryResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelOpenTryResponse();
        message.version = object.version ?? "";
        message.channelId = object.channelId ?? "";
        return message;
    },
};
function createBaseMsgChannelOpenAck() {
    return {
        portId: "",
        channelId: "",
        counterpartyChannelId: "",
        counterpartyVersion: "",
        proofTry: new Uint8Array(0),
        proofHeight: undefined,
        signer: "",
    };
}
export const MsgChannelOpenAck = {
    encode(message, writer = _m0.Writer.create()) {
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
            Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(58).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelOpenAck();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.counterpartyChannelId = reader.string();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.counterpartyVersion = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.proofTry = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            counterpartyChannelId: isSet(object.counterpartyChannelId) ? String(object.counterpartyChannelId) : "",
            counterpartyVersion: isSet(object.counterpartyVersion) ? String(object.counterpartyVersion) : "",
            proofTry: isSet(object.proofTry) ? bytesFromBase64(object.proofTry) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.counterpartyChannelId !== "") {
            obj.counterpartyChannelId = message.counterpartyChannelId;
        }
        if (message.counterpartyVersion !== "") {
            obj.counterpartyVersion = message.counterpartyVersion;
        }
        if (message.proofTry.length !== 0) {
            obj.proofTry = base64FromBytes(message.proofTry);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelOpenAck.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelOpenAck();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.counterpartyChannelId = object.counterpartyChannelId ?? "";
        message.counterpartyVersion = object.counterpartyVersion ?? "";
        message.proofTry = object.proofTry ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelOpenAckResponse() {
    return {};
}
export const MsgChannelOpenAckResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelOpenAckResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgChannelOpenAckResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgChannelOpenAckResponse();
        return message;
    },
};
function createBaseMsgChannelOpenConfirm() {
    return { portId: "", channelId: "", proofAck: new Uint8Array(0), proofHeight: undefined, signer: "" };
}
export const MsgChannelOpenConfirm = {
    encode(message, writer = _m0.Writer.create()) {
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
            Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelOpenConfirm();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proofAck = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            proofAck: isSet(object.proofAck) ? bytesFromBase64(object.proofAck) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.proofAck.length !== 0) {
            obj.proofAck = base64FromBytes(message.proofAck);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelOpenConfirm.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelOpenConfirm();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.proofAck = object.proofAck ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelOpenConfirmResponse() {
    return {};
}
export const MsgChannelOpenConfirmResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelOpenConfirmResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgChannelOpenConfirmResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgChannelOpenConfirmResponse();
        return message;
    },
};
function createBaseMsgChannelCloseInit() {
    return { portId: "", channelId: "", signer: "" };
}
export const MsgChannelCloseInit = {
    encode(message, writer = _m0.Writer.create()) {
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
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelCloseInit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelCloseInit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelCloseInit();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelCloseInitResponse() {
    return {};
}
export const MsgChannelCloseInitResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelCloseInitResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgChannelCloseInitResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgChannelCloseInitResponse();
        return message;
    },
};
function createBaseMsgChannelCloseConfirm() {
    return {
        portId: "",
        channelId: "",
        proofInit: new Uint8Array(0),
        proofHeight: undefined,
        signer: "",
        counterpartyUpgradeSequence: 0,
    };
}
export const MsgChannelCloseConfirm = {
    encode(message, writer = _m0.Writer.create()) {
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
            Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        if (message.counterpartyUpgradeSequence !== 0) {
            writer.uint32(48).uint64(message.counterpartyUpgradeSequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelCloseConfirm();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proofInit = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.signer = reader.string();
                    continue;
                case 6:
                    if (tag !== 48) {
                        break;
                    }
                    message.counterpartyUpgradeSequence = longToNumber(reader.uint64());
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            proofInit: isSet(object.proofInit) ? bytesFromBase64(object.proofInit) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
            counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence)
                ? Number(object.counterpartyUpgradeSequence)
                : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.proofInit.length !== 0) {
            obj.proofInit = base64FromBytes(message.proofInit);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        if (message.counterpartyUpgradeSequence !== 0) {
            obj.counterpartyUpgradeSequence = Math.round(message.counterpartyUpgradeSequence);
        }
        return obj;
    },
    create(base) {
        return MsgChannelCloseConfirm.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelCloseConfirm();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.proofInit = object.proofInit ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence ?? 0;
        return message;
    },
};
function createBaseMsgChannelCloseConfirmResponse() {
    return {};
}
export const MsgChannelCloseConfirmResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelCloseConfirmResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgChannelCloseConfirmResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgChannelCloseConfirmResponse();
        return message;
    },
};
function createBaseMsgRecvPacket() {
    return { packet: undefined, proofCommitment: new Uint8Array(0), proofHeight: undefined, signer: "" };
}
export const MsgRecvPacket = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.packet !== undefined) {
            Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.proofCommitment.length !== 0) {
            writer.uint32(18).bytes(message.proofCommitment);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(34).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRecvPacket();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.packet = Packet.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.proofCommitment = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.signer = reader.string();
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
            packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
            proofCommitment: isSet(object.proofCommitment) ? bytesFromBase64(object.proofCommitment) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.packet !== undefined) {
            obj.packet = Packet.toJSON(message.packet);
        }
        if (message.proofCommitment.length !== 0) {
            obj.proofCommitment = base64FromBytes(message.proofCommitment);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgRecvPacket.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgRecvPacket();
        message.packet = (object.packet !== undefined && object.packet !== null)
            ? Packet.fromPartial(object.packet)
            : undefined;
        message.proofCommitment = object.proofCommitment ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgRecvPacketResponse() {
    return { result: 0 };
}
export const MsgRecvPacketResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRecvPacketResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.result = reader.int32();
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
        return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.result !== 0) {
            obj.result = responseResultTypeToJSON(message.result);
        }
        return obj;
    },
    create(base) {
        return MsgRecvPacketResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgRecvPacketResponse();
        message.result = object.result ?? 0;
        return message;
    },
};
function createBaseMsgTimeout() {
    return {
        packet: undefined,
        proofUnreceived: new Uint8Array(0),
        proofHeight: undefined,
        nextSequenceRecv: 0,
        signer: "",
    };
}
export const MsgTimeout = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.packet !== undefined) {
            Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.proofUnreceived.length !== 0) {
            writer.uint32(18).bytes(message.proofUnreceived);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
        }
        if (message.nextSequenceRecv !== 0) {
            writer.uint32(32).uint64(message.nextSequenceRecv);
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgTimeout();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.packet = Packet.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.proofUnreceived = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.nextSequenceRecv = longToNumber(reader.uint64());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.signer = reader.string();
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
            packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
            proofUnreceived: isSet(object.proofUnreceived) ? bytesFromBase64(object.proofUnreceived) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            nextSequenceRecv: isSet(object.nextSequenceRecv) ? Number(object.nextSequenceRecv) : 0,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.packet !== undefined) {
            obj.packet = Packet.toJSON(message.packet);
        }
        if (message.proofUnreceived.length !== 0) {
            obj.proofUnreceived = base64FromBytes(message.proofUnreceived);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.nextSequenceRecv !== 0) {
            obj.nextSequenceRecv = Math.round(message.nextSequenceRecv);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgTimeout.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgTimeout();
        message.packet = (object.packet !== undefined && object.packet !== null)
            ? Packet.fromPartial(object.packet)
            : undefined;
        message.proofUnreceived = object.proofUnreceived ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.nextSequenceRecv = object.nextSequenceRecv ?? 0;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgTimeoutResponse() {
    return { result: 0 };
}
export const MsgTimeoutResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgTimeoutResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.result = reader.int32();
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
        return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.result !== 0) {
            obj.result = responseResultTypeToJSON(message.result);
        }
        return obj;
    },
    create(base) {
        return MsgTimeoutResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgTimeoutResponse();
        message.result = object.result ?? 0;
        return message;
    },
};
function createBaseMsgTimeoutOnClose() {
    return {
        packet: undefined,
        proofUnreceived: new Uint8Array(0),
        proofClose: new Uint8Array(0),
        proofHeight: undefined,
        nextSequenceRecv: 0,
        signer: "",
        counterpartyUpgradeSequence: 0,
    };
}
export const MsgTimeoutOnClose = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.packet !== undefined) {
            Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.proofUnreceived.length !== 0) {
            writer.uint32(18).bytes(message.proofUnreceived);
        }
        if (message.proofClose.length !== 0) {
            writer.uint32(26).bytes(message.proofClose);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        if (message.nextSequenceRecv !== 0) {
            writer.uint32(40).uint64(message.nextSequenceRecv);
        }
        if (message.signer !== "") {
            writer.uint32(50).string(message.signer);
        }
        if (message.counterpartyUpgradeSequence !== 0) {
            writer.uint32(56).uint64(message.counterpartyUpgradeSequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgTimeoutOnClose();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.packet = Packet.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.proofUnreceived = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proofClose = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.nextSequenceRecv = longToNumber(reader.uint64());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.signer = reader.string();
                    continue;
                case 7:
                    if (tag !== 56) {
                        break;
                    }
                    message.counterpartyUpgradeSequence = longToNumber(reader.uint64());
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
            packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
            proofUnreceived: isSet(object.proofUnreceived) ? bytesFromBase64(object.proofUnreceived) : new Uint8Array(0),
            proofClose: isSet(object.proofClose) ? bytesFromBase64(object.proofClose) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            nextSequenceRecv: isSet(object.nextSequenceRecv) ? Number(object.nextSequenceRecv) : 0,
            signer: isSet(object.signer) ? String(object.signer) : "",
            counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence)
                ? Number(object.counterpartyUpgradeSequence)
                : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.packet !== undefined) {
            obj.packet = Packet.toJSON(message.packet);
        }
        if (message.proofUnreceived.length !== 0) {
            obj.proofUnreceived = base64FromBytes(message.proofUnreceived);
        }
        if (message.proofClose.length !== 0) {
            obj.proofClose = base64FromBytes(message.proofClose);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.nextSequenceRecv !== 0) {
            obj.nextSequenceRecv = Math.round(message.nextSequenceRecv);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        if (message.counterpartyUpgradeSequence !== 0) {
            obj.counterpartyUpgradeSequence = Math.round(message.counterpartyUpgradeSequence);
        }
        return obj;
    },
    create(base) {
        return MsgTimeoutOnClose.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgTimeoutOnClose();
        message.packet = (object.packet !== undefined && object.packet !== null)
            ? Packet.fromPartial(object.packet)
            : undefined;
        message.proofUnreceived = object.proofUnreceived ?? new Uint8Array(0);
        message.proofClose = object.proofClose ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.nextSequenceRecv = object.nextSequenceRecv ?? 0;
        message.signer = object.signer ?? "";
        message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence ?? 0;
        return message;
    },
};
function createBaseMsgTimeoutOnCloseResponse() {
    return { result: 0 };
}
export const MsgTimeoutOnCloseResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgTimeoutOnCloseResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.result = reader.int32();
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
        return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.result !== 0) {
            obj.result = responseResultTypeToJSON(message.result);
        }
        return obj;
    },
    create(base) {
        return MsgTimeoutOnCloseResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgTimeoutOnCloseResponse();
        message.result = object.result ?? 0;
        return message;
    },
};
function createBaseMsgAcknowledgement() {
    return {
        packet: undefined,
        acknowledgement: new Uint8Array(0),
        proofAcked: new Uint8Array(0),
        proofHeight: undefined,
        signer: "",
    };
}
export const MsgAcknowledgement = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.packet !== undefined) {
            Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.acknowledgement.length !== 0) {
            writer.uint32(18).bytes(message.acknowledgement);
        }
        if (message.proofAcked.length !== 0) {
            writer.uint32(26).bytes(message.proofAcked);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAcknowledgement();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.packet = Packet.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.acknowledgement = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proofAcked = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.signer = reader.string();
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
            packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
            acknowledgement: isSet(object.acknowledgement) ? bytesFromBase64(object.acknowledgement) : new Uint8Array(0),
            proofAcked: isSet(object.proofAcked) ? bytesFromBase64(object.proofAcked) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.packet !== undefined) {
            obj.packet = Packet.toJSON(message.packet);
        }
        if (message.acknowledgement.length !== 0) {
            obj.acknowledgement = base64FromBytes(message.acknowledgement);
        }
        if (message.proofAcked.length !== 0) {
            obj.proofAcked = base64FromBytes(message.proofAcked);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgAcknowledgement.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgAcknowledgement();
        message.packet = (object.packet !== undefined && object.packet !== null)
            ? Packet.fromPartial(object.packet)
            : undefined;
        message.acknowledgement = object.acknowledgement ?? new Uint8Array(0);
        message.proofAcked = object.proofAcked ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgAcknowledgementResponse() {
    return { result: 0 };
}
export const MsgAcknowledgementResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAcknowledgementResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.result = reader.int32();
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
        return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.result !== 0) {
            obj.result = responseResultTypeToJSON(message.result);
        }
        return obj;
    },
    create(base) {
        return MsgAcknowledgementResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgAcknowledgementResponse();
        message.result = object.result ?? 0;
        return message;
    },
};
function createBaseMsgChannelUpgradeInit() {
    return { portId: "", channelId: "", fields: undefined, signer: "" };
}
export const MsgChannelUpgradeInit = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.fields !== undefined) {
            UpgradeFields.encode(message.fields, writer.uint32(26).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(34).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeInit();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.fields = UpgradeFields.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            fields: isSet(object.fields) ? UpgradeFields.fromJSON(object.fields) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.fields !== undefined) {
            obj.fields = UpgradeFields.toJSON(message.fields);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeInit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeInit();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.fields = (object.fields !== undefined && object.fields !== null)
            ? UpgradeFields.fromPartial(object.fields)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelUpgradeInitResponse() {
    return { upgrade: undefined, upgradeSequence: 0 };
}
export const MsgChannelUpgradeInitResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.upgrade !== undefined) {
            Upgrade.encode(message.upgrade, writer.uint32(10).fork()).ldelim();
        }
        if (message.upgradeSequence !== 0) {
            writer.uint32(16).uint64(message.upgradeSequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeInitResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.upgrade = Upgrade.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.upgradeSequence = longToNumber(reader.uint64());
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
            upgrade: isSet(object.upgrade) ? Upgrade.fromJSON(object.upgrade) : undefined,
            upgradeSequence: isSet(object.upgradeSequence) ? Number(object.upgradeSequence) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.upgrade !== undefined) {
            obj.upgrade = Upgrade.toJSON(message.upgrade);
        }
        if (message.upgradeSequence !== 0) {
            obj.upgradeSequence = Math.round(message.upgradeSequence);
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeInitResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeInitResponse();
        message.upgrade = (object.upgrade !== undefined && object.upgrade !== null)
            ? Upgrade.fromPartial(object.upgrade)
            : undefined;
        message.upgradeSequence = object.upgradeSequence ?? 0;
        return message;
    },
};
function createBaseMsgChannelUpgradeTry() {
    return {
        portId: "",
        channelId: "",
        proposedUpgradeConnectionHops: [],
        counterpartyUpgradeFields: undefined,
        counterpartyUpgradeSequence: 0,
        proofChannel: new Uint8Array(0),
        proofUpgrade: new Uint8Array(0),
        proofHeight: undefined,
        signer: "",
    };
}
export const MsgChannelUpgradeTry = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        for (const v of message.proposedUpgradeConnectionHops) {
            writer.uint32(26).string(v);
        }
        if (message.counterpartyUpgradeFields !== undefined) {
            UpgradeFields.encode(message.counterpartyUpgradeFields, writer.uint32(34).fork()).ldelim();
        }
        if (message.counterpartyUpgradeSequence !== 0) {
            writer.uint32(40).uint64(message.counterpartyUpgradeSequence);
        }
        if (message.proofChannel.length !== 0) {
            writer.uint32(50).bytes(message.proofChannel);
        }
        if (message.proofUpgrade.length !== 0) {
            writer.uint32(58).bytes(message.proofUpgrade);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(66).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(74).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeTry();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.proposedUpgradeConnectionHops.push(reader.string());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.counterpartyUpgradeFields = UpgradeFields.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.counterpartyUpgradeSequence = longToNumber(reader.uint64());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.proofChannel = reader.bytes();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.proofUpgrade = reader.bytes();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            proposedUpgradeConnectionHops: Array.isArray(object?.proposedUpgradeConnectionHops)
                ? object.proposedUpgradeConnectionHops.map((e) => String(e))
                : [],
            counterpartyUpgradeFields: isSet(object.counterpartyUpgradeFields)
                ? UpgradeFields.fromJSON(object.counterpartyUpgradeFields)
                : undefined,
            counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence)
                ? Number(object.counterpartyUpgradeSequence)
                : 0,
            proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(0),
            proofUpgrade: isSet(object.proofUpgrade) ? bytesFromBase64(object.proofUpgrade) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.proposedUpgradeConnectionHops?.length) {
            obj.proposedUpgradeConnectionHops = message.proposedUpgradeConnectionHops;
        }
        if (message.counterpartyUpgradeFields !== undefined) {
            obj.counterpartyUpgradeFields = UpgradeFields.toJSON(message.counterpartyUpgradeFields);
        }
        if (message.counterpartyUpgradeSequence !== 0) {
            obj.counterpartyUpgradeSequence = Math.round(message.counterpartyUpgradeSequence);
        }
        if (message.proofChannel.length !== 0) {
            obj.proofChannel = base64FromBytes(message.proofChannel);
        }
        if (message.proofUpgrade.length !== 0) {
            obj.proofUpgrade = base64FromBytes(message.proofUpgrade);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeTry.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeTry();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.proposedUpgradeConnectionHops = object.proposedUpgradeConnectionHops?.map((e) => e) || [];
        message.counterpartyUpgradeFields =
            (object.counterpartyUpgradeFields !== undefined && object.counterpartyUpgradeFields !== null)
                ? UpgradeFields.fromPartial(object.counterpartyUpgradeFields)
                : undefined;
        message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence ?? 0;
        message.proofChannel = object.proofChannel ?? new Uint8Array(0);
        message.proofUpgrade = object.proofUpgrade ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelUpgradeTryResponse() {
    return { upgrade: undefined, upgradeSequence: 0, result: 0 };
}
export const MsgChannelUpgradeTryResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.upgrade !== undefined) {
            Upgrade.encode(message.upgrade, writer.uint32(10).fork()).ldelim();
        }
        if (message.upgradeSequence !== 0) {
            writer.uint32(16).uint64(message.upgradeSequence);
        }
        if (message.result !== 0) {
            writer.uint32(24).int32(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeTryResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.upgrade = Upgrade.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.upgradeSequence = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.result = reader.int32();
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
            upgrade: isSet(object.upgrade) ? Upgrade.fromJSON(object.upgrade) : undefined,
            upgradeSequence: isSet(object.upgradeSequence) ? Number(object.upgradeSequence) : 0,
            result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.upgrade !== undefined) {
            obj.upgrade = Upgrade.toJSON(message.upgrade);
        }
        if (message.upgradeSequence !== 0) {
            obj.upgradeSequence = Math.round(message.upgradeSequence);
        }
        if (message.result !== 0) {
            obj.result = responseResultTypeToJSON(message.result);
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeTryResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeTryResponse();
        message.upgrade = (object.upgrade !== undefined && object.upgrade !== null)
            ? Upgrade.fromPartial(object.upgrade)
            : undefined;
        message.upgradeSequence = object.upgradeSequence ?? 0;
        message.result = object.result ?? 0;
        return message;
    },
};
function createBaseMsgChannelUpgradeAck() {
    return {
        portId: "",
        channelId: "",
        counterpartyUpgrade: undefined,
        proofChannel: new Uint8Array(0),
        proofUpgrade: new Uint8Array(0),
        proofHeight: undefined,
        signer: "",
    };
}
export const MsgChannelUpgradeAck = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.counterpartyUpgrade !== undefined) {
            Upgrade.encode(message.counterpartyUpgrade, writer.uint32(26).fork()).ldelim();
        }
        if (message.proofChannel.length !== 0) {
            writer.uint32(34).bytes(message.proofChannel);
        }
        if (message.proofUpgrade.length !== 0) {
            writer.uint32(42).bytes(message.proofUpgrade);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(58).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeAck();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.counterpartyUpgrade = Upgrade.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proofChannel = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.proofUpgrade = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            counterpartyUpgrade: isSet(object.counterpartyUpgrade) ? Upgrade.fromJSON(object.counterpartyUpgrade) : undefined,
            proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(0),
            proofUpgrade: isSet(object.proofUpgrade) ? bytesFromBase64(object.proofUpgrade) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.counterpartyUpgrade !== undefined) {
            obj.counterpartyUpgrade = Upgrade.toJSON(message.counterpartyUpgrade);
        }
        if (message.proofChannel.length !== 0) {
            obj.proofChannel = base64FromBytes(message.proofChannel);
        }
        if (message.proofUpgrade.length !== 0) {
            obj.proofUpgrade = base64FromBytes(message.proofUpgrade);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeAck.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeAck();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.counterpartyUpgrade = (object.counterpartyUpgrade !== undefined && object.counterpartyUpgrade !== null)
            ? Upgrade.fromPartial(object.counterpartyUpgrade)
            : undefined;
        message.proofChannel = object.proofChannel ?? new Uint8Array(0);
        message.proofUpgrade = object.proofUpgrade ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelUpgradeAckResponse() {
    return { result: 0 };
}
export const MsgChannelUpgradeAckResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeAckResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.result = reader.int32();
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
        return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.result !== 0) {
            obj.result = responseResultTypeToJSON(message.result);
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeAckResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeAckResponse();
        message.result = object.result ?? 0;
        return message;
    },
};
function createBaseMsgChannelUpgradeConfirm() {
    return {
        portId: "",
        channelId: "",
        counterpartyChannelState: 0,
        counterpartyUpgrade: undefined,
        proofChannel: new Uint8Array(0),
        proofUpgrade: new Uint8Array(0),
        proofHeight: undefined,
        signer: "",
    };
}
export const MsgChannelUpgradeConfirm = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.counterpartyChannelState !== 0) {
            writer.uint32(24).int32(message.counterpartyChannelState);
        }
        if (message.counterpartyUpgrade !== undefined) {
            Upgrade.encode(message.counterpartyUpgrade, writer.uint32(34).fork()).ldelim();
        }
        if (message.proofChannel.length !== 0) {
            writer.uint32(42).bytes(message.proofChannel);
        }
        if (message.proofUpgrade.length !== 0) {
            writer.uint32(50).bytes(message.proofUpgrade);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(58).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(66).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeConfirm();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.counterpartyChannelState = reader.int32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.counterpartyUpgrade = Upgrade.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.proofChannel = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.proofUpgrade = reader.bytes();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            counterpartyChannelState: isSet(object.counterpartyChannelState)
                ? stateFromJSON(object.counterpartyChannelState)
                : 0,
            counterpartyUpgrade: isSet(object.counterpartyUpgrade) ? Upgrade.fromJSON(object.counterpartyUpgrade) : undefined,
            proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(0),
            proofUpgrade: isSet(object.proofUpgrade) ? bytesFromBase64(object.proofUpgrade) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.counterpartyChannelState !== 0) {
            obj.counterpartyChannelState = stateToJSON(message.counterpartyChannelState);
        }
        if (message.counterpartyUpgrade !== undefined) {
            obj.counterpartyUpgrade = Upgrade.toJSON(message.counterpartyUpgrade);
        }
        if (message.proofChannel.length !== 0) {
            obj.proofChannel = base64FromBytes(message.proofChannel);
        }
        if (message.proofUpgrade.length !== 0) {
            obj.proofUpgrade = base64FromBytes(message.proofUpgrade);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeConfirm.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeConfirm();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.counterpartyChannelState = object.counterpartyChannelState ?? 0;
        message.counterpartyUpgrade = (object.counterpartyUpgrade !== undefined && object.counterpartyUpgrade !== null)
            ? Upgrade.fromPartial(object.counterpartyUpgrade)
            : undefined;
        message.proofChannel = object.proofChannel ?? new Uint8Array(0);
        message.proofUpgrade = object.proofUpgrade ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelUpgradeConfirmResponse() {
    return { result: 0 };
}
export const MsgChannelUpgradeConfirmResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.result !== 0) {
            writer.uint32(8).int32(message.result);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeConfirmResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.result = reader.int32();
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
        return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.result !== 0) {
            obj.result = responseResultTypeToJSON(message.result);
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeConfirmResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeConfirmResponse();
        message.result = object.result ?? 0;
        return message;
    },
};
function createBaseMsgChannelUpgradeOpen() {
    return {
        portId: "",
        channelId: "",
        counterpartyChannelState: 0,
        counterpartyUpgradeSequence: 0,
        proofChannel: new Uint8Array(0),
        proofHeight: undefined,
        signer: "",
    };
}
export const MsgChannelUpgradeOpen = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.counterpartyChannelState !== 0) {
            writer.uint32(24).int32(message.counterpartyChannelState);
        }
        if (message.counterpartyUpgradeSequence !== 0) {
            writer.uint32(32).uint64(message.counterpartyUpgradeSequence);
        }
        if (message.proofChannel.length !== 0) {
            writer.uint32(42).bytes(message.proofChannel);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(58).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeOpen();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.counterpartyChannelState = reader.int32();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.counterpartyUpgradeSequence = longToNumber(reader.uint64());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.proofChannel = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            counterpartyChannelState: isSet(object.counterpartyChannelState)
                ? stateFromJSON(object.counterpartyChannelState)
                : 0,
            counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence)
                ? Number(object.counterpartyUpgradeSequence)
                : 0,
            proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.counterpartyChannelState !== 0) {
            obj.counterpartyChannelState = stateToJSON(message.counterpartyChannelState);
        }
        if (message.counterpartyUpgradeSequence !== 0) {
            obj.counterpartyUpgradeSequence = Math.round(message.counterpartyUpgradeSequence);
        }
        if (message.proofChannel.length !== 0) {
            obj.proofChannel = base64FromBytes(message.proofChannel);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeOpen.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeOpen();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.counterpartyChannelState = object.counterpartyChannelState ?? 0;
        message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence ?? 0;
        message.proofChannel = object.proofChannel ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelUpgradeOpenResponse() {
    return {};
}
export const MsgChannelUpgradeOpenResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeOpenResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeOpenResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgChannelUpgradeOpenResponse();
        return message;
    },
};
function createBaseMsgChannelUpgradeTimeout() {
    return {
        portId: "",
        channelId: "",
        counterpartyChannel: undefined,
        proofChannel: new Uint8Array(0),
        proofHeight: undefined,
        signer: "",
    };
}
export const MsgChannelUpgradeTimeout = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.counterpartyChannel !== undefined) {
            Channel.encode(message.counterpartyChannel, writer.uint32(26).fork()).ldelim();
        }
        if (message.proofChannel.length !== 0) {
            writer.uint32(34).bytes(message.proofChannel);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(42).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(50).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeTimeout();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.counterpartyChannel = Channel.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proofChannel = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            counterpartyChannel: isSet(object.counterpartyChannel) ? Channel.fromJSON(object.counterpartyChannel) : undefined,
            proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.counterpartyChannel !== undefined) {
            obj.counterpartyChannel = Channel.toJSON(message.counterpartyChannel);
        }
        if (message.proofChannel.length !== 0) {
            obj.proofChannel = base64FromBytes(message.proofChannel);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeTimeout.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeTimeout();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.counterpartyChannel = (object.counterpartyChannel !== undefined && object.counterpartyChannel !== null)
            ? Channel.fromPartial(object.counterpartyChannel)
            : undefined;
        message.proofChannel = object.proofChannel ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelUpgradeTimeoutResponse() {
    return {};
}
export const MsgChannelUpgradeTimeoutResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeTimeoutResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeTimeoutResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgChannelUpgradeTimeoutResponse();
        return message;
    },
};
function createBaseMsgChannelUpgradeCancel() {
    return {
        portId: "",
        channelId: "",
        errorReceipt: undefined,
        proofErrorReceipt: new Uint8Array(0),
        proofHeight: undefined,
        signer: "",
    };
}
export const MsgChannelUpgradeCancel = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.errorReceipt !== undefined) {
            ErrorReceipt.encode(message.errorReceipt, writer.uint32(26).fork()).ldelim();
        }
        if (message.proofErrorReceipt.length !== 0) {
            writer.uint32(34).bytes(message.proofErrorReceipt);
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(42).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(50).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeCancel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.errorReceipt = ErrorReceipt.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proofErrorReceipt = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.proofHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            errorReceipt: isSet(object.errorReceipt) ? ErrorReceipt.fromJSON(object.errorReceipt) : undefined,
            proofErrorReceipt: isSet(object.proofErrorReceipt)
                ? bytesFromBase64(object.proofErrorReceipt)
                : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.errorReceipt !== undefined) {
            obj.errorReceipt = ErrorReceipt.toJSON(message.errorReceipt);
        }
        if (message.proofErrorReceipt.length !== 0) {
            obj.proofErrorReceipt = base64FromBytes(message.proofErrorReceipt);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeCancel.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgChannelUpgradeCancel();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.errorReceipt = (object.errorReceipt !== undefined && object.errorReceipt !== null)
            ? ErrorReceipt.fromPartial(object.errorReceipt)
            : undefined;
        message.proofErrorReceipt = object.proofErrorReceipt ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgChannelUpgradeCancelResponse() {
    return {};
}
export const MsgChannelUpgradeCancelResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgChannelUpgradeCancelResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgChannelUpgradeCancelResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgChannelUpgradeCancelResponse();
        return message;
    },
};
function createBaseMsgUpdateParams() {
    return { authority: "", params: undefined };
}
export const MsgUpdateParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.params = Params.decode(reader, reader.uint32());
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
            authority: isSet(object.authority) ? String(object.authority) : "",
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        return obj;
    },
    create(base) {
        return MsgUpdateParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function createBaseMsgUpdateParamsResponse() {
    return {};
}
export const MsgUpdateParamsResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return MsgUpdateParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
};
function createBaseMsgPruneAcknowledgements() {
    return { portId: "", channelId: "", limit: 0, signer: "" };
}
export const MsgPruneAcknowledgements = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        if (message.channelId !== "") {
            writer.uint32(18).string(message.channelId);
        }
        if (message.limit !== 0) {
            writer.uint32(24).uint64(message.limit);
        }
        if (message.signer !== "") {
            writer.uint32(34).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPruneAcknowledgements();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.portId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.channelId = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.limit = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.signer = reader.string();
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
            portId: isSet(object.portId) ? String(object.portId) : "",
            channelId: isSet(object.channelId) ? String(object.channelId) : "",
            limit: isSet(object.limit) ? Number(object.limit) : 0,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.portId !== "") {
            obj.portId = message.portId;
        }
        if (message.channelId !== "") {
            obj.channelId = message.channelId;
        }
        if (message.limit !== 0) {
            obj.limit = Math.round(message.limit);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgPruneAcknowledgements.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgPruneAcknowledgements();
        message.portId = object.portId ?? "";
        message.channelId = object.channelId ?? "";
        message.limit = object.limit ?? 0;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgPruneAcknowledgementsResponse() {
    return { totalPrunedSequences: 0, totalRemainingSequences: 0 };
}
export const MsgPruneAcknowledgementsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.totalPrunedSequences !== 0) {
            writer.uint32(8).uint64(message.totalPrunedSequences);
        }
        if (message.totalRemainingSequences !== 0) {
            writer.uint32(16).uint64(message.totalRemainingSequences);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPruneAcknowledgementsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.totalPrunedSequences = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.totalRemainingSequences = longToNumber(reader.uint64());
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
            totalPrunedSequences: isSet(object.totalPrunedSequences) ? Number(object.totalPrunedSequences) : 0,
            totalRemainingSequences: isSet(object.totalRemainingSequences) ? Number(object.totalRemainingSequences) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.totalPrunedSequences !== 0) {
            obj.totalPrunedSequences = Math.round(message.totalPrunedSequences);
        }
        if (message.totalRemainingSequences !== 0) {
            obj.totalRemainingSequences = Math.round(message.totalRemainingSequences);
        }
        return obj;
    },
    create(base) {
        return MsgPruneAcknowledgementsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgPruneAcknowledgementsResponse();
        message.totalPrunedSequences = object.totalPrunedSequences ?? 0;
        message.totalRemainingSequences = object.totalRemainingSequences ?? 0;
        return message;
    },
};
export const MsgServiceName = "ibc.core.channel.v1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
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
        this.ChannelUpgradeInit = this.ChannelUpgradeInit.bind(this);
        this.ChannelUpgradeTry = this.ChannelUpgradeTry.bind(this);
        this.ChannelUpgradeAck = this.ChannelUpgradeAck.bind(this);
        this.ChannelUpgradeConfirm = this.ChannelUpgradeConfirm.bind(this);
        this.ChannelUpgradeOpen = this.ChannelUpgradeOpen.bind(this);
        this.ChannelUpgradeTimeout = this.ChannelUpgradeTimeout.bind(this);
        this.ChannelUpgradeCancel = this.ChannelUpgradeCancel.bind(this);
        this.UpdateChannelParams = this.UpdateChannelParams.bind(this);
        this.PruneAcknowledgements = this.PruneAcknowledgements.bind(this);
    }
    ChannelOpenInit(request) {
        const data = MsgChannelOpenInit.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelOpenInit", data);
        return promise.then((data) => MsgChannelOpenInitResponse.decode(_m0.Reader.create(data)));
    }
    ChannelOpenTry(request) {
        const data = MsgChannelOpenTry.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelOpenTry", data);
        return promise.then((data) => MsgChannelOpenTryResponse.decode(_m0.Reader.create(data)));
    }
    ChannelOpenAck(request) {
        const data = MsgChannelOpenAck.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelOpenAck", data);
        return promise.then((data) => MsgChannelOpenAckResponse.decode(_m0.Reader.create(data)));
    }
    ChannelOpenConfirm(request) {
        const data = MsgChannelOpenConfirm.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelOpenConfirm", data);
        return promise.then((data) => MsgChannelOpenConfirmResponse.decode(_m0.Reader.create(data)));
    }
    ChannelCloseInit(request) {
        const data = MsgChannelCloseInit.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelCloseInit", data);
        return promise.then((data) => MsgChannelCloseInitResponse.decode(_m0.Reader.create(data)));
    }
    ChannelCloseConfirm(request) {
        const data = MsgChannelCloseConfirm.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelCloseConfirm", data);
        return promise.then((data) => MsgChannelCloseConfirmResponse.decode(_m0.Reader.create(data)));
    }
    RecvPacket(request) {
        const data = MsgRecvPacket.encode(request).finish();
        const promise = this.rpc.request(this.service, "RecvPacket", data);
        return promise.then((data) => MsgRecvPacketResponse.decode(_m0.Reader.create(data)));
    }
    Timeout(request) {
        const data = MsgTimeout.encode(request).finish();
        const promise = this.rpc.request(this.service, "Timeout", data);
        return promise.then((data) => MsgTimeoutResponse.decode(_m0.Reader.create(data)));
    }
    TimeoutOnClose(request) {
        const data = MsgTimeoutOnClose.encode(request).finish();
        const promise = this.rpc.request(this.service, "TimeoutOnClose", data);
        return promise.then((data) => MsgTimeoutOnCloseResponse.decode(_m0.Reader.create(data)));
    }
    Acknowledgement(request) {
        const data = MsgAcknowledgement.encode(request).finish();
        const promise = this.rpc.request(this.service, "Acknowledgement", data);
        return promise.then((data) => MsgAcknowledgementResponse.decode(_m0.Reader.create(data)));
    }
    ChannelUpgradeInit(request) {
        const data = MsgChannelUpgradeInit.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelUpgradeInit", data);
        return promise.then((data) => MsgChannelUpgradeInitResponse.decode(_m0.Reader.create(data)));
    }
    ChannelUpgradeTry(request) {
        const data = MsgChannelUpgradeTry.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelUpgradeTry", data);
        return promise.then((data) => MsgChannelUpgradeTryResponse.decode(_m0.Reader.create(data)));
    }
    ChannelUpgradeAck(request) {
        const data = MsgChannelUpgradeAck.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelUpgradeAck", data);
        return promise.then((data) => MsgChannelUpgradeAckResponse.decode(_m0.Reader.create(data)));
    }
    ChannelUpgradeConfirm(request) {
        const data = MsgChannelUpgradeConfirm.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelUpgradeConfirm", data);
        return promise.then((data) => MsgChannelUpgradeConfirmResponse.decode(_m0.Reader.create(data)));
    }
    ChannelUpgradeOpen(request) {
        const data = MsgChannelUpgradeOpen.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelUpgradeOpen", data);
        return promise.then((data) => MsgChannelUpgradeOpenResponse.decode(_m0.Reader.create(data)));
    }
    ChannelUpgradeTimeout(request) {
        const data = MsgChannelUpgradeTimeout.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelUpgradeTimeout", data);
        return promise.then((data) => MsgChannelUpgradeTimeoutResponse.decode(_m0.Reader.create(data)));
    }
    ChannelUpgradeCancel(request) {
        const data = MsgChannelUpgradeCancel.encode(request).finish();
        const promise = this.rpc.request(this.service, "ChannelUpgradeCancel", data);
        return promise.then((data) => MsgChannelUpgradeCancelResponse.decode(_m0.Reader.create(data)));
    }
    UpdateChannelParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateChannelParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
    }
    PruneAcknowledgements(request) {
        const data = MsgPruneAcknowledgements.encode(request).finish();
        const promise = this.rpc.request(this.service, "PruneAcknowledgements", data);
        return promise.then((data) => MsgPruneAcknowledgementsResponse.decode(_m0.Reader.create(data)));
    }
}
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
