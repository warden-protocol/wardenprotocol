//@ts-nocheck
import { MsgAddCurrencyPairs, MsgRemoveCurrencyPairs } from "./tx.js";
export const AminoConverter = {
  "/slinky.oracle.v1.MsgAddCurrencyPairs": {
    aminoType: "slinky/x/oracle/MsgAddCurrencyPairs",
    toAmino: MsgAddCurrencyPairs.toAmino,
    fromAmino: MsgAddCurrencyPairs.fromAmino
  },
  "/slinky.oracle.v1.MsgRemoveCurrencyPairs": {
    aminoType: "slinky/x/oracle/MsgSetCurrencyPairs",
    toAmino: MsgRemoveCurrencyPairs.toAmino,
    fromAmino: MsgRemoveCurrencyPairs.fromAmino
  }
};