import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { Height, IdentifiedClientState } from "../../client/v1/client";
import { ConnectionEnd, IdentifiedConnection, Params } from "./connection";
export declare const protobufPackage = "ibc.core.connection.v1";
/**
 * QueryConnectionRequest is the request type for the Query/Connection RPC
 * method
 */
export interface QueryConnectionRequest {
    /** connection unique identifier */
    connectionId: string;
}
/**
 * QueryConnectionResponse is the response type for the Query/Connection RPC
 * method. Besides the connection end, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryConnectionResponse {
    /** connection associated with the request identifier */
    connection: ConnectionEnd | undefined;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/**
 * QueryConnectionsRequest is the request type for the Query/Connections RPC
 * method
 */
export interface QueryConnectionsRequest {
    pagination: PageRequest | undefined;
}
/**
 * QueryConnectionsResponse is the response type for the Query/Connections RPC
 * method.
 */
export interface QueryConnectionsResponse {
    /** list of stored connections of the chain. */
    connections: IdentifiedConnection[];
    /** pagination response */
    pagination: PageResponse | undefined;
    /** query block height */
    height: Height | undefined;
}
/**
 * QueryClientConnectionsRequest is the request type for the
 * Query/ClientConnections RPC method
 */
export interface QueryClientConnectionsRequest {
    /** client identifier associated with a connection */
    clientId: string;
}
/**
 * QueryClientConnectionsResponse is the response type for the
 * Query/ClientConnections RPC method
 */
export interface QueryClientConnectionsResponse {
    /** slice of all the connection paths associated with a client. */
    connectionPaths: string[];
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was generated */
    proofHeight: Height | undefined;
}
/**
 * QueryConnectionClientStateRequest is the request type for the
 * Query/ConnectionClientState RPC method
 */
export interface QueryConnectionClientStateRequest {
    /** connection identifier */
    connectionId: string;
}
/**
 * QueryConnectionClientStateResponse is the response type for the
 * Query/ConnectionClientState RPC method
 */
