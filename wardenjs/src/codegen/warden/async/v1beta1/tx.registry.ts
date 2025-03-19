//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgAddFuture } from "./tx.js";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/warden.async.v1beta1.MsgUpdateParams", MsgUpdateParams], ["/warden.async.v1beta1.MsgAddFuture", MsgAddFuture]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    addFuture(value: MsgAddFuture) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgAddFuture",
        value: MsgAddFuture.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgUpdateParams",
        value
      };
    },
    addFuture(value: MsgAddFuture) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgAddFuture",
        value
      };
    }
  },
  toJSON: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgUpdateParams",
        value: MsgUpdateParams.toJSON(value)
      };
    },
    addFuture(value: MsgAddFuture) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgAddFuture",
        value: MsgAddFuture.toJSON(value)
      };
    }
  },
  fromJSON: {
    updateParams(value: any) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgUpdateParams",
        value: MsgUpdateParams.fromJSON(value)
      };
    },
    addFuture(value: any) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgAddFuture",
        value: MsgAddFuture.fromJSON(value)
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    addFuture(value: MsgAddFuture) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgAddFuture",
        value: MsgAddFuture.fromPartial(value)
      };
    }
  }
};