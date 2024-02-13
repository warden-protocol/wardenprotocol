import _m0 from "protobufjs/minimal";
import { MerklePrefix } from "../../commitment/v1/commitment";
export declare const protobufPackage = "ibc.core.connection.v1";
/**
 * State defines if a connection is in one of the following states:
 * INIT, TRYOPEN, OPEN or UNINITIALIZED.
 */
export declare enum State {
    /** STATE_UNINITIALIZED_UNSPECIFIED - Default State */
    STATE_UNINITIALIZED_UNSPECIFIED = 0,
    /** STATE_INIT - A connection end has just started the opening handshake. */
    STATE_INIT = 1,
    /**
     * STATE_TRYOPEN - A connection end has acknowledged the handshake step on the counterparty
     * chain.
     */
    STATE_TRYOPEN = 2,
    /** STATE_OPEN - A connection end has completed the handshake. */
    STATE_OPEN = 3,
    UNRECOGNIZED = -1
}
export declare function stateFromJSON(object: any): State;
export declare function stateToJSON(object: State): string;
/**
 * ConnectionEnd defines a stateful object on a chain connected to another
 * separate one.
 * NOTE: there must only be 2 defined ConnectionEnds to establish
 * a connection between two chains.
 */
export interface ConnectionEnd {
    /** client associated with this connection. */
    clientId: string;
    /**
     * IBC version which can be utilised to determine encodings or protocols for
     * channels or packets utilising this connection.
     */
    versions: Version[];
    /** current state of the connection end. */
    state: State;
    /** counterparty chain associated with this connection. */
    counterparty: Counterparty | undefined;
    /**
     * delay period that must pass before a consensus state can be used for
     * packet-verification NOTE: delay period logic is only implemented by some
     * clients.
     */
    delayPeriod: number;
}
/**
 * IdentifiedConnection defines a connection with additional connection
 * identifier field.
 */
export interface IdentifiedConnection {
    /** connection identifier. */
    id: string;
    /** client associated with this connection. */
    clientId: string;
    /**
     * IBC version which can be utilised to determine encodings or protocols for
     * channels or packets utilising this connection
     */
    versions: Version[];
    /** current state of the connection end. */
    state: State;
    /** counterparty chain associated with this connection. */
    counterparty: Counterparty | undefined;
    /** delay period associated with this connection. */
    delayPeriod: number;
}
/** Counterparty defines the counterparty chain associated with a connection end. */
export interface Counterparty {
    /**
     * identifies the client on the counterparty chain associated with a given
     * connection.
     */
    clientId: string;
    /**
     * identifies the connection end on the counterparty chain associated with a
     * given connection.
     */
    connectionId: string;
    /** commitment merkle prefix of the counterparty chain. */
    prefix: MerklePrefix | undefined;
}
/** ClientPaths define all the connection paths for a client state. */
export interface ClientPaths {
    /** list of connection paths */
    paths: string[];
}
/** ConnectionPaths define all the connection paths for a given client state. */
export interface ConnectionPaths {
    /** client state unique identifier */
    clientId: string;
    /** list of connection paths */
    paths: string[];
}
/**
 * Version defines the versioning scheme used to negotiate the IBC verison in
 * the connection handshake.
 */
