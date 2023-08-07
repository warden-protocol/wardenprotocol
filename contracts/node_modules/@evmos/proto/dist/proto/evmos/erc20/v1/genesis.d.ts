import * as dependency_1 from "./erc20";
import * as pb_1 from "google-protobuf";
export declare namespace evmos.erc20.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: Params;
            token_pairs?: dependency_1.evmos.erc20.v1.TokenPair[];
        });
        get params(): Params;
        set params(value: Params);
        get token_pairs(): dependency_1.evmos.erc20.v1.TokenPair[];
        set token_pairs(value: dependency_1.evmos.erc20.v1.TokenPair[]);
        static fromObject(data: {
            params?: ReturnType<typeof Params.prototype.toObject>;
            token_pairs?: ReturnType<typeof dependency_1.evmos.erc20.v1.TokenPair.prototype.toObject>[];
        }): GenesisState;
        toObject(): {
            params?: {
                enable_erc20?: boolean | undefined;
                enable_evm_hook?: boolean | undefined;
            } | undefined;
            token_pairs?: {
                erc20_address?: string | undefined;
                denom?: string | undefined;
                enabled?: boolean | undefined;
                contract_owner?: dependency_1.evmos.erc20.v1.Owner | undefined;
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
            enable_erc20?: boolean;
            enable_evm_hook?: boolean;
        });
        get enable_erc20(): boolean;
        set enable_erc20(value: boolean);
        get enable_evm_hook(): boolean;
        set enable_evm_hook(value: boolean);
        static fromObject(data: {
            enable_erc20?: boolean;
            enable_evm_hook?: boolean;
        }): Params;
        toObject(): {
            enable_erc20?: boolean | undefined;
            enable_evm_hook?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=genesis.d.ts.map