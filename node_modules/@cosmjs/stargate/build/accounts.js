"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountFromAny = void 0;
const math_1 = require("@cosmjs/math");
const proto_signing_1 = require("@cosmjs/proto-signing");
const utils_1 = require("@cosmjs/utils");
const auth_1 = require("cosmjs-types/cosmos/auth/v1beta1/auth");
const vesting_1 = require("cosmjs-types/cosmos/vesting/v1beta1/vesting");
function uint64FromProto(input) {
    return math_1.Uint64.fromString(input.toString());
}
function accountFromBaseAccount(input) {
    const { address, pubKey, accountNumber, sequence } = input;
    const pubkey = (0, proto_signing_1.decodePubkey)(pubKey);
    return {
        address: address,
        pubkey: pubkey,
        accountNumber: uint64FromProto(accountNumber).toNumber(),
        sequence: uint64FromProto(sequence).toNumber(),
    };
}
/**
 * Basic implementation of AccountParser. This is supposed to support the most relevant
 * common Cosmos SDK account types. If you need support for exotic account types,
 * you'll need to write your own account decoder.
 */
function accountFromAny(input) {
    var _a, _b, _c, _d, _e, _f, _g;
    const { typeUrl, value } = input;
    switch (typeUrl) {
        // auth
        case "/cosmos.auth.v1beta1.BaseAccount":
            return accountFromBaseAccount(auth_1.BaseAccount.decode(value));
        case "/cosmos.auth.v1beta1.ModuleAccount": {
            const baseAccount = auth_1.ModuleAccount.decode(value).baseAccount;
            (0, utils_1.assert)(baseAccount);
            return accountFromBaseAccount(baseAccount);
        }
        // vesting
        case "/cosmos.vesting.v1beta1.BaseVestingAccount": {
            const baseAccount = (_a = vesting_1.BaseVestingAccount.decode(value)) === null || _a === void 0 ? void 0 : _a.baseAccount;
            (0, utils_1.assert)(baseAccount);
            return accountFromBaseAccount(baseAccount);
        }
        case "/cosmos.vesting.v1beta1.ContinuousVestingAccount": {
            const baseAccount = (_c = (_b = vesting_1.ContinuousVestingAccount.decode(value)) === null || _b === void 0 ? void 0 : _b.baseVestingAccount) === null || _c === void 0 ? void 0 : _c.baseAccount;
            (0, utils_1.assert)(baseAccount);
            return accountFromBaseAccount(baseAccount);
        }
        case "/cosmos.vesting.v1beta1.DelayedVestingAccount": {
            const baseAccount = (_e = (_d = vesting_1.DelayedVestingAccount.decode(value)) === null || _d === void 0 ? void 0 : _d.baseVestingAccount) === null || _e === void 0 ? void 0 : _e.baseAccount;
            (0, utils_1.assert)(baseAccount);
            return accountFromBaseAccount(baseAccount);
        }
        case "/cosmos.vesting.v1beta1.PeriodicVestingAccount": {
            const baseAccount = (_g = (_f = vesting_1.PeriodicVestingAccount.decode(value)) === null || _f === void 0 ? void 0 : _f.baseVestingAccount) === null || _g === void 0 ? void 0 : _g.baseAccount;
            (0, utils_1.assert)(baseAccount);
            return accountFromBaseAccount(baseAccount);
        }
        default:
            throw new Error(`Unsupported type: '${typeUrl}'`);
    }
}
exports.accountFromAny = accountFromAny;
//# sourceMappingURL=accounts.js.map