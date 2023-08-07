import * as dependency_2 from "./authz";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.authz.v1beta1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            authorization?: dependency_2.cosmos.authz.v1beta1.GrantAuthorization[];
        });
        get authorization(): dependency_2.cosmos.authz.v1beta1.GrantAuthorization[];
        set authorization(value: dependency_2.cosmos.authz.v1beta1.GrantAuthorization[]);
        static fromObject(data: {
            authorization?: ReturnType<typeof dependency_2.cosmos.authz.v1beta1.GrantAuthorization.prototype.toObject>[];
        }): GenesisState;
        toObject(): {
            authorization?: {
                granter?: string | undefined;
                grantee?: string | undefined;
                authorization?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                expiration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
}
//# sourceMappingURL=genesis.d.ts.map