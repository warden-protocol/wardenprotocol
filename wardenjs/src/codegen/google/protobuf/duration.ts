//@ts-nocheck
<<<<<<< HEAD
<<<<<<< HEAD
import { Long, isSet } from "../../helpers.js";
import _m0 from "protobufjs/minimal.js";
=======
import { BinaryReader, BinaryWriter } from "../../binary.js";
import { isSet } from "../../helpers.js";
import { JsonSafe } from "../../json-safe.js";
>>>>>>> a58636b3 (fixup! chore(wardenjs): regen)
=======
import { BinaryReader, BinaryWriter } from "../../binary.js";
import { isSet } from "../../helpers.js";
>>>>>>> 54cd4a0e (feat(wardenjs): use bigint instead of Long 3rd party implementation)
/**
 * A Duration represents a signed, fixed-length span of time represented
 * as a count of seconds and fractions of seconds at nanosecond
 * resolution. It is independent of any calendar and concepts like "day"
 * or "month". It is related to Timestamp in that the difference between
 * two Timestamp values is a Duration and it can be added or subtracted
 * from a Timestamp. Range is approximately +-10,000 years.
 * 
 * # Examples
 * 
 * Example 1: Compute Duration from two Timestamps in pseudo code.
 * 
 *     Timestamp start = ...;
 *     Timestamp end = ...;
 *     Duration duration = ...;
 * 
 *     duration.seconds = end.seconds - start.seconds;
 *     duration.nanos = end.nanos - start.nanos;
 * 
 *     if (duration.seconds < 0 && duration.nanos > 0) {
 *       duration.seconds += 1;
 *       duration.nanos -= 1000000000;
 *     } else if (durations.seconds > 0 && duration.nanos < 0) {
 *       duration.seconds -= 1;
 *       duration.nanos += 1000000000;
 *     }
 * 
 * Example 2: Compute Timestamp from Timestamp + Duration in pseudo code.
 * 
 *     Timestamp start = ...;
 *     Duration duration = ...;
 *     Timestamp end = ...;
 * 
 *     end.seconds = start.seconds + duration.seconds;
 *     end.nanos = start.nanos + duration.nanos;
 * 
 *     if (end.nanos < 0) {
 *       end.seconds -= 1;
 *       end.nanos += 1000000000;
 *     } else if (end.nanos >= 1000000000) {
 *       end.seconds += 1;
 *       end.nanos -= 1000000000;
 *     }
 * 
 * Example 3: Compute Duration from datetime.timedelta in Python.
 * 
 *     td = datetime.timedelta(days=3, minutes=10)
 *     duration = Duration()
 *     duration.FromTimedelta(td)
 * 
 * # JSON Mapping
 * 
 * In JSON format, the Duration type is encoded as a string rather than an
 * object, where the string ends in the suffix "s" (indicating seconds) and
 * is preceded by the number of seconds, with nanoseconds expressed as
 * fractional seconds. For example, 3 seconds with 0 nanoseconds should be
 * encoded in JSON format as "3s", while 3 seconds and 1 nanosecond should
 * be expressed in JSON format as "3.000000001s", and 3 seconds and 1
 * microsecond should be expressed in JSON format as "3.000001s".
 */
export interface Duration {
  /**
   * Signed seconds of the span of time. Must be from -315,576,000,000
   * to +315,576,000,000 inclusive. Note: these bounds are computed from:
   * 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years
   */
  seconds: bigint;
  /**
   * Signed fractions of a second at nanosecond resolution of the span
   * of time. Durations less than one second are represented with a 0
   * `seconds` field and a positive or negative `nanos` field. For durations
   * of one second or more, a non-zero value for the `nanos` field must be
   * of the same sign as the `seconds` field. Must be from -999,999,999
   * to +999,999,999 inclusive.
   */
  nanos: number;
}
export interface DurationProtoMsg {
  typeUrl: "/google.protobuf.Duration";
  value: Uint8Array;
}
/**
 * A Duration represents a signed, fixed-length span of time represented
 * as a count of seconds and fractions of seconds at nanosecond
 * resolution. It is independent of any calendar and concepts like "day"
 * or "month". It is related to Timestamp in that the difference between
 * two Timestamp values is a Duration and it can be added or subtracted
 * from a Timestamp. Range is approximately +-10,000 years.
 * 
 * # Examples
 * 
 * Example 1: Compute Duration from two Timestamps in pseudo code.
 * 
 *     Timestamp start = ...;
 *     Timestamp end = ...;
 *     Duration duration = ...;
 * 
 *     duration.seconds = end.seconds - start.seconds;
 *     duration.nanos = end.nanos - start.nanos;
 * 
 *     if (duration.seconds < 0 && duration.nanos > 0) {
 *       duration.seconds += 1;
 *       duration.nanos -= 1000000000;
 *     } else if (durations.seconds > 0 && duration.nanos < 0) {
 *       duration.seconds -= 1;
 *       duration.nanos += 1000000000;
 *     }
 * 
 * Example 2: Compute Timestamp from Timestamp + Duration in pseudo code.
 * 
 *     Timestamp start = ...;
 *     Duration duration = ...;
 *     Timestamp end = ...;
 * 
 *     end.seconds = start.seconds + duration.seconds;
 *     end.nanos = start.nanos + duration.nanos;
 * 
 *     if (end.nanos < 0) {
 *       end.seconds -= 1;
 *       end.nanos += 1000000000;
 *     } else if (end.nanos >= 1000000000) {
 *       end.seconds += 1;
 *       end.nanos -= 1000000000;
 *     }
 * 
 * Example 3: Compute Duration from datetime.timedelta in Python.
 * 
 *     td = datetime.timedelta(days=3, minutes=10)
 *     duration = Duration()
 *     duration.FromTimedelta(td)
 * 
 * # JSON Mapping
 * 
 * In JSON format, the Duration type is encoded as a string rather than an
 * object, where the string ends in the suffix "s" (indicating seconds) and
 * is preceded by the number of seconds, with nanoseconds expressed as
 * fractional seconds. For example, 3 seconds with 0 nanoseconds should be
 * encoded in JSON format as "3s", while 3 seconds and 1 nanosecond should
 * be expressed in JSON format as "3.000000001s", and 3 seconds and 1
 * microsecond should be expressed in JSON format as "3.000001s".
 */
