"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = exports.RedelegationResponse = exports.RedelegationEntryResponse = exports.DelegationResponse = exports.Params = exports.Redelegation = exports.RedelegationEntry = exports.UnbondingDelegationEntry = exports.UnbondingDelegation = exports.Delegation = exports.DVVTriplets = exports.DVVTriplet = exports.DVPairs = exports.DVPair = exports.ValAddresses = exports.Validator = exports.Description = exports.Commission = exports.CommissionRates = exports.HistoricalInfo = exports.bondStatusToJSON = exports.bondStatusFromJSON = exports.BondStatus = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const types_1 = require("../../../tendermint/types/types");
const timestamp_1 = require("../../../google/protobuf/timestamp");
const any_1 = require("../../../google/protobuf/any");
const duration_1 = require("../../../google/protobuf/duration");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
exports.protobufPackage = "cosmos.staking.v1beta1";
/** BondStatus is the status of a validator. */
var BondStatus;
(function (BondStatus) {
    /** BOND_STATUS_UNSPECIFIED - UNSPECIFIED defines an invalid validator status. */
    BondStatus[BondStatus["BOND_STATUS_UNSPECIFIED"] = 0] = "BOND_STATUS_UNSPECIFIED";
    /** BOND_STATUS_UNBONDED - UNBONDED defines a validator that is not bonded. */
    BondStatus[BondStatus["BOND_STATUS_UNBONDED"] = 1] = "BOND_STATUS_UNBONDED";
    /** BOND_STATUS_UNBONDING - UNBONDING defines a validator that is unbonding. */
    BondStatus[BondStatus["BOND_STATUS_UNBONDING"] = 2] = "BOND_STATUS_UNBONDING";
    /** BOND_STATUS_BONDED - BONDED defines a validator that is bonded. */
    BondStatus[BondStatus["BOND_STATUS_BONDED"] = 3] = "BOND_STATUS_BONDED";
    BondStatus[BondStatus["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(BondStatus = exports.BondStatus || (exports.BondStatus = {}));
function bondStatusFromJSON(object) {
    switch (object) {
        case 0:
        case "BOND_STATUS_UNSPECIFIED":
            return BondStatus.BOND_STATUS_UNSPECIFIED;
        case 1:
        case "BOND_STATUS_UNBONDED":
            return BondStatus.BOND_STATUS_UNBONDED;
        case 2:
        case "BOND_STATUS_UNBONDING":
            return BondStatus.BOND_STATUS_UNBONDING;
        case 3:
        case "BOND_STATUS_BONDED":
            return BondStatus.BOND_STATUS_BONDED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return BondStatus.UNRECOGNIZED;
    }
}
exports.bondStatusFromJSON = bondStatusFromJSON;
function bondStatusToJSON(object) {
    switch (object) {
        case BondStatus.BOND_STATUS_UNSPECIFIED:
            return "BOND_STATUS_UNSPECIFIED";
        case BondStatus.BOND_STATUS_UNBONDED:
            return "BOND_STATUS_UNBONDED";
        case BondStatus.BOND_STATUS_UNBONDING:
            return "BOND_STATUS_UNBONDING";
        case BondStatus.BOND_STATUS_BONDED:
            return "BOND_STATUS_BONDED";
        default:
            return "UNKNOWN";
    }
}
exports.bondStatusToJSON = bondStatusToJSON;
const baseHistoricalInfo = {};
exports.HistoricalInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.header !== undefined) {
            types_1.Header.encode(message.header, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.valset) {
            exports.Validator.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseHistoricalInfo);
        message.valset = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.header = types_1.Header.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.valset.push(exports.Validator.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseHistoricalInfo);
        message.header =
            object.header !== undefined && object.header !== null ? types_1.Header.fromJSON(object.header) : undefined;
        message.valset = ((_a = object.valset) !== null && _a !== void 0 ? _a : []).map((e) => exports.Validator.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.header !== undefined && (obj.header = message.header ? types_1.Header.toJSON(message.header) : undefined);
        if (message.valset) {
            obj.valset = message.valset.map((e) => (e ? exports.Validator.toJSON(e) : undefined));
        }
        else {
            obj.valset = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseHistoricalInfo);
        message.header =
            object.header !== undefined && object.header !== null ? types_1.Header.fromPartial(object.header) : undefined;
        message.valset = ((_a = object.valset) === null || _a === void 0 ? void 0 : _a.map((e) => exports.Validator.fromPartial(e))) || [];
        return message;
    },
};
const baseCommissionRates = { rate: "", maxRate: "", maxChangeRate: "" };
exports.CommissionRates = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.rate !== "") {
            writer.uint32(10).string(message.rate);
        }
        if (message.maxRate !== "") {
            writer.uint32(18).string(message.maxRate);
        }
        if (message.maxChangeRate !== "") {
            writer.uint32(26).string(message.maxChangeRate);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCommissionRates);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.rate = reader.string();
                    break;
                case 2:
                    message.maxRate = reader.string();
                    break;
                case 3:
                    message.maxChangeRate = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCommissionRates);
        message.rate = object.rate !== undefined && object.rate !== null ? String(object.rate) : "";
        message.maxRate = object.maxRate !== undefined && object.maxRate !== null ? String(object.maxRate) : "";
        message.maxChangeRate =
            object.maxChangeRate !== undefined && object.maxChangeRate !== null ? String(object.maxChangeRate) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.rate !== undefined && (obj.rate = message.rate);
        message.maxRate !== undefined && (obj.maxRate = message.maxRate);
        message.maxChangeRate !== undefined && (obj.maxChangeRate = message.maxChangeRate);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseCommissionRates);
        message.rate = (_a = object.rate) !== null && _a !== void 0 ? _a : "";
        message.maxRate = (_b = object.maxRate) !== null && _b !== void 0 ? _b : "";
        message.maxChangeRate = (_c = object.maxChangeRate) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseCommission = {};
