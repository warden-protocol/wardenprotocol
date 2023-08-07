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
    var capability;
    (function (capability) {
        var v1beta1;
        (function (v1beta1) {
            class Capability extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("index" in data && data.index != undefined) {
                            this.index = data.index;
                        }
                    }
                }
                get index() {
                    return pb_1.Message.getField(this, 1);
                }
                set index(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new Capability({});
                    if (data.index != null) {
                        message.index = data.index;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.index != null) {
                        data.index = this.index;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.index !== undefined)
                        writer.writeUint64(1, this.index);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Capability();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.index = reader.readUint64();
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
                    return Capability.deserialize(bytes);
                }
            }
            v1beta1.Capability = Capability;
            class Owner extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("module" in data && data.module != undefined) {
                            this.module = data.module;
                        }
                        if ("name" in data && data.name != undefined) {
                            this.name = data.name;
                        }
                    }
                }
                get module() {
                    return pb_1.Message.getField(this, 1);
                }
                set module(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get name() {
                    return pb_1.Message.getField(this, 2);
                }
                set name(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Owner({});
                    if (data.module != null) {
                        message.module = data.module;
                    }
                    if (data.name != null) {
                        message.name = data.name;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.module != null) {
                        data.module = this.module;
                    }
                    if (this.name != null) {
                        data.name = this.name;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.module === "string" && this.module.length)
                        writer.writeString(1, this.module);
                    if (typeof this.name === "string" && this.name.length)
                        writer.writeString(2, this.name);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Owner();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.module = reader.readString();
                                break;
                            case 2:
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
                    return Owner.deserialize(bytes);
                }
            }
            v1beta1.Owner = Owner;
            class CapabilityOwners extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("owners" in data && data.owners != undefined) {
                            this.owners = data.owners;
                        }
                    }
                }
                get owners() {
                    return pb_1.Message.getRepeatedWrapperField(this, Owner, 1);
                }
                set owners(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new CapabilityOwners({});
                    if (data.owners != null) {
                        message.owners = data.owners.map(item => Owner.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.owners != null) {
                        data.owners = this.owners.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.owners !== undefined)
                        writer.writeRepeatedMessage(1, this.owners, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CapabilityOwners();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.owners, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Owner.deserialize(reader), Owner));
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
                    return CapabilityOwners.deserialize(bytes);
                }
            }
            v1beta1.CapabilityOwners = CapabilityOwners;
        })(v1beta1 = capability.v1beta1 || (capability.v1beta1 = {}));
    })(capability = cosmos.capability || (cosmos.capability = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=capability.js.map