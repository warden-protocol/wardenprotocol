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
const dependency_2 = __importStar(require("./gov"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var gov;
    (function (gov) {
        var v1beta1;
        (function (v1beta1) {
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2, 3, 4], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("starting_proposal_id" in data && data.starting_proposal_id != undefined) {
                            this.starting_proposal_id = data.starting_proposal_id;
                        }
                        if ("deposits" in data && data.deposits != undefined) {
                            this.deposits = data.deposits;
                        }
                        if ("votes" in data && data.votes != undefined) {
                            this.votes = data.votes;
                        }
                        if ("proposals" in data && data.proposals != undefined) {
                            this.proposals = data.proposals;
                        }
                        if ("deposit_params" in data && data.deposit_params != undefined) {
                            this.deposit_params = data.deposit_params;
                        }
                        if ("voting_params" in data && data.voting_params != undefined) {
                            this.voting_params = data.voting_params;
                        }
                        if ("tally_params" in data && data.tally_params != undefined) {
                            this.tally_params = data.tally_params;
                        }
                    }
                }
                get starting_proposal_id() {
                    return pb_1.Message.getField(this, 1);
                }
                set starting_proposal_id(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get deposits() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.gov.v1beta1.Deposit, 2);
                }
                set deposits(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                get votes() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.gov.v1beta1.Vote, 3);
                }
                set votes(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                get proposals() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.cosmos.gov.v1beta1.Proposal, 4);
                }
                set proposals(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 4, value);
                }
                get deposit_params() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.gov.v1beta1.DepositParams, 5);
                }
                set deposit_params(value) {
                    pb_1.Message.setWrapperField(this, 5, value);
                }
                get voting_params() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.gov.v1beta1.VotingParams, 6);
                }
                set voting_params(value) {
                    pb_1.Message.setWrapperField(this, 6, value);
                }
                get tally_params() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.gov.v1beta1.TallyParams, 7);
                }
                set tally_params(value) {
                    pb_1.Message.setWrapperField(this, 7, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.starting_proposal_id != null) {
                        message.starting_proposal_id = data.starting_proposal_id;
                    }
                    if (data.deposits != null) {
                        message.deposits = data.deposits.map(item => dependency_2.cosmos.gov.v1beta1.Deposit.fromObject(item));
                    }
                    if (data.votes != null) {
                        message.votes = data.votes.map(item => dependency_2.cosmos.gov.v1beta1.Vote.fromObject(item));
                    }
                    if (data.proposals != null) {
                        message.proposals = data.proposals.map(item => dependency_2.cosmos.gov.v1beta1.Proposal.fromObject(item));
                    }
                    if (data.deposit_params != null) {
                        message.deposit_params = dependency_2.cosmos.gov.v1beta1.DepositParams.fromObject(data.deposit_params);
                    }
                    if (data.voting_params != null) {
                        message.voting_params = dependency_2.cosmos.gov.v1beta1.VotingParams.fromObject(data.voting_params);
                    }
                    if (data.tally_params != null) {
                        message.tally_params = dependency_2.cosmos.gov.v1beta1.TallyParams.fromObject(data.tally_params);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.starting_proposal_id != null) {
                        data.starting_proposal_id = this.starting_proposal_id;
                    }
                    if (this.deposits != null) {
                        data.deposits = this.deposits.map((item) => item.toObject());
                    }
                    if (this.votes != null) {
                        data.votes = this.votes.map((item) => item.toObject());
                    }
                    if (this.proposals != null) {
                        data.proposals = this.proposals.map((item) => item.toObject());
                    }
                    if (this.deposit_params != null) {
                        data.deposit_params = this.deposit_params.toObject();
                    }
                    if (this.voting_params != null) {
                        data.voting_params = this.voting_params.toObject();
                    }
                    if (this.tally_params != null) {
                        data.tally_params = this.tally_params.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.starting_proposal_id !== undefined)
                        writer.writeUint64(1, this.starting_proposal_id);
                    if (this.deposits !== undefined)
                        writer.writeRepeatedMessage(2, this.deposits, (item) => item.serialize(writer));
                    if (this.votes !== undefined)
                        writer.writeRepeatedMessage(3, this.votes, (item) => item.serialize(writer));
                    if (this.proposals !== undefined)
                        writer.writeRepeatedMessage(4, this.proposals, (item) => item.serialize(writer));
                    if (this.deposit_params !== undefined)
                        writer.writeMessage(5, this.deposit_params, () => this.deposit_params.serialize(writer));
                    if (this.voting_params !== undefined)
                        writer.writeMessage(6, this.voting_params, () => this.voting_params.serialize(writer));
                    if (this.tally_params !== undefined)
                        writer.writeMessage(7, this.tally_params, () => this.tally_params.serialize(writer));
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
                                message.starting_proposal_id = reader.readUint64();
                                break;
                            case 2:
                                reader.readMessage(message.deposits, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_2.cosmos.gov.v1beta1.Deposit.deserialize(reader), dependency_2.cosmos.gov.v1beta1.Deposit));
                                break;
                            case 3:
                                reader.readMessage(message.votes, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_2.cosmos.gov.v1beta1.Vote.deserialize(reader), dependency_2.cosmos.gov.v1beta1.Vote));
                                break;
                            case 4:
                                reader.readMessage(message.proposals, () => pb_1.Message.addToRepeatedWrapperField(message, 4, dependency_2.cosmos.gov.v1beta1.Proposal.deserialize(reader), dependency_2.cosmos.gov.v1beta1.Proposal));
                                break;
                            case 5:
                                reader.readMessage(message.deposit_params, () => message.deposit_params = dependency_2.cosmos.gov.v1beta1.DepositParams.deserialize(reader));
                                break;
                            case 6:
                                reader.readMessage(message.voting_params, () => message.voting_params = dependency_2.cosmos.gov.v1beta1.VotingParams.deserialize(reader));
                                break;
                            case 7:
                                reader.readMessage(message.tally_params, () => message.tally_params = dependency_2.cosmos.gov.v1beta1.TallyParams.deserialize(reader));
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
        })(v1beta1 = gov.v1beta1 || (gov.v1beta1 = {}));
    })(gov = cosmos.gov || (cosmos.gov = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=genesis.js.map