import * as dependency_3 from "./../../../../cosmos/auth/v1beta1/auth";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.interchain_accounts.v1 {
    class InterchainAccount extends pb_1.Message {
        constructor(data?: any[] | {
            base_account?: dependency_3.cosmos.auth.v1beta1.BaseAccount;
            account_owner?: string;
        });
        get base_account(): dependency_3.cosmos.auth.v1beta1.BaseAccount;
        set base_account(value: dependency_3.cosmos.auth.v1beta1.BaseAccount);
        get account_owner(): string;
        set account_owner(value: string);
        static fromObject(data: {
            base_account?: ReturnType<typeof dependency_3.cosmos.auth.v1beta1.BaseAccount.prototype.toObject>;
            account_owner?: string;
        }): InterchainAccount;
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
            account_owner?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): InterchainAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): InterchainAccount;
    }
}
//# sourceMappingURL=account.d.ts.map