import * as dependency_2 from "./../../client/v1/client";
import * as dependency_3 from "./channel";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.channel.v1 {
    class MsgChannelOpenInit extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel?: dependency_3.ibc.core.channel.v1.Channel;
            signer?: string;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel(): dependency_3.ibc.core.channel.v1.Channel;
        set channel(value: dependency_3.ibc.core.channel.v1.Channel);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            port_id?: string;
            channel?: ReturnType<typeof dependency_3.ibc.core.channel.v1.Channel.prototype.toObject>;
            signer?: string;
        }): MsgChannelOpenInit;
        toObject(): {
            port_id?: string | undefined;
            channel?: {
                state?: dependency_3.ibc.core.channel.v1.State | undefined;
                ordering?: dependency_3.ibc.core.channel.v1.Order | undefined;
                counterparty?: {
                    port_id?: string | undefined;
                    channel_id?: string | undefined;
                } | undefined;
                connection_hops?: string[] | undefined;
                version?: string | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelOpenInit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelOpenInit;
    }
    class MsgChannelOpenInitResponse extends pb_1.Message {
        constructor(data?: any[] | {
            channel_id?: string;
        });
        get channel_id(): string;
        set channel_id(value: string);
        static fromObject(data: {
            channel_id?: string;
        }): MsgChannelOpenInitResponse;
        toObject(): {
            channel_id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelOpenInitResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelOpenInitResponse;
    }
    class MsgChannelOpenTry extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            previous_channel_id?: string;
            channel?: dependency_3.ibc.core.channel.v1.Channel;
            counterparty_version?: string;
            proof_init?: Uint8Array;
            proof_height?: dependency_2.ibc.core.client.v1.Height;
            signer?: string;
        });
        get port_id(): string;
        set port_id(value: string);
        get previous_channel_id(): string;
        set previous_channel_id(value: string);
        get channel(): dependency_3.ibc.core.channel.v1.Channel;
        set channel(value: dependency_3.ibc.core.channel.v1.Channel);
        get counterparty_version(): string;
        set counterparty_version(value: string);
        get proof_init(): Uint8Array;
        set proof_init(value: Uint8Array);
        get proof_height(): dependency_2.ibc.core.client.v1.Height;
        set proof_height(value: dependency_2.ibc.core.client.v1.Height);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            port_id?: string;
            previous_channel_id?: string;
            channel?: ReturnType<typeof dependency_3.ibc.core.channel.v1.Channel.prototype.toObject>;
            counterparty_version?: string;
            proof_init?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
            signer?: string;
        }): MsgChannelOpenTry;
        toObject(): {
            port_id?: string | undefined;
            previous_channel_id?: string | undefined;
            channel?: {
                state?: dependency_3.ibc.core.channel.v1.State | undefined;
                ordering?: dependency_3.ibc.core.channel.v1.Order | undefined;
                counterparty?: {
                    port_id?: string | undefined;
                    channel_id?: string | undefined;
                } | undefined;
                connection_hops?: string[] | undefined;
                version?: string | undefined;
            } | undefined;
            counterparty_version?: string | undefined;
            proof_init?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelOpenTry;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelOpenTry;
    }
    class MsgChannelOpenTryResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgChannelOpenTryResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelOpenTryResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelOpenTryResponse;
    }
    class MsgChannelOpenAck extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
            counterparty_channel_id?: string;
            counterparty_version?: string;
            proof_try?: Uint8Array;
            proof_height?: dependency_2.ibc.core.client.v1.Height;
            signer?: string;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        get counterparty_channel_id(): string;
        set counterparty_channel_id(value: string);
        get counterparty_version(): string;
        set counterparty_version(value: string);
        get proof_try(): Uint8Array;
        set proof_try(value: Uint8Array);
        get proof_height(): dependency_2.ibc.core.client.v1.Height;
        set proof_height(value: dependency_2.ibc.core.client.v1.Height);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
            counterparty_channel_id?: string;
            counterparty_version?: string;
            proof_try?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
            signer?: string;
        }): MsgChannelOpenAck;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            counterparty_channel_id?: string | undefined;
            counterparty_version?: string | undefined;
            proof_try?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelOpenAck;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelOpenAck;
    }
    class MsgChannelOpenAckResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgChannelOpenAckResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelOpenAckResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelOpenAckResponse;
    }
    class MsgChannelOpenConfirm extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
            proof_ack?: Uint8Array;
            proof_height?: dependency_2.ibc.core.client.v1.Height;
            signer?: string;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        get proof_ack(): Uint8Array;
        set proof_ack(value: Uint8Array);
        get proof_height(): dependency_2.ibc.core.client.v1.Height;
        set proof_height(value: dependency_2.ibc.core.client.v1.Height);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
            proof_ack?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
            signer?: string;
        }): MsgChannelOpenConfirm;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            proof_ack?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelOpenConfirm;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelOpenConfirm;
    }
    class MsgChannelOpenConfirmResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgChannelOpenConfirmResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelOpenConfirmResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelOpenConfirmResponse;
    }
    class MsgChannelCloseInit extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
            signer?: string;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
            signer?: string;
        }): MsgChannelCloseInit;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelCloseInit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelCloseInit;
    }
    class MsgChannelCloseInitResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgChannelCloseInitResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelCloseInitResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelCloseInitResponse;
    }
    class MsgChannelCloseConfirm extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
            proof_init?: Uint8Array;
            proof_height?: dependency_2.ibc.core.client.v1.Height;
            signer?: string;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        get proof_init(): Uint8Array;
        set proof_init(value: Uint8Array);
        get proof_height(): dependency_2.ibc.core.client.v1.Height;
        set proof_height(value: dependency_2.ibc.core.client.v1.Height);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
            proof_init?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
            signer?: string;
        }): MsgChannelCloseConfirm;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            proof_init?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelCloseConfirm;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelCloseConfirm;
    }
    class MsgChannelCloseConfirmResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgChannelCloseConfirmResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgChannelCloseConfirmResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgChannelCloseConfirmResponse;
    }
    class MsgRecvPacket extends pb_1.Message {
        constructor(data?: any[] | {
            packet?: dependency_3.ibc.core.channel.v1.Packet;
            proof_commitment?: Uint8Array;
            proof_height?: dependency_2.ibc.core.client.v1.Height;
            signer?: string;
        });
        get packet(): dependency_3.ibc.core.channel.v1.Packet;
        set packet(value: dependency_3.ibc.core.channel.v1.Packet);
        get proof_commitment(): Uint8Array;
        set proof_commitment(value: Uint8Array);
        get proof_height(): dependency_2.ibc.core.client.v1.Height;
        set proof_height(value: dependency_2.ibc.core.client.v1.Height);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            packet?: ReturnType<typeof dependency_3.ibc.core.channel.v1.Packet.prototype.toObject>;
            proof_commitment?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
            signer?: string;
        }): MsgRecvPacket;
        toObject(): {
            packet?: {
                sequence?: number | undefined;
                source_port?: string | undefined;
                source_channel?: string | undefined;
                destination_port?: string | undefined;
                destination_channel?: string | undefined;
                data?: Uint8Array | undefined;
                timeout_height?: {
                    revision_number?: number | undefined;
                    revision_height?: number | undefined;
                } | undefined;
                timeout_timestamp?: number | undefined;
            } | undefined;
            proof_commitment?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgRecvPacket;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgRecvPacket;
    }
    class MsgRecvPacketResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgRecvPacketResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgRecvPacketResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgRecvPacketResponse;
    }
    class MsgTimeout extends pb_1.Message {
        constructor(data?: any[] | {
            packet?: dependency_3.ibc.core.channel.v1.Packet;
            proof_unreceived?: Uint8Array;
            proof_height?: dependency_2.ibc.core.client.v1.Height;
            next_sequence_recv?: number;
            signer?: string;
        });
        get packet(): dependency_3.ibc.core.channel.v1.Packet;
        set packet(value: dependency_3.ibc.core.channel.v1.Packet);
        get proof_unreceived(): Uint8Array;
        set proof_unreceived(value: Uint8Array);
        get proof_height(): dependency_2.ibc.core.client.v1.Height;
        set proof_height(value: dependency_2.ibc.core.client.v1.Height);
        get next_sequence_recv(): number;
        set next_sequence_recv(value: number);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            packet?: ReturnType<typeof dependency_3.ibc.core.channel.v1.Packet.prototype.toObject>;
            proof_unreceived?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
            next_sequence_recv?: number;
            signer?: string;
        }): MsgTimeout;
        toObject(): {
            packet?: {
                sequence?: number | undefined;
                source_port?: string | undefined;
                source_channel?: string | undefined;
                destination_port?: string | undefined;
                destination_channel?: string | undefined;
                data?: Uint8Array | undefined;
                timeout_height?: {
                    revision_number?: number | undefined;
                    revision_height?: number | undefined;
                } | undefined;
                timeout_timestamp?: number | undefined;
            } | undefined;
            proof_unreceived?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            next_sequence_recv?: number | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgTimeout;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgTimeout;
    }
    class MsgTimeoutResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgTimeoutResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgTimeoutResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgTimeoutResponse;
    }
    class MsgTimeoutOnClose extends pb_1.Message {
        constructor(data?: any[] | {
            packet?: dependency_3.ibc.core.channel.v1.Packet;
            proof_unreceived?: Uint8Array;
            proof_close?: Uint8Array;
            proof_height?: dependency_2.ibc.core.client.v1.Height;
            next_sequence_recv?: number;
            signer?: string;
        });
        get packet(): dependency_3.ibc.core.channel.v1.Packet;
        set packet(value: dependency_3.ibc.core.channel.v1.Packet);
        get proof_unreceived(): Uint8Array;
        set proof_unreceived(value: Uint8Array);
        get proof_close(): Uint8Array;
        set proof_close(value: Uint8Array);
        get proof_height(): dependency_2.ibc.core.client.v1.Height;
        set proof_height(value: dependency_2.ibc.core.client.v1.Height);
        get next_sequence_recv(): number;
        set next_sequence_recv(value: number);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            packet?: ReturnType<typeof dependency_3.ibc.core.channel.v1.Packet.prototype.toObject>;
            proof_unreceived?: Uint8Array;
            proof_close?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
            next_sequence_recv?: number;
            signer?: string;
        }): MsgTimeoutOnClose;
        toObject(): {
            packet?: {
                sequence?: number | undefined;
                source_port?: string | undefined;
                source_channel?: string | undefined;
                destination_port?: string | undefined;
                destination_channel?: string | undefined;
                data?: Uint8Array | undefined;
                timeout_height?: {
                    revision_number?: number | undefined;
                    revision_height?: number | undefined;
                } | undefined;
                timeout_timestamp?: number | undefined;
            } | undefined;
            proof_unreceived?: Uint8Array | undefined;
            proof_close?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            next_sequence_recv?: number | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgTimeoutOnClose;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgTimeoutOnClose;
    }
    class MsgTimeoutOnCloseResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgTimeoutOnCloseResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgTimeoutOnCloseResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgTimeoutOnCloseResponse;
    }
    class MsgAcknowledgement extends pb_1.Message {
        constructor(data?: any[] | {
            packet?: dependency_3.ibc.core.channel.v1.Packet;
            acknowledgement?: Uint8Array;
            proof_acked?: Uint8Array;
            proof_height?: dependency_2.ibc.core.client.v1.Height;
            signer?: string;
        });
        get packet(): dependency_3.ibc.core.channel.v1.Packet;
        set packet(value: dependency_3.ibc.core.channel.v1.Packet);
        get acknowledgement(): Uint8Array;
        set acknowledgement(value: Uint8Array);
        get proof_acked(): Uint8Array;
        set proof_acked(value: Uint8Array);
        get proof_height(): dependency_2.ibc.core.client.v1.Height;
        set proof_height(value: dependency_2.ibc.core.client.v1.Height);
        get signer(): string;
        set signer(value: string);
        static fromObject(data: {
            packet?: ReturnType<typeof dependency_3.ibc.core.channel.v1.Packet.prototype.toObject>;
            acknowledgement?: Uint8Array;
            proof_acked?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
            signer?: string;
        }): MsgAcknowledgement;
        toObject(): {
            packet?: {
                sequence?: number | undefined;
                source_port?: string | undefined;
                source_channel?: string | undefined;
                destination_port?: string | undefined;
                destination_channel?: string | undefined;
                data?: Uint8Array | undefined;
                timeout_height?: {
                    revision_number?: number | undefined;
                    revision_height?: number | undefined;
                } | undefined;
                timeout_timestamp?: number | undefined;
            } | undefined;
            acknowledgement?: Uint8Array | undefined;
            proof_acked?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
            signer?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgAcknowledgement;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgAcknowledgement;
    }
    class MsgAcknowledgementResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgAcknowledgementResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgAcknowledgementResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgAcknowledgementResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map