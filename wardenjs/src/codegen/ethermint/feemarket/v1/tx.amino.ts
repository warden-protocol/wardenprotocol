//@ts-nocheck
import { MsgUpdateParams } from "./tx.js";
export const AminoConverter = {
  "/ethermint.feemarket.v1.MsgUpdateParams": {
    aminoType: "evmos/x/feemarket/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};