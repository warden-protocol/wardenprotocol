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
exports.cosmos = void 0;
const dependency_2 = __importStar(require("./../../../../google/protobuf/any"));
const dependency_4 = __importStar(require("./../../../../tendermint/p2p/types"));
const dependency_5 = __importStar(require("./../../../../tendermint/types/block"));
const dependency_6 = __importStar(require("./../../../../tendermint/types/types"));
const dependency_7 = __importStar(require("./../../query/v1beta1/pagination"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var base;
    (function (base) {
        var tendermint;
        (function (tendermint) {
            var v1beta1;
            (function (v1beta1) {
                class GetValidatorSetByHeightRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                        }
                    }
                    get height() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set height(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_7.cosmos.base.query.v1beta1.PageRequest, 2);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new GetValidatorSetByHeightRequest({});
                        if (data.height != null) {
                            message.height = data.height;
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_7.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.height != null) {
                            data.height = this.height;
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.height !== undefined)
                            writer.writeInt64(1, this.height);
                        if (this.pagination !== undefined)
                            writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetValidatorSetByHeightRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.height = reader.readInt64();
                                    break;
                                case 2:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_7.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
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
                        return GetValidatorSetByHeightRequest.deserialize(bytes);
                    }
                }
                v1beta1.GetValidatorSetByHeightRequest = GetValidatorSetByHeightRequest;
                class GetValidatorSetByHeightResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("block_height" in data && data.block_height != undefined) {
                                this.block_height = data.block_height;
                            }
                            if ("validators" in data && data.validators != undefined) {
                                this.validators = data.validators;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                        }
                    }
                    get block_height() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set block_height(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get validators() {
                        return pb_1.Message.getRepeatedWrapperField(this, Validator, 2);
                    }
                    set validators(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 2, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_7.cosmos.base.query.v1beta1.PageResponse, 3);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new GetValidatorSetByHeightResponse({});
                        if (data.block_height != null) {
                            message.block_height = data.block_height;
                        }
                        if (data.validators != null) {
                            message.validators = data.validators.map(item => Validator.fromObject(item));
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_7.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.block_height != null) {
                            data.block_height = this.block_height;
                        }
                        if (this.validators != null) {
                            data.validators = this.validators.map((item) => item.toObject());
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.block_height !== undefined)
                            writer.writeInt64(1, this.block_height);
                        if (this.validators !== undefined)
                            writer.writeRepeatedMessage(2, this.validators, (item) => item.serialize(writer));
                        if (this.pagination !== undefined)
                            writer.writeMessage(3, this.pagination, () => this.pagination.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetValidatorSetByHeightResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.block_height = reader.readInt64();
                                    break;
                                case 2:
                                    reader.readMessage(message.validators, () => pb_1.Message.addToRepeatedWrapperField(message, 2, Validator.deserialize(reader), Validator));
                                    break;
                                case 3:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_7.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
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
                        return GetValidatorSetByHeightResponse.deserialize(bytes);
                    }
                }
                v1beta1.GetValidatorSetByHeightResponse = GetValidatorSetByHeightResponse;
                class GetLatestValidatorSetRequest extends pb_1.Message {
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
                        return pb_1.Message.getWrapperField(this, dependency_7.cosmos.base.query.v1beta1.PageRequest, 1);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new GetLatestValidatorSetRequest({});
                        if (data.pagination != null) {
                            message.pagination = dependency_7.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetLatestValidatorSetRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_7.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
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
                        return GetLatestValidatorSetRequest.deserialize(bytes);
                    }
                }
                v1beta1.GetLatestValidatorSetRequest = GetLatestValidatorSetRequest;
                class GetLatestValidatorSetResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("block_height" in data && data.block_height != undefined) {
                                this.block_height = data.block_height;
                            }
                            if ("validators" in data && data.validators != undefined) {
                                this.validators = data.validators;
                            }
                            if ("pagination" in data && data.pagination != undefined) {
                                this.pagination = data.pagination;
                            }
                        }
                    }
                    get block_height() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set block_height(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get validators() {
                        return pb_1.Message.getRepeatedWrapperField(this, Validator, 2);
                    }
                    set validators(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 2, value);
                    }
                    get pagination() {
                        return pb_1.Message.getWrapperField(this, dependency_7.cosmos.base.query.v1beta1.PageResponse, 3);
                    }
                    set pagination(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new GetLatestValidatorSetResponse({});
                        if (data.block_height != null) {
                            message.block_height = data.block_height;
                        }
                        if (data.validators != null) {
                            message.validators = data.validators.map(item => Validator.fromObject(item));
                        }
                        if (data.pagination != null) {
                            message.pagination = dependency_7.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.block_height != null) {
                            data.block_height = this.block_height;
                        }
                        if (this.validators != null) {
                            data.validators = this.validators.map((item) => item.toObject());
                        }
                        if (this.pagination != null) {
                            data.pagination = this.pagination.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.block_height !== undefined)
                            writer.writeInt64(1, this.block_height);
                        if (this.validators !== undefined)
                            writer.writeRepeatedMessage(2, this.validators, (item) => item.serialize(writer));
                        if (this.pagination !== undefined)
                            writer.writeMessage(3, this.pagination, () => this.pagination.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetLatestValidatorSetResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.block_height = reader.readInt64();
                                    break;
                                case 2:
                                    reader.readMessage(message.validators, () => pb_1.Message.addToRepeatedWrapperField(message, 2, Validator.deserialize(reader), Validator));
                                    break;
                                case 3:
                                    reader.readMessage(message.pagination, () => message.pagination = dependency_7.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
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
                        return GetLatestValidatorSetResponse.deserialize(bytes);
                    }
                }
                v1beta1.GetLatestValidatorSetResponse = GetLatestValidatorSetResponse;
                class Validator extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("address" in data && data.address != undefined) {
                                this.address = data.address;
                            }
                            if ("pub_key" in data && data.pub_key != undefined) {
                                this.pub_key = data.pub_key;
                            }
                            if ("voting_power" in data && data.voting_power != undefined) {
                                this.voting_power = data.voting_power;
                            }
                            if ("proposer_priority" in data && data.proposer_priority != undefined) {
                                this.proposer_priority = data.proposer_priority;
                            }
                        }
                    }
                    get address() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set address(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get pub_key() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 2);
                    }
                    set pub_key(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get voting_power() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set voting_power(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get proposer_priority() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set proposer_priority(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new Validator({});
                        if (data.address != null) {
                            message.address = data.address;
                        }
                        if (data.pub_key != null) {
                            message.pub_key = dependency_2.google.protobuf.Any.fromObject(data.pub_key);
                        }
                        if (data.voting_power != null) {
                            message.voting_power = data.voting_power;
                        }
                        if (data.proposer_priority != null) {
                            message.proposer_priority = data.proposer_priority;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.address != null) {
                            data.address = this.address;
                        }
                        if (this.pub_key != null) {
                            data.pub_key = this.pub_key.toObject();
                        }
                        if (this.voting_power != null) {
                            data.voting_power = this.voting_power;
                        }
                        if (this.proposer_priority != null) {
                            data.proposer_priority = this.proposer_priority;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.address === "string" && this.address.length)
                            writer.writeString(1, this.address);
                        if (this.pub_key !== undefined)
                            writer.writeMessage(2, this.pub_key, () => this.pub_key.serialize(writer));
                        if (this.voting_power !== undefined)
                            writer.writeInt64(3, this.voting_power);
                        if (this.proposer_priority !== undefined)
                            writer.writeInt64(4, this.proposer_priority);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Validator();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.address = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.pub_key, () => message.pub_key = dependency_2.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 3:
                                    message.voting_power = reader.readInt64();
                                    break;
                                case 4:
                                    message.proposer_priority = reader.readInt64();
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
                        return Validator.deserialize(bytes);
                    }
                }
                v1beta1.Validator = Validator;
                class GetBlockByHeightRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                        }
                    }
                    get height() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set height(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new GetBlockByHeightRequest({});
                        if (data.height != null) {
                            message.height = data.height;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.height != null) {
                            data.height = this.height;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.height !== undefined)
                            writer.writeInt64(1, this.height);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetBlockByHeightRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.height = reader.readInt64();
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
                        return GetBlockByHeightRequest.deserialize(bytes);
                    }
                }
                v1beta1.GetBlockByHeightRequest = GetBlockByHeightRequest;
                class GetBlockByHeightResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("block_id" in data && data.block_id != undefined) {
                                this.block_id = data.block_id;
                            }
                            if ("block" in data && data.block != undefined) {
                                this.block = data.block;
                            }
                        }
                    }
                    get block_id() {
                        return pb_1.Message.getWrapperField(this, dependency_6.tendermint.types.BlockID, 1);
                    }
                    set block_id(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get block() {
                        return pb_1.Message.getWrapperField(this, dependency_5.tendermint.types.Block, 2);
                    }
                    set block(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new GetBlockByHeightResponse({});
                        if (data.block_id != null) {
                            message.block_id = dependency_6.tendermint.types.BlockID.fromObject(data.block_id);
                        }
                        if (data.block != null) {
                            message.block = dependency_5.tendermint.types.Block.fromObject(data.block);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.block_id != null) {
                            data.block_id = this.block_id.toObject();
                        }
                        if (this.block != null) {
                            data.block = this.block.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.block_id !== undefined)
                            writer.writeMessage(1, this.block_id, () => this.block_id.serialize(writer));
                        if (this.block !== undefined)
                            writer.writeMessage(2, this.block, () => this.block.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetBlockByHeightResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.block_id, () => message.block_id = dependency_6.tendermint.types.BlockID.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.block, () => message.block = dependency_5.tendermint.types.Block.deserialize(reader));
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
                        return GetBlockByHeightResponse.deserialize(bytes);
                    }
                }
                v1beta1.GetBlockByHeightResponse = GetBlockByHeightResponse;
                class GetLatestBlockRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new GetLatestBlockRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetLatestBlockRequest();
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
                        return GetLatestBlockRequest.deserialize(bytes);
                    }
                }
                v1beta1.GetLatestBlockRequest = GetLatestBlockRequest;
                class GetLatestBlockResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("block_id" in data && data.block_id != undefined) {
                                this.block_id = data.block_id;
                            }
                            if ("block" in data && data.block != undefined) {
                                this.block = data.block;
                            }
                        }
                    }
                    get block_id() {
                        return pb_1.Message.getWrapperField(this, dependency_6.tendermint.types.BlockID, 1);
                    }
                    set block_id(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get block() {
                        return pb_1.Message.getWrapperField(this, dependency_5.tendermint.types.Block, 2);
                    }
                    set block(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new GetLatestBlockResponse({});
                        if (data.block_id != null) {
                            message.block_id = dependency_6.tendermint.types.BlockID.fromObject(data.block_id);
                        }
                        if (data.block != null) {
                            message.block = dependency_5.tendermint.types.Block.fromObject(data.block);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.block_id != null) {
                            data.block_id = this.block_id.toObject();
                        }
                        if (this.block != null) {
                            data.block = this.block.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.block_id !== undefined)
                            writer.writeMessage(1, this.block_id, () => this.block_id.serialize(writer));
                        if (this.block !== undefined)
                            writer.writeMessage(2, this.block, () => this.block.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetLatestBlockResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.block_id, () => message.block_id = dependency_6.tendermint.types.BlockID.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.block, () => message.block = dependency_5.tendermint.types.Block.deserialize(reader));
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
                        return GetLatestBlockResponse.deserialize(bytes);
                    }
                }
                v1beta1.GetLatestBlockResponse = GetLatestBlockResponse;
                class GetSyncingRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new GetSyncingRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetSyncingRequest();
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
                        return GetSyncingRequest.deserialize(bytes);
                    }
                }
                v1beta1.GetSyncingRequest = GetSyncingRequest;
                class GetSyncingResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("syncing" in data && data.syncing != undefined) {
                                this.syncing = data.syncing;
                            }
                        }
                    }
                    get syncing() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set syncing(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new GetSyncingResponse({});
                        if (data.syncing != null) {
                            message.syncing = data.syncing;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.syncing != null) {
                            data.syncing = this.syncing;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.syncing !== undefined)
                            writer.writeBool(1, this.syncing);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetSyncingResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.syncing = reader.readBool();
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
                        return GetSyncingResponse.deserialize(bytes);
                    }
                }
                v1beta1.GetSyncingResponse = GetSyncingResponse;
                class GetNodeInfoRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new GetNodeInfoRequest({});
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetNodeInfoRequest();
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
                        return GetNodeInfoRequest.deserialize(bytes);
                    }
                }
                v1beta1.GetNodeInfoRequest = GetNodeInfoRequest;
                class GetNodeInfoResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("default_node_info" in data && data.default_node_info != undefined) {
                                this.default_node_info = data.default_node_info;
                            }
                            if ("application_version" in data && data.application_version != undefined) {
                                this.application_version = data.application_version;
                            }
                        }
                    }
                    get default_node_info() {
                        return pb_1.Message.getWrapperField(this, dependency_4.tendermint.p2p.DefaultNodeInfo, 1);
                    }
                    set default_node_info(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get application_version() {
                        return pb_1.Message.getWrapperField(this, VersionInfo, 2);
                    }
                    set application_version(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new GetNodeInfoResponse({});
                        if (data.default_node_info != null) {
                            message.default_node_info = dependency_4.tendermint.p2p.DefaultNodeInfo.fromObject(data.default_node_info);
                        }
                        if (data.application_version != null) {
                            message.application_version = VersionInfo.fromObject(data.application_version);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.default_node_info != null) {
                            data.default_node_info = this.default_node_info.toObject();
                        }
                        if (this.application_version != null) {
                            data.application_version = this.application_version.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.default_node_info !== undefined)
                            writer.writeMessage(1, this.default_node_info, () => this.default_node_info.serialize(writer));
                        if (this.application_version !== undefined)
                            writer.writeMessage(2, this.application_version, () => this.application_version.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetNodeInfoResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.default_node_info, () => message.default_node_info = dependency_4.tendermint.p2p.DefaultNodeInfo.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.application_version, () => message.application_version = VersionInfo.deserialize(reader));
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
                        return GetNodeInfoResponse.deserialize(bytes);
                    }
                }
                v1beta1.GetNodeInfoResponse = GetNodeInfoResponse;
                class VersionInfo extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [7], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("name" in data && data.name != undefined) {
                                this.name = data.name;
                            }
                            if ("app_name" in data && data.app_name != undefined) {
                                this.app_name = data.app_name;
                            }
                            if ("version" in data && data.version != undefined) {
                                this.version = data.version;
                            }
                            if ("git_commit" in data && data.git_commit != undefined) {
                                this.git_commit = data.git_commit;
                            }
                            if ("build_tags" in data && data.build_tags != undefined) {
                                this.build_tags = data.build_tags;
                            }
                            if ("go_version" in data && data.go_version != undefined) {
                                this.go_version = data.go_version;
                            }
                            if ("build_deps" in data && data.build_deps != undefined) {
                                this.build_deps = data.build_deps;
                            }
                            if ("cosmos_sdk_version" in data && data.cosmos_sdk_version != undefined) {
                                this.cosmos_sdk_version = data.cosmos_sdk_version;
                            }
                        }
                    }
                    get name() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set name(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get app_name() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set app_name(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get version() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set version(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get git_commit() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set git_commit(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get build_tags() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set build_tags(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    get go_version() {
                        return pb_1.Message.getField(this, 6);
                    }
                    set go_version(value) {
                        pb_1.Message.setField(this, 6, value);
                    }
                    get build_deps() {
                        return pb_1.Message.getRepeatedWrapperField(this, Module, 7);
                    }
                    set build_deps(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 7, value);
                    }
                    get cosmos_sdk_version() {
                        return pb_1.Message.getField(this, 8);
                    }
                    set cosmos_sdk_version(value) {
                        pb_1.Message.setField(this, 8, value);
                    }
                    static fromObject(data) {
                        const message = new VersionInfo({});
                        if (data.name != null) {
                            message.name = data.name;
                        }
                        if (data.app_name != null) {
                            message.app_name = data.app_name;
                        }
                        if (data.version != null) {
                            message.version = data.version;
                        }
                        if (data.git_commit != null) {
                            message.git_commit = data.git_commit;
                        }
                        if (data.build_tags != null) {
                            message.build_tags = data.build_tags;
                        }
                        if (data.go_version != null) {
                            message.go_version = data.go_version;
                        }
                        if (data.build_deps != null) {
                            message.build_deps = data.build_deps.map(item => Module.fromObject(item));
                        }
                        if (data.cosmos_sdk_version != null) {
                            message.cosmos_sdk_version = data.cosmos_sdk_version;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.name != null) {
                            data.name = this.name;
                        }
                        if (this.app_name != null) {
                            data.app_name = this.app_name;
                        }
                        if (this.version != null) {
                            data.version = this.version;
                        }
                        if (this.git_commit != null) {
                            data.git_commit = this.git_commit;
                        }
                        if (this.build_tags != null) {
                            data.build_tags = this.build_tags;
                        }
                        if (this.go_version != null) {
                            data.go_version = this.go_version;
                        }
                        if (this.build_deps != null) {
                            data.build_deps = this.build_deps.map((item) => item.toObject());
                        }
                        if (this.cosmos_sdk_version != null) {
                            data.cosmos_sdk_version = this.cosmos_sdk_version;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.name === "string" && this.name.length)
                            writer.writeString(1, this.name);
                        if (typeof this.app_name === "string" && this.app_name.length)
                            writer.writeString(2, this.app_name);
                        if (typeof this.version === "string" && this.version.length)
                            writer.writeString(3, this.version);
                        if (typeof this.git_commit === "string" && this.git_commit.length)
                            writer.writeString(4, this.git_commit);
                        if (typeof this.build_tags === "string" && this.build_tags.length)
                            writer.writeString(5, this.build_tags);
                        if (typeof this.go_version === "string" && this.go_version.length)
                            writer.writeString(6, this.go_version);
                        if (this.build_deps !== undefined)
                            writer.writeRepeatedMessage(7, this.build_deps, (item) => item.serialize(writer));
                        if (typeof this.cosmos_sdk_version === "string" && this.cosmos_sdk_version.length)
                            writer.writeString(8, this.cosmos_sdk_version);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new VersionInfo();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.name = reader.readString();
                                    break;
                                case 2:
                                    message.app_name = reader.readString();
                                    break;
                                case 3:
                                    message.version = reader.readString();
                                    break;
                                case 4:
                                    message.git_commit = reader.readString();
                                    break;
                                case 5:
                                    message.build_tags = reader.readString();
                                    break;
                                case 6:
                                    message.go_version = reader.readString();
                                    break;
                                case 7:
                                    reader.readMessage(message.build_deps, () => pb_1.Message.addToRepeatedWrapperField(message, 7, Module.deserialize(reader), Module));
                                    break;
                                case 8:
                                    message.cosmos_sdk_version = reader.readString();
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
                        return VersionInfo.deserialize(bytes);
                    }
                }
                v1beta1.VersionInfo = VersionInfo;
                class Module extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("path" in data && data.path != undefined) {
                                this.path = data.path;
                            }
                            if ("version" in data && data.version != undefined) {
                                this.version = data.version;
                            }
                            if ("sum" in data && data.sum != undefined) {
                                this.sum = data.sum;
                            }
                        }
                    }
                    get path() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set path(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get version() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set version(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get sum() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set sum(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new Module({});
                        if (data.path != null) {
                            message.path = data.path;
                        }
                        if (data.version != null) {
                            message.version = data.version;
                        }
                        if (data.sum != null) {
                            message.sum = data.sum;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.path != null) {
                            data.path = this.path;
                        }
                        if (this.version != null) {
                            data.version = this.version;
                        }
                        if (this.sum != null) {
                            data.sum = this.sum;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.path === "string" && this.path.length)
                            writer.writeString(1, this.path);
                        if (typeof this.version === "string" && this.version.length)
                            writer.writeString(2, this.version);
                        if (typeof this.sum === "string" && this.sum.length)
                            writer.writeString(3, this.sum);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Module();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.path = reader.readString();
                                    break;
                                case 2:
                                    message.version = reader.readString();
                                    break;
                                case 3:
                                    message.sum = reader.readString();
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
                        return Module.deserialize(bytes);
                    }
                }
                v1beta1.Module = Module;
            })(v1beta1 = tendermint.v1beta1 || (tendermint.v1beta1 = {}));
        })(tendermint = base.tendermint || (base.tendermint = {}));
    })(base = cosmos.base || (cosmos.base = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=query.js.map