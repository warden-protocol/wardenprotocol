import * as dependency_2 from "./../../../google/protobuf/duration";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.recovery.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: Params;
        });
        get params(): Params;
        set params(value: Params);
        static fromObject(data: {
            params?: ReturnType<typeof Params.prototype.toObject>;
        }): GenesisState;
        toObject(): {
            params?: {
                enable_recovery?: boolean | undefined;
                packet_timeout_duration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            enable_recovery?: boolean;
            packet_timeout_duration?: dependency_2.google.protobuf.Duration;
        });
        get enable_recovery(): boolean;
        set enable_recovery(value: boolean);
        get packet_timeout_duration(): dependency_2.google.protobuf.Duration;
        set packet_timeout_duration(value: dependency_2.google.protobuf.Duration);
        static fromObject(data: {
            enable_recovery?: boolean;
            packet_timeout_duration?: ReturnType<typeof dependency_2.google.protobuf.Duration.prototype.toObject>;
        }): Params;
        toObject(): {
            enable_recovery?: boolean | undefined;
            packet_timeout_duration?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=genesis.d.ts.map