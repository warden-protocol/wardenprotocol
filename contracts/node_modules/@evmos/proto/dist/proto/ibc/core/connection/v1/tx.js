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
const dependency_2 = __importStar(require("./../../../../google/protobuf/any"));
const dependency_3 = __importStar(require("./../../client/v1/client"));
const dependency_4 = __importStar(require("./connection"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var connection;
        (function (connection) {
            var v1;
            (function (v1) {
                class MsgConnectionOpenInit extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("counterparty" in data && data.counterparty != undefined) {
                                this.counterparty = data.counterparty;
                            }
                            if ("version" in data && data.version != undefined) {
                                this.version = data.version;
                            }
                            if ("delay_period" in data && data.delay_period != undefined) {
                                this.delay_period = data.delay_period;
                            }
                            if ("signer" in data && data.signer != undefined) {
                                this.signer = data.signer;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get counterparty() {
                        return pb_1.Message.getWrapperField(this, dependency_4.ibc.core.connection.v1.Counterparty, 2);
                    }
                    set counterparty(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get version() {
                        return pb_1.Message.getWrapperField(this, dependency_4.ibc.core.connection.v1.Version, 3);
                    }
                    set version(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get delay_period() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set delay_period(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get signer() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set signer(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    static fromObject(data) {
                        const message = new MsgConnectionOpenInit({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.counterparty != null) {
                            message.counterparty = dependency_4.ibc.core.connection.v1.Counterparty.fromObject(data.counterparty);
                        }
                        if (data.version != null) {
                            message.version = dependency_4.ibc.core.connection.v1.Version.fromObject(data.version);
                        }
                        if (data.delay_period != null) {
                            message.delay_period = data.delay_period;
                        }
                        if (data.signer != null) {
                            message.signer = data.signer;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.counterparty != null) {
                            data.counterparty = this.counterparty.toObject();
                        }
                        if (this.version != null) {
                            data.version = this.version.toObject();
                        }
                        if (this.delay_period != null) {
                            data.delay_period = this.delay_period;
                        }
                        if (this.signer != null) {
                            data.signer = this.signer;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.counterparty !== undefined)
                            writer.writeMessage(2, this.counterparty, () => this.counterparty.serialize(writer));
                        if (this.version !== undefined)
                            writer.writeMessage(3, this.version, () => this.version.serialize(writer));
                        if (this.delay_period !== undefined)
                            writer.writeUint64(4, this.delay_period);
                        if (typeof this.signer === "string" && this.signer.length)
                            writer.writeString(5, this.signer);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConnectionOpenInit();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.counterparty, () => message.counterparty = dependency_4.ibc.core.connection.v1.Counterparty.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.version, () => message.version = dependency_4.ibc.core.connection.v1.Version.deserialize(reader));
                                    break;
                                case 4:
                                    message.delay_period = reader.readUint64();
                                    break;
                                case 5:
                                    message.signer = reader.readString();
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
                        return MsgConnectionOpenInit.deserialize(bytes);
                    }
                }
                v1.MsgConnectionOpenInit = MsgConnectionOpenInit;
                class MsgConnectionOpenInitResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new MsgConnectionOpenInitResponse({});
                        return message;
                    }
                    toObject() {
                        const data = {};
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConnectionOpenInitResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return MsgConnectionOpenInitResponse.deserialize(bytes);
                    }
                }
                v1.MsgConnectionOpenInitResponse = MsgConnectionOpenInitResponse;
                class MsgConnectionOpenTry extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("previous_connection_id" in data && data.previous_connection_id != undefined) {
                                this.previous_connection_id = data.previous_connection_id;
                            }
                            if ("client_state" in data && data.client_state != undefined) {
                                this.client_state = data.client_state;
                            }
                            if ("counterparty" in data && data.counterparty != undefined) {
                                this.counterparty = data.counterparty;
                            }
                            if ("delay_period" in data && data.delay_period != undefined) {
                                this.delay_period = data.delay_period;
                            }
                            if ("counterparty_versions" in data && data.counterparty_versions != undefined) {
                                this.counterparty_versions = data.counterparty_versions;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                            if ("proof_init" in data && data.proof_init != undefined) {
                                this.proof_init = data.proof_init;
                            }
                            if ("proof_client" in data && data.proof_client != undefined) {
                                this.proof_client = data.proof_client;
                            }
                            if ("proof_consensus" in data && data.proof_consensus != undefined) {
                                this.proof_consensus = data.proof_consensus;
                            }
                            if ("consensus_height" in data && data.consensus_height != undefined) {
                                this.consensus_height = data.consensus_height;
                            }
                            if ("signer" in data && data.signer != undefined) {
                                this.signer = data.signer;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get previous_connection_id() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set previous_connection_id(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get client_state() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 3);
                    }
                    set client_state(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get counterparty() {
                        return pb_1.Message.getWrapperField(this, dependency_4.ibc.core.connection.v1.Counterparty, 4);
                    }
                    set counterparty(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    get delay_period() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set delay_period(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    get counterparty_versions() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_4.ibc.core.connection.v1.Version, 6);
                    }
                    set counterparty_versions(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 6, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.Height, 7);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 7, value);
                    }
                    get proof_init() {
                        return pb_1.Message.getField(this, 8);
                    }
                    set proof_init(value) {
                        pb_1.Message.setField(this, 8, value);
                    }
                    get proof_client() {
                        return pb_1.Message.getField(this, 9);
                    }
                    set proof_client(value) {
                        pb_1.Message.setField(this, 9, value);
                    }
                    get proof_consensus() {
                        return pb_1.Message.getField(this, 10);
                    }
                    set proof_consensus(value) {
                        pb_1.Message.setField(this, 10, value);
                    }
                    get consensus_height() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.Height, 11);
                    }
                    set consensus_height(value) {
                        pb_1.Message.setWrapperField(this, 11, value);
                    }
                    get signer() {
                        return pb_1.Message.getField(this, 12);
                    }
                    set signer(value) {
                        pb_1.Message.setField(this, 12, value);
                    }
                    static fromObject(data) {
                        const message = new MsgConnectionOpenTry({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.previous_connection_id != null) {
                            message.previous_connection_id = data.previous_connection_id;
                        }
                        if (data.client_state != null) {
                            message.client_state = dependency_2.google.protobuf.Any.fromObject(data.client_state);
                        }
                        if (data.counterparty != null) {
                            message.counterparty = dependency_4.ibc.core.connection.v1.Counterparty.fromObject(data.counterparty);
                        }
                        if (data.delay_period != null) {
                            message.delay_period = data.delay_period;
                        }
                        if (data.counterparty_versions != null) {
                            message.counterparty_versions = data.counterparty_versions.map(item => dependency_4.ibc.core.connection.v1.Version.fromObject(item));
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_3.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        if (data.proof_init != null) {
                            message.proof_init = data.proof_init;
                        }
                        if (data.proof_client != null) {
                            message.proof_client = data.proof_client;
                        }
                        if (data.proof_consensus != null) {
                            message.proof_consensus = data.proof_consensus;
                        }
                        if (data.consensus_height != null) {
                            message.consensus_height = dependency_3.ibc.core.client.v1.Height.fromObject(data.consensus_height);
                        }
                        if (data.signer != null) {
                            message.signer = data.signer;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.previous_connection_id != null) {
                            data.previous_connection_id = this.previous_connection_id;
                        }
                        if (this.client_state != null) {
                            data.client_state = this.client_state.toObject();
                        }
                        if (this.counterparty != null) {
                            data.counterparty = this.counterparty.toObject();
                        }
                        if (this.delay_period != null) {
                            data.delay_period = this.delay_period;
                        }
                        if (this.counterparty_versions != null) {
                            data.counterparty_versions = this.counterparty_versions.map((item) => item.toObject());
                        }
                        if (this.proof_height != null) {
                            data.proof_height = this.proof_height.toObject();
                        }
                        if (this.proof_init != null) {
                            data.proof_init = this.proof_init;
                        }
                        if (this.proof_client != null) {
                            data.proof_client = this.proof_client;
                        }
                        if (this.proof_consensus != null) {
                            data.proof_consensus = this.proof_consensus;
                        }
                        if (this.consensus_height != null) {
                            data.consensus_height = this.consensus_height.toObject();
                        }
                        if (this.signer != null) {
                            data.signer = this.signer;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (typeof this.previous_connection_id === "string" && this.previous_connection_id.length)
                            writer.writeString(2, this.previous_connection_id);
                        if (this.client_state !== undefined)
                            writer.writeMessage(3, this.client_state, () => this.client_state.serialize(writer));
                        if (this.counterparty !== undefined)
                            writer.writeMessage(4, this.counterparty, () => this.counterparty.serialize(writer));
                        if (this.delay_period !== undefined)
                            writer.writeUint64(5, this.delay_period);
                        if (this.counterparty_versions !== undefined)
                            writer.writeRepeatedMessage(6, this.counterparty_versions, (item) => item.serialize(writer));
                        if (this.proof_height !== undefined)
                            writer.writeMessage(7, this.proof_height, () => this.proof_height.serialize(writer));
                        if (this.proof_init !== undefined)
                            writer.writeBytes(8, this.proof_init);
                        if (this.proof_client !== undefined)
                            writer.writeBytes(9, this.proof_client);
                        if (this.proof_consensus !== undefined)
                            writer.writeBytes(10, this.proof_consensus);
                        if (this.consensus_height !== undefined)
                            writer.writeMessage(11, this.consensus_height, () => this.consensus_height.serialize(writer));
                        if (typeof this.signer === "string" && this.signer.length)
                            writer.writeString(12, this.signer);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConnectionOpenTry();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    message.previous_connection_id = reader.readString();
                                    break;
                                case 3:
                                    reader.readMessage(message.client_state, () => message.client_state = dependency_2.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 4:
                                    reader.readMessage(message.counterparty, () => message.counterparty = dependency_4.ibc.core.connection.v1.Counterparty.deserialize(reader));
                                    break;
                                case 5:
                                    message.delay_period = reader.readUint64();
                                    break;
                                case 6:
                                    reader.readMessage(message.counterparty_versions, () => pb_1.Message.addToRepeatedWrapperField(message, 6, dependency_4.ibc.core.connection.v1.Version.deserialize(reader), dependency_4.ibc.core.connection.v1.Version));
                                    break;
                                case 7:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_3.ibc.core.client.v1.Height.deserialize(reader));
                                    break;
                                case 8:
                                    message.proof_init = reader.readBytes();
                                    break;
                                case 9:
                                    message.proof_client = reader.readBytes();
                                    break;
                                case 10:
                                    message.proof_consensus = reader.readBytes();
                                    break;
                                case 11:
                                    reader.readMessage(message.consensus_height, () => message.consensus_height = dependency_3.ibc.core.client.v1.Height.deserialize(reader));
                                    break;
                                case 12:
                                    message.signer = reader.readString();
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
                        return MsgConnectionOpenTry.deserialize(bytes);
                    }
                }
                v1.MsgConnectionOpenTry = MsgConnectionOpenTry;
                class MsgConnectionOpenTryResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new MsgConnectionOpenTryResponse({});
                        return message;
                    }
                    toObject() {
                        const data = {};
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConnectionOpenTryResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return MsgConnectionOpenTryResponse.deserialize(bytes);
                    }
                }
                v1.MsgConnectionOpenTryResponse = MsgConnectionOpenTryResponse;
                class MsgConnectionOpenAck extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connection_id" in data && data.connection_id != undefined) {
                                this.connection_id = data.connection_id;
                            }
                            if ("counterparty_connection_id" in data && data.counterparty_connection_id != undefined) {
                                this.counterparty_connection_id = data.counterparty_connection_id;
                            }
                            if ("version" in data && data.version != undefined) {
                                this.version = data.version;
                            }
                            if ("client_state" in data && data.client_state != undefined) {
                                this.client_state = data.client_state;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                            if ("proof_try" in data && data.proof_try != undefined) {
                                this.proof_try = data.proof_try;
                            }
                            if ("proof_client" in data && data.proof_client != undefined) {
                                this.proof_client = data.proof_client;
                            }
                            if ("proof_consensus" in data && data.proof_consensus != undefined) {
                                this.proof_consensus = data.proof_consensus;
                            }
                            if ("consensus_height" in data && data.consensus_height != undefined) {
                                this.consensus_height = data.consensus_height;
                            }
                            if ("signer" in data && data.signer != undefined) {
                                this.signer = data.signer;
                            }
                        }
                    }
                    get connection_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set connection_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get counterparty_connection_id() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set counterparty_connection_id(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get version() {
                        return pb_1.Message.getWrapperField(this, dependency_4.ibc.core.connection.v1.Version, 3);
                    }
                    set version(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get client_state() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 4);
                    }
                    set client_state(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.Height, 5);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 5, value);
                    }
                    get proof_try() {
                        return pb_1.Message.getField(this, 6);
                    }
                    set proof_try(value) {
                        pb_1.Message.setField(this, 6, value);
                    }
                    get proof_client() {
                        return pb_1.Message.getField(this, 7);
                    }
                    set proof_client(value) {
                        pb_1.Message.setField(this, 7, value);
                    }
                    get proof_consensus() {
                        return pb_1.Message.getField(this, 8);
                    }
                    set proof_consensus(value) {
                        pb_1.Message.setField(this, 8, value);
                    }
                    get consensus_height() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.Height, 9);
                    }
                    set consensus_height(value) {
                        pb_1.Message.setWrapperField(this, 9, value);
                    }
                    get signer() {
                        return pb_1.Message.getField(this, 10);
                    }
                    set signer(value) {
                        pb_1.Message.setField(this, 10, value);
                    }
                    static fromObject(data) {
                        const message = new MsgConnectionOpenAck({});
                        if (data.connection_id != null) {
                            message.connection_id = data.connection_id;
                        }
                        if (data.counterparty_connection_id != null) {
                            message.counterparty_connection_id = data.counterparty_connection_id;
                        }
                        if (data.version != null) {
                            message.version = dependency_4.ibc.core.connection.v1.Version.fromObject(data.version);
                        }
                        if (data.client_state != null) {
                            message.client_state = dependency_2.google.protobuf.Any.fromObject(data.client_state);
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_3.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        if (data.proof_try != null) {
                            message.proof_try = data.proof_try;
                        }
                        if (data.proof_client != null) {
                            message.proof_client = data.proof_client;
                        }
                        if (data.proof_consensus != null) {
                            message.proof_consensus = data.proof_consensus;
                        }
                        if (data.consensus_height != null) {
                            message.consensus_height = dependency_3.ibc.core.client.v1.Height.fromObject(data.consensus_height);
                        }
                        if (data.signer != null) {
                            message.signer = data.signer;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.connection_id != null) {
                            data.connection_id = this.connection_id;
                        }
                        if (this.counterparty_connection_id != null) {
                            data.counterparty_connection_id = this.counterparty_connection_id;
                        }
                        if (this.version != null) {
                            data.version = this.version.toObject();
                        }
                        if (this.client_state != null) {
                            data.client_state = this.client_state.toObject();
                        }
                        if (this.proof_height != null) {
                            data.proof_height = this.proof_height.toObject();
                        }
                        if (this.proof_try != null) {
                            data.proof_try = this.proof_try;
                        }
                        if (this.proof_client != null) {
                            data.proof_client = this.proof_client;
                        }
                        if (this.proof_consensus != null) {
                            data.proof_consensus = this.proof_consensus;
                        }
                        if (this.consensus_height != null) {
                            data.consensus_height = this.consensus_height.toObject();
                        }
                        if (this.signer != null) {
                            data.signer = this.signer;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.connection_id === "string" && this.connection_id.length)
                            writer.writeString(1, this.connection_id);
                        if (typeof this.counterparty_connection_id === "string" && this.counterparty_connection_id.length)
                            writer.writeString(2, this.counterparty_connection_id);
                        if (this.version !== undefined)
                            writer.writeMessage(3, this.version, () => this.version.serialize(writer));
                        if (this.client_state !== undefined)
                            writer.writeMessage(4, this.client_state, () => this.client_state.serialize(writer));
                        if (this.proof_height !== undefined)
                            writer.writeMessage(5, this.proof_height, () => this.proof_height.serialize(writer));
                        if (this.proof_try !== undefined)
                            writer.writeBytes(6, this.proof_try);
                        if (this.proof_client !== undefined)
                            writer.writeBytes(7, this.proof_client);
                        if (this.proof_consensus !== undefined)
                            writer.writeBytes(8, this.proof_consensus);
                        if (this.consensus_height !== undefined)
                            writer.writeMessage(9, this.consensus_height, () => this.consensus_height.serialize(writer));
                        if (typeof this.signer === "string" && this.signer.length)
                            writer.writeString(10, this.signer);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConnectionOpenAck();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.connection_id = reader.readString();
                                    break;
                                case 2:
                                    message.counterparty_connection_id = reader.readString();
                                    break;
                                case 3:
                                    reader.readMessage(message.version, () => message.version = dependency_4.ibc.core.connection.v1.Version.deserialize(reader));
                                    break;
                                case 4:
                                    reader.readMessage(message.client_state, () => message.client_state = dependency_2.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 5:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_3.ibc.core.client.v1.Height.deserialize(reader));
                                    break;
                                case 6:
                                    message.proof_try = reader.readBytes();
                                    break;
                                case 7:
                                    message.proof_client = reader.readBytes();
                                    break;
                                case 8:
                                    message.proof_consensus = reader.readBytes();
                                    break;
                                case 9:
                                    reader.readMessage(message.consensus_height, () => message.consensus_height = dependency_3.ibc.core.client.v1.Height.deserialize(reader));
                                    break;
                                case 10:
                                    message.signer = reader.readString();
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
                        return MsgConnectionOpenAck.deserialize(bytes);
                    }
                }
                v1.MsgConnectionOpenAck = MsgConnectionOpenAck;
                class MsgConnectionOpenAckResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new MsgConnectionOpenAckResponse({});
                        return message;
                    }
                    toObject() {
                        const data = {};
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConnectionOpenAckResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return MsgConnectionOpenAckResponse.deserialize(bytes);
                    }
                }
                v1.MsgConnectionOpenAckResponse = MsgConnectionOpenAckResponse;
                class MsgConnectionOpenConfirm extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connection_id" in data && data.connection_id != undefined) {
                                this.connection_id = data.connection_id;
                            }
                            if ("proof_ack" in data && data.proof_ack != undefined) {
                                this.proof_ack = data.proof_ack;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                            if ("signer" in data && data.signer != undefined) {
                                this.signer = data.signer;
                            }
                        }
                    }
                    get connection_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set connection_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get proof_ack() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set proof_ack(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get signer() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set signer(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new MsgConnectionOpenConfirm({});
                        if (data.connection_id != null) {
                            message.connection_id = data.connection_id;
                        }
                        if (data.proof_ack != null) {
                            message.proof_ack = data.proof_ack;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_3.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        if (data.signer != null) {
                            message.signer = data.signer;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.connection_id != null) {
                            data.connection_id = this.connection_id;
                        }
                        if (this.proof_ack != null) {
                            data.proof_ack = this.proof_ack;
                        }
                        if (this.proof_height != null) {
                            data.proof_height = this.proof_height.toObject();
                        }
                        if (this.signer != null) {
                            data.signer = this.signer;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.connection_id === "string" && this.connection_id.length)
                            writer.writeString(1, this.connection_id);
                        if (this.proof_ack !== undefined)
                            writer.writeBytes(2, this.proof_ack);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(3, this.proof_height, () => this.proof_height.serialize(writer));
                        if (typeof this.signer === "string" && this.signer.length)
                            writer.writeString(4, this.signer);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConnectionOpenConfirm();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.connection_id = reader.readString();
                                    break;
                                case 2:
                                    message.proof_ack = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_3.ibc.core.client.v1.Height.deserialize(reader));
                                    break;
                                case 4:
                                    message.signer = reader.readString();
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
                        return MsgConnectionOpenConfirm.deserialize(bytes);
                    }
                }
                v1.MsgConnectionOpenConfirm = MsgConnectionOpenConfirm;
                class MsgConnectionOpenConfirmResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new MsgConnectionOpenConfirmResponse({});
                        return message;
                    }
                    toObject() {
                        const data = {};
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgConnectionOpenConfirmResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return MsgConnectionOpenConfirmResponse.deserialize(bytes);
                    }
                }
                v1.MsgConnectionOpenConfirmResponse = MsgConnectionOpenConfirmResponse;
            })(v1 = connection.v1 || (connection.v1 = {}));
        })(connection = core.connection || (core.connection = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=tx.js.map