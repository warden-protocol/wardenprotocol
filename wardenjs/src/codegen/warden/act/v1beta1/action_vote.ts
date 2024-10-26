//@ts-nocheck
import { Timestamp, TimestampSDKType } from "../../../google/protobuf/timestamp.js";
import { BinaryReader, BinaryWriter } from "../../../binary.js";
import { isSet, fromJsonTimestamp, fromTimestamp } from "../../../helpers.js";
import { JsonSafe } from "../../../json-safe.js";
/** Type of a vote. */
export enum ActionVoteType {
  /** VOTE_TYPE_UNSPECIFIED - Unspecified vote type. */
  VOTE_TYPE_UNSPECIFIED = 0,
  /** VOTE_TYPE_APPROVED - Positive vote for an action. */
  VOTE_TYPE_APPROVED = 1,
  /** VOTE_TYPE_REJECTED - Negative vote for an action. */
  VOTE_TYPE_REJECTED = 2,
  UNRECOGNIZED = -1,
}
export const ActionVoteTypeSDKType = ActionVoteType;
export const ActionVoteTypeAmino = ActionVoteType;
export function actionVoteTypeFromJSON(object: any): ActionVoteType {
  switch (object) {
    case 0:
    case "VOTE_TYPE_UNSPECIFIED":
      return ActionVoteType.VOTE_TYPE_UNSPECIFIED;
    case 1:
    case "VOTE_TYPE_APPROVED":
      return ActionVoteType.VOTE_TYPE_APPROVED;
    case 2:
    case "VOTE_TYPE_REJECTED":
      return ActionVoteType.VOTE_TYPE_REJECTED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ActionVoteType.UNRECOGNIZED;
  }
}
export function actionVoteTypeToJSON(object: ActionVoteType): string {
  switch (object) {
    case ActionVoteType.VOTE_TYPE_UNSPECIFIED:
      return "VOTE_TYPE_UNSPECIFIED";
    case ActionVoteType.VOTE_TYPE_APPROVED:
      return "VOTE_TYPE_APPROVED";
    case ActionVoteType.VOTE_TYPE_REJECTED:
      return "VOTE_TYPE_REJECTED";
    case ActionVoteType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
export interface ActionVote {
  /** participant is the address of the voter. */
  participant: string;
  /** voted_at is a timestamp specifying when the voter voted on the action. */
  votedAt: Timestamp;
  /** vote is the type of the vote. */
  voteType: ActionVoteType;
}
export interface ActionVoteProtoMsg {
  typeUrl: "/warden.act.v1beta1.ActionVote";
  value: Uint8Array;
}
export interface ActionVoteAmino {
  /** participant is the address of the voter. */
  participant?: string;
  /** voted_at is a timestamp specifying when the voter voted on the action. */
  voted_at: string;
  /** vote is the type of the vote. */
  vote_type?: ActionVoteType;
}
export interface ActionVoteAminoMsg {
  type: "/warden.act.v1beta1.ActionVote";
  value: ActionVoteAmino;
}
export interface ActionVoteSDKType {
  participant: string;
  voted_at: TimestampSDKType;
  vote_type: ActionVoteType;
}
function createBaseActionVote(): ActionVote {
  return {
    participant: "",
    votedAt: Timestamp.fromPartial({}),
    voteType: 0
  };
}
export const ActionVote = {
  typeUrl: "/warden.act.v1beta1.ActionVote",
  encode(message: ActionVote, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.participant !== "") {
      writer.uint32(10).string(message.participant);
    }
    if (message.votedAt !== undefined) {
      Timestamp.encode(message.votedAt, writer.uint32(18).fork()).ldelim();
    }
    if (message.voteType !== 0) {
      writer.uint32(24).int32(message.voteType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ActionVote {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActionVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.participant = reader.string();
          break;
        case 2:
          message.votedAt = Timestamp.decode(reader, reader.uint32());
          break;
        case 3:
          message.voteType = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ActionVote {
    return {
      participant: isSet(object.participant) ? String(object.participant) : "",
      votedAt: isSet(object.votedAt) ? fromJsonTimestamp(object.votedAt) : undefined,
      voteType: isSet(object.voteType) ? actionVoteTypeFromJSON(object.voteType) : -1
    };
  },
  toJSON(message: ActionVote): JsonSafe<ActionVote> {
    const obj: any = {};
    message.participant !== undefined && (obj.participant = message.participant);
    message.votedAt !== undefined && (obj.votedAt = fromTimestamp(message.votedAt).toISOString());
    message.voteType !== undefined && (obj.voteType = actionVoteTypeToJSON(message.voteType));
    return obj;
  },
  fromPartial(object: Partial<ActionVote>): ActionVote {
    const message = createBaseActionVote();
    message.participant = object.participant ?? "";
    message.votedAt = object.votedAt !== undefined && object.votedAt !== null ? Timestamp.fromPartial(object.votedAt) : undefined;
    message.voteType = object.voteType ?? 0;
    return message;
  },
  fromAmino(object: ActionVoteAmino): ActionVote {
    const message = createBaseActionVote();
    if (object.participant !== undefined && object.participant !== null) {
      message.participant = object.participant;
    }
    if (object.voted_at !== undefined && object.voted_at !== null) {
      message.votedAt = Timestamp.fromAmino(object.voted_at);
    }
    if (object.vote_type !== undefined && object.vote_type !== null) {
      message.voteType = object.vote_type;
    }
    return message;
  },
  toAmino(message: ActionVote): ActionVoteAmino {
    const obj: any = {};
    obj.participant = message.participant === "" ? undefined : message.participant;
    obj.voted_at = message.votedAt ? Timestamp.toAmino(message.votedAt) : Timestamp.toAmino(Timestamp.fromPartial({}));
    obj.vote_type = message.voteType === 0 ? undefined : message.voteType;
    return obj;
  },
  fromAminoMsg(object: ActionVoteAminoMsg): ActionVote {
    return ActionVote.fromAmino(object.value);
  },
  fromProtoMsg(message: ActionVoteProtoMsg): ActionVote {
    return ActionVote.decode(message.value);
  },
  toProto(message: ActionVote): Uint8Array {
    return ActionVote.encode(message).finish();
  },
  toProtoMsg(message: ActionVote): ActionVoteProtoMsg {
    return {
      typeUrl: "/warden.act.v1beta1.ActionVote",
      value: ActionVote.encode(message).finish()
    };
  }
};