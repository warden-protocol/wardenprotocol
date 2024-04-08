//@ts-nocheck
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QuerySubspacesRequest, QuerySubspacesResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.params = this.params.bind(this);
    this.subspaces = this.subspaces.bind(this);
  }
  /* Params queries a specific parameter of a module, given its subspace and
   key. */
  async params(params: QueryParamsRequest): Promise<QueryParamsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.subspace !== "undefined") {
      options.params.subspace = params.subspace;
    }
    if (typeof params?.key !== "undefined") {
      options.params.key = params.key;
    }
    const endpoint = `cosmos/params/v1beta1/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint, options);
  }
  /* Subspaces queries for all registered subspaces and all keys for a subspace. */
  async subspaces(_params: QuerySubspacesRequest = {}): Promise<QuerySubspacesResponseSDKType> {
    const endpoint = `cosmos/params/v1beta1/subspaces`;
    return await this.req.get<QuerySubspacesResponseSDKType>(endpoint);
  }
}