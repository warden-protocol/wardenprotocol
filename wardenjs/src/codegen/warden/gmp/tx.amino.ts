//@ts-nocheck
import { MsgSetParams, MsgBridge } from "./tx.js";
export const AminoConverter = {
  "/warden.gmp.MsgSetParams": {
    aminoType: "/warden.gmp.MsgSetParams",
    toAmino: MsgSetParams.toAmino,
    fromAmino: MsgSetParams.fromAmino
  },
  "/warden.gmp.MsgBridge": {
    aminoType: "/warden.gmp.MsgBridge",
    toAmino: MsgBridge.toAmino,
    fromAmino: MsgBridge.fromAmino
  }
};