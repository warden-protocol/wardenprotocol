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
exports.createTxRaw = exports.bytesToAuthInfo = exports.bytesToTxBody = exports.bytesToTxRaw = void 0;
const tx = __importStar(require("../proto/cosmos/tx/v1beta1/tx"));
function bytesToTxRaw(bytes) {
    return tx.cosmos.tx.v1beta1.TxRaw.deserialize(bytes);
}
exports.bytesToTxRaw = bytesToTxRaw;
function bytesToTxBody(bytes) {
    return tx.cosmos.tx.v1beta1.TxBody.deserialize(bytes);
}
exports.bytesToTxBody = bytesToTxBody;
function bytesToAuthInfo(bytes) {
    return tx.cosmos.tx.v1beta1.AuthInfo.deserialize(bytes);
}
exports.bytesToAuthInfo = bytesToAuthInfo;
function createTxRaw(bodyBytes, authInfoBytes, signatures) {
    const message = new tx.cosmos.tx.v1beta1.TxRaw({
        body_bytes: bodyBytes,
        auth_info_bytes: authInfoBytes,
        signatures,
    });
    return {
        message,
        path: 'cosmos.tx.v1beta1.TxRaw',
    };
}
exports.createTxRaw = createTxRaw;
//# sourceMappingURL=txRaw.js.map