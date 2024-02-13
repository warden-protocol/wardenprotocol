import _m0 from "protobufjs/minimal";
import { Plan } from "../../../../cosmos/upgrade/v1beta1/upgrade";
import { Any } from "../../../../google/protobuf/any";
export declare const protobufPackage = "ibc.core.client.v1";
/**
 * IdentifiedClientState defines a client state with an additional client
 * identifier field.
 */
export interface IdentifiedClientState {
    /** client identifier */
    clientId: string;
    /** client state */
    clientState: Any | undefined;
}
/**
 * ConsensusStateWithHeight defines a consensus state with an additional height
 * field.
 */
export interface ConsensusStateWithHeight {
    /** consensus state height */
    height: Height | undefined;
    /** consensus state */
    consensusState: Any | undefined;
}
/**
 * ClientConsensusStates defines all the stored consensus states for a given
 * client.
 */
export interface ClientConsensusStates {
    /** client identifier */
    clientId: string;
    /** consensus states and their heights associated with the client */
    consensusStates: ConsensusStateWithHeight[];
}
/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 */
export interface Height {
    /** the revision that the client is currently on */
    revisionNumber: number;
    /** the height within the given revision */
    revisionHeight: number;
}
/** Params defines the set of IBC light client parameters. */
export interface Params {
    /**
     * allowed_clients defines the list of allowed client state types which can be created
     * and interacted with. If a client type is removed from the allowed clients list, usage
     * of this client will be disabled until it is added again to the list.
     */
    allowedClients: string[];
}
/**
 * ClientUpdateProposal is a legacy governance proposal. If it passes, the substitute
 * client's latest consensus state is copied over to the subject client. The proposal
 * handler may fail if the subject and the substitute do not match in client and
 * chain parameters (with exception to latest height, frozen height, and chain-id).
 *
 * Deprecated: Please use MsgRecoverClient in favour of this message type.
 *
 * @deprecated
 */
export interface ClientUpdateProposal {
    /** the title of the update proposal */
    title: string;
    /** the description of the proposal */
    description: string;
    /** the client identifier for the client to be updated if the proposal passes */
    subjectClientId: string;
    /**
     * the substitute client identifier for the client standing in for the subject
     * client
     */
    substituteClientId: string;
}
/**
 * UpgradeProposal is a gov Content type for initiating an IBC breaking
 * upgrade.
 *
 * Deprecated: Please use MsgIBCSoftwareUpgrade in favour of this message type.
 *
 * @deprecated
 */
