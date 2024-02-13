import _m0 from "protobufjs/minimal";
import { ConnectionPaths, IdentifiedConnection, Params } from "./connection";
export declare const protobufPackage = "ibc.core.connection.v1";
/** GenesisState defines the ibc connection submodule's genesis state. */
export interface GenesisState {
    connections: IdentifiedConnection[];
    clientConnectionPaths: ConnectionPaths[];
    /** the sequence for the next generated connection identifier */
    nextConnectionSequence: number;
    params: Params | undefined;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
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
        clientConnectionPaths?: {
            clientId?: string;
            paths?: string[];
        }[];
        nextConnectionSequence?: number;
        params?: {
            maxExpectedTimePerBlock?: number;
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
        clientConnectionPaths?: {
            clientId?: string;
            paths?: string[];
        }[] & ({
            clientId?: string;
            paths?: string[];
        } & {
            clientId?: string;
            paths?: string[] & string[] & { [K_7 in Exclude<keyof I["clientConnectionPaths"][number]["paths"], keyof string[]>]: never; };
        } & { [K_8 in Exclude<keyof I["clientConnectionPaths"][number], keyof ConnectionPaths>]: never; })[] & { [K_9 in Exclude<keyof I["clientConnectionPaths"], keyof {
            clientId?: string;
            paths?: string[];
        }[]>]: never; };
        nextConnectionSequence?: number;
        params?: {
            maxExpectedTimePerBlock?: number;
        } & {
            maxExpectedTimePerBlock?: number;
        } & { [K_10 in Exclude<keyof I["params"], "maxExpectedTimePerBlock">]: never; };
    } & { [K_11 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
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
        clientConnectionPaths?: {
            clientId?: string;
            paths?: string[];
        }[];
        nextConnectionSequence?: number;
        params?: {
            maxExpectedTimePerBlock?: number;
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
                features?: string[] & string[] & { [K_12 in Exclude<keyof I_1["connections"][number]["versions"][number]["features"], keyof string[]>]: never; };
            } & { [K_13 in Exclude<keyof I_1["connections"][number]["versions"][number], keyof import("./connection").Version>]: never; })[] & { [K_14 in Exclude<keyof I_1["connections"][number]["versions"], keyof {
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
                } & { [K_15 in Exclude<keyof I_1["connections"][number]["counterparty"]["prefix"], "keyPrefix">]: never; };
            } & { [K_16 in Exclude<keyof I_1["connections"][number]["counterparty"], keyof import("./connection").Counterparty>]: never; };
            delayPeriod?: number;
        } & { [K_17 in Exclude<keyof I_1["connections"][number], keyof IdentifiedConnection>]: never; })[] & { [K_18 in Exclude<keyof I_1["connections"], keyof {
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
        clientConnectionPaths?: {
            clientId?: string;
            paths?: string[];
        }[] & ({
            clientId?: string;
            paths?: string[];
        } & {
            clientId?: string;
            paths?: string[] & string[] & { [K_19 in Exclude<keyof I_1["clientConnectionPaths"][number]["paths"], keyof string[]>]: never; };
        } & { [K_20 in Exclude<keyof I_1["clientConnectionPaths"][number], keyof ConnectionPaths>]: never; })[] & { [K_21 in Exclude<keyof I_1["clientConnectionPaths"], keyof {
            clientId?: string;
            paths?: string[];
        }[]>]: never; };
        nextConnectionSequence?: number;
        params?: {
            maxExpectedTimePerBlock?: number;
        } & {
            maxExpectedTimePerBlock?: number;
        } & { [K_22 in Exclude<keyof I_1["params"], "maxExpectedTimePerBlock">]: never; };
    } & { [K_23 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
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
