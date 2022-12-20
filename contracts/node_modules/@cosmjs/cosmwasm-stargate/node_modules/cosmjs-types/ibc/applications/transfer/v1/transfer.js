"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.DenomTrace = exports.FungibleTokenPacketData = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "ibc.applications.transfer.v1";
const baseFungibleTokenPacketData = { denom: "", amount: long_1.default.UZERO, sender: "", receiver: "" };
exports.FungibleTokenPacketData = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        if (!message.amount.isZero()) {
            writer.uint32(16).uint64(message.amount);
        }
        if (message.sender !== "") {
            writer.uint32(26).string(message.sender);
        }
        if (message.receiver !== "") {
            writer.uint32(34).string(message.receiver);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseFungibleTokenPacketData);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.amount = reader.uint64();
                    break;
                case 3:
                    message.sender = reader.string();
                    break;
                case 4:
                    message.receiver = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseFungibleTokenPacketData);
        message.denom = object.denom !== undefined && object.denom !== null ? String(object.denom) : "";
        message.amount =
            object.amount !== undefined && object.amount !== null ? long_1.default.fromString(object.amount) : long_1.default.UZERO;
        message.sender = object.sender !== undefined && object.sender !== null ? String(object.sender) : "";
        message.receiver =
            object.receiver !== undefined && object.receiver !== null ? String(object.receiver) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.denom !== undefined && (obj.denom = message.denom);
        message.amount !== undefined && (obj.amount = (message.amount || long_1.default.UZERO).toString());
        message.sender !== undefined && (obj.sender = message.sender);
        message.receiver !== undefined && (obj.receiver = message.receiver);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseFungibleTokenPacketData);
        message.denom = (_a = object.denom) !== null && _a !== void 0 ? _a : "";
        message.amount =
            object.amount !== undefined && object.amount !== null ? long_1.default.fromValue(object.amount) : long_1.default.UZERO;
        message.sender = (_b = object.sender) !== null && _b !== void 0 ? _b : "";
        message.receiver = (_c = object.receiver) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseDenomTrace = { path: "", baseDenom: "" };
exports.DenomTrace = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.path !== "") {
            writer.uint32(10).string(message.path);
        }
        if (message.baseDenom !== "") {
            writer.uint32(18).string(message.baseDenom);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDenomTrace);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.path = reader.string();
                    break;
                case 2:
                    message.baseDenom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseDenomTrace);
        message.path = object.path !== undefined && object.path !== null ? String(object.path) : "";
        message.baseDenom =
            object.baseDenom !== undefined && object.baseDenom !== null ? String(object.baseDenom) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.path !== undefined && (obj.path = message.path);
        message.baseDenom !== undefined && (obj.baseDenom = message.baseDenom);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseDenomTrace);
        message.path = (_a = object.path) !== null && _a !== void 0 ? _a : "";
        message.baseDenom = (_b = object.baseDenom) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseParams = { sendEnabled: false, receiveEnabled: false };
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sendEnabled === true) {
            writer.uint32(8).bool(message.sendEnabled);
        }
        if (message.receiveEnabled === true) {
            writer.uint32(16).bool(message.receiveEnabled);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseParams);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sendEnabled = reader.bool();
                    break;
                case 2:
                    message.receiveEnabled = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseParams);
        message.sendEnabled =
            object.sendEnabled !== undefined && object.sendEnabled !== null ? Boolean(object.sendEnabled) : false;
        message.receiveEnabled =
            object.receiveEnabled !== undefined && object.receiveEnabled !== null
                ? Boolean(object.receiveEnabled)
                : false;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sendEnabled !== undefined && (obj.sendEnabled = message.sendEnabled);
        message.receiveEnabled !== undefined && (obj.receiveEnabled = message.receiveEnabled);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseParams);
        message.sendEnabled = (_a = object.sendEnabled) !== null && _a !== void 0 ? _a : false;
        message.receiveEnabled = (_b = object.receiveEnabled) !== null && _b !== void 0 ? _b : false;
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=transfer.js.map