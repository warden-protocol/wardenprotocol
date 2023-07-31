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
const dependency_3 = __importStar(require("./../../../cosmos/base/v1beta1/coin"));
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var erc20;
    (function (erc20) {
        var v1;
        (function (v1) {
            class MsgConvertCoin extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("coin" in data && data.coin != undefined) {
                            this.coin = data.coin;
                        }
                        if ("receiver" in data && data.receiver != undefined) {
                            this.receiver = data.receiver;
                        }
                        if ("sender" in data && data.sender != undefined) {
                            this.sender = data.sender;
                        }
                    }
                }
                get coin() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.base.v1beta1.Coin, 1);
                }
                set coin(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get receiver() {
                    return pb_1.Message.getField(this, 2);
                }
                set receiver(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get sender() {
                    return pb_1.Message.getField(this, 3);
                }
                set sender(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new MsgConvertCoin({});
                    if (data.coin != null) {
                        message.coin = dependency_3.cosmos.base.v1beta1.Coin.fromObject(data.coin);
                    }
                    if (data.receiver != null) {
                        message.receiver = data.receiver;
                    }
                    if (data.sender != null) {
                        message.sender = data.sender;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.coin != null) {
                        data.coin = this.coin.toObject();
                    }
                    if (this.receiver != null) {
                        data.receiver = this.receiver;
                    }
                    if (this.sender != null) {
                        data.sender = this.sender;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.coin !== undefined)
                        writer.writeMessage(1, this.coin, () => this.coin.serialize(writer));
                    if (typeof this.receiver === "string" && this.receiver.length)
                        writer.writeString(2, this.receiver);
                    if (typeof this.sender === "string" && this.sender.length)
                        writer.writeString(3, this.sender);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConvertCoin();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.coin, () => message.coin = dependency_3.cosmos.base.v1beta1.Coin.deserialize(reader));
                                break;
                            case 2:
                                message.receiver = reader.readString();
                                break;
                            case 3:
                                message.sender = reader.readString();
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
                    return MsgConvertCoin.deserialize(bytes);
                }
            }
            v1.MsgConvertCoin = MsgConvertCoin;
            class MsgConvertCoinResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") { }
                }
                static fromObject(data) {
                    const message = new MsgConvertCoinResponse({});
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConvertCoinResponse();
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
                    return MsgConvertCoinResponse.deserialize(bytes);
                }
            }
            v1.MsgConvertCoinResponse = MsgConvertCoinResponse;
            class MsgConvertERC20 extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("contract_address" in data && data.contract_address != undefined) {
                            this.contract_address = data.contract_address;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                        if ("receiver" in data && data.receiver != undefined) {
                            this.receiver = data.receiver;
                        }
                        if ("sender" in data && data.sender != undefined) {
                            this.sender = data.sender;
                        }
                    }
                }
                get contract_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set contract_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get amount() {
                    return pb_1.Message.getField(this, 2);
                }
                set amount(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get receiver() {
                    return pb_1.Message.getField(this, 3);
                }
                set receiver(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get sender() {
                    return pb_1.Message.getField(this, 4);
                }
                set sender(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new MsgConvertERC20({});
                    if (data.contract_address != null) {
                        message.contract_address = data.contract_address;
                    }
                    if (data.amount != null) {
                        message.amount = data.amount;
                    }
                    if (data.receiver != null) {
                        message.receiver = data.receiver;
                    }
                    if (data.sender != null) {
                        message.sender = data.sender;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.contract_address != null) {
                        data.contract_address = this.contract_address;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount;
                    }
                    if (this.receiver != null) {
                        data.receiver = this.receiver;
                    }
                    if (this.sender != null) {
                        data.sender = this.sender;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.contract_address === "string" && this.contract_address.length)
                        writer.writeString(1, this.contract_address);
                    if (typeof this.amount === "string" && this.amount.length)
                        writer.writeString(2, this.amount);
                    if (typeof this.receiver === "string" && this.receiver.length)
                        writer.writeString(3, this.receiver);
                    if (typeof this.sender === "string" && this.sender.length)
                        writer.writeString(4, this.sender);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConvertERC20();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.contract_address = reader.readString();
                                break;
                            case 2:
                                message.amount = reader.readString();
                                break;
                            case 3:
                                message.receiver = reader.readString();
                                break;
                            case 4:
                                message.sender = reader.readString();
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
                    return MsgConvertERC20.deserialize(bytes);
                }
            }
            v1.MsgConvertERC20 = MsgConvertERC20;
            class MsgConvertERC20Response extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") { }
                }
                static fromObject(data) {
                    const message = new MsgConvertERC20Response({});
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConvertERC20Response();
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
                    return MsgConvertERC20Response.deserialize(bytes);
                }
            }
            v1.MsgConvertERC20Response = MsgConvertERC20Response;
        })(v1 = erc20.v1 || (erc20.v1 = {}));
    })(erc20 = evmos.erc20 || (evmos.erc20 = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=tx.js.map