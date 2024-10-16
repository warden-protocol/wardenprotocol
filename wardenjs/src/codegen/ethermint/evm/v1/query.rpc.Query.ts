//@ts-nocheck
import { MsgEthereumTxResponse } from "./tx.js";
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryAccountRequest, QueryAccountResponse, QueryCosmosAccountRequest, QueryCosmosAccountResponse, QueryValidatorAccountRequest, QueryValidatorAccountResponse, QueryBalanceRequest, QueryBalanceResponse, QueryStorageRequest, QueryStorageResponse, QueryCodeRequest, QueryCodeResponse, QueryParamsRequest, QueryParamsResponse, EthCallRequest, EstimateGasResponse, QueryTraceTxRequest, QueryTraceTxResponse, QueryTraceBlockRequest, QueryTraceBlockResponse, QueryBaseFeeRequest, QueryBaseFeeResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Account queries an Ethereum account. */
  account(request: QueryAccountRequest): Promise<QueryAccountResponse>;
  /** CosmosAccount queries an Ethereum account's Cosmos Address. */
  cosmosAccount(request: QueryCosmosAccountRequest): Promise<QueryCosmosAccountResponse>;
  /**
   * ValidatorAccount queries an Ethereum account's from a validator consensus
   * Address.
   */
  validatorAccount(request: QueryValidatorAccountRequest): Promise<QueryValidatorAccountResponse>;
  /**
   * Balance queries the balance of a the EVM denomination for a single
   * EthAccount.
   */
  balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
  /** Storage queries the balance of all coins for a single account. */
  storage(request: QueryStorageRequest): Promise<QueryStorageResponse>;
  /** Code queries the balance of all coins for a single account. */
  code(request: QueryCodeRequest): Promise<QueryCodeResponse>;
  /** Params queries the parameters of x/evm module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** EthCall implements the `eth_call` rpc api */
  ethCall(request: EthCallRequest): Promise<MsgEthereumTxResponse>;
  /** EstimateGas implements the `eth_estimateGas` rpc api */
  estimateGas(request: EthCallRequest): Promise<EstimateGasResponse>;
  /** TraceTx implements the `debug_traceTransaction` rpc api */
  traceTx(request: QueryTraceTxRequest): Promise<QueryTraceTxResponse>;
  /** TraceBlock implements the `debug_traceBlockByNumber` and `debug_traceBlockByHash` rpc api */
  traceBlock(request: QueryTraceBlockRequest): Promise<QueryTraceBlockResponse>;
  /**
   * BaseFee queries the base fee of the parent block of the current block,
   * it's similar to feemarket module's method, but also checks london hardfork status.
   */
  baseFee(request?: QueryBaseFeeRequest): Promise<QueryBaseFeeResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.account = this.account.bind(this);
    this.cosmosAccount = this.cosmosAccount.bind(this);
    this.validatorAccount = this.validatorAccount.bind(this);
    this.balance = this.balance.bind(this);
    this.storage = this.storage.bind(this);
    this.code = this.code.bind(this);
    this.params = this.params.bind(this);
    this.ethCall = this.ethCall.bind(this);
    this.estimateGas = this.estimateGas.bind(this);
    this.traceTx = this.traceTx.bind(this);
    this.traceBlock = this.traceBlock.bind(this);
    this.baseFee = this.baseFee.bind(this);
  }
  account(request: QueryAccountRequest): Promise<QueryAccountResponse> {
    const data = QueryAccountRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "Account", data);
    return promise.then(data => QueryAccountResponse.decode(new BinaryReader(data)));
  }
  cosmosAccount(request: QueryCosmosAccountRequest): Promise<QueryCosmosAccountResponse> {
    const data = QueryCosmosAccountRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "CosmosAccount", data);
    return promise.then(data => QueryCosmosAccountResponse.decode(new BinaryReader(data)));
  }
  validatorAccount(request: QueryValidatorAccountRequest): Promise<QueryValidatorAccountResponse> {
    const data = QueryValidatorAccountRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "ValidatorAccount", data);
    return promise.then(data => QueryValidatorAccountResponse.decode(new BinaryReader(data)));
  }
  balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse> {
    const data = QueryBalanceRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "Balance", data);
    return promise.then(data => QueryBalanceResponse.decode(new BinaryReader(data)));
  }
  storage(request: QueryStorageRequest): Promise<QueryStorageResponse> {
    const data = QueryStorageRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "Storage", data);
    return promise.then(data => QueryStorageResponse.decode(new BinaryReader(data)));
  }
  code(request: QueryCodeRequest): Promise<QueryCodeResponse> {
    const data = QueryCodeRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "Code", data);
    return promise.then(data => QueryCodeResponse.decode(new BinaryReader(data)));
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  ethCall(request: EthCallRequest): Promise<MsgEthereumTxResponse> {
    const data = EthCallRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "EthCall", data);
    return promise.then(data => MsgEthereumTxResponse.decode(new BinaryReader(data)));
  }
  estimateGas(request: EthCallRequest): Promise<EstimateGasResponse> {
    const data = EthCallRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "EstimateGas", data);
    return promise.then(data => EstimateGasResponse.decode(new BinaryReader(data)));
  }
  traceTx(request: QueryTraceTxRequest): Promise<QueryTraceTxResponse> {
    const data = QueryTraceTxRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "TraceTx", data);
    return promise.then(data => QueryTraceTxResponse.decode(new BinaryReader(data)));
  }
  traceBlock(request: QueryTraceBlockRequest): Promise<QueryTraceBlockResponse> {
    const data = QueryTraceBlockRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "TraceBlock", data);
    return promise.then(data => QueryTraceBlockResponse.decode(new BinaryReader(data)));
  }
  baseFee(request: QueryBaseFeeRequest = {}): Promise<QueryBaseFeeResponse> {
    const data = QueryBaseFeeRequest.encode(request).finish();
    const promise = this.rpc.request("ethermint.evm.v1.Query", "BaseFee", data);
    return promise.then(data => QueryBaseFeeResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    account(request: QueryAccountRequest): Promise<QueryAccountResponse> {
      return queryService.account(request);
    },
    cosmosAccount(request: QueryCosmosAccountRequest): Promise<QueryCosmosAccountResponse> {
      return queryService.cosmosAccount(request);
    },
    validatorAccount(request: QueryValidatorAccountRequest): Promise<QueryValidatorAccountResponse> {
      return queryService.validatorAccount(request);
    },
    balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse> {
      return queryService.balance(request);
    },
    storage(request: QueryStorageRequest): Promise<QueryStorageResponse> {
      return queryService.storage(request);
    },
    code(request: QueryCodeRequest): Promise<QueryCodeResponse> {
      return queryService.code(request);
    },
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    ethCall(request: EthCallRequest): Promise<MsgEthereumTxResponse> {
      return queryService.ethCall(request);
    },
    estimateGas(request: EthCallRequest): Promise<EstimateGasResponse> {
      return queryService.estimateGas(request);
    },
    traceTx(request: QueryTraceTxRequest): Promise<QueryTraceTxResponse> {
      return queryService.traceTx(request);
    },
    traceBlock(request: QueryTraceBlockRequest): Promise<QueryTraceBlockResponse> {
      return queryService.traceBlock(request);
    },
    baseFee(request?: QueryBaseFeeRequest): Promise<QueryBaseFeeResponse> {
      return queryService.baseFee(request);
    }
  };
};
export interface UseAccountQuery<TData> extends ReactQueryParams<QueryAccountResponse, TData> {
  request: QueryAccountRequest;
}
export interface UseCosmosAccountQuery<TData> extends ReactQueryParams<QueryCosmosAccountResponse, TData> {
  request: QueryCosmosAccountRequest;
}
export interface UseValidatorAccountQuery<TData> extends ReactQueryParams<QueryValidatorAccountResponse, TData> {
  request: QueryValidatorAccountRequest;
}
export interface UseBalanceQuery<TData> extends ReactQueryParams<QueryBalanceResponse, TData> {
  request: QueryBalanceRequest;
}
export interface UseStorageQuery<TData> extends ReactQueryParams<QueryStorageResponse, TData> {
  request: QueryStorageRequest;
}
export interface UseCodeQuery<TData> extends ReactQueryParams<QueryCodeResponse, TData> {
  request: QueryCodeRequest;
}
export interface UseParamsQuery<TData> extends ReactQueryParams<QueryParamsResponse, TData> {
  request?: QueryParamsRequest;
}
export interface UseEthCallQuery<TData> extends ReactQueryParams<MsgEthereumTxResponse, TData> {
  request: EthCallRequest;
}
export interface UseEstimateGasQuery<TData> extends ReactQueryParams<EstimateGasResponse, TData> {
  request: EthCallRequest;
}
export interface UseTraceTxQuery<TData> extends ReactQueryParams<QueryTraceTxResponse, TData> {
  request: QueryTraceTxRequest;
}
export interface UseTraceBlockQuery<TData> extends ReactQueryParams<QueryTraceBlockResponse, TData> {
  request: QueryTraceBlockRequest;
}
export interface UseBaseFeeQuery<TData> extends ReactQueryParams<QueryBaseFeeResponse, TData> {
  request?: QueryBaseFeeRequest;
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
  const useAccount = <TData = QueryAccountResponse,>({
    request,
    options
  }: UseAccountQuery<TData>) => {
    return useQuery<QueryAccountResponse, Error, TData>(["accountQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.account(request);
    }, options);
  };
  const useCosmosAccount = <TData = QueryCosmosAccountResponse,>({
    request,
    options
  }: UseCosmosAccountQuery<TData>) => {
    return useQuery<QueryCosmosAccountResponse, Error, TData>(["cosmosAccountQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.cosmosAccount(request);
    }, options);
  };
  const useValidatorAccount = <TData = QueryValidatorAccountResponse,>({
    request,
    options
  }: UseValidatorAccountQuery<TData>) => {
    return useQuery<QueryValidatorAccountResponse, Error, TData>(["validatorAccountQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.validatorAccount(request);
    }, options);
  };
  const useBalance = <TData = QueryBalanceResponse,>({
    request,
    options
  }: UseBalanceQuery<TData>) => {
    return useQuery<QueryBalanceResponse, Error, TData>(["balanceQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.balance(request);
    }, options);
  };
  const useStorage = <TData = QueryStorageResponse,>({
    request,
    options
  }: UseStorageQuery<TData>) => {
    return useQuery<QueryStorageResponse, Error, TData>(["storageQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.storage(request);
    }, options);
  };
  const useCode = <TData = QueryCodeResponse,>({
    request,
    options
  }: UseCodeQuery<TData>) => {
    return useQuery<QueryCodeResponse, Error, TData>(["codeQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.code(request);
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
  const useEthCall = <TData = MsgEthereumTxResponse,>({
    request,
    options
  }: UseEthCallQuery<TData>) => {
    return useQuery<MsgEthereumTxResponse, Error, TData>(["ethCallQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.ethCall(request);
    }, options);
  };
  const useEstimateGas = <TData = EstimateGasResponse,>({
    request,
    options
  }: UseEstimateGasQuery<TData>) => {
    return useQuery<EstimateGasResponse, Error, TData>(["estimateGasQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.estimateGas(request);
    }, options);
  };
  const useTraceTx = <TData = QueryTraceTxResponse,>({
    request,
    options
  }: UseTraceTxQuery<TData>) => {
    return useQuery<QueryTraceTxResponse, Error, TData>(["traceTxQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.traceTx(request);
    }, options);
  };
  const useTraceBlock = <TData = QueryTraceBlockResponse,>({
    request,
    options
  }: UseTraceBlockQuery<TData>) => {
    return useQuery<QueryTraceBlockResponse, Error, TData>(["traceBlockQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.traceBlock(request);
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
  return {
    /** Account queries an Ethereum account. */useAccount,
    /** CosmosAccount queries an Ethereum account's Cosmos Address. */useCosmosAccount,
    /**
     * ValidatorAccount queries an Ethereum account's from a validator consensus
     * Address.
     */
    useValidatorAccount,
    /**
     * Balance queries the balance of a the EVM denomination for a single
     * EthAccount.
     */
    useBalance,
    /** Storage queries the balance of all coins for a single account. */useStorage,
    /** Code queries the balance of all coins for a single account. */useCode,
    /** Params queries the parameters of x/evm module. */useParams,
    /** EthCall implements the `eth_call` rpc api */useEthCall,
    /** EstimateGas implements the `eth_estimateGas` rpc api */useEstimateGas,
    /** TraceTx implements the `debug_traceTransaction` rpc api */useTraceTx,
    /** TraceBlock implements the `debug_traceBlockByNumber` and `debug_traceBlockByHash` rpc api */useTraceBlock,
    /**
     * BaseFee queries the base fee of the parent block of the current block,
     * it's similar to feemarket module's method, but also checks london hardfork status.
     */
    useBaseFee
  };
};