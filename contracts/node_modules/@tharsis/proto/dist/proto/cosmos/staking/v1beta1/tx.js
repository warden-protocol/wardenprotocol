"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cosmos = void 0;
const dependency_1 = __importStar(require("./../../../google/protobuf/any"));
const dependency_2 = __importStar(require("./../../../google/protobuf/timestamp"));
const dependency_5 = __importStar(require("./../../base/v1beta1/coin"));
const dependency_6 = __importStar(require("./staking"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var staking;
    (function (staking) {
        var v1beta1;
        (function (v1beta1) {
            class MsgCreateValidator extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("commission" in data && data.commission != undefined) {
                            this.commission = data.commission;
                        }
                        if ("min_self_delegation" in data && data.min_self_delegation != undefined) {
                            this.min_self_delegation = data.min_self_delegation;
                        }
                        if ("delegator_address" in data && data.delegator_address != undefined) {
                            this.delegator_address = data.delegator_address;
                        }
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("pubkey" in data && data.pubkey != undefined) {
                            this.pubkey = data.pubkey;
                        }
                        if ("value" in data && data.value != undefined) {
                            this.value = data.value;
                        }
                    }
                }
                get description() {
                    return pb_1.Message.getWrapperField(this, dependency_6.cosmos.staking.v1beta1.Description, 1);
                }
                set description(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get commission() {
                    return pb_1.Message.getWrapperField(this, dependency_6.cosmos.staking.v1beta1.CommissionRates, 2);
                }
                set commission(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get min_self_delegation() {
                    return pb_1.Message.getField(this, 3);
                }
                set min_self_delegation(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get delegator_address() {
                    return pb_1.Message.getField(this, 4);
                }
                set delegator_address(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 5);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get pubkey() {
                    return pb_1.Message.getWrapperField(this, dependency_1.google.protobuf.Any, 6);
                }
                set pubkey(value) {
                    pb_1.Message.setWrapperField(this, 6, value);
                }
                get value() {
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.base.v1beta1.Coin, 7);
                }
                set value(value) {
                    pb_1.Message.setWrapperField(this, 7, value);
                }
                static fromObject(data) {
                    const message = new MsgCreateValidator({});
                    if (data.description != null) {
                        message.description = dependency_6.cosmos.staking.v1beta1.Description.fromObject(data.description);
                    }
                    if (data.commission != null) {
                        message.commission = dependency_6.cosmos.staking.v1beta1.CommissionRates.fromObject(data.commission);
                    }
                    if (data.min_self_delegation != null) {
                        message.min_self_delegation = data.min_self_delegation;
                    }
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.pubkey != null) {
                        message.pubkey = dependency_1.google.protobuf.Any.fromObject(data.pubkey);
                    }
                    if (data.value != null) {
                        message.value = dependency_5.cosmos.base.v1beta1.Coin.fromObject(data.value);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.description != null) {
                        data.description = this.description.toObject();
                    }
                    if (this.commission != null) {
                        data.commission = this.commission.toObject();
                    }
                    if (this.min_self_delegation != null) {
                        data.min_self_delegation = this.min_self_delegation;
                    }
                    if (this.delegator_address != null) {
                        data.delegator_address = this.delegator_address;
                    }
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.pubkey != null) {
                        data.pubkey = this.pubkey.toObject();
                    }
                    if (this.value != null) {
                        data.value = this.value.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.description !== undefined)
                        writer.writeMessage(1, this.description, () => this.description.serialize(writer));
                    if (this.commission !== undefined)
                        writer.writeMessage(2, this.commission, () => this.commission.serialize(writer));
                    if (typeof this.min_self_delegation === "string" && this.min_self_delegation.length)
                        writer.writeString(3, this.min_self_delegation);
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(4, this.delegator_address);
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(5, this.validator_address);
                    if (this.pubkey !== undefined)
                        writer.writeMessage(6, this.pubkey, () => this.pubkey.serialize(writer));
                    if (this.value !== undefined)
                        writer.writeMessage(7, this.value, () => this.value.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgCreateValidator();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.description, () => message.description = dependency_6.cosmos.staking.v1beta1.Description.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.commission, () => message.commission = dependency_6.cosmos.staking.v1beta1.CommissionRates.deserialize(reader));
                                break;
                            case 3:
                                message.min_self_delegation = reader.readString();
                                break;
                            case 4:
                                message.delegator_address = reader.readString();
                                break;
                            case 5:
                                message.validator_address = reader.readString();
                                break;
                            case 6:
                                reader.readMessage(message.pubkey, () => message.pubkey = dependency_1.google.protobuf.Any.deserialize(reader));
                                break;
                            case 7:
                                reader.readMessage(message.value, () => message.value = dependency_5.cosmos.base.v1beta1.Coin.deserialize(reader));
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgCreateValidator.deserialize(bytes);
                }
            }
            v1beta1.MsgCreateValidator = MsgCreateValidator;
            class MsgCreateValidatorResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") { }
                }
                static fromObject(data) {
                    const message = new MsgCreateValidatorResponse({});
                    return message;
                }
                toObject() {
                    const data = {};
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgCreateValidatorResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgCreateValidatorResponse.deserialize(bytes);
                }
            }
            v1beta1.MsgCreateValidatorResponse = MsgCreateValidatorResponse;
            class MsgEditValidator extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("commission_rate" in data && data.commission_rate != undefined) {
                            this.commission_rate = data.commission_rate;
                        }
                        if ("min_self_delegation" in data && data.min_self_delegation != undefined) {
                            this.min_self_delegation = data.min_self_delegation;
                        }
                    }
                }
                get description() {
                    return pb_1.Message.getWrapperField(this, dependency_6.cosmos.staking.v1beta1.Description, 1);
                }
                set description(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 2);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get commission_rate() {
                    return pb_1.Message.getField(this, 3);
                }
                set commission_rate(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get min_self_delegation() {
                    return pb_1.Message.getField(this, 4);
                }
                set min_self_delegation(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new MsgEditValidator({});
                    if (data.description != null) {
                        message.description = dependency_6.cosmos.staking.v1beta1.Description.fromObject(data.description);
                    }
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.commission_rate != null) {
                        message.commission_rate = data.commission_rate;
                    }
                    if (data.min_self_delegation != null) {
                        message.min_self_delegation = data.min_self_delegation;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.description != null) {
                        data.description = this.description.toObject();
                    }
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.commission_rate != null) {
                        data.commission_rate = this.commission_rate;
                    }
                    if (this.min_self_delegation != null) {
                        data.min_self_delegation = this.min_self_delegation;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.description !== undefined)
                        writer.writeMessage(1, this.description, () => this.description.serialize(writer));
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(2, this.validator_address);
                    if (typeof this.commission_rate === "string" && this.commission_rate.length)
                        writer.writeString(3, this.commission_rate);
                    if (typeof this.min_self_delegation === "string" && this.min_self_delegation.length)
                        writer.writeString(4, this.min_self_delegation);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgEditValidator();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.description, () => message.description = dependency_6.cosmos.staking.v1beta1.Description.deserialize(reader));
                                break;
                            case 2:
                                message.validator_address = reader.readString();
                                break;
                            case 3:
                                message.commission_rate = reader.readString();
                                break;
                            case 4:
                                message.min_self_delegation = reader.readString();
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgEditValidator.deserialize(bytes);
                }
            }
            v1beta1.MsgEditValidator = MsgEditValidator;
            class MsgEditValidatorResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") { }
                }
                static fromObject(data) {
                    const message = new MsgEditValidatorResponse({});
                    return message;
                }
                toObject() {
                    const data = {};
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgEditValidatorResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgEditValidatorResponse.deserialize(bytes);
                }
            }
            v1beta1.MsgEditValidatorResponse = MsgEditValidatorResponse;
            class MsgDelegate extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("delegator_address" in data && data.delegator_address != undefined) {
                            this.delegator_address = data.delegator_address;
                        }
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                    }
                }
                get delegator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set delegator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 2);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get amount() {
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.base.v1beta1.Coin, 3);
                }
                set amount(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new MsgDelegate({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.amount != null) {
                        message.amount = dependency_5.cosmos.base.v1beta1.Coin.fromObject(data.amount);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.delegator_address != null) {
                        data.delegator_address = this.delegator_address;
                    }
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(2, this.validator_address);
                    if (this.amount !== undefined)
                        writer.writeMessage(3, this.amount, () => this.amount.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgDelegate();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.delegator_address = reader.readString();
                                break;
                            case 2:
                                message.validator_address = reader.readString();
                                break;
                            case 3:
                                reader.readMessage(message.amount, () => message.amount = dependency_5.cosmos.base.v1beta1.Coin.deserialize(reader));
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgDelegate.deserialize(bytes);
                }
            }
            v1beta1.MsgDelegate = MsgDelegate;
            class MsgDelegateResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") { }
                }
                static fromObject(data) {
                    const message = new MsgDelegateResponse({});
                    return message;
                }
                toObject() {
                    const data = {};
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgDelegateResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgDelegateResponse.deserialize(bytes);
                }
            }
            v1beta1.MsgDelegateResponse = MsgDelegateResponse;
            class MsgBeginRedelegate extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("delegator_address" in data && data.delegator_address != undefined) {
                            this.delegator_address = data.delegator_address;
                        }
                        if ("validator_src_address" in data && data.validator_src_address != undefined) {
                            this.validator_src_address = data.validator_src_address;
                        }
                        if ("validator_dst_address" in data && data.validator_dst_address != undefined) {
                            this.validator_dst_address = data.validator_dst_address;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                    }
                }
                get delegator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set delegator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get validator_src_address() {
                    return pb_1.Message.getField(this, 2);
                }
                set validator_src_address(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get validator_dst_address() {
                    return pb_1.Message.getField(this, 3);
                }
                set validator_dst_address(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get amount() {
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.base.v1beta1.Coin, 4);
                }
                set amount(value) {
                    pb_1.Message.setWrapperField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new MsgBeginRedelegate({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_src_address != null) {
                        message.validator_src_address = data.validator_src_address;
                    }
                    if (data.validator_dst_address != null) {
                        message.validator_dst_address = data.validator_dst_address;
                    }
                    if (data.amount != null) {
                        message.amount = dependency_5.cosmos.base.v1beta1.Coin.fromObject(data.amount);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.delegator_address != null) {
                        data.delegator_address = this.delegator_address;
                    }
                    if (this.validator_src_address != null) {
                        data.validator_src_address = this.validator_src_address;
                    }
                    if (this.validator_dst_address != null) {
                        data.validator_dst_address = this.validator_dst_address;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (typeof this.validator_src_address === "string" && this.validator_src_address.length)
                        writer.writeString(2, this.validator_src_address);
                    if (typeof this.validator_dst_address === "string" && this.validator_dst_address.length)
                        writer.writeString(3, this.validator_dst_address);
                    if (this.amount !== undefined)
                        writer.writeMessage(4, this.amount, () => this.amount.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgBeginRedelegate();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.delegator_address = reader.readString();
                                break;
                            case 2:
                                message.validator_src_address = reader.readString();
                                break;
                            case 3:
                                message.validator_dst_address = reader.readString();
                                break;
                            case 4:
                                reader.readMessage(message.amount, () => message.amount = dependency_5.cosmos.base.v1beta1.Coin.deserialize(reader));
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgBeginRedelegate.deserialize(bytes);
                }
            }
            v1beta1.MsgBeginRedelegate = MsgBeginRedelegate;
            class MsgBeginRedelegateResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("completion_time" in data && data.completion_time != undefined) {
                            this.completion_time = data.completion_time;
                        }
                    }
                }
                get completion_time() {
                    return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Timestamp, 1);
                }
                set completion_time(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new MsgBeginRedelegateResponse({});
                    if (data.completion_time != null) {
                        message.completion_time = dependency_2.google.protobuf.Timestamp.fromObject(data.completion_time);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.completion_time != null) {
                        data.completion_time = this.completion_time.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.completion_time !== undefined)
                        writer.writeMessage(1, this.completion_time, () => this.completion_time.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgBeginRedelegateResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.completion_time, () => message.completion_time = dependency_2.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgBeginRedelegateResponse.deserialize(bytes);
                }
            }
            v1beta1.MsgBeginRedelegateResponse = MsgBeginRedelegateResponse;
            class MsgUndelegate extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("delegator_address" in data && data.delegator_address != undefined) {
                            this.delegator_address = data.delegator_address;
                        }
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                    }
                }
                get delegator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set delegator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 2);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get amount() {
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.base.v1beta1.Coin, 3);
                }
                set amount(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new MsgUndelegate({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.amount != null) {
                        message.amount = dependency_5.cosmos.base.v1beta1.Coin.fromObject(data.amount);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.delegator_address != null) {
                        data.delegator_address = this.delegator_address;
                    }
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(2, this.validator_address);
                    if (this.amount !== undefined)
                        writer.writeMessage(3, this.amount, () => this.amount.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgUndelegate();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.delegator_address = reader.readString();
                                break;
                            case 2:
                                message.validator_address = reader.readString();
                                break;
                            case 3:
                                reader.readMessage(message.amount, () => message.amount = dependency_5.cosmos.base.v1beta1.Coin.deserialize(reader));
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgUndelegate.deserialize(bytes);
                }
            }
            v1beta1.MsgUndelegate = MsgUndelegate;
            class MsgUndelegateResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("completion_time" in data && data.completion_time != undefined) {
                            this.completion_time = data.completion_time;
                        }
                    }
                }
                get completion_time() {
                    return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Timestamp, 1);
                }
                set completion_time(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new MsgUndelegateResponse({});
                    if (data.completion_time != null) {
                        message.completion_time = dependency_2.google.protobuf.Timestamp.fromObject(data.completion_time);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.completion_time != null) {
                        data.completion_time = this.completion_time.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.completion_time !== undefined)
                        writer.writeMessage(1, this.completion_time, () => this.completion_time.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgUndelegateResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.completion_time, () => message.completion_time = dependency_2.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgUndelegateResponse.deserialize(bytes);
                }
            }
            v1beta1.MsgUndelegateResponse = MsgUndelegateResponse;
        })(v1beta1 = staking.v1beta1 || (staking.v1beta1 = {}));
    })(staking = cosmos.staking || (cosmos.staking = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=tx.js.map