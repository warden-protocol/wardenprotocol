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
exports.createMsgSetWithdrawAddress = exports.createMsgCreateValidator = exports.createMsgEditValidator = void 0;
const stakingTypes = __importStar(require("../proto/cosmos/staking/v1beta1/staking"));
const staking = __importStar(require("../proto/cosmos/staking/v1beta1/tx"));
const coin = __importStar(require("../proto/cosmos/base/v1beta1/coin"));
const distribution = __importStar(require("../proto/cosmos/distribution/v1beta1/tx"));
const utils_1 = require("./utils");
const NOT_MODIFY = '[do-not-modify]';
function createMsgEditValidator(moniker, identity, website, securityContact, details, validatorAddress, commissionRate, minSelfDelegation) {
    const message = new staking.cosmos.staking.v1beta1.MsgEditValidator({
        description: new stakingTypes.cosmos.staking.v1beta1.Description({
            moniker: moniker || NOT_MODIFY,
            identity: identity || NOT_MODIFY,
            website: website || NOT_MODIFY,
            security_contact: securityContact || NOT_MODIFY,
            details: details || NOT_MODIFY,
        }),
        validator_address: validatorAddress,
        commission_rate: commissionRate,
        min_self_delegation: minSelfDelegation,
    });
    return {
        message,
        path: 'cosmos.staking.v1beta1.MsgEditValidator',
    };
}
exports.createMsgEditValidator = createMsgEditValidator;
function createMsgCreateValidator(validatorDescription, validatorCommission, minSelfDelegation, delegatorAddress, validatorAddress, amount, denom, pubkey) {
    const pubkeyEncoded = new Uint8Array(Buffer.from(pubkey, 'base64'));
    const commission = new stakingTypes.cosmos.staking.v1beta1.CommissionRates({
        rate: validatorCommission.rate,
        max_rate: validatorCommission.maxRate,
        max_change_rate: validatorCommission.maxChangeRate,
    });
    const description = new stakingTypes.cosmos.staking.v1beta1.Description({
        moniker: validatorDescription.moniker,
        identity: validatorDescription.identity,
        website: validatorDescription.website,
        security_contact: validatorDescription.securityContact,
        details: validatorDescription.details,
    });
    const value = new coin.cosmos.base.v1beta1.Coin({
        denom,
        amount,
    });
    const message = new staking.cosmos.staking.v1beta1.MsgCreateValidator({
        min_self_delegation: minSelfDelegation,
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
        value,
        pubkey: (0, utils_1.createAnyMessage)((0, utils_1.createed25519pubkey)(pubkeyEncoded)),
        description,
        commission,
    });
    return {
        message,
        path: 'cosmos.staking.v1beta1.MsgCreateValidator',
    };
}
exports.createMsgCreateValidator = createMsgCreateValidator;
function createMsgSetWithdrawAddress(delegatorAddress, withdrawAddress) {
    const message = new distribution.cosmos.distribution.v1beta1.MsgSetWithdrawAddress({
        delegator_address: delegatorAddress,
        withdraw_address: withdrawAddress,
    });
    return {
        message,
        path: 'cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
    };
}
exports.createMsgSetWithdrawAddress = createMsgSetWithdrawAddress;
//# sourceMappingURL=validator.js.map