"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgUndelegateResponse = exports.MsgUndelegate = exports.MsgBeginRedelegateResponse = exports.MsgBeginRedelegate = exports.MsgDelegateResponse = exports.MsgDelegate = exports.MsgEditValidatorResponse = exports.MsgEditValidator = exports.MsgCreateValidatorResponse = exports.MsgCreateValidator = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const staking_1 = require("../../../cosmos/staking/v1beta1/staking");
const any_1 = require("../../../google/protobuf/any");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
const timestamp_1 = require("../../../google/protobuf/timestamp");
exports.protobufPackage = "cosmos.staking.v1beta1";
const baseMsgCreateValidator = { minSelfDelegation: "", delegatorAddress: "", validatorAddress: "" };
exports.MsgCreateValidator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.description !== undefined) {
            staking_1.Description.encode(message.description, writer.uint32(10).fork()).ldelim();
        }
        if (message.commission !== undefined) {
            staking_1.CommissionRates.encode(message.commission, writer.uint32(18).fork()).ldelim();
        }
        if (message.minSelfDelegation !== "") {
            writer.uint32(26).string(message.minSelfDelegation);
        }
        if (message.delegatorAddress !== "") {
            writer.uint32(34).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(42).string(message.validatorAddress);
        }
        if (message.pubkey !== undefined) {
            any_1.Any.encode(message.pubkey, writer.uint32(50).fork()).ldelim();
        }
        if (message.value !== undefined) {
            coin_1.Coin.encode(message.value, writer.uint32(58).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgCreateValidator);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.description = staking_1.Description.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.commission = staking_1.CommissionRates.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.minSelfDelegation = reader.string();
                    break;
                case 4:
                    message.delegatorAddress = reader.string();
                    break;
                case 5:
                    message.validatorAddress = reader.string();
                    break;
                case 6:
                    message.pubkey = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.value = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgCreateValidator);
        message.description =
            object.description !== undefined && object.description !== null
                ? staking_1.Description.fromJSON(object.description)
                : undefined;
        message.commission =
            object.commission !== undefined && object.commission !== null
                ? staking_1.CommissionRates.fromJSON(object.commission)
                : undefined;
        message.minSelfDelegation =
            object.minSelfDelegation !== undefined && object.minSelfDelegation !== null
                ? String(object.minSelfDelegation)
                : "";
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        message.validatorAddress =
            object.validatorAddress !== undefined && object.validatorAddress !== null
                ? String(object.validatorAddress)
                : "";
        message.pubkey =
            object.pubkey !== undefined && object.pubkey !== null ? any_1.Any.fromJSON(object.pubkey) : undefined;
        message.value =
            object.value !== undefined && object.value !== null ? coin_1.Coin.fromJSON(object.value) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.description !== undefined &&
            (obj.description = message.description ? staking_1.Description.toJSON(message.description) : undefined);
        message.commission !== undefined &&
            (obj.commission = message.commission ? staking_1.CommissionRates.toJSON(message.commission) : undefined);
        message.minSelfDelegation !== undefined && (obj.minSelfDelegation = message.minSelfDelegation);
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
        message.pubkey !== undefined && (obj.pubkey = message.pubkey ? any_1.Any.toJSON(message.pubkey) : undefined);
        message.value !== undefined && (obj.value = message.value ? coin_1.Coin.toJSON(message.value) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseMsgCreateValidator);
        message.description =
            object.description !== undefined && object.description !== null
                ? staking_1.Description.fromPartial(object.description)
                : undefined;
        message.commission =
            object.commission !== undefined && object.commission !== null
                ? staking_1.CommissionRates.fromPartial(object.commission)
                : undefined;
        message.minSelfDelegation = (_a = object.minSelfDelegation) !== null && _a !== void 0 ? _a : "";
        message.delegatorAddress = (_b = object.delegatorAddress) !== null && _b !== void 0 ? _b : "";
        message.validatorAddress = (_c = object.validatorAddress) !== null && _c !== void 0 ? _c : "";
        message.pubkey =
            object.pubkey !== undefined && object.pubkey !== null ? any_1.Any.fromPartial(object.pubkey) : undefined;
        message.value =
            object.value !== undefined && object.value !== null ? coin_1.Coin.fromPartial(object.value) : undefined;
        return message;
    },
};
const baseMsgCreateValidatorResponse = {};
exports.MsgCreateValidatorResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgCreateValidatorResponse);
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
        const message = Object.assign({}, baseMsgCreateValidatorResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgCreateValidatorResponse);
        return message;
    },
};
const baseMsgEditValidator = { validatorAddress: "", commissionRate: "", minSelfDelegation: "" };
exports.MsgEditValidator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.description !== undefined) {
            staking_1.Description.encode(message.description, writer.uint32(10).fork()).ldelim();
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.commissionRate !== "") {
            writer.uint32(26).string(message.commissionRate);
        }
        if (message.minSelfDelegation !== "") {
            writer.uint32(34).string(message.minSelfDelegation);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgEditValidator);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.description = staking_1.Description.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                case 3:
                    message.commissionRate = reader.string();
                    break;
                case 4:
                    message.minSelfDelegation = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgEditValidator);
        message.description =
            object.description !== undefined && object.description !== null
                ? staking_1.Description.fromJSON(object.description)
                : undefined;
        message.validatorAddress =
            object.validatorAddress !== undefined && object.validatorAddress !== null
                ? String(object.validatorAddress)
                : "";
        message.commissionRate =
            object.commissionRate !== undefined && object.commissionRate !== null
                ? String(object.commissionRate)
                : "";
        message.minSelfDelegation =
            object.minSelfDelegation !== undefined && object.minSelfDelegation !== null
                ? String(object.minSelfDelegation)
                : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.description !== undefined &&
            (obj.description = message.description ? staking_1.Description.toJSON(message.description) : undefined);
        message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
        message.commissionRate !== undefined && (obj.commissionRate = message.commissionRate);
        message.minSelfDelegation !== undefined && (obj.minSelfDelegation = message.minSelfDelegation);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseMsgEditValidator);
        message.description =
            object.description !== undefined && object.description !== null
                ? staking_1.Description.fromPartial(object.description)
                : undefined;
        message.validatorAddress = (_a = object.validatorAddress) !== null && _a !== void 0 ? _a : "";
        message.commissionRate = (_b = object.commissionRate) !== null && _b !== void 0 ? _b : "";
        message.minSelfDelegation = (_c = object.minSelfDelegation) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseMsgEditValidatorResponse = {};
