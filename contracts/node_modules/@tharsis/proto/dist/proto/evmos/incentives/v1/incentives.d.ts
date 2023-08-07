import * as dependency_2 from "./../../../google/protobuf/timestamp";
import * as dependency_3 from "./../../../cosmos/base/v1beta1/coin";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.incentives.v1 {
    class Incentive extends pb_1.Message {
        constructor(data?: any[] | {
            contract?: string;
            allocations?: dependency_3.cosmos.base.v1beta1.DecCoin[];
            epochs?: number;
            start_time?: dependency_2.google.protobuf.Timestamp;
            total_gas?: number;
        });
        get contract(): string;
        set contract(value: string);
        get allocations(): dependency_3.cosmos.base.v1beta1.DecCoin[];
        set allocations(value: dependency_3.cosmos.base.v1beta1.DecCoin[]);
        get epochs(): number;
        set epochs(value: number);
        get start_time(): dependency_2.google.protobuf.Timestamp;
        set start_time(value: dependency_2.google.protobuf.Timestamp);
        get total_gas(): number;
        set total_gas(value: number);
        static fromObject(data: {
            contract?: string;
            allocations?: ReturnType<typeof dependency_3.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
            epochs?: number;
            start_time?: ReturnType<typeof dependency_2.google.protobuf.Timestamp.prototype.toObject>;
            total_gas?: number;
        }): Incentive;
        toObject(): {
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
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Incentive;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Incentive;
    }
    class GasMeter extends pb_1.Message {
        constructor(data?: any[] | {
            contract?: string;
            participant?: string;
            cumulative_gas?: number;
        });
        get contract(): string;
        set contract(value: string);
        get participant(): string;
        set participant(value: string);
        get cumulative_gas(): number;
        set cumulative_gas(value: number);
        static fromObject(data: {
            contract?: string;
            participant?: string;
            cumulative_gas?: number;
        }): GasMeter;
        toObject(): {
            contract?: string | undefined;
            participant?: string | undefined;
            cumulative_gas?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GasMeter;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GasMeter;
    }
    class RegisterIncentiveProposal extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
            contract?: string;
            allocations?: dependency_3.cosmos.base.v1beta1.DecCoin[];
            epochs?: number;
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get contract(): string;
        set contract(value: string);
        get allocations(): dependency_3.cosmos.base.v1beta1.DecCoin[];
        set allocations(value: dependency_3.cosmos.base.v1beta1.DecCoin[]);
        get epochs(): number;
        set epochs(value: number);
        static fromObject(data: {
            title?: string;
            description?: string;
            contract?: string;
            allocations?: ReturnType<typeof dependency_3.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
            epochs?: number;
        }): RegisterIncentiveProposal;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
            contract?: string | undefined;
            allocations?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            epochs?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RegisterIncentiveProposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RegisterIncentiveProposal;
    }
    class CancelIncentiveProposal extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
            contract?: string;
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get contract(): string;
        set contract(value: string);
        static fromObject(data: {
            title?: string;
            description?: string;
            contract?: string;
        }): CancelIncentiveProposal;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
            contract?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CancelIncentiveProposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CancelIncentiveProposal;
    }
}
//# sourceMappingURL=incentives.d.ts.map