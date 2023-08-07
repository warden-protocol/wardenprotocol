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
const dependency_1 = __importStar(require("./../../../../cosmos/base/query/v1beta1/pagination"));
const dependency_2 = __importStar(require("./client"));
const dependency_3 = __importStar(require("./../../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var client;
        (function (client) {
            var v1;
            (function (v1) {
                class QueryClientStateRequest extends pb_1.Message {
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
                        const message = new QueryClientStateRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryClientStateRequest();
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
                        return QueryClientStateRequest.deserialize(bytes);
                    }
                }
                v1.QueryClientStateRequest = QueryClientStateRequest;
                class QueryClientStateResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_state" in data && data.client_state != undefined) {
                                this.client_state = data.client_state;
                            }
                            if ("proof" in data && data.proof != undefined) {
                                this.proof = data.proof;
                            }
                            if ("proof_height" in data && data.proof_height != undefined) {
                                this.proof_height = data.proof_height;
                            }
                        }
                    }
                    get client_state() {
                        return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Any, 1);
                    }
                    set client_state(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_2.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryClientStateResponse({});
                        if (data.client_state != null) {
                            message.client_state = dependency_3.google.protobuf.Any.fromObject(data.client_state);
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_2.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_state != null) {
                            data.client_state = this.client_state.toObject();
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
                        if (this.client_state !== undefined)
                            writer.writeMessage(1, this.client_state, () => this.client_state.serialize(writer));
                        if (this.proof !== undefined)
                            writer.writeBytes(2, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(3, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryClientStateResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.client_state, () => message.client_state = dependency_3.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 2:
                                    message.proof = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_2.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryClientStateResponse.deserialize(bytes);
                    }
                }
                v1.QueryClientStateResponse = QueryClientStateResponse;
                class QueryClientStatesRequest extends pb_1.Message {
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
                        return pb_1.Message.getWrapperField(this, dependency_1.cosmos.base.query.v1beta1.PageRequest, 1);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new QueryClientStatesRequest({});
                        if (data.pagination != null) {
                            message.pagination = dependency_1.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryClientStatesRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_1.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
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
                        return QueryClientStatesRequest.deserialize(bytes);
                    }
                }
                v1.QueryClientStatesRequest = QueryClientStatesRequest;
                class QueryClientStatesResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_states" in data && data.client_states != undefined) {
                                this.client_states = data.client_states;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                        }
                    }
                    get client_states() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.ibc.core.client.v1.IdentifiedClientState, 1);
                    }
                    set client_states(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_1.cosmos.base.query.v1beta1.PageResponse, 2);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new QueryClientStatesResponse({});
                        if (data.client_states != null) {
                            message.client_states = data.client_states.map(item => dependency_2.ibc.core.client.v1.IdentifiedClientState.fromObject(item));
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_1.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_states != null) {
                            data.client_states = this.client_states.map((item) => item.toObject());
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.client_states !== undefined)
                            writer.writeRepeatedMessage(1, this.client_states, (item) => item.serialize(writer));
                        if (this.pagination !== undefined)
                            writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryClientStatesResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.client_states, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_2.ibc.core.client.v1.IdentifiedClientState.deserialize(reader), dependency_2.ibc.core.client.v1.IdentifiedClientState));
                                    break;
                                case 2:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_1.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
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
                        return QueryClientStatesResponse.deserialize(bytes);
                    }
                }
                v1.QueryClientStatesResponse = QueryClientStatesResponse;
                class QueryConsensusStateRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("revision_number" in data && data.revision_number != undefined) {
                                this.revision_number = data.revision_number;
                            }
                            if ("revision_height" in data && data.revision_height != undefined) {
                                this.revision_height = data.revision_height;
                            }
                            if ("latest_height" in data && data.latest_height != undefined) {
                                this.latest_height = data.latest_height;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
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
                    get latest_height() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set latest_height(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConsensusStateRequest({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.revision_number != null) {
                            message.revision_number = data.revision_number;
                        }
                        if (data.revision_height != null) {
                            message.revision_height = data.revision_height;
                        }
                        if (data.latest_height != null) {
                            message.latest_height = data.latest_height;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.revision_number != null) {
                            data.revision_number = this.revision_number;
                        }
                        if (this.revision_height != null) {
                            data.revision_height = this.revision_height;
                        }
                        if (this.latest_height != null) {
                            data.latest_height = this.latest_height;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.revision_number !== undefined)
                            writer.writeUint64(2, this.revision_number);
                        if (this.revision_height !== undefined)
                            writer.writeUint64(3, this.revision_height);
                        if (this.latest_height !== undefined)
                            writer.writeBool(4, this.latest_height);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConsensusStateRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    message.revision_number = reader.readUint64();
                                    break;
                                case 3:
                                    message.revision_height = reader.readUint64();
                                    break;
                                case 4:
                                    message.latest_height = reader.readBool();
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
                        return QueryConsensusStateRequest.deserialize(bytes);
                    }
                }
                v1.QueryConsensusStateRequest = QueryConsensusStateRequest;
                class QueryConsensusStateResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("consensus_state" in data && data.consensus_state != undefined) {
                                this.consensus_state = data.consensus_state;
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
                        return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Any, 1);
                    }
                    set consensus_state(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get proof() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set proof(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get proof_height() {
                        return pb_1.Message.getWrapperField(this, dependency_2.ibc.core.client.v1.Height, 3);
                    }
                    set proof_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConsensusStateResponse({});
                        if (data.consensus_state != null) {
                            message.consensus_state = dependency_3.google.protobuf.Any.fromObject(data.consensus_state);
                        }
                        if (data.proof != null) {
                            message.proof = data.proof;
                        }
                        if (data.proof_height != null) {
                            message.proof_height = dependency_2.ibc.core.client.v1.Height.fromObject(data.proof_height);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.consensus_state != null) {
                            data.consensus_state = this.consensus_state.toObject();
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
                        if (this.proof !== undefined)
                            writer.writeBytes(2, this.proof);
                        if (this.proof_height !== undefined)
                            writer.writeMessage(3, this.proof_height, () => this.proof_height.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConsensusStateResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.consensus_state, () => message.consensus_state = dependency_3.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 2:
                                    message.proof = reader.readBytes();
                                    break;
                                case 3:
                                    reader.readMessage(message.proof_height, () => message.proof_height = dependency_2.ibc.core.client.v1.Height.deserialize(reader));
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
                        return QueryConsensusStateResponse.deserialize(bytes);
                    }
                }
                v1.QueryConsensusStateResponse = QueryConsensusStateResponse;
                class QueryConsensusStatesRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_1.cosmos.base.query.v1beta1.PageRequest, 2);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConsensusStatesRequest({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_1.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.pagination !== undefined)
                            writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConsensusStatesRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_1.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
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
                        return QueryConsensusStatesRequest.deserialize(bytes);
                    }
                }
                v1.QueryConsensusStatesRequest = QueryConsensusStatesRequest;
                class QueryConsensusStatesResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("consensus_states" in data && data.consensus_states != undefined) {
                                this.consensus_states = data.consensus_states;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                        }
                    }
                    get consensus_states() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.ibc.core.client.v1.ConsensusStateWithHeight, 1);
                    }
                    set consensus_states(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_1.cosmos.base.query.v1beta1.PageResponse, 2);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new QueryConsensusStatesResponse({});
                        if (data.consensus_states != null) {
                            message.consensus_states = data.consensus_states.map(item => dependency_2.ibc.core.client.v1.ConsensusStateWithHeight.fromObject(item));
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_1.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.consensus_states != null) {
                            data.consensus_states = this.consensus_states.map((item) => item.toObject());
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.consensus_states !== undefined)
                            writer.writeRepeatedMessage(1, this.consensus_states, (item) => item.serialize(writer));
                        if (this.pagination !== undefined)
                            writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryConsensusStatesResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.consensus_states, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_2.ibc.core.client.v1.ConsensusStateWithHeight.deserialize(reader), dependency_2.ibc.core.client.v1.ConsensusStateWithHeight));
                                    break;
                                case 2:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_1.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
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
                        return QueryConsensusStatesResponse.deserialize(bytes);
                    }
                }
                v1.QueryConsensusStatesResponse = QueryConsensusStatesResponse;
                class QueryClientStatusRequest extends pb_1.Message {
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
                        const message = new QueryClientStatusRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryClientStatusRequest();
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
                        return QueryClientStatusRequest.deserialize(bytes);
                    }
                }
                v1.QueryClientStatusRequest = QueryClientStatusRequest;
                class QueryClientStatusResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("status" in data && data.status != undefined) {
                                this.status = data.status;
                            }
                        }
                    }
                    get status() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set status(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new QueryClientStatusResponse({});
                        if (data.status != null) {
                            message.status = data.status;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.status != null) {
                            data.status = this.status;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.status === "string" && this.status.length)
                            writer.writeString(1, this.status);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryClientStatusResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.status = reader.readString();
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
                        return QueryClientStatusResponse.deserialize(bytes);
                    }
                }
                v1.QueryClientStatusResponse = QueryClientStatusResponse;
                class QueryClientParamsRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new QueryClientParamsRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryClientParamsRequest();
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
                        return QueryClientParamsRequest.deserialize(bytes);
                    }
                }
                v1.QueryClientParamsRequest = QueryClientParamsRequest;
                class QueryClientParamsResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("params" in data && data.params != undefined) {
                                this.params = data.params;
                            }
                        }
                    }
                    get params() {
                        return pb_1.Message.getWrapperField(this, dependency_2.ibc.core.client.v1.Params, 1);
                    }
                    set params(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new QueryClientParamsResponse({});
                        if (data.params != null) {
                            message.params = dependency_2.ibc.core.client.v1.Params.fromObject(data.params);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.params != null) {
                            data.params = this.params.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.params !== undefined)
                            writer.writeMessage(1, this.params, () => this.params.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryClientParamsResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.params, () => message.params = dependency_2.ibc.core.client.v1.Params.deserialize(reader));
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
                        return QueryClientParamsResponse.deserialize(bytes);
                    }
                }
                v1.QueryClientParamsResponse = QueryClientParamsResponse;
                class QueryUpgradedClientStateRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new QueryUpgradedClientStateRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryUpgradedClientStateRequest();
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
                        return QueryUpgradedClientStateRequest.deserialize(bytes);
                    }
                }
                v1.QueryUpgradedClientStateRequest = QueryUpgradedClientStateRequest;
                class QueryUpgradedClientStateResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("upgraded_client_state" in data && data.upgraded_client_state != undefined) {
                                this.upgraded_client_state = data.upgraded_client_state;
                            }
                        }
                    }
                    get upgraded_client_state() {
                        return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Any, 1);
                    }
                    set upgraded_client_state(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new QueryUpgradedClientStateResponse({});
                        if (data.upgraded_client_state != null) {
                            message.upgraded_client_state = dependency_3.google.protobuf.Any.fromObject(data.upgraded_client_state);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.upgraded_client_state != null) {
                            data.upgraded_client_state = this.upgraded_client_state.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.upgraded_client_state !== undefined)
                            writer.writeMessage(1, this.upgraded_client_state, () => this.upgraded_client_state.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryUpgradedClientStateResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.upgraded_client_state, () => message.upgraded_client_state = dependency_3.google.protobuf.Any.deserialize(reader));
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
                        return QueryUpgradedClientStateResponse.deserialize(bytes);
                    }
                }
                v1.QueryUpgradedClientStateResponse = QueryUpgradedClientStateResponse;
                class QueryUpgradedConsensusStateRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new QueryUpgradedConsensusStateRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryUpgradedConsensusStateRequest();
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
                        return QueryUpgradedConsensusStateRequest.deserialize(bytes);
                    }
                }
                v1.QueryUpgradedConsensusStateRequest = QueryUpgradedConsensusStateRequest;
                class QueryUpgradedConsensusStateResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("upgraded_consensus_state" in data && data.upgraded_consensus_state != undefined) {
                                this.upgraded_consensus_state = data.upgraded_consensus_state;
                            }
                        }
                    }
                    get upgraded_consensus_state() {
                        return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Any, 1);
                    }
                    set upgraded_consensus_state(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new QueryUpgradedConsensusStateResponse({});
                        if (data.upgraded_consensus_state != null) {
                            message.upgraded_consensus_state = dependency_3.google.protobuf.Any.fromObject(data.upgraded_consensus_state);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.upgraded_consensus_state != null) {
                            data.upgraded_consensus_state = this.upgraded_consensus_state.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.upgraded_consensus_state !== undefined)
                            writer.writeMessage(1, this.upgraded_consensus_state, () => this.upgraded_consensus_state.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryUpgradedConsensusStateResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.upgraded_consensus_state, () => message.upgraded_consensus_state = dependency_3.google.protobuf.Any.deserialize(reader));
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
                        return QueryUpgradedConsensusStateResponse.deserialize(bytes);
                    }
                }
                v1.QueryUpgradedConsensusStateResponse = QueryUpgradedConsensusStateResponse;
            })(v1 = client.v1 || (client.v1 = {}));
        })(client = core.client || (core.client = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=query.js.map