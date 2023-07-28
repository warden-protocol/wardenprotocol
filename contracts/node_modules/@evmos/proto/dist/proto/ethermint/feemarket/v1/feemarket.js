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
exports.ethermint = void 0;
const pb_1 = __importStar(require("google-protobuf"));
var ethermint;
(function (ethermint) {
    var feemarket;
    (function (feemarket) {
        var v1;
        (function (v1) {
            class Params extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("no_base_fee" in data && data.no_base_fee != undefined) {
                            this.no_base_fee = data.no_base_fee;
                        }
                        if ("base_fee_change_denominator" in data && data.base_fee_change_denominator != undefined) {
                            this.base_fee_change_denominator = data.base_fee_change_denominator;
                        }
                        if ("elasticity_multiplier" in data && data.elasticity_multiplier != undefined) {
                            this.elasticity_multiplier = data.elasticity_multiplier;
                        }
                        if ("enable_height" in data && data.enable_height != undefined) {
                            this.enable_height = data.enable_height;
                        }
                        if ("base_fee" in data && data.base_fee != undefined) {
                            this.base_fee = data.base_fee;
                        }
                        if ("min_gas_price" in data && data.min_gas_price != undefined) {
                            this.min_gas_price = data.min_gas_price;
                        }
                        if ("min_gas_multiplier" in data && data.min_gas_multiplier != undefined) {
                            this.min_gas_multiplier = data.min_gas_multiplier;
                        }
                    }
                }
                get no_base_fee() {
                    return pb_1.Message.getField(this, 1);
                }
                set no_base_fee(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get base_fee_change_denominator() {
                    return pb_1.Message.getField(this, 2);
                }
                set base_fee_change_denominator(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get elasticity_multiplier() {
                    return pb_1.Message.getField(this, 3);
                }
                set elasticity_multiplier(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get enable_height() {
                    return pb_1.Message.getField(this, 5);
                }
                set enable_height(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get base_fee() {
                    return pb_1.Message.getField(this, 6);
                }
                set base_fee(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                get min_gas_price() {
                    return pb_1.Message.getField(this, 7);
                }
                set min_gas_price(value) {
                    pb_1.Message.setField(this, 7, value);
                }
                get min_gas_multiplier() {
                    return pb_1.Message.getField(this, 8);
                }
                set min_gas_multiplier(value) {
                    pb_1.Message.setField(this, 8, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.no_base_fee != null) {
                        message.no_base_fee = data.no_base_fee;
                    }
                    if (data.base_fee_change_denominator != null) {
                        message.base_fee_change_denominator = data.base_fee_change_denominator;
                    }
                    if (data.elasticity_multiplier != null) {
                        message.elasticity_multiplier = data.elasticity_multiplier;
                    }
                    if (data.enable_height != null) {
                        message.enable_height = data.enable_height;
                    }
                    if (data.base_fee != null) {
                        message.base_fee = data.base_fee;
                    }
                    if (data.min_gas_price != null) {
                        message.min_gas_price = data.min_gas_price;
                    }
                    if (data.min_gas_multiplier != null) {
                        message.min_gas_multiplier = data.min_gas_multiplier;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.no_base_fee != null) {
                        data.no_base_fee = this.no_base_fee;
                    }
                    if (this.base_fee_change_denominator != null) {
                        data.base_fee_change_denominator = this.base_fee_change_denominator;
                    }
                    if (this.elasticity_multiplier != null) {
                        data.elasticity_multiplier = this.elasticity_multiplier;
                    }
                    if (this.enable_height != null) {
                        data.enable_height = this.enable_height;
                    }
                    if (this.base_fee != null) {
                        data.base_fee = this.base_fee;
                    }
                    if (this.min_gas_price != null) {
                        data.min_gas_price = this.min_gas_price;
                    }
                    if (this.min_gas_multiplier != null) {
                        data.min_gas_multiplier = this.min_gas_multiplier;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.no_base_fee !== undefined)
                        writer.writeBool(1, this.no_base_fee);
                    if (this.base_fee_change_denominator !== undefined)
                        writer.writeUint32(2, this.base_fee_change_denominator);
                    if (this.elasticity_multiplier !== undefined)
                        writer.writeUint32(3, this.elasticity_multiplier);
                    if (this.enable_height !== undefined)
                        writer.writeInt64(5, this.enable_height);
                    if (typeof this.base_fee === "string" && this.base_fee.length)
                        writer.writeString(6, this.base_fee);
                    if (typeof this.min_gas_price === "string" && this.min_gas_price.length)
                        writer.writeString(7, this.min_gas_price);
                    if (typeof this.min_gas_multiplier === "string" && this.min_gas_multiplier.length)
                        writer.writeString(8, this.min_gas_multiplier);
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
                                message.no_base_fee = reader.readBool();
                                break;
                            case 2:
                                message.base_fee_change_denominator = reader.readUint32();
                                break;
                            case 3:
                                message.elasticity_multiplier = reader.readUint32();
                                break;
                            case 5:
                                message.enable_height = reader.readInt64();
                                break;
                            case 6:
                                message.base_fee = reader.readString();
                                break;
                            case 7:
                                message.min_gas_price = reader.readString();
                                break;
                            case 8:
                                message.min_gas_multiplier = reader.readString();
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
            v1.Params = Params;
        })(v1 = feemarket.v1 || (feemarket.v1 = {}));
    })(feemarket = ethermint.feemarket || (ethermint.feemarket = {}));
})(ethermint = exports.ethermint || (exports.ethermint = {}));
//# sourceMappingURL=feemarket.js.map