exports.Commission = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.commissionRates !== undefined) {
            exports.CommissionRates.encode(message.commissionRates, writer.uint32(10).fork()).ldelim();
        }
        if (message.updateTime !== undefined) {
            timestamp_1.Timestamp.encode(message.updateTime, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCommission);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.commissionRates = exports.CommissionRates.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.updateTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCommission);
        message.commissionRates =
            object.commissionRates !== undefined && object.commissionRates !== null
                ? exports.CommissionRates.fromJSON(object.commissionRates)
                : undefined;
        message.updateTime =
            object.updateTime !== undefined && object.updateTime !== null
                ? fromJsonTimestamp(object.updateTime)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.commissionRates !== undefined &&
            (obj.commissionRates = message.commissionRates
                ? exports.CommissionRates.toJSON(message.commissionRates)
                : undefined);
        message.updateTime !== undefined && (obj.updateTime = fromTimestamp(message.updateTime).toISOString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseCommission);
        message.commissionRates =
            object.commissionRates !== undefined && object.commissionRates !== null
                ? exports.CommissionRates.fromPartial(object.commissionRates)
                : undefined;
        message.updateTime =
            object.updateTime !== undefined && object.updateTime !== null
                ? timestamp_1.Timestamp.fromPartial(object.updateTime)
                : undefined;
        return message;
    },
};
const baseDescription = { moniker: "", identity: "", website: "", securityContact: "", details: "" };
exports.Description = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.moniker !== "") {
            writer.uint32(10).string(message.moniker);
        }
        if (message.identity !== "") {
            writer.uint32(18).string(message.identity);
        }
        if (message.website !== "") {
            writer.uint32(26).string(message.website);
        }
        if (message.securityContact !== "") {
            writer.uint32(34).string(message.securityContact);
        }
        if (message.details !== "") {
            writer.uint32(42).string(message.details);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDescription);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.moniker = reader.string();
                    break;
                case 2:
                    message.identity = reader.string();
                    break;
                case 3:
                    message.website = reader.string();
                    break;
                case 4:
                    message.securityContact = reader.string();
                    break;
                case 5:
                    message.details = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseDescription);
        message.moniker = object.moniker !== undefined && object.moniker !== null ? String(object.moniker) : "";
        message.identity =
            object.identity !== undefined && object.identity !== null ? String(object.identity) : "";
        message.website = object.website !== undefined && object.website !== null ? String(object.website) : "";
        message.securityContact =
            object.securityContact !== undefined && object.securityContact !== null
                ? String(object.securityContact)
                : "";
        message.details = object.details !== undefined && object.details !== null ? String(object.details) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.moniker !== undefined && (obj.moniker = message.moniker);
        message.identity !== undefined && (obj.identity = message.identity);
        message.website !== undefined && (obj.website = message.website);
        message.securityContact !== undefined && (obj.securityContact = message.securityContact);
        message.details !== undefined && (obj.details = message.details);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = Object.assign({}, baseDescription);
        message.moniker = (_a = object.moniker) !== null && _a !== void 0 ? _a : "";
        message.identity = (_b = object.identity) !== null && _b !== void 0 ? _b : "";
        message.website = (_c = object.website) !== null && _c !== void 0 ? _c : "";
        message.securityContact = (_d = object.securityContact) !== null && _d !== void 0 ? _d : "";
        message.details = (_e = object.details) !== null && _e !== void 0 ? _e : "";
        return message;
    },
};
const baseValidator = {
    operatorAddress: "",
    jailed: false,
    status: 0,
    tokens: "",
    delegatorShares: "",
    unbondingHeight: long_1.default.ZERO,
    minSelfDelegation: "",
};
exports.Validator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.operatorAddress !== "") {
            writer.uint32(10).string(message.operatorAddress);
        }
        if (message.consensusPubkey !== undefined) {
            any_1.Any.encode(message.consensusPubkey, writer.uint32(18).fork()).ldelim();
        }
        if (message.jailed === true) {
            writer.uint32(24).bool(message.jailed);
        }
        if (message.status !== 0) {
            writer.uint32(32).int32(message.status);
        }
        if (message.tokens !== "") {
            writer.uint32(42).string(message.tokens);
        }
        if (message.delegatorShares !== "") {
            writer.uint32(50).string(message.delegatorShares);
        }
        if (message.description !== undefined) {
            exports.Description.encode(message.description, writer.uint32(58).fork()).ldelim();
        }
        if (!message.unbondingHeight.isZero()) {
            writer.uint32(64).int64(message.unbondingHeight);
        }
        if (message.unbondingTime !== undefined) {
            timestamp_1.Timestamp.encode(message.unbondingTime, writer.uint32(74).fork()).ldelim();
        }
        if (message.commission !== undefined) {
            exports.Commission.encode(message.commission, writer.uint32(82).fork()).ldelim();
        }
        if (message.minSelfDelegation !== "") {
            writer.uint32(90).string(message.minSelfDelegation);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValidator);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.operatorAddress = reader.string();
                    break;
                case 2:
                    message.consensusPubkey = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.jailed = reader.bool();
                    break;
                case 4:
                    message.status = reader.int32();
                    break;
                case 5:
                    message.tokens = reader.string();
                    break;
                case 6:
                    message.delegatorShares = reader.string();
                    break;
                case 7:
                    message.description = exports.Description.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.unbondingHeight = reader.int64();
                    break;
                case 9:
                    message.unbondingTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                    break;
                case 10:
                    message.commission = exports.Commission.decode(reader, reader.uint32());
                    break;
                case 11:
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
        const message = Object.assign({}, baseValidator);
        message.operatorAddress =
            object.operatorAddress !== undefined && object.operatorAddress !== null
                ? String(object.operatorAddress)
                : "";
        message.consensusPubkey =
            object.consensusPubkey !== undefined && object.consensusPubkey !== null
                ? any_1.Any.fromJSON(object.consensusPubkey)
                : undefined;
        message.jailed = object.jailed !== undefined && object.jailed !== null ? Boolean(object.jailed) : false;
        message.status =
            object.status !== undefined && object.status !== null ? bondStatusFromJSON(object.status) : 0;
        message.tokens = object.tokens !== undefined && object.tokens !== null ? String(object.tokens) : "";
        message.delegatorShares =
            object.delegatorShares !== undefined && object.delegatorShares !== null
                ? String(object.delegatorShares)
                : "";
        message.description =
            object.description !== undefined && object.description !== null
                ? exports.Description.fromJSON(object.description)
                : undefined;
        message.unbondingHeight =
            object.unbondingHeight !== undefined && object.unbondingHeight !== null
                ? long_1.default.fromString(object.unbondingHeight)
                : long_1.default.ZERO;
        message.unbondingTime =
            object.unbondingTime !== undefined && object.unbondingTime !== null
                ? fromJsonTimestamp(object.unbondingTime)
                : undefined;
        message.commission =
            object.commission !== undefined && object.commission !== null
                ? exports.Commission.fromJSON(object.commission)
                : undefined;
        message.minSelfDelegation =
            object.minSelfDelegation !== undefined && object.minSelfDelegation !== null
                ? String(object.minSelfDelegation)
                : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.operatorAddress !== undefined && (obj.operatorAddress = message.operatorAddress);
        message.consensusPubkey !== undefined &&
            (obj.consensusPubkey = message.consensusPubkey ? any_1.Any.toJSON(message.consensusPubkey) : undefined);
        message.jailed !== undefined && (obj.jailed = message.jailed);
        message.status !== undefined && (obj.status = bondStatusToJSON(message.status));
        message.tokens !== undefined && (obj.tokens = message.tokens);
        message.delegatorShares !== undefined && (obj.delegatorShares = message.delegatorShares);
        message.description !== undefined &&
            (obj.description = message.description ? exports.Description.toJSON(message.description) : undefined);
        message.unbondingHeight !== undefined &&
            (obj.unbondingHeight = (message.unbondingHeight || long_1.default.ZERO).toString());
        message.unbondingTime !== undefined &&
            (obj.unbondingTime = fromTimestamp(message.unbondingTime).toISOString());
        message.commission !== undefined &&
            (obj.commission = message.commission ? exports.Commission.toJSON(message.commission) : undefined);
        message.minSelfDelegation !== undefined && (obj.minSelfDelegation = message.minSelfDelegation);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = Object.assign({}, baseValidator);
        message.operatorAddress = (_a = object.operatorAddress) !== null && _a !== void 0 ? _a : "";
        message.consensusPubkey =
            object.consensusPubkey !== undefined && object.consensusPubkey !== null
                ? any_1.Any.fromPartial(object.consensusPubkey)
                : undefined;
        message.jailed = (_b = object.jailed) !== null && _b !== void 0 ? _b : false;
        message.status = (_c = object.status) !== null && _c !== void 0 ? _c : 0;
        message.tokens = (_d = object.tokens) !== null && _d !== void 0 ? _d : "";
        message.delegatorShares = (_e = object.delegatorShares) !== null && _e !== void 0 ? _e : "";
        message.description =
            object.description !== undefined && object.description !== null
                ? exports.Description.fromPartial(object.description)
                : undefined;
        message.unbondingHeight =
            object.unbondingHeight !== undefined && object.unbondingHeight !== null
                ? long_1.default.fromValue(object.unbondingHeight)
                : long_1.default.ZERO;
        message.unbondingTime =
            object.unbondingTime !== undefined && object.unbondingTime !== null
                ? timestamp_1.Timestamp.fromPartial(object.unbondingTime)
                : undefined;
        message.commission =
            object.commission !== undefined && object.commission !== null
                ? exports.Commission.fromPartial(object.commission)
                : undefined;
        message.minSelfDelegation = (_f = object.minSelfDelegation) !== null && _f !== void 0 ? _f : "";
        return message;
    },
};
const baseValAddresses = { addresses: "" };
exports.ValAddresses = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.addresses) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseValAddresses);
        message.addresses = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.addresses.push(reader.string());
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
        const message = Object.assign({}, baseValAddresses);
        message.addresses = ((_a = object.addresses) !== null && _a !== void 0 ? _a : []).map((e) => String(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.addresses) {
            obj.addresses = message.addresses.map((e) => e);
        }
        else {
            obj.addresses = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseValAddresses);
        message.addresses = ((_a = object.addresses) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
const baseDVPair = { delegatorAddress: "", validatorAddress: "" };
exports.DVPair = {
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
        const message = Object.assign({}, baseDVPair);
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
        const message = Object.assign({}, baseDVPair);
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
        const message = Object.assign({}, baseDVPair);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseDVPairs = {};
exports.DVPairs = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.pairs) {
            exports.DVPair.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDVPairs);
        message.pairs = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pairs.push(exports.DVPair.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseDVPairs);
        message.pairs = ((_a = object.pairs) !== null && _a !== void 0 ? _a : []).map((e) => exports.DVPair.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.pairs) {
            obj.pairs = message.pairs.map((e) => (e ? exports.DVPair.toJSON(e) : undefined));
        }
        else {
            obj.pairs = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseDVPairs);
        message.pairs = ((_a = object.pairs) === null || _a === void 0 ? void 0 : _a.map((e) => exports.DVPair.fromPartial(e))) || [];
        return message;
    },
};
const baseDVVTriplet = { delegatorAddress: "", validatorSrcAddress: "", validatorDstAddress: "" };
exports.DVVTriplet = {
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
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDVVTriplet);
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
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseDVVTriplet);
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        message.validatorSrcAddress !== undefined && (obj.validatorSrcAddress = message.validatorSrcAddress);
        message.validatorDstAddress !== undefined && (obj.validatorDstAddress = message.validatorDstAddress);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseDVVTriplet);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.validatorSrcAddress = (_b = object.validatorSrcAddress) !== null && _b !== void 0 ? _b : "";
        message.validatorDstAddress = (_c = object.validatorDstAddress) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseDVVTriplets = {};
