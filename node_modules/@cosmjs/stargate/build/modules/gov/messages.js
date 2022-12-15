"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMsgVoteEncodeObject = exports.isMsgSubmitProposalEncodeObject = exports.isMsgDepositEncodeObject = exports.govTypes = void 0;
const tx_1 = require("cosmjs-types/cosmos/gov/v1beta1/tx");
exports.govTypes = [
    ["/cosmos.gov.v1beta1.MsgDeposit", tx_1.MsgDeposit],
    ["/cosmos.gov.v1beta1.MsgSubmitProposal", tx_1.MsgSubmitProposal],
    ["/cosmos.gov.v1beta1.MsgVote", tx_1.MsgVote],
];
function isMsgDepositEncodeObject(object) {
    return object.typeUrl === "/cosmos.gov.v1beta1.MsgDeposit";
}
exports.isMsgDepositEncodeObject = isMsgDepositEncodeObject;
function isMsgSubmitProposalEncodeObject(object) {
    return object.typeUrl === "/cosmos.gov.v1beta1.MsgSubmitProposal";
}
exports.isMsgSubmitProposalEncodeObject = isMsgSubmitProposalEncodeObject;
function isMsgVoteEncodeObject(object) {
    return object.typeUrl === "/cosmos.gov.v1beta1.MsgVote";
}
exports.isMsgVoteEncodeObject = isMsgVoteEncodeObject;
//# sourceMappingURL=messages.js.map