//@ts-nocheck
import { setPaginationParams } from "../../../helpers.js";
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryFuturesRequest, QueryFuturesResponseSDKType, QueryFutureByIdRequest, QueryFutureByIdResponseSDKType, QueryPendingFuturesRequest, QueryPendingFuturesResponseSDKType, QueryHandlersByValidatorRequest, QueryHandlersByValidatorResponseSDKType } from "./query.js";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.params = this.params.bind(this);
    this.futures = this.futures.bind(this);
    this.futureById = this.futureById.bind(this);
    this.pendingFutures = this.pendingFutures.bind(this);
    this.handlersByValidator = this.handlersByValidator.bind(this);
  }
  /* Parameters queries the parameters of the module. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `warden/async/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
  /* Queries a list of Futures. */
  async futures(params: QueryFuturesRequest): Promise<QueryFuturesResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    if (typeof params?.creator !== "undefined") {
      options.params.creator = params.creator;
    }
    const endpoint = `warden/async/futures`;
    return await this.req.get<QueryFuturesResponseSDKType>(endpoint, options);
  }
  /* Queries a Future by its id. */
  async futureById(params: QueryFutureByIdRequest): Promise<QueryFutureByIdResponseSDKType> {
    const endpoint = `warden/async/future/${params.id}`;
    return await this.req.get<QueryFutureByIdResponseSDKType>(endpoint);
  }
  /* Queries Futures that do not have a result yet. */
  async pendingFutures(params: QueryPendingFuturesRequest = {
    pagination: undefined
  }): Promise<QueryPendingFuturesResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `warden/async/pending_futures`;
    return await this.req.get<QueryPendingFuturesResponseSDKType>(endpoint, options);
  }
  /* Queries Handlers by validator. */
  async handlersByValidator(params: QueryHandlersByValidatorRequest): Promise<QueryHandlersByValidatorResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `warden/async/handlers_by_validator/${params.validator}`;
    return await this.req.get<QueryHandlersByValidatorResponseSDKType>(endpoint, options);
  }
}