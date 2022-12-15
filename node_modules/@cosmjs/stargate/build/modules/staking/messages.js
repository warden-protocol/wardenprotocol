"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMsgUndelegateEncodeObject = exports.isMsgDelegateEncodeObject = exports.stakingTypes = void 0;
const tx_1 = require("cosmjs-types/cosmos/staking/v1beta1/tx");
exports.stakingTypes = [
    ["/cosmos.staking.v1beta1.MsgBeginRedelegate", tx_1.MsgBeginRedelegate],
    ["/cosmos.staking.v1beta1.MsgCreateValidator", tx_1.MsgCreateValidator],
    ["/cosmos.staking.v1beta1.MsgDelegate", tx_1.MsgDelegate],
    ["/cosmos.staking.v1beta1.MsgEditValidator", tx_1.MsgEditValidator],
    ["/cosmos.staking.v1beta1.MsgUndelegate", tx_1.MsgUndelegate],
];
function isMsgDelegateEncodeObject(object) {
    return object.typeUrl === "/cosmos.staking.v1beta1.MsgDelegate";
}
exports.isMsgDelegateEncodeObject = isMsgDelegateEncodeObject;
function isMsgUndelegateEncodeObject(object) {
    return object.typeUrl === "/cosmos.staking.v1beta1.MsgUndelegate";
}
exports.isMsgUndelegateEncodeObject = isMsgUndelegateEncodeObject;
//# sourceMappingURL=messages.js.map