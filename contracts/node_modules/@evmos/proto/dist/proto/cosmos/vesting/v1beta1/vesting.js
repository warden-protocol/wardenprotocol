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
const dependency_3 = __importStar(require("./../../auth/v1beta1/auth"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var vesting;
    (function (vesting) {
        var v1beta1;
        (function (v1beta1) {
            class BaseVestingAccount extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2, 3, 4], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("base_account" in data && data.base_account != undefined) {
                            this.base_account = data.base_account;
                        }
                        if ("original_vesting" in data && data.original_vesting != undefined) {
                            this.original_vesting = data.original_vesting;
                        }
                        if ("delegated_free" in data && data.delegated_free != undefined) {
                            this.delegated_free = data.delegated_free;
                        }
                        if ("delegated_vesting" in data && data.delegated_vesting != undefined) {
                            this.delegated_vesting = data.delegated_vesting;
                        }
                        if ("end_time" in data && data.end_time != undefined) {
                            this.end_time = data.end_time;
                        }
                    }
                }
                get base_account() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.auth.v1beta1.BaseAccount, 1);
                }
                set base_account(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get original_vesting() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.Coin, 2);
                }
                set original_vesting(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                get delegated_free() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.Coin, 3);
                }
                set delegated_free(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                get delegated_vesting() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.Coin, 4);
                }
                set delegated_vesting(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 4, value);
                }
                get end_time() {
                    return pb_1.Message.getField(this, 5);
                }
                set end_time(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new BaseVestingAccount({});
                    if (data.base_account != null) {
                        message.base_account = dependency_3.cosmos.auth.v1beta1.BaseAccount.fromObject(data.base_account);
                    }
                    if (data.original_vesting != null) {
                        message.original_vesting = data.original_vesting.map(item => dependency_2.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.delegated_free != null) {
                        message.delegated_free = data.delegated_free.map(item => dependency_2.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.delegated_vesting != null) {
                        message.delegated_vesting = data.delegated_vesting.map(item => dependency_2.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.end_time != null) {
                        message.end_time = data.end_time;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.base_account != null) {
                        data.base_account = this.base_account.toObject();
                    }
                    if (this.original_vesting != null) {
                        data.original_vesting = this.original_vesting.map((item) => item.toObject());
                    }
                    if (this.delegated_free != null) {
                        data.delegated_free = this.delegated_free.map((item) => item.toObject());
                    }
                    if (this.delegated_vesting != null) {
                        data.delegated_vesting = this.delegated_vesting.map((item) => item.toObject());
                    }
                    if (this.end_time != null) {
                        data.end_time = this.end_time;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.base_account !== undefined)
                        writer.writeMessage(1, this.base_account, () => this.base_account.serialize(writer));
                    if (this.original_vesting !== undefined)
                        writer.writeRepeatedMessage(2, this.original_vesting, (item) => item.serialize(writer));
                    if (this.delegated_free !== undefined)
                        writer.writeRepeatedMessage(3, this.delegated_free, (item) => item.serialize(writer));
                    if (this.delegated_vesting !== undefined)
                        writer.writeRepeatedMessage(4, this.delegated_vesting, (item) => item.serialize(writer));
                    if (this.end_time !== undefined)
                        writer.writeInt64(5, this.end_time);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BaseVestingAccount();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.base_account, () => message.base_account = dependency_3.cosmos.auth.v1beta1.BaseAccount.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.original_vesting, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_2.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_2.cosmos.base.v1beta1.Coin));
                                break;
                            case 3:
                                reader.readMessage(message.delegated_free, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_2.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_2.cosmos.base.v1beta1.Coin));
                                break;
                            case 4:
                                reader.readMessage(message.delegated_vesting, () => pb_1.Message.addToRepeatedWrapperField(message, 4, dependency_2.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_2.cosmos.base.v1beta1.Coin));
                                break;
                            case 5:
                                message.end_time = reader.readInt64();
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
                    return BaseVestingAccount.deserialize(bytes);
                }
            }
            v1beta1.BaseVestingAccount = BaseVestingAccount;
            class ContinuousVestingAccount extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("base_vesting_account" in data && data.base_vesting_account != undefined) {
                            this.base_vesting_account = data.base_vesting_account;
                        }
                        if ("start_time" in data && data.start_time != undefined) {
                            this.start_time = data.start_time;
                        }
                    }
                }
                get base_vesting_account() {
                    return pb_1.Message.getWrapperField(this, BaseVestingAccount, 1);
                }
                set base_vesting_account(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get start_time() {
                    return pb_1.Message.getField(this, 2);
                }
                set start_time(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new ContinuousVestingAccount({});
                    if (data.base_vesting_account != null) {
                        message.base_vesting_account = BaseVestingAccount.fromObject(data.base_vesting_account);
                    }
                    if (data.start_time != null) {
                        message.start_time = data.start_time;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.base_vesting_account != null) {
                        data.base_vesting_account = this.base_vesting_account.toObject();
                    }
                    if (this.start_time != null) {
                        data.start_time = this.start_time;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.base_vesting_account !== undefined)
                        writer.writeMessage(1, this.base_vesting_account, () => this.base_vesting_account.serialize(writer));
                    if (this.start_time !== undefined)
                        writer.writeInt64(2, this.start_time);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ContinuousVestingAccount();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.base_vesting_account, () => message.base_vesting_account = BaseVestingAccount.deserialize(reader));
                                break;
                            case 2:
                                message.start_time = reader.readInt64();
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
                    return ContinuousVestingAccount.deserialize(bytes);
                }
            }
            v1beta1.ContinuousVestingAccount = ContinuousVestingAccount;
            class DelayedVestingAccount extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("base_vesting_account" in data && data.base_vesting_account != undefined) {
                            this.base_vesting_account = data.base_vesting_account;
                        }
                    }
                }
                get base_vesting_account() {
                    return pb_1.Message.getWrapperField(this, BaseVestingAccount, 1);
                }
                set base_vesting_account(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new DelayedVestingAccount({});
                    if (data.base_vesting_account != null) {
                        message.base_vesting_account = BaseVestingAccount.fromObject(data.base_vesting_account);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.base_vesting_account != null) {
                        data.base_vesting_account = this.base_vesting_account.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.base_vesting_account !== undefined)
                        writer.writeMessage(1, this.base_vesting_account, () => this.base_vesting_account.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DelayedVestingAccount();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.base_vesting_account, () => message.base_vesting_account = BaseVestingAccount.deserialize(reader));
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
                    return DelayedVestingAccount.deserialize(bytes);
                }
            }
            v1beta1.DelayedVestingAccount = DelayedVestingAccount;
            class Period extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("length" in data && data.length != undefined) {
                            this.length = data.length;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                    }
                }
                get length() {
                    return pb_1.Message.getField(this, 1);
                }
                set length(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get amount() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.Coin, 2);
                }
                set amount(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Period({});
                    if (data.length != null) {
                        message.length = data.length;
                    }
                    if (data.amount != null) {
                        message.amount = data.amount.map(item => dependency_2.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.length != null) {
                        data.length = this.length;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.length !== undefined)
                        writer.writeInt64(1, this.length);
                    if (this.amount !== undefined)
                        writer.writeRepeatedMessage(2, this.amount, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Period();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.length = reader.readInt64();
                                break;
                            case 2:
                                reader.readMessage(message.amount, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_2.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_2.cosmos.base.v1beta1.Coin));
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
                    return Period.deserialize(bytes);
                }
            }
            v1beta1.Period = Period;
            class PeriodicVestingAccount extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("base_vesting_account" in data && data.base_vesting_account != undefined) {
                            this.base_vesting_account = data.base_vesting_account;
                        }
                        if ("start_time" in data && data.start_time != undefined) {
                            this.start_time = data.start_time;
                        }
                        if ("vesting_periods" in data && data.vesting_periods != undefined) {
                            this.vesting_periods = data.vesting_periods;
                        }
                    }
                }
                get base_vesting_account() {
                    return pb_1.Message.getWrapperField(this, BaseVestingAccount, 1);
                }
                set base_vesting_account(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get start_time() {
                    return pb_1.Message.getField(this, 2);
                }
                set start_time(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get vesting_periods() {
                    return pb_1.Message.getRepeatedWrapperField(this, Period, 3);
                }
                set vesting_periods(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new PeriodicVestingAccount({});
                    if (data.base_vesting_account != null) {
                        message.base_vesting_account = BaseVestingAccount.fromObject(data.base_vesting_account);
                    }
                    if (data.start_time != null) {
                        message.start_time = data.start_time;
                    }
                    if (data.vesting_periods != null) {
                        message.vesting_periods = data.vesting_periods.map(item => Period.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.base_vesting_account != null) {
                        data.base_vesting_account = this.base_vesting_account.toObject();
                    }
                    if (this.start_time != null) {
                        data.start_time = this.start_time;
                    }
                    if (this.vesting_periods != null) {
                        data.vesting_periods = this.vesting_periods.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.base_vesting_account !== undefined)
                        writer.writeMessage(1, this.base_vesting_account, () => this.base_vesting_account.serialize(writer));
                    if (this.start_time !== undefined)
                        writer.writeInt64(2, this.start_time);
                    if (this.vesting_periods !== undefined)
                        writer.writeRepeatedMessage(3, this.vesting_periods, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PeriodicVestingAccount();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.base_vesting_account, () => message.base_vesting_account = BaseVestingAccount.deserialize(reader));
                                break;
                            case 2:
                                message.start_time = reader.readInt64();
                                break;
                            case 3:
                                reader.readMessage(message.vesting_periods, () => pb_1.Message.addToRepeatedWrapperField(message, 3, Period.deserialize(reader), Period));
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
                    return PeriodicVestingAccount.deserialize(bytes);
                }
            }
            v1beta1.PeriodicVestingAccount = PeriodicVestingAccount;
            class PermanentLockedAccount extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("base_vesting_account" in data && data.base_vesting_account != undefined) {
                            this.base_vesting_account = data.base_vesting_account;
                        }
                    }
                }
                get base_vesting_account() {
                    return pb_1.Message.getWrapperField(this, BaseVestingAccount, 1);
                }
                set base_vesting_account(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new PermanentLockedAccount({});
                    if (data.base_vesting_account != null) {
                        message.base_vesting_account = BaseVestingAccount.fromObject(data.base_vesting_account);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.base_vesting_account != null) {
                        data.base_vesting_account = this.base_vesting_account.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.base_vesting_account !== undefined)
                        writer.writeMessage(1, this.base_vesting_account, () => this.base_vesting_account.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PermanentLockedAccount();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.base_vesting_account, () => message.base_vesting_account = BaseVestingAccount.deserialize(reader));
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
                    return PermanentLockedAccount.deserialize(bytes);
                }
            }
            v1beta1.PermanentLockedAccount = PermanentLockedAccount;
        })(v1beta1 = vesting.v1beta1 || (vesting.v1beta1 = {}));
    })(vesting = cosmos.vesting || (cosmos.vesting = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=vesting.js.map