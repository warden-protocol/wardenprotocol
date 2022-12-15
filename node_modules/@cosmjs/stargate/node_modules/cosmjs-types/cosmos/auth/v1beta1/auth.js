"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.ModuleAccount = exports.BaseAccount = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../google/protobuf/any");
exports.protobufPackage = "cosmos.auth.v1beta1";
const baseBaseAccount = { address: "", accountNumber: long_1.default.UZERO, sequence: long_1.default.UZERO };
exports.BaseAccount = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.pubKey !== undefined) {
            any_1.Any.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
        }
        if (!message.accountNumber.isZero()) {
            writer.uint32(24).uint64(message.accountNumber);
        }
        if (!message.sequence.isZero()) {
            writer.uint32(32).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseBaseAccount);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.pubKey = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.accountNumber = reader.uint64();
                    break;
                case 4:
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
        const message = Object.assign({}, baseBaseAccount);
        message.address = object.address !== undefined && object.address !== null ? String(object.address) : "";
        message.pubKey =
            object.pubKey !== undefined && object.pubKey !== null ? any_1.Any.fromJSON(object.pubKey) : undefined;
        message.accountNumber =
            object.accountNumber !== undefined && object.accountNumber !== null
                ? long_1.default.fromString(object.accountNumber)
                : long_1.default.UZERO;
        message.sequence =
            object.sequence !== undefined && object.sequence !== null
                ? long_1.default.fromString(object.sequence)
                : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.pubKey !== undefined && (obj.pubKey = message.pubKey ? any_1.Any.toJSON(message.pubKey) : undefined);
        message.accountNumber !== undefined &&
            (obj.accountNumber = (message.accountNumber || long_1.default.UZERO).toString());
        message.sequence !== undefined && (obj.sequence = (message.sequence || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseBaseAccount);
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        message.pubKey =
            object.pubKey !== undefined && object.pubKey !== null ? any_1.Any.fromPartial(object.pubKey) : undefined;
        message.accountNumber =
            object.accountNumber !== undefined && object.accountNumber !== null
                ? long_1.default.fromValue(object.accountNumber)
                : long_1.default.UZERO;
        message.sequence =
            object.sequence !== undefined && object.sequence !== null
                ? long_1.default.fromValue(object.sequence)
                : long_1.default.UZERO;
        return message;
    },
};
const baseModuleAccount = { name: "", permissions: "" };
exports.ModuleAccount = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.baseAccount !== undefined) {
            exports.BaseAccount.encode(message.baseAccount, writer.uint32(10).fork()).ldelim();
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        for (const v of message.permissions) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseModuleAccount);
        message.permissions = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.baseAccount = exports.BaseAccount.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.permissions.push(reader.string());
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
        const message = Object.assign({}, baseModuleAccount);
        message.baseAccount =
            object.baseAccount !== undefined && object.baseAccount !== null
                ? exports.BaseAccount.fromJSON(object.baseAccount)
                : undefined;
        message.name = object.name !== undefined && object.name !== null ? String(object.name) : "";
        message.permissions = ((_a = object.permissions) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.baseAccount !== undefined &&
            (obj.baseAccount = message.baseAccount ? exports.BaseAccount.toJSON(message.baseAccount) : undefined);
        message.name !== undefined && (obj.name = message.name);
        if (message.permissions) {
            obj.permissions = message.permissions.map((e) => e);
        }
        else {
            obj.permissions = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseModuleAccount);
        message.baseAccount =
            object.baseAccount !== undefined && object.baseAccount !== null
                ? exports.BaseAccount.fromPartial(object.baseAccount)
                : undefined;
        message.name = (_a = object.name) !== null && _a !== void 0 ? _a : "";
        message.permissions = ((_b = object.permissions) === null || _b === void 0 ? void 0 : _b.map((e) => e)) || [];
        return message;
    },
};
const baseParams = {
    maxMemoCharacters: long_1.default.UZERO,
    txSigLimit: long_1.default.UZERO,
    txSizeCostPerByte: long_1.default.UZERO,
    sigVerifyCostEd25519: long_1.default.UZERO,
    sigVerifyCostSecp256k1: long_1.default.UZERO,
};
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.maxMemoCharacters.isZero()) {
            writer.uint32(8).uint64(message.maxMemoCharacters);
        }
        if (!message.txSigLimit.isZero()) {
            writer.uint32(16).uint64(message.txSigLimit);
        }
        if (!message.txSizeCostPerByte.isZero()) {
            writer.uint32(24).uint64(message.txSizeCostPerByte);
        }
        if (!message.sigVerifyCostEd25519.isZero()) {
            writer.uint32(32).uint64(message.sigVerifyCostEd25519);
        }
        if (!message.sigVerifyCostSecp256k1.isZero()) {
            writer.uint32(40).uint64(message.sigVerifyCostSecp256k1);
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
                    message.maxMemoCharacters = reader.uint64();
                    break;
                case 2:
                    message.txSigLimit = reader.uint64();
                    break;
                case 3:
                    message.txSizeCostPerByte = reader.uint64();
                    break;
                case 4:
                    message.sigVerifyCostEd25519 = reader.uint64();
                    break;
                case 5:
                    message.sigVerifyCostSecp256k1 = reader.uint64();
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
        message.maxMemoCharacters =
            object.maxMemoCharacters !== undefined && object.maxMemoCharacters !== null
                ? long_1.default.fromString(object.maxMemoCharacters)
                : long_1.default.UZERO;
        message.txSigLimit =
            object.txSigLimit !== undefined && object.txSigLimit !== null
                ? long_1.default.fromString(object.txSigLimit)
                : long_1.default.UZERO;
        message.txSizeCostPerByte =
            object.txSizeCostPerByte !== undefined && object.txSizeCostPerByte !== null
                ? long_1.default.fromString(object.txSizeCostPerByte)
                : long_1.default.UZERO;
        message.sigVerifyCostEd25519 =
            object.sigVerifyCostEd25519 !== undefined && object.sigVerifyCostEd25519 !== null
                ? long_1.default.fromString(object.sigVerifyCostEd25519)
                : long_1.default.UZERO;
        message.sigVerifyCostSecp256k1 =
            object.sigVerifyCostSecp256k1 !== undefined && object.sigVerifyCostSecp256k1 !== null
                ? long_1.default.fromString(object.sigVerifyCostSecp256k1)
                : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.maxMemoCharacters !== undefined &&
            (obj.maxMemoCharacters = (message.maxMemoCharacters || long_1.default.UZERO).toString());
        message.txSigLimit !== undefined && (obj.txSigLimit = (message.txSigLimit || long_1.default.UZERO).toString());
        message.txSizeCostPerByte !== undefined &&
            (obj.txSizeCostPerByte = (message.txSizeCostPerByte || long_1.default.UZERO).toString());
        message.sigVerifyCostEd25519 !== undefined &&
            (obj.sigVerifyCostEd25519 = (message.sigVerifyCostEd25519 || long_1.default.UZERO).toString());
        message.sigVerifyCostSecp256k1 !== undefined &&
            (obj.sigVerifyCostSecp256k1 = (message.sigVerifyCostSecp256k1 || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseParams);
        message.maxMemoCharacters =
            object.maxMemoCharacters !== undefined && object.maxMemoCharacters !== null
                ? long_1.default.fromValue(object.maxMemoCharacters)
                : long_1.default.UZERO;
        message.txSigLimit =
            object.txSigLimit !== undefined && object.txSigLimit !== null
                ? long_1.default.fromValue(object.txSigLimit)
                : long_1.default.UZERO;
        message.txSizeCostPerByte =
            object.txSizeCostPerByte !== undefined && object.txSizeCostPerByte !== null
                ? long_1.default.fromValue(object.txSizeCostPerByte)
                : long_1.default.UZERO;
        message.sigVerifyCostEd25519 =
            object.sigVerifyCostEd25519 !== undefined && object.sigVerifyCostEd25519 !== null
                ? long_1.default.fromValue(object.sigVerifyCostEd25519)
                : long_1.default.UZERO;
        message.sigVerifyCostSecp256k1 =
            object.sigVerifyCostSecp256k1 !== undefined && object.sigVerifyCostSecp256k1 !== null
                ? long_1.default.fromValue(object.sigVerifyCostSecp256k1)
                : long_1.default.UZERO;
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=auth.js.map