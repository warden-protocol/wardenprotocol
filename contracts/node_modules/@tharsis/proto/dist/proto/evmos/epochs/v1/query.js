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
const dependency_3 = __importStar(require("./../../../cosmos/base/query/v1beta1/pagination"));
const dependency_4 = __importStar(require("./genesis"));
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var epochs;
    (function (epochs) {
        var v1;
        (function (v1) {
            class QueryEpochsInfoRequest extends pb_1.Message {
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
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.base.query.v1beta1.PageRequest, 1);
                }
                set pagination(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryEpochsInfoRequest({});
                    if (data.pagination != null) {
                        message.pagination = dependency_3.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryEpochsInfoRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.pagination, () => message.pagination = dependency_3.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
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
                    return QueryEpochsInfoRequest.deserialize(bytes);
                }
            }
            v1.QueryEpochsInfoRequest = QueryEpochsInfoRequest;
            class QueryEpochsInfoResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("epochs" in data && data.epochs != undefined) {
                            this.epochs = data.epochs;
                        }
                        if ("pagination" in data && data.pagination != undefined) {
                            this.pagination = data.pagination;
                        }
                    }
                }
                get epochs() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_4.evmos.epochs.v1.EpochInfo, 1);
                }
                set epochs(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get pagination() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.base.query.v1beta1.PageResponse, 2);
                }
                set pagination(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new QueryEpochsInfoResponse({});
                    if (data.epochs != null) {
                        message.epochs = data.epochs.map(item => dependency_4.evmos.epochs.v1.EpochInfo.fromObject(item));
                    }
                    if (data.pagination != null) {
                        message.pagination = dependency_3.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.epochs != null) {
                        data.epochs = this.epochs.map((item) => item.toObject());
                    }
                    if (this.pagination != null) {
                        data.pagination = this.pagination.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.epochs !== undefined)
                        writer.writeRepeatedMessage(1, this.epochs, (item) => item.serialize(writer));
                    if (this.pagination !== undefined)
                        writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryEpochsInfoResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.epochs, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_4.evmos.epochs.v1.EpochInfo.deserialize(reader), dependency_4.evmos.epochs.v1.EpochInfo));
                                break;
                            case 2:
                                reader.readMessage(message.pagination, () => message.pagination = dependency_3.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
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
                    return QueryEpochsInfoResponse.deserialize(bytes);
                }
            }
            v1.QueryEpochsInfoResponse = QueryEpochsInfoResponse;
            class QueryCurrentEpochRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("identifier" in data && data.identifier != undefined) {
                            this.identifier = data.identifier;
                        }
                    }
                }
                get identifier() {
                    return pb_1.Message.getField(this, 1);
                }
                set identifier(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryCurrentEpochRequest({});
                    if (data.identifier != null) {
                        message.identifier = data.identifier;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.identifier != null) {
                        data.identifier = this.identifier;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.identifier === "string" && this.identifier.length)
                        writer.writeString(1, this.identifier);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryCurrentEpochRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.identifier = reader.readString();
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
                    return QueryCurrentEpochRequest.deserialize(bytes);
                }
            }
            v1.QueryCurrentEpochRequest = QueryCurrentEpochRequest;
            class QueryCurrentEpochResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("current_epoch" in data && data.current_epoch != undefined) {
                            this.current_epoch = data.current_epoch;
                        }
                    }
                }
                get current_epoch() {
                    return pb_1.Message.getField(this, 1);
                }
                set current_epoch(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryCurrentEpochResponse({});
                    if (data.current_epoch != null) {
                        message.current_epoch = data.current_epoch;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.current_epoch != null) {
                        data.current_epoch = this.current_epoch;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.current_epoch !== undefined)
                        writer.writeInt64(1, this.current_epoch);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryCurrentEpochResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.current_epoch = reader.readInt64();
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
                    return QueryCurrentEpochResponse.deserialize(bytes);
                }
            }
            v1.QueryCurrentEpochResponse = QueryCurrentEpochResponse;
        })(v1 = epochs.v1 || (epochs.v1 = {}));
    })(epochs = evmos.epochs || (evmos.epochs = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=query.js.map