import * as dependency_2 from "./../../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.client.v1 {
    class MsgCreateClient extends pb_1.Message {
        constructor(data?: any[] | {
            client_state?: dependency_2.google.protobuf.Any;
            consensus_state?: dependency_2.google.protobuf.Any;
            signer?: string;
        });
        get client_state(): dependency_2.google.protobuf.Any;
        set client_state(value: dependency_2.google.protobuf.Any);
        get consensus_state(): dependency_2.google.protobuf.Any;
        set consensus_state(value: dependency_2.google.protobuf.Any);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            client_state?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
            consensus_state?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
            signer?: string;
        }): MsgCreateClient;
        toObject(): {
            client_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            consensus_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgCreateClient;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgCreateClient;
    }
    class MsgCreateClientResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgCreateClientResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgCreateClientResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgCreateClientResponse;
    }
    class MsgUpdateClient extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            header?: dependency_2.google.protobuf.Any;
            signer?: string;
        });
        get client_id(): string;
        set client_id(value: string);
        get header(): dependency_2.google.protobuf.Any;
        set header(value: dependency_2.google.protobuf.Any);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            client_id?: string;
            header?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
            signer?: string;
        }): MsgUpdateClient;
        toObject(): {
            client_id?: string | undefined;
            header?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgUpdateClient;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgUpdateClient;
    }
    class MsgUpdateClientResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgUpdateClientResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgUpdateClientResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgUpdateClientResponse;
    }
    class MsgUpgradeClient extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            client_state?: dependency_2.google.protobuf.Any;
            consensus_state?: dependency_2.google.protobuf.Any;
            proof_upgrade_client?: Uint8Array;
            proof_upgrade_consensus_state?: Uint8Array;
            signer?: string;
        });
        get client_id(): string;
        set client_id(value: string);
        get client_state(): dependency_2.google.protobuf.Any;
        set client_state(value: dependency_2.google.protobuf.Any);
        get consensus_state(): dependency_2.google.protobuf.Any;
        set consensus_state(value: dependency_2.google.protobuf.Any);
        get proof_upgrade_client(): Uint8Array;
        set proof_upgrade_client(value: Uint8Array);
        get proof_upgrade_consensus_state(): Uint8Array;
        set proof_upgrade_consensus_state(value: Uint8Array);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            client_id?: string;
            client_state?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
            consensus_state?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
            proof_upgrade_client?: Uint8Array;
            proof_upgrade_consensus_state?: Uint8Array;
            signer?: string;
        }): MsgUpgradeClient;
        toObject(): {
            client_id?: string | undefined;
            client_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            consensus_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            proof_upgrade_client?: Uint8Array | undefined;
            proof_upgrade_consensus_state?: Uint8Array | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgUpgradeClient;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgUpgradeClient;
    }
    class MsgUpgradeClientResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgUpgradeClientResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgUpgradeClientResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgUpgradeClientResponse;
    }
    class MsgSubmitMisbehaviour extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            misbehaviour?: dependency_2.google.protobuf.Any;
            signer?: string;
        });
        get client_id(): string;
        set client_id(value: string);
        get misbehaviour(): dependency_2.google.protobuf.Any;
        set misbehaviour(value: dependency_2.google.protobuf.Any);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            client_id?: string;
            misbehaviour?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
            signer?: string;
        }): MsgSubmitMisbehaviour;
        toObject(): {
            client_id?: string | undefined;
            misbehaviour?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgSubmitMisbehaviour;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgSubmitMisbehaviour;
    }
    class MsgSubmitMisbehaviourResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgSubmitMisbehaviourResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgSubmitMisbehaviourResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgSubmitMisbehaviourResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map