/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "tendermint.crypto";

export interface Proof {
  total: number;
  index: number;
  leafHash: Uint8Array;
  aunts: Uint8Array[];
}

export interface ValueOp {
  /** Encoded in ProofOp.Key. */
  key: Uint8Array;
  /** To encode in ProofOp.Data */
  proof: Proof | undefined;
}

export interface DominoOp {
  key: string;
  input: string;
  output: string;
}

/**
 * ProofOp defines an operation used for calculating Merkle root
 * The data could be arbitrary format, providing nessecary data
 * for example neighbouring node hash
 */
export interface ProofOp {
  type: string;
  key: Uint8Array;
  data: Uint8Array;
}

/** ProofOps is Merkle proof defined by the list of ProofOps */
export interface ProofOps {
  ops: ProofOp[];
}

function createBaseProof(): Proof {
  return { total: 0, index: 0, leafHash: new Uint8Array(0), aunts: [] };
}

export const Proof = {
  encode(message: Proof, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).int64(message.total);
    }
    if (message.index !== 0) {
      writer.uint32(16).int64(message.index);
    }
    if (message.leafHash.length !== 0) {
      writer.uint32(26).bytes(message.leafHash);
    }
    for (const v of message.aunts) {
      writer.uint32(34).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Proof {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProof();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.total = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.index = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.leafHash = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.aunts.push(reader.bytes());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Proof {
    return {
      total: isSet(object.total) ? Number(object.total) : 0,
      index: isSet(object.index) ? Number(object.index) : 0,
      leafHash: isSet(object.leafHash) ? bytesFromBase64(object.leafHash) : new Uint8Array(0),
      aunts: Array.isArray(object?.aunts) ? object.aunts.map((e: any) => bytesFromBase64(e)) : [],
    };
  },

  toJSON(message: Proof): unknown {
    const obj: any = {};
    if (message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    if (message.index !== 0) {
      obj.index = Math.round(message.index);
    }
    if (message.leafHash.length !== 0) {
      obj.leafHash = base64FromBytes(message.leafHash);
    }
    if (message.aunts?.length) {
      obj.aunts = message.aunts.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Proof>, I>>(base?: I): Proof {
    return Proof.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Proof>, I>>(object: I): Proof {
    const message = createBaseProof();
    message.total = object.total ?? 0;
    message.index = object.index ?? 0;
    message.leafHash = object.leafHash ?? new Uint8Array(0);
    message.aunts = object.aunts?.map((e) => e) || [];
    return message;
  },
};

function createBaseValueOp(): ValueOp {
  return { key: new Uint8Array(0), proof: undefined };
}

export const ValueOp = {
  encode(message: ValueOp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.proof !== undefined) {
      Proof.encode(message.proof, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValueOp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValueOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proof = Proof.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValueOp {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      proof: isSet(object.proof) ? Proof.fromJSON(object.proof) : undefined,
    };
  },

  toJSON(message: ValueOp): unknown {
    const obj: any = {};
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.proof !== undefined) {
      obj.proof = Proof.toJSON(message.proof);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValueOp>, I>>(base?: I): ValueOp {
    return ValueOp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValueOp>, I>>(object: I): ValueOp {
    const message = createBaseValueOp();
    message.key = object.key ?? new Uint8Array(0);
    message.proof = (object.proof !== undefined && object.proof !== null) ? Proof.fromPartial(object.proof) : undefined;
    return message;
  },
};

function createBaseDominoOp(): DominoOp {
  return { key: "", input: "", output: "" };
}

export const DominoOp = {
  encode(message: DominoOp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.input !== "") {
      writer.uint32(18).string(message.input);
    }
    if (message.output !== "") {
      writer.uint32(26).string(message.output);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DominoOp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDominoOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.input = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.output = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DominoOp {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      input: isSet(object.input) ? String(object.input) : "",
      output: isSet(object.output) ? String(object.output) : "",
    };
  },

  toJSON(message: DominoOp): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.input !== "") {
      obj.input = message.input;
    }
    if (message.output !== "") {
      obj.output = message.output;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DominoOp>, I>>(base?: I): DominoOp {
    return DominoOp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DominoOp>, I>>(object: I): DominoOp {
    const message = createBaseDominoOp();
    message.key = object.key ?? "";
    message.input = object.input ?? "";
    message.output = object.output ?? "";
    return message;
  },
};

function createBaseProofOp(): ProofOp {
  return { type: "", key: new Uint8Array(0), data: new Uint8Array(0) };
}

export const ProofOp = {
  encode(message: ProofOp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProofOp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.data = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProofOp {
    return {
      type: isSet(object.type) ? String(object.type) : "",
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
    };
  },

  toJSON(message: ProofOp): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProofOp>, I>>(base?: I): ProofOp {
    return ProofOp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProofOp>, I>>(object: I): ProofOp {
    const message = createBaseProofOp();
    message.type = object.type ?? "";
    message.key = object.key ?? new Uint8Array(0);
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

function createBaseProofOps(): ProofOps {
  return { ops: [] };
}

export const ProofOps = {
  encode(message: ProofOps, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ops) {
      ProofOp.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProofOps {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProofOps();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ops.push(ProofOp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProofOps {
    return { ops: Array.isArray(object?.ops) ? object.ops.map((e: any) => ProofOp.fromJSON(e)) : [] };
  },

  toJSON(message: ProofOps): unknown {
    const obj: any = {};
    if (message.ops?.length) {
      obj.ops = message.ops.map((e) => ProofOp.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProofOps>, I>>(base?: I): ProofOps {
    return ProofOps.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProofOps>, I>>(object: I): ProofOps {
    const message = createBaseProofOps();
    message.ops = object.ops?.map((e) => ProofOp.fromPartial(e)) || [];
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
