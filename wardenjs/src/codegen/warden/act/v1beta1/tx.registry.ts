//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgNewAction, MsgApproveAction, MsgNewRule, MsgUpdateRule, MsgRevokeAction } from "./tx.js";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/warden.act.v1beta1.MsgUpdateParams", MsgUpdateParams], ["/warden.act.v1beta1.MsgNewAction", MsgNewAction], ["/warden.act.v1beta1.MsgApproveAction", MsgApproveAction], ["/warden.act.v1beta1.MsgNewRule", MsgNewRule], ["/warden.act.v1beta1.MsgUpdateRule", MsgUpdateRule], ["/warden.act.v1beta1.MsgRevokeAction", MsgRevokeAction]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    newAction(value: MsgNewAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewAction",
        value: MsgNewAction.encode(value).finish()
      };
    },
    approveAction(value: MsgApproveAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgApproveAction",
        value: MsgApproveAction.encode(value).finish()
      };
    },
    newRule(value: MsgNewRule) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewRule",
        value: MsgNewRule.encode(value).finish()
      };
    },
    updateRule(value: MsgUpdateRule) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateRule",
        value: MsgUpdateRule.encode(value).finish()
      };
    },
    revokeAction(value: MsgRevokeAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
        value: MsgRevokeAction.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateParams",
        value
      };
    },
    newAction(value: MsgNewAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewAction",
        value
      };
    },
    approveAction(value: MsgApproveAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgApproveAction",
        value
      };
    },
    newRule(value: MsgNewRule) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewRule",
        value
      };
    },
    updateRule(value: MsgUpdateRule) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateRule",
        value
      };
    },
    revokeAction(value: MsgRevokeAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
        value
      };
    }
  },
  toJSON: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateParams",
        value: MsgUpdateParams.toJSON(value)
      };
    },
    newAction(value: MsgNewAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewAction",
        value: MsgNewAction.toJSON(value)
      };
    },
    approveAction(value: MsgApproveAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgApproveAction",
        value: MsgApproveAction.toJSON(value)
      };
    },
    newRule(value: MsgNewRule) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewRule",
        value: MsgNewRule.toJSON(value)
      };
    },
    updateRule(value: MsgUpdateRule) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateRule",
        value: MsgUpdateRule.toJSON(value)
      };
    },
    revokeAction(value: MsgRevokeAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
        value: MsgRevokeAction.toJSON(value)
      };
    }
  },
  fromJSON: {
    updateParams(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateParams",
        value: MsgUpdateParams.fromJSON(value)
      };
    },
    newAction(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewAction",
        value: MsgNewAction.fromJSON(value)
      };
    },
    approveAction(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgApproveAction",
        value: MsgApproveAction.fromJSON(value)
      };
    },
    newRule(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewRule",
        value: MsgNewRule.fromJSON(value)
      };
    },
    updateRule(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateRule",
        value: MsgUpdateRule.fromJSON(value)
      };
    },
    revokeAction(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
        value: MsgRevokeAction.fromJSON(value)
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    newAction(value: MsgNewAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewAction",
        value: MsgNewAction.fromPartial(value)
      };
    },
    approveAction(value: MsgApproveAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgApproveAction",
        value: MsgApproveAction.fromPartial(value)
      };
    },
    newRule(value: MsgNewRule) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewRule",
        value: MsgNewRule.fromPartial(value)
      };
    },
    updateRule(value: MsgUpdateRule) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateRule",
        value: MsgUpdateRule.fromPartial(value)
      };
    },
    revokeAction(value: MsgRevokeAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
        value: MsgRevokeAction.fromPartial(value)
      };
    }
  }
};