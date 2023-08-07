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
const dependency_2 = __importStar(require("./../../base/v1beta1/coin"));
const dependency_3 = __importStar(require("./distribution"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var distribution;
    (function (distribution) {
        var v1beta1;
        (function (v1beta1) {
            class DelegatorWithdrawInfo extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("delegator_address" in data && data.delegator_address != undefined) {
                            this.delegator_address = data.delegator_address;
                        }
                        if ("withdraw_address" in data && data.withdraw_address != undefined) {
                            this.withdraw_address = data.withdraw_address;
                        }
                    }
                }
                get delegator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set delegator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get withdraw_address() {
                    return pb_1.Message.getField(this, 2);
                }
                set withdraw_address(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new DelegatorWithdrawInfo({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.withdraw_address != null) {
                        message.withdraw_address = data.withdraw_address;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.delegator_address != null) {
                        data.delegator_address = this.delegator_address;
                    }
                    if (this.withdraw_address != null) {
                        data.withdraw_address = this.withdraw_address;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (typeof this.withdraw_address === "string" && this.withdraw_address.length)
                        writer.writeString(2, this.withdraw_address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DelegatorWithdrawInfo();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.delegator_address = reader.readString();
                                break;
                            case 2:
                                message.withdraw_address = reader.readString();
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
                    return DelegatorWithdrawInfo.deserialize(bytes);
                }
            }
            v1beta1.DelegatorWithdrawInfo = DelegatorWithdrawInfo;
            class ValidatorOutstandingRewardsRecord extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("outstanding_rewards" in data && data.outstanding_rewards != undefined) {
                            this.outstanding_rewards = data.outstanding_rewards;
                        }
                    }
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get outstanding_rewards() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.DecCoin, 2);
                }
                set outstanding_rewards(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new ValidatorOutstandingRewardsRecord({});
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.outstanding_rewards != null) {
                        message.outstanding_rewards = data.outstanding_rewards.map(item => dependency_2.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.outstanding_rewards != null) {
                        data.outstanding_rewards = this.outstanding_rewards.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(1, this.validator_address);
                    if (this.outstanding_rewards !== undefined)
                        writer.writeRepeatedMessage(2, this.outstanding_rewards, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorOutstandingRewardsRecord();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.validator_address = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.outstanding_rewards, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_2.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_2.cosmos.base.v1beta1.DecCoin));
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
                    return ValidatorOutstandingRewardsRecord.deserialize(bytes);
                }
            }
            v1beta1.ValidatorOutstandingRewardsRecord = ValidatorOutstandingRewardsRecord;
            class ValidatorAccumulatedCommissionRecord extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("accumulated" in data && data.accumulated != undefined) {
                            this.accumulated = data.accumulated;
                        }
                    }
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get accumulated() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission, 2);
                }
                set accumulated(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new ValidatorAccumulatedCommissionRecord({});
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.accumulated != null) {
                        message.accumulated = dependency_3.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission.fromObject(data.accumulated);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.accumulated != null) {
                        data.accumulated = this.accumulated.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(1, this.validator_address);
                    if (this.accumulated !== undefined)
                        writer.writeMessage(2, this.accumulated, () => this.accumulated.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorAccumulatedCommissionRecord();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.validator_address = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.accumulated, () => message.accumulated = dependency_3.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission.deserialize(reader));
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
                    return ValidatorAccumulatedCommissionRecord.deserialize(bytes);
                }
            }
            v1beta1.ValidatorAccumulatedCommissionRecord = ValidatorAccumulatedCommissionRecord;
            class ValidatorHistoricalRewardsRecord extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("period" in data && data.period != undefined) {
                            this.period = data.period;
                        }
                        if ("rewards" in data && data.rewards != undefined) {
                            this.rewards = data.rewards;
                        }
                    }
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get period() {
                    return pb_1.Message.getField(this, 2);
                }
                set period(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get rewards() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.distribution.v1beta1.ValidatorHistoricalRewards, 3);
                }
                set rewards(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new ValidatorHistoricalRewardsRecord({});
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.period != null) {
                        message.period = data.period;
                    }
                    if (data.rewards != null) {
                        message.rewards = dependency_3.cosmos.distribution.v1beta1.ValidatorHistoricalRewards.fromObject(data.rewards);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.period != null) {
                        data.period = this.period;
                    }
                    if (this.rewards != null) {
                        data.rewards = this.rewards.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(1, this.validator_address);
                    if (this.period !== undefined)
                        writer.writeUint64(2, this.period);
                    if (this.rewards !== undefined)
                        writer.writeMessage(3, this.rewards, () => this.rewards.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorHistoricalRewardsRecord();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.validator_address = reader.readString();
                                break;
                            case 2:
                                message.period = reader.readUint64();
                                break;
                            case 3:
                                reader.readMessage(message.rewards, () => message.rewards = dependency_3.cosmos.distribution.v1beta1.ValidatorHistoricalRewards.deserialize(reader));
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
                    return ValidatorHistoricalRewardsRecord.deserialize(bytes);
                }
            }
            v1beta1.ValidatorHistoricalRewardsRecord = ValidatorHistoricalRewardsRecord;
            class ValidatorCurrentRewardsRecord extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("rewards" in data && data.rewards != undefined) {
                            this.rewards = data.rewards;
                        }
                    }
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get rewards() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.distribution.v1beta1.ValidatorCurrentRewards, 2);
                }
                set rewards(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new ValidatorCurrentRewardsRecord({});
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.rewards != null) {
                        message.rewards = dependency_3.cosmos.distribution.v1beta1.ValidatorCurrentRewards.fromObject(data.rewards);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.rewards != null) {
                        data.rewards = this.rewards.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(1, this.validator_address);
                    if (this.rewards !== undefined)
                        writer.writeMessage(2, this.rewards, () => this.rewards.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorCurrentRewardsRecord();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.validator_address = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.rewards, () => message.rewards = dependency_3.cosmos.distribution.v1beta1.ValidatorCurrentRewards.deserialize(reader));
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
                    return ValidatorCurrentRewardsRecord.deserialize(bytes);
                }
            }
            v1beta1.ValidatorCurrentRewardsRecord = ValidatorCurrentRewardsRecord;
            class DelegatorStartingInfoRecord extends pb_1.Message {
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
                        if ("starting_info" in data && data.starting_info != undefined) {
                            this.starting_info = data.starting_info;
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
                get starting_info() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.distribution.v1beta1.DelegatorStartingInfo, 3);
                }
                set starting_info(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new DelegatorStartingInfoRecord({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.starting_info != null) {
                        message.starting_info = dependency_3.cosmos.distribution.v1beta1.DelegatorStartingInfo.fromObject(data.starting_info);
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
                    if (this.starting_info != null) {
                        data.starting_info = this.starting_info.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(2, this.validator_address);
                    if (this.starting_info !== undefined)
                        writer.writeMessage(3, this.starting_info, () => this.starting_info.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DelegatorStartingInfoRecord();
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
                                reader.readMessage(message.starting_info, () => message.starting_info = dependency_3.cosmos.distribution.v1beta1.DelegatorStartingInfo.deserialize(reader));
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
                    return DelegatorStartingInfoRecord.deserialize(bytes);
                }
            }
            v1beta1.DelegatorStartingInfoRecord = DelegatorStartingInfoRecord;
            class ValidatorSlashEventRecord extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("height" in data && data.height != undefined) {
                            this.height = data.height;
                        }
                        if ("period" in data && data.period != undefined) {
                            this.period = data.period;
                        }
                        if ("validator_slash_event" in data && data.validator_slash_event != undefined) {
                            this.validator_slash_event = data.validator_slash_event;
                        }
                    }
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get height() {
                    return pb_1.Message.getField(this, 2);
                }
                set height(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get period() {
                    return pb_1.Message.getField(this, 3);
                }
                set period(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get validator_slash_event() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.distribution.v1beta1.ValidatorSlashEvent, 4);
                }
                set validator_slash_event(value) {
                    pb_1.Message.setWrapperField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new ValidatorSlashEventRecord({});
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.height != null) {
                        message.height = data.height;
                    }
                    if (data.period != null) {
                        message.period = data.period;
                    }
                    if (data.validator_slash_event != null) {
                        message.validator_slash_event = dependency_3.cosmos.distribution.v1beta1.ValidatorSlashEvent.fromObject(data.validator_slash_event);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.height != null) {
                        data.height = this.height;
                    }
                    if (this.period != null) {
                        data.period = this.period;
                    }
                    if (this.validator_slash_event != null) {
                        data.validator_slash_event = this.validator_slash_event.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(1, this.validator_address);
                    if (this.height !== undefined)
                        writer.writeUint64(2, this.height);
                    if (this.period !== undefined)
                        writer.writeUint64(3, this.period);
                    if (this.validator_slash_event !== undefined)
                        writer.writeMessage(4, this.validator_slash_event, () => this.validator_slash_event.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorSlashEventRecord();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.validator_address = reader.readString();
                                break;
                            case 2:
                                message.height = reader.readUint64();
                                break;
                            case 3:
                                message.period = reader.readUint64();
                                break;
                            case 4:
                                reader.readMessage(message.validator_slash_event, () => message.validator_slash_event = dependency_3.cosmos.distribution.v1beta1.ValidatorSlashEvent.deserialize(reader));
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
                    return ValidatorSlashEventRecord.deserialize(bytes);
                }
            }
            v1beta1.ValidatorSlashEventRecord = ValidatorSlashEventRecord;
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3, 5, 6, 7, 8, 9, 10], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("params" in data && data.params != undefined) {
                            this.params = data.params;
                        }
                        if ("fee_pool" in data && data.fee_pool != undefined) {
                            this.fee_pool = data.fee_pool;
                        }
                        if ("delegator_withdraw_infos" in data && data.delegator_withdraw_infos != undefined) {
                            this.delegator_withdraw_infos = data.delegator_withdraw_infos;
                        }
                        if ("previous_proposer" in data && data.previous_proposer != undefined) {
                            this.previous_proposer = data.previous_proposer;
                        }
                        if ("outstanding_rewards" in data && data.outstanding_rewards != undefined) {
                            this.outstanding_rewards = data.outstanding_rewards;
                        }
                        if ("validator_accumulated_commissions" in data && data.validator_accumulated_commissions != undefined) {
                            this.validator_accumulated_commissions = data.validator_accumulated_commissions;
                        }
                        if ("validator_historical_rewards" in data && data.validator_historical_rewards != undefined) {
                            this.validator_historical_rewards = data.validator_historical_rewards;
                        }
                        if ("validator_current_rewards" in data && data.validator_current_rewards != undefined) {
                            this.validator_current_rewards = data.validator_current_rewards;
                        }
                        if ("delegator_starting_infos" in data && data.delegator_starting_infos != undefined) {
                            this.delegator_starting_infos = data.delegator_starting_infos;
                        }
                        if ("validator_slash_events" in data && data.validator_slash_events != undefined) {
                            this.validator_slash_events = data.validator_slash_events;
                        }
                    }
                }
                get params() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.distribution.v1beta1.Params, 1);
                }
                set params(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get fee_pool() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.distribution.v1beta1.FeePool, 2);
                }
                set fee_pool(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get delegator_withdraw_infos() {
                    return pb_1.Message.getRepeatedWrapperField(this, DelegatorWithdrawInfo, 3);
                }
                set delegator_withdraw_infos(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                get previous_proposer() {
                    return pb_1.Message.getField(this, 4);
                }
                set previous_proposer(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get outstanding_rewards() {
                    return pb_1.Message.getRepeatedWrapperField(this, ValidatorOutstandingRewardsRecord, 5);
                }
                set outstanding_rewards(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 5, value);
                }
                get validator_accumulated_commissions() {
                    return pb_1.Message.getRepeatedWrapperField(this, ValidatorAccumulatedCommissionRecord, 6);
                }
                set validator_accumulated_commissions(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 6, value);
                }
                get validator_historical_rewards() {
                    return pb_1.Message.getRepeatedWrapperField(this, ValidatorHistoricalRewardsRecord, 7);
                }
                set validator_historical_rewards(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 7, value);
                }
                get validator_current_rewards() {
                    return pb_1.Message.getRepeatedWrapperField(this, ValidatorCurrentRewardsRecord, 8);
                }
                set validator_current_rewards(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 8, value);
                }
                get delegator_starting_infos() {
                    return pb_1.Message.getRepeatedWrapperField(this, DelegatorStartingInfoRecord, 9);
                }
                set delegator_starting_infos(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 9, value);
                }
                get validator_slash_events() {
                    return pb_1.Message.getRepeatedWrapperField(this, ValidatorSlashEventRecord, 10);
                }
                set validator_slash_events(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 10, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.params != null) {
                        message.params = dependency_3.cosmos.distribution.v1beta1.Params.fromObject(data.params);
                    }
                    if (data.fee_pool != null) {
                        message.fee_pool = dependency_3.cosmos.distribution.v1beta1.FeePool.fromObject(data.fee_pool);
                    }
                    if (data.delegator_withdraw_infos != null) {
                        message.delegator_withdraw_infos = data.delegator_withdraw_infos.map(item => DelegatorWithdrawInfo.fromObject(item));
                    }
                    if (data.previous_proposer != null) {
                        message.previous_proposer = data.previous_proposer;
                    }
                    if (data.outstanding_rewards != null) {
                        message.outstanding_rewards = data.outstanding_rewards.map(item => ValidatorOutstandingRewardsRecord.fromObject(item));
                    }
                    if (data.validator_accumulated_commissions != null) {
                        message.validator_accumulated_commissions = data.validator_accumulated_commissions.map(item => ValidatorAccumulatedCommissionRecord.fromObject(item));
                    }
                    if (data.validator_historical_rewards != null) {
                        message.validator_historical_rewards = data.validator_historical_rewards.map(item => ValidatorHistoricalRewardsRecord.fromObject(item));
                    }
                    if (data.validator_current_rewards != null) {
                        message.validator_current_rewards = data.validator_current_rewards.map(item => ValidatorCurrentRewardsRecord.fromObject(item));
                    }
                    if (data.delegator_starting_infos != null) {
                        message.delegator_starting_infos = data.delegator_starting_infos.map(item => DelegatorStartingInfoRecord.fromObject(item));
                    }
                    if (data.validator_slash_events != null) {
                        message.validator_slash_events = data.validator_slash_events.map(item => ValidatorSlashEventRecord.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.params != null) {
                        data.params = this.params.toObject();
                    }
                    if (this.fee_pool != null) {
                        data.fee_pool = this.fee_pool.toObject();
                    }
                    if (this.delegator_withdraw_infos != null) {
                        data.delegator_withdraw_infos = this.delegator_withdraw_infos.map((item) => item.toObject());
                    }
                    if (this.previous_proposer != null) {
                        data.previous_proposer = this.previous_proposer;
                    }
                    if (this.outstanding_rewards != null) {
                        data.outstanding_rewards = this.outstanding_rewards.map((item) => item.toObject());
                    }
                    if (this.validator_accumulated_commissions != null) {
                        data.validator_accumulated_commissions = this.validator_accumulated_commissions.map((item) => item.toObject());
                    }
                    if (this.validator_historical_rewards != null) {
                        data.validator_historical_rewards = this.validator_historical_rewards.map((item) => item.toObject());
                    }
                    if (this.validator_current_rewards != null) {
                        data.validator_current_rewards = this.validator_current_rewards.map((item) => item.toObject());
                    }
                    if (this.delegator_starting_infos != null) {
                        data.delegator_starting_infos = this.delegator_starting_infos.map((item) => item.toObject());
                    }
                    if (this.validator_slash_events != null) {
                        data.validator_slash_events = this.validator_slash_events.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.params !== undefined)
                        writer.writeMessage(1, this.params, () => this.params.serialize(writer));
                    if (this.fee_pool !== undefined)
                        writer.writeMessage(2, this.fee_pool, () => this.fee_pool.serialize(writer));
                    if (this.delegator_withdraw_infos !== undefined)
                        writer.writeRepeatedMessage(3, this.delegator_withdraw_infos, (item) => item.serialize(writer));
                    if (typeof this.previous_proposer === "string" && this.previous_proposer.length)
                        writer.writeString(4, this.previous_proposer);
                    if (this.outstanding_rewards !== undefined)
                        writer.writeRepeatedMessage(5, this.outstanding_rewards, (item) => item.serialize(writer));
                    if (this.validator_accumulated_commissions !== undefined)
                        writer.writeRepeatedMessage(6, this.validator_accumulated_commissions, (item) => item.serialize(writer));
                    if (this.validator_historical_rewards !== undefined)
                        writer.writeRepeatedMessage(7, this.validator_historical_rewards, (item) => item.serialize(writer));
                    if (this.validator_current_rewards !== undefined)
                        writer.writeRepeatedMessage(8, this.validator_current_rewards, (item) => item.serialize(writer));
                    if (this.delegator_starting_infos !== undefined)
                        writer.writeRepeatedMessage(9, this.delegator_starting_infos, (item) => item.serialize(writer));
                    if (this.validator_slash_events !== undefined)
                        writer.writeRepeatedMessage(10, this.validator_slash_events, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GenesisState();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.params, () => message.params = dependency_3.cosmos.distribution.v1beta1.Params.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.fee_pool, () => message.fee_pool = dependency_3.cosmos.distribution.v1beta1.FeePool.deserialize(reader));
                                break;
                            case 3:
                                reader.readMessage(message.delegator_withdraw_infos, () => pb_1.Message.addToRepeatedWrapperField(message, 3, DelegatorWithdrawInfo.deserialize(reader), DelegatorWithdrawInfo));
                                break;
                            case 4:
                                message.previous_proposer = reader.readString();
                                break;
                            case 5:
                                reader.readMessage(message.outstanding_rewards, () => pb_1.Message.addToRepeatedWrapperField(message, 5, ValidatorOutstandingRewardsRecord.deserialize(reader), ValidatorOutstandingRewardsRecord));
                                break;
                            case 6:
                                reader.readMessage(message.validator_accumulated_commissions, () => pb_1.Message.addToRepeatedWrapperField(message, 6, ValidatorAccumulatedCommissionRecord.deserialize(reader), ValidatorAccumulatedCommissionRecord));
                                break;
                            case 7:
                                reader.readMessage(message.validator_historical_rewards, () => pb_1.Message.addToRepeatedWrapperField(message, 7, ValidatorHistoricalRewardsRecord.deserialize(reader), ValidatorHistoricalRewardsRecord));
                                break;
                            case 8:
                                reader.readMessage(message.validator_current_rewards, () => pb_1.Message.addToRepeatedWrapperField(message, 8, ValidatorCurrentRewardsRecord.deserialize(reader), ValidatorCurrentRewardsRecord));
                                break;
                            case 9:
                                reader.readMessage(message.delegator_starting_infos, () => pb_1.Message.addToRepeatedWrapperField(message, 9, DelegatorStartingInfoRecord.deserialize(reader), DelegatorStartingInfoRecord));
                                break;
                            case 10:
                                reader.readMessage(message.validator_slash_events, () => pb_1.Message.addToRepeatedWrapperField(message, 10, ValidatorSlashEventRecord.deserialize(reader), ValidatorSlashEventRecord));
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
                    return GenesisState.deserialize(bytes);
                }
            }
            v1beta1.GenesisState = GenesisState;
        })(v1beta1 = distribution.v1beta1 || (distribution.v1beta1 = {}));
    })(distribution = cosmos.distribution || (cosmos.distribution = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=genesis.js.map