"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGovAminoConverters = exports.isAminoMsgDeposit = exports.isAminoMsgVote = exports.isAminoMsgSubmitProposal = void 0;
const utils_1 = require("@cosmjs/utils");
const gov_1 = require("cosmjs-types/cosmos/gov/v1beta1/gov");
const any_1 = require("cosmjs-types/google/protobuf/any");
const long_1 = __importDefault(require("long"));
function isAminoMsgSubmitProposal(msg) {
    return msg.type === "cosmos-sdk/MsgSubmitProposal";
}
exports.isAminoMsgSubmitProposal = isAminoMsgSubmitProposal;
function isAminoMsgVote(msg) {
    return msg.type === "cosmos-sdk/MsgVote";
}
exports.isAminoMsgVote = isAminoMsgVote;
function isAminoMsgDeposit(msg) {
    return msg.type === "cosmos-sdk/MsgDeposit";
}
exports.isAminoMsgDeposit = isAminoMsgDeposit;
function createGovAminoConverters() {
    return {
        "/cosmos.gov.v1beta1.MsgDeposit": {
            aminoType: "cosmos-sdk/MsgDeposit",
            toAmino: ({ amount, depositor, proposalId }) => {
                return {
                    amount,
                    depositor,
                    proposal_id: proposalId.toString(),
                };
            },
            fromAmino: ({ amount, depositor, proposal_id }) => {
                return {
                    amount: Array.from(amount),
                    depositor,
                    proposalId: long_1.default.fromString(proposal_id),
                };
            },
        },
        "/cosmos.gov.v1beta1.MsgVote": {
            aminoType: "cosmos-sdk/MsgVote",
            toAmino: ({ option, proposalId, voter }) => {
                return {
                    option: option,
                    proposal_id: proposalId.toString(),
                    voter: voter,
                };
            },
            fromAmino: ({ option, proposal_id, voter }) => {
                return {
                    option: (0, gov_1.voteOptionFromJSON)(option),
                    proposalId: long_1.default.fromString(proposal_id),
                    voter: voter,
                };
            },
        },
        "/cosmos.gov.v1beta1.MsgSubmitProposal": {
            aminoType: "cosmos-sdk/MsgSubmitProposal",
            toAmino: ({ initialDeposit, proposer, content, }) => {
                (0, utils_1.assertDefinedAndNotNull)(content);
                let proposal;
                switch (content.typeUrl) {
                    case "/cosmos.gov.v1beta1.TextProposal": {
                        const textProposal = gov_1.TextProposal.decode(content.value);
                        proposal = {
                            type: "cosmos-sdk/TextProposal",
                            value: {
                                description: textProposal.description,
                                title: textProposal.title,
                            },
                        };
                        break;
                    }
                    default:
                        throw new Error(`Unsupported proposal type: '${content.typeUrl}'`);
                }
                return {
                    initial_deposit: initialDeposit,
                    proposer: proposer,
                    content: proposal,
                };
            },
            fromAmino: ({ initial_deposit, proposer, content, }) => {
                let any_content;
                switch (content.type) {
                    case "cosmos-sdk/TextProposal": {
                        const { value } = content;
                        (0, utils_1.assert)((0, utils_1.isNonNullObject)(value));
                        const { title, description } = value;
                        (0, utils_1.assert)(typeof title === "string");
                        (0, utils_1.assert)(typeof description === "string");
                        any_content = any_1.Any.fromPartial({
                            typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                            value: gov_1.TextProposal.encode(gov_1.TextProposal.fromPartial({
                                title: title,
                                description: description,
                            })).finish(),
                        });
                        break;
                    }
                    default:
                        throw new Error(`Unsupported proposal type: '${content.type}'`);
                }
                return {
                    initialDeposit: Array.from(initial_deposit),
                    proposer: proposer,
                    content: any_content,
                };
            },
        },
    };
}
exports.createGovAminoConverters = createGovAminoConverters;
//# sourceMappingURL=aminomessages.js.map