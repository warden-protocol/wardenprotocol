//@ts-nocheck
import { MsgUpdateParams, MsgNewAction, MsgApproveAction, MsgNewIntent, MsgUpdateIntent, MsgRevokeAction } from "./tx.js";
export const AminoConverter = {
  "/warden.intent.MsgUpdateParams": {
    aminoType: "warden/x/intent/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/warden.intent.MsgNewAction": {
    aminoType: "/warden.intent.MsgNewAction",
    toAmino: MsgNewAction.toAmino,
    fromAmino: MsgNewAction.fromAmino
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
  "/warden.intent.MsgUpdateIntent": {
    aminoType: "/warden.intent.MsgUpdateIntent",
    toAmino: MsgUpdateIntent.toAmino,
    fromAmino: MsgUpdateIntent.fromAmino
  },
  "/warden.intent.MsgRevokeAction": {
    aminoType: "/warden.intent.MsgRevokeAction",
    toAmino: MsgRevokeAction.toAmino,
    fromAmino: MsgRevokeAction.fromAmino
  }
};