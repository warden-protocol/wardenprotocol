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
const dependency_1 = __importStar(require("./../../base/v1beta1/coin"));
const dependency_4 = __importStar(require("./../../../google/protobuf/timestamp"));
const dependency_5 = __importStar(require("./../../../google/protobuf/any"));
const dependency_6 = __importStar(require("./../../../google/protobuf/duration"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var gov;
    (function (gov) {
        var v1beta1;
        (function (v1beta1) {
            let VoteOption;
            (function (VoteOption) {
                VoteOption[VoteOption["VOTE_OPTION_UNSPECIFIED"] = 0] = "VOTE_OPTION_UNSPECIFIED";
                VoteOption[VoteOption["VOTE_OPTION_YES"] = 1] = "VOTE_OPTION_YES";
                VoteOption[VoteOption["VOTE_OPTION_ABSTAIN"] = 2] = "VOTE_OPTION_ABSTAIN";
                VoteOption[VoteOption["VOTE_OPTION_NO"] = 3] = "VOTE_OPTION_NO";
                VoteOption[VoteOption["VOTE_OPTION_NO_WITH_VETO"] = 4] = "VOTE_OPTION_NO_WITH_VETO";
            })(VoteOption = v1beta1.VoteOption || (v1beta1.VoteOption = {}));
            let ProposalStatus;
            (function (ProposalStatus) {
                ProposalStatus[ProposalStatus["PROPOSAL_STATUS_UNSPECIFIED"] = 0] = "PROPOSAL_STATUS_UNSPECIFIED";
                ProposalStatus[ProposalStatus["PROPOSAL_STATUS_DEPOSIT_PERIOD"] = 1] = "PROPOSAL_STATUS_DEPOSIT_PERIOD";
                ProposalStatus[ProposalStatus["PROPOSAL_STATUS_VOTING_PERIOD"] = 2] = "PROPOSAL_STATUS_VOTING_PERIOD";
                ProposalStatus[ProposalStatus["PROPOSAL_STATUS_PASSED"] = 3] = "PROPOSAL_STATUS_PASSED";
                ProposalStatus[ProposalStatus["PROPOSAL_STATUS_REJECTED"] = 4] = "PROPOSAL_STATUS_REJECTED";
                ProposalStatus[ProposalStatus["PROPOSAL_STATUS_FAILED"] = 5] = "PROPOSAL_STATUS_FAILED";
            })(ProposalStatus = v1beta1.ProposalStatus || (v1beta1.ProposalStatus = {}));
            class WeightedVoteOption extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("option" in data && data.option != undefined) {
                            this.option = data.option;
                        }
                        if ("weight" in data && data.weight != undefined) {
                            this.weight = data.weight;
                        }
                    }
                }
                get option() {
                    return pb_1.Message.getField(this, 1);
                }
                set option(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get weight() {
                    return pb_1.Message.getField(this, 2);
                }
                set weight(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new WeightedVoteOption({});
                    if (data.option != null) {
                        message.option = data.option;
                    }
                    if (data.weight != null) {
                        message.weight = data.weight;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.option != null) {
                        data.option = this.option;
                    }
                    if (this.weight != null) {
                        data.weight = this.weight;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.option !== undefined)
                        writer.writeEnum(1, this.option);
                    if (typeof this.weight === "string" && this.weight.length)
                        writer.writeString(2, this.weight);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new WeightedVoteOption();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.option = reader.readEnum();
                                break;
                            case 2:
                                message.weight = reader.readString();
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
                    return WeightedVoteOption.deserialize(bytes);
                }
            }
            v1beta1.WeightedVoteOption = WeightedVoteOption;
            class TextProposal extends pb_1.Message {
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
                    const message = new TextProposal({});
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
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TextProposal();
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
                    return TextProposal.deserialize(bytes);
                }
            }
            v1beta1.TextProposal = TextProposal;
            class Deposit extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("proposal_id" in data && data.proposal_id != undefined) {
                            this.proposal_id = data.proposal_id;
                        }
                        if ("depositor" in data && data.depositor != undefined) {
                            this.depositor = data.depositor;
                        }
                        if ("amount" in data && data.amount != undefined) {
                            this.amount = data.amount;
                        }
                    }
                }
                get proposal_id() {
                    return pb_1.Message.getField(this, 1);
                }
                set proposal_id(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get depositor() {
                    return pb_1.Message.getField(this, 2);
                }
                set depositor(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get amount() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_1.cosmos.base.v1beta1.Coin, 3);
                }
                set amount(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new Deposit({});
                    if (data.proposal_id != null) {
                        message.proposal_id = data.proposal_id;
                    }
                    if (data.depositor != null) {
                        message.depositor = data.depositor;
                    }
                    if (data.amount != null) {
                        message.amount = data.amount.map(item => dependency_1.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.proposal_id != null) {
                        data.proposal_id = this.proposal_id;
                    }
                    if (this.depositor != null) {
                        data.depositor = this.depositor;
                    }
                    if (this.amount != null) {
                        data.amount = this.amount.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.proposal_id !== undefined)
                        writer.writeUint64(1, this.proposal_id);
                    if (typeof this.depositor === "string" && this.depositor.length)
                        writer.writeString(2, this.depositor);
                    if (this.amount !== undefined)
                        writer.writeRepeatedMessage(3, this.amount, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Deposit();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.proposal_id = reader.readUint64();
                                break;
                            case 2:
                                message.depositor = reader.readString();
                                break;
                            case 3:
                                reader.readMessage(message.amount, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_1.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_1.cosmos.base.v1beta1.Coin));
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
                    return Deposit.deserialize(bytes);
                }
            }
            v1beta1.Deposit = Deposit;
            class Proposal extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [7], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("proposal_id" in data && data.proposal_id != undefined) {
                            this.proposal_id = data.proposal_id;
                        }
                        if ("content" in data && data.content != undefined) {
                            this.content = data.content;
                        }
                        if ("status" in data && data.status != undefined) {
                            this.status = data.status;
                        }
                        if ("final_tally_result" in data && data.final_tally_result != undefined) {
                            this.final_tally_result = data.final_tally_result;
                        }
                        if ("submit_time" in data && data.submit_time != undefined) {
                            this.submit_time = data.submit_time;
                        }
                        if ("deposit_end_time" in data && data.deposit_end_time != undefined) {
                            this.deposit_end_time = data.deposit_end_time;
                        }
                        if ("total_deposit" in data && data.total_deposit != undefined) {
                            this.total_deposit = data.total_deposit;
                        }
                        if ("voting_start_time" in data && data.voting_start_time != undefined) {
                            this.voting_start_time = data.voting_start_time;
                        }
                        if ("voting_end_time" in data && data.voting_end_time != undefined) {
                            this.voting_end_time = data.voting_end_time;
                        }
                    }
                }
                get proposal_id() {
                    return pb_1.Message.getField(this, 1);
                }
                set proposal_id(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get content() {
                    return pb_1.Message.getWrapperField(this, dependency_5.google.protobuf.Any, 2);
                }
                set content(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                get status() {
                    return pb_1.Message.getField(this, 3);
                }
                set status(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get final_tally_result() {
                    return pb_1.Message.getWrapperField(this, TallyResult, 4);
                }
                set final_tally_result(value) {
                    pb_1.Message.setWrapperField(this, 4, value);
                }
                get submit_time() {
                    return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Timestamp, 5);
                }
                set submit_time(value) {
                    pb_1.Message.setWrapperField(this, 5, value);
                }
                get deposit_end_time() {
                    return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Timestamp, 6);
                }
                set deposit_end_time(value) {
                    pb_1.Message.setWrapperField(this, 6, value);
                }
                get total_deposit() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_1.cosmos.base.v1beta1.Coin, 7);
                }
                set total_deposit(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 7, value);
                }
                get voting_start_time() {
                    return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Timestamp, 8);
                }
                set voting_start_time(value) {
                    pb_1.Message.setWrapperField(this, 8, value);
                }
                get voting_end_time() {
                    return pb_1.Message.getWrapperField(this, dependency_4.google.protobuf.Timestamp, 9);
                }
                set voting_end_time(value) {
                    pb_1.Message.setWrapperField(this, 9, value);
                }
                static fromObject(data) {
                    const message = new Proposal({});
                    if (data.proposal_id != null) {
                        message.proposal_id = data.proposal_id;
                    }
                    if (data.content != null) {
                        message.content = dependency_5.google.protobuf.Any.fromObject(data.content);
                    }
                    if (data.status != null) {
                        message.status = data.status;
                    }
                    if (data.final_tally_result != null) {
                        message.final_tally_result = TallyResult.fromObject(data.final_tally_result);
                    }
                    if (data.submit_time != null) {
                        message.submit_time = dependency_4.google.protobuf.Timestamp.fromObject(data.submit_time);
                    }
                    if (data.deposit_end_time != null) {
                        message.deposit_end_time = dependency_4.google.protobuf.Timestamp.fromObject(data.deposit_end_time);
                    }
                    if (data.total_deposit != null) {
                        message.total_deposit = data.total_deposit.map(item => dependency_1.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.voting_start_time != null) {
                        message.voting_start_time = dependency_4.google.protobuf.Timestamp.fromObject(data.voting_start_time);
                    }
                    if (data.voting_end_time != null) {
                        message.voting_end_time = dependency_4.google.protobuf.Timestamp.fromObject(data.voting_end_time);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.proposal_id != null) {
                        data.proposal_id = this.proposal_id;
                    }
                    if (this.content != null) {
                        data.content = this.content.toObject();
                    }
                    if (this.status != null) {
                        data.status = this.status;
                    }
                    if (this.final_tally_result != null) {
                        data.final_tally_result = this.final_tally_result.toObject();
                    }
                    if (this.submit_time != null) {
                        data.submit_time = this.submit_time.toObject();
                    }
                    if (this.deposit_end_time != null) {
                        data.deposit_end_time = this.deposit_end_time.toObject();
                    }
                    if (this.total_deposit != null) {
                        data.total_deposit = this.total_deposit.map((item) => item.toObject());
                    }
                    if (this.voting_start_time != null) {
                        data.voting_start_time = this.voting_start_time.toObject();
                    }
                    if (this.voting_end_time != null) {
                        data.voting_end_time = this.voting_end_time.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.proposal_id !== undefined)
                        writer.writeUint64(1, this.proposal_id);
                    if (this.content !== undefined)
                        writer.writeMessage(2, this.content, () => this.content.serialize(writer));
                    if (this.status !== undefined)
                        writer.writeEnum(3, this.status);
                    if (this.final_tally_result !== undefined)
                        writer.writeMessage(4, this.final_tally_result, () => this.final_tally_result.serialize(writer));
                    if (this.submit_time !== undefined)
                        writer.writeMessage(5, this.submit_time, () => this.submit_time.serialize(writer));
                    if (this.deposit_end_time !== undefined)
                        writer.writeMessage(6, this.deposit_end_time, () => this.deposit_end_time.serialize(writer));
                    if (this.total_deposit !== undefined)
                        writer.writeRepeatedMessage(7, this.total_deposit, (item) => item.serialize(writer));
                    if (this.voting_start_time !== undefined)
                        writer.writeMessage(8, this.voting_start_time, () => this.voting_start_time.serialize(writer));
                    if (this.voting_end_time !== undefined)
                        writer.writeMessage(9, this.voting_end_time, () => this.voting_end_time.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Proposal();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.proposal_id = reader.readUint64();
                                break;
                            case 2:
                                reader.readMessage(message.content, () => message.content = dependency_5.google.protobuf.Any.deserialize(reader));
                                break;
                            case 3:
                                message.status = reader.readEnum();
                                break;
                            case 4:
                                reader.readMessage(message.final_tally_result, () => message.final_tally_result = TallyResult.deserialize(reader));
                                break;
                            case 5:
                                reader.readMessage(message.submit_time, () => message.submit_time = dependency_4.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 6:
                                reader.readMessage(message.deposit_end_time, () => message.deposit_end_time = dependency_4.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 7:
                                reader.readMessage(message.total_deposit, () => pb_1.Message.addToRepeatedWrapperField(message, 7, dependency_1.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_1.cosmos.base.v1beta1.Coin));
                                break;
                            case 8:
                                reader.readMessage(message.voting_start_time, () => message.voting_start_time = dependency_4.google.protobuf.Timestamp.deserialize(reader));
                                break;
                            case 9:
                                reader.readMessage(message.voting_end_time, () => message.voting_end_time = dependency_4.google.protobuf.Timestamp.deserialize(reader));
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
                    return Proposal.deserialize(bytes);
                }
            }
            v1beta1.Proposal = Proposal;
            class TallyResult extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("yes" in data && data.yes != undefined) {
                            this.yes = data.yes;
                        }
                        if ("abstain" in data && data.abstain != undefined) {
                            this.abstain = data.abstain;
                        }
                        if ("no" in data && data.no != undefined) {
                            this.no = data.no;
                        }
                        if ("no_with_veto" in data && data.no_with_veto != undefined) {
                            this.no_with_veto = data.no_with_veto;
                        }
                    }
                }
                get yes() {
                    return pb_1.Message.getField(this, 1);
                }
                set yes(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get abstain() {
                    return pb_1.Message.getField(this, 2);
                }
                set abstain(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get no() {
                    return pb_1.Message.getField(this, 3);
                }
                set no(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get no_with_veto() {
                    return pb_1.Message.getField(this, 4);
                }
                set no_with_veto(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new TallyResult({});
                    if (data.yes != null) {
                        message.yes = data.yes;
                    }
                    if (data.abstain != null) {
                        message.abstain = data.abstain;
                    }
                    if (data.no != null) {
                        message.no = data.no;
                    }
                    if (data.no_with_veto != null) {
                        message.no_with_veto = data.no_with_veto;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.yes != null) {
                        data.yes = this.yes;
                    }
                    if (this.abstain != null) {
                        data.abstain = this.abstain;
                    }
                    if (this.no != null) {
                        data.no = this.no;
                    }
                    if (this.no_with_veto != null) {
                        data.no_with_veto = this.no_with_veto;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.yes === "string" && this.yes.length)
                        writer.writeString(1, this.yes);
                    if (typeof this.abstain === "string" && this.abstain.length)
                        writer.writeString(2, this.abstain);
                    if (typeof this.no === "string" && this.no.length)
                        writer.writeString(3, this.no);
                    if (typeof this.no_with_veto === "string" && this.no_with_veto.length)
                        writer.writeString(4, this.no_with_veto);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TallyResult();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.yes = reader.readString();
                                break;
                            case 2:
                                message.abstain = reader.readString();
                                break;
                            case 3:
                                message.no = reader.readString();
                                break;
                            case 4:
                                message.no_with_veto = reader.readString();
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
                    return TallyResult.deserialize(bytes);
                }
            }
            v1beta1.TallyResult = TallyResult;
            class Vote extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("proposal_id" in data && data.proposal_id != undefined) {
                            this.proposal_id = data.proposal_id;
                        }
                        if ("voter" in data && data.voter != undefined) {
                            this.voter = data.voter;
                        }
                        if ("option" in data && data.option != undefined) {
                            this.option = data.option;
                        }
                        if ("options" in data && data.options != undefined) {
                            this.options = data.options;
                        }
                    }
                }
                get proposal_id() {
                    return pb_1.Message.getField(this, 1);
                }
                set proposal_id(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get voter() {
                    return pb_1.Message.getField(this, 2);
                }
                set voter(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get option() {
                    return pb_1.Message.getField(this, 3);
                }
                set option(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get options() {
                    return pb_1.Message.getRepeatedWrapperField(this, WeightedVoteOption, 4);
                }
                set options(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new Vote({});
                    if (data.proposal_id != null) {
                        message.proposal_id = data.proposal_id;
                    }
                    if (data.voter != null) {
                        message.voter = data.voter;
                    }
                    if (data.option != null) {
                        message.option = data.option;
                    }
                    if (data.options != null) {
                        message.options = data.options.map(item => WeightedVoteOption.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.proposal_id != null) {
                        data.proposal_id = this.proposal_id;
                    }
                    if (this.voter != null) {
                        data.voter = this.voter;
                    }
                    if (this.option != null) {
                        data.option = this.option;
                    }
                    if (this.options != null) {
                        data.options = this.options.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.proposal_id !== undefined)
                        writer.writeUint64(1, this.proposal_id);
                    if (typeof this.voter === "string" && this.voter.length)
                        writer.writeString(2, this.voter);
                    if (this.option !== undefined)
                        writer.writeEnum(3, this.option);
                    if (this.options !== undefined)
                        writer.writeRepeatedMessage(4, this.options, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Vote();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.proposal_id = reader.readUint64();
                                break;
                            case 2:
                                message.voter = reader.readString();
                                break;
                            case 3:
                                message.option = reader.readEnum();
                                break;
                            case 4:
                                reader.readMessage(message.options, () => pb_1.Message.addToRepeatedWrapperField(message, 4, WeightedVoteOption.deserialize(reader), WeightedVoteOption));
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
                    return Vote.deserialize(bytes);
                }
            }
            v1beta1.Vote = Vote;
            class DepositParams extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("min_deposit" in data && data.min_deposit != undefined) {
                            this.min_deposit = data.min_deposit;
                        }
                        if ("max_deposit_period" in data && data.max_deposit_period != undefined) {
                            this.max_deposit_period = data.max_deposit_period;
                        }
                    }
                }
                get min_deposit() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_1.cosmos.base.v1beta1.Coin, 1);
                }
                set min_deposit(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                get max_deposit_period() {
                    return pb_1.Message.getWrapperField(this, dependency_6.google.protobuf.Duration, 2);
                }
                set max_deposit_period(value) {
                    pb_1.Message.setWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new DepositParams({});
                    if (data.min_deposit != null) {
                        message.min_deposit = data.min_deposit.map(item => dependency_1.cosmos.base.v1beta1.Coin.fromObject(item));
                    }
                    if (data.max_deposit_period != null) {
                        message.max_deposit_period = dependency_6.google.protobuf.Duration.fromObject(data.max_deposit_period);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.min_deposit != null) {
                        data.min_deposit = this.min_deposit.map((item) => item.toObject());
                    }
                    if (this.max_deposit_period != null) {
                        data.max_deposit_period = this.max_deposit_period.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.min_deposit !== undefined)
                        writer.writeRepeatedMessage(1, this.min_deposit, (item) => item.serialize(writer));
                    if (this.max_deposit_period !== undefined)
                        writer.writeMessage(2, this.max_deposit_period, () => this.max_deposit_period.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DepositParams();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.min_deposit, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_1.cosmos.base.v1beta1.Coin.deserialize(reader), dependency_1.cosmos.base.v1beta1.Coin));
                                break;
                            case 2:
                                reader.readMessage(message.max_deposit_period, () => message.max_deposit_period = dependency_6.google.protobuf.Duration.deserialize(reader));
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
                    return DepositParams.deserialize(bytes);
                }
            }
            v1beta1.DepositParams = DepositParams;
            class VotingParams extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("voting_period" in data && data.voting_period != undefined) {
                            this.voting_period = data.voting_period;
                        }
                    }
                }
                get voting_period() {
                    return pb_1.Message.getWrapperField(this, dependency_6.google.protobuf.Duration, 1);
                }
                set voting_period(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new VotingParams({});
                    if (data.voting_period != null) {
                        message.voting_period = dependency_6.google.protobuf.Duration.fromObject(data.voting_period);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.voting_period != null) {
                        data.voting_period = this.voting_period.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.voting_period !== undefined)
                        writer.writeMessage(1, this.voting_period, () => this.voting_period.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new VotingParams();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.voting_period, () => message.voting_period = dependency_6.google.protobuf.Duration.deserialize(reader));
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
                    return VotingParams.deserialize(bytes);
                }
            }
            v1beta1.VotingParams = VotingParams;
            class TallyParams extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("quorum" in data && data.quorum != undefined) {
                            this.quorum = data.quorum;
                        }
                        if ("threshold" in data && data.threshold != undefined) {
                            this.threshold = data.threshold;
                        }
                        if ("veto_threshold" in data && data.veto_threshold != undefined) {
                            this.veto_threshold = data.veto_threshold;
                        }
                    }
                }
                get quorum() {
                    return pb_1.Message.getField(this, 1);
                }
                set quorum(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get threshold() {
                    return pb_1.Message.getField(this, 2);
                }
                set threshold(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get veto_threshold() {
                    return pb_1.Message.getField(this, 3);
                }
                set veto_threshold(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new TallyParams({});
                    if (data.quorum != null) {
                        message.quorum = data.quorum;
                    }
                    if (data.threshold != null) {
                        message.threshold = data.threshold;
                    }
                    if (data.veto_threshold != null) {
                        message.veto_threshold = data.veto_threshold;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.quorum != null) {
                        data.quorum = this.quorum;
                    }
                    if (this.threshold != null) {
                        data.threshold = this.threshold;
                    }
                    if (this.veto_threshold != null) {
                        data.veto_threshold = this.veto_threshold;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.quorum !== undefined)
                        writer.writeBytes(1, this.quorum);
                    if (this.threshold !== undefined)
                        writer.writeBytes(2, this.threshold);
                    if (this.veto_threshold !== undefined)
                        writer.writeBytes(3, this.veto_threshold);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TallyParams();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.quorum = reader.readBytes();
                                break;
                            case 2:
                                message.threshold = reader.readBytes();
                                break;
                            case 3:
                                message.veto_threshold = reader.readBytes();
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
                    return TallyParams.deserialize(bytes);
                }
            }
            v1beta1.TallyParams = TallyParams;
        })(v1beta1 = gov.v1beta1 || (gov.v1beta1 = {}));
    })(gov = cosmos.gov || (cosmos.gov = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=gov.js.map