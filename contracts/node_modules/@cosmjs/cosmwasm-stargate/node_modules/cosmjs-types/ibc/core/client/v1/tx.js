"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgSubmitMisbehaviourResponse = exports.MsgSubmitMisbehaviour = exports.MsgUpgradeClientResponse = exports.MsgUpgradeClient = exports.MsgUpdateClientResponse = exports.MsgUpdateClient = exports.MsgCreateClientResponse = exports.MsgCreateClient = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../../google/protobuf/any");
exports.protobufPackage = "ibc.core.client.v1";
const baseMsgCreateClient = { signer: "" };
exports.MsgCreateClient = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientState !== undefined) {
            any_1.Any.encode(message.clientState, writer.uint32(10).fork()).ldelim();
        }
        if (message.consensusState !== undefined) {
            any_1.Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgCreateClient);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientState = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.consensusState = any_1.Any.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseMsgCreateClient);
        message.clientState =
            object.clientState !== undefined && object.clientState !== null
                ? any_1.Any.fromJSON(object.clientState)
                : undefined;
        message.consensusState =
            object.consensusState !== undefined && object.consensusState !== null
                ? any_1.Any.fromJSON(object.consensusState)
                : undefined;
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientState !== undefined &&
            (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : undefined);
        message.consensusState !== undefined &&
            (obj.consensusState = message.consensusState ? any_1.Any.toJSON(message.consensusState) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseMsgCreateClient);
        message.clientState =
            object.clientState !== undefined && object.clientState !== null
                ? any_1.Any.fromPartial(object.clientState)
                : undefined;
        message.consensusState =
            object.consensusState !== undefined && object.consensusState !== null
                ? any_1.Any.fromPartial(object.consensusState)
                : undefined;
        message.signer = (_a = object.signer) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseMsgCreateClientResponse = {};
exports.MsgCreateClientResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgCreateClientResponse);
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
        const message = Object.assign({}, baseMsgCreateClientResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgCreateClientResponse);
        return message;
    },
};
const baseMsgUpdateClient = { clientId: "", signer: "" };
exports.MsgUpdateClient = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.header !== undefined) {
            any_1.Any.encode(message.header, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgUpdateClient);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.header = any_1.Any.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseMsgUpdateClient);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.header =
            object.header !== undefined && object.header !== null ? any_1.Any.fromJSON(object.header) : undefined;
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.header !== undefined && (obj.header = message.header ? any_1.Any.toJSON(message.header) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgUpdateClient);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.header =
            object.header !== undefined && object.header !== null ? any_1.Any.fromPartial(object.header) : undefined;
        message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgUpdateClientResponse = {};
exports.MsgUpdateClientResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgUpdateClientResponse);
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
        const message = Object.assign({}, baseMsgUpdateClientResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgUpdateClientResponse);
        return message;
    },
};
const baseMsgUpgradeClient = { clientId: "", signer: "" };
exports.MsgUpgradeClient = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.clientState !== undefined) {
            any_1.Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
        }
        if (message.consensusState !== undefined) {
            any_1.Any.encode(message.consensusState, writer.uint32(26).fork()).ldelim();
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
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgUpgradeClient);
        message.proofUpgradeClient = new Uint8Array();
        message.proofUpgradeConsensusState = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.clientState = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.consensusState = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.proofUpgradeClient = reader.bytes();
                    break;
                case 5:
                    message.proofUpgradeConsensusState = reader.bytes();
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
        const message = Object.assign({}, baseMsgUpgradeClient);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.clientState =
            object.clientState !== undefined && object.clientState !== null
                ? any_1.Any.fromJSON(object.clientState)
                : undefined;
        message.consensusState =
            object.consensusState !== undefined && object.consensusState !== null
                ? any_1.Any.fromJSON(object.consensusState)
                : undefined;
        message.proofUpgradeClient =
            object.proofUpgradeClient !== undefined && object.proofUpgradeClient !== null
                ? bytesFromBase64(object.proofUpgradeClient)
                : new Uint8Array();
        message.proofUpgradeConsensusState =
            object.proofUpgradeConsensusState !== undefined && object.proofUpgradeConsensusState !== null
                ? bytesFromBase64(object.proofUpgradeConsensusState)
                : new Uint8Array();
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.clientState !== undefined &&
            (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : undefined);
        message.consensusState !== undefined &&
            (obj.consensusState = message.consensusState ? any_1.Any.toJSON(message.consensusState) : undefined);
        message.proofUpgradeClient !== undefined &&
            (obj.proofUpgradeClient = base64FromBytes(message.proofUpgradeClient !== undefined ? message.proofUpgradeClient : new Uint8Array()));
        message.proofUpgradeConsensusState !== undefined &&
            (obj.proofUpgradeConsensusState = base64FromBytes(message.proofUpgradeConsensusState !== undefined
                ? message.proofUpgradeConsensusState
                : new Uint8Array()));
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = Object.assign({}, baseMsgUpgradeClient);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.clientState =
            object.clientState !== undefined && object.clientState !== null
                ? any_1.Any.fromPartial(object.clientState)
                : undefined;
        message.consensusState =
            object.consensusState !== undefined && object.consensusState !== null
                ? any_1.Any.fromPartial(object.consensusState)
                : undefined;
        message.proofUpgradeClient = (_b = object.proofUpgradeClient) !== null && _b !== void 0 ? _b : new Uint8Array();
        message.proofUpgradeConsensusState = (_c = object.proofUpgradeConsensusState) !== null && _c !== void 0 ? _c : new Uint8Array();
        message.signer = (_d = object.signer) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
