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
exports.createIBCMsgTransfer = void 0;
const coin = __importStar(require("../proto/cosmos/base/v1beta1/coin"));
const ibcMsg = __importStar(require("../proto/ibc/applications/transfer/v1/tx"));
const ibcCore = __importStar(require("../proto/ibc/core/client/v1/client"));
function createIBCMsgTransfer(sourcePort, sourceChannel, amount, denom, sender, receiver, revisionNumber, revisionHeight, timeoutTimestamp) {
    const token = new coin.cosmos.base.v1beta1.Coin({
        denom,
        amount,
    });
    const timeoutHeight = new ibcCore.ibc.core.client.v1.Height({
        revision_number: revisionNumber,
        revision_height: revisionHeight,
    });
    const ibcMessage = new ibcMsg.ibc.applications.transfer.v1.MsgTransfer({
        source_port: sourcePort,
        source_channel: sourceChannel,
        token,
        sender,
        receiver,
        timeout_height: timeoutHeight,
        timeout_timestamp: parseInt(timeoutTimestamp, 10),
    });
    return {
        message: ibcMessage,
        path: 'ibc.applications.transfer.v1.MsgTransfer',
    };
}
exports.createIBCMsgTransfer = createIBCMsgTransfer;
//# sourceMappingURL=ibcMsgTransfer.js.map