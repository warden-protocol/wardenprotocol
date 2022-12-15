"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryClientParamsResponse = exports.QueryClientParamsRequest = exports.QueryConsensusStatesResponse = exports.QueryConsensusStatesRequest = exports.QueryConsensusStateResponse = exports.QueryConsensusStateRequest = exports.QueryClientStatesResponse = exports.QueryClientStatesRequest = exports.QueryClientStateResponse = exports.QueryClientStateRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../../google/protobuf/any");
const client_1 = require("../../../../ibc/core/client/v1/client");
const pagination_1 = require("../../../../cosmos/base/query/v1beta1/pagination");
exports.protobufPackage = "ibc.core.client.v1";
const baseQueryClientStateRequest = { clientId: "" };
exports.QueryClientStateRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryClientStateRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryClientStateRequest);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryClientStateRequest);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseQueryClientStateResponse = {};
exports.QueryClientStateResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientState !== undefined) {
            any_1.Any.encode(message.clientState, writer.uint32(10).fork()).ldelim();
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
        const message = Object.assign({}, baseQueryClientStateResponse);
        message.proof = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientState = any_1.Any.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseQueryClientStateResponse);
        message.clientState =
            object.clientState !== undefined && object.clientState !== null
                ? any_1.Any.fromJSON(object.clientState)
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
        message.clientState !== undefined &&
            (obj.clientState = message.clientState ? any_1.Any.toJSON(message.clientState) : undefined);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryClientStateResponse);
        message.clientState =
            object.clientState !== undefined && object.clientState !== null
                ? any_1.Any.fromPartial(object.clientState)
                : undefined;
        message.proof = (_a = object.proof) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        return message;
    },
};
const baseQueryClientStatesRequest = {};
exports.QueryClientStatesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryClientStatesRequest);
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
        const message = Object.assign({}, baseQueryClientStatesRequest);
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
        const message = Object.assign({}, baseQueryClientStatesRequest);
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryClientStatesResponse = {};
exports.QueryClientStatesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.clientStates) {
            client_1.IdentifiedClientState.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryClientStatesResponse);
        message.clientStates = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientStates.push(client_1.IdentifiedClientState.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseQueryClientStatesResponse);
        message.clientStates = ((_a = object.clientStates) !== null && _a !== void 0 ? _a : []).map((e) => client_1.IdentifiedClientState.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.clientStates) {
            obj.clientStates = message.clientStates.map((e) => (e ? client_1.IdentifiedClientState.toJSON(e) : undefined));
        }
        else {
            obj.clientStates = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryClientStatesResponse);
        message.clientStates = ((_a = object.clientStates) === null || _a === void 0 ? void 0 : _a.map((e) => client_1.IdentifiedClientState.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryConsensusStateRequest = {
    clientId: "",
    revisionNumber: long_1.default.UZERO,
    revisionHeight: long_1.default.UZERO,
    latestHeight: false,
};
exports.QueryConsensusStateRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (!message.revisionNumber.isZero()) {
            writer.uint32(16).uint64(message.revisionNumber);
        }
        if (!message.revisionHeight.isZero()) {
            writer.uint32(24).uint64(message.revisionHeight);
        }
        if (message.latestHeight === true) {
            writer.uint32(32).bool(message.latestHeight);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryConsensusStateRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.revisionNumber = reader.uint64();
                    break;
                case 3:
                    message.revisionHeight = reader.uint64();
                    break;
                case 4:
                    message.latestHeight = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryConsensusStateRequest);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.revisionNumber =
            object.revisionNumber !== undefined && object.revisionNumber !== null
                ? long_1.default.fromString(object.revisionNumber)
                : long_1.default.UZERO;
        message.revisionHeight =
            object.revisionHeight !== undefined && object.revisionHeight !== null
                ? long_1.default.fromString(object.revisionHeight)
                : long_1.default.UZERO;
        message.latestHeight =
            object.latestHeight !== undefined && object.latestHeight !== null
                ? Boolean(object.latestHeight)
                : false;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.revisionNumber !== undefined &&
            (obj.revisionNumber = (message.revisionNumber || long_1.default.UZERO).toString());
        message.revisionHeight !== undefined &&
            (obj.revisionHeight = (message.revisionHeight || long_1.default.UZERO).toString());
        message.latestHeight !== undefined && (obj.latestHeight = message.latestHeight);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryConsensusStateRequest);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.revisionNumber =
            object.revisionNumber !== undefined && object.revisionNumber !== null
                ? long_1.default.fromValue(object.revisionNumber)
                : long_1.default.UZERO;
        message.revisionHeight =
            object.revisionHeight !== undefined && object.revisionHeight !== null
                ? long_1.default.fromValue(object.revisionHeight)
                : long_1.default.UZERO;
        message.latestHeight = (_b = object.latestHeight) !== null && _b !== void 0 ? _b : false;
        return message;
    },
};
const baseQueryConsensusStateResponse = {};
exports.QueryConsensusStateResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.consensusState !== undefined) {
            any_1.Any.encode(message.consensusState, writer.uint32(10).fork()).ldelim();
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
        const message = Object.assign({}, baseQueryConsensusStateResponse);
        message.proof = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.consensusState = any_1.Any.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseQueryConsensusStateResponse);
        message.consensusState =
            object.consensusState !== undefined && object.consensusState !== null
                ? any_1.Any.fromJSON(object.consensusState)
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
        message.consensusState !== undefined &&
            (obj.consensusState = message.consensusState ? any_1.Any.toJSON(message.consensusState) : undefined);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proofHeight !== undefined &&
            (obj.proofHeight = message.proofHeight ? client_1.Height.toJSON(message.proofHeight) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryConsensusStateResponse);
        message.consensusState =
            object.consensusState !== undefined && object.consensusState !== null
                ? any_1.Any.fromPartial(object.consensusState)
                : undefined;
        message.proof = (_a = object.proof) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.proofHeight =
            object.proofHeight !== undefined && object.proofHeight !== null
                ? client_1.Height.fromPartial(object.proofHeight)
                : undefined;
        return message;
    },
};
const baseQueryConsensusStatesRequest = { clientId: "" };
exports.QueryConsensusStatesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryConsensusStatesRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
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
        const message = Object.assign({}, baseQueryConsensusStatesRequest);
        message.clientId =
            object.clientId !== undefined && object.clientId !== null ? String(object.clientId) : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.clientId !== undefined && (obj.clientId = message.clientId);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryConsensusStatesRequest);
        message.clientId = (_a = object.clientId) !== null && _a !== void 0 ? _a : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryConsensusStatesResponse = {};
