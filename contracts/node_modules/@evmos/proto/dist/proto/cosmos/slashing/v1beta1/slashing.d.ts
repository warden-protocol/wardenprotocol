import * as dependency_2 from "./../../../google/protobuf/duration";
import * as dependency_3 from "./../../../google/protobuf/timestamp";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.slashing.v1beta1 {
    class ValidatorSigningInfo extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            start_height?: number;
            index_offset?: number;
            jailed_until?: dependency_3.google.protobuf.Timestamp;
            tombstoned?: boolean;
            missed_blocks_counter?: number;
        });
        get address(): string;
        set address(value: string);
        get start_height(): number;
        set start_height(value: number);
        get index_offset(): number;
        set index_offset(value: number);
        get jailed_until(): dependency_3.google.protobuf.Timestamp;
        set jailed_until(value: dependency_3.google.protobuf.Timestamp);
        get tombstoned(): boolean;
        set tombstoned(value: boolean);
        get missed_blocks_counter(): number;
        set missed_blocks_counter(value: number);
        static fromObject(data: {
            address?: string;
            start_height?: number;
            index_offset?: number;
            jailed_until?: ReturnType<typeof dependency_3.google.protobuf.Timestamp.prototype.toObject>;
            tombstoned?: boolean;
            missed_blocks_counter?: number;
        }): ValidatorSigningInfo;
        toObject(): {
            address?: string | undefined;
            start_height?: number | undefined;
            index_offset?: number | undefined;
            jailed_until?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            tombstoned?: boolean | undefined;
            missed_blocks_counter?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorSigningInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorSigningInfo;
    }
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            signed_blocks_window?: number;
            min_signed_per_window?: Uint8Array;
            downtime_jail_duration?: dependency_2.google.protobuf.Duration;
            slash_fraction_double_sign?: Uint8Array;
            slash_fraction_downtime?: Uint8Array;
        });
        get signed_blocks_window(): number;
        set signed_blocks_window(value: number);
        get min_signed_per_window(): Uint8Array;
        set min_signed_per_window(value: Uint8Array);
        get downtime_jail_duration(): dependency_2.google.protobuf.Duration;
        set downtime_jail_duration(value: dependency_2.google.protobuf.Duration);
        get slash_fraction_double_sign(): Uint8Array;
        set slash_fraction_double_sign(value: Uint8Array);
        get slash_fraction_downtime(): Uint8Array;
        set slash_fraction_downtime(value: Uint8Array);
        static fromObject(data: {
            signed_blocks_window?: number;
            min_signed_per_window?: Uint8Array;
            downtime_jail_duration?: ReturnType<typeof dependency_2.google.protobuf.Duration.prototype.toObject>;
            slash_fraction_double_sign?: Uint8Array;
            slash_fraction_downtime?: Uint8Array;
        }): Params;
        toObject(): {
            signed_blocks_window?: number | undefined;
            min_signed_per_window?: Uint8Array | undefined;
            downtime_jail_duration?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            slash_fraction_double_sign?: Uint8Array | undefined;
            slash_fraction_downtime?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=slashing.d.ts.map