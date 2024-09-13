//@ts-nocheck
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** TxResult is the value stored in eth tx indexer */
export interface TxResult {
  /** height of the blockchain */
  height: bigint;
  /** tx_index of the cosmos transaction */
  txIndex: number;
  /** msg_index in a batch transaction */
  msgIndex: number;
  /**
   * eth_tx_index is the index in the list of valid eth tx in the block,
   * aka. the transaction list returned by eth_getBlock api.
   */
  ethTxIndex: number;
  /** failed is true if the eth transaction did not go succeed */
  failed: boolean;
  /**
   * gas_used by the transaction. If it exceeds the block gas limit,
   * it's set to gas limit, which is what's actually deducted by ante handler.
   */
  gasUsed: bigint;
  /**
   * cumulative_gas_used specifies the cumulated amount of gas used for all
   * processed messages within the current batch transaction.
   */
  cumulativeGasUsed: bigint;
}
export interface TxResultProtoMsg {
  typeUrl: "/ethermint.types.v1.TxResult";
  value: Uint8Array;
}
/** TxResult is the value stored in eth tx indexer */
export interface TxResultAmino {
  /** height of the blockchain */
  height?: string;
  /** tx_index of the cosmos transaction */
  tx_index?: number;
  /** msg_index in a batch transaction */
  msg_index?: number;
  /**
   * eth_tx_index is the index in the list of valid eth tx in the block,
   * aka. the transaction list returned by eth_getBlock api.
   */
  eth_tx_index?: number;
  /** failed is true if the eth transaction did not go succeed */
  failed?: boolean;
  /**
   * gas_used by the transaction. If it exceeds the block gas limit,
   * it's set to gas limit, which is what's actually deducted by ante handler.
   */
  gas_used?: string;
  /**
   * cumulative_gas_used specifies the cumulated amount of gas used for all
   * processed messages within the current batch transaction.
   */
  cumulative_gas_used?: string;
}
export interface TxResultAminoMsg {
  type: "/ethermint.types.v1.TxResult";
  value: TxResultAmino;
}
/** TxResult is the value stored in eth tx indexer */
export interface TxResultSDKType {
  height: bigint;
  tx_index: number;
  msg_index: number;
  eth_tx_index: number;
  failed: boolean;
  gas_used: bigint;
  cumulative_gas_used: bigint;
}
function createBaseTxResult(): TxResult {
  return {
    height: BigInt(0),
    txIndex: 0,
    msgIndex: 0,
    ethTxIndex: 0,
    failed: false,
    gasUsed: BigInt(0),
    cumulativeGasUsed: BigInt(0)
  };
}
export const TxResult = {
  typeUrl: "/ethermint.types.v1.TxResult",
  encode(message: TxResult, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.height !== BigInt(0)) {
      writer.uint32(8).int64(message.height);
    }
    if (message.txIndex !== 0) {
      writer.uint32(16).uint32(message.txIndex);
    }
    if (message.msgIndex !== 0) {
      writer.uint32(24).uint32(message.msgIndex);
    }
    if (message.ethTxIndex !== 0) {
      writer.uint32(32).int32(message.ethTxIndex);
    }
    if (message.failed === true) {
      writer.uint32(40).bool(message.failed);
    }
    if (message.gasUsed !== BigInt(0)) {
      writer.uint32(48).uint64(message.gasUsed);
    }
    if (message.cumulativeGasUsed !== BigInt(0)) {
      writer.uint32(56).uint64(message.cumulativeGasUsed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): TxResult {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTxResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int64();
          break;
        case 2:
          message.txIndex = reader.uint32();
          break;
        case 3:
          message.msgIndex = reader.uint32();
          break;
        case 4:
          message.ethTxIndex = reader.int32();
          break;
        case 5:
          message.failed = reader.bool();
          break;
        case 6:
          message.gasUsed = reader.uint64();
          break;
        case 7:
          message.cumulativeGasUsed = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TxResult {
    return {
      height: isSet(object.height) ? BigInt(object.height.toString()) : BigInt(0),
      txIndex: isSet(object.txIndex) ? Number(object.txIndex) : 0,
      msgIndex: isSet(object.msgIndex) ? Number(object.msgIndex) : 0,
      ethTxIndex: isSet(object.ethTxIndex) ? Number(object.ethTxIndex) : 0,
      failed: isSet(object.failed) ? Boolean(object.failed) : false,
      gasUsed: isSet(object.gasUsed) ? BigInt(object.gasUsed.toString()) : BigInt(0),
      cumulativeGasUsed: isSet(object.cumulativeGasUsed) ? BigInt(object.cumulativeGasUsed.toString()) : BigInt(0)
    };
  },
  toJSON(message: TxResult): JsonSafe<TxResult> {
    const obj: any = {};
    message.height !== undefined && (obj.height = (message.height || BigInt(0)).toString());
    message.txIndex !== undefined && (obj.txIndex = Math.round(message.txIndex));
    message.msgIndex !== undefined && (obj.msgIndex = Math.round(message.msgIndex));
    message.ethTxIndex !== undefined && (obj.ethTxIndex = Math.round(message.ethTxIndex));
    message.failed !== undefined && (obj.failed = message.failed);
    message.gasUsed !== undefined && (obj.gasUsed = (message.gasUsed || BigInt(0)).toString());
    message.cumulativeGasUsed !== undefined && (obj.cumulativeGasUsed = (message.cumulativeGasUsed || BigInt(0)).toString());
    return obj;
  },
  fromPartial(object: Partial<TxResult>): TxResult {
    const message = createBaseTxResult();
    message.height = object.height !== undefined && object.height !== null ? BigInt(object.height.toString()) : BigInt(0);
    message.txIndex = object.txIndex ?? 0;
    message.msgIndex = object.msgIndex ?? 0;
    message.ethTxIndex = object.ethTxIndex ?? 0;
    message.failed = object.failed ?? false;
    message.gasUsed = object.gasUsed !== undefined && object.gasUsed !== null ? BigInt(object.gasUsed.toString()) : BigInt(0);
    message.cumulativeGasUsed = object.cumulativeGasUsed !== undefined && object.cumulativeGasUsed !== null ? BigInt(object.cumulativeGasUsed.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: TxResultAmino): TxResult {
    const message = createBaseTxResult();
    if (object.height !== undefined && object.height !== null) {
      message.height = BigInt(object.height);
    }
    if (object.tx_index !== undefined && object.tx_index !== null) {
      message.txIndex = object.tx_index;
    }
    if (object.msg_index !== undefined && object.msg_index !== null) {
      message.msgIndex = object.msg_index;
    }
    if (object.eth_tx_index !== undefined && object.eth_tx_index !== null) {
      message.ethTxIndex = object.eth_tx_index;
    }
    if (object.failed !== undefined && object.failed !== null) {
      message.failed = object.failed;
    }
    if (object.gas_used !== undefined && object.gas_used !== null) {
      message.gasUsed = BigInt(object.gas_used);
    }
    if (object.cumulative_gas_used !== undefined && object.cumulative_gas_used !== null) {
      message.cumulativeGasUsed = BigInt(object.cumulative_gas_used);
    }
    return message;
  },
  toAmino(message: TxResult): TxResultAmino {
    const obj: any = {};
    obj.height = message.height !== BigInt(0) ? (message.height?.toString)() : undefined;
    obj.tx_index = message.txIndex === 0 ? undefined : message.txIndex;
    obj.msg_index = message.msgIndex === 0 ? undefined : message.msgIndex;
    obj.eth_tx_index = message.ethTxIndex === 0 ? undefined : message.ethTxIndex;
    obj.failed = message.failed === false ? undefined : message.failed;
    obj.gas_used = message.gasUsed !== BigInt(0) ? (message.gasUsed?.toString)() : undefined;
    obj.cumulative_gas_used = message.cumulativeGasUsed !== BigInt(0) ? (message.cumulativeGasUsed?.toString)() : undefined;
    return obj;
  },
  fromAminoMsg(object: TxResultAminoMsg): TxResult {
    return TxResult.fromAmino(object.value);
  },
  fromProtoMsg(message: TxResultProtoMsg): TxResult {
    return TxResult.decode(message.value);
  },
  toProto(message: TxResult): Uint8Array {
    return TxResult.encode(message).finish();
  },
  toProtoMsg(message: TxResult): TxResultProtoMsg {
    return {
      typeUrl: "/ethermint.types.v1.TxResult",
      value: TxResult.encode(message).finish()
    };
  }
};