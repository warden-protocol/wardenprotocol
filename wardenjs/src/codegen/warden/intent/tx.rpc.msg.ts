//@ts-nocheck
import { Rpc } from "../../helpers.js";
import { BinaryReader } from "../../binary.js";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgNewAction, MsgNewActionResponse, MsgApproveAction, MsgApproveActionResponse, MsgNewIntent, MsgNewIntentResponse, MsgUpdateIntent, MsgUpdateIntentResponse, MsgRevokeAction, MsgRevokeActionResponse } from "./tx.js";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** NewAction creates a new Action. */
  newAction(request: MsgNewAction): Promise<MsgNewActionResponse>;
  /** Add an approval to an existing Action. */
  approveAction(request: MsgApproveAction): Promise<MsgApproveActionResponse>;
  /** Create a new intent. */
  newIntent(request: MsgNewIntent): Promise<MsgNewIntentResponse>;
  /** Update an existing intent name and definition. */
  updateIntent(request: MsgUpdateIntent): Promise<MsgUpdateIntentResponse>;
  /** Revoke an existing Action while in pending state. */
  revokeAction(request: MsgRevokeAction): Promise<MsgRevokeActionResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.newAction = this.newAction.bind(this);
    this.approveAction = this.approveAction.bind(this);
    this.newIntent = this.newIntent.bind(this);
    this.updateIntent = this.updateIntent.bind(this);
    this.revokeAction = this.revokeAction.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  newAction(request: MsgNewAction): Promise<MsgNewActionResponse> {
    const data = MsgNewAction.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Msg", "NewAction", data);
    return promise.then(data => MsgNewActionResponse.decode(new BinaryReader(data)));
  }
  approveAction(request: MsgApproveAction): Promise<MsgApproveActionResponse> {
    const data = MsgApproveAction.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Msg", "ApproveAction", data);
    return promise.then(data => MsgApproveActionResponse.decode(new BinaryReader(data)));
  }
  newIntent(request: MsgNewIntent): Promise<MsgNewIntentResponse> {
    const data = MsgNewIntent.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Msg", "NewIntent", data);
    return promise.then(data => MsgNewIntentResponse.decode(new BinaryReader(data)));
  }
  updateIntent(request: MsgUpdateIntent): Promise<MsgUpdateIntentResponse> {
    const data = MsgUpdateIntent.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Msg", "UpdateIntent", data);
    return promise.then(data => MsgUpdateIntentResponse.decode(new BinaryReader(data)));
  }
  revokeAction(request: MsgRevokeAction): Promise<MsgRevokeActionResponse> {
    const data = MsgRevokeAction.encode(request).finish();
    const promise = this.rpc.request("warden.intent.Msg", "RevokeAction", data);
    return promise.then(data => MsgRevokeActionResponse.decode(new BinaryReader(data)));
  }
}