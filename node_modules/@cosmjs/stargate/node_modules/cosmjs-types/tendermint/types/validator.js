"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleValidator = exports.Validator = exports.ValidatorSet = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const keys_1 = require("../../tendermint/crypto/keys");
exports.protobufPackage = "tendermint.types";
const baseValidatorSet = { totalVotingPower: long_1.default.ZERO };
exports.ValidatorSet = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.validators) {
            exports.Validator.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.proposer !== undefined) {
            exports.Validator.encode(message.proposer, writer.uint32(18).fork()).ldelim();
        }
        if (!message.totalVotingPower.isZero()) {
            writer.uint32(24).int64(message.totalVotingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidatorSet);
        message.validators = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validators.push(exports.Validator.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.proposer = exports.Validator.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.totalVotingPower = reader.int64();
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
        const message = Object.assign({}, baseValidatorSet);
        message.validators = ((_a = object.validators) !== null && _a !== void 0 ? _a : []).map((e) => exports.Validator.fromJSON(e));
        message.proposer =
            object.proposer !== undefined && object.proposer !== null
                ? exports.Validator.fromJSON(object.proposer)
                : undefined;
        message.totalVotingPower =
            object.totalVotingPower !== undefined && object.totalVotingPower !== null
                ? long_1.default.fromString(object.totalVotingPower)
                : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map((e) => (e ? exports.Validator.toJSON(e) : undefined));
        }
        else {
            obj.validators = [];
        }
        message.proposer !== undefined &&
            (obj.proposer = message.proposer ? exports.Validator.toJSON(message.proposer) : undefined);
        message.totalVotingPower !== undefined &&
            (obj.totalVotingPower = (message.totalVotingPower || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseValidatorSet);
        message.validators = ((_a = object.validators) === null || _a === void 0 ? void 0 : _a.map((e) => exports.Validator.fromPartial(e))) || [];
        message.proposer =
            object.proposer !== undefined && object.proposer !== null
                ? exports.Validator.fromPartial(object.proposer)
                : undefined;
        message.totalVotingPower =
            object.totalVotingPower !== undefined && object.totalVotingPower !== null
                ? long_1.default.fromValue(object.totalVotingPower)
                : long_1.default.ZERO;
        return message;
    },
};
const baseValidator = { votingPower: long_1.default.ZERO, proposerPriority: long_1.default.ZERO };
exports.Validator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address.length !== 0) {
            writer.uint32(10).bytes(message.address);
        }
        if (message.pubKey !== undefined) {
            keys_1.PublicKey.encode(message.pubKey, writer.uint32(18).fork()).ldelim();
        }
        if (!message.votingPower.isZero()) {
            writer.uint32(24).int64(message.votingPower);
        }
        if (!message.proposerPriority.isZero()) {
            writer.uint32(32).int64(message.proposerPriority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidator);
        message.address = new Uint8Array();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.bytes();
                    break;
                case 2:
                    message.pubKey = keys_1.PublicKey.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.votingPower = reader.int64();
                    break;
                case 4:
                    message.proposerPriority = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseValidator);
        message.address =
            object.address !== undefined && object.address !== null
                ? bytesFromBase64(object.address)
                : new Uint8Array();
        message.pubKey =
            object.pubKey !== undefined && object.pubKey !== null ? keys_1.PublicKey.fromJSON(object.pubKey) : undefined;
        message.votingPower =
            object.votingPower !== undefined && object.votingPower !== null
                ? long_1.default.fromString(object.votingPower)
                : long_1.default.ZERO;
        message.proposerPriority =
            object.proposerPriority !== undefined && object.proposerPriority !== null
                ? long_1.default.fromString(object.proposerPriority)
                : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined &&
            (obj.address = base64FromBytes(message.address !== undefined ? message.address : new Uint8Array()));
        message.pubKey !== undefined &&
            (obj.pubKey = message.pubKey ? keys_1.PublicKey.toJSON(message.pubKey) : undefined);
        message.votingPower !== undefined && (obj.votingPower = (message.votingPower || long_1.default.ZERO).toString());
        message.proposerPriority !== undefined &&
            (obj.proposerPriority = (message.proposerPriority || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseValidator);
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : new Uint8Array();
        message.pubKey =
            object.pubKey !== undefined && object.pubKey !== null
                ? keys_1.PublicKey.fromPartial(object.pubKey)
                : undefined;
        message.votingPower =
            object.votingPower !== undefined && object.votingPower !== null
                ? long_1.default.fromValue(object.votingPower)
                : long_1.default.ZERO;
        message.proposerPriority =
            object.proposerPriority !== undefined && object.proposerPriority !== null
                ? long_1.default.fromValue(object.proposerPriority)
                : long_1.default.ZERO;
        return message;
    },
};
const baseSimpleValidator = { votingPower: long_1.default.ZERO };
exports.SimpleValidator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.pubKey !== undefined) {
            keys_1.PublicKey.encode(message.pubKey, writer.uint32(10).fork()).ldelim();
        }
        if (!message.votingPower.isZero()) {
            writer.uint32(16).int64(message.votingPower);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSimpleValidator);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pubKey = keys_1.PublicKey.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.votingPower = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSimpleValidator);
        message.pubKey =
            object.pubKey !== undefined && object.pubKey !== null ? keys_1.PublicKey.fromJSON(object.pubKey) : undefined;
        message.votingPower =
            object.votingPower !== undefined && object.votingPower !== null
                ? long_1.default.fromString(object.votingPower)
                : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pubKey !== undefined &&
            (obj.pubKey = message.pubKey ? keys_1.PublicKey.toJSON(message.pubKey) : undefined);
        message.votingPower !== undefined && (obj.votingPower = (message.votingPower || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseSimpleValidator);
        message.pubKey =
            object.pubKey !== undefined && object.pubKey !== null
                ? keys_1.PublicKey.fromPartial(object.pubKey)
                : undefined;
        message.votingPower =
            object.votingPower !== undefined && object.votingPower !== null
                ? long_1.default.fromValue(object.votingPower)
                : long_1.default.ZERO;
        return message;
    },
};
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
//# sourceMappingURL=validator.js.map