//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import _m0 from "protobufjs/minimal.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryAllowanceRequest, QueryAllowanceResponse, QueryAllowancesRequest, QueryAllowancesResponse, QueryAllowancesByGranterRequest, QueryAllowancesByGranterResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Allowance returns fee granted to the grantee by the granter. */
  allowance(request: QueryAllowanceRequest): Promise<QueryAllowanceResponse>;
  /** Allowances returns all the grants for address. */
  allowances(request: QueryAllowancesRequest): Promise<QueryAllowancesResponse>;
  /**
   * AllowancesByGranter returns all the grants given by an address
   * Since v0.46
   */
  allowancesByGranter(request: QueryAllowancesByGranterRequest): Promise<QueryAllowancesByGranterResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.allowance = this.allowance.bind(this);
    this.allowances = this.allowances.bind(this);
    this.allowancesByGranter = this.allowancesByGranter.bind(this);
  }
  allowance(request: QueryAllowanceRequest): Promise<QueryAllowanceResponse> {
    const data = QueryAllowanceRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.feegrant.v1beta1.Query", "Allowance", data);
    return promise.then(data => QueryAllowanceResponse.decode(new _m0.Reader(data)));
  }
  allowances(request: QueryAllowancesRequest): Promise<QueryAllowancesResponse> {
    const data = QueryAllowancesRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.feegrant.v1beta1.Query", "Allowances", data);
    return promise.then(data => QueryAllowancesResponse.decode(new _m0.Reader(data)));
  }
  allowancesByGranter(request: QueryAllowancesByGranterRequest): Promise<QueryAllowancesByGranterResponse> {
    const data = QueryAllowancesByGranterRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.feegrant.v1beta1.Query", "AllowancesByGranter", data);
    return promise.then(data => QueryAllowancesByGranterResponse.decode(new _m0.Reader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    allowance(request: QueryAllowanceRequest): Promise<QueryAllowanceResponse> {
      return queryService.allowance(request);
    },
    allowances(request: QueryAllowancesRequest): Promise<QueryAllowancesResponse> {
      return queryService.allowances(request);
    },
    allowancesByGranter(request: QueryAllowancesByGranterRequest): Promise<QueryAllowancesByGranterResponse> {
      return queryService.allowancesByGranter(request);
    }
  };
};
export interface UseAllowanceQuery<TData> extends ReactQueryParams<QueryAllowanceResponse, TData> {
  request: QueryAllowanceRequest;
}
export interface UseAllowancesQuery<TData> extends ReactQueryParams<QueryAllowancesResponse, TData> {
  request: QueryAllowancesRequest;
}
export interface UseAllowancesByGranterQuery<TData> extends ReactQueryParams<QueryAllowancesByGranterResponse, TData> {
  request: QueryAllowancesByGranterRequest;
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
  const useAllowance = <TData = QueryAllowanceResponse,>({
    request,
    options
  }: UseAllowanceQuery<TData>) => {
    return useQuery<QueryAllowanceResponse, Error, TData>(["allowanceQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.allowance(request);
    }, options);
  };
  const useAllowances = <TData = QueryAllowancesResponse,>({
    request,
    options
  }: UseAllowancesQuery<TData>) => {
    return useQuery<QueryAllowancesResponse, Error, TData>(["allowancesQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.allowances(request);
    }, options);
  };
  const useAllowancesByGranter = <TData = QueryAllowancesByGranterResponse,>({
    request,
    options
  }: UseAllowancesByGranterQuery<TData>) => {
    return useQuery<QueryAllowancesByGranterResponse, Error, TData>(["allowancesByGranterQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.allowancesByGranter(request);
    }, options);
  };
  return {
    /** Allowance returns fee granted to the grantee by the granter. */useAllowance,
    /** Allowances returns all the grants for address. */useAllowances,
    /**
     * AllowancesByGranter returns all the grants given by an address
     * Since v0.46
     */
    useAllowancesByGranter
  };
};