"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTxRaw = void 0;
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
/**
 * Takes a serialized TxRaw (the bytes stored in Tendermint) and decodes it into something usable.
 */
function decodeTxRaw(tx) {
    const txRaw = tx_1.TxRaw.decode(tx);
    return {
        authInfo: tx_1.AuthInfo.decode(txRaw.authInfoBytes),
        body: tx_1.TxBody.decode(txRaw.bodyBytes),
        signatures: txRaw.signatures,
    };
}
exports.decodeTxRaw = decodeTxRaw;
//# sourceMappingURL=decode.js.map