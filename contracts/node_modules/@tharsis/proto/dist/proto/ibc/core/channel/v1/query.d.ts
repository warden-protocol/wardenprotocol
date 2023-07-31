import * as dependency_1 from "./../../client/v1/client";
import * as dependency_2 from "./../../../../cosmos/base/query/v1beta1/pagination";
import * as dependency_3 from "./channel";
import * as dependency_5 from "./../../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.channel.v1 {
    class QueryChannelRequest extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
        }): QueryChannelRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryChannelRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryChannelRequest;
    }
    class QueryChannelResponse extends pb_1.Message {
        constructor(data?: any[] | {
            channel?: dependency_3.ibc.core.channel.v1.Channel;
            proof?: Uint8Array;
            proof_height?: dependency_1.ibc.core.client.v1.Height;
        });
        get channel(): dependency_3.ibc.core.channel.v1.Channel;
        set channel(value: dependency_3.ibc.core.channel.v1.Channel);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_1.ibc.core.client.v1.Height;
        set proof_height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            channel?: ReturnType<typeof dependency_3.ibc.core.channel.v1.Channel.prototype.toObject>;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryChannelResponse;
        toObject(): {
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
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryChannelResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryChannelResponse;
    }
    class QueryChannelsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryChannelsRequest;
        toObject(): {
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryChannelsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryChannelsRequest;
    }
    class QueryChannelsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            channels?: dependency_3.ibc.core.channel.v1.IdentifiedChannel[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
            height?: dependency_1.ibc.core.client.v1.Height;
        });
        get channels(): dependency_3.ibc.core.channel.v1.IdentifiedChannel[];
        set channels(value: dependency_3.ibc.core.channel.v1.IdentifiedChannel[]);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse);
        get height(): dependency_1.ibc.core.client.v1.Height;
        set height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            channels?: ReturnType<typeof dependency_3.ibc.core.channel.v1.IdentifiedChannel.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
            height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryChannelsResponse;
        toObject(): {
            channels?: {
                state?: dependency_3.ibc.core.channel.v1.State | undefined;
                ordering?: dependency_3.ibc.core.channel.v1.Order | undefined;
                counterparty?: {
                    port_id?: string | undefined;
                    channel_id?: string | undefined;
                } | undefined;
                connection_hops?: string[] | undefined;
                version?: string | undefined;
                port_id?: string | undefined;
                channel_id?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
            height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryChannelsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryChannelsResponse;
    }
    class QueryConnectionChannelsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            connection?: string;
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageRequest;
        });
        get connection(): string;
        set connection(value: string);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            connection?: string;
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryConnectionChannelsRequest;
        toObject(): {
            connection?: string | undefined;
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConnectionChannelsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConnectionChannelsRequest;
    }
    class QueryConnectionChannelsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            channels?: dependency_3.ibc.core.channel.v1.IdentifiedChannel[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
            height?: dependency_1.ibc.core.client.v1.Height;
        });
        get channels(): dependency_3.ibc.core.channel.v1.IdentifiedChannel[];
        set channels(value: dependency_3.ibc.core.channel.v1.IdentifiedChannel[]);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse);
        get height(): dependency_1.ibc.core.client.v1.Height;
        set height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            channels?: ReturnType<typeof dependency_3.ibc.core.channel.v1.IdentifiedChannel.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
            height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryConnectionChannelsResponse;
        toObject(): {
            channels?: {
                state?: dependency_3.ibc.core.channel.v1.State | undefined;
                ordering?: dependency_3.ibc.core.channel.v1.Order | undefined;
                counterparty?: {
                    port_id?: string | undefined;
                    channel_id?: string | undefined;
                } | undefined;
                connection_hops?: string[] | undefined;
                version?: string | undefined;
                port_id?: string | undefined;
                channel_id?: string | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
            height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConnectionChannelsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConnectionChannelsResponse;
    }
    class QueryChannelClientStateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
        }): QueryChannelClientStateRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryChannelClientStateRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryChannelClientStateRequest;
    }
    class QueryChannelClientStateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            identified_client_state?: dependency_1.ibc.core.client.v1.IdentifiedClientState;
            proof?: Uint8Array;
            proof_height?: dependency_1.ibc.core.client.v1.Height;
        });
        get identified_client_state(): dependency_1.ibc.core.client.v1.IdentifiedClientState;
        set identified_client_state(value: dependency_1.ibc.core.client.v1.IdentifiedClientState);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_1.ibc.core.client.v1.Height;
        set proof_height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            identified_client_state?: ReturnType<typeof dependency_1.ibc.core.client.v1.IdentifiedClientState.prototype.toObject>;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryChannelClientStateResponse;
        toObject(): {
            identified_client_state?: {
                client_id?: string | undefined;
                client_state?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryChannelClientStateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryChannelClientStateResponse;
    }
    class QueryChannelConsensusStateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
            revision_number?: number;
            revision_height?: number;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        get revision_number(): number;
        set revision_number(value: number);
        get revision_height(): number;
        set revision_height(value: number);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
            revision_number?: number;
            revision_height?: number;
        }): QueryChannelConsensusStateRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            revision_number?: number | undefined;
            revision_height?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryChannelConsensusStateRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryChannelConsensusStateRequest;
    }
    class QueryChannelConsensusStateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            consensus_state?: dependency_5.google.protobuf.Any;
            client_id?: string;
            proof?: Uint8Array;
            proof_height?: dependency_1.ibc.core.client.v1.Height;
        });
        get consensus_state(): dependency_5.google.protobuf.Any;
        set consensus_state(value: dependency_5.google.protobuf.Any);
        get client_id(): string;
        set client_id(value: string);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_1.ibc.core.client.v1.Height;
        set proof_height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            consensus_state?: ReturnType<typeof dependency_5.google.protobuf.Any.prototype.toObject>;
            client_id?: string;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryChannelConsensusStateResponse;
        toObject(): {
            consensus_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            client_id?: string | undefined;
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryChannelConsensusStateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryChannelConsensusStateResponse;
    }
    class QueryPacketCommitmentRequest extends pb_1.Message {
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
        }): QueryPacketCommitmentRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            sequence?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPacketCommitmentRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPacketCommitmentRequest;
    }
    class QueryPacketCommitmentResponse extends pb_1.Message {
        constructor(data?: any[] | {
            commitment?: Uint8Array;
            proof?: Uint8Array;
            proof_height?: dependency_1.ibc.core.client.v1.Height;
        });
        get commitment(): Uint8Array;
        set commitment(value: Uint8Array);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_1.ibc.core.client.v1.Height;
        set proof_height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            commitment?: Uint8Array;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryPacketCommitmentResponse;
        toObject(): {
            commitment?: Uint8Array | undefined;
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPacketCommitmentResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPacketCommitmentResponse;
    }
    class QueryPacketCommitmentsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageRequest;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryPacketCommitmentsRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPacketCommitmentsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPacketCommitmentsRequest;
    }
    class QueryPacketCommitmentsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            commitments?: dependency_3.ibc.core.channel.v1.PacketState[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
            height?: dependency_1.ibc.core.client.v1.Height;
        });
        get commitments(): dependency_3.ibc.core.channel.v1.PacketState[];
        set commitments(value: dependency_3.ibc.core.channel.v1.PacketState[]);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse);
        get height(): dependency_1.ibc.core.client.v1.Height;
        set height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            commitments?: ReturnType<typeof dependency_3.ibc.core.channel.v1.PacketState.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
            height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryPacketCommitmentsResponse;
        toObject(): {
            commitments?: {
                port_id?: string | undefined;
                channel_id?: string | undefined;
                sequence?: number | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
            height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPacketCommitmentsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPacketCommitmentsResponse;
    }
    class QueryPacketReceiptRequest extends pb_1.Message {
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
        }): QueryPacketReceiptRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            sequence?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPacketReceiptRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPacketReceiptRequest;
    }
    class QueryPacketReceiptResponse extends pb_1.Message {
        constructor(data?: any[] | {
            received?: boolean;
            proof?: Uint8Array;
            proof_height?: dependency_1.ibc.core.client.v1.Height;
        });
        get received(): boolean;
        set received(value: boolean);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_1.ibc.core.client.v1.Height;
        set proof_height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            received?: boolean;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryPacketReceiptResponse;
        toObject(): {
            received?: boolean | undefined;
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPacketReceiptResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPacketReceiptResponse;
    }
    class QueryPacketAcknowledgementRequest extends pb_1.Message {
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
        }): QueryPacketAcknowledgementRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            sequence?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPacketAcknowledgementRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPacketAcknowledgementRequest;
    }
    class QueryPacketAcknowledgementResponse extends pb_1.Message {
        constructor(data?: any[] | {
            acknowledgement?: Uint8Array;
            proof?: Uint8Array;
            proof_height?: dependency_1.ibc.core.client.v1.Height;
        });
        get acknowledgement(): Uint8Array;
        set acknowledgement(value: Uint8Array);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_1.ibc.core.client.v1.Height;
        set proof_height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            acknowledgement?: Uint8Array;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryPacketAcknowledgementResponse;
        toObject(): {
            acknowledgement?: Uint8Array | undefined;
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPacketAcknowledgementResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPacketAcknowledgementResponse;
    }
    class QueryPacketAcknowledgementsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageRequest;
            packet_commitment_sequences?: number[];
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageRequest);
        get packet_commitment_sequences(): number[];
        set packet_commitment_sequences(value: number[]);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
            packet_commitment_sequences?: number[];
        }): QueryPacketAcknowledgementsRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            pagination?: {
                key?: Uint8Array | undefined;
                offset?: number | undefined;
                limit?: number | undefined;
                count_total?: boolean | undefined;
                reverse?: boolean | undefined;
            } | undefined;
            packet_commitment_sequences?: number[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPacketAcknowledgementsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPacketAcknowledgementsRequest;
    }
    class QueryPacketAcknowledgementsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            acknowledgements?: dependency_3.ibc.core.channel.v1.PacketState[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
            height?: dependency_1.ibc.core.client.v1.Height;
        });
        get acknowledgements(): dependency_3.ibc.core.channel.v1.PacketState[];
        set acknowledgements(value: dependency_3.ibc.core.channel.v1.PacketState[]);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse);
        get height(): dependency_1.ibc.core.client.v1.Height;
        set height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            acknowledgements?: ReturnType<typeof dependency_3.ibc.core.channel.v1.PacketState.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
            height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryPacketAcknowledgementsResponse;
        toObject(): {
            acknowledgements?: {
                port_id?: string | undefined;
                channel_id?: string | undefined;
                sequence?: number | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
            height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryPacketAcknowledgementsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryPacketAcknowledgementsResponse;
    }
    class QueryUnreceivedPacketsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
            packet_commitment_sequences?: number[];
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        get packet_commitment_sequences(): number[];
        set packet_commitment_sequences(value: number[]);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
            packet_commitment_sequences?: number[];
        }): QueryUnreceivedPacketsRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            packet_commitment_sequences?: number[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUnreceivedPacketsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUnreceivedPacketsRequest;
    }
    class QueryUnreceivedPacketsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            sequences?: number[];
            height?: dependency_1.ibc.core.client.v1.Height;
        });
        get sequences(): number[];
        set sequences(value: number[]);
        get height(): dependency_1.ibc.core.client.v1.Height;
        set height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            sequences?: number[];
            height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryUnreceivedPacketsResponse;
        toObject(): {
            sequences?: number[] | undefined;
            height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUnreceivedPacketsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUnreceivedPacketsResponse;
    }
    class QueryUnreceivedAcksRequest extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
            packet_ack_sequences?: number[];
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        get packet_ack_sequences(): number[];
        set packet_ack_sequences(value: number[]);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
            packet_ack_sequences?: number[];
        }): QueryUnreceivedAcksRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
            packet_ack_sequences?: number[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUnreceivedAcksRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUnreceivedAcksRequest;
    }
    class QueryUnreceivedAcksResponse extends pb_1.Message {
        constructor(data?: any[] | {
            sequences?: number[];
            height?: dependency_1.ibc.core.client.v1.Height;
        });
        get sequences(): number[];
        set sequences(value: number[]);
        get height(): dependency_1.ibc.core.client.v1.Height;
        set height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            sequences?: number[];
            height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryUnreceivedAcksResponse;
        toObject(): {
            sequences?: number[] | undefined;
            height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUnreceivedAcksResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUnreceivedAcksResponse;
    }
    class QueryNextSequenceReceiveRequest extends pb_1.Message {
        constructor(data?: any[] | {
            port_id?: string;
            channel_id?: string;
        });
        get port_id(): string;
        set port_id(value: string);
        get channel_id(): string;
        set channel_id(value: string);
        static fromObject(data: {
            port_id?: string;
            channel_id?: string;
        }): QueryNextSequenceReceiveRequest;
        toObject(): {
            port_id?: string | undefined;
            channel_id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryNextSequenceReceiveRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryNextSequenceReceiveRequest;
    }
    class QueryNextSequenceReceiveResponse extends pb_1.Message {
        constructor(data?: any[] | {
            next_sequence_receive?: number;
            proof?: Uint8Array;
            proof_height?: dependency_1.ibc.core.client.v1.Height;
        });
        get next_sequence_receive(): number;
        set next_sequence_receive(value: number);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_1.ibc.core.client.v1.Height;
        set proof_height(value: dependency_1.ibc.core.client.v1.Height);
        static fromObject(data: {
            next_sequence_receive?: number;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_1.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryNextSequenceReceiveResponse;
        toObject(): {
            next_sequence_receive?: number | undefined;
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryNextSequenceReceiveResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryNextSequenceReceiveResponse;
    }
}
//# sourceMappingURL=query.d.ts.map