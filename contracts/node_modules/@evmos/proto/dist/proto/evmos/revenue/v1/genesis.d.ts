import * as dependency_1 from "./revenue";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.revenue.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: Params;
            revenues?: dependency_1.evmos.revenue.v1.Revenue[];
        });
        get params(): Params;
        set params(value: Params);
        get revenues(): dependency_1.evmos.revenue.v1.Revenue[];
        set revenues(value: dependency_1.evmos.revenue.v1.Revenue[]);
        static fromObject(data: {
            params?: ReturnType<typeof Params.prototype.toObject>;
            revenues?: ReturnType<typeof dependency_1.evmos.revenue.v1.Revenue.prototype.toObject>[];
        }): GenesisState;
        toObject(): {
            params?: {
                enable_revenue?: boolean | undefined;
                developer_shares?: string | undefined;
                addr_derivation_cost_create?: number | undefined;
            } | undefined;
            revenues?: {
                contract_address?: string | undefined;
                deployer_address?: string | undefined;
                withdrawer_address?: string | undefined;
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
            enable_revenue?: boolean;
            developer_shares?: string;
            addr_derivation_cost_create?: number;
        });
        get enable_revenue(): boolean;
        set enable_revenue(value: boolean);
        get developer_shares(): string;
        set developer_shares(value: string);
        get addr_derivation_cost_create(): number;
        set addr_derivation_cost_create(value: number);
        static fromObject(data: {
            enable_revenue?: boolean;
            developer_shares?: string;
            addr_derivation_cost_create?: number;
        }): Params;
        toObject(): {
            enable_revenue?: boolean | undefined;
            developer_shares?: string | undefined;
            addr_derivation_cost_create?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=genesis.d.ts.map