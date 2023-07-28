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
const dependency_2 = __importStar(require("./../../../google/protobuf/duration"));
const dependency_3 = __importStar(require("./../../../google/protobuf/timestamp"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var slashing;
    (function (slashing) {
        var v1beta1;
        (function (v1beta1) {
            class ValidatorSigningInfo extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("address" in data && data.address != undefined) {
                            this.address = data.address;
                        }
                        if ("start_height" in data && data.start_height != undefined) {
                            this.start_height = data.start_height;
                        }
                        if ("index_offset" in data && data.index_offset != undefined) {
                            this.index_offset = data.index_offset;
                        }
                        if ("jailed_until" in data && data.jailed_until != undefined) {
                            this.jailed_until = data.jailed_until;
                        }
                        if ("tombstoned" in data && data.tombstoned != undefined) {
                            this.tombstoned = data.tombstoned;
                        }
                        if ("missed_blocks_counter" in data && data.missed_blocks_counter != undefined) {
                            this.missed_blocks_counter = data.missed_blocks_counter;
                        }
                    }
                }
                get address() {
                    return pb_1.Message.getField(this, 1);
                }
                set address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get start_height() {
                    return pb_1.Message.getField(this, 2);
                }
                set start_height(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get index_offset() {
                    return pb_1.Message.getField(this, 3);
                }
                set index_offset(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get jailed_until() {
                    return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Timestamp, 4);
                }
                set jailed_until(value) {
                    pb_1.Message.setWrapperField(this, 4, value);
                }
                get tombstoned() {
                    return pb_1.Message.getField(this, 5);
                }
                set tombstoned(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get missed_blocks_counter() {
                    return pb_1.Message.getField(this, 6);
                }
                set missed_blocks_counter(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                static fromObject(data) {
                    const message = new ValidatorSigningInfo({});
                    if (data.address != null) {
                        message.address = data.address;
                    }
                    if (data.start_height != null) {
                        message.start_height = data.start_height;
                    }
                    if (data.index_offset != null) {
                        message.index_offset = data.index_offset;
                    }
                    if (data.jailed_until != null) {
                        message.jailed_until = dependency_3.google.protobuf.Timestamp.fromObject(data.jailed_until);
                    }
                    if (data.tombstoned != null) {
                        message.tombstoned = data.tombstoned;
                    }
                    if (data.missed_blocks_counter != null) {
                        message.missed_blocks_counter = data.missed_blocks_counter;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.address != null) {
                        data.address = this.address;
                    }
                    if (this.start_height != null) {
                        data.start_height = this.start_height;
                    }
                    if (this.index_offset != null) {
                        data.index_offset = this.index_offset;
                    }
                    if (this.jailed_until != null) {
                        data.jailed_until = this.jailed_until.toObject();
                    }
                    if (this.tombstoned != null) {
                        data.tombstoned = this.tombstoned;
                    }
                    if (this.missed_blocks_counter != null) {
                        data.missed_blocks_counter = this.missed_blocks_counter;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.address === "string" && this.address.length)
                        writer.writeString(1, this.address);
                    if (this.start_height !== undefined)
                        writer.writeInt64(2, this.start_height);
                    if (this.index_offset !== undefined)
                        writer.writeInt64(3, this.index_offset);
                    if (this.jailed_until !== undefined)
                        writer.writeMessage(4, this.jailed_until, () => this.jailed_until.serialize(writer));
                    if (this.tombstoned !== undefined)
                        writer.writeBool(5, this.tombstoned);
                    if (this.missed_blocks_counter !== undefined)
                        writer.writeInt64(6, this.missed_blocks_counter);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorSigningInfo();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.address = reader.readString();
                                break;
                            case 2:
                                message.start_height = reader.readInt64();
                                break;
                            case 3:
                                message.index_offset = reader.readInt64();
                                break;
                            case 4:
                                reader.readMessage(message.jailed_until, () => message.jailed_until = dependency_3.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 5:
                                message.tombstoned = reader.readBool();
                                break;
                            case 6:
                                message.missed_blocks_counter = reader.readInt64();
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
                    return ValidatorSigningInfo.deserialize(bytes);
                }
            }
            v1beta1.ValidatorSigningInfo = ValidatorSigningInfo;
            class Params extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("signed_blocks_window" in data && data.signed_blocks_window != undefined) {
                            this.signed_blocks_window = data.signed_blocks_window;
                        }
                        if ("min_signed_per_window" in data && data.min_signed_per_window != undefined) {
                            this.min_signed_per_window = data.min_signed_per_window;
                        }
                        if ("downtime_jail_duration" in data && data.downtime_jail_duration != undefined) {
                            this.downtime_jail_duration = data.downtime_jail_duration;
                        }
                        if ("slash_fraction_double_sign" in data && data.slash_fraction_double_sign != undefined) {
                            this.slash_fraction_double_sign = data.slash_fraction_double_sign;
                        }
                        if ("slash_fraction_downtime" in data && data.slash_fraction_downtime != undefined) {
                            this.slash_fraction_downtime = data.slash_fraction_downtime;
                        }
                    }
                }
                get signed_blocks_window() {
                    return pb_1.Message.getField(this, 1);
                }
                set signed_blocks_window(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get min_signed_per_window() {
                    return pb_1.Message.getField(this, 2);
                }
                set min_signed_per_window(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get downtime_jail_duration() {
                    return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Duration, 3);
                }
                set downtime_jail_duration(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                get slash_fraction_double_sign() {
                    return pb_1.Message.getField(this, 4);
                }
                set slash_fraction_double_sign(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get slash_fraction_downtime() {
                    return pb_1.Message.getField(this, 5);
                }
                set slash_fraction_downtime(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.signed_blocks_window != null) {
                        message.signed_blocks_window = data.signed_blocks_window;
                    }
                    if (data.min_signed_per_window != null) {
                        message.min_signed_per_window = data.min_signed_per_window;
                    }
                    if (data.downtime_jail_duration != null) {
                        message.downtime_jail_duration = dependency_2.google.protobuf.Duration.fromObject(data.downtime_jail_duration);
                    }
                    if (data.slash_fraction_double_sign != null) {
                        message.slash_fraction_double_sign = data.slash_fraction_double_sign;
                    }
                    if (data.slash_fraction_downtime != null) {
                        message.slash_fraction_downtime = data.slash_fraction_downtime;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.signed_blocks_window != null) {
                        data.signed_blocks_window = this.signed_blocks_window;
                    }
                    if (this.min_signed_per_window != null) {
                        data.min_signed_per_window = this.min_signed_per_window;
                    }
                    if (this.downtime_jail_duration != null) {
                        data.downtime_jail_duration = this.downtime_jail_duration.toObject();
                    }
                    if (this.slash_fraction_double_sign != null) {
                        data.slash_fraction_double_sign = this.slash_fraction_double_sign;
                    }
                    if (this.slash_fraction_downtime != null) {
                        data.slash_fraction_downtime = this.slash_fraction_downtime;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.signed_blocks_window !== undefined)
                        writer.writeInt64(1, this.signed_blocks_window);
                    if (this.min_signed_per_window !== undefined)
                        writer.writeBytes(2, this.min_signed_per_window);
                    if (this.downtime_jail_duration !== undefined)
                        writer.writeMessage(3, this.downtime_jail_duration, () => this.downtime_jail_duration.serialize(writer));
                    if (this.slash_fraction_double_sign !== undefined)
                        writer.writeBytes(4, this.slash_fraction_double_sign);
                    if (this.slash_fraction_downtime !== undefined)
                        writer.writeBytes(5, this.slash_fraction_downtime);
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
                                message.signed_blocks_window = reader.readInt64();
                                break;
                            case 2:
                                message.min_signed_per_window = reader.readBytes();
                                break;
                            case 3:
                                reader.readMessage(message.downtime_jail_duration, () => message.downtime_jail_duration = dependency_2.google.protobuf.Duration.deserialize(reader));
                                break;
                            case 4:
                                message.slash_fraction_double_sign = reader.readBytes();
                                break;
                            case 5:
                                message.slash_fraction_downtime = reader.readBytes();
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
        })(v1beta1 = slashing.v1beta1 || (slashing.v1beta1 = {}));
    })(slashing = cosmos.slashing || (cosmos.slashing = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=slashing.js.map