//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryGroupInfoRequest, QueryGroupInfoResponse, QueryGroupPolicyInfoRequest, QueryGroupPolicyInfoResponse, QueryGroupMembersRequest, QueryGroupMembersResponse, QueryGroupsByAdminRequest, QueryGroupsByAdminResponse, QueryGroupPoliciesByGroupRequest, QueryGroupPoliciesByGroupResponse, QueryGroupPoliciesByAdminRequest, QueryGroupPoliciesByAdminResponse, QueryProposalRequest, QueryProposalResponse, QueryProposalsByGroupPolicyRequest, QueryProposalsByGroupPolicyResponse, QueryVoteByProposalVoterRequest, QueryVoteByProposalVoterResponse, QueryVotesByProposalRequest, QueryVotesByProposalResponse, QueryVotesByVoterRequest, QueryVotesByVoterResponse, QueryGroupsByMemberRequest, QueryGroupsByMemberResponse, QueryTallyResultRequest, QueryTallyResultResponse } from "./query.js";
/** Query is the cosmos.group.v1 Query service. */
export interface Query {
  /** GroupInfo queries group info based on group id. */
  groupInfo(request: QueryGroupInfoRequest): Promise<QueryGroupInfoResponse>;
  /** GroupPolicyInfo queries group policy info based on account address of group policy. */
  groupPolicyInfo(request: QueryGroupPolicyInfoRequest): Promise<QueryGroupPolicyInfoResponse>;
  /** GroupMembers queries members of a group */
  groupMembers(request: QueryGroupMembersRequest): Promise<QueryGroupMembersResponse>;
  /** GroupsByAdmin queries groups by admin address. */
  groupsByAdmin(request: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponse>;
  /** GroupPoliciesByGroup queries group policies by group id. */
  groupPoliciesByGroup(request: QueryGroupPoliciesByGroupRequest): Promise<QueryGroupPoliciesByGroupResponse>;
  /** GroupsByAdmin queries group policies by admin address. */
  groupPoliciesByAdmin(request: QueryGroupPoliciesByAdminRequest): Promise<QueryGroupPoliciesByAdminResponse>;
  /** Proposal queries a proposal based on proposal id. */
  proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
  /** ProposalsByGroupPolicy queries proposals based on account address of group policy. */
  proposalsByGroupPolicy(request: QueryProposalsByGroupPolicyRequest): Promise<QueryProposalsByGroupPolicyResponse>;
  /** VoteByProposalVoter queries a vote by proposal id and voter. */
  voteByProposalVoter(request: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponse>;
  /** VotesByProposal queries a vote by proposal. */
  votesByProposal(request: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponse>;
  /** VotesByVoter queries a vote by voter. */
  votesByVoter(request: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponse>;
  /** GroupsByMember queries groups by member address. */
  groupsByMember(request: QueryGroupsByMemberRequest): Promise<QueryGroupsByMemberResponse>;
  /** TallyResult queries the tally of a proposal votes. */
  tallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.groupInfo = this.groupInfo.bind(this);
    this.groupPolicyInfo = this.groupPolicyInfo.bind(this);
    this.groupMembers = this.groupMembers.bind(this);
    this.groupsByAdmin = this.groupsByAdmin.bind(this);
    this.groupPoliciesByGroup = this.groupPoliciesByGroup.bind(this);
    this.groupPoliciesByAdmin = this.groupPoliciesByAdmin.bind(this);
    this.proposal = this.proposal.bind(this);
    this.proposalsByGroupPolicy = this.proposalsByGroupPolicy.bind(this);
    this.voteByProposalVoter = this.voteByProposalVoter.bind(this);
    this.votesByProposal = this.votesByProposal.bind(this);
    this.votesByVoter = this.votesByVoter.bind(this);
    this.groupsByMember = this.groupsByMember.bind(this);
    this.tallyResult = this.tallyResult.bind(this);
  }
  groupInfo(request: QueryGroupInfoRequest): Promise<QueryGroupInfoResponse> {
    const data = QueryGroupInfoRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "GroupInfo", data);
    return promise.then(data => QueryGroupInfoResponse.decode(new BinaryReader(data)));
  }
  groupPolicyInfo(request: QueryGroupPolicyInfoRequest): Promise<QueryGroupPolicyInfoResponse> {
    const data = QueryGroupPolicyInfoRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "GroupPolicyInfo", data);
    return promise.then(data => QueryGroupPolicyInfoResponse.decode(new BinaryReader(data)));
  }
  groupMembers(request: QueryGroupMembersRequest): Promise<QueryGroupMembersResponse> {
    const data = QueryGroupMembersRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "GroupMembers", data);
    return promise.then(data => QueryGroupMembersResponse.decode(new BinaryReader(data)));
  }
  groupsByAdmin(request: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponse> {
    const data = QueryGroupsByAdminRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "GroupsByAdmin", data);
    return promise.then(data => QueryGroupsByAdminResponse.decode(new BinaryReader(data)));
  }
  groupPoliciesByGroup(request: QueryGroupPoliciesByGroupRequest): Promise<QueryGroupPoliciesByGroupResponse> {
    const data = QueryGroupPoliciesByGroupRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "GroupPoliciesByGroup", data);
    return promise.then(data => QueryGroupPoliciesByGroupResponse.decode(new BinaryReader(data)));
  }
  groupPoliciesByAdmin(request: QueryGroupPoliciesByAdminRequest): Promise<QueryGroupPoliciesByAdminResponse> {
    const data = QueryGroupPoliciesByAdminRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "GroupPoliciesByAdmin", data);
    return promise.then(data => QueryGroupPoliciesByAdminResponse.decode(new BinaryReader(data)));
  }
  proposal(request: QueryProposalRequest): Promise<QueryProposalResponse> {
    const data = QueryProposalRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "Proposal", data);
    return promise.then(data => QueryProposalResponse.decode(new BinaryReader(data)));
  }
  proposalsByGroupPolicy(request: QueryProposalsByGroupPolicyRequest): Promise<QueryProposalsByGroupPolicyResponse> {
    const data = QueryProposalsByGroupPolicyRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "ProposalsByGroupPolicy", data);
    return promise.then(data => QueryProposalsByGroupPolicyResponse.decode(new BinaryReader(data)));
  }
  voteByProposalVoter(request: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponse> {
    const data = QueryVoteByProposalVoterRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "VoteByProposalVoter", data);
    return promise.then(data => QueryVoteByProposalVoterResponse.decode(new BinaryReader(data)));
  }
  votesByProposal(request: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponse> {
    const data = QueryVotesByProposalRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "VotesByProposal", data);
    return promise.then(data => QueryVotesByProposalResponse.decode(new BinaryReader(data)));
  }
  votesByVoter(request: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponse> {
    const data = QueryVotesByVoterRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "VotesByVoter", data);
    return promise.then(data => QueryVotesByVoterResponse.decode(new BinaryReader(data)));
  }
  groupsByMember(request: QueryGroupsByMemberRequest): Promise<QueryGroupsByMemberResponse> {
    const data = QueryGroupsByMemberRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "GroupsByMember", data);
    return promise.then(data => QueryGroupsByMemberResponse.decode(new BinaryReader(data)));
  }
  tallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse> {
    const data = QueryTallyResultRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.group.v1.Query", "TallyResult", data);
    return promise.then(data => QueryTallyResultResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    groupInfo(request: QueryGroupInfoRequest): Promise<QueryGroupInfoResponse> {
      return queryService.groupInfo(request);
    },
    groupPolicyInfo(request: QueryGroupPolicyInfoRequest): Promise<QueryGroupPolicyInfoResponse> {
      return queryService.groupPolicyInfo(request);
    },
    groupMembers(request: QueryGroupMembersRequest): Promise<QueryGroupMembersResponse> {
      return queryService.groupMembers(request);
    },
    groupsByAdmin(request: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponse> {
      return queryService.groupsByAdmin(request);
    },
    groupPoliciesByGroup(request: QueryGroupPoliciesByGroupRequest): Promise<QueryGroupPoliciesByGroupResponse> {
      return queryService.groupPoliciesByGroup(request);
    },
    groupPoliciesByAdmin(request: QueryGroupPoliciesByAdminRequest): Promise<QueryGroupPoliciesByAdminResponse> {
      return queryService.groupPoliciesByAdmin(request);
    },
    proposal(request: QueryProposalRequest): Promise<QueryProposalResponse> {
      return queryService.proposal(request);
    },
    proposalsByGroupPolicy(request: QueryProposalsByGroupPolicyRequest): Promise<QueryProposalsByGroupPolicyResponse> {
      return queryService.proposalsByGroupPolicy(request);
    },
    voteByProposalVoter(request: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponse> {
      return queryService.voteByProposalVoter(request);
    },
    votesByProposal(request: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponse> {
      return queryService.votesByProposal(request);
    },
    votesByVoter(request: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponse> {
      return queryService.votesByVoter(request);
    },
    groupsByMember(request: QueryGroupsByMemberRequest): Promise<QueryGroupsByMemberResponse> {
      return queryService.groupsByMember(request);
    },
    tallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse> {
      return queryService.tallyResult(request);
    }
  };
};
export interface UseGroupInfoQuery<TData> extends ReactQueryParams<QueryGroupInfoResponse, TData> {
  request: QueryGroupInfoRequest;
}
export interface UseGroupPolicyInfoQuery<TData> extends ReactQueryParams<QueryGroupPolicyInfoResponse, TData> {
  request: QueryGroupPolicyInfoRequest;
}
export interface UseGroupMembersQuery<TData> extends ReactQueryParams<QueryGroupMembersResponse, TData> {
  request: QueryGroupMembersRequest;
}
export interface UseGroupsByAdminQuery<TData> extends ReactQueryParams<QueryGroupsByAdminResponse, TData> {
  request: QueryGroupsByAdminRequest;
}
export interface UseGroupPoliciesByGroupQuery<TData> extends ReactQueryParams<QueryGroupPoliciesByGroupResponse, TData> {
  request: QueryGroupPoliciesByGroupRequest;
}
export interface UseGroupPoliciesByAdminQuery<TData> extends ReactQueryParams<QueryGroupPoliciesByAdminResponse, TData> {
  request: QueryGroupPoliciesByAdminRequest;
}
export interface UseProposalQuery<TData> extends ReactQueryParams<QueryProposalResponse, TData> {
  request: QueryProposalRequest;
}
export interface UseProposalsByGroupPolicyQuery<TData> extends ReactQueryParams<QueryProposalsByGroupPolicyResponse, TData> {
  request: QueryProposalsByGroupPolicyRequest;
}
export interface UseVoteByProposalVoterQuery<TData> extends ReactQueryParams<QueryVoteByProposalVoterResponse, TData> {
  request: QueryVoteByProposalVoterRequest;
}
export interface UseVotesByProposalQuery<TData> extends ReactQueryParams<QueryVotesByProposalResponse, TData> {
  request: QueryVotesByProposalRequest;
}
export interface UseVotesByVoterQuery<TData> extends ReactQueryParams<QueryVotesByVoterResponse, TData> {
  request: QueryVotesByVoterRequest;
}
export interface UseGroupsByMemberQuery<TData> extends ReactQueryParams<QueryGroupsByMemberResponse, TData> {
  request: QueryGroupsByMemberRequest;
}
export interface UseTallyResultQuery<TData> extends ReactQueryParams<QueryTallyResultResponse, TData> {
  request: QueryTallyResultRequest;
}
const _queryClients: WeakMap<ProtobufRpcClient, QueryClientImpl> = new WeakMap();
const getQueryService = (rpc: ProtobufRpcClient | undefined): QueryClientImpl | undefined => {
  if (!rpc) return;
  if (_queryClients.has(rpc)) {
    return _queryClients.get(rpc);
  }
  const queryService = new QueryClientImpl(rpc);
  _queryClients.set(rpc, queryService);
  return queryService;
};
export const createRpcQueryHooks = (rpc: ProtobufRpcClient | undefined) => {
  const queryService = getQueryService(rpc);
  const useGroupInfo = <TData = QueryGroupInfoResponse,>({
    request,
    options
  }: UseGroupInfoQuery<TData>) => {
    return useQuery<QueryGroupInfoResponse, Error, TData>(["groupInfoQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.groupInfo(request);
    }, options);
  };
  const useGroupPolicyInfo = <TData = QueryGroupPolicyInfoResponse,>({
    request,
    options
  }: UseGroupPolicyInfoQuery<TData>) => {
    return useQuery<QueryGroupPolicyInfoResponse, Error, TData>(["groupPolicyInfoQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.groupPolicyInfo(request);
    }, options);
  };
  const useGroupMembers = <TData = QueryGroupMembersResponse,>({
    request,
    options
  }: UseGroupMembersQuery<TData>) => {
    return useQuery<QueryGroupMembersResponse, Error, TData>(["groupMembersQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.groupMembers(request);
    }, options);
  };
  const useGroupsByAdmin = <TData = QueryGroupsByAdminResponse,>({
    request,
    options
  }: UseGroupsByAdminQuery<TData>) => {
    return useQuery<QueryGroupsByAdminResponse, Error, TData>(["groupsByAdminQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.groupsByAdmin(request);
    }, options);
  };
  const useGroupPoliciesByGroup = <TData = QueryGroupPoliciesByGroupResponse,>({
    request,
    options
  }: UseGroupPoliciesByGroupQuery<TData>) => {
    return useQuery<QueryGroupPoliciesByGroupResponse, Error, TData>(["groupPoliciesByGroupQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.groupPoliciesByGroup(request);
    }, options);
  };
  const useGroupPoliciesByAdmin = <TData = QueryGroupPoliciesByAdminResponse,>({
    request,
    options
  }: UseGroupPoliciesByAdminQuery<TData>) => {
    return useQuery<QueryGroupPoliciesByAdminResponse, Error, TData>(["groupPoliciesByAdminQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.groupPoliciesByAdmin(request);
    }, options);
  };
  const useProposal = <TData = QueryProposalResponse,>({
    request,
    options
  }: UseProposalQuery<TData>) => {
    return useQuery<QueryProposalResponse, Error, TData>(["proposalQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.proposal(request);
    }, options);
  };
  const useProposalsByGroupPolicy = <TData = QueryProposalsByGroupPolicyResponse,>({
    request,
    options
  }: UseProposalsByGroupPolicyQuery<TData>) => {
    return useQuery<QueryProposalsByGroupPolicyResponse, Error, TData>(["proposalsByGroupPolicyQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.proposalsByGroupPolicy(request);
    }, options);
  };
  const useVoteByProposalVoter = <TData = QueryVoteByProposalVoterResponse,>({
    request,
    options
  }: UseVoteByProposalVoterQuery<TData>) => {
    return useQuery<QueryVoteByProposalVoterResponse, Error, TData>(["voteByProposalVoterQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.voteByProposalVoter(request);
    }, options);
  };
  const useVotesByProposal = <TData = QueryVotesByProposalResponse,>({
    request,
    options
  }: UseVotesByProposalQuery<TData>) => {
    return useQuery<QueryVotesByProposalResponse, Error, TData>(["votesByProposalQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.votesByProposal(request);
    }, options);
  };
  const useVotesByVoter = <TData = QueryVotesByVoterResponse,>({
    request,
    options
  }: UseVotesByVoterQuery<TData>) => {
    return useQuery<QueryVotesByVoterResponse, Error, TData>(["votesByVoterQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.votesByVoter(request);
    }, options);
  };
  const useGroupsByMember = <TData = QueryGroupsByMemberResponse,>({
    request,
    options
  }: UseGroupsByMemberQuery<TData>) => {
    return useQuery<QueryGroupsByMemberResponse, Error, TData>(["groupsByMemberQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.groupsByMember(request);
    }, options);
  };
  const useTallyResult = <TData = QueryTallyResultResponse,>({
    request,
    options
  }: UseTallyResultQuery<TData>) => {
    return useQuery<QueryTallyResultResponse, Error, TData>(["tallyResultQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.tallyResult(request);
    }, options);
  };
  return {
    /** GroupInfo queries group info based on group id. */useGroupInfo,
    /** GroupPolicyInfo queries group policy info based on account address of group policy. */useGroupPolicyInfo,
    /** GroupMembers queries members of a group */useGroupMembers,
    /** GroupsByAdmin queries groups by admin address. */useGroupsByAdmin,
    /** GroupPoliciesByGroup queries group policies by group id. */useGroupPoliciesByGroup,
    /** GroupsByAdmin queries group policies by admin address. */useGroupPoliciesByAdmin,
    /** Proposal queries a proposal based on proposal id. */useProposal,
    /** ProposalsByGroupPolicy queries proposals based on account address of group policy. */useProposalsByGroupPolicy,
    /** VoteByProposalVoter queries a vote by proposal id and voter. */useVoteByProposalVoter,
    /** VotesByProposal queries a vote by proposal. */useVotesByProposal,
    /** VotesByVoter queries a vote by voter. */useVotesByVoter,
    /** GroupsByMember queries groups by member address. */useGroupsByMember,
    /** TallyResult queries the tally of a proposal votes. */useTallyResult
  };
};