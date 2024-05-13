//@ts-nocheck
import { Rpc } from "../../../helpers";
import * as _m0 from "protobufjs/minimal";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query";
import { useQuery } from "@tanstack/react-query";
import { QueryCurrentPlanRequest, QueryCurrentPlanResponse, QueryAppliedPlanRequest, QueryAppliedPlanResponse, QueryUpgradedConsensusStateRequest, QueryUpgradedConsensusStateResponse, QueryModuleVersionsRequest, QueryModuleVersionsResponse, QueryAuthorityRequest, QueryAuthorityResponse } from "./query";
/** Query defines the gRPC upgrade querier service. */
export interface Query {
  /** CurrentPlan queries the current upgrade plan. */
  currentPlan(request?: QueryCurrentPlanRequest): Promise<QueryCurrentPlanResponse>;
  /** AppliedPlan queries a previously applied upgrade plan by its name. */
  appliedPlan(request: QueryAppliedPlanRequest): Promise<QueryAppliedPlanResponse>;
  /**
   * UpgradedConsensusState queries the consensus state that will serve
   * as a trusted kernel for the next version of this chain. It will only be
   * stored at the last height of this chain.
   * UpgradedConsensusState RPC not supported with legacy querier
   * This rpc is deprecated now that IBC has its own replacement
   * (https://github.com/cosmos/ibc-go/blob/2c880a22e9f9cc75f62b527ca94aa75ce1106001/proto/ibc/core/client/v1/query.proto#L54)
   */
  upgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse>;
  /**
   * ModuleVersions queries the list of module versions from state.
   * 
   * Since: cosmos-sdk 0.43
   */
  moduleVersions(request: QueryModuleVersionsRequest): Promise<QueryModuleVersionsResponse>;
  /** Returns the account with authority to conduct upgrades */
  authority(request?: QueryAuthorityRequest): Promise<QueryAuthorityResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.currentPlan = this.currentPlan.bind(this);
    this.appliedPlan = this.appliedPlan.bind(this);
    this.upgradedConsensusState = this.upgradedConsensusState.bind(this);
    this.moduleVersions = this.moduleVersions.bind(this);
    this.authority = this.authority.bind(this);
  }
  currentPlan(request: QueryCurrentPlanRequest = {}): Promise<QueryCurrentPlanResponse> {
    const data = QueryCurrentPlanRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.upgrade.v1beta1.Query", "CurrentPlan", data);
    return promise.then(data => QueryCurrentPlanResponse.decode(new _m0.Reader(data)));
  }
  appliedPlan(request: QueryAppliedPlanRequest): Promise<QueryAppliedPlanResponse> {
    const data = QueryAppliedPlanRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.upgrade.v1beta1.Query", "AppliedPlan", data);
    return promise.then(data => QueryAppliedPlanResponse.decode(new _m0.Reader(data)));
  }
  upgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse> {
    const data = QueryUpgradedConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.upgrade.v1beta1.Query", "UpgradedConsensusState", data);
    return promise.then(data => QueryUpgradedConsensusStateResponse.decode(new _m0.Reader(data)));
  }
  moduleVersions(request: QueryModuleVersionsRequest): Promise<QueryModuleVersionsResponse> {
    const data = QueryModuleVersionsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.upgrade.v1beta1.Query", "ModuleVersions", data);
    return promise.then(data => QueryModuleVersionsResponse.decode(new _m0.Reader(data)));
  }
  authority(request: QueryAuthorityRequest = {}): Promise<QueryAuthorityResponse> {
    const data = QueryAuthorityRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.upgrade.v1beta1.Query", "Authority", data);
    return promise.then(data => QueryAuthorityResponse.decode(new _m0.Reader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    currentPlan(request?: QueryCurrentPlanRequest): Promise<QueryCurrentPlanResponse> {
      return queryService.currentPlan(request);
    },
    appliedPlan(request: QueryAppliedPlanRequest): Promise<QueryAppliedPlanResponse> {
      return queryService.appliedPlan(request);
    },
    upgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse> {
      return queryService.upgradedConsensusState(request);
    },
    moduleVersions(request: QueryModuleVersionsRequest): Promise<QueryModuleVersionsResponse> {
      return queryService.moduleVersions(request);
    },
    authority(request?: QueryAuthorityRequest): Promise<QueryAuthorityResponse> {
      return queryService.authority(request);
    }
  };
};
export interface UseCurrentPlanQuery<TData> extends ReactQueryParams<QueryCurrentPlanResponse, TData> {
  request?: QueryCurrentPlanRequest;
}
export interface UseAppliedPlanQuery<TData> extends ReactQueryParams<QueryAppliedPlanResponse, TData> {
  request: QueryAppliedPlanRequest;
}
export interface UseUpgradedConsensusStateQuery<TData> extends ReactQueryParams<QueryUpgradedConsensusStateResponse, TData> {
  request: QueryUpgradedConsensusStateRequest;
}
export interface UseModuleVersionsQuery<TData> extends ReactQueryParams<QueryModuleVersionsResponse, TData> {
  request: QueryModuleVersionsRequest;
}
export interface UseAuthorityQuery<TData> extends ReactQueryParams<QueryAuthorityResponse, TData> {
  request?: QueryAuthorityRequest;
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
  const useCurrentPlan = <TData = QueryCurrentPlanResponse,>({
    request,
    options
  }: UseCurrentPlanQuery<TData>) => {
    return useQuery<QueryCurrentPlanResponse, Error, TData>(["currentPlanQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.currentPlan(request);
    }, options);
  };
  const useAppliedPlan = <TData = QueryAppliedPlanResponse,>({
    request,
    options
  }: UseAppliedPlanQuery<TData>) => {
    return useQuery<QueryAppliedPlanResponse, Error, TData>(["appliedPlanQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.appliedPlan(request);
    }, options);
  };
  const useUpgradedConsensusState = <TData = QueryUpgradedConsensusStateResponse,>({
    request,
    options
  }: UseUpgradedConsensusStateQuery<TData>) => {
    return useQuery<QueryUpgradedConsensusStateResponse, Error, TData>(["upgradedConsensusStateQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.upgradedConsensusState(request);
    }, options);
  };
  const useModuleVersions = <TData = QueryModuleVersionsResponse,>({
    request,
    options
  }: UseModuleVersionsQuery<TData>) => {
    return useQuery<QueryModuleVersionsResponse, Error, TData>(["moduleVersionsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.moduleVersions(request);
    }, options);
  };
  const useAuthority = <TData = QueryAuthorityResponse,>({
    request,
    options
  }: UseAuthorityQuery<TData>) => {
    return useQuery<QueryAuthorityResponse, Error, TData>(["authorityQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.authority(request);
    }, options);
  };
  return {
    /** CurrentPlan queries the current upgrade plan. */useCurrentPlan,
    /** AppliedPlan queries a previously applied upgrade plan by its name. */useAppliedPlan,
    /**
     * UpgradedConsensusState queries the consensus state that will serve
     * as a trusted kernel for the next version of this chain. It will only be
     * stored at the last height of this chain.
     * UpgradedConsensusState RPC not supported with legacy querier
     * This rpc is deprecated now that IBC has its own replacement
     * (https://github.com/cosmos/ibc-go/blob/2c880a22e9f9cc75f62b527ca94aa75ce1106001/proto/ibc/core/client/v1/query.proto#L54)
     */
    useUpgradedConsensusState,
    /**
     * ModuleVersions queries the list of module versions from state.
     * 
     * Since: cosmos-sdk 0.43
     */
    useModuleVersions,
    /** Returns the account with authority to conduct upgrades */useAuthority
  };
};