//@ts-nocheck
import { LCDClient } from "@cosmology/lcd";
import { QueryParamsRequest, QueryParamsResponseSDKType, QueryBaseFeeRequest, QueryBaseFeeResponseSDKType, QueryBlockGasRequest, QueryBlockGasResponseSDKType } from "./query.js";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.params = this.params.bind(this);
    this.baseFee = this.baseFee.bind(this);
    this.blockGas = this.blockGas.bind(this);
  }
  /* Params queries the parameters of x/feemarket module. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `evmos/feemarket/v1/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
  /* BaseFee queries the base fee of the parent block of the current block. */
  async baseFee(_params: QueryBaseFeeRequest = {}): Promise<QueryBaseFeeResponseSDKType> {
    const endpoint = `evmos/feemarket/v1/base_fee`;
    return await this.req.get<QueryBaseFeeResponseSDKType>(endpoint);
  }
  /* BlockGas queries the gas used at a given block height */
  async blockGas(_params: QueryBlockGasRequest = {}): Promise<QueryBlockGasResponseSDKType> {
    const endpoint = `evmos/feemarket/v1/block_gas`;
    return await this.req.get<QueryBlockGasResponseSDKType>(endpoint);
  }
}