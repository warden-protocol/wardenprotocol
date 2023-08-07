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
exports.createMsgConvertERC20 = void 0;
const erc20 = __importStar(require("../../proto/evmos/erc20/v1/tx"));
function createMsgConvertERC20(contractAddress, amount, receiver, sender) {
    const msg = new erc20.evmos.erc20.v1.MsgConvertERC20({
        contract_address: contractAddress,
        amount,
        receiver,
        sender,
    });
    return {
        message: msg,
        path: 'evmos.erc20.v1.MsgConvertERC20',
    };
}
exports.createMsgConvertERC20 = createMsgConvertERC20;
//# sourceMappingURL=msgConvertERC20.js.map