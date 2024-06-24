//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgNewSpace, MsgNewSpaceResponse, MsgAddSpaceOwner, MsgAddSpaceOwnerResponse, MsgRemoveSpaceOwner, MsgRemoveSpaceOwnerResponse, MsgNewKeychain, MsgNewKeychainResponse, MsgAddKeychainWriter, MsgAddKeychainWriterResponse, MsgUpdateSpace, MsgUpdateSpaceResponse, MsgUpdateKeychain, MsgUpdateKeychainResponse, MsgNewKeyRequest, MsgNewKeyRequestResponse, MsgUpdateKeyRequest, MsgUpdateKeyRequestResponse, MsgUpdateKey, MsgUpdateKeyResponse, MsgNewSignatureRequest, MsgNewSignatureRequestResponse, MsgFulfilSignatureRequest, MsgFulfilSignatureRequestResponse } from "./tx.js";
/** Msg defines the Msg service. */
export interface Msg {
  /**
   * UpdateParams defines a (governance) operation for updating the module
   * parameters. The authority defaults to the x/gov module account.
   */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** Create a new Space. The creator will be the first owner of the Space. */
  newSpace(request: MsgNewSpace): Promise<MsgNewSpaceResponse>;
  /** Add a new owner to a Space. */
  addSpaceOwner(request: MsgAddSpaceOwner): Promise<MsgAddSpaceOwnerResponse>;
  /** Remove an owner from the Space. */
  removeSpaceOwner(request: MsgRemoveSpaceOwner): Promise<MsgRemoveSpaceOwnerResponse>;
  /** Create a new Keychain. The user will be the first admin of the Keychain. */
  newKeychain(request: MsgNewKeychain): Promise<MsgNewKeychainResponse>;
  /** Add a new writer to a Keychain. */
  addKeychainWriter(request: MsgAddKeychainWriter): Promise<MsgAddKeychainWriterResponse>;
  /** Update a Space. */
  updateSpace(request: MsgUpdateSpace): Promise<MsgUpdateSpaceResponse>;
  /** Update a Keychain. */
  updateKeychain(request: MsgUpdateKeychain): Promise<MsgUpdateKeychainResponse>;
  /** Create a new KeyRequest. */
  newKeyRequest(request: MsgNewKeyRequest): Promise<MsgNewKeyRequestResponse>;
  /** Fulfil or reject a KeyRequest. */
  updateKeyRequest(request: MsgUpdateKeyRequest): Promise<MsgUpdateKeyRequestResponse>;
  /** Update a Key. */
  updateKey(request: MsgUpdateKey): Promise<MsgUpdateKeyResponse>;
  /** Create a new SignatureRequest. */
  newSignatureRequest(request: MsgNewSignatureRequest): Promise<MsgNewSignatureRequestResponse>;
  /** Fulfil or reject a SignatureRequest. */
  fulfilSignatureRequest(request: MsgFulfilSignatureRequest): Promise<MsgFulfilSignatureRequestResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.newSpace = this.newSpace.bind(this);
    this.addSpaceOwner = this.addSpaceOwner.bind(this);
    this.removeSpaceOwner = this.removeSpaceOwner.bind(this);
    this.newKeychain = this.newKeychain.bind(this);
    this.addKeychainWriter = this.addKeychainWriter.bind(this);
    this.updateSpace = this.updateSpace.bind(this);
    this.updateKeychain = this.updateKeychain.bind(this);
    this.newKeyRequest = this.newKeyRequest.bind(this);
    this.updateKeyRequest = this.updateKeyRequest.bind(this);
    this.updateKey = this.updateKey.bind(this);
    this.newSignatureRequest = this.newSignatureRequest.bind(this);
    this.fulfilSignatureRequest = this.fulfilSignatureRequest.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  newSpace(request: MsgNewSpace): Promise<MsgNewSpaceResponse> {
    const data = MsgNewSpace.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "NewSpace", data);
    return promise.then(data => MsgNewSpaceResponse.decode(new BinaryReader(data)));
  }
  addSpaceOwner(request: MsgAddSpaceOwner): Promise<MsgAddSpaceOwnerResponse> {
    const data = MsgAddSpaceOwner.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "AddSpaceOwner", data);
    return promise.then(data => MsgAddSpaceOwnerResponse.decode(new BinaryReader(data)));
  }
  removeSpaceOwner(request: MsgRemoveSpaceOwner): Promise<MsgRemoveSpaceOwnerResponse> {
    const data = MsgRemoveSpaceOwner.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "RemoveSpaceOwner", data);
    return promise.then(data => MsgRemoveSpaceOwnerResponse.decode(new BinaryReader(data)));
  }
  newKeychain(request: MsgNewKeychain): Promise<MsgNewKeychainResponse> {
    const data = MsgNewKeychain.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "NewKeychain", data);
    return promise.then(data => MsgNewKeychainResponse.decode(new BinaryReader(data)));
  }
  addKeychainWriter(request: MsgAddKeychainWriter): Promise<MsgAddKeychainWriterResponse> {
    const data = MsgAddKeychainWriter.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "AddKeychainWriter", data);
    return promise.then(data => MsgAddKeychainWriterResponse.decode(new BinaryReader(data)));
  }
  updateSpace(request: MsgUpdateSpace): Promise<MsgUpdateSpaceResponse> {
    const data = MsgUpdateSpace.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "UpdateSpace", data);
    return promise.then(data => MsgUpdateSpaceResponse.decode(new BinaryReader(data)));
  }
  updateKeychain(request: MsgUpdateKeychain): Promise<MsgUpdateKeychainResponse> {
    const data = MsgUpdateKeychain.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "UpdateKeychain", data);
    return promise.then(data => MsgUpdateKeychainResponse.decode(new BinaryReader(data)));
  }
  newKeyRequest(request: MsgNewKeyRequest): Promise<MsgNewKeyRequestResponse> {
    const data = MsgNewKeyRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "NewKeyRequest", data);
    return promise.then(data => MsgNewKeyRequestResponse.decode(new BinaryReader(data)));
  }
  updateKeyRequest(request: MsgUpdateKeyRequest): Promise<MsgUpdateKeyRequestResponse> {
    const data = MsgUpdateKeyRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "UpdateKeyRequest", data);
    return promise.then(data => MsgUpdateKeyRequestResponse.decode(new BinaryReader(data)));
  }
  updateKey(request: MsgUpdateKey): Promise<MsgUpdateKeyResponse> {
    const data = MsgUpdateKey.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "UpdateKey", data);
    return promise.then(data => MsgUpdateKeyResponse.decode(new BinaryReader(data)));
  }
  newSignatureRequest(request: MsgNewSignatureRequest): Promise<MsgNewSignatureRequestResponse> {
    const data = MsgNewSignatureRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "NewSignatureRequest", data);
    return promise.then(data => MsgNewSignatureRequestResponse.decode(new BinaryReader(data)));
  }
  fulfilSignatureRequest(request: MsgFulfilSignatureRequest): Promise<MsgFulfilSignatureRequestResponse> {
    const data = MsgFulfilSignatureRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta2.Msg", "FulfilSignatureRequest", data);
    return promise.then(data => MsgFulfilSignatureRequestResponse.decode(new BinaryReader(data)));
  }
}