"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMsgSendEncodeObject = exports.bankTypes = void 0;
const tx_1 = require("cosmjs-types/cosmos/bank/v1beta1/tx");
exports.bankTypes = [
    ["/cosmos.bank.v1beta1.MsgMultiSend", tx_1.MsgMultiSend],
    ["/cosmos.bank.v1beta1.MsgSend", tx_1.MsgSend],
];
function isMsgSendEncodeObject(encodeObject) {
    return encodeObject.typeUrl === "/cosmos.bank.v1beta1.MsgSend";
}
exports.isMsgSendEncodeObject = isMsgSendEncodeObject;
//# sourceMappingURL=messages.js.map