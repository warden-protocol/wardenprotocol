//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams } from "./tx.js";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/ethermint.feemarket.v1.MsgUpdateParams", MsgUpdateParams]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/ethermint.feemarket.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/ethermint.feemarket.v1.MsgUpdateParams",
        value
      };
    }
  },
  toJSON: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/ethermint.feemarket.v1.MsgUpdateParams",
        value: MsgUpdateParams.toJSON(value)
      };
    }
  },
  fromJSON: {
    updateParams(value: any) {
      return {
        typeUrl: "/ethermint.feemarket.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromJSON(value)
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/ethermint.feemarket.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    }
  }
};