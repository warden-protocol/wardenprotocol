//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSend, MsgMultiSend } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/cosmos.bank.v1beta1.MsgSend", MsgSend], ["/cosmos.bank.v1beta1.MsgMultiSend", MsgMultiSend]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    send(value: MsgSend) {
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: MsgSend.encode(value).finish()
      };
    },
    multiSend(value: MsgMultiSend) {
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
        value: MsgMultiSend.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    send(value: MsgSend) {
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value
      };
    },
    multiSend(value: MsgMultiSend) {
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
        value
      };
    }
  },
  toJSON: {
    send(value: MsgSend) {
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: MsgSend.toJSON(value)
      };
    },
    multiSend(value: MsgMultiSend) {
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
        value: MsgMultiSend.toJSON(value)
      };
    }
  },
  fromJSON: {
    send(value: any) {
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: MsgSend.fromJSON(value)
      };
    },
    multiSend(value: any) {
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
        value: MsgMultiSend.fromJSON(value)
      };
    }
  },
  fromPartial: {
    send(value: MsgSend) {
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: MsgSend.fromPartial(value)
      };
    },
    multiSend(value: MsgMultiSend) {
      return {
        typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
        value: MsgMultiSend.fromPartial(value)
      };
    }
  }
};