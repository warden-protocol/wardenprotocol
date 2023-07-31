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
const dependency_1 = __importStar(require("./../../../../tendermint/types/validator"));
const dependency_2 = __importStar(require("./../../../../tendermint/types/types"));
const dependency_3 = __importStar(require("./../../../../proofs"));
const dependency_4 = __importStar(require("./../../../../google/protobuf/duration"));
const dependency_5 = __importStar(require("./../../../../google/protobuf/timestamp"));
const dependency_6 = __importStar(require("./../../../core/client/v1/client"));
const dependency_7 = __importStar(require("./../../../core/commitment/v1/commitment"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var lightclients;
    (function (lightclients) {
        var tendermint;
        (function (tendermint) {
            var v1;
            (function (v1) {
                class ClientState extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [8, 9], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("chain_id" in data && data.chain_id != undefined) {
                                this.chain_id = data.chain_id;
                            }
                            if ("trust_level" in data && data.trust_level != undefined) {
                                this.trust_level = data.trust_level;
                            }
                            if ("trusting_period" in data && data.trusting_period != undefined) {
                                this.trusting_period = data.trusting_period;
                            }
                            if ("unbonding_period" in data && data.unbonding_period != undefined) {
                                this.unbonding_period = data.unbonding_period;
                            }
                            if ("max_clock_drift" in data && data.max_clock_drift != undefined) {
                                this.max_clock_drift = data.max_clock_drift;
                            }
                            if ("frozen_height" in data && data.frozen_height != undefined) {
                                this.frozen_height = data.frozen_height;
                            }
                            if ("latest_height" in data && data.latest_height != undefined) {
                                this.latest_height = data.latest_height;
                            }
                            if ("proof_specs" in data && data.proof_specs != undefined) {
                                this.proof_specs = data.proof_specs;
                            }
                            if ("upgrade_path" in data && data.upgrade_path != undefined) {
                                this.upgrade_path = data.upgrade_path;
                            }
                            if ("allow_update_after_expiry" in data && data.allow_update_after_expiry != undefined) {
                                this.allow_update_after_expiry = data.allow_update_after_expiry;
                            }
                            if ("allow_update_after_misbehaviour" in data && data.allow_update_after_misbehaviour != undefined) {
                                this.allow_update_after_misbehaviour = data.allow_update_after_misbehaviour;
                            }
                        }
                    }
                    get chain_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set chain_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get trust_level() {
                        return pb_1.Message.getWrapperField(this, Fraction, 2);
                    }
                    set trust_level(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get trusting_period() {
                        return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Duration, 3);
                    }
                    set trusting_period(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get unbonding_period() {
                        return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Duration, 4);
                    }
                    set unbonding_period(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    get max_clock_drift() {
                        return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Duration, 5);
                    }
                    set max_clock_drift(value) {
                        pb_1.Message.setWrapperField(this, 5, value);
                    }
                    get frozen_height() {
                        return pb_1.Message.getWrapperField(this, dependency_6.ibc.core.client.v1.Height, 6);
                    }
                    set frozen_height(value) {
                        pb_1.Message.setWrapperField(this, 6, value);
                    }
                    get latest_height() {
                        return pb_1.Message.getWrapperField(this, dependency_6.ibc.core.client.v1.Height, 7);
                    }
                    set latest_height(value) {
                        pb_1.Message.setWrapperField(this, 7, value);
                    }
                    get proof_specs() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_3.ics23.ProofSpec, 8);
                    }
                    set proof_specs(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 8, value);
                    }
                    get upgrade_path() {
                        return pb_1.Message.getField(this, 9);
                    }
                    set upgrade_path(value) {
                        pb_1.Message.setField(this, 9, value);
                    }
                    get allow_update_after_expiry() {
                        return pb_1.Message.getField(this, 10);
                    }
                    set allow_update_after_expiry(value) {
                        pb_1.Message.setField(this, 10, value);
                    }
                    get allow_update_after_misbehaviour() {
                        return pb_1.Message.getField(this, 11);
                    }
                    set allow_update_after_misbehaviour(value) {
                        pb_1.Message.setField(this, 11, value);
                    }
                    static fromObject(data) {
                        const message = new ClientState({});
                        if (data.chain_id != null) {
                            message.chain_id = data.chain_id;
                        }
                        if (data.trust_level != null) {
                            message.trust_level = Fraction.fromObject(data.trust_level);
                        }
                        if (data.trusting_period != null) {
                            message.trusting_period = dependency_4.google.protobuf.Duration.fromObject(data.trusting_period);
                        }
                        if (data.unbonding_period != null) {
                            message.unbonding_period = dependency_4.google.protobuf.Duration.fromObject(data.unbonding_period);
                        }
                        if (data.max_clock_drift != null) {
                            message.max_clock_drift = dependency_4.google.protobuf.Duration.fromObject(data.max_clock_drift);
                        }
                        if (data.frozen_height != null) {
                            message.frozen_height = dependency_6.ibc.core.client.v1.Height.fromObject(data.frozen_height);
                        }
                        if (data.latest_height != null) {
                            message.latest_height = dependency_6.ibc.core.client.v1.Height.fromObject(data.latest_height);
                        }
                        if (data.proof_specs != null) {
                            message.proof_specs = data.proof_specs.map(item => dependency_3.ics23.ProofSpec.fromObject(item));
                        }
                        if (data.upgrade_path != null) {
                            message.upgrade_path = data.upgrade_path;
                        }
                        if (data.allow_update_after_expiry != null) {
                            message.allow_update_after_expiry = data.allow_update_after_expiry;
                        }
                        if (data.allow_update_after_misbehaviour != null) {
                            message.allow_update_after_misbehaviour = data.allow_update_after_misbehaviour;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.chain_id != null) {
                            data.chain_id = this.chain_id;
                        }
                        if (this.trust_level != null) {
                            data.trust_level = this.trust_level.toObject();
                        }
                        if (this.trusting_period != null) {
                            data.trusting_period = this.trusting_period.toObject();
                        }
                        if (this.unbonding_period != null) {
                            data.unbonding_period = this.unbonding_period.toObject();
                        }
                        if (this.max_clock_drift != null) {
                            data.max_clock_drift = this.max_clock_drift.toObject();
                        }
                        if (this.frozen_height != null) {
                            data.frozen_height = this.frozen_height.toObject();
                        }
                        if (this.latest_height != null) {
                            data.latest_height = this.latest_height.toObject();
                        }
                        if (this.proof_specs != null) {
                            data.proof_specs = this.proof_specs.map((item) => item.toObject());
                        }
                        if (this.upgrade_path != null) {
                            data.upgrade_path = this.upgrade_path;
                        }
                        if (this.allow_update_after_expiry != null) {
                            data.allow_update_after_expiry = this.allow_update_after_expiry;
                        }
                        if (this.allow_update_after_misbehaviour != null) {
                            data.allow_update_after_misbehaviour = this.allow_update_after_misbehaviour;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.chain_id === "string" && this.chain_id.length)
                            writer.writeString(1, this.chain_id);
                        if (this.trust_level !== undefined)
                            writer.writeMessage(2, this.trust_level, () => this.trust_level.serialize(writer));
                        if (this.trusting_period !== undefined)
                            writer.writeMessage(3, this.trusting_period, () => this.trusting_period.serialize(writer));
                        if (this.unbonding_period !== undefined)
                            writer.writeMessage(4, this.unbonding_period, () => this.unbonding_period.serialize(writer));
                        if (this.max_clock_drift !== undefined)
                            writer.writeMessage(5, this.max_clock_drift, () => this.max_clock_drift.serialize(writer));
                        if (this.frozen_height !== undefined)
                            writer.writeMessage(6, this.frozen_height, () => this.frozen_height.serialize(writer));
                        if (this.latest_height !== undefined)
                            writer.writeMessage(7, this.latest_height, () => this.latest_height.serialize(writer));
                        if (this.proof_specs !== undefined)
                            writer.writeRepeatedMessage(8, this.proof_specs, (item) => item.serialize(writer));
                        if (this.upgrade_path !== undefined)
                            writer.writeRepeatedString(9, this.upgrade_path);
                        if (this.allow_update_after_expiry !== undefined)
                            writer.writeBool(10, this.allow_update_after_expiry);
                        if (this.allow_update_after_misbehaviour !== undefined)
                            writer.writeBool(11, this.allow_update_after_misbehaviour);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ClientState();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.chain_id = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.trust_level, () => message.trust_level = Fraction.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.trusting_period, () => message.trusting_period = dependency_4.google.protobuf.Duration.deserialize(reader));
                                    break;
                                case 4:
                                    reader.readMessage(message.unbonding_period, () => message.unbonding_period = dependency_4.google.protobuf.Duration.deserialize(reader));
                                    break;
                                case 5:
                                    reader.readMessage(message.max_clock_drift, () => message.max_clock_drift = dependency_4.google.protobuf.Duration.deserialize(reader));
                                    break;
                                case 6:
                                    reader.readMessage(message.frozen_height, () => message.frozen_height = dependency_6.ibc.core.client.v1.Height.deserialize(reader));
                                    break;
                                case 7:
                                    reader.readMessage(message.latest_height, () => message.latest_height = dependency_6.ibc.core.client.v1.Height.deserialize(reader));
                                    break;
                                case 8:
                                    reader.readMessage(message.proof_specs, () => pb_1.Message.addToRepeatedWrapperField(message, 8, dependency_3.ics23.ProofSpec.deserialize(reader), dependency_3.ics23.ProofSpec));
                                    break;
                                case 9:
                                    pb_1.Message.addToRepeatedField(message, 9, reader.readString());
                                    break;
                                case 10:
                                    message.allow_update_after_expiry = reader.readBool();
                                    break;
                                case 11:
                                    message.allow_update_after_misbehaviour = reader.readBool();
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
                        return ClientState.deserialize(bytes);
                    }
                }
                v1.ClientState = ClientState;
                class ConsensusState extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("timestamp" in data && data.timestamp != undefined) {
                                this.timestamp = data.timestamp;
                            }
                            if ("root" in data && data.root != undefined) {
                                this.root = data.root;
                            }
                            if ("next_validators_hash" in data && data.next_validators_hash != undefined) {
                                this.next_validators_hash = data.next_validators_hash;
                            }
                        }
                    }
                    get timestamp() {
                        return pb_1.Message.getWrapperField(this, dependency_5.google.protobuf.Timestamp, 1);
                    }
                    set timestamp(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get root() {
                        return pb_1.Message.getWrapperField(this, dependency_7.ibc.core.commitment.v1.MerkleRoot, 2);
                    }
                    set root(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get next_validators_hash() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set next_validators_hash(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new ConsensusState({});
                        if (data.timestamp != null) {
                            message.timestamp = dependency_5.google.protobuf.Timestamp.fromObject(data.timestamp);
                        }
                        if (data.root != null) {
                            message.root = dependency_7.ibc.core.commitment.v1.MerkleRoot.fromObject(data.root);
                        }
                        if (data.next_validators_hash != null) {
                            message.next_validators_hash = data.next_validators_hash;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.timestamp != null) {
                            data.timestamp = this.timestamp.toObject();
                        }
                        if (this.root != null) {
                            data.root = this.root.toObject();
                        }
                        if (this.next_validators_hash != null) {
                            data.next_validators_hash = this.next_validators_hash;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.timestamp !== undefined)
                            writer.writeMessage(1, this.timestamp, () => this.timestamp.serialize(writer));
                        if (this.root !== undefined)
                            writer.writeMessage(2, this.root, () => this.root.serialize(writer));
                        if (this.next_validators_hash !== undefined)
                            writer.writeBytes(3, this.next_validators_hash);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ConsensusState();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.timestamp, () => message.timestamp = dependency_5.google.protobuf.Timestamp.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.root, () => message.root = dependency_7.ibc.core.commitment.v1.MerkleRoot.deserialize(reader));
                                    break;
                                case 3:
                                    message.next_validators_hash = reader.readBytes();
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
                        return ConsensusState.deserialize(bytes);
                    }
                }
                v1.ConsensusState = ConsensusState;
                class Misbehaviour extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_id" in data && data.client_id != undefined) {
                                this.client_id = data.client_id;
                            }
                            if ("header_1" in data && data.header_1 != undefined) {
                                this.header_1 = data.header_1;
                            }
                            if ("header_2" in data && data.header_2 != undefined) {
                                this.header_2 = data.header_2;
                            }
                        }
                    }
                    get client_id() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set client_id(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get header_1() {
                        return pb_1.Message.getWrapperField(this, Header, 2);
                    }
                    set header_1(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get header_2() {
                        return pb_1.Message.getWrapperField(this, Header, 3);
                    }
                    set header_2(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new Misbehaviour({});
                        if (data.client_id != null) {
                            message.client_id = data.client_id;
                        }
                        if (data.header_1 != null) {
                            message.header_1 = Header.fromObject(data.header_1);
                        }
                        if (data.header_2 != null) {
                            message.header_2 = Header.fromObject(data.header_2);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_id != null) {
                            data.client_id = this.client_id;
                        }
                        if (this.header_1 != null) {
                            data.header_1 = this.header_1.toObject();
                        }
                        if (this.header_2 != null) {
                            data.header_2 = this.header_2.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.client_id === "string" && this.client_id.length)
                            writer.writeString(1, this.client_id);
                        if (this.header_1 !== undefined)
                            writer.writeMessage(2, this.header_1, () => this.header_1.serialize(writer));
                        if (this.header_2 !== undefined)
                            writer.writeMessage(3, this.header_2, () => this.header_2.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Misbehaviour();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.client_id = reader.readString();
                                    break;
                                case 2:
                                    reader.readMessage(message.header_1, () => message.header_1 = Header.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.header_2, () => message.header_2 = Header.deserialize(reader));
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
                        return Misbehaviour.deserialize(bytes);
                    }
                }
                v1.Misbehaviour = Misbehaviour;
                class Header extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("signed_header" in data && data.signed_header != undefined) {
                                this.signed_header = data.signed_header;
                            }
                            if ("validator_set" in data && data.validator_set != undefined) {
                                this.validator_set = data.validator_set;
                            }
                            if ("trusted_height" in data && data.trusted_height != undefined) {
                                this.trusted_height = data.trusted_height;
                            }
                            if ("trusted_validators" in data && data.trusted_validators != undefined) {
                                this.trusted_validators = data.trusted_validators;
                            }
                        }
                    }
                    get signed_header() {
                        return pb_1.Message.getWrapperField(this, dependency_2.tendermint.types.SignedHeader, 1);
                    }
                    set signed_header(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get validator_set() {
                        return pb_1.Message.getWrapperField(this, dependency_1.tendermint.types.ValidatorSet, 2);
                    }
                    set validator_set(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get trusted_height() {
                        return pb_1.Message.getWrapperField(this, dependency_6.ibc.core.client.v1.Height, 3);
                    }
                    set trusted_height(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    get trusted_validators() {
                        return pb_1.Message.getWrapperField(this, dependency_1.tendermint.types.ValidatorSet, 4);
                    }
                    set trusted_validators(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new Header({});
                        if (data.signed_header != null) {
                            message.signed_header = dependency_2.tendermint.types.SignedHeader.fromObject(data.signed_header);
                        }
                        if (data.validator_set != null) {
                            message.validator_set = dependency_1.tendermint.types.ValidatorSet.fromObject(data.validator_set);
                        }
                        if (data.trusted_height != null) {
                            message.trusted_height = dependency_6.ibc.core.client.v1.Height.fromObject(data.trusted_height);
                        }
                        if (data.trusted_validators != null) {
                            message.trusted_validators = dependency_1.tendermint.types.ValidatorSet.fromObject(data.trusted_validators);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.signed_header != null) {
                            data.signed_header = this.signed_header.toObject();
                        }
                        if (this.validator_set != null) {
                            data.validator_set = this.validator_set.toObject();
                        }
                        if (this.trusted_height != null) {
                            data.trusted_height = this.trusted_height.toObject();
                        }
                        if (this.trusted_validators != null) {
                            data.trusted_validators = this.trusted_validators.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.signed_header !== undefined)
                            writer.writeMessage(1, this.signed_header, () => this.signed_header.serialize(writer));
                        if (this.validator_set !== undefined)
                            writer.writeMessage(2, this.validator_set, () => this.validator_set.serialize(writer));
                        if (this.trusted_height !== undefined)
                            writer.writeMessage(3, this.trusted_height, () => this.trusted_height.serialize(writer));
                        if (this.trusted_validators !== undefined)
                            writer.writeMessage(4, this.trusted_validators, () => this.trusted_validators.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Header();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.signed_header, () => message.signed_header = dependency_2.tendermint.types.SignedHeader.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.validator_set, () => message.validator_set = dependency_1.tendermint.types.ValidatorSet.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.trusted_height, () => message.trusted_height = dependency_6.ibc.core.client.v1.Height.deserialize(reader));
                                    break;
                                case 4:
                                    reader.readMessage(message.trusted_validators, () => message.trusted_validators = dependency_1.tendermint.types.ValidatorSet.deserialize(reader));
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
                        return Header.deserialize(bytes);
                    }
                }
                v1.Header = Header;
                class Fraction extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("numerator" in data && data.numerator != undefined) {
                                this.numerator = data.numerator;
                            }
                            if ("denominator" in data && data.denominator != undefined) {
                                this.denominator = data.denominator;
                            }
                        }
                    }
                    get numerator() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set numerator(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get denominator() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set denominator(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new Fraction({});
                        if (data.numerator != null) {
                            message.numerator = data.numerator;
                        }
                        if (data.denominator != null) {
                            message.denominator = data.denominator;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.numerator != null) {
                            data.numerator = this.numerator;
                        }
                        if (this.denominator != null) {
                            data.denominator = this.denominator;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.numerator !== undefined)
                            writer.writeUint64(1, this.numerator);
                        if (this.denominator !== undefined)
                            writer.writeUint64(2, this.denominator);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Fraction();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.numerator = reader.readUint64();
                                    break;
                                case 2:
                                    message.denominator = reader.readUint64();
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
                        return Fraction.deserialize(bytes);
                    }
                }
                v1.Fraction = Fraction;
            })(v1 = tendermint.v1 || (tendermint.v1 = {}));
        })(tendermint = lightclients.tendermint || (lightclients.tendermint = {}));
    })(lightclients = ibc.lightclients || (ibc.lightclients = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=tendermint.js.map