exports.DVVTriplets = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.triplets) {
            exports.DVVTriplet.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDVVTriplets);
        message.triplets = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.triplets.push(exports.DVVTriplet.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseDVVTriplets);
        message.triplets = ((_a = object.triplets) !== null && _a !== void 0 ? _a : []).map((e) => exports.DVVTriplet.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.triplets) {
            obj.triplets = message.triplets.map((e) => (e ? exports.DVVTriplet.toJSON(e) : undefined));
        }
        else {
            obj.triplets = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseDVVTriplets);
        message.triplets = ((_a = object.triplets) === null || _a === void 0 ? void 0 : _a.map((e) => exports.DVVTriplet.fromPartial(e))) || [];
        return message;
    },
};
const baseDelegation = { delegatorAddress: "", validatorAddress: "", shares: "" };
exports.Delegation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        if (message.shares !== "") {
            writer.uint32(26).string(message.shares);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDelegation);
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
                    message.shares = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseDelegation);
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        message.validatorAddress =
            object.validatorAddress !== undefined && object.validatorAddress !== null
                ? String(object.validatorAddress)
                : "";
        message.shares = object.shares !== undefined && object.shares !== null ? String(object.shares) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
        message.shares !== undefined && (obj.shares = message.shares);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseDelegation);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
        message.shares = (_c = object.shares) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
