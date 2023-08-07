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
exports.createMsgSend = void 0;
const bank = __importStar(require("../proto/cosmos/bank/v1beta1/tx"));
const coin = __importStar(require("../proto/cosmos/base/v1beta1/coin"));
function createMsgSend(fromAddress, toAddress, amount, denom) {
    const value = new coin.cosmos.base.v1beta1.Coin({
        denom,
        amount,
    });
    const message = new bank.cosmos.bank.v1beta1.MsgSend({
        from_address: fromAddress,
        to_address: toAddress,
        amount: [value],
    });
    return {
        message,
        path: 'cosmos.bank.v1beta1.MsgSend',
    };
}
exports.createMsgSend = createMsgSend;
//# sourceMappingURL=msgSend.js.map