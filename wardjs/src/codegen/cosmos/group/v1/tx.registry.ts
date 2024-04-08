//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateGroup, MsgUpdateGroupMembers, MsgUpdateGroupAdmin, MsgUpdateGroupMetadata, MsgCreateGroupPolicy, MsgCreateGroupWithPolicy, MsgUpdateGroupPolicyAdmin, MsgUpdateGroupPolicyDecisionPolicy, MsgUpdateGroupPolicyMetadata, MsgSubmitProposal, MsgWithdrawProposal, MsgVote, MsgExec, MsgLeaveGroup } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/cosmos.group.v1.MsgCreateGroup", MsgCreateGroup], ["/cosmos.group.v1.MsgUpdateGroupMembers", MsgUpdateGroupMembers], ["/cosmos.group.v1.MsgUpdateGroupAdmin", MsgUpdateGroupAdmin], ["/cosmos.group.v1.MsgUpdateGroupMetadata", MsgUpdateGroupMetadata], ["/cosmos.group.v1.MsgCreateGroupPolicy", MsgCreateGroupPolicy], ["/cosmos.group.v1.MsgCreateGroupWithPolicy", MsgCreateGroupWithPolicy], ["/cosmos.group.v1.MsgUpdateGroupPolicyAdmin", MsgUpdateGroupPolicyAdmin], ["/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy", MsgUpdateGroupPolicyDecisionPolicy], ["/cosmos.group.v1.MsgUpdateGroupPolicyMetadata", MsgUpdateGroupPolicyMetadata], ["/cosmos.group.v1.MsgSubmitProposal", MsgSubmitProposal], ["/cosmos.group.v1.MsgWithdrawProposal", MsgWithdrawProposal], ["/cosmos.group.v1.MsgVote", MsgVote], ["/cosmos.group.v1.MsgExec", MsgExec], ["/cosmos.group.v1.MsgLeaveGroup", MsgLeaveGroup]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createGroup(value: MsgCreateGroup) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroup",
        value: MsgCreateGroup.encode(value).finish()
      };
    },
    updateGroupMembers(value: MsgUpdateGroupMembers) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembers",
        value: MsgUpdateGroupMembers.encode(value).finish()
      };
    },
    updateGroupAdmin(value: MsgUpdateGroupAdmin) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdmin",
        value: MsgUpdateGroupAdmin.encode(value).finish()
      };
    },
    updateGroupMetadata(value: MsgUpdateGroupMetadata) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadata",
        value: MsgUpdateGroupMetadata.encode(value).finish()
      };
    },
    createGroupPolicy(value: MsgCreateGroupPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicy",
        value: MsgCreateGroupPolicy.encode(value).finish()
      };
    },
    createGroupWithPolicy(value: MsgCreateGroupWithPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy",
        value: MsgCreateGroupWithPolicy.encode(value).finish()
      };
    },
    updateGroupPolicyAdmin(value: MsgUpdateGroupPolicyAdmin) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
        value: MsgUpdateGroupPolicyAdmin.encode(value).finish()
      };
    },
    updateGroupPolicyDecisionPolicy(value: MsgUpdateGroupPolicyDecisionPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
        value: MsgUpdateGroupPolicyDecisionPolicy.encode(value).finish()
      };
    },
    updateGroupPolicyMetadata(value: MsgUpdateGroupPolicyMetadata) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
        value: MsgUpdateGroupPolicyMetadata.encode(value).finish()
      };
    },
    submitProposal(value: MsgSubmitProposal) {
      return {
        typeUrl: "/cosmos.group.v1.MsgSubmitProposal",
        value: MsgSubmitProposal.encode(value).finish()
      };
    },
    withdrawProposal(value: MsgWithdrawProposal) {
      return {
        typeUrl: "/cosmos.group.v1.MsgWithdrawProposal",
        value: MsgWithdrawProposal.encode(value).finish()
      };
    },
    vote(value: MsgVote) {
      return {
        typeUrl: "/cosmos.group.v1.MsgVote",
        value: MsgVote.encode(value).finish()
      };
    },
    exec(value: MsgExec) {
      return {
        typeUrl: "/cosmos.group.v1.MsgExec",
        value: MsgExec.encode(value).finish()
      };
    },
    leaveGroup(value: MsgLeaveGroup) {
      return {
        typeUrl: "/cosmos.group.v1.MsgLeaveGroup",
        value: MsgLeaveGroup.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createGroup(value: MsgCreateGroup) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroup",
        value
      };
    },
    updateGroupMembers(value: MsgUpdateGroupMembers) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembers",
        value
      };
    },
    updateGroupAdmin(value: MsgUpdateGroupAdmin) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdmin",
        value
      };
    },
    updateGroupMetadata(value: MsgUpdateGroupMetadata) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadata",
        value
      };
    },
    createGroupPolicy(value: MsgCreateGroupPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicy",
        value
      };
    },
    createGroupWithPolicy(value: MsgCreateGroupWithPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy",
        value
      };
    },
    updateGroupPolicyAdmin(value: MsgUpdateGroupPolicyAdmin) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
        value
      };
    },
    updateGroupPolicyDecisionPolicy(value: MsgUpdateGroupPolicyDecisionPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
        value
      };
    },
    updateGroupPolicyMetadata(value: MsgUpdateGroupPolicyMetadata) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
        value
      };
    },
    submitProposal(value: MsgSubmitProposal) {
      return {
        typeUrl: "/cosmos.group.v1.MsgSubmitProposal",
        value
      };
    },
    withdrawProposal(value: MsgWithdrawProposal) {
      return {
        typeUrl: "/cosmos.group.v1.MsgWithdrawProposal",
        value
      };
    },
    vote(value: MsgVote) {
      return {
        typeUrl: "/cosmos.group.v1.MsgVote",
        value
      };
    },
    exec(value: MsgExec) {
      return {
        typeUrl: "/cosmos.group.v1.MsgExec",
        value
      };
    },
    leaveGroup(value: MsgLeaveGroup) {
      return {
        typeUrl: "/cosmos.group.v1.MsgLeaveGroup",
        value
      };
    }
  },
  toJSON: {
    createGroup(value: MsgCreateGroup) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroup",
        value: MsgCreateGroup.toJSON(value)
      };
    },
    updateGroupMembers(value: MsgUpdateGroupMembers) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembers",
        value: MsgUpdateGroupMembers.toJSON(value)
      };
    },
    updateGroupAdmin(value: MsgUpdateGroupAdmin) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdmin",
        value: MsgUpdateGroupAdmin.toJSON(value)
      };
    },
    updateGroupMetadata(value: MsgUpdateGroupMetadata) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadata",
        value: MsgUpdateGroupMetadata.toJSON(value)
      };
    },
    createGroupPolicy(value: MsgCreateGroupPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicy",
        value: MsgCreateGroupPolicy.toJSON(value)
      };
    },
    createGroupWithPolicy(value: MsgCreateGroupWithPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy",
        value: MsgCreateGroupWithPolicy.toJSON(value)
      };
    },
    updateGroupPolicyAdmin(value: MsgUpdateGroupPolicyAdmin) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
        value: MsgUpdateGroupPolicyAdmin.toJSON(value)
      };
    },
    updateGroupPolicyDecisionPolicy(value: MsgUpdateGroupPolicyDecisionPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
        value: MsgUpdateGroupPolicyDecisionPolicy.toJSON(value)
      };
    },
    updateGroupPolicyMetadata(value: MsgUpdateGroupPolicyMetadata) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
        value: MsgUpdateGroupPolicyMetadata.toJSON(value)
      };
    },
    submitProposal(value: MsgSubmitProposal) {
      return {
        typeUrl: "/cosmos.group.v1.MsgSubmitProposal",
        value: MsgSubmitProposal.toJSON(value)
      };
    },
    withdrawProposal(value: MsgWithdrawProposal) {
      return {
        typeUrl: "/cosmos.group.v1.MsgWithdrawProposal",
        value: MsgWithdrawProposal.toJSON(value)
      };
    },
    vote(value: MsgVote) {
      return {
        typeUrl: "/cosmos.group.v1.MsgVote",
        value: MsgVote.toJSON(value)
      };
    },
    exec(value: MsgExec) {
      return {
        typeUrl: "/cosmos.group.v1.MsgExec",
        value: MsgExec.toJSON(value)
      };
    },
    leaveGroup(value: MsgLeaveGroup) {
      return {
        typeUrl: "/cosmos.group.v1.MsgLeaveGroup",
        value: MsgLeaveGroup.toJSON(value)
      };
    }
  },
  fromJSON: {
    createGroup(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroup",
        value: MsgCreateGroup.fromJSON(value)
      };
    },
    updateGroupMembers(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembers",
        value: MsgUpdateGroupMembers.fromJSON(value)
      };
    },
    updateGroupAdmin(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdmin",
        value: MsgUpdateGroupAdmin.fromJSON(value)
      };
    },
    updateGroupMetadata(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadata",
        value: MsgUpdateGroupMetadata.fromJSON(value)
      };
    },
    createGroupPolicy(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicy",
        value: MsgCreateGroupPolicy.fromJSON(value)
      };
    },
    createGroupWithPolicy(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy",
        value: MsgCreateGroupWithPolicy.fromJSON(value)
      };
    },
    updateGroupPolicyAdmin(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
        value: MsgUpdateGroupPolicyAdmin.fromJSON(value)
      };
    },
    updateGroupPolicyDecisionPolicy(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
        value: MsgUpdateGroupPolicyDecisionPolicy.fromJSON(value)
      };
    },
    updateGroupPolicyMetadata(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
        value: MsgUpdateGroupPolicyMetadata.fromJSON(value)
      };
    },
    submitProposal(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgSubmitProposal",
        value: MsgSubmitProposal.fromJSON(value)
      };
    },
    withdrawProposal(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgWithdrawProposal",
        value: MsgWithdrawProposal.fromJSON(value)
      };
    },
    vote(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgVote",
        value: MsgVote.fromJSON(value)
      };
    },
    exec(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgExec",
        value: MsgExec.fromJSON(value)
      };
    },
    leaveGroup(value: any) {
      return {
        typeUrl: "/cosmos.group.v1.MsgLeaveGroup",
        value: MsgLeaveGroup.fromJSON(value)
      };
    }
  },
  fromPartial: {
    createGroup(value: MsgCreateGroup) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroup",
        value: MsgCreateGroup.fromPartial(value)
      };
    },
    updateGroupMembers(value: MsgUpdateGroupMembers) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMembers",
        value: MsgUpdateGroupMembers.fromPartial(value)
      };
    },
    updateGroupAdmin(value: MsgUpdateGroupAdmin) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupAdmin",
        value: MsgUpdateGroupAdmin.fromPartial(value)
      };
    },
    updateGroupMetadata(value: MsgUpdateGroupMetadata) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupMetadata",
        value: MsgUpdateGroupMetadata.fromPartial(value)
      };
    },
    createGroupPolicy(value: MsgCreateGroupPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupPolicy",
        value: MsgCreateGroupPolicy.fromPartial(value)
      };
    },
    createGroupWithPolicy(value: MsgCreateGroupWithPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgCreateGroupWithPolicy",
        value: MsgCreateGroupWithPolicy.fromPartial(value)
      };
    },
    updateGroupPolicyAdmin(value: MsgUpdateGroupPolicyAdmin) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
        value: MsgUpdateGroupPolicyAdmin.fromPartial(value)
      };
    },
    updateGroupPolicyDecisionPolicy(value: MsgUpdateGroupPolicyDecisionPolicy) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
        value: MsgUpdateGroupPolicyDecisionPolicy.fromPartial(value)
      };
    },
    updateGroupPolicyMetadata(value: MsgUpdateGroupPolicyMetadata) {
      return {
        typeUrl: "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
        value: MsgUpdateGroupPolicyMetadata.fromPartial(value)
      };
    },
    submitProposal(value: MsgSubmitProposal) {
      return {
        typeUrl: "/cosmos.group.v1.MsgSubmitProposal",
        value: MsgSubmitProposal.fromPartial(value)
      };
    },
    withdrawProposal(value: MsgWithdrawProposal) {
      return {
        typeUrl: "/cosmos.group.v1.MsgWithdrawProposal",
        value: MsgWithdrawProposal.fromPartial(value)
      };
    },
    vote(value: MsgVote) {
      return {
        typeUrl: "/cosmos.group.v1.MsgVote",
        value: MsgVote.fromPartial(value)
      };
    },
    exec(value: MsgExec) {
      return {
        typeUrl: "/cosmos.group.v1.MsgExec",
        value: MsgExec.fromPartial(value)
      };
    },
    leaveGroup(value: MsgLeaveGroup) {
      return {
        typeUrl: "/cosmos.group.v1.MsgLeaveGroup",
        value: MsgLeaveGroup.fromPartial(value)
      };
    }
  }
};