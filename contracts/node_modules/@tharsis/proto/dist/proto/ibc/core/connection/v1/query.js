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
const dependency_2 = __importStar(require("./../../../../cosmos/base/query/v1beta1/pagination"));
const dependency_3 = __importStar(require("./../../client/v1/client"));
const dependency_4 = __importStar(require("./connection"));
const dependency_6 = __importStar(require("./../../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var connection;
        (function (connection) {
            var v1;
            (function (v1) {
                class QueryConnectionRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connection_id" in data && data.connection_id != undefined) {
                                this.connection_id = data.connection_id;
                            }
                        }
                    }
                    get connection_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set connection_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConnectionRequest({});
                        if (data.connection_id != null) {
                            message.connection_id = data.connection_id;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.connection_id != null) {
                            data.connection_id = this.connection_id;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.connection_id === "string" && this.connection_id.length)
                            writer.writeString(1, this.connection_id);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConnectionRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.connection_id = reader.readString();
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
                        return QueryConnectionRequest.deserialize(bytes);
                    }
                }
                v1.QueryConnectionRequest = QueryConnectionRequest;
                class QueryConnectionResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connection" in data && data.connection != undefined) {
                                this.connection = data.connection;
                            }
                            if ("proof" in data && data.proof != undefined) {
                                this.proof = data.proof;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                        }
                    }
                    get connection() {
                        return pb_1.Message.getWrapperField(this, dependency_4.ibc.core.connection.v1.ConnectionEnd, 1);
                    }
                    set connection(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConnectionResponse({});
                        if (data.connection != null) {
                            message.connection = dependency_4.ibc.core.connection.v1.ConnectionEnd.fromObject(data.connection);
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_3.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.connection != null) {
                            data.connection = this.connection.toObject();
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
                        if (this.connection !== undefined)
                            writer.writeMessage(1, this.connection, () => this.connection.serialize(writer));
                        if (this.proof !== undefined)
                            writer.writeBytes(2, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(3, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConnectionResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.connection, () => message.connection = dependency_4.ibc.core.connection.v1.ConnectionEnd.deserialize(reader));
                                    break;
                                case 2:
                                    message.proof = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_3.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryConnectionResponse.deserialize(bytes);
                    }
                }
                v1.QueryConnectionResponse = QueryConnectionResponse;
                class QueryConnectionsRequest extends pb_1.Message {
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
                        const message = new QueryConnectionsRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConnectionsRequest();
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
                        return QueryConnectionsRequest.deserialize(bytes);
                    }
                }
                v1.QueryConnectionsRequest = QueryConnectionsRequest;
                class QueryConnectionsResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connections" in data && data.connections != undefined) {
                                this.connections = data.connections;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                        }
                    }
                    get connections() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_4.ibc.core.connection.v1.IdentifiedConnection, 1);
                    }
                    set connections(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.query.v1beta1.PageResponse, 2);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get height() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.Height, 3);
                    }
                    set height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConnectionsResponse({});
                        if (data.connections != null) {
                            message.connections = data.connections.map(item => dependency_4.ibc.core.connection.v1.IdentifiedConnection.fromObject(item));
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                        }
                        if (data.height != null) {
                            message.height = dependency_3.ibc.core.client.v1.Height.fromObject(data.height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.connections != null) {
                            data.connections = this.connections.map((item) => item.toObject());
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
                        if (this.connections !== undefined)
                            writer.writeRepeatedMessage(1, this.connections, (item) => item.serialize(writer));
                        if (this.pagination !== undefined)
                            writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                        if (this.height !== undefined)
                            writer.writeMessage(3, this.height, () => this.height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConnectionsResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.connections, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_4.ibc.core.connection.v1.IdentifiedConnection.deserialize(reader), dependency_4.ibc.core.connection.v1.IdentifiedConnection));
                                    break;
                                case 2:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_2.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.height, () => message.height = dependency_3.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryConnectionsResponse.deserialize(bytes);
                    }
                }
                v1.QueryConnectionsResponse = QueryConnectionsResponse;
                class QueryClientConnectionsRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new QueryClientConnectionsRequest({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryClientConnectionsRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
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
                        return QueryClientConnectionsRequest.deserialize(bytes);
                    }
                }
                v1.QueryClientConnectionsRequest = QueryClientConnectionsRequest;
                class QueryClientConnectionsResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connection_paths" in data && data.connection_paths != undefined) {
                                this.connection_paths = data.connection_paths;
                            }
                            if ("proof" in data && data.proof != undefined) {
                                this.proof = data.proof;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                        }
                    }
                    get connection_paths() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set connection_paths(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryClientConnectionsResponse({});
                        if (data.connection_paths != null) {
                            message.connection_paths = data.connection_paths;
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_3.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.connection_paths != null) {
                            data.connection_paths = this.connection_paths;
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
                        if (this.connection_paths !== undefined)
                            writer.writeRepeatedString(1, this.connection_paths);
                        if (this.proof !== undefined)
                            writer.writeBytes(2, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(3, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryClientConnectionsResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    pb_1.Message.addToRepeatedField(message, 1, reader.readString());
                                    break;
                                case 2:
                                    message.proof = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_3.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryClientConnectionsResponse.deserialize(bytes);
                    }
                }
                v1.QueryClientConnectionsResponse = QueryClientConnectionsResponse;
                class QueryConnectionClientStateRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connection_id" in data && data.connection_id != undefined) {
                                this.connection_id = data.connection_id;
                            }
                        }
                    }
                    get connection_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set connection_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConnectionClientStateRequest({});
                        if (data.connection_id != null) {
                            message.connection_id = data.connection_id;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.connection_id != null) {
                            data.connection_id = this.connection_id;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.connection_id === "string" && this.connection_id.length)
                            writer.writeString(1, this.connection_id);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConnectionClientStateRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.connection_id = reader.readString();
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
                        return QueryConnectionClientStateRequest.deserialize(bytes);
                    }
                }
                v1.QueryConnectionClientStateRequest = QueryConnectionClientStateRequest;
                class QueryConnectionClientStateResponse extends pb_1.Message {
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
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.IdentifiedClientState, 1);
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
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConnectionClientStateResponse({});
                        if (data.identified_client_state != null) {
                            message.identified_client_state = dependency_3.ibc.core.client.v1.IdentifiedClientState.fromObject(data.identified_client_state);
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_3.ibc.core.client.v1.Height.fromObject(data.proof_height);
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConnectionClientStateResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.identified_client_state, () => message.identified_client_state = dependency_3.ibc.core.client.v1.IdentifiedClientState.deserialize(reader));
                                    break;
                                case 2:
                                    message.proof = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_3.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryConnectionClientStateResponse.deserialize(bytes);
                    }
                }
                v1.QueryConnectionClientStateResponse = QueryConnectionClientStateResponse;
                class QueryConnectionConsensusStateRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connection_id" in data && data.connection_id != undefined) {
                                this.connection_id = data.connection_id;
                            }
                            if ("revision_number" in data && data.revision_number != undefined) {
                                this.revision_number = data.revision_number;
                            }
                            if ("revision_height" in data && data.revision_height != undefined) {
                                this.revision_height = data.revision_height;
                            }
                        }
                    }
                    get connection_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set connection_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get revision_number() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set revision_number(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get revision_height() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set revision_height(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConnectionConsensusStateRequest({});
                        if (data.connection_id != null) {
                            message.connection_id = data.connection_id;
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
                        if (this.connection_id != null) {
                            data.connection_id = this.connection_id;
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
                        if (typeof this.connection_id === "string" && this.connection_id.length)
                            writer.writeString(1, this.connection_id);
                        if (this.revision_number !== undefined)
                            writer.writeUint64(2, this.revision_number);
                        if (this.revision_height !== undefined)
                            writer.writeUint64(3, this.revision_height);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConnectionConsensusStateRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.connection_id = reader.readString();
                                    break;
                                case 2:
                                    message.revision_number = reader.readUint64();
                                    break;
                                case 3:
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
                        return QueryConnectionConsensusStateRequest.deserialize(bytes);
                    }
                }
                v1.QueryConnectionConsensusStateRequest = QueryConnectionConsensusStateRequest;
                class QueryConnectionConsensusStateResponse extends pb_1.Message {
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
                        return pb_1.Message.getWrapperField(this, dependency_6.google.protobuf.Any, 1);
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
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.client.v1.Height, 4);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConnectionConsensusStateResponse({});
                        if (data.consensus_state != null) {
                            message.consensus_state = dependency_6.google.protobuf.Any.fromObject(data.consensus_state);
                        }
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_3.ibc.core.client.v1.Height.fromObject(data.proof_height);
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConnectionConsensusStateResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.consensus_state, () => message.consensus_state = dependency_6.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 2:
                                    message.client_id = reader.readString();
                                    break;
                                case 3:
                                    message.proof = reader.readBytes();
                                    break;
                                case 4:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_3.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryConnectionConsensusStateResponse.deserialize(bytes);
                    }
                }
                v1.QueryConnectionConsensusStateResponse = QueryConnectionConsensusStateResponse;
            })(v1 = connection.v1 || (connection.v1 = {}));
        })(connection = core.connection || (core.connection = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=query.js.map