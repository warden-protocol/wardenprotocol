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
const dependency_2 = __importStar(require("./../../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var client;
        (function (client) {
            var v1;
            (function (v1) {
                class MsgCreateClient extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_state" in data && data.client_state != undefined) {
                                this.client_state = data.client_state;
                            }
                            if ("consensus_state" in data && data.consensus_state != undefined) {
                                this.consensus_state = data.consensus_state;
                            }
                            if ("signer" in data && data.signer != undefined) {
                                this.signer = data.signer;
                            }
                        }
                    }
                    get client_state() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 1);
                    }
                    set client_state(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get consensus_state() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 2);
                    }
                    set consensus_state(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get signer() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set signer(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new MsgCreateClient({});
                        if (data.client_state != null) {
                            message.client_state = dependency_2.google.protobuf.Any.fromObject(data.client_state);
                        }
                        if (data.consensus_state != null) {
                            message.consensus_state = dependency_2.google.protobuf.Any.fromObject(data.consensus_state);
                        }
                        if (data.signer != null) {
                            message.signer = data.signer;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_state != null) {
                            data.client_state = this.client_state.toObject();
                        }
                        if (this.consensus_state != null) {
                            data.consensus_state = this.consensus_state.toObject();
                        }
                        if (this.signer != null) {
                            data.signer = this.signer;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.client_state !== undefined)
                            writer.writeMessage(1, this.client_state, () => this.client_state.serialize(writer));
                        if (this.consensus_state !== undefined)
                            writer.writeMessage(2, this.consensus_state, () => this.consensus_state.serialize(writer));
                        if (typeof this.signer === "string" && this.signer.length)
                            writer.writeString(3, this.signer);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgCreateClient();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.client_state, () => message.client_state = dependency_2.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.consensus_state, () => message.consensus_state = dependency_2.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 3:
                                    message.signer = reader.readString();
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
                        return MsgCreateClient.deserialize(bytes);
                    }
                }
                v1.MsgCreateClient = MsgCreateClient;
                class MsgCreateClientResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new MsgCreateClientResponse({});
                        return message;
                    }
                    toObject() {
                        const data = {};
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgCreateClientResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return MsgCreateClientResponse.deserialize(bytes);
                    }
                }
                v1.MsgCreateClientResponse = MsgCreateClientResponse;
                class MsgUpdateClient extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("header" in data && data.header != undefined) {
                                this.header = data.header;
                            }
                            if ("signer" in data && data.signer != undefined) {
                                this.signer = data.signer;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get header() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 2);
                    }
                    set header(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get signer() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set signer(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new MsgUpdateClient({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.header != null) {
                            message.header = dependency_2.google.protobuf.Any.fromObject(data.header);
                        }
                        if (data.signer != null) {
                            message.signer = data.signer;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.header != null) {
                            data.header = this.header.toObject();
                        }
                        if (this.signer != null) {
                            data.signer = this.signer;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.header !== undefined)
                            writer.writeMessage(2, this.header, () => this.header.serialize(writer));
                        if (typeof this.signer === "string" && this.signer.length)
                            writer.writeString(3, this.signer);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgUpdateClient();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.header, () => message.header = dependency_2.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 3:
                                    message.signer = reader.readString();
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
                        return MsgUpdateClient.deserialize(bytes);
                    }
                }
                v1.MsgUpdateClient = MsgUpdateClient;
                class MsgUpdateClientResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new MsgUpdateClientResponse({});
                        return message;
                    }
                    toObject() {
                        const data = {};
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgUpdateClientResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return MsgUpdateClientResponse.deserialize(bytes);
                    }
                }
                v1.MsgUpdateClientResponse = MsgUpdateClientResponse;
                class MsgUpgradeClient extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("client_state" in data && data.client_state != undefined) {
                                this.client_state = data.client_state;
                            }
                            if ("consensus_state" in data && data.consensus_state != undefined) {
                                this.consensus_state = data.consensus_state;
                            }
                            if ("proof_upgrade_client" in data && data.proof_upgrade_client != undefined) {
                                this.proof_upgrade_client = data.proof_upgrade_client;
                            }
                            if ("proof_upgrade_consensus_state" in data && data.proof_upgrade_consensus_state != undefined) {
                                this.proof_upgrade_consensus_state = data.proof_upgrade_consensus_state;
                            }
                            if ("signer" in data && data.signer != undefined) {
                                this.signer = data.signer;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get client_state() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 2);
                    }
                    set client_state(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get consensus_state() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 3);
                    }
                    set consensus_state(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get proof_upgrade_client() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set proof_upgrade_client(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get proof_upgrade_consensus_state() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set proof_upgrade_consensus_state(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    get signer() {
                        return pb_1.Message.getField(this, 6);
                    }
                    set signer(value) {
                        pb_1.Message.setField(this, 6, value);
                    }
                    static fromObject(data) {
                        const message = new MsgUpgradeClient({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.client_state != null) {
                            message.client_state = dependency_2.google.protobuf.Any.fromObject(data.client_state);
                        }
                        if (data.consensus_state != null) {
                            message.consensus_state = dependency_2.google.protobuf.Any.fromObject(data.consensus_state);
                        }
                        if (data.proof_upgrade_client != null) {
                            message.proof_upgrade_client = data.proof_upgrade_client;
                        }
                        if (data.proof_upgrade_consensus_state != null) {
                            message.proof_upgrade_consensus_state = data.proof_upgrade_consensus_state;
                        }
                        if (data.signer != null) {
                            message.signer = data.signer;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.client_state != null) {
                            data.client_state = this.client_state.toObject();
                        }
                        if (this.consensus_state != null) {
                            data.consensus_state = this.consensus_state.toObject();
                        }
                        if (this.proof_upgrade_client != null) {
                            data.proof_upgrade_client = this.proof_upgrade_client;
                        }
                        if (this.proof_upgrade_consensus_state != null) {
                            data.proof_upgrade_consensus_state = this.proof_upgrade_consensus_state;
                        }
                        if (this.signer != null) {
                            data.signer = this.signer;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.client_state !== undefined)
                            writer.writeMessage(2, this.client_state, () => this.client_state.serialize(writer));
                        if (this.consensus_state !== undefined)
                            writer.writeMessage(3, this.consensus_state, () => this.consensus_state.serialize(writer));
                        if (this.proof_upgrade_client !== undefined)
                            writer.writeBytes(4, this.proof_upgrade_client);
                        if (this.proof_upgrade_consensus_state !== undefined)
                            writer.writeBytes(5, this.proof_upgrade_consensus_state);
                        if (typeof this.signer === "string" && this.signer.length)
                            writer.writeString(6, this.signer);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgUpgradeClient();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.client_state, () => message.client_state = dependency_2.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.consensus_state, () => message.consensus_state = dependency_2.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 4:
                                    message.proof_upgrade_client = reader.readBytes();
                                    break;
                                case 5:
                                    message.proof_upgrade_consensus_state = reader.readBytes();
                                    break;
                                case 6:
                                    message.signer = reader.readString();
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
                        return MsgUpgradeClient.deserialize(bytes);
                    }
                }
                v1.MsgUpgradeClient = MsgUpgradeClient;
                class MsgUpgradeClientResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new MsgUpgradeClientResponse({});
                        return message;
                    }
                    toObject() {
                        const data = {};
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgUpgradeClientResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return MsgUpgradeClientResponse.deserialize(bytes);
                    }
                }
                v1.MsgUpgradeClientResponse = MsgUpgradeClientResponse;
                class MsgSubmitMisbehaviour extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("misbehaviour" in data && data.misbehaviour != undefined) {
                                this.misbehaviour = data.misbehaviour;
                            }
                            if ("signer" in data && data.signer != undefined) {
                                this.signer = data.signer;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get misbehaviour() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 2);
                    }
                    set misbehaviour(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get signer() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set signer(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new MsgSubmitMisbehaviour({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.misbehaviour != null) {
                            message.misbehaviour = dependency_2.google.protobuf.Any.fromObject(data.misbehaviour);
                        }
                        if (data.signer != null) {
                            message.signer = data.signer;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.misbehaviour != null) {
                            data.misbehaviour = this.misbehaviour.toObject();
                        }
                        if (this.signer != null) {
                            data.signer = this.signer;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.misbehaviour !== undefined)
                            writer.writeMessage(2, this.misbehaviour, () => this.misbehaviour.serialize(writer));
                        if (typeof this.signer === "string" && this.signer.length)
                            writer.writeString(3, this.signer);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgSubmitMisbehaviour();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.misbehaviour, () => message.misbehaviour = dependency_2.google.protobuf.Any.deserialize(reader));
                                    break;
                                case 3:
                                    message.signer = reader.readString();
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
                        return MsgSubmitMisbehaviour.deserialize(bytes);
                    }
                }
                v1.MsgSubmitMisbehaviour = MsgSubmitMisbehaviour;
                class MsgSubmitMisbehaviourResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") { }
                    }
                    static fromObject(data) {
                        const message = new MsgSubmitMisbehaviourResponse({});
                        return message;
                    }
                    toObject() {
                        const data = {};
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgSubmitMisbehaviourResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return MsgSubmitMisbehaviourResponse.deserialize(bytes);
                    }
                }
                v1.MsgSubmitMisbehaviourResponse = MsgSubmitMisbehaviourResponse;
            })(v1 = client.v1 || (client.v1 = {}));
        })(client = core.client || (core.client = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=tx.js.map