"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgDepositResponse = exports.MsgDeposit = exports.MsgVoteWeightedResponse = exports.MsgVoteWeighted = exports.MsgVoteResponse = exports.MsgVote = exports.MsgSubmitProposalResponse = exports.MsgSubmitProposal = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const any_1 = require("../../../google/protobuf/any");
const gov_1 = require("../../../cosmos/gov/v1beta1/gov");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
exports.protobufPackage = "cosmos.gov.v1beta1";
const baseMsgSubmitProposal = { proposer: "" };
exports.MsgSubmitProposal = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.content !== undefined) {
            any_1.Any.encode(message.content, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.initialDeposit) {
            coin_1.Coin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.proposer !== "") {
            writer.uint32(26).string(message.proposer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSubmitProposal);
        message.initialDeposit = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.content = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.initialDeposit.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.proposer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseMsgSubmitProposal);
        message.content =
            object.content !== undefined && object.content !== null ? any_1.Any.fromJSON(object.content) : undefined;
        message.initialDeposit = ((_a = object.initialDeposit) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
        message.proposer =
            object.proposer !== undefined && object.proposer !== null ? String(object.proposer) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.content !== undefined &&
            (obj.content = message.content ? any_1.Any.toJSON(message.content) : undefined);
        if (message.initialDeposit) {
            obj.initialDeposit = message.initialDeposit.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.initialDeposit = [];
        }
        message.proposer !== undefined && (obj.proposer = message.proposer);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgSubmitProposal);
        message.content =
            object.content !== undefined && object.content !== null ? any_1.Any.fromPartial(object.content) : undefined;
        message.initialDeposit = ((_a = object.initialDeposit) === null || _a === void 0 ? void 0 : _a.map((e) => coin_1.Coin.fromPartial(e))) || [];
        message.proposer = (_b = object.proposer) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
const baseMsgSubmitProposalResponse = { proposalId: long_1.default.UZERO };
exports.MsgSubmitProposalResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSubmitProposalResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgSubmitProposalResponse);
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1.default.fromString(object.proposalId)
                : long_1.default.UZERO;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.proposalId !== undefined && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgSubmitProposalResponse);
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1.default.fromValue(object.proposalId)
                : long_1.default.UZERO;
        return message;
    },
};
const baseMsgVote = { proposalId: long_1.default.UZERO, voter: "", option: 0 };
exports.MsgVote = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        if (message.option !== 0) {
            writer.uint32(24).int32(message.option);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgVote);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.voter = reader.string();
                    break;
                case 3:
                    message.option = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgVote);
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1.default.fromString(object.proposalId)
                : long_1.default.UZERO;
        message.voter = object.voter !== undefined && object.voter !== null ? String(object.voter) : "";
        message.option =
            object.option !== undefined && object.option !== null ? gov_1.voteOptionFromJSON(object.option) : 0;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.proposalId !== undefined && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
        message.voter !== undefined && (obj.voter = message.voter);
        message.option !== undefined && (obj.option = gov_1.voteOptionToJSON(message.option));
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgVote);
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1.default.fromValue(object.proposalId)
                : long_1.default.UZERO;
        message.voter = (_a = object.voter) !== null && _a !== void 0 ? _a : "";
        message.option = (_b = object.option) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
