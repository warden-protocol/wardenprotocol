//@ts-nocheck
import { MsgSetWithdrawAddress, MsgWithdrawDelegatorReward, MsgWithdrawValidatorCommission, MsgFundCommunityPool } from "./tx";
export const AminoConverter = {
  "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress": {
    aminoType: "cosmos-sdk/MsgModifyWithdrawAddress",
    toAmino: MsgSetWithdrawAddress.toAmino,
    fromAmino: MsgSetWithdrawAddress.fromAmino
  },
  "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": {
    aminoType: "cosmos-sdk/MsgWithdrawDelegationReward",
    toAmino: MsgWithdrawDelegatorReward.toAmino,
    fromAmino: MsgWithdrawDelegatorReward.fromAmino
  },
  "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission": {
    aminoType: "cosmos-sdk/MsgWithdrawValidatorCommission",
    toAmino: MsgWithdrawValidatorCommission.toAmino,
    fromAmino: MsgWithdrawValidatorCommission.fromAmino
  },
  "/cosmos.distribution.v1beta1.MsgFundCommunityPool": {
    aminoType: "cosmos-sdk/MsgFundCommunityPool",
    toAmino: MsgFundCommunityPool.toAmino,
    fromAmino: MsgFundCommunityPool.fromAmino
  }
};