exports.QueryConsensusStatesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.consensusStates) {
            client_1.ConsensusStateWithHeight.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryConsensusStatesResponse);
        message.consensusStates = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.consensusStates.push(client_1.ConsensusStateWithHeight.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseQueryConsensusStatesResponse);
        message.consensusStates = ((_a = object.consensusStates) !== null && _a !== void 0 ? _a : []).map((e) => client_1.ConsensusStateWithHeight.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.consensusStates) {
            obj.consensusStates = message.consensusStates.map((e) => e ? client_1.ConsensusStateWithHeight.toJSON(e) : undefined);
        }
        else {
            obj.consensusStates = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryConsensusStatesResponse);
        message.consensusStates =
            ((_a = object.consensusStates) === null || _a === void 0 ? void 0 : _a.map((e) => client_1.ConsensusStateWithHeight.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryClientParamsRequest = {};
exports.QueryClientParamsRequest = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryClientParamsRequest);
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
        const message = Object.assign({}, baseQueryClientParamsRequest);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseQueryClientParamsRequest);
        return message;
    },
};
const baseQueryClientParamsResponse = {};
exports.QueryClientParamsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.params !== undefined) {
            client_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryClientParamsResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = client_1.Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryClientParamsResponse);
        message.params =
            object.params !== undefined && object.params !== null ? client_1.Params.fromJSON(object.params) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined && (obj.params = message.params ? client_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryClientParamsResponse);
        message.params =
            object.params !== undefined && object.params !== null ? client_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.ClientState = this.ClientState.bind(this);
        this.ClientStates = this.ClientStates.bind(this);
        this.ConsensusState = this.ConsensusState.bind(this);
        this.ConsensusStates = this.ConsensusStates.bind(this);
        this.ClientParams = this.ClientParams.bind(this);
    }
    ClientState(request) {
        const data = exports.QueryClientStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientState", data);
        return promise.then((data) => exports.QueryClientStateResponse.decode(new minimal_1.default.Reader(data)));
    }
    ClientStates(request) {
        const data = exports.QueryClientStatesRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientStates", data);
        return promise.then((data) => exports.QueryClientStatesResponse.decode(new minimal_1.default.Reader(data)));
    }
    ConsensusState(request) {
        const data = exports.QueryConsensusStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ConsensusState", data);
        return promise.then((data) => exports.QueryConsensusStateResponse.decode(new minimal_1.default.Reader(data)));
    }
    ConsensusStates(request) {
        const data = exports.QueryConsensusStatesRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ConsensusStates", data);
        return promise.then((data) => exports.QueryConsensusStatesResponse.decode(new minimal_1.default.Reader(data)));
    }
    ClientParams(request) {
        const data = exports.QueryClientParamsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.client.v1.Query", "ClientParams", data);
        return promise.then((data) => exports.QueryClientParamsResponse.decode(new minimal_1.default.Reader(data)));
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