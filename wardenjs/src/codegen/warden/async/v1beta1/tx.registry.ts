//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgAddTask } from "./tx.js";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/warden.async.v1beta1.MsgUpdateParams", MsgUpdateParams], ["/warden.async.v1beta1.MsgAddTask", MsgAddTask]];
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
    addTask(value: MsgAddTask) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgAddTask",
        value: MsgAddTask.encode(value).finish()
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
    addTask(value: MsgAddTask) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgAddTask",
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
    addTask(value: MsgAddTask) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgAddTask",
        value: MsgAddTask.toJSON(value)
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
    addTask(value: any) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgAddTask",
        value: MsgAddTask.fromJSON(value)
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
    addTask(value: MsgAddTask) {
      return {
        typeUrl: "/warden.async.v1beta1.MsgAddTask",
        value: MsgAddTask.fromPartial(value)
      };
    }
  }
};