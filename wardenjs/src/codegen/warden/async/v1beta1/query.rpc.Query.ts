//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryParamsRequest, QueryParamsResponse, QueryTasksRequest, QueryTasksResponse, QueryTaskByIdRequest, QueryTaskByIdResponse, QueryPendingTasksRequest, QueryPendingTasksResponse, QueryPluginsByValidatorRequest, QueryPluginsByValidatorResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Tasks. */
  tasks(request: QueryTasksRequest): Promise<QueryTasksResponse>;
  /** Queries a Task by its id. */
  taskById(request: QueryTaskByIdRequest): Promise<QueryTaskByIdResponse>;
  /** Queries Tasks that do not have a result yet. */
  pendingTasks(request?: QueryPendingTasksRequest): Promise<QueryPendingTasksResponse>;
  /** Queries Plugins by validator. */
  pluginsByValidator(request: QueryPluginsByValidatorRequest): Promise<QueryPluginsByValidatorResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.params = this.params.bind(this);
    this.tasks = this.tasks.bind(this);
    this.taskById = this.taskById.bind(this);
    this.pendingTasks = this.pendingTasks.bind(this);
    this.pluginsByValidator = this.pluginsByValidator.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  tasks(request: QueryTasksRequest): Promise<QueryTasksResponse> {
    const data = QueryTasksRequest.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Query", "Tasks", data);
    return promise.then(data => QueryTasksResponse.decode(new BinaryReader(data)));
  }
  taskById(request: QueryTaskByIdRequest): Promise<QueryTaskByIdResponse> {
    const data = QueryTaskByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Query", "TaskById", data);
    return promise.then(data => QueryTaskByIdResponse.decode(new BinaryReader(data)));
  }
  pendingTasks(request: QueryPendingTasksRequest = {
    pagination: undefined
  }): Promise<QueryPendingTasksResponse> {
    const data = QueryPendingTasksRequest.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Query", "PendingTasks", data);
    return promise.then(data => QueryPendingTasksResponse.decode(new BinaryReader(data)));
  }
  pluginsByValidator(request: QueryPluginsByValidatorRequest): Promise<QueryPluginsByValidatorResponse> {
    const data = QueryPluginsByValidatorRequest.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Query", "PluginsByValidator", data);
    return promise.then(data => QueryPluginsByValidatorResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    },
    tasks(request: QueryTasksRequest): Promise<QueryTasksResponse> {
      return queryService.tasks(request);
    },
    taskById(request: QueryTaskByIdRequest): Promise<QueryTaskByIdResponse> {
      return queryService.taskById(request);
    },
    pendingTasks(request?: QueryPendingTasksRequest): Promise<QueryPendingTasksResponse> {
      return queryService.pendingTasks(request);
    },
    pluginsByValidator(request: QueryPluginsByValidatorRequest): Promise<QueryPluginsByValidatorResponse> {
      return queryService.pluginsByValidator(request);
    }
  };
};
export interface UseParamsQuery<TData> extends ReactQueryParams<QueryParamsResponse, TData> {
  request?: QueryParamsRequest;
}
export interface UseTasksQuery<TData> extends ReactQueryParams<QueryTasksResponse, TData> {
  request: QueryTasksRequest;
}
export interface UseTaskByIdQuery<TData> extends ReactQueryParams<QueryTaskByIdResponse, TData> {
  request: QueryTaskByIdRequest;
}
export interface UsePendingTasksQuery<TData> extends ReactQueryParams<QueryPendingTasksResponse, TData> {
  request?: QueryPendingTasksRequest;
}
export interface UsePluginsByValidatorQuery<TData> extends ReactQueryParams<QueryPluginsByValidatorResponse, TData> {
  request: QueryPluginsByValidatorRequest;
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
  const useTasks = <TData = QueryTasksResponse,>({
    request,
    options
  }: UseTasksQuery<TData>) => {
    return useQuery<QueryTasksResponse, Error, TData>(["tasksQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.tasks(request);
    }, options);
  };
  const useTaskById = <TData = QueryTaskByIdResponse,>({
    request,
    options
  }: UseTaskByIdQuery<TData>) => {
    return useQuery<QueryTaskByIdResponse, Error, TData>(["taskByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.taskById(request);
    }, options);
  };
  const usePendingTasks = <TData = QueryPendingTasksResponse,>({
    request,
    options
  }: UsePendingTasksQuery<TData>) => {
    return useQuery<QueryPendingTasksResponse, Error, TData>(["pendingTasksQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.pendingTasks(request);
    }, options);
  };
  const usePluginsByValidator = <TData = QueryPluginsByValidatorResponse,>({
    request,
    options
  }: UsePluginsByValidatorQuery<TData>) => {
    return useQuery<QueryPluginsByValidatorResponse, Error, TData>(["pluginsByValidatorQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.pluginsByValidator(request);
    }, options);
  };
  return {
    /** Parameters queries the parameters of the module. */useParams,
    /** Queries a list of Tasks. */useTasks,
    /** Queries a Task by its id. */useTaskById,
    /** Queries Tasks that do not have a result yet. */usePendingTasks,
    /** Queries Plugins by validator. */usePluginsByValidator
  };
};