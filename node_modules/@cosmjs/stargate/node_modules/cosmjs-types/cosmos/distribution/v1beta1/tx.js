"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgFundCommunityPoolResponse = exports.MsgFundCommunityPool = exports.MsgWithdrawValidatorCommissionResponse = exports.MsgWithdrawValidatorCommission = exports.MsgWithdrawDelegatorRewardResponse = exports.MsgWithdrawDelegatorReward = exports.MsgSetWithdrawAddressResponse = exports.MsgSetWithdrawAddress = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
exports.protobufPackage = "cosmos.distribution.v1beta1";
const baseMsgSetWithdrawAddress = { delegatorAddress: "", withdrawAddress: "" };
exports.MsgSetWithdrawAddress = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.withdrawAddress !== "") {
            writer.uint32(18).string(message.withdrawAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSetWithdrawAddress);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.withdrawAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgSetWithdrawAddress);
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        message.withdrawAddress =
            object.withdrawAddress !== undefined && object.withdrawAddress !== null
                ? String(object.withdrawAddress)
                : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        message.withdrawAddress !== undefined && (obj.withdrawAddress = message.withdrawAddress);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgSetWithdrawAddress);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.withdrawAddress = (_b = object.withdrawAddress) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgSetWithdrawAddressResponse = {};
exports.MsgSetWithdrawAddressResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSetWithdrawAddressResponse);
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
        const message = Object.assign({}, baseMsgSetWithdrawAddressResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgSetWithdrawAddressResponse);
        return message;
    },
};
const baseMsgWithdrawDelegatorReward = { delegatorAddress: "", validatorAddress: "" };
exports.MsgWithdrawDelegatorReward = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgWithdrawDelegatorReward);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                case 2:
                    message.validatorAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgWithdrawDelegatorReward);
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        message.validatorAddress =
            object.validatorAddress !== undefined && object.validatorAddress !== null
                ? String(object.validatorAddress)
                : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgWithdrawDelegatorReward);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgWithdrawDelegatorRewardResponse = {};
exports.MsgWithdrawDelegatorRewardResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgWithdrawDelegatorRewardResponse);
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
        const message = Object.assign({}, baseMsgWithdrawDelegatorRewardResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgWithdrawDelegatorRewardResponse);
        return message;
    },
};
const baseMsgWithdrawValidatorCommission = { validatorAddress: "" };
exports.MsgWithdrawValidatorCommission = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgWithdrawValidatorCommission);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgWithdrawValidatorCommission);
        message.validatorAddress =
            object.validatorAddress !== undefined && object.validatorAddress !== null
                ? String(object.validatorAddress)
                : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseMsgWithdrawValidatorCommission);
        message.validatorAddress = (_a = object.validatorAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseMsgWithdrawValidatorCommissionResponse = {};
exports.MsgWithdrawValidatorCommissionResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgWithdrawValidatorCommissionResponse);
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
        const message = Object.assign({}, baseMsgWithdrawValidatorCommissionResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgWithdrawValidatorCommissionResponse);
        return message;
    },
};
const baseMsgFundCommunityPool = { depositor: "" };
exports.MsgFundCommunityPool = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgFundCommunityPool);
        message.amount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.depositor = reader.string();
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
        const message = Object.assign({}, baseMsgFundCommunityPool);
        message.amount = ((_a = object.amount) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
        message.depositor =
            object.depositor !== undefined && object.depositor !== null ? String(object.depositor) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.amount) {
            obj.amount = message.amount.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.amount = [];
        }
        message.depositor !== undefined && (obj.depositor = message.depositor);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgFundCommunityPool);
        message.amount = ((_a = object.amount) === null || _a === void 0 ? void 0 : _a.map((e) => coin_1.Coin.fromPartial(e))) || [];
        message.depositor = (_b = object.depositor) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgFundCommunityPoolResponse = {};
exports.MsgFundCommunityPoolResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgFundCommunityPoolResponse);
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
        const message = Object.assign({}, baseMsgFundCommunityPoolResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgFundCommunityPoolResponse);
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.SetWithdrawAddress = this.SetWithdrawAddress.bind(this);
        this.WithdrawDelegatorReward = this.WithdrawDelegatorReward.bind(this);
        this.WithdrawValidatorCommission = this.WithdrawValidatorCommission.bind(this);
        this.FundCommunityPool = this.FundCommunityPool.bind(this);
    }
    SetWithdrawAddress(request) {
        const data = exports.MsgSetWithdrawAddress.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Msg", "SetWithdrawAddress", data);
        return promise.then((data) => exports.MsgSetWithdrawAddressResponse.decode(new minimal_1.default.Reader(data)));
    }
    WithdrawDelegatorReward(request) {
        const data = exports.MsgWithdrawDelegatorReward.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Msg", "WithdrawDelegatorReward", data);
        return promise.then((data) => exports.MsgWithdrawDelegatorRewardResponse.decode(new minimal_1.default.Reader(data)));
    }
    WithdrawValidatorCommission(request) {
        const data = exports.MsgWithdrawValidatorCommission.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Msg", "WithdrawValidatorCommission", data);
        return promise.then((data) => exports.MsgWithdrawValidatorCommissionResponse.decode(new minimal_1.default.Reader(data)));
    }
    FundCommunityPool(request) {
        const data = exports.MsgFundCommunityPool.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Msg", "FundCommunityPool", data);
        return promise.then((data) => exports.MsgFundCommunityPoolResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=tx.js.map