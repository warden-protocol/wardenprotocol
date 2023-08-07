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
const dependency_1 = __importStar(require("./incentives"));
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var incentives;
    (function (incentives) {
        var v1;
        (function (v1) {
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2, 3], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("params" in data && data.params != undefined) {
                            this.params = data.params;
                        }
                        if ("incentives" in data && data.incentives != undefined) {
                            this.incentives = data.incentives;
                        }
                        if ("gas_meters" in data && data.gas_meters != undefined) {
                            this.gas_meters = data.gas_meters;
                        }
                    }
                }
                get params() {
                    return pb_1.Message.getWrapperField(this, Params, 1);
                }
                set params(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get incentives() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_1.evmos.incentives.v1.Incentive, 2);
                }
                set incentives(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                get gas_meters() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_1.evmos.incentives.v1.GasMeter, 3);
                }
                set gas_meters(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.params != null) {
                        message.params = Params.fromObject(data.params);
                    }
                    if (data.incentives != null) {
                        message.incentives = data.incentives.map(item => dependency_1.evmos.incentives.v1.Incentive.fromObject(item));
                    }
                    if (data.gas_meters != null) {
                        message.gas_meters = data.gas_meters.map(item => dependency_1.evmos.incentives.v1.GasMeter.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.params != null) {
                        data.params = this.params.toObject();
                    }
                    if (this.incentives != null) {
                        data.incentives = this.incentives.map((item) => item.toObject());
                    }
                    if (this.gas_meters != null) {
                        data.gas_meters = this.gas_meters.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.params !== undefined)
                        writer.writeMessage(1, this.params, () => this.params.serialize(writer));
                    if (this.incentives !== undefined)
                        writer.writeRepeatedMessage(2, this.incentives, (item) => item.serialize(writer));
                    if (this.gas_meters !== undefined)
                        writer.writeRepeatedMessage(3, this.gas_meters, (item) => item.serialize(writer));
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
                                reader.readMessage(message.incentives, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_1.evmos.incentives.v1.Incentive.deserialize(reader), dependency_1.evmos.incentives.v1.Incentive));
                                break;
                            case 3:
                                reader.readMessage(message.gas_meters, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_1.evmos.incentives.v1.GasMeter.deserialize(reader), dependency_1.evmos.incentives.v1.GasMeter));
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
                        if ("enable_incentives" in data && data.enable_incentives != undefined) {
                            this.enable_incentives = data.enable_incentives;
                        }
                        if ("allocation_limit" in data && data.allocation_limit != undefined) {
                            this.allocation_limit = data.allocation_limit;
                        }
                        if ("incentives_epoch_identifier" in data && data.incentives_epoch_identifier != undefined) {
                            this.incentives_epoch_identifier = data.incentives_epoch_identifier;
                        }
                        if ("reward_scaler" in data && data.reward_scaler != undefined) {
                            this.reward_scaler = data.reward_scaler;
                        }
                    }
                }
                get enable_incentives() {
                    return pb_1.Message.getField(this, 1);
                }
                set enable_incentives(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get allocation_limit() {
                    return pb_1.Message.getField(this, 2);
                }
                set allocation_limit(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get incentives_epoch_identifier() {
                    return pb_1.Message.getField(this, 3);
                }
                set incentives_epoch_identifier(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get reward_scaler() {
                    return pb_1.Message.getField(this, 4);
                }
                set reward_scaler(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.enable_incentives != null) {
                        message.enable_incentives = data.enable_incentives;
                    }
                    if (data.allocation_limit != null) {
                        message.allocation_limit = data.allocation_limit;
                    }
                    if (data.incentives_epoch_identifier != null) {
                        message.incentives_epoch_identifier = data.incentives_epoch_identifier;
                    }
                    if (data.reward_scaler != null) {
                        message.reward_scaler = data.reward_scaler;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.enable_incentives != null) {
                        data.enable_incentives = this.enable_incentives;
                    }
                    if (this.allocation_limit != null) {
                        data.allocation_limit = this.allocation_limit;
                    }
                    if (this.incentives_epoch_identifier != null) {
                        data.incentives_epoch_identifier = this.incentives_epoch_identifier;
                    }
                    if (this.reward_scaler != null) {
                        data.reward_scaler = this.reward_scaler;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.enable_incentives !== undefined)
                        writer.writeBool(1, this.enable_incentives);
                    if (typeof this.allocation_limit === "string" && this.allocation_limit.length)
                        writer.writeString(2, this.allocation_limit);
                    if (typeof this.incentives_epoch_identifier === "string" && this.incentives_epoch_identifier.length)
                        writer.writeString(3, this.incentives_epoch_identifier);
                    if (typeof this.reward_scaler === "string" && this.reward_scaler.length)
                        writer.writeString(4, this.reward_scaler);
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
                                message.enable_incentives = reader.readBool();
                                break;
                            case 2:
                                message.allocation_limit = reader.readString();
                                break;
                            case 3:
                                message.incentives_epoch_identifier = reader.readString();
                                break;
                            case 4:
                                message.reward_scaler = reader.readString();
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
        })(v1 = incentives.v1 || (incentives.v1 = {}));
    })(incentives = evmos.incentives || (evmos.incentives = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=genesis.js.map