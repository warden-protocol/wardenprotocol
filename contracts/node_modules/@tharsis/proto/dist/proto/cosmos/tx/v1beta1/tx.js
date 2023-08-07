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
const dependency_2 = __importStar(require("./../../crypto/multisig/v1beta1/multisig"));
const dependency_3 = __importStar(require("./../../base/v1beta1/coin"));
const dependency_5 = __importStar(require("./../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var tx;
    (function (tx) {
        var v1beta1;
        (function (v1beta1) {
            class Tx extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("body" in data && data.body != undefined) {
                            this.body = data.body;
                        }
                        if ("auth_info" in data && data.auth_info != undefined) {
                            this.auth_info = data.auth_info;
                        }
                        if ("signatures" in data && data.signatures != undefined) {
                            this.signatures = data.signatures;
                        }
                    }
                }
                get body() {
                    return pb_1.Message.getWrapperField(this, TxBody, 1);
                }
                set body(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get auth_info() {
                    return pb_1.Message.getWrapperField(this, AuthInfo, 2);
                }
                set auth_info(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get signatures() {
                    return pb_1.Message.getField(this, 3);
                }
                set signatures(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new Tx({});
                    if (data.body != null) {
                        message.body = TxBody.fromObject(data.body);
                    }
                    if (data.auth_info != null) {
                        message.auth_info = AuthInfo.fromObject(data.auth_info);
                    }
                    if (data.signatures != null) {
                        message.signatures = data.signatures;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.body != null) {
                        data.body = this.body.toObject();
                    }
                    if (this.auth_info != null) {
                        data.auth_info = this.auth_info.toObject();
                    }
                    if (this.signatures != null) {
                        data.signatures = this.signatures;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.body !== undefined)
                        writer.writeMessage(1, this.body, () => this.body.serialize(writer));
                    if (this.auth_info !== undefined)
                        writer.writeMessage(2, this.auth_info, () => this.auth_info.serialize(writer));
                    if (this.signatures !== undefined)
                        writer.writeRepeatedBytes(3, this.signatures);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Tx();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.body, () => message.body = TxBody.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.auth_info, () => message.auth_info = AuthInfo.deserialize(reader));
                                break;
                            case 3:
                                pb_1.Message.addToRepeatedField(message, 3, reader.readBytes());
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
                    return Tx.deserialize(bytes);
                }
            }
            v1beta1.Tx = Tx;
            class TxRaw extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("body_bytes" in data && data.body_bytes != undefined) {
                            this.body_bytes = data.body_bytes;
                        }
                        if ("auth_info_bytes" in data && data.auth_info_bytes != undefined) {
                            this.auth_info_bytes = data.auth_info_bytes;
                        }
                        if ("signatures" in data && data.signatures != undefined) {
                            this.signatures = data.signatures;
                        }
                    }
                }
                get body_bytes() {
                    return pb_1.Message.getField(this, 1);
                }
                set body_bytes(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get auth_info_bytes() {
                    return pb_1.Message.getField(this, 2);
                }
                set auth_info_bytes(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get signatures() {
                    return pb_1.Message.getField(this, 3);
                }
                set signatures(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new TxRaw({});
                    if (data.body_bytes != null) {
                        message.body_bytes = data.body_bytes;
                    }
                    if (data.auth_info_bytes != null) {
                        message.auth_info_bytes = data.auth_info_bytes;
                    }
                    if (data.signatures != null) {
                        message.signatures = data.signatures;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.body_bytes != null) {
                        data.body_bytes = this.body_bytes;
                    }
                    if (this.auth_info_bytes != null) {
                        data.auth_info_bytes = this.auth_info_bytes;
                    }
                    if (this.signatures != null) {
                        data.signatures = this.signatures;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.body_bytes !== undefined)
                        writer.writeBytes(1, this.body_bytes);
                    if (this.auth_info_bytes !== undefined)
                        writer.writeBytes(2, this.auth_info_bytes);
                    if (this.signatures !== undefined)
                        writer.writeRepeatedBytes(3, this.signatures);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TxRaw();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.body_bytes = reader.readBytes();
                                break;
                            case 2:
                                message.auth_info_bytes = reader.readBytes();
                                break;
                            case 3:
                                pb_1.Message.addToRepeatedField(message, 3, reader.readBytes());
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
                    return TxRaw.deserialize(bytes);
                }
            }
            v1beta1.TxRaw = TxRaw;
            class SignDoc extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("body_bytes" in data && data.body_bytes != undefined) {
                            this.body_bytes = data.body_bytes;
                        }
                        if ("auth_info_bytes" in data && data.auth_info_bytes != undefined) {
                            this.auth_info_bytes = data.auth_info_bytes;
                        }
                        if ("chain_id" in data && data.chain_id != undefined) {
                            this.chain_id = data.chain_id;
                        }
                        if ("account_number" in data && data.account_number != undefined) {
                            this.account_number = data.account_number;
                        }
                    }
                }
                get body_bytes() {
                    return pb_1.Message.getField(this, 1);
                }
                set body_bytes(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get auth_info_bytes() {
                    return pb_1.Message.getField(this, 2);
                }
                set auth_info_bytes(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get chain_id() {
                    return pb_1.Message.getField(this, 3);
                }
                set chain_id(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get account_number() {
                    return pb_1.Message.getField(this, 4);
                }
                set account_number(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new SignDoc({});
                    if (data.body_bytes != null) {
                        message.body_bytes = data.body_bytes;
                    }
                    if (data.auth_info_bytes != null) {
                        message.auth_info_bytes = data.auth_info_bytes;
                    }
                    if (data.chain_id != null) {
                        message.chain_id = data.chain_id;
                    }
                    if (data.account_number != null) {
                        message.account_number = data.account_number;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.body_bytes != null) {
                        data.body_bytes = this.body_bytes;
                    }
                    if (this.auth_info_bytes != null) {
                        data.auth_info_bytes = this.auth_info_bytes;
                    }
                    if (this.chain_id != null) {
                        data.chain_id = this.chain_id;
                    }
                    if (this.account_number != null) {
                        data.account_number = this.account_number;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.body_bytes !== undefined)
                        writer.writeBytes(1, this.body_bytes);
                    if (this.auth_info_bytes !== undefined)
                        writer.writeBytes(2, this.auth_info_bytes);
                    if (typeof this.chain_id === "string" && this.chain_id.length)
                        writer.writeString(3, this.chain_id);
                    if (this.account_number !== undefined)
                        writer.writeUint64(4, this.account_number);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SignDoc();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.body_bytes = reader.readBytes();
                                break;
                            case 2:
                                message.auth_info_bytes = reader.readBytes();
                                break;
                            case 3:
                                message.chain_id = reader.readString();
                                break;
                            case 4:
                                message.account_number = reader.readUint64();
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
                    return SignDoc.deserialize(bytes);
                }
            }
            v1beta1.SignDoc = SignDoc;
            class TxBody extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 1023, 2047], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("messages" in data && data.messages != undefined) {
                            this.messages = data.messages;
                        }
                        if ("memo" in data && data.memo != undefined) {
                            this.memo = data.memo;
                        }
                        if ("timeout_height" in data && data.timeout_height != undefined) {
                            this.timeout_height = data.timeout_height;
                        }
                        if ("extension_options" in data && data.extension_options != undefined) {
                            this.extension_options = data.extension_options;
                        }
                        if ("non_critical_extension_options" in data && data.non_critical_extension_options != undefined) {
                            this.non_critical_extension_options = data.non_critical_extension_options;
                        }
                    }
                }
                get messages() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_5.google.protobuf.Any, 1);
                }
                set messages(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get memo() {
                    return pb_1.Message.getField(this, 2);
                }
                set memo(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get timeout_height() {
                    return pb_1.Message.getField(this, 3);
                }
                set timeout_height(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get extension_options() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_5.google.protobuf.Any, 1023);
                }
                set extension_options(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1023, value);
                }
                get non_critical_extension_options() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_5.google.protobuf.Any, 2047);
                }
                set non_critical_extension_options(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2047, value);
                }
                static fromObject(data) {
                    const message = new TxBody({});
                    if (data.messages != null) {
                        message.messages = data.messages.map(item => dependency_5.google.protobuf.Any.fromObject(item));
                    }
                    if (data.memo != null) {
                        message.memo = data.memo;
                    }
                    if (data.timeout_height != null) {
                        message.timeout_height = data.timeout_height;
                    }
                    if (data.extension_options != null) {
                        message.extension_options = data.extension_options.map(item => dependency_5.google.protobuf.Any.fromObject(item));
                    }
                    if (data.non_critical_extension_options != null) {
                        message.non_critical_extension_options = data.non_critical_extension_options.map(item => dependency_5.google.protobuf.Any.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.messages != null) {
                        data.messages = this.messages.map((item) => item.toObject());
                    }
                    if (this.memo != null) {
                        data.memo = this.memo;
                    }
                    if (this.timeout_height != null) {
                        data.timeout_height = this.timeout_height;
                    }
                    if (this.extension_options != null) {
                        data.extension_options = this.extension_options.map((item) => item.toObject());
                    }
                    if (this.non_critical_extension_options != null) {
                        data.non_critical_extension_options = this.non_critical_extension_options.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.messages !== undefined)
                        writer.writeRepeatedMessage(1, this.messages, (item) => item.serialize(writer));
                    if (typeof this.memo === "string" && this.memo.length)
                        writer.writeString(2, this.memo);
                    if (this.timeout_height !== undefined)
                        writer.writeUint64(3, this.timeout_height);
                    if (this.extension_options !== undefined)
                        writer.writeRepeatedMessage(1023, this.extension_options, (item) => item.serialize(writer));
                    if (this.non_critical_extension_options !== undefined)
                        writer.writeRepeatedMessage(2047, this.non_critical_extension_options, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TxBody();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.messages, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_5.google.protobuf.Any.deserialize(reader), dependency_5.google.protobuf.Any));
                                break;
                            case 2:
                                message.memo = reader.readString();
                                break;
                            case 3:
                                message.timeout_height = reader.readUint64();
                                break;
                            case 1023:
                                reader.readMessage(message.extension_options, () => pb_1.Message.addToRepeatedWrapperField(message, 1023, dependency_5.google.protobuf.Any.deserialize(reader), dependency_5.google.protobuf.Any));
                                break;
                            case 2047:
                                reader.readMessage(message.non_critical_extension_options, () => pb_1.Message.addToRepeatedWrapperField(message, 2047, dependency_5.google.protobuf.Any.deserialize(reader), dependency_5.google.protobuf.Any));
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
                    return TxBody.deserialize(bytes);
                }
            }
            v1beta1.TxBody = TxBody;
            class AuthInfo extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("signer_infos" in data && data.signer_infos != undefined) {
                            this.signer_infos = data.signer_infos;
                        }
                        if ("fee" in data && data.fee != undefined) {
                            this.fee = data.fee;
                        }
                    }
                }
                get signer_infos() {
                    return pb_1.Message.getRepeatedWrapperField(this, SignerInfo, 1);
                }
                set signer_infos(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get fee() {
                    return pb_1.Message.getWrapperField(this, Fee, 2);
                }
                set fee(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new AuthInfo({});
                    if (data.signer_infos != null) {
                        message.signer_infos = data.signer_infos.map(item => SignerInfo.fromObject(item));
                    }
                    if (data.fee != null) {
                        message.fee = Fee.fromObject(data.fee);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.signer_infos != null) {
                        data.signer_infos = this.signer_infos.map((item) => item.toObject());
                    }
                    if (this.fee != null) {
                        data.fee = this.fee.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.signer_infos !== undefined)
                        writer.writeRepeatedMessage(1, this.signer_infos, (item) => item.serialize(writer));
                    if (this.fee !== undefined)
                        writer.writeMessage(2, this.fee, () => this.fee.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new AuthInfo();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.signer_infos, () => pb_1.Message.addToRepeatedWrapperField(message, 1, SignerInfo.deserialize(reader), SignerInfo));
                                break;
                            case 2:
                                reader.readMessage(message.fee, () => message.fee = Fee.deserialize(reader));
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
                    return AuthInfo.deserialize(bytes);
                }
            }
            v1beta1.AuthInfo = AuthInfo;
            class SignerInfo extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("public_key" in data && data.public_key != undefined) {
                            this.public_key = data.public_key;
                        }
                        if ("mode_info" in data && data.mode_info != undefined) {
                            this.mode_info = data.mode_info;
                        }
                        if ("sequence" in data && data.sequence != undefined) {
                            this.sequence = data.sequence;
                        }
                    }
                }
                get public_key() {
                    return pb_1.Message.getWrapperField(this, dependency_5.google.protobuf.Any, 1);
                }
                set public_key(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get mode_info() {
                    return pb_1.Message.getWrapperField(this, ModeInfo, 2);
                }
                set mode_info(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get sequence() {
                    return pb_1.Message.getField(this, 3);
                }
                set sequence(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new SignerInfo({});
                    if (data.public_key != null) {
                        message.public_key = dependency_5.google.protobuf.Any.fromObject(data.public_key);
                    }
                    if (data.mode_info != null) {
                        message.mode_info = ModeInfo.fromObject(data.mode_info);
                    }
                    if (data.sequence != null) {
                        message.sequence = data.sequence;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.public_key != null) {
                        data.public_key = this.public_key.toObject();
                    }
                    if (this.mode_info != null) {
                        data.mode_info = this.mode_info.toObject();
                    }
                    if (this.sequence != null) {
                        data.sequence = this.sequence;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.public_key !== undefined)
                        writer.writeMessage(1, this.public_key, () => this.public_key.serialize(writer));
                    if (this.mode_info !== undefined)
                        writer.writeMessage(2, this.mode_info, () => this.mode_info.serialize(writer));
                    if (this.sequence !== undefined)
                        writer.writeUint64(3, this.sequence);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SignerInfo();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.public_key, () => message.public_key = dependency_5.google.protobuf.Any.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.mode_info, () => message.mode_info = ModeInfo.deserialize(reader));
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
                    return SignerInfo.deserialize(bytes);
                }
            }
            v1beta1.SignerInfo = SignerInfo;
            class ModeInfo extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2]]);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("single" in data && data.single != undefined) {
                            this.single = data.single;
                        }
                        if ("multi" in data && data.multi != undefined) {
                            this.multi = data.multi;
                        }
                    }
                }
                get single() {
                    return pb_1.Message.getWrapperField(this, ModeInfo.Single, 1);
                }
                set single(value) {
                    pb_1.Message.setOneofWrapperField(this, 1, [1, 2], value);
                }
                get multi() {
                    return pb_1.Message.getWrapperField(this, ModeInfo.Multi, 2);
                }
                set multi(value) {
                    pb_1.Message.setOneofWrapperField(this, 2, [1, 2], value);
                }
                get sum() {
                    const cases = {
                        0: "none",
                        1: "single",
                        2: "multi"
                    };
                    return cases[pb_1.Message.computeOneofCase(this, [1, 2])];
                }
                static fromObject(data) {
                    const message = new ModeInfo({});
                    if (data.single != null) {
                        message.single = ModeInfo.Single.fromObject(data.single);
                    }
                    if (data.multi != null) {
                        message.multi = ModeInfo.Multi.fromObject(data.multi);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.single != null) {
                        data.single = this.single.toObject();
                    }
                    if (this.multi != null) {
                        data.multi = this.multi.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.single !== undefined)
                        writer.writeMessage(1, this.single, () => this.single.serialize(writer));
                    if (this.multi !== undefined)
                        writer.writeMessage(2, this.multi, () => this.multi.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ModeInfo();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.single, () => message.single = ModeInfo.Single.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.multi, () => message.multi = ModeInfo.Multi.deserialize(reader));
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
                    return ModeInfo.deserialize(bytes);
                }
            }
            v1beta1.ModeInfo = ModeInfo;
            (function (ModeInfo) {
                class Single extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("mode" in data && data.mode != undefined) {
                                this.mode = data.mode;
                            }
                        }
                    }
                    get mode() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set mode(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new Single({});
                        if (data.mode != null) {
                            message.mode = data.mode;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.mode != null) {
                            data.mode = this.mode;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.mode !== undefined)
                            writer.writeEnum(1, this.mode);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Single();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
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
                        return Single.deserialize(bytes);
                    }
                }
                ModeInfo.Single = Single;
                class Multi extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("bitarray" in data && data.bitarray != undefined) {
                                this.bitarray = data.bitarray;
                            }
                            if ("mode_infos" in data && data.mode_infos != undefined) {
                                this.mode_infos = data.mode_infos;
                            }
                        }
                    }
                    get bitarray() {
                        return pb_1.Message.getWrapperField(this, dependency_2.cosmos.crypto.multisig.v1beta1.CompactBitArray, 1);
                    }
                    set bitarray(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get mode_infos() {
                        return pb_1.Message.getRepeatedWrapperField(this, ModeInfo, 2);
                    }
                    set mode_infos(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new Multi({});
                        if (data.bitarray != null) {
                            message.bitarray = dependency_2.cosmos.crypto.multisig.v1beta1.CompactBitArray.fromObject(data.bitarray);
                        }
                        if (data.mode_infos != null) {
                            message.mode_infos = data.mode_infos.map(item => ModeInfo.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.bitarray != null) {
                            data.bitarray = this.bitarray.toObject();
                        }
                        if (this.mode_infos != null) {
                            data.mode_infos = this.mode_infos.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.bitarray !== undefined)
                            writer.writeMessage(1, this.bitarray, () => this.bitarray.serialize(writer));
                        if (this.mode_infos !== undefined)
                            writer.writeRepeatedMessage(2, this.mode_infos, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Multi();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.bitarray, () => message.bitarray = dependency_2.cosmos.crypto.multisig.v1beta1.CompactBitArray.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.mode_infos, () => pb_1.Message.addToRepeatedWrapperField(message, 2, ModeInfo.deserialize(reader), ModeInfo));
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
                        return Multi.deserialize(bytes);
                    }
                }
                ModeInfo.Multi = Multi;
            })(ModeInfo = v1beta1.ModeInfo || (v1beta1.ModeInfo = {}));
            class Fee extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                        if ("gas_limit" in data && data.gas_limit != undefined) {
                            this.gas_limit = data.gas_limit;
                        }
                        if ("payer" in data && data.payer != undefined) {
                            this.payer = data.payer;
                        }
                        if ("granter" in data && data.granter != undefined) {
                            this.granter = data.granter;
                        }
                    }
                }
                get amount() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_3.cosmos.base.v1beta1.Coin, 1);
                }
                set amount(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get gas_limit() {
                    return pb_1.Message.getField(this, 2);
                }
                set gas_limit(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get payer() {
                    return pb_1.Message.getField(this, 3);
                }
                set payer(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get granter() {
                    return pb_1.Message.getField(this, 4);
                }
                set granter(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new Fee({});
                    if (data.amount != null) {
                        message.amount = data.amount.map(item => dependency_3.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.gas_limit != null) {
                        message.gas_limit = data.gas_limit;
                    }
                    if (data.payer != null) {
                        message.payer = data.payer;
                    }
                    if (data.granter != null) {
                        message.granter = data.granter;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.amount != null) {
                        data.amount = this.amount.map((item) => item.toObject());
                    }
                    if (this.gas_limit != null) {
                        data.gas_limit = this.gas_limit;
                    }
                    if (this.payer != null) {
                        data.payer = this.payer;
                    }
                    if (this.granter != null) {
                        data.granter = this.granter;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.amount !== undefined)
                        writer.writeRepeatedMessage(1, this.amount, (item) => item.serialize(writer));
                    if (this.gas_limit !== undefined)
                        writer.writeUint64(2, this.gas_limit);
                    if (typeof this.payer === "string" && this.payer.length)
                        writer.writeString(3, this.payer);
                    if (typeof this.granter === "string" && this.granter.length)
                        writer.writeString(4, this.granter);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Fee();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.amount, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_3.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_3.cosmos.base.v1beta1.Coin));
                                break;
                            case 2:
                                message.gas_limit = reader.readUint64();
                                break;
                            case 3:
                                message.payer = reader.readString();
                                break;
                            case 4:
                                message.granter = reader.readString();
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
                    return Fee.deserialize(bytes);
                }
            }
            v1beta1.Fee = Fee;
        })(v1beta1 = tx.v1beta1 || (tx.v1beta1 = {}));
    })(tx = cosmos.tx || (cosmos.tx = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=tx.js.map