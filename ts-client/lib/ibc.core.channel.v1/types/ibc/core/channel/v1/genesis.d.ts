import _m0 from "protobufjs/minimal";
import { IdentifiedChannel, PacketState, Params } from "./channel";
export declare const protobufPackage = "ibc.core.channel.v1";
/** GenesisState defines the ibc channel submodule's genesis state. */
export interface GenesisState {
    channels: IdentifiedChannel[];
    acknowledgements: PacketState[];
    commitments: PacketState[];
    receipts: PacketState[];
    sendSequences: PacketSequence[];
    recvSequences: PacketSequence[];
    ackSequences: PacketSequence[];
    /** the sequence for the next generated channel identifier */
    nextChannelSequence: number;
    params: Params | undefined;
}
/**
 * PacketSequence defines the genesis type necessary to retrieve and store
 * next send and receive sequences.
 */
export interface PacketSequence {
    portId: string;
    channelId: string;
    sequence: number;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[];
        acknowledgements?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[];
        commitments?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[];
        receipts?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[];
        sendSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[];
        recvSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[];
        ackSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[];
        nextChannelSequence?: number;
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        };
    } & {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[] & ({
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K in Exclude<keyof I["channels"][number]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_1 in Exclude<keyof I["channels"][number]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & { [K_2 in Exclude<keyof I["channels"][number], keyof IdentifiedChannel>]: never; })[] & { [K_3 in Exclude<keyof I["channels"], keyof {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[]>]: never; };
        acknowledgements?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & { [K_4 in Exclude<keyof I["acknowledgements"][number], keyof PacketState>]: never; })[] & { [K_5 in Exclude<keyof I["acknowledgements"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[]>]: never; };
        commitments?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & { [K_6 in Exclude<keyof I["commitments"][number], keyof PacketState>]: never; })[] & { [K_7 in Exclude<keyof I["commitments"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[]>]: never; };
        receipts?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & { [K_8 in Exclude<keyof I["receipts"][number], keyof PacketState>]: never; })[] & { [K_9 in Exclude<keyof I["receipts"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[]>]: never; };
        sendSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_10 in Exclude<keyof I["sendSequences"][number], keyof PacketSequence>]: never; })[] & { [K_11 in Exclude<keyof I["sendSequences"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[]>]: never; };
        recvSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_12 in Exclude<keyof I["recvSequences"][number], keyof PacketSequence>]: never; })[] & { [K_13 in Exclude<keyof I["recvSequences"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[]>]: never; };
        ackSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_14 in Exclude<keyof I["ackSequences"][number], keyof PacketSequence>]: never; })[] & { [K_15 in Exclude<keyof I["ackSequences"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[]>]: never; };
        nextChannelSequence?: number;
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        } & {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_16 in Exclude<keyof I["params"]["upgradeTimeout"]["height"], keyof import("../../client/v1/client").Height>]: never; };
                timestamp?: number;
            } & { [K_17 in Exclude<keyof I["params"]["upgradeTimeout"], keyof import("./channel").Timeout>]: never; };
        } & { [K_18 in Exclude<keyof I["params"], "upgradeTimeout">]: never; };
    } & { [K_19 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[];
        acknowledgements?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[];
        commitments?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[];
        receipts?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[];
        sendSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[];
        recvSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[];
        ackSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[];
        nextChannelSequence?: number;
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        };
    } & {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[] & ({
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K_20 in Exclude<keyof I_1["channels"][number]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_21 in Exclude<keyof I_1["channels"][number]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & { [K_22 in Exclude<keyof I_1["channels"][number], keyof IdentifiedChannel>]: never; })[] & { [K_23 in Exclude<keyof I_1["channels"], keyof {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[]>]: never; };
        acknowledgements?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & { [K_24 in Exclude<keyof I_1["acknowledgements"][number], keyof PacketState>]: never; })[] & { [K_25 in Exclude<keyof I_1["acknowledgements"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[]>]: never; };
        commitments?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & { [K_26 in Exclude<keyof I_1["commitments"][number], keyof PacketState>]: never; })[] & { [K_27 in Exclude<keyof I_1["commitments"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[]>]: never; };
        receipts?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & { [K_28 in Exclude<keyof I_1["receipts"][number], keyof PacketState>]: never; })[] & { [K_29 in Exclude<keyof I_1["receipts"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[]>]: never; };
        sendSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_30 in Exclude<keyof I_1["sendSequences"][number], keyof PacketSequence>]: never; })[] & { [K_31 in Exclude<keyof I_1["sendSequences"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[]>]: never; };
        recvSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_32 in Exclude<keyof I_1["recvSequences"][number], keyof PacketSequence>]: never; })[] & { [K_33 in Exclude<keyof I_1["recvSequences"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[]>]: never; };
        ackSequences?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_34 in Exclude<keyof I_1["ackSequences"][number], keyof PacketSequence>]: never; })[] & { [K_35 in Exclude<keyof I_1["ackSequences"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
        }[]>]: never; };
        nextChannelSequence?: number;
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        } & {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            } & {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & {
                    revisionNumber?: number;
                    revisionHeight?: number;
                } & { [K_36 in Exclude<keyof I_1["params"]["upgradeTimeout"]["height"], keyof import("../../client/v1/client").Height>]: never; };
                timestamp?: number;
            } & { [K_37 in Exclude<keyof I_1["params"]["upgradeTimeout"], keyof import("./channel").Timeout>]: never; };
        } & { [K_38 in Exclude<keyof I_1["params"], "upgradeTimeout">]: never; };
    } & { [K_39 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
};
export declare const PacketSequence: {
    encode(message: PacketSequence, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PacketSequence;
    fromJSON(object: any): PacketSequence;
    toJSON(message: PacketSequence): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & { [K in Exclude<keyof I, keyof PacketSequence>]: never; }>(base?: I): PacketSequence;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof PacketSequence>]: never; }>(object: I_1): PacketSequence;
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
