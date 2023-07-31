import * as dependency_2 from "./../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.feegrant.v1beta1 {
    class MsgGrantAllowance extends pb_1.Message {
        constructor(data?: any[] | {
            granter?: string;
            grantee?: string;
            allowance?: dependency_2.google.protobuf.Any;
        });
        get granter(): string;
        set granter(value: string);
        get grantee(): string;
        set grantee(value: string);
        get allowance(): dependency_2.google.protobuf.Any;
        set allowance(value: dependency_2.google.protobuf.Any);
        static fromObject(data: {
            granter?: string;
            grantee?: string;
            allowance?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
        }): MsgGrantAllowance;
        toObject(): {
            granter?: string | undefined;
            grantee?: string | undefined;
            allowance?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgGrantAllowance;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgGrantAllowance;
    }
    class MsgGrantAllowanceResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgGrantAllowanceResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgGrantAllowanceResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgGrantAllowanceResponse;
    }
    class MsgRevokeAllowance extends pb_1.Message {
        constructor(data?: any[] | {
            granter?: string;
            grantee?: string;
        });
        get granter(): string;
        set granter(value: string);
        get grantee(): string;
        set grantee(value: string);
        static fromObject(data: {
            granter?: string;
            grantee?: string;
        }): MsgRevokeAllowance;
        toObject(): {
            granter?: string | undefined;
            grantee?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgRevokeAllowance;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgRevokeAllowance;
    }
    class MsgRevokeAllowanceResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgRevokeAllowanceResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgRevokeAllowanceResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgRevokeAllowanceResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map