import * as dependency_2 from "./../../../google/protobuf/duration";
import * as dependency_3 from "./../../../google/protobuf/timestamp";
import * as dependency_4 from "./claims";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.claims.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: Params;
            claims_records?: dependency_4.evmos.claims.v1.ClaimsRecordAddress[];
        });
        get params(): Params;
        set params(value: Params);
        get claims_records(): dependency_4.evmos.claims.v1.ClaimsRecordAddress[];
        set claims_records(value: dependency_4.evmos.claims.v1.ClaimsRecordAddress[]);
        static fromObject(data: {
            params?: ReturnType<typeof Params.prototype.toObject>;
            claims_records?: ReturnType<typeof dependency_4.evmos.claims.v1.ClaimsRecordAddress.prototype.toObject>[];
        }): GenesisState;
        toObject(): {
            params?: {
                enable_claims?: boolean | undefined;
                airdrop_start_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                duration_until_decay?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                duration_of_decay?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                claims_denom?: string | undefined;
                authorized_channels?: string[] | undefined;
                evm_channels?: string[] | undefined;
            } | undefined;
            claims_records?: {
                address?: string | undefined;
                initial_claimable_amount?: string | undefined;
                actions_completed?: boolean[] | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            enable_claims?: boolean;
            airdrop_start_time?: dependency_3.google.protobuf.Timestamp;
            duration_until_decay?: dependency_2.google.protobuf.Duration;
            duration_of_decay?: dependency_2.google.protobuf.Duration;
            claims_denom?: string;
            authorized_channels?: string[];
            evm_channels?: string[];
        });
        get enable_claims(): boolean;
        set enable_claims(value: boolean);
        get airdrop_start_time(): dependency_3.google.protobuf.Timestamp;
        set airdrop_start_time(value: dependency_3.google.protobuf.Timestamp);
        get duration_until_decay(): dependency_2.google.protobuf.Duration;
        set duration_until_decay(value: dependency_2.google.protobuf.Duration);
        get duration_of_decay(): dependency_2.google.protobuf.Duration;
        set duration_of_decay(value: dependency_2.google.protobuf.Duration);
        get claims_denom(): string;
        set claims_denom(value: string);
        get authorized_channels(): string[];
        set authorized_channels(value: string[]);
        get evm_channels(): string[];
        set evm_channels(value: string[]);
        static fromObject(data: {
            enable_claims?: boolean;
            airdrop_start_time?: ReturnType<typeof dependency_3.google.protobuf.Timestamp.prototype.toObject>;
            duration_until_decay?: ReturnType<typeof dependency_2.google.protobuf.Duration.prototype.toObject>;
            duration_of_decay?: ReturnType<typeof dependency_2.google.protobuf.Duration.prototype.toObject>;
            claims_denom?: string;
            authorized_channels?: string[];
            evm_channels?: string[];
        }): Params;
        toObject(): {
            enable_claims?: boolean | undefined;
            airdrop_start_time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            duration_until_decay?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            duration_of_decay?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            claims_denom?: string | undefined;
            authorized_channels?: string[] | undefined;
            evm_channels?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=genesis.d.ts.map