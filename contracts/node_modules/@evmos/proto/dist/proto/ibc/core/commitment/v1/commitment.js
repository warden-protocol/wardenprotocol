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
exports.ibc = void 0;
const dependency_2 = __importStar(require("./../../../../proofs"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var commitment;
        (function (commitment) {
            var v1;
            (function (v1) {
                class MerkleRoot extends pb_1.Message {
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
                        const message = new MerkleRoot({});
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
                        if (this.hash !== undefined)
                            writer.writeBytes(1, this.hash);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MerkleRoot();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
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
                        return MerkleRoot.deserialize(bytes);
                    }
                }
                v1.MerkleRoot = MerkleRoot;
                class MerklePrefix extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("key_prefix" in data && data.key_prefix != undefined) {
                                this.key_prefix = data.key_prefix;
                            }
                        }
                    }
                    get key_prefix() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set key_prefix(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new MerklePrefix({});
                        if (data.key_prefix != null) {
                            message.key_prefix = data.key_prefix;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.key_prefix != null) {
                            data.key_prefix = this.key_prefix;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.key_prefix !== undefined)
                            writer.writeBytes(1, this.key_prefix);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MerklePrefix();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.key_prefix = reader.readBytes();
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
                        return MerklePrefix.deserialize(bytes);
                    }
                }
                v1.MerklePrefix = MerklePrefix;
                class MerklePath extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("key_path" in data && data.key_path != undefined) {
                                this.key_path = data.key_path;
                            }
                        }
                    }
                    get key_path() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set key_path(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new MerklePath({});
                        if (data.key_path != null) {
                            message.key_path = data.key_path;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.key_path != null) {
                            data.key_path = this.key_path;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.key_path !== undefined)
                            writer.writeRepeatedString(1, this.key_path);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MerklePath();
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
                        return MerklePath.deserialize(bytes);
                    }
                }
                v1.MerklePath = MerklePath;
                class MerkleProof extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("proofs" in data && data.proofs != undefined) {
                                this.proofs = data.proofs;
                            }
                        }
                    }
                    get proofs() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.ics23.CommitmentProof, 1);
                    }
                    set proofs(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new MerkleProof({});
                        if (data.proofs != null) {
                            message.proofs = data.proofs.map(item => dependency_2.ics23.CommitmentProof.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.proofs != null) {
                            data.proofs = this.proofs.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.proofs !== undefined)
                            writer.writeRepeatedMessage(1, this.proofs, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MerkleProof();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.proofs, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_2.ics23.CommitmentProof.deserialize(reader), dependency_2.ics23.CommitmentProof));
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
                        return MerkleProof.deserialize(bytes);
                    }
                }
                v1.MerkleProof = MerkleProof;
            })(v1 = commitment.v1 || (commitment.v1 = {}));
        })(commitment = core.commitment || (core.commitment = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=commitment.js.map