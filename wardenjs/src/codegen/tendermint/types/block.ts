//@ts-nocheck
import { Header, HeaderAmino, HeaderSDKType, Data, DataAmino, DataSDKType, Commit, CommitAmino, CommitSDKType } from "./types.js";
import { EvidenceList, EvidenceListAmino, EvidenceListSDKType } from "./evidence.js";
import { BinaryReader, BinaryWriter } from "../../binary.js";
import { isSet } from "../../helpers.js";
import { JsonSafe } from "../../json-safe.js";
export interface Block {
  header: Header;
  data: Data;
  evidence: EvidenceList;
  lastCommit?: Commit;
}
export interface BlockProtoMsg {
  typeUrl: "/tendermint.types.Block";
  value: Uint8Array;
}
export interface BlockAmino {
  header?: HeaderAmino;
  data?: DataAmino;
  evidence?: EvidenceListAmino;
  last_commit?: CommitAmino;
}
export interface BlockAminoMsg {
  type: "/tendermint.types.Block";
  value: BlockAmino;
}
export interface BlockSDKType {
  header: HeaderSDKType;
  data: DataSDKType;
  evidence: EvidenceListSDKType;
  last_commit?: CommitSDKType;
}
function createBaseBlock(): Block {
  return {
    header: Header.fromPartial({}),
    data: Data.fromPartial({}),
    evidence: EvidenceList.fromPartial({}),
    lastCommit: undefined
  };
}
export const Block = {
  typeUrl: "/tendermint.types.Block",
  encode(message: Block, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.header !== undefined) {
      Header.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    if (message.data !== undefined) {
      Data.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.evidence !== undefined) {
      EvidenceList.encode(message.evidence, writer.uint32(26).fork()).ldelim();
    }
    if (message.lastCommit !== undefined) {
      Commit.encode(message.lastCommit, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Block {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.header = Header.decode(reader, reader.uint32());
          break;
        case 2:
          message.data = Data.decode(reader, reader.uint32());
          break;
        case 3:
          message.evidence = EvidenceList.decode(reader, reader.uint32());
          break;
        case 4:
          message.lastCommit = Commit.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Block {
    return {
      header: isSet(object.header) ? Header.fromJSON(object.header) : undefined,
      data: isSet(object.data) ? Data.fromJSON(object.data) : undefined,
      evidence: isSet(object.evidence) ? EvidenceList.fromJSON(object.evidence) : undefined,
      lastCommit: isSet(object.lastCommit) ? Commit.fromJSON(object.lastCommit) : undefined
    };
  },
  toJSON(message: Block): JsonSafe<Block> {
    const obj: any = {};
    message.header !== undefined && (obj.header = message.header ? Header.toJSON(message.header) : undefined);
    message.data !== undefined && (obj.data = message.data ? Data.toJSON(message.data) : undefined);
    message.evidence !== undefined && (obj.evidence = message.evidence ? EvidenceList.toJSON(message.evidence) : undefined);
    message.lastCommit !== undefined && (obj.lastCommit = message.lastCommit ? Commit.toJSON(message.lastCommit) : undefined);
    return obj;
  },
  fromPartial(object: Partial<Block>): Block {
    const message = createBaseBlock();
    message.header = object.header !== undefined && object.header !== null ? Header.fromPartial(object.header) : undefined;
    message.data = object.data !== undefined && object.data !== null ? Data.fromPartial(object.data) : undefined;
    message.evidence = object.evidence !== undefined && object.evidence !== null ? EvidenceList.fromPartial(object.evidence) : undefined;
    message.lastCommit = object.lastCommit !== undefined && object.lastCommit !== null ? Commit.fromPartial(object.lastCommit) : undefined;
    return message;
  },
  fromAmino(object: BlockAmino): Block {
    const message = createBaseBlock();
    if (object.header !== undefined && object.header !== null) {
      message.header = Header.fromAmino(object.header);
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = Data.fromAmino(object.data);
    }
    if (object.evidence !== undefined && object.evidence !== null) {
      message.evidence = EvidenceList.fromAmino(object.evidence);
    }
    if (object.last_commit !== undefined && object.last_commit !== null) {
      message.lastCommit = Commit.fromAmino(object.last_commit);
    }
    return message;
  },
  toAmino(message: Block): BlockAmino {
    const obj: any = {};
    obj.header = message.header ? Header.toAmino(message.header) : undefined;
    obj.data = message.data ? Data.toAmino(message.data) : undefined;
    obj.evidence = message.evidence ? EvidenceList.toAmino(message.evidence) : undefined;
    obj.last_commit = message.lastCommit ? Commit.toAmino(message.lastCommit) : undefined;
    return obj;
  },
  fromAminoMsg(object: BlockAminoMsg): Block {
    return Block.fromAmino(object.value);
  },
  fromProtoMsg(message: BlockProtoMsg): Block {
    return Block.decode(message.value);
  },
  toProto(message: Block): Uint8Array {
    return Block.encode(message).finish();
  },
  toProtoMsg(message: Block): BlockProtoMsg {
    return {
      typeUrl: "/tendermint.types.Block",
      value: Block.encode(message).finish()
    };
  }
};