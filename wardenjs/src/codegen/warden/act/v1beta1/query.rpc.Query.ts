//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryParamsRequest, QueryParamsResponse, QueryActionsRequest, QueryActionsResponse, QueryTemplatesRequest, QueryTemplatesResponse, QuerySimulateTemplateRequest, QuerySimulateTemplateResponse, QueryTemplateByIdRequest, QueryTemplateByIdResponse, QueryActionsByAddressRequest, QueryActionsByAddressResponse, QueryActionByIdRequest, QueryActionByIdResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Actions items. */
  actions(request?: QueryActionsRequest): Promise<QueryActionsResponse>;
  /** Queries a list of Templates items. */
  templates(request: QueryTemplatesRequest): Promise<QueryTemplatesResponse>;
  /** Queries to simulate a Template */
  simulateTemplate(request: QuerySimulateTemplateRequest): Promise<QuerySimulateTemplateResponse>;
  /** Queries a list of TemplateById items. */
  templateById(request: QueryTemplateByIdRequest): Promise<QueryTemplateByIdResponse>;
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
    this.templates = this.templates.bind(this);
    this.simulateTemplate = this.simulateTemplate.bind(this);
    this.templateById = this.templateById.bind(this);
    this.actionsByAddress = this.actionsByAddress.bind(this);
    this.actionById = this.actionById.bind(this);
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
  actions(request: QueryActionsRequest = {
    pagination: undefined
  }): Promise<QueryActionsResponse> {
    const data = QueryActionsRequest.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Query", "Actions", data);
    return promise.then(data => QueryActionsResponse.decode(new BinaryReader(data)));
  }
  templates(request: QueryTemplatesRequest): Promise<QueryTemplatesResponse> {
    const data = QueryTemplatesRequest.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Query", "Templates", data);
    return promise.then(data => QueryTemplatesResponse.decode(new BinaryReader(data)));
  }
  simulateTemplate(request: QuerySimulateTemplateRequest): Promise<QuerySimulateTemplateResponse> {
    const data = QuerySimulateTemplateRequest.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Query", "SimulateTemplate", data);
    return promise.then(data => QuerySimulateTemplateResponse.decode(new BinaryReader(data)));
  }
  templateById(request: QueryTemplateByIdRequest): Promise<QueryTemplateByIdResponse> {
    const data = QueryTemplateByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Query", "TemplateById", data);
    return promise.then(data => QueryTemplateByIdResponse.decode(new BinaryReader(data)));
  }
  actionsByAddress(request: QueryActionsByAddressRequest): Promise<QueryActionsByAddressResponse> {
    const data = QueryActionsByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Query", "ActionsByAddress", data);
    return promise.then(data => QueryActionsByAddressResponse.decode(new BinaryReader(data)));
  }
  actionById(request: QueryActionByIdRequest): Promise<QueryActionByIdResponse> {
    const data = QueryActionByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Query", "ActionById", data);
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
    templates(request: QueryTemplatesRequest): Promise<QueryTemplatesResponse> {
      return queryService.templates(request);
    },
    simulateTemplate(request: QuerySimulateTemplateRequest): Promise<QuerySimulateTemplateResponse> {
      return queryService.simulateTemplate(request);
    },
    templateById(request: QueryTemplateByIdRequest): Promise<QueryTemplateByIdResponse> {
      return queryService.templateById(request);
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
export interface UseTemplatesQuery<TData> extends ReactQueryParams<QueryTemplatesResponse, TData> {
  request: QueryTemplatesRequest;
}
export interface UseSimulateTemplateQuery<TData> extends ReactQueryParams<QuerySimulateTemplateResponse, TData> {
  request: QuerySimulateTemplateRequest;
}
export interface UseTemplateByIdQuery<TData> extends ReactQueryParams<QueryTemplateByIdResponse, TData> {
  request: QueryTemplateByIdRequest;
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
  const useTemplates = <TData = QueryTemplatesResponse,>({
    request,
    options
  }: UseTemplatesQuery<TData>) => {
    return useQuery<QueryTemplatesResponse, Error, TData>(["templatesQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.templates(request);
    }, options);
  };
  const useSimulateTemplate = <TData = QuerySimulateTemplateResponse,>({
    request,
    options
  }: UseSimulateTemplateQuery<TData>) => {
    return useQuery<QuerySimulateTemplateResponse, Error, TData>(["simulateTemplateQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.simulateTemplate(request);
    }, options);
  };
  const useTemplateById = <TData = QueryTemplateByIdResponse,>({
    request,
    options
  }: UseTemplateByIdQuery<TData>) => {
    return useQuery<QueryTemplateByIdResponse, Error, TData>(["templateByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.templateById(request);
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
    /** Queries a list of Templates items. */useTemplates,
    /** Queries to simulate a Template */useSimulateTemplate,
    /** Queries a list of TemplateById items. */useTemplateById,
    /** Queries a list of Actions items by one participant address. */useActionsByAddress,
    useActionById
  };
};