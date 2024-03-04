import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { GroupMember } from "./types/cosmos/group/v1/types";
import { QueryGroupPolicyInfoResponse } from "./types/cosmos/group/v1/query";
import { QueryGroupsByAdminResponse } from "./types/cosmos/group/v1/query";
import { MsgCreateGroupPolicyResponse } from "./types/cosmos/group/v1/tx";
import { MsgVote } from "./types/cosmos/group/v1/tx";
import { MsgCreateGroup } from "./types/cosmos/group/v1/tx";
import { MsgWithdrawProposalResponse } from "./types/cosmos/group/v1/tx";
import { EventSubmitProposal } from "./types/cosmos/group/v1/events";
import { QueryProposalsByGroupPolicyResponse } from "./types/cosmos/group/v1/query";
import { QueryGroupsByMemberRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupsRequest } from "./types/cosmos/group/v1/query";
import { MsgUpdateGroupPolicyMetadataResponse } from "./types/cosmos/group/v1/tx";
import { EventWithdrawProposal } from "./types/cosmos/group/v1/events";
import { QueryGroupInfoRequest } from "./types/cosmos/group/v1/query";
import { QueryProposalResponse } from "./types/cosmos/group/v1/query";
import { QueryTallyResultResponse } from "./types/cosmos/group/v1/query";
import { QueryGroupsResponse } from "./types/cosmos/group/v1/query";
import { MsgUpdateGroupMembers } from "./types/cosmos/group/v1/tx";
import { MsgCreateGroupWithPolicyResponse } from "./types/cosmos/group/v1/tx";
import { QueryGroupInfoResponse } from "./types/cosmos/group/v1/query";
import { QueryGroupPolicyInfoRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupMembersRequest } from "./types/cosmos/group/v1/query";
import { QueryProposalsByGroupPolicyRequest } from "./types/cosmos/group/v1/query";
import { TallyResult } from "./types/cosmos/group/v1/types";
import { EventCreateGroupPolicy } from "./types/cosmos/group/v1/events";
import { QueryVotesByProposalResponse } from "./types/cosmos/group/v1/query";
import { QueryVotesByVoterRequest } from "./types/cosmos/group/v1/query";
import { MsgLeaveGroup } from "./types/cosmos/group/v1/tx";
import { QueryGroupPoliciesByAdminResponse } from "./types/cosmos/group/v1/query";
import { MsgSubmitProposal } from "./types/cosmos/group/v1/tx";
import { MsgExec } from "./types/cosmos/group/v1/tx";
import { GroupInfo } from "./types/cosmos/group/v1/types";
import { DecisionPolicyWindows } from "./types/cosmos/group/v1/types";
import { EventExec } from "./types/cosmos/group/v1/events";
import { QueryGroupPoliciesByGroupResponse } from "./types/cosmos/group/v1/query";
import { QueryVotesByVoterResponse } from "./types/cosmos/group/v1/query";
import { MsgUpdateGroupPolicyAdminResponse } from "./types/cosmos/group/v1/tx";
import { PercentageDecisionPolicy } from "./types/cosmos/group/v1/types";
import { QueryGroupsByAdminRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupsByMemberResponse } from "./types/cosmos/group/v1/query";
import { QueryTallyResultRequest } from "./types/cosmos/group/v1/query";
import { MsgExecResponse } from "./types/cosmos/group/v1/tx";
import { ThresholdDecisionPolicy } from "./types/cosmos/group/v1/types";
import { Vote } from "./types/cosmos/group/v1/types";
import { QueryGroupMembersResponse } from "./types/cosmos/group/v1/query";
import { QueryVoteByProposalVoterRequest } from "./types/cosmos/group/v1/query";
import { Proposal } from "./types/cosmos/group/v1/types";
import { MsgUpdateGroupMembersResponse } from "./types/cosmos/group/v1/tx";
import { MsgUpdateGroupPolicyAdmin } from "./types/cosmos/group/v1/tx";
import { MsgUpdateGroupPolicyMetadata } from "./types/cosmos/group/v1/tx";
import { MsgLeaveGroupResponse } from "./types/cosmos/group/v1/tx";
import { EventCreateGroup } from "./types/cosmos/group/v1/events";
import { QueryGroupPoliciesByGroupRequest } from "./types/cosmos/group/v1/query";
import { QueryGroupPoliciesByAdminRequest } from "./types/cosmos/group/v1/query";
import { QueryVotesByProposalRequest } from "./types/cosmos/group/v1/query";
import { MsgUpdateGroupAdminResponse } from "./types/cosmos/group/v1/tx";
import { Member } from "./types/cosmos/group/v1/types";
import { QueryProposalRequest } from "./types/cosmos/group/v1/query";
import { MsgUpdateGroupMetadata } from "./types/cosmos/group/v1/tx";
import { MsgCreateGroupWithPolicy } from "./types/cosmos/group/v1/tx";
import { MsgCreateGroupResponse } from "./types/cosmos/group/v1/tx";
import { EventVote } from "./types/cosmos/group/v1/events";
import { MsgCreateGroupPolicy } from "./types/cosmos/group/v1/tx";
import { MsgUpdateGroupPolicyDecisionPolicyResponse } from "./types/cosmos/group/v1/tx";
import { MsgVoteResponse } from "./types/cosmos/group/v1/tx";
import { GroupPolicyInfo } from "./types/cosmos/group/v1/types";
import { MemberRequest } from "./types/cosmos/group/v1/types";
import { EventUpdateGroupPolicy } from "./types/cosmos/group/v1/events";
import { EventProposalPruned } from "./types/cosmos/group/v1/events";
import { GenesisState } from "./types/cosmos/group/v1/genesis";
import { MsgUpdateGroupPolicyDecisionPolicy } from "./types/cosmos/group/v1/tx";
import { QueryVoteByProposalVoterResponse } from "./types/cosmos/group/v1/query";
import { MsgSubmitProposalResponse } from "./types/cosmos/group/v1/tx";
import { MsgWithdrawProposal } from "./types/cosmos/group/v1/tx";
import { EventUpdateGroup } from "./types/cosmos/group/v1/events";
import { EventLeaveGroup } from "./types/cosmos/group/v1/events";
import { MsgUpdateGroupAdmin } from "./types/cosmos/group/v1/tx";
import { MsgUpdateGroupMetadataResponse } from "./types/cosmos/group/v1/tx";
export { GroupMember, QueryGroupPolicyInfoResponse, QueryGroupsByAdminResponse, MsgCreateGroupPolicyResponse, MsgVote, MsgCreateGroup, MsgWithdrawProposalResponse, EventSubmitProposal, QueryProposalsByGroupPolicyResponse, QueryGroupsByMemberRequest, QueryGroupsRequest, MsgUpdateGroupPolicyMetadataResponse, EventWithdrawProposal, QueryGroupInfoRequest, QueryProposalResponse, QueryTallyResultResponse, QueryGroupsResponse, MsgUpdateGroupMembers, MsgCreateGroupWithPolicyResponse, QueryGroupInfoResponse, QueryGroupPolicyInfoRequest, QueryGroupMembersRequest, QueryProposalsByGroupPolicyRequest, TallyResult, EventCreateGroupPolicy, QueryVotesByProposalResponse, QueryVotesByVoterRequest, MsgLeaveGroup, QueryGroupPoliciesByAdminResponse, MsgSubmitProposal, MsgExec, GroupInfo, DecisionPolicyWindows, EventExec, QueryGroupPoliciesByGroupResponse, QueryVotesByVoterResponse, MsgUpdateGroupPolicyAdminResponse, PercentageDecisionPolicy, QueryGroupsByAdminRequest, QueryGroupsByMemberResponse, QueryTallyResultRequest, MsgExecResponse, ThresholdDecisionPolicy, Vote, QueryGroupMembersResponse, QueryVoteByProposalVoterRequest, Proposal, MsgUpdateGroupMembersResponse, MsgUpdateGroupPolicyAdmin, MsgUpdateGroupPolicyMetadata, MsgLeaveGroupResponse, EventCreateGroup, QueryGroupPoliciesByGroupRequest, QueryGroupPoliciesByAdminRequest, QueryVotesByProposalRequest, MsgUpdateGroupAdminResponse, Member, QueryProposalRequest, MsgUpdateGroupMetadata, MsgCreateGroupWithPolicy, MsgCreateGroupResponse, EventVote, MsgCreateGroupPolicy, MsgUpdateGroupPolicyDecisionPolicyResponse, MsgVoteResponse, GroupPolicyInfo, MemberRequest, EventUpdateGroupPolicy, EventProposalPruned, GenesisState, MsgUpdateGroupPolicyDecisionPolicy, QueryVoteByProposalVoterResponse, MsgSubmitProposalResponse, MsgWithdrawProposal, EventUpdateGroup, EventLeaveGroup, MsgUpdateGroupAdmin, MsgUpdateGroupMetadataResponse };
type sendGroupMemberParams = {
    value: GroupMember;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupPolicyInfoResponseParams = {
    value: QueryGroupPolicyInfoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupsByAdminResponseParams = {
    value: QueryGroupsByAdminResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCreateGroupPolicyResponseParams = {
    value: MsgCreateGroupPolicyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteParams = {
    value: MsgVote;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCreateGroupParams = {
    value: MsgCreateGroup;
    fee?: StdFee;
    memo?: string;
};
type sendMsgWithdrawProposalResponseParams = {
    value: MsgWithdrawProposalResponse;
    fee?: StdFee;
    memo?: string;
};
type sendEventSubmitProposalParams = {
    value: EventSubmitProposal;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalsByGroupPolicyResponseParams = {
    value: QueryProposalsByGroupPolicyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupsByMemberRequestParams = {
    value: QueryGroupsByMemberRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupsRequestParams = {
    value: QueryGroupsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupPolicyMetadataResponseParams = {
    value: MsgUpdateGroupPolicyMetadataResponse;
    fee?: StdFee;
    memo?: string;
};
type sendEventWithdrawProposalParams = {
    value: EventWithdrawProposal;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupInfoRequestParams = {
    value: QueryGroupInfoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalResponseParams = {
    value: QueryProposalResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTallyResultResponseParams = {
    value: QueryTallyResultResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupsResponseParams = {
    value: QueryGroupsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupMembersParams = {
    value: MsgUpdateGroupMembers;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCreateGroupWithPolicyResponseParams = {
    value: MsgCreateGroupWithPolicyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupInfoResponseParams = {
    value: QueryGroupInfoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupPolicyInfoRequestParams = {
    value: QueryGroupPolicyInfoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupMembersRequestParams = {
    value: QueryGroupMembersRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalsByGroupPolicyRequestParams = {
    value: QueryProposalsByGroupPolicyRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTallyResultParams = {
    value: TallyResult;
    fee?: StdFee;
    memo?: string;
};
type sendEventCreateGroupPolicyParams = {
    value: EventCreateGroupPolicy;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVotesByProposalResponseParams = {
    value: QueryVotesByProposalResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVotesByVoterRequestParams = {
    value: QueryVotesByVoterRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgLeaveGroupParams = {
    value: MsgLeaveGroup;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupPoliciesByAdminResponseParams = {
    value: QueryGroupPoliciesByAdminResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitProposalParams = {
    value: MsgSubmitProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgExecParams = {
    value: MsgExec;
    fee?: StdFee;
    memo?: string;
};
type sendGroupInfoParams = {
    value: GroupInfo;
    fee?: StdFee;
    memo?: string;
};
type sendDecisionPolicyWindowsParams = {
    value: DecisionPolicyWindows;
    fee?: StdFee;
    memo?: string;
};
type sendEventExecParams = {
    value: EventExec;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupPoliciesByGroupResponseParams = {
    value: QueryGroupPoliciesByGroupResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVotesByVoterResponseParams = {
    value: QueryVotesByVoterResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupPolicyAdminResponseParams = {
    value: MsgUpdateGroupPolicyAdminResponse;
    fee?: StdFee;
    memo?: string;
};
type sendPercentageDecisionPolicyParams = {
    value: PercentageDecisionPolicy;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupsByAdminRequestParams = {
    value: QueryGroupsByAdminRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupsByMemberResponseParams = {
    value: QueryGroupsByMemberResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTallyResultRequestParams = {
    value: QueryTallyResultRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgExecResponseParams = {
    value: MsgExecResponse;
    fee?: StdFee;
    memo?: string;
};
type sendThresholdDecisionPolicyParams = {
    value: ThresholdDecisionPolicy;
    fee?: StdFee;
    memo?: string;
};
type sendVoteParams = {
    value: Vote;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupMembersResponseParams = {
    value: QueryGroupMembersResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVoteByProposalVoterRequestParams = {
    value: QueryVoteByProposalVoterRequest;
    fee?: StdFee;
    memo?: string;
};
type sendProposalParams = {
    value: Proposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupMembersResponseParams = {
    value: MsgUpdateGroupMembersResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupPolicyAdminParams = {
    value: MsgUpdateGroupPolicyAdmin;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupPolicyMetadataParams = {
    value: MsgUpdateGroupPolicyMetadata;
    fee?: StdFee;
    memo?: string;
};
type sendMsgLeaveGroupResponseParams = {
    value: MsgLeaveGroupResponse;
    fee?: StdFee;
    memo?: string;
};
type sendEventCreateGroupParams = {
    value: EventCreateGroup;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupPoliciesByGroupRequestParams = {
    value: QueryGroupPoliciesByGroupRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGroupPoliciesByAdminRequestParams = {
    value: QueryGroupPoliciesByAdminRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVotesByProposalRequestParams = {
    value: QueryVotesByProposalRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupAdminResponseParams = {
    value: MsgUpdateGroupAdminResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMemberParams = {
    value: Member;
    fee?: StdFee;
    memo?: string;
};
type sendQueryProposalRequestParams = {
    value: QueryProposalRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupMetadataParams = {
    value: MsgUpdateGroupMetadata;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCreateGroupWithPolicyParams = {
    value: MsgCreateGroupWithPolicy;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCreateGroupResponseParams = {
    value: MsgCreateGroupResponse;
    fee?: StdFee;
    memo?: string;
};
type sendEventVoteParams = {
    value: EventVote;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCreateGroupPolicyParams = {
    value: MsgCreateGroupPolicy;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupPolicyDecisionPolicyResponseParams = {
    value: MsgUpdateGroupPolicyDecisionPolicyResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgVoteResponseParams = {
    value: MsgVoteResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGroupPolicyInfoParams = {
    value: GroupPolicyInfo;
    fee?: StdFee;
    memo?: string;
};
type sendMemberRequestParams = {
    value: MemberRequest;
    fee?: StdFee;
    memo?: string;
};
type sendEventUpdateGroupPolicyParams = {
    value: EventUpdateGroupPolicy;
    fee?: StdFee;
    memo?: string;
};
type sendEventProposalPrunedParams = {
    value: EventProposalPruned;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupPolicyDecisionPolicyParams = {
    value: MsgUpdateGroupPolicyDecisionPolicy;
    fee?: StdFee;
    memo?: string;
};
type sendQueryVoteByProposalVoterResponseParams = {
    value: QueryVoteByProposalVoterResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitProposalResponseParams = {
    value: MsgSubmitProposalResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgWithdrawProposalParams = {
    value: MsgWithdrawProposal;
    fee?: StdFee;
    memo?: string;
};
type sendEventUpdateGroupParams = {
    value: EventUpdateGroup;
    fee?: StdFee;
    memo?: string;
};
type sendEventLeaveGroupParams = {
    value: EventLeaveGroup;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupAdminParams = {
    value: MsgUpdateGroupAdmin;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateGroupMetadataResponseParams = {
    value: MsgUpdateGroupMetadataResponse;
    fee?: StdFee;
    memo?: string;
};
type groupMemberParams = {
    value: GroupMember;
};
type queryGroupPolicyInfoResponseParams = {
    value: QueryGroupPolicyInfoResponse;
};
type queryGroupsByAdminResponseParams = {
    value: QueryGroupsByAdminResponse;
};
type msgCreateGroupPolicyResponseParams = {
    value: MsgCreateGroupPolicyResponse;
};
type msgVoteParams = {
    value: MsgVote;
};
type msgCreateGroupParams = {
    value: MsgCreateGroup;
};
type msgWithdrawProposalResponseParams = {
    value: MsgWithdrawProposalResponse;
};
type eventSubmitProposalParams = {
    value: EventSubmitProposal;
};
type queryProposalsByGroupPolicyResponseParams = {
    value: QueryProposalsByGroupPolicyResponse;
};
type queryGroupsByMemberRequestParams = {
    value: QueryGroupsByMemberRequest;
};
type queryGroupsRequestParams = {
    value: QueryGroupsRequest;
};
type msgUpdateGroupPolicyMetadataResponseParams = {
    value: MsgUpdateGroupPolicyMetadataResponse;
};
type eventWithdrawProposalParams = {
    value: EventWithdrawProposal;
};
type queryGroupInfoRequestParams = {
    value: QueryGroupInfoRequest;
};
type queryProposalResponseParams = {
    value: QueryProposalResponse;
};
type queryTallyResultResponseParams = {
    value: QueryTallyResultResponse;
};
type queryGroupsResponseParams = {
    value: QueryGroupsResponse;
};
type msgUpdateGroupMembersParams = {
    value: MsgUpdateGroupMembers;
};
type msgCreateGroupWithPolicyResponseParams = {
    value: MsgCreateGroupWithPolicyResponse;
};
type queryGroupInfoResponseParams = {
    value: QueryGroupInfoResponse;
};
type queryGroupPolicyInfoRequestParams = {
    value: QueryGroupPolicyInfoRequest;
};
type queryGroupMembersRequestParams = {
    value: QueryGroupMembersRequest;
};
type queryProposalsByGroupPolicyRequestParams = {
    value: QueryProposalsByGroupPolicyRequest;
};
type tallyResultParams = {
    value: TallyResult;
};
type eventCreateGroupPolicyParams = {
    value: EventCreateGroupPolicy;
};
type queryVotesByProposalResponseParams = {
    value: QueryVotesByProposalResponse;
};
type queryVotesByVoterRequestParams = {
    value: QueryVotesByVoterRequest;
};
type msgLeaveGroupParams = {
    value: MsgLeaveGroup;
};
type queryGroupPoliciesByAdminResponseParams = {
    value: QueryGroupPoliciesByAdminResponse;
};
type msgSubmitProposalParams = {
    value: MsgSubmitProposal;
};
type msgExecParams = {
    value: MsgExec;
};
type groupInfoParams = {
    value: GroupInfo;
};
type decisionPolicyWindowsParams = {
    value: DecisionPolicyWindows;
};
type eventExecParams = {
    value: EventExec;
};
type queryGroupPoliciesByGroupResponseParams = {
    value: QueryGroupPoliciesByGroupResponse;
};
type queryVotesByVoterResponseParams = {
    value: QueryVotesByVoterResponse;
};
type msgUpdateGroupPolicyAdminResponseParams = {
    value: MsgUpdateGroupPolicyAdminResponse;
};
type percentageDecisionPolicyParams = {
    value: PercentageDecisionPolicy;
};
type queryGroupsByAdminRequestParams = {
    value: QueryGroupsByAdminRequest;
};
type queryGroupsByMemberResponseParams = {
    value: QueryGroupsByMemberResponse;
};
type queryTallyResultRequestParams = {
    value: QueryTallyResultRequest;
};
type msgExecResponseParams = {
    value: MsgExecResponse;
};
type thresholdDecisionPolicyParams = {
    value: ThresholdDecisionPolicy;
};
type voteParams = {
    value: Vote;
};
type queryGroupMembersResponseParams = {
    value: QueryGroupMembersResponse;
};
type queryVoteByProposalVoterRequestParams = {
    value: QueryVoteByProposalVoterRequest;
};
type proposalParams = {
    value: Proposal;
};
type msgUpdateGroupMembersResponseParams = {
    value: MsgUpdateGroupMembersResponse;
};
type msgUpdateGroupPolicyAdminParams = {
    value: MsgUpdateGroupPolicyAdmin;
};
type msgUpdateGroupPolicyMetadataParams = {
    value: MsgUpdateGroupPolicyMetadata;
};
type msgLeaveGroupResponseParams = {
    value: MsgLeaveGroupResponse;
};
type eventCreateGroupParams = {
    value: EventCreateGroup;
};
type queryGroupPoliciesByGroupRequestParams = {
    value: QueryGroupPoliciesByGroupRequest;
};
type queryGroupPoliciesByAdminRequestParams = {
    value: QueryGroupPoliciesByAdminRequest;
};
type queryVotesByProposalRequestParams = {
    value: QueryVotesByProposalRequest;
};
type msgUpdateGroupAdminResponseParams = {
    value: MsgUpdateGroupAdminResponse;
};
type memberParams = {
    value: Member;
};
type queryProposalRequestParams = {
    value: QueryProposalRequest;
};
type msgUpdateGroupMetadataParams = {
    value: MsgUpdateGroupMetadata;
};
type msgCreateGroupWithPolicyParams = {
    value: MsgCreateGroupWithPolicy;
};
type msgCreateGroupResponseParams = {
    value: MsgCreateGroupResponse;
};
type eventVoteParams = {
    value: EventVote;
};
type msgCreateGroupPolicyParams = {
    value: MsgCreateGroupPolicy;
};
type msgUpdateGroupPolicyDecisionPolicyResponseParams = {
    value: MsgUpdateGroupPolicyDecisionPolicyResponse;
};
type msgVoteResponseParams = {
    value: MsgVoteResponse;
};
type groupPolicyInfoParams = {
    value: GroupPolicyInfo;
};
type memberRequestParams = {
    value: MemberRequest;
};
type eventUpdateGroupPolicyParams = {
    value: EventUpdateGroupPolicy;
};
type eventProposalPrunedParams = {
    value: EventProposalPruned;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgUpdateGroupPolicyDecisionPolicyParams = {
    value: MsgUpdateGroupPolicyDecisionPolicy;
};
type queryVoteByProposalVoterResponseParams = {
    value: QueryVoteByProposalVoterResponse;
};
type msgSubmitProposalResponseParams = {
    value: MsgSubmitProposalResponse;
};
type msgWithdrawProposalParams = {
    value: MsgWithdrawProposal;
};
type eventUpdateGroupParams = {
    value: EventUpdateGroup;
};
type eventLeaveGroupParams = {
    value: EventLeaveGroup;
};
type msgUpdateGroupAdminParams = {
    value: MsgUpdateGroupAdmin;
};
type msgUpdateGroupMetadataResponseParams = {
    value: MsgUpdateGroupMetadataResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendGroupMember({ value, fee, memo }: sendGroupMemberParams): Promise<DeliverTxResponse>;
    sendQueryGroupPolicyInfoResponse({ value, fee, memo }: sendQueryGroupPolicyInfoResponseParams): Promise<DeliverTxResponse>;
    sendQueryGroupsByAdminResponse({ value, fee, memo }: sendQueryGroupsByAdminResponseParams): Promise<DeliverTxResponse>;
    sendMsgCreateGroupPolicyResponse({ value, fee, memo }: sendMsgCreateGroupPolicyResponseParams): Promise<DeliverTxResponse>;
    sendMsgVote({ value, fee, memo }: sendMsgVoteParams): Promise<DeliverTxResponse>;
    sendMsgCreateGroup({ value, fee, memo }: sendMsgCreateGroupParams): Promise<DeliverTxResponse>;
    sendMsgWithdrawProposalResponse({ value, fee, memo }: sendMsgWithdrawProposalResponseParams): Promise<DeliverTxResponse>;
    sendEventSubmitProposal({ value, fee, memo }: sendEventSubmitProposalParams): Promise<DeliverTxResponse>;
    sendQueryProposalsByGroupPolicyResponse({ value, fee, memo }: sendQueryProposalsByGroupPolicyResponseParams): Promise<DeliverTxResponse>;
    sendQueryGroupsByMemberRequest({ value, fee, memo }: sendQueryGroupsByMemberRequestParams): Promise<DeliverTxResponse>;
    sendQueryGroupsRequest({ value, fee, memo }: sendQueryGroupsRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupPolicyMetadataResponse({ value, fee, memo }: sendMsgUpdateGroupPolicyMetadataResponseParams): Promise<DeliverTxResponse>;
    sendEventWithdrawProposal({ value, fee, memo }: sendEventWithdrawProposalParams): Promise<DeliverTxResponse>;
    sendQueryGroupInfoRequest({ value, fee, memo }: sendQueryGroupInfoRequestParams): Promise<DeliverTxResponse>;
    sendQueryProposalResponse({ value, fee, memo }: sendQueryProposalResponseParams): Promise<DeliverTxResponse>;
    sendQueryTallyResultResponse({ value, fee, memo }: sendQueryTallyResultResponseParams): Promise<DeliverTxResponse>;
    sendQueryGroupsResponse({ value, fee, memo }: sendQueryGroupsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupMembers({ value, fee, memo }: sendMsgUpdateGroupMembersParams): Promise<DeliverTxResponse>;
    sendMsgCreateGroupWithPolicyResponse({ value, fee, memo }: sendMsgCreateGroupWithPolicyResponseParams): Promise<DeliverTxResponse>;
    sendQueryGroupInfoResponse({ value, fee, memo }: sendQueryGroupInfoResponseParams): Promise<DeliverTxResponse>;
    sendQueryGroupPolicyInfoRequest({ value, fee, memo }: sendQueryGroupPolicyInfoRequestParams): Promise<DeliverTxResponse>;
    sendQueryGroupMembersRequest({ value, fee, memo }: sendQueryGroupMembersRequestParams): Promise<DeliverTxResponse>;
    sendQueryProposalsByGroupPolicyRequest({ value, fee, memo }: sendQueryProposalsByGroupPolicyRequestParams): Promise<DeliverTxResponse>;
    sendTallyResult({ value, fee, memo }: sendTallyResultParams): Promise<DeliverTxResponse>;
    sendEventCreateGroupPolicy({ value, fee, memo }: sendEventCreateGroupPolicyParams): Promise<DeliverTxResponse>;
    sendQueryVotesByProposalResponse({ value, fee, memo }: sendQueryVotesByProposalResponseParams): Promise<DeliverTxResponse>;
    sendQueryVotesByVoterRequest({ value, fee, memo }: sendQueryVotesByVoterRequestParams): Promise<DeliverTxResponse>;
    sendMsgLeaveGroup({ value, fee, memo }: sendMsgLeaveGroupParams): Promise<DeliverTxResponse>;
    sendQueryGroupPoliciesByAdminResponse({ value, fee, memo }: sendQueryGroupPoliciesByAdminResponseParams): Promise<DeliverTxResponse>;
    sendMsgSubmitProposal({ value, fee, memo }: sendMsgSubmitProposalParams): Promise<DeliverTxResponse>;
    sendMsgExec({ value, fee, memo }: sendMsgExecParams): Promise<DeliverTxResponse>;
    sendGroupInfo({ value, fee, memo }: sendGroupInfoParams): Promise<DeliverTxResponse>;
    sendDecisionPolicyWindows({ value, fee, memo }: sendDecisionPolicyWindowsParams): Promise<DeliverTxResponse>;
    sendEventExec({ value, fee, memo }: sendEventExecParams): Promise<DeliverTxResponse>;
    sendQueryGroupPoliciesByGroupResponse({ value, fee, memo }: sendQueryGroupPoliciesByGroupResponseParams): Promise<DeliverTxResponse>;
    sendQueryVotesByVoterResponse({ value, fee, memo }: sendQueryVotesByVoterResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupPolicyAdminResponse({ value, fee, memo }: sendMsgUpdateGroupPolicyAdminResponseParams): Promise<DeliverTxResponse>;
    sendPercentageDecisionPolicy({ value, fee, memo }: sendPercentageDecisionPolicyParams): Promise<DeliverTxResponse>;
    sendQueryGroupsByAdminRequest({ value, fee, memo }: sendQueryGroupsByAdminRequestParams): Promise<DeliverTxResponse>;
    sendQueryGroupsByMemberResponse({ value, fee, memo }: sendQueryGroupsByMemberResponseParams): Promise<DeliverTxResponse>;
    sendQueryTallyResultRequest({ value, fee, memo }: sendQueryTallyResultRequestParams): Promise<DeliverTxResponse>;
    sendMsgExecResponse({ value, fee, memo }: sendMsgExecResponseParams): Promise<DeliverTxResponse>;
    sendThresholdDecisionPolicy({ value, fee, memo }: sendThresholdDecisionPolicyParams): Promise<DeliverTxResponse>;
    sendVote({ value, fee, memo }: sendVoteParams): Promise<DeliverTxResponse>;
    sendQueryGroupMembersResponse({ value, fee, memo }: sendQueryGroupMembersResponseParams): Promise<DeliverTxResponse>;
    sendQueryVoteByProposalVoterRequest({ value, fee, memo }: sendQueryVoteByProposalVoterRequestParams): Promise<DeliverTxResponse>;
    sendProposal({ value, fee, memo }: sendProposalParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupMembersResponse({ value, fee, memo }: sendMsgUpdateGroupMembersResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupPolicyAdmin({ value, fee, memo }: sendMsgUpdateGroupPolicyAdminParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupPolicyMetadata({ value, fee, memo }: sendMsgUpdateGroupPolicyMetadataParams): Promise<DeliverTxResponse>;
    sendMsgLeaveGroupResponse({ value, fee, memo }: sendMsgLeaveGroupResponseParams): Promise<DeliverTxResponse>;
    sendEventCreateGroup({ value, fee, memo }: sendEventCreateGroupParams): Promise<DeliverTxResponse>;
    sendQueryGroupPoliciesByGroupRequest({ value, fee, memo }: sendQueryGroupPoliciesByGroupRequestParams): Promise<DeliverTxResponse>;
    sendQueryGroupPoliciesByAdminRequest({ value, fee, memo }: sendQueryGroupPoliciesByAdminRequestParams): Promise<DeliverTxResponse>;
    sendQueryVotesByProposalRequest({ value, fee, memo }: sendQueryVotesByProposalRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupAdminResponse({ value, fee, memo }: sendMsgUpdateGroupAdminResponseParams): Promise<DeliverTxResponse>;
    sendMember({ value, fee, memo }: sendMemberParams): Promise<DeliverTxResponse>;
    sendQueryProposalRequest({ value, fee, memo }: sendQueryProposalRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupMetadata({ value, fee, memo }: sendMsgUpdateGroupMetadataParams): Promise<DeliverTxResponse>;
    sendMsgCreateGroupWithPolicy({ value, fee, memo }: sendMsgCreateGroupWithPolicyParams): Promise<DeliverTxResponse>;
    sendMsgCreateGroupResponse({ value, fee, memo }: sendMsgCreateGroupResponseParams): Promise<DeliverTxResponse>;
    sendEventVote({ value, fee, memo }: sendEventVoteParams): Promise<DeliverTxResponse>;
    sendMsgCreateGroupPolicy({ value, fee, memo }: sendMsgCreateGroupPolicyParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupPolicyDecisionPolicyResponse({ value, fee, memo }: sendMsgUpdateGroupPolicyDecisionPolicyResponseParams): Promise<DeliverTxResponse>;
    sendMsgVoteResponse({ value, fee, memo }: sendMsgVoteResponseParams): Promise<DeliverTxResponse>;
    sendGroupPolicyInfo({ value, fee, memo }: sendGroupPolicyInfoParams): Promise<DeliverTxResponse>;
    sendMemberRequest({ value, fee, memo }: sendMemberRequestParams): Promise<DeliverTxResponse>;
    sendEventUpdateGroupPolicy({ value, fee, memo }: sendEventUpdateGroupPolicyParams): Promise<DeliverTxResponse>;
    sendEventProposalPruned({ value, fee, memo }: sendEventProposalPrunedParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupPolicyDecisionPolicy({ value, fee, memo }: sendMsgUpdateGroupPolicyDecisionPolicyParams): Promise<DeliverTxResponse>;
    sendQueryVoteByProposalVoterResponse({ value, fee, memo }: sendQueryVoteByProposalVoterResponseParams): Promise<DeliverTxResponse>;
    sendMsgSubmitProposalResponse({ value, fee, memo }: sendMsgSubmitProposalResponseParams): Promise<DeliverTxResponse>;
    sendMsgWithdrawProposal({ value, fee, memo }: sendMsgWithdrawProposalParams): Promise<DeliverTxResponse>;
    sendEventUpdateGroup({ value, fee, memo }: sendEventUpdateGroupParams): Promise<DeliverTxResponse>;
    sendEventLeaveGroup({ value, fee, memo }: sendEventLeaveGroupParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupAdmin({ value, fee, memo }: sendMsgUpdateGroupAdminParams): Promise<DeliverTxResponse>;
    sendMsgUpdateGroupMetadataResponse({ value, fee, memo }: sendMsgUpdateGroupMetadataResponseParams): Promise<DeliverTxResponse>;
    groupMember({ value }: groupMemberParams): EncodeObject;
    queryGroupPolicyInfoResponse({ value }: queryGroupPolicyInfoResponseParams): EncodeObject;
    queryGroupsByAdminResponse({ value }: queryGroupsByAdminResponseParams): EncodeObject;
    msgCreateGroupPolicyResponse({ value }: msgCreateGroupPolicyResponseParams): EncodeObject;
    msgVote({ value }: msgVoteParams): EncodeObject;
    msgCreateGroup({ value }: msgCreateGroupParams): EncodeObject;
    msgWithdrawProposalResponse({ value }: msgWithdrawProposalResponseParams): EncodeObject;
    eventSubmitProposal({ value }: eventSubmitProposalParams): EncodeObject;
    queryProposalsByGroupPolicyResponse({ value }: queryProposalsByGroupPolicyResponseParams): EncodeObject;
    queryGroupsByMemberRequest({ value }: queryGroupsByMemberRequestParams): EncodeObject;
    queryGroupsRequest({ value }: queryGroupsRequestParams): EncodeObject;
    msgUpdateGroupPolicyMetadataResponse({ value }: msgUpdateGroupPolicyMetadataResponseParams): EncodeObject;
    eventWithdrawProposal({ value }: eventWithdrawProposalParams): EncodeObject;
    queryGroupInfoRequest({ value }: queryGroupInfoRequestParams): EncodeObject;
    queryProposalResponse({ value }: queryProposalResponseParams): EncodeObject;
    queryTallyResultResponse({ value }: queryTallyResultResponseParams): EncodeObject;
    queryGroupsResponse({ value }: queryGroupsResponseParams): EncodeObject;
    msgUpdateGroupMembers({ value }: msgUpdateGroupMembersParams): EncodeObject;
    msgCreateGroupWithPolicyResponse({ value }: msgCreateGroupWithPolicyResponseParams): EncodeObject;
    queryGroupInfoResponse({ value }: queryGroupInfoResponseParams): EncodeObject;
    queryGroupPolicyInfoRequest({ value }: queryGroupPolicyInfoRequestParams): EncodeObject;
    queryGroupMembersRequest({ value }: queryGroupMembersRequestParams): EncodeObject;
    queryProposalsByGroupPolicyRequest({ value }: queryProposalsByGroupPolicyRequestParams): EncodeObject;
    tallyResult({ value }: tallyResultParams): EncodeObject;
    eventCreateGroupPolicy({ value }: eventCreateGroupPolicyParams): EncodeObject;
    queryVotesByProposalResponse({ value }: queryVotesByProposalResponseParams): EncodeObject;
    queryVotesByVoterRequest({ value }: queryVotesByVoterRequestParams): EncodeObject;
    msgLeaveGroup({ value }: msgLeaveGroupParams): EncodeObject;
    queryGroupPoliciesByAdminResponse({ value }: queryGroupPoliciesByAdminResponseParams): EncodeObject;
    msgSubmitProposal({ value }: msgSubmitProposalParams): EncodeObject;
    msgExec({ value }: msgExecParams): EncodeObject;
    groupInfo({ value }: groupInfoParams): EncodeObject;
    decisionPolicyWindows({ value }: decisionPolicyWindowsParams): EncodeObject;
    eventExec({ value }: eventExecParams): EncodeObject;
    queryGroupPoliciesByGroupResponse({ value }: queryGroupPoliciesByGroupResponseParams): EncodeObject;
    queryVotesByVoterResponse({ value }: queryVotesByVoterResponseParams): EncodeObject;
    msgUpdateGroupPolicyAdminResponse({ value }: msgUpdateGroupPolicyAdminResponseParams): EncodeObject;
    percentageDecisionPolicy({ value }: percentageDecisionPolicyParams): EncodeObject;
    queryGroupsByAdminRequest({ value }: queryGroupsByAdminRequestParams): EncodeObject;
    queryGroupsByMemberResponse({ value }: queryGroupsByMemberResponseParams): EncodeObject;
    queryTallyResultRequest({ value }: queryTallyResultRequestParams): EncodeObject;
    msgExecResponse({ value }: msgExecResponseParams): EncodeObject;
    thresholdDecisionPolicy({ value }: thresholdDecisionPolicyParams): EncodeObject;
    vote({ value }: voteParams): EncodeObject;
    queryGroupMembersResponse({ value }: queryGroupMembersResponseParams): EncodeObject;
    queryVoteByProposalVoterRequest({ value }: queryVoteByProposalVoterRequestParams): EncodeObject;
    proposal({ value }: proposalParams): EncodeObject;
    msgUpdateGroupMembersResponse({ value }: msgUpdateGroupMembersResponseParams): EncodeObject;
    msgUpdateGroupPolicyAdmin({ value }: msgUpdateGroupPolicyAdminParams): EncodeObject;
    msgUpdateGroupPolicyMetadata({ value }: msgUpdateGroupPolicyMetadataParams): EncodeObject;
    msgLeaveGroupResponse({ value }: msgLeaveGroupResponseParams): EncodeObject;
    eventCreateGroup({ value }: eventCreateGroupParams): EncodeObject;
    queryGroupPoliciesByGroupRequest({ value }: queryGroupPoliciesByGroupRequestParams): EncodeObject;
    queryGroupPoliciesByAdminRequest({ value }: queryGroupPoliciesByAdminRequestParams): EncodeObject;
    queryVotesByProposalRequest({ value }: queryVotesByProposalRequestParams): EncodeObject;
    msgUpdateGroupAdminResponse({ value }: msgUpdateGroupAdminResponseParams): EncodeObject;
    member({ value }: memberParams): EncodeObject;
    queryProposalRequest({ value }: queryProposalRequestParams): EncodeObject;
    msgUpdateGroupMetadata({ value }: msgUpdateGroupMetadataParams): EncodeObject;
    msgCreateGroupWithPolicy({ value }: msgCreateGroupWithPolicyParams): EncodeObject;
    msgCreateGroupResponse({ value }: msgCreateGroupResponseParams): EncodeObject;
    eventVote({ value }: eventVoteParams): EncodeObject;
    msgCreateGroupPolicy({ value }: msgCreateGroupPolicyParams): EncodeObject;
    msgUpdateGroupPolicyDecisionPolicyResponse({ value }: msgUpdateGroupPolicyDecisionPolicyResponseParams): EncodeObject;
    msgVoteResponse({ value }: msgVoteResponseParams): EncodeObject;
    groupPolicyInfo({ value }: groupPolicyInfoParams): EncodeObject;
    memberRequest({ value }: memberRequestParams): EncodeObject;
    eventUpdateGroupPolicy({ value }: eventUpdateGroupPolicyParams): EncodeObject;
    eventProposalPruned({ value }: eventProposalPrunedParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgUpdateGroupPolicyDecisionPolicy({ value }: msgUpdateGroupPolicyDecisionPolicyParams): EncodeObject;
    queryVoteByProposalVoterResponse({ value }: queryVoteByProposalVoterResponseParams): EncodeObject;
    msgSubmitProposalResponse({ value }: msgSubmitProposalResponseParams): EncodeObject;
    msgWithdrawProposal({ value }: msgWithdrawProposalParams): EncodeObject;
    eventUpdateGroup({ value }: eventUpdateGroupParams): EncodeObject;
    eventLeaveGroup({ value }: eventLeaveGroupParams): EncodeObject;
    msgUpdateGroupAdmin({ value }: msgUpdateGroupAdminParams): EncodeObject;
    msgUpdateGroupMetadataResponse({ value }: msgUpdateGroupMetadataResponseParams): EncodeObject;
};
interface QueryClientOptions {
    addr: string;
}
export declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Api<unknown>;
declare class SDKModule {
    query: ReturnType<typeof queryClient>;
    tx: ReturnType<typeof txClient>;
    structure: Record<string, unknown>;
    registry: Array<[string, GeneratedType]>;
    constructor(client: IgniteClient);
    updateTX(client: IgniteClient): void;
}
declare const IgntModule: (test: IgniteClient) => {
    module: {
        CosmosGroupV1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
