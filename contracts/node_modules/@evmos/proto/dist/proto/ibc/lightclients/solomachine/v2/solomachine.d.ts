import * as dependency_1 from "./../../../core/connection/v1/connection";
import * as dependency_2 from "./../../../core/channel/v1/channel";
import * as dependency_4 from "./../../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.lightclients.solomachine.v2 {
    enum DataType {
        DATA_TYPE_UNINITIALIZED_UNSPECIFIED = 0,
        DATA_TYPE_CLIENT_STATE = 1,
        DATA_TYPE_CONSENSUS_STATE = 2,
        DATA_TYPE_CONNECTION_STATE = 3,
        DATA_TYPE_CHANNEL_STATE = 4,
        DATA_TYPE_PACKET_COMMITMENT = 5,
        DATA_TYPE_PACKET_ACKNOWLEDGEMENT = 6,
        DATA_TYPE_PACKET_RECEIPT_ABSENCE = 7,
        DATA_TYPE_NEXT_SEQUENCE_RECV = 8,
        DATA_TYPE_HEADER = 9
    }
    class ClientState extends pb_1.Message {
        constructor(data?: any[] | {
            sequence?: number;
            is_frozen?: boolean;
            consensus_state?: ConsensusState;
            allow_update_after_proposal?: boolean;
        });
        get sequence(): number;
        set sequence(value: number);
        get is_frozen(): boolean;
        set is_frozen(value: boolean);
        get consensus_state(): ConsensusState;
        set consensus_state(value: ConsensusState);
        get allow_update_after_proposal(): boolean;
        set allow_update_after_proposal(value: boolean);
        static fromObject(data: {
            sequence?: number;
            is_frozen?: boolean;
            consensus_state?: ReturnType<typeof ConsensusState.prototype.toObject>;
            allow_update_after_proposal?: boolean;
        }): ClientState;
        toObject(): {
            sequence?: number | undefined;
            is_frozen?: boolean | undefined;
            consensus_state?: {
                public_key?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                diversifier?: string | undefined;
                timestamp?: number | undefined;
            } | undefined;
            allow_update_after_proposal?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ClientState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ClientState;
    }
    class ConsensusState extends pb_1.Message {
        constructor(data?: any[] | {
            public_key?: dependency_4.google.protobuf.Any;
            diversifier?: string;
            timestamp?: number;
        });
        get public_key(): dependency_4.google.protobuf.Any;
        set public_key(value: dependency_4.google.protobuf.Any);
        get diversifier(): string;
        set diversifier(value: string);
        get timestamp(): number;
        set timestamp(value: number);
        static fromObject(data: {
            public_key?: ReturnType<typeof dependency_4.google.protobuf.Any.prototype.toObject>;
            diversifier?: string;
            timestamp?: number;
        }): ConsensusState;
        toObject(): {
            public_key?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            diversifier?: string | undefined;
            timestamp?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ConsensusState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ConsensusState;
    }
    class Header extends pb_1.Message {
        constructor(data?: any[] | {
            sequence?: number;
            timestamp?: number;
            signature?: Uint8Array;
            new_public_key?: dependency_4.google.protobuf.Any;
            new_diversifier?: string;
        });
        get sequence(): number;
        set sequence(value: number);
        get timestamp(): number;
        set timestamp(value: number);
        get signature(): Uint8Array;
        set signature(value: Uint8Array);
        get new_public_key(): dependency_4.google.protobuf.Any;
        set new_public_key(value: dependency_4.google.protobuf.Any);
        get new_diversifier(): string;
        set new_diversifier(value: string);
        static fromObject(data: {
            sequence?: number;
            timestamp?: number;
            signature?: Uint8Array;
            new_public_key?: ReturnType<typeof dependency_4.google.protobuf.Any.prototype.toObject>;
            new_diversifier?: string;
        }): Header;
        toObject(): {
            sequence?: number | undefined;
            timestamp?: number | undefined;
            signature?: Uint8Array | undefined;
            new_public_key?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            new_diversifier?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Header;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Header;
    }
    class Misbehaviour extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            sequence?: number;
            signature_one?: SignatureAndData;
            signature_two?: SignatureAndData;
        });
        get client_id(): string;
        set client_id(value: string);
        get sequence(): number;
        set sequence(value: number);
        get signature_one(): SignatureAndData;
        set signature_one(value: SignatureAndData);
        get signature_two(): SignatureAndData;
        set signature_two(value: SignatureAndData);
        static fromObject(data: {
            client_id?: string;
            sequence?: number;
            signature_one?: ReturnType<typeof SignatureAndData.prototype.toObject>;
            signature_two?: ReturnType<typeof SignatureAndData.prototype.toObject>;
        }): Misbehaviour;
        toObject(): {
            client_id?: string | undefined;
            sequence?: number | undefined;
            signature_one?: {
                signature?: Uint8Array | undefined;
                data_type?: DataType | undefined;
                data?: Uint8Array | undefined;
                timestamp?: number | undefined;
            } | undefined;
            signature_two?: {
                signature?: Uint8Array | undefined;
                data_type?: DataType | undefined;
                data?: Uint8Array | undefined;
                timestamp?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Misbehaviour;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Misbehaviour;
    }
    class SignatureAndData extends pb_1.Message {
        constructor(data?: any[] | {
            signature?: Uint8Array;
            data_type?: DataType;
            data?: Uint8Array;
            timestamp?: number;
        });
        get signature(): Uint8Array;
        set signature(value: Uint8Array);
        get data_type(): DataType;
        set data_type(value: DataType);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get timestamp(): number;
        set timestamp(value: number);
        static fromObject(data: {
            signature?: Uint8Array;
            data_type?: DataType;
            data?: Uint8Array;
            timestamp?: number;
        }): SignatureAndData;
        toObject(): {
            signature?: Uint8Array | undefined;
            data_type?: DataType | undefined;
            data?: Uint8Array | undefined;
            timestamp?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SignatureAndData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SignatureAndData;
    }
    class TimestampedSignatureData extends pb_1.Message {
        constructor(data?: any[] | {
            signature_data?: Uint8Array;
            timestamp?: number;
        });
        get signature_data(): Uint8Array;
        set signature_data(value: Uint8Array);
        get timestamp(): number;
        set timestamp(value: number);
        static fromObject(data: {
            signature_data?: Uint8Array;
            timestamp?: number;
        }): TimestampedSignatureData;
        toObject(): {
            signature_data?: Uint8Array | undefined;
            timestamp?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TimestampedSignatureData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): TimestampedSignatureData;
    }
    class SignBytes extends pb_1.Message {
        constructor(data?: any[] | {
            sequence?: number;
            timestamp?: number;
            diversifier?: string;
            data_type?: DataType;
            data?: Uint8Array;
        });
        get sequence(): number;
        set sequence(value: number);
        get timestamp(): number;
        set timestamp(value: number);
        get diversifier(): string;
        set diversifier(value: string);
        get data_type(): DataType;
        set data_type(value: DataType);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        static fromObject(data: {
            sequence?: number;
            timestamp?: number;
            diversifier?: string;
            data_type?: DataType;
            data?: Uint8Array;
        }): SignBytes;
        toObject(): {
            sequence?: number | undefined;
            timestamp?: number | undefined;
            diversifier?: string | undefined;
            data_type?: DataType | undefined;
            data?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SignBytes;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SignBytes;
    }
    class HeaderData extends pb_1.Message {
        constructor(data?: any[] | {
            new_pub_key?: dependency_4.google.protobuf.Any;
            new_diversifier?: string;
        });
        get new_pub_key(): dependency_4.google.protobuf.Any;
        set new_pub_key(value: dependency_4.google.protobuf.Any);
        get new_diversifier(): string;
        set new_diversifier(value: string);
        static fromObject(data: {
            new_pub_key?: ReturnType<typeof dependency_4.google.protobuf.Any.prototype.toObject>;
            new_diversifier?: string;
        }): HeaderData;
        toObject(): {
            new_pub_key?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            new_diversifier?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): HeaderData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): HeaderData;
    }
    class ClientStateData extends pb_1.Message {
        constructor(data?: any[] | {
            path?: Uint8Array;
            client_state?: dependency_4.google.protobuf.Any;
        });
        get path(): Uint8Array;
        set path(value: Uint8Array);
        get client_state(): dependency_4.google.protobuf.Any;
        set client_state(value: dependency_4.google.protobuf.Any);
        static fromObject(data: {
            path?: Uint8Array;
            client_state?: ReturnType<typeof dependency_4.google.protobuf.Any.prototype.toObject>;
        }): ClientStateData;
        toObject(): {
            path?: Uint8Array | undefined;
            client_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ClientStateData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ClientStateData;
    }
    class ConsensusStateData extends pb_1.Message {
        constructor(data?: any[] | {
            path?: Uint8Array;
            consensus_state?: dependency_4.google.protobuf.Any;
        });
        get path(): Uint8Array;
        set path(value: Uint8Array);
        get consensus_state(): dependency_4.google.protobuf.Any;
        set consensus_state(value: dependency_4.google.protobuf.Any);
        static fromObject(data: {
            path?: Uint8Array;
            consensus_state?: ReturnType<typeof dependency_4.google.protobuf.Any.prototype.toObject>;
        }): ConsensusStateData;
        toObject(): {
            path?: Uint8Array | undefined;
            consensus_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ConsensusStateData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ConsensusStateData;
    }
    class ConnectionStateData extends pb_1.Message {
        constructor(data?: any[] | {
            path?: Uint8Array;
            connection?: dependency_1.ibc.core.connection.v1.ConnectionEnd;
        });
        get path(): Uint8Array;
        set path(value: Uint8Array);
        get connection(): dependency_1.ibc.core.connection.v1.ConnectionEnd;
        set connection(value: dependency_1.ibc.core.connection.v1.ConnectionEnd);
        static fromObject(data: {
            path?: Uint8Array;
            connection?: ReturnType<typeof dependency_1.ibc.core.connection.v1.ConnectionEnd.prototype.toObject>;
        }): ConnectionStateData;
        toObject(): {
            path?: Uint8Array | undefined;
            connection?: {
                client_id?: string | undefined;
                versions?: {
                    identifier?: string | undefined;
                    features?: string[] | undefined;
                }[] | undefined;
                state?: dependency_1.ibc.core.connection.v1.State | undefined;
                counterparty?: {
                    client_id?: string | undefined;
                    connection_id?: string | undefined;
                    prefix?: {
                        key_prefix?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                delay_period?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ConnectionStateData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ConnectionStateData;
    }
    class ChannelStateData extends pb_1.Message {
        constructor(data?: any[] | {
            path?: Uint8Array;
            channel?: dependency_2.ibc.core.channel.v1.Channel;
        });
        get path(): Uint8Array;
        set path(value: Uint8Array);
        get channel(): dependency_2.ibc.core.channel.v1.Channel;
        set channel(value: dependency_2.ibc.core.channel.v1.Channel);
        static fromObject(data: {
            path?: Uint8Array;
            channel?: ReturnType<typeof dependency_2.ibc.core.channel.v1.Channel.prototype.toObject>;
        }): ChannelStateData;
        toObject(): {
            path?: Uint8Array | undefined;
            channel?: {
                state?: dependency_2.ibc.core.channel.v1.State | undefined;
                ordering?: dependency_2.ibc.core.channel.v1.Order | undefined;
                counterparty?: {
                    port_id?: string | undefined;
                    channel_id?: string | undefined;
                } | undefined;
                connection_hops?: string[] | undefined;
                version?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChannelStateData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ChannelStateData;
    }
    class PacketCommitmentData extends pb_1.Message {
        constructor(data?: any[] | {
            path?: Uint8Array;
            commitment?: Uint8Array;
        });
        get path(): Uint8Array;
        set path(value: Uint8Array);
        get commitment(): Uint8Array;
        set commitment(value: Uint8Array);
        static fromObject(data: {
            path?: Uint8Array;
            commitment?: Uint8Array;
        }): PacketCommitmentData;
        toObject(): {
            path?: Uint8Array | undefined;
            commitment?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PacketCommitmentData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PacketCommitmentData;
    }
    class PacketAcknowledgementData extends pb_1.Message {
        constructor(data?: any[] | {
            path?: Uint8Array;
            acknowledgement?: Uint8Array;
        });
        get path(): Uint8Array;
        set path(value: Uint8Array);
        get acknowledgement(): Uint8Array;
        set acknowledgement(value: Uint8Array);
        static fromObject(data: {
            path?: Uint8Array;
            acknowledgement?: Uint8Array;
        }): PacketAcknowledgementData;
        toObject(): {
            path?: Uint8Array | undefined;
            acknowledgement?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PacketAcknowledgementData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PacketAcknowledgementData;
    }
    class PacketReceiptAbsenceData extends pb_1.Message {
        constructor(data?: any[] | {
            path?: Uint8Array;
        });
        get path(): Uint8Array;
        set path(value: Uint8Array);
        static fromObject(data: {
            path?: Uint8Array;
        }): PacketReceiptAbsenceData;
        toObject(): {
            path?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PacketReceiptAbsenceData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PacketReceiptAbsenceData;
    }
    class NextSequenceRecvData extends pb_1.Message {
        constructor(data?: any[] | {
            path?: Uint8Array;
            next_seq_recv?: number;
        });
        get path(): Uint8Array;
        set path(value: Uint8Array);
        get next_seq_recv(): number;
        set next_seq_recv(value: number);
        static fromObject(data: {
            path?: Uint8Array;
            next_seq_recv?: number;
        }): NextSequenceRecvData;
        toObject(): {
            path?: Uint8Array | undefined;
            next_seq_recv?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NextSequenceRecvData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NextSequenceRecvData;
    }
}
//# sourceMappingURL=solomachine.d.ts.map