//@ts-nocheck
import { Coin, CoinAmino, CoinSDKType } from "../../base/v1beta1/coin.js";
<<<<<<< HEAD
<<<<<<< HEAD
import _m0 from "protobufjs/minimal.js";
=======
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { JsonSafe } from "../../../json-safe.js";
>>>>>>> a58636b3 (fixup! chore(wardenjs): regen)
=======
import { BinaryReader, BinaryWriter } from "../../../binary.js";
>>>>>>> 54cd4a0e (feat(wardenjs): use bigint instead of Long 3rd party implementation)
/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface SendAuthorization {
  $typeUrl?: "/cosmos.bank.v1beta1.SendAuthorization";
  spendLimit: Coin[];
}
export interface SendAuthorizationProtoMsg {
  typeUrl: "/cosmos.bank.v1beta1.SendAuthorization";
  value: Uint8Array;
}
/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface SendAuthorizationAmino {
  spend_limit?: CoinAmino[];
}
export interface SendAuthorizationAminoMsg {
  type: "cosmos-sdk/SendAuthorization";
  value: SendAuthorizationAmino;
}
/**
 * SendAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account.
 * 
 * Since: cosmos-sdk 0.43
 */
export interface SendAuthorizationSDKType {
  $typeUrl?: "/cosmos.bank.v1beta1.SendAuthorization";
  spend_limit: CoinSDKType[];
}
function createBaseSendAuthorization(): SendAuthorization {
  return {
    $typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
    spendLimit: []
  };
}
export const SendAuthorization = {
  typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
  encode(message: SendAuthorization, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.spendLimit) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SendAuthorization {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendAuthorization();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.spendLimit.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SendAuthorization {
    return {
      spendLimit: Array.isArray(object?.spendLimit) ? object.spendLimit.map((e: any) => Coin.fromJSON(e)) : []
    };
  },
  toJSON(message: SendAuthorization): JsonSafe<SendAuthorization> {
    const obj: any = {};
    if (message.spendLimit) {
      obj.spendLimit = message.spendLimit.map(e => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.spendLimit = [];
    }
    return obj;
  },
  fromPartial(object: Partial<SendAuthorization>): SendAuthorization {
    const message = createBaseSendAuthorization();
    message.spendLimit = object.spendLimit?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: SendAuthorizationAmino): SendAuthorization {
    const message = createBaseSendAuthorization();
    message.spendLimit = object.spend_limit?.map(e => Coin.fromAmino(e)) || [];
    return message;
  },
  toAmino(message: SendAuthorization): SendAuthorizationAmino {
    const obj: any = {};
    if (message.spendLimit) {
      obj.spend_limit = message.spendLimit.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.spend_limit = message.spendLimit;
    }
    return obj;
  },
  fromAminoMsg(object: SendAuthorizationAminoMsg): SendAuthorization {
    return SendAuthorization.fromAmino(object.value);
  },
  toAminoMsg(message: SendAuthorization): SendAuthorizationAminoMsg {
    return {
      type: "cosmos-sdk/SendAuthorization",
      value: SendAuthorization.toAmino(message)
    };
  },
  fromProtoMsg(message: SendAuthorizationProtoMsg): SendAuthorization {
    return SendAuthorization.decode(message.value);
  },
  toProto(message: SendAuthorization): Uint8Array {
    return SendAuthorization.encode(message).finish();
  },
  toProtoMsg(message: SendAuthorization): SendAuthorizationProtoMsg {
    return {
      typeUrl: "/cosmos.bank.v1beta1.SendAuthorization",
      value: SendAuthorization.encode(message).finish()
    };
  }
};