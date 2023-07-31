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
const dependency_2 = __importStar(require("./../../../../tendermint/abci/types"));
const dependency_3 = __importStar(require("./../../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var base;
    (function (base) {
        var abci;
        (function (abci) {
            var v1beta1;
            (function (v1beta1) {
                class TxResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [7, 13], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                            if ("txhash" in data && data.txhash != undefined) {
                                this.txhash = data.txhash;
                            }
                            if ("codespace" in data && data.codespace != undefined) {
                                this.codespace = data.codespace;
                            }
                            if ("code" in data && data.code != undefined) {
                                this.code = data.code;
                            }
                            if ("data" in data && data.data != undefined) {
                                this.data = data.data;
                            }
                            if ("raw_log" in data && data.raw_log != undefined) {
                                this.raw_log = data.raw_log;
                            }
                            if ("logs" in data && data.logs != undefined) {
                                this.logs = data.logs;
                            }
                            if ("info" in data && data.info != undefined) {
                                this.info = data.info;
                            }
                            if ("gas_wanted" in data && data.gas_wanted != undefined) {
                                this.gas_wanted = data.gas_wanted;
                            }
                            if ("gas_used" in data && data.gas_used != undefined) {
                                this.gas_used = data.gas_used;
                            }
                            if ("tx" in data && data.tx != undefined) {
                                this.tx = data.tx;
                            }
                            if ("timestamp" in data && data.timestamp != undefined) {
                                this.timestamp = data.timestamp;
                            }
                            if ("events" in data && data.events != undefined) {
                                this.events = data.events;
                            }
                        }
                    }
                    get height() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set height(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get txhash() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set txhash(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get codespace() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set codespace(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get code() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set code(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get data() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set data(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    get raw_log() {
                        return pb_1.Message.getField(this, 6);
                    }
                    set raw_log(value) {
                        pb_1.Message.setField(this, 6, value);
                    }
                    get logs() {
                        return pb_1.Message.getRepeatedWrapperField(this, ABCIMessageLog, 7);
                    }
                    set logs(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 7, value);
                    }
                    get info() {
                        return pb_1.Message.getField(this, 8);
                    }
                    set info(value) {
                        pb_1.Message.setField(this, 8, value);
                    }
                    get gas_wanted() {
                        return pb_1.Message.getField(this, 9);
                    }
                    set gas_wanted(value) {
                        pb_1.Message.setField(this, 9, value);
                    }
                    get gas_used() {
                        return pb_1.Message.getField(this, 10);
                    }
                    set gas_used(value) {
                        pb_1.Message.setField(this, 10, value);
                    }
                    get tx() {
                        return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Any, 11);
                    }
                    set tx(value) {
                        pb_1.Message.setWrapperField(this, 11, value);
                    }
                    get timestamp() {
                        return pb_1.Message.getField(this, 12);
                    }
                    set timestamp(value) {
                        pb_1.Message.setField(this, 12, value);
                    }
                    get events() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.tendermint.abci.Event, 13);
                    }
                    set events(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 13, value);
                    }
                    static fromObject(data) {
                        const message = new TxResponse({});
                        if (data.height != null) {
                            message.height = data.height;
                        }
                        if (data.txhash != null) {
                            message.txhash = data.txhash;
                        }
                        if (data.codespace != null) {
                            message.codespace = data.codespace;
                        }
                        if (data.code != null) {
                            message.code = data.code;
                        }
                        if (data.data != null) {
                            message.data = data.data;
                        }
                        if (data.raw_log != null) {
                            message.raw_log = data.raw_log;
                        }
                        if (data.logs != null) {
                            message.logs = data.logs.map(item => ABCIMessageLog.fromObject(item));
                        }
                        if (data.info != null) {
                            message.info = data.info;
                        }
                        if (data.gas_wanted != null) {
                            message.gas_wanted = data.gas_wanted;
                        }
                        if (data.gas_used != null) {
                            message.gas_used = data.gas_used;
                        }
                        if (data.tx != null) {
                            message.tx = dependency_3.google.protobuf.Any.fromObject(data.tx);
                        }
                        if (data.timestamp != null) {
                            message.timestamp = data.timestamp;
                        }
                        if (data.events != null) {
                            message.events = data.events.map(item => dependency_2.tendermint.abci.Event.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.height != null) {
                            data.height = this.height;
                        }
                        if (this.txhash != null) {
                            data.txhash = this.txhash;
                        }
                        if (this.codespace != null) {
                            data.codespace = this.codespace;
                        }
                        if (this.code != null) {
                            data.code = this.code;
                        }
                        if (this.data != null) {
                            data.data = this.data;
                        }
                        if (this.raw_log != null) {
                            data.raw_log = this.raw_log;
                        }
                        if (this.logs != null) {
                            data.logs = this.logs.map((item) => item.toObject());
                        }
                        if (this.info != null) {
                            data.info = this.info;
                        }
                        if (this.gas_wanted != null) {
                            data.gas_wanted = this.gas_wanted;
                        }
                        if (this.gas_used != null) {
                            data.gas_used = this.gas_used;
                        }
                        if (this.tx != null) {
                            data.tx = this.tx.toObject();
                        }
                        if (this.timestamp != null) {
                            data.timestamp = this.timestamp;
                        }
                        if (this.events != null) {
                            data.events = this.events.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.height !== undefined)
                            writer.writeInt64(1, this.height);
                        if (typeof this.txhash === "string" && this.txhash.length)
                            writer.writeString(2, this.txhash);
                        if (typeof this.codespace === "string" && this.codespace.length)
                            writer.writeString(3, this.codespace);
                        if (this.code !== undefined)
                            writer.writeUint32(4, this.code);
                        if (typeof this.data === "string" && this.data.length)
                            writer.writeString(5, this.data);
                        if (typeof this.raw_log === "string" && this.raw_log.length)
                            writer.writeString(6, this.raw_log);
                        if (this.logs !== undefined)
                            writer.writeRepeatedMessage(7, this.logs, (item) => item.serialize(writer));
                        if (typeof this.info === "string" && this.info.length)
                            writer.writeString(8, this.info);
                        if (this.gas_wanted !== undefined)
                            writer.writeInt64(9, this.gas_wanted);
                        if (this.gas_used !== undefined)
                            writer.writeInt64(10, this.gas_used);
                        if (this.tx !== undefined)
                            writer.writeMessage(11, this.tx, () => this.tx.serialize(writer));
                        if (typeof this.timestamp === "string" && this.timestamp.length)
                            writer.writeString(12, this.timestamp);
                        if (this.events !== undefined)
                            writer.writeRepeatedMessage(13, this.events, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TxResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.height = reader.readInt64();
                                    break;
                                case 2:
                                    message.txhash = reader.readString();
                                    break;
                                case 3:
                                    message.codespace = reader.readString();
                                    break;
                                case 4:
                                    message.code = reader.readUint32();
                                    break;
                                case 5:
                                    message.data = reader.readString();
                                    break;
                                case 6:
                                    message.raw_log = reader.readString();
                                    break;
                                case 7:
                                    reader.readMessage(message.logs, () => pb_1.Message.addToRepeatedWrapperField(message, 7, ABCIMessageLog.deserialize(reader), ABCIMessageLog));
                                    break;
                                case 8:
                                    message.info = reader.readString();
                                    break;
                                case 9:
                                    message.gas_wanted = reader.readInt64();
                                    break;
                                case 10:
                                    message.gas_used = reader.readInt64();
                                    break;
                                case 11:
                                    reader.readMessage(message.tx, () => message.tx = dependency_3.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 12:
                                    message.timestamp = reader.readString();
                                    break;
                                case 13:
                                    reader.readMessage(message.events, () => pb_1.Message.addToRepeatedWrapperField(message, 13, dependency_2.tendermint.abci.Event.deserialize(reader), dependency_2.tendermint.abci.Event));
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
                        return TxResponse.deserialize(bytes);
                    }
                }
                v1beta1.TxResponse = TxResponse;
                class ABCIMessageLog extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("msg_index" in data && data.msg_index != undefined) {
                                this.msg_index = data.msg_index;
                            }
                            if ("log" in data && data.log != undefined) {
                                this.log = data.log;
                            }
                            if ("events" in data && data.events != undefined) {
                                this.events = data.events;
                            }
                        }
                    }
                    get msg_index() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set msg_index(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get log() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set log(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get events() {
                        return pb_1.Message.getRepeatedWrapperField(this, StringEvent, 3);
                    }
                    set events(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new ABCIMessageLog({});
                        if (data.msg_index != null) {
                            message.msg_index = data.msg_index;
                        }
                        if (data.log != null) {
                            message.log = data.log;
                        }
                        if (data.events != null) {
                            message.events = data.events.map(item => StringEvent.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.msg_index != null) {
                            data.msg_index = this.msg_index;
                        }
                        if (this.log != null) {
                            data.log = this.log;
                        }
                        if (this.events != null) {
                            data.events = this.events.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.msg_index !== undefined)
                            writer.writeUint32(1, this.msg_index);
                        if (typeof this.log === "string" && this.log.length)
                            writer.writeString(2, this.log);
                        if (this.events !== undefined)
                            writer.writeRepeatedMessage(3, this.events, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ABCIMessageLog();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.msg_index = reader.readUint32();
                                    break;
                                case 2:
                                    message.log = reader.readString();
                                    break;
                                case 3:
                                    reader.readMessage(message.events, () => pb_1.Message.addToRepeatedWrapperField(message, 3, StringEvent.deserialize(reader), StringEvent));
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
                        return ABCIMessageLog.deserialize(bytes);
                    }
                }
                v1beta1.ABCIMessageLog = ABCIMessageLog;
                class StringEvent extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("type" in data && data.type != undefined) {
                                this.type = data.type;
                            }
                            if ("attributes" in data && data.attributes != undefined) {
                                this.attributes = data.attributes;
                            }
                        }
                    }
                    get type() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set type(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get attributes() {
                        return pb_1.Message.getRepeatedWrapperField(this, Attribute, 2);
                    }
                    set attributes(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new StringEvent({});
                        if (data.type != null) {
                            message.type = data.type;
                        }
                        if (data.attributes != null) {
                            message.attributes = data.attributes.map(item => Attribute.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.type != null) {
                            data.type = this.type;
                        }
                        if (this.attributes != null) {
                            data.attributes = this.attributes.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.type === "string" && this.type.length)
                            writer.writeString(1, this.type);
                        if (this.attributes !== undefined)
                            writer.writeRepeatedMessage(2, this.attributes, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new StringEvent();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.type = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.attributes, () => pb_1.Message.addToRepeatedWrapperField(message, 2, Attribute.deserialize(reader), Attribute));
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
                        return StringEvent.deserialize(bytes);
                    }
                }
                v1beta1.StringEvent = StringEvent;
                class Attribute extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("key" in data && data.key != undefined) {
                                this.key = data.key;
                            }
                            if ("value" in data && data.value != undefined) {
                                this.value = data.value;
                            }
                        }
                    }
                    get key() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set key(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get value() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set value(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new Attribute({});
                        if (data.key != null) {
                            message.key = data.key;
                        }
                        if (data.value != null) {
                            message.value = data.value;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.key != null) {
                            data.key = this.key;
                        }
                        if (this.value != null) {
                            data.value = this.value;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.key === "string" && this.key.length)
                            writer.writeString(1, this.key);
                        if (typeof this.value === "string" && this.value.length)
                            writer.writeString(2, this.value);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Attribute();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.key = reader.readString();
                                    break;
                                case 2:
                                    message.value = reader.readString();
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
                        return Attribute.deserialize(bytes);
                    }
                }
                v1beta1.Attribute = Attribute;
                class GasInfo extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("gas_wanted" in data && data.gas_wanted != undefined) {
                                this.gas_wanted = data.gas_wanted;
                            }
                            if ("gas_used" in data && data.gas_used != undefined) {
                                this.gas_used = data.gas_used;
                            }
                        }
                    }
                    get gas_wanted() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set gas_wanted(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get gas_used() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set gas_used(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new GasInfo({});
                        if (data.gas_wanted != null) {
                            message.gas_wanted = data.gas_wanted;
                        }
                        if (data.gas_used != null) {
                            message.gas_used = data.gas_used;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.gas_wanted != null) {
                            data.gas_wanted = this.gas_wanted;
                        }
                        if (this.gas_used != null) {
                            data.gas_used = this.gas_used;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.gas_wanted !== undefined)
                            writer.writeUint64(1, this.gas_wanted);
                        if (this.gas_used !== undefined)
                            writer.writeUint64(2, this.gas_used);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GasInfo();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.gas_wanted = reader.readUint64();
                                    break;
                                case 2:
                                    message.gas_used = reader.readUint64();
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
                        return GasInfo.deserialize(bytes);
                    }
                }
                v1beta1.GasInfo = GasInfo;
                class Result extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("data" in data && data.data != undefined) {
                                this.data = data.data;
                            }
                            if ("log" in data && data.log != undefined) {
                                this.log = data.log;
                            }
                            if ("events" in data && data.events != undefined) {
                                this.events = data.events;
                            }
                        }
                    }
                    get data() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set data(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get log() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set log(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get events() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.tendermint.abci.Event, 3);
                    }
                    set events(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new Result({});
                        if (data.data != null) {
                            message.data = data.data;
                        }
                        if (data.log != null) {
                            message.log = data.log;
                        }
                        if (data.events != null) {
                            message.events = data.events.map(item => dependency_2.tendermint.abci.Event.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.data != null) {
                            data.data = this.data;
                        }
                        if (this.log != null) {
                            data.log = this.log;
                        }
                        if (this.events != null) {
                            data.events = this.events.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.data !== undefined)
                            writer.writeBytes(1, this.data);
                        if (typeof this.log === "string" && this.log.length)
                            writer.writeString(2, this.log);
                        if (this.events !== undefined)
                            writer.writeRepeatedMessage(3, this.events, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Result();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.data = reader.readBytes();
                                    break;
                                case 2:
                                    message.log = reader.readString();
                                    break;
                                case 3:
                                    reader.readMessage(message.events, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_2.tendermint.abci.Event.deserialize(reader), dependency_2.tendermint.abci.Event));
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
                        return Result.deserialize(bytes);
                    }
                }
                v1beta1.Result = Result;
                class SimulationResponse extends pb_1.Message {
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
                        return pb_1.Message.getWrapperField(this, GasInfo, 1);
                    }
                    set gas_info(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get result() {
                        return pb_1.Message.getWrapperField(this, Result, 2);
                    }
                    set result(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new SimulationResponse({});
                        if (data.gas_info != null) {
                            message.gas_info = GasInfo.fromObject(data.gas_info);
                        }
                        if (data.result != null) {
                            message.result = Result.fromObject(data.result);
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
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SimulationResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.gas_info, () => message.gas_info = GasInfo.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.result, () => message.result = Result.deserialize(reader));
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
                        return SimulationResponse.deserialize(bytes);
                    }
                }
                v1beta1.SimulationResponse = SimulationResponse;
                class MsgData extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("msg_type" in data && data.msg_type != undefined) {
                                this.msg_type = data.msg_type;
                            }
                            if ("data" in data && data.data != undefined) {
                                this.data = data.data;
                            }
                        }
                    }
                    get msg_type() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set msg_type(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get data() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set data(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new MsgData({});
                        if (data.msg_type != null) {
                            message.msg_type = data.msg_type;
                        }
                        if (data.data != null) {
                            message.data = data.data;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.msg_type != null) {
                            data.msg_type = this.msg_type;
                        }
                        if (this.data != null) {
                            data.data = this.data;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.msg_type === "string" && this.msg_type.length)
                            writer.writeString(1, this.msg_type);
                        if (this.data !== undefined)
                            writer.writeBytes(2, this.data);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgData();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.msg_type = reader.readString();
                                    break;
                                case 2:
                                    message.data = reader.readBytes();
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
                        return MsgData.deserialize(bytes);
                    }
                }
                v1beta1.MsgData = MsgData;
                class TxMsgData extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("data" in data && data.data != undefined) {
                                this.data = data.data;
                            }
                        }
                    }
                    get data() {
                        return pb_1.Message.getRepeatedWrapperField(this, MsgData, 1);
                    }
                    set data(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new TxMsgData({});
                        if (data.data != null) {
                            message.data = data.data.map(item => MsgData.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.data != null) {
                            data.data = this.data.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.data !== undefined)
                            writer.writeRepeatedMessage(1, this.data, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TxMsgData();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.data, () => pb_1.Message.addToRepeatedWrapperField(message, 1, MsgData.deserialize(reader), MsgData));
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
                        return TxMsgData.deserialize(bytes);
                    }
                }
                v1beta1.TxMsgData = TxMsgData;
                class SearchTxsResult extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("total_count" in data && data.total_count != undefined) {
                                this.total_count = data.total_count;
                            }
                            if ("count" in data && data.count != undefined) {
                                this.count = data.count;
                            }
                            if ("page_number" in data && data.page_number != undefined) {
                                this.page_number = data.page_number;
                            }
                            if ("page_total" in data && data.page_total != undefined) {
                                this.page_total = data.page_total;
                            }
                            if ("limit" in data && data.limit != undefined) {
                                this.limit = data.limit;
                            }
                            if ("txs" in data && data.txs != undefined) {
                                this.txs = data.txs;
                            }
                        }
                    }
                    get total_count() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set total_count(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get count() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set count(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get page_number() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set page_number(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get page_total() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set page_total(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get limit() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set limit(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    get txs() {
                        return pb_1.Message.getRepeatedWrapperField(this, TxResponse, 6);
                    }
                    set txs(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 6, value);
                    }
                    static fromObject(data) {
                        const message = new SearchTxsResult({});
                        if (data.total_count != null) {
                            message.total_count = data.total_count;
                        }
                        if (data.count != null) {
                            message.count = data.count;
                        }
                        if (data.page_number != null) {
                            message.page_number = data.page_number;
                        }
                        if (data.page_total != null) {
                            message.page_total = data.page_total;
                        }
                        if (data.limit != null) {
                            message.limit = data.limit;
                        }
                        if (data.txs != null) {
                            message.txs = data.txs.map(item => TxResponse.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.total_count != null) {
                            data.total_count = this.total_count;
                        }
                        if (this.count != null) {
                            data.count = this.count;
                        }
                        if (this.page_number != null) {
                            data.page_number = this.page_number;
                        }
                        if (this.page_total != null) {
                            data.page_total = this.page_total;
                        }
                        if (this.limit != null) {
                            data.limit = this.limit;
                        }
                        if (this.txs != null) {
                            data.txs = this.txs.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.total_count !== undefined)
                            writer.writeUint64(1, this.total_count);
                        if (this.count !== undefined)
                            writer.writeUint64(2, this.count);
                        if (this.page_number !== undefined)
                            writer.writeUint64(3, this.page_number);
                        if (this.page_total !== undefined)
                            writer.writeUint64(4, this.page_total);
                        if (this.limit !== undefined)
                            writer.writeUint64(5, this.limit);
                        if (this.txs !== undefined)
                            writer.writeRepeatedMessage(6, this.txs, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SearchTxsResult();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.total_count = reader.readUint64();
                                    break;
                                case 2:
                                    message.count = reader.readUint64();
                                    break;
                                case 3:
                                    message.page_number = reader.readUint64();
                                    break;
                                case 4:
                                    message.page_total = reader.readUint64();
                                    break;
                                case 5:
                                    message.limit = reader.readUint64();
                                    break;
                                case 6:
                                    reader.readMessage(message.txs, () => pb_1.Message.addToRepeatedWrapperField(message, 6, TxResponse.deserialize(reader), TxResponse));
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
                        return SearchTxsResult.deserialize(bytes);
                    }
                }
                v1beta1.SearchTxsResult = SearchTxsResult;
            })(v1beta1 = abci.v1beta1 || (abci.v1beta1 = {}));
        })(abci = base.abci || (base.abci = {}));
    })(base = cosmos.base || (cosmos.base = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=abci.js.map