exports.MsgEditValidatorResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgEditValidatorResponse);
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
        const message = Object.assign({}, baseMsgEditValidatorResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgEditValidatorResponse);
        return message;
    },
};
const baseMsgDelegate = { delegatorAddress: "", validatorAddress: "" };
exports.MsgDelegate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.amount !== undefined) {
            coin_1.Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgDelegate);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                case 3:
                    message.amount = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgDelegate);
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        message.validatorAddress =
            object.validatorAddress !== undefined && object.validatorAddress !== null
                ? String(object.validatorAddress)
                : "";
        message.amount =
            object.amount !== undefined && object.amount !== null ? coin_1.Coin.fromJSON(object.amount) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
        message.amount !== undefined && (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgDelegate);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
        message.amount =
            object.amount !== undefined && object.amount !== null ? coin_1.Coin.fromPartial(object.amount) : undefined;
        return message;
    },
};
const baseMsgDelegateResponse = {};
exports.MsgDelegateResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgDelegateResponse);
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
        const message = Object.assign({}, baseMsgDelegateResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgDelegateResponse);
        return message;
    },
};
const baseMsgBeginRedelegate = {
    delegatorAddress: "",
    validatorSrcAddress: "",
    validatorDstAddress: "",
};
exports.MsgBeginRedelegate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorSrcAddress !== "") {
            writer.uint32(18).string(message.validatorSrcAddress);
        }
        if (message.validatorDstAddress !== "") {
            writer.uint32(26).string(message.validatorDstAddress);
        }
        if (message.amount !== undefined) {
            coin_1.Coin.encode(message.amount, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgBeginRedelegate);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.validatorSrcAddress = reader.string();
                    break;
                case 3:
                    message.validatorDstAddress = reader.string();
                    break;
                case 4:
                    message.amount = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgBeginRedelegate);
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        message.validatorSrcAddress =
            object.validatorSrcAddress !== undefined && object.validatorSrcAddress !== null
                ? String(object.validatorSrcAddress)
                : "";
        message.validatorDstAddress =
            object.validatorDstAddress !== undefined && object.validatorDstAddress !== null
                ? String(object.validatorDstAddress)
                : "";
        message.amount =
            object.amount !== undefined && object.amount !== null ? coin_1.Coin.fromJSON(object.amount) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        message.validatorSrcAddress !== undefined && (obj.validatorSrcAddress = message.validatorSrcAddress);
        message.validatorDstAddress !== undefined && (obj.validatorDstAddress = message.validatorDstAddress);
        message.amount !== undefined && (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseMsgBeginRedelegate);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.validatorSrcAddress = (_b = object.validatorSrcAddress) !== null && _b !== void 0 ? _b : "";
        message.validatorDstAddress = (_c = object.validatorDstAddress) !== null && _c !== void 0 ? _c : "";
        message.amount =
            object.amount !== undefined && object.amount !== null ? coin_1.Coin.fromPartial(object.amount) : undefined;
        return message;
    },
};
const baseMsgBeginRedelegateResponse = {};
exports.MsgBeginRedelegateResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.completionTime !== undefined) {
            timestamp_1.Timestamp.encode(message.completionTime, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgBeginRedelegateResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.completionTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgBeginRedelegateResponse);
        message.completionTime =
            object.completionTime !== undefined && object.completionTime !== null
                ? fromJsonTimestamp(object.completionTime)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.completionTime !== undefined &&
            (obj.completionTime = fromTimestamp(message.completionTime).toISOString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgBeginRedelegateResponse);
        message.completionTime =
            object.completionTime !== undefined && object.completionTime !== null
                ? timestamp_1.Timestamp.fromPartial(object.completionTime)
                : undefined;
        return message;
    },
};
const baseMsgUndelegate = { delegatorAddress: "", validatorAddress: "" };
exports.MsgUndelegate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.amount !== undefined) {
            coin_1.Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgUndelegate);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                case 3:
                    message.amount = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgUndelegate);
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        message.validatorAddress =
            object.validatorAddress !== undefined && object.validatorAddress !== null
                ? String(object.validatorAddress)
                : "";
        message.amount =
            object.amount !== undefined && object.amount !== null ? coin_1.Coin.fromJSON(object.amount) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
        message.amount !== undefined && (obj.amount = message.amount ? coin_1.Coin.toJSON(message.amount) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgUndelegate);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
        message.amount =
            object.amount !== undefined && object.amount !== null ? coin_1.Coin.fromPartial(object.amount) : undefined;
        return message;
    },
};
const baseMsgUndelegateResponse = {};
exports.MsgUndelegateResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.completionTime !== undefined) {
            timestamp_1.Timestamp.encode(message.completionTime, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgUndelegateResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.completionTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgUndelegateResponse);
        message.completionTime =
            object.completionTime !== undefined && object.completionTime !== null
                ? fromJsonTimestamp(object.completionTime)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.completionTime !== undefined &&
            (obj.completionTime = fromTimestamp(message.completionTime).toISOString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgUndelegateResponse);
        message.completionTime =
            object.completionTime !== undefined && object.completionTime !== null
                ? timestamp_1.Timestamp.fromPartial(object.completionTime)
                : undefined;
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateValidator = this.CreateValidator.bind(this);
        this.EditValidator = this.EditValidator.bind(this);
        this.Delegate = this.Delegate.bind(this);
        this.BeginRedelegate = this.BeginRedelegate.bind(this);
        this.Undelegate = this.Undelegate.bind(this);
    }
    CreateValidator(request) {
        const data = exports.MsgCreateValidator.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Msg", "CreateValidator", data);
        return promise.then((data) => exports.MsgCreateValidatorResponse.decode(new minimal_1.default.Reader(data)));
    }
    EditValidator(request) {
        const data = exports.MsgEditValidator.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Msg", "EditValidator", data);
        return promise.then((data) => exports.MsgEditValidatorResponse.decode(new minimal_1.default.Reader(data)));
    }
    Delegate(request) {
        const data = exports.MsgDelegate.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Msg", "Delegate", data);
        return promise.then((data) => exports.MsgDelegateResponse.decode(new minimal_1.default.Reader(data)));
    }
    BeginRedelegate(request) {
        const data = exports.MsgBeginRedelegate.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Msg", "BeginRedelegate", data);
        return promise.then((data) => exports.MsgBeginRedelegateResponse.decode(new minimal_1.default.Reader(data)));
    }
    Undelegate(request) {
        const data = exports.MsgUndelegate.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Msg", "Undelegate", data);
        return promise.then((data) => exports.MsgUndelegateResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
function toTimestamp(date) {
    const seconds = numberToLong(date.getTime() / 1000);
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds.toNumber() * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return toTimestamp(o);
    }
    else if (typeof o === "string") {
        return toTimestamp(new Date(o));
    }
    else {
        return timestamp_1.Timestamp.fromJSON(o);
    }
}
function numberToLong(number) {
    return long_1.default.fromNumber(number);
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=tx.js.map