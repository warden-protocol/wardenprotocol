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
const dependency_2 = __importStar(require("./staking"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var staking;
    (function (staking) {
        var v1beta1;
        (function (v1beta1) {
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3, 4, 5, 6, 7], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("params" in data && data.params != undefined) {
                            this.params = data.params;
                        }
                        if ("last_total_power" in data && data.last_total_power != undefined) {
                            this.last_total_power = data.last_total_power;
                        }
                        if ("last_validator_powers" in data && data.last_validator_powers != undefined) {
                            this.last_validator_powers = data.last_validator_powers;
                        }
                        if ("validators" in data && data.validators != undefined) {
                            this.validators = data.validators;
                        }
                        if ("delegations" in data && data.delegations != undefined) {
                            this.delegations = data.delegations;
                        }
                        if ("unbonding_delegations" in data && data.unbonding_delegations != undefined) {
                            this.unbonding_delegations = data.unbonding_delegations;
                        }
                        if ("redelegations" in data && data.redelegations != undefined) {
                            this.redelegations = data.redelegations;
                        }
                        if ("exported" in data && data.exported != undefined) {
                            this.exported = data.exported;
                        }
                    }
                }
                get params() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.staking.v1beta1.Params, 1);
                }
                set params(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get last_total_power() {
                    return pb_1.Message.getField(this, 2);
                }
                set last_total_power(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get last_validator_powers() {
                    return pb_1.Message.getRepeatedWrapperField(this, LastValidatorPower, 3);
                }
                set last_validator_powers(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                get validators() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.staking.v1beta1.Validator, 4);
                }
                set validators(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 4, value);
                }
                get delegations() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.staking.v1beta1.Delegation, 5);
                }
                set delegations(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 5, value);
                }
                get unbonding_delegations() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.staking.v1beta1.UnbondingDelegation, 6);
                }
                set unbonding_delegations(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 6, value);
                }
                get redelegations() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.staking.v1beta1.Redelegation, 7);
                }
                set redelegations(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 7, value);
                }
                get exported() {
                    return pb_1.Message.getField(this, 8);
                }
                set exported(value) {
                    pb_1.Message.setField(this, 8, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.params != null) {
                        message.params = dependency_2.cosmos.staking.v1beta1.Params.fromObject(data.params);
                    }
                    if (data.last_total_power != null) {
                        message.last_total_power = data.last_total_power;
                    }
                    if (data.last_validator_powers != null) {
                        message.last_validator_powers = data.last_validator_powers.map(item => LastValidatorPower.fromObject(item));
                    }
                    if (data.validators != null) {
                        message.validators = data.validators.map(item => dependency_2.cosmos.staking.v1beta1.Validator.fromObject(item));
                    }
                    if (data.delegations != null) {
                        message.delegations = data.delegations.map(item => dependency_2.cosmos.staking.v1beta1.Delegation.fromObject(item));
                    }
                    if (data.unbonding_delegations != null) {
                        message.unbonding_delegations = data.unbonding_delegations.map(item => dependency_2.cosmos.staking.v1beta1.UnbondingDelegation.fromObject(item));
                    }
                    if (data.redelegations != null) {
                        message.redelegations = data.redelegations.map(item => dependency_2.cosmos.staking.v1beta1.Redelegation.fromObject(item));
                    }
                    if (data.exported != null) {
                        message.exported = data.exported;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.params != null) {
                        data.params = this.params.toObject();
                    }
                    if (this.last_total_power != null) {
                        data.last_total_power = this.last_total_power;
                    }
                    if (this.last_validator_powers != null) {
                        data.last_validator_powers = this.last_validator_powers.map((item) => item.toObject());
                    }
                    if (this.validators != null) {
                        data.validators = this.validators.map((item) => item.toObject());
                    }
                    if (this.delegations != null) {
                        data.delegations = this.delegations.map((item) => item.toObject());
                    }
                    if (this.unbonding_delegations != null) {
                        data.unbonding_delegations = this.unbonding_delegations.map((item) => item.toObject());
                    }
                    if (this.redelegations != null) {
                        data.redelegations = this.redelegations.map((item) => item.toObject());
                    }
                    if (this.exported != null) {
                        data.exported = this.exported;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.params !== undefined)
                        writer.writeMessage(1, this.params, () => this.params.serialize(writer));
                    if (this.last_total_power !== undefined)
                        writer.writeBytes(2, this.last_total_power);
                    if (this.last_validator_powers !== undefined)
                        writer.writeRepeatedMessage(3, this.last_validator_powers, (item) => item.serialize(writer));
                    if (this.validators !== undefined)
                        writer.writeRepeatedMessage(4, this.validators, (item) => item.serialize(writer));
                    if (this.delegations !== undefined)
                        writer.writeRepeatedMessage(5, this.delegations, (item) => item.serialize(writer));
                    if (this.unbonding_delegations !== undefined)
                        writer.writeRepeatedMessage(6, this.unbonding_delegations, (item) => item.serialize(writer));
                    if (this.redelegations !== undefined)
                        writer.writeRepeatedMessage(7, this.redelegations, (item) => item.serialize(writer));
                    if (this.exported !== undefined)
                        writer.writeBool(8, this.exported);
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
                                reader.readMessage(message.params, () => message.params = dependency_2.cosmos.staking.v1beta1.Params.deserialize(reader));
                                break;
                            case 2:
                                message.last_total_power = reader.readBytes();
                                break;
                            case 3:
                                reader.readMessage(message.last_validator_powers, () => pb_1.Message.addToRepeatedWrapperField(message, 3, LastValidatorPower.deserialize(reader), LastValidatorPower));
                                break;
                            case 4:
                                reader.readMessage(message.validators, () => pb_1.Message.addToRepeatedWrapperField(message, 4, dependency_2.cosmos.staking.v1beta1.Validator.deserialize(reader), dependency_2.cosmos.staking.v1beta1.Validator));
                                break;
                            case 5:
                                reader.readMessage(message.delegations, () => pb_1.Message.addToRepeatedWrapperField(message, 5, dependency_2.cosmos.staking.v1beta1.Delegation.deserialize(reader), dependency_2.cosmos.staking.v1beta1.Delegation));
                                break;
                            case 6:
                                reader.readMessage(message.unbonding_delegations, () => pb_1.Message.addToRepeatedWrapperField(message, 6, dependency_2.cosmos.staking.v1beta1.UnbondingDelegation.deserialize(reader), dependency_2.cosmos.staking.v1beta1.UnbondingDelegation));
                                break;
                            case 7:
                                reader.readMessage(message.redelegations, () => pb_1.Message.addToRepeatedWrapperField(message, 7, dependency_2.cosmos.staking.v1beta1.Redelegation.deserialize(reader), dependency_2.cosmos.staking.v1beta1.Redelegation));
                                break;
                            case 8:
                                message.exported = reader.readBool();
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
            class LastValidatorPower extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("address" in data && data.address != undefined) {
                            this.address = data.address;
                        }
                        if ("power" in data && data.power != undefined) {
                            this.power = data.power;
                        }
                    }
                }
                get address() {
                    return pb_1.Message.getField(this, 1);
                }
                set address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get power() {
                    return pb_1.Message.getField(this, 2);
                }
                set power(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new LastValidatorPower({});
                    if (data.address != null) {
                        message.address = data.address;
                    }
                    if (data.power != null) {
                        message.power = data.power;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.address != null) {
                        data.address = this.address;
                    }
                    if (this.power != null) {
                        data.power = this.power;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.address === "string" && this.address.length)
                        writer.writeString(1, this.address);
                    if (this.power !== undefined)
                        writer.writeInt64(2, this.power);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LastValidatorPower();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.address = reader.readString();
                                break;
                            case 2:
                                message.power = reader.readInt64();
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
                    return LastValidatorPower.deserialize(bytes);
                }
            }
            v1beta1.LastValidatorPower = LastValidatorPower;
        })(v1beta1 = staking.v1beta1 || (staking.v1beta1 = {}));
    })(staking = cosmos.staking || (cosmos.staking = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=genesis.js.map