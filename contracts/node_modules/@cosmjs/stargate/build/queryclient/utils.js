"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeCosmosSdkDecFromProto = exports.longify = exports.createProtobufRpcClient = exports.createPagination = exports.toAccAddress = void 0;
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const pagination_1 = require("cosmjs-types/cosmos/base/query/v1beta1/pagination");
const long_1 = __importDefault(require("long"));
/**
 * Takes a bech32 encoded address and returns the data part. The prefix is ignored and discarded.
 * This is called AccAddress in Cosmos SDK, which is basically an alias for raw binary data.
 * The result is typically 20 bytes long but not restricted to that.
 */
function toAccAddress(address) {
    return (0, encoding_1.fromBech32)(address).data;
}
exports.toAccAddress = toAccAddress;
/**
 * If paginationKey is set, return a `PageRequest` with the given key.
 * If paginationKey is unset, return `undefined`.
 *
 * Use this with a query response's pagination next key to
 * request the next page.
 */
function createPagination(paginationKey) {
    return paginationKey
        ? pagination_1.PageRequest.fromPartial({
            key: paginationKey,
            offset: long_1.default.fromNumber(0, true),
            limit: long_1.default.fromNumber(0, true),
            countTotal: false,
        })
        : undefined;
}
exports.createPagination = createPagination;
function createProtobufRpcClient(base) {
    return {
        request: (service, method, data) => {
            const path = `/${service}/${method}`;
            return base.queryUnverified(path, data);
        },
    };
}
exports.createProtobufRpcClient = createProtobufRpcClient;
/**
 * Takes a uint64 value as string, number, Long or Uint64 and returns an unsigned Long instance
 * of it.
 */
function longify(value) {
    const checkedValue = math_1.Uint64.fromString(value.toString());
    return long_1.default.fromBytesBE([...checkedValue.toBytesBigEndian()], true);
}
exports.longify = longify;
/**
 * Takes a string or binary encoded `github.com/cosmos/cosmos-sdk/types.Dec` from the
 * protobuf API and converts it into a `Decimal` with 18 fractional digits.
 *
 * See https://github.com/cosmos/cosmos-sdk/issues/10863 for more context why this is needed.
 */
function decodeCosmosSdkDecFromProto(input) {
    const asString = typeof input === "string" ? input : (0, encoding_1.fromAscii)(input);
    return math_1.Decimal.fromAtomics(asString, 18);
}
exports.decodeCosmosSdkDecFromProto = decodeCosmosSdkDecFromProto;
//# sourceMappingURL=utils.js.map