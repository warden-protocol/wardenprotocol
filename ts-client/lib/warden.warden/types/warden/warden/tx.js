/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";
import { MsgActionCreated } from "../intent/action";
import { keyRequestStatusFromJSON, keyRequestStatusToJSON, keyTypeFromJSON, keyTypeToJSON, } from "./key";
import { KeychainFees } from "./keychain";
import { Params } from "./params";
import { signRequestStatusFromJSON, signRequestStatusToJSON } from "./signature";
import { walletTypeFromJSON, walletTypeToJSON } from "./wallet";
export const protobufPackage = "warden.warden";
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
function createBaseMsgNewSpace() {
    return { creator: "", adminIntentId: 0, signIntentId: 0, additionalOwners: [] };
}
export const MsgNewSpace = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.adminIntentId !== 0) {
            writer.uint32(16).uint64(message.adminIntentId);
        }
        if (message.signIntentId !== 0) {
            writer.uint32(24).uint64(message.signIntentId);
        }
        for (const v of message.additionalOwners) {
            writer.uint32(34).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewSpace();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.adminIntentId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.signIntentId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.additionalOwners.push(reader.string());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            adminIntentId: isSet(object.adminIntentId) ? Number(object.adminIntentId) : 0,
            signIntentId: isSet(object.signIntentId) ? Number(object.signIntentId) : 0,
            additionalOwners: Array.isArray(object?.additionalOwners)
                ? object.additionalOwners.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.adminIntentId !== 0) {
            obj.adminIntentId = Math.round(message.adminIntentId);
        }
        if (message.signIntentId !== 0) {
            obj.signIntentId = Math.round(message.signIntentId);
        }
        if (message.additionalOwners?.length) {
            obj.additionalOwners = message.additionalOwners;
        }
        return obj;
    },
    create(base) {
        return MsgNewSpace.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewSpace();
        message.creator = object.creator ?? "";
        message.adminIntentId = object.adminIntentId ?? 0;
        message.signIntentId = object.signIntentId ?? 0;
        message.additionalOwners = object.additionalOwners?.map((e) => e) || [];
        return message;
    },
};
function createBaseMsgNewSpaceResponse() {
    return { id: 0 };
}
export const MsgNewSpaceResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewSpaceResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = longToNumber(reader.uint64());
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
        return { id: isSet(object.id) ? Number(object.id) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        return obj;
    },
    create(base) {
        return MsgNewSpaceResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewSpaceResponse();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseMsgAddSpaceOwner() {
    return { creator: "", spaceId: 0, newOwner: "", btl: 0 };
}
export const MsgAddSpaceOwner = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.spaceId !== 0) {
            writer.uint32(16).uint64(message.spaceId);
        }
        if (message.newOwner !== "") {
            writer.uint32(26).string(message.newOwner);
        }
        if (message.btl !== 0) {
            writer.uint32(32).uint64(message.btl);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAddSpaceOwner();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.spaceId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.newOwner = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.btl = longToNumber(reader.uint64());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
            newOwner: isSet(object.newOwner) ? String(object.newOwner) : "",
            btl: isSet(object.btl) ? Number(object.btl) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.spaceId !== 0) {
            obj.spaceId = Math.round(message.spaceId);
        }
        if (message.newOwner !== "") {
            obj.newOwner = message.newOwner;
        }
        if (message.btl !== 0) {
            obj.btl = Math.round(message.btl);
        }
        return obj;
    },
    create(base) {
        return MsgAddSpaceOwner.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgAddSpaceOwner();
        message.creator = object.creator ?? "";
        message.spaceId = object.spaceId ?? 0;
        message.newOwner = object.newOwner ?? "";
        message.btl = object.btl ?? 0;
        return message;
    },
};
function createBaseMsgAddSpaceOwnerResponse() {
    return {};
}
export const MsgAddSpaceOwnerResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAddSpaceOwnerResponse();
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
        return MsgAddSpaceOwnerResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgAddSpaceOwnerResponse();
        return message;
    },
};
function createBaseMsgRemoveSpaceOwner() {
    return { creator: "", spaceId: 0, owner: "", btl: 0 };
}
export const MsgRemoveSpaceOwner = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.spaceId !== 0) {
            writer.uint32(16).uint64(message.spaceId);
        }
        if (message.owner !== "") {
            writer.uint32(26).string(message.owner);
        }
        if (message.btl !== 0) {
            writer.uint32(32).uint64(message.btl);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRemoveSpaceOwner();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.spaceId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.owner = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.btl = longToNumber(reader.uint64());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
            owner: isSet(object.owner) ? String(object.owner) : "",
            btl: isSet(object.btl) ? Number(object.btl) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.spaceId !== 0) {
            obj.spaceId = Math.round(message.spaceId);
        }
        if (message.owner !== "") {
            obj.owner = message.owner;
        }
        if (message.btl !== 0) {
            obj.btl = Math.round(message.btl);
        }
        return obj;
    },
    create(base) {
        return MsgRemoveSpaceOwner.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgRemoveSpaceOwner();
        message.creator = object.creator ?? "";
        message.spaceId = object.spaceId ?? 0;
        message.owner = object.owner ?? "";
        message.btl = object.btl ?? 0;
        return message;
    },
};
function createBaseMsgRemoveSpaceOwnerResponse() {
    return {};
}
export const MsgRemoveSpaceOwnerResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRemoveSpaceOwnerResponse();
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
        return MsgRemoveSpaceOwnerResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgRemoveSpaceOwnerResponse();
        return message;
    },
};
function createBaseMsgNewKeychain() {
    return { creator: "", description: "", adminIntentId: 0, keychainFees: undefined };
}
export const MsgNewKeychain = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        if (message.adminIntentId !== 0) {
            writer.uint32(24).uint64(message.adminIntentId);
        }
        if (message.keychainFees !== undefined) {
            KeychainFees.encode(message.keychainFees, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewKeychain();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.description = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.adminIntentId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.keychainFees = KeychainFees.decode(reader, reader.uint32());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            description: isSet(object.description) ? String(object.description) : "",
            adminIntentId: isSet(object.adminIntentId) ? Number(object.adminIntentId) : 0,
            keychainFees: isSet(object.keychainFees) ? KeychainFees.fromJSON(object.keychainFees) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.description !== "") {
            obj.description = message.description;
        }
        if (message.adminIntentId !== 0) {
            obj.adminIntentId = Math.round(message.adminIntentId);
        }
        if (message.keychainFees !== undefined) {
            obj.keychainFees = KeychainFees.toJSON(message.keychainFees);
        }
        return obj;
    },
    create(base) {
        return MsgNewKeychain.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewKeychain();
        message.creator = object.creator ?? "";
        message.description = object.description ?? "";
        message.adminIntentId = object.adminIntentId ?? 0;
        message.keychainFees = (object.keychainFees !== undefined && object.keychainFees !== null)
            ? KeychainFees.fromPartial(object.keychainFees)
            : undefined;
        return message;
    },
};
function createBaseMsgNewKeychainResponse() {
    return { id: 0 };
}
export const MsgNewKeychainResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewKeychainResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = longToNumber(reader.uint64());
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
        return { id: isSet(object.id) ? Number(object.id) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        return obj;
    },
    create(base) {
        return MsgNewKeychainResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewKeychainResponse();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseMsgAddKeychainParty() {
    return { creator: "", keychainId: 0, party: "" };
}
export const MsgAddKeychainParty = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.keychainId !== 0) {
            writer.uint32(16).uint64(message.keychainId);
        }
        if (message.party !== "") {
            writer.uint32(26).string(message.party);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAddKeychainParty();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.keychainId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.party = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
            party: isSet(object.party) ? String(object.party) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.keychainId !== 0) {
            obj.keychainId = Math.round(message.keychainId);
        }
        if (message.party !== "") {
            obj.party = message.party;
        }
        return obj;
    },
    create(base) {
        return MsgAddKeychainParty.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgAddKeychainParty();
        message.creator = object.creator ?? "";
        message.keychainId = object.keychainId ?? 0;
        message.party = object.party ?? "";
        return message;
    },
};
function createBaseMsgAddKeychainPartyResponse() {
    return {};
}
export const MsgAddKeychainPartyResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAddKeychainPartyResponse();
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
        return MsgAddKeychainPartyResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgAddKeychainPartyResponse();
        return message;
    },
};
function createBaseMsgUpdateSpace() {
    return { creator: "", spaceId: 0, adminIntentId: 0, signIntentId: 0, btl: 0 };
}
export const MsgUpdateSpace = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.spaceId !== 0) {
            writer.uint32(16).uint64(message.spaceId);
        }
        if (message.adminIntentId !== 0) {
            writer.uint32(24).uint64(message.adminIntentId);
        }
        if (message.signIntentId !== 0) {
            writer.uint32(32).uint64(message.signIntentId);
        }
        if (message.btl !== 0) {
            writer.uint32(40).uint64(message.btl);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateSpace();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.spaceId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.adminIntentId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.signIntentId = longToNumber(reader.uint64());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.btl = longToNumber(reader.uint64());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
            adminIntentId: isSet(object.adminIntentId) ? Number(object.adminIntentId) : 0,
            signIntentId: isSet(object.signIntentId) ? Number(object.signIntentId) : 0,
            btl: isSet(object.btl) ? Number(object.btl) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.spaceId !== 0) {
            obj.spaceId = Math.round(message.spaceId);
        }
        if (message.adminIntentId !== 0) {
            obj.adminIntentId = Math.round(message.adminIntentId);
        }
        if (message.signIntentId !== 0) {
            obj.signIntentId = Math.round(message.signIntentId);
        }
        if (message.btl !== 0) {
            obj.btl = Math.round(message.btl);
        }
        return obj;
    },
    create(base) {
        return MsgUpdateSpace.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateSpace();
        message.creator = object.creator ?? "";
        message.spaceId = object.spaceId ?? 0;
        message.adminIntentId = object.adminIntentId ?? 0;
        message.signIntentId = object.signIntentId ?? 0;
        message.btl = object.btl ?? 0;
        return message;
    },
};
function createBaseMsgUpdateSpaceResponse() {
    return {};
}
export const MsgUpdateSpaceResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateSpaceResponse();
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
        return MsgUpdateSpaceResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateSpaceResponse();
        return message;
    },
};
function createBaseMsgUpdateKeychain() {
    return { creator: "", keychainId: 0, description: "", isActive: false };
}
export const MsgUpdateKeychain = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.keychainId !== 0) {
            writer.uint32(16).uint64(message.keychainId);
        }
        if (message.description !== "") {
            writer.uint32(26).string(message.description);
        }
        if (message.isActive === true) {
            writer.uint32(32).bool(message.isActive);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateKeychain();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.keychainId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.description = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
            description: isSet(object.description) ? String(object.description) : "",
            isActive: isSet(object.isActive) ? Boolean(object.isActive) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.keychainId !== 0) {
            obj.keychainId = Math.round(message.keychainId);
        }
        if (message.description !== "") {
            obj.description = message.description;
        }
        if (message.isActive === true) {
            obj.isActive = message.isActive;
        }
        return obj;
    },
    create(base) {
        return MsgUpdateKeychain.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateKeychain();
        message.creator = object.creator ?? "";
        message.keychainId = object.keychainId ?? 0;
        message.description = object.description ?? "";
        message.isActive = object.isActive ?? false;
        return message;
    },
};
function createBaseMsgUpdateKeychainResponse() {
    return {};
}
export const MsgUpdateKeychainResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateKeychainResponse();
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
        return MsgUpdateKeychainResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateKeychainResponse();
        return message;
    },
};
function createBaseMsgNewKeyRequest() {
    return { creator: "", spaceId: 0, keychainId: 0, keyType: 0, btl: 0 };
}
export const MsgNewKeyRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.spaceId !== 0) {
            writer.uint32(16).uint64(message.spaceId);
        }
        if (message.keychainId !== 0) {
            writer.uint32(24).uint64(message.keychainId);
        }
        if (message.keyType !== 0) {
            writer.uint32(32).int32(message.keyType);
        }
        if (message.btl !== 0) {
            writer.uint32(40).uint64(message.btl);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewKeyRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.spaceId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.keychainId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.keyType = reader.int32();
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.btl = longToNumber(reader.uint64());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            spaceId: isSet(object.spaceId) ? Number(object.spaceId) : 0,
            keychainId: isSet(object.keychainId) ? Number(object.keychainId) : 0,
            keyType: isSet(object.keyType) ? keyTypeFromJSON(object.keyType) : 0,
            btl: isSet(object.btl) ? Number(object.btl) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.spaceId !== 0) {
            obj.spaceId = Math.round(message.spaceId);
        }
        if (message.keychainId !== 0) {
            obj.keychainId = Math.round(message.keychainId);
        }
        if (message.keyType !== 0) {
            obj.keyType = keyTypeToJSON(message.keyType);
        }
        if (message.btl !== 0) {
            obj.btl = Math.round(message.btl);
        }
        return obj;
    },
    create(base) {
        return MsgNewKeyRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewKeyRequest();
        message.creator = object.creator ?? "";
        message.spaceId = object.spaceId ?? 0;
        message.keychainId = object.keychainId ?? 0;
        message.keyType = object.keyType ?? 0;
        message.btl = object.btl ?? 0;
        return message;
    },
};
function createBaseMsgNewKeyRequestResponse() {
    return { id: 0 };
}
export const MsgNewKeyRequestResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewKeyRequestResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = longToNumber(reader.uint64());
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
        return { id: isSet(object.id) ? Number(object.id) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        return obj;
    },
    create(base) {
        return MsgNewKeyRequestResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewKeyRequestResponse();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseMsgNewKey() {
    return { publicKey: new Uint8Array(0) };
}
export const MsgNewKey = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.publicKey.length !== 0) {
            writer.uint32(10).bytes(message.publicKey);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewKey();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.publicKey = reader.bytes();
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
        return { publicKey: isSet(object.publicKey) ? bytesFromBase64(object.publicKey) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.publicKey.length !== 0) {
            obj.publicKey = base64FromBytes(message.publicKey);
        }
        return obj;
    },
    create(base) {
        return MsgNewKey.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewKey();
        message.publicKey = object.publicKey ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgUpdateKeyRequest() {
    return { creator: "", requestId: 0, status: 0, key: undefined, rejectReason: undefined };
}
export const MsgUpdateKeyRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.requestId !== 0) {
            writer.uint32(16).uint64(message.requestId);
        }
        if (message.status !== 0) {
            writer.uint32(24).int32(message.status);
        }
        if (message.key !== undefined) {
            MsgNewKey.encode(message.key, writer.uint32(34).fork()).ldelim();
        }
        if (message.rejectReason !== undefined) {
            writer.uint32(42).string(message.rejectReason);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateKeyRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.requestId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.status = reader.int32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.key = MsgNewKey.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.rejectReason = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
            status: isSet(object.status) ? keyRequestStatusFromJSON(object.status) : 0,
            key: isSet(object.key) ? MsgNewKey.fromJSON(object.key) : undefined,
            rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.requestId !== 0) {
            obj.requestId = Math.round(message.requestId);
        }
        if (message.status !== 0) {
            obj.status = keyRequestStatusToJSON(message.status);
        }
        if (message.key !== undefined) {
            obj.key = MsgNewKey.toJSON(message.key);
        }
        if (message.rejectReason !== undefined) {
            obj.rejectReason = message.rejectReason;
        }
        return obj;
    },
    create(base) {
        return MsgUpdateKeyRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateKeyRequest();
        message.creator = object.creator ?? "";
        message.requestId = object.requestId ?? 0;
        message.status = object.status ?? 0;
        message.key = (object.key !== undefined && object.key !== null) ? MsgNewKey.fromPartial(object.key) : undefined;
        message.rejectReason = object.rejectReason ?? undefined;
        return message;
    },
};
function createBaseMsgUpdateKeyRequestResponse() {
    return {};
}
export const MsgUpdateKeyRequestResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateKeyRequestResponse();
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
        return MsgUpdateKeyRequestResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateKeyRequestResponse();
        return message;
    },
};
function createBaseMsgNewSignatureRequest() {
    return { creator: "", keyId: 0, dataForSigning: new Uint8Array(0), btl: 0 };
}
export const MsgNewSignatureRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.keyId !== 0) {
            writer.uint32(16).uint64(message.keyId);
        }
        if (message.dataForSigning.length !== 0) {
            writer.uint32(26).bytes(message.dataForSigning);
        }
        if (message.btl !== 0) {
            writer.uint32(32).uint64(message.btl);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewSignatureRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.keyId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.dataForSigning = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.btl = longToNumber(reader.uint64());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            keyId: isSet(object.keyId) ? Number(object.keyId) : 0,
            dataForSigning: isSet(object.dataForSigning) ? bytesFromBase64(object.dataForSigning) : new Uint8Array(0),
            btl: isSet(object.btl) ? Number(object.btl) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.keyId !== 0) {
            obj.keyId = Math.round(message.keyId);
        }
        if (message.dataForSigning.length !== 0) {
            obj.dataForSigning = base64FromBytes(message.dataForSigning);
        }
        if (message.btl !== 0) {
            obj.btl = Math.round(message.btl);
        }
        return obj;
    },
    create(base) {
        return MsgNewSignatureRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewSignatureRequest();
        message.creator = object.creator ?? "";
        message.keyId = object.keyId ?? 0;
        message.dataForSigning = object.dataForSigning ?? new Uint8Array(0);
        message.btl = object.btl ?? 0;
        return message;
    },
};
function createBaseMsgNewSignatureRequestResponse() {
    return { id: 0 };
}
export const MsgNewSignatureRequestResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewSignatureRequestResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = longToNumber(reader.uint64());
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
        return { id: isSet(object.id) ? Number(object.id) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        return obj;
    },
    create(base) {
        return MsgNewSignatureRequestResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewSignatureRequestResponse();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseMsgSignedData() {
    return { signedData: new Uint8Array(0) };
}
export const MsgSignedData = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.signedData.length !== 0) {
            writer.uint32(10).bytes(message.signedData);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSignedData();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.signedData = reader.bytes();
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
        return { signedData: isSet(object.signedData) ? bytesFromBase64(object.signedData) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.signedData.length !== 0) {
            obj.signedData = base64FromBytes(message.signedData);
        }
        return obj;
    },
    create(base) {
        return MsgSignedData.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSignedData();
        message.signedData = object.signedData ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgFulfilSignatureRequest() {
    return { creator: "", requestId: 0, status: 0, payload: undefined, rejectReason: undefined };
}
export const MsgFulfilSignatureRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.requestId !== 0) {
            writer.uint32(16).uint64(message.requestId);
        }
        if (message.status !== 0) {
            writer.uint32(24).int32(message.status);
        }
        if (message.payload !== undefined) {
            MsgSignedData.encode(message.payload, writer.uint32(34).fork()).ldelim();
        }
        if (message.rejectReason !== undefined) {
            writer.uint32(42).string(message.rejectReason);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgFulfilSignatureRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.requestId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.status = reader.int32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.payload = MsgSignedData.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.rejectReason = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            requestId: isSet(object.requestId) ? Number(object.requestId) : 0,
            status: isSet(object.status) ? signRequestStatusFromJSON(object.status) : 0,
            payload: isSet(object.payload) ? MsgSignedData.fromJSON(object.payload) : undefined,
            rejectReason: isSet(object.rejectReason) ? String(object.rejectReason) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.requestId !== 0) {
            obj.requestId = Math.round(message.requestId);
        }
        if (message.status !== 0) {
            obj.status = signRequestStatusToJSON(message.status);
        }
        if (message.payload !== undefined) {
            obj.payload = MsgSignedData.toJSON(message.payload);
        }
        if (message.rejectReason !== undefined) {
            obj.rejectReason = message.rejectReason;
        }
        return obj;
    },
    create(base) {
        return MsgFulfilSignatureRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgFulfilSignatureRequest();
        message.creator = object.creator ?? "";
        message.requestId = object.requestId ?? 0;
        message.status = object.status ?? 0;
        message.payload = (object.payload !== undefined && object.payload !== null)
            ? MsgSignedData.fromPartial(object.payload)
            : undefined;
        message.rejectReason = object.rejectReason ?? undefined;
        return message;
    },
};
function createBaseMsgFulfilSignatureRequestResponse() {
    return {};
}
export const MsgFulfilSignatureRequestResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgFulfilSignatureRequestResponse();
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
        return MsgFulfilSignatureRequestResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgFulfilSignatureRequestResponse();
        return message;
    },
};
function createBaseMsgNewSignTransactionRequest() {
    return { creator: "", keyId: 0, walletType: 0, unsignedTransaction: new Uint8Array(0), btl: 0, metadata: undefined };
}
export const MsgNewSignTransactionRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.keyId !== 0) {
            writer.uint32(16).uint64(message.keyId);
        }
        if (message.walletType !== 0) {
            writer.uint32(24).int32(message.walletType);
        }
        if (message.unsignedTransaction.length !== 0) {
            writer.uint32(34).bytes(message.unsignedTransaction);
        }
        if (message.btl !== 0) {
            writer.uint32(40).uint64(message.btl);
        }
        if (message.metadata !== undefined) {
            Any.encode(message.metadata, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewSignTransactionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.creator = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.keyId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.walletType = reader.int32();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.unsignedTransaction = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.btl = longToNumber(reader.uint64());
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.metadata = Any.decode(reader, reader.uint32());
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            keyId: isSet(object.keyId) ? Number(object.keyId) : 0,
            walletType: isSet(object.walletType) ? walletTypeFromJSON(object.walletType) : 0,
            unsignedTransaction: isSet(object.unsignedTransaction)
                ? bytesFromBase64(object.unsignedTransaction)
                : new Uint8Array(0),
            btl: isSet(object.btl) ? Number(object.btl) : 0,
            metadata: isSet(object.metadata) ? Any.fromJSON(object.metadata) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.creator !== "") {
            obj.creator = message.creator;
        }
        if (message.keyId !== 0) {
            obj.keyId = Math.round(message.keyId);
        }
        if (message.walletType !== 0) {
            obj.walletType = walletTypeToJSON(message.walletType);
        }
        if (message.unsignedTransaction.length !== 0) {
            obj.unsignedTransaction = base64FromBytes(message.unsignedTransaction);
        }
        if (message.btl !== 0) {
            obj.btl = Math.round(message.btl);
        }
        if (message.metadata !== undefined) {
            obj.metadata = Any.toJSON(message.metadata);
        }
        return obj;
    },
    create(base) {
        return MsgNewSignTransactionRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewSignTransactionRequest();
        message.creator = object.creator ?? "";
        message.keyId = object.keyId ?? 0;
        message.walletType = object.walletType ?? 0;
        message.unsignedTransaction = object.unsignedTransaction ?? new Uint8Array(0);
        message.btl = object.btl ?? 0;
        message.metadata = (object.metadata !== undefined && object.metadata !== null)
            ? Any.fromPartial(object.metadata)
            : undefined;
        return message;
    },
};
function createBaseMsgNewSignTransactionRequestResponse() {
    return { id: 0, signatureRequestId: 0 };
}
export const MsgNewSignTransactionRequestResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.signatureRequestId !== 0) {
            writer.uint32(16).uint64(message.signatureRequestId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgNewSignTransactionRequestResponse();
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
                    if (tag !== 16) {
                        break;
                    }
                    message.signatureRequestId = longToNumber(reader.uint64());
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
            signatureRequestId: isSet(object.signatureRequestId) ? Number(object.signatureRequestId) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.signatureRequestId !== 0) {
            obj.signatureRequestId = Math.round(message.signatureRequestId);
        }
        return obj;
    },
    create(base) {
        return MsgNewSignTransactionRequestResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgNewSignTransactionRequestResponse();
        message.id = object.id ?? 0;
        message.signatureRequestId = object.signatureRequestId ?? 0;
        return message;
    },
};
function createBaseMetadataEthereum() {
    return { chainId: 0 };
}
export const MetadataEthereum = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.chainId !== 0) {
            writer.uint32(8).uint64(message.chainId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMetadataEthereum();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.chainId = longToNumber(reader.uint64());
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
        return { chainId: isSet(object.chainId) ? Number(object.chainId) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.chainId !== 0) {
            obj.chainId = Math.round(message.chainId);
        }
        return obj;
    },
    create(base) {
        return MetadataEthereum.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMetadataEthereum();
        message.chainId = object.chainId ?? 0;
        return message;
    },
};
export const MsgServiceName = "warden.warden.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.UpdateParams = this.UpdateParams.bind(this);
        this.NewSpace = this.NewSpace.bind(this);
        this.AddSpaceOwner = this.AddSpaceOwner.bind(this);
        this.RemoveSpaceOwner = this.RemoveSpaceOwner.bind(this);
        this.NewKeychain = this.NewKeychain.bind(this);
        this.AddKeychainParty = this.AddKeychainParty.bind(this);
        this.UpdateSpace = this.UpdateSpace.bind(this);
        this.UpdateKeychain = this.UpdateKeychain.bind(this);
        this.NewKeyRequest = this.NewKeyRequest.bind(this);
        this.UpdateKeyRequest = this.UpdateKeyRequest.bind(this);
        this.NewSignatureRequest = this.NewSignatureRequest.bind(this);
        this.FulfilSignatureRequest = this.FulfilSignatureRequest.bind(this);
        this.NewSignTransactionRequest = this.NewSignTransactionRequest.bind(this);
    }
    UpdateParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
    }
    NewSpace(request) {
        const data = MsgNewSpace.encode(request).finish();
        const promise = this.rpc.request(this.service, "NewSpace", data);
        return promise.then((data) => MsgNewSpaceResponse.decode(_m0.Reader.create(data)));
    }
    AddSpaceOwner(request) {
        const data = MsgAddSpaceOwner.encode(request).finish();
        const promise = this.rpc.request(this.service, "AddSpaceOwner", data);
        return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
    }
    RemoveSpaceOwner(request) {
        const data = MsgRemoveSpaceOwner.encode(request).finish();
        const promise = this.rpc.request(this.service, "RemoveSpaceOwner", data);
        return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
    }
    NewKeychain(request) {
        const data = MsgNewKeychain.encode(request).finish();
        const promise = this.rpc.request(this.service, "NewKeychain", data);
        return promise.then((data) => MsgNewKeychainResponse.decode(_m0.Reader.create(data)));
    }
    AddKeychainParty(request) {
        const data = MsgAddKeychainParty.encode(request).finish();
        const promise = this.rpc.request(this.service, "AddKeychainParty", data);
        return promise.then((data) => MsgAddKeychainPartyResponse.decode(_m0.Reader.create(data)));
    }
    UpdateSpace(request) {
        const data = MsgUpdateSpace.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateSpace", data);
        return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
    }
    UpdateKeychain(request) {
        const data = MsgUpdateKeychain.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateKeychain", data);
        return promise.then((data) => MsgUpdateKeychainResponse.decode(_m0.Reader.create(data)));
    }
    NewKeyRequest(request) {
        const data = MsgNewKeyRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "NewKeyRequest", data);
        return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
    }
    UpdateKeyRequest(request) {
        const data = MsgUpdateKeyRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateKeyRequest", data);
        return promise.then((data) => MsgUpdateKeyRequestResponse.decode(_m0.Reader.create(data)));
    }
    NewSignatureRequest(request) {
        const data = MsgNewSignatureRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "NewSignatureRequest", data);
        return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
    }
    FulfilSignatureRequest(request) {
        const data = MsgFulfilSignatureRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "FulfilSignatureRequest", data);
        return promise.then((data) => MsgFulfilSignatureRequestResponse.decode(_m0.Reader.create(data)));
    }
    NewSignTransactionRequest(request) {
        const data = MsgNewSignTransactionRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "NewSignTransactionRequest", data);
        return promise.then((data) => MsgActionCreated.decode(_m0.Reader.create(data)));
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
