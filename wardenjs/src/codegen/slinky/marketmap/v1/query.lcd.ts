//@ts-nocheck
import { LCDClient } from "@cosmology/lcd";
import { MarketMapRequest, MarketMapResponseSDKType, MarketRequest, MarketResponseSDKType, LastUpdatedRequest, LastUpdatedResponseSDKType, ParamsRequest, ParamsResponseSDKType } from "./query.js";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.marketMap = this.marketMap.bind(this);
    this.market = this.market.bind(this);
    this.lastUpdated = this.lastUpdated.bind(this);
    this.params = this.params.bind(this);
  }
  /* MarketMap returns the full market map stored in the x/marketmap
   module. */
  async marketMap(_params: MarketMapRequest = {}): Promise<MarketMapResponseSDKType> {
    const endpoint = `slinky/marketmap/v1/marketmap`;
    return await this.req.get<MarketMapResponseSDKType>(endpoint);
  }
  /* Market returns a market stored in the x/marketmap
   module. */
  async market(params: MarketRequest): Promise<MarketResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.currencyPair !== "undefined") {
      options.params.currency_pair = params.currencyPair;
    }
    const endpoint = `slinky/marketmap/v1/market`;
    return await this.req.get<MarketResponseSDKType>(endpoint, options);
  }
  /* LastUpdated returns the last height the market map was updated at. */
  async lastUpdated(_params: LastUpdatedRequest = {}): Promise<LastUpdatedResponseSDKType> {
    const endpoint = `slinky/marketmap/v1/last_updated`;
    return await this.req.get<LastUpdatedResponseSDKType>(endpoint);
  }
  /* Params returns the current x/marketmap module parameters. */
  async params(_params: ParamsRequest = {}): Promise<ParamsResponseSDKType> {
    const endpoint = `slinky/marketmap/v1/params`;
    return await this.req.get<ParamsResponseSDKType>(endpoint);
  }
}