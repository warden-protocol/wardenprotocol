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
const dependency_1 = __importStar(require("./../../base/query/v1beta1/pagination"));
const dependency_4 = __importStar(require("./../../base/v1beta1/coin"));
const dependency_5 = __importStar(require("./distribution"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var distribution;
    (function (distribution) {
        var v1beta1;
        (function (v1beta1) {
            class QueryParamsRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") { }
                }
                static fromObject(data) {
                    const message = new QueryParamsRequest({});
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryParamsRequest();
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
                    return QueryParamsRequest.deserialize(bytes);
                }
            }
            v1beta1.QueryParamsRequest = QueryParamsRequest;
            class QueryParamsResponse extends pb_1.Message {
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
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.distribution.v1beta1.Params, 1);
                }
                set params(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryParamsResponse({});
                    if (data.params != null) {
                        message.params = dependency_5.cosmos.distribution.v1beta1.Params.fromObject(data.params);
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryParamsResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.params, () => message.params = dependency_5.cosmos.distribution.v1beta1.Params.deserialize(reader));
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
                    return QueryParamsResponse.deserialize(bytes);
                }
            }
            v1beta1.QueryParamsResponse = QueryParamsResponse;
            class QueryValidatorOutstandingRewardsRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                    }
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryValidatorOutstandingRewardsRequest({});
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(1, this.validator_address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryValidatorOutstandingRewardsRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.validator_address = reader.readString();
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
                    return QueryValidatorOutstandingRewardsRequest.deserialize(bytes);
                }
            }
            v1beta1.QueryValidatorOutstandingRewardsRequest = QueryValidatorOutstandingRewardsRequest;
            class QueryValidatorOutstandingRewardsResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("rewards" in data && data.rewards != undefined) {
                            this.rewards = data.rewards;
                        }
                    }
                }
                get rewards() {
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.distribution.v1beta1.ValidatorOutstandingRewards, 1);
                }
                set rewards(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryValidatorOutstandingRewardsResponse({});
                    if (data.rewards != null) {
                        message.rewards = dependency_5.cosmos.distribution.v1beta1.ValidatorOutstandingRewards.fromObject(data.rewards);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.rewards != null) {
                        data.rewards = this.rewards.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.rewards !== undefined)
                        writer.writeMessage(1, this.rewards, () => this.rewards.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryValidatorOutstandingRewardsResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.rewards, () => message.rewards = dependency_5.cosmos.distribution.v1beta1.ValidatorOutstandingRewards.deserialize(reader));
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
                    return QueryValidatorOutstandingRewardsResponse.deserialize(bytes);
                }
            }
            v1beta1.QueryValidatorOutstandingRewardsResponse = QueryValidatorOutstandingRewardsResponse;
            class QueryValidatorCommissionRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                    }
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryValidatorCommissionRequest({});
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(1, this.validator_address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryValidatorCommissionRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.validator_address = reader.readString();
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
                    return QueryValidatorCommissionRequest.deserialize(bytes);
                }
            }
            v1beta1.QueryValidatorCommissionRequest = QueryValidatorCommissionRequest;
            class QueryValidatorCommissionResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("commission" in data && data.commission != undefined) {
                            this.commission = data.commission;
                        }
                    }
                }
                get commission() {
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission, 1);
                }
                set commission(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryValidatorCommissionResponse({});
                    if (data.commission != null) {
                        message.commission = dependency_5.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission.fromObject(data.commission);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.commission != null) {
                        data.commission = this.commission.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.commission !== undefined)
                        writer.writeMessage(1, this.commission, () => this.commission.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryValidatorCommissionResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.commission, () => message.commission = dependency_5.cosmos.distribution.v1beta1.ValidatorAccumulatedCommission.deserialize(reader));
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
                    return QueryValidatorCommissionResponse.deserialize(bytes);
                }
            }
            v1beta1.QueryValidatorCommissionResponse = QueryValidatorCommissionResponse;
            class QueryValidatorSlashesRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                        if ("starting_height" in data && data.starting_height != undefined) {
                            this.starting_height = data.starting_height;
                        }
                        if ("ending_height" in data && data.ending_height != undefined) {
                            this.ending_height = data.ending_height;
                        }
                        if ("pagination" in data && data.pagination != undefined) {
                            this.pagination = data.pagination;
                        }
                    }
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get starting_height() {
                    return pb_1.Message.getField(this, 2);
                }
                set starting_height(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get ending_height() {
                    return pb_1.Message.getField(this, 3);
                }
                set ending_height(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get pagination() {
                    return pb_1.Message.getWrapperField(this, dependency_1.cosmos.base.query.v1beta1.PageRequest, 4);
                }
                set pagination(value) {
                    pb_1.Message.setWrapperField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new QueryValidatorSlashesRequest({});
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    if (data.starting_height != null) {
                        message.starting_height = data.starting_height;
                    }
                    if (data.ending_height != null) {
                        message.ending_height = data.ending_height;
                    }
                    if (data.pagination != null) {
                        message.pagination = dependency_1.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    if (this.starting_height != null) {
                        data.starting_height = this.starting_height;
                    }
                    if (this.ending_height != null) {
                        data.ending_height = this.ending_height;
                    }
                    if (this.pagination != null) {
                        data.pagination = this.pagination.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(1, this.validator_address);
                    if (this.starting_height !== undefined)
                        writer.writeUint64(2, this.starting_height);
                    if (this.ending_height !== undefined)
                        writer.writeUint64(3, this.ending_height);
                    if (this.pagination !== undefined)
                        writer.writeMessage(4, this.pagination, () => this.pagination.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryValidatorSlashesRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.validator_address = reader.readString();
                                break;
                            case 2:
                                message.starting_height = reader.readUint64();
                                break;
                            case 3:
                                message.ending_height = reader.readUint64();
                                break;
                            case 4:
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
                    return QueryValidatorSlashesRequest.deserialize(bytes);
                }
            }
            v1beta1.QueryValidatorSlashesRequest = QueryValidatorSlashesRequest;
            class QueryValidatorSlashesResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("slashes" in data && data.slashes != undefined) {
                            this.slashes = data.slashes;
                        }
                        if ("pagination" in data && data.pagination != undefined) {
                            this.pagination = data.pagination;
                        }
                    }
                }
                get slashes() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_5.cosmos.distribution.v1beta1.ValidatorSlashEvent, 1);
                }
                set slashes(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get pagination() {
                    return pb_1.Message.getWrapperField(this, dependency_1.cosmos.base.query.v1beta1.PageResponse, 2);
                }
                set pagination(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new QueryValidatorSlashesResponse({});
                    if (data.slashes != null) {
                        message.slashes = data.slashes.map(item => dependency_5.cosmos.distribution.v1beta1.ValidatorSlashEvent.fromObject(item));
                    }
                    if (data.pagination != null) {
                        message.pagination = dependency_1.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.slashes != null) {
                        data.slashes = this.slashes.map((item) => item.toObject());
                    }
                    if (this.pagination != null) {
                        data.pagination = this.pagination.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.slashes !== undefined)
                        writer.writeRepeatedMessage(1, this.slashes, (item) => item.serialize(writer));
                    if (this.pagination !== undefined)
                        writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryValidatorSlashesResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.slashes, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_5.cosmos.distribution.v1beta1.ValidatorSlashEvent.deserialize(reader), dependency_5.cosmos.distribution.v1beta1.ValidatorSlashEvent));
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
                    return QueryValidatorSlashesResponse.deserialize(bytes);
                }
            }
            v1beta1.QueryValidatorSlashesResponse = QueryValidatorSlashesResponse;
            class QueryDelegationRewardsRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("delegator_address" in data && data.delegator_address != undefined) {
                            this.delegator_address = data.delegator_address;
                        }
                        if ("validator_address" in data && data.validator_address != undefined) {
                            this.validator_address = data.validator_address;
                        }
                    }
                }
                get delegator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set delegator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get validator_address() {
                    return pb_1.Message.getField(this, 2);
                }
                set validator_address(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new QueryDelegationRewardsRequest({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    if (data.validator_address != null) {
                        message.validator_address = data.validator_address;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.delegator_address != null) {
                        data.delegator_address = this.delegator_address;
                    }
                    if (this.validator_address != null) {
                        data.validator_address = this.validator_address;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (typeof this.validator_address === "string" && this.validator_address.length)
                        writer.writeString(2, this.validator_address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryDelegationRewardsRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.delegator_address = reader.readString();
                                break;
                            case 2:
                                message.validator_address = reader.readString();
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
                    return QueryDelegationRewardsRequest.deserialize(bytes);
                }
            }
            v1beta1.QueryDelegationRewardsRequest = QueryDelegationRewardsRequest;
            class QueryDelegationRewardsResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("rewards" in data && data.rewards != undefined) {
                            this.rewards = data.rewards;
                        }
                    }
                }
                get rewards() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_4.cosmos.base.v1beta1.DecCoin, 1);
                }
                set rewards(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryDelegationRewardsResponse({});
                    if (data.rewards != null) {
                        message.rewards = data.rewards.map(item => dependency_4.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.rewards != null) {
                        data.rewards = this.rewards.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.rewards !== undefined)
                        writer.writeRepeatedMessage(1, this.rewards, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryDelegationRewardsResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.rewards, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_4.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_4.cosmos.base.v1beta1.DecCoin));
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
                    return QueryDelegationRewardsResponse.deserialize(bytes);
                }
            }
            v1beta1.QueryDelegationRewardsResponse = QueryDelegationRewardsResponse;
            class QueryDelegationTotalRewardsRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("delegator_address" in data && data.delegator_address != undefined) {
                            this.delegator_address = data.delegator_address;
                        }
                    }
                }
                get delegator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set delegator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryDelegationTotalRewardsRequest({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.delegator_address != null) {
                        data.delegator_address = this.delegator_address;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryDelegationTotalRewardsRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.delegator_address = reader.readString();
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
                    return QueryDelegationTotalRewardsRequest.deserialize(bytes);
                }
            }
            v1beta1.QueryDelegationTotalRewardsRequest = QueryDelegationTotalRewardsRequest;
            class QueryDelegationTotalRewardsResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("rewards" in data && data.rewards != undefined) {
                            this.rewards = data.rewards;
                        }
                        if ("total" in data && data.total != undefined) {
                            this.total = data.total;
                        }
                    }
                }
                get rewards() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_5.cosmos.distribution.v1beta1.DelegationDelegatorReward, 1);
                }
                set rewards(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get total() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_4.cosmos.base.v1beta1.DecCoin, 2);
                }
                set total(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new QueryDelegationTotalRewardsResponse({});
                    if (data.rewards != null) {
                        message.rewards = data.rewards.map(item => dependency_5.cosmos.distribution.v1beta1.DelegationDelegatorReward.fromObject(item));
                    }
                    if (data.total != null) {
                        message.total = data.total.map(item => dependency_4.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.rewards != null) {
                        data.rewards = this.rewards.map((item) => item.toObject());
                    }
                    if (this.total != null) {
                        data.total = this.total.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.rewards !== undefined)
                        writer.writeRepeatedMessage(1, this.rewards, (item) => item.serialize(writer));
                    if (this.total !== undefined)
                        writer.writeRepeatedMessage(2, this.total, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryDelegationTotalRewardsResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.rewards, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_5.cosmos.distribution.v1beta1.DelegationDelegatorReward.deserialize(reader), dependency_5.cosmos.distribution.v1beta1.DelegationDelegatorReward));
                                break;
                            case 2:
                                reader.readMessage(message.total, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_4.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_4.cosmos.base.v1beta1.DecCoin));
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
                    return QueryDelegationTotalRewardsResponse.deserialize(bytes);
                }
            }
            v1beta1.QueryDelegationTotalRewardsResponse = QueryDelegationTotalRewardsResponse;
            class QueryDelegatorValidatorsRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("delegator_address" in data && data.delegator_address != undefined) {
                            this.delegator_address = data.delegator_address;
                        }
                    }
                }
                get delegator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set delegator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryDelegatorValidatorsRequest({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.delegator_address != null) {
                        data.delegator_address = this.delegator_address;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryDelegatorValidatorsRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.delegator_address = reader.readString();
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
                    return QueryDelegatorValidatorsRequest.deserialize(bytes);
                }
            }
            v1beta1.QueryDelegatorValidatorsRequest = QueryDelegatorValidatorsRequest;
            class QueryDelegatorValidatorsResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("validators" in data && data.validators != undefined) {
                            this.validators = data.validators;
                        }
                    }
                }
                get validators() {
                    return pb_1.Message.getField(this, 1);
                }
                set validators(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryDelegatorValidatorsResponse({});
                    if (data.validators != null) {
                        message.validators = data.validators;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.validators != null) {
                        data.validators = this.validators;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.validators !== undefined)
                        writer.writeRepeatedString(1, this.validators);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryDelegatorValidatorsResponse();
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
                    return QueryDelegatorValidatorsResponse.deserialize(bytes);
                }
            }
            v1beta1.QueryDelegatorValidatorsResponse = QueryDelegatorValidatorsResponse;
            class QueryDelegatorWithdrawAddressRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("delegator_address" in data && data.delegator_address != undefined) {
                            this.delegator_address = data.delegator_address;
                        }
                    }
                }
                get delegator_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set delegator_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryDelegatorWithdrawAddressRequest({});
                    if (data.delegator_address != null) {
                        message.delegator_address = data.delegator_address;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.delegator_address != null) {
                        data.delegator_address = this.delegator_address;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.delegator_address === "string" && this.delegator_address.length)
                        writer.writeString(1, this.delegator_address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryDelegatorWithdrawAddressRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.delegator_address = reader.readString();
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
                    return QueryDelegatorWithdrawAddressRequest.deserialize(bytes);
                }
            }
            v1beta1.QueryDelegatorWithdrawAddressRequest = QueryDelegatorWithdrawAddressRequest;
            class QueryDelegatorWithdrawAddressResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("withdraw_address" in data && data.withdraw_address != undefined) {
                            this.withdraw_address = data.withdraw_address;
                        }
                    }
                }
                get withdraw_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set withdraw_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryDelegatorWithdrawAddressResponse({});
                    if (data.withdraw_address != null) {
                        message.withdraw_address = data.withdraw_address;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.withdraw_address != null) {
                        data.withdraw_address = this.withdraw_address;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.withdraw_address === "string" && this.withdraw_address.length)
                        writer.writeString(1, this.withdraw_address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryDelegatorWithdrawAddressResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.withdraw_address = reader.readString();
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
                    return QueryDelegatorWithdrawAddressResponse.deserialize(bytes);
                }
            }
            v1beta1.QueryDelegatorWithdrawAddressResponse = QueryDelegatorWithdrawAddressResponse;
            class QueryCommunityPoolRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") { }
                }
                static fromObject(data) {
                    const message = new QueryCommunityPoolRequest({});
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryCommunityPoolRequest();
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
                    return QueryCommunityPoolRequest.deserialize(bytes);
                }
            }
            v1beta1.QueryCommunityPoolRequest = QueryCommunityPoolRequest;
            class QueryCommunityPoolResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("pool" in data && data.pool != undefined) {
                            this.pool = data.pool;
                        }
                    }
                }
                get pool() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_4.cosmos.base.v1beta1.DecCoin, 1);
                }
                set pool(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new QueryCommunityPoolResponse({});
                    if (data.pool != null) {
                        message.pool = data.pool.map(item => dependency_4.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.pool != null) {
                        data.pool = this.pool.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.pool !== undefined)
                        writer.writeRepeatedMessage(1, this.pool, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryCommunityPoolResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.pool, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_4.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_4.cosmos.base.v1beta1.DecCoin));
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
                    return QueryCommunityPoolResponse.deserialize(bytes);
                }
            }
            v1beta1.QueryCommunityPoolResponse = QueryCommunityPoolResponse;
        })(v1beta1 = distribution.v1beta1 || (distribution.v1beta1 = {}));
    })(distribution = cosmos.distribution || (cosmos.distribution = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=query.js.map