const baseMsgUpgradeClientResponse = {};
exports.MsgUpgradeClientResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgUpgradeClientResponse);
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
        const message = Object.assign({}, baseMsgUpgradeClientResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgUpgradeClientResponse);
        return message;
    },
};
const baseMsgSubmitMisbehaviour = { clientId: "", signer: "" };
exports.MsgSubmitMisbehaviour = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.misbehaviour !== undefined) {
            any_1.Any.encode(message.misbehaviour, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSubmitMisbehaviour);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.misbehaviour = any_1.Any.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseMsgSubmitMisbehaviour);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.misbehaviour =
            object.misbehaviour !== undefined && object.misbehaviour !== null
                ? any_1.Any.fromJSON(object.misbehaviour)
                : undefined;
        message.signer = object.signer !== undefined && object.signer !== null ? String(object.signer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.misbehaviour !== undefined &&
            (obj.misbehaviour = message.misbehaviour ? any_1.Any.toJSON(message.misbehaviour) : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgSubmitMisbehaviour);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.misbehaviour =
            object.misbehaviour !== undefined && object.misbehaviour !== null
                ? any_1.Any.fromPartial(object.misbehaviour)
                : undefined;
        message.signer = (_b = object.signer) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgSubmitMisbehaviourResponse = {};
exports.MsgSubmitMisbehaviourResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSubmitMisbehaviourResponse);
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
        const message = Object.assign({}, baseMsgSubmitMisbehaviourResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgSubmitMisbehaviourResponse);
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateClient = this.CreateClient.bind(this);
        this.UpdateClient = this.UpdateClient.bind(this);
        this.UpgradeClient = this.UpgradeClient.bind(this);
        this.SubmitMisbehaviour = this.SubmitMisbehaviour.bind(this);
    }
    CreateClient(request) {
        const data = exports.MsgCreateClient.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Msg", "CreateClient", data);
        return promise.then((data) => exports.MsgCreateClientResponse.decode(new minimal_1.default.Reader(data)));
    }
    UpdateClient(request) {
        const data = exports.MsgUpdateClient.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Msg", "UpdateClient", data);
        return promise.then((data) => exports.MsgUpdateClientResponse.decode(new minimal_1.default.Reader(data)));
    }
    UpgradeClient(request) {
        const data = exports.MsgUpgradeClient.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Msg", "UpgradeClient", data);
        return promise.then((data) => exports.MsgUpgradeClientResponse.decode(new minimal_1.default.Reader(data)));
    }
    SubmitMisbehaviour(request) {
        const data = exports.MsgSubmitMisbehaviour.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Msg", "SubmitMisbehaviour", data);
        return promise.then((data) => exports.MsgSubmitMisbehaviourResponse.decode(new minimal_1.default.Reader(data)));
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