//@ts-nocheck
import { MsgEthereumTx, MsgUpdateParams } from "./tx.js";
export const AminoConverter = {
  "/ethermint.evm.v1.MsgEthereumTx": {
    aminoType: "/ethermint.evm.v1.MsgEthereumTx",
    toAmino: MsgEthereumTx.toAmino,
    fromAmino: MsgEthereumTx.fromAmino
  },
  "/ethermint.evm.v1.MsgUpdateParams": {
    aminoType: "/ethermint.evm.v1.MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  }
};