const baseUnbondingDelegation = { delegatorAddress: "", validatorAddress: "" };
exports.UnbondingDelegation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        for (const v of message.entries) {
            exports.UnbondingDelegationEntry.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseUnbondingDelegation);
        message.entries = [];
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
                    message.entries.push(exports.UnbondingDelegationEntry.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseUnbondingDelegation);
        message.delegatorAddress =
            object.delegatorAddress !== undefined && object.delegatorAddress !== null
                ? String(object.delegatorAddress)
                : "";
        message.validatorAddress =
            object.validatorAddress !== undefined && object.validatorAddress !== null
                ? String(object.validatorAddress)
                : "";
        message.entries = ((_a = object.entries) !== null && _a !== void 0 ? _a : []).map((e) => exports.UnbondingDelegationEntry.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
        if (message.entries) {
            obj.entries = message.entries.map((e) => (e ? exports.UnbondingDelegationEntry.toJSON(e) : undefined));
        }
        else {
            obj.entries = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = Object.assign({}, baseUnbondingDelegation);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.validatorAddress = (_b = object.validatorAddress) !== null && _b !== void 0 ? _b : "";
        message.entries = ((_c = object.entries) === null || _c === void 0 ? void 0 : _c.map((e) => exports.UnbondingDelegationEntry.fromPartial(e))) || [];
        return message;
    },
};
const baseUnbondingDelegationEntry = { creationHeight: long_1.default.ZERO, initialBalance: "", balance: "" };
exports.UnbondingDelegationEntry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.creationHeight.isZero()) {
            writer.uint32(8).int64(message.creationHeight);
        }
        if (message.completionTime !== undefined) {
            timestamp_1.Timestamp.encode(message.completionTime, writer.uint32(18).fork()).ldelim();
        }
        if (message.initialBalance !== "") {
            writer.uint32(26).string(message.initialBalance);
        }
        if (message.balance !== "") {
            writer.uint32(34).string(message.balance);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseUnbondingDelegationEntry);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creationHeight = reader.int64();
                    break;
                case 2:
                    message.completionTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.initialBalance = reader.string();
                    break;
                case 4:
                    message.balance = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseUnbondingDelegationEntry);
        message.creationHeight =
            object.creationHeight !== undefined && object.creationHeight !== null
                ? long_1.default.fromString(object.creationHeight)
                : long_1.default.ZERO;
        message.completionTime =
            object.completionTime !== undefined && object.completionTime !== null
                ? fromJsonTimestamp(object.completionTime)
                : undefined;
        message.initialBalance =
            object.initialBalance !== undefined && object.initialBalance !== null
                ? String(object.initialBalance)
                : "";
        message.balance = object.balance !== undefined && object.balance !== null ? String(object.balance) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creationHeight !== undefined &&
            (obj.creationHeight = (message.creationHeight || long_1.default.ZERO).toString());
        message.completionTime !== undefined &&
            (obj.completionTime = fromTimestamp(message.completionTime).toISOString());
        message.initialBalance !== undefined && (obj.initialBalance = message.initialBalance);
        message.balance !== undefined && (obj.balance = message.balance);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseUnbondingDelegationEntry);
        message.creationHeight =
            object.creationHeight !== undefined && object.creationHeight !== null
                ? long_1.default.fromValue(object.creationHeight)
                : long_1.default.ZERO;
        message.completionTime =
            object.completionTime !== undefined && object.completionTime !== null
                ? timestamp_1.Timestamp.fromPartial(object.completionTime)
                : undefined;
        message.initialBalance = (_a = object.initialBalance) !== null && _a !== void 0 ? _a : "";
        message.balance = (_b = object.balance) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseRedelegationEntry = { creationHeight: long_1.default.ZERO, initialBalance: "", sharesDst: "" };