const baseMsgVoteResponse = {};
exports.MsgVoteResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgVoteResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgVoteResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgVoteResponse);
        return message;
    },
};
const baseMsgVoteWeighted = { proposalId: long_1.default.UZERO, voter: "" };
exports.MsgVoteWeighted = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.voter !== "") {
            writer.uint32(18).string(message.voter);
        }
        for (const v of message.options) {
            gov_1.WeightedVoteOption.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgVoteWeighted);
        message.options = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.voter = reader.string();
                    break;
                case 3:
                    message.options.push(gov_1.WeightedVoteOption.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseMsgVoteWeighted);
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1.default.fromString(object.proposalId)
                : long_1.default.UZERO;
        message.voter = object.voter !== undefined && object.voter !== null ? String(object.voter) : "";
        message.options = ((_a = object.options) !== null && _a !== void 0 ? _a : []).map((e) => gov_1.WeightedVoteOption.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.proposalId !== undefined && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
        message.voter !== undefined && (obj.voter = message.voter);
        if (message.options) {
            obj.options = message.options.map((e) => (e ? gov_1.WeightedVoteOption.toJSON(e) : undefined));
        }
        else {
            obj.options = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgVoteWeighted);
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1.default.fromValue(object.proposalId)
                : long_1.default.UZERO;
        message.voter = (_a = object.voter) !== null && _a !== void 0 ? _a : "";
        message.options = ((_b = object.options) === null || _b === void 0 ? void 0 : _b.map((e) => gov_1.WeightedVoteOption.fromPartial(e))) || [];
        return message;
    },
};
const baseMsgVoteWeightedResponse = {};
exports.MsgVoteWeightedResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgVoteWeightedResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgVoteWeightedResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgVoteWeightedResponse);
        return message;
    },
};
const baseMsgDeposit = { proposalId: long_1.default.UZERO, depositor: "" };
exports.MsgDeposit = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.proposalId.isZero()) {
            writer.uint32(8).uint64(message.proposalId);
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgDeposit);
        message.amount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.proposalId = reader.uint64();
                    break;
                case 2:
                    message.depositor = reader.string();
                    break;
                case 3:
                    message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseMsgDeposit);
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1.default.fromString(object.proposalId)
                : long_1.default.UZERO;
        message.depositor =
            object.depositor !== undefined && object.depositor !== null ? String(object.depositor) : "";
        message.amount = ((_a = object.amount) !== null && _a !== void 0 ? _a : []).map((e) => coin_1.Coin.fromJSON(e));
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.proposalId !== undefined && (obj.proposalId = (message.proposalId || long_1.default.UZERO).toString());
        message.depositor !== undefined && (obj.depositor = message.depositor);
        if (message.amount) {
            obj.amount = message.amount.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.amount = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = Object.assign({}, baseMsgDeposit);
        message.proposalId =
            object.proposalId !== undefined && object.proposalId !== null
                ? long_1.default.fromValue(object.proposalId)
                : long_1.default.UZERO;
        message.depositor = (_a = object.depositor) !== null && _a !== void 0 ? _a : "";
        message.amount = ((_b = object.amount) === null || _b === void 0 ? void 0 : _b.map((e) => coin_1.Coin.fromPartial(e))) || [];
        return message;
    },
};
const baseMsgDepositResponse = {};
exports.MsgDepositResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgDepositResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgDepositResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgDepositResponse);
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.SubmitProposal = this.SubmitProposal.bind(this);
        this.Vote = this.Vote.bind(this);
        this.VoteWeighted = this.VoteWeighted.bind(this);
        this.Deposit = this.Deposit.bind(this);
    }
    SubmitProposal(request) {
        const data = exports.MsgSubmitProposal.encode(request).finish();
        const promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "SubmitProposal", data);
        return promise.then((data) => exports.MsgSubmitProposalResponse.decode(new minimal_1.default.Reader(data)));
    }
    Vote(request) {
        const data = exports.MsgVote.encode(request).finish();
        const promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "Vote", data);
        return promise.then((data) => exports.MsgVoteResponse.decode(new minimal_1.default.Reader(data)));
    }
    VoteWeighted(request) {
        const data = exports.MsgVoteWeighted.encode(request).finish();
        const promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "VoteWeighted", data);
        return promise.then((data) => exports.MsgVoteWeightedResponse.decode(new minimal_1.default.Reader(data)));
    }
    Deposit(request) {
        const data = exports.MsgDeposit.encode(request).finish();
        const promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "Deposit", data);
        return promise.then((data) => exports.MsgDepositResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=tx.js.map