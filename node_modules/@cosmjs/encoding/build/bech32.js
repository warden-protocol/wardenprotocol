"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.Bech32 = exports.normalizeBech32 = exports.fromBech32 = exports.toBech32 = void 0;
const bech32 = __importStar(require("bech32"));
function toBech32(prefix, data, limit) {
    const address = bech32.encode(prefix, bech32.toWords(data), limit);
    return address;
}
exports.toBech32 = toBech32;
function fromBech32(address, limit = Infinity) {
    const decodedAddress = bech32.decode(address, limit);
    return {
        prefix: decodedAddress.prefix,
        data: new Uint8Array(bech32.fromWords(decodedAddress.words)),
    };
}
exports.fromBech32 = fromBech32;
/**
 * Takes a bech32 address and returns a normalized (i.e. lower case) representation of it.
 *
 * The input is validated along the way, which makes this significantly safer than
 * using `address.toLowerCase()`.
 */
function normalizeBech32(address) {
    const { prefix, data } = fromBech32(address);
    return toBech32(prefix, data);
}
exports.normalizeBech32 = normalizeBech32;
/**
 * @deprecated This class is deprecated and will be removed soon. Please use fromBech32() and toBech32() instead. For more details please refer to https://github.com/cosmos/cosmjs/issues/1053.
 */
class Bech32 {
    /**
     * @deprecated This class is deprecated and will be removed soon. Please use fromBech32() and toBech32() instead. For more details please refer to https://github.com/cosmos/cosmjs/issues/1053.
     */
    static encode(prefix, data, limit) {
        return toBech32(prefix, data, limit);
    }
    /**
     * @deprecated This class is deprecated and will be removed soon. Please use fromBech32() and toBech32() instead. For more details please refer to https://github.com/cosmos/cosmjs/issues/1053.
     */
    static decode(address, limit = Infinity) {
        return fromBech32(address, limit);
    }
}
exports.Bech32 = Bech32;
//# sourceMappingURL=bech32.js.map