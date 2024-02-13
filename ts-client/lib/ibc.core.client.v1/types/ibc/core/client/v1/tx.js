/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Plan } from "../../../../cosmos/upgrade/v1beta1/upgrade";
import { Any } from "../../../../google/protobuf/any";
import { Params } from "./client";
export const protobufPackage = "ibc.core.client.v1";
function createBaseMsgCreateClient() {
    return { clientState: undefined, consensusState: undefined, signer: "" };
}
export const MsgCreateClient = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientState !== undefined) {
            Any.encode(message.clientState, writer.uint32(10).fork()).ldelim();
        }
        if (message.consensusState !== undefined) {
            Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateClient();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.clientState = Any.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.consensusState = Any.decode(reader, reader.uint32());
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
            clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined,
            consensusState: isSet(object.consensusState) ? Any.fromJSON(object.consensusState) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientState !== undefined) {
            obj.clientState = Any.toJSON(message.clientState);
        }
        if (message.consensusState !== undefined) {
            obj.consensusState = Any.toJSON(message.consensusState);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgCreateClient.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgCreateClient();
        message.clientState = (object.clientState !== undefined && object.clientState !== null)
            ? Any.fromPartial(object.clientState)
            : undefined;
        message.consensusState = (object.consensusState !== undefined && object.consensusState !== null)
            ? Any.fromPartial(object.consensusState)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgCreateClientResponse() {
    return {};
}
export const MsgCreateClientResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateClientResponse();
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
        return MsgCreateClientResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgCreateClientResponse();
        return message;
    },
};
function createBaseMsgUpdateClient() {
    return { clientId: "", clientMessage: undefined, signer: "" };
}
export const MsgUpdateClient = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.clientMessage !== undefined) {
            Any.encode(message.clientMessage, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateClient();
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
                    message.clientMessage = Any.decode(reader, reader.uint32());
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            clientMessage: isSet(object.clientMessage) ? Any.fromJSON(object.clientMessage) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.clientMessage !== undefined) {
            obj.clientMessage = Any.toJSON(message.clientMessage);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgUpdateClient.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateClient();
        message.clientId = object.clientId ?? "";
        message.clientMessage = (object.clientMessage !== undefined && object.clientMessage !== null)
            ? Any.fromPartial(object.clientMessage)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgUpdateClientResponse() {
    return {};
}
export const MsgUpdateClientResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateClientResponse();
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
        return MsgUpdateClientResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateClientResponse();
        return message;
    },
};
function createBaseMsgUpgradeClient() {
    return {
        clientId: "",
        clientState: undefined,
        consensusState: undefined,
        proofUpgradeClient: new Uint8Array(0),
        proofUpgradeConsensusState: new Uint8Array(0),
        signer: "",
    };
}
export const MsgUpgradeClient = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.clientState !== undefined) {
            Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
        }
        if (message.consensusState !== undefined) {
            Any.encode(message.consensusState, writer.uint32(26).fork()).ldelim();
        }
        if (message.proofUpgradeClient.length !== 0) {
            writer.uint32(34).bytes(message.proofUpgradeClient);
        }
        if (message.proofUpgradeConsensusState.length !== 0) {
            writer.uint32(42).bytes(message.proofUpgradeConsensusState);
        }
        if (message.signer !== "") {
            writer.uint32(50).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpgradeClient();
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
                    message.clientState = Any.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.consensusState = Any.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.proofUpgradeClient = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.proofUpgradeConsensusState = reader.bytes();
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined,
            consensusState: isSet(object.consensusState) ? Any.fromJSON(object.consensusState) : undefined,
            proofUpgradeClient: isSet(object.proofUpgradeClient)
                ? bytesFromBase64(object.proofUpgradeClient)
                : new Uint8Array(0),
            proofUpgradeConsensusState: isSet(object.proofUpgradeConsensusState)
                ? bytesFromBase64(object.proofUpgradeConsensusState)
                : new Uint8Array(0),
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.clientState !== undefined) {
            obj.clientState = Any.toJSON(message.clientState);
        }
        if (message.consensusState !== undefined) {
            obj.consensusState = Any.toJSON(message.consensusState);
        }
        if (message.proofUpgradeClient.length !== 0) {
            obj.proofUpgradeClient = base64FromBytes(message.proofUpgradeClient);
        }
        if (message.proofUpgradeConsensusState.length !== 0) {
            obj.proofUpgradeConsensusState = base64FromBytes(message.proofUpgradeConsensusState);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgUpgradeClient.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpgradeClient();
        message.clientId = object.clientId ?? "";
        message.clientState = (object.clientState !== undefined && object.clientState !== null)
            ? Any.fromPartial(object.clientState)
            : undefined;
        message.consensusState = (object.consensusState !== undefined && object.consensusState !== null)
            ? Any.fromPartial(object.consensusState)
            : undefined;
        message.proofUpgradeClient = object.proofUpgradeClient ?? new Uint8Array(0);
        message.proofUpgradeConsensusState = object.proofUpgradeConsensusState ?? new Uint8Array(0);
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgUpgradeClientResponse() {
    return {};
}
export const MsgUpgradeClientResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpgradeClientResponse();
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
        return MsgUpgradeClientResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpgradeClientResponse();
        return message;
    },
};
function createBaseMsgSubmitMisbehaviour() {
    return { clientId: "", misbehaviour: undefined, signer: "" };
}
export const MsgSubmitMisbehaviour = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.misbehaviour !== undefined) {
            Any.encode(message.misbehaviour, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitMisbehaviour();
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
                    message.misbehaviour = Any.decode(reader, reader.uint32());
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
            clientId: isSet(object.clientId) ? String(object.clientId) : "",
            misbehaviour: isSet(object.misbehaviour) ? Any.fromJSON(object.misbehaviour) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.clientId !== "") {
            obj.clientId = message.clientId;
        }
        if (message.misbehaviour !== undefined) {
            obj.misbehaviour = Any.toJSON(message.misbehaviour);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgSubmitMisbehaviour.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSubmitMisbehaviour();
        message.clientId = object.clientId ?? "";
        message.misbehaviour = (object.misbehaviour !== undefined && object.misbehaviour !== null)
            ? Any.fromPartial(object.misbehaviour)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgSubmitMisbehaviourResponse() {
    return {};
}
export const MsgSubmitMisbehaviourResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitMisbehaviourResponse();
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
        return MsgSubmitMisbehaviourResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgSubmitMisbehaviourResponse();
        return message;
    },
};
function createBaseMsgRecoverClient() {
    return { subjectClientId: "", substituteClientId: "", signer: "" };
}
export const MsgRecoverClient = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.subjectClientId !== "") {
            writer.uint32(10).string(message.subjectClientId);
        }
        if (message.substituteClientId !== "") {
            writer.uint32(18).string(message.substituteClientId);
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRecoverClient();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.subjectClientId = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.substituteClientId = reader.string();
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
            subjectClientId: isSet(object.subjectClientId) ? String(object.subjectClientId) : "",
            substituteClientId: isSet(object.substituteClientId) ? String(object.substituteClientId) : "",
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.subjectClientId !== "") {
            obj.subjectClientId = message.subjectClientId;
        }
        if (message.substituteClientId !== "") {
            obj.substituteClientId = message.substituteClientId;
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgRecoverClient.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgRecoverClient();
        message.subjectClientId = object.subjectClientId ?? "";
        message.substituteClientId = object.substituteClientId ?? "";
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgRecoverClientResponse() {
    return {};
}
export const MsgRecoverClientResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRecoverClientResponse();
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
        return MsgRecoverClientResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgRecoverClientResponse();
        return message;
    },
};
function createBaseMsgIBCSoftwareUpgrade() {
    return { plan: undefined, upgradedClientState: undefined, signer: "" };
}
export const MsgIBCSoftwareUpgrade = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.plan !== undefined) {
            Plan.encode(message.plan, writer.uint32(10).fork()).ldelim();
        }
        if (message.upgradedClientState !== undefined) {
            Any.encode(message.upgradedClientState, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgIBCSoftwareUpgrade();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.plan = Plan.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.upgradedClientState = Any.decode(reader, reader.uint32());
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
            plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
            upgradedClientState: isSet(object.upgradedClientState) ? Any.fromJSON(object.upgradedClientState) : undefined,
            signer: isSet(object.signer) ? String(object.signer) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.plan !== undefined) {
            obj.plan = Plan.toJSON(message.plan);
        }
        if (message.upgradedClientState !== undefined) {
            obj.upgradedClientState = Any.toJSON(message.upgradedClientState);
        }
        if (message.signer !== "") {
            obj.signer = message.signer;
        }
        return obj;
    },
    create(base) {
        return MsgIBCSoftwareUpgrade.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgIBCSoftwareUpgrade();
        message.plan = (object.plan !== undefined && object.plan !== null) ? Plan.fromPartial(object.plan) : undefined;
        message.upgradedClientState = (object.upgradedClientState !== undefined && object.upgradedClientState !== null)
            ? Any.fromPartial(object.upgradedClientState)
            : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
};
function createBaseMsgIBCSoftwareUpgradeResponse() {
    return {};
}
export const MsgIBCSoftwareUpgradeResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgIBCSoftwareUpgradeResponse();
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
        return MsgIBCSoftwareUpgradeResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgIBCSoftwareUpgradeResponse();
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
export const MsgServiceName = "ibc.core.client.v1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.CreateClient = this.CreateClient.bind(this);
        this.UpdateClient = this.UpdateClient.bind(this);
        this.UpgradeClient = this.UpgradeClient.bind(this);
        this.SubmitMisbehaviour = this.SubmitMisbehaviour.bind(this);
        this.RecoverClient = this.RecoverClient.bind(this);
        this.IBCSoftwareUpgrade = this.IBCSoftwareUpgrade.bind(this);
        this.UpdateClientParams = this.UpdateClientParams.bind(this);
    }
    CreateClient(request) {
        const data = MsgCreateClient.encode(request).finish();
        const promise = this.rpc.request(this.service, "CreateClient", data);
        return promise.then((data) => MsgCreateClientResponse.decode(_m0.Reader.create(data)));
    }
    UpdateClient(request) {
        const data = MsgUpdateClient.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateClient", data);
        return promise.then((data) => MsgUpdateClientResponse.decode(_m0.Reader.create(data)));
    }
    UpgradeClient(request) {
        const data = MsgUpgradeClient.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpgradeClient", data);
        return promise.then((data) => MsgUpgradeClientResponse.decode(_m0.Reader.create(data)));
    }
    SubmitMisbehaviour(request) {
        const data = MsgSubmitMisbehaviour.encode(request).finish();
        const promise = this.rpc.request(this.service, "SubmitMisbehaviour", data);
        return promise.then((data) => MsgSubmitMisbehaviourResponse.decode(_m0.Reader.create(data)));
    }
    RecoverClient(request) {
        const data = MsgRecoverClient.encode(request).finish();
        const promise = this.rpc.request(this.service, "RecoverClient", data);
        return promise.then((data) => MsgRecoverClientResponse.decode(_m0.Reader.create(data)));
    }
    IBCSoftwareUpgrade(request) {
        const data = MsgIBCSoftwareUpgrade.encode(request).finish();
        const promise = this.rpc.request(this.service, "IBCSoftwareUpgrade", data);
        return promise.then((data) => MsgIBCSoftwareUpgradeResponse.decode(_m0.Reader.create(data)));
    }
    UpdateClientParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateClientParams", data);
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
function isSet(value) {
    return value !== null && value !== undefined;
}
