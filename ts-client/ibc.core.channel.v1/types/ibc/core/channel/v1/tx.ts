/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Height } from "../../client/v1/client";
import { Channel, Packet, Params, State, stateFromJSON, stateToJSON } from "./channel";
import { ErrorReceipt, Upgrade, UpgradeFields } from "./upgrade";

export const protobufPackage = "ibc.core.channel.v1";

/** ResponseResultType defines the possible outcomes of the execution of a message */
export enum ResponseResultType {
  /** RESPONSE_RESULT_TYPE_UNSPECIFIED - Default zero value enumeration */
  RESPONSE_RESULT_TYPE_UNSPECIFIED = 0,
  /** RESPONSE_RESULT_TYPE_NOOP - The message did not call the IBC application callbacks (because, for example, the packet had already been relayed) */
  RESPONSE_RESULT_TYPE_NOOP = 1,
  /** RESPONSE_RESULT_TYPE_SUCCESS - The message was executed successfully */
  RESPONSE_RESULT_TYPE_SUCCESS = 2,
  /** RESPONSE_RESULT_TYPE_FAILURE - The message was executed unsuccessfully */
  RESPONSE_RESULT_TYPE_FAILURE = 3,
  UNRECOGNIZED = -1,
}

export function responseResultTypeFromJSON(object: any): ResponseResultType {
  switch (object) {
    case 0:
    case "RESPONSE_RESULT_TYPE_UNSPECIFIED":
      return ResponseResultType.RESPONSE_RESULT_TYPE_UNSPECIFIED;
    case 1:
    case "RESPONSE_RESULT_TYPE_NOOP":
      return ResponseResultType.RESPONSE_RESULT_TYPE_NOOP;
    case 2:
    case "RESPONSE_RESULT_TYPE_SUCCESS":
      return ResponseResultType.RESPONSE_RESULT_TYPE_SUCCESS;
    case 3:
    case "RESPONSE_RESULT_TYPE_FAILURE":
      return ResponseResultType.RESPONSE_RESULT_TYPE_FAILURE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ResponseResultType.UNRECOGNIZED;
  }
}