exports.RedelegationEntry = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.creationHeight.isZero()) {
            writer.uint32(8).int64(message.creationHeight);
        }
        if (message.completionTime !== undefined) {
            timestamp_1.Timestamp.encode(message.completionTime, writer.uint32(18).fork()).ldelim();
        }
        if (message.initialBalance !== "") {
            writer.uint32(26).string(message.initialBalance);
        }
        if (message.sharesDst !== "") {
            writer.uint32(34).string(message.sharesDst);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRedelegationEntry);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creationHeight = reader.int64();
                    break;
                case 2:
                    message.completionTime = timestamp_1.Timestamp.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.initialBalance = reader.string();
                    break;
                case 4:
                    message.sharesDst = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRedelegationEntry);
        message.creationHeight =
            object.creationHeight !== undefined && object.creationHeight !== null
                ? long_1.default.fromString(object.creationHeight)
                : long_1.default.ZERO;
        message.completionTime =
            object.completionTime !== undefined && object.completionTime !== null
                ? fromJsonTimestamp(object.completionTime)
                : undefined;
        message.initialBalance =
            object.initialBalance !== undefined && object.initialBalance !== null
                ? String(object.initialBalance)
                : "";
        message.sharesDst =
            object.sharesDst !== undefined && object.sharesDst !== null ? String(object.sharesDst) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creationHeight !== undefined &&
            (obj.creationHeight = (message.creationHeight || long_1.default.ZERO).toString());
        message.completionTime !== undefined &&
            (obj.completionTime = fromTimestamp(message.completionTime).toISOString());
        message.initialBalance !== undefined && (obj.initialBalance = message.initialBalance);
        message.sharesDst !== undefined && (obj.sharesDst = message.sharesDst);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseRedelegationEntry);
        message.creationHeight =
            object.creationHeight !== undefined && object.creationHeight !== null
                ? long_1.default.fromValue(object.creationHeight)
                : long_1.default.ZERO;
        message.completionTime =
            object.completionTime !== undefined && object.completionTime !== null
                ? timestamp_1.Timestamp.fromPartial(object.completionTime)
                : undefined;
        message.initialBalance = (_a = object.initialBalance) !== null && _a !== void 0 ? _a : "";
        message.sharesDst = (_b = object.sharesDst) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseRedelegation = { delegatorAddress: "", validatorSrcAddress: "", validatorDstAddress: "" };
