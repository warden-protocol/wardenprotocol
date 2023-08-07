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
const dependency_2 = __importStar(require("./../../google/protobuf/timestamp"));
const dependency_3 = __importStar(require("./../crypto/proof"));
const dependency_4 = __importStar(require("./../version/types"));
const dependency_5 = __importStar(require("./validator"));
const pb_1 = __importStar(require("google-protobuf"));
var tendermint;
(function (tendermint) {
    var types;
    (function (types) {
        let BlockIDFlag;
        (function (BlockIDFlag) {
            BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_UNKNOWN"] = 0] = "BLOCK_ID_FLAG_UNKNOWN";
            BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_ABSENT"] = 1] = "BLOCK_ID_FLAG_ABSENT";
            BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_COMMIT"] = 2] = "BLOCK_ID_FLAG_COMMIT";
            BlockIDFlag[BlockIDFlag["BLOCK_ID_FLAG_NIL"] = 3] = "BLOCK_ID_FLAG_NIL";
        })(BlockIDFlag = types.BlockIDFlag || (types.BlockIDFlag = {}));
        let SignedMsgType;
        (function (SignedMsgType) {
            SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_UNKNOWN"] = 0] = "SIGNED_MSG_TYPE_UNKNOWN";
            SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_PREVOTE"] = 1] = "SIGNED_MSG_TYPE_PREVOTE";
            SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_PRECOMMIT"] = 2] = "SIGNED_MSG_TYPE_PRECOMMIT";
            SignedMsgType[SignedMsgType["SIGNED_MSG_TYPE_PROPOSAL"] = 32] = "SIGNED_MSG_TYPE_PROPOSAL";
        })(SignedMsgType = types.SignedMsgType || (types.SignedMsgType = {}));
        class PartSetHeader extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("total" in data && data.total != undefined) {
                        this.total = data.total;
                    }
                    if ("hash" in data && data.hash != undefined) {
                        this.hash = data.hash;
                    }
                }
            }
            get total() {
                return pb_1.Message.getField(this, 1);
            }
            set total(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get hash() {
                return pb_1.Message.getField(this, 2);
            }
            set hash(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new PartSetHeader({});
                if (data.total != null) {
                    message.total = data.total;
                }
                if (data.hash != null) {
                    message.hash = data.hash;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.total != null) {
                    data.total = this.total;
                }
                if (this.hash != null) {
                    data.hash = this.hash;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.total !== undefined)
                    writer.writeUint32(1, this.total);
                if (this.hash !== undefined)
                    writer.writeBytes(2, this.hash);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PartSetHeader();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.total = reader.readUint32();
                            break;
                        case 2:
                            message.hash = reader.readBytes();
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
                return PartSetHeader.deserialize(bytes);
            }
        }
        types.PartSetHeader = PartSetHeader;
        class Part extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("index" in data && data.index != undefined) {
                        this.index = data.index;
                    }
                    if ("bytes" in data && data.bytes != undefined) {
                        this.bytes = data.bytes;
                    }
                    if ("proof" in data && data.proof != undefined) {
                        this.proof = data.proof;
                    }
                }
            }
            get index() {
                return pb_1.Message.getField(this, 1);
            }
            set index(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get bytes() {
                return pb_1.Message.getField(this, 2);
            }
            set bytes(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get proof() {
                return pb_1.Message.getWrapperField(this, dependency_3.tendermint.crypto.Proof, 3);
            }
            set proof(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            static fromObject(data) {
                const message = new Part({});
                if (data.index != null) {
                    message.index = data.index;
                }
                if (data.bytes != null) {
                    message.bytes = data.bytes;
                }
                if (data.proof != null) {
                    message.proof = dependency_3.tendermint.crypto.Proof.fromObject(data.proof);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.index != null) {
                    data.index = this.index;
                }
                if (this.bytes != null) {
                    data.bytes = this.bytes;
                }
                if (this.proof != null) {
                    data.proof = this.proof.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.index !== undefined)
                    writer.writeUint32(1, this.index);
                if (this.bytes !== undefined)
                    writer.writeBytes(2, this.bytes);
                if (this.proof !== undefined)
                    writer.writeMessage(3, this.proof, () => this.proof.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Part();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.index = reader.readUint32();
                            break;
                        case 2:
                            message.bytes = reader.readBytes();
                            break;
                        case 3:
                            reader.readMessage(message.proof, () => message.proof = dependency_3.tendermint.crypto.Proof.deserialize(reader));
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
                return Part.deserialize(bytes);
            }
        }
        types.Part = Part;
        class BlockID extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("hash" in data && data.hash != undefined) {
                        this.hash = data.hash;
                    }
                    if ("part_set_header" in data && data.part_set_header != undefined) {
                        this.part_set_header = data.part_set_header;
                    }
                }
            }
            get hash() {
                return pb_1.Message.getField(this, 1);
            }
            set hash(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get part_set_header() {
                return pb_1.Message.getWrapperField(this, PartSetHeader, 2);
            }
            set part_set_header(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            static fromObject(data) {
                const message = new BlockID({});
                if (data.hash != null) {
                    message.hash = data.hash;
                }
                if (data.part_set_header != null) {
                    message.part_set_header = PartSetHeader.fromObject(data.part_set_header);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.hash != null) {
                    data.hash = this.hash;
                }
                if (this.part_set_header != null) {
                    data.part_set_header = this.part_set_header.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.hash !== undefined)
                    writer.writeBytes(1, this.hash);
                if (this.part_set_header !== undefined)
                    writer.writeMessage(2, this.part_set_header, () => this.part_set_header.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BlockID();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.hash = reader.readBytes();
                            break;
                        case 2:
                            reader.readMessage(message.part_set_header, () => message.part_set_header = PartSetHeader.deserialize(reader));
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
                return BlockID.deserialize(bytes);
            }
        }
        types.BlockID = BlockID;
        class Header extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("version" in data && data.version != undefined) {
                        this.version = data.version;
                    }
                    if ("chain_id" in data && data.chain_id != undefined) {
                        this.chain_id = data.chain_id;
                    }
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                    if ("time" in data && data.time != undefined) {
                        this.time = data.time;
                    }
                    if ("last_block_id" in data && data.last_block_id != undefined) {
                        this.last_block_id = data.last_block_id;
                    }
                    if ("last_commit_hash" in data && data.last_commit_hash != undefined) {
                        this.last_commit_hash = data.last_commit_hash;
                    }
                    if ("data_hash" in data && data.data_hash != undefined) {
                        this.data_hash = data.data_hash;
                    }
                    if ("validators_hash" in data && data.validators_hash != undefined) {
                        this.validators_hash = data.validators_hash;
                    }
                    if ("next_validators_hash" in data && data.next_validators_hash != undefined) {
                        this.next_validators_hash = data.next_validators_hash;
                    }
                    if ("consensus_hash" in data && data.consensus_hash != undefined) {
                        this.consensus_hash = data.consensus_hash;
                    }
                    if ("app_hash" in data && data.app_hash != undefined) {
                        this.app_hash = data.app_hash;
                    }
                    if ("last_results_hash" in data && data.last_results_hash != undefined) {
                        this.last_results_hash = data.last_results_hash;
                    }
                    if ("evidence_hash" in data && data.evidence_hash != undefined) {
                        this.evidence_hash = data.evidence_hash;
                    }
                    if ("proposer_address" in data && data.proposer_address != undefined) {
                        this.proposer_address = data.proposer_address;
                    }
                }
            }
            get version() {
                return pb_1.Message.getWrapperField(this, dependency_4.tendermint.version.Consensus, 1);
            }
            set version(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get chain_id() {
                return pb_1.Message.getField(this, 2);
            }
            set chain_id(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get height() {
                return pb_1.Message.getField(this, 3);
            }
            set height(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get time() {
                return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Timestamp, 4);
            }
            set time(value) {
                pb_1.Message.setWrapperField(this, 4, value);
            }
            get last_block_id() {
                return pb_1.Message.getWrapperField(this, BlockID, 5);
            }
            set last_block_id(value) {
                pb_1.Message.setWrapperField(this, 5, value);
            }
            get last_commit_hash() {
                return pb_1.Message.getField(this, 6);
            }
            set last_commit_hash(value) {
                pb_1.Message.setField(this, 6, value);
            }
            get data_hash() {
                return pb_1.Message.getField(this, 7);
            }
            set data_hash(value) {
                pb_1.Message.setField(this, 7, value);
            }
            get validators_hash() {
                return pb_1.Message.getField(this, 8);
            }
            set validators_hash(value) {
                pb_1.Message.setField(this, 8, value);
            }
            get next_validators_hash() {
                return pb_1.Message.getField(this, 9);
            }
            set next_validators_hash(value) {
                pb_1.Message.setField(this, 9, value);
            }
            get consensus_hash() {
                return pb_1.Message.getField(this, 10);
            }
            set consensus_hash(value) {
                pb_1.Message.setField(this, 10, value);
            }
            get app_hash() {
                return pb_1.Message.getField(this, 11);
            }
            set app_hash(value) {
                pb_1.Message.setField(this, 11, value);
            }
            get last_results_hash() {
                return pb_1.Message.getField(this, 12);
            }
            set last_results_hash(value) {
                pb_1.Message.setField(this, 12, value);
            }
            get evidence_hash() {
                return pb_1.Message.getField(this, 13);
            }
            set evidence_hash(value) {
                pb_1.Message.setField(this, 13, value);
            }
            get proposer_address() {
                return pb_1.Message.getField(this, 14);
            }
            set proposer_address(value) {
                pb_1.Message.setField(this, 14, value);
            }
            static fromObject(data) {
                const message = new Header({});
                if (data.version != null) {
                    message.version = dependency_4.tendermint.version.Consensus.fromObject(data.version);
                }
                if (data.chain_id != null) {
                    message.chain_id = data.chain_id;
                }
                if (data.height != null) {
                    message.height = data.height;
                }
                if (data.time != null) {
                    message.time = dependency_2.google.protobuf.Timestamp.fromObject(data.time);
                }
                if (data.last_block_id != null) {
                    message.last_block_id = BlockID.fromObject(data.last_block_id);
                }
                if (data.last_commit_hash != null) {
                    message.last_commit_hash = data.last_commit_hash;
                }
                if (data.data_hash != null) {
                    message.data_hash = data.data_hash;
                }
                if (data.validators_hash != null) {
                    message.validators_hash = data.validators_hash;
                }
                if (data.next_validators_hash != null) {
                    message.next_validators_hash = data.next_validators_hash;
                }
                if (data.consensus_hash != null) {
                    message.consensus_hash = data.consensus_hash;
                }
                if (data.app_hash != null) {
                    message.app_hash = data.app_hash;
                }
                if (data.last_results_hash != null) {
                    message.last_results_hash = data.last_results_hash;
                }
                if (data.evidence_hash != null) {
                    message.evidence_hash = data.evidence_hash;
                }
                if (data.proposer_address != null) {
                    message.proposer_address = data.proposer_address;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.version != null) {
                    data.version = this.version.toObject();
                }
                if (this.chain_id != null) {
                    data.chain_id = this.chain_id;
                }
                if (this.height != null) {
                    data.height = this.height;
                }
                if (this.time != null) {
                    data.time = this.time.toObject();
                }
                if (this.last_block_id != null) {
                    data.last_block_id = this.last_block_id.toObject();
                }
                if (this.last_commit_hash != null) {
                    data.last_commit_hash = this.last_commit_hash;
                }
                if (this.data_hash != null) {
                    data.data_hash = this.data_hash;
                }
                if (this.validators_hash != null) {
                    data.validators_hash = this.validators_hash;
                }
                if (this.next_validators_hash != null) {
                    data.next_validators_hash = this.next_validators_hash;
                }
                if (this.consensus_hash != null) {
                    data.consensus_hash = this.consensus_hash;
                }
                if (this.app_hash != null) {
                    data.app_hash = this.app_hash;
                }
                if (this.last_results_hash != null) {
                    data.last_results_hash = this.last_results_hash;
                }
                if (this.evidence_hash != null) {
                    data.evidence_hash = this.evidence_hash;
                }
                if (this.proposer_address != null) {
                    data.proposer_address = this.proposer_address;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.version !== undefined)
                    writer.writeMessage(1, this.version, () => this.version.serialize(writer));
                if (typeof this.chain_id === "string" && this.chain_id.length)
                    writer.writeString(2, this.chain_id);
                if (this.height !== undefined)
                    writer.writeInt64(3, this.height);
                if (this.time !== undefined)
                    writer.writeMessage(4, this.time, () => this.time.serialize(writer));
                if (this.last_block_id !== undefined)
                    writer.writeMessage(5, this.last_block_id, () => this.last_block_id.serialize(writer));
                if (this.last_commit_hash !== undefined)
                    writer.writeBytes(6, this.last_commit_hash);
                if (this.data_hash !== undefined)
                    writer.writeBytes(7, this.data_hash);
                if (this.validators_hash !== undefined)
                    writer.writeBytes(8, this.validators_hash);
                if (this.next_validators_hash !== undefined)
                    writer.writeBytes(9, this.next_validators_hash);
                if (this.consensus_hash !== undefined)
                    writer.writeBytes(10, this.consensus_hash);
                if (this.app_hash !== undefined)
                    writer.writeBytes(11, this.app_hash);
                if (this.last_results_hash !== undefined)
                    writer.writeBytes(12, this.last_results_hash);
                if (this.evidence_hash !== undefined)
                    writer.writeBytes(13, this.evidence_hash);
                if (this.proposer_address !== undefined)
                    writer.writeBytes(14, this.proposer_address);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Header();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.version, () => message.version = dependency_4.tendermint.version.Consensus.deserialize(reader));
                            break;
                        case 2:
                            message.chain_id = reader.readString();
                            break;
                        case 3:
                            message.height = reader.readInt64();
                            break;
                        case 4:
                            reader.readMessage(message.time, () => message.time = dependency_2.google.protobuf.Timestamp.deserialize(reader));
                            break;
                        case 5:
                            reader.readMessage(message.last_block_id, () => message.last_block_id = BlockID.deserialize(reader));
                            break;
                        case 6:
                            message.last_commit_hash = reader.readBytes();
                            break;
                        case 7:
                            message.data_hash = reader.readBytes();
                            break;
                        case 8:
                            message.validators_hash = reader.readBytes();
                            break;
                        case 9:
                            message.next_validators_hash = reader.readBytes();
                            break;
                        case 10:
                            message.consensus_hash = reader.readBytes();
                            break;
                        case 11:
                            message.app_hash = reader.readBytes();
                            break;
                        case 12:
                            message.last_results_hash = reader.readBytes();
                            break;
                        case 13:
                            message.evidence_hash = reader.readBytes();
                            break;
                        case 14:
                            message.proposer_address = reader.readBytes();
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
                return Header.deserialize(bytes);
            }
        }
        types.Header = Header;
        class Data extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("txs" in data && data.txs != undefined) {
                        this.txs = data.txs;
                    }
                }
            }
            get txs() {
                return pb_1.Message.getField(this, 1);
            }
            set txs(value) {
                pb_1.Message.setField(this, 1, value);
            }
            static fromObject(data) {
                const message = new Data({});
                if (data.txs != null) {
                    message.txs = data.txs;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.txs != null) {
                    data.txs = this.txs;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.txs !== undefined)
                    writer.writeRepeatedBytes(1, this.txs);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Data();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            pb_1.Message.addToRepeatedField(message, 1, reader.readBytes());
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
                return Data.deserialize(bytes);
            }
        }
        types.Data = Data;
        class Vote extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("type" in data && data.type != undefined) {
                        this.type = data.type;
                    }
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                    if ("round" in data && data.round != undefined) {
                        this.round = data.round;
                    }
                    if ("block_id" in data && data.block_id != undefined) {
                        this.block_id = data.block_id;
                    }
                    if ("timestamp" in data && data.timestamp != undefined) {
                        this.timestamp = data.timestamp;
                    }
                    if ("validator_address" in data && data.validator_address != undefined) {
                        this.validator_address = data.validator_address;
                    }
                    if ("validator_index" in data && data.validator_index != undefined) {
                        this.validator_index = data.validator_index;
                    }
                    if ("signature" in data && data.signature != undefined) {
                        this.signature = data.signature;
                    }
                }
            }
            get type() {
                return pb_1.Message.getField(this, 1);
            }
            set type(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get height() {
                return pb_1.Message.getField(this, 2);
            }
            set height(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get round() {
                return pb_1.Message.getField(this, 3);
            }
            set round(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get block_id() {
                return pb_1.Message.getWrapperField(this, BlockID, 4);
            }
            set block_id(value) {
                pb_1.Message.setWrapperField(this, 4, value);
            }
            get timestamp() {
                return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Timestamp, 5);
            }
            set timestamp(value) {
                pb_1.Message.setWrapperField(this, 5, value);
            }
            get validator_address() {
                return pb_1.Message.getField(this, 6);
            }
            set validator_address(value) {
                pb_1.Message.setField(this, 6, value);
            }
            get validator_index() {
                return pb_1.Message.getField(this, 7);
            }
            set validator_index(value) {
                pb_1.Message.setField(this, 7, value);
            }
            get signature() {
                return pb_1.Message.getField(this, 8);
            }
            set signature(value) {
                pb_1.Message.setField(this, 8, value);
            }
            static fromObject(data) {
                const message = new Vote({});
                if (data.type != null) {
                    message.type = data.type;
                }
                if (data.height != null) {
                    message.height = data.height;
                }
                if (data.round != null) {
                    message.round = data.round;
                }
                if (data.block_id != null) {
                    message.block_id = BlockID.fromObject(data.block_id);
                }
                if (data.timestamp != null) {
                    message.timestamp = dependency_2.google.protobuf.Timestamp.fromObject(data.timestamp);
                }
                if (data.validator_address != null) {
                    message.validator_address = data.validator_address;
                }
                if (data.validator_index != null) {
                    message.validator_index = data.validator_index;
                }
                if (data.signature != null) {
                    message.signature = data.signature;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.type != null) {
                    data.type = this.type;
                }
                if (this.height != null) {
                    data.height = this.height;
                }
                if (this.round != null) {
                    data.round = this.round;
                }
                if (this.block_id != null) {
                    data.block_id = this.block_id.toObject();
                }
                if (this.timestamp != null) {
                    data.timestamp = this.timestamp.toObject();
                }
                if (this.validator_address != null) {
                    data.validator_address = this.validator_address;
                }
                if (this.validator_index != null) {
                    data.validator_index = this.validator_index;
                }
                if (this.signature != null) {
                    data.signature = this.signature;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.type !== undefined)
                    writer.writeEnum(1, this.type);
                if (this.height !== undefined)
                    writer.writeInt64(2, this.height);
                if (this.round !== undefined)
                    writer.writeInt32(3, this.round);
                if (this.block_id !== undefined)
                    writer.writeMessage(4, this.block_id, () => this.block_id.serialize(writer));
                if (this.timestamp !== undefined)
                    writer.writeMessage(5, this.timestamp, () => this.timestamp.serialize(writer));
                if (this.validator_address !== undefined)
                    writer.writeBytes(6, this.validator_address);
                if (this.validator_index !== undefined)
                    writer.writeInt32(7, this.validator_index);
                if (this.signature !== undefined)
                    writer.writeBytes(8, this.signature);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Vote();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.type = reader.readEnum();
                            break;
                        case 2:
                            message.height = reader.readInt64();
                            break;
                        case 3:
                            message.round = reader.readInt32();
                            break;
                        case 4:
                            reader.readMessage(message.block_id, () => message.block_id = BlockID.deserialize(reader));
                            break;
                        case 5:
                            reader.readMessage(message.timestamp, () => message.timestamp = dependency_2.google.protobuf.Timestamp.deserialize(reader));
                            break;
                        case 6:
                            message.validator_address = reader.readBytes();
                            break;
                        case 7:
                            message.validator_index = reader.readInt32();
                            break;
                        case 8:
                            message.signature = reader.readBytes();
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
                return Vote.deserialize(bytes);
            }
        }
        types.Vote = Vote;
        class Commit extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                    if ("round" in data && data.round != undefined) {
                        this.round = data.round;
                    }
                    if ("block_id" in data && data.block_id != undefined) {
                        this.block_id = data.block_id;
                    }
                    if ("signatures" in data && data.signatures != undefined) {
                        this.signatures = data.signatures;
                    }
                }
            }
            get height() {
                return pb_1.Message.getField(this, 1);
            }
            set height(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get round() {
                return pb_1.Message.getField(this, 2);
            }
            set round(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get block_id() {
                return pb_1.Message.getWrapperField(this, BlockID, 3);
            }
            set block_id(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            get signatures() {
                return pb_1.Message.getRepeatedWrapperField(this, CommitSig, 4);
            }
            set signatures(value) {
                pb_1.Message.setRepeatedWrapperField(this, 4, value);
            }
            static fromObject(data) {
                const message = new Commit({});
                if (data.height != null) {
                    message.height = data.height;
                }
                if (data.round != null) {
                    message.round = data.round;
                }
                if (data.block_id != null) {
                    message.block_id = BlockID.fromObject(data.block_id);
                }
                if (data.signatures != null) {
                    message.signatures = data.signatures.map(item => CommitSig.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.height != null) {
                    data.height = this.height;
                }
                if (this.round != null) {
                    data.round = this.round;
                }
                if (this.block_id != null) {
                    data.block_id = this.block_id.toObject();
                }
                if (this.signatures != null) {
                    data.signatures = this.signatures.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.height !== undefined)
                    writer.writeInt64(1, this.height);
                if (this.round !== undefined)
                    writer.writeInt32(2, this.round);
                if (this.block_id !== undefined)
                    writer.writeMessage(3, this.block_id, () => this.block_id.serialize(writer));
                if (this.signatures !== undefined)
                    writer.writeRepeatedMessage(4, this.signatures, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Commit();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.height = reader.readInt64();
                            break;
                        case 2:
                            message.round = reader.readInt32();
                            break;
                        case 3:
                            reader.readMessage(message.block_id, () => message.block_id = BlockID.deserialize(reader));
                            break;
                        case 4:
                            reader.readMessage(message.signatures, () => pb_1.Message.addToRepeatedWrapperField(message, 4, CommitSig.deserialize(reader), CommitSig));
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
                return Commit.deserialize(bytes);
            }
        }
        types.Commit = Commit;
        class CommitSig extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("block_id_flag" in data && data.block_id_flag != undefined) {
                        this.block_id_flag = data.block_id_flag;
                    }
                    if ("validator_address" in data && data.validator_address != undefined) {
                        this.validator_address = data.validator_address;
                    }
                    if ("timestamp" in data && data.timestamp != undefined) {
                        this.timestamp = data.timestamp;
                    }
                    if ("signature" in data && data.signature != undefined) {
                        this.signature = data.signature;
                    }
                }
            }
            get block_id_flag() {
                return pb_1.Message.getField(this, 1);
            }
            set block_id_flag(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get validator_address() {
                return pb_1.Message.getField(this, 2);
            }
            set validator_address(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get timestamp() {
                return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Timestamp, 3);
            }
            set timestamp(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            get signature() {
                return pb_1.Message.getField(this, 4);
            }
            set signature(value) {
                pb_1.Message.setField(this, 4, value);
            }
            static fromObject(data) {
                const message = new CommitSig({});
                if (data.block_id_flag != null) {
                    message.block_id_flag = data.block_id_flag;
                }
                if (data.validator_address != null) {
                    message.validator_address = data.validator_address;
                }
                if (data.timestamp != null) {
                    message.timestamp = dependency_2.google.protobuf.Timestamp.fromObject(data.timestamp);
                }
                if (data.signature != null) {
                    message.signature = data.signature;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.block_id_flag != null) {
                    data.block_id_flag = this.block_id_flag;
                }
                if (this.validator_address != null) {
                    data.validator_address = this.validator_address;
                }
                if (this.timestamp != null) {
                    data.timestamp = this.timestamp.toObject();
                }
                if (this.signature != null) {
                    data.signature = this.signature;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.block_id_flag !== undefined)
                    writer.writeEnum(1, this.block_id_flag);
                if (this.validator_address !== undefined)
                    writer.writeBytes(2, this.validator_address);
                if (this.timestamp !== undefined)
                    writer.writeMessage(3, this.timestamp, () => this.timestamp.serialize(writer));
                if (this.signature !== undefined)
                    writer.writeBytes(4, this.signature);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CommitSig();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.block_id_flag = reader.readEnum();
                            break;
                        case 2:
                            message.validator_address = reader.readBytes();
                            break;
                        case 3:
                            reader.readMessage(message.timestamp, () => message.timestamp = dependency_2.google.protobuf.Timestamp.deserialize(reader));
                            break;
                        case 4:
                            message.signature = reader.readBytes();
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
                return CommitSig.deserialize(bytes);
            }
        }
        types.CommitSig = CommitSig;
        class Proposal extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("type" in data && data.type != undefined) {
                        this.type = data.type;
                    }
                    if ("height" in data && data.height != undefined) {
                        this.height = data.height;
                    }
                    if ("round" in data && data.round != undefined) {
                        this.round = data.round;
                    }
                    if ("pol_round" in data && data.pol_round != undefined) {
                        this.pol_round = data.pol_round;
                    }
                    if ("block_id" in data && data.block_id != undefined) {
                        this.block_id = data.block_id;
                    }
                    if ("timestamp" in data && data.timestamp != undefined) {
                        this.timestamp = data.timestamp;
                    }
                    if ("signature" in data && data.signature != undefined) {
                        this.signature = data.signature;
                    }
                }
            }
            get type() {
                return pb_1.Message.getField(this, 1);
            }
            set type(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get height() {
                return pb_1.Message.getField(this, 2);
            }
            set height(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get round() {
                return pb_1.Message.getField(this, 3);
            }
            set round(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get pol_round() {
                return pb_1.Message.getField(this, 4);
            }
            set pol_round(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get block_id() {
                return pb_1.Message.getWrapperField(this, BlockID, 5);
            }
            set block_id(value) {
                pb_1.Message.setWrapperField(this, 5, value);
            }
            get timestamp() {
                return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Timestamp, 6);
            }
            set timestamp(value) {
                pb_1.Message.setWrapperField(this, 6, value);
            }
            get signature() {
                return pb_1.Message.getField(this, 7);
            }
            set signature(value) {
                pb_1.Message.setField(this, 7, value);
            }
            static fromObject(data) {
                const message = new Proposal({});
                if (data.type != null) {
                    message.type = data.type;
                }
                if (data.height != null) {
                    message.height = data.height;
                }
                if (data.round != null) {
                    message.round = data.round;
                }
                if (data.pol_round != null) {
                    message.pol_round = data.pol_round;
                }
                if (data.block_id != null) {
                    message.block_id = BlockID.fromObject(data.block_id);
                }
                if (data.timestamp != null) {
                    message.timestamp = dependency_2.google.protobuf.Timestamp.fromObject(data.timestamp);
                }
                if (data.signature != null) {
                    message.signature = data.signature;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.type != null) {
                    data.type = this.type;
                }
                if (this.height != null) {
                    data.height = this.height;
                }
                if (this.round != null) {
                    data.round = this.round;
                }
                if (this.pol_round != null) {
                    data.pol_round = this.pol_round;
                }
                if (this.block_id != null) {
                    data.block_id = this.block_id.toObject();
                }
                if (this.timestamp != null) {
                    data.timestamp = this.timestamp.toObject();
                }
                if (this.signature != null) {
                    data.signature = this.signature;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.type !== undefined)
                    writer.writeEnum(1, this.type);
                if (this.height !== undefined)
                    writer.writeInt64(2, this.height);
                if (this.round !== undefined)
                    writer.writeInt32(3, this.round);
                if (this.pol_round !== undefined)
                    writer.writeInt32(4, this.pol_round);
                if (this.block_id !== undefined)
                    writer.writeMessage(5, this.block_id, () => this.block_id.serialize(writer));
                if (this.timestamp !== undefined)
                    writer.writeMessage(6, this.timestamp, () => this.timestamp.serialize(writer));
                if (this.signature !== undefined)
                    writer.writeBytes(7, this.signature);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Proposal();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.type = reader.readEnum();
                            break;
                        case 2:
                            message.height = reader.readInt64();
                            break;
                        case 3:
                            message.round = reader.readInt32();
                            break;
                        case 4:
                            message.pol_round = reader.readInt32();
                            break;
                        case 5:
                            reader.readMessage(message.block_id, () => message.block_id = BlockID.deserialize(reader));
                            break;
                        case 6:
                            reader.readMessage(message.timestamp, () => message.timestamp = dependency_2.google.protobuf.Timestamp.deserialize(reader));
                            break;
                        case 7:
                            message.signature = reader.readBytes();
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
                return Proposal.deserialize(bytes);
            }
        }
        types.Proposal = Proposal;
        class SignedHeader extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("header" in data && data.header != undefined) {
                        this.header = data.header;
                    }
                    if ("commit" in data && data.commit != undefined) {
                        this.commit = data.commit;
                    }
                }
            }
            get header() {
                return pb_1.Message.getWrapperField(this, Header, 1);
            }
            set header(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get commit() {
                return pb_1.Message.getWrapperField(this, Commit, 2);
            }
            set commit(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            static fromObject(data) {
                const message = new SignedHeader({});
                if (data.header != null) {
                    message.header = Header.fromObject(data.header);
                }
                if (data.commit != null) {
                    message.commit = Commit.fromObject(data.commit);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.header != null) {
                    data.header = this.header.toObject();
                }
                if (this.commit != null) {
                    data.commit = this.commit.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.header !== undefined)
                    writer.writeMessage(1, this.header, () => this.header.serialize(writer));
                if (this.commit !== undefined)
                    writer.writeMessage(2, this.commit, () => this.commit.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SignedHeader();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.header, () => message.header = Header.deserialize(reader));
                            break;
                        case 2:
                            reader.readMessage(message.commit, () => message.commit = Commit.deserialize(reader));
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
                return SignedHeader.deserialize(bytes);
            }
        }
        types.SignedHeader = SignedHeader;
        class LightBlock extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("signed_header" in data && data.signed_header != undefined) {
                        this.signed_header = data.signed_header;
                    }
                    if ("validator_set" in data && data.validator_set != undefined) {
                        this.validator_set = data.validator_set;
                    }
                }
            }
            get signed_header() {
                return pb_1.Message.getWrapperField(this, SignedHeader, 1);
            }
            set signed_header(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get validator_set() {
                return pb_1.Message.getWrapperField(this, dependency_5.tendermint.types.ValidatorSet, 2);
            }
            set validator_set(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            static fromObject(data) {
                const message = new LightBlock({});
                if (data.signed_header != null) {
                    message.signed_header = SignedHeader.fromObject(data.signed_header);
                }
                if (data.validator_set != null) {
                    message.validator_set = dependency_5.tendermint.types.ValidatorSet.fromObject(data.validator_set);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.signed_header != null) {
                    data.signed_header = this.signed_header.toObject();
                }
                if (this.validator_set != null) {
                    data.validator_set = this.validator_set.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.signed_header !== undefined)
                    writer.writeMessage(1, this.signed_header, () => this.signed_header.serialize(writer));
                if (this.validator_set !== undefined)
                    writer.writeMessage(2, this.validator_set, () => this.validator_set.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LightBlock();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.signed_header, () => message.signed_header = SignedHeader.deserialize(reader));
                            break;
                        case 2:
                            reader.readMessage(message.validator_set, () => message.validator_set = dependency_5.tendermint.types.ValidatorSet.deserialize(reader));
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
                return LightBlock.deserialize(bytes);
            }
        }
        types.LightBlock = LightBlock;
        class BlockMeta extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("block_id" in data && data.block_id != undefined) {
                        this.block_id = data.block_id;
                    }
                    if ("block_size" in data && data.block_size != undefined) {
                        this.block_size = data.block_size;
                    }
                    if ("header" in data && data.header != undefined) {
                        this.header = data.header;
                    }
                    if ("num_txs" in data && data.num_txs != undefined) {
                        this.num_txs = data.num_txs;
                    }
                }
            }
            get block_id() {
                return pb_1.Message.getWrapperField(this, BlockID, 1);
            }
            set block_id(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get block_size() {
                return pb_1.Message.getField(this, 2);
            }
            set block_size(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get header() {
                return pb_1.Message.getWrapperField(this, Header, 3);
            }
            set header(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            get num_txs() {
                return pb_1.Message.getField(this, 4);
            }
            set num_txs(value) {
                pb_1.Message.setField(this, 4, value);
            }
            static fromObject(data) {
                const message = new BlockMeta({});
                if (data.block_id != null) {
                    message.block_id = BlockID.fromObject(data.block_id);
                }
                if (data.block_size != null) {
                    message.block_size = data.block_size;
                }
                if (data.header != null) {
                    message.header = Header.fromObject(data.header);
                }
                if (data.num_txs != null) {
                    message.num_txs = data.num_txs;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.block_id != null) {
                    data.block_id = this.block_id.toObject();
                }
                if (this.block_size != null) {
                    data.block_size = this.block_size;
                }
                if (this.header != null) {
                    data.header = this.header.toObject();
                }
                if (this.num_txs != null) {
                    data.num_txs = this.num_txs;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.block_id !== undefined)
                    writer.writeMessage(1, this.block_id, () => this.block_id.serialize(writer));
                if (this.block_size !== undefined)
                    writer.writeInt64(2, this.block_size);
                if (this.header !== undefined)
                    writer.writeMessage(3, this.header, () => this.header.serialize(writer));
                if (this.num_txs !== undefined)
                    writer.writeInt64(4, this.num_txs);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BlockMeta();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.block_id, () => message.block_id = BlockID.deserialize(reader));
                            break;
                        case 2:
                            message.block_size = reader.readInt64();
                            break;
                        case 3:
                            reader.readMessage(message.header, () => message.header = Header.deserialize(reader));
                            break;
                        case 4:
                            message.num_txs = reader.readInt64();
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
                return BlockMeta.deserialize(bytes);
            }
        }
        types.BlockMeta = BlockMeta;
        class TxProof extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("root_hash" in data && data.root_hash != undefined) {
                        this.root_hash = data.root_hash;
                    }
                    if ("data" in data && data.data != undefined) {
                        this.data = data.data;
                    }
                    if ("proof" in data && data.proof != undefined) {
                        this.proof = data.proof;
                    }
                }
            }
            get root_hash() {
                return pb_1.Message.getField(this, 1);
            }
            set root_hash(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get data() {
                return pb_1.Message.getField(this, 2);
            }
            set data(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get proof() {
                return pb_1.Message.getWrapperField(this, dependency_3.tendermint.crypto.Proof, 3);
            }
            set proof(value) {
                pb_1.Message.setWrapperField(this, 3, value);
            }
            static fromObject(data) {
                const message = new TxProof({});
                if (data.root_hash != null) {
                    message.root_hash = data.root_hash;
                }
                if (data.data != null) {
                    message.data = data.data;
                }
                if (data.proof != null) {
                    message.proof = dependency_3.tendermint.crypto.Proof.fromObject(data.proof);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.root_hash != null) {
                    data.root_hash = this.root_hash;
                }
                if (this.data != null) {
                    data.data = this.data;
                }
                if (this.proof != null) {
                    data.proof = this.proof.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.root_hash !== undefined)
                    writer.writeBytes(1, this.root_hash);
                if (this.data !== undefined)
                    writer.writeBytes(2, this.data);
                if (this.proof !== undefined)
                    writer.writeMessage(3, this.proof, () => this.proof.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TxProof();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.root_hash = reader.readBytes();
                            break;
                        case 2:
                            message.data = reader.readBytes();
                            break;
                        case 3:
                            reader.readMessage(message.proof, () => message.proof = dependency_3.tendermint.crypto.Proof.deserialize(reader));
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
                return TxProof.deserialize(bytes);
            }
        }
        types.TxProof = TxProof;
    })(types = tendermint.types || (tendermint.types = {}));
})(tendermint = exports.tendermint || (exports.tendermint = {}));
//# sourceMappingURL=types.js.map