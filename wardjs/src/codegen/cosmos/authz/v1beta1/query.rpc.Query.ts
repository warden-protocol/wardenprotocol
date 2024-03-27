//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryGrantsRequest, QueryGrantsResponse, QueryGranterGrantsRequest, QueryGranterGrantsResponse, QueryGranteeGrantsRequest, QueryGranteeGrantsResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Returns list of `Authorization`, granted to the grantee by the granter. */
  grants(request: QueryGrantsRequest): Promise<QueryGrantsResponse>;
  /**
   * GranterGrants returns list of `GrantAuthorization`, granted by granter.
   * 
   * Since: cosmos-sdk 0.46
   */
  granterGrants(request: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponse>;
  /**
   * GranteeGrants returns a list of `GrantAuthorization` by grantee.
   * 
   * Since: cosmos-sdk 0.46
   */
  granteeGrants(request: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.grants = this.grants.bind(this);
    this.granterGrants = this.granterGrants.bind(this);
    this.granteeGrants = this.granteeGrants.bind(this);
  }
  grants(request: QueryGrantsRequest): Promise<QueryGrantsResponse> {
    const data = QueryGrantsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.authz.v1beta1.Query", "Grants", data);
    return promise.then(data => QueryGrantsResponse.decode(new BinaryReader(data)));
  }
  granterGrants(request: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponse> {
    const data = QueryGranterGrantsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.authz.v1beta1.Query", "GranterGrants", data);
    return promise.then(data => QueryGranterGrantsResponse.decode(new BinaryReader(data)));
  }
  granteeGrants(request: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponse> {
    const data = QueryGranteeGrantsRequest.encode(request).finish();
    const promise = this.rpc.request("cosmos.authz.v1beta1.Query", "GranteeGrants", data);
    return promise.then(data => QueryGranteeGrantsResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    grants(request: QueryGrantsRequest): Promise<QueryGrantsResponse> {
      return queryService.grants(request);
    },
    granterGrants(request: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponse> {
      return queryService.granterGrants(request);
    },
    granteeGrants(request: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponse> {
      return queryService.granteeGrants(request);
    }
  };
};
export interface UseGrantsQuery<TData> extends ReactQueryParams<QueryGrantsResponse, TData> {
  request: QueryGrantsRequest;
}
export interface UseGranterGrantsQuery<TData> extends ReactQueryParams<QueryGranterGrantsResponse, TData> {
  request: QueryGranterGrantsRequest;
}
export interface UseGranteeGrantsQuery<TData> extends ReactQueryParams<QueryGranteeGrantsResponse, TData> {
  request: QueryGranteeGrantsRequest;
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
  const useGrants = <TData = QueryGrantsResponse,>({
    request,
    options
  }: UseGrantsQuery<TData>) => {
    return useQuery<QueryGrantsResponse, Error, TData>(["grantsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.grants(request);
    }, options);
  };
  const useGranterGrants = <TData = QueryGranterGrantsResponse,>({
    request,
    options
  }: UseGranterGrantsQuery<TData>) => {
    return useQuery<QueryGranterGrantsResponse, Error, TData>(["granterGrantsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.granterGrants(request);
    }, options);
  };
  const useGranteeGrants = <TData = QueryGranteeGrantsResponse,>({
    request,
    options
  }: UseGranteeGrantsQuery<TData>) => {
    return useQuery<QueryGranteeGrantsResponse, Error, TData>(["granteeGrantsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.granteeGrants(request);
    }, options);
  };
  return {
    /** Returns list of `Authorization`, granted to the grantee by the granter. */useGrants,
    /**
     * GranterGrants returns list of `GrantAuthorization`, granted by granter.
     * 
     * Since: cosmos-sdk 0.46
     */
    useGranterGrants,
    /**
     * GranteeGrants returns a list of `GrantAuthorization` by grantee.
     * 
     * Since: cosmos-sdk 0.46
     */
    useGranteeGrants
  };
};