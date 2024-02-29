import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUpdateGroupPolicyAdminResponse } from "./types/cosmos/group/v1/tx";
import { MsgUpdateGroupMembers } from "./types/cosmos/group/v1/tx";
import { GroupInfo } from "./types/cosmos/group/v1/types";
import { QueryGroupsResponse } from "./types/cosmos/group/v1/query";
import { Proposal } from "./types/cosmos/group/v1/types";
import { TallyResult } from "./types/cosmos/group/v1/types";
import { MsgCreateGroup } from "./types/cosmos/group/v1/tx";
import { MsgUpdateGroupAdminResponse } from "./types/cosmos/group/v1/tx";
import { MsgVote } from "./types/cosmos/group/v1/tx";
import { QueryGroupMembersResponse } from "./types/cosmos/group/v1/query";
import { QueryVotesByProposalRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupPoliciesByGroupResponse } from "./types/cosmos/group/v1/query";
import { QueryGroupsByMemberResponse } from "./types/cosmos/group/v1/query";
import { EventProposalPruned } from "./types/cosmos/group/v1/events";
import { EventSubmitProposal } from "./types/cosmos/group/v1/events";
import { EventWithdrawProposal } from "./types/cosmos/group/v1/events";
import { MsgUpdateGroupAdmin } from "./types/cosmos/group/v1/tx";
import { MsgCreateGroupWithPolicy } from "./types/cosmos/group/v1/tx";
import { PercentageDecisionPolicy } from "./types/cosmos/group/v1/types";
import { MsgCreateGroupPolicyResponse } from "./types/cosmos/group/v1/tx";
import { MsgSubmitProposalResponse } from "./types/cosmos/group/v1/tx";
import { QueryGroupsByAdminRequest } from "./types/cosmos/group/v1/query";
import { QueryTallyResultResponse } from "./types/cosmos/group/v1/query";
import { QueryVotesByVoterResponse } from "./types/cosmos/group/v1/query";
import { MsgUpdateGroupPolicyAdmin } from "./types/cosmos/group/v1/tx";
import { EventUpdateGroup } from "./types/cosmos/group/v1/events";
import { QueryGroupPoliciesByAdminRequest } from "./types/cosmos/group/v1/query";
import { QueryProposalRequest } from "./types/cosmos/group/v1/query";
import { GroupPolicyInfo } from "./types/cosmos/group/v1/types";
import { MsgCreateGroupWithPolicyResponse } from "./types/cosmos/group/v1/tx";
import { MsgExecResponse } from "./types/cosmos/group/v1/tx";
import { QueryGroupsByAdminResponse } from "./types/cosmos/group/v1/query";
import { QueryVoteByProposalVoterResponse } from "./types/cosmos/group/v1/query";
import { MsgCreateGroupPolicy } from "./types/cosmos/group/v1/tx";
import { MsgUpdateGroupPolicyDecisionPolicyResponse } from "./types/cosmos/group/v1/tx";
import { MsgWithdrawProposalResponse } from "./types/cosmos/group/v1/tx";
import { MsgVoteResponse } from "./types/cosmos/group/v1/tx";
import { QueryVotesByProposalResponse } from "./types/cosmos/group/v1/query";
import { QueryVotesByVoterRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupPoliciesByAdminResponse } from "./types/cosmos/group/v1/query";
import { QueryTallyResultRequest } from "./types/cosmos/group/v1/query";
import { MsgUpdateGroupPolicyDecisionPolicy } from "./types/cosmos/group/v1/tx";
import { QueryGroupInfoResponse } from "./types/cosmos/group/v1/query";
import { QueryGroupPoliciesByGroupRequest } from "./types/cosmos/group/v1/query";
import { MemberRequest } from "./types/cosmos/group/v1/types";
import { Vote } from "./types/cosmos/group/v1/types";
import { MsgLeaveGroupResponse } from "./types/cosmos/group/v1/tx";
import { EventUpdateGroupPolicy } from "./types/cosmos/group/v1/events";
import { MsgUpdateGroupMetadata } from "./types/cosmos/group/v1/tx";
import { Member } from "./types/cosmos/group/v1/types";
import { GroupMember } from "./types/cosmos/group/v1/types";
import { QueryGroupMembersRequest } from "./types/cosmos/group/v1/query";
import { ThresholdDecisionPolicy } from "./types/cosmos/group/v1/types";
import { EventCreateGroup } from "./types/cosmos/group/v1/events";
import { QueryGroupsByMemberRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupsRequest } from "./types/cosmos/group/v1/query";
import { GenesisState } from "./types/cosmos/group/v1/genesis";
import { MsgUpdateGroupPolicyMetadata } from "./types/cosmos/group/v1/tx";
import { MsgWithdrawProposal } from "./types/cosmos/group/v1/tx";
import { MsgExec } from "./types/cosmos/group/v1/tx";
import { QueryProposalResponse } from "./types/cosmos/group/v1/query";
import { QueryVoteByProposalVoterRequest } from "./types/cosmos/group/v1/query";
import { EventExec } from "./types/cosmos/group/v1/events";
import { MsgSubmitProposal } from "./types/cosmos/group/v1/tx";
import { MsgUpdateGroupMembersResponse } from "./types/cosmos/group/v1/tx";
import { MsgUpdateGroupMetadataResponse } from "./types/cosmos/group/v1/tx";
import { QueryGroupPolicyInfoRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupPolicyInfoResponse } from "./types/cosmos/group/v1/query";
import { EventCreateGroupPolicy } from "./types/cosmos/group/v1/events";
import { EventVote } from "./types/cosmos/group/v1/events";
import { EventLeaveGroup } from "./types/cosmos/group/v1/events";
import { MsgUpdateGroupPolicyMetadataResponse } from "./types/cosmos/group/v1/tx";
import { MsgLeaveGroup } from "./types/cosmos/group/v1/tx";
import { QueryProposalsByGroupPolicyResponse } from "./types/cosmos/group/v1/query";
import { DecisionPolicyWindows } from "./types/cosmos/group/v1/types";
import { MsgCreateGroupResponse } from "./types/cosmos/group/v1/tx";
import { QueryGroupInfoRequest } from "./types/cosmos/group/v1/query";
import { QueryProposalsByGroupPolicyRequest } from "./types/cosmos/group/v1/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cosmos.group.v1.MsgUpdateGroupPolicyAdminResponse", MsgUpdateGroupPolicyAdminResponse],
    ["/cosmos.group.v1.MsgUpdateGroupMembers", MsgUpdateGroupMembers],
    ["/cosmos.group.v1.GroupInfo", GroupInfo],
    ["/cosmos.group.v1.QueryGroupsResponse", QueryGroupsResponse],
    ["/cosmos.group.v1.Proposal", Proposal],
    ["/cosmos.group.v1.TallyResult", TallyResult],
    ["/cosmos.group.v1.MsgCreateGroup", MsgCreateGroup],
    ["/cosmos.group.v1.MsgUpdateGroupAdminResponse", MsgUpdateGroupAdminResponse],
    ["/cosmos.group.v1.MsgVote", MsgVote],
    ["/cosmos.group.v1.QueryGroupMembersResponse", QueryGroupMembersResponse],
    ["/cosmos.group.v1.QueryVotesByProposalRequest", QueryVotesByProposalRequest],
    ["/cosmos.group.v1.QueryGroupPoliciesByGroupResponse", QueryGroupPoliciesByGroupResponse],
    ["/cosmos.group.v1.QueryGroupsByMemberResponse", QueryGroupsByMemberResponse],
    ["/cosmos.group.v1.EventProposalPruned", EventProposalPruned],
    ["/cosmos.group.v1.EventSubmitProposal", EventSubmitProposal],
    ["/cosmos.group.v1.EventWithdrawProposal", EventWithdrawProposal],
    ["/cosmos.group.v1.MsgUpdateGroupAdmin", MsgUpdateGroupAdmin],
    ["/cosmos.group.v1.MsgCreateGroupWithPolicy", MsgCreateGroupWithPolicy],
    ["/cosmos.group.v1.PercentageDecisionPolicy", PercentageDecisionPolicy],
    ["/cosmos.group.v1.MsgCreateGroupPolicyResponse", MsgCreateGroupPolicyResponse],
    ["/cosmos.group.v1.MsgSubmitProposalResponse", MsgSubmitProposalResponse],
    ["/cosmos.group.v1.QueryGroupsByAdminRequest", QueryGroupsByAdminRequest],
    ["/cosmos.group.v1.QueryTallyResultResponse", QueryTallyResultResponse],
    ["/cosmos.group.v1.QueryVotesByVoterResponse", QueryVotesByVoterResponse],
    ["/cosmos.group.v1.MsgUpdateGroupPolicyAdmin", MsgUpdateGroupPolicyAdmin],
    ["/cosmos.group.v1.EventUpdateGroup", EventUpdateGroup],
    ["/cosmos.group.v1.QueryGroupPoliciesByAdminRequest", QueryGroupPoliciesByAdminRequest],
    ["/cosmos.group.v1.QueryProposalRequest", QueryProposalRequest],
    ["/cosmos.group.v1.GroupPolicyInfo", GroupPolicyInfo],
    ["/cosmos.group.v1.MsgCreateGroupWithPolicyResponse", MsgCreateGroupWithPolicyResponse],
    ["/cosmos.group.v1.MsgExecResponse", MsgExecResponse],
    ["/cosmos.group.v1.QueryGroupsByAdminResponse", QueryGroupsByAdminResponse],
    ["/cosmos.group.v1.QueryVoteByProposalVoterResponse", QueryVoteByProposalVoterResponse],
    ["/cosmos.group.v1.MsgCreateGroupPolicy", MsgCreateGroupPolicy],
    ["/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicyResponse", MsgUpdateGroupPolicyDecisionPolicyResponse],
    ["/cosmos.group.v1.MsgWithdrawProposalResponse", MsgWithdrawProposalResponse],
    ["/cosmos.group.v1.MsgVoteResponse", MsgVoteResponse],
    ["/cosmos.group.v1.QueryVotesByProposalResponse", QueryVotesByProposalResponse],
    ["/cosmos.group.v1.QueryVotesByVoterRequest", QueryVotesByVoterRequest],
    ["/cosmos.group.v1.QueryGroupPoliciesByAdminResponse", QueryGroupPoliciesByAdminResponse],
    ["/cosmos.group.v1.QueryTallyResultRequest", QueryTallyResultRequest],
    ["/cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy", MsgUpdateGroupPolicyDecisionPolicy],
    ["/cosmos.group.v1.QueryGroupInfoResponse", QueryGroupInfoResponse],
    ["/cosmos.group.v1.QueryGroupPoliciesByGroupRequest", QueryGroupPoliciesByGroupRequest],
    ["/cosmos.group.v1.MemberRequest", MemberRequest],
    ["/cosmos.group.v1.Vote", Vote],
    ["/cosmos.group.v1.MsgLeaveGroupResponse", MsgLeaveGroupResponse],
    ["/cosmos.group.v1.EventUpdateGroupPolicy", EventUpdateGroupPolicy],
    ["/cosmos.group.v1.MsgUpdateGroupMetadata", MsgUpdateGroupMetadata],
    ["/cosmos.group.v1.Member", Member],
    ["/cosmos.group.v1.GroupMember", GroupMember],
    ["/cosmos.group.v1.QueryGroupMembersRequest", QueryGroupMembersRequest],
    ["/cosmos.group.v1.ThresholdDecisionPolicy", ThresholdDecisionPolicy],
    ["/cosmos.group.v1.EventCreateGroup", EventCreateGroup],
    ["/cosmos.group.v1.QueryGroupsByMemberRequest", QueryGroupsByMemberRequest],
    ["/cosmos.group.v1.QueryGroupsRequest", QueryGroupsRequest],
    ["/cosmos.group.v1.GenesisState", GenesisState],
    ["/cosmos.group.v1.MsgUpdateGroupPolicyMetadata", MsgUpdateGroupPolicyMetadata],
    ["/cosmos.group.v1.MsgWithdrawProposal", MsgWithdrawProposal],
    ["/cosmos.group.v1.MsgExec", MsgExec],
    ["/cosmos.group.v1.QueryProposalResponse", QueryProposalResponse],
    ["/cosmos.group.v1.QueryVoteByProposalVoterRequest", QueryVoteByProposalVoterRequest],
    ["/cosmos.group.v1.EventExec", EventExec],
    ["/cosmos.group.v1.MsgSubmitProposal", MsgSubmitProposal],
    ["/cosmos.group.v1.MsgUpdateGroupMembersResponse", MsgUpdateGroupMembersResponse],
    ["/cosmos.group.v1.MsgUpdateGroupMetadataResponse", MsgUpdateGroupMetadataResponse],
    ["/cosmos.group.v1.QueryGroupPolicyInfoRequest", QueryGroupPolicyInfoRequest],
    ["/cosmos.group.v1.QueryGroupPolicyInfoResponse", QueryGroupPolicyInfoResponse],
    ["/cosmos.group.v1.EventCreateGroupPolicy", EventCreateGroupPolicy],
    ["/cosmos.group.v1.EventVote", EventVote],
    ["/cosmos.group.v1.EventLeaveGroup", EventLeaveGroup],
    ["/cosmos.group.v1.MsgUpdateGroupPolicyMetadataResponse", MsgUpdateGroupPolicyMetadataResponse],
    ["/cosmos.group.v1.MsgLeaveGroup", MsgLeaveGroup],
    ["/cosmos.group.v1.QueryProposalsByGroupPolicyResponse", QueryProposalsByGroupPolicyResponse],
    ["/cosmos.group.v1.DecisionPolicyWindows", DecisionPolicyWindows],
    ["/cosmos.group.v1.MsgCreateGroupResponse", MsgCreateGroupResponse],
    ["/cosmos.group.v1.QueryGroupInfoRequest", QueryGroupInfoRequest],
    ["/cosmos.group.v1.QueryProposalsByGroupPolicyRequest", QueryProposalsByGroupPolicyRequest],
    
];

export { msgTypes }