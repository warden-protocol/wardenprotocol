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
const dependency_3 = __importStar(require("./../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var auth;
    (function (auth) {
        var v1beta1;
        (function (v1beta1) {
            class BaseAccount extends pb_1.Message {
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
                        if ("account_number" in data && data.account_number != undefined) {
                            this.account_number = data.account_number;
                        }
                        if ("sequence" in data && data.sequence != undefined) {
                            this.sequence = data.sequence;
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
                    return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Any, 2);
                }
                set pub_key(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get account_number() {
                    return pb_1.Message.getField(this, 3);
                }
                set account_number(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get sequence() {
                    return pb_1.Message.getField(this, 4);
                }
                set sequence(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new BaseAccount({});
                    if (data.address != null) {
                        message.address = data.address;
                    }
                    if (data.pub_key != null) {
                        message.pub_key = dependency_3.google.protobuf.Any.fromObject(data.pub_key);
                    }
                    if (data.account_number != null) {
                        message.account_number = data.account_number;
                    }
                    if (data.sequence != null) {
                        message.sequence = data.sequence;
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
                    if (this.account_number != null) {
                        data.account_number = this.account_number;
                    }
                    if (this.sequence != null) {
                        data.sequence = this.sequence;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.address === "string" && this.address.length)
                        writer.writeString(1, this.address);
                    if (this.pub_key !== undefined)
                        writer.writeMessage(2, this.pub_key, () => this.pub_key.serialize(writer));
                    if (this.account_number !== undefined)
                        writer.writeUint64(3, this.account_number);
                    if (this.sequence !== undefined)
                        writer.writeUint64(4, this.sequence);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BaseAccount();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.address = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.pub_key, () => message.pub_key = dependency_3.google.protobuf.Any.deserialize(reader));
                                break;
                            case 3:
                                message.account_number = reader.readUint64();
                                break;
                            case 4:
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
                    return BaseAccount.deserialize(bytes);
                }
            }
            v1beta1.BaseAccount = BaseAccount;
            class ModuleAccount extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("base_account" in data && data.base_account != undefined) {
                            this.base_account = data.base_account;
                        }
                        if ("name" in data && data.name != undefined) {
                            this.name = data.name;
                        }
                        if ("permissions" in data && data.permissions != undefined) {
                            this.permissions = data.permissions;
                        }
                    }
                }
                get base_account() {
                    return pb_1.Message.getWrapperField(this, BaseAccount, 1);
                }
                set base_account(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get name() {
                    return pb_1.Message.getField(this, 2);
                }
                set name(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get permissions() {
                    return pb_1.Message.getField(this, 3);
                }
                set permissions(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new ModuleAccount({});
                    if (data.base_account != null) {
                        message.base_account = BaseAccount.fromObject(data.base_account);
                    }
                    if (data.name != null) {
                        message.name = data.name;
                    }
                    if (data.permissions != null) {
                        message.permissions = data.permissions;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.base_account != null) {
                        data.base_account = this.base_account.toObject();
                    }
                    if (this.name != null) {
                        data.name = this.name;
                    }
                    if (this.permissions != null) {
                        data.permissions = this.permissions;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.base_account !== undefined)
                        writer.writeMessage(1, this.base_account, () => this.base_account.serialize(writer));
                    if (typeof this.name === "string" && this.name.length)
                        writer.writeString(2, this.name);
                    if (this.permissions !== undefined)
                        writer.writeRepeatedString(3, this.permissions);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ModuleAccount();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.base_account, () => message.base_account = BaseAccount.deserialize(reader));
                                break;
                            case 2:
                                message.name = reader.readString();
                                break;
                            case 3:
                                pb_1.Message.addToRepeatedField(message, 3, reader.readString());
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
                    return ModuleAccount.deserialize(bytes);
                }
            }
            v1beta1.ModuleAccount = ModuleAccount;
            class Params extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("max_memo_characters" in data && data.max_memo_characters != undefined) {
                            this.max_memo_characters = data.max_memo_characters;
                        }
                        if ("tx_sig_limit" in data && data.tx_sig_limit != undefined) {
                            this.tx_sig_limit = data.tx_sig_limit;
                        }
                        if ("tx_size_cost_per_byte" in data && data.tx_size_cost_per_byte != undefined) {
                            this.tx_size_cost_per_byte = data.tx_size_cost_per_byte;
                        }
                        if ("sig_verify_cost_ed25519" in data && data.sig_verify_cost_ed25519 != undefined) {
                            this.sig_verify_cost_ed25519 = data.sig_verify_cost_ed25519;
                        }
                        if ("sig_verify_cost_secp256k1" in data && data.sig_verify_cost_secp256k1 != undefined) {
                            this.sig_verify_cost_secp256k1 = data.sig_verify_cost_secp256k1;
                        }
                    }
                }
                get max_memo_characters() {
                    return pb_1.Message.getField(this, 1);
                }
                set max_memo_characters(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get tx_sig_limit() {
                    return pb_1.Message.getField(this, 2);
                }
                set tx_sig_limit(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get tx_size_cost_per_byte() {
                    return pb_1.Message.getField(this, 3);
                }
                set tx_size_cost_per_byte(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get sig_verify_cost_ed25519() {
                    return pb_1.Message.getField(this, 4);
                }
                set sig_verify_cost_ed25519(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get sig_verify_cost_secp256k1() {
                    return pb_1.Message.getField(this, 5);
                }
                set sig_verify_cost_secp256k1(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.max_memo_characters != null) {
                        message.max_memo_characters = data.max_memo_characters;
                    }
                    if (data.tx_sig_limit != null) {
                        message.tx_sig_limit = data.tx_sig_limit;
                    }
                    if (data.tx_size_cost_per_byte != null) {
                        message.tx_size_cost_per_byte = data.tx_size_cost_per_byte;
                    }
                    if (data.sig_verify_cost_ed25519 != null) {
                        message.sig_verify_cost_ed25519 = data.sig_verify_cost_ed25519;
                    }
                    if (data.sig_verify_cost_secp256k1 != null) {
                        message.sig_verify_cost_secp256k1 = data.sig_verify_cost_secp256k1;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.max_memo_characters != null) {
                        data.max_memo_characters = this.max_memo_characters;
                    }
                    if (this.tx_sig_limit != null) {
                        data.tx_sig_limit = this.tx_sig_limit;
                    }
                    if (this.tx_size_cost_per_byte != null) {
                        data.tx_size_cost_per_byte = this.tx_size_cost_per_byte;
                    }
                    if (this.sig_verify_cost_ed25519 != null) {
                        data.sig_verify_cost_ed25519 = this.sig_verify_cost_ed25519;
                    }
                    if (this.sig_verify_cost_secp256k1 != null) {
                        data.sig_verify_cost_secp256k1 = this.sig_verify_cost_secp256k1;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.max_memo_characters !== undefined)
                        writer.writeUint64(1, this.max_memo_characters);
                    if (this.tx_sig_limit !== undefined)
                        writer.writeUint64(2, this.tx_sig_limit);
                    if (this.tx_size_cost_per_byte !== undefined)
                        writer.writeUint64(3, this.tx_size_cost_per_byte);
                    if (this.sig_verify_cost_ed25519 !== undefined)
                        writer.writeUint64(4, this.sig_verify_cost_ed25519);
                    if (this.sig_verify_cost_secp256k1 !== undefined)
                        writer.writeUint64(5, this.sig_verify_cost_secp256k1);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Params();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.max_memo_characters = reader.readUint64();
                                break;
                            case 2:
                                message.tx_sig_limit = reader.readUint64();
                                break;
                            case 3:
                                message.tx_size_cost_per_byte = reader.readUint64();
                                break;
                            case 4:
                                message.sig_verify_cost_ed25519 = reader.readUint64();
                                break;
                            case 5:
                                message.sig_verify_cost_secp256k1 = reader.readUint64();
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
                    return Params.deserialize(bytes);
                }
            }
            v1beta1.Params = Params;
        })(v1beta1 = auth.v1beta1 || (auth.v1beta1 = {}));
    })(auth = cosmos.auth || (cosmos.auth = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=auth.js.map