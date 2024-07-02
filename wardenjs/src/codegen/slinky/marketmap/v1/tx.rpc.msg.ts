//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { MsgCreateMarkets, MsgCreateMarketsResponse, MsgUpdateMarkets, MsgUpdateMarketsResponse, MsgParams, MsgParamsResponse, MsgRemoveMarketAuthorities, MsgRemoveMarketAuthoritiesResponse, MsgUpsertMarkets, MsgUpsertMarketsResponse } from "./tx.js";
/** Msg is the message service for the x/marketmap module. */
export interface Msg {
  /** CreateMarkets creates markets from the given message. */
  createMarkets(request: MsgCreateMarkets): Promise<MsgCreateMarketsResponse>;
  /** UpdateMarkets updates markets from the given message. */
  updateMarkets(request: MsgUpdateMarkets): Promise<MsgUpdateMarketsResponse>;
  /**
   * UpdateParams defines a method for updating the x/marketmap module
   * parameters.
   */
  updateParams(request: MsgParams): Promise<MsgParamsResponse>;
  /**
   * RemoveMarketAuthorities defines a method for removing market authorities
   * from the x/marketmap module. the signer must be the admin.
   */
  removeMarketAuthorities(request: MsgRemoveMarketAuthorities): Promise<MsgRemoveMarketAuthoritiesResponse>;
  /**
   * UpsertMarkets wraps both Create / Update markets into a single message. Specifically
   * if a market does not exist it will be created, otherwise it will be updated. The response
   * will be a map between ticker -> updated.
   */
  upsertMarkets(request: MsgUpsertMarkets): Promise<MsgUpsertMarketsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createMarkets = this.createMarkets.bind(this);
    this.updateMarkets = this.updateMarkets.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.removeMarketAuthorities = this.removeMarketAuthorities.bind(this);
    this.upsertMarkets = this.upsertMarkets.bind(this);
  }
  createMarkets(request: MsgCreateMarkets): Promise<MsgCreateMarketsResponse> {
    const data = MsgCreateMarkets.encode(request).finish();
    const promise = this.rpc.request("slinky.marketmap.v1.Msg", "CreateMarkets", data);
    return promise.then(data => MsgCreateMarketsResponse.decode(new BinaryReader(data)));
  }
  updateMarkets(request: MsgUpdateMarkets): Promise<MsgUpdateMarketsResponse> {
    const data = MsgUpdateMarkets.encode(request).finish();
    const promise = this.rpc.request("slinky.marketmap.v1.Msg", "UpdateMarkets", data);
    return promise.then(data => MsgUpdateMarketsResponse.decode(new BinaryReader(data)));
  }
  updateParams(request: MsgParams): Promise<MsgParamsResponse> {
    const data = MsgParams.encode(request).finish();
    const promise = this.rpc.request("slinky.marketmap.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgParamsResponse.decode(new BinaryReader(data)));
  }
  removeMarketAuthorities(request: MsgRemoveMarketAuthorities): Promise<MsgRemoveMarketAuthoritiesResponse> {
    const data = MsgRemoveMarketAuthorities.encode(request).finish();
    const promise = this.rpc.request("slinky.marketmap.v1.Msg", "RemoveMarketAuthorities", data);
    return promise.then(data => MsgRemoveMarketAuthoritiesResponse.decode(new BinaryReader(data)));
  }
  upsertMarkets(request: MsgUpsertMarkets): Promise<MsgUpsertMarketsResponse> {
    const data = MsgUpsertMarkets.encode(request).finish();
    const promise = this.rpc.request("slinky.marketmap.v1.Msg", "UpsertMarkets", data);
    return promise.then(data => MsgUpsertMarketsResponse.decode(new BinaryReader(data)));
  }
}