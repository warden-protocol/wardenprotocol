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
exports.createWeb3Extension = void 0;
const web3 = __importStar(require("../proto/ethermint/types/v1/web3"));
function createWeb3Extension(chainId, feePayer, feePayerSig) {
    const message = new web3.ethermint.types.v1.ExtensionOptionsWeb3Tx({
        typed_data_chain_id: chainId,
        fee_payer: feePayer,
        fee_payer_sig: feePayerSig,
    });
    return {
        message,
        path: 'ethermint.types.v1.ExtensionOptionsWeb3Tx',
    };
}
exports.createWeb3Extension = createWeb3Extension;
//# sourceMappingURL=web3Extension.js.map