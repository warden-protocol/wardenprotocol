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
exports.tendermint = void 0;
const pb_1 = __importStar(require("google-protobuf"));
var tendermint;
(function (tendermint) {
    var p2p;
    (function (p2p) {
        class NetAddress extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("id" in data && data.id != undefined) {
                        this.id = data.id;
                    }
                    if ("ip" in data && data.ip != undefined) {
                        this.ip = data.ip;
                    }
                    if ("port" in data && data.port != undefined) {
                        this.port = data.port;
                    }
                }
            }
            get id() {
                return pb_1.Message.getField(this, 1);
            }
            set id(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get ip() {
                return pb_1.Message.getField(this, 2);
            }
            set ip(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get port() {
                return pb_1.Message.getField(this, 3);
            }
            set port(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new NetAddress({});
                if (data.id != null) {
                    message.id = data.id;
                }
                if (data.ip != null) {
                    message.ip = data.ip;
                }
                if (data.port != null) {
                    message.port = data.port;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.id != null) {
                    data.id = this.id;
                }
                if (this.ip != null) {
                    data.ip = this.ip;
                }
                if (this.port != null) {
                    data.port = this.port;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.id === "string" && this.id.length)
                    writer.writeString(1, this.id);
                if (typeof this.ip === "string" && this.ip.length)
                    writer.writeString(2, this.ip);
                if (this.port !== undefined)
                    writer.writeUint32(3, this.port);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NetAddress();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.id = reader.readString();
                            break;
                        case 2:
                            message.ip = reader.readString();
                            break;
                        case 3:
                            message.port = reader.readUint32();
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
                return NetAddress.deserialize(bytes);
            }
        }
        p2p.NetAddress = NetAddress;
        class ProtocolVersion extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("p2p" in data && data.p2p != undefined) {
                        this.p2p = data.p2p;
                    }
                    if ("block" in data && data.block != undefined) {
                        this.block = data.block;
                    }
                    if ("app" in data && data.app != undefined) {
                        this.app = data.app;
                    }
                }
            }
            get p2p() {
                return pb_1.Message.getField(this, 1);
            }
            set p2p(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get block() {
                return pb_1.Message.getField(this, 2);
            }
            set block(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get app() {
                return pb_1.Message.getField(this, 3);
            }
            set app(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new ProtocolVersion({});
                if (data.p2p != null) {
                    message.p2p = data.p2p;
                }
                if (data.block != null) {
                    message.block = data.block;
                }
                if (data.app != null) {
                    message.app = data.app;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.p2p != null) {
                    data.p2p = this.p2p;
                }
                if (this.block != null) {
                    data.block = this.block;
                }
                if (this.app != null) {
                    data.app = this.app;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.p2p !== undefined)
                    writer.writeUint64(1, this.p2p);
                if (this.block !== undefined)
                    writer.writeUint64(2, this.block);
                if (this.app !== undefined)
                    writer.writeUint64(3, this.app);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProtocolVersion();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.p2p = reader.readUint64();
                            break;
                        case 2:
                            message.block = reader.readUint64();
                            break;
                        case 3:
                            message.app = reader.readUint64();
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
                return ProtocolVersion.deserialize(bytes);
            }
        }
        p2p.ProtocolVersion = ProtocolVersion;
        class DefaultNodeInfo extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("protocol_version" in data && data.protocol_version != undefined) {
                        this.protocol_version = data.protocol_version;
                    }
                    if ("default_node_id" in data && data.default_node_id != undefined) {
                        this.default_node_id = data.default_node_id;
                    }
                    if ("listen_addr" in data && data.listen_addr != undefined) {
                        this.listen_addr = data.listen_addr;
                    }
                    if ("network" in data && data.network != undefined) {
                        this.network = data.network;
                    }
                    if ("version" in data && data.version != undefined) {
                        this.version = data.version;
                    }
                    if ("channels" in data && data.channels != undefined) {
                        this.channels = data.channels;
                    }
                    if ("moniker" in data && data.moniker != undefined) {
                        this.moniker = data.moniker;
                    }
                    if ("other" in data && data.other != undefined) {
                        this.other = data.other;
                    }
                }
            }
            get protocol_version() {
                return pb_1.Message.getWrapperField(this, ProtocolVersion, 1);
            }
            set protocol_version(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get default_node_id() {
                return pb_1.Message.getField(this, 2);
            }
            set default_node_id(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get listen_addr() {
                return pb_1.Message.getField(this, 3);
            }
            set listen_addr(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get network() {
                return pb_1.Message.getField(this, 4);
            }
            set network(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get version() {
                return pb_1.Message.getField(this, 5);
            }
            set version(value) {
                pb_1.Message.setField(this, 5, value);
            }
            get channels() {
                return pb_1.Message.getField(this, 6);
            }
            set channels(value) {
                pb_1.Message.setField(this, 6, value);
            }
            get moniker() {
                return pb_1.Message.getField(this, 7);
            }
            set moniker(value) {
                pb_1.Message.setField(this, 7, value);
            }
            get other() {
                return pb_1.Message.getWrapperField(this, DefaultNodeInfoOther, 8);
            }
            set other(value) {
                pb_1.Message.setWrapperField(this, 8, value);
            }
            static fromObject(data) {
                const message = new DefaultNodeInfo({});
                if (data.protocol_version != null) {
                    message.protocol_version = ProtocolVersion.fromObject(data.protocol_version);
                }
                if (data.default_node_id != null) {
                    message.default_node_id = data.default_node_id;
                }
                if (data.listen_addr != null) {
                    message.listen_addr = data.listen_addr;
                }
                if (data.network != null) {
                    message.network = data.network;
                }
                if (data.version != null) {
                    message.version = data.version;
                }
                if (data.channels != null) {
                    message.channels = data.channels;
                }
                if (data.moniker != null) {
                    message.moniker = data.moniker;
                }
                if (data.other != null) {
                    message.other = DefaultNodeInfoOther.fromObject(data.other);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.protocol_version != null) {
                    data.protocol_version = this.protocol_version.toObject();
                }
                if (this.default_node_id != null) {
                    data.default_node_id = this.default_node_id;
                }
                if (this.listen_addr != null) {
                    data.listen_addr = this.listen_addr;
                }
                if (this.network != null) {
                    data.network = this.network;
                }
                if (this.version != null) {
                    data.version = this.version;
                }
                if (this.channels != null) {
                    data.channels = this.channels;
                }
                if (this.moniker != null) {
                    data.moniker = this.moniker;
                }
                if (this.other != null) {
                    data.other = this.other.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.protocol_version !== undefined)
                    writer.writeMessage(1, this.protocol_version, () => this.protocol_version.serialize(writer));
                if (typeof this.default_node_id === "string" && this.default_node_id.length)
                    writer.writeString(2, this.default_node_id);
                if (typeof this.listen_addr === "string" && this.listen_addr.length)
                    writer.writeString(3, this.listen_addr);
                if (typeof this.network === "string" && this.network.length)
                    writer.writeString(4, this.network);
                if (typeof this.version === "string" && this.version.length)
                    writer.writeString(5, this.version);
                if (this.channels !== undefined)
                    writer.writeBytes(6, this.channels);
                if (typeof this.moniker === "string" && this.moniker.length)
                    writer.writeString(7, this.moniker);
                if (this.other !== undefined)
                    writer.writeMessage(8, this.other, () => this.other.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DefaultNodeInfo();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.protocol_version, () => message.protocol_version = ProtocolVersion.deserialize(reader));
                            break;
                        case 2:
                            message.default_node_id = reader.readString();
                            break;
                        case 3:
                            message.listen_addr = reader.readString();
                            break;
                        case 4:
                            message.network = reader.readString();
                            break;
                        case 5:
                            message.version = reader.readString();
                            break;
                        case 6:
                            message.channels = reader.readBytes();
                            break;
                        case 7:
                            message.moniker = reader.readString();
                            break;
                        case 8:
                            reader.readMessage(message.other, () => message.other = DefaultNodeInfoOther.deserialize(reader));
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
                return DefaultNodeInfo.deserialize(bytes);
            }
        }
        p2p.DefaultNodeInfo = DefaultNodeInfo;
        class DefaultNodeInfoOther extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("tx_index" in data && data.tx_index != undefined) {
                        this.tx_index = data.tx_index;
                    }
                    if ("rpc_address" in data && data.rpc_address != undefined) {
                        this.rpc_address = data.rpc_address;
                    }
                }
            }
            get tx_index() {
                return pb_1.Message.getField(this, 1);
            }
            set tx_index(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get rpc_address() {
                return pb_1.Message.getField(this, 2);
            }
            set rpc_address(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new DefaultNodeInfoOther({});
                if (data.tx_index != null) {
                    message.tx_index = data.tx_index;
                }
                if (data.rpc_address != null) {
                    message.rpc_address = data.rpc_address;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.tx_index != null) {
                    data.tx_index = this.tx_index;
                }
                if (this.rpc_address != null) {
                    data.rpc_address = this.rpc_address;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.tx_index === "string" && this.tx_index.length)
                    writer.writeString(1, this.tx_index);
                if (typeof this.rpc_address === "string" && this.rpc_address.length)
                    writer.writeString(2, this.rpc_address);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DefaultNodeInfoOther();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.tx_index = reader.readString();
                            break;
                        case 2:
                            message.rpc_address = reader.readString();
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
                return DefaultNodeInfoOther.deserialize(bytes);
            }
        }
        p2p.DefaultNodeInfoOther = DefaultNodeInfoOther;
    })(p2p = tendermint.p2p || (tendermint.p2p = {}));
})(tendermint = exports.tendermint || (exports.tendermint = {}));
//# sourceMappingURL=types.js.map