import * as dependency_2 from "./../../client/v1/genesis";
import * as dependency_3 from "./../../connection/v1/genesis";
import * as dependency_4 from "./../../channel/v1/genesis";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.types.v1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            client_genesis?: dependency_2.ibc.core.client.v1.GenesisState;
            connection_genesis?: dependency_3.ibc.core.connection.v1.GenesisState;
            channel_genesis?: dependency_4.ibc.core.channel.v1.GenesisState;
        });
        get client_genesis(): dependency_2.ibc.core.client.v1.GenesisState;
        set client_genesis(value: dependency_2.ibc.core.client.v1.GenesisState);
        get connection_genesis(): dependency_3.ibc.core.connection.v1.GenesisState;
        set connection_genesis(value: dependency_3.ibc.core.connection.v1.GenesisState);
        get channel_genesis(): dependency_4.ibc.core.channel.v1.GenesisState;
        set channel_genesis(value: dependency_4.ibc.core.channel.v1.GenesisState);
        static fromObject(data: {
            client_genesis?: ReturnType<typeof dependency_2.ibc.core.client.v1.GenesisState.prototype.toObject>;
            connection_genesis?: ReturnType<typeof dependency_3.ibc.core.connection.v1.GenesisState.prototype.toObject>;
            channel_genesis?: ReturnType<typeof dependency_4.ibc.core.channel.v1.GenesisState.prototype.toObject>;
        }): GenesisState;
        toObject(): {
            client_genesis?: {
                clients?: {
                    client_id?: string | undefined;
                    client_state?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    } | undefined;
                }[] | undefined;
                clients_consensus?: {
                    client_id?: string | undefined;
                    consensus_states?: {
                        height?: {
                            revision_number?: number | undefined;
                            revision_height?: number | undefined;
                        } | undefined;
                        consensus_state?: {
                            type_url?: string | undefined;
                            value?: Uint8Array | undefined;
                        } | undefined;
                    }[] | undefined;
                }[] | undefined;
                clients_metadata?: {
                    client_id?: string | undefined;
                    client_metadata?: {
                        key?: Uint8Array | undefined;
                        value?: Uint8Array | undefined;
                    }[] | undefined;
                }[] | undefined;
                params?: {
                    allowed_clients?: string[] | undefined;
                } | undefined;
                create_localhost?: boolean | undefined;
                next_client_sequence?: number | undefined;
            } | undefined;
            connection_genesis?: {
                connections?: {
                    id?: string | undefined;
                    client_id?: string | undefined;
                    versions?: {
                        identifier?: string | undefined;
                        features?: string[] | undefined;
                    }[] | undefined;
                    state?: import("../../connection/v1/connection").ibc.core.connection.v1.State | undefined;
                    counterparty?: {
                        client_id?: string | undefined;
                        connection_id?: string | undefined;
                        prefix?: {
                            key_prefix?: Uint8Array | undefined;
                        } | undefined;
                    } | undefined;
                    delay_period?: number | undefined;
                }[] | undefined;
                client_connection_paths?: {
                    client_id?: string | undefined;
                    paths?: string[] | undefined;
                }[] | undefined;
                next_connection_sequence?: number | undefined;
                params?: {
                    max_expected_time_per_block?: number | undefined;
                } | undefined;
            } | undefined;
            channel_genesis?: {
                channels?: {
                    state?: import("../../channel/v1/channel").ibc.core.channel.v1.State | undefined;
                    ordering?: import("../../channel/v1/channel").ibc.core.channel.v1.Order | undefined;
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
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
}
//# sourceMappingURL=genesis.d.ts.map