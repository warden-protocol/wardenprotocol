//@ts-nocheck
import { setPaginationParams } from "../../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QueryGrantsRequest, QueryGrantsResponseSDKType, QueryGranterGrantsRequest, QueryGranterGrantsResponseSDKType, QueryGranteeGrantsRequest, QueryGranteeGrantsResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.grants = this.grants.bind(this);
    this.granterGrants = this.granterGrants.bind(this);
    this.granteeGrants = this.granteeGrants.bind(this);
  }
  /* Returns list of `Authorization`, granted to the grantee by the granter. */
  async grants(params: QueryGrantsRequest): Promise<QueryGrantsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.granter !== "undefined") {
      options.params.granter = params.granter;
    }
    if (typeof params?.grantee !== "undefined") {
      options.params.grantee = params.grantee;
    }
    if (typeof params?.msgTypeUrl !== "undefined") {
      options.params.msg_type_url = params.msgTypeUrl;
    }
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `cosmos/authz/v1beta1/grants`;
    return await this.req.get<QueryGrantsResponseSDKType>(endpoint, options);
  }
  /* GranterGrants returns list of `GrantAuthorization`, granted by granter.
  
   Since: cosmos-sdk 0.46 */
  async granterGrants(params: QueryGranterGrantsRequest): Promise<QueryGranterGrantsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `cosmos/authz/v1beta1/grants/granter/${params.granter}`;
    return await this.req.get<QueryGranterGrantsResponseSDKType>(endpoint, options);
  }
  /* GranteeGrants returns a list of `GrantAuthorization` by grantee.
  
   Since: cosmos-sdk 0.46 */
  async granteeGrants(params: QueryGranteeGrantsRequest): Promise<QueryGranteeGrantsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `cosmos/authz/v1beta1/grants/grantee/${params.grantee}`;
    return await this.req.get<QueryGranteeGrantsResponseSDKType>(endpoint, options);
  }
}