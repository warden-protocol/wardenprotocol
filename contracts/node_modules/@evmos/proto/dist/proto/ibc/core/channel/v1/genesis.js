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
exports.ibc = void 0;
const dependency_2 = __importStar(require("./channel"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var channel;
        (function (channel) {
            var v1;
            (function (v1) {
                class GenesisState extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 2, 3, 4, 5, 6, 7], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("channels" in data && data.channels != undefined) {
                                this.channels = data.channels;
                            }
                            if ("acknowledgements" in data && data.acknowledgements != undefined) {
                                this.acknowledgements = data.acknowledgements;
                            }
                            if ("commitments" in data && data.commitments != undefined) {
                                this.commitments = data.commitments;
                            }
                            if ("receipts" in data && data.receipts != undefined) {
                                this.receipts = data.receipts;
                            }
                            if ("send_sequences" in data && data.send_sequences != undefined) {
                                this.send_sequences = data.send_sequences;
                            }
                            if ("recv_sequences" in data && data.recv_sequences != undefined) {
                                this.recv_sequences = data.recv_sequences;
                            }
                            if ("ack_sequences" in data && data.ack_sequences != undefined) {
                                this.ack_sequences = data.ack_sequences;
                            }
                            if ("next_channel_sequence" in data && data.next_channel_sequence != undefined) {
                                this.next_channel_sequence = data.next_channel_sequence;
                            }
                        }
                    }
                    get channels() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.ibc.core.channel.v1.IdentifiedChannel, 1);
                    }
                    set channels(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get acknowledgements() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.ibc.core.channel.v1.PacketState, 2);
                    }
                    set acknowledgements(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 2, value);
                    }
                    get commitments() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.ibc.core.channel.v1.PacketState, 3);
                    }
                    set commitments(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 3, value);
                    }
                    get receipts() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.ibc.core.channel.v1.PacketState, 4);
                    }
                    set receipts(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 4, value);
                    }
                    get send_sequences() {
                        return pb_1.Message.getRepeatedWrapperField(this, PacketSequence, 5);
                    }
                    set send_sequences(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 5, value);
                    }
                    get recv_sequences() {
                        return pb_1.Message.getRepeatedWrapperField(this, PacketSequence, 6);
                    }
                    set recv_sequences(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 6, value);
                    }
                    get ack_sequences() {
                        return pb_1.Message.getRepeatedWrapperField(this, PacketSequence, 7);
                    }
                    set ack_sequences(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 7, value);
                    }
                    get next_channel_sequence() {
                        return pb_1.Message.getField(this, 8);
                    }
                    set next_channel_sequence(value) {
                        pb_1.Message.setField(this, 8, value);
                    }
                    static fromObject(data) {
                        const message = new GenesisState({});
                        if (data.channels != null) {
                            message.channels = data.channels.map(item => dependency_2.ibc.core.channel.v1.IdentifiedChannel.fromObject(item));
                        }
                        if (data.acknowledgements != null) {
                            message.acknowledgements = data.acknowledgements.map(item => dependency_2.ibc.core.channel.v1.PacketState.fromObject(item));
                        }
                        if (data.commitments != null) {
                            message.commitments = data.commitments.map(item => dependency_2.ibc.core.channel.v1.PacketState.fromObject(item));
                        }
                        if (data.receipts != null) {
                            message.receipts = data.receipts.map(item => dependency_2.ibc.core.channel.v1.PacketState.fromObject(item));
                        }
                        if (data.send_sequences != null) {
                            message.send_sequences = data.send_sequences.map(item => PacketSequence.fromObject(item));
                        }
                        if (data.recv_sequences != null) {
                            message.recv_sequences = data.recv_sequences.map(item => PacketSequence.fromObject(item));
                        }
                        if (data.ack_sequences != null) {
                            message.ack_sequences = data.ack_sequences.map(item => PacketSequence.fromObject(item));
                        }
                        if (data.next_channel_sequence != null) {
                            message.next_channel_sequence = data.next_channel_sequence;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.channels != null) {
                            data.channels = this.channels.map((item) => item.toObject());
                        }
                        if (this.acknowledgements != null) {
                            data.acknowledgements = this.acknowledgements.map((item) => item.toObject());
                        }
                        if (this.commitments != null) {
                            data.commitments = this.commitments.map((item) => item.toObject());
                        }
                        if (this.receipts != null) {
                            data.receipts = this.receipts.map((item) => item.toObject());
                        }
                        if (this.send_sequences != null) {
                            data.send_sequences = this.send_sequences.map((item) => item.toObject());
                        }
                        if (this.recv_sequences != null) {
                            data.recv_sequences = this.recv_sequences.map((item) => item.toObject());
                        }
                        if (this.ack_sequences != null) {
                            data.ack_sequences = this.ack_sequences.map((item) => item.toObject());
                        }
                        if (this.next_channel_sequence != null) {
                            data.next_channel_sequence = this.next_channel_sequence;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.channels !== undefined)
                            writer.writeRepeatedMessage(1, this.channels, (item) => item.serialize(writer));
                        if (this.acknowledgements !== undefined)
                            writer.writeRepeatedMessage(2, this.acknowledgements, (item) => item.serialize(writer));
                        if (this.commitments !== undefined)
                            writer.writeRepeatedMessage(3, this.commitments, (item) => item.serialize(writer));
                        if (this.receipts !== undefined)
                            writer.writeRepeatedMessage(4, this.receipts, (item) => item.serialize(writer));
                        if (this.send_sequences !== undefined)
                            writer.writeRepeatedMessage(5, this.send_sequences, (item) => item.serialize(writer));
                        if (this.recv_sequences !== undefined)
                            writer.writeRepeatedMessage(6, this.recv_sequences, (item) => item.serialize(writer));
                        if (this.ack_sequences !== undefined)
                            writer.writeRepeatedMessage(7, this.ack_sequences, (item) => item.serialize(writer));
                        if (this.next_channel_sequence !== undefined)
                            writer.writeUint64(8, this.next_channel_sequence);
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
                                    reader.readMessage(message.channels, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_2.ibc.core.channel.v1.IdentifiedChannel.deserialize(reader), dependency_2.ibc.core.channel.v1.IdentifiedChannel));
                                    break;
                                case 2:
                                    reader.readMessage(message.acknowledgements, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_2.ibc.core.channel.v1.PacketState.deserialize(reader), dependency_2.ibc.core.channel.v1.PacketState));
                                    break;
                                case 3:
                                    reader.readMessage(message.commitments, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_2.ibc.core.channel.v1.PacketState.deserialize(reader), dependency_2.ibc.core.channel.v1.PacketState));
                                    break;
                                case 4:
                                    reader.readMessage(message.receipts, () => pb_1.Message.addToRepeatedWrapperField(message, 4, dependency_2.ibc.core.channel.v1.PacketState.deserialize(reader), dependency_2.ibc.core.channel.v1.PacketState));
                                    break;
                                case 5:
                                    reader.readMessage(message.send_sequences, () => pb_1.Message.addToRepeatedWrapperField(message, 5, PacketSequence.deserialize(reader), PacketSequence));
                                    break;
                                case 6:
                                    reader.readMessage(message.recv_sequences, () => pb_1.Message.addToRepeatedWrapperField(message, 6, PacketSequence.deserialize(reader), PacketSequence));
                                    break;
                                case 7:
                                    reader.readMessage(message.ack_sequences, () => pb_1.Message.addToRepeatedWrapperField(message, 7, PacketSequence.deserialize(reader), PacketSequence));
                                    break;
                                case 8:
                                    message.next_channel_sequence = reader.readUint64();
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
                class PacketSequence extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("port_id" in data && data.port_id != undefined) {
                                this.port_id = data.port_id;
                            }
                            if ("channel_id" in data && data.channel_id != undefined) {
                                this.channel_id = data.channel_id;
                            }
                            if ("sequence" in data && data.sequence != undefined) {
                                this.sequence = data.sequence;
                            }
                        }
                    }
                    get port_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set port_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get channel_id() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set channel_id(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get sequence() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set sequence(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new PacketSequence({});
                        if (data.port_id != null) {
                            message.port_id = data.port_id;
                        }
                        if (data.channel_id != null) {
                            message.channel_id = data.channel_id;
                        }
                        if (data.sequence != null) {
                            message.sequence = data.sequence;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.port_id != null) {
                            data.port_id = this.port_id;
                        }
                        if (this.channel_id != null) {
                            data.channel_id = this.channel_id;
                        }
                        if (this.sequence != null) {
                            data.sequence = this.sequence;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.port_id === "string" && this.port_id.length)
                            writer.writeString(1, this.port_id);
                        if (typeof this.channel_id === "string" && this.channel_id.length)
                            writer.writeString(2, this.channel_id);
                        if (this.sequence !== undefined)
                            writer.writeUint64(3, this.sequence);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PacketSequence();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.port_id = reader.readString();
                                    break;
                                case 2:
                                    message.channel_id = reader.readString();
                                    break;
                                case 3:
                                    message.sequence = reader.readUint64();
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
                        return PacketSequence.deserialize(bytes);
                    }
                }
                v1.PacketSequence = PacketSequence;
            })(v1 = channel.v1 || (channel.v1 = {}));
        })(channel = core.channel || (core.channel = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=genesis.js.map