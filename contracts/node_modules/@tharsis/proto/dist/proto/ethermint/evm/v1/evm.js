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
exports.ethermint = void 0;
const pb_1 = __importStar(require("google-protobuf"));
var ethermint;
(function (ethermint) {
    var evm;
    (function (evm) {
        var v1;
        (function (v1) {
            class Params extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("evm_denom" in data && data.evm_denom != undefined) {
                            this.evm_denom = data.evm_denom;
                        }
                        if ("enable_create" in data && data.enable_create != undefined) {
                            this.enable_create = data.enable_create;
                        }
                        if ("enable_call" in data && data.enable_call != undefined) {
                            this.enable_call = data.enable_call;
                        }
                        if ("extra_eips" in data && data.extra_eips != undefined) {
                            this.extra_eips = data.extra_eips;
                        }
                        if ("chain_config" in data && data.chain_config != undefined) {
                            this.chain_config = data.chain_config;
                        }
                        if ("allow_unprotected_txs" in data && data.allow_unprotected_txs != undefined) {
                            this.allow_unprotected_txs = data.allow_unprotected_txs;
                        }
                    }
                }
                get evm_denom() {
                    return pb_1.Message.getField(this, 1);
                }
                set evm_denom(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get enable_create() {
                    return pb_1.Message.getField(this, 2);
                }
                set enable_create(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get enable_call() {
                    return pb_1.Message.getField(this, 3);
                }
                set enable_call(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get extra_eips() {
                    return pb_1.Message.getField(this, 4);
                }
                set extra_eips(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get chain_config() {
                    return pb_1.Message.getWrapperField(this, ChainConfig, 5);
                }
                set chain_config(value) {
                    pb_1.Message.setWrapperField(this, 5, value);
                }
                get allow_unprotected_txs() {
                    return pb_1.Message.getField(this, 6);
                }
                set allow_unprotected_txs(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.evm_denom != null) {
                        message.evm_denom = data.evm_denom;
                    }
                    if (data.enable_create != null) {
                        message.enable_create = data.enable_create;
                    }
                    if (data.enable_call != null) {
                        message.enable_call = data.enable_call;
                    }
                    if (data.extra_eips != null) {
                        message.extra_eips = data.extra_eips;
                    }
                    if (data.chain_config != null) {
                        message.chain_config = ChainConfig.fromObject(data.chain_config);
                    }
                    if (data.allow_unprotected_txs != null) {
                        message.allow_unprotected_txs = data.allow_unprotected_txs;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.evm_denom != null) {
                        data.evm_denom = this.evm_denom;
                    }
                    if (this.enable_create != null) {
                        data.enable_create = this.enable_create;
                    }
                    if (this.enable_call != null) {
                        data.enable_call = this.enable_call;
                    }
                    if (this.extra_eips != null) {
                        data.extra_eips = this.extra_eips;
                    }
                    if (this.chain_config != null) {
                        data.chain_config = this.chain_config.toObject();
                    }
                    if (this.allow_unprotected_txs != null) {
                        data.allow_unprotected_txs = this.allow_unprotected_txs;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.evm_denom === "string" && this.evm_denom.length)
                        writer.writeString(1, this.evm_denom);
                    if (this.enable_create !== undefined)
                        writer.writeBool(2, this.enable_create);
                    if (this.enable_call !== undefined)
                        writer.writeBool(3, this.enable_call);
                    if (this.extra_eips !== undefined)
                        writer.writePackedInt64(4, this.extra_eips);
                    if (this.chain_config !== undefined)
                        writer.writeMessage(5, this.chain_config, () => this.chain_config.serialize(writer));
                    if (this.allow_unprotected_txs !== undefined)
                        writer.writeBool(6, this.allow_unprotected_txs);
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
                                message.evm_denom = reader.readString();
                                break;
                            case 2:
                                message.enable_create = reader.readBool();
                                break;
                            case 3:
                                message.enable_call = reader.readBool();
                                break;
                            case 4:
                                message.extra_eips = reader.readPackedInt64();
                                break;
                            case 5:
                                reader.readMessage(message.chain_config, () => message.chain_config = ChainConfig.deserialize(reader));
                                break;
                            case 6:
                                message.allow_unprotected_txs = reader.readBool();
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
            v1.Params = Params;
            class ChainConfig extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("homestead_block" in data && data.homestead_block != undefined) {
                            this.homestead_block = data.homestead_block;
                        }
                        if ("dao_fork_block" in data && data.dao_fork_block != undefined) {
                            this.dao_fork_block = data.dao_fork_block;
                        }
                        if ("dao_fork_support" in data && data.dao_fork_support != undefined) {
                            this.dao_fork_support = data.dao_fork_support;
                        }
                        if ("eip150_block" in data && data.eip150_block != undefined) {
                            this.eip150_block = data.eip150_block;
                        }
                        if ("eip150_hash" in data && data.eip150_hash != undefined) {
                            this.eip150_hash = data.eip150_hash;
                        }
                        if ("eip155_block" in data && data.eip155_block != undefined) {
                            this.eip155_block = data.eip155_block;
                        }
                        if ("eip158_block" in data && data.eip158_block != undefined) {
                            this.eip158_block = data.eip158_block;
                        }
                        if ("byzantium_block" in data && data.byzantium_block != undefined) {
                            this.byzantium_block = data.byzantium_block;
                        }
                        if ("constantinople_block" in data && data.constantinople_block != undefined) {
                            this.constantinople_block = data.constantinople_block;
                        }
                        if ("petersburg_block" in data && data.petersburg_block != undefined) {
                            this.petersburg_block = data.petersburg_block;
                        }
                        if ("istanbul_block" in data && data.istanbul_block != undefined) {
                            this.istanbul_block = data.istanbul_block;
                        }
                        if ("muir_glacier_block" in data && data.muir_glacier_block != undefined) {
                            this.muir_glacier_block = data.muir_glacier_block;
                        }
                        if ("berlin_block" in data && data.berlin_block != undefined) {
                            this.berlin_block = data.berlin_block;
                        }
                        if ("london_block" in data && data.london_block != undefined) {
                            this.london_block = data.london_block;
                        }
                        if ("arrow_glacier_block" in data && data.arrow_glacier_block != undefined) {
                            this.arrow_glacier_block = data.arrow_glacier_block;
                        }
                        if ("merge_fork_block" in data && data.merge_fork_block != undefined) {
                            this.merge_fork_block = data.merge_fork_block;
                        }
                    }
                }
                get homestead_block() {
                    return pb_1.Message.getField(this, 1);
                }
                set homestead_block(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get dao_fork_block() {
                    return pb_1.Message.getField(this, 2);
                }
                set dao_fork_block(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get dao_fork_support() {
                    return pb_1.Message.getField(this, 3);
                }
                set dao_fork_support(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get eip150_block() {
                    return pb_1.Message.getField(this, 4);
                }
                set eip150_block(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get eip150_hash() {
                    return pb_1.Message.getField(this, 5);
                }
                set eip150_hash(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get eip155_block() {
                    return pb_1.Message.getField(this, 6);
                }
                set eip155_block(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                get eip158_block() {
                    return pb_1.Message.getField(this, 7);
                }
                set eip158_block(value) {
                    pb_1.Message.setField(this, 7, value);
                }
                get byzantium_block() {
                    return pb_1.Message.getField(this, 8);
                }
                set byzantium_block(value) {
                    pb_1.Message.setField(this, 8, value);
                }
                get constantinople_block() {
                    return pb_1.Message.getField(this, 9);
                }
                set constantinople_block(value) {
                    pb_1.Message.setField(this, 9, value);
                }
                get petersburg_block() {
                    return pb_1.Message.getField(this, 10);
                }
                set petersburg_block(value) {
                    pb_1.Message.setField(this, 10, value);
                }
                get istanbul_block() {
                    return pb_1.Message.getField(this, 11);
                }
                set istanbul_block(value) {
                    pb_1.Message.setField(this, 11, value);
                }
                get muir_glacier_block() {
                    return pb_1.Message.getField(this, 12);
                }
                set muir_glacier_block(value) {
                    pb_1.Message.setField(this, 12, value);
                }
                get berlin_block() {
                    return pb_1.Message.getField(this, 13);
                }
                set berlin_block(value) {
                    pb_1.Message.setField(this, 13, value);
                }
                get london_block() {
                    return pb_1.Message.getField(this, 17);
                }
                set london_block(value) {
                    pb_1.Message.setField(this, 17, value);
                }
                get arrow_glacier_block() {
                    return pb_1.Message.getField(this, 18);
                }
                set arrow_glacier_block(value) {
                    pb_1.Message.setField(this, 18, value);
                }
                get merge_fork_block() {
                    return pb_1.Message.getField(this, 19);
                }
                set merge_fork_block(value) {
                    pb_1.Message.setField(this, 19, value);
                }
                static fromObject(data) {
                    const message = new ChainConfig({});
                    if (data.homestead_block != null) {
                        message.homestead_block = data.homestead_block;
                    }
                    if (data.dao_fork_block != null) {
                        message.dao_fork_block = data.dao_fork_block;
                    }
                    if (data.dao_fork_support != null) {
                        message.dao_fork_support = data.dao_fork_support;
                    }
                    if (data.eip150_block != null) {
                        message.eip150_block = data.eip150_block;
                    }
                    if (data.eip150_hash != null) {
                        message.eip150_hash = data.eip150_hash;
                    }
                    if (data.eip155_block != null) {
                        message.eip155_block = data.eip155_block;
                    }
                    if (data.eip158_block != null) {
                        message.eip158_block = data.eip158_block;
                    }
                    if (data.byzantium_block != null) {
                        message.byzantium_block = data.byzantium_block;
                    }
                    if (data.constantinople_block != null) {
                        message.constantinople_block = data.constantinople_block;
                    }
                    if (data.petersburg_block != null) {
                        message.petersburg_block = data.petersburg_block;
                    }
                    if (data.istanbul_block != null) {
                        message.istanbul_block = data.istanbul_block;
                    }
                    if (data.muir_glacier_block != null) {
                        message.muir_glacier_block = data.muir_glacier_block;
                    }
                    if (data.berlin_block != null) {
                        message.berlin_block = data.berlin_block;
                    }
                    if (data.london_block != null) {
                        message.london_block = data.london_block;
                    }
                    if (data.arrow_glacier_block != null) {
                        message.arrow_glacier_block = data.arrow_glacier_block;
                    }
                    if (data.merge_fork_block != null) {
                        message.merge_fork_block = data.merge_fork_block;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.homestead_block != null) {
                        data.homestead_block = this.homestead_block;
                    }
                    if (this.dao_fork_block != null) {
                        data.dao_fork_block = this.dao_fork_block;
                    }
                    if (this.dao_fork_support != null) {
                        data.dao_fork_support = this.dao_fork_support;
                    }
                    if (this.eip150_block != null) {
                        data.eip150_block = this.eip150_block;
                    }
                    if (this.eip150_hash != null) {
                        data.eip150_hash = this.eip150_hash;
                    }
                    if (this.eip155_block != null) {
                        data.eip155_block = this.eip155_block;
                    }
                    if (this.eip158_block != null) {
                        data.eip158_block = this.eip158_block;
                    }
                    if (this.byzantium_block != null) {
                        data.byzantium_block = this.byzantium_block;
                    }
                    if (this.constantinople_block != null) {
                        data.constantinople_block = this.constantinople_block;
                    }
                    if (this.petersburg_block != null) {
                        data.petersburg_block = this.petersburg_block;
                    }
                    if (this.istanbul_block != null) {
                        data.istanbul_block = this.istanbul_block;
                    }
                    if (this.muir_glacier_block != null) {
                        data.muir_glacier_block = this.muir_glacier_block;
                    }
                    if (this.berlin_block != null) {
                        data.berlin_block = this.berlin_block;
                    }
                    if (this.london_block != null) {
                        data.london_block = this.london_block;
                    }
                    if (this.arrow_glacier_block != null) {
                        data.arrow_glacier_block = this.arrow_glacier_block;
                    }
                    if (this.merge_fork_block != null) {
                        data.merge_fork_block = this.merge_fork_block;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.homestead_block === "string" && this.homestead_block.length)
                        writer.writeString(1, this.homestead_block);
                    if (typeof this.dao_fork_block === "string" && this.dao_fork_block.length)
                        writer.writeString(2, this.dao_fork_block);
                    if (this.dao_fork_support !== undefined)
                        writer.writeBool(3, this.dao_fork_support);
                    if (typeof this.eip150_block === "string" && this.eip150_block.length)
                        writer.writeString(4, this.eip150_block);
                    if (typeof this.eip150_hash === "string" && this.eip150_hash.length)
                        writer.writeString(5, this.eip150_hash);
                    if (typeof this.eip155_block === "string" && this.eip155_block.length)
                        writer.writeString(6, this.eip155_block);
                    if (typeof this.eip158_block === "string" && this.eip158_block.length)
                        writer.writeString(7, this.eip158_block);
                    if (typeof this.byzantium_block === "string" && this.byzantium_block.length)
                        writer.writeString(8, this.byzantium_block);
                    if (typeof this.constantinople_block === "string" && this.constantinople_block.length)
                        writer.writeString(9, this.constantinople_block);
                    if (typeof this.petersburg_block === "string" && this.petersburg_block.length)
                        writer.writeString(10, this.petersburg_block);
                    if (typeof this.istanbul_block === "string" && this.istanbul_block.length)
                        writer.writeString(11, this.istanbul_block);
                    if (typeof this.muir_glacier_block === "string" && this.muir_glacier_block.length)
                        writer.writeString(12, this.muir_glacier_block);
                    if (typeof this.berlin_block === "string" && this.berlin_block.length)
                        writer.writeString(13, this.berlin_block);
                    if (typeof this.london_block === "string" && this.london_block.length)
                        writer.writeString(17, this.london_block);
                    if (typeof this.arrow_glacier_block === "string" && this.arrow_glacier_block.length)
                        writer.writeString(18, this.arrow_glacier_block);
                    if (typeof this.merge_fork_block === "string" && this.merge_fork_block.length)
                        writer.writeString(19, this.merge_fork_block);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ChainConfig();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.homestead_block = reader.readString();
                                break;
                            case 2:
                                message.dao_fork_block = reader.readString();
                                break;
                            case 3:
                                message.dao_fork_support = reader.readBool();
                                break;
                            case 4:
                                message.eip150_block = reader.readString();
                                break;
                            case 5:
                                message.eip150_hash = reader.readString();
                                break;
                            case 6:
                                message.eip155_block = reader.readString();
                                break;
                            case 7:
                                message.eip158_block = reader.readString();
                                break;
                            case 8:
                                message.byzantium_block = reader.readString();
                                break;
                            case 9:
                                message.constantinople_block = reader.readString();
                                break;
                            case 10:
                                message.petersburg_block = reader.readString();
                                break;
                            case 11:
                                message.istanbul_block = reader.readString();
                                break;
                            case 12:
                                message.muir_glacier_block = reader.readString();
                                break;
                            case 13:
                                message.berlin_block = reader.readString();
                                break;
                            case 17:
                                message.london_block = reader.readString();
                                break;
                            case 18:
                                message.arrow_glacier_block = reader.readString();
                                break;
                            case 19:
                                message.merge_fork_block = reader.readString();
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
                    return ChainConfig.deserialize(bytes);
                }
            }
            v1.ChainConfig = ChainConfig;
            class State extends pb_1.Message {
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
                    const message = new State({});
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new State();
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
                    return State.deserialize(bytes);
                }
            }
            v1.State = State;
            class TransactionLogs extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("hash" in data && data.hash != undefined) {
                            this.hash = data.hash;
                        }
                        if ("logs" in data && data.logs != undefined) {
                            this.logs = data.logs;
                        }
                    }
                }
                get hash() {
                    return pb_1.Message.getField(this, 1);
                }
                set hash(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get logs() {
                    return pb_1.Message.getRepeatedWrapperField(this, Log, 2);
                }
                set logs(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new TransactionLogs({});
                    if (data.hash != null) {
                        message.hash = data.hash;
                    }
                    if (data.logs != null) {
                        message.logs = data.logs.map(item => Log.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.hash != null) {
                        data.hash = this.hash;
                    }
                    if (this.logs != null) {
                        data.logs = this.logs.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.hash === "string" && this.hash.length)
                        writer.writeString(1, this.hash);
                    if (this.logs !== undefined)
                        writer.writeRepeatedMessage(2, this.logs, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TransactionLogs();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.hash = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.logs, () => pb_1.Message.addToRepeatedWrapperField(message, 2, Log.deserialize(reader), Log));
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
                    return TransactionLogs.deserialize(bytes);
                }
            }
            v1.TransactionLogs = TransactionLogs;
            class Log extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("address" in data && data.address != undefined) {
                            this.address = data.address;
                        }
                        if ("topics" in data && data.topics != undefined) {
                            this.topics = data.topics;
                        }
                        if ("data" in data && data.data != undefined) {
                            this.data = data.data;
                        }
                        if ("block_number" in data && data.block_number != undefined) {
                            this.block_number = data.block_number;
                        }
                        if ("tx_hash" in data && data.tx_hash != undefined) {
                            this.tx_hash = data.tx_hash;
                        }
                        if ("tx_index" in data && data.tx_index != undefined) {
                            this.tx_index = data.tx_index;
                        }
                        if ("block_hash" in data && data.block_hash != undefined) {
                            this.block_hash = data.block_hash;
                        }
                        if ("index" in data && data.index != undefined) {
                            this.index = data.index;
                        }
                        if ("removed" in data && data.removed != undefined) {
                            this.removed = data.removed;
                        }
                    }
                }
                get address() {
                    return pb_1.Message.getField(this, 1);
                }
                set address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get topics() {
                    return pb_1.Message.getField(this, 2);
                }
                set topics(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get data() {
                    return pb_1.Message.getField(this, 3);
                }
                set data(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get block_number() {
                    return pb_1.Message.getField(this, 4);
                }
                set block_number(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get tx_hash() {
                    return pb_1.Message.getField(this, 5);
                }
                set tx_hash(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get tx_index() {
                    return pb_1.Message.getField(this, 6);
                }
                set tx_index(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                get block_hash() {
                    return pb_1.Message.getField(this, 7);
                }
                set block_hash(value) {
                    pb_1.Message.setField(this, 7, value);
                }
                get index() {
                    return pb_1.Message.getField(this, 8);
                }
                set index(value) {
                    pb_1.Message.setField(this, 8, value);
                }
                get removed() {
                    return pb_1.Message.getField(this, 9);
                }
                set removed(value) {
                    pb_1.Message.setField(this, 9, value);
                }
                static fromObject(data) {
                    const message = new Log({});
                    if (data.address != null) {
                        message.address = data.address;
                    }
                    if (data.topics != null) {
                        message.topics = data.topics;
                    }
                    if (data.data != null) {
                        message.data = data.data;
                    }
                    if (data.block_number != null) {
                        message.block_number = data.block_number;
                    }
                    if (data.tx_hash != null) {
                        message.tx_hash = data.tx_hash;
                    }
                    if (data.tx_index != null) {
                        message.tx_index = data.tx_index;
                    }
                    if (data.block_hash != null) {
                        message.block_hash = data.block_hash;
                    }
                    if (data.index != null) {
                        message.index = data.index;
                    }
                    if (data.removed != null) {
                        message.removed = data.removed;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.address != null) {
                        data.address = this.address;
                    }
                    if (this.topics != null) {
                        data.topics = this.topics;
                    }
                    if (this.data != null) {
                        data.data = this.data;
                    }
                    if (this.block_number != null) {
                        data.block_number = this.block_number;
                    }
                    if (this.tx_hash != null) {
                        data.tx_hash = this.tx_hash;
                    }
                    if (this.tx_index != null) {
                        data.tx_index = this.tx_index;
                    }
                    if (this.block_hash != null) {
                        data.block_hash = this.block_hash;
                    }
                    if (this.index != null) {
                        data.index = this.index;
                    }
                    if (this.removed != null) {
                        data.removed = this.removed;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.address === "string" && this.address.length)
                        writer.writeString(1, this.address);
                    if (this.topics !== undefined)
                        writer.writeRepeatedString(2, this.topics);
                    if (this.data !== undefined)
                        writer.writeBytes(3, this.data);
                    if (this.block_number !== undefined)
                        writer.writeUint64(4, this.block_number);
                    if (typeof this.tx_hash === "string" && this.tx_hash.length)
                        writer.writeString(5, this.tx_hash);
                    if (this.tx_index !== undefined)
                        writer.writeUint64(6, this.tx_index);
                    if (typeof this.block_hash === "string" && this.block_hash.length)
                        writer.writeString(7, this.block_hash);
                    if (this.index !== undefined)
                        writer.writeUint64(8, this.index);
                    if (this.removed !== undefined)
                        writer.writeBool(9, this.removed);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Log();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.address = reader.readString();
                                break;
                            case 2:
                                pb_1.Message.addToRepeatedField(message, 2, reader.readString());
                                break;
                            case 3:
                                message.data = reader.readBytes();
                                break;
                            case 4:
                                message.block_number = reader.readUint64();
                                break;
                            case 5:
                                message.tx_hash = reader.readString();
                                break;
                            case 6:
                                message.tx_index = reader.readUint64();
                                break;
                            case 7:
                                message.block_hash = reader.readString();
                                break;
                            case 8:
                                message.index = reader.readUint64();
                                break;
                            case 9:
                                message.removed = reader.readBool();
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
                    return Log.deserialize(bytes);
                }
            }
            v1.Log = Log;
            class TxResult extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("contract_address" in data && data.contract_address != undefined) {
                            this.contract_address = data.contract_address;
                        }
                        if ("bloom" in data && data.bloom != undefined) {
                            this.bloom = data.bloom;
                        }
                        if ("tx_logs" in data && data.tx_logs != undefined) {
                            this.tx_logs = data.tx_logs;
                        }
                        if ("ret" in data && data.ret != undefined) {
                            this.ret = data.ret;
                        }
                        if ("reverted" in data && data.reverted != undefined) {
                            this.reverted = data.reverted;
                        }
                        if ("gas_used" in data && data.gas_used != undefined) {
                            this.gas_used = data.gas_used;
                        }
                    }
                }
                get contract_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set contract_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get bloom() {
                    return pb_1.Message.getField(this, 2);
                }
                set bloom(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get tx_logs() {
                    return pb_1.Message.getWrapperField(this, TransactionLogs, 3);
                }
                set tx_logs(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                get ret() {
                    return pb_1.Message.getField(this, 4);
                }
                set ret(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get reverted() {
                    return pb_1.Message.getField(this, 5);
                }
                set reverted(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get gas_used() {
                    return pb_1.Message.getField(this, 6);
                }
                set gas_used(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                static fromObject(data) {
                    const message = new TxResult({});
                    if (data.contract_address != null) {
                        message.contract_address = data.contract_address;
                    }
                    if (data.bloom != null) {
                        message.bloom = data.bloom;
                    }
                    if (data.tx_logs != null) {
                        message.tx_logs = TransactionLogs.fromObject(data.tx_logs);
                    }
                    if (data.ret != null) {
                        message.ret = data.ret;
                    }
                    if (data.reverted != null) {
                        message.reverted = data.reverted;
                    }
                    if (data.gas_used != null) {
                        message.gas_used = data.gas_used;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.contract_address != null) {
                        data.contract_address = this.contract_address;
                    }
                    if (this.bloom != null) {
                        data.bloom = this.bloom;
                    }
                    if (this.tx_logs != null) {
                        data.tx_logs = this.tx_logs.toObject();
                    }
                    if (this.ret != null) {
                        data.ret = this.ret;
                    }
                    if (this.reverted != null) {
                        data.reverted = this.reverted;
                    }
                    if (this.gas_used != null) {
                        data.gas_used = this.gas_used;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.contract_address === "string" && this.contract_address.length)
                        writer.writeString(1, this.contract_address);
                    if (this.bloom !== undefined)
                        writer.writeBytes(2, this.bloom);
                    if (this.tx_logs !== undefined)
                        writer.writeMessage(3, this.tx_logs, () => this.tx_logs.serialize(writer));
                    if (this.ret !== undefined)
                        writer.writeBytes(4, this.ret);
                    if (this.reverted !== undefined)
                        writer.writeBool(5, this.reverted);
                    if (this.gas_used !== undefined)
                        writer.writeUint64(6, this.gas_used);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TxResult();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.contract_address = reader.readString();
                                break;
                            case 2:
                                message.bloom = reader.readBytes();
                                break;
                            case 3:
                                reader.readMessage(message.tx_logs, () => message.tx_logs = TransactionLogs.deserialize(reader));
                                break;
                            case 4:
                                message.ret = reader.readBytes();
                                break;
                            case 5:
                                message.reverted = reader.readBool();
                                break;
                            case 6:
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
                    return TxResult.deserialize(bytes);
                }
            }
            v1.TxResult = TxResult;
            class AccessTuple extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("address" in data && data.address != undefined) {
                            this.address = data.address;
                        }
                        if ("storage_keys" in data && data.storage_keys != undefined) {
                            this.storage_keys = data.storage_keys;
                        }
                    }
                }
                get address() {
                    return pb_1.Message.getField(this, 1);
                }
                set address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get storage_keys() {
                    return pb_1.Message.getField(this, 2);
                }
                set storage_keys(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new AccessTuple({});
                    if (data.address != null) {
                        message.address = data.address;
                    }
                    if (data.storage_keys != null) {
                        message.storage_keys = data.storage_keys;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.address != null) {
                        data.address = this.address;
                    }
                    if (this.storage_keys != null) {
                        data.storage_keys = this.storage_keys;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.address === "string" && this.address.length)
                        writer.writeString(1, this.address);
                    if (this.storage_keys !== undefined)
                        writer.writeRepeatedString(2, this.storage_keys);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new AccessTuple();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.address = reader.readString();
                                break;
                            case 2:
                                pb_1.Message.addToRepeatedField(message, 2, reader.readString());
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
                    return AccessTuple.deserialize(bytes);
                }
            }
            v1.AccessTuple = AccessTuple;
            class TraceConfig extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("tracer" in data && data.tracer != undefined) {
                            this.tracer = data.tracer;
                        }
                        if ("timeout" in data && data.timeout != undefined) {
                            this.timeout = data.timeout;
                        }
                        if ("reexec" in data && data.reexec != undefined) {
                            this.reexec = data.reexec;
                        }
                        if ("disable_stack" in data && data.disable_stack != undefined) {
                            this.disable_stack = data.disable_stack;
                        }
                        if ("disable_storage" in data && data.disable_storage != undefined) {
                            this.disable_storage = data.disable_storage;
                        }
                        if ("debug" in data && data.debug != undefined) {
                            this.debug = data.debug;
                        }
                        if ("limit" in data && data.limit != undefined) {
                            this.limit = data.limit;
                        }
                        if ("overrides" in data && data.overrides != undefined) {
                            this.overrides = data.overrides;
                        }
                        if ("enable_memory" in data && data.enable_memory != undefined) {
                            this.enable_memory = data.enable_memory;
                        }
                        if ("enable_return_data" in data && data.enable_return_data != undefined) {
                            this.enable_return_data = data.enable_return_data;
                        }
                    }
                }
                get tracer() {
                    return pb_1.Message.getField(this, 1);
                }
                set tracer(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get timeout() {
                    return pb_1.Message.getField(this, 2);
                }
                set timeout(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get reexec() {
                    return pb_1.Message.getField(this, 3);
                }
                set reexec(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get disable_stack() {
                    return pb_1.Message.getField(this, 5);
                }
                set disable_stack(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get disable_storage() {
                    return pb_1.Message.getField(this, 6);
                }
                set disable_storage(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                get debug() {
                    return pb_1.Message.getField(this, 8);
                }
                set debug(value) {
                    pb_1.Message.setField(this, 8, value);
                }
                get limit() {
                    return pb_1.Message.getField(this, 9);
                }
                set limit(value) {
                    pb_1.Message.setField(this, 9, value);
                }
                get overrides() {
                    return pb_1.Message.getWrapperField(this, ChainConfig, 10);
                }
                set overrides(value) {
                    pb_1.Message.setWrapperField(this, 10, value);
                }
                get enable_memory() {
                    return pb_1.Message.getField(this, 11);
                }
                set enable_memory(value) {
                    pb_1.Message.setField(this, 11, value);
                }
                get enable_return_data() {
                    return pb_1.Message.getField(this, 12);
                }
                set enable_return_data(value) {
                    pb_1.Message.setField(this, 12, value);
                }
                static fromObject(data) {
                    const message = new TraceConfig({});
                    if (data.tracer != null) {
                        message.tracer = data.tracer;
                    }
                    if (data.timeout != null) {
                        message.timeout = data.timeout;
                    }
                    if (data.reexec != null) {
                        message.reexec = data.reexec;
                    }
                    if (data.disable_stack != null) {
                        message.disable_stack = data.disable_stack;
                    }
                    if (data.disable_storage != null) {
                        message.disable_storage = data.disable_storage;
                    }
                    if (data.debug != null) {
                        message.debug = data.debug;
                    }
                    if (data.limit != null) {
                        message.limit = data.limit;
                    }
                    if (data.overrides != null) {
                        message.overrides = ChainConfig.fromObject(data.overrides);
                    }
                    if (data.enable_memory != null) {
                        message.enable_memory = data.enable_memory;
                    }
                    if (data.enable_return_data != null) {
                        message.enable_return_data = data.enable_return_data;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.tracer != null) {
                        data.tracer = this.tracer;
                    }
                    if (this.timeout != null) {
                        data.timeout = this.timeout;
                    }
                    if (this.reexec != null) {
                        data.reexec = this.reexec;
                    }
                    if (this.disable_stack != null) {
                        data.disable_stack = this.disable_stack;
                    }
                    if (this.disable_storage != null) {
                        data.disable_storage = this.disable_storage;
                    }
                    if (this.debug != null) {
                        data.debug = this.debug;
                    }
                    if (this.limit != null) {
                        data.limit = this.limit;
                    }
                    if (this.overrides != null) {
                        data.overrides = this.overrides.toObject();
                    }
                    if (this.enable_memory != null) {
                        data.enable_memory = this.enable_memory;
                    }
                    if (this.enable_return_data != null) {
                        data.enable_return_data = this.enable_return_data;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.tracer === "string" && this.tracer.length)
                        writer.writeString(1, this.tracer);
                    if (typeof this.timeout === "string" && this.timeout.length)
                        writer.writeString(2, this.timeout);
                    if (this.reexec !== undefined)
                        writer.writeUint64(3, this.reexec);
                    if (this.disable_stack !== undefined)
                        writer.writeBool(5, this.disable_stack);
                    if (this.disable_storage !== undefined)
                        writer.writeBool(6, this.disable_storage);
                    if (this.debug !== undefined)
                        writer.writeBool(8, this.debug);
                    if (this.limit !== undefined)
                        writer.writeInt32(9, this.limit);
                    if (this.overrides !== undefined)
                        writer.writeMessage(10, this.overrides, () => this.overrides.serialize(writer));
                    if (this.enable_memory !== undefined)
                        writer.writeBool(11, this.enable_memory);
                    if (this.enable_return_data !== undefined)
                        writer.writeBool(12, this.enable_return_data);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TraceConfig();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.tracer = reader.readString();
                                break;
                            case 2:
                                message.timeout = reader.readString();
                                break;
                            case 3:
                                message.reexec = reader.readUint64();
                                break;
                            case 5:
                                message.disable_stack = reader.readBool();
                                break;
                            case 6:
                                message.disable_storage = reader.readBool();
                                break;
                            case 8:
                                message.debug = reader.readBool();
                                break;
                            case 9:
                                message.limit = reader.readInt32();
                                break;
                            case 10:
                                reader.readMessage(message.overrides, () => message.overrides = ChainConfig.deserialize(reader));
                                break;
                            case 11:
                                message.enable_memory = reader.readBool();
                                break;
                            case 12:
                                message.enable_return_data = reader.readBool();
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
                    return TraceConfig.deserialize(bytes);
                }
            }
            v1.TraceConfig = TraceConfig;
        })(v1 = evm.v1 || (evm.v1 = {}));
    })(evm = ethermint.evm || (ethermint.evm = {}));
})(ethermint = exports.ethermint || (exports.ethermint = {}));
//# sourceMappingURL=evm.js.map