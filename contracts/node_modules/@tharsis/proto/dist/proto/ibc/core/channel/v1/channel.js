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
const dependency_2 = __importStar(require("./../../client/v1/client"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var channel;
        (function (channel) {
            var v1;
            (function (v1) {
                let State;
                (function (State) {
                    State[State["STATE_UNINITIALIZED_UNSPECIFIED"] = 0] = "STATE_UNINITIALIZED_UNSPECIFIED";
                    State[State["STATE_INIT"] = 1] = "STATE_INIT";
                    State[State["STATE_TRYOPEN"] = 2] = "STATE_TRYOPEN";
                    State[State["STATE_OPEN"] = 3] = "STATE_OPEN";
                    State[State["STATE_CLOSED"] = 4] = "STATE_CLOSED";
                })(State = v1.State || (v1.State = {}));
                let Order;
                (function (Order) {
                    Order[Order["ORDER_NONE_UNSPECIFIED"] = 0] = "ORDER_NONE_UNSPECIFIED";
                    Order[Order["ORDER_UNORDERED"] = 1] = "ORDER_UNORDERED";
                    Order[Order["ORDER_ORDERED"] = 2] = "ORDER_ORDERED";
                })(Order = v1.Order || (v1.Order = {}));
                class Channel extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("state" in data && data.state != undefined) {
                                this.state = data.state;
                            }
                            if ("ordering" in data && data.ordering != undefined) {
                                this.ordering = data.ordering;
                            }
                            if ("counterparty" in data && data.counterparty != undefined) {
                                this.counterparty = data.counterparty;
                            }
                            if ("connection_hops" in data && data.connection_hops != undefined) {
                                this.connection_hops = data.connection_hops;
                            }
                            if ("version" in data && data.version != undefined) {
                                this.version = data.version;
                            }
                        }
                    }
                    get state() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set state(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get ordering() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set ordering(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get counterparty() {
                        return pb_1.Message.getWrapperField(this, Counterparty, 3);
                    }
                    set counterparty(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get connection_hops() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set connection_hops(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get version() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set version(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    static fromObject(data) {
                        const message = new Channel({});
                        if (data.state != null) {
                            message.state = data.state;
                        }
                        if (data.ordering != null) {
                            message.ordering = data.ordering;
                        }
                        if (data.counterparty != null) {
                            message.counterparty = Counterparty.fromObject(data.counterparty);
                        }
                        if (data.connection_hops != null) {
                            message.connection_hops = data.connection_hops;
                        }
                        if (data.version != null) {
                            message.version = data.version;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.state != null) {
                            data.state = this.state;
                        }
                        if (this.ordering != null) {
                            data.ordering = this.ordering;
                        }
                        if (this.counterparty != null) {
                            data.counterparty = this.counterparty.toObject();
                        }
                        if (this.connection_hops != null) {
                            data.connection_hops = this.connection_hops;
                        }
                        if (this.version != null) {
                            data.version = this.version;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.state !== undefined)
                            writer.writeEnum(1, this.state);
                        if (this.ordering !== undefined)
                            writer.writeEnum(2, this.ordering);
                        if (this.counterparty !== undefined)
                            writer.writeMessage(3, this.counterparty, () => this.counterparty.serialize(writer));
                        if (this.connection_hops !== undefined)
                            writer.writeRepeatedString(4, this.connection_hops);
                        if (typeof this.version === "string" && this.version.length)
                            writer.writeString(5, this.version);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Channel();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.state = reader.readEnum();
                                    break;
                                case 2:
                                    message.ordering = reader.readEnum();
                                    break;
                                case 3:
                                    reader.readMessage(message.counterparty, () => message.counterparty = Counterparty.deserialize(reader));
                                    break;
                                case 4:
                                    pb_1.Message.addToRepeatedField(message, 4, reader.readString());
                                    break;
                                case 5:
                                    message.version = reader.readString();
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
                        return Channel.deserialize(bytes);
                    }
                }
                v1.Channel = Channel;
                class IdentifiedChannel extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("state" in data && data.state != undefined) {
                                this.state = data.state;
                            }
                            if ("ordering" in data && data.ordering != undefined) {
                                this.ordering = data.ordering;
                            }
                            if ("counterparty" in data && data.counterparty != undefined) {
                                this.counterparty = data.counterparty;
                            }
                            if ("connection_hops" in data && data.connection_hops != undefined) {
                                this.connection_hops = data.connection_hops;
                            }
                            if ("version" in data && data.version != undefined) {
                                this.version = data.version;
                            }
                            if ("port_id" in data && data.port_id != undefined) {
                                this.port_id = data.port_id;
                            }
                            if ("channel_id" in data && data.channel_id != undefined) {
                                this.channel_id = data.channel_id;
                            }
                        }
                    }
                    get state() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set state(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get ordering() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set ordering(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get counterparty() {
                        return pb_1.Message.getWrapperField(this, Counterparty, 3);
                    }
                    set counterparty(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get connection_hops() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set connection_hops(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get version() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set version(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    get port_id() {
                        return pb_1.Message.getField(this, 6);
                    }
                    set port_id(value) {
                        pb_1.Message.setField(this, 6, value);
                    }
                    get channel_id() {
                        return pb_1.Message.getField(this, 7);
                    }
                    set channel_id(value) {
                        pb_1.Message.setField(this, 7, value);
                    }
                    static fromObject(data) {
                        const message = new IdentifiedChannel({});
                        if (data.state != null) {
                            message.state = data.state;
                        }
                        if (data.ordering != null) {
                            message.ordering = data.ordering;
                        }
                        if (data.counterparty != null) {
                            message.counterparty = Counterparty.fromObject(data.counterparty);
                        }
                        if (data.connection_hops != null) {
                            message.connection_hops = data.connection_hops;
                        }
                        if (data.version != null) {
                            message.version = data.version;
                        }
                        if (data.port_id != null) {
                            message.port_id = data.port_id;
                        }
                        if (data.channel_id != null) {
                            message.channel_id = data.channel_id;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.state != null) {
                            data.state = this.state;
                        }
                        if (this.ordering != null) {
                            data.ordering = this.ordering;
                        }
                        if (this.counterparty != null) {
                            data.counterparty = this.counterparty.toObject();
                        }
                        if (this.connection_hops != null) {
                            data.connection_hops = this.connection_hops;
                        }
                        if (this.version != null) {
                            data.version = this.version;
                        }
                        if (this.port_id != null) {
                            data.port_id = this.port_id;
                        }
                        if (this.channel_id != null) {
                            data.channel_id = this.channel_id;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.state !== undefined)
                            writer.writeEnum(1, this.state);
                        if (this.ordering !== undefined)
                            writer.writeEnum(2, this.ordering);
                        if (this.counterparty !== undefined)
                            writer.writeMessage(3, this.counterparty, () => this.counterparty.serialize(writer));
                        if (this.connection_hops !== undefined)
                            writer.writeRepeatedString(4, this.connection_hops);
                        if (typeof this.version === "string" && this.version.length)
                            writer.writeString(5, this.version);
                        if (typeof this.port_id === "string" && this.port_id.length)
                            writer.writeString(6, this.port_id);
                        if (typeof this.channel_id === "string" && this.channel_id.length)
                            writer.writeString(7, this.channel_id);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IdentifiedChannel();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.state = reader.readEnum();
                                    break;
                                case 2:
                                    message.ordering = reader.readEnum();
                                    break;
                                case 3:
                                    reader.readMessage(message.counterparty, () => message.counterparty = Counterparty.deserialize(reader));
                                    break;
                                case 4:
                                    pb_1.Message.addToRepeatedField(message, 4, reader.readString());
                                    break;
                                case 5:
                                    message.version = reader.readString();
                                    break;
                                case 6:
                                    message.port_id = reader.readString();
                                    break;
                                case 7:
                                    message.channel_id = reader.readString();
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
                        return IdentifiedChannel.deserialize(bytes);
                    }
                }
                v1.IdentifiedChannel = IdentifiedChannel;
                class Counterparty extends pb_1.Message {
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
                    static fromObject(data) {
                        const message = new Counterparty({});
                        if (data.port_id != null) {
                            message.port_id = data.port_id;
                        }
                        if (data.channel_id != null) {
                            message.channel_id = data.channel_id;
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
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.port_id === "string" && this.port_id.length)
                            writer.writeString(1, this.port_id);
                        if (typeof this.channel_id === "string" && this.channel_id.length)
                            writer.writeString(2, this.channel_id);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Counterparty();
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
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return Counterparty.deserialize(bytes);
                    }
                }
                v1.Counterparty = Counterparty;
                class Packet extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("sequence" in data && data.sequence != undefined) {
                                this.sequence = data.sequence;
                            }
                            if ("source_port" in data && data.source_port != undefined) {
                                this.source_port = data.source_port;
                            }
                            if ("source_channel" in data && data.source_channel != undefined) {
                                this.source_channel = data.source_channel;
                            }
                            if ("destination_port" in data && data.destination_port != undefined) {
                                this.destination_port = data.destination_port;
                            }
                            if ("destination_channel" in data && data.destination_channel != undefined) {
                                this.destination_channel = data.destination_channel;
                            }
                            if ("data" in data && data.data != undefined) {
                                this.data = data.data;
                            }
                            if ("timeout_height" in data && data.timeout_height != undefined) {
                                this.timeout_height = data.timeout_height;
                            }
                            if ("timeout_timestamp" in data && data.timeout_timestamp != undefined) {
                                this.timeout_timestamp = data.timeout_timestamp;
                            }
                        }
                    }
                    get sequence() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set sequence(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get source_port() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set source_port(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get source_channel() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set source_channel(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get destination_port() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set destination_port(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get destination_channel() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set destination_channel(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    get data() {
                        return pb_1.Message.getField(this, 6);
                    }
                    set data(value) {
                        pb_1.Message.setField(this, 6, value);
                    }
                    get timeout_height() {
                        return pb_1.Message.getWrapperField(this, dependency_2.ibc.core.client.v1.Height, 7);
                    }
                    set timeout_height(value) {
                        pb_1.Message.setWrapperField(this, 7, value);
                    }
                    get timeout_timestamp() {
                        return pb_1.Message.getField(this, 8);
                    }
                    set timeout_timestamp(value) {
                        pb_1.Message.setField(this, 8, value);
                    }
                    static fromObject(data) {
                        const message = new Packet({});
                        if (data.sequence != null) {
                            message.sequence = data.sequence;
                        }
                        if (data.source_port != null) {
                            message.source_port = data.source_port;
                        }
                        if (data.source_channel != null) {
                            message.source_channel = data.source_channel;
                        }
                        if (data.destination_port != null) {
                            message.destination_port = data.destination_port;
                        }
                        if (data.destination_channel != null) {
                            message.destination_channel = data.destination_channel;
                        }
                        if (data.data != null) {
                            message.data = data.data;
                        }
                        if (data.timeout_height != null) {
                            message.timeout_height = dependency_2.ibc.core.client.v1.Height.fromObject(data.timeout_height);
                        }
                        if (data.timeout_timestamp != null) {
                            message.timeout_timestamp = data.timeout_timestamp;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.sequence != null) {
                            data.sequence = this.sequence;
                        }
                        if (this.source_port != null) {
                            data.source_port = this.source_port;
                        }
                        if (this.source_channel != null) {
                            data.source_channel = this.source_channel;
                        }
                        if (this.destination_port != null) {
                            data.destination_port = this.destination_port;
                        }
                        if (this.destination_channel != null) {
                            data.destination_channel = this.destination_channel;
                        }
                        if (this.data != null) {
                            data.data = this.data;
                        }
                        if (this.timeout_height != null) {
                            data.timeout_height = this.timeout_height.toObject();
                        }
                        if (this.timeout_timestamp != null) {
                            data.timeout_timestamp = this.timeout_timestamp;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.sequence !== undefined)
                            writer.writeUint64(1, this.sequence);
                        if (typeof this.source_port === "string" && this.source_port.length)
                            writer.writeString(2, this.source_port);
                        if (typeof this.source_channel === "string" && this.source_channel.length)
                            writer.writeString(3, this.source_channel);
                        if (typeof this.destination_port === "string" && this.destination_port.length)
                            writer.writeString(4, this.destination_port);
                        if (typeof this.destination_channel === "string" && this.destination_channel.length)
                            writer.writeString(5, this.destination_channel);
                        if (this.data !== undefined)
                            writer.writeBytes(6, this.data);
                        if (this.timeout_height !== undefined)
                            writer.writeMessage(7, this.timeout_height, () => this.timeout_height.serialize(writer));
                        if (this.timeout_timestamp !== undefined)
                            writer.writeUint64(8, this.timeout_timestamp);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Packet();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.sequence = reader.readUint64();
                                    break;
                                case 2:
                                    message.source_port = reader.readString();
                                    break;
                                case 3:
                                    message.source_channel = reader.readString();
                                    break;
                                case 4:
                                    message.destination_port = reader.readString();
                                    break;
                                case 5:
                                    message.destination_channel = reader.readString();
                                    break;
                                case 6:
                                    message.data = reader.readBytes();
                                    break;
                                case 7:
                                    reader.readMessage(message.timeout_height, () => message.timeout_height = dependency_2.ibc.core.client.v1.Height.deserialize(reader));
                                    break;
                                case 8:
                                    message.timeout_timestamp = reader.readUint64();
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
                        return Packet.deserialize(bytes);
                    }
                }
                v1.Packet = Packet;
                class PacketState extends pb_1.Message {
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
                            if ("data" in data && data.data != undefined) {
                                this.data = data.data;
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
                    get data() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set data(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new PacketState({});
                        if (data.port_id != null) {
                            message.port_id = data.port_id;
                        }
                        if (data.channel_id != null) {
                            message.channel_id = data.channel_id;
                        }
                        if (data.sequence != null) {
                            message.sequence = data.sequence;
                        }
                        if (data.data != null) {
                            message.data = data.data;
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
                        if (this.data != null) {
                            data.data = this.data;
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
                        if (this.data !== undefined)
                            writer.writeBytes(4, this.data);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PacketState();
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
                                case 4:
                                    message.data = reader.readBytes();
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
                        return PacketState.deserialize(bytes);
                    }
                }
                v1.PacketState = PacketState;
                class Acknowledgement extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[21, 22]]);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("result" in data && data.result != undefined) {
                                this.result = data.result;
                            }
                            if ("error" in data && data.error != undefined) {
                                this.error = data.error;
                            }
                        }
                    }
                    get result() {
                        return pb_1.Message.getField(this, 21);
                    }
                    set result(value) {
                        pb_1.Message.setOneofField(this, 21, [21, 22], value);
                    }
                    get error() {
                        return pb_1.Message.getField(this, 22);
                    }
                    set error(value) {
                        pb_1.Message.setOneofField(this, 22, [21, 22], value);
                    }
                    get response() {
                        const cases = {
                            0: "none",
                            21: "result",
                            22: "error"
                        };
                        return cases[pb_1.Message.computeOneofCase(this, [21, 22])];
                    }
                    static fromObject(data) {
                        const message = new Acknowledgement({});
                        if (data.result != null) {
                            message.result = data.result;
                        }
                        if (data.error != null) {
                            message.error = data.error;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.result != null) {
                            data.result = this.result;
                        }
                        if (this.error != null) {
                            data.error = this.error;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.result !== undefined)
                            writer.writeBytes(21, this.result);
                        if (typeof this.error === "string" && this.error.length)
                            writer.writeString(22, this.error);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Acknowledgement();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 21:
                                    message.result = reader.readBytes();
                                    break;
                                case 22:
                                    message.error = reader.readString();
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
                        return Acknowledgement.deserialize(bytes);
                    }
                }
                v1.Acknowledgement = Acknowledgement;
            })(v1 = channel.v1 || (channel.v1 = {}));
        })(channel = core.channel || (core.channel = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=channel.js.map