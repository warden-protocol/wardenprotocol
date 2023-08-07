import * as pb_1 from "google-protobuf";
export declare namespace ethermint.evm.v1 {
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            evm_denom?: string;
            enable_create?: boolean;
            enable_call?: boolean;
            extra_eips?: number[];
            chain_config?: ChainConfig;
            allow_unprotected_txs?: boolean;
        });
        get evm_denom(): string;
        set evm_denom(value: string);
        get enable_create(): boolean;
        set enable_create(value: boolean);
        get enable_call(): boolean;
        set enable_call(value: boolean);
        get extra_eips(): number[];
        set extra_eips(value: number[]);
        get chain_config(): ChainConfig;
        set chain_config(value: ChainConfig);
        get allow_unprotected_txs(): boolean;
        set allow_unprotected_txs(value: boolean);
        static fromObject(data: {
            evm_denom?: string;
            enable_create?: boolean;
            enable_call?: boolean;
            extra_eips?: number[];
            chain_config?: ReturnType<typeof ChainConfig.prototype.toObject>;
            allow_unprotected_txs?: boolean;
        }): Params;
        toObject(): {
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
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
    class ChainConfig extends pb_1.Message {
        constructor(data?: any[] | {
            homestead_block?: string;
            dao_fork_block?: string;
            dao_fork_support?: boolean;
            eip150_block?: string;
            eip150_hash?: string;
            eip155_block?: string;
            eip158_block?: string;
            byzantium_block?: string;
            constantinople_block?: string;
            petersburg_block?: string;
            istanbul_block?: string;
            muir_glacier_block?: string;
            berlin_block?: string;
            london_block?: string;
            arrow_glacier_block?: string;
            merge_fork_block?: string;
        });
        get homestead_block(): string;
        set homestead_block(value: string);
        get dao_fork_block(): string;
        set dao_fork_block(value: string);
        get dao_fork_support(): boolean;
        set dao_fork_support(value: boolean);
        get eip150_block(): string;
        set eip150_block(value: string);
        get eip150_hash(): string;
        set eip150_hash(value: string);
        get eip155_block(): string;
        set eip155_block(value: string);
        get eip158_block(): string;
        set eip158_block(value: string);
        get byzantium_block(): string;
        set byzantium_block(value: string);
        get constantinople_block(): string;
        set constantinople_block(value: string);
        get petersburg_block(): string;
        set petersburg_block(value: string);
        get istanbul_block(): string;
        set istanbul_block(value: string);
        get muir_glacier_block(): string;
        set muir_glacier_block(value: string);
        get berlin_block(): string;
        set berlin_block(value: string);
        get london_block(): string;
        set london_block(value: string);
        get arrow_glacier_block(): string;
        set arrow_glacier_block(value: string);
        get merge_fork_block(): string;
        set merge_fork_block(value: string);
        static fromObject(data: {
            homestead_block?: string;
            dao_fork_block?: string;
            dao_fork_support?: boolean;
            eip150_block?: string;
            eip150_hash?: string;
            eip155_block?: string;
            eip158_block?: string;
            byzantium_block?: string;
            constantinople_block?: string;
            petersburg_block?: string;
            istanbul_block?: string;
            muir_glacier_block?: string;
            berlin_block?: string;
            london_block?: string;
            arrow_glacier_block?: string;
            merge_fork_block?: string;
        }): ChainConfig;
        toObject(): {
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
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChainConfig;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ChainConfig;
    }
    class State extends pb_1.Message {
        constructor(data?: any[] | {
            key?: string;
            value?: string;
        });
        get key(): string;
        set key(value: string);
        get value(): string;
        set value(value: string);
        static fromObject(data: {
            key?: string;
            value?: string;
        }): State;
        toObject(): {
            key?: string | undefined;
            value?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): State;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): State;
    }
    class TransactionLogs extends pb_1.Message {
        constructor(data?: any[] | {
            hash?: string;
            logs?: Log[];
        });
        get hash(): string;
        set hash(value: string);
        get logs(): Log[];
        set logs(value: Log[]);
        static fromObject(data: {
            hash?: string;
            logs?: ReturnType<typeof Log.prototype.toObject>[];
        }): TransactionLogs;
        toObject(): {
            hash?: string | undefined;
            logs?: {
                address?: string | undefined;
                topics?: string[] | undefined;
                data?: Uint8Array | undefined;
                block_number?: number | undefined;
                tx_hash?: string | undefined;
                tx_index?: number | undefined;
                block_hash?: string | undefined;
                index?: number | undefined;
                removed?: boolean | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TransactionLogs;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TransactionLogs;
    }
    class Log extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            topics?: string[];
            data?: Uint8Array;
            block_number?: number;
            tx_hash?: string;
            tx_index?: number;
            block_hash?: string;
            index?: number;
            removed?: boolean;
        });
        get address(): string;
        set address(value: string);
        get topics(): string[];
        set topics(value: string[]);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get block_number(): number;
        set block_number(value: number);
        get tx_hash(): string;
        set tx_hash(value: string);
        get tx_index(): number;
        set tx_index(value: number);
        get block_hash(): string;
        set block_hash(value: string);
        get index(): number;
        set index(value: number);
        get removed(): boolean;
        set removed(value: boolean);
        static fromObject(data: {
            address?: string;
            topics?: string[];
            data?: Uint8Array;
            block_number?: number;
            tx_hash?: string;
            tx_index?: number;
            block_hash?: string;
            index?: number;
            removed?: boolean;
        }): Log;
        toObject(): {
            address?: string | undefined;
            topics?: string[] | undefined;
            data?: Uint8Array | undefined;
            block_number?: number | undefined;
            tx_hash?: string | undefined;
            tx_index?: number | undefined;
            block_hash?: string | undefined;
            index?: number | undefined;
            removed?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Log;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Log;
    }
    class TxResult extends pb_1.Message {
        constructor(data?: any[] | {
            contract_address?: string;
            bloom?: Uint8Array;
            tx_logs?: TransactionLogs;
            ret?: Uint8Array;
            reverted?: boolean;
            gas_used?: number;
        });
        get contract_address(): string;
        set contract_address(value: string);
        get bloom(): Uint8Array;
        set bloom(value: Uint8Array);
        get tx_logs(): TransactionLogs;
        set tx_logs(value: TransactionLogs);
        get ret(): Uint8Array;
        set ret(value: Uint8Array);
        get reverted(): boolean;
        set reverted(value: boolean);
        get gas_used(): number;
        set gas_used(value: number);
        static fromObject(data: {
            contract_address?: string;
            bloom?: Uint8Array;
            tx_logs?: ReturnType<typeof TransactionLogs.prototype.toObject>;
            ret?: Uint8Array;
            reverted?: boolean;
            gas_used?: number;
        }): TxResult;
        toObject(): {
            contract_address?: string | undefined;
            bloom?: Uint8Array | undefined;
            tx_logs?: {
                hash?: string | undefined;
                logs?: {
                    address?: string | undefined;
                    topics?: string[] | undefined;
                    data?: Uint8Array | undefined;
                    block_number?: number | undefined;
                    tx_hash?: string | undefined;
                    tx_index?: number | undefined;
                    block_hash?: string | undefined;
                    index?: number | undefined;
                    removed?: boolean | undefined;
                }[] | undefined;
            } | undefined;
            ret?: Uint8Array | undefined;
            reverted?: boolean | undefined;
            gas_used?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TxResult;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TxResult;
    }
    class AccessTuple extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            storage_keys?: string[];
        });
        get address(): string;
        set address(value: string);
        get storage_keys(): string[];
        set storage_keys(value: string[]);
        static fromObject(data: {
            address?: string;
            storage_keys?: string[];
        }): AccessTuple;
        toObject(): {
            address?: string | undefined;
            storage_keys?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccessTuple;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccessTuple;
    }
    class TraceConfig extends pb_1.Message {
        constructor(data?: any[] | {
            tracer?: string;
            timeout?: string;
            reexec?: number;
            disable_stack?: boolean;
            disable_storage?: boolean;
            debug?: boolean;
            limit?: number;
            overrides?: ChainConfig;
            enable_memory?: boolean;
            enable_return_data?: boolean;
        });
        get tracer(): string;
        set tracer(value: string);
        get timeout(): string;
        set timeout(value: string);
        get reexec(): number;
        set reexec(value: number);
        get disable_stack(): boolean;
        set disable_stack(value: boolean);
        get disable_storage(): boolean;
        set disable_storage(value: boolean);
        get debug(): boolean;
        set debug(value: boolean);
        get limit(): number;
        set limit(value: number);
        get overrides(): ChainConfig;
        set overrides(value: ChainConfig);
        get enable_memory(): boolean;
        set enable_memory(value: boolean);
        get enable_return_data(): boolean;
        set enable_return_data(value: boolean);
        static fromObject(data: {
            tracer?: string;
            timeout?: string;
            reexec?: number;
            disable_stack?: boolean;
            disable_storage?: boolean;
            debug?: boolean;
            limit?: number;
            overrides?: ReturnType<typeof ChainConfig.prototype.toObject>;
            enable_memory?: boolean;
            enable_return_data?: boolean;
        }): TraceConfig;
        toObject(): {
            tracer?: string | undefined;
            timeout?: string | undefined;
            reexec?: number | undefined;
            disable_stack?: boolean | undefined;
            disable_storage?: boolean | undefined;
            debug?: boolean | undefined;
            limit?: number | undefined;
            overrides?: {
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
            enable_memory?: boolean | undefined;
            enable_return_data?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TraceConfig;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TraceConfig;
    }
}
//# sourceMappingURL=evm.d.ts.map