//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgNewAction, MsgNewActionResponse, MsgApproveAction, MsgApproveActionResponse, MsgNewRule, MsgNewRuleResponse, MsgUpdateRule, MsgUpdateRuleResponse, MsgRevokeAction, MsgRevokeActionResponse } from "./tx.js";
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
  /** Create a new Rule. */
  newRule(request: MsgNewRule): Promise<MsgNewRuleResponse>;
  /** Update an existing act name and definition. */
  updateRule(request: MsgUpdateRule): Promise<MsgUpdateRuleResponse>;
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
    this.newRule = this.newRule.bind(this);
    this.updateRule = this.updateRule.bind(this);
    this.revokeAction = this.revokeAction.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  newAction(request: MsgNewAction): Promise<MsgNewActionResponse> {
    const data = MsgNewAction.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "NewAction", data);
    return promise.then(data => MsgNewActionResponse.decode(new BinaryReader(data)));
  }
  approveAction(request: MsgApproveAction): Promise<MsgApproveActionResponse> {
    const data = MsgApproveAction.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "ApproveAction", data);
    return promise.then(data => MsgApproveActionResponse.decode(new BinaryReader(data)));
  }
  newRule(request: MsgNewRule): Promise<MsgNewRuleResponse> {
    const data = MsgNewRule.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "NewRule", data);
    return promise.then(data => MsgNewRuleResponse.decode(new BinaryReader(data)));
  }
  updateRule(request: MsgUpdateRule): Promise<MsgUpdateRuleResponse> {
    const data = MsgUpdateRule.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "UpdateRule", data);
    return promise.then(data => MsgUpdateRuleResponse.decode(new BinaryReader(data)));
  }
  revokeAction(request: MsgRevokeAction): Promise<MsgRevokeActionResponse> {
    const data = MsgRevokeAction.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "RevokeAction", data);
    return promise.then(data => MsgRevokeActionResponse.decode(new BinaryReader(data)));
  }
}