//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSetParams, MsgBridge } from "./tx.js";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/warden.gmp.MsgSetParams", MsgSetParams], ["/warden.gmp.MsgBridge", MsgBridge]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    setParams(value: MsgSetParams) {
      return {
        typeUrl: "/warden.gmp.MsgSetParams",
        value: MsgSetParams.encode(value).finish()
      };
    },
    bridge(value: MsgBridge) {
      return {
        typeUrl: "/warden.gmp.MsgBridge",
        value: MsgBridge.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    setParams(value: MsgSetParams) {
      return {
        typeUrl: "/warden.gmp.MsgSetParams",
        value
      };
    },
    bridge(value: MsgBridge) {
      return {
        typeUrl: "/warden.gmp.MsgBridge",
        value
      };
    }
  },
  toJSON: {
    setParams(value: MsgSetParams) {
      return {
        typeUrl: "/warden.gmp.MsgSetParams",
        value: MsgSetParams.toJSON(value)
      };
    },
    bridge(value: MsgBridge) {
      return {
        typeUrl: "/warden.gmp.MsgBridge",
        value: MsgBridge.toJSON(value)
      };
    }
  },
  fromJSON: {
    setParams(value: any) {
      return {
        typeUrl: "/warden.gmp.MsgSetParams",
        value: MsgSetParams.fromJSON(value)
      };
    },
    bridge(value: any) {
      return {
        typeUrl: "/warden.gmp.MsgBridge",
        value: MsgBridge.fromJSON(value)
      };
    }
  },
  fromPartial: {
    setParams(value: MsgSetParams) {
      return {
        typeUrl: "/warden.gmp.MsgSetParams",
        value: MsgSetParams.fromPartial(value)
      };
    },
    bridge(value: MsgBridge) {
      return {
        typeUrl: "/warden.gmp.MsgBridge",
        value: MsgBridge.fromPartial(value)
      };
    }
  }
};