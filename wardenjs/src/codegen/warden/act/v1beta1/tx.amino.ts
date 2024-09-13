//@ts-nocheck
import { MsgUpdateParams, MsgNewAction, MsgCheckAction, MsgNewTemplate, MsgUpdateTemplate, MsgRevokeAction, MsgVoteForAction } from "./tx.js";
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
  "/warden.act.v1beta1.MsgCheckAction": {
    aminoType: "/warden.act.v1beta1.MsgCheckAction",
    toAmino: MsgCheckAction.toAmino,
    fromAmino: MsgCheckAction.fromAmino
  },
  "/warden.act.v1beta1.MsgNewTemplate": {
    aminoType: "/warden.act.v1beta1.MsgNewTemplate",
    toAmino: MsgNewTemplate.toAmino,
    fromAmino: MsgNewTemplate.fromAmino
  },
  "/warden.act.v1beta1.MsgUpdateTemplate": {
    aminoType: "/warden.act.v1beta1.MsgUpdateTemplate",
    toAmino: MsgUpdateTemplate.toAmino,
    fromAmino: MsgUpdateTemplate.fromAmino
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