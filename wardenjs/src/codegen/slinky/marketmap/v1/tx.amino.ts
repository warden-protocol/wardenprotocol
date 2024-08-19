//@ts-nocheck
import { MsgCreateMarkets, MsgUpdateMarkets, MsgParams, MsgRemoveMarketAuthorities, MsgUpsertMarkets } from "./tx.js";
export const AminoConverter = {
  "/slinky.marketmap.v1.MsgCreateMarkets": {
    aminoType: "slinky/x/marketmap/MsgCreateMarkets",
    toAmino: MsgCreateMarkets.toAmino,
    fromAmino: MsgCreateMarkets.fromAmino
  },
  "/slinky.marketmap.v1.MsgUpdateMarkets": {
    aminoType: "slinky/x/marketmap/MsgUpdateMarkets",
    toAmino: MsgUpdateMarkets.toAmino,
    fromAmino: MsgUpdateMarkets.fromAmino
  },
  "/slinky.marketmap.v1.MsgParams": {
    aminoType: "/slinky.marketmap.v1.MsgParams",
    toAmino: MsgParams.toAmino,
    fromAmino: MsgParams.fromAmino
  },
  "/slinky.marketmap.v1.MsgRemoveMarketAuthorities": {
    aminoType: "/slinky.marketmap.v1.MsgRemoveMarketAuthorities",
    toAmino: MsgRemoveMarketAuthorities.toAmino,
    fromAmino: MsgRemoveMarketAuthorities.fromAmino
  },
  "/slinky.marketmap.v1.MsgUpsertMarkets": {
    aminoType: "slinky/x/marketmap/MsgUpsertMarkets",
    toAmino: MsgUpsertMarkets.toAmino,
    fromAmino: MsgUpsertMarkets.fromAmino
  }
};