//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryParamsRequest, QueryParamsResponse, QueryBaseFeeRequest, QueryBaseFeeResponse, QueryBlockGasRequest, QueryBlockGasResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Params queries the parameters of x/feemarket module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** BaseFee queries the base fee of the parent block of the current block. */
  baseFee(request?: QueryBaseFeeRequest): Promise<QueryBaseFeeResponse>;
  /** BlockGas queries the gas used at a given block height */
  blockGas(request?: QueryBlockGasRequest): Promise<QueryBlockGasResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.baseFee = this.baseFee.bind(this);
    this.blockGas = this.blockGas.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.feemarket.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  baseFee(request: QueryBaseFeeRequest = {}): Promise<QueryBaseFeeResponse> {
    const data = QueryBaseFeeRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.feemarket.v1.Query", "BaseFee", data);
    return promise.then(data => QueryBaseFeeResponse.decode(new BinaryReader(data)));
  }
  blockGas(request: QueryBlockGasRequest = {}): Promise<QueryBlockGasResponse> {
    const data = QueryBlockGasRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.feemarket.v1.Query", "BlockGas", data);
    return promise.then(data => QueryBlockGasResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    baseFee(request?: QueryBaseFeeRequest): Promise<QueryBaseFeeResponse> {
      return queryService.baseFee(request);
    },
    blockGas(request?: QueryBlockGasRequest): Promise<QueryBlockGasResponse> {
      return queryService.blockGas(request);
    }
  };
};
export interface UseParamsQuery<TData> extends ReactQueryParams<QueryParamsResponse, TData> {
  request?: QueryParamsRequest;
}
export interface UseBaseFeeQuery<TData> extends ReactQueryParams<QueryBaseFeeResponse, TData> {
  request?: QueryBaseFeeRequest;
}
export interface UseBlockGasQuery<TData> extends ReactQueryParams<QueryBlockGasResponse, TData> {
  request?: QueryBlockGasRequest;
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
  const useBaseFee = <TData = QueryBaseFeeResponse,>({
    request,
    options
  }: UseBaseFeeQuery<TData>) => {
    return useQuery<QueryBaseFeeResponse, Error, TData>(["baseFeeQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.baseFee(request);
    }, options);
  };
  const useBlockGas = <TData = QueryBlockGasResponse,>({
    request,
    options
  }: UseBlockGasQuery<TData>) => {
    return useQuery<QueryBlockGasResponse, Error, TData>(["blockGasQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.blockGas(request);
    }, options);
  };
  return {
    /** Params queries the parameters of x/feemarket module. */useParams,
    /** BaseFee queries the base fee of the parent block of the current block. */useBaseFee,
    /** BlockGas queries the gas used at a given block height */useBlockGas
  };
};