export interface UpgradeProposal {
    title: string;
    description: string;
    plan: Plan | undefined;
    /**
     * An UpgradedClientState must be provided to perform an IBC breaking upgrade.
     * This will make the chain commit to the correct upgraded (self) client state
     * before the upgrade occurs, so that connecting chains can verify that the
     * new upgraded client is valid by verifying a proof on the previous version
     * of the chain. This will allow IBC connections to persist smoothly across
     * planned chain upgrades
     */
    upgradedClientState: Any | undefined;
}
export declare const IdentifiedClientState: {
    encode(message: IdentifiedClientState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): IdentifiedClientState;
    fromJSON(object: any): IdentifiedClientState;
    toJSON(message: IdentifiedClientState): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["clientState"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof IdentifiedClientState>]: never; }>(base?: I): IdentifiedClientState;
    fromPartial<I_1 extends {
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
        } & { [K_2 in Exclude<keyof I_1["clientState"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof IdentifiedClientState>]: never; }>(object: I_1): IdentifiedClientState;
};
export declare const ConsensusStateWithHeight: {
    encode(message: ConsensusStateWithHeight, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusStateWithHeight;
    fromJSON(object: any): ConsensusStateWithHeight;
    toJSON(message: ConsensusStateWithHeight): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["height"], keyof Height>]: never; };
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["consensusState"], keyof Any>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ConsensusStateWithHeight>]: never; }>(base?: I): ConsensusStateWithHeight;
    fromPartial<I_1 extends {
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
        } & { [K_3 in Exclude<keyof I_1["height"], keyof Height>]: never; };
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_4 in Exclude<keyof I_1["consensusState"], keyof Any>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof ConsensusStateWithHeight>]: never; }>(object: I_1): ConsensusStateWithHeight;
};
export declare const ClientConsensusStates: {
    encode(message: ClientConsensusStates, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClientConsensusStates;
    fromJSON(object: any): ClientConsensusStates;
    toJSON(message: ClientConsensusStates): unknown;
    create<I extends {
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
    } & { [K_4 in Exclude<keyof I, keyof ClientConsensusStates>]: never; }>(base?: I): ClientConsensusStates;
    fromPartial<I_1 extends {
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
            } & { [K_5 in Exclude<keyof I_1["consensusStates"][number]["height"], keyof Height>]: never; };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_6 in Exclude<keyof I_1["consensusStates"][number]["consensusState"], keyof Any>]: never; };
        } & { [K_7 in Exclude<keyof I_1["consensusStates"][number], keyof ConsensusStateWithHeight>]: never; })[] & { [K_8 in Exclude<keyof I_1["consensusStates"], keyof {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            consensusState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof ClientConsensusStates>]: never; }>(object: I_1): ClientConsensusStates;
};
export declare const Height: {
    encode(message: Height, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Height;
    fromJSON(object: any): Height;
    toJSON(message: Height): unknown;
    create<I extends {
        revisionNumber?: number;
        revisionHeight?: number;
    } & {
        revisionNumber?: number;
        revisionHeight?: number;
    } & { [K in Exclude<keyof I, keyof Height>]: never; }>(base?: I): Height;
    fromPartial<I_1 extends {
        revisionNumber?: number;
        revisionHeight?: number;
    } & {
        revisionNumber?: number;
        revisionHeight?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof Height>]: never; }>(object: I_1): Height;
};
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        allowedClients?: string[];
    } & {
        allowedClients?: string[] & string[] & { [K in Exclude<keyof I["allowedClients"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "allowedClients">]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        allowedClients?: string[];
    } & {
        allowedClients?: string[] & string[] & { [K_2 in Exclude<keyof I_1["allowedClients"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "allowedClients">]: never; }>(object: I_1): Params;
};
export declare const ClientUpdateProposal: {
    encode(message: ClientUpdateProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClientUpdateProposal;
    fromJSON(object: any): ClientUpdateProposal;
    toJSON(message: ClientUpdateProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        subjectClientId?: string;
        substituteClientId?: string;
    } & {
        title?: string;
        description?: string;
        subjectClientId?: string;
        substituteClientId?: string;
    } & { [K in Exclude<keyof I, keyof ClientUpdateProposal>]: never; }>(base?: I): ClientUpdateProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        subjectClientId?: string;
        substituteClientId?: string;
    } & {
        title?: string;
        description?: string;
        subjectClientId?: string;
        substituteClientId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof ClientUpdateProposal>]: never; }>(object: I_1): ClientUpdateProposal;
};
export declare const UpgradeProposal: {
    encode(message: UpgradeProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpgradeProposal;
    fromJSON(object: any): UpgradeProposal;
    toJSON(message: UpgradeProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        title?: string;
        description?: string;
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["plan"]["upgradedClientState"], keyof Any>]: never; };
        } & { [K_1 in Exclude<keyof I["plan"], keyof Plan>]: never; };
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I["upgradedClientState"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof UpgradeProposal>]: never; }>(base?: I): UpgradeProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        title?: string;
        description?: string;
        plan?: {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            name?: string;
            time?: Date;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_4 in Exclude<keyof I_1["plan"]["upgradedClientState"], keyof Any>]: never; };
        } & { [K_5 in Exclude<keyof I_1["plan"], keyof Plan>]: never; };
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_6 in Exclude<keyof I_1["upgradedClientState"], keyof Any>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof UpgradeProposal>]: never; }>(object: I_1): UpgradeProposal;
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
