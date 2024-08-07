//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { GetAllCurrencyPairsRequest, GetAllCurrencyPairsResponse, GetPriceRequest, GetPriceResponse, GetPricesRequest, GetPricesResponse, GetCurrencyPairMappingRequest, GetCurrencyPairMappingResponse } from "./query.js";
/** Query is the query service for the x/oracle module. */
export interface Query {
  /** Get all the currency pairs the x/oracle module is tracking price-data for. */
  getAllCurrencyPairs(request?: GetAllCurrencyPairsRequest): Promise<GetAllCurrencyPairsResponse>;
  /**
   * Given a CurrencyPair (or its identifier) return the latest QuotePrice for
   * that CurrencyPair.
   */
  getPrice(request: GetPriceRequest): Promise<GetPriceResponse>;
  getPrices(request: GetPricesRequest): Promise<GetPricesResponse>;
  /**
   * Get the mapping of currency pair ID -> currency pair. This is useful for
   * indexers that have access to the ID of a currency pair, but no way to get
   * the underlying currency pair from it.
   */
  getCurrencyPairMapping(request?: GetCurrencyPairMappingRequest): Promise<GetCurrencyPairMappingResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.getAllCurrencyPairs = this.getAllCurrencyPairs.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.getPrices = this.getPrices.bind(this);
    this.getCurrencyPairMapping = this.getCurrencyPairMapping.bind(this);
  }
  getAllCurrencyPairs(request: GetAllCurrencyPairsRequest = {}): Promise<GetAllCurrencyPairsResponse> {
    const data = GetAllCurrencyPairsRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Query", "GetAllCurrencyPairs", data);
    return promise.then(data => GetAllCurrencyPairsResponse.decode(new BinaryReader(data)));
  }
  getPrice(request: GetPriceRequest): Promise<GetPriceResponse> {
    const data = GetPriceRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Query", "GetPrice", data);
    return promise.then(data => GetPriceResponse.decode(new BinaryReader(data)));
  }
  getPrices(request: GetPricesRequest): Promise<GetPricesResponse> {
    const data = GetPricesRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Query", "GetPrices", data);
    return promise.then(data => GetPricesResponse.decode(new BinaryReader(data)));
  }
  getCurrencyPairMapping(request: GetCurrencyPairMappingRequest = {}): Promise<GetCurrencyPairMappingResponse> {
    const data = GetCurrencyPairMappingRequest.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Query", "GetCurrencyPairMapping", data);
    return promise.then(data => GetCurrencyPairMappingResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    getAllCurrencyPairs(request?: GetAllCurrencyPairsRequest): Promise<GetAllCurrencyPairsResponse> {
      return queryService.getAllCurrencyPairs(request);
    },
    getPrice(request: GetPriceRequest): Promise<GetPriceResponse> {
      return queryService.getPrice(request);
    },
    getPrices(request: GetPricesRequest): Promise<GetPricesResponse> {
      return queryService.getPrices(request);
    },
    getCurrencyPairMapping(request?: GetCurrencyPairMappingRequest): Promise<GetCurrencyPairMappingResponse> {
      return queryService.getCurrencyPairMapping(request);
    }
  };
};
export interface UseGetAllCurrencyPairsQuery<TData> extends ReactQueryParams<GetAllCurrencyPairsResponse, TData> {
  request?: GetAllCurrencyPairsRequest;
}
export interface UseGetPriceQuery<TData> extends ReactQueryParams<GetPriceResponse, TData> {
  request: GetPriceRequest;
}
export interface UseGetPricesQuery<TData> extends ReactQueryParams<GetPricesResponse, TData> {
  request: GetPricesRequest;
}
export interface UseGetCurrencyPairMappingQuery<TData> extends ReactQueryParams<GetCurrencyPairMappingResponse, TData> {
  request?: GetCurrencyPairMappingRequest;
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
  const useGetAllCurrencyPairs = <TData = GetAllCurrencyPairsResponse,>({
    request,
    options
  }: UseGetAllCurrencyPairsQuery<TData>) => {
    return useQuery<GetAllCurrencyPairsResponse, Error, TData>(["getAllCurrencyPairsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.getAllCurrencyPairs(request);
    }, options);
  };
  const useGetPrice = <TData = GetPriceResponse,>({
    request,
    options
  }: UseGetPriceQuery<TData>) => {
    return useQuery<GetPriceResponse, Error, TData>(["getPriceQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.getPrice(request);
    }, options);
  };
  const useGetPrices = <TData = GetPricesResponse,>({
    request,
    options
  }: UseGetPricesQuery<TData>) => {
    return useQuery<GetPricesResponse, Error, TData>(["getPricesQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.getPrices(request);
    }, options);
  };
  const useGetCurrencyPairMapping = <TData = GetCurrencyPairMappingResponse,>({
    request,
    options
  }: UseGetCurrencyPairMappingQuery<TData>) => {
    return useQuery<GetCurrencyPairMappingResponse, Error, TData>(["getCurrencyPairMappingQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.getCurrencyPairMapping(request);
    }, options);
  };
  return {
    /** Get all the currency pairs the x/oracle module is tracking price-data for. */useGetAllCurrencyPairs,
    /**
     * Given a CurrencyPair (or its identifier) return the latest QuotePrice for
     * that CurrencyPair.
     */
    useGetPrice,
    useGetPrices,
    /**
     * Get the mapping of currency pair ID -> currency pair. This is useful for
     * indexers that have access to the ID of a currency pair, but no way to get
     * the underlying currency pair from it.
     */
    useGetCurrencyPairMapping
  };
};