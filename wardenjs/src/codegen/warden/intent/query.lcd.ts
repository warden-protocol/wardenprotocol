//@ts-nocheck
import { setPaginationParams } from "../../helpers.js";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryActionsRequest, QueryActionsResponseSDKType, QueryIntentsRequest, QueryIntentsResponseSDKType, QueryIntentByIdRequest, QueryIntentByIdResponseSDKType, QueryActionsByAddressRequest, QueryActionsByAddressResponseSDKType, QueryActionByIdRequest, QueryActionByIdResponseSDKType } from "./query.js";
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
    this.intents = this.intents.bind(this);
    this.intentById = this.intentById.bind(this);
    this.actionsByAddress = this.actionsByAddress.bind(this);
    this.actionById = this.actionById.bind(this);
  }
  /* Parameters queries the parameters of the module. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `wardenprotocol/warden/intent/params`;
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
    const endpoint = `wardenprotocol/warden/intent/actions`;
    return await this.req.get<QueryActionsResponseSDKType>(endpoint, options);
  }
  /* Queries a list of Intents items. */
  async intents(params: QueryIntentsRequest = {
    pagination: undefined
  }): Promise<QueryIntentsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `wardenprotocol/warden/intent/intents`;
    return await this.req.get<QueryIntentsResponseSDKType>(endpoint, options);
  }
  /* Queries a list of IntentById items. */
  async intentById(params: QueryIntentByIdRequest): Promise<QueryIntentByIdResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.id !== "undefined") {
      options.params.id = params.id;
    }
    const endpoint = `wardenprotocol/warden/intent/intent_by_id`;
    return await this.req.get<QueryIntentByIdResponseSDKType>(endpoint, options);
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
    const endpoint = `wardenprotocol/warden/intent/actions_by_address`;
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
    const endpoint = `wardenprotocol/warden/intent/action_by_id`;
    return await this.req.get<QueryActionByIdResponseSDKType>(endpoint, options);
  }
}