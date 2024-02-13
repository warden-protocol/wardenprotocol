import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { ConsensusStateWithHeight, Height, IdentifiedClientState, Params } from "./client";
export declare const protobufPackage = "ibc.core.client.v1";
/**
 * QueryClientStateRequest is the request type for the Query/ClientState RPC
 * method
 */
export interface QueryClientStateRequest {
    /** client state unique identifier */
    clientId: string;
}
/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryClientStateResponse {
    /** client state associated with the request identifier */
    clientState: Any | undefined;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/**
 * QueryClientStatesRequest is the request type for the Query/ClientStates RPC
 * method
 */
export interface QueryClientStatesRequest {
    /** pagination request */
    pagination: PageRequest | undefined;
}
/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 */
export interface QueryClientStatesResponse {
    /** list of stored ClientStates of the chain. */
    clientStates: IdentifiedClientState[];
    /** pagination response */
    pagination: PageResponse | undefined;
}
/**
 * QueryConsensusStateRequest is the request type for the Query/ConsensusState
 * RPC method. Besides the consensus state, it includes a proof and the height
 * from which the proof was retrieved.
 */
export interface QueryConsensusStateRequest {
    /** client identifier */
    clientId: string;
    /** consensus state revision number */
    revisionNumber: number;
    /** consensus state revision height */
    revisionHeight: number;
    /**
     * latest_height overrrides the height field and queries the latest stored
     * ConsensusState
     */
    latestHeight: boolean;
}
/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 */
export interface QueryConsensusStateResponse {
    /** consensus state associated with the client identifier at the given height */
    consensusState: Any | undefined;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/**
 * QueryConsensusStatesRequest is the request type for the Query/ConsensusStates
 * RPC method.
 */
export interface QueryConsensusStatesRequest {
    /** client identifier */
    clientId: string;
    /** pagination request */
    pagination: PageRequest | undefined;
}
/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 */
export interface QueryConsensusStatesResponse {
    /** consensus states associated with the identifier */
    consensusStates: ConsensusStateWithHeight[];
    /** pagination response */
    pagination: PageResponse | undefined;
}
/**
 * QueryConsensusStateHeightsRequest is the request type for Query/ConsensusStateHeights
 * RPC method.
 */
export interface QueryConsensusStateHeightsRequest {
    /** client identifier */
    clientId: string;
    /** pagination request */
    pagination: PageRequest | undefined;
}
/**
 * QueryConsensusStateHeightsResponse is the response type for the
 * Query/ConsensusStateHeights RPC method
 */
export interface QueryConsensusStateHeightsResponse {
    /** consensus state heights */
    consensusStateHeights: Height[];
    /** pagination response */
    pagination: PageResponse | undefined;
}
/**
 * QueryClientStatusRequest is the request type for the Query/ClientStatus RPC
 * method
 */
export interface QueryClientStatusRequest {
    /** client unique identifier */
    clientId: string;
}
/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 */
export interface QueryClientStatusResponse {
    status: string;
}
/**
 * QueryClientParamsRequest is the request type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsRequest {
}
/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
}
/**
 * QueryUpgradedClientStateRequest is the request type for the
 * Query/UpgradedClientState RPC method
 */
export interface QueryUpgradedClientStateRequest {
}
/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 */
export interface QueryUpgradedClientStateResponse {
    /** client state associated with the request identifier */
    upgradedClientState: Any | undefined;
}
/**
 * QueryUpgradedConsensusStateRequest is the request type for the
 * Query/UpgradedConsensusState RPC method
 */
export interface QueryUpgradedConsensusStateRequest {
}
/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 */
export interface QueryUpgradedConsensusStateResponse {
    /** Consensus state associated with the request identifier */
    upgradedConsensusState: Any | undefined;
}
export declare const QueryClientStateRequest: {
    encode(message: QueryClientStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStateRequest;
    fromJSON(object: any): QueryClientStateRequest;
    toJSON(message: QueryClientStateRequest): unknown;
    create<I extends {
        clientId?: string;
    } & {
        clientId?: string;
    } & { [K in Exclude<keyof I, "clientId">]: never; }>(base?: I): QueryClientStateRequest;
    fromPartial<I_1 extends {
        clientId?: string;
    } & {
        clientId?: string;
    } & { [K_1 in Exclude<keyof I_1, "clientId">]: never; }>(object: I_1): QueryClientStateRequest;
};
export declare const QueryClientStateResponse: {
    encode(message: QueryClientStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStateResponse;
    fromJSON(object: any): QueryClientStateResponse;
    toJSON(message: QueryClientStateResponse): unknown;
    create<I extends {
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["clientState"], keyof Any>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_1 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryClientStateResponse>]: never; }>(base?: I): QueryClientStateResponse;
    fromPartial<I_1 extends {
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["clientState"], keyof Any>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryClientStateResponse>]: never; }>(object: I_1): QueryClientStateResponse;
};
export declare const QueryClientStatesRequest: {
    encode(message: QueryClientStatesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatesRequest;
    fromJSON(object: any): QueryClientStatesRequest;
    toJSON(message: QueryClientStatesRequest): unknown;
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
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryClientStatesRequest;
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
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryClientStatesRequest;
};
export declare const QueryClientStatesResponse: {
    encode(message: QueryClientStatesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatesResponse;
    fromJSON(object: any): QueryClientStatesResponse;
    toJSON(message: QueryClientStatesResponse): unknown;
    create<I extends {
        clientStates?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        clientStates?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
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
            } & { [K in Exclude<keyof I["clientStates"][number]["clientState"], keyof Any>]: never; };
        } & { [K_1 in Exclude<keyof I["clientStates"][number], keyof IdentifiedClientState>]: never; })[] & { [K_2 in Exclude<keyof I["clientStates"], keyof {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_3 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryClientStatesResponse>]: never; }>(base?: I): QueryClientStatesResponse;
    fromPartial<I_1 extends {
        clientStates?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        clientStates?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
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
            } & { [K_5 in Exclude<keyof I_1["clientStates"][number]["clientState"], keyof Any>]: never; };
        } & { [K_6 in Exclude<keyof I_1["clientStates"][number], keyof IdentifiedClientState>]: never; })[] & { [K_7 in Exclude<keyof I_1["clientStates"], keyof {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryClientStatesResponse>]: never; }>(object: I_1): QueryClientStatesResponse;
};
export declare const QueryConsensusStateRequest: {
    encode(message: QueryConsensusStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateRequest;
    fromJSON(object: any): QueryConsensusStateRequest;
    toJSON(message: QueryConsensusStateRequest): unknown;
    create<I extends {
        clientId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
        latestHeight?: boolean;
    } & {
        clientId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
        latestHeight?: boolean;
    } & { [K in Exclude<keyof I, keyof QueryConsensusStateRequest>]: never; }>(base?: I): QueryConsensusStateRequest;
    fromPartial<I_1 extends {
        clientId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
        latestHeight?: boolean;
    } & {
        clientId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
        latestHeight?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryConsensusStateRequest>]: never; }>(object: I_1): QueryConsensusStateRequest;
};
export declare const QueryConsensusStateResponse: {
    encode(message: QueryConsensusStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateResponse;
    fromJSON(object: any): QueryConsensusStateResponse;
    toJSON(message: QueryConsensusStateResponse): unknown;
    create<I extends {
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
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
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_1 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryConsensusStateResponse>]: never; }>(base?: I): QueryConsensusStateResponse;
    fromPartial<I_1 extends {
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
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
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryConsensusStateResponse>]: never; }>(object: I_1): QueryConsensusStateResponse;
};
export declare const QueryConsensusStatesRequest: {
    encode(message: QueryConsensusStatesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStatesRequest;
    fromJSON(object: any): QueryConsensusStatesRequest;
    toJSON(message: QueryConsensusStatesRequest): unknown;
    create<I extends {
        clientId?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        clientId?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryConsensusStatesRequest>]: never; }>(base?: I): QueryConsensusStatesRequest;
    fromPartial<I_1 extends {
        clientId?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        clientId?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryConsensusStatesRequest>]: never; }>(object: I_1): QueryConsensusStatesRequest;
};
export declare const QueryConsensusStatesResponse: {
    encode(message: QueryConsensusStatesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStatesResponse;
    fromJSON(object: any): QueryConsensusStatesResponse;
    toJSON(message: QueryConsensusStatesResponse): unknown;
    create<I extends {
        consensusStates?: {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        consensusStates?: {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K in Exclude<keyof I["consensusStates"][number]["height"], keyof Height>]: never; };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_1 in Exclude<keyof I["consensusStates"][number]["consensusState"], keyof Any>]: never; };
        } & { [K_2 in Exclude<keyof I["consensusStates"][number], keyof ConsensusStateWithHeight>]: never; })[] & { [K_3 in Exclude<keyof I["consensusStates"], keyof {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof QueryConsensusStatesResponse>]: never; }>(base?: I): QueryConsensusStatesResponse;
    fromPartial<I_1 extends {
        consensusStates?: {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        consensusStates?: {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[] & ({
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K_6 in Exclude<keyof I_1["consensusStates"][number]["height"], keyof Height>]: never; };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_7 in Exclude<keyof I_1["consensusStates"][number]["consensusState"], keyof Any>]: never; };
        } & { [K_8 in Exclude<keyof I_1["consensusStates"][number], keyof ConsensusStateWithHeight>]: never; })[] & { [K_9 in Exclude<keyof I_1["consensusStates"], keyof {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_10 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof QueryConsensusStatesResponse>]: never; }>(object: I_1): QueryConsensusStatesResponse;
};
export declare const QueryConsensusStateHeightsRequest: {
    encode(message: QueryConsensusStateHeightsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateHeightsRequest;
    fromJSON(object: any): QueryConsensusStateHeightsRequest;
    toJSON(message: QueryConsensusStateHeightsRequest): unknown;
    create<I extends {
        clientId?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        clientId?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryConsensusStateHeightsRequest>]: never; }>(base?: I): QueryConsensusStateHeightsRequest;
    fromPartial<I_1 extends {
        clientId?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        clientId?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryConsensusStateHeightsRequest>]: never; }>(object: I_1): QueryConsensusStateHeightsRequest;
};
export declare const QueryConsensusStateHeightsResponse: {
    encode(message: QueryConsensusStateHeightsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsensusStateHeightsResponse;
    fromJSON(object: any): QueryConsensusStateHeightsResponse;
    toJSON(message: QueryConsensusStateHeightsResponse): unknown;
    create<I extends {
        consensusStateHeights?: {
            revisionNumber?: number;
            revisionHeight?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        consensusStateHeights?: {
            revisionNumber?: number;
            revisionHeight?: number;
        }[] & ({
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["consensusStateHeights"][number], keyof Height>]: never; })[] & { [K_1 in Exclude<keyof I["consensusStateHeights"], keyof {
            revisionNumber?: number;
            revisionHeight?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryConsensusStateHeightsResponse>]: never; }>(base?: I): QueryConsensusStateHeightsResponse;
    fromPartial<I_1 extends {
        consensusStateHeights?: {
            revisionNumber?: number;
            revisionHeight?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        consensusStateHeights?: {
            revisionNumber?: number;
            revisionHeight?: number;
        }[] & ({
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["consensusStateHeights"][number], keyof Height>]: never; })[] & { [K_5 in Exclude<keyof I_1["consensusStateHeights"], keyof {
            revisionNumber?: number;
            revisionHeight?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryConsensusStateHeightsResponse>]: never; }>(object: I_1): QueryConsensusStateHeightsResponse;
};
export declare const QueryClientStatusRequest: {
    encode(message: QueryClientStatusRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatusRequest;
    fromJSON(object: any): QueryClientStatusRequest;
    toJSON(message: QueryClientStatusRequest): unknown;
    create<I extends {
        clientId?: string;
    } & {
        clientId?: string;
    } & { [K in Exclude<keyof I, "clientId">]: never; }>(base?: I): QueryClientStatusRequest;
    fromPartial<I_1 extends {
        clientId?: string;
    } & {
        clientId?: string;
    } & { [K_1 in Exclude<keyof I_1, "clientId">]: never; }>(object: I_1): QueryClientStatusRequest;
};
export declare const QueryClientStatusResponse: {
    encode(message: QueryClientStatusResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientStatusResponse;
    fromJSON(object: any): QueryClientStatusResponse;
    toJSON(message: QueryClientStatusResponse): unknown;
    create<I extends {
        status?: string;
    } & {
        status?: string;
    } & { [K in Exclude<keyof I, "status">]: never; }>(base?: I): QueryClientStatusResponse;
    fromPartial<I_1 extends {
        status?: string;
    } & {
        status?: string;
    } & { [K_1 in Exclude<keyof I_1, "status">]: never; }>(object: I_1): QueryClientStatusResponse;
};
export declare const QueryClientParamsRequest: {
    encode(_: QueryClientParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientParamsRequest;
    fromJSON(_: any): QueryClientParamsRequest;
    toJSON(_: QueryClientParamsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryClientParamsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryClientParamsRequest;
};
export declare const QueryClientParamsResponse: {
    encode(message: QueryClientParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryClientParamsResponse;
    fromJSON(object: any): QueryClientParamsResponse;
    toJSON(message: QueryClientParamsResponse): unknown;
    create<I extends {
        params?: {
            allowedClients?: string[];
        };
    } & {
        params?: {
            allowedClients?: string[];
        } & {
            allowedClients?: string[] & string[] & { [K in Exclude<keyof I["params"]["allowedClients"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["params"], "allowedClients">]: never; };
    } & { [K_2 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryClientParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            allowedClients?: string[];
        };
    } & {
        params?: {
            allowedClients?: string[];
        } & {
            allowedClients?: string[] & string[] & { [K_3 in Exclude<keyof I_1["params"]["allowedClients"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["params"], "allowedClients">]: never; };
    } & { [K_5 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryClientParamsResponse;
};
export declare const QueryUpgradedClientStateRequest: {
    encode(_: QueryUpgradedClientStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedClientStateRequest;
    fromJSON(_: any): QueryUpgradedClientStateRequest;
    toJSON(_: QueryUpgradedClientStateRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryUpgradedClientStateRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryUpgradedClientStateRequest;
};
export declare const QueryUpgradedClientStateResponse: {
    encode(message: QueryUpgradedClientStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedClientStateResponse;
    fromJSON(object: any): QueryUpgradedClientStateResponse;
    toJSON(message: QueryUpgradedClientStateResponse): unknown;
    create<I extends {
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["upgradedClientState"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, "upgradedClientState">]: never; }>(base?: I): QueryUpgradedClientStateResponse;
    fromPartial<I_1 extends {
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["upgradedClientState"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "upgradedClientState">]: never; }>(object: I_1): QueryUpgradedClientStateResponse;
};
export declare const QueryUpgradedConsensusStateRequest: {
    encode(_: QueryUpgradedConsensusStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedConsensusStateRequest;
    fromJSON(_: any): QueryUpgradedConsensusStateRequest;
    toJSON(_: QueryUpgradedConsensusStateRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryUpgradedConsensusStateRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryUpgradedConsensusStateRequest;
};
export declare const QueryUpgradedConsensusStateResponse: {
    encode(message: QueryUpgradedConsensusStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradedConsensusStateResponse;
    fromJSON(object: any): QueryUpgradedConsensusStateResponse;
    toJSON(message: QueryUpgradedConsensusStateResponse): unknown;
    create<I extends {
        upgradedConsensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        upgradedConsensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["upgradedConsensusState"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, "upgradedConsensusState">]: never; }>(base?: I): QueryUpgradedConsensusStateResponse;
    fromPartial<I_1 extends {
        upgradedConsensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        upgradedConsensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["upgradedConsensusState"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "upgradedConsensusState">]: never; }>(object: I_1): QueryUpgradedConsensusStateResponse;
};
/** Query provides defines the gRPC querier service */
export interface Query {
    /** ClientState queries an IBC light client. */
    ClientState(request: QueryClientStateRequest): Promise<QueryClientStateResponse>;
    /** ClientStates queries all the IBC light clients of a chain. */
    ClientStates(request: QueryClientStatesRequest): Promise<QueryClientStatesResponse>;
    /**
     * ConsensusState queries a consensus state associated with a client state at
     * a given height.
     */
    ConsensusState(request: QueryConsensusStateRequest): Promise<QueryConsensusStateResponse>;
    /**
     * ConsensusStates queries all the consensus state associated with a given
     * client.
     */
    ConsensusStates(request: QueryConsensusStatesRequest): Promise<QueryConsensusStatesResponse>;
    /** ConsensusStateHeights queries the height of every consensus states associated with a given client. */
    ConsensusStateHeights(request: QueryConsensusStateHeightsRequest): Promise<QueryConsensusStateHeightsResponse>;
    /** Status queries the status of an IBC client. */
    ClientStatus(request: QueryClientStatusRequest): Promise<QueryClientStatusResponse>;
    /** ClientParams queries all parameters of the ibc client submodule. */
    ClientParams(request: QueryClientParamsRequest): Promise<QueryClientParamsResponse>;
    /** UpgradedClientState queries an Upgraded IBC light client. */
    UpgradedClientState(request: QueryUpgradedClientStateRequest): Promise<QueryUpgradedClientStateResponse>;
    /** UpgradedConsensusState queries an Upgraded IBC consensus state. */
    UpgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse>;
}
export declare const QueryServiceName = "ibc.core.client.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    ClientState(request: QueryClientStateRequest): Promise<QueryClientStateResponse>;
    ClientStates(request: QueryClientStatesRequest): Promise<QueryClientStatesResponse>;
    ConsensusState(request: QueryConsensusStateRequest): Promise<QueryConsensusStateResponse>;
    ConsensusStates(request: QueryConsensusStatesRequest): Promise<QueryConsensusStatesResponse>;
    ConsensusStateHeights(request: QueryConsensusStateHeightsRequest): Promise<QueryConsensusStateHeightsResponse>;
    ClientStatus(request: QueryClientStatusRequest): Promise<QueryClientStatusResponse>;
    ClientParams(request: QueryClientParamsRequest): Promise<QueryClientParamsResponse>;
    UpgradedClientState(request: QueryUpgradedClientStateRequest): Promise<QueryUpgradedClientStateResponse>;
    UpgradedConsensusState(request: QueryUpgradedConsensusStateRequest): Promise<QueryUpgradedConsensusStateResponse>;
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
