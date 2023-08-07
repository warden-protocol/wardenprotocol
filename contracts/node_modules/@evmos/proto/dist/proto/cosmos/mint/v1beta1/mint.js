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
    var mint;
    (function (mint) {
        var v1beta1;
        (function (v1beta1) {
            class Minter extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("inflation" in data && data.inflation != undefined) {
                            this.inflation = data.inflation;
                        }
                        if ("annual_provisions" in data && data.annual_provisions != undefined) {
                            this.annual_provisions = data.annual_provisions;
                        }
                    }
                }
                get inflation() {
                    return pb_1.Message.getField(this, 1);
                }
                set inflation(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get annual_provisions() {
                    return pb_1.Message.getField(this, 2);
                }
                set annual_provisions(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Minter({});
                    if (data.inflation != null) {
                        message.inflation = data.inflation;
                    }
                    if (data.annual_provisions != null) {
                        message.annual_provisions = data.annual_provisions;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.inflation != null) {
                        data.inflation = this.inflation;
                    }
                    if (this.annual_provisions != null) {
                        data.annual_provisions = this.annual_provisions;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.inflation === "string" && this.inflation.length)
                        writer.writeString(1, this.inflation);
                    if (typeof this.annual_provisions === "string" && this.annual_provisions.length)
                        writer.writeString(2, this.annual_provisions);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Minter();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.inflation = reader.readString();
                                break;
                            case 2:
                                message.annual_provisions = reader.readString();
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
                    return Minter.deserialize(bytes);
                }
            }
            v1beta1.Minter = Minter;
            class Params extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("mint_denom" in data && data.mint_denom != undefined) {
                            this.mint_denom = data.mint_denom;
                        }
                        if ("inflation_rate_change" in data && data.inflation_rate_change != undefined) {
                            this.inflation_rate_change = data.inflation_rate_change;
                        }
                        if ("inflation_max" in data && data.inflation_max != undefined) {
                            this.inflation_max = data.inflation_max;
                        }
                        if ("inflation_min" in data && data.inflation_min != undefined) {
                            this.inflation_min = data.inflation_min;
                        }
                        if ("goal_bonded" in data && data.goal_bonded != undefined) {
                            this.goal_bonded = data.goal_bonded;
                        }
                        if ("blocks_per_year" in data && data.blocks_per_year != undefined) {
                            this.blocks_per_year = data.blocks_per_year;
                        }
                    }
                }
                get mint_denom() {
                    return pb_1.Message.getField(this, 1);
                }
                set mint_denom(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get inflation_rate_change() {
                    return pb_1.Message.getField(this, 2);
                }
                set inflation_rate_change(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get inflation_max() {
                    return pb_1.Message.getField(this, 3);
                }
                set inflation_max(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get inflation_min() {
                    return pb_1.Message.getField(this, 4);
                }
                set inflation_min(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get goal_bonded() {
                    return pb_1.Message.getField(this, 5);
                }
                set goal_bonded(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get blocks_per_year() {
                    return pb_1.Message.getField(this, 6);
                }
                set blocks_per_year(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.mint_denom != null) {
                        message.mint_denom = data.mint_denom;
                    }
                    if (data.inflation_rate_change != null) {
                        message.inflation_rate_change = data.inflation_rate_change;
                    }
                    if (data.inflation_max != null) {
                        message.inflation_max = data.inflation_max;
                    }
                    if (data.inflation_min != null) {
                        message.inflation_min = data.inflation_min;
                    }
                    if (data.goal_bonded != null) {
                        message.goal_bonded = data.goal_bonded;
                    }
                    if (data.blocks_per_year != null) {
                        message.blocks_per_year = data.blocks_per_year;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.mint_denom != null) {
                        data.mint_denom = this.mint_denom;
                    }
                    if (this.inflation_rate_change != null) {
                        data.inflation_rate_change = this.inflation_rate_change;
                    }
                    if (this.inflation_max != null) {
                        data.inflation_max = this.inflation_max;
                    }
                    if (this.inflation_min != null) {
                        data.inflation_min = this.inflation_min;
                    }
                    if (this.goal_bonded != null) {
                        data.goal_bonded = this.goal_bonded;
                    }
                    if (this.blocks_per_year != null) {
                        data.blocks_per_year = this.blocks_per_year;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.mint_denom === "string" && this.mint_denom.length)
                        writer.writeString(1, this.mint_denom);
                    if (typeof this.inflation_rate_change === "string" && this.inflation_rate_change.length)
                        writer.writeString(2, this.inflation_rate_change);
                    if (typeof this.inflation_max === "string" && this.inflation_max.length)
                        writer.writeString(3, this.inflation_max);
                    if (typeof this.inflation_min === "string" && this.inflation_min.length)
                        writer.writeString(4, this.inflation_min);
                    if (typeof this.goal_bonded === "string" && this.goal_bonded.length)
                        writer.writeString(5, this.goal_bonded);
                    if (this.blocks_per_year !== undefined)
                        writer.writeUint64(6, this.blocks_per_year);
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
                                message.mint_denom = reader.readString();
                                break;
                            case 2:
                                message.inflation_rate_change = reader.readString();
                                break;
                            case 3:
                                message.inflation_max = reader.readString();
                                break;
                            case 4:
                                message.inflation_min = reader.readString();
                                break;
                            case 5:
                                message.goal_bonded = reader.readString();
                                break;
                            case 6:
                                message.blocks_per_year = reader.readUint64();
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
        })(v1beta1 = mint.v1beta1 || (mint.v1beta1 = {}));
    })(mint = cosmos.mint || (cosmos.mint = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=mint.js.map