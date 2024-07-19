//@ts-nocheck
import { Rpc } from "../../../helpers.js";
import { BinaryReader } from "../../../binary.js";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgNewSpace, MsgNewSpaceResponse, MsgAddSpaceOwner, MsgAddSpaceOwnerResponse, MsgRemoveSpaceOwner, MsgRemoveSpaceOwnerResponse, MsgNewKeychain, MsgNewKeychainResponse, MsgAddKeychainWriter, MsgAddKeychainWriterResponse, MsgUpdateSpace, MsgUpdateSpaceResponse, MsgUpdateKeychain, MsgUpdateKeychainResponse, MsgNewKeyRequest, MsgNewKeyRequestResponse, MsgFulfilKeyRequest, MsgFulfilKeyRequestResponse, MsgUpdateKey, MsgUpdateKeyResponse, MsgNewSignRequest, MsgNewSignRequestResponse, MsgFulfilSignRequest, MsgFulfilSignRequestResponse } from "./tx.js";
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
  fulfilKeyRequest(request: MsgFulfilKeyRequest): Promise<MsgFulfilKeyRequestResponse>;
  /** Update a Key. */
  updateKey(request: MsgUpdateKey): Promise<MsgUpdateKeyResponse>;
  /** Create a new SignRequest. */
  newSignRequest(request: MsgNewSignRequest): Promise<MsgNewSignRequestResponse>;
  /** Fulfil or reject a SignRequest. */
  fulfilSignRequest(request: MsgFulfilSignRequest): Promise<MsgFulfilSignRequestResponse>;
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
    this.fulfilKeyRequest = this.fulfilKeyRequest.bind(this);
    this.updateKey = this.updateKey.bind(this);
    this.newSignRequest = this.newSignRequest.bind(this);
    this.fulfilSignRequest = this.fulfilSignRequest.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  newSpace(request: MsgNewSpace): Promise<MsgNewSpaceResponse> {
    const data = MsgNewSpace.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "NewSpace", data);
    return promise.then(data => MsgNewSpaceResponse.decode(new BinaryReader(data)));
  }
  addSpaceOwner(request: MsgAddSpaceOwner): Promise<MsgAddSpaceOwnerResponse> {
    const data = MsgAddSpaceOwner.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "AddSpaceOwner", data);
    return promise.then(data => MsgAddSpaceOwnerResponse.decode(new BinaryReader(data)));
  }
  removeSpaceOwner(request: MsgRemoveSpaceOwner): Promise<MsgRemoveSpaceOwnerResponse> {
    const data = MsgRemoveSpaceOwner.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "RemoveSpaceOwner", data);
    return promise.then(data => MsgRemoveSpaceOwnerResponse.decode(new BinaryReader(data)));
  }
  newKeychain(request: MsgNewKeychain): Promise<MsgNewKeychainResponse> {
    const data = MsgNewKeychain.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "NewKeychain", data);
    return promise.then(data => MsgNewKeychainResponse.decode(new BinaryReader(data)));
  }
  addKeychainWriter(request: MsgAddKeychainWriter): Promise<MsgAddKeychainWriterResponse> {
    const data = MsgAddKeychainWriter.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "AddKeychainWriter", data);
    return promise.then(data => MsgAddKeychainWriterResponse.decode(new BinaryReader(data)));
  }
  updateSpace(request: MsgUpdateSpace): Promise<MsgUpdateSpaceResponse> {
    const data = MsgUpdateSpace.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "UpdateSpace", data);
    return promise.then(data => MsgUpdateSpaceResponse.decode(new BinaryReader(data)));
  }
  updateKeychain(request: MsgUpdateKeychain): Promise<MsgUpdateKeychainResponse> {
    const data = MsgUpdateKeychain.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "UpdateKeychain", data);
    return promise.then(data => MsgUpdateKeychainResponse.decode(new BinaryReader(data)));
  }
  newKeyRequest(request: MsgNewKeyRequest): Promise<MsgNewKeyRequestResponse> {
    const data = MsgNewKeyRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "NewKeyRequest", data);
    return promise.then(data => MsgNewKeyRequestResponse.decode(new BinaryReader(data)));
  }
  fulfilKeyRequest(request: MsgFulfilKeyRequest): Promise<MsgFulfilKeyRequestResponse> {
    const data = MsgFulfilKeyRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "FulfilKeyRequest", data);
    return promise.then(data => MsgFulfilKeyRequestResponse.decode(new BinaryReader(data)));
  }
  updateKey(request: MsgUpdateKey): Promise<MsgUpdateKeyResponse> {
    const data = MsgUpdateKey.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "UpdateKey", data);
    return promise.then(data => MsgUpdateKeyResponse.decode(new BinaryReader(data)));
  }
  newSignRequest(request: MsgNewSignRequest): Promise<MsgNewSignRequestResponse> {
    const data = MsgNewSignRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "NewSignRequest", data);
    return promise.then(data => MsgNewSignRequestResponse.decode(new BinaryReader(data)));
  }
  fulfilSignRequest(request: MsgFulfilSignRequest): Promise<MsgFulfilSignRequestResponse> {
    const data = MsgFulfilSignRequest.encode(request).finish();
    const promise = this.rpc.request("warden.warden.v1beta3.Msg", "FulfilSignRequest", data);
    return promise.then(data => MsgFulfilSignRequestResponse.decode(new BinaryReader(data)));
  }
}