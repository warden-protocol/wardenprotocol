//@ts-nocheck
import { MsgUpdateParams, MsgAddFuture } from "./tx.js";
export const AminoConverter = {
  "/warden.async.v1beta1.MsgUpdateParams": {
    aminoType: "warden/x/async/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/warden.async.v1beta1.MsgAddFuture": {
    aminoType: "/warden.async.v1beta1.MsgAddFuture",
    toAmino: MsgAddFuture.toAmino,
    fromAmino: MsgAddFuture.fromAmino
  }
};