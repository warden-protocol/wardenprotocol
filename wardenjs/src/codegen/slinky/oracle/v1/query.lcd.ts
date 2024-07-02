//@ts-nocheck
import { LCDClient } from "@cosmology/lcd";
import { GetAllCurrencyPairsRequest, GetAllCurrencyPairsResponseSDKType, GetPriceRequest, GetPriceResponseSDKType, GetPricesRequest, GetPricesResponseSDKType, GetCurrencyPairMappingRequest, GetCurrencyPairMappingResponseSDKType } from "./query.js";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.getAllCurrencyPairs = this.getAllCurrencyPairs.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.getPrices = this.getPrices.bind(this);
    this.getCurrencyPairMapping = this.getCurrencyPairMapping.bind(this);
  }
  /* Get all the currency pairs the x/oracle module is tracking price-data for. */
  async getAllCurrencyPairs(_params: GetAllCurrencyPairsRequest = {}): Promise<GetAllCurrencyPairsResponseSDKType> {
    const endpoint = `slinky/oracle/v1/get_all_tickers`;
    return await this.req.get<GetAllCurrencyPairsResponseSDKType>(endpoint);
  }
  /* Given a CurrencyPair (or its identifier) return the latest QuotePrice for
   that CurrencyPair. */
  async getPrice(params: GetPriceRequest): Promise<GetPriceResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.currencyPair !== "undefined") {
      options.params.currency_pair = params.currencyPair;
    }
    const endpoint = `slinky/oracle/v1/get_price`;
    return await this.req.get<GetPriceResponseSDKType>(endpoint, options);
  }
  /* GetPrices */
  async getPrices(params: GetPricesRequest): Promise<GetPricesResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.currencyPairIds !== "undefined") {
      options.params.currency_pair_ids = params.currencyPairIds;
    }
    const endpoint = `slinky/oracle/v1/get_prices`;
    return await this.req.get<GetPricesResponseSDKType>(endpoint, options);
  }
  /* Get the mapping of currency pair ID -> currency pair. This is useful for
   indexers that have access to the ID of a currency pair, but no way to get
   the underlying currency pair from it. */
  async getCurrencyPairMapping(_params: GetCurrencyPairMappingRequest = {}): Promise<GetCurrencyPairMappingResponseSDKType> {
    const endpoint = `slinky/oracle/v1/get_currency_pair_mapping`;
    return await this.req.get<GetCurrencyPairMappingResponseSDKType>(endpoint);
  }
}