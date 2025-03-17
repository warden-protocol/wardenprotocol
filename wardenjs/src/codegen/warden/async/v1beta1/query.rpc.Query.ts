//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryParamsRequest, QueryParamsResponse, QueryFuturesRequest, QueryFuturesResponse, QueryFutureByIdRequest, QueryFutureByIdResponse, QueryPendingFuturesRequest, QueryPendingFuturesResponse, QueryHandlersByValidatorRequest, QueryHandlersByValidatorResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Futures. */
  futures(request: QueryFuturesRequest): Promise<QueryFuturesResponse>;
  /** Queries a Future by its id. */
  futureById(request: QueryFutureByIdRequest): Promise<QueryFutureByIdResponse>;
  /** Queries Futures that do not have a result yet. */
  pendingFutures(request?: QueryPendingFuturesRequest): Promise<QueryPendingFuturesResponse>;
  /** Queries Handlers by validator. */
  handlersByValidator(request: QueryHandlersByValidatorRequest): Promise<QueryHandlersByValidatorResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.futures = this.futures.bind(this);
    this.futureById = this.futureById.bind(this);
    this.pendingFutures = this.pendingFutures.bind(this);
    this.handlersByValidator = this.handlersByValidator.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  futures(request: QueryFuturesRequest): Promise<QueryFuturesResponse> {
    const data = QueryFuturesRequest.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Query", "Futures", data);
    return promise.then(data => QueryFuturesResponse.decode(new BinaryReader(data)));
  }
  futureById(request: QueryFutureByIdRequest): Promise<QueryFutureByIdResponse> {
    const data = QueryFutureByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Query", "FutureById", data);
    return promise.then(data => QueryFutureByIdResponse.decode(new BinaryReader(data)));
  }
  pendingFutures(request: QueryPendingFuturesRequest = {
    pagination: undefined
  }): Promise<QueryPendingFuturesResponse> {
    const data = QueryPendingFuturesRequest.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Query", "PendingFutures", data);
    return promise.then(data => QueryPendingFuturesResponse.decode(new BinaryReader(data)));
  }
  handlersByValidator(request: QueryHandlersByValidatorRequest): Promise<QueryHandlersByValidatorResponse> {
    const data = QueryHandlersByValidatorRequest.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Query", "HandlersByValidator", data);
    return promise.then(data => QueryHandlersByValidatorResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    futures(request: QueryFuturesRequest): Promise<QueryFuturesResponse> {
      return queryService.futures(request);
    },
    futureById(request: QueryFutureByIdRequest): Promise<QueryFutureByIdResponse> {
      return queryService.futureById(request);
    },
    pendingFutures(request?: QueryPendingFuturesRequest): Promise<QueryPendingFuturesResponse> {
      return queryService.pendingFutures(request);
    },
    handlersByValidator(request: QueryHandlersByValidatorRequest): Promise<QueryHandlersByValidatorResponse> {
      return queryService.handlersByValidator(request);
    }
  };
};
export interface UseParamsQuery<TData> extends ReactQueryParams<QueryParamsResponse, TData> {
  request?: QueryParamsRequest;
}
export interface UseFuturesQuery<TData> extends ReactQueryParams<QueryFuturesResponse, TData> {
  request: QueryFuturesRequest;
}
export interface UseFutureByIdQuery<TData> extends ReactQueryParams<QueryFutureByIdResponse, TData> {
  request: QueryFutureByIdRequest;
}
export interface UsePendingFuturesQuery<TData> extends ReactQueryParams<QueryPendingFuturesResponse, TData> {
  request?: QueryPendingFuturesRequest;
}
export interface UseHandlersByValidatorQuery<TData> extends ReactQueryParams<QueryHandlersByValidatorResponse, TData> {
  request: QueryHandlersByValidatorRequest;
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
  const useParams = <TData = QueryParamsResponse,>({
    request,
    options
  }: UseParamsQuery<TData>) => {
    return useQuery<QueryParamsResponse, Error, TData>(["paramsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.params(request);
    }, options);
  };
  const useFutures = <TData = QueryFuturesResponse,>({
    request,
    options
  }: UseFuturesQuery<TData>) => {
    return useQuery<QueryFuturesResponse, Error, TData>(["futuresQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.futures(request);
    }, options);
  };
  const useFutureById = <TData = QueryFutureByIdResponse,>({
    request,
    options
  }: UseFutureByIdQuery<TData>) => {
    return useQuery<QueryFutureByIdResponse, Error, TData>(["futureByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.futureById(request);
    }, options);
  };
  const usePendingFutures = <TData = QueryPendingFuturesResponse,>({
    request,
    options
  }: UsePendingFuturesQuery<TData>) => {
    return useQuery<QueryPendingFuturesResponse, Error, TData>(["pendingFuturesQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.pendingFutures(request);
    }, options);
  };
  const useHandlersByValidator = <TData = QueryHandlersByValidatorResponse,>({
    request,
    options
  }: UseHandlersByValidatorQuery<TData>) => {
    return useQuery<QueryHandlersByValidatorResponse, Error, TData>(["handlersByValidatorQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.handlersByValidator(request);
    }, options);
  };
  return {
    /** Parameters queries the parameters of the module. */useParams,
    /** Queries a list of Futures. */useFutures,
    /** Queries a Future by its id. */useFutureById,
    /** Queries Futures that do not have a result yet. */usePendingFutures,
    /** Queries Handlers by validator. */useHandlersByValidator
  };
};