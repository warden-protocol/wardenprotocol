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
const dependency_2 = __importStar(require("./inflation"));
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var inflation;
    (function (inflation) {
        var v1;
        (function (v1) {
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("params" in data && data.params != undefined) {
                            this.params = data.params;
                        }
                        if ("period" in data && data.period != undefined) {
                            this.period = data.period;
                        }
                        if ("epoch_identifier" in data && data.epoch_identifier != undefined) {
                            this.epoch_identifier = data.epoch_identifier;
                        }
                        if ("epochs_per_period" in data && data.epochs_per_period != undefined) {
                            this.epochs_per_period = data.epochs_per_period;
                        }
                        if ("skipped_epochs" in data && data.skipped_epochs != undefined) {
                            this.skipped_epochs = data.skipped_epochs;
                        }
                    }
                }
                get params() {
                    return pb_1.Message.getWrapperField(this, Params, 1);
                }
                set params(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get period() {
                    return pb_1.Message.getField(this, 2);
                }
                set period(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get epoch_identifier() {
                    return pb_1.Message.getField(this, 3);
                }
                set epoch_identifier(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get epochs_per_period() {
                    return pb_1.Message.getField(this, 4);
                }
                set epochs_per_period(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get skipped_epochs() {
                    return pb_1.Message.getField(this, 5);
                }
                set skipped_epochs(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.params != null) {
                        message.params = Params.fromObject(data.params);
                    }
                    if (data.period != null) {
                        message.period = data.period;
                    }
                    if (data.epoch_identifier != null) {
                        message.epoch_identifier = data.epoch_identifier;
                    }
                    if (data.epochs_per_period != null) {
                        message.epochs_per_period = data.epochs_per_period;
                    }
                    if (data.skipped_epochs != null) {
                        message.skipped_epochs = data.skipped_epochs;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.params != null) {
                        data.params = this.params.toObject();
                    }
                    if (this.period != null) {
                        data.period = this.period;
                    }
                    if (this.epoch_identifier != null) {
                        data.epoch_identifier = this.epoch_identifier;
                    }
                    if (this.epochs_per_period != null) {
                        data.epochs_per_period = this.epochs_per_period;
                    }
                    if (this.skipped_epochs != null) {
                        data.skipped_epochs = this.skipped_epochs;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.params !== undefined)
                        writer.writeMessage(1, this.params, () => this.params.serialize(writer));
                    if (this.period !== undefined)
                        writer.writeUint64(2, this.period);
                    if (typeof this.epoch_identifier === "string" && this.epoch_identifier.length)
                        writer.writeString(3, this.epoch_identifier);
                    if (this.epochs_per_period !== undefined)
                        writer.writeInt64(4, this.epochs_per_period);
                    if (this.skipped_epochs !== undefined)
                        writer.writeUint64(5, this.skipped_epochs);
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
                                reader.readMessage(message.params, () => message.params = Params.deserialize(reader));
                                break;
                            case 2:
                                message.period = reader.readUint64();
                                break;
                            case 3:
                                message.epoch_identifier = reader.readString();
                                break;
                            case 4:
                                message.epochs_per_period = reader.readInt64();
                                break;
                            case 5:
                                message.skipped_epochs = reader.readUint64();
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
            v1.GenesisState = GenesisState;
            class Params extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("mint_denom" in data && data.mint_denom != undefined) {
                            this.mint_denom = data.mint_denom;
                        }
                        if ("exponential_calculation" in data && data.exponential_calculation != undefined) {
                            this.exponential_calculation = data.exponential_calculation;
                        }
                        if ("inflation_distribution" in data && data.inflation_distribution != undefined) {
                            this.inflation_distribution = data.inflation_distribution;
                        }
                        if ("enable_inflation" in data && data.enable_inflation != undefined) {
                            this.enable_inflation = data.enable_inflation;
                        }
                    }
                }
                get mint_denom() {
                    return pb_1.Message.getField(this, 1);
                }
                set mint_denom(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get exponential_calculation() {
                    return pb_1.Message.getWrapperField(this, dependency_2.evmos.inflation.v1.ExponentialCalculation, 2);
                }
                set exponential_calculation(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get inflation_distribution() {
                    return pb_1.Message.getWrapperField(this, dependency_2.evmos.inflation.v1.InflationDistribution, 3);
                }
                set inflation_distribution(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                get enable_inflation() {
                    return pb_1.Message.getField(this, 4);
                }
                set enable_inflation(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.mint_denom != null) {
                        message.mint_denom = data.mint_denom;
                    }
                    if (data.exponential_calculation != null) {
                        message.exponential_calculation = dependency_2.evmos.inflation.v1.ExponentialCalculation.fromObject(data.exponential_calculation);
                    }
                    if (data.inflation_distribution != null) {
                        message.inflation_distribution = dependency_2.evmos.inflation.v1.InflationDistribution.fromObject(data.inflation_distribution);
                    }
                    if (data.enable_inflation != null) {
                        message.enable_inflation = data.enable_inflation;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.mint_denom != null) {
                        data.mint_denom = this.mint_denom;
                    }
                    if (this.exponential_calculation != null) {
                        data.exponential_calculation = this.exponential_calculation.toObject();
                    }
                    if (this.inflation_distribution != null) {
                        data.inflation_distribution = this.inflation_distribution.toObject();
                    }
                    if (this.enable_inflation != null) {
                        data.enable_inflation = this.enable_inflation;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.mint_denom === "string" && this.mint_denom.length)
                        writer.writeString(1, this.mint_denom);
                    if (this.exponential_calculation !== undefined)
                        writer.writeMessage(2, this.exponential_calculation, () => this.exponential_calculation.serialize(writer));
                    if (this.inflation_distribution !== undefined)
                        writer.writeMessage(3, this.inflation_distribution, () => this.inflation_distribution.serialize(writer));
                    if (this.enable_inflation !== undefined)
                        writer.writeBool(4, this.enable_inflation);
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
                                reader.readMessage(message.exponential_calculation, () => message.exponential_calculation = dependency_2.evmos.inflation.v1.ExponentialCalculation.deserialize(reader));
                                break;
                            case 3:
                                reader.readMessage(message.inflation_distribution, () => message.inflation_distribution = dependency_2.evmos.inflation.v1.InflationDistribution.deserialize(reader));
                                break;
                            case 4:
                                message.enable_inflation = reader.readBool();
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
        })(v1 = inflation.v1 || (inflation.v1 = {}));
    })(inflation = evmos.inflation || (evmos.inflation = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=genesis.js.map