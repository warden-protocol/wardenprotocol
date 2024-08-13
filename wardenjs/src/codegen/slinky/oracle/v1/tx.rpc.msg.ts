//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { MsgAddCurrencyPairs, MsgAddCurrencyPairsResponse, MsgRemoveCurrencyPairs, MsgRemoveCurrencyPairsResponse } from "./tx.js";
/** Msg is the message service for the x/oracle module. */
export interface Msg {
  /**
   * AddCurrencyPairs will be used only by governance to update the set of
   * available CurrencyPairs. Given a set of CurrencyPair objects, update
   * the available currency pairs in the module .
   */
  addCurrencyPairs(request: MsgAddCurrencyPairs): Promise<MsgAddCurrencyPairsResponse>;
  /**
   * RemoveCurrencyPairs will be used explicitly by governance to remove the
   * given set of currency-pairs from the module's state. Thus these
   * CurrencyPairs will no longer have price-data available from this module.
   */
  removeCurrencyPairs(request: MsgRemoveCurrencyPairs): Promise<MsgRemoveCurrencyPairsResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.addCurrencyPairs = this.addCurrencyPairs.bind(this);
    this.removeCurrencyPairs = this.removeCurrencyPairs.bind(this);
  }
  addCurrencyPairs(request: MsgAddCurrencyPairs): Promise<MsgAddCurrencyPairsResponse> {
    const data = MsgAddCurrencyPairs.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Msg", "AddCurrencyPairs", data);
    return promise.then(data => MsgAddCurrencyPairsResponse.decode(new BinaryReader(data)));
  }
  removeCurrencyPairs(request: MsgRemoveCurrencyPairs): Promise<MsgRemoveCurrencyPairsResponse> {
    const data = MsgRemoveCurrencyPairs.encode(request).finish();
    const promise = this.rpc.request("slinky.oracle.v1.Msg", "RemoveCurrencyPairs", data);
    return promise.then(data => MsgRemoveCurrencyPairsResponse.decode(new BinaryReader(data)));
  }
}