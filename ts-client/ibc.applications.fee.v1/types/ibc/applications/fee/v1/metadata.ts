/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "ibc.applications.fee.v1";

/**
 * Metadata defines the ICS29 channel specific metadata encoded into the channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
export interface Metadata {
  /** fee_version defines the ICS29 fee version */
  feeVersion: string;
  /** app_version defines the underlying application version, which may or may not be a JSON encoded bytestring */
  appVersion: string;
}

function createBaseMetadata(): Metadata {
  return { feeVersion: "", appVersion: "" };
}

export const Metadata = {
  encode(message: Metadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.feeVersion !== "") {
      writer.uint32(10).string(message.feeVersion);
    }
    if (message.appVersion !== "") {
      writer.uint32(18).string(message.appVersion);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Metadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.feeVersion = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.appVersion = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Metadata {
    return {
      feeVersion: isSet(object.feeVersion) ? String(object.feeVersion) : "",
      appVersion: isSet(object.appVersion) ? String(object.appVersion) : "",
    };
  },

  toJSON(message: Metadata): unknown {
    const obj: any = {};
    if (message.feeVersion !== "") {
      obj.feeVersion = message.feeVersion;
    }
    if (message.appVersion !== "") {
      obj.appVersion = message.appVersion;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Metadata>, I>>(base?: I): Metadata {
    return Metadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Metadata>, I>>(object: I): Metadata {
    const message = createBaseMetadata();
    message.feeVersion = object.feeVersion ?? "";
    message.appVersion = object.appVersion ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
