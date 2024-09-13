//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgNewAction, MsgCheckAction, MsgNewTemplate, MsgUpdateTemplate, MsgRevokeAction, MsgVoteForAction } from "./tx.js";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/warden.act.v1beta1.MsgUpdateParams", MsgUpdateParams], ["/warden.act.v1beta1.MsgNewAction", MsgNewAction], ["/warden.act.v1beta1.MsgCheckAction", MsgCheckAction], ["/warden.act.v1beta1.MsgNewTemplate", MsgNewTemplate], ["/warden.act.v1beta1.MsgUpdateTemplate", MsgUpdateTemplate], ["/warden.act.v1beta1.MsgRevokeAction", MsgRevokeAction], ["/warden.act.v1beta1.MsgVoteForAction", MsgVoteForAction]];
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
    checkAction(value: MsgCheckAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgCheckAction",
        value: MsgCheckAction.encode(value).finish()
      };
    },
    newTemplate(value: MsgNewTemplate) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewTemplate",
        value: MsgNewTemplate.encode(value).finish()
      };
    },
    updateTemplate(value: MsgUpdateTemplate) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateTemplate",
        value: MsgUpdateTemplate.encode(value).finish()
      };
    },
    revokeAction(value: MsgRevokeAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
        value: MsgRevokeAction.encode(value).finish()
      };
    },
    voteForAction(value: MsgVoteForAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgVoteForAction",
        value: MsgVoteForAction.encode(value).finish()
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
    checkAction(value: MsgCheckAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgCheckAction",
        value
      };
    },
    newTemplate(value: MsgNewTemplate) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewTemplate",
        value
      };
    },
    updateTemplate(value: MsgUpdateTemplate) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateTemplate",
        value
      };
    },
    revokeAction(value: MsgRevokeAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
        value
      };
    },
    voteForAction(value: MsgVoteForAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgVoteForAction",
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
    checkAction(value: MsgCheckAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgCheckAction",
        value: MsgCheckAction.toJSON(value)
      };
    },
    newTemplate(value: MsgNewTemplate) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewTemplate",
        value: MsgNewTemplate.toJSON(value)
      };
    },
    updateTemplate(value: MsgUpdateTemplate) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateTemplate",
        value: MsgUpdateTemplate.toJSON(value)
      };
    },
    revokeAction(value: MsgRevokeAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
        value: MsgRevokeAction.toJSON(value)
      };
    },
    voteForAction(value: MsgVoteForAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgVoteForAction",
        value: MsgVoteForAction.toJSON(value)
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
    checkAction(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgCheckAction",
        value: MsgCheckAction.fromJSON(value)
      };
    },
    newTemplate(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewTemplate",
        value: MsgNewTemplate.fromJSON(value)
      };
    },
    updateTemplate(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateTemplate",
        value: MsgUpdateTemplate.fromJSON(value)
      };
    },
    revokeAction(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
        value: MsgRevokeAction.fromJSON(value)
      };
    },
    voteForAction(value: any) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgVoteForAction",
        value: MsgVoteForAction.fromJSON(value)
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
    checkAction(value: MsgCheckAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgCheckAction",
        value: MsgCheckAction.fromPartial(value)
      };
    },
    newTemplate(value: MsgNewTemplate) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgNewTemplate",
        value: MsgNewTemplate.fromPartial(value)
      };
    },
    updateTemplate(value: MsgUpdateTemplate) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgUpdateTemplate",
        value: MsgUpdateTemplate.fromPartial(value)
      };
    },
    revokeAction(value: MsgRevokeAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgRevokeAction",
        value: MsgRevokeAction.fromPartial(value)
      };
    },
    voteForAction(value: MsgVoteForAction) {
      return {
        typeUrl: "/warden.act.v1beta1.MsgVoteForAction",
        value: MsgVoteForAction.fromPartial(value)
      };
    }
  }
};