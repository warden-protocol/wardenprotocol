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
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var crypto;
    (function (crypto) {
        var multisig;
        (function (multisig) {
            var v1beta1;
            (function (v1beta1) {
                class MultiSignature extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("signatures" in data && data.signatures != undefined) {
                                this.signatures = data.signatures;
                            }
                        }
                    }
                    get signatures() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set signatures(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new MultiSignature({});
                        if (data.signatures != null) {
                            message.signatures = data.signatures;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.signatures != null) {
                            data.signatures = this.signatures;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.signatures !== undefined)
                            writer.writeRepeatedBytes(1, this.signatures);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MultiSignature();
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
                        return MultiSignature.deserialize(bytes);
                    }
                }
                v1beta1.MultiSignature = MultiSignature;
                class CompactBitArray extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("extra_bits_stored" in data && data.extra_bits_stored != undefined) {
                                this.extra_bits_stored = data.extra_bits_stored;
                            }
                            if ("elems" in data && data.elems != undefined) {
                                this.elems = data.elems;
                            }
                        }
                    }
                    get extra_bits_stored() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set extra_bits_stored(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get elems() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set elems(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new CompactBitArray({});
                        if (data.extra_bits_stored != null) {
                            message.extra_bits_stored = data.extra_bits_stored;
                        }
                        if (data.elems != null) {
                            message.elems = data.elems;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.extra_bits_stored != null) {
                            data.extra_bits_stored = this.extra_bits_stored;
                        }
                        if (this.elems != null) {
                            data.elems = this.elems;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.extra_bits_stored !== undefined)
                            writer.writeUint32(1, this.extra_bits_stored);
                        if (this.elems !== undefined)
                            writer.writeBytes(2, this.elems);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CompactBitArray();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.extra_bits_stored = reader.readUint32();
                                    break;
                                case 2:
                                    message.elems = reader.readBytes();
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
                        return CompactBitArray.deserialize(bytes);
                    }
                }
                v1beta1.CompactBitArray = CompactBitArray;
            })(v1beta1 = multisig.v1beta1 || (multisig.v1beta1 = {}));
        })(multisig = crypto.multisig || (crypto.multisig = {}));
    })(crypto = cosmos.crypto || (cosmos.crypto = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=multisig.js.map