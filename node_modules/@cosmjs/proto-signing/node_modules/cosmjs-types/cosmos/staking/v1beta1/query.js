"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryParamsResponse = exports.QueryParamsRequest = exports.QueryPoolResponse = exports.QueryPoolRequest = exports.QueryHistoricalInfoResponse = exports.QueryHistoricalInfoRequest = exports.QueryDelegatorValidatorResponse = exports.QueryDelegatorValidatorRequest = exports.QueryDelegatorValidatorsResponse = exports.QueryDelegatorValidatorsRequest = exports.QueryRedelegationsResponse = exports.QueryRedelegationsRequest = exports.QueryDelegatorUnbondingDelegationsResponse = exports.QueryDelegatorUnbondingDelegationsRequest = exports.QueryDelegatorDelegationsResponse = exports.QueryDelegatorDelegationsRequest = exports.QueryUnbondingDelegationResponse = exports.QueryUnbondingDelegationRequest = exports.QueryDelegationResponse = exports.QueryDelegationRequest = exports.QueryValidatorUnbondingDelegationsResponse = exports.QueryValidatorUnbondingDelegationsRequest = exports.QueryValidatorDelegationsResponse = exports.QueryValidatorDelegationsRequest = exports.QueryValidatorResponse = exports.QueryValidatorRequest = exports.QueryValidatorsResponse = exports.QueryValidatorsRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const pagination_1 = require("../../../cosmos/base/query/v1beta1/pagination");
const staking_1 = require("../../../cosmos/staking/v1beta1/staking");
exports.protobufPackage = "cosmos.staking.v1beta1";
const baseQueryValidatorsRequest = { status: "" };
exports.QueryValidatorsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.status !== "") {
            writer.uint32(10).string(message.status);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.status = reader.string();
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
        const message = Object.assign({}, baseQueryValidatorsRequest);
        message.status = object.status !== undefined && object.status !== null ? String(object.status) : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.status !== undefined && (obj.status = message.status);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryValidatorsRequest);
        message.status = (_a = object.status) !== null && _a !== void 0 ? _a : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryValidatorsResponse = {};
exports.QueryValidatorsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.validators) {
            staking_1.Validator.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorsResponse);
        message.validators = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validators.push(staking_1.Validator.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseQueryValidatorsResponse);
        message.validators = ((_a = object.validators) !== null && _a !== void 0 ? _a : []).map((e) => staking_1.Validator.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map((e) => (e ? staking_1.Validator.toJSON(e) : undefined));
        }
        else {
            obj.validators = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryValidatorsResponse);
        message.validators = ((_a = object.validators) === null || _a === void 0 ? void 0 : _a.map((e) => staking_1.Validator.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryValidatorRequest = { validatorAddr: "" };
exports.QueryValidatorRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validatorAddr !== "") {
            writer.uint32(10).string(message.validatorAddr);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryValidatorRequest);
        message.validatorAddr =
            object.validatorAddr !== undefined && object.validatorAddr !== null ? String(object.validatorAddr) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.validatorAddr !== undefined && (obj.validatorAddr = message.validatorAddr);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryValidatorRequest);
        message.validatorAddr = (_a = object.validatorAddr) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseQueryValidatorResponse = {};
exports.QueryValidatorResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validator !== undefined) {
            staking_1.Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = staking_1.Validator.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryValidatorResponse);
        message.validator =
            object.validator !== undefined && object.validator !== null
                ? staking_1.Validator.fromJSON(object.validator)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.validator !== undefined &&
            (obj.validator = message.validator ? staking_1.Validator.toJSON(message.validator) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryValidatorResponse);
        message.validator =
            object.validator !== undefined && object.validator !== null
                ? staking_1.Validator.fromPartial(object.validator)
                : undefined;
        return message;
    },
};
const baseQueryValidatorDelegationsRequest = { validatorAddr: "" };
exports.QueryValidatorDelegationsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validatorAddr !== "") {
            writer.uint32(10).string(message.validatorAddr);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorDelegationsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddr = reader.string();
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
        const message = Object.assign({}, baseQueryValidatorDelegationsRequest);
        message.validatorAddr =
            object.validatorAddr !== undefined && object.validatorAddr !== null ? String(object.validatorAddr) : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.validatorAddr !== undefined && (obj.validatorAddr = message.validatorAddr);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryValidatorDelegationsRequest);
        message.validatorAddr = (_a = object.validatorAddr) !== null && _a !== void 0 ? _a : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryValidatorDelegationsResponse = {};
