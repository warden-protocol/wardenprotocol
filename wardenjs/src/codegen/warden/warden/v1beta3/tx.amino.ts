//@ts-nocheck
import { MsgUpdateParams, MsgNewSpace, MsgAddSpaceOwner, MsgRemoveSpaceOwner, MsgNewKeychain, MsgAddKeychainWriter, MsgUpdateSpace, MsgUpdateKeychain, MsgNewKeyRequest, MsgFulfilKeyRequest, MsgUpdateKey, MsgNewSignRequest, MsgFulfilSignRequest } from "./tx.js";
export const AminoConverter = {
  "/warden.warden.v1beta3.MsgUpdateParams": {
    aminoType: "warden/x/warden/MsgUpdateParams",
    toAmino: MsgUpdateParams.toAmino,
    fromAmino: MsgUpdateParams.fromAmino
  },
  "/warden.warden.v1beta3.MsgNewSpace": {
    aminoType: "/warden.warden.v1beta3.MsgNewSpace",
    toAmino: MsgNewSpace.toAmino,
    fromAmino: MsgNewSpace.fromAmino
  },
  "/warden.warden.v1beta3.MsgAddSpaceOwner": {
    aminoType: "/warden.warden.v1beta3.MsgAddSpaceOwner",
    toAmino: MsgAddSpaceOwner.toAmino,
    fromAmino: MsgAddSpaceOwner.fromAmino
  },
  "/warden.warden.v1beta3.MsgRemoveSpaceOwner": {
    aminoType: "/warden.warden.v1beta3.MsgRemoveSpaceOwner",
    toAmino: MsgRemoveSpaceOwner.toAmino,
    fromAmino: MsgRemoveSpaceOwner.fromAmino
  },
  "/warden.warden.v1beta3.MsgNewKeychain": {
    aminoType: "/warden.warden.v1beta3.MsgNewKeychain",
    toAmino: MsgNewKeychain.toAmino,
    fromAmino: MsgNewKeychain.fromAmino
  },
  "/warden.warden.v1beta3.MsgAddKeychainWriter": {
    aminoType: "/warden.warden.v1beta3.MsgAddKeychainWriter",
    toAmino: MsgAddKeychainWriter.toAmino,
    fromAmino: MsgAddKeychainWriter.fromAmino
  },
  "/warden.warden.v1beta3.MsgUpdateSpace": {
    aminoType: "/warden.warden.v1beta3.MsgUpdateSpace",
    toAmino: MsgUpdateSpace.toAmino,
    fromAmino: MsgUpdateSpace.fromAmino
  },
  "/warden.warden.v1beta3.MsgUpdateKeychain": {
    aminoType: "/warden.warden.v1beta3.MsgUpdateKeychain",
    toAmino: MsgUpdateKeychain.toAmino,
    fromAmino: MsgUpdateKeychain.fromAmino
  },
  "/warden.warden.v1beta3.MsgNewKeyRequest": {
    aminoType: "/warden.warden.v1beta3.MsgNewKeyRequest",
    toAmino: MsgNewKeyRequest.toAmino,
    fromAmino: MsgNewKeyRequest.fromAmino
  },
  "/warden.warden.v1beta3.MsgFulfilKeyRequest": {
    aminoType: "/warden.warden.v1beta3.MsgFulfilKeyRequest",
    toAmino: MsgFulfilKeyRequest.toAmino,
    fromAmino: MsgFulfilKeyRequest.fromAmino
  },
  "/warden.warden.v1beta3.MsgUpdateKey": {
    aminoType: "/warden.warden.v1beta3.MsgUpdateKey",
    toAmino: MsgUpdateKey.toAmino,
    fromAmino: MsgUpdateKey.fromAmino
  },
  "/warden.warden.v1beta3.MsgNewSignRequest": {
    aminoType: "/warden.warden.v1beta3.MsgNewSignRequest",
    toAmino: MsgNewSignRequest.toAmino,
    fromAmino: MsgNewSignRequest.fromAmino
  },
  "/warden.warden.v1beta3.MsgFulfilSignRequest": {
    aminoType: "/warden.warden.v1beta3.MsgFulfilSignRequest",
    toAmino: MsgFulfilSignRequest.toAmino,
    fromAmino: MsgFulfilSignRequest.fromAmino
  }
};