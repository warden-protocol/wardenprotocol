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
const dependency_2 = __importStar(require("./../crypto/keys"));
const pb_1 = __importStar(require("google-protobuf"));
var tendermint;
(function (tendermint) {
    var types;
    (function (types) {
        class ValidatorSet extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("validators" in data && data.validators != undefined) {
                        this.validators = data.validators;
                    }
                    if ("proposer" in data && data.proposer != undefined) {
                        this.proposer = data.proposer;
                    }
                    if ("total_voting_power" in data && data.total_voting_power != undefined) {
                        this.total_voting_power = data.total_voting_power;
                    }
                }
            }
            get validators() {
                return pb_1.Message.getRepeatedWrapperField(this, Validator, 1);
            }
            set validators(value) {
                pb_1.Message.setRepeatedWrapperField(this, 1, value);
            }
            get proposer() {
                return pb_1.Message.getWrapperField(this, Validator, 2);
            }
            set proposer(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            get total_voting_power() {
                return pb_1.Message.getField(this, 3);
            }
            set total_voting_power(value) {
                pb_1.Message.setField(this, 3, value);
            }
            static fromObject(data) {
                const message = new ValidatorSet({});
                if (data.validators != null) {
                    message.validators = data.validators.map(item => Validator.fromObject(item));
                }
                if (data.proposer != null) {
                    message.proposer = Validator.fromObject(data.proposer);
                }
                if (data.total_voting_power != null) {
                    message.total_voting_power = data.total_voting_power;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.validators != null) {
                    data.validators = this.validators.map((item) => item.toObject());
                }
                if (this.proposer != null) {
                    data.proposer = this.proposer.toObject();
                }
                if (this.total_voting_power != null) {
                    data.total_voting_power = this.total_voting_power;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.validators !== undefined)
                    writer.writeRepeatedMessage(1, this.validators, (item) => item.serialize(writer));
                if (this.proposer !== undefined)
                    writer.writeMessage(2, this.proposer, () => this.proposer.serialize(writer));
                if (this.total_voting_power !== undefined)
                    writer.writeInt64(3, this.total_voting_power);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ValidatorSet();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.validators, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Validator.deserialize(reader), Validator));
                            break;
                        case 2:
                            reader.readMessage(message.proposer, () => message.proposer = Validator.deserialize(reader));
                            break;
                        case 3:
                            message.total_voting_power = reader.readInt64();
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
                return ValidatorSet.deserialize(bytes);
            }
        }
        types.ValidatorSet = ValidatorSet;
        class Validator extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("address" in data && data.address != undefined) {
                        this.address = data.address;
                    }
                    if ("pub_key" in data && data.pub_key != undefined) {
                        this.pub_key = data.pub_key;
                    }
                    if ("voting_power" in data && data.voting_power != undefined) {
                        this.voting_power = data.voting_power;
                    }
                    if ("proposer_priority" in data && data.proposer_priority != undefined) {
                        this.proposer_priority = data.proposer_priority;
                    }
                }
            }
            get address() {
                return pb_1.Message.getField(this, 1);
            }
            set address(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get pub_key() {
                return pb_1.Message.getWrapperField(this, dependency_2.tendermint.crypto.PublicKey, 2);
            }
            set pub_key(value) {
                pb_1.Message.setWrapperField(this, 2, value);
            }
            get voting_power() {
                return pb_1.Message.getField(this, 3);
            }
            set voting_power(value) {
                pb_1.Message.setField(this, 3, value);
            }
            get proposer_priority() {
                return pb_1.Message.getField(this, 4);
            }
            set proposer_priority(value) {
                pb_1.Message.setField(this, 4, value);
            }
            static fromObject(data) {
                const message = new Validator({});
                if (data.address != null) {
                    message.address = data.address;
                }
                if (data.pub_key != null) {
                    message.pub_key = dependency_2.tendermint.crypto.PublicKey.fromObject(data.pub_key);
                }
                if (data.voting_power != null) {
                    message.voting_power = data.voting_power;
                }
                if (data.proposer_priority != null) {
                    message.proposer_priority = data.proposer_priority;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.address != null) {
                    data.address = this.address;
                }
                if (this.pub_key != null) {
                    data.pub_key = this.pub_key.toObject();
                }
                if (this.voting_power != null) {
                    data.voting_power = this.voting_power;
                }
                if (this.proposer_priority != null) {
                    data.proposer_priority = this.proposer_priority;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.address !== undefined)
                    writer.writeBytes(1, this.address);
                if (this.pub_key !== undefined)
                    writer.writeMessage(2, this.pub_key, () => this.pub_key.serialize(writer));
                if (this.voting_power !== undefined)
                    writer.writeInt64(3, this.voting_power);
                if (this.proposer_priority !== undefined)
                    writer.writeInt64(4, this.proposer_priority);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Validator();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.address = reader.readBytes();
                            break;
                        case 2:
                            reader.readMessage(message.pub_key, () => message.pub_key = dependency_2.tendermint.crypto.PublicKey.deserialize(reader));
                            break;
                        case 3:
                            message.voting_power = reader.readInt64();
                            break;
                        case 4:
                            message.proposer_priority = reader.readInt64();
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
                return Validator.deserialize(bytes);
            }
        }
        types.Validator = Validator;
        class SimpleValidator extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("pub_key" in data && data.pub_key != undefined) {
                        this.pub_key = data.pub_key;
                    }
                    if ("voting_power" in data && data.voting_power != undefined) {
                        this.voting_power = data.voting_power;
                    }
                }
            }
            get pub_key() {
                return pb_1.Message.getWrapperField(this, dependency_2.tendermint.crypto.PublicKey, 1);
            }
            set pub_key(value) {
                pb_1.Message.setWrapperField(this, 1, value);
            }
            get voting_power() {
                return pb_1.Message.getField(this, 2);
            }
            set voting_power(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new SimpleValidator({});
                if (data.pub_key != null) {
                    message.pub_key = dependency_2.tendermint.crypto.PublicKey.fromObject(data.pub_key);
                }
                if (data.voting_power != null) {
                    message.voting_power = data.voting_power;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.pub_key != null) {
                    data.pub_key = this.pub_key.toObject();
                }
                if (this.voting_power != null) {
                    data.voting_power = this.voting_power;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.pub_key !== undefined)
                    writer.writeMessage(1, this.pub_key, () => this.pub_key.serialize(writer));
                if (this.voting_power !== undefined)
                    writer.writeInt64(2, this.voting_power);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SimpleValidator();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.pub_key, () => message.pub_key = dependency_2.tendermint.crypto.PublicKey.deserialize(reader));
                            break;
                        case 2:
                            message.voting_power = reader.readInt64();
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
                return SimpleValidator.deserialize(bytes);
            }
        }
        types.SimpleValidator = SimpleValidator;
    })(types = tendermint.types || (tendermint.types = {}));
})(tendermint = exports.tendermint || (exports.tendermint = {}));
//# sourceMappingURL=validator.js.map