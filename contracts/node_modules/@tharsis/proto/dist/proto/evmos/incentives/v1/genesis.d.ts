import * as dependency_1 from "./incentives";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.incentives.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: Params;
            incentives?: dependency_1.evmos.incentives.v1.Incentive[];
            gas_meters?: dependency_1.evmos.incentives.v1.GasMeter[];
        });
        get params(): Params;
        set params(value: Params);
        get incentives(): dependency_1.evmos.incentives.v1.Incentive[];
        set incentives(value: dependency_1.evmos.incentives.v1.Incentive[]);
        get gas_meters(): dependency_1.evmos.incentives.v1.GasMeter[];
        set gas_meters(value: dependency_1.evmos.incentives.v1.GasMeter[]);
        static fromObject(data: {
            params?: ReturnType<typeof Params.prototype.toObject>;
            incentives?: ReturnType<typeof dependency_1.evmos.incentives.v1.Incentive.prototype.toObject>[];
            gas_meters?: ReturnType<typeof dependency_1.evmos.incentives.v1.GasMeter.prototype.toObject>[];
        }): GenesisState;
        toObject(): {
            params?: {
                enable_incentives?: boolean | undefined;
                allocation_limit?: string | undefined;
                incentives_epoch_identifier?: string | undefined;
                reward_scaler?: string | undefined;
            } | undefined;
            incentives?: {
                contract?: string | undefined;
                allocations?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                epochs?: number | undefined;
                start_time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                total_gas?: number | undefined;
            }[] | undefined;
            gas_meters?: {
                contract?: string | undefined;
                participant?: string | undefined;
                cumulative_gas?: number | undefined;
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
            enable_incentives?: boolean;
            allocation_limit?: string;
            incentives_epoch_identifier?: string;
            reward_scaler?: string;
        });
        get enable_incentives(): boolean;
        set enable_incentives(value: boolean);
        get allocation_limit(): string;
        set allocation_limit(value: string);
        get incentives_epoch_identifier(): string;
        set incentives_epoch_identifier(value: string);
        get reward_scaler(): string;
        set reward_scaler(value: string);
        static fromObject(data: {
            enable_incentives?: boolean;
            allocation_limit?: string;
            incentives_epoch_identifier?: string;
            reward_scaler?: string;
        }): Params;
        toObject(): {
            enable_incentives?: boolean | undefined;
            allocation_limit?: string | undefined;
            incentives_epoch_identifier?: string | undefined;
            reward_scaler?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=genesis.d.ts.map