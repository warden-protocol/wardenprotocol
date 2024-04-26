//@ts-nocheck
import { MsgCreateGroup, MsgUpdateGroupMembers, MsgUpdateGroupAdmin, MsgUpdateGroupMetadata, MsgCreateGroupPolicy, MsgCreateGroupWithPolicy, MsgUpdateGroupPolicyAdmin, MsgUpdateGroupPolicyDecisionPolicy, MsgUpdateGroupPolicyMetadata, MsgSubmitProposal, MsgWithdrawProposal, MsgVote, MsgExec, MsgLeaveGroup } from "./tx";
export const AminoConverter = {
  "/cosmos.group.v1.MsgCreateGroup": {
    aminoType: "cosmos-sdk/MsgCreateGroup",
    toAmino: MsgCreateGroup.toAmino,
    fromAmino: MsgCreateGroup.fromAmino
  },
  "/cosmos.group.v1.MsgUpdateGroupMembers": {
    aminoType: "cosmos-sdk/MsgUpdateGroupMembers",
    toAmino: MsgUpdateGroupMembers.toAmino,
    fromAmino: MsgUpdateGroupMembers.fromAmino
  },
  "/cosmos.group.v1.MsgUpdateGroupAdmin": {
    aminoType: "cosmos-sdk/MsgUpdateGroupAdmin",
    toAmino: MsgUpdateGroupAdmin.toAmino,
    fromAmino: MsgUpdateGroupAdmin.fromAmino
  },
  "/cosmos.group.v1.MsgUpdateGroupMetadata": {
    aminoType: "cosmos-sdk/MsgUpdateGroupMetadata",
    toAmino: MsgUpdateGroupMetadata.toAmino,
    fromAmino: MsgUpdateGroupMetadata.fromAmino
  },
  "/cosmos.group.v1.MsgCreateGroupPolicy": {
    aminoType: "cosmos-sdk/MsgCreateGroupPolicy",
    toAmino: MsgCreateGroupPolicy.toAmino,
    fromAmino: MsgCreateGroupPolicy.fromAmino
  },
  "/cosmos.group.v1.MsgCreateGroupWithPolicy": {
    aminoType: "cosmos-sdk/MsgCreateGroupWithPolicy",
    toAmino: MsgCreateGroupWithPolicy.toAmino,
    fromAmino: MsgCreateGroupWithPolicy.fromAmino
  },
  "/cosmos.group.v1.MsgUpdateGroupPolicyAdmin": {
    aminoType: "cosmos-sdk/MsgUpdateGroupPolicyAdmin",
    toAmino: MsgUpdateGroupPolicyAdmin.toAmino,
    fromAmino: MsgUpdateGroupPolicyAdmin.fromAmino
  },
  "/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy": {
    aminoType: "cosmos-sdk/MsgUpdateGroupPolicyDecisionPolicy",
    toAmino: MsgUpdateGroupPolicyDecisionPolicy.toAmino,
    fromAmino: MsgUpdateGroupPolicyDecisionPolicy.fromAmino
  },
  "/cosmos.group.v1.MsgUpdateGroupPolicyMetadata": {
    aminoType: "cosmos-sdk/MsgUpdateGroupPolicyMetadata",
    toAmino: MsgUpdateGroupPolicyMetadata.toAmino,
    fromAmino: MsgUpdateGroupPolicyMetadata.fromAmino
  },
  "/cosmos.group.v1.MsgSubmitProposal": {
    aminoType: "cosmos-sdk/group/MsgSubmitProposal",
    toAmino: MsgSubmitProposal.toAmino,
    fromAmino: MsgSubmitProposal.fromAmino
  },
  "/cosmos.group.v1.MsgWithdrawProposal": {
    aminoType: "cosmos-sdk/group/MsgWithdrawProposal",
    toAmino: MsgWithdrawProposal.toAmino,
    fromAmino: MsgWithdrawProposal.fromAmino
  },
  "/cosmos.group.v1.MsgVote": {
    aminoType: "cosmos-sdk/group/MsgVote",
    toAmino: MsgVote.toAmino,
    fromAmino: MsgVote.fromAmino
  },
  "/cosmos.group.v1.MsgExec": {
    aminoType: "cosmos-sdk/group/MsgExec",
    toAmino: MsgExec.toAmino,
    fromAmino: MsgExec.fromAmino
  },
  "/cosmos.group.v1.MsgLeaveGroup": {
    aminoType: "cosmos-sdk/group/MsgLeaveGroup",
    toAmino: MsgLeaveGroup.toAmino,
    fromAmino: MsgLeaveGroup.fromAmino
  }
};