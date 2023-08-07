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
const dependency_2 = __importStar(require("./../../commitment/v1/commitment"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var connection;
        (function (connection) {
            var v1;
            (function (v1) {
                let State;
                (function (State) {
                    State[State["STATE_UNINITIALIZED_UNSPECIFIED"] = 0] = "STATE_UNINITIALIZED_UNSPECIFIED";
                    State[State["STATE_INIT"] = 1] = "STATE_INIT";
                    State[State["STATE_TRYOPEN"] = 2] = "STATE_TRYOPEN";
                    State[State["STATE_OPEN"] = 3] = "STATE_OPEN";
                })(State = v1.State || (v1.State = {}));
                class ConnectionEnd extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("versions" in data && data.versions != undefined) {
                                this.versions = data.versions;
                            }
                            if ("state" in data && data.state != undefined) {
                                this.state = data.state;
                            }
                            if ("counterparty" in data && data.counterparty != undefined) {
                                this.counterparty = data.counterparty;
                            }
                            if ("delay_period" in data && data.delay_period != undefined) {
                                this.delay_period = data.delay_period;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get versions() {
                        return pb_1.Message.getRepeatedWrapperField(this, Version, 2);
                    }
                    set versions(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 2, value);
                    }
                    get state() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set state(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get counterparty() {
                        return pb_1.Message.getWrapperField(this, Counterparty, 4);
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
                    static fromObject(data) {
                        const message = new ConnectionEnd({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.versions != null) {
                            message.versions = data.versions.map(item => Version.fromObject(item));
                        }
                        if (data.state != null) {
                            message.state = data.state;
                        }
                        if (data.counterparty != null) {
                            message.counterparty = Counterparty.fromObject(data.counterparty);
                        }
                        if (data.delay_period != null) {
                            message.delay_period = data.delay_period;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.versions != null) {
                            data.versions = this.versions.map((item) => item.toObject());
                        }
                        if (this.state != null) {
                            data.state = this.state;
                        }
                        if (this.counterparty != null) {
                            data.counterparty = this.counterparty.toObject();
                        }
                        if (this.delay_period != null) {
                            data.delay_period = this.delay_period;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.versions !== undefined)
                            writer.writeRepeatedMessage(2, this.versions, (item) => item.serialize(writer));
                        if (this.state !== undefined)
                            writer.writeEnum(3, this.state);
                        if (this.counterparty !== undefined)
                            writer.writeMessage(4, this.counterparty, () => this.counterparty.serialize(writer));
                        if (this.delay_period !== undefined)
                            writer.writeUint64(5, this.delay_period);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ConnectionEnd();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.versions, () => pb_1.Message.addToRepeatedWrapperField(message, 2, Version.deserialize(reader), Version));
                                    break;
                                case 3:
                                    message.state = reader.readEnum();
                                    break;
                                case 4:
                                    reader.readMessage(message.counterparty, () => message.counterparty = Counterparty.deserialize(reader));
                                    break;
                                case 5:
                                    message.delay_period = reader.readUint64();
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
                        return ConnectionEnd.deserialize(bytes);
                    }
                }
                v1.ConnectionEnd = ConnectionEnd;
                class IdentifiedConnection extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("id" in data && data.id != undefined) {
                                this.id = data.id;
                            }
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("versions" in data && data.versions != undefined) {
                                this.versions = data.versions;
                            }
                            if ("state" in data && data.state != undefined) {
                                this.state = data.state;
                            }
                            if ("counterparty" in data && data.counterparty != undefined) {
                                this.counterparty = data.counterparty;
                            }
                            if ("delay_period" in data && data.delay_period != undefined) {
                                this.delay_period = data.delay_period;
                            }
                        }
                    }
                    get id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get versions() {
                        return pb_1.Message.getRepeatedWrapperField(this, Version, 3);
                    }
                    set versions(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 3, value);
                    }
                    get state() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set state(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get counterparty() {
                        return pb_1.Message.getWrapperField(this, Counterparty, 5);
                    }
                    set counterparty(value) {
                        pb_1.Message.setWrapperField(this, 5, value);
                    }
                    get delay_period() {
                        return pb_1.Message.getField(this, 6);
                    }
                    set delay_period(value) {
                        pb_1.Message.setField(this, 6, value);
                    }
                    static fromObject(data) {
                        const message = new IdentifiedConnection({});
                        if (data.id != null) {
                            message.id = data.id;
                        }
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.versions != null) {
                            message.versions = data.versions.map(item => Version.fromObject(item));
                        }
                        if (data.state != null) {
                            message.state = data.state;
                        }
                        if (data.counterparty != null) {
                            message.counterparty = Counterparty.fromObject(data.counterparty);
                        }
                        if (data.delay_period != null) {
                            message.delay_period = data.delay_period;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.id != null) {
                            data.id = this.id;
                        }
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.versions != null) {
                            data.versions = this.versions.map((item) => item.toObject());
                        }
                        if (this.state != null) {
                            data.state = this.state;
                        }
                        if (this.counterparty != null) {
                            data.counterparty = this.counterparty.toObject();
                        }
                        if (this.delay_period != null) {
                            data.delay_period = this.delay_period;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.id === "string" && this.id.length)
                            writer.writeString(1, this.id);
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(2, this.client_id);
                        if (this.versions !== undefined)
                            writer.writeRepeatedMessage(3, this.versions, (item) => item.serialize(writer));
                        if (this.state !== undefined)
                            writer.writeEnum(4, this.state);
                        if (this.counterparty !== undefined)
                            writer.writeMessage(5, this.counterparty, () => this.counterparty.serialize(writer));
                        if (this.delay_period !== undefined)
                            writer.writeUint64(6, this.delay_period);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IdentifiedConnection();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.id = reader.readString();
                                    break;
                                case 2:
                                    message.client_id = reader.readString();
                                    break;
                                case 3:
                                    reader.readMessage(message.versions, () => pb_1.Message.addToRepeatedWrapperField(message, 3, Version.deserialize(reader), Version));
                                    break;
                                case 4:
                                    message.state = reader.readEnum();
                                    break;
                                case 5:
                                    reader.readMessage(message.counterparty, () => message.counterparty = Counterparty.deserialize(reader));
                                    break;
                                case 6:
                                    message.delay_period = reader.readUint64();
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
                        return IdentifiedConnection.deserialize(bytes);
                    }
                }
                v1.IdentifiedConnection = IdentifiedConnection;
                class Counterparty extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("connection_id" in data && data.connection_id != undefined) {
                                this.connection_id = data.connection_id;
                            }
                            if ("prefix" in data && data.prefix != undefined) {
                                this.prefix = data.prefix;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get connection_id() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set connection_id(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get prefix() {
                        return pb_1.Message.getWrapperField(this, dependency_2.ibc.core.commitment.v1.MerklePrefix, 3);
                    }
                    set prefix(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new Counterparty({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.connection_id != null) {
                            message.connection_id = data.connection_id;
                        }
                        if (data.prefix != null) {
                            message.prefix = dependency_2.ibc.core.commitment.v1.MerklePrefix.fromObject(data.prefix);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.connection_id != null) {
                            data.connection_id = this.connection_id;
                        }
                        if (this.prefix != null) {
                            data.prefix = this.prefix.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (typeof this.connection_id === "string" && this.connection_id.length)
                            writer.writeString(2, this.connection_id);
                        if (this.prefix !== undefined)
                            writer.writeMessage(3, this.prefix, () => this.prefix.serialize(writer));
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
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    message.connection_id = reader.readString();
                                    break;
                                case 3:
                                    reader.readMessage(message.prefix, () => message.prefix = dependency_2.ibc.core.commitment.v1.MerklePrefix.deserialize(reader));
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
                class ClientPaths extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("paths" in data && data.paths != undefined) {
                                this.paths = data.paths;
                            }
                        }
                    }
                    get paths() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set paths(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new ClientPaths({});
                        if (data.paths != null) {
                            message.paths = data.paths;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.paths != null) {
                            data.paths = this.paths;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.paths !== undefined)
                            writer.writeRepeatedString(1, this.paths);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ClientPaths();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    pb_1.Message.addToRepeatedField(message, 1, reader.readString());
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
                        return ClientPaths.deserialize(bytes);
                    }
                }
                v1.ClientPaths = ClientPaths;
                class ConnectionPaths extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("paths" in data && data.paths != undefined) {
                                this.paths = data.paths;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get paths() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set paths(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new ConnectionPaths({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.paths != null) {
                            message.paths = data.paths;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.paths != null) {
                            data.paths = this.paths;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.paths !== undefined)
                            writer.writeRepeatedString(2, this.paths);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ConnectionPaths();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    pb_1.Message.addToRepeatedField(message, 2, reader.readString());
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
                        return ConnectionPaths.deserialize(bytes);
                    }
                }
                v1.ConnectionPaths = ConnectionPaths;
                class Version extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("identifier" in data && data.identifier != undefined) {
                                this.identifier = data.identifier;
                            }
                            if ("features" in data && data.features != undefined) {
                                this.features = data.features;
                            }
                        }
                    }
                    get identifier() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set identifier(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get features() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set features(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new Version({});
                        if (data.identifier != null) {
                            message.identifier = data.identifier;
                        }
                        if (data.features != null) {
                            message.features = data.features;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.identifier != null) {
                            data.identifier = this.identifier;
                        }
                        if (this.features != null) {
                            data.features = this.features;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.identifier === "string" && this.identifier.length)
                            writer.writeString(1, this.identifier);
                        if (this.features !== undefined)
                            writer.writeRepeatedString(2, this.features);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Version();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.identifier = reader.readString();
                                    break;
                                case 2:
                                    pb_1.Message.addToRepeatedField(message, 2, reader.readString());
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
                        return Version.deserialize(bytes);
                    }
                }
                v1.Version = Version;
                class Params extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("max_expected_time_per_block" in data && data.max_expected_time_per_block != undefined) {
                                this.max_expected_time_per_block = data.max_expected_time_per_block;
                            }
                        }
                    }
                    get max_expected_time_per_block() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set max_expected_time_per_block(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new Params({});
                        if (data.max_expected_time_per_block != null) {
                            message.max_expected_time_per_block = data.max_expected_time_per_block;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.max_expected_time_per_block != null) {
                            data.max_expected_time_per_block = this.max_expected_time_per_block;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.max_expected_time_per_block !== undefined)
                            writer.writeUint64(1, this.max_expected_time_per_block);
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
                                    message.max_expected_time_per_block = reader.readUint64();
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
            })(v1 = connection.v1 || (connection.v1 = {}));
        })(connection = core.connection || (core.connection = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=connection.js.map