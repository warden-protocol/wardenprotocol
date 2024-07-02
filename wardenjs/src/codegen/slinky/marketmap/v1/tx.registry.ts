//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateMarkets, MsgUpdateMarkets, MsgParams, MsgRemoveMarketAuthorities, MsgUpsertMarkets } from "./tx.js";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/slinky.marketmap.v1.MsgCreateMarkets", MsgCreateMarkets], ["/slinky.marketmap.v1.MsgUpdateMarkets", MsgUpdateMarkets], ["/slinky.marketmap.v1.MsgParams", MsgParams], ["/slinky.marketmap.v1.MsgRemoveMarketAuthorities", MsgRemoveMarketAuthorities], ["/slinky.marketmap.v1.MsgUpsertMarkets", MsgUpsertMarkets]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createMarkets(value: MsgCreateMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgCreateMarkets",
        value: MsgCreateMarkets.encode(value).finish()
      };
    },
    updateMarkets(value: MsgUpdateMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgUpdateMarkets",
        value: MsgUpdateMarkets.encode(value).finish()
      };
    },
    updateParams(value: MsgParams) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgParams",
        value: MsgParams.encode(value).finish()
      };
    },
    removeMarketAuthorities(value: MsgRemoveMarketAuthorities) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthorities",
        value: MsgRemoveMarketAuthorities.encode(value).finish()
      };
    },
    upsertMarkets(value: MsgUpsertMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgUpsertMarkets",
        value: MsgUpsertMarkets.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createMarkets(value: MsgCreateMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgCreateMarkets",
        value
      };
    },
    updateMarkets(value: MsgUpdateMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgUpdateMarkets",
        value
      };
    },
    updateParams(value: MsgParams) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgParams",
        value
      };
    },
    removeMarketAuthorities(value: MsgRemoveMarketAuthorities) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthorities",
        value
      };
    },
    upsertMarkets(value: MsgUpsertMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgUpsertMarkets",
        value
      };
    }
  },
  toJSON: {
    createMarkets(value: MsgCreateMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgCreateMarkets",
        value: MsgCreateMarkets.toJSON(value)
      };
    },
    updateMarkets(value: MsgUpdateMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgUpdateMarkets",
        value: MsgUpdateMarkets.toJSON(value)
      };
    },
    updateParams(value: MsgParams) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgParams",
        value: MsgParams.toJSON(value)
      };
    },
    removeMarketAuthorities(value: MsgRemoveMarketAuthorities) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthorities",
        value: MsgRemoveMarketAuthorities.toJSON(value)
      };
    },
    upsertMarkets(value: MsgUpsertMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgUpsertMarkets",
        value: MsgUpsertMarkets.toJSON(value)
      };
    }
  },
  fromJSON: {
    createMarkets(value: any) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgCreateMarkets",
        value: MsgCreateMarkets.fromJSON(value)
      };
    },
    updateMarkets(value: any) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgUpdateMarkets",
        value: MsgUpdateMarkets.fromJSON(value)
      };
    },
    updateParams(value: any) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgParams",
        value: MsgParams.fromJSON(value)
      };
    },
    removeMarketAuthorities(value: any) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthorities",
        value: MsgRemoveMarketAuthorities.fromJSON(value)
      };
    },
    upsertMarkets(value: any) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgUpsertMarkets",
        value: MsgUpsertMarkets.fromJSON(value)
      };
    }
  },
  fromPartial: {
    createMarkets(value: MsgCreateMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgCreateMarkets",
        value: MsgCreateMarkets.fromPartial(value)
      };
    },
    updateMarkets(value: MsgUpdateMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgUpdateMarkets",
        value: MsgUpdateMarkets.fromPartial(value)
      };
    },
    updateParams(value: MsgParams) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgParams",
        value: MsgParams.fromPartial(value)
      };
    },
    removeMarketAuthorities(value: MsgRemoveMarketAuthorities) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgRemoveMarketAuthorities",
        value: MsgRemoveMarketAuthorities.fromPartial(value)
      };
    },
    upsertMarkets(value: MsgUpsertMarkets) {
      return {
        typeUrl: "/slinky.marketmap.v1.MsgUpsertMarkets",
        value: MsgUpsertMarkets.fromPartial(value)
      };
    }
  }
};