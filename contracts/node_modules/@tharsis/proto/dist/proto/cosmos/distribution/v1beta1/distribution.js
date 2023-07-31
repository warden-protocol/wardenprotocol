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
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var distribution;
    (function (distribution) {
        var v1beta1;
        (function (v1beta1) {
            class Params extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("community_tax" in data && data.community_tax != undefined) {
                            this.community_tax = data.community_tax;
                        }
                        if ("base_proposer_reward" in data && data.base_proposer_reward != undefined) {
                            this.base_proposer_reward = data.base_proposer_reward;
                        }
                        if ("bonus_proposer_reward" in data && data.bonus_proposer_reward != undefined) {
                            this.bonus_proposer_reward = data.bonus_proposer_reward;
                        }
                        if ("withdraw_addr_enabled" in data && data.withdraw_addr_enabled != undefined) {
                            this.withdraw_addr_enabled = data.withdraw_addr_enabled;
                        }
                    }
                }
                get community_tax() {
                    return pb_1.Message.getField(this, 1);
                }
                set community_tax(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get base_proposer_reward() {
                    return pb_1.Message.getField(this, 2);
                }
                set base_proposer_reward(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get bonus_proposer_reward() {
                    return pb_1.Message.getField(this, 3);
                }
                set bonus_proposer_reward(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get withdraw_addr_enabled() {
                    return pb_1.Message.getField(this, 4);
                }
                set withdraw_addr_enabled(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.community_tax != null) {
                        message.community_tax = data.community_tax;
                    }
                    if (data.base_proposer_reward != null) {
                        message.base_proposer_reward = data.base_proposer_reward;
                    }
                    if (data.bonus_proposer_reward != null) {
                        message.bonus_proposer_reward = data.bonus_proposer_reward;
                    }
                    if (data.withdraw_addr_enabled != null) {
                        message.withdraw_addr_enabled = data.withdraw_addr_enabled;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.community_tax != null) {
                        data.community_tax = this.community_tax;
                    }
                    if (this.base_proposer_reward != null) {
                        data.base_proposer_reward = this.base_proposer_reward;
                    }
                    if (this.bonus_proposer_reward != null) {
                        data.bonus_proposer_reward = this.bonus_proposer_reward;
                    }
                    if (this.withdraw_addr_enabled != null) {
                        data.withdraw_addr_enabled = this.withdraw_addr_enabled;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.community_tax === "string" && this.community_tax.length)
                        writer.writeString(1, this.community_tax);
                    if (typeof this.base_proposer_reward === "string" && this.base_proposer_reward.length)
                        writer.writeString(2, this.base_proposer_reward);
                    if (typeof this.bonus_proposer_reward === "string" && this.bonus_proposer_reward.length)
                        writer.writeString(3, this.bonus_proposer_reward);
                    if (this.withdraw_addr_enabled !== undefined)
                        writer.writeBool(4, this.withdraw_addr_enabled);
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
                                message.community_tax = reader.readString();
                                break;
                            case 2:
                                message.base_proposer_reward = reader.readString();
                                break;
                            case 3:
                                message.bonus_proposer_reward = reader.readString();
                                break;
                            case 4:
                                message.withdraw_addr_enabled = reader.readBool();
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
            class ValidatorHistoricalRewards extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("cumulative_reward_ratio" in data && data.cumulative_reward_ratio != undefined) {
                            this.cumulative_reward_ratio = data.cumulative_reward_ratio;
                        }
                        if ("reference_count" in data && data.reference_count != undefined) {
                            this.reference_count = data.reference_count;
                        }
                    }
                }
                get cumulative_reward_ratio() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.DecCoin, 1);
                }
                set cumulative_reward_ratio(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get reference_count() {
                    return pb_1.Message.getField(this, 2);
                }
                set reference_count(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new ValidatorHistoricalRewards({});
                    if (data.cumulative_reward_ratio != null) {
                        message.cumulative_reward_ratio = data.cumulative_reward_ratio.map(item => dependency_2.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    if (data.reference_count != null) {
                        message.reference_count = data.reference_count;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.cumulative_reward_ratio != null) {
                        data.cumulative_reward_ratio = this.cumulative_reward_ratio.map((item) => item.toObject());
                    }
                    if (this.reference_count != null) {
                        data.reference_count = this.reference_count;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.cumulative_reward_ratio !== undefined)
                        writer.writeRepeatedMessage(1, this.cumulative_reward_ratio, (item) => item.serialize(writer));
                    if (this.reference_count !== undefined)
                        writer.writeUint32(2, this.reference_count);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorHistoricalRewards();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.cumulative_reward_ratio, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_2.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_2.cosmos.base.v1beta1.DecCoin));
                                break;
                            case 2:
                                message.reference_count = reader.readUint32();
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
                    return ValidatorHistoricalRewards.deserialize(bytes);
                }
            }
            v1beta1.ValidatorHistoricalRewards = ValidatorHistoricalRewards;
            class ValidatorCurrentRewards extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("rewards" in data && data.rewards != undefined) {
                            this.rewards = data.rewards;
                        }
                        if ("period" in data && data.period != undefined) {
                            this.period = data.period;
                        }
                    }
                }
                get rewards() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.DecCoin, 1);
                }
                set rewards(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get period() {
                    return pb_1.Message.getField(this, 2);
                }
                set period(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new ValidatorCurrentRewards({});
                    if (data.rewards != null) {
                        message.rewards = data.rewards.map(item => dependency_2.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    if (data.period != null) {
                        message.period = data.period;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.rewards != null) {
                        data.rewards = this.rewards.map((item) => item.toObject());
                    }
                    if (this.period != null) {
                        data.period = this.period;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.rewards !== undefined)
                        writer.writeRepeatedMessage(1, this.rewards, (item) => item.serialize(writer));
                    if (this.period !== undefined)
                        writer.writeUint64(2, this.period);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorCurrentRewards();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.rewards, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_2.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_2.cosmos.base.v1beta1.DecCoin));
                                break;
                            case 2:
                                message.period = reader.readUint64();
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
                    return ValidatorCurrentRewards.deserialize(bytes);
                }
            }
            v1beta1.ValidatorCurrentRewards = ValidatorCurrentRewards;
            class ValidatorAccumulatedCommission extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("commission" in data && data.commission != undefined) {
                            this.commission = data.commission;
                        }
                    }
                }
                get commission() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.DecCoin, 1);
                }
                set commission(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new ValidatorAccumulatedCommission({});
                    if (data.commission != null) {
                        message.commission = data.commission.map(item => dependency_2.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.commission != null) {
                        data.commission = this.commission.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.commission !== undefined)
                        writer.writeRepeatedMessage(1, this.commission, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorAccumulatedCommission();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.commission, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_2.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_2.cosmos.base.v1beta1.DecCoin));
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
                    return ValidatorAccumulatedCommission.deserialize(bytes);
                }
            }
            v1beta1.ValidatorAccumulatedCommission = ValidatorAccumulatedCommission;
            class ValidatorOutstandingRewards extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("rewards" in data && data.rewards != undefined) {
                            this.rewards = data.rewards;
                        }
                    }
                }
                get rewards() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.DecCoin, 1);
                }
                set rewards(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new ValidatorOutstandingRewards({});
                    if (data.rewards != null) {
                        message.rewards = data.rewards.map(item => dependency_2.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.rewards != null) {
                        data.rewards = this.rewards.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.rewards !== undefined)
                        writer.writeRepeatedMessage(1, this.rewards, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorOutstandingRewards();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.rewards, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_2.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_2.cosmos.base.v1beta1.DecCoin));
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
                    return ValidatorOutstandingRewards.deserialize(bytes);
                }
            }
            v1beta1.ValidatorOutstandingRewards = ValidatorOutstandingRewards;
            class ValidatorSlashEvent extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_period" in data && data.validator_period != undefined) {
                            this.validator_period = data.validator_period;
                        }
                        if ("fraction" in data && data.fraction != undefined) {
                            this.fraction = data.fraction;
                        }
                    }
                }
                get validator_period() {
                    return pb_1.Message.getField(this, 1);
                }
                set validator_period(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get fraction() {
                    return pb_1.Message.getField(this, 2);
                }
                set fraction(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new ValidatorSlashEvent({});
                    if (data.validator_period != null) {
                        message.validator_period = data.validator_period;
                    }
                    if (data.fraction != null) {
                        message.fraction = data.fraction;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_period != null) {
                        data.validator_period = this.validator_period;
                    }
                    if (this.fraction != null) {
                        data.fraction = this.fraction;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.validator_period !== undefined)
                        writer.writeUint64(1, this.validator_period);
                    if (typeof this.fraction === "string" && this.fraction.length)
                        writer.writeString(2, this.fraction);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorSlashEvent();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.validator_period = reader.readUint64();
                                break;
                            case 2:
                                message.fraction = reader.readString();
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
                    return ValidatorSlashEvent.deserialize(bytes);
                }
            }
            v1beta1.ValidatorSlashEvent = ValidatorSlashEvent;
            class ValidatorSlashEvents extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_slash_events" in data && data.validator_slash_events != undefined) {
                            this.validator_slash_events = data.validator_slash_events;
                        }
                    }
                }
                get validator_slash_events() {
                    return pb_1.Message.getRepeatedWrapperField(this, ValidatorSlashEvent, 1);
                }
                set validator_slash_events(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new ValidatorSlashEvents({});
                    if (data.validator_slash_events != null) {
                        message.validator_slash_events = data.validator_slash_events.map(item => ValidatorSlashEvent.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_slash_events != null) {
                        data.validator_slash_events = this.validator_slash_events.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.validator_slash_events !== undefined)
                        writer.writeRepeatedMessage(1, this.validator_slash_events, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorSlashEvents();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.validator_slash_events, () => pb_1.Message.addToRepeatedWrapperField(message, 1, ValidatorSlashEvent.deserialize(reader), ValidatorSlashEvent));
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
                    return ValidatorSlashEvents.deserialize(bytes);
                }
            }
            v1beta1.ValidatorSlashEvents = ValidatorSlashEvents;
            class FeePool extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("community_pool" in data && data.community_pool != undefined) {
                            this.community_pool = data.community_pool;
                        }
                    }
                }
                get community_pool() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.DecCoin, 1);
                }
                set community_pool(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new FeePool({});
                    if (data.community_pool != null) {
                        message.community_pool = data.community_pool.map(item => dependency_2.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.community_pool != null) {
                        data.community_pool = this.community_pool.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.community_pool !== undefined)
                        writer.writeRepeatedMessage(1, this.community_pool, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FeePool();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.community_pool, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_2.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_2.cosmos.base.v1beta1.DecCoin));
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
                    return FeePool.deserialize(bytes);
                }
            }
            v1beta1.FeePool = FeePool;
            class CommunityPoolSpendProposal extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("title" in data && data.title != undefined) {
                            this.title = data.title;
                        }
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("recipient" in data && data.recipient != undefined) {
                            this.recipient = data.recipient;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                    }
                }
                get title() {
                    return pb_1.Message.getField(this, 1);
                }
                set title(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get description() {
                    return pb_1.Message.getField(this, 2);
                }
                set description(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get recipient() {
                    return pb_1.Message.getField(this, 3);
                }
                set recipient(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get amount() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.Coin, 4);
                }
                set amount(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new CommunityPoolSpendProposal({});
                    if (data.title != null) {
                        message.title = data.title;
                    }
                    if (data.description != null) {
                        message.description = data.description;
                    }
                    if (data.recipient != null) {
                        message.recipient = data.recipient;
                    }
                    if (data.amount != null) {
                        message.amount = data.amount.map(item => dependency_2.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.title != null) {
                        data.title = this.title;
                    }
                    if (this.description != null) {
                        data.description = this.description;
                    }
                    if (this.recipient != null) {
                        data.recipient = this.recipient;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.title === "string" && this.title.length)
                        writer.writeString(1, this.title);
                    if (typeof this.description === "string" && this.description.length)
                        writer.writeString(2, this.description);
                    if (typeof this.recipient === "string" && this.recipient.length)
                        writer.writeString(3, this.recipient);
                    if (this.amount !== undefined)
                        writer.writeRepeatedMessage(4, this.amount, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CommunityPoolSpendProposal();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.title = reader.readString();
                                break;
                            case 2:
                                message.description = reader.readString();
                                break;
                            case 3:
                                message.recipient = reader.readString();
                                break;
                            case 4:
                                reader.readMessage(message.amount, () => pb_1.Message.addToRepeatedWrapperField(message, 4, dependency_2.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_2.cosmos.base.v1beta1.Coin));
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
                    return CommunityPoolSpendProposal.deserialize(bytes);
                }
            }
            v1beta1.CommunityPoolSpendProposal = CommunityPoolSpendProposal;
            class DelegatorStartingInfo extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("previous_period" in data && data.previous_period != undefined) {
                            this.previous_period = data.previous_period;
                        }
                        if ("stake" in data && data.stake != undefined) {
                            this.stake = data.stake;
                        }
                        if ("height" in data && data.height != undefined) {
                            this.height = data.height;
                        }
                    }
                }
                get previous_period() {
                    return pb_1.Message.getField(this, 1);
                }
                set previous_period(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get stake() {
                    return pb_1.Message.getField(this, 2);
                }
                set stake(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get height() {
                    return pb_1.Message.getField(this, 3);
                }
                set height(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new DelegatorStartingInfo({});
                    if (data.previous_period != null) {
                        message.previous_period = data.previous_period;
                    }
                    if (data.stake != null) {
                        message.stake = data.stake;
                    }
                    if (data.height != null) {
                        message.height = data.height;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.previous_period != null) {
                        data.previous_period = this.previous_period;
                    }
                    if (this.stake != null) {
                        data.stake = this.stake;
                    }
                    if (this.height != null) {
                        data.height = this.height;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.previous_period !== undefined)
                        writer.writeUint64(1, this.previous_period);
                    if (typeof this.stake === "string" && this.stake.length)
                        writer.writeString(2, this.stake);
                    if (this.height !== undefined)
                        writer.writeUint64(3, this.height);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DelegatorStartingInfo();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.previous_period = reader.readUint64();
                                break;
                            case 2:
                                message.stake = reader.readString();
                                break;
                            case 3:
                                message.height = reader.readUint64();
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
                    return DelegatorStartingInfo.deserialize(bytes);
                }
            }
            v1beta1.DelegatorStartingInfo = DelegatorStartingInfo;
            class DelegationDelegatorReward extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("reward" in data && data.reward != undefined) {
                            this.reward = data.reward;
                        }
                    }
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get reward() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.DecCoin, 2);
                }
                set reward(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new DelegationDelegatorReward({});
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.reward != null) {
                        message.reward = data.reward.map(item => dependency_2.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.reward != null) {
                        data.reward = this.reward.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(1, this.validator_address);
                    if (this.reward !== undefined)
                        writer.writeRepeatedMessage(2, this.reward, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DelegationDelegatorReward();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.validator_address = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.reward, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_2.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_2.cosmos.base.v1beta1.DecCoin));
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
                    return DelegationDelegatorReward.deserialize(bytes);
                }
            }
            v1beta1.DelegationDelegatorReward = DelegationDelegatorReward;
            class CommunityPoolSpendProposalWithDeposit extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("title" in data && data.title != undefined) {
                            this.title = data.title;
                        }
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("recipient" in data && data.recipient != undefined) {
                            this.recipient = data.recipient;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                        if ("deposit" in data && data.deposit != undefined) {
                            this.deposit = data.deposit;
                        }
                    }
                }
                get title() {
                    return pb_1.Message.getField(this, 1);
                }
                set title(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get description() {
                    return pb_1.Message.getField(this, 2);
                }
                set description(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get recipient() {
                    return pb_1.Message.getField(this, 3);
                }
                set recipient(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get amount() {
                    return pb_1.Message.getField(this, 4);
                }
                set amount(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get deposit() {
                    return pb_1.Message.getField(this, 5);
                }
                set deposit(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new CommunityPoolSpendProposalWithDeposit({});
                    if (data.title != null) {
                        message.title = data.title;
                    }
                    if (data.description != null) {
                        message.description = data.description;
                    }
                    if (data.recipient != null) {
                        message.recipient = data.recipient;
                    }
                    if (data.amount != null) {
                        message.amount = data.amount;
                    }
                    if (data.deposit != null) {
                        message.deposit = data.deposit;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.title != null) {
                        data.title = this.title;
                    }
                    if (this.description != null) {
                        data.description = this.description;
                    }
                    if (this.recipient != null) {
                        data.recipient = this.recipient;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount;
                    }
                    if (this.deposit != null) {
                        data.deposit = this.deposit;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.title === "string" && this.title.length)
                        writer.writeString(1, this.title);
                    if (typeof this.description === "string" && this.description.length)
                        writer.writeString(2, this.description);
                    if (typeof this.recipient === "string" && this.recipient.length)
                        writer.writeString(3, this.recipient);
                    if (typeof this.amount === "string" && this.amount.length)
                        writer.writeString(4, this.amount);
                    if (typeof this.deposit === "string" && this.deposit.length)
                        writer.writeString(5, this.deposit);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CommunityPoolSpendProposalWithDeposit();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.title = reader.readString();
                                break;
                            case 2:
                                message.description = reader.readString();
                                break;
                            case 3:
                                message.recipient = reader.readString();
                                break;
                            case 4:
                                message.amount = reader.readString();
                                break;
                            case 5:
                                message.deposit = reader.readString();
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
                    return CommunityPoolSpendProposalWithDeposit.deserialize(bytes);
                }
            }
            v1beta1.CommunityPoolSpendProposalWithDeposit = CommunityPoolSpendProposalWithDeposit;
        })(v1beta1 = distribution.v1beta1 || (distribution.v1beta1 = {}));
    })(distribution = cosmos.distribution || (cosmos.distribution = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=distribution.js.map