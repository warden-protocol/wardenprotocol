"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = exports.DenomUnit = exports.Supply = exports.Output = exports.Input = exports.SendEnabled = exports.Params = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
exports.protobufPackage = "cosmos.bank.v1beta1";
const baseParams = { defaultSendEnabled: false };
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.sendEnabled) {
            exports.SendEnabled.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.defaultSendEnabled === true) {
            writer.uint32(16).bool(message.defaultSendEnabled);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseParams);
        message.sendEnabled = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sendEnabled.push(exports.SendEnabled.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.defaultSendEnabled = reader.bool();
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
        const message = Object.assign({}, baseParams);
        message.sendEnabled = ((_a = object.sendEnabled) !== null && _a !== void 0 ? _a : []).map((e) => exports.SendEnabled.fromJSON(e));
        message.defaultSendEnabled =
            object.defaultSendEnabled !== undefined && object.defaultSendEnabled !== null
                ? Boolean(object.defaultSendEnabled)
                : false;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.sendEnabled) {
            obj.sendEnabled = message.sendEnabled.map((e) => (e ? exports.SendEnabled.toJSON(e) : undefined));
        }
        else {
            obj.sendEnabled = [];
        }
        message.defaultSendEnabled !== undefined && (obj.defaultSendEnabled = message.defaultSendEnabled);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseParams);
        message.sendEnabled = ((_a = object.sendEnabled) === null || _a === void 0 ? void 0 : _a.map((e) => exports.SendEnabled.fromPartial(e))) || [];
        message.defaultSendEnabled = (_b = object.defaultSendEnabled) !== null && _b !== void 0 ? _b : false;
        return message;
    },
};
const baseSendEnabled = { denom: "", enabled: false };
exports.SendEnabled = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        if (message.enabled === true) {
            writer.uint32(16).bool(message.enabled);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSendEnabled);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.enabled = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSendEnabled);
        message.denom = object.denom !== undefined && object.denom !== null ? String(object.denom) : "";
        message.enabled =
            object.enabled !== undefined && object.enabled !== null ? Boolean(object.enabled) : false;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.denom !== undefined && (obj.denom = message.denom);
        message.enabled !== undefined && (obj.enabled = message.enabled);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseSendEnabled);
        message.denom = (_a = object.denom) !== null && _a !== void 0 ? _a : "";
        message.enabled = (_b = object.enabled) !== null && _b !== void 0 ? _b : false;
        return message;
    },
};
const baseInput = { address: "" };
exports.Input = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        for (const v of message.coins) {
            coin_1.Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseInput);
        message.coins = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.coins.push(coin_1.Coin.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseInput);
        message.address = object.address !== undefined && object.address !== null ? String(object.address) : "";
        message.coins = ((_a = object.coins) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        if (message.coins) {
            obj.coins = message.coins.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.coins = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseInput);
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        message.coins = ((_b = object.coins) === null || _b === void 0 ? void 0 : _b.map((e) => coin_1.Coin.fromPartial(e))) || [];
        return message;
    },
};
const baseOutput = { address: "" };
exports.Output = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        for (const v of message.coins) {
            coin_1.Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseOutput);
        message.coins = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.coins.push(coin_1.Coin.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseOutput);
        message.address = object.address !== undefined && object.address !== null ? String(object.address) : "";
        message.coins = ((_a = object.coins) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        if (message.coins) {
            obj.coins = message.coins.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.coins = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseOutput);
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        message.coins = ((_b = object.coins) === null || _b === void 0 ? void 0 : _b.map((e) => coin_1.Coin.fromPartial(e))) || [];
        return message;
    },
};
const baseSupply = {};
exports.Supply = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.total) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSupply);
        message.total = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.total.push(coin_1.Coin.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseSupply);
        message.total = ((_a = object.total) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.total) {
            obj.total = message.total.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.total = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseSupply);
        message.total = ((_a = object.total) === null || _a === void 0 ? void 0 : _a.map((e) => coin_1.Coin.fromPartial(e))) || [];
        return message;
    },
};
const baseDenomUnit = { denom: "", exponent: 0, aliases: "" };
exports.DenomUnit = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.denom !== "") {
            writer.uint32(10).string(message.denom);
        }
        if (message.exponent !== 0) {
            writer.uint32(16).uint32(message.exponent);
        }
        for (const v of message.aliases) {
            writer.uint32(26).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDenomUnit);
        message.aliases = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.exponent = reader.uint32();
                    break;
                case 3:
                    message.aliases.push(reader.string());
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
        const message = Object.assign({}, baseDenomUnit);
        message.denom = object.denom !== undefined && object.denom !== null ? String(object.denom) : "";
        message.exponent =
            object.exponent !== undefined && object.exponent !== null ? Number(object.exponent) : 0;
        message.aliases = ((_a = object.aliases) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.denom !== undefined && (obj.denom = message.denom);
        message.exponent !== undefined && (obj.exponent = message.exponent);
        if (message.aliases) {
            obj.aliases = message.aliases.map((e) => e);
        }
        else {
            obj.aliases = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseDenomUnit);
        message.denom = (_a = object.denom) !== null && _a !== void 0 ? _a : "";
        message.exponent = (_b = object.exponent) !== null && _b !== void 0 ? _b : 0;
        message.aliases = ((_c = object.aliases) === null || _c === void 0 ? void 0 : _c.map((e) => e)) || [];
        return message;
    },
};
const baseMetadata = { description: "", base: "", display: "", name: "", symbol: "" };
exports.Metadata = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.description !== "") {
            writer.uint32(10).string(message.description);
        }
        for (const v of message.denomUnits) {
            exports.DenomUnit.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.base !== "") {
            writer.uint32(26).string(message.base);
        }
        if (message.display !== "") {
            writer.uint32(34).string(message.display);
        }
        if (message.name !== "") {
            writer.uint32(42).string(message.name);
        }
        if (message.symbol !== "") {
            writer.uint32(50).string(message.symbol);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMetadata);
        message.denomUnits = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.description = reader.string();
                    break;
                case 2:
                    message.denomUnits.push(exports.DenomUnit.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.base = reader.string();
                    break;
                case 4:
                    message.display = reader.string();
                    break;
                case 5:
                    message.name = reader.string();
                    break;
                case 6:
                    message.symbol = reader.string();
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
        const message = Object.assign({}, baseMetadata);
        message.description =
            object.description !== undefined && object.description !== null ? String(object.description) : "";
        message.denomUnits = ((_a = object.denomUnits) !== null && _a !== void 0 ? _a : []).map((e) => exports.DenomUnit.fromJSON(e));
        message.base = object.base !== undefined && object.base !== null ? String(object.base) : "";
        message.display = object.display !== undefined && object.display !== null ? String(object.display) : "";
        message.name = object.name !== undefined && object.name !== null ? String(object.name) : "";
        message.symbol = object.symbol !== undefined && object.symbol !== null ? String(object.symbol) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.description !== undefined && (obj.description = message.description);
        if (message.denomUnits) {
            obj.denomUnits = message.denomUnits.map((e) => (e ? exports.DenomUnit.toJSON(e) : undefined));
        }
        else {
            obj.denomUnits = [];
        }
        message.base !== undefined && (obj.base = message.base);
        message.display !== undefined && (obj.display = message.display);
        message.name !== undefined && (obj.name = message.name);
        message.symbol !== undefined && (obj.symbol = message.symbol);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = Object.assign({}, baseMetadata);
        message.description = (_a = object.description) !== null && _a !== void 0 ? _a : "";
        message.denomUnits = ((_b = object.denomUnits) === null || _b === void 0 ? void 0 : _b.map((e) => exports.DenomUnit.fromPartial(e))) || [];
        message.base = (_c = object.base) !== null && _c !== void 0 ? _c : "";
        message.display = (_d = object.display) !== null && _d !== void 0 ? _d : "";
        message.name = (_e = object.name) !== null && _e !== void 0 ? _e : "";
        message.symbol = (_f = object.symbol) !== null && _f !== void 0 ? _f : "";
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=bank.js.map