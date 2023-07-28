import * as dependency_2 from "./evm";
import * as pb_1 from "google-protobuf";
export declare namespace ethermint.evm.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            accounts?: GenesisAccount[];
            params?: dependency_2.ethermint.evm.v1.Params;
        });
        get accounts(): GenesisAccount[];
        set accounts(value: GenesisAccount[]);
        get params(): dependency_2.ethermint.evm.v1.Params;
        set params(value: dependency_2.ethermint.evm.v1.Params);
        static fromObject(data: {
            accounts?: ReturnType<typeof GenesisAccount.prototype.toObject>[];
            params?: ReturnType<typeof dependency_2.ethermint.evm.v1.Params.prototype.toObject>;
        }): GenesisState;
        toObject(): {
            accounts?: {
                address?: string | undefined;
                code?: string | undefined;
                storage?: {
                    key?: string | undefined;
                    value?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            params?: {
                evm_denom?: string | undefined;
                enable_create?: boolean | undefined;
                enable_call?: boolean | undefined;
                extra_eips?: number[] | undefined;
                chain_config?: {
                    homestead_block?: string | undefined;
                    dao_fork_block?: string | undefined;
                    dao_fork_support?: boolean | undefined;
                    eip150_block?: string | undefined;
                    eip150_hash?: string | undefined;
                    eip155_block?: string | undefined;
                    eip158_block?: string | undefined;
                    byzantium_block?: string | undefined;
                    constantinople_block?: string | undefined;
                    petersburg_block?: string | undefined;
                    istanbul_block?: string | undefined;
                    muir_glacier_block?: string | undefined;
                    berlin_block?: string | undefined;
                    london_block?: string | undefined;
                    arrow_glacier_block?: string | undefined;
                    merge_fork_block?: string | undefined;
                } | undefined;
                allow_unprotected_txs?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
    class GenesisAccount extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            code?: string;
            storage?: dependency_2.ethermint.evm.v1.State[];
        });
        get address(): string;
        set address(value: string);
        get code(): string;
        set code(value: string);
        get storage(): dependency_2.ethermint.evm.v1.State[];
        set storage(value: dependency_2.ethermint.evm.v1.State[]);
        static fromObject(data: {
            address?: string;
            code?: string;
            storage?: ReturnType<typeof dependency_2.ethermint.evm.v1.State.prototype.toObject>[];
        }): GenesisAccount;
        toObject(): {
            address?: string | undefined;
            code?: string | undefined;
            storage?: {
                key?: string | undefined;
                value?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisAccount;
    }
}
//# sourceMappingURL=genesis.d.ts.map