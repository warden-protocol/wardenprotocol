import _m0 from "protobufjs/minimal";
import { ClientConsensusStates, IdentifiedClientState, Params } from "./client";
export declare const protobufPackage = "ibc.core.client.v1";
/** GenesisState defines the ibc client submodule's genesis state. */
export interface GenesisState {
    /** client states with their corresponding identifiers */
    clients: IdentifiedClientState[];
    /** consensus states from each client */
    clientsConsensus: ClientConsensusStates[];
    /** metadata from each client */
    clientsMetadata: IdentifiedGenesisMetadata[];
    params: Params | undefined;
    /**
     * Deprecated: create_localhost has been deprecated.
     * The localhost client is automatically created at genesis.
     *
     * @deprecated
     */
    createLocalhost: boolean;
    /** the sequence for the next generated client identifier */
    nextClientSequence: number;
}
/**
 * GenesisMetadata defines the genesis type for metadata that clients may return
 * with ExportMetadata
 */
export interface GenesisMetadata {
    /** store key of metadata without clientID-prefix */
    key: Uint8Array;
    /** metadata value */
    value: Uint8Array;
}
/**
 * IdentifiedGenesisMetadata has the client metadata with the corresponding
 * client id.
 */
export interface IdentifiedGenesisMetadata {
    clientId: string;
    clientMetadata: GenesisMetadata[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        clients?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
        clientsConsensus?: {
            clientId?: string;
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
        }[];
        clientsMetadata?: {
            clientId?: string;
            clientMetadata?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
        }[];
        params?: {
            allowedClients?: string[];
        };
        createLocalhost?: boolean;
        nextClientSequence?: number;
    } & {
        clients?: {
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
            } & { [K in Exclude<keyof I["clients"][number]["clientState"], keyof import("../../../../google/protobuf/any").Any>]: never; };
        } & { [K_1 in Exclude<keyof I["clients"][number], keyof IdentifiedClientState>]: never; })[] & { [K_2 in Exclude<keyof I["clients"], keyof {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
        clientsConsensus?: {
            clientId?: string;
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
        }[] & ({
            clientId?: string;
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
        } & {
            clientId?: string;
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
                } & { [K_3 in Exclude<keyof I["clientsConsensus"][number]["consensusStates"][number]["height"], keyof import("./client").Height>]: never; };
                consensusState?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_4 in Exclude<keyof I["clientsConsensus"][number]["consensusStates"][number]["consensusState"], keyof import("../../../../google/protobuf/any").Any>]: never; };
            } & { [K_5 in Exclude<keyof I["clientsConsensus"][number]["consensusStates"][number], keyof import("./client").ConsensusStateWithHeight>]: never; })[] & { [K_6 in Exclude<keyof I["clientsConsensus"][number]["consensusStates"], keyof {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                consensusState?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            }[]>]: never; };
        } & { [K_7 in Exclude<keyof I["clientsConsensus"][number], keyof ClientConsensusStates>]: never; })[] & { [K_8 in Exclude<keyof I["clientsConsensus"], keyof {
            clientId?: string;
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
        }[]>]: never; };
        clientsMetadata?: {
            clientId?: string;
            clientMetadata?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
        }[] & ({
            clientId?: string;
            clientMetadata?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
        } & {
            clientId?: string;
            clientMetadata?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[] & ({
                key?: Uint8Array;
                value?: Uint8Array;
            } & {
                key?: Uint8Array;
                value?: Uint8Array;
            } & { [K_9 in Exclude<keyof I["clientsMetadata"][number]["clientMetadata"][number], keyof GenesisMetadata>]: never; })[] & { [K_10 in Exclude<keyof I["clientsMetadata"][number]["clientMetadata"], keyof {
                key?: Uint8Array;
                value?: Uint8Array;
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I["clientsMetadata"][number], keyof IdentifiedGenesisMetadata>]: never; })[] & { [K_12 in Exclude<keyof I["clientsMetadata"], keyof {
            clientId?: string;
            clientMetadata?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
        }[]>]: never; };
        params?: {
            allowedClients?: string[];
        } & {
            allowedClients?: string[] & string[] & { [K_13 in Exclude<keyof I["params"]["allowedClients"], keyof string[]>]: never; };
        } & { [K_14 in Exclude<keyof I["params"], "allowedClients">]: never; };
        createLocalhost?: boolean;
        nextClientSequence?: number;
    } & { [K_15 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        clients?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[];
        clientsConsensus?: {
            clientId?: string;
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
        }[];
        clientsMetadata?: {
            clientId?: string;
            clientMetadata?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
        }[];
        params?: {
            allowedClients?: string[];
        };
        createLocalhost?: boolean;
        nextClientSequence?: number;
    } & {
        clients?: {
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
            } & { [K_16 in Exclude<keyof I_1["clients"][number]["clientState"], keyof import("../../../../google/protobuf/any").Any>]: never; };
        } & { [K_17 in Exclude<keyof I_1["clients"][number], keyof IdentifiedClientState>]: never; })[] & { [K_18 in Exclude<keyof I_1["clients"], keyof {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
        clientsConsensus?: {
            clientId?: string;
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
        }[] & ({
            clientId?: string;
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
        } & {
            clientId?: string;
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
                } & { [K_19 in Exclude<keyof I_1["clientsConsensus"][number]["consensusStates"][number]["height"], keyof import("./client").Height>]: never; };
                consensusState?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_20 in Exclude<keyof I_1["clientsConsensus"][number]["consensusStates"][number]["consensusState"], keyof import("../../../../google/protobuf/any").Any>]: never; };
            } & { [K_21 in Exclude<keyof I_1["clientsConsensus"][number]["consensusStates"][number], keyof import("./client").ConsensusStateWithHeight>]: never; })[] & { [K_22 in Exclude<keyof I_1["clientsConsensus"][number]["consensusStates"], keyof {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                consensusState?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            }[]>]: never; };
        } & { [K_23 in Exclude<keyof I_1["clientsConsensus"][number], keyof ClientConsensusStates>]: never; })[] & { [K_24 in Exclude<keyof I_1["clientsConsensus"], keyof {
            clientId?: string;
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
        }[]>]: never; };
        clientsMetadata?: {
            clientId?: string;
            clientMetadata?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
        }[] & ({
            clientId?: string;
            clientMetadata?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
        } & {
            clientId?: string;
            clientMetadata?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[] & ({
                key?: Uint8Array;
                value?: Uint8Array;
            } & {
                key?: Uint8Array;
                value?: Uint8Array;
            } & { [K_25 in Exclude<keyof I_1["clientsMetadata"][number]["clientMetadata"][number], keyof GenesisMetadata>]: never; })[] & { [K_26 in Exclude<keyof I_1["clientsMetadata"][number]["clientMetadata"], keyof {
                key?: Uint8Array;
                value?: Uint8Array;
            }[]>]: never; };
        } & { [K_27 in Exclude<keyof I_1["clientsMetadata"][number], keyof IdentifiedGenesisMetadata>]: never; })[] & { [K_28 in Exclude<keyof I_1["clientsMetadata"], keyof {
            clientId?: string;
            clientMetadata?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
        }[]>]: never; };
        params?: {
            allowedClients?: string[];
        } & {
            allowedClients?: string[] & string[] & { [K_29 in Exclude<keyof I_1["params"]["allowedClients"], keyof string[]>]: never; };
        } & { [K_30 in Exclude<keyof I_1["params"], "allowedClients">]: never; };
        createLocalhost?: boolean;
        nextClientSequence?: number;
    } & { [K_31 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
};
export declare const GenesisMetadata: {
    encode(message: GenesisMetadata, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisMetadata;
    fromJSON(object: any): GenesisMetadata;
    toJSON(message: GenesisMetadata): unknown;
    create<I extends {
        key?: Uint8Array;
        value?: Uint8Array;
    } & {
        key?: Uint8Array;
        value?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof GenesisMetadata>]: never; }>(base?: I): GenesisMetadata;
    fromPartial<I_1 extends {
        key?: Uint8Array;
        value?: Uint8Array;
    } & {
        key?: Uint8Array;
        value?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof GenesisMetadata>]: never; }>(object: I_1): GenesisMetadata;
};
export declare const IdentifiedGenesisMetadata: {
    encode(message: IdentifiedGenesisMetadata, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): IdentifiedGenesisMetadata;
    fromJSON(object: any): IdentifiedGenesisMetadata;
    toJSON(message: IdentifiedGenesisMetadata): unknown;
    create<I extends {
        clientId?: string;
        clientMetadata?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[];
    } & {
        clientId?: string;
        clientMetadata?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[] & ({
            key?: Uint8Array;
            value?: Uint8Array;
        } & {
            key?: Uint8Array;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["clientMetadata"][number], keyof GenesisMetadata>]: never; })[] & { [K_1 in Exclude<keyof I["clientMetadata"], keyof {
            key?: Uint8Array;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof IdentifiedGenesisMetadata>]: never; }>(base?: I): IdentifiedGenesisMetadata;
    fromPartial<I_1 extends {
        clientId?: string;
        clientMetadata?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[];
    } & {
        clientId?: string;
        clientMetadata?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[] & ({
            key?: Uint8Array;
            value?: Uint8Array;
        } & {
            key?: Uint8Array;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["clientMetadata"][number], keyof GenesisMetadata>]: never; })[] & { [K_4 in Exclude<keyof I_1["clientMetadata"], keyof {
            key?: Uint8Array;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof IdentifiedGenesisMetadata>]: never; }>(object: I_1): IdentifiedGenesisMetadata;
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
