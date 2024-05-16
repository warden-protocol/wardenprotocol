//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import _m0 from "protobufjs/minimal.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryProposalRequest, QueryProposalResponse, QueryProposalsRequest, QueryProposalsResponse, QueryVoteRequest, QueryVoteResponse, QueryVotesRequest, QueryVotesResponse, QueryParamsRequest, QueryParamsResponse, QueryDepositRequest, QueryDepositResponse, QueryDepositsRequest, QueryDepositsResponse, QueryTallyResultRequest, QueryTallyResultResponse } from "./query.js";
/** Query defines the gRPC querier service for gov module */
export interface Query {
  /** Proposal queries proposal details based on ProposalID. */
  proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
  /** Proposals queries all proposals based on given status. */
  proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse>;
  /** Vote queries voted information based on proposalID, voterAddr. */
  vote(request: QueryVoteRequest): Promise<QueryVoteResponse>;
  /** Votes queries votes of a given proposal. */
  votes(request: QueryVotesRequest): Promise<QueryVotesResponse>;
  /** Params queries all parameters of the gov module. */
  params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Deposit queries single deposit information based proposalID, depositAddr. */
  deposit(request: QueryDepositRequest): Promise<QueryDepositResponse>;
  /** Deposits queries all deposits of a single proposal. */
  deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse>;
  /** TallyResult queries the tally of a proposal vote. */
  tallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.proposal = this.proposal.bind(this);
    this.proposals = this.proposals.bind(this);
    this.vote = this.vote.bind(this);
    this.votes = this.votes.bind(this);
    this.params = this.params.bind(this);
    this.deposit = this.deposit.bind(this);
    this.deposits = this.deposits.bind(this);
    this.tallyResult = this.tallyResult.bind(this);
  }
  proposal(request: QueryProposalRequest): Promise<QueryProposalResponse> {
    const data = QueryProposalRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Proposal", data);
    return promise.then(data => QueryProposalResponse.decode(new _m0.Reader(data)));
  }
  proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse> {
    const data = QueryProposalsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Proposals", data);
    return promise.then(data => QueryProposalsResponse.decode(new _m0.Reader(data)));
  }
  vote(request: QueryVoteRequest): Promise<QueryVoteResponse> {
    const data = QueryVoteRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Vote", data);
    return promise.then(data => QueryVoteResponse.decode(new _m0.Reader(data)));
  }
  votes(request: QueryVotesRequest): Promise<QueryVotesResponse> {
    const data = QueryVotesRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Votes", data);
    return promise.then(data => QueryVotesResponse.decode(new _m0.Reader(data)));
  }
  params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new _m0.Reader(data)));
  }
  deposit(request: QueryDepositRequest): Promise<QueryDepositResponse> {
    const data = QueryDepositRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Deposit", data);
    return promise.then(data => QueryDepositResponse.decode(new _m0.Reader(data)));
  }
  deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse> {
    const data = QueryDepositsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "Deposits", data);
    return promise.then(data => QueryDepositsResponse.decode(new _m0.Reader(data)));
  }
  tallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse> {
    const data = QueryTallyResultRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1.Query", "TallyResult", data);
    return promise.then(data => QueryTallyResultResponse.decode(new _m0.Reader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    proposal(request: QueryProposalRequest): Promise<QueryProposalResponse> {
      return queryService.proposal(request);
    },
    proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse> {
      return queryService.proposals(request);
    },
    vote(request: QueryVoteRequest): Promise<QueryVoteResponse> {
      return queryService.vote(request);
    },
    votes(request: QueryVotesRequest): Promise<QueryVotesResponse> {
      return queryService.votes(request);
    },
    params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    deposit(request: QueryDepositRequest): Promise<QueryDepositResponse> {
      return queryService.deposit(request);
    },
    deposits(request: QueryDepositsRequest): Promise<QueryDepositsResponse> {
      return queryService.deposits(request);
    },
    tallyResult(request: QueryTallyResultRequest): Promise<QueryTallyResultResponse> {
      return queryService.tallyResult(request);
    }
  };
};
export interface UseProposalQuery<TData> extends ReactQueryParams<QueryProposalResponse, TData> {
  request: QueryProposalRequest;
}
export interface UseProposalsQuery<TData> extends ReactQueryParams<QueryProposalsResponse, TData> {
  request: QueryProposalsRequest;
}
export interface UseVoteQuery<TData> extends ReactQueryParams<QueryVoteResponse, TData> {
  request: QueryVoteRequest;
}
export interface UseVotesQuery<TData> extends ReactQueryParams<QueryVotesResponse, TData> {
  request: QueryVotesRequest;
}
export interface UseParamsQuery<TData> extends ReactQueryParams<QueryParamsResponse, TData> {
  request: QueryParamsRequest;
}
export interface UseDepositQuery<TData> extends ReactQueryParams<QueryDepositResponse, TData> {
  request: QueryDepositRequest;
}
export interface UseDepositsQuery<TData> extends ReactQueryParams<QueryDepositsResponse, TData> {
  request: QueryDepositsRequest;
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
  const useProposal = <TData = QueryProposalResponse,>({
    request,
    options
  }: UseProposalQuery<TData>) => {
    return useQuery<QueryProposalResponse, Error, TData>(["proposalQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.proposal(request);
    }, options);
  };
  const useProposals = <TData = QueryProposalsResponse,>({
    request,
    options
  }: UseProposalsQuery<TData>) => {
    return useQuery<QueryProposalsResponse, Error, TData>(["proposalsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.proposals(request);
    }, options);
  };
  const useVote = <TData = QueryVoteResponse,>({
    request,
    options
  }: UseVoteQuery<TData>) => {
    return useQuery<QueryVoteResponse, Error, TData>(["voteQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.vote(request);
    }, options);
  };
  const useVotes = <TData = QueryVotesResponse,>({
    request,
    options
  }: UseVotesQuery<TData>) => {
    return useQuery<QueryVotesResponse, Error, TData>(["votesQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.votes(request);
    }, options);
  };
  const useParams = <TData = QueryParamsResponse,>({
    request,
    options
  }: UseParamsQuery<TData>) => {
    return useQuery<QueryParamsResponse, Error, TData>(["paramsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.params(request);
    }, options);
  };
  const useDeposit = <TData = QueryDepositResponse,>({
    request,
    options
  }: UseDepositQuery<TData>) => {
    return useQuery<QueryDepositResponse, Error, TData>(["depositQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.deposit(request);
    }, options);
  };
  const useDeposits = <TData = QueryDepositsResponse,>({
    request,
    options
  }: UseDepositsQuery<TData>) => {
    return useQuery<QueryDepositsResponse, Error, TData>(["depositsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.deposits(request);
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
    /** Proposal queries proposal details based on ProposalID. */useProposal,
    /** Proposals queries all proposals based on given status. */useProposals,
    /** Vote queries voted information based on proposalID, voterAddr. */useVote,
    /** Votes queries votes of a given proposal. */useVotes,
    /** Params queries all parameters of the gov module. */useParams,
    /** Deposit queries single deposit information based proposalID, depositAddr. */useDeposit,
    /** Deposits queries all deposits of a single proposal. */useDeposits,
    /** TallyResult queries the tally of a proposal vote. */useTallyResult
  };
};