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
exports.tendermint = void 0;
const dependency_2 = __importStar(require("./../../google/protobuf/timestamp"));
const dependency_3 = __importStar(require("./types"));
const dependency_4 = __importStar(require("./validator"));
const pb_1 = __importStar(require("google-protobuf"));
var tendermint;
(function (tendermint) {
    var types;
    (function (types) {
        class Evidence extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2]]);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("duplicate_vote_evidence" in data && data.duplicate_vote_evidence != undefined) {
                        this.duplicate_vote_evidence = data.duplicate_vote_evidence;
                    }
                    if ("light_client_attack_evidence" in data && data.light_client_attack_evidence != undefined) {
                        this.light_client_attack_evidence = data.light_client_attack_evidence;
                    }
                }
            }
            get duplicate_vote_evidence() {
                return pb_1.Message.getWrapperField(this, DuplicateVoteEvidence, 1);
            }
            set duplicate_vote_evidence(value) {
                pb_1.Message.setOneofWrapperField(this, 1, [1, 2], value);
            }
            get light_client_attack_evidence() {
                return pb_1.Message.getWrapperField(this, LightClientAttackEvidence, 2);
            }
            set light_client_attack_evidence(value) {
                pb_1.Message.setOneofWrapperField(this, 2, [1, 2], value);
            }
            get sum() {
                const cases = {
                    0: "none",
                    1: "duplicate_vote_evidence",
                    2: "light_client_attack_evidence"
                };
                return cases[pb_1.Message.computeOneofCase(this, [1, 2])];
            }
            static fromObject(data) {
                const message = new Evidence({});
                if (data.duplicate_vote_evidence != null) {
                    message.duplicate_vote_evidence = DuplicateVoteEvidence.fromObject(data.duplicate_vote_evidence);
                }
                if (data.light_client_attack_evidence != null) {
                    message.light_client_attack_evidence = LightClientAttackEvidence.fromObject(data.light_client_attack_evidence);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.duplicate_vote_evidence != null) {
                    data.duplicate_vote_evidence = this.duplicate_vote_evidence.toObject();
                }
                if (this.light_client_attack_evidence != null) {
                    data.light_client_attack_evidence = this.light_client_attack_evidence.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.duplicate_vote_evidence !== undefined)
                    writer.writeMessage(1, this.duplicate_vote_evidence, () => this.duplicate_vote_evidence.serialize(writer));
                if (this.light_client_attack_evidence !== undefined)
                    writer.writeMessage(2, this.light_client_attack_evidence, () => this.light_client_attack_evidence.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Evidence();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.duplicate_vote_evidence, () => message.duplicate_vote_evidence = DuplicateVoteEvidence.deserialize(reader));
                            break;
                        case 2:
                            reader.readMessage(message.light_client_attack_evidence, () => message.light_client_attack_evidence = LightClientAttackEvidence.deserialize(reader));
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
                return Evidence.deserialize(bytes);
            }
        }
        types.Evidence = Evidence;
        class DuplicateVoteEvidence extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("vote_a" in data && data.vote_a != undefined) {
                        this.vote_a = data.vote_a;
                    }
                    if ("vote_b" in data && data.vote_b != undefined) {
                        this.vote_b = data.vote_b;
                    }
                    if ("total_voting_power" in data && data.total_voting_power != undefined) {
                        this.total_voting_power = data.total_voting_power;
                    }
                    if ("validator_power" in data && data.validator_power != undefined) {
                        this.validator_power = data.validator_power;
                    }
                    if ("timestamp" in data && data.timestamp != undefined) {
                        this.timestamp = data.timestamp;
                    }
                }
            }
            get vote_a() {
                return pb_1.Message.getWrapperField(this, dependency_3.tendermint.types.Vote, 1);
            }
            set vote_a(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get vote_b() {
                return pb_1.Message.getWrapperField(this, dependency_3.tendermint.types.Vote, 2);
            }
            set vote_b(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            get total_voting_power() {
                return pb_1.Message.getField(this, 3);
            }
            set total_voting_power(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get validator_power() {
                return pb_1.Message.getField(this, 4);
            }
            set validator_power(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get timestamp() {
                return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Timestamp, 5);
            }
            set timestamp(value) {
                pb_1.Message.setWrapperField(this, 5, value);
            }
            static fromObject(data) {
                const message = new DuplicateVoteEvidence({});
                if (data.vote_a != null) {
                    message.vote_a = dependency_3.tendermint.types.Vote.fromObject(data.vote_a);
                }
                if (data.vote_b != null) {
                    message.vote_b = dependency_3.tendermint.types.Vote.fromObject(data.vote_b);
                }
                if (data.total_voting_power != null) {
                    message.total_voting_power = data.total_voting_power;
                }
                if (data.validator_power != null) {
                    message.validator_power = data.validator_power;
                }
                if (data.timestamp != null) {
                    message.timestamp = dependency_2.google.protobuf.Timestamp.fromObject(data.timestamp);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.vote_a != null) {
                    data.vote_a = this.vote_a.toObject();
                }
                if (this.vote_b != null) {
                    data.vote_b = this.vote_b.toObject();
                }
                if (this.total_voting_power != null) {
                    data.total_voting_power = this.total_voting_power;
                }
                if (this.validator_power != null) {
                    data.validator_power = this.validator_power;
                }
                if (this.timestamp != null) {
                    data.timestamp = this.timestamp.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.vote_a !== undefined)
                    writer.writeMessage(1, this.vote_a, () => this.vote_a.serialize(writer));
                if (this.vote_b !== undefined)
                    writer.writeMessage(2, this.vote_b, () => this.vote_b.serialize(writer));
                if (this.total_voting_power !== undefined)
                    writer.writeInt64(3, this.total_voting_power);
                if (this.validator_power !== undefined)
                    writer.writeInt64(4, this.validator_power);
                if (this.timestamp !== undefined)
                    writer.writeMessage(5, this.timestamp, () => this.timestamp.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DuplicateVoteEvidence();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.vote_a, () => message.vote_a = dependency_3.tendermint.types.Vote.deserialize(reader));
                            break;
                        case 2:
                            reader.readMessage(message.vote_b, () => message.vote_b = dependency_3.tendermint.types.Vote.deserialize(reader));
                            break;
                        case 3:
                            message.total_voting_power = reader.readInt64();
                            break;
                        case 4:
                            message.validator_power = reader.readInt64();
                            break;
                        case 5:
                            reader.readMessage(message.timestamp, () => message.timestamp = dependency_2.google.protobuf.Timestamp.deserialize(reader));
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
                return DuplicateVoteEvidence.deserialize(bytes);
            }
        }
        types.DuplicateVoteEvidence = DuplicateVoteEvidence;
        class LightClientAttackEvidence extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("conflicting_block" in data && data.conflicting_block != undefined) {
                        this.conflicting_block = data.conflicting_block;
                    }
                    if ("common_height" in data && data.common_height != undefined) {
                        this.common_height = data.common_height;
                    }
                    if ("byzantine_validators" in data && data.byzantine_validators != undefined) {
                        this.byzantine_validators = data.byzantine_validators;
                    }
                    if ("total_voting_power" in data && data.total_voting_power != undefined) {
                        this.total_voting_power = data.total_voting_power;
                    }
                    if ("timestamp" in data && data.timestamp != undefined) {
                        this.timestamp = data.timestamp;
                    }
                }
            }
            get conflicting_block() {
                return pb_1.Message.getWrapperField(this, dependency_3.tendermint.types.LightBlock, 1);
            }
            set conflicting_block(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get common_height() {
                return pb_1.Message.getField(this, 2);
            }
            set common_height(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get byzantine_validators() {
                return pb_1.Message.getRepeatedWrapperField(this, dependency_4.tendermint.types.Validator, 3);
            }
            set byzantine_validators(value) {
                pb_1.Message.setRepeatedWrapperField(this, 3, value);
            }
            get total_voting_power() {
                return pb_1.Message.getField(this, 4);
            }
            set total_voting_power(value) {
                pb_1.Message.setField(this, 4, value);
            }
            get timestamp() {
                return pb_1.Message.getWrapperField(this, dependency_2.google.protobuf.Timestamp, 5);
            }
            set timestamp(value) {
                pb_1.Message.setWrapperField(this, 5, value);
            }
            static fromObject(data) {
                const message = new LightClientAttackEvidence({});
                if (data.conflicting_block != null) {
                    message.conflicting_block = dependency_3.tendermint.types.LightBlock.fromObject(data.conflicting_block);
                }
                if (data.common_height != null) {
                    message.common_height = data.common_height;
                }
                if (data.byzantine_validators != null) {
                    message.byzantine_validators = data.byzantine_validators.map(item => dependency_4.tendermint.types.Validator.fromObject(item));
                }
                if (data.total_voting_power != null) {
                    message.total_voting_power = data.total_voting_power;
                }
                if (data.timestamp != null) {
                    message.timestamp = dependency_2.google.protobuf.Timestamp.fromObject(data.timestamp);
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.conflicting_block != null) {
                    data.conflicting_block = this.conflicting_block.toObject();
                }
                if (this.common_height != null) {
                    data.common_height = this.common_height;
                }
                if (this.byzantine_validators != null) {
                    data.byzantine_validators = this.byzantine_validators.map((item) => item.toObject());
                }
                if (this.total_voting_power != null) {
                    data.total_voting_power = this.total_voting_power;
                }
                if (this.timestamp != null) {
                    data.timestamp = this.timestamp.toObject();
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.conflicting_block !== undefined)
                    writer.writeMessage(1, this.conflicting_block, () => this.conflicting_block.serialize(writer));
                if (this.common_height !== undefined)
                    writer.writeInt64(2, this.common_height);
                if (this.byzantine_validators !== undefined)
                    writer.writeRepeatedMessage(3, this.byzantine_validators, (item) => item.serialize(writer));
                if (this.total_voting_power !== undefined)
                    writer.writeInt64(4, this.total_voting_power);
                if (this.timestamp !== undefined)
                    writer.writeMessage(5, this.timestamp, () => this.timestamp.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LightClientAttackEvidence();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.conflicting_block, () => message.conflicting_block = dependency_3.tendermint.types.LightBlock.deserialize(reader));
                            break;
                        case 2:
                            message.common_height = reader.readInt64();
                            break;
                        case 3:
                            reader.readMessage(message.byzantine_validators, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_4.tendermint.types.Validator.deserialize(reader), dependency_4.tendermint.types.Validator));
                            break;
                        case 4:
                            message.total_voting_power = reader.readInt64();
                            break;
                        case 5:
                            reader.readMessage(message.timestamp, () => message.timestamp = dependency_2.google.protobuf.Timestamp.deserialize(reader));
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
                return LightClientAttackEvidence.deserialize(bytes);
            }
        }
        types.LightClientAttackEvidence = LightClientAttackEvidence;
        class EvidenceList extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("evidence" in data && data.evidence != undefined) {
                        this.evidence = data.evidence;
                    }
                }
            }
            get evidence() {
                return pb_1.Message.getRepeatedWrapperField(this, Evidence, 1);
            }
            set evidence(value) {
                pb_1.Message.setRepeatedWrapperField(this, 1, value);
            }
            static fromObject(data) {
                const message = new EvidenceList({});
                if (data.evidence != null) {
                    message.evidence = data.evidence.map(item => Evidence.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.evidence != null) {
                    data.evidence = this.evidence.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.evidence !== undefined)
                    writer.writeRepeatedMessage(1, this.evidence, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EvidenceList();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.evidence, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Evidence.deserialize(reader), Evidence));
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
                return EvidenceList.deserialize(bytes);
            }
        }
        types.EvidenceList = EvidenceList;
    })(types = tendermint.types || (tendermint.types = {}));
})(tendermint = exports.tendermint || (exports.tendermint = {}));
//# sourceMappingURL=evidence.js.map