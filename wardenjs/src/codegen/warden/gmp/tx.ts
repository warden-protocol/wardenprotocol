//@ts-nocheck
import { Params, ParamsAmino, ParamsSDKType } from "./gmp.js";
import { Coin, CoinAmino, CoinSDKType } from "../../cosmos/base/v1beta1/coin.js";
import { BinaryReader, BinaryWriter } from "../../binary.js";
import { isSet, bytesFromBase64, base64FromBytes } from "../../helpers.js";
import { JsonSafe } from "../../json-safe.js";
/** MsgSetParams defines the SetParams message type. */
export interface MsgSetParams {
  /** address that controls the module (defaults to x/gov). */
  authority: string;
  /** params defines the gmp parameters to update. */
  params?: Params;
}
export interface MsgSetParamsProtoMsg {
  typeUrl: "/warden.gmp.MsgSetParams";
  value: Uint8Array;
}
/** MsgSetParams defines the SetParams message type. */
export interface MsgSetParamsAmino {
  /** address that controls the module (defaults to x/gov). */
  authority?: string;
  /** params defines the gmp parameters to update. */
  params?: ParamsAmino;
}
export interface MsgSetParamsAminoMsg {
  type: "/warden.gmp.MsgSetParams";
  value: MsgSetParamsAmino;
}
/** MsgSetParams defines the SetParams message type. */
export interface MsgSetParamsSDKType {
  authority: string;
  params?: ParamsSDKType;
}
/** MsgSetParamsResponse defines the SetParams response type. */
export interface MsgSetParamsResponse {}
export interface MsgSetParamsResponseProtoMsg {
  typeUrl: "/warden.gmp.MsgSetParamsResponse";
  value: Uint8Array;
}
/** MsgSetParamsResponse defines the SetParams response type. */
export interface MsgSetParamsResponseAmino {}
export interface MsgSetParamsResponseAminoMsg {
  type: "/warden.gmp.MsgSetParamsResponse";
  value: MsgSetParamsResponseAmino;
}
/** MsgSetParamsResponse defines the SetParams response type. */
export interface MsgSetParamsResponseSDKType {}
/** MsgBridge defines the Bridge message type. */
export interface MsgBridge {
  /** relayer is the address that signs the message. */
  relayer: string;
  /** destination_chain defines the chain which this will be relayed to. */
  destinationChain: string;
  /** warden_contract_address defines the warden contract that GMP is calling. */
  wardenContractAddress: string;
  /** destination_contract_address defines the destination contract that warden is calling. */
  destinationContractAddress: string;
  /** destination_contract_calldata defines the command to call. */
  destinationContractCalldata: Uint8Array;
  /** token determines the IBC token that the user wants to relay via GMP. */
  token: Coin;
}
export interface MsgBridgeProtoMsg {
  typeUrl: "/warden.gmp.MsgBridge";
  value: Uint8Array;
}
/** MsgBridge defines the Bridge message type. */
export interface MsgBridgeAmino {
  /** relayer is the address that signs the message. */
  relayer?: string;
  /** destination_chain defines the chain which this will be relayed to. */
  destination_chain?: string;
  /** warden_contract_address defines the warden contract that GMP is calling. */
  warden_contract_address?: string;
  /** destination_contract_address defines the destination contract that warden is calling. */
  destination_contract_address?: string;
  /** destination_contract_calldata defines the command to call. */
  destination_contract_calldata?: string;
  /** token determines the IBC token that the user wants to relay via GMP. */
  token?: CoinAmino;
}
export interface MsgBridgeAminoMsg {
  type: "/warden.gmp.MsgBridge";
  value: MsgBridgeAmino;
}
/** MsgBridge defines the Bridge message type. */
export interface MsgBridgeSDKType {
  relayer: string;
  destination_chain: string;
  warden_contract_address: string;
  destination_contract_address: string;
  destination_contract_calldata: Uint8Array;
  token: CoinSDKType;
}
/** MsgBridge defines the Bridge response type. */
export interface MsgBridgeResponse {}
export interface MsgBridgeResponseProtoMsg {
  typeUrl: "/warden.gmp.MsgBridgeResponse";
  value: Uint8Array;
}
/** MsgBridge defines the Bridge response type. */
export interface MsgBridgeResponseAmino {}
export interface MsgBridgeResponseAminoMsg {
  type: "/warden.gmp.MsgBridgeResponse";
  value: MsgBridgeResponseAmino;
}
/** MsgBridge defines the Bridge response type. */
export interface MsgBridgeResponseSDKType {}
function createBaseMsgSetParams(): MsgSetParams {
  return {
    authority: "",
    params: undefined
  };
}
export const MsgSetParams = {
  typeUrl: "/warden.gmp.MsgSetParams",
  encode(message: MsgSetParams, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSetParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSetParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined
    };
  },
  toJSON(message: MsgSetParams): JsonSafe<MsgSetParams> {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MsgSetParams>): MsgSetParams {
    const message = createBaseMsgSetParams();
    message.authority = object.authority ?? "";
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: MsgSetParamsAmino): MsgSetParams {
    const message = createBaseMsgSetParams();
    if (object.authority !== undefined && object.authority !== null) {
      message.authority = object.authority;
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromAmino(object.params);
    }
    return message;
  },
  toAmino(message: MsgSetParams): MsgSetParamsAmino {
    const obj: any = {};
    obj.authority = message.authority === "" ? undefined : message.authority;
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgSetParamsAminoMsg): MsgSetParams {
    return MsgSetParams.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetParamsProtoMsg): MsgSetParams {
    return MsgSetParams.decode(message.value);
  },
  toProto(message: MsgSetParams): Uint8Array {
    return MsgSetParams.encode(message).finish();
  },
  toProtoMsg(message: MsgSetParams): MsgSetParamsProtoMsg {
    return {
      typeUrl: "/warden.gmp.MsgSetParams",
      value: MsgSetParams.encode(message).finish()
    };
  }
};
function createBaseMsgSetParamsResponse(): MsgSetParamsResponse {
  return {};
}
export const MsgSetParamsResponse = {
  typeUrl: "/warden.gmp.MsgSetParamsResponse",
  encode(_: MsgSetParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSetParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgSetParamsResponse {
    return {};
  },
  toJSON(_: MsgSetParamsResponse): JsonSafe<MsgSetParamsResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgSetParamsResponse>): MsgSetParamsResponse {
    const message = createBaseMsgSetParamsResponse();
    return message;
  },
  fromAmino(_: MsgSetParamsResponseAmino): MsgSetParamsResponse {
    const message = createBaseMsgSetParamsResponse();
    return message;
  },
  toAmino(_: MsgSetParamsResponse): MsgSetParamsResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgSetParamsResponseAminoMsg): MsgSetParamsResponse {
    return MsgSetParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSetParamsResponseProtoMsg): MsgSetParamsResponse {
    return MsgSetParamsResponse.decode(message.value);
  },
  toProto(message: MsgSetParamsResponse): Uint8Array {
    return MsgSetParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSetParamsResponse): MsgSetParamsResponseProtoMsg {
    return {
      typeUrl: "/warden.gmp.MsgSetParamsResponse",
      value: MsgSetParamsResponse.encode(message).finish()
    };
  }
};
function createBaseMsgBridge(): MsgBridge {
  return {
    relayer: "",
    destinationChain: "",
    wardenContractAddress: "",
    destinationContractAddress: "",
    destinationContractCalldata: new Uint8Array(),
    token: Coin.fromPartial({})
  };
}
export const MsgBridge = {
  typeUrl: "/warden.gmp.MsgBridge",
  encode(message: MsgBridge, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.relayer !== "") {
      writer.uint32(10).string(message.relayer);
    }
    if (message.destinationChain !== "") {
      writer.uint32(18).string(message.destinationChain);
    }
    if (message.wardenContractAddress !== "") {
      writer.uint32(26).string(message.wardenContractAddress);
    }
    if (message.destinationContractAddress !== "") {
      writer.uint32(34).string(message.destinationContractAddress);
    }
    if (message.destinationContractCalldata.length !== 0) {
      writer.uint32(42).bytes(message.destinationContractCalldata);
    }
    if (message.token !== undefined) {
      Coin.encode(message.token, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgBridge {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBridge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.relayer = reader.string();
          break;
        case 2:
          message.destinationChain = reader.string();
          break;
        case 3:
          message.wardenContractAddress = reader.string();
          break;
        case 4:
          message.destinationContractAddress = reader.string();
          break;
        case 5:
          message.destinationContractCalldata = reader.bytes();
          break;
        case 6:
          message.token = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgBridge {
    return {
      relayer: isSet(object.relayer) ? String(object.relayer) : "",
      destinationChain: isSet(object.destinationChain) ? String(object.destinationChain) : "",
      wardenContractAddress: isSet(object.wardenContractAddress) ? String(object.wardenContractAddress) : "",
      destinationContractAddress: isSet(object.destinationContractAddress) ? String(object.destinationContractAddress) : "",
      destinationContractCalldata: isSet(object.destinationContractCalldata) ? bytesFromBase64(object.destinationContractCalldata) : new Uint8Array(),
      token: isSet(object.token) ? Coin.fromJSON(object.token) : undefined
    };
  },
  toJSON(message: MsgBridge): JsonSafe<MsgBridge> {
    const obj: any = {};
    message.relayer !== undefined && (obj.relayer = message.relayer);
    message.destinationChain !== undefined && (obj.destinationChain = message.destinationChain);
    message.wardenContractAddress !== undefined && (obj.wardenContractAddress = message.wardenContractAddress);
    message.destinationContractAddress !== undefined && (obj.destinationContractAddress = message.destinationContractAddress);
    message.destinationContractCalldata !== undefined && (obj.destinationContractCalldata = base64FromBytes(message.destinationContractCalldata !== undefined ? message.destinationContractCalldata : new Uint8Array()));
    message.token !== undefined && (obj.token = message.token ? Coin.toJSON(message.token) : undefined);
    return obj;
  },
  fromPartial(object: Partial<MsgBridge>): MsgBridge {
    const message = createBaseMsgBridge();
    message.relayer = object.relayer ?? "";
    message.destinationChain = object.destinationChain ?? "";
    message.wardenContractAddress = object.wardenContractAddress ?? "";
    message.destinationContractAddress = object.destinationContractAddress ?? "";
    message.destinationContractCalldata = object.destinationContractCalldata ?? new Uint8Array();
    message.token = object.token !== undefined && object.token !== null ? Coin.fromPartial(object.token) : undefined;
    return message;
  },
  fromAmino(object: MsgBridgeAmino): MsgBridge {
    const message = createBaseMsgBridge();
    if (object.relayer !== undefined && object.relayer !== null) {
      message.relayer = object.relayer;
    }
    if (object.destination_chain !== undefined && object.destination_chain !== null) {
      message.destinationChain = object.destination_chain;
    }
    if (object.warden_contract_address !== undefined && object.warden_contract_address !== null) {
      message.wardenContractAddress = object.warden_contract_address;
    }
    if (object.destination_contract_address !== undefined && object.destination_contract_address !== null) {
      message.destinationContractAddress = object.destination_contract_address;
    }
    if (object.destination_contract_calldata !== undefined && object.destination_contract_calldata !== null) {
      message.destinationContractCalldata = bytesFromBase64(object.destination_contract_calldata);
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = Coin.fromAmino(object.token);
    }
    return message;
  },
  toAmino(message: MsgBridge): MsgBridgeAmino {
    const obj: any = {};
    obj.relayer = message.relayer === "" ? undefined : message.relayer;
    obj.destination_chain = message.destinationChain === "" ? undefined : message.destinationChain;
    obj.warden_contract_address = message.wardenContractAddress === "" ? undefined : message.wardenContractAddress;
    obj.destination_contract_address = message.destinationContractAddress === "" ? undefined : message.destinationContractAddress;
    obj.destination_contract_calldata = message.destinationContractCalldata ? base64FromBytes(message.destinationContractCalldata) : undefined;
    obj.token = message.token ? Coin.toAmino(message.token) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgBridgeAminoMsg): MsgBridge {
    return MsgBridge.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBridgeProtoMsg): MsgBridge {
    return MsgBridge.decode(message.value);
  },
  toProto(message: MsgBridge): Uint8Array {
    return MsgBridge.encode(message).finish();
  },
  toProtoMsg(message: MsgBridge): MsgBridgeProtoMsg {
    return {
      typeUrl: "/warden.gmp.MsgBridge",
      value: MsgBridge.encode(message).finish()
    };
  }
};
function createBaseMsgBridgeResponse(): MsgBridgeResponse {
  return {};
}
export const MsgBridgeResponse = {
  typeUrl: "/warden.gmp.MsgBridgeResponse",
  encode(_: MsgBridgeResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgBridgeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBridgeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgBridgeResponse {
    return {};
  },
  toJSON(_: MsgBridgeResponse): JsonSafe<MsgBridgeResponse> {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: Partial<MsgBridgeResponse>): MsgBridgeResponse {
    const message = createBaseMsgBridgeResponse();
    return message;
  },
  fromAmino(_: MsgBridgeResponseAmino): MsgBridgeResponse {
    const message = createBaseMsgBridgeResponse();
    return message;
  },
  toAmino(_: MsgBridgeResponse): MsgBridgeResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgBridgeResponseAminoMsg): MsgBridgeResponse {
    return MsgBridgeResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBridgeResponseProtoMsg): MsgBridgeResponse {
    return MsgBridgeResponse.decode(message.value);
  },
  toProto(message: MsgBridgeResponse): Uint8Array {
    return MsgBridgeResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgBridgeResponse): MsgBridgeResponseProtoMsg {
    return {
      typeUrl: "/warden.gmp.MsgBridgeResponse",
      value: MsgBridgeResponse.encode(message).finish()
    };
  }
};