export interface QueryConnectionClientStateResponse {
    /** client state associated with the channel */
    identifiedClientState: IdentifiedClientState | undefined;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/**
 * QueryConnectionConsensusStateRequest is the request type for the
 * Query/ConnectionConsensusState RPC method
 */
export interface QueryConnectionConsensusStateRequest {
    /** connection identifier */
    connectionId: string;
    revisionNumber: number;
    revisionHeight: number;
}
/**
 * QueryConnectionConsensusStateResponse is the response type for the
 * Query/ConnectionConsensusState RPC method
 */
export interface QueryConnectionConsensusStateResponse {
    /** consensus state associated with the channel */
    consensusState: Any | undefined;
    /** client ID associated with the consensus state */
    clientId: string;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/** QueryConnectionParamsRequest is the request type for the Query/ConnectionParams RPC method. */
export interface QueryConnectionParamsRequest {
}
/** QueryConnectionParamsResponse is the response type for the Query/ConnectionParams RPC method. */
export interface QueryConnectionParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
}
export declare const QueryConnectionRequest: {
    encode(message: QueryConnectionRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionRequest;
    fromJSON(object: any): QueryConnectionRequest;
    toJSON(message: QueryConnectionRequest): unknown;
    create<I extends {
        connectionId?: string;
    } & {
        connectionId?: string;
    } & { [K in Exclude<keyof I, "connectionId">]: never; }>(base?: I): QueryConnectionRequest;
    fromPartial<I_1 extends {
        connectionId?: string;
    } & {
        connectionId?: string;
    } & { [K_1 in Exclude<keyof I_1, "connectionId">]: never; }>(object: I_1): QueryConnectionRequest;
};
export declare const QueryConnectionResponse: {
    encode(message: QueryConnectionResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionResponse;
    fromJSON(object: any): QueryConnectionResponse;
    toJSON(message: QueryConnectionResponse): unknown;
    create<I extends {
        connection?: {
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        connection?: {
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        } & {
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[] & ({
                identifier?: string;
                features?: string[];
            } & {
                identifier?: string;
                features?: string[] & string[] & { [K in Exclude<keyof I["connection"]["versions"][number]["features"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["connection"]["versions"][number], keyof import("./connection").Version>]: never; })[] & { [K_2 in Exclude<keyof I["connection"]["versions"], keyof {
                identifier?: string;
                features?: string[];
            }[]>]: never; };
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            } & {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                } & {
                    keyPrefix?: Uint8Array;
                } & { [K_3 in Exclude<keyof I["connection"]["counterparty"]["prefix"], "keyPrefix">]: never; };
            } & { [K_4 in Exclude<keyof I["connection"]["counterparty"], keyof import("./connection").Counterparty>]: never; };
            delayPeriod?: number;
        } & { [K_5 in Exclude<keyof I["connection"], keyof ConnectionEnd>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_6 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_7 in Exclude<keyof I, keyof QueryConnectionResponse>]: never; }>(base?: I): QueryConnectionResponse;
    fromPartial<I_1 extends {
        connection?: {
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        connection?: {
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        } & {
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[] & ({
                identifier?: string;
                features?: string[];
            } & {
                identifier?: string;
                features?: string[] & string[] & { [K_8 in Exclude<keyof I_1["connection"]["versions"][number]["features"], keyof string[]>]: never; };
            } & { [K_9 in Exclude<keyof I_1["connection"]["versions"][number], keyof import("./connection").Version>]: never; })[] & { [K_10 in Exclude<keyof I_1["connection"]["versions"], keyof {
                identifier?: string;
                features?: string[];
            }[]>]: never; };
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            } & {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                } & {
                    keyPrefix?: Uint8Array;
                } & { [K_11 in Exclude<keyof I_1["connection"]["counterparty"]["prefix"], "keyPrefix">]: never; };
            } & { [K_12 in Exclude<keyof I_1["connection"]["counterparty"], keyof import("./connection").Counterparty>]: never; };
            delayPeriod?: number;
        } & { [K_13 in Exclude<keyof I_1["connection"], keyof ConnectionEnd>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_14 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_15 in Exclude<keyof I_1, keyof QueryConnectionResponse>]: never; }>(object: I_1): QueryConnectionResponse;
};
export declare const QueryConnectionsRequest: {
    encode(message: QueryConnectionsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionsRequest;
    fromJSON(object: any): QueryConnectionsRequest;
    toJSON(message: QueryConnectionsRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryConnectionsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryConnectionsRequest;
};
export declare const QueryConnectionsResponse: {
    encode(message: QueryConnectionsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionsResponse;
    fromJSON(object: any): QueryConnectionsResponse;
    toJSON(message: QueryConnectionsResponse): unknown;
    create<I extends {
        connections?: {
            id?: string;
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        connections?: {
            id?: string;
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        }[] & ({
            id?: string;
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        } & {
            id?: string;
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[] & ({
                identifier?: string;
                features?: string[];
            } & {
                identifier?: string;
                features?: string[] & string[] & { [K in Exclude<keyof I["connections"][number]["versions"][number]["features"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["connections"][number]["versions"][number], keyof import("./connection").Version>]: never; })[] & { [K_2 in Exclude<keyof I["connections"][number]["versions"], keyof {
                identifier?: string;
                features?: string[];
            }[]>]: never; };
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            } & {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                } & {
                    keyPrefix?: Uint8Array;
                } & { [K_3 in Exclude<keyof I["connections"][number]["counterparty"]["prefix"], "keyPrefix">]: never; };
            } & { [K_4 in Exclude<keyof I["connections"][number]["counterparty"], keyof import("./connection").Counterparty>]: never; };
            delayPeriod?: number;
        } & { [K_5 in Exclude<keyof I["connections"][number], keyof IdentifiedConnection>]: never; })[] & { [K_6 in Exclude<keyof I["connections"], keyof {
            id?: string;
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_7 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_8 in Exclude<keyof I["height"], keyof Height>]: never; };
    } & { [K_9 in Exclude<keyof I, keyof QueryConnectionsResponse>]: never; }>(base?: I): QueryConnectionsResponse;
    fromPartial<I_1 extends {
        connections?: {
            id?: string;
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        connections?: {
            id?: string;
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        }[] & ({
            id?: string;
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        } & {
            id?: string;
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[] & ({
                identifier?: string;
                features?: string[];
            } & {
                identifier?: string;
                features?: string[] & string[] & { [K_10 in Exclude<keyof I_1["connections"][number]["versions"][number]["features"], keyof string[]>]: never; };
            } & { [K_11 in Exclude<keyof I_1["connections"][number]["versions"][number], keyof import("./connection").Version>]: never; })[] & { [K_12 in Exclude<keyof I_1["connections"][number]["versions"], keyof {
                identifier?: string;
                features?: string[];
            }[]>]: never; };
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            } & {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                } & {
                    keyPrefix?: Uint8Array;
                } & { [K_13 in Exclude<keyof I_1["connections"][number]["counterparty"]["prefix"], "keyPrefix">]: never; };
            } & { [K_14 in Exclude<keyof I_1["connections"][number]["counterparty"], keyof import("./connection").Counterparty>]: never; };
            delayPeriod?: number;
        } & { [K_15 in Exclude<keyof I_1["connections"][number], keyof IdentifiedConnection>]: never; })[] & { [K_16 in Exclude<keyof I_1["connections"], keyof {
            id?: string;
            clientId?: string;
            versions?: {
                identifier?: string;
                features?: string[];
            }[];
            state?: import("./connection").State;
            counterparty?: {
                clientId?: string;
                connectionId?: string;
                prefix?: {
                    keyPrefix?: Uint8Array;
                };
            };
            delayPeriod?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_17 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_18 in Exclude<keyof I_1["height"], keyof Height>]: never; };
    } & { [K_19 in Exclude<keyof I_1, keyof QueryConnectionsResponse>]: never; }>(object: I_1): QueryConnectionsResponse;
};
export declare const QueryClientConnectionsRequest: {
    encode(message: QueryClientConnectionsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientConnectionsRequest;
    fromJSON(object: any): QueryClientConnectionsRequest;
    toJSON(message: QueryClientConnectionsRequest): unknown;
    create<I extends {
        clientId?: string;
    } & {
        clientId?: string;
    } & { [K in Exclude<keyof I, "clientId">]: never; }>(base?: I): QueryClientConnectionsRequest;
    fromPartial<I_1 extends {
        clientId?: string;
    } & {
        clientId?: string;
    } & { [K_1 in Exclude<keyof I_1, "clientId">]: never; }>(object: I_1): QueryClientConnectionsRequest;
};
export declare const QueryClientConnectionsResponse: {
    encode(message: QueryClientConnectionsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientConnectionsResponse;
    fromJSON(object: any): QueryClientConnectionsResponse;
    toJSON(message: QueryClientConnectionsResponse): unknown;
    create<I extends {
        connectionPaths?: string[];
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        connectionPaths?: string[] & string[] & { [K in Exclude<keyof I["connectionPaths"], keyof string[]>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_1 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryClientConnectionsResponse>]: never; }>(base?: I): QueryClientConnectionsResponse;
    fromPartial<I_1 extends {
        connectionPaths?: string[];
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        connectionPaths?: string[] & string[] & { [K_3 in Exclude<keyof I_1["connectionPaths"], keyof string[]>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryClientConnectionsResponse>]: never; }>(object: I_1): QueryClientConnectionsResponse;
};
export declare const QueryConnectionClientStateRequest: {
    encode(message: QueryConnectionClientStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionClientStateRequest;
    fromJSON(object: any): QueryConnectionClientStateRequest;
    toJSON(message: QueryConnectionClientStateRequest): unknown;
    create<I extends {
        connectionId?: string;
    } & {
        connectionId?: string;
    } & { [K in Exclude<keyof I, "connectionId">]: never; }>(base?: I): QueryConnectionClientStateRequest;
    fromPartial<I_1 extends {
        connectionId?: string;
    } & {
        connectionId?: string;
    } & { [K_1 in Exclude<keyof I_1, "connectionId">]: never; }>(object: I_1): QueryConnectionClientStateRequest;
};
export declare const QueryConnectionClientStateResponse: {
    encode(message: QueryConnectionClientStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionClientStateResponse;
    fromJSON(object: any): QueryConnectionClientStateResponse;
    toJSON(message: QueryConnectionClientStateResponse): unknown;
    create<I extends {
        identifiedClientState?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        identifiedClientState?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["identifiedClientState"]["clientState"], keyof Any>]: never; };
        } & { [K_1 in Exclude<keyof I["identifiedClientState"], keyof IdentifiedClientState>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryConnectionClientStateResponse>]: never; }>(base?: I): QueryConnectionClientStateResponse;
    fromPartial<I_1 extends {
        identifiedClientState?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        identifiedClientState?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_4 in Exclude<keyof I_1["identifiedClientState"]["clientState"], keyof Any>]: never; };
        } & { [K_5 in Exclude<keyof I_1["identifiedClientState"], keyof IdentifiedClientState>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_6 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryConnectionClientStateResponse>]: never; }>(object: I_1): QueryConnectionClientStateResponse;
};
export declare const QueryConnectionConsensusStateRequest: {
    encode(message: QueryConnectionConsensusStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionConsensusStateRequest;
    fromJSON(object: any): QueryConnectionConsensusStateRequest;
    toJSON(message: QueryConnectionConsensusStateRequest): unknown;
    create<I extends {
        connectionId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
    } & {
        connectionId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
    } & { [K in Exclude<keyof I, keyof QueryConnectionConsensusStateRequest>]: never; }>(base?: I): QueryConnectionConsensusStateRequest;
    fromPartial<I_1 extends {
        connectionId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
    } & {
        connectionId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryConnectionConsensusStateRequest>]: never; }>(object: I_1): QueryConnectionConsensusStateRequest;
};
export declare const QueryConnectionConsensusStateResponse: {
    encode(message: QueryConnectionConsensusStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionConsensusStateResponse;
    fromJSON(object: any): QueryConnectionConsensusStateResponse;
    toJSON(message: QueryConnectionConsensusStateResponse): unknown;
    create<I extends {
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        clientId?: string;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["consensusState"], keyof Any>]: never; };
        clientId?: string;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_1 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryConnectionConsensusStateResponse>]: never; }>(base?: I): QueryConnectionConsensusStateResponse;
    fromPartial<I_1 extends {
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        clientId?: string;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["consensusState"], keyof Any>]: never; };
        clientId?: string;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryConnectionConsensusStateResponse>]: never; }>(object: I_1): QueryConnectionConsensusStateResponse;
};
export declare const QueryConnectionParamsRequest: {
    encode(_: QueryConnectionParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionParamsRequest;
    fromJSON(_: any): QueryConnectionParamsRequest;
    toJSON(_: QueryConnectionParamsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryConnectionParamsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryConnectionParamsRequest;
};
export declare const QueryConnectionParamsResponse: {
    encode(message: QueryConnectionParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionParamsResponse;
    fromJSON(object: any): QueryConnectionParamsResponse;
    toJSON(message: QueryConnectionParamsResponse): unknown;
    create<I extends {
        params?: {
            maxExpectedTimePerBlock?: number;
        };
    } & {
        params?: {
            maxExpectedTimePerBlock?: number;
        } & {
            maxExpectedTimePerBlock?: number;
        } & { [K in Exclude<keyof I["params"], "maxExpectedTimePerBlock">]: never; };
    } & { [K_1 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryConnectionParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            maxExpectedTimePerBlock?: number;
        };
    } & {
        params?: {
            maxExpectedTimePerBlock?: number;
        } & {
            maxExpectedTimePerBlock?: number;
        } & { [K_2 in Exclude<keyof I_1["params"], "maxExpectedTimePerBlock">]: never; };
    } & { [K_3 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryConnectionParamsResponse;
};
/** Query provides defines the gRPC querier service */
export interface Query {
    /** Connection queries an IBC connection end. */
    Connection(request: QueryConnectionRequest): Promise<QueryConnectionResponse>;
    /** Connections queries all the IBC connections of a chain. */
    Connections(request: QueryConnectionsRequest): Promise<QueryConnectionsResponse>;
    /**
     * ClientConnections queries the connection paths associated with a client
     * state.
     */
    ClientConnections(request: QueryClientConnectionsRequest): Promise<QueryClientConnectionsResponse>;
    /**
     * ConnectionClientState queries the client state associated with the
     * connection.
     */
    ConnectionClientState(request: QueryConnectionClientStateRequest): Promise<QueryConnectionClientStateResponse>;
    /**
     * ConnectionConsensusState queries the consensus state associated with the
     * connection.
     */
    ConnectionConsensusState(request: QueryConnectionConsensusStateRequest): Promise<QueryConnectionConsensusStateResponse>;
    /** ConnectionParams queries all parameters of the ibc connection submodule. */
    ConnectionParams(request: QueryConnectionParamsRequest): Promise<QueryConnectionParamsResponse>;
}
export declare const QueryServiceName = "ibc.core.connection.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Connection(request: QueryConnectionRequest): Promise<QueryConnectionResponse>;
    Connections(request: QueryConnectionsRequest): Promise<QueryConnectionsResponse>;
    ClientConnections(request: QueryClientConnectionsRequest): Promise<QueryClientConnectionsResponse>;
    ConnectionClientState(request: QueryConnectionClientStateRequest): Promise<QueryConnectionClientStateResponse>;
    ConnectionConsensusState(request: QueryConnectionConsensusStateRequest): Promise<QueryConnectionConsensusStateResponse>;
    ConnectionParams(request: QueryConnectionParamsRequest): Promise<QueryConnectionParamsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