export function responseResultTypeToJSON(object: ResponseResultType): string {
  switch (object) {
    case ResponseResultType.RESPONSE_RESULT_TYPE_UNSPECIFIED:
      return "RESPONSE_RESULT_TYPE_UNSPECIFIED";
    case ResponseResultType.RESPONSE_RESULT_TYPE_NOOP:
      return "RESPONSE_RESULT_TYPE_NOOP";
    case ResponseResultType.RESPONSE_RESULT_TYPE_SUCCESS:
      return "RESPONSE_RESULT_TYPE_SUCCESS";
    case ResponseResultType.RESPONSE_RESULT_TYPE_FAILURE:
      return "RESPONSE_RESULT_TYPE_FAILURE";
    case ResponseResultType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It
 * is called by a relayer on Chain A.
 */
export interface MsgChannelOpenInit {
  portId: string;
  channel: Channel | undefined;
  signer: string;
}

/** MsgChannelOpenInitResponse defines the Msg/ChannelOpenInit response type. */
export interface MsgChannelOpenInitResponse {
  channelId: string;
  version: string;
}

/**
 * MsgChannelOpenInit defines a msg sent by a Relayer to try to open a channel
 * on Chain B. The version field within the Channel field has been deprecated. Its
 * value will be ignored by core IBC.
 */
export interface MsgChannelOpenTry {
  portId: string;
  /**
   * Deprecated: this field is unused. Crossing hello's are no longer supported in core IBC.
   *
   * @deprecated
   */
  previousChannelId: string;
  /** NOTE: the version field within the channel has been deprecated. Its value will be ignored by core IBC. */
  channel: Channel | undefined;
  counterpartyVersion: string;
  proofInit: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/** MsgChannelOpenTryResponse defines the Msg/ChannelOpenTry response type. */
export interface MsgChannelOpenTryResponse {
  version: string;
  channelId: string;
}

/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge
 * the change of channel state to TRYOPEN on Chain B.
 * WARNING: a channel upgrade MUST NOT initialize an upgrade for this channel
 * in the same block as executing this message otherwise the counterparty will
 * be incapable of opening.
 */
export interface MsgChannelOpenAck {
  portId: string;
  channelId: string;
  counterpartyChannelId: string;
  counterpartyVersion: string;
  proofTry: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/** MsgChannelOpenAckResponse defines the Msg/ChannelOpenAck response type. */
export interface MsgChannelOpenAckResponse {
}

/**
 * MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of channel state to OPEN on Chain A.
 */
export interface MsgChannelOpenConfirm {
  portId: string;
  channelId: string;
  proofAck: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/**
 * MsgChannelOpenConfirmResponse defines the Msg/ChannelOpenConfirm response
 * type.
 */
export interface MsgChannelOpenConfirmResponse {
}

/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A
 * to close a channel with Chain B.
 */
export interface MsgChannelCloseInit {
  portId: string;
  channelId: string;
  signer: string;
}

/** MsgChannelCloseInitResponse defines the Msg/ChannelCloseInit response type. */
export interface MsgChannelCloseInitResponse {
}

/**
 * MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B
 * to acknowledge the change of channel state to CLOSED on Chain A.
 */
export interface MsgChannelCloseConfirm {
  portId: string;
  channelId: string;
  proofInit: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
  counterpartyUpgradeSequence: number;
}

/**
 * MsgChannelCloseConfirmResponse defines the Msg/ChannelCloseConfirm response
 * type.
 */
export interface MsgChannelCloseConfirmResponse {
}

/** MsgRecvPacket receives incoming IBC packet */
export interface MsgRecvPacket {
  packet: Packet | undefined;
  proofCommitment: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/** MsgRecvPacketResponse defines the Msg/RecvPacket response type. */
export interface MsgRecvPacketResponse {
  result: ResponseResultType;
}

/** MsgTimeout receives timed-out packet */
export interface MsgTimeout {
  packet: Packet | undefined;
  proofUnreceived: Uint8Array;
  proofHeight: Height | undefined;
  nextSequenceRecv: number;
  signer: string;
}

/** MsgTimeoutResponse defines the Msg/Timeout response type. */
export interface MsgTimeoutResponse {
  result: ResponseResultType;
}

/** MsgTimeoutOnClose timed-out packet upon counterparty channel closure. */
export interface MsgTimeoutOnClose {
  packet: Packet | undefined;
  proofUnreceived: Uint8Array;
  proofClose: Uint8Array;
  proofHeight: Height | undefined;
  nextSequenceRecv: number;
  signer: string;
  counterpartyUpgradeSequence: number;
}

/** MsgTimeoutOnCloseResponse defines the Msg/TimeoutOnClose response type. */
export interface MsgTimeoutOnCloseResponse {
  result: ResponseResultType;
}

/** MsgAcknowledgement receives incoming IBC acknowledgement */
export interface MsgAcknowledgement {
  packet: Packet | undefined;
  acknowledgement: Uint8Array;
  proofAcked: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/** MsgAcknowledgementResponse defines the Msg/Acknowledgement response type. */
export interface MsgAcknowledgementResponse {
  result: ResponseResultType;
}

/**
 * MsgChannelUpgradeInit defines the request type for the ChannelUpgradeInit rpc
 * WARNING: Initializing a channel upgrade in the same block as opening the channel
 * may result in the counterparty being incapable of opening.
 */
export interface MsgChannelUpgradeInit {
  portId: string;
  channelId: string;
  fields: UpgradeFields | undefined;
  signer: string;
}

/** MsgChannelUpgradeInitResponse defines the MsgChannelUpgradeInit response type */
export interface MsgChannelUpgradeInitResponse {
  upgrade: Upgrade | undefined;
  upgradeSequence: number;
}

/** MsgChannelUpgradeTry defines the request type for the ChannelUpgradeTry rpc */
export interface MsgChannelUpgradeTry {
  portId: string;
  channelId: string;
  proposedUpgradeConnectionHops: string[];
  counterpartyUpgradeFields: UpgradeFields | undefined;
  counterpartyUpgradeSequence: number;
  proofChannel: Uint8Array;
  proofUpgrade: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/** MsgChannelUpgradeTryResponse defines the MsgChannelUpgradeTry response type */
export interface MsgChannelUpgradeTryResponse {
  upgrade: Upgrade | undefined;
  upgradeSequence: number;
  result: ResponseResultType;
}

/** MsgChannelUpgradeAck defines the request type for the ChannelUpgradeAck rpc */
export interface MsgChannelUpgradeAck {
  portId: string;
  channelId: string;
  counterpartyUpgrade: Upgrade | undefined;
  proofChannel: Uint8Array;
  proofUpgrade: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/** MsgChannelUpgradeAckResponse defines MsgChannelUpgradeAck response type */
export interface MsgChannelUpgradeAckResponse {
  result: ResponseResultType;
}

/** MsgChannelUpgradeConfirm defines the request type for the ChannelUpgradeConfirm rpc */
export interface MsgChannelUpgradeConfirm {
  portId: string;
  channelId: string;
  counterpartyChannelState: State;
  counterpartyUpgrade: Upgrade | undefined;
  proofChannel: Uint8Array;
  proofUpgrade: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/** MsgChannelUpgradeConfirmResponse defines MsgChannelUpgradeConfirm response type */
export interface MsgChannelUpgradeConfirmResponse {
  result: ResponseResultType;
}

/** MsgChannelUpgradeOpen defines the request type for the ChannelUpgradeOpen rpc */
export interface MsgChannelUpgradeOpen {
  portId: string;
  channelId: string;
  counterpartyChannelState: State;
  counterpartyUpgradeSequence: number;
  proofChannel: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/** MsgChannelUpgradeOpenResponse defines the MsgChannelUpgradeOpen response type */
export interface MsgChannelUpgradeOpenResponse {
}

/** MsgChannelUpgradeTimeout defines the request type for the ChannelUpgradeTimeout rpc */
export interface MsgChannelUpgradeTimeout {
  portId: string;
  channelId: string;
  counterpartyChannel: Channel | undefined;
  proofChannel: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/** MsgChannelUpgradeTimeoutRepsonse defines the MsgChannelUpgradeTimeout response type */
export interface MsgChannelUpgradeTimeoutResponse {
}

/** MsgChannelUpgradeCancel defines the request type for the ChannelUpgradeCancel rpc */
export interface MsgChannelUpgradeCancel {
  portId: string;
  channelId: string;
  errorReceipt: ErrorReceipt | undefined;
  proofErrorReceipt: Uint8Array;
  proofHeight: Height | undefined;
  signer: string;
}

/** MsgChannelUpgradeCancelResponse defines the MsgChannelUpgradeCancel response type */
export interface MsgChannelUpgradeCancelResponse {
}

/** MsgUpdateParams is the MsgUpdateParams request type. */
export interface MsgUpdateParams {
  /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
  authority: string;
  /**
   * params defines the channel parameters to update.
   *
   * NOTE: All parameters must be supplied.
   */
  params: Params | undefined;
}

/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponse {
}

/** MsgPruneAcknowledgements defines the request type for the PruneAcknowledgements rpc. */
export interface MsgPruneAcknowledgements {
  portId: string;
  channelId: string;
  limit: number;
  signer: string;
}

/** MsgPruneAcknowledgementsResponse defines the response type for the PruneAcknowledgements rpc. */
export interface MsgPruneAcknowledgementsResponse {
  /** Number of sequences pruned (includes both packet acknowledgements and packet receipts where appropriate). */
  totalPrunedSequences: number;
  /** Number of sequences left after pruning. */
  totalRemainingSequences: number;
}

function createBaseMsgChannelOpenInit(): MsgChannelOpenInit {
  return { portId: "", channel: undefined, signer: "" };
}

export const MsgChannelOpenInit = {
  encode(message: MsgChannelOpenInit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenInit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channel = Channel.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenInit {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelOpenInit): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channel !== undefined) {
      obj.channel = Channel.toJSON(message.channel);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelOpenInit>, I>>(base?: I): MsgChannelOpenInit {
    return MsgChannelOpenInit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenInit>, I>>(object: I): MsgChannelOpenInit {
    const message = createBaseMsgChannelOpenInit();
    message.portId = object.portId ?? "";
    message.channel = (object.channel !== undefined && object.channel !== null)
      ? Channel.fromPartial(object.channel)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenInitResponse(): MsgChannelOpenInitResponse {
  return { channelId: "", version: "" };
}

export const MsgChannelOpenInitResponse = {
  encode(message: MsgChannelOpenInitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenInitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenInitResponse {
    return {
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: MsgChannelOpenInitResponse): unknown {
    const obj: any = {};
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.version !== "") {
      obj.version = message.version;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelOpenInitResponse>, I>>(base?: I): MsgChannelOpenInitResponse {
    return MsgChannelOpenInitResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenInitResponse>, I>>(object: I): MsgChannelOpenInitResponse {
    const message = createBaseMsgChannelOpenInitResponse();
    message.channelId = object.channelId ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenTry(): MsgChannelOpenTry {
  return {
    portId: "",
    previousChannelId: "",
    channel: undefined,
    counterpartyVersion: "",
    proofInit: new Uint8Array(0),
    proofHeight: undefined,
    signer: "",
  };
}

export const MsgChannelOpenTry = {
  encode(message: MsgChannelOpenTry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.previousChannelId !== "") {
      writer.uint32(18).string(message.previousChannelId);
    }
    if (message.channel !== undefined) {
      Channel.encode(message.channel, writer.uint32(26).fork()).ldelim();
    }
    if (message.counterpartyVersion !== "") {
      writer.uint32(34).string(message.counterpartyVersion);
    }
    if (message.proofInit.length !== 0) {
      writer.uint32(42).bytes(message.proofInit);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenTry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenTry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.previousChannelId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.channel = Channel.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.counterpartyVersion = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proofInit = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenTry {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      previousChannelId: isSet(object.previousChannelId) ? String(object.previousChannelId) : "",
      channel: isSet(object.channel) ? Channel.fromJSON(object.channel) : undefined,
      counterpartyVersion: isSet(object.counterpartyVersion) ? String(object.counterpartyVersion) : "",
      proofInit: isSet(object.proofInit) ? bytesFromBase64(object.proofInit) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelOpenTry): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.previousChannelId !== "") {
      obj.previousChannelId = message.previousChannelId;
    }
    if (message.channel !== undefined) {
      obj.channel = Channel.toJSON(message.channel);
    }
    if (message.counterpartyVersion !== "") {
      obj.counterpartyVersion = message.counterpartyVersion;
    }
    if (message.proofInit.length !== 0) {
      obj.proofInit = base64FromBytes(message.proofInit);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelOpenTry>, I>>(base?: I): MsgChannelOpenTry {
    return MsgChannelOpenTry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenTry>, I>>(object: I): MsgChannelOpenTry {
    const message = createBaseMsgChannelOpenTry();
    message.portId = object.portId ?? "";
    message.previousChannelId = object.previousChannelId ?? "";
    message.channel = (object.channel !== undefined && object.channel !== null)
      ? Channel.fromPartial(object.channel)
      : undefined;
    message.counterpartyVersion = object.counterpartyVersion ?? "";
    message.proofInit = object.proofInit ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenTryResponse(): MsgChannelOpenTryResponse {
  return { version: "", channelId: "" };
}

export const MsgChannelOpenTryResponse = {
  encode(message: MsgChannelOpenTryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenTryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenTryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.version = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenTryResponse {
    return {
      version: isSet(object.version) ? String(object.version) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
    };
  },

  toJSON(message: MsgChannelOpenTryResponse): unknown {
    const obj: any = {};
    if (message.version !== "") {
      obj.version = message.version;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelOpenTryResponse>, I>>(base?: I): MsgChannelOpenTryResponse {
    return MsgChannelOpenTryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenTryResponse>, I>>(object: I): MsgChannelOpenTryResponse {
    const message = createBaseMsgChannelOpenTryResponse();
    message.version = object.version ?? "";
    message.channelId = object.channelId ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenAck(): MsgChannelOpenAck {
  return {
    portId: "",
    channelId: "",
    counterpartyChannelId: "",
    counterpartyVersion: "",
    proofTry: new Uint8Array(0),
    proofHeight: undefined,
    signer: "",
  };
}

export const MsgChannelOpenAck = {
  encode(message: MsgChannelOpenAck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.counterpartyChannelId !== "") {
      writer.uint32(26).string(message.counterpartyChannelId);
    }
    if (message.counterpartyVersion !== "") {
      writer.uint32(34).string(message.counterpartyVersion);
    }
    if (message.proofTry.length !== 0) {
      writer.uint32(42).bytes(message.proofTry);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenAck {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.counterpartyChannelId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.counterpartyVersion = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proofTry = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenAck {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      counterpartyChannelId: isSet(object.counterpartyChannelId) ? String(object.counterpartyChannelId) : "",
      counterpartyVersion: isSet(object.counterpartyVersion) ? String(object.counterpartyVersion) : "",
      proofTry: isSet(object.proofTry) ? bytesFromBase64(object.proofTry) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelOpenAck): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.counterpartyChannelId !== "") {
      obj.counterpartyChannelId = message.counterpartyChannelId;
    }
    if (message.counterpartyVersion !== "") {
      obj.counterpartyVersion = message.counterpartyVersion;
    }
    if (message.proofTry.length !== 0) {
      obj.proofTry = base64FromBytes(message.proofTry);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelOpenAck>, I>>(base?: I): MsgChannelOpenAck {
    return MsgChannelOpenAck.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenAck>, I>>(object: I): MsgChannelOpenAck {
    const message = createBaseMsgChannelOpenAck();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.counterpartyChannelId = object.counterpartyChannelId ?? "";
    message.counterpartyVersion = object.counterpartyVersion ?? "";
    message.proofTry = object.proofTry ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenAckResponse(): MsgChannelOpenAckResponse {
  return {};
}

export const MsgChannelOpenAckResponse = {
  encode(_: MsgChannelOpenAckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenAckResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenAckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgChannelOpenAckResponse {
    return {};
  },

  toJSON(_: MsgChannelOpenAckResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelOpenAckResponse>, I>>(base?: I): MsgChannelOpenAckResponse {
    return MsgChannelOpenAckResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenAckResponse>, I>>(_: I): MsgChannelOpenAckResponse {
    const message = createBaseMsgChannelOpenAckResponse();
    return message;
  },
};

function createBaseMsgChannelOpenConfirm(): MsgChannelOpenConfirm {
  return { portId: "", channelId: "", proofAck: new Uint8Array(0), proofHeight: undefined, signer: "" };
}

export const MsgChannelOpenConfirm = {
  encode(message: MsgChannelOpenConfirm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.proofAck.length !== 0) {
      writer.uint32(26).bytes(message.proofAck);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenConfirm {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenConfirm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proofAck = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelOpenConfirm {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      proofAck: isSet(object.proofAck) ? bytesFromBase64(object.proofAck) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelOpenConfirm): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.proofAck.length !== 0) {
      obj.proofAck = base64FromBytes(message.proofAck);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelOpenConfirm>, I>>(base?: I): MsgChannelOpenConfirm {
    return MsgChannelOpenConfirm.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenConfirm>, I>>(object: I): MsgChannelOpenConfirm {
    const message = createBaseMsgChannelOpenConfirm();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.proofAck = object.proofAck ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelOpenConfirmResponse(): MsgChannelOpenConfirmResponse {
  return {};
}

export const MsgChannelOpenConfirmResponse = {
  encode(_: MsgChannelOpenConfirmResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelOpenConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelOpenConfirmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgChannelOpenConfirmResponse {
    return {};
  },

  toJSON(_: MsgChannelOpenConfirmResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelOpenConfirmResponse>, I>>(base?: I): MsgChannelOpenConfirmResponse {
    return MsgChannelOpenConfirmResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelOpenConfirmResponse>, I>>(_: I): MsgChannelOpenConfirmResponse {
    const message = createBaseMsgChannelOpenConfirmResponse();
    return message;
  },
};

function createBaseMsgChannelCloseInit(): MsgChannelCloseInit {
  return { portId: "", channelId: "", signer: "" };
}

export const MsgChannelCloseInit = {
  encode(message: MsgChannelCloseInit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.signer !== "") {
      writer.uint32(26).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseInit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelCloseInit {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelCloseInit): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelCloseInit>, I>>(base?: I): MsgChannelCloseInit {
    return MsgChannelCloseInit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelCloseInit>, I>>(object: I): MsgChannelCloseInit {
    const message = createBaseMsgChannelCloseInit();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelCloseInitResponse(): MsgChannelCloseInitResponse {
  return {};
}

export const MsgChannelCloseInitResponse = {
  encode(_: MsgChannelCloseInitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseInitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgChannelCloseInitResponse {
    return {};
  },

  toJSON(_: MsgChannelCloseInitResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelCloseInitResponse>, I>>(base?: I): MsgChannelCloseInitResponse {
    return MsgChannelCloseInitResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelCloseInitResponse>, I>>(_: I): MsgChannelCloseInitResponse {
    const message = createBaseMsgChannelCloseInitResponse();
    return message;
  },
};

function createBaseMsgChannelCloseConfirm(): MsgChannelCloseConfirm {
  return {
    portId: "",
    channelId: "",
    proofInit: new Uint8Array(0),
    proofHeight: undefined,
    signer: "",
    counterpartyUpgradeSequence: 0,
  };
}

export const MsgChannelCloseConfirm = {
  encode(message: MsgChannelCloseConfirm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.proofInit.length !== 0) {
      writer.uint32(26).bytes(message.proofInit);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    if (message.counterpartyUpgradeSequence !== 0) {
      writer.uint32(48).uint64(message.counterpartyUpgradeSequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseConfirm {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseConfirm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proofInit = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.counterpartyUpgradeSequence = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelCloseConfirm {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      proofInit: isSet(object.proofInit) ? bytesFromBase64(object.proofInit) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
      counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence)
        ? Number(object.counterpartyUpgradeSequence)
        : 0,
    };
  },

  toJSON(message: MsgChannelCloseConfirm): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.proofInit.length !== 0) {
      obj.proofInit = base64FromBytes(message.proofInit);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.counterpartyUpgradeSequence !== 0) {
      obj.counterpartyUpgradeSequence = Math.round(message.counterpartyUpgradeSequence);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelCloseConfirm>, I>>(base?: I): MsgChannelCloseConfirm {
    return MsgChannelCloseConfirm.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelCloseConfirm>, I>>(object: I): MsgChannelCloseConfirm {
    const message = createBaseMsgChannelCloseConfirm();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.proofInit = object.proofInit ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence ?? 0;
    return message;
  },
};

function createBaseMsgChannelCloseConfirmResponse(): MsgChannelCloseConfirmResponse {
  return {};
}

export const MsgChannelCloseConfirmResponse = {
  encode(_: MsgChannelCloseConfirmResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelCloseConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelCloseConfirmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgChannelCloseConfirmResponse {
    return {};
  },

  toJSON(_: MsgChannelCloseConfirmResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelCloseConfirmResponse>, I>>(base?: I): MsgChannelCloseConfirmResponse {
    return MsgChannelCloseConfirmResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelCloseConfirmResponse>, I>>(_: I): MsgChannelCloseConfirmResponse {
    const message = createBaseMsgChannelCloseConfirmResponse();
    return message;
  },
};

function createBaseMsgRecvPacket(): MsgRecvPacket {
  return { packet: undefined, proofCommitment: new Uint8Array(0), proofHeight: undefined, signer: "" };
}

export const MsgRecvPacket = {
  encode(message: MsgRecvPacket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.proofCommitment.length !== 0) {
      writer.uint32(18).bytes(message.proofCommitment);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecvPacket {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecvPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packet = Packet.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proofCommitment = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRecvPacket {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      proofCommitment: isSet(object.proofCommitment) ? bytesFromBase64(object.proofCommitment) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgRecvPacket): unknown {
    const obj: any = {};
    if (message.packet !== undefined) {
      obj.packet = Packet.toJSON(message.packet);
    }
    if (message.proofCommitment.length !== 0) {
      obj.proofCommitment = base64FromBytes(message.proofCommitment);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRecvPacket>, I>>(base?: I): MsgRecvPacket {
    return MsgRecvPacket.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRecvPacket>, I>>(object: I): MsgRecvPacket {
    const message = createBaseMsgRecvPacket();
    message.packet = (object.packet !== undefined && object.packet !== null)
      ? Packet.fromPartial(object.packet)
      : undefined;
    message.proofCommitment = object.proofCommitment ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgRecvPacketResponse(): MsgRecvPacketResponse {
  return { result: 0 };
}

export const MsgRecvPacketResponse = {
  encode(message: MsgRecvPacketResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRecvPacketResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRecvPacketResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRecvPacketResponse {
    return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
  },

  toJSON(message: MsgRecvPacketResponse): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = responseResultTypeToJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRecvPacketResponse>, I>>(base?: I): MsgRecvPacketResponse {
    return MsgRecvPacketResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRecvPacketResponse>, I>>(object: I): MsgRecvPacketResponse {
    const message = createBaseMsgRecvPacketResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgTimeout(): MsgTimeout {
  return {
    packet: undefined,
    proofUnreceived: new Uint8Array(0),
    proofHeight: undefined,
    nextSequenceRecv: 0,
    signer: "",
  };
}

export const MsgTimeout = {
  encode(message: MsgTimeout, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.proofUnreceived.length !== 0) {
      writer.uint32(18).bytes(message.proofUnreceived);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    if (message.nextSequenceRecv !== 0) {
      writer.uint32(32).uint64(message.nextSequenceRecv);
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeout {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeout();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packet = Packet.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proofUnreceived = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.nextSequenceRecv = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTimeout {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      proofUnreceived: isSet(object.proofUnreceived) ? bytesFromBase64(object.proofUnreceived) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      nextSequenceRecv: isSet(object.nextSequenceRecv) ? Number(object.nextSequenceRecv) : 0,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgTimeout): unknown {
    const obj: any = {};
    if (message.packet !== undefined) {
      obj.packet = Packet.toJSON(message.packet);
    }
    if (message.proofUnreceived.length !== 0) {
      obj.proofUnreceived = base64FromBytes(message.proofUnreceived);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.nextSequenceRecv !== 0) {
      obj.nextSequenceRecv = Math.round(message.nextSequenceRecv);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTimeout>, I>>(base?: I): MsgTimeout {
    return MsgTimeout.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTimeout>, I>>(object: I): MsgTimeout {
    const message = createBaseMsgTimeout();
    message.packet = (object.packet !== undefined && object.packet !== null)
      ? Packet.fromPartial(object.packet)
      : undefined;
    message.proofUnreceived = object.proofUnreceived ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.nextSequenceRecv = object.nextSequenceRecv ?? 0;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgTimeoutResponse(): MsgTimeoutResponse {
  return { result: 0 };
}

export const MsgTimeoutResponse = {
  encode(message: MsgTimeoutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeoutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTimeoutResponse {
    return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
  },

  toJSON(message: MsgTimeoutResponse): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = responseResultTypeToJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTimeoutResponse>, I>>(base?: I): MsgTimeoutResponse {
    return MsgTimeoutResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTimeoutResponse>, I>>(object: I): MsgTimeoutResponse {
    const message = createBaseMsgTimeoutResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgTimeoutOnClose(): MsgTimeoutOnClose {
  return {
    packet: undefined,
    proofUnreceived: new Uint8Array(0),
    proofClose: new Uint8Array(0),
    proofHeight: undefined,
    nextSequenceRecv: 0,
    signer: "",
    counterpartyUpgradeSequence: 0,
  };
}

export const MsgTimeoutOnClose = {
  encode(message: MsgTimeoutOnClose, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.proofUnreceived.length !== 0) {
      writer.uint32(18).bytes(message.proofUnreceived);
    }
    if (message.proofClose.length !== 0) {
      writer.uint32(26).bytes(message.proofClose);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
    }
    if (message.nextSequenceRecv !== 0) {
      writer.uint32(40).uint64(message.nextSequenceRecv);
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    if (message.counterpartyUpgradeSequence !== 0) {
      writer.uint32(56).uint64(message.counterpartyUpgradeSequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutOnClose {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeoutOnClose();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packet = Packet.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.proofUnreceived = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proofClose = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.nextSequenceRecv = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.signer = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.counterpartyUpgradeSequence = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTimeoutOnClose {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      proofUnreceived: isSet(object.proofUnreceived) ? bytesFromBase64(object.proofUnreceived) : new Uint8Array(0),
      proofClose: isSet(object.proofClose) ? bytesFromBase64(object.proofClose) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      nextSequenceRecv: isSet(object.nextSequenceRecv) ? Number(object.nextSequenceRecv) : 0,
      signer: isSet(object.signer) ? String(object.signer) : "",
      counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence)
        ? Number(object.counterpartyUpgradeSequence)
        : 0,
    };
  },

  toJSON(message: MsgTimeoutOnClose): unknown {
    const obj: any = {};
    if (message.packet !== undefined) {
      obj.packet = Packet.toJSON(message.packet);
    }
    if (message.proofUnreceived.length !== 0) {
      obj.proofUnreceived = base64FromBytes(message.proofUnreceived);
    }
    if (message.proofClose.length !== 0) {
      obj.proofClose = base64FromBytes(message.proofClose);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.nextSequenceRecv !== 0) {
      obj.nextSequenceRecv = Math.round(message.nextSequenceRecv);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    if (message.counterpartyUpgradeSequence !== 0) {
      obj.counterpartyUpgradeSequence = Math.round(message.counterpartyUpgradeSequence);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTimeoutOnClose>, I>>(base?: I): MsgTimeoutOnClose {
    return MsgTimeoutOnClose.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTimeoutOnClose>, I>>(object: I): MsgTimeoutOnClose {
    const message = createBaseMsgTimeoutOnClose();
    message.packet = (object.packet !== undefined && object.packet !== null)
      ? Packet.fromPartial(object.packet)
      : undefined;
    message.proofUnreceived = object.proofUnreceived ?? new Uint8Array(0);
    message.proofClose = object.proofClose ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.nextSequenceRecv = object.nextSequenceRecv ?? 0;
    message.signer = object.signer ?? "";
    message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence ?? 0;
    return message;
  },
};

function createBaseMsgTimeoutOnCloseResponse(): MsgTimeoutOnCloseResponse {
  return { result: 0 };
}

export const MsgTimeoutOnCloseResponse = {
  encode(message: MsgTimeoutOnCloseResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTimeoutOnCloseResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTimeoutOnCloseResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTimeoutOnCloseResponse {
    return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
  },

  toJSON(message: MsgTimeoutOnCloseResponse): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = responseResultTypeToJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTimeoutOnCloseResponse>, I>>(base?: I): MsgTimeoutOnCloseResponse {
    return MsgTimeoutOnCloseResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTimeoutOnCloseResponse>, I>>(object: I): MsgTimeoutOnCloseResponse {
    const message = createBaseMsgTimeoutOnCloseResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgAcknowledgement(): MsgAcknowledgement {
  return {
    packet: undefined,
    acknowledgement: new Uint8Array(0),
    proofAcked: new Uint8Array(0),
    proofHeight: undefined,
    signer: "",
  };
}

export const MsgAcknowledgement = {
  encode(message: MsgAcknowledgement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.packet !== undefined) {
      Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
    }
    if (message.acknowledgement.length !== 0) {
      writer.uint32(18).bytes(message.acknowledgement);
    }
    if (message.proofAcked.length !== 0) {
      writer.uint32(26).bytes(message.proofAcked);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(34).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(42).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAcknowledgement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcknowledgement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.packet = Packet.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.acknowledgement = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proofAcked = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAcknowledgement {
    return {
      packet: isSet(object.packet) ? Packet.fromJSON(object.packet) : undefined,
      acknowledgement: isSet(object.acknowledgement) ? bytesFromBase64(object.acknowledgement) : new Uint8Array(0),
      proofAcked: isSet(object.proofAcked) ? bytesFromBase64(object.proofAcked) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgAcknowledgement): unknown {
    const obj: any = {};
    if (message.packet !== undefined) {
      obj.packet = Packet.toJSON(message.packet);
    }
    if (message.acknowledgement.length !== 0) {
      obj.acknowledgement = base64FromBytes(message.acknowledgement);
    }
    if (message.proofAcked.length !== 0) {
      obj.proofAcked = base64FromBytes(message.proofAcked);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAcknowledgement>, I>>(base?: I): MsgAcknowledgement {
    return MsgAcknowledgement.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAcknowledgement>, I>>(object: I): MsgAcknowledgement {
    const message = createBaseMsgAcknowledgement();
    message.packet = (object.packet !== undefined && object.packet !== null)
      ? Packet.fromPartial(object.packet)
      : undefined;
    message.acknowledgement = object.acknowledgement ?? new Uint8Array(0);
    message.proofAcked = object.proofAcked ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgAcknowledgementResponse(): MsgAcknowledgementResponse {
  return { result: 0 };
}

export const MsgAcknowledgementResponse = {
  encode(message: MsgAcknowledgementResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAcknowledgementResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAcknowledgementResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAcknowledgementResponse {
    return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
  },

  toJSON(message: MsgAcknowledgementResponse): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = responseResultTypeToJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAcknowledgementResponse>, I>>(base?: I): MsgAcknowledgementResponse {
    return MsgAcknowledgementResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAcknowledgementResponse>, I>>(object: I): MsgAcknowledgementResponse {
    const message = createBaseMsgAcknowledgementResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgChannelUpgradeInit(): MsgChannelUpgradeInit {
  return { portId: "", channelId: "", fields: undefined, signer: "" };
}

export const MsgChannelUpgradeInit = {
  encode(message: MsgChannelUpgradeInit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.fields !== undefined) {
      UpgradeFields.encode(message.fields, writer.uint32(26).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeInit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeInit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.fields = UpgradeFields.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeInit {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      fields: isSet(object.fields) ? UpgradeFields.fromJSON(object.fields) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeInit): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.fields !== undefined) {
      obj.fields = UpgradeFields.toJSON(message.fields);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeInit>, I>>(base?: I): MsgChannelUpgradeInit {
    return MsgChannelUpgradeInit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeInit>, I>>(object: I): MsgChannelUpgradeInit {
    const message = createBaseMsgChannelUpgradeInit();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.fields = (object.fields !== undefined && object.fields !== null)
      ? UpgradeFields.fromPartial(object.fields)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeInitResponse(): MsgChannelUpgradeInitResponse {
  return { upgrade: undefined, upgradeSequence: 0 };
}

export const MsgChannelUpgradeInitResponse = {
  encode(message: MsgChannelUpgradeInitResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upgrade !== undefined) {
      Upgrade.encode(message.upgrade, writer.uint32(10).fork()).ldelim();
    }
    if (message.upgradeSequence !== 0) {
      writer.uint32(16).uint64(message.upgradeSequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeInitResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeInitResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.upgrade = Upgrade.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.upgradeSequence = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeInitResponse {
    return {
      upgrade: isSet(object.upgrade) ? Upgrade.fromJSON(object.upgrade) : undefined,
      upgradeSequence: isSet(object.upgradeSequence) ? Number(object.upgradeSequence) : 0,
    };
  },

  toJSON(message: MsgChannelUpgradeInitResponse): unknown {
    const obj: any = {};
    if (message.upgrade !== undefined) {
      obj.upgrade = Upgrade.toJSON(message.upgrade);
    }
    if (message.upgradeSequence !== 0) {
      obj.upgradeSequence = Math.round(message.upgradeSequence);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeInitResponse>, I>>(base?: I): MsgChannelUpgradeInitResponse {
    return MsgChannelUpgradeInitResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeInitResponse>, I>>(
    object: I,
  ): MsgChannelUpgradeInitResponse {
    const message = createBaseMsgChannelUpgradeInitResponse();
    message.upgrade = (object.upgrade !== undefined && object.upgrade !== null)
      ? Upgrade.fromPartial(object.upgrade)
      : undefined;
    message.upgradeSequence = object.upgradeSequence ?? 0;
    return message;
  },
};

function createBaseMsgChannelUpgradeTry(): MsgChannelUpgradeTry {
  return {
    portId: "",
    channelId: "",
    proposedUpgradeConnectionHops: [],
    counterpartyUpgradeFields: undefined,
    counterpartyUpgradeSequence: 0,
    proofChannel: new Uint8Array(0),
    proofUpgrade: new Uint8Array(0),
    proofHeight: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeTry = {
  encode(message: MsgChannelUpgradeTry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    for (const v of message.proposedUpgradeConnectionHops) {
      writer.uint32(26).string(v!);
    }
    if (message.counterpartyUpgradeFields !== undefined) {
      UpgradeFields.encode(message.counterpartyUpgradeFields, writer.uint32(34).fork()).ldelim();
    }
    if (message.counterpartyUpgradeSequence !== 0) {
      writer.uint32(40).uint64(message.counterpartyUpgradeSequence);
    }
    if (message.proofChannel.length !== 0) {
      writer.uint32(50).bytes(message.proofChannel);
    }
    if (message.proofUpgrade.length !== 0) {
      writer.uint32(58).bytes(message.proofUpgrade);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(66).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(74).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.proposedUpgradeConnectionHops.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.counterpartyUpgradeFields = UpgradeFields.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.counterpartyUpgradeSequence = longToNumber(reader.uint64() as Long);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.proofChannel = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.proofUpgrade = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeTry {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      proposedUpgradeConnectionHops: Array.isArray(object?.proposedUpgradeConnectionHops)
        ? object.proposedUpgradeConnectionHops.map((e: any) => String(e))
        : [],
      counterpartyUpgradeFields: isSet(object.counterpartyUpgradeFields)
        ? UpgradeFields.fromJSON(object.counterpartyUpgradeFields)
        : undefined,
      counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence)
        ? Number(object.counterpartyUpgradeSequence)
        : 0,
      proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(0),
      proofUpgrade: isSet(object.proofUpgrade) ? bytesFromBase64(object.proofUpgrade) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeTry): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.proposedUpgradeConnectionHops?.length) {
      obj.proposedUpgradeConnectionHops = message.proposedUpgradeConnectionHops;
    }
    if (message.counterpartyUpgradeFields !== undefined) {
      obj.counterpartyUpgradeFields = UpgradeFields.toJSON(message.counterpartyUpgradeFields);
    }
    if (message.counterpartyUpgradeSequence !== 0) {
      obj.counterpartyUpgradeSequence = Math.round(message.counterpartyUpgradeSequence);
    }
    if (message.proofChannel.length !== 0) {
      obj.proofChannel = base64FromBytes(message.proofChannel);
    }
    if (message.proofUpgrade.length !== 0) {
      obj.proofUpgrade = base64FromBytes(message.proofUpgrade);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeTry>, I>>(base?: I): MsgChannelUpgradeTry {
    return MsgChannelUpgradeTry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeTry>, I>>(object: I): MsgChannelUpgradeTry {
    const message = createBaseMsgChannelUpgradeTry();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.proposedUpgradeConnectionHops = object.proposedUpgradeConnectionHops?.map((e) => e) || [];
    message.counterpartyUpgradeFields =
      (object.counterpartyUpgradeFields !== undefined && object.counterpartyUpgradeFields !== null)
        ? UpgradeFields.fromPartial(object.counterpartyUpgradeFields)
        : undefined;
    message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence ?? 0;
    message.proofChannel = object.proofChannel ?? new Uint8Array(0);
    message.proofUpgrade = object.proofUpgrade ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeTryResponse(): MsgChannelUpgradeTryResponse {
  return { upgrade: undefined, upgradeSequence: 0, result: 0 };
}

export const MsgChannelUpgradeTryResponse = {
  encode(message: MsgChannelUpgradeTryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.upgrade !== undefined) {
      Upgrade.encode(message.upgrade, writer.uint32(10).fork()).ldelim();
    }
    if (message.upgradeSequence !== 0) {
      writer.uint32(16).uint64(message.upgradeSequence);
    }
    if (message.result !== 0) {
      writer.uint32(24).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.upgrade = Upgrade.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.upgradeSequence = longToNumber(reader.uint64() as Long);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeTryResponse {
    return {
      upgrade: isSet(object.upgrade) ? Upgrade.fromJSON(object.upgrade) : undefined,
      upgradeSequence: isSet(object.upgradeSequence) ? Number(object.upgradeSequence) : 0,
      result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0,
    };
  },

  toJSON(message: MsgChannelUpgradeTryResponse): unknown {
    const obj: any = {};
    if (message.upgrade !== undefined) {
      obj.upgrade = Upgrade.toJSON(message.upgrade);
    }
    if (message.upgradeSequence !== 0) {
      obj.upgradeSequence = Math.round(message.upgradeSequence);
    }
    if (message.result !== 0) {
      obj.result = responseResultTypeToJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeTryResponse>, I>>(base?: I): MsgChannelUpgradeTryResponse {
    return MsgChannelUpgradeTryResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeTryResponse>, I>>(object: I): MsgChannelUpgradeTryResponse {
    const message = createBaseMsgChannelUpgradeTryResponse();
    message.upgrade = (object.upgrade !== undefined && object.upgrade !== null)
      ? Upgrade.fromPartial(object.upgrade)
      : undefined;
    message.upgradeSequence = object.upgradeSequence ?? 0;
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgChannelUpgradeAck(): MsgChannelUpgradeAck {
  return {
    portId: "",
    channelId: "",
    counterpartyUpgrade: undefined,
    proofChannel: new Uint8Array(0),
    proofUpgrade: new Uint8Array(0),
    proofHeight: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeAck = {
  encode(message: MsgChannelUpgradeAck, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.counterpartyUpgrade !== undefined) {
      Upgrade.encode(message.counterpartyUpgrade, writer.uint32(26).fork()).ldelim();
    }
    if (message.proofChannel.length !== 0) {
      writer.uint32(34).bytes(message.proofChannel);
    }
    if (message.proofUpgrade.length !== 0) {
      writer.uint32(42).bytes(message.proofUpgrade);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeAck {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeAck();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.counterpartyUpgrade = Upgrade.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.proofChannel = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proofUpgrade = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeAck {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      counterpartyUpgrade: isSet(object.counterpartyUpgrade) ? Upgrade.fromJSON(object.counterpartyUpgrade) : undefined,
      proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(0),
      proofUpgrade: isSet(object.proofUpgrade) ? bytesFromBase64(object.proofUpgrade) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeAck): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.counterpartyUpgrade !== undefined) {
      obj.counterpartyUpgrade = Upgrade.toJSON(message.counterpartyUpgrade);
    }
    if (message.proofChannel.length !== 0) {
      obj.proofChannel = base64FromBytes(message.proofChannel);
    }
    if (message.proofUpgrade.length !== 0) {
      obj.proofUpgrade = base64FromBytes(message.proofUpgrade);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeAck>, I>>(base?: I): MsgChannelUpgradeAck {
    return MsgChannelUpgradeAck.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeAck>, I>>(object: I): MsgChannelUpgradeAck {
    const message = createBaseMsgChannelUpgradeAck();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.counterpartyUpgrade = (object.counterpartyUpgrade !== undefined && object.counterpartyUpgrade !== null)
      ? Upgrade.fromPartial(object.counterpartyUpgrade)
      : undefined;
    message.proofChannel = object.proofChannel ?? new Uint8Array(0);
    message.proofUpgrade = object.proofUpgrade ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeAckResponse(): MsgChannelUpgradeAckResponse {
  return { result: 0 };
}

export const MsgChannelUpgradeAckResponse = {
  encode(message: MsgChannelUpgradeAckResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeAckResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeAckResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeAckResponse {
    return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
  },

  toJSON(message: MsgChannelUpgradeAckResponse): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = responseResultTypeToJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeAckResponse>, I>>(base?: I): MsgChannelUpgradeAckResponse {
    return MsgChannelUpgradeAckResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeAckResponse>, I>>(object: I): MsgChannelUpgradeAckResponse {
    const message = createBaseMsgChannelUpgradeAckResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgChannelUpgradeConfirm(): MsgChannelUpgradeConfirm {
  return {
    portId: "",
    channelId: "",
    counterpartyChannelState: 0,
    counterpartyUpgrade: undefined,
    proofChannel: new Uint8Array(0),
    proofUpgrade: new Uint8Array(0),
    proofHeight: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeConfirm = {
  encode(message: MsgChannelUpgradeConfirm, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.counterpartyChannelState !== 0) {
      writer.uint32(24).int32(message.counterpartyChannelState);
    }
    if (message.counterpartyUpgrade !== undefined) {
      Upgrade.encode(message.counterpartyUpgrade, writer.uint32(34).fork()).ldelim();
    }
    if (message.proofChannel.length !== 0) {
      writer.uint32(42).bytes(message.proofChannel);
    }
    if (message.proofUpgrade.length !== 0) {
      writer.uint32(50).bytes(message.proofUpgrade);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(58).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(66).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeConfirm {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeConfirm();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.counterpartyChannelState = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.counterpartyUpgrade = Upgrade.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proofChannel = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.proofUpgrade = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeConfirm {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      counterpartyChannelState: isSet(object.counterpartyChannelState)
        ? stateFromJSON(object.counterpartyChannelState)
        : 0,
      counterpartyUpgrade: isSet(object.counterpartyUpgrade) ? Upgrade.fromJSON(object.counterpartyUpgrade) : undefined,
      proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(0),
      proofUpgrade: isSet(object.proofUpgrade) ? bytesFromBase64(object.proofUpgrade) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeConfirm): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.counterpartyChannelState !== 0) {
      obj.counterpartyChannelState = stateToJSON(message.counterpartyChannelState);
    }
    if (message.counterpartyUpgrade !== undefined) {
      obj.counterpartyUpgrade = Upgrade.toJSON(message.counterpartyUpgrade);
    }
    if (message.proofChannel.length !== 0) {
      obj.proofChannel = base64FromBytes(message.proofChannel);
    }
    if (message.proofUpgrade.length !== 0) {
      obj.proofUpgrade = base64FromBytes(message.proofUpgrade);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeConfirm>, I>>(base?: I): MsgChannelUpgradeConfirm {
    return MsgChannelUpgradeConfirm.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeConfirm>, I>>(object: I): MsgChannelUpgradeConfirm {
    const message = createBaseMsgChannelUpgradeConfirm();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.counterpartyChannelState = object.counterpartyChannelState ?? 0;
    message.counterpartyUpgrade = (object.counterpartyUpgrade !== undefined && object.counterpartyUpgrade !== null)
      ? Upgrade.fromPartial(object.counterpartyUpgrade)
      : undefined;
    message.proofChannel = object.proofChannel ?? new Uint8Array(0);
    message.proofUpgrade = object.proofUpgrade ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeConfirmResponse(): MsgChannelUpgradeConfirmResponse {
  return { result: 0 };
}

export const MsgChannelUpgradeConfirmResponse = {
  encode(message: MsgChannelUpgradeConfirmResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.result !== 0) {
      writer.uint32(8).int32(message.result);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeConfirmResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeConfirmResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.result = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeConfirmResponse {
    return { result: isSet(object.result) ? responseResultTypeFromJSON(object.result) : 0 };
  },

  toJSON(message: MsgChannelUpgradeConfirmResponse): unknown {
    const obj: any = {};
    if (message.result !== 0) {
      obj.result = responseResultTypeToJSON(message.result);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeConfirmResponse>, I>>(
    base?: I,
  ): MsgChannelUpgradeConfirmResponse {
    return MsgChannelUpgradeConfirmResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeConfirmResponse>, I>>(
    object: I,
  ): MsgChannelUpgradeConfirmResponse {
    const message = createBaseMsgChannelUpgradeConfirmResponse();
    message.result = object.result ?? 0;
    return message;
  },
};

function createBaseMsgChannelUpgradeOpen(): MsgChannelUpgradeOpen {
  return {
    portId: "",
    channelId: "",
    counterpartyChannelState: 0,
    counterpartyUpgradeSequence: 0,
    proofChannel: new Uint8Array(0),
    proofHeight: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeOpen = {
  encode(message: MsgChannelUpgradeOpen, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.counterpartyChannelState !== 0) {
      writer.uint32(24).int32(message.counterpartyChannelState);
    }
    if (message.counterpartyUpgradeSequence !== 0) {
      writer.uint32(32).uint64(message.counterpartyUpgradeSequence);
    }
    if (message.proofChannel.length !== 0) {
      writer.uint32(42).bytes(message.proofChannel);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(58).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeOpen {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeOpen();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.counterpartyChannelState = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.counterpartyUpgradeSequence = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proofChannel = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeOpen {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      counterpartyChannelState: isSet(object.counterpartyChannelState)
        ? stateFromJSON(object.counterpartyChannelState)
        : 0,
      counterpartyUpgradeSequence: isSet(object.counterpartyUpgradeSequence)
        ? Number(object.counterpartyUpgradeSequence)
        : 0,
      proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeOpen): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.counterpartyChannelState !== 0) {
      obj.counterpartyChannelState = stateToJSON(message.counterpartyChannelState);
    }
    if (message.counterpartyUpgradeSequence !== 0) {
      obj.counterpartyUpgradeSequence = Math.round(message.counterpartyUpgradeSequence);
    }
    if (message.proofChannel.length !== 0) {
      obj.proofChannel = base64FromBytes(message.proofChannel);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeOpen>, I>>(base?: I): MsgChannelUpgradeOpen {
    return MsgChannelUpgradeOpen.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeOpen>, I>>(object: I): MsgChannelUpgradeOpen {
    const message = createBaseMsgChannelUpgradeOpen();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.counterpartyChannelState = object.counterpartyChannelState ?? 0;
    message.counterpartyUpgradeSequence = object.counterpartyUpgradeSequence ?? 0;
    message.proofChannel = object.proofChannel ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeOpenResponse(): MsgChannelUpgradeOpenResponse {
  return {};
}

export const MsgChannelUpgradeOpenResponse = {
  encode(_: MsgChannelUpgradeOpenResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeOpenResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeOpenResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgChannelUpgradeOpenResponse {
    return {};
  },

  toJSON(_: MsgChannelUpgradeOpenResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeOpenResponse>, I>>(base?: I): MsgChannelUpgradeOpenResponse {
    return MsgChannelUpgradeOpenResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeOpenResponse>, I>>(_: I): MsgChannelUpgradeOpenResponse {
    const message = createBaseMsgChannelUpgradeOpenResponse();
    return message;
  },
};

function createBaseMsgChannelUpgradeTimeout(): MsgChannelUpgradeTimeout {
  return {
    portId: "",
    channelId: "",
    counterpartyChannel: undefined,
    proofChannel: new Uint8Array(0),
    proofHeight: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeTimeout = {
  encode(message: MsgChannelUpgradeTimeout, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.counterpartyChannel !== undefined) {
      Channel.encode(message.counterpartyChannel, writer.uint32(26).fork()).ldelim();
    }
    if (message.proofChannel.length !== 0) {
      writer.uint32(34).bytes(message.proofChannel);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(42).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTimeout {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTimeout();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.counterpartyChannel = Channel.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.proofChannel = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeTimeout {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      counterpartyChannel: isSet(object.counterpartyChannel) ? Channel.fromJSON(object.counterpartyChannel) : undefined,
      proofChannel: isSet(object.proofChannel) ? bytesFromBase64(object.proofChannel) : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeTimeout): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.counterpartyChannel !== undefined) {
      obj.counterpartyChannel = Channel.toJSON(message.counterpartyChannel);
    }
    if (message.proofChannel.length !== 0) {
      obj.proofChannel = base64FromBytes(message.proofChannel);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeTimeout>, I>>(base?: I): MsgChannelUpgradeTimeout {
    return MsgChannelUpgradeTimeout.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeTimeout>, I>>(object: I): MsgChannelUpgradeTimeout {
    const message = createBaseMsgChannelUpgradeTimeout();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.counterpartyChannel = (object.counterpartyChannel !== undefined && object.counterpartyChannel !== null)
      ? Channel.fromPartial(object.counterpartyChannel)
      : undefined;
    message.proofChannel = object.proofChannel ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeTimeoutResponse(): MsgChannelUpgradeTimeoutResponse {
  return {};
}

export const MsgChannelUpgradeTimeoutResponse = {
  encode(_: MsgChannelUpgradeTimeoutResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeTimeoutResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeTimeoutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgChannelUpgradeTimeoutResponse {
    return {};
  },

  toJSON(_: MsgChannelUpgradeTimeoutResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeTimeoutResponse>, I>>(
    base?: I,
  ): MsgChannelUpgradeTimeoutResponse {
    return MsgChannelUpgradeTimeoutResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeTimeoutResponse>, I>>(
    _: I,
  ): MsgChannelUpgradeTimeoutResponse {
    const message = createBaseMsgChannelUpgradeTimeoutResponse();
    return message;
  },
};

function createBaseMsgChannelUpgradeCancel(): MsgChannelUpgradeCancel {
  return {
    portId: "",
    channelId: "",
    errorReceipt: undefined,
    proofErrorReceipt: new Uint8Array(0),
    proofHeight: undefined,
    signer: "",
  };
}

export const MsgChannelUpgradeCancel = {
  encode(message: MsgChannelUpgradeCancel, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.errorReceipt !== undefined) {
      ErrorReceipt.encode(message.errorReceipt, writer.uint32(26).fork()).ldelim();
    }
    if (message.proofErrorReceipt.length !== 0) {
      writer.uint32(34).bytes(message.proofErrorReceipt);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(42).fork()).ldelim();
    }
    if (message.signer !== "") {
      writer.uint32(50).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeCancel {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeCancel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.errorReceipt = ErrorReceipt.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.proofErrorReceipt = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proofHeight = Height.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgChannelUpgradeCancel {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      errorReceipt: isSet(object.errorReceipt) ? ErrorReceipt.fromJSON(object.errorReceipt) : undefined,
      proofErrorReceipt: isSet(object.proofErrorReceipt)
        ? bytesFromBase64(object.proofErrorReceipt)
        : new Uint8Array(0),
      proofHeight: isSet(object.proofHeight) ? Height.fromJSON(object.proofHeight) : undefined,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgChannelUpgradeCancel): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.errorReceipt !== undefined) {
      obj.errorReceipt = ErrorReceipt.toJSON(message.errorReceipt);
    }
    if (message.proofErrorReceipt.length !== 0) {
      obj.proofErrorReceipt = base64FromBytes(message.proofErrorReceipt);
    }
    if (message.proofHeight !== undefined) {
      obj.proofHeight = Height.toJSON(message.proofHeight);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeCancel>, I>>(base?: I): MsgChannelUpgradeCancel {
    return MsgChannelUpgradeCancel.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeCancel>, I>>(object: I): MsgChannelUpgradeCancel {
    const message = createBaseMsgChannelUpgradeCancel();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.errorReceipt = (object.errorReceipt !== undefined && object.errorReceipt !== null)
      ? ErrorReceipt.fromPartial(object.errorReceipt)
      : undefined;
    message.proofErrorReceipt = object.proofErrorReceipt ?? new Uint8Array(0);
    message.proofHeight = (object.proofHeight !== undefined && object.proofHeight !== null)
      ? Height.fromPartial(object.proofHeight)
      : undefined;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgChannelUpgradeCancelResponse(): MsgChannelUpgradeCancelResponse {
  return {};
}

export const MsgChannelUpgradeCancelResponse = {
  encode(_: MsgChannelUpgradeCancelResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgChannelUpgradeCancelResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgChannelUpgradeCancelResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgChannelUpgradeCancelResponse {
    return {};
  },

  toJSON(_: MsgChannelUpgradeCancelResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgChannelUpgradeCancelResponse>, I>>(base?: I): MsgChannelUpgradeCancelResponse {
    return MsgChannelUpgradeCancelResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgChannelUpgradeCancelResponse>, I>>(_: I): MsgChannelUpgradeCancelResponse {
    const message = createBaseMsgChannelUpgradeCancelResponse();
    return message;
  },
};

function createBaseMsgUpdateParams(): MsgUpdateParams {
  return { authority: "", params: undefined };
}

export const MsgUpdateParams = {
  encode(message: MsgUpdateParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.authority = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.params = Params.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateParams {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: MsgUpdateParams): unknown {
    const obj: any = {};
    if (message.authority !== "") {
      obj.authority = message.authority;
    }
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(base?: I): MsgUpdateParams {
    return MsgUpdateParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParams>, I>>(object: I): MsgUpdateParams {
    const message = createBaseMsgUpdateParams();
    message.authority = object.authority ?? "";
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseMsgUpdateParamsResponse(): MsgUpdateParamsResponse {
  return {};
}

export const MsgUpdateParamsResponse = {
  encode(_: MsgUpdateParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateParamsResponse {
    return {};
  },

  toJSON(_: MsgUpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(base?: I): MsgUpdateParamsResponse {
    return MsgUpdateParamsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateParamsResponse>, I>>(_: I): MsgUpdateParamsResponse {
    const message = createBaseMsgUpdateParamsResponse();
    return message;
  },
};

function createBaseMsgPruneAcknowledgements(): MsgPruneAcknowledgements {
  return { portId: "", channelId: "", limit: 0, signer: "" };
}

export const MsgPruneAcknowledgements = {
  encode(message: MsgPruneAcknowledgements, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.channelId !== "") {
      writer.uint32(18).string(message.channelId);
    }
    if (message.limit !== 0) {
      writer.uint32(24).uint64(message.limit);
    }
    if (message.signer !== "") {
      writer.uint32(34).string(message.signer);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPruneAcknowledgements {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPruneAcknowledgements();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.portId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.channelId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.limit = longToNumber(reader.uint64() as Long);
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.signer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgPruneAcknowledgements {
    return {
      portId: isSet(object.portId) ? String(object.portId) : "",
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      limit: isSet(object.limit) ? Number(object.limit) : 0,
      signer: isSet(object.signer) ? String(object.signer) : "",
    };
  },

  toJSON(message: MsgPruneAcknowledgements): unknown {
    const obj: any = {};
    if (message.portId !== "") {
      obj.portId = message.portId;
    }
    if (message.channelId !== "") {
      obj.channelId = message.channelId;
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.signer !== "") {
      obj.signer = message.signer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgPruneAcknowledgements>, I>>(base?: I): MsgPruneAcknowledgements {
    return MsgPruneAcknowledgements.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgPruneAcknowledgements>, I>>(object: I): MsgPruneAcknowledgements {
    const message = createBaseMsgPruneAcknowledgements();
    message.portId = object.portId ?? "";
    message.channelId = object.channelId ?? "";
    message.limit = object.limit ?? 0;
    message.signer = object.signer ?? "";
    return message;
  },
};

function createBaseMsgPruneAcknowledgementsResponse(): MsgPruneAcknowledgementsResponse {
  return { totalPrunedSequences: 0, totalRemainingSequences: 0 };
}

export const MsgPruneAcknowledgementsResponse = {
  encode(message: MsgPruneAcknowledgementsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalPrunedSequences !== 0) {
      writer.uint32(8).uint64(message.totalPrunedSequences);
    }
    if (message.totalRemainingSequences !== 0) {
      writer.uint32(16).uint64(message.totalRemainingSequences);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgPruneAcknowledgementsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPruneAcknowledgementsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalPrunedSequences = longToNumber(reader.uint64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalRemainingSequences = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgPruneAcknowledgementsResponse {
    return {
      totalPrunedSequences: isSet(object.totalPrunedSequences) ? Number(object.totalPrunedSequences) : 0,
      totalRemainingSequences: isSet(object.totalRemainingSequences) ? Number(object.totalRemainingSequences) : 0,
    };
  },

  toJSON(message: MsgPruneAcknowledgementsResponse): unknown {
    const obj: any = {};
    if (message.totalPrunedSequences !== 0) {
      obj.totalPrunedSequences = Math.round(message.totalPrunedSequences);
    }
    if (message.totalRemainingSequences !== 0) {
      obj.totalRemainingSequences = Math.round(message.totalRemainingSequences);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgPruneAcknowledgementsResponse>, I>>(
    base?: I,
  ): MsgPruneAcknowledgementsResponse {
    return MsgPruneAcknowledgementsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgPruneAcknowledgementsResponse>, I>>(
    object: I,
  ): MsgPruneAcknowledgementsResponse {
    const message = createBaseMsgPruneAcknowledgementsResponse();
    message.totalPrunedSequences = object.totalPrunedSequences ?? 0;
    message.totalRemainingSequences = object.totalRemainingSequences ?? 0;
    return message;
  },
};

/** Msg defines the ibc/channel Msg service. */
export interface Msg {
  /** ChannelOpenInit defines a rpc handler method for MsgChannelOpenInit. */
  ChannelOpenInit(request: MsgChannelOpenInit): Promise<MsgChannelOpenInitResponse>;
  /** ChannelOpenTry defines a rpc handler method for MsgChannelOpenTry. */
  ChannelOpenTry(request: MsgChannelOpenTry): Promise<MsgChannelOpenTryResponse>;
  /** ChannelOpenAck defines a rpc handler method for MsgChannelOpenAck. */
  ChannelOpenAck(request: MsgChannelOpenAck): Promise<MsgChannelOpenAckResponse>;
  /** ChannelOpenConfirm defines a rpc handler method for MsgChannelOpenConfirm. */
  ChannelOpenConfirm(request: MsgChannelOpenConfirm): Promise<MsgChannelOpenConfirmResponse>;
  /** ChannelCloseInit defines a rpc handler method for MsgChannelCloseInit. */
  ChannelCloseInit(request: MsgChannelCloseInit): Promise<MsgChannelCloseInitResponse>;
  /**
   * ChannelCloseConfirm defines a rpc handler method for
   * MsgChannelCloseConfirm.
   */
  ChannelCloseConfirm(request: MsgChannelCloseConfirm): Promise<MsgChannelCloseConfirmResponse>;
  /** RecvPacket defines a rpc handler method for MsgRecvPacket. */
  RecvPacket(request: MsgRecvPacket): Promise<MsgRecvPacketResponse>;
  /** Timeout defines a rpc handler method for MsgTimeout. */
  Timeout(request: MsgTimeout): Promise<MsgTimeoutResponse>;
  /** TimeoutOnClose defines a rpc handler method for MsgTimeoutOnClose. */
  TimeoutOnClose(request: MsgTimeoutOnClose): Promise<MsgTimeoutOnCloseResponse>;
  /** Acknowledgement defines a rpc handler method for MsgAcknowledgement. */
  Acknowledgement(request: MsgAcknowledgement): Promise<MsgAcknowledgementResponse>;
  /** ChannelUpgradeInit defines a rpc handler method for MsgChannelUpgradeInit. */
  ChannelUpgradeInit(request: MsgChannelUpgradeInit): Promise<MsgChannelUpgradeInitResponse>;
  /** ChannelUpgradeTry defines a rpc handler method for MsgChannelUpgradeTry. */
  ChannelUpgradeTry(request: MsgChannelUpgradeTry): Promise<MsgChannelUpgradeTryResponse>;
  /** ChannelUpgradeAck defines a rpc handler method for MsgChannelUpgradeAck. */
  ChannelUpgradeAck(request: MsgChannelUpgradeAck): Promise<MsgChannelUpgradeAckResponse>;
  /** ChannelUpgradeConfirm defines a rpc handler method for MsgChannelUpgradeConfirm. */
  ChannelUpgradeConfirm(request: MsgChannelUpgradeConfirm): Promise<MsgChannelUpgradeConfirmResponse>;
  /** ChannelUpgradeOpen defines a rpc handler method for MsgChannelUpgradeOpen. */
  ChannelUpgradeOpen(request: MsgChannelUpgradeOpen): Promise<MsgChannelUpgradeOpenResponse>;
  /** ChannelUpgradeTimeout defines a rpc handler method for MsgChannelUpgradeTimeout. */
  ChannelUpgradeTimeout(request: MsgChannelUpgradeTimeout): Promise<MsgChannelUpgradeTimeoutResponse>;
  /** ChannelUpgradeCancel defines a rpc handler method for MsgChannelUpgradeCancel. */
  ChannelUpgradeCancel(request: MsgChannelUpgradeCancel): Promise<MsgChannelUpgradeCancelResponse>;
  /** UpdateChannelParams defines a rpc handler method for MsgUpdateParams. */
  UpdateChannelParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** PruneAcknowledgements defines a rpc handler method for MsgPruneAcknowledgements. */
  PruneAcknowledgements(request: MsgPruneAcknowledgements): Promise<MsgPruneAcknowledgementsResponse>;
}

export const MsgServiceName = "ibc.core.channel.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.ChannelOpenInit = this.ChannelOpenInit.bind(this);
    this.ChannelOpenTry = this.ChannelOpenTry.bind(this);
    this.ChannelOpenAck = this.ChannelOpenAck.bind(this);
    this.ChannelOpenConfirm = this.ChannelOpenConfirm.bind(this);
    this.ChannelCloseInit = this.ChannelCloseInit.bind(this);
    this.ChannelCloseConfirm = this.ChannelCloseConfirm.bind(this);
    this.RecvPacket = this.RecvPacket.bind(this);
    this.Timeout = this.Timeout.bind(this);
    this.TimeoutOnClose = this.TimeoutOnClose.bind(this);
    this.Acknowledgement = this.Acknowledgement.bind(this);
    this.ChannelUpgradeInit = this.ChannelUpgradeInit.bind(this);
    this.ChannelUpgradeTry = this.ChannelUpgradeTry.bind(this);
    this.ChannelUpgradeAck = this.ChannelUpgradeAck.bind(this);
    this.ChannelUpgradeConfirm = this.ChannelUpgradeConfirm.bind(this);
    this.ChannelUpgradeOpen = this.ChannelUpgradeOpen.bind(this);
    this.ChannelUpgradeTimeout = this.ChannelUpgradeTimeout.bind(this);
    this.ChannelUpgradeCancel = this.ChannelUpgradeCancel.bind(this);
    this.UpdateChannelParams = this.UpdateChannelParams.bind(this);
    this.PruneAcknowledgements = this.PruneAcknowledgements.bind(this);
  }
  ChannelOpenInit(request: MsgChannelOpenInit): Promise<MsgChannelOpenInitResponse> {
    const data = MsgChannelOpenInit.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelOpenInit", data);
    return promise.then((data) => MsgChannelOpenInitResponse.decode(_m0.Reader.create(data)));
  }

  ChannelOpenTry(request: MsgChannelOpenTry): Promise<MsgChannelOpenTryResponse> {
    const data = MsgChannelOpenTry.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelOpenTry", data);
    return promise.then((data) => MsgChannelOpenTryResponse.decode(_m0.Reader.create(data)));
  }

  ChannelOpenAck(request: MsgChannelOpenAck): Promise<MsgChannelOpenAckResponse> {
    const data = MsgChannelOpenAck.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelOpenAck", data);
    return promise.then((data) => MsgChannelOpenAckResponse.decode(_m0.Reader.create(data)));
  }

  ChannelOpenConfirm(request: MsgChannelOpenConfirm): Promise<MsgChannelOpenConfirmResponse> {
    const data = MsgChannelOpenConfirm.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelOpenConfirm", data);
    return promise.then((data) => MsgChannelOpenConfirmResponse.decode(_m0.Reader.create(data)));
  }

  ChannelCloseInit(request: MsgChannelCloseInit): Promise<MsgChannelCloseInitResponse> {
    const data = MsgChannelCloseInit.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelCloseInit", data);
    return promise.then((data) => MsgChannelCloseInitResponse.decode(_m0.Reader.create(data)));
  }

  ChannelCloseConfirm(request: MsgChannelCloseConfirm): Promise<MsgChannelCloseConfirmResponse> {
    const data = MsgChannelCloseConfirm.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelCloseConfirm", data);
    return promise.then((data) => MsgChannelCloseConfirmResponse.decode(_m0.Reader.create(data)));
  }

  RecvPacket(request: MsgRecvPacket): Promise<MsgRecvPacketResponse> {
    const data = MsgRecvPacket.encode(request).finish();
    const promise = this.rpc.request(this.service, "RecvPacket", data);
    return promise.then((data) => MsgRecvPacketResponse.decode(_m0.Reader.create(data)));
  }

  Timeout(request: MsgTimeout): Promise<MsgTimeoutResponse> {
    const data = MsgTimeout.encode(request).finish();
    const promise = this.rpc.request(this.service, "Timeout", data);
    return promise.then((data) => MsgTimeoutResponse.decode(_m0.Reader.create(data)));
  }

  TimeoutOnClose(request: MsgTimeoutOnClose): Promise<MsgTimeoutOnCloseResponse> {
    const data = MsgTimeoutOnClose.encode(request).finish();
    const promise = this.rpc.request(this.service, "TimeoutOnClose", data);
    return promise.then((data) => MsgTimeoutOnCloseResponse.decode(_m0.Reader.create(data)));
  }

  Acknowledgement(request: MsgAcknowledgement): Promise<MsgAcknowledgementResponse> {
    const data = MsgAcknowledgement.encode(request).finish();
    const promise = this.rpc.request(this.service, "Acknowledgement", data);
    return promise.then((data) => MsgAcknowledgementResponse.decode(_m0.Reader.create(data)));
  }

  ChannelUpgradeInit(request: MsgChannelUpgradeInit): Promise<MsgChannelUpgradeInitResponse> {
    const data = MsgChannelUpgradeInit.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelUpgradeInit", data);
    return promise.then((data) => MsgChannelUpgradeInitResponse.decode(_m0.Reader.create(data)));
  }

  ChannelUpgradeTry(request: MsgChannelUpgradeTry): Promise<MsgChannelUpgradeTryResponse> {
    const data = MsgChannelUpgradeTry.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelUpgradeTry", data);
    return promise.then((data) => MsgChannelUpgradeTryResponse.decode(_m0.Reader.create(data)));
  }

  ChannelUpgradeAck(request: MsgChannelUpgradeAck): Promise<MsgChannelUpgradeAckResponse> {
    const data = MsgChannelUpgradeAck.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelUpgradeAck", data);
    return promise.then((data) => MsgChannelUpgradeAckResponse.decode(_m0.Reader.create(data)));
  }

  ChannelUpgradeConfirm(request: MsgChannelUpgradeConfirm): Promise<MsgChannelUpgradeConfirmResponse> {
    const data = MsgChannelUpgradeConfirm.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelUpgradeConfirm", data);
    return promise.then((data) => MsgChannelUpgradeConfirmResponse.decode(_m0.Reader.create(data)));
  }

  ChannelUpgradeOpen(request: MsgChannelUpgradeOpen): Promise<MsgChannelUpgradeOpenResponse> {
    const data = MsgChannelUpgradeOpen.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelUpgradeOpen", data);
    return promise.then((data) => MsgChannelUpgradeOpenResponse.decode(_m0.Reader.create(data)));
  }

  ChannelUpgradeTimeout(request: MsgChannelUpgradeTimeout): Promise<MsgChannelUpgradeTimeoutResponse> {
    const data = MsgChannelUpgradeTimeout.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelUpgradeTimeout", data);
    return promise.then((data) => MsgChannelUpgradeTimeoutResponse.decode(_m0.Reader.create(data)));
  }

  ChannelUpgradeCancel(request: MsgChannelUpgradeCancel): Promise<MsgChannelUpgradeCancelResponse> {
    const data = MsgChannelUpgradeCancel.encode(request).finish();
    const promise = this.rpc.request(this.service, "ChannelUpgradeCancel", data);
    return promise.then((data) => MsgChannelUpgradeCancelResponse.decode(_m0.Reader.create(data)));
  }

  UpdateChannelParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateChannelParams", data);
    return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
  }

  PruneAcknowledgements(request: MsgPruneAcknowledgements): Promise<MsgPruneAcknowledgementsResponse> {
    const data = MsgPruneAcknowledgements.encode(request).finish();
    const promise = this.rpc.request(this.service, "PruneAcknowledgements", data);
    return promise.then((data) => MsgPruneAcknowledgementsResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
