"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMultisigThresholdPubkey = exports.compareArrays = void 0;
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const addresses_1 = require("./addresses");
/**
 * Compare arrays lexicographically.
 *
 * Returns value < 0 if `a < b`.
 * Returns value > 0 if `a > b`.
 * Returns 0 if `a === b`.
 */
function compareArrays(a, b) {
    const aHex = (0, encoding_1.toHex)(a);
    const bHex = (0, encoding_1.toHex)(b);
    return aHex === bHex ? 0 : aHex < bHex ? -1 : 1;
}
exports.compareArrays = compareArrays;
function createMultisigThresholdPubkey(pubkeys, threshold, nosort = false) {
    const uintThreshold = new math_1.Uint53(threshold);
    if (uintThreshold.toNumber() > pubkeys.length) {
        throw new Error(`Threshold k = ${uintThreshold.toNumber()} exceeds number of keys n = ${pubkeys.length}`);
    }
    const outPubkeys = nosort
        ? pubkeys
        : Array.from(pubkeys).sort((lhs, rhs) => {
            // https://github.com/cosmos/cosmos-sdk/blob/v0.42.2/client/keys/add.go#L172-L174
            const addressLhs = (0, addresses_1.pubkeyToRawAddress)(lhs);
            const addressRhs = (0, addresses_1.pubkeyToRawAddress)(rhs);
            return compareArrays(addressLhs, addressRhs);
        });
    return {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
            threshold: uintThreshold.toString(),
            pubkeys: outPubkeys,
        },
    };
}
exports.createMultisigThresholdPubkey = createMultisigThresholdPubkey;
//# sourceMappingURL=multisig.js.map