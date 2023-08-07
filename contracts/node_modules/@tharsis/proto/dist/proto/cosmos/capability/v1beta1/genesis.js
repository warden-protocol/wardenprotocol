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
const dependency_2 = __importStar(require("./capability"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var capability;
    (function (capability) {
        var v1beta1;
        (function (v1beta1) {
            class GenesisOwners extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("index" in data && data.index != undefined) {
                            this.index = data.index;
                        }
                        if ("index_owners" in data && data.index_owners != undefined) {
                            this.index_owners = data.index_owners;
                        }
                    }
                }
                get index() {
                    return pb_1.Message.getField(this, 1);
                }
                set index(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get index_owners() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.capability.v1beta1.CapabilityOwners, 2);
                }
                set index_owners(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new GenesisOwners({});
                    if (data.index != null) {
                        message.index = data.index;
                    }
                    if (data.index_owners != null) {
                        message.index_owners = dependency_2.cosmos.capability.v1beta1.CapabilityOwners.fromObject(data.index_owners);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.index != null) {
                        data.index = this.index;
                    }
                    if (this.index_owners != null) {
                        data.index_owners = this.index_owners.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.index !== undefined)
                        writer.writeUint64(1, this.index);
                    if (this.index_owners !== undefined)
                        writer.writeMessage(2, this.index_owners, () => this.index_owners.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GenesisOwners();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.index = reader.readUint64();
                                break;
                            case 2:
                                reader.readMessage(message.index_owners, () => message.index_owners = dependency_2.cosmos.capability.v1beta1.CapabilityOwners.deserialize(reader));
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
                    return GenesisOwners.deserialize(bytes);
                }
            }
            v1beta1.GenesisOwners = GenesisOwners;
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("index" in data && data.index != undefined) {
                            this.index = data.index;
                        }
                        if ("owners" in data && data.owners != undefined) {
                            this.owners = data.owners;
                        }
                    }
                }
                get index() {
                    return pb_1.Message.getField(this, 1);
                }
                set index(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get owners() {
                    return pb_1.Message.getRepeatedWrapperField(this, GenesisOwners, 2);
                }
                set owners(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.index != null) {
                        message.index = data.index;
                    }
                    if (data.owners != null) {
                        message.owners = data.owners.map(item => GenesisOwners.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.index != null) {
                        data.index = this.index;
                    }
                    if (this.owners != null) {
                        data.owners = this.owners.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.index !== undefined)
                        writer.writeUint64(1, this.index);
                    if (this.owners !== undefined)
                        writer.writeRepeatedMessage(2, this.owners, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GenesisState();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.index = reader.readUint64();
                                break;
                            case 2:
                                reader.readMessage(message.owners, () => pb_1.Message.addToRepeatedWrapperField(message, 2, GenesisOwners.deserialize(reader), GenesisOwners));
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
                    return GenesisState.deserialize(bytes);
                }
            }
            v1beta1.GenesisState = GenesisState;
        })(v1beta1 = capability.v1beta1 || (capability.v1beta1 = {}));
    })(capability = cosmos.capability || (cosmos.capability = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=genesis.js.map