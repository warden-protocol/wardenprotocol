import * as dependency_4 from "./../../../google/protobuf/any";
import * as dependency_6 from "./authz";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.authz.v1beta1 {
    class MsgGrant extends pb_1.Message {
        constructor(data?: any[] | {
            granter?: string;
            grantee?: string;
            grant?: dependency_6.cosmos.authz.v1beta1.Grant;
        });
        get granter(): string;
        set granter(value: string);
        get grantee(): string;
        set grantee(value: string);
        get grant(): dependency_6.cosmos.authz.v1beta1.Grant;
        set grant(value: dependency_6.cosmos.authz.v1beta1.Grant);
        static fromObject(data: {
            granter?: string;
            grantee?: string;
            grant?: ReturnType<typeof dependency_6.cosmos.authz.v1beta1.Grant.prototype.toObject>;
        }): MsgGrant;
        toObject(): {
            granter?: string | undefined;
            grantee?: string | undefined;
            grant?: {
                authorization?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                expiration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgGrant;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgGrant;
    }
    class MsgExecResponse extends pb_1.Message {
        constructor(data?: any[] | {
            results?: Uint8Array[];
        });
        get results(): Uint8Array[];
        set results(value: Uint8Array[]);
        static fromObject(data: {
            results?: Uint8Array[];
        }): MsgExecResponse;
        toObject(): {
            results?: Uint8Array[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgExecResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgExecResponse;
    }
    class MsgExec extends pb_1.Message {
        constructor(data?: any[] | {
            grantee?: string;
            msgs?: dependency_4.google.protobuf.Any[];
        });
        get grantee(): string;
        set grantee(value: string);
        get msgs(): dependency_4.google.protobuf.Any[];
        set msgs(value: dependency_4.google.protobuf.Any[]);
        static fromObject(data: {
            grantee?: string;
            msgs?: ReturnType<typeof dependency_4.google.protobuf.Any.prototype.toObject>[];
        }): MsgExec;
        toObject(): {
            grantee?: string | undefined;
            msgs?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgExec;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgExec;
    }
    class MsgGrantResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgGrantResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgGrantResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgGrantResponse;
    }
    class MsgRevoke extends pb_1.Message {
        constructor(data?: any[] | {
            granter?: string;
            grantee?: string;
            msg_type_url?: string;
        });
        get granter(): string;
        set granter(value: string);
        get grantee(): string;
        set grantee(value: string);
        get msg_type_url(): string;
        set msg_type_url(value: string);
        static fromObject(data: {
            granter?: string;
            grantee?: string;
            msg_type_url?: string;
        }): MsgRevoke;
        toObject(): {
            granter?: string | undefined;
            grantee?: string | undefined;
            msg_type_url?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgRevoke;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgRevoke;
    }
    class MsgRevokeResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgRevokeResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgRevokeResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgRevokeResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map