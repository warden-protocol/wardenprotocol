//@ts-nocheck
import { MsgUpdateParams, MsgAddTask } from "./tx.js";
export const AminoConverter = {
  "/warden.async.v1beta1.MsgUpdateParams": {
    aminoType: "warden/x/async/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/warden.async.v1beta1.MsgAddTask": {
    aminoType: "/warden.async.v1beta1.MsgAddTask",
    toAmino: MsgAddTask.toAmino,
    fromAmino: MsgAddTask.fromAmino
  }
};