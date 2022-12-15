"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMsgWithdrawDelegatorRewardEncodeObject = exports.distributionTypes = void 0;
const tx_1 = require("cosmjs-types/cosmos/distribution/v1beta1/tx");
exports.distributionTypes = [
    ["/cosmos.distribution.v1beta1.MsgFundCommunityPool", tx_1.MsgFundCommunityPool],
    ["/cosmos.distribution.v1beta1.MsgSetWithdrawAddress", tx_1.MsgSetWithdrawAddress],
    ["/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", tx_1.MsgWithdrawDelegatorReward],
    ["/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission", tx_1.MsgWithdrawValidatorCommission],
];
function isMsgWithdrawDelegatorRewardEncodeObject(object) {
    return (object.typeUrl ===
        "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward");
}
exports.isMsgWithdrawDelegatorRewardEncodeObject = isMsgWithdrawDelegatorRewardEncodeObject;
//# sourceMappingURL=messages.js.map