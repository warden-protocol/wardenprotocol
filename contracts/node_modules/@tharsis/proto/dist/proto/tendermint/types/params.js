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
exports.tendermint = void 0;
const dependency_2 = __importStar(require("./../../google/protobuf/duration"));
const pb_1 = __importStar(require("google-protobuf"));
var tendermint;
(function (tendermint) {
    var types;
    (function (types) {
        class ConsensusParams extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("block" in data && data.block != undefined) {
                        this.block = data.block;
                    }
                    if ("evidence" in data && data.evidence != undefined) {
                        this.evidence = data.evidence;
                    }
                    if ("validator" in data && data.validator != undefined) {
                        this.validator = data.validator;
                    }
                    if ("version" in data && data.version != undefined) {
                        this.version = data.version;
                    }
                }
            }
            get block() {
                return pb_1.Message.getWrapperField(this, BlockParams, 1);
            }
            set block(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get evidence() {
                return pb_1.Message.getWrapperField(this, EvidenceParams, 2);
            }
            set evidence(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            get validator() {
                return pb_1.Message.getWrapperField(this, ValidatorParams, 3);
            }
            set validator(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            get version() {
                return pb_1.Message.getWrapperField(this, VersionParams, 4);
            }
            set version(value) {
                pb_1.Message.setWrapperField(this, 4, value);
            }
            static fromObject(data) {
                const message = new ConsensusParams({});
                if (data.block != null) {
                    message.block = BlockParams.fromObject(data.block);
                }
                if (data.evidence != null) {
                    message.evidence = EvidenceParams.fromObject(data.evidence);
                }
                if (data.validator != null) {
                    message.validator = ValidatorParams.fromObject(data.validator);
                }
                if (data.version != null) {
                    message.version = VersionParams.fromObject(data.version);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.block != null) {
                    data.block = this.block.toObject();
                }
                if (this.evidence != null) {
                    data.evidence = this.evidence.toObject();
                }
                if (this.validator != null) {
                    data.validator = this.validator.toObject();
                }
                if (this.version != null) {
                    data.version = this.version.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.block !== undefined)
                    writer.writeMessage(1, this.block, () => this.block.serialize(writer));
                if (this.evidence !== undefined)
                    writer.writeMessage(2, this.evidence, () => this.evidence.serialize(writer));
                if (this.validator !== undefined)
                    writer.writeMessage(3, this.validator, () => this.validator.serialize(writer));
                if (this.version !== undefined)
                    writer.writeMessage(4, this.version, () => this.version.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ConsensusParams();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.block, () => message.block = BlockParams.deserialize(reader));
                            break;
                        case 2:
                            reader.readMessage(message.evidence, () => message.evidence = EvidenceParams.deserialize(reader));
                            break;
                        case 3:
                            reader.readMessage(message.validator, () => message.validator = ValidatorParams.deserialize(reader));
                            break;
                        case 4:
                            reader.readMessage(message.version, () => message.version = VersionParams.deserialize(reader));
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
                return ConsensusParams.deserialize(bytes);
            }
        }
        types.ConsensusParams = ConsensusParams;
        class BlockParams extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("max_bytes" in data && data.max_bytes != undefined) {
                        this.max_bytes = data.max_bytes;
                    }
                    if ("max_gas" in data && data.max_gas != undefined) {
                        this.max_gas = data.max_gas;
                    }
                    if ("time_iota_ms" in data && data.time_iota_ms != undefined) {
                        this.time_iota_ms = data.time_iota_ms;
                    }
                }
            }
            get max_bytes() {
                return pb_1.Message.getField(this, 1);
            }
            set max_bytes(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get max_gas() {
                return pb_1.Message.getField(this, 2);
            }
            set max_gas(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get time_iota_ms() {
                return pb_1.Message.getField(this, 3);
            }
            set time_iota_ms(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new BlockParams({});
                if (data.max_bytes != null) {
                    message.max_bytes = data.max_bytes;
                }
                if (data.max_gas != null) {
                    message.max_gas = data.max_gas;
                }
                if (data.time_iota_ms != null) {
                    message.time_iota_ms = data.time_iota_ms;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.max_bytes != null) {
                    data.max_bytes = this.max_bytes;
                }
                if (this.max_gas != null) {
                    data.max_gas = this.max_gas;
                }
                if (this.time_iota_ms != null) {
                    data.time_iota_ms = this.time_iota_ms;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.max_bytes !== undefined)
                    writer.writeInt64(1, this.max_bytes);
                if (this.max_gas !== undefined)
                    writer.writeInt64(2, this.max_gas);
                if (this.time_iota_ms !== undefined)
                    writer.writeInt64(3, this.time_iota_ms);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BlockParams();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.max_bytes = reader.readInt64();
                            break;
                        case 2:
                            message.max_gas = reader.readInt64();
                            break;
                        case 3:
                            message.time_iota_ms = reader.readInt64();
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
                return BlockParams.deserialize(bytes);
            }
        }
        types.BlockParams = BlockParams;
        class EvidenceParams extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("max_age_num_blocks" in data && data.max_age_num_blocks != undefined) {
                        this.max_age_num_blocks = data.max_age_num_blocks;
                    }
                    if ("max_age_duration" in data && data.max_age_duration != undefined) {
                        this.max_age_duration = data.max_age_duration;
                    }
                    if ("max_bytes" in data && data.max_bytes != undefined) {
                        this.max_bytes = data.max_bytes;
                    }
                }
            }
            get max_age_num_blocks() {
                return pb_1.Message.getField(this, 1);
            }
            set max_age_num_blocks(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get max_age_duration() {
                return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Duration, 2);
            }
            set max_age_duration(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            get max_bytes() {
                return pb_1.Message.getField(this, 3);
            }
            set max_bytes(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new EvidenceParams({});
                if (data.max_age_num_blocks != null) {
                    message.max_age_num_blocks = data.max_age_num_blocks;
                }
                if (data.max_age_duration != null) {
                    message.max_age_duration = dependency_2.google.protobuf.Duration.fromObject(data.max_age_duration);
                }
                if (data.max_bytes != null) {
                    message.max_bytes = data.max_bytes;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.max_age_num_blocks != null) {
                    data.max_age_num_blocks = this.max_age_num_blocks;
                }
                if (this.max_age_duration != null) {
                    data.max_age_duration = this.max_age_duration.toObject();
                }
                if (this.max_bytes != null) {
                    data.max_bytes = this.max_bytes;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.max_age_num_blocks !== undefined)
                    writer.writeInt64(1, this.max_age_num_blocks);
                if (this.max_age_duration !== undefined)
                    writer.writeMessage(2, this.max_age_duration, () => this.max_age_duration.serialize(writer));
                if (this.max_bytes !== undefined)
                    writer.writeInt64(3, this.max_bytes);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EvidenceParams();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.max_age_num_blocks = reader.readInt64();
                            break;
                        case 2:
                            reader.readMessage(message.max_age_duration, () => message.max_age_duration = dependency_2.google.protobuf.Duration.deserialize(reader));
                            break;
                        case 3:
                            message.max_bytes = reader.readInt64();
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
                return EvidenceParams.deserialize(bytes);
            }
        }
        types.EvidenceParams = EvidenceParams;
        class ValidatorParams extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("pub_key_types" in data && data.pub_key_types != undefined) {
                        this.pub_key_types = data.pub_key_types;
                    }
                }
            }
            get pub_key_types() {
                return pb_1.Message.getField(this, 1);
            }
            set pub_key_types(value) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data) {
                const message = new ValidatorParams({});
                if (data.pub_key_types != null) {
                    message.pub_key_types = data.pub_key_types;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.pub_key_types != null) {
                    data.pub_key_types = this.pub_key_types;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.pub_key_types !== undefined)
                    writer.writeRepeatedString(1, this.pub_key_types);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorParams();
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
                return ValidatorParams.deserialize(bytes);
            }
        }
        types.ValidatorParams = ValidatorParams;
        class VersionParams extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("app_version" in data && data.app_version != undefined) {
                        this.app_version = data.app_version;
                    }
                }
            }
            get app_version() {
                return pb_1.Message.getField(this, 1);
            }
            set app_version(value) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data) {
                const message = new VersionParams({});
                if (data.app_version != null) {
                    message.app_version = data.app_version;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.app_version != null) {
                    data.app_version = this.app_version;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.app_version !== undefined)
                    writer.writeUint64(1, this.app_version);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new VersionParams();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.app_version = reader.readUint64();
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
                return VersionParams.deserialize(bytes);
            }
        }
        types.VersionParams = VersionParams;
        class HashedParams extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("block_max_bytes" in data && data.block_max_bytes != undefined) {
                        this.block_max_bytes = data.block_max_bytes;
                    }
                    if ("block_max_gas" in data && data.block_max_gas != undefined) {
                        this.block_max_gas = data.block_max_gas;
                    }
                }
            }
            get block_max_bytes() {
                return pb_1.Message.getField(this, 1);
            }
            set block_max_bytes(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get block_max_gas() {
                return pb_1.Message.getField(this, 2);
            }
            set block_max_gas(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new HashedParams({});
                if (data.block_max_bytes != null) {
                    message.block_max_bytes = data.block_max_bytes;
                }
                if (data.block_max_gas != null) {
                    message.block_max_gas = data.block_max_gas;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.block_max_bytes != null) {
                    data.block_max_bytes = this.block_max_bytes;
                }
                if (this.block_max_gas != null) {
                    data.block_max_gas = this.block_max_gas;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.block_max_bytes !== undefined)
                    writer.writeInt64(1, this.block_max_bytes);
                if (this.block_max_gas !== undefined)
                    writer.writeInt64(2, this.block_max_gas);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new HashedParams();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.block_max_bytes = reader.readInt64();
                            break;
                        case 2:
                            message.block_max_gas = reader.readInt64();
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
                return HashedParams.deserialize(bytes);
            }
        }
        types.HashedParams = HashedParams;
    })(types = tendermint.types || (tendermint.types = {}));
})(tendermint = exports.tendermint || (exports.tendermint = {}));
//# sourceMappingURL=params.js.map