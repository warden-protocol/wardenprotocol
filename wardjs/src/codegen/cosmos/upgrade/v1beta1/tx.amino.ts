//@ts-nocheck
import { MsgSoftwareUpgrade, MsgCancelUpgrade } from "./tx";
export const AminoConverter = {
  "/cosmos.upgrade.v1beta1.MsgSoftwareUpgrade": {
    aminoType: "cosmos-sdk/MsgSoftwareUpgrade",
    toAmino: MsgSoftwareUpgrade.toAmino,
    fromAmino: MsgSoftwareUpgrade.fromAmino
  },
  "/cosmos.upgrade.v1beta1.MsgCancelUpgrade": {
    aminoType: "cosmos-sdk/MsgCancelUpgrade",
    toAmino: MsgCancelUpgrade.toAmino,
    fromAmino: MsgCancelUpgrade.fromAmino
  }
};