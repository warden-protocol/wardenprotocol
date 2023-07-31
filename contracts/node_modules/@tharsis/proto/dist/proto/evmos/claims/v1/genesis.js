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
const dependency_2 = __importStar(require("./../../../google/protobuf/duration"));
const dependency_3 = __importStar(require("./../../../google/protobuf/timestamp"));
const dependency_4 = __importStar(require("./claims"));
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var claims;
    (function (claims) {
        var v1;
        (function (v1) {
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("params" in data && data.params != undefined) {
                            this.params = data.params;
                        }
                        if ("claims_records" in data && data.claims_records != undefined) {
                            this.claims_records = data.claims_records;
                        }
                    }
                }
                get params() {
                    return pb_1.Message.getWrapperField(this, Params, 1);
                }
                set params(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get claims_records() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_4.evmos.claims.v1.ClaimsRecordAddress, 2);
                }
                set claims_records(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.params != null) {
                        message.params = Params.fromObject(data.params);
                    }
                    if (data.claims_records != null) {
                        message.claims_records = data.claims_records.map(item => dependency_4.evmos.claims.v1.ClaimsRecordAddress.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.params != null) {
                        data.params = this.params.toObject();
                    }
                    if (this.claims_records != null) {
                        data.claims_records = this.claims_records.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.params !== undefined)
                        writer.writeMessage(1, this.params, () => this.params.serialize(writer));
                    if (this.claims_records !== undefined)
                        writer.writeRepeatedMessage(2, this.claims_records, (item) => item.serialize(writer));
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
                                reader.readMessage(message.claims_records, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_4.evmos.claims.v1.ClaimsRecordAddress.deserialize(reader), dependency_4.evmos.claims.v1.ClaimsRecordAddress));
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
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6, 7], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("enable_claims" in data && data.enable_claims != undefined) {
                            this.enable_claims = data.enable_claims;
                        }
                        if ("airdrop_start_time" in data && data.airdrop_start_time != undefined) {
                            this.airdrop_start_time = data.airdrop_start_time;
                        }
                        if ("duration_until_decay" in data && data.duration_until_decay != undefined) {
                            this.duration_until_decay = data.duration_until_decay;
                        }
                        if ("duration_of_decay" in data && data.duration_of_decay != undefined) {
                            this.duration_of_decay = data.duration_of_decay;
                        }
                        if ("claims_denom" in data && data.claims_denom != undefined) {
                            this.claims_denom = data.claims_denom;
                        }
                        if ("authorized_channels" in data && data.authorized_channels != undefined) {
                            this.authorized_channels = data.authorized_channels;
                        }
                        if ("evm_channels" in data && data.evm_channels != undefined) {
                            this.evm_channels = data.evm_channels;
                        }
                    }
                }
                get enable_claims() {
                    return pb_1.Message.getField(this, 1);
                }
                set enable_claims(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get airdrop_start_time() {
                    return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Timestamp, 2);
                }
                set airdrop_start_time(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get duration_until_decay() {
                    return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Duration, 3);
                }
                set duration_until_decay(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                get duration_of_decay() {
                    return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Duration, 4);
                }
                set duration_of_decay(value) {
                    pb_1.Message.setWrapperField(this, 4, value);
                }
                get claims_denom() {
                    return pb_1.Message.getField(this, 5);
                }
                set claims_denom(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get authorized_channels() {
                    return pb_1.Message.getField(this, 6);
                }
                set authorized_channels(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                get evm_channels() {
                    return pb_1.Message.getField(this, 7);
                }
                set evm_channels(value) {
                    pb_1.Message.setField(this, 7, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.enable_claims != null) {
                        message.enable_claims = data.enable_claims;
                    }
                    if (data.airdrop_start_time != null) {
                        message.airdrop_start_time = dependency_3.google.protobuf.Timestamp.fromObject(data.airdrop_start_time);
                    }
                    if (data.duration_until_decay != null) {
                        message.duration_until_decay = dependency_2.google.protobuf.Duration.fromObject(data.duration_until_decay);
                    }
                    if (data.duration_of_decay != null) {
                        message.duration_of_decay = dependency_2.google.protobuf.Duration.fromObject(data.duration_of_decay);
                    }
                    if (data.claims_denom != null) {
                        message.claims_denom = data.claims_denom;
                    }
                    if (data.authorized_channels != null) {
                        message.authorized_channels = data.authorized_channels;
                    }
                    if (data.evm_channels != null) {
                        message.evm_channels = data.evm_channels;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.enable_claims != null) {
                        data.enable_claims = this.enable_claims;
                    }
                    if (this.airdrop_start_time != null) {
                        data.airdrop_start_time = this.airdrop_start_time.toObject();
                    }
                    if (this.duration_until_decay != null) {
                        data.duration_until_decay = this.duration_until_decay.toObject();
                    }
                    if (this.duration_of_decay != null) {
                        data.duration_of_decay = this.duration_of_decay.toObject();
                    }
                    if (this.claims_denom != null) {
                        data.claims_denom = this.claims_denom;
                    }
                    if (this.authorized_channels != null) {
                        data.authorized_channels = this.authorized_channels;
                    }
                    if (this.evm_channels != null) {
                        data.evm_channels = this.evm_channels;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.enable_claims !== undefined)
                        writer.writeBool(1, this.enable_claims);
                    if (this.airdrop_start_time !== undefined)
                        writer.writeMessage(2, this.airdrop_start_time, () => this.airdrop_start_time.serialize(writer));
                    if (this.duration_until_decay !== undefined)
                        writer.writeMessage(3, this.duration_until_decay, () => this.duration_until_decay.serialize(writer));
                    if (this.duration_of_decay !== undefined)
                        writer.writeMessage(4, this.duration_of_decay, () => this.duration_of_decay.serialize(writer));
                    if (typeof this.claims_denom === "string" && this.claims_denom.length)
                        writer.writeString(5, this.claims_denom);
                    if (this.authorized_channels !== undefined)
                        writer.writeRepeatedString(6, this.authorized_channels);
                    if (this.evm_channels !== undefined)
                        writer.writeRepeatedString(7, this.evm_channels);
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
                                message.enable_claims = reader.readBool();
                                break;
                            case 2:
                                reader.readMessage(message.airdrop_start_time, () => message.airdrop_start_time = dependency_3.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 3:
                                reader.readMessage(message.duration_until_decay, () => message.duration_until_decay = dependency_2.google.protobuf.Duration.deserialize(reader));
                                break;
                            case 4:
                                reader.readMessage(message.duration_of_decay, () => message.duration_of_decay = dependency_2.google.protobuf.Duration.deserialize(reader));
                                break;
                            case 5:
                                message.claims_denom = reader.readString();
                                break;
                            case 6:
                                pb_1.Message.addToRepeatedField(message, 6, reader.readString());
                                break;
                            case 7:
                                pb_1.Message.addToRepeatedField(message, 7, reader.readString());
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
        })(v1 = claims.v1 || (claims.v1 = {}));
    })(claims = evmos.claims || (evmos.claims = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=genesis.js.map