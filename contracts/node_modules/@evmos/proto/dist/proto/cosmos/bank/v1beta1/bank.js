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
const dependency_3 = __importStar(require("./../../base/v1beta1/coin"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var bank;
    (function (bank) {
        var v1beta1;
        (function (v1beta1) {
            class Params extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("send_enabled" in data && data.send_enabled != undefined) {
                            this.send_enabled = data.send_enabled;
                        }
                        if ("default_send_enabled" in data && data.default_send_enabled != undefined) {
                            this.default_send_enabled = data.default_send_enabled;
                        }
                    }
                }
                get send_enabled() {
                    return pb_1.Message.getRepeatedWrapperField(this, SendEnabled, 1);
                }
                set send_enabled(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get default_send_enabled() {
                    return pb_1.Message.getField(this, 2);
                }
                set default_send_enabled(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.send_enabled != null) {
                        message.send_enabled = data.send_enabled.map(item => SendEnabled.fromObject(item));
                    }
                    if (data.default_send_enabled != null) {
                        message.default_send_enabled = data.default_send_enabled;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.send_enabled != null) {
                        data.send_enabled = this.send_enabled.map((item) => item.toObject());
                    }
                    if (this.default_send_enabled != null) {
                        data.default_send_enabled = this.default_send_enabled;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.send_enabled !== undefined)
                        writer.writeRepeatedMessage(1, this.send_enabled, (item) => item.serialize(writer));
                    if (this.default_send_enabled !== undefined)
                        writer.writeBool(2, this.default_send_enabled);
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
                                reader.readMessage(message.send_enabled, () => pb_1.Message.addToRepeatedWrapperField(message, 1, SendEnabled.deserialize(reader), SendEnabled));
                                break;
                            case 2:
                                message.default_send_enabled = reader.readBool();
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
            class SendEnabled extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("denom" in data && data.denom != undefined) {
                            this.denom = data.denom;
                        }
                        if ("enabled" in data && data.enabled != undefined) {
                            this.enabled = data.enabled;
                        }
                    }
                }
                get denom() {
                    return pb_1.Message.getField(this, 1);
                }
                set denom(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get enabled() {
                    return pb_1.Message.getField(this, 2);
                }
                set enabled(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new SendEnabled({});
                    if (data.denom != null) {
                        message.denom = data.denom;
                    }
                    if (data.enabled != null) {
                        message.enabled = data.enabled;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.denom != null) {
                        data.denom = this.denom;
                    }
                    if (this.enabled != null) {
                        data.enabled = this.enabled;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.denom === "string" && this.denom.length)
                        writer.writeString(1, this.denom);
                    if (this.enabled !== undefined)
                        writer.writeBool(2, this.enabled);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SendEnabled();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.denom = reader.readString();
                                break;
                            case 2:
                                message.enabled = reader.readBool();
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
                    return SendEnabled.deserialize(bytes);
                }
            }
            v1beta1.SendEnabled = SendEnabled;
            class Input extends pb_1.Message {
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
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_3.cosmos.base.v1beta1.Coin, 2);
                }
                set coins(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Input({});
                    if (data.address != null) {
                        message.address = data.address;
                    }
                    if (data.coins != null) {
                        message.coins = data.coins.map(item => dependency_3.cosmos.base.v1beta1.Coin.fromObject(item));
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Input();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.address = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.coins, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_3.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_3.cosmos.base.v1beta1.Coin));
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
                    return Input.deserialize(bytes);
                }
            }
            v1beta1.Input = Input;
            class Output extends pb_1.Message {
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
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_3.cosmos.base.v1beta1.Coin, 2);
                }
                set coins(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Output({});
                    if (data.address != null) {
                        message.address = data.address;
                    }
                    if (data.coins != null) {
                        message.coins = data.coins.map(item => dependency_3.cosmos.base.v1beta1.Coin.fromObject(item));
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Output();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.address = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.coins, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_3.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_3.cosmos.base.v1beta1.Coin));
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
                    return Output.deserialize(bytes);
                }
            }
            v1beta1.Output = Output;
            class Supply extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("total" in data && data.total != undefined) {
                            this.total = data.total;
                        }
                    }
                }
                get total() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_3.cosmos.base.v1beta1.Coin, 1);
                }
                set total(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new Supply({});
                    if (data.total != null) {
                        message.total = data.total.map(item => dependency_3.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.total != null) {
                        data.total = this.total.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.total !== undefined)
                        writer.writeRepeatedMessage(1, this.total, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Supply();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.total, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_3.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_3.cosmos.base.v1beta1.Coin));
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
                    return Supply.deserialize(bytes);
                }
            }
            v1beta1.Supply = Supply;
            class DenomUnit extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("denom" in data && data.denom != undefined) {
                            this.denom = data.denom;
                        }
                        if ("exponent" in data && data.exponent != undefined) {
                            this.exponent = data.exponent;
                        }
                        if ("aliases" in data && data.aliases != undefined) {
                            this.aliases = data.aliases;
                        }
                    }
                }
                get denom() {
                    return pb_1.Message.getField(this, 1);
                }
                set denom(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get exponent() {
                    return pb_1.Message.getField(this, 2);
                }
                set exponent(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get aliases() {
                    return pb_1.Message.getField(this, 3);
                }
                set aliases(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new DenomUnit({});
                    if (data.denom != null) {
                        message.denom = data.denom;
                    }
                    if (data.exponent != null) {
                        message.exponent = data.exponent;
                    }
                    if (data.aliases != null) {
                        message.aliases = data.aliases;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.denom != null) {
                        data.denom = this.denom;
                    }
                    if (this.exponent != null) {
                        data.exponent = this.exponent;
                    }
                    if (this.aliases != null) {
                        data.aliases = this.aliases;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.denom === "string" && this.denom.length)
                        writer.writeString(1, this.denom);
                    if (this.exponent !== undefined)
                        writer.writeUint32(2, this.exponent);
                    if (this.aliases !== undefined)
                        writer.writeRepeatedString(3, this.aliases);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DenomUnit();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.denom = reader.readString();
                                break;
                            case 2:
                                message.exponent = reader.readUint32();
                                break;
                            case 3:
                                pb_1.Message.addToRepeatedField(message, 3, reader.readString());
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
                    return DenomUnit.deserialize(bytes);
                }
            }
            v1beta1.DenomUnit = DenomUnit;
            class Metadata extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("denom_units" in data && data.denom_units != undefined) {
                            this.denom_units = data.denom_units;
                        }
                        if ("base" in data && data.base != undefined) {
                            this.base = data.base;
                        }
                        if ("display" in data && data.display != undefined) {
                            this.display = data.display;
                        }
                        if ("name" in data && data.name != undefined) {
                            this.name = data.name;
                        }
                        if ("symbol" in data && data.symbol != undefined) {
                            this.symbol = data.symbol;
                        }
                    }
                }
                get description() {
                    return pb_1.Message.getField(this, 1);
                }
                set description(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get denom_units() {
                    return pb_1.Message.getRepeatedWrapperField(this, DenomUnit, 2);
                }
                set denom_units(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                get base() {
                    return pb_1.Message.getField(this, 3);
                }
                set base(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get display() {
                    return pb_1.Message.getField(this, 4);
                }
                set display(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get name() {
                    return pb_1.Message.getField(this, 5);
                }
                set name(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get symbol() {
                    return pb_1.Message.getField(this, 6);
                }
                set symbol(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                static fromObject(data) {
                    const message = new Metadata({});
                    if (data.description != null) {
                        message.description = data.description;
                    }
                    if (data.denom_units != null) {
                        message.denom_units = data.denom_units.map(item => DenomUnit.fromObject(item));
                    }
                    if (data.base != null) {
                        message.base = data.base;
                    }
                    if (data.display != null) {
                        message.display = data.display;
                    }
                    if (data.name != null) {
                        message.name = data.name;
                    }
                    if (data.symbol != null) {
                        message.symbol = data.symbol;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.description != null) {
                        data.description = this.description;
                    }
                    if (this.denom_units != null) {
                        data.denom_units = this.denom_units.map((item) => item.toObject());
                    }
                    if (this.base != null) {
                        data.base = this.base;
                    }
                    if (this.display != null) {
                        data.display = this.display;
                    }
                    if (this.name != null) {
                        data.name = this.name;
                    }
                    if (this.symbol != null) {
                        data.symbol = this.symbol;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.description === "string" && this.description.length)
                        writer.writeString(1, this.description);
                    if (this.denom_units !== undefined)
                        writer.writeRepeatedMessage(2, this.denom_units, (item) => item.serialize(writer));
                    if (typeof this.base === "string" && this.base.length)
                        writer.writeString(3, this.base);
                    if (typeof this.display === "string" && this.display.length)
                        writer.writeString(4, this.display);
                    if (typeof this.name === "string" && this.name.length)
                        writer.writeString(5, this.name);
                    if (typeof this.symbol === "string" && this.symbol.length)
                        writer.writeString(6, this.symbol);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Metadata();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.description = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.denom_units, () => pb_1.Message.addToRepeatedWrapperField(message, 2, DenomUnit.deserialize(reader), DenomUnit));
                                break;
                            case 3:
                                message.base = reader.readString();
                                break;
                            case 4:
                                message.display = reader.readString();
                                break;
                            case 5:
                                message.name = reader.readString();
                                break;
                            case 6:
                                message.symbol = reader.readString();
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
                    return Metadata.deserialize(bytes);
                }
            }
            v1beta1.Metadata = Metadata;
        })(v1beta1 = bank.v1beta1 || (bank.v1beta1 = {}));
    })(bank = cosmos.bank || (cosmos.bank = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=bank.js.map