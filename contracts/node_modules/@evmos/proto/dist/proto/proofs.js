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
exports.ics23 = void 0;
const pb_1 = __importStar(require("google-protobuf"));
var ics23;
(function (ics23) {
    let HashOp;
    (function (HashOp) {
        HashOp[HashOp["NO_HASH"] = 0] = "NO_HASH";
        HashOp[HashOp["SHA256"] = 1] = "SHA256";
        HashOp[HashOp["SHA512"] = 2] = "SHA512";
        HashOp[HashOp["KECCAK"] = 3] = "KECCAK";
        HashOp[HashOp["RIPEMD160"] = 4] = "RIPEMD160";
        HashOp[HashOp["BITCOIN"] = 5] = "BITCOIN";
    })(HashOp = ics23.HashOp || (ics23.HashOp = {}));
    let LengthOp;
    (function (LengthOp) {
        LengthOp[LengthOp["NO_PREFIX"] = 0] = "NO_PREFIX";
        LengthOp[LengthOp["VAR_PROTO"] = 1] = "VAR_PROTO";
        LengthOp[LengthOp["VAR_RLP"] = 2] = "VAR_RLP";
        LengthOp[LengthOp["FIXED32_BIG"] = 3] = "FIXED32_BIG";
        LengthOp[LengthOp["FIXED32_LITTLE"] = 4] = "FIXED32_LITTLE";
        LengthOp[LengthOp["FIXED64_BIG"] = 5] = "FIXED64_BIG";
        LengthOp[LengthOp["FIXED64_LITTLE"] = 6] = "FIXED64_LITTLE";
        LengthOp[LengthOp["REQUIRE_32_BYTES"] = 7] = "REQUIRE_32_BYTES";
        LengthOp[LengthOp["REQUIRE_64_BYTES"] = 8] = "REQUIRE_64_BYTES";
    })(LengthOp = ics23.LengthOp || (ics23.LengthOp = {}));
    class ExistenceProof extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("key" in data && data.key != undefined) {
                    this.key = data.key;
                }
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
                if ("leaf" in data && data.leaf != undefined) {
                    this.leaf = data.leaf;
                }
                if ("path" in data && data.path != undefined) {
                    this.path = data.path;
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
        get leaf() {
            return pb_1.Message.getWrapperField(this, LeafOp, 3);
        }
        set leaf(value) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get path() {
            return pb_1.Message.getRepeatedWrapperField(this, InnerOp, 4);
        }
        set path(value) {
            pb_1.Message.setRepeatedWrapperField(this, 4, value);
        }
        static fromObject(data) {
            const message = new ExistenceProof({});
            if (data.key != null) {
                message.key = data.key;
            }
            if (data.value != null) {
                message.value = data.value;
            }
            if (data.leaf != null) {
                message.leaf = LeafOp.fromObject(data.leaf);
            }
            if (data.path != null) {
                message.path = data.path.map(item => InnerOp.fromObject(item));
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
            if (this.leaf != null) {
                data.leaf = this.leaf.toObject();
            }
            if (this.path != null) {
                data.path = this.path.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.key !== undefined)
                writer.writeBytes(1, this.key);
            if (this.value !== undefined)
                writer.writeBytes(2, this.value);
            if (this.leaf !== undefined)
                writer.writeMessage(3, this.leaf, () => this.leaf.serialize(writer));
            if (this.path !== undefined)
                writer.writeRepeatedMessage(4, this.path, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ExistenceProof();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.key = reader.readBytes();
                        break;
                    case 2:
                        message.value = reader.readBytes();
                        break;
                    case 3:
                        reader.readMessage(message.leaf, () => message.leaf = LeafOp.deserialize(reader));
                        break;
                    case 4:
                        reader.readMessage(message.path, () => pb_1.Message.addToRepeatedWrapperField(message, 4, InnerOp.deserialize(reader), InnerOp));
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
            return ExistenceProof.deserialize(bytes);
        }
    }
    ics23.ExistenceProof = ExistenceProof;
    class NonExistenceProof extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("key" in data && data.key != undefined) {
                    this.key = data.key;
                }
                if ("left" in data && data.left != undefined) {
                    this.left = data.left;
                }
                if ("right" in data && data.right != undefined) {
                    this.right = data.right;
                }
            }
        }
        get key() {
            return pb_1.Message.getField(this, 1);
        }
        set key(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get left() {
            return pb_1.Message.getWrapperField(this, ExistenceProof, 2);
        }
        set left(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get right() {
            return pb_1.Message.getWrapperField(this, ExistenceProof, 3);
        }
        set right(value) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        static fromObject(data) {
            const message = new NonExistenceProof({});
            if (data.key != null) {
                message.key = data.key;
            }
            if (data.left != null) {
                message.left = ExistenceProof.fromObject(data.left);
            }
            if (data.right != null) {
                message.right = ExistenceProof.fromObject(data.right);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.key != null) {
                data.key = this.key;
            }
            if (this.left != null) {
                data.left = this.left.toObject();
            }
            if (this.right != null) {
                data.right = this.right.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.key !== undefined)
                writer.writeBytes(1, this.key);
            if (this.left !== undefined)
                writer.writeMessage(2, this.left, () => this.left.serialize(writer));
            if (this.right !== undefined)
                writer.writeMessage(3, this.right, () => this.right.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NonExistenceProof();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.key = reader.readBytes();
                        break;
                    case 2:
                        reader.readMessage(message.left, () => message.left = ExistenceProof.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.right, () => message.right = ExistenceProof.deserialize(reader));
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
            return NonExistenceProof.deserialize(bytes);
        }
    }
    ics23.NonExistenceProof = NonExistenceProof;
    class CommitmentProof extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2, 3, 4]]);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("exist" in data && data.exist != undefined) {
                    this.exist = data.exist;
                }
                if ("nonexist" in data && data.nonexist != undefined) {
                    this.nonexist = data.nonexist;
                }
                if ("batch" in data && data.batch != undefined) {
                    this.batch = data.batch;
                }
                if ("compressed" in data && data.compressed != undefined) {
                    this.compressed = data.compressed;
                }
            }
        }
        get exist() {
            return pb_1.Message.getWrapperField(this, ExistenceProof, 1);
        }
        set exist(value) {
            pb_1.Message.setOneofWrapperField(this, 1, [1, 2, 3, 4], value);
        }
        get nonexist() {
            return pb_1.Message.getWrapperField(this, NonExistenceProof, 2);
        }
        set nonexist(value) {
            pb_1.Message.setOneofWrapperField(this, 2, [1, 2, 3, 4], value);
        }
        get batch() {
            return pb_1.Message.getWrapperField(this, BatchProof, 3);
        }
        set batch(value) {
            pb_1.Message.setOneofWrapperField(this, 3, [1, 2, 3, 4], value);
        }
        get compressed() {
            return pb_1.Message.getWrapperField(this, CompressedBatchProof, 4);
        }
        set compressed(value) {
            pb_1.Message.setOneofWrapperField(this, 4, [1, 2, 3, 4], value);
        }
        get proof() {
            const cases = {
                0: "none",
                1: "exist",
                2: "nonexist",
                3: "batch",
                4: "compressed"
            };
            return cases[pb_1.Message.computeOneofCase(this, [1, 2, 3, 4])];
        }
        static fromObject(data) {
            const message = new CommitmentProof({});
            if (data.exist != null) {
                message.exist = ExistenceProof.fromObject(data.exist);
            }
            if (data.nonexist != null) {
                message.nonexist = NonExistenceProof.fromObject(data.nonexist);
            }
            if (data.batch != null) {
                message.batch = BatchProof.fromObject(data.batch);
            }
            if (data.compressed != null) {
                message.compressed = CompressedBatchProof.fromObject(data.compressed);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.exist != null) {
                data.exist = this.exist.toObject();
            }
            if (this.nonexist != null) {
                data.nonexist = this.nonexist.toObject();
            }
            if (this.batch != null) {
                data.batch = this.batch.toObject();
            }
            if (this.compressed != null) {
                data.compressed = this.compressed.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.exist !== undefined)
                writer.writeMessage(1, this.exist, () => this.exist.serialize(writer));
            if (this.nonexist !== undefined)
                writer.writeMessage(2, this.nonexist, () => this.nonexist.serialize(writer));
            if (this.batch !== undefined)
                writer.writeMessage(3, this.batch, () => this.batch.serialize(writer));
            if (this.compressed !== undefined)
                writer.writeMessage(4, this.compressed, () => this.compressed.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CommitmentProof();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.exist, () => message.exist = ExistenceProof.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.nonexist, () => message.nonexist = NonExistenceProof.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.batch, () => message.batch = BatchProof.deserialize(reader));
                        break;
                    case 4:
                        reader.readMessage(message.compressed, () => message.compressed = CompressedBatchProof.deserialize(reader));
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
            return CommitmentProof.deserialize(bytes);
        }
    }
    ics23.CommitmentProof = CommitmentProof;
    class LeafOp extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("hash" in data && data.hash != undefined) {
                    this.hash = data.hash;
                }
                if ("prehash_key" in data && data.prehash_key != undefined) {
                    this.prehash_key = data.prehash_key;
                }
                if ("prehash_value" in data && data.prehash_value != undefined) {
                    this.prehash_value = data.prehash_value;
                }
                if ("length" in data && data.length != undefined) {
                    this.length = data.length;
                }
                if ("prefix" in data && data.prefix != undefined) {
                    this.prefix = data.prefix;
                }
            }
        }
        get hash() {
            return pb_1.Message.getField(this, 1);
        }
        set hash(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get prehash_key() {
            return pb_1.Message.getField(this, 2);
        }
        set prehash_key(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get prehash_value() {
            return pb_1.Message.getField(this, 3);
        }
        set prehash_value(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get length() {
            return pb_1.Message.getField(this, 4);
        }
        set length(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get prefix() {
            return pb_1.Message.getField(this, 5);
        }
        set prefix(value) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data) {
            const message = new LeafOp({});
            if (data.hash != null) {
                message.hash = data.hash;
            }
            if (data.prehash_key != null) {
                message.prehash_key = data.prehash_key;
            }
            if (data.prehash_value != null) {
                message.prehash_value = data.prehash_value;
            }
            if (data.length != null) {
                message.length = data.length;
            }
            if (data.prefix != null) {
                message.prefix = data.prefix;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.hash != null) {
                data.hash = this.hash;
            }
            if (this.prehash_key != null) {
                data.prehash_key = this.prehash_key;
            }
            if (this.prehash_value != null) {
                data.prehash_value = this.prehash_value;
            }
            if (this.length != null) {
                data.length = this.length;
            }
            if (this.prefix != null) {
                data.prefix = this.prefix;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.hash !== undefined)
                writer.writeEnum(1, this.hash);
            if (this.prehash_key !== undefined)
                writer.writeEnum(2, this.prehash_key);
            if (this.prehash_value !== undefined)
                writer.writeEnum(3, this.prehash_value);
            if (this.length !== undefined)
                writer.writeEnum(4, this.length);
            if (this.prefix !== undefined)
                writer.writeBytes(5, this.prefix);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LeafOp();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.hash = reader.readEnum();
                        break;
                    case 2:
                        message.prehash_key = reader.readEnum();
                        break;
                    case 3:
                        message.prehash_value = reader.readEnum();
                        break;
                    case 4:
                        message.length = reader.readEnum();
                        break;
                    case 5:
                        message.prefix = reader.readBytes();
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
            return LeafOp.deserialize(bytes);
        }
    }
    ics23.LeafOp = LeafOp;
    class InnerOp extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("hash" in data && data.hash != undefined) {
                    this.hash = data.hash;
                }
                if ("prefix" in data && data.prefix != undefined) {
                    this.prefix = data.prefix;
                }
                if ("suffix" in data && data.suffix != undefined) {
                    this.suffix = data.suffix;
                }
            }
        }
        get hash() {
            return pb_1.Message.getField(this, 1);
        }
        set hash(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get prefix() {
            return pb_1.Message.getField(this, 2);
        }
        set prefix(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get suffix() {
            return pb_1.Message.getField(this, 3);
        }
        set suffix(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new InnerOp({});
            if (data.hash != null) {
                message.hash = data.hash;
            }
            if (data.prefix != null) {
                message.prefix = data.prefix;
            }
            if (data.suffix != null) {
                message.suffix = data.suffix;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.hash != null) {
                data.hash = this.hash;
            }
            if (this.prefix != null) {
                data.prefix = this.prefix;
            }
            if (this.suffix != null) {
                data.suffix = this.suffix;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.hash !== undefined)
                writer.writeEnum(1, this.hash);
            if (this.prefix !== undefined)
                writer.writeBytes(2, this.prefix);
            if (this.suffix !== undefined)
                writer.writeBytes(3, this.suffix);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new InnerOp();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.hash = reader.readEnum();
                        break;
                    case 2:
                        message.prefix = reader.readBytes();
                        break;
                    case 3:
                        message.suffix = reader.readBytes();
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
            return InnerOp.deserialize(bytes);
        }
    }
    ics23.InnerOp = InnerOp;
    class ProofSpec extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("leaf_spec" in data && data.leaf_spec != undefined) {
                    this.leaf_spec = data.leaf_spec;
                }
                if ("inner_spec" in data && data.inner_spec != undefined) {
                    this.inner_spec = data.inner_spec;
                }
                if ("max_depth" in data && data.max_depth != undefined) {
                    this.max_depth = data.max_depth;
                }
                if ("min_depth" in data && data.min_depth != undefined) {
                    this.min_depth = data.min_depth;
                }
            }
        }
        get leaf_spec() {
            return pb_1.Message.getWrapperField(this, LeafOp, 1);
        }
        set leaf_spec(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get inner_spec() {
            return pb_1.Message.getWrapperField(this, InnerSpec, 2);
        }
        set inner_spec(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get max_depth() {
            return pb_1.Message.getField(this, 3);
        }
        set max_depth(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get min_depth() {
            return pb_1.Message.getField(this, 4);
        }
        set min_depth(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new ProofSpec({});
            if (data.leaf_spec != null) {
                message.leaf_spec = LeafOp.fromObject(data.leaf_spec);
            }
            if (data.inner_spec != null) {
                message.inner_spec = InnerSpec.fromObject(data.inner_spec);
            }
            if (data.max_depth != null) {
                message.max_depth = data.max_depth;
            }
            if (data.min_depth != null) {
                message.min_depth = data.min_depth;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.leaf_spec != null) {
                data.leaf_spec = this.leaf_spec.toObject();
            }
            if (this.inner_spec != null) {
                data.inner_spec = this.inner_spec.toObject();
            }
            if (this.max_depth != null) {
                data.max_depth = this.max_depth;
            }
            if (this.min_depth != null) {
                data.min_depth = this.min_depth;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.leaf_spec !== undefined)
                writer.writeMessage(1, this.leaf_spec, () => this.leaf_spec.serialize(writer));
            if (this.inner_spec !== undefined)
                writer.writeMessage(2, this.inner_spec, () => this.inner_spec.serialize(writer));
            if (this.max_depth !== undefined)
                writer.writeInt32(3, this.max_depth);
            if (this.min_depth !== undefined)
                writer.writeInt32(4, this.min_depth);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProofSpec();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.leaf_spec, () => message.leaf_spec = LeafOp.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.inner_spec, () => message.inner_spec = InnerSpec.deserialize(reader));
                        break;
                    case 3:
                        message.max_depth = reader.readInt32();
                        break;
                    case 4:
                        message.min_depth = reader.readInt32();
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
            return ProofSpec.deserialize(bytes);
        }
    }
    ics23.ProofSpec = ProofSpec;
    class InnerSpec extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("child_order" in data && data.child_order != undefined) {
                    this.child_order = data.child_order;
                }
                if ("child_size" in data && data.child_size != undefined) {
                    this.child_size = data.child_size;
                }
                if ("min_prefix_length" in data && data.min_prefix_length != undefined) {
                    this.min_prefix_length = data.min_prefix_length;
                }
                if ("max_prefix_length" in data && data.max_prefix_length != undefined) {
                    this.max_prefix_length = data.max_prefix_length;
                }
                if ("empty_child" in data && data.empty_child != undefined) {
                    this.empty_child = data.empty_child;
                }
                if ("hash" in data && data.hash != undefined) {
                    this.hash = data.hash;
                }
            }
        }
        get child_order() {
            return pb_1.Message.getField(this, 1);
        }
        set child_order(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get child_size() {
            return pb_1.Message.getField(this, 2);
        }
        set child_size(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get min_prefix_length() {
            return pb_1.Message.getField(this, 3);
        }
        set min_prefix_length(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get max_prefix_length() {
            return pb_1.Message.getField(this, 4);
        }
        set max_prefix_length(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get empty_child() {
            return pb_1.Message.getField(this, 5);
        }
        set empty_child(value) {
            pb_1.Message.setField(this, 5, value);
        }
        get hash() {
            return pb_1.Message.getField(this, 6);
        }
        set hash(value) {
            pb_1.Message.setField(this, 6, value);
        }
        static fromObject(data) {
            const message = new InnerSpec({});
            if (data.child_order != null) {
                message.child_order = data.child_order;
            }
            if (data.child_size != null) {
                message.child_size = data.child_size;
            }
            if (data.min_prefix_length != null) {
                message.min_prefix_length = data.min_prefix_length;
            }
            if (data.max_prefix_length != null) {
                message.max_prefix_length = data.max_prefix_length;
            }
            if (data.empty_child != null) {
                message.empty_child = data.empty_child;
            }
            if (data.hash != null) {
                message.hash = data.hash;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.child_order != null) {
                data.child_order = this.child_order;
            }
            if (this.child_size != null) {
                data.child_size = this.child_size;
            }
            if (this.min_prefix_length != null) {
                data.min_prefix_length = this.min_prefix_length;
            }
            if (this.max_prefix_length != null) {
                data.max_prefix_length = this.max_prefix_length;
            }
            if (this.empty_child != null) {
                data.empty_child = this.empty_child;
            }
            if (this.hash != null) {
                data.hash = this.hash;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.child_order !== undefined)
                writer.writePackedInt32(1, this.child_order);
            if (this.child_size !== undefined)
                writer.writeInt32(2, this.child_size);
            if (this.min_prefix_length !== undefined)
                writer.writeInt32(3, this.min_prefix_length);
            if (this.max_prefix_length !== undefined)
                writer.writeInt32(4, this.max_prefix_length);
            if (this.empty_child !== undefined)
                writer.writeBytes(5, this.empty_child);
            if (this.hash !== undefined)
                writer.writeEnum(6, this.hash);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new InnerSpec();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.child_order = reader.readPackedInt32();
                        break;
                    case 2:
                        message.child_size = reader.readInt32();
                        break;
                    case 3:
                        message.min_prefix_length = reader.readInt32();
                        break;
                    case 4:
                        message.max_prefix_length = reader.readInt32();
                        break;
                    case 5:
                        message.empty_child = reader.readBytes();
                        break;
                    case 6:
                        message.hash = reader.readEnum();
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
            return InnerSpec.deserialize(bytes);
        }
    }
    ics23.InnerSpec = InnerSpec;
    class BatchProof extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("entries" in data && data.entries != undefined) {
                    this.entries = data.entries;
                }
            }
        }
        get entries() {
            return pb_1.Message.getRepeatedWrapperField(this, BatchEntry, 1);
        }
        set entries(value) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        static fromObject(data) {
            const message = new BatchProof({});
            if (data.entries != null) {
                message.entries = data.entries.map(item => BatchEntry.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.entries != null) {
                data.entries = this.entries.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.entries !== undefined)
                writer.writeRepeatedMessage(1, this.entries, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BatchProof();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.entries, () => pb_1.Message.addToRepeatedWrapperField(message, 1, BatchEntry.deserialize(reader), BatchEntry));
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
            return BatchProof.deserialize(bytes);
        }
    }
    ics23.BatchProof = BatchProof;
    class BatchEntry extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2]]);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("exist" in data && data.exist != undefined) {
                    this.exist = data.exist;
                }
                if ("nonexist" in data && data.nonexist != undefined) {
                    this.nonexist = data.nonexist;
                }
            }
        }
        get exist() {
            return pb_1.Message.getWrapperField(this, ExistenceProof, 1);
        }
        set exist(value) {
            pb_1.Message.setOneofWrapperField(this, 1, [1, 2], value);
        }
        get nonexist() {
            return pb_1.Message.getWrapperField(this, NonExistenceProof, 2);
        }
        set nonexist(value) {
            pb_1.Message.setOneofWrapperField(this, 2, [1, 2], value);
        }
        get proof() {
            const cases = {
                0: "none",
                1: "exist",
                2: "nonexist"
            };
            return cases[pb_1.Message.computeOneofCase(this, [1, 2])];
        }
        static fromObject(data) {
            const message = new BatchEntry({});
            if (data.exist != null) {
                message.exist = ExistenceProof.fromObject(data.exist);
            }
            if (data.nonexist != null) {
                message.nonexist = NonExistenceProof.fromObject(data.nonexist);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.exist != null) {
                data.exist = this.exist.toObject();
            }
            if (this.nonexist != null) {
                data.nonexist = this.nonexist.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.exist !== undefined)
                writer.writeMessage(1, this.exist, () => this.exist.serialize(writer));
            if (this.nonexist !== undefined)
                writer.writeMessage(2, this.nonexist, () => this.nonexist.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new BatchEntry();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.exist, () => message.exist = ExistenceProof.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.nonexist, () => message.nonexist = NonExistenceProof.deserialize(reader));
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
            return BatchEntry.deserialize(bytes);
        }
    }
    ics23.BatchEntry = BatchEntry;
    class CompressedBatchProof extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 2], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("entries" in data && data.entries != undefined) {
                    this.entries = data.entries;
                }
                if ("lookup_inners" in data && data.lookup_inners != undefined) {
                    this.lookup_inners = data.lookup_inners;
                }
            }
        }
        get entries() {
            return pb_1.Message.getRepeatedWrapperField(this, CompressedBatchEntry, 1);
        }
        set entries(value) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        get lookup_inners() {
            return pb_1.Message.getRepeatedWrapperField(this, InnerOp, 2);
        }
        set lookup_inners(value) {
            pb_1.Message.setRepeatedWrapperField(this, 2, value);
        }
        static fromObject(data) {
            const message = new CompressedBatchProof({});
            if (data.entries != null) {
                message.entries = data.entries.map(item => CompressedBatchEntry.fromObject(item));
            }
            if (data.lookup_inners != null) {
                message.lookup_inners = data.lookup_inners.map(item => InnerOp.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.entries != null) {
                data.entries = this.entries.map((item) => item.toObject());
            }
            if (this.lookup_inners != null) {
                data.lookup_inners = this.lookup_inners.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.entries !== undefined)
                writer.writeRepeatedMessage(1, this.entries, (item) => item.serialize(writer));
            if (this.lookup_inners !== undefined)
                writer.writeRepeatedMessage(2, this.lookup_inners, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CompressedBatchProof();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.entries, () => pb_1.Message.addToRepeatedWrapperField(message, 1, CompressedBatchEntry.deserialize(reader), CompressedBatchEntry));
                        break;
                    case 2:
                        reader.readMessage(message.lookup_inners, () => pb_1.Message.addToRepeatedWrapperField(message, 2, InnerOp.deserialize(reader), InnerOp));
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
            return CompressedBatchProof.deserialize(bytes);
        }
    }
    ics23.CompressedBatchProof = CompressedBatchProof;
    class CompressedBatchEntry extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2]]);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("exist" in data && data.exist != undefined) {
                    this.exist = data.exist;
                }
                if ("nonexist" in data && data.nonexist != undefined) {
                    this.nonexist = data.nonexist;
                }
            }
        }
        get exist() {
            return pb_1.Message.getWrapperField(this, CompressedExistenceProof, 1);
        }
        set exist(value) {
            pb_1.Message.setOneofWrapperField(this, 1, [1, 2], value);
        }
        get nonexist() {
            return pb_1.Message.getWrapperField(this, CompressedNonExistenceProof, 2);
        }
        set nonexist(value) {
            pb_1.Message.setOneofWrapperField(this, 2, [1, 2], value);
        }
        get proof() {
            const cases = {
                0: "none",
                1: "exist",
                2: "nonexist"
            };
            return cases[pb_1.Message.computeOneofCase(this, [1, 2])];
        }
        static fromObject(data) {
            const message = new CompressedBatchEntry({});
            if (data.exist != null) {
                message.exist = CompressedExistenceProof.fromObject(data.exist);
            }
            if (data.nonexist != null) {
                message.nonexist = CompressedNonExistenceProof.fromObject(data.nonexist);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.exist != null) {
                data.exist = this.exist.toObject();
            }
            if (this.nonexist != null) {
                data.nonexist = this.nonexist.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.exist !== undefined)
                writer.writeMessage(1, this.exist, () => this.exist.serialize(writer));
            if (this.nonexist !== undefined)
                writer.writeMessage(2, this.nonexist, () => this.nonexist.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CompressedBatchEntry();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.exist, () => message.exist = CompressedExistenceProof.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.nonexist, () => message.nonexist = CompressedNonExistenceProof.deserialize(reader));
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
            return CompressedBatchEntry.deserialize(bytes);
        }
    }
    ics23.CompressedBatchEntry = CompressedBatchEntry;
    class CompressedExistenceProof extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("key" in data && data.key != undefined) {
                    this.key = data.key;
                }
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
                if ("leaf" in data && data.leaf != undefined) {
                    this.leaf = data.leaf;
                }
                if ("path" in data && data.path != undefined) {
                    this.path = data.path;
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
        get leaf() {
            return pb_1.Message.getWrapperField(this, LeafOp, 3);
        }
        set leaf(value) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get path() {
            return pb_1.Message.getField(this, 4);
        }
        set path(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new CompressedExistenceProof({});
            if (data.key != null) {
                message.key = data.key;
            }
            if (data.value != null) {
                message.value = data.value;
            }
            if (data.leaf != null) {
                message.leaf = LeafOp.fromObject(data.leaf);
            }
            if (data.path != null) {
                message.path = data.path;
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
            if (this.leaf != null) {
                data.leaf = this.leaf.toObject();
            }
            if (this.path != null) {
                data.path = this.path;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.key !== undefined)
                writer.writeBytes(1, this.key);
            if (this.value !== undefined)
                writer.writeBytes(2, this.value);
            if (this.leaf !== undefined)
                writer.writeMessage(3, this.leaf, () => this.leaf.serialize(writer));
            if (this.path !== undefined)
                writer.writePackedInt32(4, this.path);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CompressedExistenceProof();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.key = reader.readBytes();
                        break;
                    case 2:
                        message.value = reader.readBytes();
                        break;
                    case 3:
                        reader.readMessage(message.leaf, () => message.leaf = LeafOp.deserialize(reader));
                        break;
                    case 4:
                        message.path = reader.readPackedInt32();
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
            return CompressedExistenceProof.deserialize(bytes);
        }
    }
    ics23.CompressedExistenceProof = CompressedExistenceProof;
    class CompressedNonExistenceProof extends pb_1.Message {
        constructor(data) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("key" in data && data.key != undefined) {
                    this.key = data.key;
                }
                if ("left" in data && data.left != undefined) {
                    this.left = data.left;
                }
                if ("right" in data && data.right != undefined) {
                    this.right = data.right;
                }
            }
        }
        get key() {
            return pb_1.Message.getField(this, 1);
        }
        set key(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get left() {
            return pb_1.Message.getWrapperField(this, CompressedExistenceProof, 2);
        }
        set left(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get right() {
            return pb_1.Message.getWrapperField(this, CompressedExistenceProof, 3);
        }
        set right(value) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        static fromObject(data) {
            const message = new CompressedNonExistenceProof({});
            if (data.key != null) {
                message.key = data.key;
            }
            if (data.left != null) {
                message.left = CompressedExistenceProof.fromObject(data.left);
            }
            if (data.right != null) {
                message.right = CompressedExistenceProof.fromObject(data.right);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.key != null) {
                data.key = this.key;
            }
            if (this.left != null) {
                data.left = this.left.toObject();
            }
            if (this.right != null) {
                data.right = this.right.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.key !== undefined)
                writer.writeBytes(1, this.key);
            if (this.left !== undefined)
                writer.writeMessage(2, this.left, () => this.left.serialize(writer));
            if (this.right !== undefined)
                writer.writeMessage(3, this.right, () => this.right.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CompressedNonExistenceProof();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.key = reader.readBytes();
                        break;
                    case 2:
                        reader.readMessage(message.left, () => message.left = CompressedExistenceProof.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.right, () => message.right = CompressedExistenceProof.deserialize(reader));
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
            return CompressedNonExistenceProof.deserialize(bytes);
        }
    }
    ics23.CompressedNonExistenceProof = CompressedNonExistenceProof;
})(ics23 = exports.ics23 || (exports.ics23 = {}));
//# sourceMappingURL=proofs.js.map