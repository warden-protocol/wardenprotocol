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
const dependency_4 = __importStar(require("./../../base/v1beta1/coin"));
const dependency_5 = __importStar(require("./../../../google/protobuf/timestamp"));
const dependency_6 = __importStar(require("./../../../google/protobuf/duration"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var feegrant;
    (function (feegrant) {
        var v1beta1;
        (function (v1beta1) {
            class BasicAllowance extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("spend_limit" in data && data.spend_limit != undefined) {
                            this.spend_limit = data.spend_limit;
                        }
                        if ("expiration" in data && data.expiration != undefined) {
                            this.expiration = data.expiration;
                        }
                    }
                }
                get spend_limit() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_4.cosmos.base.v1beta1.Coin, 1);
                }
                set spend_limit(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get expiration() {
                    return pb_1.Message.getWrapperField(this, dependency_5.google.protobuf.Timestamp, 2);
                }
                set expiration(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new BasicAllowance({});
                    if (data.spend_limit != null) {
                        message.spend_limit = data.spend_limit.map(item => dependency_4.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.expiration != null) {
                        message.expiration = dependency_5.google.protobuf.Timestamp.fromObject(data.expiration);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.spend_limit != null) {
                        data.spend_limit = this.spend_limit.map((item) => item.toObject());
                    }
                    if (this.expiration != null) {
                        data.expiration = this.expiration.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.spend_limit !== undefined)
                        writer.writeRepeatedMessage(1, this.spend_limit, (item) => item.serialize(writer));
                    if (this.expiration !== undefined)
                        writer.writeMessage(2, this.expiration, () => this.expiration.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BasicAllowance();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.spend_limit, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_4.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_4.cosmos.base.v1beta1.Coin));
                                break;
                            case 2:
                                reader.readMessage(message.expiration, () => message.expiration = dependency_5.google.protobuf.Timestamp.deserialize(reader));
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
                    return BasicAllowance.deserialize(bytes);
                }
            }
            v1beta1.BasicAllowance = BasicAllowance;
            class PeriodicAllowance extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3, 4], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("basic" in data && data.basic != undefined) {
                            this.basic = data.basic;
                        }
                        if ("period" in data && data.period != undefined) {
                            this.period = data.period;
                        }
                        if ("period_spend_limit" in data && data.period_spend_limit != undefined) {
                            this.period_spend_limit = data.period_spend_limit;
                        }
                        if ("period_can_spend" in data && data.period_can_spend != undefined) {
                            this.period_can_spend = data.period_can_spend;
                        }
                        if ("period_reset" in data && data.period_reset != undefined) {
                            this.period_reset = data.period_reset;
                        }
                    }
                }
                get basic() {
                    return pb_1.Message.getWrapperField(this, BasicAllowance, 1);
                }
                set basic(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get period() {
                    return pb_1.Message.getWrapperField(this, dependency_6.google.protobuf.Duration, 2);
                }
                set period(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get period_spend_limit() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_4.cosmos.base.v1beta1.Coin, 3);
                }
                set period_spend_limit(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                get period_can_spend() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_4.cosmos.base.v1beta1.Coin, 4);
                }
                set period_can_spend(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 4, value);
                }
                get period_reset() {
                    return pb_1.Message.getWrapperField(this, dependency_5.google.protobuf.Timestamp, 5);
                }
                set period_reset(value) {
                    pb_1.Message.setWrapperField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new PeriodicAllowance({});
                    if (data.basic != null) {
                        message.basic = BasicAllowance.fromObject(data.basic);
                    }
                    if (data.period != null) {
                        message.period = dependency_6.google.protobuf.Duration.fromObject(data.period);
                    }
                    if (data.period_spend_limit != null) {
                        message.period_spend_limit = data.period_spend_limit.map(item => dependency_4.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.period_can_spend != null) {
                        message.period_can_spend = data.period_can_spend.map(item => dependency_4.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.period_reset != null) {
                        message.period_reset = dependency_5.google.protobuf.Timestamp.fromObject(data.period_reset);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.basic != null) {
                        data.basic = this.basic.toObject();
                    }
                    if (this.period != null) {
                        data.period = this.period.toObject();
                    }
                    if (this.period_spend_limit != null) {
                        data.period_spend_limit = this.period_spend_limit.map((item) => item.toObject());
                    }
                    if (this.period_can_spend != null) {
                        data.period_can_spend = this.period_can_spend.map((item) => item.toObject());
                    }
                    if (this.period_reset != null) {
                        data.period_reset = this.period_reset.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.basic !== undefined)
                        writer.writeMessage(1, this.basic, () => this.basic.serialize(writer));
                    if (this.period !== undefined)
                        writer.writeMessage(2, this.period, () => this.period.serialize(writer));
                    if (this.period_spend_limit !== undefined)
                        writer.writeRepeatedMessage(3, this.period_spend_limit, (item) => item.serialize(writer));
                    if (this.period_can_spend !== undefined)
                        writer.writeRepeatedMessage(4, this.period_can_spend, (item) => item.serialize(writer));
                    if (this.period_reset !== undefined)
                        writer.writeMessage(5, this.period_reset, () => this.period_reset.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PeriodicAllowance();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.basic, () => message.basic = BasicAllowance.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.period, () => message.period = dependency_6.google.protobuf.Duration.deserialize(reader));
                                break;
                            case 3:
                                reader.readMessage(message.period_spend_limit, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_4.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_4.cosmos.base.v1beta1.Coin));
                                break;
                            case 4:
                                reader.readMessage(message.period_can_spend, () => pb_1.Message.addToRepeatedWrapperField(message, 4, dependency_4.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_4.cosmos.base.v1beta1.Coin));
                                break;
                            case 5:
                                reader.readMessage(message.period_reset, () => message.period_reset = dependency_5.google.protobuf.Timestamp.deserialize(reader));
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
                    return PeriodicAllowance.deserialize(bytes);
                }
            }
            v1beta1.PeriodicAllowance = PeriodicAllowance;
            class AllowedMsgAllowance extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("allowance" in data && data.allowance != undefined) {
                            this.allowance = data.allowance;
                        }
                        if ("allowed_messages" in data && data.allowed_messages != undefined) {
                            this.allowed_messages = data.allowed_messages;
                        }
                    }
                }
                get allowance() {
                    return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 1);
                }
                set allowance(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get allowed_messages() {
                    return pb_1.Message.getField(this, 2);
                }
                set allowed_messages(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new AllowedMsgAllowance({});
                    if (data.allowance != null) {
                        message.allowance = dependency_2.google.protobuf.Any.fromObject(data.allowance);
                    }
                    if (data.allowed_messages != null) {
                        message.allowed_messages = data.allowed_messages;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.allowance != null) {
                        data.allowance = this.allowance.toObject();
                    }
                    if (this.allowed_messages != null) {
                        data.allowed_messages = this.allowed_messages;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.allowance !== undefined)
                        writer.writeMessage(1, this.allowance, () => this.allowance.serialize(writer));
                    if (this.allowed_messages !== undefined)
                        writer.writeRepeatedString(2, this.allowed_messages);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new AllowedMsgAllowance();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.allowance, () => message.allowance = dependency_2.google.protobuf.Any.deserialize(reader));
                                break;
                            case 2:
                                pb_1.Message.addToRepeatedField(message, 2, reader.readString());
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
                    return AllowedMsgAllowance.deserialize(bytes);
                }
            }
            v1beta1.AllowedMsgAllowance = AllowedMsgAllowance;
            class Grant extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("granter" in data && data.granter != undefined) {
                            this.granter = data.granter;
                        }
                        if ("grantee" in data && data.grantee != undefined) {
                            this.grantee = data.grantee;
                        }
                        if ("allowance" in data && data.allowance != undefined) {
                            this.allowance = data.allowance;
                        }
                    }
                }
                get granter() {
                    return pb_1.Message.getField(this, 1);
                }
                set granter(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get grantee() {
                    return pb_1.Message.getField(this, 2);
                }
                set grantee(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get allowance() {
                    return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 3);
                }
                set allowance(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new Grant({});
                    if (data.granter != null) {
                        message.granter = data.granter;
                    }
                    if (data.grantee != null) {
                        message.grantee = data.grantee;
                    }
                    if (data.allowance != null) {
                        message.allowance = dependency_2.google.protobuf.Any.fromObject(data.allowance);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.granter != null) {
                        data.granter = this.granter;
                    }
                    if (this.grantee != null) {
                        data.grantee = this.grantee;
                    }
                    if (this.allowance != null) {
                        data.allowance = this.allowance.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.granter === "string" && this.granter.length)
                        writer.writeString(1, this.granter);
                    if (typeof this.grantee === "string" && this.grantee.length)
                        writer.writeString(2, this.grantee);
                    if (this.allowance !== undefined)
                        writer.writeMessage(3, this.allowance, () => this.allowance.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Grant();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.granter = reader.readString();
                                break;
                            case 2:
                                message.grantee = reader.readString();
                                break;
                            case 3:
                                reader.readMessage(message.allowance, () => message.allowance = dependency_2.google.protobuf.Any.deserialize(reader));
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
                    return Grant.deserialize(bytes);
                }
            }
            v1beta1.Grant = Grant;
        })(v1beta1 = feegrant.v1beta1 || (feegrant.v1beta1 = {}));
    })(feegrant = cosmos.feegrant || (cosmos.feegrant = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=feegrant.js.map