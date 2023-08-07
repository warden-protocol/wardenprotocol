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
const dependency_1 = __importStar(require("./../../client/v1/client"));
const dependency_2 = __importStar(require("./../../../../cosmos/base/query/v1beta1/pagination"));
const dependency_3 = __importStar(require("./channel"));
const dependency_5 = __importStar(require("./../../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var channel;
        (function (channel) {
            var v1;
            (function (v1) {
                class QueryChannelRequest extends pb_1.Message {
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
                        const message = new QueryChannelRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryChannelRequest();
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
                        return QueryChannelRequest.deserialize(bytes);
                    }
                }
                v1.QueryChannelRequest = QueryChannelRequest;
                class QueryChannelResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("channel" in data && data.channel != undefined) {
                                this.channel = data.channel;
                            }
                            if ("proof" in data && data.proof != undefined) {
                                this.proof = data.proof;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                        }
                    }
                    get channel() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.channel.v1.Channel, 1);
                    }
                    set channel(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryChannelResponse({});
                        if (data.channel != null) {
                            message.channel = dependency_3.ibc.core.channel.v1.Channel.fromObject(data.channel);
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_1.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.channel != null) {
                            data.channel = this.channel.toObject();
                        }
                        if (this.proof != null) {
                            data.proof = this.proof;
                        }
                        if (this.proof_height != null) {
                            data.proof_height = this.proof_height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.channel !== undefined)
                            writer.writeMessage(1, this.channel, () => this.channel.serialize(writer));
                        if (this.proof !== undefined)
                            writer.writeBytes(2, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(3, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryChannelResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.channel, () => message.channel = dependency_3.ibc.core.channel.v1.Channel.deserialize(reader));
                                    break;
                                case 2:
                                    message.proof = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryChannelResponse.deserialize(bytes);
                    }
                }
                v1.QueryChannelResponse = QueryChannelResponse;
                class QueryChannelsRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                        }
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageRequest, 1);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new QueryChannelsRequest({});
                        if (data.pagination != null) {
                            message.pagination = dependency_2.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.pagination !== undefined)
                            writer.writeMessage(1, this.pagination, () => this.pagination.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryChannelsRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
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
                        return QueryChannelsRequest.deserialize(bytes);
                    }
                }
                v1.QueryChannelsRequest = QueryChannelsRequest;
                class QueryChannelsResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("channels" in data && data.channels != undefined) {
                                this.channels = data.channels;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                        }
                    }
                    get channels() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_3.ibc.core.channel.v1.IdentifiedChannel, 1);
                    }
                    set channels(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageResponse, 2);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 3);
                    }
                    set height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryChannelsResponse({});
                        if (data.channels != null) {
                            message.channels = data.channels.map(item => dependency_3.ibc.core.channel.v1.IdentifiedChannel.fromObject(item));
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                        }
                        if (data.height != null) {
                            message.height = dependency_1.ibc.core.client.v1.Height.fromObject(data.height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.channels != null) {
                            data.channels = this.channels.map((item) => item.toObject());
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        if (this.height != null) {
                            data.height = this.height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.channels !== undefined)
                            writer.writeRepeatedMessage(1, this.channels, (item) => item.serialize(writer));
                        if (this.pagination !== undefined)
                            writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                        if (this.height !== undefined)
                            writer.writeMessage(3, this.height, () => this.height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryChannelsResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.channels, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_3.ibc.core.channel.v1.IdentifiedChannel.deserialize(reader), dependency_3.ibc.core.channel.v1.IdentifiedChannel));
                                    break;
                                case 2:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.height, () => message.height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryChannelsResponse.deserialize(bytes);
                    }
                }
                v1.QueryChannelsResponse = QueryChannelsResponse;
                class QueryConnectionChannelsRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connection" in data && data.connection != undefined) {
                                this.connection = data.connection;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                        }
                    }
                    get connection() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set connection(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageRequest, 2);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConnectionChannelsRequest({});
                        if (data.connection != null) {
                            message.connection = data.connection;
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_2.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.connection != null) {
                            data.connection = this.connection;
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.connection === "string" && this.connection.length)
                            writer.writeString(1, this.connection);
                        if (this.pagination !== undefined)
                            writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConnectionChannelsRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.connection = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
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
                        return QueryConnectionChannelsRequest.deserialize(bytes);
                    }
                }
                v1.QueryConnectionChannelsRequest = QueryConnectionChannelsRequest;
                class QueryConnectionChannelsResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("channels" in data && data.channels != undefined) {
                                this.channels = data.channels;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                        }
                    }
                    get channels() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_3.ibc.core.channel.v1.IdentifiedChannel, 1);
                    }
                    set channels(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageResponse, 2);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 3);
                    }
                    set height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConnectionChannelsResponse({});
                        if (data.channels != null) {
                            message.channels = data.channels.map(item => dependency_3.ibc.core.channel.v1.IdentifiedChannel.fromObject(item));
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                        }
                        if (data.height != null) {
                            message.height = dependency_1.ibc.core.client.v1.Height.fromObject(data.height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.channels != null) {
                            data.channels = this.channels.map((item) => item.toObject());
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        if (this.height != null) {
                            data.height = this.height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.channels !== undefined)
                            writer.writeRepeatedMessage(1, this.channels, (item) => item.serialize(writer));
                        if (this.pagination !== undefined)
                            writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                        if (this.height !== undefined)
                            writer.writeMessage(3, this.height, () => this.height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConnectionChannelsResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.channels, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_3.ibc.core.channel.v1.IdentifiedChannel.deserialize(reader), dependency_3.ibc.core.channel.v1.IdentifiedChannel));
                                    break;
                                case 2:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.height, () => message.height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryConnectionChannelsResponse.deserialize(bytes);
                    }
                }
                v1.QueryConnectionChannelsResponse = QueryConnectionChannelsResponse;
                class QueryChannelClientStateRequest extends pb_1.Message {
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
                        const message = new QueryChannelClientStateRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryChannelClientStateRequest();
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
                        return QueryChannelClientStateRequest.deserialize(bytes);
                    }
                }
                v1.QueryChannelClientStateRequest = QueryChannelClientStateRequest;
                class QueryChannelClientStateResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("identified_client_state" in data && data.identified_client_state != undefined) {
                                this.identified_client_state = data.identified_client_state;
                            }
                            if ("proof" in data && data.proof != undefined) {
                                this.proof = data.proof;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                        }
                    }
                    get identified_client_state() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.IdentifiedClientState, 1);
                    }
                    set identified_client_state(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryChannelClientStateResponse({});
                        if (data.identified_client_state != null) {
                            message.identified_client_state = dependency_1.ibc.core.client.v1.IdentifiedClientState.fromObject(data.identified_client_state);
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_1.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.identified_client_state != null) {
                            data.identified_client_state = this.identified_client_state.toObject();
                        }
                        if (this.proof != null) {
                            data.proof = this.proof;
                        }
                        if (this.proof_height != null) {
                            data.proof_height = this.proof_height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.identified_client_state !== undefined)
                            writer.writeMessage(1, this.identified_client_state, () => this.identified_client_state.serialize(writer));
                        if (this.proof !== undefined)
                            writer.writeBytes(2, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(3, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryChannelClientStateResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.identified_client_state, () => message.identified_client_state = dependency_1.ibc.core.client.v1.IdentifiedClientState.deserialize(reader));
                                    break;
                                case 2:
                                    message.proof = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryChannelClientStateResponse.deserialize(bytes);
                    }
                }
                v1.QueryChannelClientStateResponse = QueryChannelClientStateResponse;
                class QueryChannelConsensusStateRequest extends pb_1.Message {
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
                            if ("revision_number" in data && data.revision_number != undefined) {
                                this.revision_number = data.revision_number;
                            }
                            if ("revision_height" in data && data.revision_height != undefined) {
                                this.revision_height = data.revision_height;
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
                    get revision_number() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set revision_number(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get revision_height() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set revision_height(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new QueryChannelConsensusStateRequest({});
                        if (data.port_id != null) {
                            message.port_id = data.port_id;
                        }
                        if (data.channel_id != null) {
                            message.channel_id = data.channel_id;
                        }
                        if (data.revision_number != null) {
                            message.revision_number = data.revision_number;
                        }
                        if (data.revision_height != null) {
                            message.revision_height = data.revision_height;
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
                        if (this.revision_number != null) {
                            data.revision_number = this.revision_number;
                        }
                        if (this.revision_height != null) {
                            data.revision_height = this.revision_height;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.port_id === "string" && this.port_id.length)
                            writer.writeString(1, this.port_id);
                        if (typeof this.channel_id === "string" && this.channel_id.length)
                            writer.writeString(2, this.channel_id);
                        if (this.revision_number !== undefined)
                            writer.writeUint64(3, this.revision_number);
                        if (this.revision_height !== undefined)
                            writer.writeUint64(4, this.revision_height);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryChannelConsensusStateRequest();
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
                                    message.revision_number = reader.readUint64();
                                    break;
                                case 4:
                                    message.revision_height = reader.readUint64();
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
                        return QueryChannelConsensusStateRequest.deserialize(bytes);
                    }
                }
                v1.QueryChannelConsensusStateRequest = QueryChannelConsensusStateRequest;
                class QueryChannelConsensusStateResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("consensus_state" in data && data.consensus_state != undefined) {
                                this.consensus_state = data.consensus_state;
                            }
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("proof" in data && data.proof != undefined) {
                                this.proof = data.proof;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                        }
                    }
                    get consensus_state() {
                        return pb_1.Message.getWrapperField(this, dependency_5.google.protobuf.Any, 1);
                    }
                    set consensus_state(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 4);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new QueryChannelConsensusStateResponse({});
                        if (data.consensus_state != null) {
                            message.consensus_state = dependency_5.google.protobuf.Any.fromObject(data.consensus_state);
                        }
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_1.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.consensus_state != null) {
                            data.consensus_state = this.consensus_state.toObject();
                        }
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.proof != null) {
                            data.proof = this.proof;
                        }
                        if (this.proof_height != null) {
                            data.proof_height = this.proof_height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.consensus_state !== undefined)
                            writer.writeMessage(1, this.consensus_state, () => this.consensus_state.serialize(writer));
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(2, this.client_id);
                        if (this.proof !== undefined)
                            writer.writeBytes(3, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(4, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryChannelConsensusStateResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.consensus_state, () => message.consensus_state = dependency_5.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 2:
                                    message.client_id = reader.readString();
                                    break;
                                case 3:
                                    message.proof = reader.readBytes();
                                    break;
                                case 4:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryChannelConsensusStateResponse.deserialize(bytes);
                    }
                }
                v1.QueryChannelConsensusStateResponse = QueryChannelConsensusStateResponse;
                class QueryPacketCommitmentRequest extends pb_1.Message {
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
                        const message = new QueryPacketCommitmentRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryPacketCommitmentRequest();
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
                        return QueryPacketCommitmentRequest.deserialize(bytes);
                    }
                }
                v1.QueryPacketCommitmentRequest = QueryPacketCommitmentRequest;
                class QueryPacketCommitmentResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("commitment" in data && data.commitment != undefined) {
                                this.commitment = data.commitment;
                            }
                            if ("proof" in data && data.proof != undefined) {
                                this.proof = data.proof;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                        }
                    }
                    get commitment() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set commitment(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryPacketCommitmentResponse({});
                        if (data.commitment != null) {
                            message.commitment = data.commitment;
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_1.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.commitment != null) {
                            data.commitment = this.commitment;
                        }
                        if (this.proof != null) {
                            data.proof = this.proof;
                        }
                        if (this.proof_height != null) {
                            data.proof_height = this.proof_height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.commitment !== undefined)
                            writer.writeBytes(1, this.commitment);
                        if (this.proof !== undefined)
                            writer.writeBytes(2, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(3, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryPacketCommitmentResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.commitment = reader.readBytes();
                                    break;
                                case 2:
                                    message.proof = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryPacketCommitmentResponse.deserialize(bytes);
                    }
                }
                v1.QueryPacketCommitmentResponse = QueryPacketCommitmentResponse;
                class QueryPacketCommitmentsRequest extends pb_1.Message {
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
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
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
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageRequest, 3);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryPacketCommitmentsRequest({});
                        if (data.port_id != null) {
                            message.port_id = data.port_id;
                        }
                        if (data.channel_id != null) {
                            message.channel_id = data.channel_id;
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_2.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
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
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.port_id === "string" && this.port_id.length)
                            writer.writeString(1, this.port_id);
                        if (typeof this.channel_id === "string" && this.channel_id.length)
                            writer.writeString(2, this.channel_id);
                        if (this.pagination !== undefined)
                            writer.writeMessage(3, this.pagination, () => this.pagination.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryPacketCommitmentsRequest();
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
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
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
                        return QueryPacketCommitmentsRequest.deserialize(bytes);
                    }
                }
                v1.QueryPacketCommitmentsRequest = QueryPacketCommitmentsRequest;
                class QueryPacketCommitmentsResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("commitments" in data && data.commitments != undefined) {
                                this.commitments = data.commitments;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                        }
                    }
                    get commitments() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_3.ibc.core.channel.v1.PacketState, 1);
                    }
                    set commitments(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageResponse, 2);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 3);
                    }
                    set height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryPacketCommitmentsResponse({});
                        if (data.commitments != null) {
                            message.commitments = data.commitments.map(item => dependency_3.ibc.core.channel.v1.PacketState.fromObject(item));
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                        }
                        if (data.height != null) {
                            message.height = dependency_1.ibc.core.client.v1.Height.fromObject(data.height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.commitments != null) {
                            data.commitments = this.commitments.map((item) => item.toObject());
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        if (this.height != null) {
                            data.height = this.height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.commitments !== undefined)
                            writer.writeRepeatedMessage(1, this.commitments, (item) => item.serialize(writer));
                        if (this.pagination !== undefined)
                            writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                        if (this.height !== undefined)
                            writer.writeMessage(3, this.height, () => this.height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryPacketCommitmentsResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.commitments, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_3.ibc.core.channel.v1.PacketState.deserialize(reader), dependency_3.ibc.core.channel.v1.PacketState));
                                    break;
                                case 2:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.height, () => message.height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryPacketCommitmentsResponse.deserialize(bytes);
                    }
                }
                v1.QueryPacketCommitmentsResponse = QueryPacketCommitmentsResponse;
                class QueryPacketReceiptRequest extends pb_1.Message {
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
                        const message = new QueryPacketReceiptRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryPacketReceiptRequest();
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
                        return QueryPacketReceiptRequest.deserialize(bytes);
                    }
                }
                v1.QueryPacketReceiptRequest = QueryPacketReceiptRequest;
                class QueryPacketReceiptResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("received" in data && data.received != undefined) {
                                this.received = data.received;
                            }
                            if ("proof" in data && data.proof != undefined) {
                                this.proof = data.proof;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                        }
                    }
                    get received() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set received(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 4);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new QueryPacketReceiptResponse({});
                        if (data.received != null) {
                            message.received = data.received;
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_1.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.received != null) {
                            data.received = this.received;
                        }
                        if (this.proof != null) {
                            data.proof = this.proof;
                        }
                        if (this.proof_height != null) {
                            data.proof_height = this.proof_height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.received !== undefined)
                            writer.writeBool(2, this.received);
                        if (this.proof !== undefined)
                            writer.writeBytes(3, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(4, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryPacketReceiptResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 2:
                                    message.received = reader.readBool();
                                    break;
                                case 3:
                                    message.proof = reader.readBytes();
                                    break;
                                case 4:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryPacketReceiptResponse.deserialize(bytes);
                    }
                }
                v1.QueryPacketReceiptResponse = QueryPacketReceiptResponse;
                class QueryPacketAcknowledgementRequest extends pb_1.Message {
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
                        const message = new QueryPacketAcknowledgementRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryPacketAcknowledgementRequest();
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
                        return QueryPacketAcknowledgementRequest.deserialize(bytes);
                    }
                }
                v1.QueryPacketAcknowledgementRequest = QueryPacketAcknowledgementRequest;
                class QueryPacketAcknowledgementResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("acknowledgement" in data && data.acknowledgement != undefined) {
                                this.acknowledgement = data.acknowledgement;
                            }
                            if ("proof" in data && data.proof != undefined) {
                                this.proof = data.proof;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                        }
                    }
                    get acknowledgement() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set acknowledgement(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryPacketAcknowledgementResponse({});
                        if (data.acknowledgement != null) {
                            message.acknowledgement = data.acknowledgement;
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_1.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.acknowledgement != null) {
                            data.acknowledgement = this.acknowledgement;
                        }
                        if (this.proof != null) {
                            data.proof = this.proof;
                        }
                        if (this.proof_height != null) {
                            data.proof_height = this.proof_height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.acknowledgement !== undefined)
                            writer.writeBytes(1, this.acknowledgement);
                        if (this.proof !== undefined)
                            writer.writeBytes(2, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(3, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryPacketAcknowledgementResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.acknowledgement = reader.readBytes();
                                    break;
                                case 2:
                                    message.proof = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryPacketAcknowledgementResponse.deserialize(bytes);
                    }
                }
                v1.QueryPacketAcknowledgementResponse = QueryPacketAcknowledgementResponse;
                class QueryPacketAcknowledgementsRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("port_id" in data && data.port_id != undefined) {
                                this.port_id = data.port_id;
                            }
                            if ("channel_id" in data && data.channel_id != undefined) {
                                this.channel_id = data.channel_id;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                            if ("packet_commitment_sequences" in data && data.packet_commitment_sequences != undefined) {
                                this.packet_commitment_sequences = data.packet_commitment_sequences;
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
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageRequest, 3);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get packet_commitment_sequences() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set packet_commitment_sequences(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new QueryPacketAcknowledgementsRequest({});
                        if (data.port_id != null) {
                            message.port_id = data.port_id;
                        }
                        if (data.channel_id != null) {
                            message.channel_id = data.channel_id;
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_2.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
                        }
                        if (data.packet_commitment_sequences != null) {
                            message.packet_commitment_sequences = data.packet_commitment_sequences;
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
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        if (this.packet_commitment_sequences != null) {
                            data.packet_commitment_sequences = this.packet_commitment_sequences;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.port_id === "string" && this.port_id.length)
                            writer.writeString(1, this.port_id);
                        if (typeof this.channel_id === "string" && this.channel_id.length)
                            writer.writeString(2, this.channel_id);
                        if (this.pagination !== undefined)
                            writer.writeMessage(3, this.pagination, () => this.pagination.serialize(writer));
                        if (this.packet_commitment_sequences !== undefined)
                            writer.writePackedUint64(4, this.packet_commitment_sequences);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryPacketAcknowledgementsRequest();
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
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
                                    break;
                                case 4:
                                    message.packet_commitment_sequences = reader.readPackedUint64();
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
                        return QueryPacketAcknowledgementsRequest.deserialize(bytes);
                    }
                }
                v1.QueryPacketAcknowledgementsRequest = QueryPacketAcknowledgementsRequest;
                class QueryPacketAcknowledgementsResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("acknowledgements" in data && data.acknowledgements != undefined) {
                                this.acknowledgements = data.acknowledgements;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                        }
                    }
                    get acknowledgements() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_3.ibc.core.channel.v1.PacketState, 1);
                    }
                    set acknowledgements(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageResponse, 2);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 3);
                    }
                    set height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryPacketAcknowledgementsResponse({});
                        if (data.acknowledgements != null) {
                            message.acknowledgements = data.acknowledgements.map(item => dependency_3.ibc.core.channel.v1.PacketState.fromObject(item));
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                        }
                        if (data.height != null) {
                            message.height = dependency_1.ibc.core.client.v1.Height.fromObject(data.height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.acknowledgements != null) {
                            data.acknowledgements = this.acknowledgements.map((item) => item.toObject());
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        if (this.height != null) {
                            data.height = this.height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.acknowledgements !== undefined)
                            writer.writeRepeatedMessage(1, this.acknowledgements, (item) => item.serialize(writer));
                        if (this.pagination !== undefined)
                            writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                        if (this.height !== undefined)
                            writer.writeMessage(3, this.height, () => this.height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryPacketAcknowledgementsResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.acknowledgements, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_3.ibc.core.channel.v1.PacketState.deserialize(reader), dependency_3.ibc.core.channel.v1.PacketState));
                                    break;
                                case 2:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.height, () => message.height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryPacketAcknowledgementsResponse.deserialize(bytes);
                    }
                }
                v1.QueryPacketAcknowledgementsResponse = QueryPacketAcknowledgementsResponse;
                class QueryUnreceivedPacketsRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("port_id" in data && data.port_id != undefined) {
                                this.port_id = data.port_id;
                            }
                            if ("channel_id" in data && data.channel_id != undefined) {
                                this.channel_id = data.channel_id;
                            }
                            if ("packet_commitment_sequences" in data && data.packet_commitment_sequences != undefined) {
                                this.packet_commitment_sequences = data.packet_commitment_sequences;
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
                    get packet_commitment_sequences() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set packet_commitment_sequences(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryUnreceivedPacketsRequest({});
                        if (data.port_id != null) {
                            message.port_id = data.port_id;
                        }
                        if (data.channel_id != null) {
                            message.channel_id = data.channel_id;
                        }
                        if (data.packet_commitment_sequences != null) {
                            message.packet_commitment_sequences = data.packet_commitment_sequences;
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
                        if (this.packet_commitment_sequences != null) {
                            data.packet_commitment_sequences = this.packet_commitment_sequences;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.port_id === "string" && this.port_id.length)
                            writer.writeString(1, this.port_id);
                        if (typeof this.channel_id === "string" && this.channel_id.length)
                            writer.writeString(2, this.channel_id);
                        if (this.packet_commitment_sequences !== undefined)
                            writer.writePackedUint64(3, this.packet_commitment_sequences);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryUnreceivedPacketsRequest();
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
                                    message.packet_commitment_sequences = reader.readPackedUint64();
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
                        return QueryUnreceivedPacketsRequest.deserialize(bytes);
                    }
                }
                v1.QueryUnreceivedPacketsRequest = QueryUnreceivedPacketsRequest;
                class QueryUnreceivedPacketsResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("sequences" in data && data.sequences != undefined) {
                                this.sequences = data.sequences;
                            }
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                        }
                    }
                    get sequences() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set sequences(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 2);
                    }
                    set height(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new QueryUnreceivedPacketsResponse({});
                        if (data.sequences != null) {
                            message.sequences = data.sequences;
                        }
                        if (data.height != null) {
                            message.height = dependency_1.ibc.core.client.v1.Height.fromObject(data.height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.sequences != null) {
                            data.sequences = this.sequences;
                        }
                        if (this.height != null) {
                            data.height = this.height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.sequences !== undefined)
                            writer.writePackedUint64(1, this.sequences);
                        if (this.height !== undefined)
                            writer.writeMessage(2, this.height, () => this.height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryUnreceivedPacketsResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.sequences = reader.readPackedUint64();
                                    break;
                                case 2:
                                    reader.readMessage(message.height, () => message.height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryUnreceivedPacketsResponse.deserialize(bytes);
                    }
                }
                v1.QueryUnreceivedPacketsResponse = QueryUnreceivedPacketsResponse;
                class QueryUnreceivedAcksRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("port_id" in data && data.port_id != undefined) {
                                this.port_id = data.port_id;
                            }
                            if ("channel_id" in data && data.channel_id != undefined) {
                                this.channel_id = data.channel_id;
                            }
                            if ("packet_ack_sequences" in data && data.packet_ack_sequences != undefined) {
                                this.packet_ack_sequences = data.packet_ack_sequences;
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
                    get packet_ack_sequences() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set packet_ack_sequences(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryUnreceivedAcksRequest({});
                        if (data.port_id != null) {
                            message.port_id = data.port_id;
                        }
                        if (data.channel_id != null) {
                            message.channel_id = data.channel_id;
                        }
                        if (data.packet_ack_sequences != null) {
                            message.packet_ack_sequences = data.packet_ack_sequences;
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
                        if (this.packet_ack_sequences != null) {
                            data.packet_ack_sequences = this.packet_ack_sequences;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.port_id === "string" && this.port_id.length)
                            writer.writeString(1, this.port_id);
                        if (typeof this.channel_id === "string" && this.channel_id.length)
                            writer.writeString(2, this.channel_id);
                        if (this.packet_ack_sequences !== undefined)
                            writer.writePackedUint64(3, this.packet_ack_sequences);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryUnreceivedAcksRequest();
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
                                    message.packet_ack_sequences = reader.readPackedUint64();
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
                        return QueryUnreceivedAcksRequest.deserialize(bytes);
                    }
                }
                v1.QueryUnreceivedAcksRequest = QueryUnreceivedAcksRequest;
                class QueryUnreceivedAcksResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("sequences" in data && data.sequences != undefined) {
                                this.sequences = data.sequences;
                            }
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                        }
                    }
                    get sequences() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set sequences(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 2);
                    }
                    set height(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new QueryUnreceivedAcksResponse({});
                        if (data.sequences != null) {
                            message.sequences = data.sequences;
                        }
                        if (data.height != null) {
                            message.height = dependency_1.ibc.core.client.v1.Height.fromObject(data.height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.sequences != null) {
                            data.sequences = this.sequences;
                        }
                        if (this.height != null) {
                            data.height = this.height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.sequences !== undefined)
                            writer.writePackedUint64(1, this.sequences);
                        if (this.height !== undefined)
                            writer.writeMessage(2, this.height, () => this.height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryUnreceivedAcksResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.sequences = reader.readPackedUint64();
                                    break;
                                case 2:
                                    reader.readMessage(message.height, () => message.height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryUnreceivedAcksResponse.deserialize(bytes);
                    }
                }
                v1.QueryUnreceivedAcksResponse = QueryUnreceivedAcksResponse;
                class QueryNextSequenceReceiveRequest extends pb_1.Message {
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
                        const message = new QueryNextSequenceReceiveRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryNextSequenceReceiveRequest();
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
                        return QueryNextSequenceReceiveRequest.deserialize(bytes);
                    }
                }
                v1.QueryNextSequenceReceiveRequest = QueryNextSequenceReceiveRequest;
                class QueryNextSequenceReceiveResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("next_sequence_receive" in data && data.next_sequence_receive != undefined) {
                                this.next_sequence_receive = data.next_sequence_receive;
                            }
                            if ("proof" in data && data.proof != undefined) {
                                this.proof = data.proof;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                        }
                    }
                    get next_sequence_receive() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set next_sequence_receive(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_1.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryNextSequenceReceiveResponse({});
                        if (data.next_sequence_receive != null) {
                            message.next_sequence_receive = data.next_sequence_receive;
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_1.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.next_sequence_receive != null) {
                            data.next_sequence_receive = this.next_sequence_receive;
                        }
                        if (this.proof != null) {
                            data.proof = this.proof;
                        }
                        if (this.proof_height != null) {
                            data.proof_height = this.proof_height.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.next_sequence_receive !== undefined)
                            writer.writeUint64(1, this.next_sequence_receive);
                        if (this.proof !== undefined)
                            writer.writeBytes(2, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(3, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryNextSequenceReceiveResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.next_sequence_receive = reader.readUint64();
                                    break;
                                case 2:
                                    message.proof = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_1.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryNextSequenceReceiveResponse.deserialize(bytes);
                    }
                }
                v1.QueryNextSequenceReceiveResponse = QueryNextSequenceReceiveResponse;
            })(v1 = channel.v1 || (channel.v1 = {}));
        })(channel = core.channel || (core.channel = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=query.js.map