import * as dependency_3 from "./../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.auth.v1beta1 {
    class BaseAccount extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            pub_key?: dependency_3.google.protobuf.Any;
            account_number?: number;
            sequence?: number;
        });
        get address(): string;
        set address(value: string);
        get pub_key(): dependency_3.google.protobuf.Any;
        set pub_key(value: dependency_3.google.protobuf.Any);
        get account_number(): number;
        set account_number(value: number);
        get sequence(): number;
        set sequence(value: number);
        static fromObject(data: {
            address?: string;
            pub_key?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>;
            account_number?: number;
            sequence?: number;
        }): BaseAccount;
        toObject(): {
            address?: string | undefined;
            pub_key?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            account_number?: number | undefined;
            sequence?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BaseAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BaseAccount;
    }
    class ModuleAccount extends pb_1.Message {
        constructor(data?: any[] | {
            base_account?: BaseAccount;
            name?: string;
            permissions?: string[];
        });
        get base_account(): BaseAccount;
        set base_account(value: BaseAccount);
        get name(): string;
        set name(value: string);
        get permissions(): string[];
        set permissions(value: string[]);
        static fromObject(data: {
            base_account?: ReturnType<typeof BaseAccount.prototype.toObject>;
            name?: string;
            permissions?: string[];
        }): ModuleAccount;
        toObject(): {
            base_account?: {
                address?: string | undefined;
                pub_key?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                account_number?: number | undefined;
                sequence?: number | undefined;
            } | undefined;
            name?: string | undefined;
            permissions?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ModuleAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ModuleAccount;
    }
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            max_memo_characters?: number;
            tx_sig_limit?: number;
            tx_size_cost_per_byte?: number;
            sig_verify_cost_ed25519?: number;
            sig_verify_cost_secp256k1?: number;
        });
        get max_memo_characters(): number;
        set max_memo_characters(value: number);
        get tx_sig_limit(): number;
        set tx_sig_limit(value: number);
        get tx_size_cost_per_byte(): number;
        set tx_size_cost_per_byte(value: number);
        get sig_verify_cost_ed25519(): number;
        set sig_verify_cost_ed25519(value: number);
        get sig_verify_cost_secp256k1(): number;
        set sig_verify_cost_secp256k1(value: number);
        static fromObject(data: {
            max_memo_characters?: number;
            tx_sig_limit?: number;
            tx_size_cost_per_byte?: number;
            sig_verify_cost_ed25519?: number;
            sig_verify_cost_secp256k1?: number;
        }): Params;
        toObject(): {
            max_memo_characters?: number | undefined;
            tx_sig_limit?: number | undefined;
            tx_size_cost_per_byte?: number | undefined;
            sig_verify_cost_ed25519?: number | undefined;
            sig_verify_cost_secp256k1?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
}
//# sourceMappingURL=auth.d.ts.map