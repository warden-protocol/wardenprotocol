//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { QueryClient, createProtobufRpcClient, ProtobufRpcClient } from "@cosmjs/stargate";
import { ReactQueryParams } from "../../../react-query.js";
import { useQuery } from "@tanstack/react-query";
import { QueryParamsRequest, QueryParamsResponse, QueryActionsRequest, QueryActionsResponse, QueryRulesRequest, QueryRulesResponse, QuerySimulateRuleRequest, QuerySimulateRuleResponse, QueryRuleByIdRequest, QueryRuleByIdResponse, QueryActionsByAddressRequest, QueryActionsByAddressResponse, QueryActionByIdRequest, QueryActionByIdResponse } from "./query.js";
/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Actions items. */
  actions(request?: QueryActionsRequest): Promise<QueryActionsResponse>;
  /** Queries a list of Rules items. */
  rules(request?: QueryRulesRequest): Promise<QueryRulesResponse>;
  /** Queries to simulate a Rule */
  simulateRule(request: QuerySimulateRuleRequest): Promise<QuerySimulateRuleResponse>;
  /** Queries a list of RuleById items. */
  ruleById(request: QueryRuleByIdRequest): Promise<QueryRuleByIdResponse>;
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
    this.rules = this.rules.bind(this);
    this.simulateRule = this.simulateRule.bind(this);
    this.ruleById = this.ruleById.bind(this);
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
  rules(request: QueryRulesRequest = {
    pagination: undefined
  }): Promise<QueryRulesResponse> {
    const data = QueryRulesRequest.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Query", "Rules", data);
    return promise.then(data => QueryRulesResponse.decode(new BinaryReader(data)));
  }
  simulateRule(request: QuerySimulateRuleRequest): Promise<QuerySimulateRuleResponse> {
    const data = QuerySimulateRuleRequest.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Query", "SimulateRule", data);
    return promise.then(data => QuerySimulateRuleResponse.decode(new BinaryReader(data)));
  }
  ruleById(request: QueryRuleByIdRequest): Promise<QueryRuleByIdResponse> {
    const data = QueryRuleByIdRequest.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Query", "RuleById", data);
    return promise.then(data => QueryRuleByIdResponse.decode(new BinaryReader(data)));
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
    rules(request?: QueryRulesRequest): Promise<QueryRulesResponse> {
      return queryService.rules(request);
    },
    simulateRule(request: QuerySimulateRuleRequest): Promise<QuerySimulateRuleResponse> {
      return queryService.simulateRule(request);
    },
    ruleById(request: QueryRuleByIdRequest): Promise<QueryRuleByIdResponse> {
      return queryService.ruleById(request);
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
export interface UseRulesQuery<TData> extends ReactQueryParams<QueryRulesResponse, TData> {
  request?: QueryRulesRequest;
}
export interface UseSimulateRuleQuery<TData> extends ReactQueryParams<QuerySimulateRuleResponse, TData> {
  request: QuerySimulateRuleRequest;
}
export interface UseRuleByIdQuery<TData> extends ReactQueryParams<QueryRuleByIdResponse, TData> {
  request: QueryRuleByIdRequest;
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
  const useRules = <TData = QueryRulesResponse,>({
    request,
    options
  }: UseRulesQuery<TData>) => {
    return useQuery<QueryRulesResponse, Error, TData>(["rulesQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.rules(request);
    }, options);
  };
  const useSimulateRule = <TData = QuerySimulateRuleResponse,>({
    request,
    options
  }: UseSimulateRuleQuery<TData>) => {
    return useQuery<QuerySimulateRuleResponse, Error, TData>(["simulateRuleQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.simulateRule(request);
    }, options);
  };
  const useRuleById = <TData = QueryRuleByIdResponse,>({
    request,
    options
  }: UseRuleByIdQuery<TData>) => {
    return useQuery<QueryRuleByIdResponse, Error, TData>(["ruleByIdQuery", request], () => {
      if (!queryService) throw new Error("Query Service not initialized");
      return queryService.ruleById(request);
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
    /** Queries a list of Rules items. */useRules,
    /** Queries to simulate a Rule */useSimulateRule,
    /** Queries a list of RuleById items. */useRuleById,
    /** Queries a list of Actions items by one participant address. */useActionsByAddress,
    useActionById
  };
};