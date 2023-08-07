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
    var base;
    (function (base) {
        var snapshots;
        (function (snapshots) {
            var v1beta1;
            (function (v1beta1) {
                class Snapshot extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                            if ("format" in data && data.format != undefined) {
                                this.format = data.format;
                            }
                            if ("chunks" in data && data.chunks != undefined) {
                                this.chunks = data.chunks;
                            }
                            if ("hash" in data && data.hash != undefined) {
                                this.hash = data.hash;
                            }
                            if ("metadata" in data && data.metadata != undefined) {
                                this.metadata = data.metadata;
                            }
                        }
                    }
                    get height() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set height(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get format() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set format(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get chunks() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set chunks(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get hash() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set hash(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get metadata() {
                        return pb_1.Message.getWrapperField(this, Metadata, 5);
                    }
                    set metadata(value) {
                        pb_1.Message.setWrapperField(this, 5, value);
                    }
                    static fromObject(data) {
                        const message = new Snapshot({});
                        if (data.height != null) {
                            message.height = data.height;
                        }
                        if (data.format != null) {
                            message.format = data.format;
                        }
                        if (data.chunks != null) {
                            message.chunks = data.chunks;
                        }
                        if (data.hash != null) {
                            message.hash = data.hash;
                        }
                        if (data.metadata != null) {
                            message.metadata = Metadata.fromObject(data.metadata);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.height != null) {
                            data.height = this.height;
                        }
                        if (this.format != null) {
                            data.format = this.format;
                        }
                        if (this.chunks != null) {
                            data.chunks = this.chunks;
                        }
                        if (this.hash != null) {
                            data.hash = this.hash;
                        }
                        if (this.metadata != null) {
                            data.metadata = this.metadata.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.height !== undefined)
                            writer.writeUint64(1, this.height);
                        if (this.format !== undefined)
                            writer.writeUint32(2, this.format);
                        if (this.chunks !== undefined)
                            writer.writeUint32(3, this.chunks);
                        if (this.hash !== undefined)
                            writer.writeBytes(4, this.hash);
                        if (this.metadata !== undefined)
                            writer.writeMessage(5, this.metadata, () => this.metadata.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Snapshot();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.height = reader.readUint64();
                                    break;
                                case 2:
                                    message.format = reader.readUint32();
                                    break;
                                case 3:
                                    message.chunks = reader.readUint32();
                                    break;
                                case 4:
                                    message.hash = reader.readBytes();
                                    break;
                                case 5:
                                    reader.readMessage(message.metadata, () => message.metadata = Metadata.deserialize(reader));
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
                        return Snapshot.deserialize(bytes);
                    }
                }
                v1beta1.Snapshot = Snapshot;
                class Metadata extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("chunk_hashes" in data && data.chunk_hashes != undefined) {
                                this.chunk_hashes = data.chunk_hashes;
                            }
                        }
                    }
                    get chunk_hashes() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set chunk_hashes(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new Metadata({});
                        if (data.chunk_hashes != null) {
                            message.chunk_hashes = data.chunk_hashes;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.chunk_hashes != null) {
                            data.chunk_hashes = this.chunk_hashes;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.chunk_hashes !== undefined)
                            writer.writeRepeatedBytes(1, this.chunk_hashes);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Metadata();
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
                        return Metadata.deserialize(bytes);
                    }
                }
                v1beta1.Metadata = Metadata;
                class SnapshotItem extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2, 3, 4]]);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("store" in data && data.store != undefined) {
                                this.store = data.store;
                            }
                            if ("iavl" in data && data.iavl != undefined) {
                                this.iavl = data.iavl;
                            }
                            if ("extension" in data && data.extension != undefined) {
                                this.extension = data.extension;
                            }
                            if ("extension_payload" in data && data.extension_payload != undefined) {
                                this.extension_payload = data.extension_payload;
                            }
                        }
                    }
                    get store() {
                        return pb_1.Message.getWrapperField(this, SnapshotStoreItem, 1);
                    }
                    set store(value) {
                        pb_1.Message.setOneofWrapperField(this, 1, [1, 2, 3, 4], value);
                    }
                    get iavl() {
                        return pb_1.Message.getWrapperField(this, SnapshotIAVLItem, 2);
                    }
                    set iavl(value) {
                        pb_1.Message.setOneofWrapperField(this, 2, [1, 2, 3, 4], value);
                    }
                    get extension() {
                        return pb_1.Message.getWrapperField(this, SnapshotExtensionMeta, 3);
                    }
                    set extension(value) {
                        pb_1.Message.setOneofWrapperField(this, 3, [1, 2, 3, 4], value);
                    }
                    get extension_payload() {
                        return pb_1.Message.getWrapperField(this, SnapshotExtensionPayload, 4);
                    }
                    set extension_payload(value) {
                        pb_1.Message.setOneofWrapperField(this, 4, [1, 2, 3, 4], value);
                    }
                    get item() {
                        const cases = {
                            0: "none",
                            1: "store",
                            2: "iavl",
                            3: "extension",
                            4: "extension_payload"
                        };
                        return cases[pb_1.Message.computeOneofCase(this, [1, 2, 3, 4])];
                    }
                    static fromObject(data) {
                        const message = new SnapshotItem({});
                        if (data.store != null) {
                            message.store = SnapshotStoreItem.fromObject(data.store);
                        }
                        if (data.iavl != null) {
                            message.iavl = SnapshotIAVLItem.fromObject(data.iavl);
                        }
                        if (data.extension != null) {
                            message.extension = SnapshotExtensionMeta.fromObject(data.extension);
                        }
                        if (data.extension_payload != null) {
                            message.extension_payload = SnapshotExtensionPayload.fromObject(data.extension_payload);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.store != null) {
                            data.store = this.store.toObject();
                        }
                        if (this.iavl != null) {
                            data.iavl = this.iavl.toObject();
                        }
                        if (this.extension != null) {
                            data.extension = this.extension.toObject();
                        }
                        if (this.extension_payload != null) {
                            data.extension_payload = this.extension_payload.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.store !== undefined)
                            writer.writeMessage(1, this.store, () => this.store.serialize(writer));
                        if (this.iavl !== undefined)
                            writer.writeMessage(2, this.iavl, () => this.iavl.serialize(writer));
                        if (this.extension !== undefined)
                            writer.writeMessage(3, this.extension, () => this.extension.serialize(writer));
                        if (this.extension_payload !== undefined)
                            writer.writeMessage(4, this.extension_payload, () => this.extension_payload.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SnapshotItem();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.store, () => message.store = SnapshotStoreItem.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.iavl, () => message.iavl = SnapshotIAVLItem.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.extension, () => message.extension = SnapshotExtensionMeta.deserialize(reader));
                                    break;
                                case 4:
                                    reader.readMessage(message.extension_payload, () => message.extension_payload = SnapshotExtensionPayload.deserialize(reader));
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
                        return SnapshotItem.deserialize(bytes);
                    }
                }
                v1beta1.SnapshotItem = SnapshotItem;
                class SnapshotStoreItem extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("name" in data && data.name != undefined) {
                                this.name = data.name;
                            }
                        }
                    }
                    get name() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set name(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new SnapshotStoreItem({});
                        if (data.name != null) {
                            message.name = data.name;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.name != null) {
                            data.name = this.name;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.name === "string" && this.name.length)
                            writer.writeString(1, this.name);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SnapshotStoreItem();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.name = reader.readString();
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
                        return SnapshotStoreItem.deserialize(bytes);
                    }
                }
                v1beta1.SnapshotStoreItem = SnapshotStoreItem;
                class SnapshotIAVLItem extends pb_1.Message {
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
                            if ("version" in data && data.version != undefined) {
                                this.version = data.version;
                            }
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
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
                    get version() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set version(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get height() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set height(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new SnapshotIAVLItem({});
                        if (data.key != null) {
                            message.key = data.key;
                        }
                        if (data.value != null) {
                            message.value = data.value;
                        }
                        if (data.version != null) {
                            message.version = data.version;
                        }
                        if (data.height != null) {
                            message.height = data.height;
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
                        if (this.version != null) {
                            data.version = this.version;
                        }
                        if (this.height != null) {
                            data.height = this.height;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.key !== undefined)
                            writer.writeBytes(1, this.key);
                        if (this.value !== undefined)
                            writer.writeBytes(2, this.value);
                        if (this.version !== undefined)
                            writer.writeInt64(3, this.version);
                        if (this.height !== undefined)
                            writer.writeInt32(4, this.height);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SnapshotIAVLItem();
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
                                    message.version = reader.readInt64();
                                    break;
                                case 4:
                                    message.height = reader.readInt32();
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
                        return SnapshotIAVLItem.deserialize(bytes);
                    }
                }
                v1beta1.SnapshotIAVLItem = SnapshotIAVLItem;
                class SnapshotExtensionMeta extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("name" in data && data.name != undefined) {
                                this.name = data.name;
                            }
                            if ("format" in data && data.format != undefined) {
                                this.format = data.format;
                            }
                        }
                    }
                    get name() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set name(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get format() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set format(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new SnapshotExtensionMeta({});
                        if (data.name != null) {
                            message.name = data.name;
                        }
                        if (data.format != null) {
                            message.format = data.format;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.name != null) {
                            data.name = this.name;
                        }
                        if (this.format != null) {
                            data.format = this.format;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.name === "string" && this.name.length)
                            writer.writeString(1, this.name);
                        if (this.format !== undefined)
                            writer.writeUint32(2, this.format);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SnapshotExtensionMeta();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.name = reader.readString();
                                    break;
                                case 2:
                                    message.format = reader.readUint32();
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
                        return SnapshotExtensionMeta.deserialize(bytes);
                    }
                }
                v1beta1.SnapshotExtensionMeta = SnapshotExtensionMeta;
                class SnapshotExtensionPayload extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("payload" in data && data.payload != undefined) {
                                this.payload = data.payload;
                            }
                        }
                    }
                    get payload() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set payload(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new SnapshotExtensionPayload({});
                        if (data.payload != null) {
                            message.payload = data.payload;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.payload != null) {
                            data.payload = this.payload;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.payload !== undefined)
                            writer.writeBytes(1, this.payload);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SnapshotExtensionPayload();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.payload = reader.readBytes();
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
                        return SnapshotExtensionPayload.deserialize(bytes);
                    }
                }
                v1beta1.SnapshotExtensionPayload = SnapshotExtensionPayload;
            })(v1beta1 = snapshots.v1beta1 || (snapshots.v1beta1 = {}));
        })(snapshots = base.snapshots || (base.snapshots = {}));
    })(base = cosmos.base || (cosmos.base = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=snapshot.js.map