exports.Redelegation = {
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
        for (const v of message.entries) {
            exports.RedelegationEntry.encode(v, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRedelegation);
        message.entries = [];
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
                    message.entries.push(exports.RedelegationEntry.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseRedelegation);
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
        message.entries = ((_a = object.entries) !== null && _a !== void 0 ? _a : []).map((e) => exports.RedelegationEntry.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegatorAddress !== undefined && (obj.delegatorAddress = message.delegatorAddress);
        message.validatorSrcAddress !== undefined && (obj.validatorSrcAddress = message.validatorSrcAddress);
        message.validatorDstAddress !== undefined && (obj.validatorDstAddress = message.validatorDstAddress);
        if (message.entries) {
            obj.entries = message.entries.map((e) => (e ? exports.RedelegationEntry.toJSON(e) : undefined));
        }
        else {
            obj.entries = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = Object.assign({}, baseRedelegation);
        message.delegatorAddress = (_a = object.delegatorAddress) !== null && _a !== void 0 ? _a : "";
        message.validatorSrcAddress = (_b = object.validatorSrcAddress) !== null && _b !== void 0 ? _b : "";
        message.validatorDstAddress = (_c = object.validatorDstAddress) !== null && _c !== void 0 ? _c : "";
        message.entries = ((_d = object.entries) === null || _d === void 0 ? void 0 : _d.map((e) => exports.RedelegationEntry.fromPartial(e))) || [];
        return message;
    },
};
const baseParams = { maxValidators: 0, maxEntries: 0, historicalEntries: 0, bondDenom: "" };
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.unbondingTime !== undefined) {
            duration_1.Duration.encode(message.unbondingTime, writer.uint32(10).fork()).ldelim();
        }
        if (message.maxValidators !== 0) {
            writer.uint32(16).uint32(message.maxValidators);
        }
        if (message.maxEntries !== 0) {
            writer.uint32(24).uint32(message.maxEntries);
        }
        if (message.historicalEntries !== 0) {
            writer.uint32(32).uint32(message.historicalEntries);
        }
        if (message.bondDenom !== "") {
            writer.uint32(42).string(message.bondDenom);
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
                    message.unbondingTime = duration_1.Duration.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.maxValidators = reader.uint32();
                    break;
                case 3:
                    message.maxEntries = reader.uint32();
                    break;
                case 4:
                    message.historicalEntries = reader.uint32();
                    break;
                case 5:
                    message.bondDenom = reader.string();
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
        message.unbondingTime =
            object.unbondingTime !== undefined && object.unbondingTime !== null
                ? duration_1.Duration.fromJSON(object.unbondingTime)
                : undefined;
        message.maxValidators =
            object.maxValidators !== undefined && object.maxValidators !== null ? Number(object.maxValidators) : 0;
        message.maxEntries =
            object.maxEntries !== undefined && object.maxEntries !== null ? Number(object.maxEntries) : 0;
        message.historicalEntries =
            object.historicalEntries !== undefined && object.historicalEntries !== null
                ? Number(object.historicalEntries)
                : 0;
        message.bondDenom =
            object.bondDenom !== undefined && object.bondDenom !== null ? String(object.bondDenom) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.unbondingTime !== undefined &&
            (obj.unbondingTime = message.unbondingTime ? duration_1.Duration.toJSON(message.unbondingTime) : undefined);
        message.maxValidators !== undefined && (obj.maxValidators = message.maxValidators);
        message.maxEntries !== undefined && (obj.maxEntries = message.maxEntries);
        message.historicalEntries !== undefined && (obj.historicalEntries = message.historicalEntries);
        message.bondDenom !== undefined && (obj.bondDenom = message.bondDenom);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d;
        const message = Object.assign({}, baseParams);
        message.unbondingTime =
            object.unbondingTime !== undefined && object.unbondingTime !== null
                ? duration_1.Duration.fromPartial(object.unbondingTime)
                : undefined;
        message.maxValidators = (_a = object.maxValidators) !== null && _a !== void 0 ? _a : 0;
        message.maxEntries = (_b = object.maxEntries) !== null && _b !== void 0 ? _b : 0;
        message.historicalEntries = (_c = object.historicalEntries) !== null && _c !== void 0 ? _c : 0;
        message.bondDenom = (_d = object.bondDenom) !== null && _d !== void 0 ? _d : "";
        return message;
    },
};
const baseDelegationResponse = {};
exports.DelegationResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.delegation !== undefined) {
            exports.Delegation.encode(message.delegation, writer.uint32(10).fork()).ldelim();
        }
        if (message.balance !== undefined) {
            coin_1.Coin.encode(message.balance, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseDelegationResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.delegation = exports.Delegation.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.balance = coin_1.Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseDelegationResponse);
        message.delegation =
            object.delegation !== undefined && object.delegation !== null
                ? exports.Delegation.fromJSON(object.delegation)
                : undefined;
        message.balance =
            object.balance !== undefined && object.balance !== null ? coin_1.Coin.fromJSON(object.balance) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.delegation !== undefined &&
            (obj.delegation = message.delegation ? exports.Delegation.toJSON(message.delegation) : undefined);
        message.balance !== undefined &&
            (obj.balance = message.balance ? coin_1.Coin.toJSON(message.balance) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseDelegationResponse);
        message.delegation =
            object.delegation !== undefined && object.delegation !== null
                ? exports.Delegation.fromPartial(object.delegation)
                : undefined;
        message.balance =
            object.balance !== undefined && object.balance !== null ? coin_1.Coin.fromPartial(object.balance) : undefined;
        return message;
    },
};
const baseRedelegationEntryResponse = { balance: "" };
exports.RedelegationEntryResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.redelegationEntry !== undefined) {
            exports.RedelegationEntry.encode(message.redelegationEntry, writer.uint32(10).fork()).ldelim();
        }
        if (message.balance !== "") {
            writer.uint32(34).string(message.balance);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRedelegationEntryResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.redelegationEntry = exports.RedelegationEntry.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.balance = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseRedelegationEntryResponse);
        message.redelegationEntry =
            object.redelegationEntry !== undefined && object.redelegationEntry !== null
                ? exports.RedelegationEntry.fromJSON(object.redelegationEntry)
                : undefined;
        message.balance = object.balance !== undefined && object.balance !== null ? String(object.balance) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.redelegationEntry !== undefined &&
            (obj.redelegationEntry = message.redelegationEntry
                ? exports.RedelegationEntry.toJSON(message.redelegationEntry)
                : undefined);
        message.balance !== undefined && (obj.balance = message.balance);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseRedelegationEntryResponse);
        message.redelegationEntry =
            object.redelegationEntry !== undefined && object.redelegationEntry !== null
                ? exports.RedelegationEntry.fromPartial(object.redelegationEntry)
                : undefined;
        message.balance = (_a = object.balance) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseRedelegationResponse = {};
