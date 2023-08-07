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
exports.evmos = void 0;
const dependency_2 = __importStar(require("./../../../google/protobuf/timestamp"));
const dependency_3 = __importStar(require("./../../../cosmos/base/v1beta1/coin"));
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var incentives;
    (function (incentives) {
        var v1;
        (function (v1) {
            class Incentive extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("contract" in data && data.contract != undefined) {
                            this.contract = data.contract;
                        }
                        if ("allocations" in data && data.allocations != undefined) {
                            this.allocations = data.allocations;
                        }
                        if ("epochs" in data && data.epochs != undefined) {
                            this.epochs = data.epochs;
                        }
                        if ("start_time" in data && data.start_time != undefined) {
                            this.start_time = data.start_time;
                        }
                        if ("total_gas" in data && data.total_gas != undefined) {
                            this.total_gas = data.total_gas;
                        }
                    }
                }
                get contract() {
                    return pb_1.Message.getField(this, 1);
                }
                set contract(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get allocations() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_3.cosmos.base.v1beta1.DecCoin, 2);
                }
                set allocations(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                get epochs() {
                    return pb_1.Message.getField(this, 3);
                }
                set epochs(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get start_time() {
                    return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Timestamp, 4);
                }
                set start_time(value) {
                    pb_1.Message.setWrapperField(this, 4, value);
                }
                get total_gas() {
                    return pb_1.Message.getField(this, 5);
                }
                set total_gas(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new Incentive({});
                    if (data.contract != null) {
                        message.contract = data.contract;
                    }
                    if (data.allocations != null) {
                        message.allocations = data.allocations.map(item => dependency_3.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    if (data.epochs != null) {
                        message.epochs = data.epochs;
                    }
                    if (data.start_time != null) {
                        message.start_time = dependency_2.google.protobuf.Timestamp.fromObject(data.start_time);
                    }
                    if (data.total_gas != null) {
                        message.total_gas = data.total_gas;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.contract != null) {
                        data.contract = this.contract;
                    }
                    if (this.allocations != null) {
                        data.allocations = this.allocations.map((item) => item.toObject());
                    }
                    if (this.epochs != null) {
                        data.epochs = this.epochs;
                    }
                    if (this.start_time != null) {
                        data.start_time = this.start_time.toObject();
                    }
                    if (this.total_gas != null) {
                        data.total_gas = this.total_gas;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.contract === "string" && this.contract.length)
                        writer.writeString(1, this.contract);
                    if (this.allocations !== undefined)
                        writer.writeRepeatedMessage(2, this.allocations, (item) => item.serialize(writer));
                    if (this.epochs !== undefined)
                        writer.writeUint32(3, this.epochs);
                    if (this.start_time !== undefined)
                        writer.writeMessage(4, this.start_time, () => this.start_time.serialize(writer));
                    if (this.total_gas !== undefined)
                        writer.writeUint64(5, this.total_gas);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Incentive();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.contract = reader.readString();
                                break;
                            case 2:
                                reader.readMessage(message.allocations, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_3.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_3.cosmos.base.v1beta1.DecCoin));
                                break;
                            case 3:
                                message.epochs = reader.readUint32();
                                break;
                            case 4:
                                reader.readMessage(message.start_time, () => message.start_time = dependency_2.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 5:
                                message.total_gas = reader.readUint64();
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
                    return Incentive.deserialize(bytes);
                }
            }
            v1.Incentive = Incentive;
            class GasMeter extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("contract" in data && data.contract != undefined) {
                            this.contract = data.contract;
                        }
                        if ("participant" in data && data.participant != undefined) {
                            this.participant = data.participant;
                        }
                        if ("cumulative_gas" in data && data.cumulative_gas != undefined) {
                            this.cumulative_gas = data.cumulative_gas;
                        }
                    }
                }
                get contract() {
                    return pb_1.Message.getField(this, 1);
                }
                set contract(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get participant() {
                    return pb_1.Message.getField(this, 2);
                }
                set participant(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get cumulative_gas() {
                    return pb_1.Message.getField(this, 3);
                }
                set cumulative_gas(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new GasMeter({});
                    if (data.contract != null) {
                        message.contract = data.contract;
                    }
                    if (data.participant != null) {
                        message.participant = data.participant;
                    }
                    if (data.cumulative_gas != null) {
                        message.cumulative_gas = data.cumulative_gas;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.contract != null) {
                        data.contract = this.contract;
                    }
                    if (this.participant != null) {
                        data.participant = this.participant;
                    }
                    if (this.cumulative_gas != null) {
                        data.cumulative_gas = this.cumulative_gas;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.contract === "string" && this.contract.length)
                        writer.writeString(1, this.contract);
                    if (typeof this.participant === "string" && this.participant.length)
                        writer.writeString(2, this.participant);
                    if (this.cumulative_gas !== undefined)
                        writer.writeUint64(3, this.cumulative_gas);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GasMeter();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.contract = reader.readString();
                                break;
                            case 2:
                                message.participant = reader.readString();
                                break;
                            case 3:
                                message.cumulative_gas = reader.readUint64();
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
                    return GasMeter.deserialize(bytes);
                }
            }
            v1.GasMeter = GasMeter;
            class RegisterIncentiveProposal extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("title" in data && data.title != undefined) {
                            this.title = data.title;
                        }
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("contract" in data && data.contract != undefined) {
                            this.contract = data.contract;
                        }
                        if ("allocations" in data && data.allocations != undefined) {
                            this.allocations = data.allocations;
                        }
                        if ("epochs" in data && data.epochs != undefined) {
                            this.epochs = data.epochs;
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
                get contract() {
                    return pb_1.Message.getField(this, 3);
                }
                set contract(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get allocations() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_3.cosmos.base.v1beta1.DecCoin, 4);
                }
                set allocations(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 4, value);
                }
                get epochs() {
                    return pb_1.Message.getField(this, 5);
                }
                set epochs(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                static fromObject(data) {
                    const message = new RegisterIncentiveProposal({});
                    if (data.title != null) {
                        message.title = data.title;
                    }
                    if (data.description != null) {
                        message.description = data.description;
                    }
                    if (data.contract != null) {
                        message.contract = data.contract;
                    }
                    if (data.allocations != null) {
                        message.allocations = data.allocations.map(item => dependency_3.cosmos.base.v1beta1.DecCoin.fromObject(item));
                    }
                    if (data.epochs != null) {
                        message.epochs = data.epochs;
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
                    if (this.contract != null) {
                        data.contract = this.contract;
                    }
                    if (this.allocations != null) {
                        data.allocations = this.allocations.map((item) => item.toObject());
                    }
                    if (this.epochs != null) {
                        data.epochs = this.epochs;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.title === "string" && this.title.length)
                        writer.writeString(1, this.title);
                    if (typeof this.description === "string" && this.description.length)
                        writer.writeString(2, this.description);
                    if (typeof this.contract === "string" && this.contract.length)
                        writer.writeString(3, this.contract);
                    if (this.allocations !== undefined)
                        writer.writeRepeatedMessage(4, this.allocations, (item) => item.serialize(writer));
                    if (this.epochs !== undefined)
                        writer.writeUint32(5, this.epochs);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RegisterIncentiveProposal();
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
                                message.contract = reader.readString();
                                break;
                            case 4:
                                reader.readMessage(message.allocations, () => pb_1.Message.addToRepeatedWrapperField(message, 4, dependency_3.cosmos.base.v1beta1.DecCoin.deserialize(reader), dependency_3.cosmos.base.v1beta1.DecCoin));
                                break;
                            case 5:
                                message.epochs = reader.readUint32();
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
                    return RegisterIncentiveProposal.deserialize(bytes);
                }
            }
            v1.RegisterIncentiveProposal = RegisterIncentiveProposal;
            class CancelIncentiveProposal extends pb_1.Message {
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
                        if ("contract" in data && data.contract != undefined) {
                            this.contract = data.contract;
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
                get contract() {
                    return pb_1.Message.getField(this, 3);
                }
                set contract(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new CancelIncentiveProposal({});
                    if (data.title != null) {
                        message.title = data.title;
                    }
                    if (data.description != null) {
                        message.description = data.description;
                    }
                    if (data.contract != null) {
                        message.contract = data.contract;
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
                    if (this.contract != null) {
                        data.contract = this.contract;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.title === "string" && this.title.length)
                        writer.writeString(1, this.title);
                    if (typeof this.description === "string" && this.description.length)
                        writer.writeString(2, this.description);
                    if (typeof this.contract === "string" && this.contract.length)
                        writer.writeString(3, this.contract);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CancelIncentiveProposal();
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
                                message.contract = reader.readString();
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
                    return CancelIncentiveProposal.deserialize(bytes);
                }
            }
            v1.CancelIncentiveProposal = CancelIncentiveProposal;
        })(v1 = incentives.v1 || (incentives.v1 = {}));
    })(incentives = evmos.incentives || (evmos.incentives = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=incentives.js.map