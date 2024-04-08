/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { AccessConfig, Params } from "./types";
export const protobufPackage = "cosmwasm.wasm.v1";
function createBaseMsgStoreCode() {
    return { sender: "", wasmByteCode: new Uint8Array(0), instantiatePermission: undefined };
}
export const MsgStoreCode = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.wasmByteCode.length !== 0) {
            writer.uint32(18).bytes(message.wasmByteCode);
        }
        if (message.instantiatePermission !== undefined) {
            AccessConfig.encode(message.instantiatePermission, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStoreCode();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.wasmByteCode = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.instantiatePermission = AccessConfig.decode(reader, reader.uint32());
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            wasmByteCode: isSet(object.wasmByteCode) ? bytesFromBase64(object.wasmByteCode) : new Uint8Array(0),
            instantiatePermission: isSet(object.instantiatePermission)
                ? AccessConfig.fromJSON(object.instantiatePermission)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        if (message.wasmByteCode.length !== 0) {
            obj.wasmByteCode = base64FromBytes(message.wasmByteCode);
        }
        if (message.instantiatePermission !== undefined) {
            obj.instantiatePermission = AccessConfig.toJSON(message.instantiatePermission);
        }
        return obj;
    },
    create(base) {
        return MsgStoreCode.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgStoreCode();
        message.sender = object.sender ?? "";
        message.wasmByteCode = object.wasmByteCode ?? new Uint8Array(0);
        message.instantiatePermission =
            (object.instantiatePermission !== undefined && object.instantiatePermission !== null)
                ? AccessConfig.fromPartial(object.instantiatePermission)
                : undefined;
        return message;
    },
};
function createBaseMsgStoreCodeResponse() {
    return { codeId: 0, checksum: new Uint8Array(0) };
}
export const MsgStoreCodeResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.codeId !== 0) {
            writer.uint32(8).uint64(message.codeId);
        }
        if (message.checksum.length !== 0) {
            writer.uint32(18).bytes(message.checksum);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStoreCodeResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.checksum = reader.bytes();
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
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            checksum: isSet(object.checksum) ? bytesFromBase64(object.checksum) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.codeId !== 0) {
            obj.codeId = Math.round(message.codeId);
        }
        if (message.checksum.length !== 0) {
            obj.checksum = base64FromBytes(message.checksum);
        }
        return obj;
    },
    create(base) {
        return MsgStoreCodeResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgStoreCodeResponse();
        message.codeId = object.codeId ?? 0;
        message.checksum = object.checksum ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgInstantiateContract() {
    return { sender: "", admin: "", codeId: 0, label: "", msg: new Uint8Array(0), funds: [] };
}
export const MsgInstantiateContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.admin !== "") {
            writer.uint32(18).string(message.admin);
        }
        if (message.codeId !== 0) {
            writer.uint32(24).uint64(message.codeId);
        }
        if (message.label !== "") {
            writer.uint32(34).string(message.label);
        }
        if (message.msg.length !== 0) {
            writer.uint32(42).bytes(message.msg);
        }
        for (const v of message.funds) {
            Coin.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgInstantiateContract();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.admin = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.label = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.msg = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.funds.push(Coin.decode(reader, reader.uint32()));
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            admin: isSet(object.admin) ? String(object.admin) : "",
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            label: isSet(object.label) ? String(object.label) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
            funds: Array.isArray(object?.funds) ? object.funds.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        if (message.admin !== "") {
            obj.admin = message.admin;
        }
        if (message.codeId !== 0) {
            obj.codeId = Math.round(message.codeId);
        }
        if (message.label !== "") {
            obj.label = message.label;
        }
        if (message.msg.length !== 0) {
            obj.msg = base64FromBytes(message.msg);
        }
        if (message.funds?.length) {
            obj.funds = message.funds.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MsgInstantiateContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgInstantiateContract();
        message.sender = object.sender ?? "";
        message.admin = object.admin ?? "";
        message.codeId = object.codeId ?? 0;
        message.label = object.label ?? "";
        message.msg = object.msg ?? new Uint8Array(0);
        message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgInstantiateContractResponse() {
    return { address: "", data: new Uint8Array(0) };
}
export const MsgInstantiateContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgInstantiateContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
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
            address: isSet(object.address) ? String(object.address) : "",
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return MsgInstantiateContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgInstantiateContractResponse();
        message.address = object.address ?? "";
        message.data = object.data ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgInstantiateContract2() {
    return {
        sender: "",
        admin: "",
        codeId: 0,
        label: "",
        msg: new Uint8Array(0),
        funds: [],
        salt: new Uint8Array(0),
        fixMsg: false,
    };
}
export const MsgInstantiateContract2 = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.admin !== "") {
            writer.uint32(18).string(message.admin);
        }
        if (message.codeId !== 0) {
            writer.uint32(24).uint64(message.codeId);
        }
        if (message.label !== "") {
            writer.uint32(34).string(message.label);
        }
        if (message.msg.length !== 0) {
            writer.uint32(42).bytes(message.msg);
        }
        for (const v of message.funds) {
            Coin.encode(v, writer.uint32(50).fork()).ldelim();
        }
        if (message.salt.length !== 0) {
            writer.uint32(58).bytes(message.salt);
        }
        if (message.fixMsg === true) {
            writer.uint32(64).bool(message.fixMsg);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgInstantiateContract2();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.admin = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.label = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.msg = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.funds.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.salt = reader.bytes();
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.fixMsg = reader.bool();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            admin: isSet(object.admin) ? String(object.admin) : "",
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            label: isSet(object.label) ? String(object.label) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
            funds: Array.isArray(object?.funds) ? object.funds.map((e) => Coin.fromJSON(e)) : [],
            salt: isSet(object.salt) ? bytesFromBase64(object.salt) : new Uint8Array(0),
            fixMsg: isSet(object.fixMsg) ? Boolean(object.fixMsg) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        if (message.admin !== "") {
            obj.admin = message.admin;
        }
        if (message.codeId !== 0) {
            obj.codeId = Math.round(message.codeId);
        }
        if (message.label !== "") {
            obj.label = message.label;
        }
        if (message.msg.length !== 0) {
            obj.msg = base64FromBytes(message.msg);
        }
        if (message.funds?.length) {
            obj.funds = message.funds.map((e) => Coin.toJSON(e));
        }
        if (message.salt.length !== 0) {
            obj.salt = base64FromBytes(message.salt);
        }
        if (message.fixMsg === true) {
            obj.fixMsg = message.fixMsg;
        }
        return obj;
    },
    create(base) {
        return MsgInstantiateContract2.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgInstantiateContract2();
        message.sender = object.sender ?? "";
        message.admin = object.admin ?? "";
        message.codeId = object.codeId ?? 0;
        message.label = object.label ?? "";
        message.msg = object.msg ?? new Uint8Array(0);
        message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
        message.salt = object.salt ?? new Uint8Array(0);
        message.fixMsg = object.fixMsg ?? false;
        return message;
    },
};
function createBaseMsgInstantiateContract2Response() {
    return { address: "", data: new Uint8Array(0) };
}
export const MsgInstantiateContract2Response = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgInstantiateContract2Response();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
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
            address: isSet(object.address) ? String(object.address) : "",
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return MsgInstantiateContract2Response.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgInstantiateContract2Response();
        message.address = object.address ?? "";
        message.data = object.data ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgExecuteContract() {
    return { sender: "", contract: "", msg: new Uint8Array(0), funds: [] };
}
export const MsgExecuteContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.contract !== "") {
            writer.uint32(18).string(message.contract);
        }
        if (message.msg.length !== 0) {
            writer.uint32(26).bytes(message.msg);
        }
        for (const v of message.funds) {
            Coin.encode(v, writer.uint32(42).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgExecuteContract();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.contract = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.msg = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.funds.push(Coin.decode(reader, reader.uint32()));
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            contract: isSet(object.contract) ? String(object.contract) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
            funds: Array.isArray(object?.funds) ? object.funds.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        if (message.contract !== "") {
            obj.contract = message.contract;
        }
        if (message.msg.length !== 0) {
            obj.msg = base64FromBytes(message.msg);
        }
        if (message.funds?.length) {
            obj.funds = message.funds.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MsgExecuteContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgExecuteContract();
        message.sender = object.sender ?? "";
        message.contract = object.contract ?? "";
        message.msg = object.msg ?? new Uint8Array(0);
        message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgExecuteContractResponse() {
    return { data: new Uint8Array(0) };
}
export const MsgExecuteContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgExecuteContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data = reader.bytes();
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
        return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return MsgExecuteContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgExecuteContractResponse();
        message.data = object.data ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgMigrateContract() {
    return { sender: "", contract: "", codeId: 0, msg: new Uint8Array(0) };
}
export const MsgMigrateContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.contract !== "") {
            writer.uint32(18).string(message.contract);
        }
        if (message.codeId !== 0) {
            writer.uint32(24).uint64(message.codeId);
        }
        if (message.msg.length !== 0) {
            writer.uint32(34).bytes(message.msg);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMigrateContract();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.contract = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.msg = reader.bytes();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            contract: isSet(object.contract) ? String(object.contract) : "",
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        if (message.contract !== "") {
            obj.contract = message.contract;
        }
        if (message.codeId !== 0) {
            obj.codeId = Math.round(message.codeId);
        }
        if (message.msg.length !== 0) {
            obj.msg = base64FromBytes(message.msg);
        }
        return obj;
    },
    create(base) {
        return MsgMigrateContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgMigrateContract();
        message.sender = object.sender ?? "";
        message.contract = object.contract ?? "";
        message.codeId = object.codeId ?? 0;
        message.msg = object.msg ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgMigrateContractResponse() {
    return { data: new Uint8Array(0) };
}
export const MsgMigrateContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgMigrateContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data = reader.bytes();
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
        return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return MsgMigrateContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgMigrateContractResponse();
        message.data = object.data ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgUpdateAdmin() {
    return { sender: "", newAdmin: "", contract: "" };
}
export const MsgUpdateAdmin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.newAdmin !== "") {
            writer.uint32(18).string(message.newAdmin);
        }
        if (message.contract !== "") {
            writer.uint32(26).string(message.contract);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateAdmin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.newAdmin = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.contract = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            newAdmin: isSet(object.newAdmin) ? String(object.newAdmin) : "",
            contract: isSet(object.contract) ? String(object.contract) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        if (message.newAdmin !== "") {
            obj.newAdmin = message.newAdmin;
        }
        if (message.contract !== "") {
            obj.contract = message.contract;
        }
        return obj;
    },
    create(base) {
        return MsgUpdateAdmin.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateAdmin();
        message.sender = object.sender ?? "";
        message.newAdmin = object.newAdmin ?? "";
        message.contract = object.contract ?? "";
        return message;
    },
};
function createBaseMsgUpdateAdminResponse() {
    return {};
}
export const MsgUpdateAdminResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateAdminResponse();
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
        return MsgUpdateAdminResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateAdminResponse();
        return message;
    },
};
function createBaseMsgClearAdmin() {
    return { sender: "", contract: "" };
}
export const MsgClearAdmin = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.contract !== "") {
            writer.uint32(26).string(message.contract);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgClearAdmin();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.contract = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            contract: isSet(object.contract) ? String(object.contract) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        if (message.contract !== "") {
            obj.contract = message.contract;
        }
        return obj;
    },
    create(base) {
        return MsgClearAdmin.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgClearAdmin();
        message.sender = object.sender ?? "";
        message.contract = object.contract ?? "";
        return message;
    },
};
function createBaseMsgClearAdminResponse() {
    return {};
}
export const MsgClearAdminResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgClearAdminResponse();
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
        return MsgClearAdminResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgClearAdminResponse();
        return message;
    },
};
function createBaseMsgUpdateInstantiateConfig() {
    return { sender: "", codeId: 0, newInstantiatePermission: undefined };
}
export const MsgUpdateInstantiateConfig = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.codeId !== 0) {
            writer.uint32(16).uint64(message.codeId);
        }
        if (message.newInstantiatePermission !== undefined) {
            AccessConfig.encode(message.newInstantiatePermission, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateInstantiateConfig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.newInstantiatePermission = AccessConfig.decode(reader, reader.uint32());
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            newInstantiatePermission: isSet(object.newInstantiatePermission)
                ? AccessConfig.fromJSON(object.newInstantiatePermission)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        if (message.codeId !== 0) {
            obj.codeId = Math.round(message.codeId);
        }
        if (message.newInstantiatePermission !== undefined) {
            obj.newInstantiatePermission = AccessConfig.toJSON(message.newInstantiatePermission);
        }
        return obj;
    },
    create(base) {
        return MsgUpdateInstantiateConfig.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateInstantiateConfig();
        message.sender = object.sender ?? "";
        message.codeId = object.codeId ?? 0;
        message.newInstantiatePermission =
            (object.newInstantiatePermission !== undefined && object.newInstantiatePermission !== null)
                ? AccessConfig.fromPartial(object.newInstantiatePermission)
                : undefined;
        return message;
    },
};
function createBaseMsgUpdateInstantiateConfigResponse() {
    return {};
}
export const MsgUpdateInstantiateConfigResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateInstantiateConfigResponse();
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
        return MsgUpdateInstantiateConfigResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateInstantiateConfigResponse();
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
function createBaseMsgSudoContract() {
    return { authority: "", contract: "", msg: new Uint8Array(0) };
}
export const MsgSudoContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.contract !== "") {
            writer.uint32(18).string(message.contract);
        }
        if (message.msg.length !== 0) {
            writer.uint32(26).bytes(message.msg);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSudoContract();
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
                    message.contract = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.msg = reader.bytes();
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
            contract: isSet(object.contract) ? String(object.contract) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.contract !== "") {
            obj.contract = message.contract;
        }
        if (message.msg.length !== 0) {
            obj.msg = base64FromBytes(message.msg);
        }
        return obj;
    },
    create(base) {
        return MsgSudoContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSudoContract();
        message.authority = object.authority ?? "";
        message.contract = object.contract ?? "";
        message.msg = object.msg ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgSudoContractResponse() {
    return { data: new Uint8Array(0) };
}
export const MsgSudoContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSudoContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data = reader.bytes();
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
        return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
    },
    toJSON(message) {
        const obj = {};
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return MsgSudoContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSudoContractResponse();
        message.data = object.data ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgPinCodes() {
    return { authority: "", codeIds: [] };
}
export const MsgPinCodes = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        writer.uint32(18).fork();
        for (const v of message.codeIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPinCodes();
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
                    if (tag === 16) {
                        message.codeIds.push(longToNumber(reader.uint64()));
                        continue;
                    }
                    if (tag === 18) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.codeIds.push(longToNumber(reader.uint64()));
                        }
                        continue;
                    }
                    break;
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
            codeIds: Array.isArray(object?.codeIds) ? object.codeIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.codeIds?.length) {
            obj.codeIds = message.codeIds.map((e) => Math.round(e));
        }
        return obj;
    },
    create(base) {
        return MsgPinCodes.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgPinCodes();
        message.authority = object.authority ?? "";
        message.codeIds = object.codeIds?.map((e) => e) || [];
        return message;
    },
};
function createBaseMsgPinCodesResponse() {
    return {};
}
export const MsgPinCodesResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPinCodesResponse();
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
        return MsgPinCodesResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgPinCodesResponse();
        return message;
    },
};
function createBaseMsgUnpinCodes() {
    return { authority: "", codeIds: [] };
}
export const MsgUnpinCodes = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        writer.uint32(18).fork();
        for (const v of message.codeIds) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUnpinCodes();
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
                    if (tag === 16) {
                        message.codeIds.push(longToNumber(reader.uint64()));
                        continue;
                    }
                    if (tag === 18) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.codeIds.push(longToNumber(reader.uint64()));
                        }
                        continue;
                    }
                    break;
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
            codeIds: Array.isArray(object?.codeIds) ? object.codeIds.map((e) => Number(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.codeIds?.length) {
            obj.codeIds = message.codeIds.map((e) => Math.round(e));
        }
        return obj;
    },
    create(base) {
        return MsgUnpinCodes.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUnpinCodes();
        message.authority = object.authority ?? "";
        message.codeIds = object.codeIds?.map((e) => e) || [];
        return message;
    },
};
function createBaseMsgUnpinCodesResponse() {
    return {};
}
export const MsgUnpinCodesResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUnpinCodesResponse();
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
        return MsgUnpinCodesResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUnpinCodesResponse();
        return message;
    },
};
function createBaseMsgStoreAndInstantiateContract() {
    return {
        authority: "",
        wasmByteCode: new Uint8Array(0),
        instantiatePermission: undefined,
        unpinCode: false,
        admin: "",
        label: "",
        msg: new Uint8Array(0),
        funds: [],
        source: "",
        builder: "",
        codeHash: new Uint8Array(0),
    };
}
export const MsgStoreAndInstantiateContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.wasmByteCode.length !== 0) {
            writer.uint32(26).bytes(message.wasmByteCode);
        }
        if (message.instantiatePermission !== undefined) {
            AccessConfig.encode(message.instantiatePermission, writer.uint32(34).fork()).ldelim();
        }
        if (message.unpinCode === true) {
            writer.uint32(40).bool(message.unpinCode);
        }
        if (message.admin !== "") {
            writer.uint32(50).string(message.admin);
        }
        if (message.label !== "") {
            writer.uint32(58).string(message.label);
        }
        if (message.msg.length !== 0) {
            writer.uint32(66).bytes(message.msg);
        }
        for (const v of message.funds) {
            Coin.encode(v, writer.uint32(74).fork()).ldelim();
        }
        if (message.source !== "") {
            writer.uint32(82).string(message.source);
        }
        if (message.builder !== "") {
            writer.uint32(90).string(message.builder);
        }
        if (message.codeHash.length !== 0) {
            writer.uint32(98).bytes(message.codeHash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStoreAndInstantiateContract();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.wasmByteCode = reader.bytes();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.instantiatePermission = AccessConfig.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 40) {
                        break;
                    }
                    message.unpinCode = reader.bool();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.admin = reader.string();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.label = reader.string();
                    continue;
                case 8:
                    if (tag !== 66) {
                        break;
                    }
                    message.msg = reader.bytes();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.funds.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.source = reader.string();
                    continue;
                case 11:
                    if (tag !== 90) {
                        break;
                    }
                    message.builder = reader.string();
                    continue;
                case 12:
                    if (tag !== 98) {
                        break;
                    }
                    message.codeHash = reader.bytes();
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
            wasmByteCode: isSet(object.wasmByteCode) ? bytesFromBase64(object.wasmByteCode) : new Uint8Array(0),
            instantiatePermission: isSet(object.instantiatePermission)
                ? AccessConfig.fromJSON(object.instantiatePermission)
                : undefined,
            unpinCode: isSet(object.unpinCode) ? Boolean(object.unpinCode) : false,
            admin: isSet(object.admin) ? String(object.admin) : "",
            label: isSet(object.label) ? String(object.label) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
            funds: Array.isArray(object?.funds) ? object.funds.map((e) => Coin.fromJSON(e)) : [],
            source: isSet(object.source) ? String(object.source) : "",
            builder: isSet(object.builder) ? String(object.builder) : "",
            codeHash: isSet(object.codeHash) ? bytesFromBase64(object.codeHash) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.wasmByteCode.length !== 0) {
            obj.wasmByteCode = base64FromBytes(message.wasmByteCode);
        }
        if (message.instantiatePermission !== undefined) {
            obj.instantiatePermission = AccessConfig.toJSON(message.instantiatePermission);
        }
        if (message.unpinCode === true) {
            obj.unpinCode = message.unpinCode;
        }
        if (message.admin !== "") {
            obj.admin = message.admin;
        }
        if (message.label !== "") {
            obj.label = message.label;
        }
        if (message.msg.length !== 0) {
            obj.msg = base64FromBytes(message.msg);
        }
        if (message.funds?.length) {
            obj.funds = message.funds.map((e) => Coin.toJSON(e));
        }
        if (message.source !== "") {
            obj.source = message.source;
        }
        if (message.builder !== "") {
            obj.builder = message.builder;
        }
        if (message.codeHash.length !== 0) {
            obj.codeHash = base64FromBytes(message.codeHash);
        }
        return obj;
    },
    create(base) {
        return MsgStoreAndInstantiateContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgStoreAndInstantiateContract();
        message.authority = object.authority ?? "";
        message.wasmByteCode = object.wasmByteCode ?? new Uint8Array(0);
        message.instantiatePermission =
            (object.instantiatePermission !== undefined && object.instantiatePermission !== null)
                ? AccessConfig.fromPartial(object.instantiatePermission)
                : undefined;
        message.unpinCode = object.unpinCode ?? false;
        message.admin = object.admin ?? "";
        message.label = object.label ?? "";
        message.msg = object.msg ?? new Uint8Array(0);
        message.funds = object.funds?.map((e) => Coin.fromPartial(e)) || [];
        message.source = object.source ?? "";
        message.builder = object.builder ?? "";
        message.codeHash = object.codeHash ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgStoreAndInstantiateContractResponse() {
    return { address: "", data: new Uint8Array(0) };
}
export const MsgStoreAndInstantiateContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.data.length !== 0) {
            writer.uint32(18).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStoreAndInstantiateContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.data = reader.bytes();
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
            address: isSet(object.address) ? String(object.address) : "",
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return MsgStoreAndInstantiateContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgStoreAndInstantiateContractResponse();
        message.address = object.address ?? "";
        message.data = object.data ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgAddCodeUploadParamsAddresses() {
    return { authority: "", addresses: [] };
}
export const MsgAddCodeUploadParamsAddresses = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        for (const v of message.addresses) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAddCodeUploadParamsAddresses();
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
                    message.addresses.push(reader.string());
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
            addresses: Array.isArray(object?.addresses) ? object.addresses.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.addresses?.length) {
            obj.addresses = message.addresses;
        }
        return obj;
    },
    create(base) {
        return MsgAddCodeUploadParamsAddresses.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgAddCodeUploadParamsAddresses();
        message.authority = object.authority ?? "";
        message.addresses = object.addresses?.map((e) => e) || [];
        return message;
    },
};
function createBaseMsgAddCodeUploadParamsAddressesResponse() {
    return {};
}
export const MsgAddCodeUploadParamsAddressesResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgAddCodeUploadParamsAddressesResponse();
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
        return MsgAddCodeUploadParamsAddressesResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgAddCodeUploadParamsAddressesResponse();
        return message;
    },
};
function createBaseMsgRemoveCodeUploadParamsAddresses() {
    return { authority: "", addresses: [] };
}
export const MsgRemoveCodeUploadParamsAddresses = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        for (const v of message.addresses) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRemoveCodeUploadParamsAddresses();
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
                    message.addresses.push(reader.string());
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
            addresses: Array.isArray(object?.addresses) ? object.addresses.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.addresses?.length) {
            obj.addresses = message.addresses;
        }
        return obj;
    },
    create(base) {
        return MsgRemoveCodeUploadParamsAddresses.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgRemoveCodeUploadParamsAddresses();
        message.authority = object.authority ?? "";
        message.addresses = object.addresses?.map((e) => e) || [];
        return message;
    },
};
function createBaseMsgRemoveCodeUploadParamsAddressesResponse() {
    return {};
}
export const MsgRemoveCodeUploadParamsAddressesResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgRemoveCodeUploadParamsAddressesResponse();
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
        return MsgRemoveCodeUploadParamsAddressesResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgRemoveCodeUploadParamsAddressesResponse();
        return message;
    },
};
function createBaseMsgStoreAndMigrateContract() {
    return {
        authority: "",
        wasmByteCode: new Uint8Array(0),
        instantiatePermission: undefined,
        contract: "",
        msg: new Uint8Array(0),
    };
}
export const MsgStoreAndMigrateContract = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.wasmByteCode.length !== 0) {
            writer.uint32(18).bytes(message.wasmByteCode);
        }
        if (message.instantiatePermission !== undefined) {
            AccessConfig.encode(message.instantiatePermission, writer.uint32(26).fork()).ldelim();
        }
        if (message.contract !== "") {
            writer.uint32(34).string(message.contract);
        }
        if (message.msg.length !== 0) {
            writer.uint32(42).bytes(message.msg);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStoreAndMigrateContract();
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
                    message.wasmByteCode = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.instantiatePermission = AccessConfig.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.contract = reader.string();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.msg = reader.bytes();
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
            wasmByteCode: isSet(object.wasmByteCode) ? bytesFromBase64(object.wasmByteCode) : new Uint8Array(0),
            instantiatePermission: isSet(object.instantiatePermission)
                ? AccessConfig.fromJSON(object.instantiatePermission)
                : undefined,
            contract: isSet(object.contract) ? String(object.contract) : "",
            msg: isSet(object.msg) ? bytesFromBase64(object.msg) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.wasmByteCode.length !== 0) {
            obj.wasmByteCode = base64FromBytes(message.wasmByteCode);
        }
        if (message.instantiatePermission !== undefined) {
            obj.instantiatePermission = AccessConfig.toJSON(message.instantiatePermission);
        }
        if (message.contract !== "") {
            obj.contract = message.contract;
        }
        if (message.msg.length !== 0) {
            obj.msg = base64FromBytes(message.msg);
        }
        return obj;
    },
    create(base) {
        return MsgStoreAndMigrateContract.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgStoreAndMigrateContract();
        message.authority = object.authority ?? "";
        message.wasmByteCode = object.wasmByteCode ?? new Uint8Array(0);
        message.instantiatePermission =
            (object.instantiatePermission !== undefined && object.instantiatePermission !== null)
                ? AccessConfig.fromPartial(object.instantiatePermission)
                : undefined;
        message.contract = object.contract ?? "";
        message.msg = object.msg ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgStoreAndMigrateContractResponse() {
    return { codeId: 0, checksum: new Uint8Array(0), data: new Uint8Array(0) };
}
export const MsgStoreAndMigrateContractResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.codeId !== 0) {
            writer.uint32(8).uint64(message.codeId);
        }
        if (message.checksum.length !== 0) {
            writer.uint32(18).bytes(message.checksum);
        }
        if (message.data.length !== 0) {
            writer.uint32(26).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgStoreAndMigrateContractResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.codeId = longToNumber(reader.uint64());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.checksum = reader.bytes();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.data = reader.bytes();
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
            codeId: isSet(object.codeId) ? Number(object.codeId) : 0,
            checksum: isSet(object.checksum) ? bytesFromBase64(object.checksum) : new Uint8Array(0),
            data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.codeId !== 0) {
            obj.codeId = Math.round(message.codeId);
        }
        if (message.checksum.length !== 0) {
            obj.checksum = base64FromBytes(message.checksum);
        }
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create(base) {
        return MsgStoreAndMigrateContractResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgStoreAndMigrateContractResponse();
        message.codeId = object.codeId ?? 0;
        message.checksum = object.checksum ?? new Uint8Array(0);
        message.data = object.data ?? new Uint8Array(0);
        return message;
    },
};
function createBaseMsgUpdateContractLabel() {
    return { sender: "", newLabel: "", contract: "" };
}
export const MsgUpdateContractLabel = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.newLabel !== "") {
            writer.uint32(18).string(message.newLabel);
        }
        if (message.contract !== "") {
            writer.uint32(26).string(message.contract);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateContractLabel();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.sender = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.newLabel = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.contract = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            newLabel: isSet(object.newLabel) ? String(object.newLabel) : "",
            contract: isSet(object.contract) ? String(object.contract) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.sender !== "") {
            obj.sender = message.sender;
        }
        if (message.newLabel !== "") {
            obj.newLabel = message.newLabel;
        }
        if (message.contract !== "") {
            obj.contract = message.contract;
        }
        return obj;
    },
    create(base) {
        return MsgUpdateContractLabel.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateContractLabel();
        message.sender = object.sender ?? "";
        message.newLabel = object.newLabel ?? "";
        message.contract = object.contract ?? "";
        return message;
    },
};
function createBaseMsgUpdateContractLabelResponse() {
    return {};
}
export const MsgUpdateContractLabelResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateContractLabelResponse();
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
        return MsgUpdateContractLabelResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateContractLabelResponse();
        return message;
    },
};
export const MsgServiceName = "cosmwasm.wasm.v1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.StoreCode = this.StoreCode.bind(this);
        this.InstantiateContract = this.InstantiateContract.bind(this);
        this.InstantiateContract2 = this.InstantiateContract2.bind(this);
        this.ExecuteContract = this.ExecuteContract.bind(this);
        this.MigrateContract = this.MigrateContract.bind(this);
        this.UpdateAdmin = this.UpdateAdmin.bind(this);
        this.ClearAdmin = this.ClearAdmin.bind(this);
        this.UpdateInstantiateConfig = this.UpdateInstantiateConfig.bind(this);
        this.UpdateParams = this.UpdateParams.bind(this);
        this.SudoContract = this.SudoContract.bind(this);
        this.PinCodes = this.PinCodes.bind(this);
        this.UnpinCodes = this.UnpinCodes.bind(this);
        this.StoreAndInstantiateContract = this.StoreAndInstantiateContract.bind(this);
        this.RemoveCodeUploadParamsAddresses = this.RemoveCodeUploadParamsAddresses.bind(this);
        this.AddCodeUploadParamsAddresses = this.AddCodeUploadParamsAddresses.bind(this);
        this.StoreAndMigrateContract = this.StoreAndMigrateContract.bind(this);
        this.UpdateContractLabel = this.UpdateContractLabel.bind(this);
    }
    StoreCode(request) {
        const data = MsgStoreCode.encode(request).finish();
        const promise = this.rpc.request(this.service, "StoreCode", data);
        return promise.then((data) => MsgStoreCodeResponse.decode(_m0.Reader.create(data)));
    }
    InstantiateContract(request) {
        const data = MsgInstantiateContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "InstantiateContract", data);
        return promise.then((data) => MsgInstantiateContractResponse.decode(_m0.Reader.create(data)));
    }
    InstantiateContract2(request) {
        const data = MsgInstantiateContract2.encode(request).finish();
        const promise = this.rpc.request(this.service, "InstantiateContract2", data);
        return promise.then((data) => MsgInstantiateContract2Response.decode(_m0.Reader.create(data)));
    }
    ExecuteContract(request) {
        const data = MsgExecuteContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "ExecuteContract", data);
        return promise.then((data) => MsgExecuteContractResponse.decode(_m0.Reader.create(data)));
    }
    MigrateContract(request) {
        const data = MsgMigrateContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "MigrateContract", data);
        return promise.then((data) => MsgMigrateContractResponse.decode(_m0.Reader.create(data)));
    }
    UpdateAdmin(request) {
        const data = MsgUpdateAdmin.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateAdmin", data);
        return promise.then((data) => MsgUpdateAdminResponse.decode(_m0.Reader.create(data)));
    }
    ClearAdmin(request) {
        const data = MsgClearAdmin.encode(request).finish();
        const promise = this.rpc.request(this.service, "ClearAdmin", data);
        return promise.then((data) => MsgClearAdminResponse.decode(_m0.Reader.create(data)));
    }
    UpdateInstantiateConfig(request) {
        const data = MsgUpdateInstantiateConfig.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateInstantiateConfig", data);
        return promise.then((data) => MsgUpdateInstantiateConfigResponse.decode(_m0.Reader.create(data)));
    }
    UpdateParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
    }
    SudoContract(request) {
        const data = MsgSudoContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "SudoContract", data);
        return promise.then((data) => MsgSudoContractResponse.decode(_m0.Reader.create(data)));
    }
    PinCodes(request) {
        const data = MsgPinCodes.encode(request).finish();
        const promise = this.rpc.request(this.service, "PinCodes", data);
        return promise.then((data) => MsgPinCodesResponse.decode(_m0.Reader.create(data)));
    }
    UnpinCodes(request) {
        const data = MsgUnpinCodes.encode(request).finish();
        const promise = this.rpc.request(this.service, "UnpinCodes", data);
        return promise.then((data) => MsgUnpinCodesResponse.decode(_m0.Reader.create(data)));
    }
    StoreAndInstantiateContract(request) {
        const data = MsgStoreAndInstantiateContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "StoreAndInstantiateContract", data);
        return promise.then((data) => MsgStoreAndInstantiateContractResponse.decode(_m0.Reader.create(data)));
    }
    RemoveCodeUploadParamsAddresses(request) {
        const data = MsgRemoveCodeUploadParamsAddresses.encode(request).finish();
        const promise = this.rpc.request(this.service, "RemoveCodeUploadParamsAddresses", data);
        return promise.then((data) => MsgRemoveCodeUploadParamsAddressesResponse.decode(_m0.Reader.create(data)));
    }
    AddCodeUploadParamsAddresses(request) {
        const data = MsgAddCodeUploadParamsAddresses.encode(request).finish();
        const promise = this.rpc.request(this.service, "AddCodeUploadParamsAddresses", data);
        return promise.then((data) => MsgAddCodeUploadParamsAddressesResponse.decode(_m0.Reader.create(data)));
    }
    StoreAndMigrateContract(request) {
        const data = MsgStoreAndMigrateContract.encode(request).finish();
        const promise = this.rpc.request(this.service, "StoreAndMigrateContract", data);
        return promise.then((data) => MsgStoreAndMigrateContractResponse.decode(_m0.Reader.create(data)));
    }
    UpdateContractLabel(request) {
        const data = MsgUpdateContractLabel.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateContractLabel", data);
        return promise.then((data) => MsgUpdateContractLabelResponse.decode(_m0.Reader.create(data)));
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