exports.RedelegationResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.redelegation !== undefined) {
            exports.Redelegation.encode(message.redelegation, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.entries) {
            exports.RedelegationEntryResponse.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseRedelegationResponse);
        message.entries = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.redelegation = exports.Redelegation.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.entries.push(exports.RedelegationEntryResponse.decode(reader, reader.uint32()));
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
        const message = Object.assign({}, baseRedelegationResponse);
        message.redelegation =
            object.redelegation !== undefined && object.redelegation !== null
                ? exports.Redelegation.fromJSON(object.redelegation)
                : undefined;
        message.entries = ((_a = object.entries) !== null && _a !== void 0 ? _a : []).map((e) => exports.RedelegationEntryResponse.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.redelegation !== undefined &&
            (obj.redelegation = message.redelegation ? exports.Redelegation.toJSON(message.redelegation) : undefined);
        if (message.entries) {
            obj.entries = message.entries.map((e) => (e ? exports.RedelegationEntryResponse.toJSON(e) : undefined));
        }
        else {
            obj.entries = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseRedelegationResponse);
        message.redelegation =
            object.redelegation !== undefined && object.redelegation !== null
                ? exports.Redelegation.fromPartial(object.redelegation)
                : undefined;
        message.entries = ((_a = object.entries) === null || _a === void 0 ? void 0 : _a.map((e) => exports.RedelegationEntryResponse.fromPartial(e))) || [];
        return message;
    },
};
const basePool = { notBondedTokens: "", bondedTokens: "" };
exports.Pool = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.notBondedTokens !== "") {
            writer.uint32(10).string(message.notBondedTokens);
        }
        if (message.bondedTokens !== "") {
            writer.uint32(18).string(message.bondedTokens);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, basePool);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.notBondedTokens = reader.string();
                    break;
                case 2:
                    message.bondedTokens = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, basePool);
        message.notBondedTokens =
            object.notBondedTokens !== undefined && object.notBondedTokens !== null
                ? String(object.notBondedTokens)
                : "";
        message.bondedTokens =
            object.bondedTokens !== undefined && object.bondedTokens !== null ? String(object.bondedTokens) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.notBondedTokens !== undefined && (obj.notBondedTokens = message.notBondedTokens);
        message.bondedTokens !== undefined && (obj.bondedTokens = message.bondedTokens);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, basePool);
        message.notBondedTokens = (_a = object.notBondedTokens) !== null && _a !== void 0 ? _a : "";
        message.bondedTokens = (_b = object.bondedTokens) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
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
//# sourceMappingURL=staking.js.map