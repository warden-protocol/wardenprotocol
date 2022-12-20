"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgRevokeAllowanceResponse = exports.MsgRevokeAllowance = exports.MsgGrantAllowanceResponse = exports.MsgGrantAllowance = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../google/protobuf/any");
exports.protobufPackage = "cosmos.feegrant.v1beta1";
const baseMsgGrantAllowance = { granter: "", grantee: "" };
exports.MsgGrantAllowance = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.granter !== "") {
            writer.uint32(10).string(message.granter);
        }
        if (message.grantee !== "") {
            writer.uint32(18).string(message.grantee);
        }
        if (message.allowance !== undefined) {
            any_1.Any.encode(message.allowance, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgGrantAllowance);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.granter = reader.string();
                    break;
                case 2:
                    message.grantee = reader.string();
                    break;
                case 3:
                    message.allowance = any_1.Any.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgGrantAllowance);
        message.granter = object.granter !== undefined && object.granter !== null ? String(object.granter) : "";
        message.grantee = object.grantee !== undefined && object.grantee !== null ? String(object.grantee) : "";
        message.allowance =
            object.allowance !== undefined && object.allowance !== null
                ? any_1.Any.fromJSON(object.allowance)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.granter !== undefined && (obj.granter = message.granter);
        message.grantee !== undefined && (obj.grantee = message.grantee);
        message.allowance !== undefined &&
            (obj.allowance = message.allowance ? any_1.Any.toJSON(message.allowance) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgGrantAllowance);
        message.granter = (_a = object.granter) !== null && _a !== void 0 ? _a : "";
        message.grantee = (_b = object.grantee) !== null && _b !== void 0 ? _b : "";
        message.allowance =
            object.allowance !== undefined && object.allowance !== null
                ? any_1.Any.fromPartial(object.allowance)
                : undefined;
        return message;
    },
};
const baseMsgGrantAllowanceResponse = {};
exports.MsgGrantAllowanceResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgGrantAllowanceResponse);
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
        const message = Object.assign({}, baseMsgGrantAllowanceResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgGrantAllowanceResponse);
        return message;
    },
};
const baseMsgRevokeAllowance = { granter: "", grantee: "" };
exports.MsgRevokeAllowance = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.granter !== "") {
            writer.uint32(10).string(message.granter);
        }
        if (message.grantee !== "") {
            writer.uint32(18).string(message.grantee);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgRevokeAllowance);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.granter = reader.string();
                    break;
                case 2:
                    message.grantee = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgRevokeAllowance);
        message.granter = object.granter !== undefined && object.granter !== null ? String(object.granter) : "";
        message.grantee = object.grantee !== undefined && object.grantee !== null ? String(object.grantee) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.granter !== undefined && (obj.granter = message.granter);
        message.grantee !== undefined && (obj.grantee = message.grantee);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgRevokeAllowance);
        message.granter = (_a = object.granter) !== null && _a !== void 0 ? _a : "";
        message.grantee = (_b = object.grantee) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgRevokeAllowanceResponse = {};
exports.MsgRevokeAllowanceResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgRevokeAllowanceResponse);
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
        const message = Object.assign({}, baseMsgRevokeAllowanceResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgRevokeAllowanceResponse);
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.GrantAllowance = this.GrantAllowance.bind(this);
        this.RevokeAllowance = this.RevokeAllowance.bind(this);
    }
    GrantAllowance(request) {
        const data = exports.MsgGrantAllowance.encode(request).finish();
        const promise = this.rpc.request("cosmos.feegrant.v1beta1.Msg", "GrantAllowance", data);
        return promise.then((data) => exports.MsgGrantAllowanceResponse.decode(new minimal_1.default.Reader(data)));
    }
    RevokeAllowance(request) {
        const data = exports.MsgRevokeAllowance.encode(request).finish();
        const promise = this.rpc.request("cosmos.feegrant.v1beta1.Msg", "RevokeAllowance", data);
        return promise.then((data) => exports.MsgRevokeAllowanceResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=tx.js.map