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
exports.createMsgWithdrawValidatorCommission = exports.createMsgWithdrawDelegatorReward = exports.createMsgUndelegate = exports.createMsgBeginRedelegate = exports.createMsgDelegate = void 0;
const staking = __importStar(require("../proto/cosmos/staking/v1beta1/tx"));
const coin = __importStar(require("../proto/cosmos/base/v1beta1/coin"));
const dist = __importStar(require("../proto/cosmos/distribution/v1beta1/tx"));
function createMsgDelegate(delegatorAddress, validatorAddress, amount, denom) {
    const value = new coin.cosmos.base.v1beta1.Coin({
        denom,
        amount,
    });
    const message = new staking.cosmos.staking.v1beta1.MsgDelegate({
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
        amount: value,
    });
    return {
        message,
        path: 'cosmos.staking.v1beta1.MsgDelegate',
    };
}
exports.createMsgDelegate = createMsgDelegate;
function createMsgBeginRedelegate(delegatorAddress, validatorSrcAddress, validatorDstAddress, amount, denom) {
    const value = new coin.cosmos.base.v1beta1.Coin({
        denom,
        amount,
    });
    const message = new staking.cosmos.staking.v1beta1.MsgBeginRedelegate({
        delegator_address: delegatorAddress,
        validator_src_address: validatorSrcAddress,
        validator_dst_address: validatorDstAddress,
        amount: value,
    });
    return {
        message,
        path: 'cosmos.staking.v1beta1.MsgBeginRedelegate',
    };
}
exports.createMsgBeginRedelegate = createMsgBeginRedelegate;
function createMsgUndelegate(delegatorAddress, validatorAddress, amount, denom) {
    const value = new coin.cosmos.base.v1beta1.Coin({
        denom,
        amount,
    });
    const message = new staking.cosmos.staking.v1beta1.MsgUndelegate({
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
        amount: value,
    });
    return {
        message,
        path: 'cosmos.staking.v1beta1.MsgUndelegate',
    };
}
exports.createMsgUndelegate = createMsgUndelegate;
function createMsgWithdrawDelegatorReward(delegatorAddress, validatorAddress) {
    const message = new dist.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward({
        delegator_address: delegatorAddress,
        validator_address: validatorAddress,
    });
    return {
        message,
        path: 'cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
    };
}
exports.createMsgWithdrawDelegatorReward = createMsgWithdrawDelegatorReward;
function createMsgWithdrawValidatorCommission(validatorAddress) {
    const message = new dist.cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission({
        validator_address: validatorAddress,
    });
    return {
        message,
        path: 'cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
    };
}
exports.createMsgWithdrawValidatorCommission = createMsgWithdrawValidatorCommission;
//# sourceMappingURL=staking.js.map