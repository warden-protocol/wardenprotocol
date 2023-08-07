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
const dependency_2 = __importStar(require("./../controller/v1/controller"));
const dependency_3 = __importStar(require("./../host/v1/host"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var applications;
    (function (applications) {
        var interchain_accounts;
        (function (interchain_accounts) {
            var v1;
            (function (v1) {
                class GenesisState extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("controller_genesis_state" in data && data.controller_genesis_state != undefined) {
                                this.controller_genesis_state = data.controller_genesis_state;
                            }
                            if ("host_genesis_state" in data && data.host_genesis_state != undefined) {
                                this.host_genesis_state = data.host_genesis_state;
                            }
                        }
                    }
                    get controller_genesis_state() {
                        return pb_1.Message.getWrapperField(this, ControllerGenesisState, 1);
                    }
                    set controller_genesis_state(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get host_genesis_state() {
                        return pb_1.Message.getWrapperField(this, HostGenesisState, 2);
                    }
                    set host_genesis_state(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new GenesisState({});
                        if (data.controller_genesis_state != null) {
                            message.controller_genesis_state = ControllerGenesisState.fromObject(data.controller_genesis_state);
                        }
                        if (data.host_genesis_state != null) {
                            message.host_genesis_state = HostGenesisState.fromObject(data.host_genesis_state);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.controller_genesis_state != null) {
                            data.controller_genesis_state = this.controller_genesis_state.toObject();
                        }
                        if (this.host_genesis_state != null) {
                            data.host_genesis_state = this.host_genesis_state.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.controller_genesis_state !== undefined)
                            writer.writeMessage(1, this.controller_genesis_state, () => this.controller_genesis_state.serialize(writer));
                        if (this.host_genesis_state !== undefined)
                            writer.writeMessage(2, this.host_genesis_state, () => this.host_genesis_state.serialize(writer));
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
                                    reader.readMessage(message.controller_genesis_state, () => message.controller_genesis_state = ControllerGenesisState.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.host_genesis_state, () => message.host_genesis_state = HostGenesisState.deserialize(reader));
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
                class ControllerGenesisState extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 2, 3], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("active_channels" in data && data.active_channels != undefined) {
                                this.active_channels = data.active_channels;
                            }
                            if ("interchain_accounts" in data && data.interchain_accounts != undefined) {
                                this.interchain_accounts = data.interchain_accounts;
                            }
                            if ("ports" in data && data.ports != undefined) {
                                this.ports = data.ports;
                            }
                            if ("params" in data && data.params != undefined) {
                                this.params = data.params;
                            }
                        }
                    }
                    get active_channels() {
                        return pb_1.Message.getRepeatedWrapperField(this, ActiveChannel, 1);
                    }
                    set active_channels(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get interchain_accounts() {
                        return pb_1.Message.getRepeatedWrapperField(this, RegisteredInterchainAccount, 2);
                    }
                    set interchain_accounts(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 2, value);
                    }
                    get ports() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set ports(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get params() {
                        return pb_1.Message.getWrapperField(this, dependency_2.ibc.applications.interchain_accounts.controller.v1.Params, 4);
                    }
                    set params(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new ControllerGenesisState({});
                        if (data.active_channels != null) {
                            message.active_channels = data.active_channels.map(item => ActiveChannel.fromObject(item));
                        }
                        if (data.interchain_accounts != null) {
                            message.interchain_accounts = data.interchain_accounts.map(item => RegisteredInterchainAccount.fromObject(item));
                        }
                        if (data.ports != null) {
                            message.ports = data.ports;
                        }
                        if (data.params != null) {
                            message.params = dependency_2.ibc.applications.interchain_accounts.controller.v1.Params.fromObject(data.params);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.active_channels != null) {
                            data.active_channels = this.active_channels.map((item) => item.toObject());
                        }
                        if (this.interchain_accounts != null) {
                            data.interchain_accounts = this.interchain_accounts.map((item) => item.toObject());
                        }
                        if (this.ports != null) {
                            data.ports = this.ports;
                        }
                        if (this.params != null) {
                            data.params = this.params.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.active_channels !== undefined)
                            writer.writeRepeatedMessage(1, this.active_channels, (item) => item.serialize(writer));
                        if (this.interchain_accounts !== undefined)
                            writer.writeRepeatedMessage(2, this.interchain_accounts, (item) => item.serialize(writer));
                        if (this.ports !== undefined)
                            writer.writeRepeatedString(3, this.ports);
                        if (this.params !== undefined)
                            writer.writeMessage(4, this.params, () => this.params.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ControllerGenesisState();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.active_channels, () => pb_1.Message.addToRepeatedWrapperField(message, 1, ActiveChannel.deserialize(reader), ActiveChannel));
                                    break;
                                case 2:
                                    reader.readMessage(message.interchain_accounts, () => pb_1.Message.addToRepeatedWrapperField(message, 2, RegisteredInterchainAccount.deserialize(reader), RegisteredInterchainAccount));
                                    break;
                                case 3:
                                    pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                                    break;
                                case 4:
                                    reader.readMessage(message.params, () => message.params = dependency_2.ibc.applications.interchain_accounts.controller.v1.Params.deserialize(reader));
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
                        return ControllerGenesisState.deserialize(bytes);
                    }
                }
                v1.ControllerGenesisState = ControllerGenesisState;
                class HostGenesisState extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 2], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("active_channels" in data && data.active_channels != undefined) {
                                this.active_channels = data.active_channels;
                            }
                            if ("interchain_accounts" in data && data.interchain_accounts != undefined) {
                                this.interchain_accounts = data.interchain_accounts;
                            }
                            if ("port" in data && data.port != undefined) {
                                this.port = data.port;
                            }
                            if ("params" in data && data.params != undefined) {
                                this.params = data.params;
                            }
                        }
                    }
                    get active_channels() {
                        return pb_1.Message.getRepeatedWrapperField(this, ActiveChannel, 1);
                    }
                    set active_channels(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get interchain_accounts() {
                        return pb_1.Message.getRepeatedWrapperField(this, RegisteredInterchainAccount, 2);
                    }
                    set interchain_accounts(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 2, value);
                    }
                    get port() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set port(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get params() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.applications.interchain_accounts.host.v1.Params, 4);
                    }
                    set params(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new HostGenesisState({});
                        if (data.active_channels != null) {
                            message.active_channels = data.active_channels.map(item => ActiveChannel.fromObject(item));
                        }
                        if (data.interchain_accounts != null) {
                            message.interchain_accounts = data.interchain_accounts.map(item => RegisteredInterchainAccount.fromObject(item));
                        }
                        if (data.port != null) {
                            message.port = data.port;
                        }
                        if (data.params != null) {
                            message.params = dependency_3.ibc.applications.interchain_accounts.host.v1.Params.fromObject(data.params);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.active_channels != null) {
                            data.active_channels = this.active_channels.map((item) => item.toObject());
                        }
                        if (this.interchain_accounts != null) {
                            data.interchain_accounts = this.interchain_accounts.map((item) => item.toObject());
                        }
                        if (this.port != null) {
                            data.port = this.port;
                        }
                        if (this.params != null) {
                            data.params = this.params.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.active_channels !== undefined)
                            writer.writeRepeatedMessage(1, this.active_channels, (item) => item.serialize(writer));
                        if (this.interchain_accounts !== undefined)
                            writer.writeRepeatedMessage(2, this.interchain_accounts, (item) => item.serialize(writer));
                        if (typeof this.port === "string" && this.port.length)
                            writer.writeString(3, this.port);
                        if (this.params !== undefined)
                            writer.writeMessage(4, this.params, () => this.params.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new HostGenesisState();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.active_channels, () => pb_1.Message.addToRepeatedWrapperField(message, 1, ActiveChannel.deserialize(reader), ActiveChannel));
                                    break;
                                case 2:
                                    reader.readMessage(message.interchain_accounts, () => pb_1.Message.addToRepeatedWrapperField(message, 2, RegisteredInterchainAccount.deserialize(reader), RegisteredInterchainAccount));
                                    break;
                                case 3:
                                    message.port = reader.readString();
                                    break;
                                case 4:
                                    reader.readMessage(message.params, () => message.params = dependency_3.ibc.applications.interchain_accounts.host.v1.Params.deserialize(reader));
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
                        return HostGenesisState.deserialize(bytes);
                    }
                }
                v1.HostGenesisState = HostGenesisState;
                class ActiveChannel extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connection_id" in data && data.connection_id != undefined) {
                                this.connection_id = data.connection_id;
                            }
                            if ("port_id" in data && data.port_id != undefined) {
                                this.port_id = data.port_id;
                            }
                            if ("channel_id" in data && data.channel_id != undefined) {
                                this.channel_id = data.channel_id;
                            }
                        }
                    }
                    get connection_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set connection_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get port_id() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set port_id(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get channel_id() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set channel_id(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new ActiveChannel({});
                        if (data.connection_id != null) {
                            message.connection_id = data.connection_id;
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
                        if (this.connection_id != null) {
                            data.connection_id = this.connection_id;
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
                        if (typeof this.connection_id === "string" && this.connection_id.length)
                            writer.writeString(1, this.connection_id);
                        if (typeof this.port_id === "string" && this.port_id.length)
                            writer.writeString(2, this.port_id);
                        if (typeof this.channel_id === "string" && this.channel_id.length)
                            writer.writeString(3, this.channel_id);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ActiveChannel();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.connection_id = reader.readString();
                                    break;
                                case 2:
                                    message.port_id = reader.readString();
                                    break;
                                case 3:
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
                        return ActiveChannel.deserialize(bytes);
                    }
                }
                v1.ActiveChannel = ActiveChannel;
                class RegisteredInterchainAccount extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connection_id" in data && data.connection_id != undefined) {
                                this.connection_id = data.connection_id;
                            }
                            if ("port_id" in data && data.port_id != undefined) {
                                this.port_id = data.port_id;
                            }
                            if ("account_address" in data && data.account_address != undefined) {
                                this.account_address = data.account_address;
                            }
                        }
                    }
                    get connection_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set connection_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get port_id() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set port_id(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get account_address() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set account_address(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new RegisteredInterchainAccount({});
                        if (data.connection_id != null) {
                            message.connection_id = data.connection_id;
                        }
                        if (data.port_id != null) {
                            message.port_id = data.port_id;
                        }
                        if (data.account_address != null) {
                            message.account_address = data.account_address;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.connection_id != null) {
                            data.connection_id = this.connection_id;
                        }
                        if (this.port_id != null) {
                            data.port_id = this.port_id;
                        }
                        if (this.account_address != null) {
                            data.account_address = this.account_address;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.connection_id === "string" && this.connection_id.length)
                            writer.writeString(1, this.connection_id);
                        if (typeof this.port_id === "string" && this.port_id.length)
                            writer.writeString(2, this.port_id);
                        if (typeof this.account_address === "string" && this.account_address.length)
                            writer.writeString(3, this.account_address);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RegisteredInterchainAccount();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.connection_id = reader.readString();
                                    break;
                                case 2:
                                    message.port_id = reader.readString();
                                    break;
                                case 3:
                                    message.account_address = reader.readString();
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
                        return RegisteredInterchainAccount.deserialize(bytes);
                    }
                }
                v1.RegisteredInterchainAccount = RegisteredInterchainAccount;
            })(v1 = interchain_accounts.v1 || (interchain_accounts.v1 = {}));
        })(interchain_accounts = applications.interchain_accounts || (applications.interchain_accounts = {}));
    })(applications = ibc.applications || (ibc.applications = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=genesis.js.map