exports.QueryValidatorDelegationsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.delegationResponses) {
            staking_1.DelegationResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorDelegationsResponse);
        message.delegationResponses = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegationResponses.push(staking_1.DelegationResponse.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseQueryValidatorDelegationsResponse);
        message.delegationResponses = ((_a = object.delegationResponses) !== null && _a !== void 0 ? _a : []).map((e) => staking_1.DelegationResponse.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.delegationResponses) {
            obj.delegationResponses = message.delegationResponses.map((e) => e ? staking_1.DelegationResponse.toJSON(e) : undefined);
        }
        else {
            obj.delegationResponses = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryValidatorDelegationsResponse);
        message.delegationResponses =
            ((_a = object.delegationResponses) === null || _a === void 0 ? void 0 : _a.map((e) => staking_1.DelegationResponse.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryValidatorUnbondingDelegationsRequest = { validatorAddr: "" };
exports.QueryValidatorUnbondingDelegationsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validatorAddr !== "") {
            writer.uint32(10).string(message.validatorAddr);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorUnbondingDelegationsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validatorAddr = reader.string();
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
        const message = Object.assign({}, baseQueryValidatorUnbondingDelegationsRequest);
        message.validatorAddr =
            object.validatorAddr !== undefined && object.validatorAddr !== null ? String(object.validatorAddr) : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.validatorAddr !== undefined && (obj.validatorAddr = message.validatorAddr);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryValidatorUnbondingDelegationsRequest);
        message.validatorAddr = (_a = object.validatorAddr) !== null && _a !== void 0 ? _a : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryValidatorUnbondingDelegationsResponse = {};
exports.QueryValidatorUnbondingDelegationsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.unbondingResponses) {
            staking_1.UnbondingDelegation.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryValidatorUnbondingDelegationsResponse);
        message.unbondingResponses = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.unbondingResponses.push(staking_1.UnbondingDelegation.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseQueryValidatorUnbondingDelegationsResponse);
        message.unbondingResponses = ((_a = object.unbondingResponses) !== null && _a !== void 0 ? _a : []).map((e) => staking_1.UnbondingDelegation.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.unbondingResponses) {
            obj.unbondingResponses = message.unbondingResponses.map((e) => e ? staking_1.UnbondingDelegation.toJSON(e) : undefined);
        }
        else {
            obj.unbondingResponses = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryValidatorUnbondingDelegationsResponse);
        message.unbondingResponses =
            ((_a = object.unbondingResponses) === null || _a === void 0 ? void 0 : _a.map((e) => staking_1.UnbondingDelegation.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryDelegationRequest = { delegatorAddr: "", validatorAddr: "" };
exports.QueryDelegationRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.validatorAddr !== "") {
            writer.uint32(18).string(message.validatorAddr);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegationRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
                    message.validatorAddr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryDelegationRequest);
        message.delegatorAddr =
            object.delegatorAddr !== undefined && object.delegatorAddr !== null ? String(object.delegatorAddr) : "";
        message.validatorAddr =
            object.validatorAddr !== undefined && object.validatorAddr !== null ? String(object.validatorAddr) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddr !== undefined && (obj.delegatorAddr = message.delegatorAddr);
        message.validatorAddr !== undefined && (obj.validatorAddr = message.validatorAddr);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryDelegationRequest);
        message.delegatorAddr = (_a = object.delegatorAddr) !== null && _a !== void 0 ? _a : "";
        message.validatorAddr = (_b = object.validatorAddr) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseQueryDelegationResponse = {};
