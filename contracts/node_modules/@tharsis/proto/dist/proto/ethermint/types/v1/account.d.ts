import * as dependency_1 from "./../../../cosmos/auth/v1beta1/auth";
import * as pb_1 from "google-protobuf";
export declare namespace ethermint.types.v1 {
    class EthAccount extends pb_1.Message {
        constructor(data?: any[] | {
            base_account?: dependency_1.cosmos.auth.v1beta1.BaseAccount;
            code_hash?: string;
        });
        get base_account(): dependency_1.cosmos.auth.v1beta1.BaseAccount;
        set base_account(value: dependency_1.cosmos.auth.v1beta1.BaseAccount);
        get code_hash(): string;
        set code_hash(value: string);
        static fromObject(data: {
            base_account?: ReturnType<typeof dependency_1.cosmos.auth.v1beta1.BaseAccount.prototype.toObject>;
            code_hash?: string;
        }): EthAccount;
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
            code_hash?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EthAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EthAccount;
    }
}
//# sourceMappingURL=account.d.ts.map