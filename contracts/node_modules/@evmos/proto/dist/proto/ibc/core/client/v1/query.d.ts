import * as dependency_1 from "./../../../../cosmos/base/query/v1beta1/pagination";
import * as dependency_2 from "./client";
import * as dependency_3 from "./../../../../google/protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace ibc.core.client.v1 {
    class QueryClientStateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
        });
        get client_id(): string;
        set client_id(value: string);
        static fromObject(data: {
            client_id?: string;
        }): QueryClientStateRequest;
        toObject(): {
            client_id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClientStateRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClientStateRequest;
    }
    class QueryClientStateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            client_state?: dependency_3.google.protobuf.Any;
            proof?: Uint8Array;
            proof_height?: dependency_2.ibc.core.client.v1.Height;
        });
        get client_state(): dependency_3.google.protobuf.Any;
        set client_state(value: dependency_3.google.protobuf.Any);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_2.ibc.core.client.v1.Height;
        set proof_height(value: dependency_2.ibc.core.client.v1.Height);
        static fromObject(data: {
            client_state?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryClientStateResponse;
        toObject(): {
            client_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClientStateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClientStateResponse;
    }
    class QueryClientStatesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryClientStatesRequest;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClientStatesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClientStatesRequest;
    }
    class QueryClientStatesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            client_states?: dependency_2.ibc.core.client.v1.IdentifiedClientState[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get client_states(): dependency_2.ibc.core.client.v1.IdentifiedClientState[];
        set client_states(value: dependency_2.ibc.core.client.v1.IdentifiedClientState[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            client_states?: ReturnType<typeof dependency_2.ibc.core.client.v1.IdentifiedClientState.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryClientStatesResponse;
        toObject(): {
            client_states?: {
                client_id?: string | undefined;
                client_state?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
            }[] | undefined;
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClientStatesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClientStatesResponse;
    }
    class QueryConsensusStateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            revision_number?: number;
            revision_height?: number;
            latest_height?: boolean;
        });
        get client_id(): string;
        set client_id(value: string);
        get revision_number(): number;
        set revision_number(value: number);
        get revision_height(): number;
        set revision_height(value: number);
        get latest_height(): boolean;
        set latest_height(value: boolean);
        static fromObject(data: {
            client_id?: string;
            revision_number?: number;
            revision_height?: number;
            latest_height?: boolean;
        }): QueryConsensusStateRequest;
        toObject(): {
            client_id?: string | undefined;
            revision_number?: number | undefined;
            revision_height?: number | undefined;
            latest_height?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConsensusStateRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConsensusStateRequest;
    }
    class QueryConsensusStateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            consensus_state?: dependency_3.google.protobuf.Any;
            proof?: Uint8Array;
            proof_height?: dependency_2.ibc.core.client.v1.Height;
        });
        get consensus_state(): dependency_3.google.protobuf.Any;
        set consensus_state(value: dependency_3.google.protobuf.Any);
        get proof(): Uint8Array;
        set proof(value: Uint8Array);
        get proof_height(): dependency_2.ibc.core.client.v1.Height;
        set proof_height(value: dependency_2.ibc.core.client.v1.Height);
        static fromObject(data: {
            consensus_state?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>;
            proof?: Uint8Array;
            proof_height?: ReturnType<typeof dependency_2.ibc.core.client.v1.Height.prototype.toObject>;
        }): QueryConsensusStateResponse;
        toObject(): {
            consensus_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            proof?: Uint8Array | undefined;
            proof_height?: {
                revision_number?: number | undefined;
                revision_height?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConsensusStateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConsensusStateResponse;
    }
    class QueryConsensusStatesRequest extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageRequest;
        });
        get client_id(): string;
        set client_id(value: string);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageRequest;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageRequest);
        static fromObject(data: {
            client_id?: string;
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageRequest.prototype.toObject>;
        }): QueryConsensusStatesRequest;
        toObject(): {
            client_id?: string | undefined;
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConsensusStatesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConsensusStatesRequest;
    }
    class QueryConsensusStatesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            consensus_states?: dependency_2.ibc.core.client.v1.ConsensusStateWithHeight[];
            pagination?: dependency_1.cosmos.base.query.v1beta1.PageResponse;
        });
        get consensus_states(): dependency_2.ibc.core.client.v1.ConsensusStateWithHeight[];
        set consensus_states(value: dependency_2.ibc.core.client.v1.ConsensusStateWithHeight[]);
        get pagination(): dependency_1.cosmos.base.query.v1beta1.PageResponse;
        set pagination(value: dependency_1.cosmos.base.query.v1beta1.PageResponse);
        static fromObject(data: {
            consensus_states?: ReturnType<typeof dependency_2.ibc.core.client.v1.ConsensusStateWithHeight.prototype.toObject>[];
            pagination?: ReturnType<typeof dependency_1.cosmos.base.query.v1beta1.PageResponse.prototype.toObject>;
        }): QueryConsensusStatesResponse;
        toObject(): {
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
            pagination?: {
                next_key?: Uint8Array | undefined;
                total?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryConsensusStatesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryConsensusStatesResponse;
    }
    class QueryClientStatusRequest extends pb_1.Message {
        constructor(data?: any[] | {
            client_id?: string;
        });
        get client_id(): string;
        set client_id(value: string);
        static fromObject(data: {
            client_id?: string;
        }): QueryClientStatusRequest;
        toObject(): {
            client_id?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClientStatusRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClientStatusRequest;
    }
    class QueryClientStatusResponse extends pb_1.Message {
        constructor(data?: any[] | {
            status?: string;
        });
        get status(): string;
        set status(value: string);
        static fromObject(data: {
            status?: string;
        }): QueryClientStatusResponse;
        toObject(): {
            status?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClientStatusResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClientStatusResponse;
    }
    class QueryClientParamsRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryClientParamsRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClientParamsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClientParamsRequest;
    }
    class QueryClientParamsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_2.ibc.core.client.v1.Params;
        });
        get params(): dependency_2.ibc.core.client.v1.Params;
        set params(value: dependency_2.ibc.core.client.v1.Params);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_2.ibc.core.client.v1.Params.prototype.toObject>;
        }): QueryClientParamsResponse;
        toObject(): {
            params?: {
                allowed_clients?: string[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryClientParamsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryClientParamsResponse;
    }
    class QueryUpgradedClientStateRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryUpgradedClientStateRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUpgradedClientStateRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUpgradedClientStateRequest;
    }
    class QueryUpgradedClientStateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            upgraded_client_state?: dependency_3.google.protobuf.Any;
        });
        get upgraded_client_state(): dependency_3.google.protobuf.Any;
        set upgraded_client_state(value: dependency_3.google.protobuf.Any);
        static fromObject(data: {
            upgraded_client_state?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>;
        }): QueryUpgradedClientStateResponse;
        toObject(): {
            upgraded_client_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUpgradedClientStateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUpgradedClientStateResponse;
    }
    class QueryUpgradedConsensusStateRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryUpgradedConsensusStateRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUpgradedConsensusStateRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUpgradedConsensusStateRequest;
    }
    class QueryUpgradedConsensusStateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            upgraded_consensus_state?: dependency_3.google.protobuf.Any;
        });
        get upgraded_consensus_state(): dependency_3.google.protobuf.Any;
        set upgraded_consensus_state(value: dependency_3.google.protobuf.Any);
        static fromObject(data: {
            upgraded_consensus_state?: ReturnType<typeof dependency_3.google.protobuf.Any.prototype.toObject>;
        }): QueryUpgradedConsensusStateResponse;
        toObject(): {
            upgraded_consensus_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUpgradedConsensusStateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUpgradedConsensusStateResponse;
    }
}
//# sourceMappingURL=query.d.ts.map