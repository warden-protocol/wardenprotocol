/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { Height } from "../../client/v1/client";
import { Counterparty, Params, Version } from "./connection";
export const protobufPackage = "ibc.core.connection.v1";
function createBaseMsgConnectionOpenInit() {
    return { clientId: "", counterparty: undefined, version: undefined, delayPeriod: 0, signer: "" };
}
export const MsgConnectionOpenInit = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.counterparty !== undefined) {
            Counterparty.encode(message.counterparty, writer.uint32(18).fork()).ldelim();
        }
        if (message.version !== undefined) {
            Version.encode(message.version, writer.uint32(26).fork()).ldelim();
        }
        if (message.delayPeriod !== 0) {
            writer.uint32(32).uint64(message.delayPeriod);
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgConnectionOpenInit();
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
                    message.counterparty = Counterparty.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.version = Version.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.delayPeriod = longToNumber(reader.uint64());
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            counterparty: isSet(object.counterparty) ? Counterparty.fromJSON(object.counterparty) : undefined,
            version: isSet(object.version) ? Version.fromJSON(object.version) : undefined,
            delayPeriod: isSet(object.delayPeriod) ? Number(object.delayPeriod) : 0,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.counterparty !== undefined) {
            obj.counterparty = Counterparty.toJSON(message.counterparty);
        }
        if (message.version !== undefined) {
            obj.version = Version.toJSON(message.version);
        }
        if (message.delayPeriod !== 0) {
            obj.delayPeriod = Math.round(message.delayPeriod);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgConnectionOpenInit.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgConnectionOpenInit();
        message.clientId = object.clientId ?? "";
        message.counterparty = (object.counterparty !== undefined && object.counterparty !== null)
            ? Counterparty.fromPartial(object.counterparty)
            : undefined;
        message.version = (object.version !== undefined && object.version !== null)
            ? Version.fromPartial(object.version)
            : undefined;
        message.delayPeriod = object.delayPeriod ?? 0;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgConnectionOpenInitResponse() {
    return {};
}
export const MsgConnectionOpenInitResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgConnectionOpenInitResponse();
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
        return MsgConnectionOpenInitResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgConnectionOpenInitResponse();
        return message;
    },
};
function createBaseMsgConnectionOpenTry() {
    return {
        clientId: "",
        previousConnectionId: "",
        clientState: undefined,
        counterparty: undefined,
        delayPeriod: 0,
        counterpartyVersions: [],
        proofHeight: undefined,
        proofInit: new Uint8Array(0),
        proofClient: new Uint8Array(0),
        proofConsensus: new Uint8Array(0),
        consensusHeight: undefined,
        signer: "",
        hostConsensusStateProof: new Uint8Array(0),
    };
}
export const MsgConnectionOpenTry = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.previousConnectionId !== "") {
            writer.uint32(18).string(message.previousConnectionId);
        }
        if (message.clientState !== undefined) {
            Any.encode(message.clientState, writer.uint32(26).fork()).ldelim();
        }
        if (message.counterparty !== undefined) {
            Counterparty.encode(message.counterparty, writer.uint32(34).fork()).ldelim();
        }
        if (message.delayPeriod !== 0) {
            writer.uint32(40).uint64(message.delayPeriod);
        }
        for (const v of message.counterpartyVersions) {
            Version.encode(v, writer.uint32(50).fork()).ldelim();
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(58).fork()).ldelim();
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
            Height.encode(message.consensusHeight, writer.uint32(90).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(98).string(message.signer);
        }
        if (message.hostConsensusStateProof.length !== 0) {
            writer.uint32(106).bytes(message.hostConsensusStateProof);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgConnectionOpenTry();
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
                    message.previousConnectionId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.clientState = Any.decode(reader, reader.uint32());
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
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.counterpartyVersions.push(Version.decode(reader, reader.uint32()));
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
                    message.proofInit = reader.bytes();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.proofClient = reader.bytes();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.proofConsensus = reader.bytes();
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.consensusHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.signer = reader.string();
                    continue;
                case 13:
                    if (tag !== 106) {
                        break;
                    }
                    message.hostConsensusStateProof = reader.bytes();
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
            previousConnectionId: isSet(object.previousConnectionId) ? String(object.previousConnectionId) : "",
            clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined,
            counterparty: isSet(object.counterparty) ? Counterparty.fromJSON(object.counterparty) : undefined,
            delayPeriod: isSet(object.delayPeriod) ? Number(object.delayPeriod) : 0,
            counterpartyVersions: Array.isArray(object?.counterpartyVersions)
                ? object.counterpartyVersions.map((e) => Version.fromJSON(e))
                : [],
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            proofInit: isSet(object.proofInit) ? bytesFromBase64(object.proofInit) : new Uint8Array(0),
            proofClient: isSet(object.proofClient) ? bytesFromBase64(object.proofClient) : new Uint8Array(0),
            proofConsensus: isSet(object.proofConsensus) ? bytesFromBase64(object.proofConsensus) : new Uint8Array(0),
            consensusHeight: isSet(object.consensusHeight) ? Height.fromJSON(object.consensusHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
            hostConsensusStateProof: isSet(object.hostConsensusStateProof)
                ? bytesFromBase64(object.hostConsensusStateProof)
                : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.previousConnectionId !== "") {
            obj.previousConnectionId = message.previousConnectionId;
        }
        if (message.clientState !== undefined) {
            obj.clientState = Any.toJSON(message.clientState);
        }
        if (message.counterparty !== undefined) {
            obj.counterparty = Counterparty.toJSON(message.counterparty);
        }
        if (message.delayPeriod !== 0) {
            obj.delayPeriod = Math.round(message.delayPeriod);
        }
        if (message.counterpartyVersions?.length) {
            obj.counterpartyVersions = message.counterpartyVersions.map((e) => Version.toJSON(e));
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.proofInit.length !== 0) {
            obj.proofInit = base64FromBytes(message.proofInit);
        }
        if (message.proofClient.length !== 0) {
            obj.proofClient = base64FromBytes(message.proofClient);
        }
        if (message.proofConsensus.length !== 0) {
            obj.proofConsensus = base64FromBytes(message.proofConsensus);
        }
        if (message.consensusHeight !== undefined) {
            obj.consensusHeight = Height.toJSON(message.consensusHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        if (message.hostConsensusStateProof.length !== 0) {
            obj.hostConsensusStateProof = base64FromBytes(message.hostConsensusStateProof);
        }
        return obj;
    },
    create(base) {
        return MsgConnectionOpenTry.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgConnectionOpenTry();
        message.clientId = object.clientId ?? "";
        message.previousConnectionId = object.previousConnectionId ?? "";
        message.clientState = (object.clientState !== undefined && object.clientState !== null)
            ? Any.fromPartial(object.clientState)
            : undefined;
        message.counterparty = (object.counterparty !== undefined && object.counterparty !== null)
            ? Counterparty.fromPartial(object.counterparty)
            : undefined;
        message.delayPeriod = object.delayPeriod ?? 0;
        message.counterpartyVersions = object.counterpartyVersions?.map((e) => Version.fromPartial(e)) || [];
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.proofInit = object.proofInit ?? new Uint8Array(0);
        message.proofClient = object.proofClient ?? new Uint8Array(0);
        message.proofConsensus = object.proofConsensus ?? new Uint8Array(0);
        message.consensusHeight = (object.consensusHeight !== undefined && object.consensusHeight !== null)
            ? Height.fromPartial(object.consensusHeight)
            : undefined;
        message.signer = object.signer ?? "";
        message.hostConsensusStateProof = object.hostConsensusStateProof ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgConnectionOpenTryResponse() {
    return {};
}
export const MsgConnectionOpenTryResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgConnectionOpenTryResponse();
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
        return MsgConnectionOpenTryResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgConnectionOpenTryResponse();
        return message;
    },
};
function createBaseMsgConnectionOpenAck() {
    return {
        connectionId: "",
        counterpartyConnectionId: "",
        version: undefined,
        clientState: undefined,
        proofHeight: undefined,
        proofTry: new Uint8Array(0),
        proofClient: new Uint8Array(0),
        proofConsensus: new Uint8Array(0),
        consensusHeight: undefined,
        signer: "",
        hostConsensusStateProof: new Uint8Array(0),
    };
}
export const MsgConnectionOpenAck = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.connectionId !== "") {
            writer.uint32(10).string(message.connectionId);
        }
        if (message.counterpartyConnectionId !== "") {
            writer.uint32(18).string(message.counterpartyConnectionId);
        }
        if (message.version !== undefined) {
            Version.encode(message.version, writer.uint32(26).fork()).ldelim();
        }
        if (message.clientState !== undefined) {
            Any.encode(message.clientState, writer.uint32(34).fork()).ldelim();
        }
        if (message.proofHeight !== undefined) {
            Height.encode(message.proofHeight, writer.uint32(42).fork()).ldelim();
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
            Height.encode(message.consensusHeight, writer.uint32(74).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(82).string(message.signer);
        }
        if (message.hostConsensusStateProof.length !== 0) {
            writer.uint32(90).bytes(message.hostConsensusStateProof);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgConnectionOpenAck();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.connectionId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.counterpartyConnectionId = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.version = Version.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.clientState = Any.decode(reader, reader.uint32());
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
                    message.proofTry = reader.bytes();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.proofClient = reader.bytes();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.proofConsensus = reader.bytes();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.consensusHeight = Height.decode(reader, reader.uint32());
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.signer = reader.string();
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.hostConsensusStateProof = reader.bytes();
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
            connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
            counterpartyConnectionId: isSet(object.counterpartyConnectionId) ? String(object.counterpartyConnectionId) : "",
            version: isSet(object.version) ? Version.fromJSON(object.version) : undefined,
            clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined,
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            proofTry: isSet(object.proofTry) ? bytesFromBase64(object.proofTry) : new Uint8Array(0),
            proofClient: isSet(object.proofClient) ? bytesFromBase64(object.proofClient) : new Uint8Array(0),
            proofConsensus: isSet(object.proofConsensus) ? bytesFromBase64(object.proofConsensus) : new Uint8Array(0),
            consensusHeight: isSet(object.consensusHeight) ? Height.fromJSON(object.consensusHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
            hostConsensusStateProof: isSet(object.hostConsensusStateProof)
                ? bytesFromBase64(object.hostConsensusStateProof)
                : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.connectionId !== "") {
            obj.connectionId = message.connectionId;
        }
        if (message.counterpartyConnectionId !== "") {
            obj.counterpartyConnectionId = message.counterpartyConnectionId;
        }
        if (message.version !== undefined) {
            obj.version = Version.toJSON(message.version);
        }
        if (message.clientState !== undefined) {
            obj.clientState = Any.toJSON(message.clientState);
        }
        if (message.proofHeight !== undefined) {
            obj.proofHeight = Height.toJSON(message.proofHeight);
        }
        if (message.proofTry.length !== 0) {
            obj.proofTry = base64FromBytes(message.proofTry);
        }
        if (message.proofClient.length !== 0) {
            obj.proofClient = base64FromBytes(message.proofClient);
        }
        if (message.proofConsensus.length !== 0) {
            obj.proofConsensus = base64FromBytes(message.proofConsensus);
        }
        if (message.consensusHeight !== undefined) {
            obj.consensusHeight = Height.toJSON(message.consensusHeight);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        if (message.hostConsensusStateProof.length !== 0) {
            obj.hostConsensusStateProof = base64FromBytes(message.hostConsensusStateProof);
        }
        return obj;
    },
    create(base) {
        return MsgConnectionOpenAck.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgConnectionOpenAck();
        message.connectionId = object.connectionId ?? "";
        message.counterpartyConnectionId = object.counterpartyConnectionId ?? "";
        message.version = (object.version !== undefined && object.version !== null)
            ? Version.fromPartial(object.version)
            : undefined;
        message.clientState = (object.clientState !== undefined && object.clientState !== null)
            ? Any.fromPartial(object.clientState)
            : undefined;
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.proofTry = object.proofTry ?? new Uint8Array(0);
        message.proofClient = object.proofClient ?? new Uint8Array(0);
        message.proofConsensus = object.proofConsensus ?? new Uint8Array(0);
        message.consensusHeight = (object.consensusHeight !== undefined && object.consensusHeight !== null)
            ? Height.fromPartial(object.consensusHeight)
            : undefined;
        message.signer = object.signer ?? "";
        message.hostConsensusStateProof = object.hostConsensusStateProof ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgConnectionOpenAckResponse() {
    return {};
}
export const MsgConnectionOpenAckResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgConnectionOpenAckResponse();
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
        return MsgConnectionOpenAckResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgConnectionOpenAckResponse();
        return message;
    },
};
function createBaseMsgConnectionOpenConfirm() {
    return { connectionId: "", proofAck: new Uint8Array(0), proofHeight: undefined, signer: "" };
}
export const MsgConnectionOpenConfirm = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.connectionId !== "") {
            writer.uint32(10).string(message.connectionId);
        }
        if (message.proofAck.length !== 0) {
            writer.uint32(18).bytes(message.proofAck);
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
        const message = createBaseMsgConnectionOpenConfirm();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.connectionId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.proofAck = reader.bytes();
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
            connectionId: isSet(object.connectionId) ? String(object.connectionId) : "",
            proofAck: isSet(object.proofAck) ? bytesFromBase64(object.proofAck) : new Uint8Array(0),
            proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.connectionId !== "") {
            obj.connectionId = message.connectionId;
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
        return MsgConnectionOpenConfirm.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgConnectionOpenConfirm();
        message.connectionId = object.connectionId ?? "";
        message.proofAck = object.proofAck ?? new Uint8Array(0);
        message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
            ? Height.fromPartial(object.proofHeight)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgConnectionOpenConfirmResponse() {
    return {};
}
export const MsgConnectionOpenConfirmResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgConnectionOpenConfirmResponse();
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
        return MsgConnectionOpenConfirmResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgConnectionOpenConfirmResponse();
        return message;
    },
};
function createBaseMsgUpdateParams() {
    return { signer: "", params: undefined };
}
export const MsgUpdateParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.signer !== "") {
            writer.uint32(10).string(message.signer);
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
                    message.signer = reader.string();
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
            signer: isSet(object.signer) ? String(object.signer) : "",
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.signer !== "") {
            obj.signer = message.signer;
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
        message.signer = object.signer ?? "";
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
export const MsgServiceName = "ibc.core.connection.v1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.ConnectionOpenInit = this.ConnectionOpenInit.bind(this);
        this.ConnectionOpenTry = this.ConnectionOpenTry.bind(this);
        this.ConnectionOpenAck = this.ConnectionOpenAck.bind(this);
        this.ConnectionOpenConfirm = this.ConnectionOpenConfirm.bind(this);
        this.UpdateConnectionParams = this.UpdateConnectionParams.bind(this);
    }
    ConnectionOpenInit(request) {
        const data = MsgConnectionOpenInit.encode(request).finish();
        const promise = this.rpc.request(this.service, "ConnectionOpenInit", data);
        return promise.then((data) => MsgConnectionOpenInitResponse.decode(_m0.Reader.create(data)));
    }
    ConnectionOpenTry(request) {
        const data = MsgConnectionOpenTry.encode(request).finish();
        const promise = this.rpc.request(this.service, "ConnectionOpenTry", data);
        return promise.then((data) => MsgConnectionOpenTryResponse.decode(_m0.Reader.create(data)));
    }
    ConnectionOpenAck(request) {
        const data = MsgConnectionOpenAck.encode(request).finish();
        const promise = this.rpc.request(this.service, "ConnectionOpenAck", data);
        return promise.then((data) => MsgConnectionOpenAckResponse.decode(_m0.Reader.create(data)));
    }
    ConnectionOpenConfirm(request) {
        const data = MsgConnectionOpenConfirm.encode(request).finish();
        const promise = this.rpc.request(this.service, "ConnectionOpenConfirm", data);
        return promise.then((data) => MsgConnectionOpenConfirmResponse.decode(_m0.Reader.create(data)));
    }
    UpdateConnectionParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateConnectionParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
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
