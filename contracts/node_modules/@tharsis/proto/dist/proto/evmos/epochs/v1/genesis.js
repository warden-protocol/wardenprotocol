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
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var epochs;
    (function (epochs) {
        var v1;
        (function (v1) {
            class EpochInfo extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("identifier" in data && data.identifier != undefined) {
                            this.identifier = data.identifier;
                        }
                        if ("start_time" in data && data.start_time != undefined) {
                            this.start_time = data.start_time;
                        }
                        if ("duration" in data && data.duration != undefined) {
                            this.duration = data.duration;
                        }
                        if ("current_epoch" in data && data.current_epoch != undefined) {
                            this.current_epoch = data.current_epoch;
                        }
                        if ("current_epoch_start_time" in data && data.current_epoch_start_time != undefined) {
                            this.current_epoch_start_time = data.current_epoch_start_time;
                        }
                        if ("epoch_counting_started" in data && data.epoch_counting_started != undefined) {
                            this.epoch_counting_started = data.epoch_counting_started;
                        }
                        if ("current_epoch_start_height" in data && data.current_epoch_start_height != undefined) {
                            this.current_epoch_start_height = data.current_epoch_start_height;
                        }
                    }
                }
                get identifier() {
                    return pb_1.Message.getField(this, 1);
                }
                set identifier(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get start_time() {
                    return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Timestamp, 2);
                }
                set start_time(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get duration() {
                    return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Duration, 3);
                }
                set duration(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                get current_epoch() {
                    return pb_1.Message.getField(this, 4);
                }
                set current_epoch(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get current_epoch_start_time() {
                    return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Timestamp, 5);
                }
                set current_epoch_start_time(value) {
                    pb_1.Message.setWrapperField(this, 5, value);
                }
                get epoch_counting_started() {
                    return pb_1.Message.getField(this, 6);
                }
                set epoch_counting_started(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                get current_epoch_start_height() {
                    return pb_1.Message.getField(this, 7);
                }
                set current_epoch_start_height(value) {
                    pb_1.Message.setField(this, 7, value);
                }
                static fromObject(data) {
                    const message = new EpochInfo({});
                    if (data.identifier != null) {
                        message.identifier = data.identifier;
                    }
                    if (data.start_time != null) {
                        message.start_time = dependency_3.google.protobuf.Timestamp.fromObject(data.start_time);
                    }
                    if (data.duration != null) {
                        message.duration = dependency_2.google.protobuf.Duration.fromObject(data.duration);
                    }
                    if (data.current_epoch != null) {
                        message.current_epoch = data.current_epoch;
                    }
                    if (data.current_epoch_start_time != null) {
                        message.current_epoch_start_time = dependency_3.google.protobuf.Timestamp.fromObject(data.current_epoch_start_time);
                    }
                    if (data.epoch_counting_started != null) {
                        message.epoch_counting_started = data.epoch_counting_started;
                    }
                    if (data.current_epoch_start_height != null) {
                        message.current_epoch_start_height = data.current_epoch_start_height;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.identifier != null) {
                        data.identifier = this.identifier;
                    }
                    if (this.start_time != null) {
                        data.start_time = this.start_time.toObject();
                    }
                    if (this.duration != null) {
                        data.duration = this.duration.toObject();
                    }
                    if (this.current_epoch != null) {
                        data.current_epoch = this.current_epoch;
                    }
                    if (this.current_epoch_start_time != null) {
                        data.current_epoch_start_time = this.current_epoch_start_time.toObject();
                    }
                    if (this.epoch_counting_started != null) {
                        data.epoch_counting_started = this.epoch_counting_started;
                    }
                    if (this.current_epoch_start_height != null) {
                        data.current_epoch_start_height = this.current_epoch_start_height;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.identifier === "string" && this.identifier.length)
                        writer.writeString(1, this.identifier);
                    if (this.start_time !== undefined)
                        writer.writeMessage(2, this.start_time, () => this.start_time.serialize(writer));
                    if (this.duration !== undefined)
                        writer.writeMessage(3, this.duration, () => this.duration.serialize(writer));
                    if (this.current_epoch !== undefined)
                        writer.writeInt64(4, this.current_epoch);
                    if (this.current_epoch_start_time !== undefined)
                        writer.writeMessage(5, this.current_epoch_start_time, () => this.current_epoch_start_time.serialize(writer));
                    if (this.epoch_counting_started !== undefined)
                        writer.writeBool(6, this.epoch_counting_started);
                    if (this.current_epoch_start_height !== undefined)
                        writer.writeInt64(7, this.current_epoch_start_height);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EpochInfo();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.identifier = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.start_time, () => message.start_time = dependency_3.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 3:
                                reader.readMessage(message.duration, () => message.duration = dependency_2.google.protobuf.Duration.deserialize(reader));
                                break;
                            case 4:
                                message.current_epoch = reader.readInt64();
                                break;
                            case 5:
                                reader.readMessage(message.current_epoch_start_time, () => message.current_epoch_start_time = dependency_3.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 6:
                                message.epoch_counting_started = reader.readBool();
                                break;
                            case 7:
                                message.current_epoch_start_height = reader.readInt64();
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
                    return EpochInfo.deserialize(bytes);
                }
            }
            v1.EpochInfo = EpochInfo;
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("epochs" in data && data.epochs != undefined) {
                            this.epochs = data.epochs;
                        }
                    }
                }
                get epochs() {
                    return pb_1.Message.getRepeatedWrapperField(this, EpochInfo, 1);
                }
                set epochs(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.epochs != null) {
                        message.epochs = data.epochs.map(item => EpochInfo.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.epochs != null) {
                        data.epochs = this.epochs.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.epochs !== undefined)
                        writer.writeRepeatedMessage(1, this.epochs, (item) => item.serialize(writer));
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
                                reader.readMessage(message.epochs, () => pb_1.Message.addToRepeatedWrapperField(message, 1, EpochInfo.deserialize(reader), EpochInfo));
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
        })(v1 = epochs.v1 || (epochs.v1 = {}));
    })(epochs = evmos.epochs || (evmos.epochs = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=genesis.js.map