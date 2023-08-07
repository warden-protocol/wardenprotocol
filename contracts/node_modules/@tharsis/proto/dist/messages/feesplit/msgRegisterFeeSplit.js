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
exports.createMsgRegisterFeeSplit = void 0;
const feesplit = __importStar(require("../../proto/evmos/feesplit/v1/tx"));
function createMsgRegisterFeeSplit(contractAddress, deployerAddress, withdrawerAddress, nonces) {
    const msg = new feesplit.evmos.feesplit.v1.MsgRegisterFeeSplit({
        contract_address: contractAddress,
        deployer_address: deployerAddress,
        withdrawer_address: withdrawerAddress,
        nonces,
    });
    return {
        message: msg,
        path: 'evmos.feesplit.v1.MsgRegisterFeeSplit',
    };
}
exports.createMsgRegisterFeeSplit = createMsgRegisterFeeSplit;
//# sourceMappingURL=msgRegisterFeeSplit.js.map