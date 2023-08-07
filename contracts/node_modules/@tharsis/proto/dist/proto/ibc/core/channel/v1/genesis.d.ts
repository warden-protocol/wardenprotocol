import * as dependency_2 from "./channel";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.channel.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            channels?: dependency_2.ibc.core.channel.v1.IdentifiedChannel[];
            acknowledgements?: dependency_2.ibc.core.channel.v1.PacketState[];
            commitments?: dependency_2.ibc.core.channel.v1.PacketState[];
            receipts?: dependency_2.ibc.core.channel.v1.PacketState[];
            send_sequences?: PacketSequence[];
            recv_sequences?: PacketSequence[];
            ack_sequences?: PacketSequence[];
            next_channel_sequence?: number;
        });
        get channels(): dependency_2.ibc.core.channel.v1.IdentifiedChannel[];
        set channels(value: dependency_2.ibc.core.channel.v1.IdentifiedChannel[]);
        get acknowledgements(): dependency_2.ibc.core.channel.v1.PacketState[];
        set acknowledgements(value: dependency_2.ibc.core.channel.v1.PacketState[]);
        get commitments(): dependency_2.ibc.core.channel.v1.PacketState[];
        set commitments(value: dependency_2.ibc.core.channel.v1.PacketState[]);
        get receipts(): dependency_2.ibc.core.channel.v1.PacketState[];
        set receipts(value: dependency_2.ibc.core.channel.v1.PacketState[]);
        get send_sequences(): PacketSequence[];
        set send_sequences(value: PacketSequence[]);
        get recv_sequences(): PacketSequence[];
        set recv_sequences(value: PacketSequence[]);
        get ack_sequences(): PacketSequence[];
        set ack_sequences(value: PacketSequence[]);
        get next_channel_sequence(): number;
        set next_channel_sequence(value: number);
        static fromObject(data: {
            channels?: ReturnType<typeof dependency_2.ibc.core.channel.v1.IdentifiedChannel.prototype.toObject>[];
            acknowledgements?: ReturnType<typeof dependency_2.ibc.core.channel.v1.PacketState.prototype.toObject>[];
            commitments?: ReturnType<typeof dependency_2.ibc.core.channel.v1.PacketState.prototype.toObject>[];
            receipts?: ReturnType<typeof dependency_2.ibc.core.channel.v1.PacketState.prototype.toObject>[];
            send_sequences?: ReturnType<typeof PacketSequence.prototype.toObject>[];
            recv_sequences?: ReturnType<typeof PacketSequence.prototype.toObject>[];
            ack_sequences?: ReturnType<typeof PacketSequence.prototype.toObject>[];
            next_channel_sequence?: number;
        }): GenesisState;
        toObject(): {
            channels?: {
                state?: dependency_2.ibc.core.channel.v1.State | undefined;
                ordering?: dependency_2.ibc.core.channel.v1.Order | undefined;
                counterparty?: {
                    port_id?: string | undefined;
                    channel_id?: string | undefined;
                } | undefined;
                connection_hops?: string[] | undefined;
                version?: string | undefined;
                port_id?: string | undefined;
                channel_id?: string | undefined;
            }[] | undefined;
            acknowledgements?: {
                port_id?: string | undefined;
                channel_id?: string | undefined;
                sequence?: number | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
            commitments?: {
                port_id?: string | undefined;
                channel_id?: string | undefined;
                sequence?: number | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
            receipts?: {
                port_id?: string | undefined;
                channel_id?: string | undefined;
                sequence?: number | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
            send_sequences?: {
                port_id?: string | undefined;
                channel_id?: string | undefined;
                sequence?: number | undefined;
            }[] | undefined;
            recv_sequences?: {
                port_id?: string | undefined;
                channel_id?: string | undefined;
                sequence?: number | undefined;
            }[] | undefined;
            ack_sequences?: {
                port_id?: string | undefined;
                channel_id?: string | undefined;
                sequence?: number | undefined;
            }[] | undefined;
            next_channel_sequence?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
    class PacketSequence extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
            sequence?: number;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        get sequence(): number;
        set sequence(value: number);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
            sequence?: number;
        }): PacketSequence;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            sequence?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PacketSequence;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PacketSequence;
    }
}
//# sourceMappingURL=genesis.d.ts.map