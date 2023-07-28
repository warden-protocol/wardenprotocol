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
const dependency_1 = __importStar(require("./../../../google/protobuf/any"));
const dependency_3 = __importStar(require("./../../../google/protobuf/timestamp"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var upgrade;
    (function (upgrade) {
        var v1beta1;
        (function (v1beta1) {
            class Plan extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("name" in data && data.name != undefined) {
                            this.name = data.name;
                        }
                        if ("time" in data && data.time != undefined) {
                            this.time = data.time;
                        }
                        if ("height" in data && data.height != undefined) {
                            this.height = data.height;
                        }
                        if ("info" in data && data.info != undefined) {
                            this.info = data.info;
                        }
                        if ("upgraded_client_state" in data && data.upgraded_client_state != undefined) {
                            this.upgraded_client_state = data.upgraded_client_state;
                        }
                    }
                }
                get name() {
                    return pb_1.Message.getField(this, 1);
                }
                set name(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get time() {
                    return pb_1.Message.getWrapperField(this, dependency_3.google.protobuf.Timestamp, 2);
                }
                set time(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get height() {
                    return pb_1.Message.getField(this, 3);
                }
                set height(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get info() {
                    return pb_1.Message.getField(this, 4);
                }
                set info(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get upgraded_client_state() {
                    return pb_1.Message.getWrapperField(this, dependency_1.google.protobuf.Any, 5);
                }
                set upgraded_client_state(value) {
                    pb_1.Message.setWrapperField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new Plan({});
                    if (data.name != null) {
                        message.name = data.name;
                    }
                    if (data.time != null) {
                        message.time = dependency_3.google.protobuf.Timestamp.fromObject(data.time);
                    }
                    if (data.height != null) {
                        message.height = data.height;
                    }
                    if (data.info != null) {
                        message.info = data.info;
                    }
                    if (data.upgraded_client_state != null) {
                        message.upgraded_client_state = dependency_1.google.protobuf.Any.fromObject(data.upgraded_client_state);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.name != null) {
                        data.name = this.name;
                    }
                    if (this.time != null) {
                        data.time = this.time.toObject();
                    }
                    if (this.height != null) {
                        data.height = this.height;
                    }
                    if (this.info != null) {
                        data.info = this.info;
                    }
                    if (this.upgraded_client_state != null) {
                        data.upgraded_client_state = this.upgraded_client_state.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.name === "string" && this.name.length)
                        writer.writeString(1, this.name);
                    if (this.time !== undefined)
                        writer.writeMessage(2, this.time, () => this.time.serialize(writer));
                    if (this.height !== undefined)
                        writer.writeInt64(3, this.height);
                    if (typeof this.info === "string" && this.info.length)
                        writer.writeString(4, this.info);
                    if (this.upgraded_client_state !== undefined)
                        writer.writeMessage(5, this.upgraded_client_state, () => this.upgraded_client_state.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Plan();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.name = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.time, () => message.time = dependency_3.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 3:
                                message.height = reader.readInt64();
                                break;
                            case 4:
                                message.info = reader.readString();
                                break;
                            case 5:
                                reader.readMessage(message.upgraded_client_state, () => message.upgraded_client_state = dependency_1.google.protobuf.Any.deserialize(reader));
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
                    return Plan.deserialize(bytes);
                }
            }
            v1beta1.Plan = Plan;
            class SoftwareUpgradeProposal extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("title" in data && data.title != undefined) {
                            this.title = data.title;
                        }
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("plan" in data && data.plan != undefined) {
                            this.plan = data.plan;
                        }
                    }
                }
                get title() {
                    return pb_1.Message.getField(this, 1);
                }
                set title(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get description() {
                    return pb_1.Message.getField(this, 2);
                }
                set description(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get plan() {
                    return pb_1.Message.getWrapperField(this, Plan, 3);
                }
                set plan(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new SoftwareUpgradeProposal({});
                    if (data.title != null) {
                        message.title = data.title;
                    }
                    if (data.description != null) {
                        message.description = data.description;
                    }
                    if (data.plan != null) {
                        message.plan = Plan.fromObject(data.plan);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.title != null) {
                        data.title = this.title;
                    }
                    if (this.description != null) {
                        data.description = this.description;
                    }
                    if (this.plan != null) {
                        data.plan = this.plan.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.title === "string" && this.title.length)
                        writer.writeString(1, this.title);
                    if (typeof this.description === "string" && this.description.length)
                        writer.writeString(2, this.description);
                    if (this.plan !== undefined)
                        writer.writeMessage(3, this.plan, () => this.plan.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SoftwareUpgradeProposal();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.title = reader.readString();
                                break;
                            case 2:
                                message.description = reader.readString();
                                break;
                            case 3:
                                reader.readMessage(message.plan, () => message.plan = Plan.deserialize(reader));
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
                    return SoftwareUpgradeProposal.deserialize(bytes);
                }
            }
            v1beta1.SoftwareUpgradeProposal = SoftwareUpgradeProposal;
            class CancelSoftwareUpgradeProposal extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("title" in data && data.title != undefined) {
                            this.title = data.title;
                        }
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                    }
                }
                get title() {
                    return pb_1.Message.getField(this, 1);
                }
                set title(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get description() {
                    return pb_1.Message.getField(this, 2);
                }
                set description(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new CancelSoftwareUpgradeProposal({});
                    if (data.title != null) {
                        message.title = data.title;
                    }
                    if (data.description != null) {
                        message.description = data.description;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.title != null) {
                        data.title = this.title;
                    }
                    if (this.description != null) {
                        data.description = this.description;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.title === "string" && this.title.length)
                        writer.writeString(1, this.title);
                    if (typeof this.description === "string" && this.description.length)
                        writer.writeString(2, this.description);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CancelSoftwareUpgradeProposal();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.title = reader.readString();
                                break;
                            case 2:
                                message.description = reader.readString();
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
                    return CancelSoftwareUpgradeProposal.deserialize(bytes);
                }
            }
            v1beta1.CancelSoftwareUpgradeProposal = CancelSoftwareUpgradeProposal;
            class ModuleVersion extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("name" in data && data.name != undefined) {
                            this.name = data.name;
                        }
                        if ("version" in data && data.version != undefined) {
                            this.version = data.version;
                        }
                    }
                }
                get name() {
                    return pb_1.Message.getField(this, 1);
                }
                set name(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get version() {
                    return pb_1.Message.getField(this, 2);
                }
                set version(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new ModuleVersion({});
                    if (data.name != null) {
                        message.name = data.name;
                    }
                    if (data.version != null) {
                        message.version = data.version;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.name != null) {
                        data.name = this.name;
                    }
                    if (this.version != null) {
                        data.version = this.version;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.name === "string" && this.name.length)
                        writer.writeString(1, this.name);
                    if (this.version !== undefined)
                        writer.writeUint64(2, this.version);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ModuleVersion();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.name = reader.readString();
                                break;
                            case 2:
                                message.version = reader.readUint64();
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
                    return ModuleVersion.deserialize(bytes);
                }
            }
            v1beta1.ModuleVersion = ModuleVersion;
        })(v1beta1 = upgrade.v1beta1 || (upgrade.v1beta1 = {}));
    })(upgrade = cosmos.upgrade || (cosmos.upgrade = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=upgrade.js.map