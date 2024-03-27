//@ts-nocheck
import { MsgUpdateParams, MsgApproveAction, MsgNewIntent, MsgRevokeAction } from "./tx.js";
export const AminoConverter = {
  "/warden.intent.MsgUpdateParams": {
    aminoType: "warden/x/intent/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/warden.intent.MsgApproveAction": {
    aminoType: "/warden.intent.MsgApproveAction",
    toAmino: MsgApproveAction.toAmino,
    fromAmino: MsgApproveAction.fromAmino
  },
  "/warden.intent.MsgNewIntent": {
    aminoType: "/warden.intent.MsgNewIntent",
    toAmino: MsgNewIntent.toAmino,
    fromAmino: MsgNewIntent.fromAmino
  },
  "/warden.intent.MsgRevokeAction": {
    aminoType: "/warden.intent.MsgRevokeAction",
    toAmino: MsgRevokeAction.toAmino,
    fromAmino: MsgRevokeAction.fromAmino
  }
};