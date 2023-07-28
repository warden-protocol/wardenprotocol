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
const dependency_3 = __importStar(require("./../../../../cosmos/upgrade/v1beta1/upgrade"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var client;
        (function (client) {
            var v1;
            (function (v1) {
                class IdentifiedClientState extends pb_1.Message {
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
                    static fromObject(data) {
                        const message = new IdentifiedClientState({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.client_state != null) {
                            message.client_state = dependency_2.google.protobuf.Any.fromObject(data.client_state);
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
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.client_state !== undefined)
                            writer.writeMessage(2, this.client_state, () => this.client_state.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IdentifiedClientState();
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
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return IdentifiedClientState.deserialize(bytes);
                    }
                }
                v1.IdentifiedClientState = IdentifiedClientState;
                class ConsensusStateWithHeight extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("height" in data && data.height != undefined) {
                                this.height = data.height;
                            }
                            if ("consensus_state" in data && data.consensus_state != undefined) {
                                this.consensus_state = data.consensus_state;
                            }
                        }
                    }
                    get height() {
                        return pb_1.Message.getWrapperField(this, Height, 1);
                    }
                    set height(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get consensus_state() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 2);
                    }
                    set consensus_state(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new ConsensusStateWithHeight({});
                        if (data.height != null) {
                            message.height = Height.fromObject(data.height);
                        }
                        if (data.consensus_state != null) {
                            message.consensus_state = dependency_2.google.protobuf.Any.fromObject(data.consensus_state);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.height != null) {
                            data.height = this.height.toObject();
                        }
                        if (this.consensus_state != null) {
                            data.consensus_state = this.consensus_state.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.height !== undefined)
                            writer.writeMessage(1, this.height, () => this.height.serialize(writer));
                        if (this.consensus_state !== undefined)
                            writer.writeMessage(2, this.consensus_state, () => this.consensus_state.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ConsensusStateWithHeight();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.height, () => message.height = Height.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.consensus_state, () => message.consensus_state = dependency_2.google.protobuf.Any.deserialize(reader));
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
                        return ConsensusStateWithHeight.deserialize(bytes);
                    }
                }
                v1.ConsensusStateWithHeight = ConsensusStateWithHeight;
                class ClientConsensusStates extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("consensus_states" in data && data.consensus_states != undefined) {
                                this.consensus_states = data.consensus_states;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get consensus_states() {
                        return pb_1.Message.getRepeatedWrapperField(this, ConsensusStateWithHeight, 2);
                    }
                    set consensus_states(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new ClientConsensusStates({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.consensus_states != null) {
                            message.consensus_states = data.consensus_states.map(item => ConsensusStateWithHeight.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.consensus_states != null) {
                            data.consensus_states = this.consensus_states.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.consensus_states !== undefined)
                            writer.writeRepeatedMessage(2, this.consensus_states, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ClientConsensusStates();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.consensus_states, () => pb_1.Message.addToRepeatedWrapperField(message, 2, ConsensusStateWithHeight.deserialize(reader), ConsensusStateWithHeight));
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
                        return ClientConsensusStates.deserialize(bytes);
                    }
                }
                v1.ClientConsensusStates = ClientConsensusStates;
                class ClientUpdateProposal extends pb_1.Message {
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
                            if ("subject_client_id" in data && data.subject_client_id != undefined) {
                                this.subject_client_id = data.subject_client_id;
                            }
                            if ("substitute_client_id" in data && data.substitute_client_id != undefined) {
                                this.substitute_client_id = data.substitute_client_id;
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
                    get subject_client_id() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set subject_client_id(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get substitute_client_id() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set substitute_client_id(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new ClientUpdateProposal({});
                        if (data.title != null) {
                            message.title = data.title;
                        }
                        if (data.description != null) {
                            message.description = data.description;
                        }
                        if (data.subject_client_id != null) {
                            message.subject_client_id = data.subject_client_id;
                        }
                        if (data.substitute_client_id != null) {
                            message.substitute_client_id = data.substitute_client_id;
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
                        if (this.subject_client_id != null) {
                            data.subject_client_id = this.subject_client_id;
                        }
                        if (this.substitute_client_id != null) {
                            data.substitute_client_id = this.substitute_client_id;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.title === "string" && this.title.length)
                            writer.writeString(1, this.title);
                        if (typeof this.description === "string" && this.description.length)
                            writer.writeString(2, this.description);
                        if (typeof this.subject_client_id === "string" && this.subject_client_id.length)
                            writer.writeString(3, this.subject_client_id);
                        if (typeof this.substitute_client_id === "string" && this.substitute_client_id.length)
                            writer.writeString(4, this.substitute_client_id);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ClientUpdateProposal();
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
                                    message.subject_client_id = reader.readString();
                                    break;
                                case 4:
                                    message.substitute_client_id = reader.readString();
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
                        return ClientUpdateProposal.deserialize(bytes);
                    }
                }
                v1.ClientUpdateProposal = ClientUpdateProposal;
                class UpgradeProposal extends pb_1.Message {
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
                            if ("upgraded_client_state" in data && data.upgraded_client_state != undefined) {
                                this.upgraded_client_state = data.upgraded_client_state;
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
                        return pb_1.Message.getWrapperField(this, dependency_3.cosmos.upgrade.v1beta1.Plan, 3);
                    }
                    set plan(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get upgraded_client_state() {
                        return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Any, 4);
                    }
                    set upgraded_client_state(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new UpgradeProposal({});
                        if (data.title != null) {
                            message.title = data.title;
                        }
                        if (data.description != null) {
                            message.description = data.description;
                        }
                        if (data.plan != null) {
                            message.plan = dependency_3.cosmos.upgrade.v1beta1.Plan.fromObject(data.plan);
                        }
                        if (data.upgraded_client_state != null) {
                            message.upgraded_client_state = dependency_2.google.protobuf.Any.fromObject(data.upgraded_client_state);
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
                        if (this.upgraded_client_state != null) {
                            data.upgraded_client_state = this.upgraded_client_state.toObject();
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
                        if (this.upgraded_client_state !== undefined)
                            writer.writeMessage(4, this.upgraded_client_state, () => this.upgraded_client_state.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpgradeProposal();
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
                                    reader.readMessage(message.plan, () => message.plan = dependency_3.cosmos.upgrade.v1beta1.Plan.deserialize(reader));
                                    break;
                                case 4:
                                    reader.readMessage(message.upgraded_client_state, () => message.upgraded_client_state = dependency_2.google.protobuf.Any.deserialize(reader));
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
                        return UpgradeProposal.deserialize(bytes);
                    }
                }
                v1.UpgradeProposal = UpgradeProposal;
                class Height extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("revision_number" in data && data.revision_number != undefined) {
                                this.revision_number = data.revision_number;
                            }
                            if ("revision_height" in data && data.revision_height != undefined) {
                                this.revision_height = data.revision_height;
                            }
                        }
                    }
                    get revision_number() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set revision_number(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get revision_height() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set revision_height(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new Height({});
                        if (data.revision_number != null) {
                            message.revision_number = data.revision_number;
                        }
                        if (data.revision_height != null) {
                            message.revision_height = data.revision_height;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.revision_number != null) {
                            data.revision_number = this.revision_number;
                        }
                        if (this.revision_height != null) {
                            data.revision_height = this.revision_height;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.revision_number !== undefined)
                            writer.writeUint64(1, this.revision_number);
                        if (this.revision_height !== undefined)
                            writer.writeUint64(2, this.revision_height);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Height();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.revision_number = reader.readUint64();
                                    break;
                                case 2:
                                    message.revision_height = reader.readUint64();
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
                        return Height.deserialize(bytes);
                    }
                }
                v1.Height = Height;
                class Params extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("allowed_clients" in data && data.allowed_clients != undefined) {
                                this.allowed_clients = data.allowed_clients;
                            }
                        }
                    }
                    get allowed_clients() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set allowed_clients(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new Params({});
                        if (data.allowed_clients != null) {
                            message.allowed_clients = data.allowed_clients;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.allowed_clients != null) {
                            data.allowed_clients = this.allowed_clients;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.allowed_clients !== undefined)
                            writer.writeRepeatedString(1, this.allowed_clients);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Params();
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
                        return Params.deserialize(bytes);
                    }
                }
                v1.Params = Params;
            })(v1 = client.v1 || (client.v1 = {}));
        })(client = core.client || (core.client = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=client.js.map