exports.QueryDelegationResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegationResponse !== undefined) {
            staking_1.DelegationResponse.encode(message.delegationResponse, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegationResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegationResponse = staking_1.DelegationResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryDelegationResponse);
        message.delegationResponse =
            object.delegationResponse !== undefined && object.delegationResponse !== null
                ? staking_1.DelegationResponse.fromJSON(object.delegationResponse)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegationResponse !== undefined &&
            (obj.delegationResponse = message.delegationResponse
                ? staking_1.DelegationResponse.toJSON(message.delegationResponse)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryDelegationResponse);
        message.delegationResponse =
            object.delegationResponse !== undefined && object.delegationResponse !== null
                ? staking_1.DelegationResponse.fromPartial(object.delegationResponse)
                : undefined;
        return message;
    },
};
const baseQueryUnbondingDelegationRequest = { delegatorAddr: "", validatorAddr: "" };
exports.QueryUnbondingDelegationRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.validatorAddr !== "") {
            writer.uint32(18).string(message.validatorAddr);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryUnbondingDelegationRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
                    message.validatorAddr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryUnbondingDelegationRequest);
        message.delegatorAddr =
            object.delegatorAddr !== undefined && object.delegatorAddr !== null ? String(object.delegatorAddr) : "";
        message.validatorAddr =
            object.validatorAddr !== undefined && object.validatorAddr !== null ? String(object.validatorAddr) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddr !== undefined && (obj.delegatorAddr = message.delegatorAddr);
        message.validatorAddr !== undefined && (obj.validatorAddr = message.validatorAddr);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryUnbondingDelegationRequest);
        message.delegatorAddr = (_a = object.delegatorAddr) !== null && _a !== void 0 ? _a : "";
        message.validatorAddr = (_b = object.validatorAddr) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseQueryUnbondingDelegationResponse = {};
exports.QueryUnbondingDelegationResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.unbond !== undefined) {
            staking_1.UnbondingDelegation.encode(message.unbond, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryUnbondingDelegationResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.unbond = staking_1.UnbondingDelegation.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryUnbondingDelegationResponse);
        message.unbond =
            object.unbond !== undefined && object.unbond !== null
                ? staking_1.UnbondingDelegation.fromJSON(object.unbond)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.unbond !== undefined &&
            (obj.unbond = message.unbond ? staking_1.UnbondingDelegation.toJSON(message.unbond) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryUnbondingDelegationResponse);
        message.unbond =
            object.unbond !== undefined && object.unbond !== null
                ? staking_1.UnbondingDelegation.fromPartial(object.unbond)
                : undefined;
        return message;
    },
};
const baseQueryDelegatorDelegationsRequest = { delegatorAddr: "" };
exports.QueryDelegatorDelegationsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegatorDelegationsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
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
        const message = Object.assign({}, baseQueryDelegatorDelegationsRequest);
        message.delegatorAddr =
            object.delegatorAddr !== undefined && object.delegatorAddr !== null ? String(object.delegatorAddr) : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddr !== undefined && (obj.delegatorAddr = message.delegatorAddr);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegatorDelegationsRequest);
        message.delegatorAddr = (_a = object.delegatorAddr) !== null && _a !== void 0 ? _a : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryDelegatorDelegationsResponse = {};
exports.QueryDelegatorDelegationsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.delegationResponses) {
            staking_1.DelegationResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegatorDelegationsResponse);
        message.delegationResponses = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegationResponses.push(staking_1.DelegationResponse.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseQueryDelegatorDelegationsResponse);
        message.delegationResponses = ((_a = object.delegationResponses) !== null && _a !== void 0 ? _a : []).map((e) => staking_1.DelegationResponse.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.delegationResponses) {
            obj.delegationResponses = message.delegationResponses.map((e) => e ? staking_1.DelegationResponse.toJSON(e) : undefined);
        }
        else {
            obj.delegationResponses = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegatorDelegationsResponse);
        message.delegationResponses =
            ((_a = object.delegationResponses) === null || _a === void 0 ? void 0 : _a.map((e) => staking_1.DelegationResponse.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryDelegatorUnbondingDelegationsRequest = { delegatorAddr: "" };
exports.QueryDelegatorUnbondingDelegationsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegatorUnbondingDelegationsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
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
        const message = Object.assign({}, baseQueryDelegatorUnbondingDelegationsRequest);
        message.delegatorAddr =
            object.delegatorAddr !== undefined && object.delegatorAddr !== null ? String(object.delegatorAddr) : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddr !== undefined && (obj.delegatorAddr = message.delegatorAddr);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegatorUnbondingDelegationsRequest);
        message.delegatorAddr = (_a = object.delegatorAddr) !== null && _a !== void 0 ? _a : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryDelegatorUnbondingDelegationsResponse = {};
exports.QueryDelegatorUnbondingDelegationsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.unbondingResponses) {
            staking_1.UnbondingDelegation.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegatorUnbondingDelegationsResponse);
        message.unbondingResponses = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.unbondingResponses.push(staking_1.UnbondingDelegation.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseQueryDelegatorUnbondingDelegationsResponse);
        message.unbondingResponses = ((_a = object.unbondingResponses) !== null && _a !== void 0 ? _a : []).map((e) => staking_1.UnbondingDelegation.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.unbondingResponses) {
            obj.unbondingResponses = message.unbondingResponses.map((e) => e ? staking_1.UnbondingDelegation.toJSON(e) : undefined);
        }
        else {
            obj.unbondingResponses = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegatorUnbondingDelegationsResponse);
        message.unbondingResponses =
            ((_a = object.unbondingResponses) === null || _a === void 0 ? void 0 : _a.map((e) => staking_1.UnbondingDelegation.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryRedelegationsRequest = {
    delegatorAddr: "",
    srcValidatorAddr: "",
    dstValidatorAddr: "",
};
exports.QueryRedelegationsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.srcValidatorAddr !== "") {
            writer.uint32(18).string(message.srcValidatorAddr);
        }
        if (message.dstValidatorAddr !== "") {
            writer.uint32(26).string(message.dstValidatorAddr);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryRedelegationsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
                    message.srcValidatorAddr = reader.string();
                    break;
                case 3:
                    message.dstValidatorAddr = reader.string();
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
        const message = Object.assign({}, baseQueryRedelegationsRequest);
        message.delegatorAddr =
            object.delegatorAddr !== undefined && object.delegatorAddr !== null ? String(object.delegatorAddr) : "";
        message.srcValidatorAddr =
            object.srcValidatorAddr !== undefined && object.srcValidatorAddr !== null
                ? String(object.srcValidatorAddr)
                : "";
        message.dstValidatorAddr =
            object.dstValidatorAddr !== undefined && object.dstValidatorAddr !== null
                ? String(object.dstValidatorAddr)
                : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddr !== undefined && (obj.delegatorAddr = message.delegatorAddr);
        message.srcValidatorAddr !== undefined && (obj.srcValidatorAddr = message.srcValidatorAddr);
        message.dstValidatorAddr !== undefined && (obj.dstValidatorAddr = message.dstValidatorAddr);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseQueryRedelegationsRequest);
        message.delegatorAddr = (_a = object.delegatorAddr) !== null && _a !== void 0 ? _a : "";
        message.srcValidatorAddr = (_b = object.srcValidatorAddr) !== null && _b !== void 0 ? _b : "";
        message.dstValidatorAddr = (_c = object.dstValidatorAddr) !== null && _c !== void 0 ? _c : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryRedelegationsResponse = {};
exports.QueryRedelegationsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.redelegationResponses) {
            staking_1.RedelegationResponse.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryRedelegationsResponse);
        message.redelegationResponses = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.redelegationResponses.push(staking_1.RedelegationResponse.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseQueryRedelegationsResponse);
        message.redelegationResponses = ((_a = object.redelegationResponses) !== null && _a !== void 0 ? _a : []).map((e) => staking_1.RedelegationResponse.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.redelegationResponses) {
            obj.redelegationResponses = message.redelegationResponses.map((e) => e ? staking_1.RedelegationResponse.toJSON(e) : undefined);
        }
        else {
            obj.redelegationResponses = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryRedelegationsResponse);
        message.redelegationResponses =
            ((_a = object.redelegationResponses) === null || _a === void 0 ? void 0 : _a.map((e) => staking_1.RedelegationResponse.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryDelegatorValidatorsRequest = { delegatorAddr: "" };
exports.QueryDelegatorValidatorsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
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
                    message.delegatorAddr = reader.string();
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
        const message = Object.assign({}, baseQueryDelegatorValidatorsRequest);
        message.delegatorAddr =
            object.delegatorAddr !== undefined && object.delegatorAddr !== null ? String(object.delegatorAddr) : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddr !== undefined && (obj.delegatorAddr = message.delegatorAddr);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegatorValidatorsRequest);
        message.delegatorAddr = (_a = object.delegatorAddr) !== null && _a !== void 0 ? _a : "";
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryDelegatorValidatorsResponse = {};
exports.QueryDelegatorValidatorsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.validators) {
            staking_1.Validator.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
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
                    message.validators.push(staking_1.Validator.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseQueryDelegatorValidatorsResponse);
        message.validators = ((_a = object.validators) !== null && _a !== void 0 ? _a : []).map((e) => staking_1.Validator.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.validators) {
            obj.validators = message.validators.map((e) => (e ? staking_1.Validator.toJSON(e) : undefined));
        }
        else {
            obj.validators = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQueryDelegatorValidatorsResponse);
        message.validators = ((_a = object.validators) === null || _a === void 0 ? void 0 : _a.map((e) => staking_1.Validator.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQueryDelegatorValidatorRequest = { delegatorAddr: "", validatorAddr: "" };
exports.QueryDelegatorValidatorRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddr !== "") {
            writer.uint32(10).string(message.delegatorAddr);
        }
        if (message.validatorAddr !== "") {
            writer.uint32(18).string(message.validatorAddr);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegatorValidatorRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegatorAddr = reader.string();
                    break;
                case 2:
                    message.validatorAddr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryDelegatorValidatorRequest);
        message.delegatorAddr =
            object.delegatorAddr !== undefined && object.delegatorAddr !== null ? String(object.delegatorAddr) : "";
        message.validatorAddr =
            object.validatorAddr !== undefined && object.validatorAddr !== null ? String(object.validatorAddr) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddr !== undefined && (obj.delegatorAddr = message.delegatorAddr);
        message.validatorAddr !== undefined && (obj.validatorAddr = message.validatorAddr);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseQueryDelegatorValidatorRequest);
        message.delegatorAddr = (_a = object.delegatorAddr) !== null && _a !== void 0 ? _a : "";
        message.validatorAddr = (_b = object.validatorAddr) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseQueryDelegatorValidatorResponse = {};
exports.QueryDelegatorValidatorResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.validator !== undefined) {
            staking_1.Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryDelegatorValidatorResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.validator = staking_1.Validator.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryDelegatorValidatorResponse);
        message.validator =
            object.validator !== undefined && object.validator !== null
                ? staking_1.Validator.fromJSON(object.validator)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.validator !== undefined &&
            (obj.validator = message.validator ? staking_1.Validator.toJSON(message.validator) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryDelegatorValidatorResponse);
        message.validator =
            object.validator !== undefined && object.validator !== null
                ? staking_1.Validator.fromPartial(object.validator)
                : undefined;
        return message;
    },
};
const baseQueryHistoricalInfoRequest = { height: long_1.default.ZERO };
exports.QueryHistoricalInfoRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.height.isZero()) {
            writer.uint32(8).int64(message.height);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryHistoricalInfoRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryHistoricalInfoRequest);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromString(object.height) : long_1.default.ZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.height !== undefined && (obj.height = (message.height || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryHistoricalInfoRequest);
        message.height =
            object.height !== undefined && object.height !== null ? long_1.default.fromValue(object.height) : long_1.default.ZERO;
        return message;
    },
};
const baseQueryHistoricalInfoResponse = {};
exports.QueryHistoricalInfoResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.hist !== undefined) {
            staking_1.HistoricalInfo.encode(message.hist, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryHistoricalInfoResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hist = staking_1.HistoricalInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryHistoricalInfoResponse);
        message.hist =
            object.hist !== undefined && object.hist !== null ? staking_1.HistoricalInfo.fromJSON(object.hist) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hist !== undefined && (obj.hist = message.hist ? staking_1.HistoricalInfo.toJSON(message.hist) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryHistoricalInfoResponse);
        message.hist =
            object.hist !== undefined && object.hist !== null ? staking_1.HistoricalInfo.fromPartial(object.hist) : undefined;
        return message;
    },
};
const baseQueryPoolRequest = {};
exports.QueryPoolRequest = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPoolRequest);
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
        const message = Object.assign({}, baseQueryPoolRequest);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseQueryPoolRequest);
        return message;
    },
};
const baseQueryPoolResponse = {};
exports.QueryPoolResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.pool !== undefined) {
            staking_1.Pool.encode(message.pool, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPoolResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pool = staking_1.Pool.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPoolResponse);
        message.pool = object.pool !== undefined && object.pool !== null ? staking_1.Pool.fromJSON(object.pool) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pool !== undefined && (obj.pool = message.pool ? staking_1.Pool.toJSON(message.pool) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryPoolResponse);
        message.pool =
            object.pool !== undefined && object.pool !== null ? staking_1.Pool.fromPartial(object.pool) : undefined;
        return message;
    },
};
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
            staking_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
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
                    message.params = staking_1.Params.decode(reader, reader.uint32());
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
            object.params !== undefined && object.params !== null ? staking_1.Params.fromJSON(object.params) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined && (obj.params = message.params ? staking_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryParamsResponse);
        message.params =
            object.params !== undefined && object.params !== null ? staking_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Validators = this.Validators.bind(this);
        this.Validator = this.Validator.bind(this);
        this.ValidatorDelegations = this.ValidatorDelegations.bind(this);
        this.ValidatorUnbondingDelegations = this.ValidatorUnbondingDelegations.bind(this);
        this.Delegation = this.Delegation.bind(this);
        this.UnbondingDelegation = this.UnbondingDelegation.bind(this);
        this.DelegatorDelegations = this.DelegatorDelegations.bind(this);
        this.DelegatorUnbondingDelegations = this.DelegatorUnbondingDelegations.bind(this);
        this.Redelegations = this.Redelegations.bind(this);
        this.DelegatorValidators = this.DelegatorValidators.bind(this);
        this.DelegatorValidator = this.DelegatorValidator.bind(this);
        this.HistoricalInfo = this.HistoricalInfo.bind(this);
        this.Pool = this.Pool.bind(this);
        this.Params = this.Params.bind(this);
    }
    Validators(request) {
        const data = exports.QueryValidatorsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "Validators", data);
        return promise.then((data) => exports.QueryValidatorsResponse.decode(new minimal_1.default.Reader(data)));
    }
    Validator(request) {
        const data = exports.QueryValidatorRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "Validator", data);
        return promise.then((data) => exports.QueryValidatorResponse.decode(new minimal_1.default.Reader(data)));
    }
    ValidatorDelegations(request) {
        const data = exports.QueryValidatorDelegationsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "ValidatorDelegations", data);
        return promise.then((data) => exports.QueryValidatorDelegationsResponse.decode(new minimal_1.default.Reader(data)));
    }
    ValidatorUnbondingDelegations(request) {
        const data = exports.QueryValidatorUnbondingDelegationsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "ValidatorUnbondingDelegations", data);
        return promise.then((data) => exports.QueryValidatorUnbondingDelegationsResponse.decode(new minimal_1.default.Reader(data)));
    }
    Delegation(request) {
        const data = exports.QueryDelegationRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "Delegation", data);
        return promise.then((data) => exports.QueryDelegationResponse.decode(new minimal_1.default.Reader(data)));
    }
    UnbondingDelegation(request) {
        const data = exports.QueryUnbondingDelegationRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "UnbondingDelegation", data);
        return promise.then((data) => exports.QueryUnbondingDelegationResponse.decode(new minimal_1.default.Reader(data)));
    }
    DelegatorDelegations(request) {
        const data = exports.QueryDelegatorDelegationsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "DelegatorDelegations", data);
        return promise.then((data) => exports.QueryDelegatorDelegationsResponse.decode(new minimal_1.default.Reader(data)));
    }
    DelegatorUnbondingDelegations(request) {
        const data = exports.QueryDelegatorUnbondingDelegationsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "DelegatorUnbondingDelegations", data);
        return promise.then((data) => exports.QueryDelegatorUnbondingDelegationsResponse.decode(new minimal_1.default.Reader(data)));
    }
    Redelegations(request) {
        const data = exports.QueryRedelegationsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "Redelegations", data);
        return promise.then((data) => exports.QueryRedelegationsResponse.decode(new minimal_1.default.Reader(data)));
    }
    DelegatorValidators(request) {
        const data = exports.QueryDelegatorValidatorsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "DelegatorValidators", data);
        return promise.then((data) => exports.QueryDelegatorValidatorsResponse.decode(new minimal_1.default.Reader(data)));
    }
    DelegatorValidator(request) {
        const data = exports.QueryDelegatorValidatorRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "DelegatorValidator", data);
        return promise.then((data) => exports.QueryDelegatorValidatorResponse.decode(new minimal_1.default.Reader(data)));
    }
    HistoricalInfo(request) {
        const data = exports.QueryHistoricalInfoRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "HistoricalInfo", data);
        return promise.then((data) => exports.QueryHistoricalInfoResponse.decode(new minimal_1.default.Reader(data)));
    }
    Pool(request) {
        const data = exports.QueryPoolRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "Pool", data);
        return promise.then((data) => exports.QueryPoolResponse.decode(new minimal_1.default.Reader(data)));
    }
    Params(request) {
        const data = exports.QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.staking.v1beta1.Query", "Params", data);
        return promise.then((data) => exports.QueryParamsResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=query.js.map