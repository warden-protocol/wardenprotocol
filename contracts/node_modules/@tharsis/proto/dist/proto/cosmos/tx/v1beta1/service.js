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
const dependency_2 = __importStar(require("./../../base/abci/v1beta1/abci"));
const dependency_3 = __importStar(require("./tx"));
const dependency_5 = __importStar(require("./../../base/query/v1beta1/pagination"));
const dependency_6 = __importStar(require("./../../../tendermint/types/block"));
const dependency_7 = __importStar(require("./../../../tendermint/types/types"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var tx;
    (function (tx) {
        var v1beta1;
        (function (v1beta1) {
            let OrderBy;
            (function (OrderBy) {
                OrderBy[OrderBy["ORDER_BY_UNSPECIFIED"] = 0] = "ORDER_BY_UNSPECIFIED";
                OrderBy[OrderBy["ORDER_BY_ASC"] = 1] = "ORDER_BY_ASC";
                OrderBy[OrderBy["ORDER_BY_DESC"] = 2] = "ORDER_BY_DESC";
            })(OrderBy = v1beta1.OrderBy || (v1beta1.OrderBy = {}));
            let BroadcastMode;
            (function (BroadcastMode) {
                BroadcastMode[BroadcastMode["BROADCAST_MODE_UNSPECIFIED"] = 0] = "BROADCAST_MODE_UNSPECIFIED";
                BroadcastMode[BroadcastMode["BROADCAST_MODE_BLOCK"] = 1] = "BROADCAST_MODE_BLOCK";
                BroadcastMode[BroadcastMode["BROADCAST_MODE_SYNC"] = 2] = "BROADCAST_MODE_SYNC";
                BroadcastMode[BroadcastMode["BROADCAST_MODE_ASYNC"] = 3] = "BROADCAST_MODE_ASYNC";
            })(BroadcastMode = v1beta1.BroadcastMode || (v1beta1.BroadcastMode = {}));
            class GetTxsEventRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("events" in data && data.events != undefined) {
                            this.events = data.events;
                        }
                        if ("pagination" in data && data.pagination != undefined) {
                            this.pagination = data.pagination;
                        }
                        if ("order_by" in data && data.order_by != undefined) {
                            this.order_by = data.order_by;
                        }
                    }
                }
                get events() {
                    return pb_1.Message.getField(this, 1);
                }
                set events(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get pagination() {
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.base.query.v1beta1.PageRequest, 2);
                }
                set pagination(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get order_by() {
                    return pb_1.Message.getField(this, 3);
                }
                set order_by(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new GetTxsEventRequest({});
                    if (data.events != null) {
                        message.events = data.events;
                    }
                    if (data.pagination != null) {
                        message.pagination = dependency_5.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
                    }
                    if (data.order_by != null) {
                        message.order_by = data.order_by;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.events != null) {
                        data.events = this.events;
                    }
                    if (this.pagination != null) {
                        data.pagination = this.pagination.toObject();
                    }
                    if (this.order_by != null) {
                        data.order_by = this.order_by;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.events !== undefined)
                        writer.writeRepeatedString(1, this.events);
                    if (this.pagination !== undefined)
                        writer.writeMessage(2, this.pagination, () => this.pagination.serialize(writer));
                    if (this.order_by !== undefined)
                        writer.writeEnum(3, this.order_by);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTxsEventRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                pb_1.Message.addToRepeatedField(message, 1, reader.readString());
                                break;
                            case 2:
                                reader.readMessage(message.pagination, () => message.pagination = dependency_5.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
                                break;
                            case 3:
                                message.order_by = reader.readEnum();
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
                    return GetTxsEventRequest.deserialize(bytes);
                }
            }
            v1beta1.GetTxsEventRequest = GetTxsEventRequest;
            class GetTxsEventResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("txs" in data && data.txs != undefined) {
                            this.txs = data.txs;
                        }
                        if ("tx_responses" in data && data.tx_responses != undefined) {
                            this.tx_responses = data.tx_responses;
                        }
                        if ("pagination" in data && data.pagination != undefined) {
                            this.pagination = data.pagination;
                        }
                    }
                }
                get txs() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_3.cosmos.tx.v1beta1.Tx, 1);
                }
                set txs(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get tx_responses() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.base.abci.v1beta1.TxResponse, 2);
                }
                set tx_responses(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                get pagination() {
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.base.query.v1beta1.PageResponse, 3);
                }
                set pagination(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new GetTxsEventResponse({});
                    if (data.txs != null) {
                        message.txs = data.txs.map(item => dependency_3.cosmos.tx.v1beta1.Tx.fromObject(item));
                    }
                    if (data.tx_responses != null) {
                        message.tx_responses = data.tx_responses.map(item => dependency_2.cosmos.base.abci.v1beta1.TxResponse.fromObject(item));
                    }
                    if (data.pagination != null) {
                        message.pagination = dependency_5.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.txs != null) {
                        data.txs = this.txs.map((item) => item.toObject());
                    }
                    if (this.tx_responses != null) {
                        data.tx_responses = this.tx_responses.map((item) => item.toObject());
                    }
                    if (this.pagination != null) {
                        data.pagination = this.pagination.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.txs !== undefined)
                        writer.writeRepeatedMessage(1, this.txs, (item) => item.serialize(writer));
                    if (this.tx_responses !== undefined)
                        writer.writeRepeatedMessage(2, this.tx_responses, (item) => item.serialize(writer));
                    if (this.pagination !== undefined)
                        writer.writeMessage(3, this.pagination, () => this.pagination.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTxsEventResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.txs, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_3.cosmos.tx.v1beta1.Tx.deserialize(reader), dependency_3.cosmos.tx.v1beta1.Tx));
                                break;
                            case 2:
                                reader.readMessage(message.tx_responses, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_2.cosmos.base.abci.v1beta1.TxResponse.deserialize(reader), dependency_2.cosmos.base.abci.v1beta1.TxResponse));
                                break;
                            case 3:
                                reader.readMessage(message.pagination, () => message.pagination = dependency_5.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
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
                    return GetTxsEventResponse.deserialize(bytes);
                }
            }
            v1beta1.GetTxsEventResponse = GetTxsEventResponse;
            class BroadcastTxRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("tx_bytes" in data && data.tx_bytes != undefined) {
                            this.tx_bytes = data.tx_bytes;
                        }
                        if ("mode" in data && data.mode != undefined) {
                            this.mode = data.mode;
                        }
                    }
                }
                get tx_bytes() {
                    return pb_1.Message.getField(this, 1);
                }
                set tx_bytes(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get mode() {
                    return pb_1.Message.getField(this, 2);
                }
                set mode(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new BroadcastTxRequest({});
                    if (data.tx_bytes != null) {
                        message.tx_bytes = data.tx_bytes;
                    }
                    if (data.mode != null) {
                        message.mode = data.mode;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.tx_bytes != null) {
                        data.tx_bytes = this.tx_bytes;
                    }
                    if (this.mode != null) {
                        data.mode = this.mode;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.tx_bytes !== undefined)
                        writer.writeBytes(1, this.tx_bytes);
                    if (this.mode !== undefined)
                        writer.writeEnum(2, this.mode);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BroadcastTxRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.tx_bytes = reader.readBytes();
                                break;
                            case 2:
                                message.mode = reader.readEnum();
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
                    return BroadcastTxRequest.deserialize(bytes);
                }
            }
            v1beta1.BroadcastTxRequest = BroadcastTxRequest;
            class BroadcastTxResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("tx_response" in data && data.tx_response != undefined) {
                            this.tx_response = data.tx_response;
                        }
                    }
                }
                get tx_response() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.abci.v1beta1.TxResponse, 1);
                }
                set tx_response(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new BroadcastTxResponse({});
                    if (data.tx_response != null) {
                        message.tx_response = dependency_2.cosmos.base.abci.v1beta1.TxResponse.fromObject(data.tx_response);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.tx_response != null) {
                        data.tx_response = this.tx_response.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.tx_response !== undefined)
                        writer.writeMessage(1, this.tx_response, () => this.tx_response.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BroadcastTxResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.tx_response, () => message.tx_response = dependency_2.cosmos.base.abci.v1beta1.TxResponse.deserialize(reader));
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
                    return BroadcastTxResponse.deserialize(bytes);
                }
            }
            v1beta1.BroadcastTxResponse = BroadcastTxResponse;
            class SimulateRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("tx" in data && data.tx != undefined) {
                            this.tx = data.tx;
                        }
                        if ("tx_bytes" in data && data.tx_bytes != undefined) {
                            this.tx_bytes = data.tx_bytes;
                        }
                    }
                }
                get tx() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.tx.v1beta1.Tx, 1);
                }
                set tx(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get tx_bytes() {
                    return pb_1.Message.getField(this, 2);
                }
                set tx_bytes(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new SimulateRequest({});
                    if (data.tx != null) {
                        message.tx = dependency_3.cosmos.tx.v1beta1.Tx.fromObject(data.tx);
                    }
                    if (data.tx_bytes != null) {
                        message.tx_bytes = data.tx_bytes;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.tx != null) {
                        data.tx = this.tx.toObject();
                    }
                    if (this.tx_bytes != null) {
                        data.tx_bytes = this.tx_bytes;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.tx !== undefined)
                        writer.writeMessage(1, this.tx, () => this.tx.serialize(writer));
                    if (this.tx_bytes !== undefined)
                        writer.writeBytes(2, this.tx_bytes);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SimulateRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.tx, () => message.tx = dependency_3.cosmos.tx.v1beta1.Tx.deserialize(reader));
                                break;
                            case 2:
                                message.tx_bytes = reader.readBytes();
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
                    return SimulateRequest.deserialize(bytes);
                }
            }
            v1beta1.SimulateRequest = SimulateRequest;
            class SimulateResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("gas_info" in data && data.gas_info != undefined) {
                            this.gas_info = data.gas_info;
                        }
                        if ("result" in data && data.result != undefined) {
                            this.result = data.result;
                        }
                    }
                }
                get gas_info() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.abci.v1beta1.GasInfo, 1);
                }
                set gas_info(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get result() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.abci.v1beta1.Result, 2);
                }
                set result(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new SimulateResponse({});
                    if (data.gas_info != null) {
                        message.gas_info = dependency_2.cosmos.base.abci.v1beta1.GasInfo.fromObject(data.gas_info);
                    }
                    if (data.result != null) {
                        message.result = dependency_2.cosmos.base.abci.v1beta1.Result.fromObject(data.result);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.gas_info != null) {
                        data.gas_info = this.gas_info.toObject();
                    }
                    if (this.result != null) {
                        data.result = this.result.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.gas_info !== undefined)
                        writer.writeMessage(1, this.gas_info, () => this.gas_info.serialize(writer));
                    if (this.result !== undefined)
                        writer.writeMessage(2, this.result, () => this.result.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SimulateResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.gas_info, () => message.gas_info = dependency_2.cosmos.base.abci.v1beta1.GasInfo.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.result, () => message.result = dependency_2.cosmos.base.abci.v1beta1.Result.deserialize(reader));
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
                    return SimulateResponse.deserialize(bytes);
                }
            }
            v1beta1.SimulateResponse = SimulateResponse;
            class GetTxRequest extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("hash" in data && data.hash != undefined) {
                            this.hash = data.hash;
                        }
                    }
                }
                get hash() {
                    return pb_1.Message.getField(this, 1);
                }
                set hash(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new GetTxRequest({});
                    if (data.hash != null) {
                        message.hash = data.hash;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.hash != null) {
                        data.hash = this.hash;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.hash === "string" && this.hash.length)
                        writer.writeString(1, this.hash);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTxRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.hash = reader.readString();
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
                    return GetTxRequest.deserialize(bytes);
                }
            }
            v1beta1.GetTxRequest = GetTxRequest;
            class GetTxResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("tx" in data && data.tx != undefined) {
                            this.tx = data.tx;
                        }
                        if ("tx_response" in data && data.tx_response != undefined) {
                            this.tx_response = data.tx_response;
                        }
                    }
                }
                get tx() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.tx.v1beta1.Tx, 1);
                }
                set tx(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get tx_response() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.base.abci.v1beta1.TxResponse, 2);
                }
                set tx_response(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new GetTxResponse({});
                    if (data.tx != null) {
                        message.tx = dependency_3.cosmos.tx.v1beta1.Tx.fromObject(data.tx);
                    }
                    if (data.tx_response != null) {
                        message.tx_response = dependency_2.cosmos.base.abci.v1beta1.TxResponse.fromObject(data.tx_response);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.tx != null) {
                        data.tx = this.tx.toObject();
                    }
                    if (this.tx_response != null) {
                        data.tx_response = this.tx_response.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.tx !== undefined)
                        writer.writeMessage(1, this.tx, () => this.tx.serialize(writer));
                    if (this.tx_response !== undefined)
                        writer.writeMessage(2, this.tx_response, () => this.tx_response.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetTxResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.tx, () => message.tx = dependency_3.cosmos.tx.v1beta1.Tx.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.tx_response, () => message.tx_response = dependency_2.cosmos.base.abci.v1beta1.TxResponse.deserialize(reader));
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
                    return GetTxResponse.deserialize(bytes);
                }
            }
            v1beta1.GetTxResponse = GetTxResponse;
            class GetBlockWithTxsRequest extends pb_1.Message {
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
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.base.query.v1beta1.PageRequest, 2);
                }
                set pagination(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new GetBlockWithTxsRequest({});
                    if (data.height != null) {
                        message.height = data.height;
                    }
                    if (data.pagination != null) {
                        message.pagination = dependency_5.cosmos.base.query.v1beta1.PageRequest.fromObject(data.pagination);
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetBlockWithTxsRequest();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.height = reader.readInt64();
                                break;
                            case 2:
                                reader.readMessage(message.pagination, () => message.pagination = dependency_5.cosmos.base.query.v1beta1.PageRequest.deserialize(reader));
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
                    return GetBlockWithTxsRequest.deserialize(bytes);
                }
            }
            v1beta1.GetBlockWithTxsRequest = GetBlockWithTxsRequest;
            class GetBlockWithTxsResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("txs" in data && data.txs != undefined) {
                            this.txs = data.txs;
                        }
                        if ("block_id" in data && data.block_id != undefined) {
                            this.block_id = data.block_id;
                        }
                        if ("block" in data && data.block != undefined) {
                            this.block = data.block;
                        }
                        if ("pagination" in data && data.pagination != undefined) {
                            this.pagination = data.pagination;
                        }
                    }
                }
                get txs() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_3.cosmos.tx.v1beta1.Tx, 1);
                }
                set txs(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get block_id() {
                    return pb_1.Message.getWrapperField(this, dependency_7.tendermint.types.BlockID, 2);
                }
                set block_id(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get block() {
                    return pb_1.Message.getWrapperField(this, dependency_6.tendermint.types.Block, 3);
                }
                set block(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                get pagination() {
                    return pb_1.Message.getWrapperField(this, dependency_5.cosmos.base.query.v1beta1.PageResponse, 4);
                }
                set pagination(value) {
                    pb_1.Message.setWrapperField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new GetBlockWithTxsResponse({});
                    if (data.txs != null) {
                        message.txs = data.txs.map(item => dependency_3.cosmos.tx.v1beta1.Tx.fromObject(item));
                    }
                    if (data.block_id != null) {
                        message.block_id = dependency_7.tendermint.types.BlockID.fromObject(data.block_id);
                    }
                    if (data.block != null) {
                        message.block = dependency_6.tendermint.types.Block.fromObject(data.block);
                    }
                    if (data.pagination != null) {
                        message.pagination = dependency_5.cosmos.base.query.v1beta1.PageResponse.fromObject(data.pagination);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.txs != null) {
                        data.txs = this.txs.map((item) => item.toObject());
                    }
                    if (this.block_id != null) {
                        data.block_id = this.block_id.toObject();
                    }
                    if (this.block != null) {
                        data.block = this.block.toObject();
                    }
                    if (this.pagination != null) {
                        data.pagination = this.pagination.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.txs !== undefined)
                        writer.writeRepeatedMessage(1, this.txs, (item) => item.serialize(writer));
                    if (this.block_id !== undefined)
                        writer.writeMessage(2, this.block_id, () => this.block_id.serialize(writer));
                    if (this.block !== undefined)
                        writer.writeMessage(3, this.block, () => this.block.serialize(writer));
                    if (this.pagination !== undefined)
                        writer.writeMessage(4, this.pagination, () => this.pagination.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetBlockWithTxsResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.txs, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_3.cosmos.tx.v1beta1.Tx.deserialize(reader), dependency_3.cosmos.tx.v1beta1.Tx));
                                break;
                            case 2:
                                reader.readMessage(message.block_id, () => message.block_id = dependency_7.tendermint.types.BlockID.deserialize(reader));
                                break;
                            case 3:
                                reader.readMessage(message.block, () => message.block = dependency_6.tendermint.types.Block.deserialize(reader));
                                break;
                            case 4:
                                reader.readMessage(message.pagination, () => message.pagination = dependency_5.cosmos.base.query.v1beta1.PageResponse.deserialize(reader));
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
                    return GetBlockWithTxsResponse.deserialize(bytes);
                }
            }
            v1beta1.GetBlockWithTxsResponse = GetBlockWithTxsResponse;
        })(v1beta1 = tx.v1beta1 || (tx.v1beta1 = {}));
    })(tx = cosmos.tx || (cosmos.tx = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=service.js.map