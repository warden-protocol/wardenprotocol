//@ts-nocheck
import { Rpc } from "../../helpers.js";
import { BinaryReader } from "../../binary.js";
import { MsgSetParams, MsgSetParamsResponse, MsgBridge, MsgBridgeResponse } from "./tx.js";
/** Msg defines the gmp Msg service. */
export interface Msg {
  /** SetParams sets the parameters for the gmp module. */
  setParams(request: MsgSetParams): Promise<MsgSetParamsResponse>;
  /** Bridge relays Warden data via GMP. */
  bridge(request: MsgBridge): Promise<MsgBridgeResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.setParams = this.setParams.bind(this);
    this.bridge = this.bridge.bind(this);
  }
  setParams(request: MsgSetParams): Promise<MsgSetParamsResponse> {
    const data = MsgSetParams.encode(request).finish();
    const promise = this.rpc.request("warden.gmp.Msg", "SetParams", data);
    return promise.then(data => MsgSetParamsResponse.decode(new BinaryReader(data)));
  }
  bridge(request: MsgBridge): Promise<MsgBridgeResponse> {
    const data = MsgBridge.encode(request).finish();
    const promise = this.rpc.request("warden.gmp.Msg", "Bridge", data);
    return promise.then(data => MsgBridgeResponse.decode(new BinaryReader(data)));
  }
}