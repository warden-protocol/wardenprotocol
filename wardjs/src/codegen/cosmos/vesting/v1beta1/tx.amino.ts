//@ts-nocheck
import { MsgCreateVestingAccount, MsgCreatePermanentLockedAccount, MsgCreatePeriodicVestingAccount } from "./tx";
export const AminoConverter = {
  "/cosmos.vesting.v1beta1.MsgCreateVestingAccount": {
    aminoType: "cosmos-sdk/MsgCreateVestingAccount",
    toAmino: MsgCreateVestingAccount.toAmino,
    fromAmino: MsgCreateVestingAccount.fromAmino
  },
  "/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount": {
    aminoType: "cosmos-sdk/MsgCreatePermanentLockedAccount",
    toAmino: MsgCreatePermanentLockedAccount.toAmino,
    fromAmino: MsgCreatePermanentLockedAccount.fromAmino
  },
  "/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount": {
    aminoType: "cosmos-sdk/MsgCreatePeriodicVestingAccount",
    toAmino: MsgCreatePeriodicVestingAccount.toAmino,
    fromAmino: MsgCreatePeriodicVestingAccount.fromAmino
  }
};