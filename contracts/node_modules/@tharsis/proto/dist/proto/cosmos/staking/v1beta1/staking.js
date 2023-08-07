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
const dependency_2 = __importStar(require("./../../../google/protobuf/any"));
const dependency_3 = __importStar(require("./../../../google/protobuf/duration"));
const dependency_4 = __importStar(require("./../../../google/protobuf/timestamp"));
const dependency_6 = __importStar(require("./../../base/v1beta1/coin"));
const dependency_7 = __importStar(require("./../../../tendermint/types/types"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var staking;
    (function (staking) {
        var v1beta1;
        (function (v1beta1) {
            let BondStatus;
            (function (BondStatus) {
                BondStatus[BondStatus["BOND_STATUS_UNSPECIFIED"] = 0] = "BOND_STATUS_UNSPECIFIED";
                BondStatus[BondStatus["BOND_STATUS_UNBONDED"] = 1] = "BOND_STATUS_UNBONDED";
                BondStatus[BondStatus["BOND_STATUS_UNBONDING"] = 2] = "BOND_STATUS_UNBONDING";
                BondStatus[BondStatus["BOND_STATUS_BONDED"] = 3] = "BOND_STATUS_BONDED";
            })(BondStatus = v1beta1.BondStatus || (v1beta1.BondStatus = {}));
            class HistoricalInfo extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("header" in data && data.header != undefined) {
                            this.header = data.header;
                        }
                        if ("valset" in data && data.valset != undefined) {
                            this.valset = data.valset;
                        }
                    }
                }
                get header() {
                    return pb_1.Message.getWrapperField(this, dependency_7.tendermint.types.Header, 1);
                }
                set header(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get valset() {
                    return pb_1.Message.getRepeatedWrapperField(this, Validator, 2);
                }
                set valset(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new HistoricalInfo({});
                    if (data.header != null) {
                        message.header = dependency_7.tendermint.types.Header.fromObject(data.header);
                    }
                    if (data.valset != null) {
                        message.valset = data.valset.map(item => Validator.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.header != null) {
                        data.header = this.header.toObject();
                    }
                    if (this.valset != null) {
                        data.valset = this.valset.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.header !== undefined)
                        writer.writeMessage(1, this.header, () => this.header.serialize(writer));
                    if (this.valset !== undefined)
                        writer.writeRepeatedMessage(2, this.valset, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new HistoricalInfo();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.header, () => message.header = dependency_7.tendermint.types.Header.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.valset, () => pb_1.Message.addToRepeatedWrapperField(message, 2, Validator.deserialize(reader), Validator));
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
                    return HistoricalInfo.deserialize(bytes);
                }
            }
            v1beta1.HistoricalInfo = HistoricalInfo;
            class CommissionRates extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("rate" in data && data.rate != undefined) {
                            this.rate = data.rate;
                        }
                        if ("max_rate" in data && data.max_rate != undefined) {
                            this.max_rate = data.max_rate;
                        }
                        if ("max_change_rate" in data && data.max_change_rate != undefined) {
                            this.max_change_rate = data.max_change_rate;
                        }
                    }
                }
                get rate() {
                    return pb_1.Message.getField(this, 1);
                }
                set rate(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get max_rate() {
                    return pb_1.Message.getField(this, 2);
                }
                set max_rate(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get max_change_rate() {
                    return pb_1.Message.getField(this, 3);
                }
                set max_change_rate(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new CommissionRates({});
                    if (data.rate != null) {
                        message.rate = data.rate;
                    }
                    if (data.max_rate != null) {
                        message.max_rate = data.max_rate;
                    }
                    if (data.max_change_rate != null) {
                        message.max_change_rate = data.max_change_rate;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.rate != null) {
                        data.rate = this.rate;
                    }
                    if (this.max_rate != null) {
                        data.max_rate = this.max_rate;
                    }
                    if (this.max_change_rate != null) {
                        data.max_change_rate = this.max_change_rate;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.rate === "string" && this.rate.length)
                        writer.writeString(1, this.rate);
                    if (typeof this.max_rate === "string" && this.max_rate.length)
                        writer.writeString(2, this.max_rate);
                    if (typeof this.max_change_rate === "string" && this.max_change_rate.length)
                        writer.writeString(3, this.max_change_rate);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CommissionRates();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.rate = reader.readString();
                                break;
                            case 2:
                                message.max_rate = reader.readString();
                                break;
                            case 3:
                                message.max_change_rate = reader.readString();
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
                    return CommissionRates.deserialize(bytes);
                }
            }
            v1beta1.CommissionRates = CommissionRates;
            class Commission extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("commission_rates" in data && data.commission_rates != undefined) {
                            this.commission_rates = data.commission_rates;
                        }
                        if ("update_time" in data && data.update_time != undefined) {
                            this.update_time = data.update_time;
                        }
                    }
                }
                get commission_rates() {
                    return pb_1.Message.getWrapperField(this, CommissionRates, 1);
                }
                set commission_rates(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get update_time() {
                    return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Timestamp, 2);
                }
                set update_time(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Commission({});
                    if (data.commission_rates != null) {
                        message.commission_rates = CommissionRates.fromObject(data.commission_rates);
                    }
                    if (data.update_time != null) {
                        message.update_time = dependency_4.google.protobuf.Timestamp.fromObject(data.update_time);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.commission_rates != null) {
                        data.commission_rates = this.commission_rates.toObject();
                    }
                    if (this.update_time != null) {
                        data.update_time = this.update_time.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.commission_rates !== undefined)
                        writer.writeMessage(1, this.commission_rates, () => this.commission_rates.serialize(writer));
                    if (this.update_time !== undefined)
                        writer.writeMessage(2, this.update_time, () => this.update_time.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Commission();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.commission_rates, () => message.commission_rates = CommissionRates.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.update_time, () => message.update_time = dependency_4.google.protobuf.Timestamp.deserialize(reader));
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
                    return Commission.deserialize(bytes);
                }
            }
            v1beta1.Commission = Commission;
            class Description extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("moniker" in data && data.moniker != undefined) {
                            this.moniker = data.moniker;
                        }
                        if ("identity" in data && data.identity != undefined) {
                            this.identity = data.identity;
                        }
                        if ("website" in data && data.website != undefined) {
                            this.website = data.website;
                        }
                        if ("security_contact" in data && data.security_contact != undefined) {
                            this.security_contact = data.security_contact;
                        }
                        if ("details" in data && data.details != undefined) {
                            this.details = data.details;
                        }
                    }
                }
                get moniker() {
                    return pb_1.Message.getField(this, 1);
                }
                set moniker(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get identity() {
                    return pb_1.Message.getField(this, 2);
                }
                set identity(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get website() {
                    return pb_1.Message.getField(this, 3);
                }
                set website(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get security_contact() {
                    return pb_1.Message.getField(this, 4);
                }
                set security_contact(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get details() {
                    return pb_1.Message.getField(this, 5);
                }
                set details(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new Description({});
                    if (data.moniker != null) {
                        message.moniker = data.moniker;
                    }
                    if (data.identity != null) {
                        message.identity = data.identity;
                    }
                    if (data.website != null) {
                        message.website = data.website;
                    }
                    if (data.security_contact != null) {
                        message.security_contact = data.security_contact;
                    }
                    if (data.details != null) {
                        message.details = data.details;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.moniker != null) {
                        data.moniker = this.moniker;
                    }
                    if (this.identity != null) {
                        data.identity = this.identity;
                    }
                    if (this.website != null) {
                        data.website = this.website;
                    }
                    if (this.security_contact != null) {
                        data.security_contact = this.security_contact;
                    }
                    if (this.details != null) {
                        data.details = this.details;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.moniker === "string" && this.moniker.length)
                        writer.writeString(1, this.moniker);
                    if (typeof this.identity === "string" && this.identity.length)
                        writer.writeString(2, this.identity);
                    if (typeof this.website === "string" && this.website.length)
                        writer.writeString(3, this.website);
                    if (typeof this.security_contact === "string" && this.security_contact.length)
                        writer.writeString(4, this.security_contact);
                    if (typeof this.details === "string" && this.details.length)
                        writer.writeString(5, this.details);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Description();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.moniker = reader.readString();
                                break;
                            case 2:
                                message.identity = reader.readString();
                                break;
                            case 3:
                                message.website = reader.readString();
                                break;
                            case 4:
                                message.security_contact = reader.readString();
                                break;
                            case 5:
                                message.details = reader.readString();
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
                    return Description.deserialize(bytes);
                }
            }
            v1beta1.Description = Description;
            class Validator extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("operator_address" in data && data.operator_address != undefined) {
                            this.operator_address = data.operator_address;
                        }
                        if ("consensus_pubkey" in data && data.consensus_pubkey != undefined) {
                            this.consensus_pubkey = data.consensus_pubkey;
                        }
                        if ("jailed" in data && data.jailed != undefined) {
                            this.jailed = data.jailed;
                        }
                        if ("status" in data && data.status != undefined) {
                            this.status = data.status;
                        }
                        if ("tokens" in data && data.tokens != undefined) {
                            this.tokens = data.tokens;
                        }
                        if ("delegator_shares" in data && data.delegator_shares != undefined) {
                            this.delegator_shares = data.delegator_shares;
                        }
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("unbonding_height" in data && data.unbonding_height != undefined) {
                            this.unbonding_height = data.unbonding_height;
                        }
                        if ("unbonding_time" in data && data.unbonding_time != undefined) {
                            this.unbonding_time = data.unbonding_time;
                        }
                        if ("commission" in data && data.commission != undefined) {
                            this.commission = data.commission;
                        }
                        if ("min_self_delegation" in data && data.min_self_delegation != undefined) {
                            this.min_self_delegation = data.min_self_delegation;
                        }
                    }
                }
                get operator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set operator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get consensus_pubkey() {
                    return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 2);
                }
                set consensus_pubkey(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get jailed() {
                    return pb_1.Message.getField(this, 3);
                }
                set jailed(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get status() {
                    return pb_1.Message.getField(this, 4);
                }
                set status(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get tokens() {
                    return pb_1.Message.getField(this, 5);
                }
                set tokens(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get delegator_shares() {
                    return pb_1.Message.getField(this, 6);
                }
                set delegator_shares(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                get description() {
                    return pb_1.Message.getWrapperField(this, Description, 7);
                }
                set description(value) {
                    pb_1.Message.setWrapperField(this, 7, value);
                }
                get unbonding_height() {
                    return pb_1.Message.getField(this, 8);
                }
                set unbonding_height(value) {
                    pb_1.Message.setField(this, 8, value);
                }
                get unbonding_time() {
                    return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Timestamp, 9);
                }
                set unbonding_time(value) {
                    pb_1.Message.setWrapperField(this, 9, value);
                }
                get commission() {
                    return pb_1.Message.getWrapperField(this, Commission, 10);
                }
                set commission(value) {
                    pb_1.Message.setWrapperField(this, 10, value);
                }
                get min_self_delegation() {
                    return pb_1.Message.getField(this, 11);
                }
                set min_self_delegation(value) {
                    pb_1.Message.setField(this, 11, value);
                }
                static fromObject(data) {
                    const message = new Validator({});
                    if (data.operator_address != null) {
                        message.operator_address = data.operator_address;
                    }
                    if (data.consensus_pubkey != null) {
                        message.consensus_pubkey = dependency_2.google.protobuf.Any.fromObject(data.consensus_pubkey);
                    }
                    if (data.jailed != null) {
                        message.jailed = data.jailed;
                    }
                    if (data.status != null) {
                        message.status = data.status;
                    }
                    if (data.tokens != null) {
                        message.tokens = data.tokens;
                    }
                    if (data.delegator_shares != null) {
                        message.delegator_shares = data.delegator_shares;
                    }
                    if (data.description != null) {
                        message.description = Description.fromObject(data.description);
                    }
                    if (data.unbonding_height != null) {
                        message.unbonding_height = data.unbonding_height;
                    }
                    if (data.unbonding_time != null) {
                        message.unbonding_time = dependency_4.google.protobuf.Timestamp.fromObject(data.unbonding_time);
                    }
                    if (data.commission != null) {
                        message.commission = Commission.fromObject(data.commission);
                    }
                    if (data.min_self_delegation != null) {
                        message.min_self_delegation = data.min_self_delegation;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.operator_address != null) {
                        data.operator_address = this.operator_address;
                    }
                    if (this.consensus_pubkey != null) {
                        data.consensus_pubkey = this.consensus_pubkey.toObject();
                    }
                    if (this.jailed != null) {
                        data.jailed = this.jailed;
                    }
                    if (this.status != null) {
                        data.status = this.status;
                    }
                    if (this.tokens != null) {
                        data.tokens = this.tokens;
                    }
                    if (this.delegator_shares != null) {
                        data.delegator_shares = this.delegator_shares;
                    }
                    if (this.description != null) {
                        data.description = this.description.toObject();
                    }
                    if (this.unbonding_height != null) {
                        data.unbonding_height = this.unbonding_height;
                    }
                    if (this.unbonding_time != null) {
                        data.unbonding_time = this.unbonding_time.toObject();
                    }
                    if (this.commission != null) {
                        data.commission = this.commission.toObject();
                    }
                    if (this.min_self_delegation != null) {
                        data.min_self_delegation = this.min_self_delegation;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.operator_address === "string" && this.operator_address.length)
                        writer.writeString(1, this.operator_address);
                    if (this.consensus_pubkey !== undefined)
                        writer.writeMessage(2, this.consensus_pubkey, () => this.consensus_pubkey.serialize(writer));
                    if (this.jailed !== undefined)
                        writer.writeBool(3, this.jailed);
                    if (this.status !== undefined)
                        writer.writeEnum(4, this.status);
                    if (typeof this.tokens === "string" && this.tokens.length)
                        writer.writeString(5, this.tokens);
                    if (typeof this.delegator_shares === "string" && this.delegator_shares.length)
                        writer.writeString(6, this.delegator_shares);
                    if (this.description !== undefined)
                        writer.writeMessage(7, this.description, () => this.description.serialize(writer));
                    if (this.unbonding_height !== undefined)
                        writer.writeInt64(8, this.unbonding_height);
                    if (this.unbonding_time !== undefined)
                        writer.writeMessage(9, this.unbonding_time, () => this.unbonding_time.serialize(writer));
                    if (this.commission !== undefined)
                        writer.writeMessage(10, this.commission, () => this.commission.serialize(writer));
                    if (typeof this.min_self_delegation === "string" && this.min_self_delegation.length)
                        writer.writeString(11, this.min_self_delegation);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Validator();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.operator_address = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.consensus_pubkey, () => message.consensus_pubkey = dependency_2.google.protobuf.Any.deserialize(reader));
                                break;
                            case 3:
                                message.jailed = reader.readBool();
                                break;
                            case 4:
                                message.status = reader.readEnum();
                                break;
                            case 5:
                                message.tokens = reader.readString();
                                break;
                            case 6:
                                message.delegator_shares = reader.readString();
                                break;
                            case 7:
                                reader.readMessage(message.description, () => message.description = Description.deserialize(reader));
                                break;
                            case 8:
                                message.unbonding_height = reader.readInt64();
                                break;
                            case 9:
                                reader.readMessage(message.unbonding_time, () => message.unbonding_time = dependency_4.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 10:
                                reader.readMessage(message.commission, () => message.commission = Commission.deserialize(reader));
                                break;
                            case 11:
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
                    return Validator.deserialize(bytes);
                }
            }
            v1beta1.Validator = Validator;
            class ValAddresses extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("addresses" in data && data.addresses != undefined) {
                            this.addresses = data.addresses;
                        }
                    }
                }
                get addresses() {
                    return pb_1.Message.getField(this, 1);
                }
                set addresses(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new ValAddresses({});
                    if (data.addresses != null) {
                        message.addresses = data.addresses;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.addresses != null) {
                        data.addresses = this.addresses;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.addresses !== undefined)
                        writer.writeRepeatedString(1, this.addresses);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValAddresses();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                pb_1.Message.addToRepeatedField(message, 1, reader.readString());
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
                    return ValAddresses.deserialize(bytes);
                }
            }
            v1beta1.ValAddresses = ValAddresses;
            class DVPair extends pb_1.Message {
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
                static fromObject(data) {
                    const message = new DVPair({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
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
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(2, this.validator_address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DVPair();
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
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return DVPair.deserialize(bytes);
                }
            }
            v1beta1.DVPair = DVPair;
            class DVPairs extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("pairs" in data && data.pairs != undefined) {
                            this.pairs = data.pairs;
                        }
                    }
                }
                get pairs() {
                    return pb_1.Message.getRepeatedWrapperField(this, DVPair, 1);
                }
                set pairs(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new DVPairs({});
                    if (data.pairs != null) {
                        message.pairs = data.pairs.map(item => DVPair.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.pairs != null) {
                        data.pairs = this.pairs.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.pairs !== undefined)
                        writer.writeRepeatedMessage(1, this.pairs, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DVPairs();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.pairs, () => pb_1.Message.addToRepeatedWrapperField(message, 1, DVPair.deserialize(reader), DVPair));
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
                    return DVPairs.deserialize(bytes);
                }
            }
            v1beta1.DVPairs = DVPairs;
            class DVVTriplet extends pb_1.Message {
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
                static fromObject(data) {
                    const message = new DVVTriplet({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_src_address != null) {
                        message.validator_src_address = data.validator_src_address;
                    }
                    if (data.validator_dst_address != null) {
                        message.validator_dst_address = data.validator_dst_address;
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
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DVVTriplet();
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
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return DVVTriplet.deserialize(bytes);
                }
            }
            v1beta1.DVVTriplet = DVVTriplet;
            class DVVTriplets extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("triplets" in data && data.triplets != undefined) {
                            this.triplets = data.triplets;
                        }
                    }
                }
                get triplets() {
                    return pb_1.Message.getRepeatedWrapperField(this, DVVTriplet, 1);
                }
                set triplets(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new DVVTriplets({});
                    if (data.triplets != null) {
                        message.triplets = data.triplets.map(item => DVVTriplet.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.triplets != null) {
                        data.triplets = this.triplets.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.triplets !== undefined)
                        writer.writeRepeatedMessage(1, this.triplets, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DVVTriplets();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.triplets, () => pb_1.Message.addToRepeatedWrapperField(message, 1, DVVTriplet.deserialize(reader), DVVTriplet));
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
                    return DVVTriplets.deserialize(bytes);
                }
            }
            v1beta1.DVVTriplets = DVVTriplets;
            class Delegation extends pb_1.Message {
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
                        if ("shares" in data && data.shares != undefined) {
                            this.shares = data.shares;
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
                get shares() {
                    return pb_1.Message.getField(this, 3);
                }
                set shares(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new Delegation({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.shares != null) {
                        message.shares = data.shares;
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
                    if (this.shares != null) {
                        data.shares = this.shares;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(2, this.validator_address);
                    if (typeof this.shares === "string" && this.shares.length)
                        writer.writeString(3, this.shares);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Delegation();
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
                                message.shares = reader.readString();
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
                    return Delegation.deserialize(bytes);
                }
            }
            v1beta1.Delegation = Delegation;
            class UnbondingDelegation extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("delegator_address" in data && data.delegator_address != undefined) {
                            this.delegator_address = data.delegator_address;
                        }
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("entries" in data && data.entries != undefined) {
                            this.entries = data.entries;
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
                get entries() {
                    return pb_1.Message.getRepeatedWrapperField(this, UnbondingDelegationEntry, 3);
                }
                set entries(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new UnbondingDelegation({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.entries != null) {
                        message.entries = data.entries.map(item => UnbondingDelegationEntry.fromObject(item));
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
                    if (this.entries != null) {
                        data.entries = this.entries.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(2, this.validator_address);
                    if (this.entries !== undefined)
                        writer.writeRepeatedMessage(3, this.entries, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UnbondingDelegation();
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
                                reader.readMessage(message.entries, () => pb_1.Message.addToRepeatedWrapperField(message, 3, UnbondingDelegationEntry.deserialize(reader), UnbondingDelegationEntry));
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
                    return UnbondingDelegation.deserialize(bytes);
                }
            }
            v1beta1.UnbondingDelegation = UnbondingDelegation;
            class UnbondingDelegationEntry extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("creation_height" in data && data.creation_height != undefined) {
                            this.creation_height = data.creation_height;
                        }
                        if ("completion_time" in data && data.completion_time != undefined) {
                            this.completion_time = data.completion_time;
                        }
                        if ("initial_balance" in data && data.initial_balance != undefined) {
                            this.initial_balance = data.initial_balance;
                        }
                        if ("balance" in data && data.balance != undefined) {
                            this.balance = data.balance;
                        }
                    }
                }
                get creation_height() {
                    return pb_1.Message.getField(this, 1);
                }
                set creation_height(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get completion_time() {
                    return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Timestamp, 2);
                }
                set completion_time(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get initial_balance() {
                    return pb_1.Message.getField(this, 3);
                }
                set initial_balance(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get balance() {
                    return pb_1.Message.getField(this, 4);
                }
                set balance(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new UnbondingDelegationEntry({});
                    if (data.creation_height != null) {
                        message.creation_height = data.creation_height;
                    }
                    if (data.completion_time != null) {
                        message.completion_time = dependency_4.google.protobuf.Timestamp.fromObject(data.completion_time);
                    }
                    if (data.initial_balance != null) {
                        message.initial_balance = data.initial_balance;
                    }
                    if (data.balance != null) {
                        message.balance = data.balance;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.creation_height != null) {
                        data.creation_height = this.creation_height;
                    }
                    if (this.completion_time != null) {
                        data.completion_time = this.completion_time.toObject();
                    }
                    if (this.initial_balance != null) {
                        data.initial_balance = this.initial_balance;
                    }
                    if (this.balance != null) {
                        data.balance = this.balance;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.creation_height !== undefined)
                        writer.writeInt64(1, this.creation_height);
                    if (this.completion_time !== undefined)
                        writer.writeMessage(2, this.completion_time, () => this.completion_time.serialize(writer));
                    if (typeof this.initial_balance === "string" && this.initial_balance.length)
                        writer.writeString(3, this.initial_balance);
                    if (typeof this.balance === "string" && this.balance.length)
                        writer.writeString(4, this.balance);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UnbondingDelegationEntry();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.creation_height = reader.readInt64();
                                break;
                            case 2:
                                reader.readMessage(message.completion_time, () => message.completion_time = dependency_4.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 3:
                                message.initial_balance = reader.readString();
                                break;
                            case 4:
                                message.balance = reader.readString();
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
                    return UnbondingDelegationEntry.deserialize(bytes);
                }
            }
            v1beta1.UnbondingDelegationEntry = UnbondingDelegationEntry;
            class RedelegationEntry extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("creation_height" in data && data.creation_height != undefined) {
                            this.creation_height = data.creation_height;
                        }
                        if ("completion_time" in data && data.completion_time != undefined) {
                            this.completion_time = data.completion_time;
                        }
                        if ("initial_balance" in data && data.initial_balance != undefined) {
                            this.initial_balance = data.initial_balance;
                        }
                        if ("shares_dst" in data && data.shares_dst != undefined) {
                            this.shares_dst = data.shares_dst;
                        }
                    }
                }
                get creation_height() {
                    return pb_1.Message.getField(this, 1);
                }
                set creation_height(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get completion_time() {
                    return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Timestamp, 2);
                }
                set completion_time(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get initial_balance() {
                    return pb_1.Message.getField(this, 3);
                }
                set initial_balance(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get shares_dst() {
                    return pb_1.Message.getField(this, 4);
                }
                set shares_dst(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new RedelegationEntry({});
                    if (data.creation_height != null) {
                        message.creation_height = data.creation_height;
                    }
                    if (data.completion_time != null) {
                        message.completion_time = dependency_4.google.protobuf.Timestamp.fromObject(data.completion_time);
                    }
                    if (data.initial_balance != null) {
                        message.initial_balance = data.initial_balance;
                    }
                    if (data.shares_dst != null) {
                        message.shares_dst = data.shares_dst;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.creation_height != null) {
                        data.creation_height = this.creation_height;
                    }
                    if (this.completion_time != null) {
                        data.completion_time = this.completion_time.toObject();
                    }
                    if (this.initial_balance != null) {
                        data.initial_balance = this.initial_balance;
                    }
                    if (this.shares_dst != null) {
                        data.shares_dst = this.shares_dst;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.creation_height !== undefined)
                        writer.writeInt64(1, this.creation_height);
                    if (this.completion_time !== undefined)
                        writer.writeMessage(2, this.completion_time, () => this.completion_time.serialize(writer));
                    if (typeof this.initial_balance === "string" && this.initial_balance.length)
                        writer.writeString(3, this.initial_balance);
                    if (typeof this.shares_dst === "string" && this.shares_dst.length)
                        writer.writeString(4, this.shares_dst);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RedelegationEntry();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.creation_height = reader.readInt64();
                                break;
                            case 2:
                                reader.readMessage(message.completion_time, () => message.completion_time = dependency_4.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 3:
                                message.initial_balance = reader.readString();
                                break;
                            case 4:
                                message.shares_dst = reader.readString();
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
                    return RedelegationEntry.deserialize(bytes);
                }
            }
            v1beta1.RedelegationEntry = RedelegationEntry;
            class Redelegation extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
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
                        if ("entries" in data && data.entries != undefined) {
                            this.entries = data.entries;
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
                get entries() {
                    return pb_1.Message.getRepeatedWrapperField(this, RedelegationEntry, 4);
                }
                set entries(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new Redelegation({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_src_address != null) {
                        message.validator_src_address = data.validator_src_address;
                    }
                    if (data.validator_dst_address != null) {
                        message.validator_dst_address = data.validator_dst_address;
                    }
                    if (data.entries != null) {
                        message.entries = data.entries.map(item => RedelegationEntry.fromObject(item));
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
                    if (this.entries != null) {
                        data.entries = this.entries.map((item) => item.toObject());
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
                    if (this.entries !== undefined)
                        writer.writeRepeatedMessage(4, this.entries, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Redelegation();
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
                                reader.readMessage(message.entries, () => pb_1.Message.addToRepeatedWrapperField(message, 4, RedelegationEntry.deserialize(reader), RedelegationEntry));
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
                    return Redelegation.deserialize(bytes);
                }
            }
            v1beta1.Redelegation = Redelegation;
            class Params extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("unbonding_time" in data && data.unbonding_time != undefined) {
                            this.unbonding_time = data.unbonding_time;
                        }
                        if ("max_validators" in data && data.max_validators != undefined) {
                            this.max_validators = data.max_validators;
                        }
                        if ("max_entries" in data && data.max_entries != undefined) {
                            this.max_entries = data.max_entries;
                        }
                        if ("historical_entries" in data && data.historical_entries != undefined) {
                            this.historical_entries = data.historical_entries;
                        }
                        if ("bond_denom" in data && data.bond_denom != undefined) {
                            this.bond_denom = data.bond_denom;
                        }
                    }
                }
                get unbonding_time() {
                    return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Duration, 1);
                }
                set unbonding_time(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get max_validators() {
                    return pb_1.Message.getField(this, 2);
                }
                set max_validators(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get max_entries() {
                    return pb_1.Message.getField(this, 3);
                }
                set max_entries(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get historical_entries() {
                    return pb_1.Message.getField(this, 4);
                }
                set historical_entries(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get bond_denom() {
                    return pb_1.Message.getField(this, 5);
                }
                set bond_denom(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.unbonding_time != null) {
                        message.unbonding_time = dependency_3.google.protobuf.Duration.fromObject(data.unbonding_time);
                    }
                    if (data.max_validators != null) {
                        message.max_validators = data.max_validators;
                    }
                    if (data.max_entries != null) {
                        message.max_entries = data.max_entries;
                    }
                    if (data.historical_entries != null) {
                        message.historical_entries = data.historical_entries;
                    }
                    if (data.bond_denom != null) {
                        message.bond_denom = data.bond_denom;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.unbonding_time != null) {
                        data.unbonding_time = this.unbonding_time.toObject();
                    }
                    if (this.max_validators != null) {
                        data.max_validators = this.max_validators;
                    }
                    if (this.max_entries != null) {
                        data.max_entries = this.max_entries;
                    }
                    if (this.historical_entries != null) {
                        data.historical_entries = this.historical_entries;
                    }
                    if (this.bond_denom != null) {
                        data.bond_denom = this.bond_denom;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.unbonding_time !== undefined)
                        writer.writeMessage(1, this.unbonding_time, () => this.unbonding_time.serialize(writer));
                    if (this.max_validators !== undefined)
                        writer.writeUint32(2, this.max_validators);
                    if (this.max_entries !== undefined)
                        writer.writeUint32(3, this.max_entries);
                    if (this.historical_entries !== undefined)
                        writer.writeUint32(4, this.historical_entries);
                    if (typeof this.bond_denom === "string" && this.bond_denom.length)
                        writer.writeString(5, this.bond_denom);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Params();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.unbonding_time, () => message.unbonding_time = dependency_3.google.protobuf.Duration.deserialize(reader));
                                break;
                            case 2:
                                message.max_validators = reader.readUint32();
                                break;
                            case 3:
                                message.max_entries = reader.readUint32();
                                break;
                            case 4:
                                message.historical_entries = reader.readUint32();
                                break;
                            case 5:
                                message.bond_denom = reader.readString();
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
                    return Params.deserialize(bytes);
                }
            }
            v1beta1.Params = Params;
            class DelegationResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("delegation" in data && data.delegation != undefined) {
                            this.delegation = data.delegation;
                        }
                        if ("balance" in data && data.balance != undefined) {
                            this.balance = data.balance;
                        }
                    }
                }
                get delegation() {
                    return pb_1.Message.getWrapperField(this, Delegation, 1);
                }
                set delegation(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get balance() {
                    return pb_1.Message.getWrapperField(this, dependency_6.cosmos.base.v1beta1.Coin, 2);
                }
                set balance(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new DelegationResponse({});
                    if (data.delegation != null) {
                        message.delegation = Delegation.fromObject(data.delegation);
                    }
                    if (data.balance != null) {
                        message.balance = dependency_6.cosmos.base.v1beta1.Coin.fromObject(data.balance);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.delegation != null) {
                        data.delegation = this.delegation.toObject();
                    }
                    if (this.balance != null) {
                        data.balance = this.balance.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.delegation !== undefined)
                        writer.writeMessage(1, this.delegation, () => this.delegation.serialize(writer));
                    if (this.balance !== undefined)
                        writer.writeMessage(2, this.balance, () => this.balance.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DelegationResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.delegation, () => message.delegation = Delegation.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.balance, () => message.balance = dependency_6.cosmos.base.v1beta1.Coin.deserialize(reader));
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
                    return DelegationResponse.deserialize(bytes);
                }
            }
            v1beta1.DelegationResponse = DelegationResponse;
            class RedelegationEntryResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("redelegation_entry" in data && data.redelegation_entry != undefined) {
                            this.redelegation_entry = data.redelegation_entry;
                        }
                        if ("balance" in data && data.balance != undefined) {
                            this.balance = data.balance;
                        }
                    }
                }
                get redelegation_entry() {
                    return pb_1.Message.getWrapperField(this, RedelegationEntry, 1);
                }
                set redelegation_entry(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get balance() {
                    return pb_1.Message.getField(this, 4);
                }
                set balance(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new RedelegationEntryResponse({});
                    if (data.redelegation_entry != null) {
                        message.redelegation_entry = RedelegationEntry.fromObject(data.redelegation_entry);
                    }
                    if (data.balance != null) {
                        message.balance = data.balance;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.redelegation_entry != null) {
                        data.redelegation_entry = this.redelegation_entry.toObject();
                    }
                    if (this.balance != null) {
                        data.balance = this.balance;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.redelegation_entry !== undefined)
                        writer.writeMessage(1, this.redelegation_entry, () => this.redelegation_entry.serialize(writer));
                    if (typeof this.balance === "string" && this.balance.length)
                        writer.writeString(4, this.balance);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RedelegationEntryResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.redelegation_entry, () => message.redelegation_entry = RedelegationEntry.deserialize(reader));
                                break;
                            case 4:
                                message.balance = reader.readString();
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
                    return RedelegationEntryResponse.deserialize(bytes);
                }
            }
            v1beta1.RedelegationEntryResponse = RedelegationEntryResponse;
            class RedelegationResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("redelegation" in data && data.redelegation != undefined) {
                            this.redelegation = data.redelegation;
                        }
                        if ("entries" in data && data.entries != undefined) {
                            this.entries = data.entries;
                        }
                    }
                }
                get redelegation() {
                    return pb_1.Message.getWrapperField(this, Redelegation, 1);
                }
                set redelegation(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get entries() {
                    return pb_1.Message.getRepeatedWrapperField(this, RedelegationEntryResponse, 2);
                }
                set entries(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new RedelegationResponse({});
                    if (data.redelegation != null) {
                        message.redelegation = Redelegation.fromObject(data.redelegation);
                    }
                    if (data.entries != null) {
                        message.entries = data.entries.map(item => RedelegationEntryResponse.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.redelegation != null) {
                        data.redelegation = this.redelegation.toObject();
                    }
                    if (this.entries != null) {
                        data.entries = this.entries.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.redelegation !== undefined)
                        writer.writeMessage(1, this.redelegation, () => this.redelegation.serialize(writer));
                    if (this.entries !== undefined)
                        writer.writeRepeatedMessage(2, this.entries, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RedelegationResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.redelegation, () => message.redelegation = Redelegation.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.entries, () => pb_1.Message.addToRepeatedWrapperField(message, 2, RedelegationEntryResponse.deserialize(reader), RedelegationEntryResponse));
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
                    return RedelegationResponse.deserialize(bytes);
                }
            }
            v1beta1.RedelegationResponse = RedelegationResponse;
            class Pool extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("not_bonded_tokens" in data && data.not_bonded_tokens != undefined) {
                            this.not_bonded_tokens = data.not_bonded_tokens;
                        }
                        if ("bonded_tokens" in data && data.bonded_tokens != undefined) {
                            this.bonded_tokens = data.bonded_tokens;
                        }
                    }
                }
                get not_bonded_tokens() {
                    return pb_1.Message.getField(this, 1);
                }
                set not_bonded_tokens(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get bonded_tokens() {
                    return pb_1.Message.getField(this, 2);
                }
                set bonded_tokens(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Pool({});
                    if (data.not_bonded_tokens != null) {
                        message.not_bonded_tokens = data.not_bonded_tokens;
                    }
                    if (data.bonded_tokens != null) {
                        message.bonded_tokens = data.bonded_tokens;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.not_bonded_tokens != null) {
                        data.not_bonded_tokens = this.not_bonded_tokens;
                    }
                    if (this.bonded_tokens != null) {
                        data.bonded_tokens = this.bonded_tokens;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.not_bonded_tokens === "string" && this.not_bonded_tokens.length)
                        writer.writeString(1, this.not_bonded_tokens);
                    if (typeof this.bonded_tokens === "string" && this.bonded_tokens.length)
                        writer.writeString(2, this.bonded_tokens);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Pool();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.not_bonded_tokens = reader.readString();
                                break;
                            case 2:
                                message.bonded_tokens = reader.readString();
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
                    return Pool.deserialize(bytes);
                }
            }
            v1beta1.Pool = Pool;
        })(v1beta1 = staking.v1beta1 || (staking.v1beta1 = {}));
    })(staking = cosmos.staking || (cosmos.staking = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=staking.js.map