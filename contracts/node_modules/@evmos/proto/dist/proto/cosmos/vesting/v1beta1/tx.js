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
    var vesting;
    (function (vesting) {
        var v1beta1;
        (function (v1beta1) {
            class MsgCreateVestingAccount extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("from_address" in data && data.from_address != undefined) {
                            this.from_address = data.from_address;
                        }
                        if ("to_address" in data && data.to_address != undefined) {
                            this.to_address = data.to_address;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                        if ("end_time" in data && data.end_time != undefined) {
                            this.end_time = data.end_time;
                        }
                        if ("delayed" in data && data.delayed != undefined) {
                            this.delayed = data.delayed;
                        }
                    }
                }
                get from_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set from_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get to_address() {
                    return pb_1.Message.getField(this, 2);
                }
                set to_address(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get amount() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.Coin, 3);
                }
                set amount(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                get end_time() {
                    return pb_1.Message.getField(this, 4);
                }
                set end_time(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get delayed() {
                    return pb_1.Message.getField(this, 5);
                }
                set delayed(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new MsgCreateVestingAccount({});
                    if (data.from_address != null) {
                        message.from_address = data.from_address;
                    }
                    if (data.to_address != null) {
                        message.to_address = data.to_address;
                    }
                    if (data.amount != null) {
                        message.amount = data.amount.map(item => dependency_2.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.end_time != null) {
                        message.end_time = data.end_time;
                    }
                    if (data.delayed != null) {
                        message.delayed = data.delayed;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.from_address != null) {
                        data.from_address = this.from_address;
                    }
                    if (this.to_address != null) {
                        data.to_address = this.to_address;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount.map((item) => item.toObject());
                    }
                    if (this.end_time != null) {
                        data.end_time = this.end_time;
                    }
                    if (this.delayed != null) {
                        data.delayed = this.delayed;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.from_address === "string" && this.from_address.length)
                        writer.writeString(1, this.from_address);
                    if (typeof this.to_address === "string" && this.to_address.length)
                        writer.writeString(2, this.to_address);
                    if (this.amount !== undefined)
                        writer.writeRepeatedMessage(3, this.amount, (item) => item.serialize(writer));
                    if (this.end_time !== undefined)
                        writer.writeInt64(4, this.end_time);
                    if (this.delayed !== undefined)
                        writer.writeBool(5, this.delayed);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgCreateVestingAccount();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.from_address = reader.readString();
                                break;
                            case 2:
                                message.to_address = reader.readString();
                                break;
                            case 3:
                                reader.readMessage(message.amount, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_2.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_2.cosmos.base.v1beta1.Coin));
                                break;
                            case 4:
                                message.end_time = reader.readInt64();
                                break;
                            case 5:
                                message.delayed = reader.readBool();
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
                    return MsgCreateVestingAccount.deserialize(bytes);
                }
            }
            v1beta1.MsgCreateVestingAccount = MsgCreateVestingAccount;
            class MsgCreateVestingAccountResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") { }
                }
                static fromObject(data) {
                    const message = new MsgCreateVestingAccountResponse({});
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgCreateVestingAccountResponse();
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
                    return MsgCreateVestingAccountResponse.deserialize(bytes);
                }
            }
            v1beta1.MsgCreateVestingAccountResponse = MsgCreateVestingAccountResponse;
        })(v1beta1 = vesting.v1beta1 || (vesting.v1beta1 = {}));
    })(vesting = cosmos.vesting || (cosmos.vesting = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=tx.js.map