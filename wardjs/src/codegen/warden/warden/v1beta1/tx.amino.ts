//@ts-nocheck
import { MsgUpdateParams, MsgNewSpace, MsgAddSpaceOwner, MsgRemoveSpaceOwner, MsgNewKeychain, MsgAddKeychainParty, MsgUpdateSpace, MsgUpdateKeychain, MsgNewKeyRequest, MsgUpdateKeyRequest, MsgNewSignatureRequest, MsgFulfilSignatureRequest, MsgNewSignTransactionRequest } from "./tx.js";
export const AminoConverter = {
  "/warden.warden.v1beta1.MsgUpdateParams": {
    aminoType: "warden/x/warden/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/warden.warden.v1beta1.MsgNewSpace": {
    aminoType: "/warden.warden.v1beta1.MsgNewSpace",
    toAmino: MsgNewSpace.toAmino,
    fromAmino: MsgNewSpace.fromAmino
  },
  "/warden.warden.v1beta1.MsgAddSpaceOwner": {
    aminoType: "/warden.warden.v1beta1.MsgAddSpaceOwner",
    toAmino: MsgAddSpaceOwner.toAmino,
    fromAmino: MsgAddSpaceOwner.fromAmino
  },
  "/warden.warden.v1beta1.MsgRemoveSpaceOwner": {
    aminoType: "/warden.warden.v1beta1.MsgRemoveSpaceOwner",
    toAmino: MsgRemoveSpaceOwner.toAmino,
    fromAmino: MsgRemoveSpaceOwner.fromAmino
  },
  "/warden.warden.v1beta1.MsgNewKeychain": {
    aminoType: "/warden.warden.v1beta1.MsgNewKeychain",
    toAmino: MsgNewKeychain.toAmino,
    fromAmino: MsgNewKeychain.fromAmino
  },
  "/warden.warden.v1beta1.MsgAddKeychainParty": {
    aminoType: "/warden.warden.v1beta1.MsgAddKeychainParty",
    toAmino: MsgAddKeychainParty.toAmino,
    fromAmino: MsgAddKeychainParty.fromAmino
  },
  "/warden.warden.v1beta1.MsgUpdateSpace": {
    aminoType: "/warden.warden.v1beta1.MsgUpdateSpace",
    toAmino: MsgUpdateSpace.toAmino,
    fromAmino: MsgUpdateSpace.fromAmino
  },
  "/warden.warden.v1beta1.MsgUpdateKeychain": {
    aminoType: "/warden.warden.v1beta1.MsgUpdateKeychain",
    toAmino: MsgUpdateKeychain.toAmino,
    fromAmino: MsgUpdateKeychain.fromAmino
  },
  "/warden.warden.v1beta1.MsgNewKeyRequest": {
    aminoType: "/warden.warden.v1beta1.MsgNewKeyRequest",
    toAmino: MsgNewKeyRequest.toAmino,
    fromAmino: MsgNewKeyRequest.fromAmino
  },
  "/warden.warden.v1beta1.MsgUpdateKeyRequest": {
    aminoType: "/warden.warden.v1beta1.MsgUpdateKeyRequest",
    toAmino: MsgUpdateKeyRequest.toAmino,
    fromAmino: MsgUpdateKeyRequest.fromAmino
  },
  "/warden.warden.v1beta1.MsgNewSignatureRequest": {
    aminoType: "/warden.warden.v1beta1.MsgNewSignatureRequest",
    toAmino: MsgNewSignatureRequest.toAmino,
    fromAmino: MsgNewSignatureRequest.fromAmino
  },
  "/warden.warden.v1beta1.MsgFulfilSignatureRequest": {
    aminoType: "/warden.warden.v1beta1.MsgFulfilSignatureRequest",
    toAmino: MsgFulfilSignatureRequest.toAmino,
    fromAmino: MsgFulfilSignatureRequest.fromAmino
  },
  "/warden.warden.v1beta1.MsgNewSignTransactionRequest": {
    aminoType: "/warden.warden.v1beta1.MsgNewSignTransactionRequest",
    toAmino: MsgNewSignTransactionRequest.toAmino,
    fromAmino: MsgNewSignTransactionRequest.fromAmino
  }
};