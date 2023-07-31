import * as dependency_2 from "./../../../../google/protobuf/any";
import * as dependency_3 from "./../../client/v1/client";
import * as dependency_4 from "./connection";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.connection.v1 {
    class MsgConnectionOpenInit extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            counterparty?: dependency_4.ibc.core.connection.v1.Counterparty;
            version?: dependency_4.ibc.core.connection.v1.Version;
            delay_period?: number;
            signer?: string;
        });
        get client_id(): string;
        set client_id(value: string);
        get counterparty(): dependency_4.ibc.core.connection.v1.Counterparty;
        set counterparty(value: dependency_4.ibc.core.connection.v1.Counterparty);
        get version(): dependency_4.ibc.core.connection.v1.Version;
        set version(value: dependency_4.ibc.core.connection.v1.Version);
        get delay_period(): number;
        set delay_period(value: number);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            client_id?: string;
            counterparty?: ReturnType<typeof dependency_4.ibc.core.connection.v1.Counterparty.prototype.toObject>;
            version?: ReturnType<typeof dependency_4.ibc.core.connection.v1.Version.prototype.toObject>;
            delay_period?: number;
            signer?: string;
        }): MsgConnectionOpenInit;
        toObject(): {
            client_id?: string | undefined;
            counterparty?: {
                client_id?: string | undefined;
                connection_id?: string | undefined;
                prefix?: {
                    key_prefix?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            version?: {
                identifier?: string | undefined;
                features?: string[] | undefined;
            } | undefined;
            delay_period?: number | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConnectionOpenInit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConnectionOpenInit;
    }
    class MsgConnectionOpenInitResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgConnectionOpenInitResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConnectionOpenInitResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConnectionOpenInitResponse;
    }
    class MsgConnectionOpenTry extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            previous_connection_id?: string;
            client_state?: dependency_2.google.protobuf.Any;
            counterparty?: dependency_4.ibc.core.connection.v1.Counterparty;
            delay_period?: number;
            counterparty_versions?: dependency_4.ibc.core.connection.v1.Version[];
            proof_height?: dependency_3.ibc.core.client.v1.Height;
            proof_init?: Uint8Array;
            proof_client?: Uint8Array;
            proof_consensus?: Uint8Array;
            consensus_height?: dependency_3.ibc.core.client.v1.Height;
            signer?: string;
        });
        get client_id(): string;
        set client_id(value: string);
        get previous_connection_id(): string;
        set previous_connection_id(value: string);
        get client_state(): dependency_2.google.protobuf.Any;
        set client_state(value: dependency_2.google.protobuf.Any);
        get counterparty(): dependency_4.ibc.core.connection.v1.Counterparty;
        set counterparty(value: dependency_4.ibc.core.connection.v1.Counterparty);
        get delay_period(): number;
        set delay_period(value: number);
        get counterparty_versions(): dependency_4.ibc.core.connection.v1.Version[];
        set counterparty_versions(value: dependency_4.ibc.core.connection.v1.Version[]);
        get proof_height(): dependency_3.ibc.core.client.v1.Height;
        set proof_height(value: dependency_3.ibc.core.client.v1.Height);
        get proof_init(): Uint8Array;
        set proof_init(value: Uint8Array);
        get proof_client(): Uint8Array;
        set proof_client(value: Uint8Array);
        get proof_consensus(): Uint8Array;
        set proof_consensus(value: Uint8Array);
        get consensus_height(): dependency_3.ibc.core.client.v1.Height;
        set consensus_height(value: dependency_3.ibc.core.client.v1.Height);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            client_id?: string;
            previous_connection_id?: string;
            client_state?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
            counterparty?: ReturnType<typeof dependency_4.ibc.core.connection.v1.Counterparty.prototype.toObject>;
            delay_period?: number;
            counterparty_versions?: ReturnType<typeof dependency_4.ibc.core.connection.v1.Version.prototype.toObject>[];
            proof_height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
            proof_init?: Uint8Array;
            proof_client?: Uint8Array;
            proof_consensus?: Uint8Array;
            consensus_height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
            signer?: string;
        }): MsgConnectionOpenTry;
        toObject(): {
            client_id?: string | undefined;
            previous_connection_id?: string | undefined;
            client_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            counterparty?: {
                client_id?: string | undefined;
                connection_id?: string | undefined;
                prefix?: {
                    key_prefix?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            delay_period?: number | undefined;
            counterparty_versions?: {
                identifier?: string | undefined;
                features?: string[] | undefined;
            }[] | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            proof_init?: Uint8Array | undefined;
            proof_client?: Uint8Array | undefined;
            proof_consensus?: Uint8Array | undefined;
            consensus_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConnectionOpenTry;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConnectionOpenTry;
    }
    class MsgConnectionOpenTryResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgConnectionOpenTryResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConnectionOpenTryResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConnectionOpenTryResponse;
    }
    class MsgConnectionOpenAck extends pb_1.Message {
        constructor(data?: any[] | {
            connection_id?: string;
            counterparty_connection_id?: string;
            version?: dependency_4.ibc.core.connection.v1.Version;
            client_state?: dependency_2.google.protobuf.Any;
            proof_height?: dependency_3.ibc.core.client.v1.Height;
            proof_try?: Uint8Array;
            proof_client?: Uint8Array;
            proof_consensus?: Uint8Array;
            consensus_height?: dependency_3.ibc.core.client.v1.Height;
            signer?: string;
        });
        get connection_id(): string;
        set connection_id(value: string);
        get counterparty_connection_id(): string;
        set counterparty_connection_id(value: string);
        get version(): dependency_4.ibc.core.connection.v1.Version;
        set version(value: dependency_4.ibc.core.connection.v1.Version);
        get client_state(): dependency_2.google.protobuf.Any;
        set client_state(value: dependency_2.google.protobuf.Any);
        get proof_height(): dependency_3.ibc.core.client.v1.Height;
        set proof_height(value: dependency_3.ibc.core.client.v1.Height);
        get proof_try(): Uint8Array;
        set proof_try(value: Uint8Array);
        get proof_client(): Uint8Array;
        set proof_client(value: Uint8Array);
        get proof_consensus(): Uint8Array;
        set proof_consensus(value: Uint8Array);
        get consensus_height(): dependency_3.ibc.core.client.v1.Height;
        set consensus_height(value: dependency_3.ibc.core.client.v1.Height);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            connection_id?: string;
            counterparty_connection_id?: string;
            version?: ReturnType<typeof dependency_4.ibc.core.connection.v1.Version.prototype.toObject>;
            client_state?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
            proof_height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
            proof_try?: Uint8Array;
            proof_client?: Uint8Array;
            proof_consensus?: Uint8Array;
            consensus_height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
            signer?: string;
        }): MsgConnectionOpenAck;
        toObject(): {
            connection_id?: string | undefined;
            counterparty_connection_id?: string | undefined;
            version?: {
                identifier?: string | undefined;
                features?: string[] | undefined;
            } | undefined;
            client_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            proof_try?: Uint8Array | undefined;
            proof_client?: Uint8Array | undefined;
            proof_consensus?: Uint8Array | undefined;
            consensus_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConnectionOpenAck;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConnectionOpenAck;
    }
    class MsgConnectionOpenAckResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgConnectionOpenAckResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConnectionOpenAckResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConnectionOpenAckResponse;
    }
    class MsgConnectionOpenConfirm extends pb_1.Message {
        constructor(data?: any[] | {
            connection_id?: string;
            proof_ack?: Uint8Array;
            proof_height?: dependency_3.ibc.core.client.v1.Height;
            signer?: string;
        });
        get connection_id(): string;
        set connection_id(value: string);
        get proof_ack(): Uint8Array;
        set proof_ack(value: Uint8Array);
        get proof_height(): dependency_3.ibc.core.client.v1.Height;
        set proof_height(value: dependency_3.ibc.core.client.v1.Height);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            connection_id?: string;
            proof_ack?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
            signer?: string;
        }): MsgConnectionOpenConfirm;
        toObject(): {
            connection_id?: string | undefined;
            proof_ack?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConnectionOpenConfirm;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConnectionOpenConfirm;
    }
    class MsgConnectionOpenConfirmResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgConnectionOpenConfirmResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgConnectionOpenConfirmResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgConnectionOpenConfirmResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map