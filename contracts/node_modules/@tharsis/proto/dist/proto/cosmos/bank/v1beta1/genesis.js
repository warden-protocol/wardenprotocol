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
const dependency_3 = __importStar(require("./bank"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var bank;
    (function (bank) {
        var v1beta1;
        (function (v1beta1) {
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2, 3, 4], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("params" in data && data.params != undefined) {
                            this.params = data.params;
                        }
                        if ("balances" in data && data.balances != undefined) {
                            this.balances = data.balances;
                        }
                        if ("supply" in data && data.supply != undefined) {
                            this.supply = data.supply;
                        }
                        if ("denom_metadata" in data && data.denom_metadata != undefined) {
                            this.denom_metadata = data.denom_metadata;
                        }
                    }
                }
                get params() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.bank.v1beta1.Params, 1);
                }
                set params(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get balances() {
                    return pb_1.Message.getRepeatedWrapperField(this, Balance, 2);
                }
                set balances(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                get supply() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.Coin, 3);
                }
                set supply(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                get denom_metadata() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_3.cosmos.bank.v1beta1.Metadata, 4);
                }
                set denom_metadata(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.params != null) {
                        message.params = dependency_3.cosmos.bank.v1beta1.Params.fromObject(data.params);
                    }
                    if (data.balances != null) {
                        message.balances = data.balances.map(item => Balance.fromObject(item));
                    }
                    if (data.supply != null) {
                        message.supply = data.supply.map(item => dependency_2.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.denom_metadata != null) {
                        message.denom_metadata = data.denom_metadata.map(item => dependency_3.cosmos.bank.v1beta1.Metadata.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.params != null) {
                        data.params = this.params.toObject();
                    }
                    if (this.balances != null) {
                        data.balances = this.balances.map((item) => item.toObject());
                    }
                    if (this.supply != null) {
                        data.supply = this.supply.map((item) => item.toObject());
                    }
                    if (this.denom_metadata != null) {
                        data.denom_metadata = this.denom_metadata.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.params !== undefined)
                        writer.writeMessage(1, this.params, () => this.params.serialize(writer));
                    if (this.balances !== undefined)
                        writer.writeRepeatedMessage(2, this.balances, (item) => item.serialize(writer));
                    if (this.supply !== undefined)
                        writer.writeRepeatedMessage(3, this.supply, (item) => item.serialize(writer));
                    if (this.denom_metadata !== undefined)
                        writer.writeRepeatedMessage(4, this.denom_metadata, (item) => item.serialize(writer));
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
                                reader.readMessage(message.params, () => message.params = dependency_3.cosmos.bank.v1beta1.Params.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.balances, () => pb_1.Message.addToRepeatedWrapperField(message, 2, Balance.deserialize(reader), Balance));
                                break;
                            case 3:
                                reader.readMessage(message.supply, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_2.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_2.cosmos.base.v1beta1.Coin));
                                break;
                            case 4:
                                reader.readMessage(message.denom_metadata, () => pb_1.Message.addToRepeatedWrapperField(message, 4, dependency_3.cosmos.bank.v1beta1.Metadata.deserialize(reader), dependency_3.cosmos.bank.v1beta1.Metadata));
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
            class Balance extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("address" in data && data.address != undefined) {
                            this.address = data.address;
                        }
                        if ("coins" in data && data.coins != undefined) {
                            this.coins = data.coins;
                        }
                    }
                }
                get address() {
                    return pb_1.Message.getField(this, 1);
                }
                set address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get coins() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.v1beta1.Coin, 2);
                }
                set coins(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Balance({});
                    if (data.address != null) {
                        message.address = data.address;
                    }
                    if (data.coins != null) {
                        message.coins = data.coins.map(item => dependency_2.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.address != null) {
                        data.address = this.address;
                    }
                    if (this.coins != null) {
                        data.coins = this.coins.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.address === "string" && this.address.length)
                        writer.writeString(1, this.address);
                    if (this.coins !== undefined)
                        writer.writeRepeatedMessage(2, this.coins, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Balance();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.address = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.coins, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_2.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_2.cosmos.base.v1beta1.Coin));
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
                    return Balance.deserialize(bytes);
                }
            }
            v1beta1.Balance = Balance;
        })(v1beta1 = bank.v1beta1 || (bank.v1beta1 = {}));
    })(bank = cosmos.bank || (cosmos.bank = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=genesis.js.map