export interface Version {
    /** unique version identifier */
    identifier: string;
    /** list of features compatible with the specified identifier */
    features: string[];
}
/** Params defines the set of Connection parameters. */
export interface Params {
    /**
     * maximum expected time per block (in nanoseconds), used to enforce block delay. This parameter should reflect the
     * largest amount of time that the chain might reasonably take to produce the next block under normal operating
     * conditions. A safe choice is 3-5x the expected time per block.
     */
    maxExpectedTimePerBlock: number;
}
export declare const ConnectionEnd: {
    encode(message: ConnectionEnd, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionEnd;
    fromJSON(object: any): ConnectionEnd;
    toJSON(message: ConnectionEnd): unknown;
    create<I extends {
        clientId?: string;
        versions?: {
            identifier?: string;
            features?: string[];
        }[];
        state?: State;
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
            features?: string[] & string[] & { [K in Exclude<keyof I["versions"][number]["features"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["versions"][number], keyof Version>]: never; })[] & { [K_2 in Exclude<keyof I["versions"], keyof {
            identifier?: string;
            features?: string[];
        }[]>]: never; };
        state?: State;
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
            } & { [K_3 in Exclude<keyof I["counterparty"]["prefix"], "keyPrefix">]: never; };
        } & { [K_4 in Exclude<keyof I["counterparty"], keyof Counterparty>]: never; };
        delayPeriod?: number;
    } & { [K_5 in Exclude<keyof I, keyof ConnectionEnd>]: never; }>(base?: I): ConnectionEnd;
    fromPartial<I_1 extends {
        clientId?: string;
        versions?: {
            identifier?: string;
            features?: string[];
        }[];
        state?: State;
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
            features?: string[] & string[] & { [K_6 in Exclude<keyof I_1["versions"][number]["features"], keyof string[]>]: never; };
        } & { [K_7 in Exclude<keyof I_1["versions"][number], keyof Version>]: never; })[] & { [K_8 in Exclude<keyof I_1["versions"], keyof {
            identifier?: string;
            features?: string[];
        }[]>]: never; };
        state?: State;
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
            } & { [K_9 in Exclude<keyof I_1["counterparty"]["prefix"], "keyPrefix">]: never; };
        } & { [K_10 in Exclude<keyof I_1["counterparty"], keyof Counterparty>]: never; };
        delayPeriod?: number;
    } & { [K_11 in Exclude<keyof I_1, keyof ConnectionEnd>]: never; }>(object: I_1): ConnectionEnd;
};
export declare const IdentifiedConnection: {
    encode(message: IdentifiedConnection, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): IdentifiedConnection;
    fromJSON(object: any): IdentifiedConnection;
    toJSON(message: IdentifiedConnection): unknown;
    create<I extends {
        id?: string;
        clientId?: string;
        versions?: {
            identifier?: string;
            features?: string[];
        }[];
        state?: State;
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
            features?: string[] & string[] & { [K in Exclude<keyof I["versions"][number]["features"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["versions"][number], keyof Version>]: never; })[] & { [K_2 in Exclude<keyof I["versions"], keyof {
            identifier?: string;
            features?: string[];
        }[]>]: never; };
        state?: State;
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
            } & { [K_3 in Exclude<keyof I["counterparty"]["prefix"], "keyPrefix">]: never; };
        } & { [K_4 in Exclude<keyof I["counterparty"], keyof Counterparty>]: never; };
        delayPeriod?: number;
    } & { [K_5 in Exclude<keyof I, keyof IdentifiedConnection>]: never; }>(base?: I): IdentifiedConnection;
    fromPartial<I_1 extends {
        id?: string;
        clientId?: string;
        versions?: {
            identifier?: string;
            features?: string[];
        }[];
        state?: State;
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
            features?: string[] & string[] & { [K_6 in Exclude<keyof I_1["versions"][number]["features"], keyof string[]>]: never; };
        } & { [K_7 in Exclude<keyof I_1["versions"][number], keyof Version>]: never; })[] & { [K_8 in Exclude<keyof I_1["versions"], keyof {
            identifier?: string;
            features?: string[];
        }[]>]: never; };
        state?: State;
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
            } & { [K_9 in Exclude<keyof I_1["counterparty"]["prefix"], "keyPrefix">]: never; };
        } & { [K_10 in Exclude<keyof I_1["counterparty"], keyof Counterparty>]: never; };
        delayPeriod?: number;
    } & { [K_11 in Exclude<keyof I_1, keyof IdentifiedConnection>]: never; }>(object: I_1): IdentifiedConnection;
};
export declare const Counterparty: {
    encode(message: Counterparty, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Counterparty;
    fromJSON(object: any): Counterparty;
    toJSON(message: Counterparty): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["prefix"], "keyPrefix">]: never; };
    } & { [K_1 in Exclude<keyof I, keyof Counterparty>]: never; }>(base?: I): Counterparty;
    fromPartial<I_1 extends {
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
        } & { [K_2 in Exclude<keyof I_1["prefix"], "keyPrefix">]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof Counterparty>]: never; }>(object: I_1): Counterparty;
};
export declare const ClientPaths: {
    encode(message: ClientPaths, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClientPaths;
    fromJSON(object: any): ClientPaths;
    toJSON(message: ClientPaths): unknown;
    create<I extends {
        paths?: string[];
    } & {
        paths?: string[] & string[] & { [K in Exclude<keyof I["paths"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "paths">]: never; }>(base?: I): ClientPaths;
    fromPartial<I_1 extends {
        paths?: string[];
    } & {
        paths?: string[] & string[] & { [K_2 in Exclude<keyof I_1["paths"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "paths">]: never; }>(object: I_1): ClientPaths;
};
export declare const ConnectionPaths: {
    encode(message: ConnectionPaths, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ConnectionPaths;
    fromJSON(object: any): ConnectionPaths;
    toJSON(message: ConnectionPaths): unknown;
    create<I extends {
        clientId?: string;
        paths?: string[];
    } & {
        clientId?: string;
        paths?: string[] & string[] & { [K in Exclude<keyof I["paths"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof ConnectionPaths>]: never; }>(base?: I): ConnectionPaths;
    fromPartial<I_1 extends {
        clientId?: string;
        paths?: string[];
    } & {
        clientId?: string;
        paths?: string[] & string[] & { [K_2 in Exclude<keyof I_1["paths"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof ConnectionPaths>]: never; }>(object: I_1): ConnectionPaths;
};
export declare const Version: {
    encode(message: Version, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Version;
    fromJSON(object: any): Version;
    toJSON(message: Version): unknown;
    create<I extends {
        identifier?: string;
        features?: string[];
    } & {
        identifier?: string;
        features?: string[] & string[] & { [K in Exclude<keyof I["features"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof Version>]: never; }>(base?: I): Version;
    fromPartial<I_1 extends {
        identifier?: string;
        features?: string[];
    } & {
        identifier?: string;
        features?: string[] & string[] & { [K_2 in Exclude<keyof I_1["features"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof Version>]: never; }>(object: I_1): Version;
};
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        maxExpectedTimePerBlock?: number;
    } & {
        maxExpectedTimePerBlock?: number;
    } & { [K in Exclude<keyof I, "maxExpectedTimePerBlock">]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        maxExpectedTimePerBlock?: number;
    } & {
        maxExpectedTimePerBlock?: number;
    } & { [K_1 in Exclude<keyof I_1, "maxExpectedTimePerBlock">]: never; }>(object: I_1): Params;
};
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
