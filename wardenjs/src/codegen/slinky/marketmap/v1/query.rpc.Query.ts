//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { MarketMapRequest, MarketMapResponse, MarketRequest, MarketResponse, LastUpdatedRequest, LastUpdatedResponse, ParamsRequest, ParamsResponse } from "./query.js";
/** Query is the query service for the x/marketmap module. */
export interface Query {
  /**
   * MarketMap returns the full market map stored in the x/marketmap
   * module.
   */
  marketMap(request?: MarketMapRequest): Promise<MarketMapResponse>;
  /**
   * Market returns a market stored in the x/marketmap
   * module.
   */
  market(request: MarketRequest): Promise<MarketResponse>;
  /** LastUpdated returns the last height the market map was updated at. */
  lastUpdated(request?: LastUpdatedRequest): Promise<LastUpdatedResponse>;
  /** Params returns the current x/marketmap module parameters. */
  params(request?: ParamsRequest): Promise<ParamsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.marketMap = this.marketMap.bind(this);
    this.market = this.market.bind(this);
    this.lastUpdated = this.lastUpdated.bind(this);
    this.params = this.params.bind(this);
  }
  marketMap(request: MarketMapRequest = {}): Promise<MarketMapResponse> {
    const data = MarketMapRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.marketmap.v1.Query", "MarketMap", data);
    return promise.then(data => MarketMapResponse.decode(new BinaryReader(data)));
  }
  market(request: MarketRequest): Promise<MarketResponse> {
    const data = MarketRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.marketmap.v1.Query", "Market", data);
    return promise.then(data => MarketResponse.decode(new BinaryReader(data)));
  }
  lastUpdated(request: LastUpdatedRequest = {}): Promise<LastUpdatedResponse> {
    const data = LastUpdatedRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.marketmap.v1.Query", "LastUpdated", data);
    return promise.then(data => LastUpdatedResponse.decode(new BinaryReader(data)));
  }
  params(request: ParamsRequest = {}): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.marketmap.v1.Query", "Params", data);
    return promise.then(data => ParamsResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    marketMap(request?: MarketMapRequest): Promise<MarketMapResponse> {
      return queryService.marketMap(request);
    },
    market(request: MarketRequest): Promise<MarketResponse> {
      return queryService.market(request);
    },
    lastUpdated(request?: LastUpdatedRequest): Promise<LastUpdatedResponse> {
      return queryService.lastUpdated(request);
    },
    params(request?: ParamsRequest): Promise<ParamsResponse> {
      return queryService.params(request);
    }
  };
};
export interface UseMarketMapQuery<TData> extends ReactQueryParams<MarketMapResponse, TData> {
  request?: MarketMapRequest;
}
export interface UseMarketQuery<TData> extends ReactQueryParams<MarketResponse, TData> {
  request: MarketRequest;
}
export interface UseLastUpdatedQuery<TData> extends ReactQueryParams<LastUpdatedResponse, TData> {
  request?: LastUpdatedRequest;
}
export interface UseParamsQuery<TData> extends ReactQueryParams<ParamsResponse, TData> {
  request?: ParamsRequest;
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
  const useMarketMap = <TData = MarketMapResponse,>({
    request,
    options
  }: UseMarketMapQuery<TData>) => {
    return useQuery<MarketMapResponse, Error, TData>(["marketMapQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.marketMap(request);
    }, options);
  };
  const useMarket = <TData = MarketResponse,>({
    request,
    options
  }: UseMarketQuery<TData>) => {
    return useQuery<MarketResponse, Error, TData>(["marketQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.market(request);
    }, options);
  };
  const useLastUpdated = <TData = LastUpdatedResponse,>({
    request,
    options
  }: UseLastUpdatedQuery<TData>) => {
    return useQuery<LastUpdatedResponse, Error, TData>(["lastUpdatedQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.lastUpdated(request);
    }, options);
  };
  const useParams = <TData = ParamsResponse,>({
    request,
    options
  }: UseParamsQuery<TData>) => {
    return useQuery<ParamsResponse, Error, TData>(["paramsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.params(request);
    }, options);
  };
  return {
    /**
     * MarketMap returns the full market map stored in the x/marketmap
     * module.
     */
    useMarketMap,
    /**
     * Market returns a market stored in the x/marketmap
     * module.
     */
    useMarket,
    /** LastUpdated returns the last height the market map was updated at. */useLastUpdated,
    /** Params returns the current x/marketmap module parameters. */useParams
  };
};