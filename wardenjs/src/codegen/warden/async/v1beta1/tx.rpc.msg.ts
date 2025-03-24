//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgAddFuture, MsgAddFutureResponse } from "./tx.js";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** Create a new Future to be executed. */
  addFuture(request: MsgAddFuture): Promise<MsgAddFutureResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.addFuture = this.addFuture.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  addFuture(request: MsgAddFuture): Promise<MsgAddFutureResponse> {
    const data = MsgAddFuture.encode(request).finish();
    const promise = this.rpc.request("warden.async.v1beta1.Msg", "AddFuture", data);
    return promise.then(data => MsgAddFutureResponse.decode(new BinaryReader(data)));
  }
}