export type DurationAmino = string;
export interface DurationAminoMsg {
  type: "/google.protobuf.Duration";
  value: DurationAmino;
}
/**
 * A Duration represents a signed, fixed-length span of time represented
 * as a count of seconds and fractions of seconds at nanosecond
 * resolution. It is independent of any calendar and concepts like "day"
 * or "month". It is related to Timestamp in that the difference between
 * two Timestamp values is a Duration and it can be added or subtracted
 * from a Timestamp. Range is approximately +-10,000 years.
 * 
 * # Examples
 * 
 * Example 1: Compute Duration from two Timestamps in pseudo code.
 * 
 *     Timestamp start = ...;
 *     Timestamp end = ...;
 *     Duration duration = ...;
 * 
 *     duration.seconds = end.seconds - start.seconds;
 *     duration.nanos = end.nanos - start.nanos;
 * 
 *     if (duration.seconds < 0 && duration.nanos > 0) {
 *       duration.seconds += 1;
 *       duration.nanos -= 1000000000;
 *     } else if (durations.seconds > 0 && duration.nanos < 0) {
 *       duration.seconds -= 1;
 *       duration.nanos += 1000000000;
 *     }
 * 
 * Example 2: Compute Timestamp from Timestamp + Duration in pseudo code.
 * 
 *     Timestamp start = ...;
 *     Duration duration = ...;
 *     Timestamp end = ...;
 * 
 *     end.seconds = start.seconds + duration.seconds;
 *     end.nanos = start.nanos + duration.nanos;
 * 
 *     if (end.nanos < 0) {
 *       end.seconds -= 1;
 *       end.nanos += 1000000000;
 *     } else if (end.nanos >= 1000000000) {
 *       end.seconds += 1;
 *       end.nanos -= 1000000000;
 *     }
 * 
 * Example 3: Compute Duration from datetime.timedelta in Python.
 * 
 *     td = datetime.timedelta(days=3, minutes=10)
 *     duration = Duration()
 *     duration.FromTimedelta(td)
 * 
 * # JSON Mapping
 * 
 * In JSON format, the Duration type is encoded as a string rather than an
 * object, where the string ends in the suffix "s" (indicating seconds) and
 * is preceded by the number of seconds, with nanoseconds expressed as
 * fractional seconds. For example, 3 seconds with 0 nanoseconds should be
 * encoded in JSON format as "3s", while 3 seconds and 1 nanosecond should
 * be expressed in JSON format as "3.000000001s", and 3 seconds and 1
 * microsecond should be expressed in JSON format as "3.000001s".
 */
export interface DurationSDKType {
  seconds: bigint;
  nanos: number;
}
function createBaseDuration(): Duration {
  return {
    seconds: BigInt(0),
    nanos: 0
  };
}
export const Duration = {
  typeUrl: "/google.protobuf.Duration",
  encode(message: Duration, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.seconds !== BigInt(0)) {
      writer.uint32(8).int64(message.seconds);
    }
    if (message.nanos !== 0) {
      writer.uint32(16).int32(message.nanos);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Duration {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDuration();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = reader.int64();
          break;
        case 2:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Duration {
    return {
      seconds: isSet(object.seconds) ? BigInt(object.seconds.toString()) : BigInt(0),
      nanos: isSet(object.nanos) ? Number(object.nanos) : 0
    };
  },
  toJSON(message: Duration): JsonSafe<Duration> {
    const obj: any = {};
    message.seconds !== undefined && (obj.seconds = (message.seconds || BigInt(0)).toString());
    message.nanos !== undefined && (obj.nanos = Math.round(message.nanos));
    return obj;
  },
  fromPartial(object: Partial<Duration>): Duration {
    const message = createBaseDuration();
    message.seconds = object.seconds !== undefined && object.seconds !== null ? BigInt(object.seconds.toString()) : BigInt(0);
    message.nanos = object.nanos ?? 0;
    return message;
  },
  fromAmino(object: DurationAmino): Duration {
    const value = BigInt(object);
    return {
      seconds: value / BigInt("1000000000"),
      nanos: Number(value % BigInt("1000000000"))
    };
  },
  toAmino(message: Duration): DurationAmino {
    return (message.seconds * BigInt("1000000000") + BigInt(message.nanos)).toString();
  },
  fromAminoMsg(object: DurationAminoMsg): Duration {
    return Duration.fromAmino(object.value);
  },
  fromProtoMsg(message: DurationProtoMsg): Duration {
    return Duration.decode(message.value);
  },
  toProto(message: Duration): Uint8Array {
    return Duration.encode(message).finish();
  },
  toProtoMsg(message: Duration): DurationProtoMsg {
    return {
      typeUrl: "/google.protobuf.Duration",
      value: Duration.encode(message).finish()
    };
  }
};