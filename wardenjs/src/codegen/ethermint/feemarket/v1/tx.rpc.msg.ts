//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { MsgUpdateParams, MsgUpdateParamsResponse } from "./tx.js";
/** Msg defines the erc20 Msg service. */
export interface Msg {
  /**
   * UpdateParams defined a governance operation for updating the x/feemarket module parameters.
   * The authority is hard-coded to the Cosmos SDK x/gov module account
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("ethermint.feemarket.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
}