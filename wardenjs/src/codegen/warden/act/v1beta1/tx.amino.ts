//@ts-nocheck
import { MsgUpdateParams, MsgNewAction, MsgApproveAction, MsgCheckAction, MsgNewRule, MsgUpdateRule, MsgRevokeAction, MsgVoteForAction } from "./tx.js";
export const AminoConverter = {
  "/warden.act.v1beta1.MsgUpdateParams": {
    aminoType: "warden/x/act/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/warden.act.v1beta1.MsgNewAction": {
    aminoType: "/warden.act.v1beta1.MsgNewAction",
    toAmino: MsgNewAction.toAmino,
    fromAmino: MsgNewAction.fromAmino
  },
  "/warden.act.v1beta1.MsgApproveAction": {
    aminoType: "/warden.act.v1beta1.MsgApproveAction",
    toAmino: MsgApproveAction.toAmino,
    fromAmino: MsgApproveAction.fromAmino
  },
  "/warden.act.v1beta1.MsgCheckAction": {
    aminoType: "/warden.act.v1beta1.MsgCheckAction",
    toAmino: MsgCheckAction.toAmino,
    fromAmino: MsgCheckAction.fromAmino
  },
  "/warden.act.v1beta1.MsgNewRule": {
    aminoType: "/warden.act.v1beta1.MsgNewRule",
    toAmino: MsgNewRule.toAmino,
    fromAmino: MsgNewRule.fromAmino
  },
  "/warden.act.v1beta1.MsgUpdateRule": {
    aminoType: "/warden.act.v1beta1.MsgUpdateRule",
    toAmino: MsgUpdateRule.toAmino,
    fromAmino: MsgUpdateRule.fromAmino
  },
  "/warden.act.v1beta1.MsgRevokeAction": {
    aminoType: "/warden.act.v1beta1.MsgRevokeAction",
    toAmino: MsgRevokeAction.toAmino,
    fromAmino: MsgRevokeAction.fromAmino
  },
  "/warden.act.v1beta1.MsgVoteForAction": {
    aminoType: "/warden.act.v1beta1.MsgVoteForAction",
    toAmino: MsgVoteForAction.toAmino,
    fromAmino: MsgVoteForAction.fromAmino
  }
};