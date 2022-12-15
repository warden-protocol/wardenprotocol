"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDistributionAminoConverters = exports.isAminoMsgFundCommunityPool = exports.isAminoMsgWithdrawValidatorCommission = exports.isAminoMsgWithdrawDelegatorReward = exports.isAminoMsgSetWithdrawAddress = void 0;
function isAminoMsgSetWithdrawAddress(msg) {
    // NOTE: Type string and names diverge here!
    return msg.type === "cosmos-sdk/MsgModifyWithdrawAddress";
}
exports.isAminoMsgSetWithdrawAddress = isAminoMsgSetWithdrawAddress;
function isAminoMsgWithdrawDelegatorReward(msg) {
    // NOTE: Type string and names diverge here!
    return msg.type === "cosmos-sdk/MsgWithdrawDelegationReward";
}
exports.isAminoMsgWithdrawDelegatorReward = isAminoMsgWithdrawDelegatorReward;
function isAminoMsgWithdrawValidatorCommission(msg) {
    return msg.type === "cosmos-sdk/MsgWithdrawValidatorCommission";
}
exports.isAminoMsgWithdrawValidatorCommission = isAminoMsgWithdrawValidatorCommission;
function isAminoMsgFundCommunityPool(msg) {
    return msg.type === "cosmos-sdk/MsgFundCommunityPool";
}
exports.isAminoMsgFundCommunityPool = isAminoMsgFundCommunityPool;
function createDistributionAminoConverters() {
    return {
        "/cosmos.distribution.v1beta1.MsgFundCommunityPool": {
            aminoType: "cosmos-sdk/MsgFundCommunityPool",
            toAmino: ({ amount, depositor }) => ({
                amount: [...amount],
                depositor: depositor,
            }),
            fromAmino: ({ amount, depositor }) => ({
                amount: [...amount],
                depositor: depositor,
            }),
        },
        "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": {
            aminoType: "cosmos-sdk/MsgModifyWithdrawAddress",
            toAmino: ({ delegatorAddress, withdrawAddress, }) => ({
                delegator_address: delegatorAddress,
                withdraw_address: withdrawAddress,
            }),
            fromAmino: ({ delegator_address, withdraw_address, }) => ({
                delegatorAddress: delegator_address,
                withdrawAddress: withdraw_address,
            }),
        },
        "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
            aminoType: "cosmos-sdk/MsgWithdrawDelegationReward",
            toAmino: ({ delegatorAddress, validatorAddress, }) => ({
                delegator_address: delegatorAddress,
                validator_address: validatorAddress,
            }),
            fromAmino: ({ delegator_address, validator_address, }) => ({
                delegatorAddress: delegator_address,
                validatorAddress: validator_address,
            }),
        },
        "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": {
            aminoType: "cosmos-sdk/MsgWithdrawValidatorCommission",
            toAmino: ({ validatorAddress, }) => ({
                validator_address: validatorAddress,
            }),
            fromAmino: ({ validator_address, }) => ({
                validatorAddress: validator_address,
            }),
        },
    };
}
exports.createDistributionAminoConverters = createDistributionAminoConverters;
//# sourceMappingURL=aminomessages.js.map