//@ts-nocheck
import { setPaginationParams } from "../../../helpers.js";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryActionsRequest, QueryActionsResponseSDKType, QueryTemplatesRequest, QueryTemplatesResponseSDKType, QuerySimulateTemplateRequest, QuerySimulateTemplateResponseSDKType, QueryTemplateByIdRequest, QueryTemplateByIdResponseSDKType, QueryActionsByAddressRequest, QueryActionsByAddressResponseSDKType, QueryActionByIdRequest, QueryActionByIdResponseSDKType } from "./query.js";
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
    this.templates = this.templates.bind(this);
    this.simulateTemplate = this.simulateTemplate.bind(this);
    this.templateById = this.templateById.bind(this);
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
  /* Queries a list of Templates items. */
  async templates(params: QueryTemplatesRequest): Promise<QueryTemplatesResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.creator !== "undefined") {
      options.params.creator = params.creator;
    }
    const endpoint = `wardenprotocol/warden/act/templates`;
    return await this.req.get<QueryTemplatesResponseSDKType>(endpoint, options);
  }
  /* Queries to simulate a Template */
  async simulateTemplate(params: QuerySimulateTemplateRequest): Promise<QuerySimulateTemplateResponseSDKType> {
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
    return await this.req.get<QuerySimulateTemplateResponseSDKType>(endpoint, options);
  }
  /* Queries a list of TemplateById items. */
  async templateById(params: QueryTemplateByIdRequest): Promise<QueryTemplateByIdResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.id !== "undefined") {
      options.params.id = params.id;
    }
    const endpoint = `wardenprotocol/warden/act/template_by_id`;
    return await this.req.get<QueryTemplateByIdResponseSDKType>(endpoint, options);
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