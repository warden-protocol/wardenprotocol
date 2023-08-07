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
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var base;
    (function (base) {
        var v1beta1;
        (function (v1beta1) {
            class Coin extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("denom" in data && data.denom != undefined) {
                            this.denom = data.denom;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                    }
                }
                get denom() {
                    return pb_1.Message.getField(this, 1);
                }
                set denom(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get amount() {
                    return pb_1.Message.getField(this, 2);
                }
                set amount(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Coin({});
                    if (data.denom != null) {
                        message.denom = data.denom;
                    }
                    if (data.amount != null) {
                        message.amount = data.amount;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.denom != null) {
                        data.denom = this.denom;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.denom === "string" && this.denom.length)
                        writer.writeString(1, this.denom);
                    if (typeof this.amount === "string" && this.amount.length)
                        writer.writeString(2, this.amount);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Coin();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.denom = reader.readString();
                                break;
                            case 2:
                                message.amount = reader.readString();
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
                    return Coin.deserialize(bytes);
                }
            }
            v1beta1.Coin = Coin;
            class DecCoin extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("denom" in data && data.denom != undefined) {
                            this.denom = data.denom;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                    }
                }
                get denom() {
                    return pb_1.Message.getField(this, 1);
                }
                set denom(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get amount() {
                    return pb_1.Message.getField(this, 2);
                }
                set amount(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new DecCoin({});
                    if (data.denom != null) {
                        message.denom = data.denom;
                    }
                    if (data.amount != null) {
                        message.amount = data.amount;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.denom != null) {
                        data.denom = this.denom;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.denom === "string" && this.denom.length)
                        writer.writeString(1, this.denom);
                    if (typeof this.amount === "string" && this.amount.length)
                        writer.writeString(2, this.amount);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DecCoin();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.denom = reader.readString();
                                break;
                            case 2:
                                message.amount = reader.readString();
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
                    return DecCoin.deserialize(bytes);
                }
            }
            v1beta1.DecCoin = DecCoin;
            class IntProto extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("int" in data && data.int != undefined) {
                            this.int = data.int;
                        }
                    }
                }
                get int() {
                    return pb_1.Message.getField(this, 1);
                }
                set int(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new IntProto({});
                    if (data.int != null) {
                        message.int = data.int;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.int != null) {
                        data.int = this.int;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.int === "string" && this.int.length)
                        writer.writeString(1, this.int);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IntProto();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.int = reader.readString();
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
                    return IntProto.deserialize(bytes);
                }
            }
            v1beta1.IntProto = IntProto;
            class DecProto extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("dec" in data && data.dec != undefined) {
                            this.dec = data.dec;
                        }
                    }
                }
                get dec() {
                    return pb_1.Message.getField(this, 1);
                }
                set dec(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new DecProto({});
                    if (data.dec != null) {
                        message.dec = data.dec;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.dec != null) {
                        data.dec = this.dec;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.dec === "string" && this.dec.length)
                        writer.writeString(1, this.dec);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DecProto();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.dec = reader.readString();
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
                    return DecProto.deserialize(bytes);
                }
            }
            v1beta1.DecProto = DecProto;
        })(v1beta1 = base.v1beta1 || (base.v1beta1 = {}));
    })(base = cosmos.base || (cosmos.base = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=coin.js.map