//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgNewSpace, MsgAddSpaceOwner, MsgRemoveSpaceOwner, MsgNewKeychain, MsgAddKeychainWriter, MsgUpdateSpace, MsgUpdateKeychain, MsgNewKeyRequest, MsgFulfilKeyRequest, MsgUpdateKey, MsgNewSignRequest, MsgFulfilSignRequest } from "./tx.js";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/warden.warden.v1beta3.MsgUpdateParams", MsgUpdateParams], ["/warden.warden.v1beta3.MsgNewSpace", MsgNewSpace], ["/warden.warden.v1beta3.MsgAddSpaceOwner", MsgAddSpaceOwner], ["/warden.warden.v1beta3.MsgRemoveSpaceOwner", MsgRemoveSpaceOwner], ["/warden.warden.v1beta3.MsgNewKeychain", MsgNewKeychain], ["/warden.warden.v1beta3.MsgAddKeychainWriter", MsgAddKeychainWriter], ["/warden.warden.v1beta3.MsgUpdateSpace", MsgUpdateSpace], ["/warden.warden.v1beta3.MsgUpdateKeychain", MsgUpdateKeychain], ["/warden.warden.v1beta3.MsgNewKeyRequest", MsgNewKeyRequest], ["/warden.warden.v1beta3.MsgFulfilKeyRequest", MsgFulfilKeyRequest], ["/warden.warden.v1beta3.MsgUpdateKey", MsgUpdateKey], ["/warden.warden.v1beta3.MsgNewSignRequest", MsgNewSignRequest], ["/warden.warden.v1beta3.MsgFulfilSignRequest", MsgFulfilSignRequest]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    newSpace(value: MsgNewSpace) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSpace",
        value: MsgNewSpace.encode(value).finish()
      };
    },
    addSpaceOwner(value: MsgAddSpaceOwner) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwner",
        value: MsgAddSpaceOwner.encode(value).finish()
      };
    },
    removeSpaceOwner(value: MsgRemoveSpaceOwner) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwner",
        value: MsgRemoveSpaceOwner.encode(value).finish()
      };
    },
    newKeychain(value: MsgNewKeychain) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewKeychain",
        value: MsgNewKeychain.encode(value).finish()
      };
    },
    addKeychainWriter(value: MsgAddKeychainWriter) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriter",
        value: MsgAddKeychainWriter.encode(value).finish()
      };
    },
    updateSpace(value: MsgUpdateSpace) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateSpace",
        value: MsgUpdateSpace.encode(value).finish()
      };
    },
    updateKeychain(value: MsgUpdateKeychain) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychain",
        value: MsgUpdateKeychain.encode(value).finish()
      };
    },
    newKeyRequest(value: MsgNewKeyRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequest",
        value: MsgNewKeyRequest.encode(value).finish()
      };
    },
    fulfilKeyRequest(value: MsgFulfilKeyRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequest",
        value: MsgFulfilKeyRequest.encode(value).finish()
      };
    },
    updateKey(value: MsgUpdateKey) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateKey",
        value: MsgUpdateKey.encode(value).finish()
      };
    },
    newSignRequest(value: MsgNewSignRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSignRequest",
        value: MsgNewSignRequest.encode(value).finish()
      };
    },
    fulfilSignRequest(value: MsgFulfilSignRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequest",
        value: MsgFulfilSignRequest.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateParams",
        value
      };
    },
    newSpace(value: MsgNewSpace) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSpace",
        value
      };
    },
    addSpaceOwner(value: MsgAddSpaceOwner) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwner",
        value
      };
    },
    removeSpaceOwner(value: MsgRemoveSpaceOwner) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwner",
        value
      };
    },
    newKeychain(value: MsgNewKeychain) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewKeychain",
        value
      };
    },
    addKeychainWriter(value: MsgAddKeychainWriter) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriter",
        value
      };
    },
    updateSpace(value: MsgUpdateSpace) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateSpace",
        value
      };
    },
    updateKeychain(value: MsgUpdateKeychain) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychain",
        value
      };
    },
    newKeyRequest(value: MsgNewKeyRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequest",
        value
      };
    },
    fulfilKeyRequest(value: MsgFulfilKeyRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequest",
        value
      };
    },
    updateKey(value: MsgUpdateKey) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateKey",
        value
      };
    },
    newSignRequest(value: MsgNewSignRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSignRequest",
        value
      };
    },
    fulfilSignRequest(value: MsgFulfilSignRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequest",
        value
      };
    }
  },
  toJSON: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateParams",
        value: MsgUpdateParams.toJSON(value)
      };
    },
    newSpace(value: MsgNewSpace) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSpace",
        value: MsgNewSpace.toJSON(value)
      };
    },
    addSpaceOwner(value: MsgAddSpaceOwner) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwner",
        value: MsgAddSpaceOwner.toJSON(value)
      };
    },
    removeSpaceOwner(value: MsgRemoveSpaceOwner) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwner",
        value: MsgRemoveSpaceOwner.toJSON(value)
      };
    },
    newKeychain(value: MsgNewKeychain) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewKeychain",
        value: MsgNewKeychain.toJSON(value)
      };
    },
    addKeychainWriter(value: MsgAddKeychainWriter) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriter",
        value: MsgAddKeychainWriter.toJSON(value)
      };
    },
    updateSpace(value: MsgUpdateSpace) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateSpace",
        value: MsgUpdateSpace.toJSON(value)
      };
    },
    updateKeychain(value: MsgUpdateKeychain) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychain",
        value: MsgUpdateKeychain.toJSON(value)
      };
    },
    newKeyRequest(value: MsgNewKeyRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequest",
        value: MsgNewKeyRequest.toJSON(value)
      };
    },
    fulfilKeyRequest(value: MsgFulfilKeyRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequest",
        value: MsgFulfilKeyRequest.toJSON(value)
      };
    },
    updateKey(value: MsgUpdateKey) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateKey",
        value: MsgUpdateKey.toJSON(value)
      };
    },
    newSignRequest(value: MsgNewSignRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSignRequest",
        value: MsgNewSignRequest.toJSON(value)
      };
    },
    fulfilSignRequest(value: MsgFulfilSignRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequest",
        value: MsgFulfilSignRequest.toJSON(value)
      };
    }
  },
  fromJSON: {
    updateParams(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateParams",
        value: MsgUpdateParams.fromJSON(value)
      };
    },
    newSpace(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSpace",
        value: MsgNewSpace.fromJSON(value)
      };
    },
    addSpaceOwner(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwner",
        value: MsgAddSpaceOwner.fromJSON(value)
      };
    },
    removeSpaceOwner(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwner",
        value: MsgRemoveSpaceOwner.fromJSON(value)
      };
    },
    newKeychain(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewKeychain",
        value: MsgNewKeychain.fromJSON(value)
      };
    },
    addKeychainWriter(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriter",
        value: MsgAddKeychainWriter.fromJSON(value)
      };
    },
    updateSpace(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateSpace",
        value: MsgUpdateSpace.fromJSON(value)
      };
    },
    updateKeychain(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychain",
        value: MsgUpdateKeychain.fromJSON(value)
      };
    },
    newKeyRequest(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequest",
        value: MsgNewKeyRequest.fromJSON(value)
      };
    },
    fulfilKeyRequest(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequest",
        value: MsgFulfilKeyRequest.fromJSON(value)
      };
    },
    updateKey(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateKey",
        value: MsgUpdateKey.fromJSON(value)
      };
    },
    newSignRequest(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSignRequest",
        value: MsgNewSignRequest.fromJSON(value)
      };
    },
    fulfilSignRequest(value: any) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequest",
        value: MsgFulfilSignRequest.fromJSON(value)
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    newSpace(value: MsgNewSpace) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSpace",
        value: MsgNewSpace.fromPartial(value)
      };
    },
    addSpaceOwner(value: MsgAddSpaceOwner) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgAddSpaceOwner",
        value: MsgAddSpaceOwner.fromPartial(value)
      };
    },
    removeSpaceOwner(value: MsgRemoveSpaceOwner) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgRemoveSpaceOwner",
        value: MsgRemoveSpaceOwner.fromPartial(value)
      };
    },
    newKeychain(value: MsgNewKeychain) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewKeychain",
        value: MsgNewKeychain.fromPartial(value)
      };
    },
    addKeychainWriter(value: MsgAddKeychainWriter) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgAddKeychainWriter",
        value: MsgAddKeychainWriter.fromPartial(value)
      };
    },
    updateSpace(value: MsgUpdateSpace) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateSpace",
        value: MsgUpdateSpace.fromPartial(value)
      };
    },
    updateKeychain(value: MsgUpdateKeychain) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateKeychain",
        value: MsgUpdateKeychain.fromPartial(value)
      };
    },
    newKeyRequest(value: MsgNewKeyRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewKeyRequest",
        value: MsgNewKeyRequest.fromPartial(value)
      };
    },
    fulfilKeyRequest(value: MsgFulfilKeyRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgFulfilKeyRequest",
        value: MsgFulfilKeyRequest.fromPartial(value)
      };
    },
    updateKey(value: MsgUpdateKey) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgUpdateKey",
        value: MsgUpdateKey.fromPartial(value)
      };
    },
    newSignRequest(value: MsgNewSignRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgNewSignRequest",
        value: MsgNewSignRequest.fromPartial(value)
      };
    },
    fulfilSignRequest(value: MsgFulfilSignRequest) {
      return {
        typeUrl: "/warden.warden.v1beta3.MsgFulfilSignRequest",
        value: MsgFulfilSignRequest.fromPartial(value)
      };
    }
  }
};