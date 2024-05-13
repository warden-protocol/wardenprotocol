//@ts-nocheck
import { MsgCreateValidator, MsgEditValidator, MsgDelegate, MsgBeginRedelegate, MsgUndelegate } from "./tx";
export const AminoConverter = {
  "/cosmos.staking.v1beta1.MsgCreateValidator": {
    aminoType: "cosmos-sdk/MsgCreateValidator",
    toAmino: MsgCreateValidator.toAmino,
    fromAmino: MsgCreateValidator.fromAmino
  },
  "/cosmos.staking.v1beta1.MsgEditValidator": {
    aminoType: "cosmos-sdk/MsgEditValidator",
    toAmino: MsgEditValidator.toAmino,
    fromAmino: MsgEditValidator.fromAmino
  },
  "/cosmos.staking.v1beta1.MsgDelegate": {
    aminoType: "cosmos-sdk/MsgDelegate",
    toAmino: MsgDelegate.toAmino,
    fromAmino: MsgDelegate.fromAmino
  },
  "/cosmos.staking.v1beta1.MsgBeginRedelegate": {
    aminoType: "cosmos-sdk/MsgBeginRedelegate",
    toAmino: MsgBeginRedelegate.toAmino,
    fromAmino: MsgBeginRedelegate.fromAmino
  },
  "/cosmos.staking.v1beta1.MsgUndelegate": {
    aminoType: "cosmos-sdk/MsgUndelegate",
    toAmino: MsgUndelegate.toAmino,
    fromAmino: MsgUndelegate.fromAmino
  }
};