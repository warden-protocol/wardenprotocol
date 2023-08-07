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
exports.evmos = void 0;
const dependency_2 = __importStar(require("./../../../cosmos/vesting/v1beta1/vesting"));
const dependency_3 = __importStar(require("./../../../google/protobuf/timestamp"));
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var vesting;
    (function (vesting) {
        var v1;
        (function (v1) {
            class ClawbackVestingAccount extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4, 5], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("base_vesting_account" in data && data.base_vesting_account != undefined) {
                            this.base_vesting_account = data.base_vesting_account;
                        }
                        if ("funder_address" in data && data.funder_address != undefined) {
                            this.funder_address = data.funder_address;
                        }
                        if ("start_time" in data && data.start_time != undefined) {
                            this.start_time = data.start_time;
                        }
                        if ("lockup_periods" in data && data.lockup_periods != undefined) {
                            this.lockup_periods = data.lockup_periods;
                        }
                        if ("vesting_periods" in data && data.vesting_periods != undefined) {
                            this.vesting_periods = data.vesting_periods;
                        }
                    }
                }
                get base_vesting_account() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.vesting.v1beta1.BaseVestingAccount, 1);
                }
                set base_vesting_account(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get funder_address() {
                    return pb_1.Message.getField(this, 2);
                }
                set funder_address(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get start_time() {
                    return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Timestamp, 3);
                }
                set start_time(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                get lockup_periods() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.vesting.v1beta1.Period, 4);
                }
                set lockup_periods(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 4, value);
                }
                get vesting_periods() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.vesting.v1beta1.Period, 5);
                }
                set vesting_periods(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new ClawbackVestingAccount({});
                    if (data.base_vesting_account != null) {
                        message.base_vesting_account = dependency_2.cosmos.vesting.v1beta1.BaseVestingAccount.fromObject(data.base_vesting_account);
                    }
                    if (data.funder_address != null) {
                        message.funder_address = data.funder_address;
                    }
                    if (data.start_time != null) {
                        message.start_time = dependency_3.google.protobuf.Timestamp.fromObject(data.start_time);
                    }
                    if (data.lockup_periods != null) {
                        message.lockup_periods = data.lockup_periods.map(item => dependency_2.cosmos.vesting.v1beta1.Period.fromObject(item));
                    }
                    if (data.vesting_periods != null) {
                        message.vesting_periods = data.vesting_periods.map(item => dependency_2.cosmos.vesting.v1beta1.Period.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.base_vesting_account != null) {
                        data.base_vesting_account = this.base_vesting_account.toObject();
                    }
                    if (this.funder_address != null) {
                        data.funder_address = this.funder_address;
                    }
                    if (this.start_time != null) {
                        data.start_time = this.start_time.toObject();
                    }
                    if (this.lockup_periods != null) {
                        data.lockup_periods = this.lockup_periods.map((item) => item.toObject());
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
                    if (typeof this.funder_address === "string" && this.funder_address.length)
                        writer.writeString(2, this.funder_address);
                    if (this.start_time !== undefined)
                        writer.writeMessage(3, this.start_time, () => this.start_time.serialize(writer));
                    if (this.lockup_periods !== undefined)
                        writer.writeRepeatedMessage(4, this.lockup_periods, (item) => item.serialize(writer));
                    if (this.vesting_periods !== undefined)
                        writer.writeRepeatedMessage(5, this.vesting_periods, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ClawbackVestingAccount();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.base_vesting_account, () => message.base_vesting_account = dependency_2.cosmos.vesting.v1beta1.BaseVestingAccount.deserialize(reader));
                                break;
                            case 2:
                                message.funder_address = reader.readString();
                                break;
                            case 3:
                                reader.readMessage(message.start_time, () => message.start_time = dependency_3.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 4:
                                reader.readMessage(message.lockup_periods, () => pb_1.Message.addToRepeatedWrapperField(message, 4, dependency_2.cosmos.vesting.v1beta1.Period.deserialize(reader), dependency_2.cosmos.vesting.v1beta1.Period));
                                break;
                            case 5:
                                reader.readMessage(message.vesting_periods, () => pb_1.Message.addToRepeatedWrapperField(message, 5, dependency_2.cosmos.vesting.v1beta1.Period.deserialize(reader), dependency_2.cosmos.vesting.v1beta1.Period));
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
                    return ClawbackVestingAccount.deserialize(bytes);
                }
            }
            v1.ClawbackVestingAccount = ClawbackVestingAccount;
        })(v1 = vesting.v1 || (vesting.v1 = {}));
    })(vesting = evmos.vesting || (evmos.vesting = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=vesting.js.map