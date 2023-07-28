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
const pb_1 = __importStar(require("google-protobuf"));
var tendermint;
(function (tendermint) {
    var crypto;
    (function (crypto) {
        class Proof extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("total" in data && data.total != undefined) {
                        this.total = data.total;
                    }
                    if ("index" in data && data.index != undefined) {
                        this.index = data.index;
                    }
                    if ("leaf_hash" in data && data.leaf_hash != undefined) {
                        this.leaf_hash = data.leaf_hash;
                    }
                    if ("aunts" in data && data.aunts != undefined) {
                        this.aunts = data.aunts;
                    }
                }
            }
            get total() {
                return pb_1.Message.getField(this, 1);
            }
            set total(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get index() {
                return pb_1.Message.getField(this, 2);
            }
            set index(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get leaf_hash() {
                return pb_1.Message.getField(this, 3);
            }
            set leaf_hash(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get aunts() {
                return pb_1.Message.getField(this, 4);
            }
            set aunts(value) {
                pb_1.Message.setField(this, 4, value);
            }
            static fromObject(data) {
                const message = new Proof({});
                if (data.total != null) {
                    message.total = data.total;
                }
                if (data.index != null) {
                    message.index = data.index;
                }
                if (data.leaf_hash != null) {
                    message.leaf_hash = data.leaf_hash;
                }
                if (data.aunts != null) {
                    message.aunts = data.aunts;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.total != null) {
                    data.total = this.total;
                }
                if (this.index != null) {
                    data.index = this.index;
                }
                if (this.leaf_hash != null) {
                    data.leaf_hash = this.leaf_hash;
                }
                if (this.aunts != null) {
                    data.aunts = this.aunts;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.total !== undefined)
                    writer.writeInt64(1, this.total);
                if (this.index !== undefined)
                    writer.writeInt64(2, this.index);
                if (this.leaf_hash !== undefined)
                    writer.writeBytes(3, this.leaf_hash);
                if (this.aunts !== undefined)
                    writer.writeRepeatedBytes(4, this.aunts);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Proof();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.total = reader.readInt64();
                            break;
                        case 2:
                            message.index = reader.readInt64();
                            break;
                        case 3:
                            message.leaf_hash = reader.readBytes();
                            break;
                        case 4:
                            pb_1.Message.addToRepeatedField(message, 4, reader.readBytes());
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
                return Proof.deserialize(bytes);
            }
        }
        crypto.Proof = Proof;
        class ValueOp extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("key" in data && data.key != undefined) {
                        this.key = data.key;
                    }
                    if ("proof" in data && data.proof != undefined) {
                        this.proof = data.proof;
                    }
                }
            }
            get key() {
                return pb_1.Message.getField(this, 1);
            }
            set key(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get proof() {
                return pb_1.Message.getWrapperField(this, Proof, 2);
            }
            set proof(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            static fromObject(data) {
                const message = new ValueOp({});
                if (data.key != null) {
                    message.key = data.key;
                }
                if (data.proof != null) {
                    message.proof = Proof.fromObject(data.proof);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.key != null) {
                    data.key = this.key;
                }
                if (this.proof != null) {
                    data.proof = this.proof.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.key !== undefined)
                    writer.writeBytes(1, this.key);
                if (this.proof !== undefined)
                    writer.writeMessage(2, this.proof, () => this.proof.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValueOp();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.key = reader.readBytes();
                            break;
                        case 2:
                            reader.readMessage(message.proof, () => message.proof = Proof.deserialize(reader));
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
                return ValueOp.deserialize(bytes);
            }
        }
        crypto.ValueOp = ValueOp;
        class DominoOp extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("key" in data && data.key != undefined) {
                        this.key = data.key;
                    }
                    if ("input" in data && data.input != undefined) {
                        this.input = data.input;
                    }
                    if ("output" in data && data.output != undefined) {
                        this.output = data.output;
                    }
                }
            }
            get key() {
                return pb_1.Message.getField(this, 1);
            }
            set key(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get input() {
                return pb_1.Message.getField(this, 2);
            }
            set input(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get output() {
                return pb_1.Message.getField(this, 3);
            }
            set output(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new DominoOp({});
                if (data.key != null) {
                    message.key = data.key;
                }
                if (data.input != null) {
                    message.input = data.input;
                }
                if (data.output != null) {
                    message.output = data.output;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.key != null) {
                    data.key = this.key;
                }
                if (this.input != null) {
                    data.input = this.input;
                }
                if (this.output != null) {
                    data.output = this.output;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.key === "string" && this.key.length)
                    writer.writeString(1, this.key);
                if (typeof this.input === "string" && this.input.length)
                    writer.writeString(2, this.input);
                if (typeof this.output === "string" && this.output.length)
                    writer.writeString(3, this.output);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DominoOp();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.key = reader.readString();
                            break;
                        case 2:
                            message.input = reader.readString();
                            break;
                        case 3:
                            message.output = reader.readString();
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
                return DominoOp.deserialize(bytes);
            }
        }
        crypto.DominoOp = DominoOp;
        class ProofOp extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("type" in data && data.type != undefined) {
                        this.type = data.type;
                    }
                    if ("key" in data && data.key != undefined) {
                        this.key = data.key;
                    }
                    if ("data" in data && data.data != undefined) {
                        this.data = data.data;
                    }
                }
            }
            get type() {
                return pb_1.Message.getField(this, 1);
            }
            set type(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get key() {
                return pb_1.Message.getField(this, 2);
            }
            set key(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get data() {
                return pb_1.Message.getField(this, 3);
            }
            set data(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new ProofOp({});
                if (data.type != null) {
                    message.type = data.type;
                }
                if (data.key != null) {
                    message.key = data.key;
                }
                if (data.data != null) {
                    message.data = data.data;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.type != null) {
                    data.type = this.type;
                }
                if (this.key != null) {
                    data.key = this.key;
                }
                if (this.data != null) {
                    data.data = this.data;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.type === "string" && this.type.length)
                    writer.writeString(1, this.type);
                if (this.key !== undefined)
                    writer.writeBytes(2, this.key);
                if (this.data !== undefined)
                    writer.writeBytes(3, this.data);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProofOp();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.type = reader.readString();
                            break;
                        case 2:
                            message.key = reader.readBytes();
                            break;
                        case 3:
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
                return ProofOp.deserialize(bytes);
            }
        }
        crypto.ProofOp = ProofOp;
        class ProofOps extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("ops" in data && data.ops != undefined) {
                        this.ops = data.ops;
                    }
                }
            }
            get ops() {
                return pb_1.Message.getRepeatedWrapperField(this, ProofOp, 1);
            }
            set ops(value) {
                pb_1.Message.setRepeatedWrapperField(this, 1, value);
            }
            static fromObject(data) {
                const message = new ProofOps({});
                if (data.ops != null) {
                    message.ops = data.ops.map(item => ProofOp.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.ops != null) {
                    data.ops = this.ops.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.ops !== undefined)
                    writer.writeRepeatedMessage(1, this.ops, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProofOps();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.ops, () => pb_1.Message.addToRepeatedWrapperField(message, 1, ProofOp.deserialize(reader), ProofOp));
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
                return ProofOps.deserialize(bytes);
            }
        }
        crypto.ProofOps = ProofOps;
    })(crypto = tendermint.crypto || (tendermint.crypto = {}));
})(tendermint = exports.tendermint || (exports.tendermint = {}));
//# sourceMappingURL=proof.js.map