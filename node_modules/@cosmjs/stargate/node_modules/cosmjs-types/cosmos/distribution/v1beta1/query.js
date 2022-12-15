"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryCommunityPoolResponse = exports.QueryCommunityPoolRequest = exports.QueryDelegatorWithdrawAddressResponse = exports.QueryDelegatorWithdrawAddressRequest = exports.QueryDelegatorValidatorsResponse = exports.QueryDelegatorValidatorsRequest = exports.QueryDelegationTotalRewardsResponse = exports.QueryDelegationTotalRewardsRequest = exports.QueryDelegationRewardsResponse = exports.QueryDelegationRewardsRequest = exports.QueryValidatorSlashesResponse = exports.QueryValidatorSlashesRequest = exports.QueryValidatorCommissionResponse = exports.QueryValidatorCommissionRequest = exports.QueryValidatorOutstandingRewardsResponse = exports.QueryValidatorOutstandingRewardsRequest = exports.QueryParamsResponse = exports.QueryParamsRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const distribution_1 = require("../../../cosmos/distribution/v1beta1/distribution");
const pagination_1 = require("../../../cosmos/base/query/v1beta1/pagination");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
exports.protobufPackage = "cosmos.distribution.v1beta1";
const baseQueryParamsRequest = {};
exports.QueryParamsRequest = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryParamsRequest);
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
        const message = Object.assign({}, baseQueryParamsRequest);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseQueryParamsRequest);
        return message;
    },
};
const baseQueryParamsResponse = {};
exports.QueryParamsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.params !== undefined) {
            distribution_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryParamsResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = distribution_1.Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryParamsResponse);
        message.params =
            object.params !== undefined && object.params !== null ? distribution_1.Params.fromJSON(object.params) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined && (obj.params = message.params ? distribution_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryParamsResponse);
        message.params =
            object.params !== undefined && object.params !== null ? distribution_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
};
const baseQueryValidatorOutstandingRewardsRequest = { validatorAddress: "" };
exports.QueryValidatorOutstandingRewardsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorOutstandingRewardsRequest);
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
        const message = Object.assign({}, baseQueryValidatorOutstandingRewardsRequest);
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
        const message = Object.assign({}, baseQueryValidatorOutstandingRewardsRequest);
        message.validatorAddress = (_a = object.validatorAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseQueryValidatorOutstandingRewardsResponse = {};
exports.QueryValidatorOutstandingRewardsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.rewards !== undefined) {
            distribution_1.ValidatorOutstandingRewards.encode(message.rewards, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorOutstandingRewardsResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rewards = distribution_1.ValidatorOutstandingRewards.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryValidatorOutstandingRewardsResponse);
        message.rewards =
            object.rewards !== undefined && object.rewards !== null
                ? distribution_1.ValidatorOutstandingRewards.fromJSON(object.rewards)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.rewards !== undefined &&
            (obj.rewards = message.rewards ? distribution_1.ValidatorOutstandingRewards.toJSON(message.rewards) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryValidatorOutstandingRewardsResponse);
        message.rewards =
            object.rewards !== undefined && object.rewards !== null
                ? distribution_1.ValidatorOutstandingRewards.fromPartial(object.rewards)
                : undefined;
        return message;
    },
};
const baseQueryValidatorCommissionRequest = { validatorAddress: "" };
exports.QueryValidatorCommissionRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorCommissionRequest);
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
        const message = Object.assign({}, baseQueryValidatorCommissionRequest);
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
        const message = Object.assign({}, baseQueryValidatorCommissionRequest);
        message.validatorAddress = (_a = object.validatorAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseQueryValidatorCommissionResponse = {};
exports.QueryValidatorCommissionResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.commission !== undefined) {
            distribution_1.ValidatorAccumulatedCommission.encode(message.commission, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorCommissionResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.commission = distribution_1.ValidatorAccumulatedCommission.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryValidatorCommissionResponse);
        message.commission =
            object.commission !== undefined && object.commission !== null
                ? distribution_1.ValidatorAccumulatedCommission.fromJSON(object.commission)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.commission !== undefined &&
            (obj.commission = message.commission
                ? distribution_1.ValidatorAccumulatedCommission.toJSON(message.commission)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryValidatorCommissionResponse);
        message.commission =
            object.commission !== undefined && object.commission !== null
                ? distribution_1.ValidatorAccumulatedCommission.fromPartial(object.commission)
                : undefined;
        return message;
    },
};
const baseQueryValidatorSlashesRequest = {
    validatorAddress: "",
    startingHeight: long_1.default.UZERO,
    endingHeight: long_1.default.UZERO,
};
exports.QueryValidatorSlashesRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        if (!message.startingHeight.isZero()) {
            writer.uint32(16).uint64(message.startingHeight);
        }
        if (!message.endingHeight.isZero()) {
            writer.uint32(24).uint64(message.endingHeight);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorSlashesRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddress = reader.string();
                    break;
                case 2:
                    message.startingHeight = reader.uint64();
                    break;
                case 3:
                    message.endingHeight = reader.uint64();
                    break;
                case 4:
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
        const message = Object.assign({}, baseQueryValidatorSlashesRequest);
        message.validatorAddress =
            object.validatorAddress !== undefined && object.validatorAddress !== null
                ? String(object.validatorAddress)
                : "";
        message.startingHeight =
            object.startingHeight !== undefined && object.startingHeight !== null
                ? long_1.default.fromString(object.startingHeight)
                : long_1.default.UZERO;
        message.endingHeight =
            object.endingHeight !== undefined && object.endingHeight !== null
                ? long_1.default.fromString(object.endingHeight)
                : long_1.default.UZERO;
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
        message.startingHeight !== undefined &&
            (obj.startingHeight = (message.startingHeight || long_1.default.UZERO).toString());
        message.endingHeight !== undefined &&
            (obj.endingHeight = (message.endingHeight || long_1.default.UZERO).toString());
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryValidatorSlashesRequest);
        message.validatorAddress = (_a = object.validatorAddress) !== null && _a !== void 0 ? _a : "";
        message.startingHeight =
            object.startingHeight !== undefined && object.startingHeight !== null
                ? long_1.default.fromValue(object.startingHeight)
                : long_1.default.UZERO;
        message.endingHeight =
            object.endingHeight !== undefined && object.endingHeight !== null
                ? long_1.default.fromValue(object.endingHeight)
                : long_1.default.UZERO;
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryValidatorSlashesResponse = {};
exports.QueryValidatorSlashesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.slashes) {
            distribution_1.ValidatorSlashEvent.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorSlashesResponse);
        message.slashes = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.slashes.push(distribution_1.ValidatorSlashEvent.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseQueryValidatorSlashesResponse);
        message.slashes = ((_a = object.slashes) !== null && _a !== void 0 ? _a : []).map((e) => distribution_1.ValidatorSlashEvent.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.slashes) {
            obj.slashes = message.slashes.map((e) => (e ? distribution_1.ValidatorSlashEvent.toJSON(e) : undefined));
        }
        else {
            obj.slashes = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryValidatorSlashesResponse);
        message.slashes = ((_a = object.slashes) === null || _a === void 0 ? void 0 : _a.map((e) => distribution_1.ValidatorSlashEvent.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryDelegationRewardsRequest = { delegatorAddress: "", validatorAddress: "" };
exports.QueryDelegationRewardsRequest = {
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
        const message = Object.assign({}, baseQueryDelegationRewardsRequest);
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
        const message = Object.assign({}, baseQueryDelegationRewardsRequest);
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
        const message = Object.assign({}, baseQueryDelegationRewardsRequest);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseQueryDelegationRewardsResponse = {};
exports.QueryDelegationRewardsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.rewards) {
            coin_1.DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegationRewardsResponse);
        message.rewards = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rewards.push(coin_1.DecCoin.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseQueryDelegationRewardsResponse);
        message.rewards = ((_a = object.rewards) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.DecCoin.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.rewards) {
            obj.rewards = message.rewards.map((e) => (e ? coin_1.DecCoin.toJSON(e) : undefined));
        }
        else {
            obj.rewards = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegationRewardsResponse);
        message.rewards = ((_a = object.rewards) === null || _a === void 0 ? void 0 : _a.map((e) => coin_1.DecCoin.fromPartial(e))) || [];
        return message;
    },
};
const baseQueryDelegationTotalRewardsRequest = { delegatorAddress: "" };
exports.QueryDelegationTotalRewardsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegationTotalRewardsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryDelegationTotalRewardsRequest);
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegationTotalRewardsRequest);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseQueryDelegationTotalRewardsResponse = {};
exports.QueryDelegationTotalRewardsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.rewards) {
            distribution_1.DelegationDelegatorReward.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.total) {
            coin_1.DecCoin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegationTotalRewardsResponse);
        message.rewards = [];
        message.total = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rewards.push(distribution_1.DelegationDelegatorReward.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.total.push(coin_1.DecCoin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryDelegationTotalRewardsResponse);
        message.rewards = ((_a = object.rewards) !== null && _a !== void 0 ? _a : []).map((e) => distribution_1.DelegationDelegatorReward.fromJSON(e));
        message.total = ((_b = object.total) !== null && _b !== void 0 ? _b : []).map((e) => coin_1.DecCoin.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.rewards) {
            obj.rewards = message.rewards.map((e) => (e ? distribution_1.DelegationDelegatorReward.toJSON(e) : undefined));
        }
        else {
            obj.rewards = [];
        }
        if (message.total) {
            obj.total = message.total.map((e) => (e ? coin_1.DecCoin.toJSON(e) : undefined));
        }
        else {
            obj.total = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryDelegationTotalRewardsResponse);
        message.rewards = ((_a = object.rewards) === null || _a === void 0 ? void 0 : _a.map((e) => distribution_1.DelegationDelegatorReward.fromPartial(e))) || [];
        message.total = ((_b = object.total) === null || _b === void 0 ? void 0 : _b.map((e) => coin_1.DecCoin.fromPartial(e))) || [];
        return message;
    },
};
const baseQueryDelegatorValidatorsRequest = { delegatorAddress: "" };
exports.QueryDelegatorValidatorsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegatorValidatorsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryDelegatorValidatorsRequest);
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegatorValidatorsRequest);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseQueryDelegatorValidatorsResponse = { validators: "" };
exports.QueryDelegatorValidatorsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.validators) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegatorValidatorsResponse);
        message.validators = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validators.push(reader.string());
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
        const message = Object.assign({}, baseQueryDelegatorValidatorsResponse);
        message.validators = ((_a = object.validators) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map((e) => e);
        }
        else {
            obj.validators = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegatorValidatorsResponse);
        message.validators = ((_a = object.validators) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
const baseQueryDelegatorWithdrawAddressRequest = { delegatorAddress: "" };
exports.QueryDelegatorWithdrawAddressRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegatorWithdrawAddressRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryDelegatorWithdrawAddressRequest);
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegatorWithdrawAddressRequest);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseQueryDelegatorWithdrawAddressResponse = { withdrawAddress: "" };
exports.QueryDelegatorWithdrawAddressResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.withdrawAddress !== "") {
            writer.uint32(10).string(message.withdrawAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegatorWithdrawAddressResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
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
        const message = Object.assign({}, baseQueryDelegatorWithdrawAddressResponse);
        message.withdrawAddress =
            object.withdrawAddress !== undefined && object.withdrawAddress !== null
                ? String(object.withdrawAddress)
                : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.withdrawAddress !== undefined && (obj.withdrawAddress = message.withdrawAddress);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegatorWithdrawAddressResponse);
        message.withdrawAddress = (_a = object.withdrawAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseQueryCommunityPoolRequest = {};
exports.QueryCommunityPoolRequest = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryCommunityPoolRequest);
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
        const message = Object.assign({}, baseQueryCommunityPoolRequest);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseQueryCommunityPoolRequest);
        return message;
    },
};
const baseQueryCommunityPoolResponse = {};
exports.QueryCommunityPoolResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.pool) {
            coin_1.DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryCommunityPoolResponse);
        message.pool = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pool.push(coin_1.DecCoin.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseQueryCommunityPoolResponse);
        message.pool = ((_a = object.pool) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.DecCoin.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.pool) {
            obj.pool = message.pool.map((e) => (e ? coin_1.DecCoin.toJSON(e) : undefined));
        }
        else {
            obj.pool = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryCommunityPoolResponse);
        message.pool = ((_a = object.pool) === null || _a === void 0 ? void 0 : _a.map((e) => coin_1.DecCoin.fromPartial(e))) || [];
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Params = this.Params.bind(this);
        this.ValidatorOutstandingRewards = this.ValidatorOutstandingRewards.bind(this);
        this.ValidatorCommission = this.ValidatorCommission.bind(this);
        this.ValidatorSlashes = this.ValidatorSlashes.bind(this);
        this.DelegationRewards = this.DelegationRewards.bind(this);
        this.DelegationTotalRewards = this.DelegationTotalRewards.bind(this);
        this.DelegatorValidators = this.DelegatorValidators.bind(this);
        this.DelegatorWithdrawAddress = this.DelegatorWithdrawAddress.bind(this);
        this.CommunityPool = this.CommunityPool.bind(this);
    }
    Params(request) {
        const data = exports.QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Query", "Params", data);
        return promise.then((data) => exports.QueryParamsResponse.decode(new minimal_1.default.Reader(data)));
    }
    ValidatorOutstandingRewards(request) {
        const data = exports.QueryValidatorOutstandingRewardsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Query", "ValidatorOutstandingRewards", data);
        return promise.then((data) => exports.QueryValidatorOutstandingRewardsResponse.decode(new minimal_1.default.Reader(data)));
    }
    ValidatorCommission(request) {
        const data = exports.QueryValidatorCommissionRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Query", "ValidatorCommission", data);
        return promise.then((data) => exports.QueryValidatorCommissionResponse.decode(new minimal_1.default.Reader(data)));
    }
    ValidatorSlashes(request) {
        const data = exports.QueryValidatorSlashesRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Query", "ValidatorSlashes", data);
        return promise.then((data) => exports.QueryValidatorSlashesResponse.decode(new minimal_1.default.Reader(data)));
    }
    DelegationRewards(request) {
        const data = exports.QueryDelegationRewardsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Query", "DelegationRewards", data);
        return promise.then((data) => exports.QueryDelegationRewardsResponse.decode(new minimal_1.default.Reader(data)));
    }
    DelegationTotalRewards(request) {
        const data = exports.QueryDelegationTotalRewardsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Query", "DelegationTotalRewards", data);
        return promise.then((data) => exports.QueryDelegationTotalRewardsResponse.decode(new minimal_1.default.Reader(data)));
    }
    DelegatorValidators(request) {
        const data = exports.QueryDelegatorValidatorsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Query", "DelegatorValidators", data);
        return promise.then((data) => exports.QueryDelegatorValidatorsResponse.decode(new minimal_1.default.Reader(data)));
    }
    DelegatorWithdrawAddress(request) {
        const data = exports.QueryDelegatorWithdrawAddressRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Query", "DelegatorWithdrawAddress", data);
        return promise.then((data) => exports.QueryDelegatorWithdrawAddressResponse.decode(new minimal_1.default.Reader(data)));
    }
    CommunityPool(request) {
        const data = exports.QueryCommunityPoolRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.distribution.v1beta1.Query", "CommunityPool", data);
        return promise.then((data) => exports.QueryCommunityPoolResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=query.js.map