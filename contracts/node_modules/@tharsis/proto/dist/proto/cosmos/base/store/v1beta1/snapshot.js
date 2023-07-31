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
        var store;
        (function (store) {
            var v1beta1;
            (function (v1beta1) {
                class SnapshotItem extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2]]);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("store" in data && data.store != undefined) {
                                this.store = data.store;
                            }
                            if ("iavl" in data && data.iavl != undefined) {
                                this.iavl = data.iavl;
                            }
                        }
                    }
                    get store() {
                        return pb_1.Message.getWrapperField(this, SnapshotStoreItem, 1);
                    }
                    set store(value) {
                        pb_1.Message.setOneofWrapperField(this, 1, [1, 2], value);
                    }
                    get iavl() {
                        return pb_1.Message.getWrapperField(this, SnapshotIAVLItem, 2);
                    }
                    set iavl(value) {
                        pb_1.Message.setOneofWrapperField(this, 2, [1, 2], value);
                    }
                    get item() {
                        const cases = {
                            0: "none",
                            1: "store",
                            2: "iavl"
                        };
                        return cases[pb_1.Message.computeOneofCase(this, [1, 2])];
                    }
                    static fromObject(data) {
                        const message = new SnapshotItem({});
                        if (data.store != null) {
                            message.store = SnapshotStoreItem.fromObject(data.store);
                        }
                        if (data.iavl != null) {
                            message.iavl = SnapshotIAVLItem.fromObject(data.iavl);
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
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.store !== undefined)
                            writer.writeMessage(1, this.store, () => this.store.serialize(writer));
                        if (this.iavl !== undefined)
                            writer.writeMessage(2, this.iavl, () => this.iavl.serialize(writer));
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
            })(v1beta1 = store.v1beta1 || (store.v1beta1 = {}));
        })(store = base.store || (base.store = {}));
    })(base = cosmos.base || (cosmos.base = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=snapshot.js.map