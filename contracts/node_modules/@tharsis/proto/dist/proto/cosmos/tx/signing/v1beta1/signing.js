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
const dependency_1 = __importStar(require("./../../../crypto/multisig/v1beta1/multisig"));
const dependency_2 = __importStar(require("./../../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var tx;
    (function (tx) {
        var signing;
        (function (signing) {
            var v1beta1;
            (function (v1beta1) {
                let SignMode;
                (function (SignMode) {
                    SignMode[SignMode["SIGN_MODE_UNSPECIFIED"] = 0] = "SIGN_MODE_UNSPECIFIED";
                    SignMode[SignMode["SIGN_MODE_DIRECT"] = 1] = "SIGN_MODE_DIRECT";
                    SignMode[SignMode["SIGN_MODE_TEXTUAL"] = 2] = "SIGN_MODE_TEXTUAL";
                    SignMode[SignMode["SIGN_MODE_LEGACY_AMINO_JSON"] = 127] = "SIGN_MODE_LEGACY_AMINO_JSON";
                    SignMode[SignMode["SIGN_MODE_EIP_191"] = 191] = "SIGN_MODE_EIP_191";
                })(SignMode = v1beta1.SignMode || (v1beta1.SignMode = {}));
                class SignatureDescriptors extends pb_1.Message {
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
                        return pb_1.Message.getRepeatedWrapperField(this, SignatureDescriptor, 1);
                    }
                    set signatures(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new SignatureDescriptors({});
                        if (data.signatures != null) {
                            message.signatures = data.signatures.map(item => SignatureDescriptor.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.signatures != null) {
                            data.signatures = this.signatures.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.signatures !== undefined)
                            writer.writeRepeatedMessage(1, this.signatures, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SignatureDescriptors();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.signatures, () => pb_1.Message.addToRepeatedWrapperField(message, 1, SignatureDescriptor.deserialize(reader), SignatureDescriptor));
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
                        return SignatureDescriptors.deserialize(bytes);
                    }
                }
                v1beta1.SignatureDescriptors = SignatureDescriptors;
                class SignatureDescriptor extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("public_key" in data && data.public_key != undefined) {
                                this.public_key = data.public_key;
                            }
                            if ("data" in data && data.data != undefined) {
                                this.data = data.data;
                            }
                            if ("sequence" in data && data.sequence != undefined) {
                                this.sequence = data.sequence;
                            }
                        }
                    }
                    get public_key() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 1);
                    }
                    set public_key(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get data() {
                        return pb_1.Message.getWrapperField(this, SignatureDescriptor.Data, 2);
                    }
                    set data(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get sequence() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set sequence(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new SignatureDescriptor({});
                        if (data.public_key != null) {
                            message.public_key = dependency_2.google.protobuf.Any.fromObject(data.public_key);
                        }
                        if (data.data != null) {
                            message.data = SignatureDescriptor.Data.fromObject(data.data);
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
                        if (this.data != null) {
                            data.data = this.data.toObject();
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
                        if (this.data !== undefined)
                            writer.writeMessage(2, this.data, () => this.data.serialize(writer));
                        if (this.sequence !== undefined)
                            writer.writeUint64(3, this.sequence);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SignatureDescriptor();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.public_key, () => message.public_key = dependency_2.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.data, () => message.data = SignatureDescriptor.Data.deserialize(reader));
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
                        return SignatureDescriptor.deserialize(bytes);
                    }
                }
                v1beta1.SignatureDescriptor = SignatureDescriptor;
                (function (SignatureDescriptor) {
                    class Data extends pb_1.Message {
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
                            return pb_1.Message.getWrapperField(this, SignatureDescriptor.Data.Single, 1);
                        }
                        set single(value) {
                            pb_1.Message.setOneofWrapperField(this, 1, [1, 2], value);
                        }
                        get multi() {
                            return pb_1.Message.getWrapperField(this, SignatureDescriptor.Data.Multi, 2);
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
                            const message = new Data({});
                            if (data.single != null) {
                                message.single = SignatureDescriptor.Data.Single.fromObject(data.single);
                            }
                            if (data.multi != null) {
                                message.multi = SignatureDescriptor.Data.Multi.fromObject(data.multi);
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
                            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Data();
                            while (reader.nextField()) {
                                if (reader.isEndGroup())
                                    break;
                                switch (reader.getFieldNumber()) {
                                    case 1:
                                        reader.readMessage(message.single, () => message.single = SignatureDescriptor.Data.Single.deserialize(reader));
                                        break;
                                    case 2:
                                        reader.readMessage(message.multi, () => message.multi = SignatureDescriptor.Data.Multi.deserialize(reader));
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
                    SignatureDescriptor.Data = Data;
                    (function (Data) {
                        class Single extends pb_1.Message {
                            constructor(data) {
                                super();
                                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                                if (!Array.isArray(data) && typeof data == "object") {
                                    if ("mode" in data && data.mode != undefined) {
                                        this.mode = data.mode;
                                    }
                                    if ("signature" in data && data.signature != undefined) {
                                        this.signature = data.signature;
                                    }
                                }
                            }
                            get mode() {
                                return pb_1.Message.getField(this, 1);
                            }
                            set mode(value) {
                                pb_1.Message.setField(this, 1, value);
                            }
                            get signature() {
                                return pb_1.Message.getField(this, 2);
                            }
                            set signature(value) {
                                pb_1.Message.setField(this, 2, value);
                            }
                            static fromObject(data) {
                                const message = new Single({});
                                if (data.mode != null) {
                                    message.mode = data.mode;
                                }
                                if (data.signature != null) {
                                    message.signature = data.signature;
                                }
                                return message;
                            }
                            toObject() {
                                const data = {};
                                if (this.mode != null) {
                                    data.mode = this.mode;
                                }
                                if (this.signature != null) {
                                    data.signature = this.signature;
                                }
                                return data;
                            }
                            serialize(w) {
                                const writer = w || new pb_1.BinaryWriter();
                                if (this.mode !== undefined)
                                    writer.writeEnum(1, this.mode);
                                if (this.signature !== undefined)
                                    writer.writeBytes(2, this.signature);
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
                                        case 2:
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
                                return Single.deserialize(bytes);
                            }
                        }
                        Data.Single = Single;
                        class Multi extends pb_1.Message {
                            constructor(data) {
                                super();
                                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                                if (!Array.isArray(data) && typeof data == "object") {
                                    if ("bitarray" in data && data.bitarray != undefined) {
                                        this.bitarray = data.bitarray;
                                    }
                                    if ("signatures" in data && data.signatures != undefined) {
                                        this.signatures = data.signatures;
                                    }
                                }
                            }
                            get bitarray() {
                                return pb_1.Message.getWrapperField(this, dependency_1.cosmos.crypto.multisig.v1beta1.CompactBitArray, 1);
                            }
                            set bitarray(value) {
                                pb_1.Message.setWrapperField(this, 1, value);
                            }
                            get signatures() {
                                return pb_1.Message.getRepeatedWrapperField(this, SignatureDescriptor.Data, 2);
                            }
                            set signatures(value) {
                                pb_1.Message.setRepeatedWrapperField(this, 2, value);
                            }
                            static fromObject(data) {
                                const message = new Multi({});
                                if (data.bitarray != null) {
                                    message.bitarray = dependency_1.cosmos.crypto.multisig.v1beta1.CompactBitArray.fromObject(data.bitarray);
                                }
                                if (data.signatures != null) {
                                    message.signatures = data.signatures.map(item => SignatureDescriptor.Data.fromObject(item));
                                }
                                return message;
                            }
                            toObject() {
                                const data = {};
                                if (this.bitarray != null) {
                                    data.bitarray = this.bitarray.toObject();
                                }
                                if (this.signatures != null) {
                                    data.signatures = this.signatures.map((item) => item.toObject());
                                }
                                return data;
                            }
                            serialize(w) {
                                const writer = w || new pb_1.BinaryWriter();
                                if (this.bitarray !== undefined)
                                    writer.writeMessage(1, this.bitarray, () => this.bitarray.serialize(writer));
                                if (this.signatures !== undefined)
                                    writer.writeRepeatedMessage(2, this.signatures, (item) => item.serialize(writer));
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
                                            reader.readMessage(message.bitarray, () => message.bitarray = dependency_1.cosmos.crypto.multisig.v1beta1.CompactBitArray.deserialize(reader));
                                            break;
                                        case 2:
                                            reader.readMessage(message.signatures, () => pb_1.Message.addToRepeatedWrapperField(message, 2, SignatureDescriptor.Data.deserialize(reader), SignatureDescriptor.Data));
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
                        Data.Multi = Multi;
                    })(Data = SignatureDescriptor.Data || (SignatureDescriptor.Data = {}));
                })(SignatureDescriptor = v1beta1.SignatureDescriptor || (v1beta1.SignatureDescriptor = {}));
            })(v1beta1 = signing.v1beta1 || (signing.v1beta1 = {}));
        })(signing = tx.signing || (tx.signing = {}));
    })(tx = cosmos.tx || (cosmos.tx = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=signing.js.map