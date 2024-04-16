//@ts-nocheck
import { Rpc } from "../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { MsgCreateGroup, MsgCreateGroupResponse, MsgUpdateGroupMembers, MsgUpdateGroupMembersResponse, MsgUpdateGroupAdmin, MsgUpdateGroupAdminResponse, MsgUpdateGroupMetadata, MsgUpdateGroupMetadataResponse, MsgCreateGroupPolicy, MsgCreateGroupPolicyResponse, MsgCreateGroupWithPolicy, MsgCreateGroupWithPolicyResponse, MsgUpdateGroupPolicyAdmin, MsgUpdateGroupPolicyAdminResponse, MsgUpdateGroupPolicyDecisionPolicy, MsgUpdateGroupPolicyDecisionPolicyResponse, MsgUpdateGroupPolicyMetadata, MsgUpdateGroupPolicyMetadataResponse, MsgSubmitProposal, MsgSubmitProposalResponse, MsgWithdrawProposal, MsgWithdrawProposalResponse, MsgVote, MsgVoteResponse, MsgExec, MsgExecResponse, MsgLeaveGroup, MsgLeaveGroupResponse } from "./tx";
/** Msg is the cosmos.group.v1 Msg service. */
export interface Msg {
  /** CreateGroup creates a new group with an admin account address, a list of members and some optional metadata. */
  createGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse>;
  /** UpdateGroupMembers updates the group members with given group id and admin address. */
  updateGroupMembers(request: MsgUpdateGroupMembers): Promise<MsgUpdateGroupMembersResponse>;
  /** UpdateGroupAdmin updates the group admin with given group id and previous admin address. */
  updateGroupAdmin(request: MsgUpdateGroupAdmin): Promise<MsgUpdateGroupAdminResponse>;
  /** UpdateGroupMetadata updates the group metadata with given group id and admin address. */
  updateGroupMetadata(request: MsgUpdateGroupMetadata): Promise<MsgUpdateGroupMetadataResponse>;
  /** CreateGroupPolicy creates a new group policy using given DecisionPolicy. */
  createGroupPolicy(request: MsgCreateGroupPolicy): Promise<MsgCreateGroupPolicyResponse>;
  /** CreateGroupWithPolicy creates a new group with policy. */
  createGroupWithPolicy(request: MsgCreateGroupWithPolicy): Promise<MsgCreateGroupWithPolicyResponse>;
  /** UpdateGroupPolicyAdmin updates a group policy admin. */
  updateGroupPolicyAdmin(request: MsgUpdateGroupPolicyAdmin): Promise<MsgUpdateGroupPolicyAdminResponse>;
  /** UpdateGroupPolicyDecisionPolicy allows a group policy's decision policy to be updated. */
  updateGroupPolicyDecisionPolicy(request: MsgUpdateGroupPolicyDecisionPolicy): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse>;
  /** UpdateGroupPolicyMetadata updates a group policy metadata. */
  updateGroupPolicyMetadata(request: MsgUpdateGroupPolicyMetadata): Promise<MsgUpdateGroupPolicyMetadataResponse>;
  /** SubmitProposal submits a new proposal. */
  submitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse>;
  /** WithdrawProposal aborts a proposal. */
  withdrawProposal(request: MsgWithdrawProposal): Promise<MsgWithdrawProposalResponse>;
  /** Vote allows a voter to vote on a proposal. */
  vote(request: MsgVote): Promise<MsgVoteResponse>;
  /** Exec executes a proposal. */
  exec(request: MsgExec): Promise<MsgExecResponse>;
  /** LeaveGroup allows a group member to leave the group. */
  leaveGroup(request: MsgLeaveGroup): Promise<MsgLeaveGroupResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createGroup = this.createGroup.bind(this);
    this.updateGroupMembers = this.updateGroupMembers.bind(this);
    this.updateGroupAdmin = this.updateGroupAdmin.bind(this);
    this.updateGroupMetadata = this.updateGroupMetadata.bind(this);
    this.createGroupPolicy = this.createGroupPolicy.bind(this);
    this.createGroupWithPolicy = this.createGroupWithPolicy.bind(this);
    this.updateGroupPolicyAdmin = this.updateGroupPolicyAdmin.bind(this);
    this.updateGroupPolicyDecisionPolicy = this.updateGroupPolicyDecisionPolicy.bind(this);
    this.updateGroupPolicyMetadata = this.updateGroupPolicyMetadata.bind(this);
    this.submitProposal = this.submitProposal.bind(this);
    this.withdrawProposal = this.withdrawProposal.bind(this);
    this.vote = this.vote.bind(this);
    this.exec = this.exec.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
  }
  createGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse> {
    const data = MsgCreateGroup.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "CreateGroup", data);
    return promise.then(data => MsgCreateGroupResponse.decode(new _m0.Reader(data)));
  }
  updateGroupMembers(request: MsgUpdateGroupMembers): Promise<MsgUpdateGroupMembersResponse> {
    const data = MsgUpdateGroupMembers.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "UpdateGroupMembers", data);
    return promise.then(data => MsgUpdateGroupMembersResponse.decode(new _m0.Reader(data)));
  }
  updateGroupAdmin(request: MsgUpdateGroupAdmin): Promise<MsgUpdateGroupAdminResponse> {
    const data = MsgUpdateGroupAdmin.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "UpdateGroupAdmin", data);
    return promise.then(data => MsgUpdateGroupAdminResponse.decode(new _m0.Reader(data)));
  }
  updateGroupMetadata(request: MsgUpdateGroupMetadata): Promise<MsgUpdateGroupMetadataResponse> {
    const data = MsgUpdateGroupMetadata.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "UpdateGroupMetadata", data);
    return promise.then(data => MsgUpdateGroupMetadataResponse.decode(new _m0.Reader(data)));
  }
  createGroupPolicy(request: MsgCreateGroupPolicy): Promise<MsgCreateGroupPolicyResponse> {
    const data = MsgCreateGroupPolicy.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "CreateGroupPolicy", data);
    return promise.then(data => MsgCreateGroupPolicyResponse.decode(new _m0.Reader(data)));
  }
  createGroupWithPolicy(request: MsgCreateGroupWithPolicy): Promise<MsgCreateGroupWithPolicyResponse> {
    const data = MsgCreateGroupWithPolicy.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "CreateGroupWithPolicy", data);
    return promise.then(data => MsgCreateGroupWithPolicyResponse.decode(new _m0.Reader(data)));
  }
  updateGroupPolicyAdmin(request: MsgUpdateGroupPolicyAdmin): Promise<MsgUpdateGroupPolicyAdminResponse> {
    const data = MsgUpdateGroupPolicyAdmin.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "UpdateGroupPolicyAdmin", data);
    return promise.then(data => MsgUpdateGroupPolicyAdminResponse.decode(new _m0.Reader(data)));
  }
  updateGroupPolicyDecisionPolicy(request: MsgUpdateGroupPolicyDecisionPolicy): Promise<MsgUpdateGroupPolicyDecisionPolicyResponse> {
    const data = MsgUpdateGroupPolicyDecisionPolicy.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "UpdateGroupPolicyDecisionPolicy", data);
    return promise.then(data => MsgUpdateGroupPolicyDecisionPolicyResponse.decode(new _m0.Reader(data)));
  }
  updateGroupPolicyMetadata(request: MsgUpdateGroupPolicyMetadata): Promise<MsgUpdateGroupPolicyMetadataResponse> {
    const data = MsgUpdateGroupPolicyMetadata.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "UpdateGroupPolicyMetadata", data);
    return promise.then(data => MsgUpdateGroupPolicyMetadataResponse.decode(new _m0.Reader(data)));
  }
  submitProposal(request: MsgSubmitProposal): Promise<MsgSubmitProposalResponse> {
    const data = MsgSubmitProposal.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "SubmitProposal", data);
    return promise.then(data => MsgSubmitProposalResponse.decode(new _m0.Reader(data)));
  }
  withdrawProposal(request: MsgWithdrawProposal): Promise<MsgWithdrawProposalResponse> {
    const data = MsgWithdrawProposal.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "WithdrawProposal", data);
    return promise.then(data => MsgWithdrawProposalResponse.decode(new _m0.Reader(data)));
  }
  vote(request: MsgVote): Promise<MsgVoteResponse> {
    const data = MsgVote.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "Vote", data);
    return promise.then(data => MsgVoteResponse.decode(new _m0.Reader(data)));
  }
  exec(request: MsgExec): Promise<MsgExecResponse> {
    const data = MsgExec.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "Exec", data);
    return promise.then(data => MsgExecResponse.decode(new _m0.Reader(data)));
  }
  leaveGroup(request: MsgLeaveGroup): Promise<MsgLeaveGroupResponse> {
    const data = MsgLeaveGroup.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Msg", "LeaveGroup", data);
    return promise.then(data => MsgLeaveGroupResponse.decode(new _m0.Reader(data)));
  }
}