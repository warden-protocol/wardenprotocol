import * as dependency_3 from "./../../../google/protobuf/any";
import * as dependency_5 from "./evm";
import * as pb_1 from "google-protobuf";
export declare namespace ethermint.evm.v1 {
    class MsgEthereumTx extends pb_1.Message {
        constructor(data?: any[] | {
            data?: dependency_3.google.protobuf.Any;
            size?: number;
            hash?: string;
            from?: string;
        });
        get data(): dependency_3.google.protobuf.Any;
        set data(value: dependency_3.google.protobuf.Any);
        get size(): number;
        set size(value: number);
        get hash(): string;
        set hash(value: string);
        get from(): string;
        set from(value: string);
        static fromObject(data: {
            data?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>;
            size?: number;
            hash?: string;
            from?: string;
        }): MsgEthereumTx;
        toObject(): {
            data?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            size?: number | undefined;
            hash?: string | undefined;
            from?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgEthereumTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgEthereumTx;
    }
    class LegacyTx extends pb_1.Message {
        constructor(data?: any[] | {
            nonce?: number;
            gas_price?: string;
            gas?: number;
            to?: string;
            value?: string;
            data?: Uint8Array;
            v?: Uint8Array;
            r?: Uint8Array;
            s?: Uint8Array;
        });
        get nonce(): number;
        set nonce(value: number);
        get gas_price(): string;
        set gas_price(value: string);
        get gas(): number;
        set gas(value: number);
        get to(): string;
        set to(value: string);
        get value(): string;
        set value(value: string);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get v(): Uint8Array;
        set v(value: Uint8Array);
        get r(): Uint8Array;
        set r(value: Uint8Array);
        get s(): Uint8Array;
        set s(value: Uint8Array);
        static fromObject(data: {
            nonce?: number;
            gas_price?: string;
            gas?: number;
            to?: string;
            value?: string;
            data?: Uint8Array;
            v?: Uint8Array;
            r?: Uint8Array;
            s?: Uint8Array;
        }): LegacyTx;
        toObject(): {
            nonce?: number | undefined;
            gas_price?: string | undefined;
            gas?: number | undefined;
            to?: string | undefined;
            value?: string | undefined;
            data?: Uint8Array | undefined;
            v?: Uint8Array | undefined;
            r?: Uint8Array | undefined;
            s?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LegacyTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): LegacyTx;
    }
    class AccessListTx extends pb_1.Message {
        constructor(data?: any[] | {
            chain_id?: string;
            nonce?: number;
            gas_price?: string;
            gas?: number;
            to?: string;
            value?: string;
            data?: Uint8Array;
            accesses?: dependency_5.ethermint.evm.v1.AccessTuple[];
            v?: Uint8Array;
            r?: Uint8Array;
            s?: Uint8Array;
        });
        get chain_id(): string;
        set chain_id(value: string);
        get nonce(): number;
        set nonce(value: number);
        get gas_price(): string;
        set gas_price(value: string);
        get gas(): number;
        set gas(value: number);
        get to(): string;
        set to(value: string);
        get value(): string;
        set value(value: string);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get accesses(): dependency_5.ethermint.evm.v1.AccessTuple[];
        set accesses(value: dependency_5.ethermint.evm.v1.AccessTuple[]);
        get v(): Uint8Array;
        set v(value: Uint8Array);
        get r(): Uint8Array;
        set r(value: Uint8Array);
        get s(): Uint8Array;
        set s(value: Uint8Array);
        static fromObject(data: {
            chain_id?: string;
            nonce?: number;
            gas_price?: string;
            gas?: number;
            to?: string;
            value?: string;
            data?: Uint8Array;
            accesses?: ReturnType<typeof dependency_5.ethermint.evm.v1.AccessTuple.prototype.toObject>[];
            v?: Uint8Array;
            r?: Uint8Array;
            s?: Uint8Array;
        }): AccessListTx;
        toObject(): {
            chain_id?: string | undefined;
            nonce?: number | undefined;
            gas_price?: string | undefined;
            gas?: number | undefined;
            to?: string | undefined;
            value?: string | undefined;
            data?: Uint8Array | undefined;
            accesses?: {
                address?: string | undefined;
                storage_keys?: string[] | undefined;
            }[] | undefined;
            v?: Uint8Array | undefined;
            r?: Uint8Array | undefined;
            s?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AccessListTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AccessListTx;
    }
    class DynamicFeeTx extends pb_1.Message {
        constructor(data?: any[] | {
            chain_id?: string;
            nonce?: number;
            gas_tip_cap?: string;
            gas_fee_cap?: string;
            gas?: number;
            to?: string;
            value?: string;
            data?: Uint8Array;
            accesses?: dependency_5.ethermint.evm.v1.AccessTuple[];
            v?: Uint8Array;
            r?: Uint8Array;
            s?: Uint8Array;
        });
        get chain_id(): string;
        set chain_id(value: string);
        get nonce(): number;
        set nonce(value: number);
        get gas_tip_cap(): string;
        set gas_tip_cap(value: string);
        get gas_fee_cap(): string;
        set gas_fee_cap(value: string);
        get gas(): number;
        set gas(value: number);
        get to(): string;
        set to(value: string);
        get value(): string;
        set value(value: string);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get accesses(): dependency_5.ethermint.evm.v1.AccessTuple[];
        set accesses(value: dependency_5.ethermint.evm.v1.AccessTuple[]);
        get v(): Uint8Array;
        set v(value: Uint8Array);
        get r(): Uint8Array;
        set r(value: Uint8Array);
        get s(): Uint8Array;
        set s(value: Uint8Array);
        static fromObject(data: {
            chain_id?: string;
            nonce?: number;
            gas_tip_cap?: string;
            gas_fee_cap?: string;
            gas?: number;
            to?: string;
            value?: string;
            data?: Uint8Array;
            accesses?: ReturnType<typeof dependency_5.ethermint.evm.v1.AccessTuple.prototype.toObject>[];
            v?: Uint8Array;
            r?: Uint8Array;
            s?: Uint8Array;
        }): DynamicFeeTx;
        toObject(): {
            chain_id?: string | undefined;
            nonce?: number | undefined;
            gas_tip_cap?: string | undefined;
            gas_fee_cap?: string | undefined;
            gas?: number | undefined;
            to?: string | undefined;
            value?: string | undefined;
            data?: Uint8Array | undefined;
            accesses?: {
                address?: string | undefined;
                storage_keys?: string[] | undefined;
            }[] | undefined;
            v?: Uint8Array | undefined;
            r?: Uint8Array | undefined;
            s?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DynamicFeeTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DynamicFeeTx;
    }
    class ExtensionOptionsEthereumTx extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): ExtensionOptionsEthereumTx;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ExtensionOptionsEthereumTx;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ExtensionOptionsEthereumTx;
    }
    class MsgEthereumTxResponse extends pb_1.Message {
        constructor(data?: any[] | {
            hash?: string;
            logs?: dependency_5.ethermint.evm.v1.Log[];
            ret?: Uint8Array;
            vm_error?: string;
            gas_used?: number;
        });
        get hash(): string;
        set hash(value: string);
        get logs(): dependency_5.ethermint.evm.v1.Log[];
        set logs(value: dependency_5.ethermint.evm.v1.Log[]);
        get ret(): Uint8Array;
        set ret(value: Uint8Array);
        get vm_error(): string;
        set vm_error(value: string);
        get gas_used(): number;
        set gas_used(value: number);
        static fromObject(data: {
            hash?: string;
            logs?: ReturnType<typeof dependency_5.ethermint.evm.v1.Log.prototype.toObject>[];
            ret?: Uint8Array;
            vm_error?: string;
            gas_used?: number;
        }): MsgEthereumTxResponse;
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
            ret?: Uint8Array | undefined;
            vm_error?: string | undefined;
            gas_used?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgEthereumTxResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgEthereumTxResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map