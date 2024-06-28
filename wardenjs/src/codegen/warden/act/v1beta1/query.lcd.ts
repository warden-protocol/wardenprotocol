//@ts-nocheck
import { setPaginationParams } from "../../../helpers.js";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryActionsRequest, QueryActionsResponseSDKType, QueryRulesRequest, QueryRulesResponseSDKType, QuerySimulateRuleRequest, QuerySimulateRuleResponseSDKType, QueryRuleByIdRequest, QueryRuleByIdResponseSDKType, QueryActionsByAddressRequest, QueryActionsByAddressResponseSDKType, QueryActionByIdRequest, QueryActionByIdResponseSDKType } from "./query.js";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.params = this.params.bind(this);
    this.actions = this.actions.bind(this);
    this.rules = this.rules.bind(this);
    this.simulateRule = this.simulateRule.bind(this);
    this.ruleById = this.ruleById.bind(this);
    this.actionsByAddress = this.actionsByAddress.bind(this);
    this.actionById = this.actionById.bind(this);
  }
  /* Parameters queries the parameters of the module. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `wardenprotocol/warden/act/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
  /* Queries a list of Actions items. */
  async actions(params: QueryActionsRequest = {
    pagination: undefined
  }): Promise<QueryActionsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `wardenprotocol/warden/act/actions`;
    return await this.req.get<QueryActionsResponseSDKType>(endpoint, options);
  }
  /* Queries a list of Rules items. */
  async rules(params: QueryRulesRequest = {
    pagination: undefined
  }): Promise<QueryRulesResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `wardenprotocol/warden/act/rules`;
    return await this.req.get<QueryRulesResponseSDKType>(endpoint, options);
  }
  /* Queries to simulate a Rule */
  async simulateRule(params: QuerySimulateRuleRequest): Promise<QuerySimulateRuleResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.definition !== "undefined") {
      options.params.definition = params.definition;
    }
    const endpoint = `wardenprotocol/warden/act/simulate`;
    return await this.req.get<QuerySimulateRuleResponseSDKType>(endpoint, options);
  }
  /* Queries a list of RuleById items. */
  async ruleById(params: QueryRuleByIdRequest): Promise<QueryRuleByIdResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.id !== "undefined") {
      options.params.id = params.id;
    }
    const endpoint = `wardenprotocol/warden/act/rule_by_id`;
    return await this.req.get<QueryRuleByIdResponseSDKType>(endpoint, options);
  }
  /* Queries a list of Actions items by one participant address. */
  async actionsByAddress(params: QueryActionsByAddressRequest): Promise<QueryActionsByAddressResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.address !== "undefined") {
      options.params.address = params.address;
    }
    if (typeof params?.status !== "undefined") {
      options.params.status = params.status;
    }
    const endpoint = `wardenprotocol/warden/act/actions_by_address`;
    return await this.req.get<QueryActionsByAddressResponseSDKType>(endpoint, options);
  }
  /* ActionById */
  async actionById(params: QueryActionByIdRequest): Promise<QueryActionByIdResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.id !== "undefined") {
      options.params.id = params.id;
    }
    const endpoint = `wardenprotocol/warden/act/action_by_id`;
    return await this.req.get<QueryActionByIdResponseSDKType>(endpoint, options);
  }
}