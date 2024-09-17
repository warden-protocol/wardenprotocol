//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgNewAction, MsgNewActionResponse, MsgCheckAction, MsgCheckActionResponse, MsgNewTemplate, MsgNewTemplateResponse, MsgUpdateTemplate, MsgUpdateTemplateResponse, MsgRevokeAction, MsgRevokeActionResponse, MsgVoteForAction, MsgVoteForActionResponse } from "./tx.js";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** NewAction creates a new Action. */
  newAction(request: MsgNewAction): Promise<MsgNewActionResponse>;
  /** Checks a pending action and executes it if its in a valid state. */
  checkAction(request: MsgCheckAction): Promise<MsgCheckActionResponse>;
  /** Create a new Template. */
  newTemplate(request: MsgNewTemplate): Promise<MsgNewTemplateResponse>;
  /** Update an existing act name and definition. */
  updateTemplate(request: MsgUpdateTemplate): Promise<MsgUpdateTemplateResponse>;
  /** Revoke an existing Action while in pending state. */
  revokeAction(request: MsgRevokeAction): Promise<MsgRevokeActionResponse>;
  /** Vote for or against a particular Action. */
  voteForAction(request: MsgVoteForAction): Promise<MsgVoteForActionResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.newAction = this.newAction.bind(this);
    this.checkAction = this.checkAction.bind(this);
    this.newTemplate = this.newTemplate.bind(this);
    this.updateTemplate = this.updateTemplate.bind(this);
    this.revokeAction = this.revokeAction.bind(this);
    this.voteForAction = this.voteForAction.bind(this);
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
  checkAction(request: MsgCheckAction): Promise<MsgCheckActionResponse> {
    const data = MsgCheckAction.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "CheckAction", data);
    return promise.then(data => MsgCheckActionResponse.decode(new BinaryReader(data)));
  }
  newTemplate(request: MsgNewTemplate): Promise<MsgNewTemplateResponse> {
    const data = MsgNewTemplate.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "NewTemplate", data);
    return promise.then(data => MsgNewTemplateResponse.decode(new BinaryReader(data)));
  }
  updateTemplate(request: MsgUpdateTemplate): Promise<MsgUpdateTemplateResponse> {
    const data = MsgUpdateTemplate.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "UpdateTemplate", data);
    return promise.then(data => MsgUpdateTemplateResponse.decode(new BinaryReader(data)));
  }
  revokeAction(request: MsgRevokeAction): Promise<MsgRevokeActionResponse> {
    const data = MsgRevokeAction.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "RevokeAction", data);
    return promise.then(data => MsgRevokeActionResponse.decode(new BinaryReader(data)));
  }
  voteForAction(request: MsgVoteForAction): Promise<MsgVoteForActionResponse> {
    const data = MsgVoteForAction.encode(request).finish();
    const promise = this.rpc.request("warden.act.v1beta1.Msg", "VoteForAction", data);
    return promise.then(data => MsgVoteForActionResponse.decode(new BinaryReader(data)));
  }
}