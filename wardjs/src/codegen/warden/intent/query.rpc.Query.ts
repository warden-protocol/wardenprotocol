//@ts-nocheck
import { Rpc } from "../../helpers.js";
import { BinaryReader } from "../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryParamsRequest, QueryParamsResponse, QueryActionsRequest, QueryActionsResponse, QueryIntentsRequest, QueryIntentsResponse, QueryIntentByIdRequest, QueryIntentByIdResponse, QueryActionsByAddressRequest, QueryActionsByAddressResponse, QueryActionByIdRequest, QueryActionByIdResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Actions items. */
  actions(request?: QueryActionsRequest): Promise<QueryActionsResponse>;
  /** Queries a list of Intents items. */
  intents(request?: QueryIntentsRequest): Promise<QueryIntentsResponse>;
  /** Queries a list of IntentById items. */
  intentById(request: QueryIntentByIdRequest): Promise<QueryIntentByIdResponse>;
  /** Queries a list of Actions items by one participant address. */
  actionsByAddress(request: QueryActionsByAddressRequest): Promise<QueryActionsByAddressResponse>;
  actionById(request: QueryActionByIdRequest): Promise<QueryActionByIdResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.actions = this.actions.bind(this);
    this.intents = this.intents.bind(this);
    this.intentById = this.intentById.bind(this);
    this.actionsByAddress = this.actionsByAddress.bind(this);
    this.actionById = this.actionById.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  actions(request: QueryActionsRequest = {
    pagination: undefined
  }): Promise<QueryActionsResponse> {
    const data = QueryActionsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Query", "Actions", data);
    return promise.then(data => QueryActionsResponse.decode(new BinaryReader(data)));
  }
  intents(request: QueryIntentsRequest = {
    pagination: undefined
  }): Promise<QueryIntentsResponse> {
    const data = QueryIntentsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Query", "Intents", data);
    return promise.then(data => QueryIntentsResponse.decode(new BinaryReader(data)));
  }
  intentById(request: QueryIntentByIdRequest): Promise<QueryIntentByIdResponse> {
    const data = QueryIntentByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Query", "IntentById", data);
    return promise.then(data => QueryIntentByIdResponse.decode(new BinaryReader(data)));
  }
  actionsByAddress(request: QueryActionsByAddressRequest): Promise<QueryActionsByAddressResponse> {
    const data = QueryActionsByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Query", "ActionsByAddress", data);
    return promise.then(data => QueryActionsByAddressResponse.decode(new BinaryReader(data)));
  }
  actionById(request: QueryActionByIdRequest): Promise<QueryActionByIdResponse> {
    const data = QueryActionByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Query", "ActionById", data);
    return promise.then(data => QueryActionByIdResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    actions(request?: QueryActionsRequest): Promise<QueryActionsResponse> {
      return queryService.actions(request);
    },
    intents(request?: QueryIntentsRequest): Promise<QueryIntentsResponse> {
      return queryService.intents(request);
    },
    intentById(request: QueryIntentByIdRequest): Promise<QueryIntentByIdResponse> {
      return queryService.intentById(request);
    },
    actionsByAddress(request: QueryActionsByAddressRequest): Promise<QueryActionsByAddressResponse> {
      return queryService.actionsByAddress(request);
    },
    actionById(request: QueryActionByIdRequest): Promise<QueryActionByIdResponse> {
      return queryService.actionById(request);
    }
  };
};
export interface UseParamsQuery<TData> extends ReactQueryParams<QueryParamsResponse, TData> {
  request?: QueryParamsRequest;
}
export interface UseActionsQuery<TData> extends ReactQueryParams<QueryActionsResponse, TData> {
  request?: QueryActionsRequest;
}
export interface UseIntentsQuery<TData> extends ReactQueryParams<QueryIntentsResponse, TData> {
  request?: QueryIntentsRequest;
}
export interface UseIntentByIdQuery<TData> extends ReactQueryParams<QueryIntentByIdResponse, TData> {
  request: QueryIntentByIdRequest;
}
export interface UseActionsByAddressQuery<TData> extends ReactQueryParams<QueryActionsByAddressResponse, TData> {
  request: QueryActionsByAddressRequest;
}
export interface UseActionByIdQuery<TData> extends ReactQueryParams<QueryActionByIdResponse, TData> {
  request: QueryActionByIdRequest;
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
  const useActions = <TData = QueryActionsResponse,>({
    request,
    options
  }: UseActionsQuery<TData>) => {
    return useQuery<QueryActionsResponse, Error, TData>(["actionsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.actions(request);
    }, options);
  };
  const useIntents = <TData = QueryIntentsResponse,>({
    request,
    options
  }: UseIntentsQuery<TData>) => {
    return useQuery<QueryIntentsResponse, Error, TData>(["intentsQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.intents(request);
    }, options);
  };
  const useIntentById = <TData = QueryIntentByIdResponse,>({
    request,
    options
  }: UseIntentByIdQuery<TData>) => {
    return useQuery<QueryIntentByIdResponse, Error, TData>(["intentByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.intentById(request);
    }, options);
  };
  const useActionsByAddress = <TData = QueryActionsByAddressResponse,>({
    request,
    options
  }: UseActionsByAddressQuery<TData>) => {
    return useQuery<QueryActionsByAddressResponse, Error, TData>(["actionsByAddressQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.actionsByAddress(request);
    }, options);
  };
  const useActionById = <TData = QueryActionByIdResponse,>({
    request,
    options
  }: UseActionByIdQuery<TData>) => {
    return useQuery<QueryActionByIdResponse, Error, TData>(["actionByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.actionById(request);
    }, options);
  };
  return {
    /** Parameters queries the parameters of the module. */useParams,
    /** Queries a list of Actions items. */useActions,
    /** Queries a list of Intents items. */useIntents,
    /** Queries a list of IntentById items. */useIntentById,
    /** Queries a list of Actions items by one participant address. */useActionsByAddress,
    useActionById
  };
};