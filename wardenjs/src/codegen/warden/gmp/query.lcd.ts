//@ts-nocheck
import { LCDClient } from "@cosmology/lcd";
import { ParamsRequest, ParamsResponseSDKType } from "./query.js";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.params = this.params.bind(this);
  }
  /* Params queries all parameters. */
  async params(_params: ParamsRequest = {}): Promise<ParamsResponseSDKType> {
    const endpoint = `warden/gmp/params`;
    return await this.req.get<ParamsResponseSDKType>(endpoint);
  }
}