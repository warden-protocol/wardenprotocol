import * as dependency_2 from "./../../../../cosmos/base/query/v1beta1/pagination";
import * as dependency_3 from "./../../client/v1/client";
import * as dependency_4 from "./connection";
import * as dependency_6 from "./../../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.connection.v1 {
    class QueryConnectionRequest extends pb_1.Message {
        constructor(data?: any[] | {
            connection_id?: string;
        });
        get connection_id(): string;
        set connection_id(value: string);
        static fromObject(data: {
            connection_id?: string;
        }): QueryConnectionRequest;
        toObject(): {
            connection_id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConnectionRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConnectionRequest;
    }
    class QueryConnectionResponse extends pb_1.Message {
        constructor(data?: any[] | {
            connection?: dependency_4.ibc.core.connection.v1.ConnectionEnd;
            proof?: Uint8Array;
            proof_height?: dependency_3.ibc.core.client.v1.Height;
        });
        get connection(): dependency_4.ibc.core.connection.v1.ConnectionEnd;
        set connection(value: dependency_4.ibc.core.connection.v1.ConnectionEnd);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_3.ibc.core.client.v1.Height;
        set proof_height(value: dependency_3.ibc.core.client.v1.Height);
        static fromObject(data: {
            connection?: ReturnType<typeof dependency_4.ibc.core.connection.v1.ConnectionEnd.prototype.toObject>;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryConnectionResponse;
        toObject(): {
            connection?: {
                client_id?: string | undefined;
                versions?: {
                    identifier?: string | undefined;
                    features?: string[] | undefined;
                }[] | undefined;
                state?: dependency_4.ibc.core.connection.v1.State | undefined;
                counterparty?: {
                    client_id?: string | undefined;
                    connection_id?: string | undefined;
                    prefix?: {
                        key_prefix?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                delay_period?: number | undefined;
            } | undefined;
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConnectionResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConnectionResponse;
    }
    class QueryConnectionsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryConnectionsRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConnectionsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConnectionsRequest;
    }
    class QueryConnectionsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            connections?: dependency_4.ibc.core.connection.v1.IdentifiedConnection[];
            pagination?: dependency_2.cosmos.base.query.v1beta1.PageResponse;
            height?: dependency_3.ibc.core.client.v1.Height;
        });
        get connections(): dependency_4.ibc.core.connection.v1.IdentifiedConnection[];
        set connections(value: dependency_4.ibc.core.connection.v1.IdentifiedConnection[]);
        get pagination(): dependency_2.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_2.cosmos.base.query.v1beta1.PageResponse);
        get height(): dependency_3.ibc.core.client.v1.Height;
        set height(value: dependency_3.ibc.core.client.v1.Height);
        static fromObject(data: {
            connections?: ReturnType<typeof dependency_4.ibc.core.connection.v1.IdentifiedConnection.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_2.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
            height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryConnectionsResponse;
        toObject(): {
            connections?: {
                id?: string | undefined;
                client_id?: string | undefined;
                versions?: {
                    identifier?: string | undefined;
                    features?: string[] | undefined;
                }[] | undefined;
                state?: dependency_4.ibc.core.connection.v1.State | undefined;
                counterparty?: {
                    client_id?: string | undefined;
                    connection_id?: string | undefined;
                    prefix?: {
                        key_prefix?: Uint8Array | undefined;
                    } | undefined;
                } | undefined;
                delay_period?: number | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConnectionsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConnectionsResponse;
    }
    class QueryClientConnectionsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
        });
        get client_id(): string;
        set client_id(value: string);
        static fromObject(data: {
            client_id?: string;
        }): QueryClientConnectionsRequest;
        toObject(): {
            client_id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClientConnectionsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClientConnectionsRequest;
    }
    class QueryClientConnectionsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            connection_paths?: string[];
            proof?: Uint8Array;
            proof_height?: dependency_3.ibc.core.client.v1.Height;
        });
        get connection_paths(): string[];
        set connection_paths(value: string[]);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_3.ibc.core.client.v1.Height;
        set proof_height(value: dependency_3.ibc.core.client.v1.Height);
        static fromObject(data: {
            connection_paths?: string[];
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryClientConnectionsResponse;
        toObject(): {
            connection_paths?: string[] | undefined;
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClientConnectionsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClientConnectionsResponse;
    }
    class QueryConnectionClientStateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            connection_id?: string;
        });
        get connection_id(): string;
        set connection_id(value: string);
        static fromObject(data: {
            connection_id?: string;
        }): QueryConnectionClientStateRequest;
        toObject(): {
            connection_id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConnectionClientStateRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConnectionClientStateRequest;
    }
    class QueryConnectionClientStateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            identified_client_state?: dependency_3.ibc.core.client.v1.IdentifiedClientState;
            proof?: Uint8Array;
            proof_height?: dependency_3.ibc.core.client.v1.Height;
        });
        get identified_client_state(): dependency_3.ibc.core.client.v1.IdentifiedClientState;
        set identified_client_state(value: dependency_3.ibc.core.client.v1.IdentifiedClientState);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_3.ibc.core.client.v1.Height;
        set proof_height(value: dependency_3.ibc.core.client.v1.Height);
        static fromObject(data: {
            identified_client_state?: ReturnType<typeof dependency_3.ibc.core.client.v1.IdentifiedClientState.prototype.toObject>;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryConnectionClientStateResponse;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConnectionClientStateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConnectionClientStateResponse;
    }
    class QueryConnectionConsensusStateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            connection_id?: string;
            revision_number?: number;
            revision_height?: number;
        });
        get connection_id(): string;
        set connection_id(value: string);
        get revision_number(): number;
        set revision_number(value: number);
        get revision_height(): number;
        set revision_height(value: number);
        static fromObject(data: {
            connection_id?: string;
            revision_number?: number;
            revision_height?: number;
        }): QueryConnectionConsensusStateRequest;
        toObject(): {
            connection_id?: string | undefined;
            revision_number?: number | undefined;
            revision_height?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConnectionConsensusStateRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConnectionConsensusStateRequest;
    }
    class QueryConnectionConsensusStateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            consensus_state?: dependency_6.google.protobuf.Any;
            client_id?: string;
            proof?: Uint8Array;
            proof_height?: dependency_3.ibc.core.client.v1.Height;
        });
        get consensus_state(): dependency_6.google.protobuf.Any;
        set consensus_state(value: dependency_6.google.protobuf.Any);
        get client_id(): string;
        set client_id(value: string);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_3.ibc.core.client.v1.Height;
        set proof_height(value: dependency_3.ibc.core.client.v1.Height);
        static fromObject(data: {
            consensus_state?: ReturnType<typeof dependency_6.google.protobuf.Any.prototype.toObject>;
            client_id?: string;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_3.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryConnectionConsensusStateResponse;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConnectionConsensusStateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConnectionConsensusStateResponse;
    }
}
//# sourceMappingURL=query.d.ts.map