import _m0 from "protobufjs/minimal";
import { Height } from "../../client/v1/client";
export declare const protobufPackage = "ibc.core.channel.v1";
/**
 * State defines if a channel is in one of the following states:
 * CLOSED, INIT, TRYOPEN, OPEN, FLUSHING, FLUSHCOMPLETE or UNINITIALIZED.
 */
export declare enum State {
    /** STATE_UNINITIALIZED_UNSPECIFIED - Default State */
    STATE_UNINITIALIZED_UNSPECIFIED = 0,
    /** STATE_INIT - A channel has just started the opening handshake. */
    STATE_INIT = 1,
    /** STATE_TRYOPEN - A channel has acknowledged the handshake step on the counterparty chain. */
    STATE_TRYOPEN = 2,
    /**
     * STATE_OPEN - A channel has completed the handshake. Open channels are
     * ready to send and receive packets.
     */
    STATE_OPEN = 3,
    /**
     * STATE_CLOSED - A channel has been closed and can no longer be used to send or receive
     * packets.
     */
    STATE_CLOSED = 4,
    /** STATE_FLUSHING - A channel has just accepted the upgrade handshake attempt and is flushing in-flight packets. */
    STATE_FLUSHING = 5,
    /** STATE_FLUSHCOMPLETE - A channel has just completed flushing any in-flight packets. */
    STATE_FLUSHCOMPLETE = 6,
    UNRECOGNIZED = -1
}
export declare function stateFromJSON(object: any): State;
export declare function stateToJSON(object: State): string;
/** Order defines if a channel is ORDERED or UNORDERED */
export declare enum Order {
    /** ORDER_NONE_UNSPECIFIED - zero-value for channel ordering */
    ORDER_NONE_UNSPECIFIED = 0,
    /**
     * ORDER_UNORDERED - packets can be delivered in any order, which may differ from the order in
     * which they were sent.
     */
    ORDER_UNORDERED = 1,
    /** ORDER_ORDERED - packets are delivered exactly in the order which they were sent */
    ORDER_ORDERED = 2,
    UNRECOGNIZED = -1
}
export declare function orderFromJSON(object: any): Order;
export declare function orderToJSON(object: Order): string;
/**
 * Channel defines pipeline for exactly-once packet delivery between specific
 * modules on separate blockchains, which has at least one end capable of
 * sending packets and one end capable of receiving packets.
 */
export interface Channel {
    /** current state of the channel end */
    state: State;
    /** whether the channel is ordered or unordered */
    ordering: Order;
    /** counterparty channel end */
    counterparty: Counterparty | undefined;
    /**
     * list of connection identifiers, in order, along which packets sent on
     * this channel will travel
     */
    connectionHops: string[];
    /** opaque channel version, which is agreed upon during the handshake */
    version: string;
    /**
     * upgrade sequence indicates the latest upgrade attempt performed by this channel
     * the value of 0 indicates the channel has never been upgraded
     */
    upgradeSequence: number;
}
/**
 * IdentifiedChannel defines a channel with additional port and channel
 * identifier fields.
 */
export interface IdentifiedChannel {
    /** current state of the channel end */
    state: State;
    /** whether the channel is ordered or unordered */
    ordering: Order;
    /** counterparty channel end */
    counterparty: Counterparty | undefined;
    /**
     * list of connection identifiers, in order, along which packets sent on
     * this channel will travel
     */
    connectionHops: string[];
    /** opaque channel version, which is agreed upon during the handshake */
    version: string;
    /** port identifier */
    portId: string;
    /** channel identifier */
    channelId: string;
    /**
     * upgrade sequence indicates the latest upgrade attempt performed by this channel
     * the value of 0 indicates the channel has never been upgraded
     */
    upgradeSequence: number;
}
/** Counterparty defines a channel end counterparty */
export interface Counterparty {
    /** port on the counterparty chain which owns the other end of the channel. */
    portId: string;
    /** channel end on the counterparty chain */
    channelId: string;
}
/** Packet defines a type that carries data across different chains through IBC */
export interface Packet {
    /**
     * number corresponds to the order of sends and receives, where a Packet
     * with an earlier sequence number must be sent and received before a Packet
     * with a later sequence number.
     */
    sequence: number;
    /** identifies the port on the sending chain. */
    sourcePort: string;
    /** identifies the channel end on the sending chain. */
    sourceChannel: string;
    /** identifies the port on the receiving chain. */
    destinationPort: string;
    /** identifies the channel end on the receiving chain. */
    destinationChannel: string;
    /** actual opaque bytes transferred directly to the application module */
    data: Uint8Array;
    /** block height after which the packet times out */
    timeoutHeight: Height | undefined;
    /** block timestamp (in nanoseconds) after which the packet times out */
    timeoutTimestamp: number;
}
/**
 * PacketState defines the generic type necessary to retrieve and store
 * packet commitments, acknowledgements, and receipts.
 * Caller is responsible for knowing the context necessary to interpret this
 * state as a commitment, acknowledgement, or a receipt.
 */
export interface PacketState {
    /** channel port identifier. */
    portId: string;
    /** channel unique identifier. */
    channelId: string;
    /** packet sequence. */
    sequence: number;
    /** embedded data that represents packet state. */
    data: Uint8Array;
}
/**
 * PacketId is an identifer for a unique Packet
 * Source chains refer to packets by source port/channel
 * Destination chains refer to packets by destination port/channel
 */
export interface PacketId {
    /** channel port identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
    /** packet sequence */
    sequence: number;
}
/**
 * Acknowledgement is the recommended acknowledgement format to be used by
 * app-specific protocols.
 * NOTE: The field numbers 21 and 22 were explicitly chosen to avoid accidental
 * conflicts with other protobuf message formats used for acknowledgements.
 * The first byte of any message with this format will be the non-ASCII values
 * `0xaa` (result) or `0xb2` (error). Implemented as defined by ICS:
 * https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#acknowledgement-envelope
 */
export interface Acknowledgement {
    result?: Uint8Array | undefined;
    error?: string | undefined;
}
/**
 * Timeout defines an execution deadline structure for 04-channel handlers.
 * This includes packet lifecycle handlers as well as the upgrade handshake handlers.
 * A valid Timeout contains either one or both of a timestamp and block height (sequence).
 */
export interface Timeout {
    /** block height after which the packet or upgrade times out */
    height: Height | undefined;
    /** block timestamp (in nanoseconds) after which the packet or upgrade times out */
    timestamp: number;
}
/** Params defines the set of IBC channel parameters. */
export interface Params {
    /** the relative timeout after which channel upgrades will time out. */
    upgradeTimeout: Timeout | undefined;
}
export declare const Channel: {
    encode(message: Channel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Channel;
    fromJSON(object: any): Channel;
    toJSON(message: Channel): unknown;
    create<I extends {
        state?: State;
        ordering?: Order;
        counterparty?: {
            portId?: string;
            channelId?: string;
        };
        connectionHops?: string[];
        version?: string;
        upgradeSequence?: number;
    } & {
        state?: State;
        ordering?: Order;
        counterparty?: {
            portId?: string;
            channelId?: string;
        } & {
            portId?: string;
            channelId?: string;
        } & { [K in Exclude<keyof I["counterparty"], keyof Counterparty>]: never; };
        connectionHops?: string[] & string[] & { [K_1 in Exclude<keyof I["connectionHops"], keyof string[]>]: never; };
        version?: string;
        upgradeSequence?: number;
    } & { [K_2 in Exclude<keyof I, keyof Channel>]: never; }>(base?: I): Channel;
    fromPartial<I_1 extends {
        state?: State;
        ordering?: Order;
        counterparty?: {
            portId?: string;
            channelId?: string;
        };
        connectionHops?: string[];
        version?: string;
        upgradeSequence?: number;
    } & {
        state?: State;
        ordering?: Order;
        counterparty?: {
            portId?: string;
            channelId?: string;
        } & {
            portId?: string;
            channelId?: string;
        } & { [K_3 in Exclude<keyof I_1["counterparty"], keyof Counterparty>]: never; };
        connectionHops?: string[] & string[] & { [K_4 in Exclude<keyof I_1["connectionHops"], keyof string[]>]: never; };
        version?: string;
        upgradeSequence?: number;
    } & { [K_5 in Exclude<keyof I_1, keyof Channel>]: never; }>(object: I_1): Channel;
};
export declare const IdentifiedChannel: {
    encode(message: IdentifiedChannel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): IdentifiedChannel;
    fromJSON(object: any): IdentifiedChannel;
    toJSON(message: IdentifiedChannel): unknown;
    create<I extends {
        state?: State;
        ordering?: Order;
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
        state?: State;
        ordering?: Order;
        counterparty?: {
            portId?: string;
            channelId?: string;
        } & {
            portId?: string;
            channelId?: string;
        } & { [K in Exclude<keyof I["counterparty"], keyof Counterparty>]: never; };
        connectionHops?: string[] & string[] & { [K_1 in Exclude<keyof I["connectionHops"], keyof string[]>]: never; };
        version?: string;
        portId?: string;
        channelId?: string;
        upgradeSequence?: number;
    } & { [K_2 in Exclude<keyof I, keyof IdentifiedChannel>]: never; }>(base?: I): IdentifiedChannel;
    fromPartial<I_1 extends {
        state?: State;
        ordering?: Order;
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
        state?: State;
        ordering?: Order;
        counterparty?: {
            portId?: string;
            channelId?: string;
        } & {
            portId?: string;
            channelId?: string;
        } & { [K_3 in Exclude<keyof I_1["counterparty"], keyof Counterparty>]: never; };
        connectionHops?: string[] & string[] & { [K_4 in Exclude<keyof I_1["connectionHops"], keyof string[]>]: never; };
        version?: string;
        portId?: string;
        channelId?: string;
        upgradeSequence?: number;
    } & { [K_5 in Exclude<keyof I_1, keyof IdentifiedChannel>]: never; }>(object: I_1): IdentifiedChannel;
};
export declare const Counterparty: {
    encode(message: Counterparty, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Counterparty;
    fromJSON(object: any): Counterparty;
    toJSON(message: Counterparty): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof Counterparty>]: never; }>(base?: I): Counterparty;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof Counterparty>]: never; }>(object: I_1): Counterparty;
};
export declare const Packet: {
    encode(message: Packet, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Packet;
    fromJSON(object: any): Packet;
    toJSON(message: Packet): unknown;
    create<I extends {
        sequence?: number;
        sourcePort?: string;
        sourceChannel?: string;
        destinationPort?: string;
        destinationChannel?: string;
        data?: Uint8Array;
        timeoutHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        timeoutTimestamp?: number;
    } & {
        sequence?: number;
        sourcePort?: string;
        sourceChannel?: string;
        destinationPort?: string;
        destinationChannel?: string;
        data?: Uint8Array;
        timeoutHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["timeoutHeight"], keyof Height>]: never; };
        timeoutTimestamp?: number;
    } & { [K_1 in Exclude<keyof I, keyof Packet>]: never; }>(base?: I): Packet;
    fromPartial<I_1 extends {
        sequence?: number;
        sourcePort?: string;
        sourceChannel?: string;
        destinationPort?: string;
        destinationChannel?: string;
        data?: Uint8Array;
        timeoutHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        timeoutTimestamp?: number;
    } & {
        sequence?: number;
        sourcePort?: string;
        sourceChannel?: string;
        destinationPort?: string;
        destinationChannel?: string;
        data?: Uint8Array;
        timeoutHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["timeoutHeight"], keyof Height>]: never; };
        timeoutTimestamp?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof Packet>]: never; }>(object: I_1): Packet;
};
export declare const PacketState: {
    encode(message: PacketState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PacketState;
    fromJSON(object: any): PacketState;
    toJSON(message: PacketState): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
        data?: Uint8Array;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof PacketState>]: never; }>(base?: I): PacketState;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
        data?: Uint8Array;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof PacketState>]: never; }>(object: I_1): PacketState;
};
export declare const PacketId: {
    encode(message: PacketId, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PacketId;
    fromJSON(object: any): PacketId;
    toJSON(message: PacketId): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & { [K in Exclude<keyof I, keyof PacketId>]: never; }>(base?: I): PacketId;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof PacketId>]: never; }>(object: I_1): PacketId;
};
export declare const Acknowledgement: {
    encode(message: Acknowledgement, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Acknowledgement;
    fromJSON(object: any): Acknowledgement;
    toJSON(message: Acknowledgement): unknown;
    create<I extends {
        result?: Uint8Array | undefined;
        error?: string | undefined;
    } & {
        result?: Uint8Array | undefined;
        error?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Acknowledgement>]: never; }>(base?: I): Acknowledgement;
    fromPartial<I_1 extends {
        result?: Uint8Array | undefined;
        error?: string | undefined;
    } & {
        result?: Uint8Array | undefined;
        error?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Acknowledgement>]: never; }>(object: I_1): Acknowledgement;
};
export declare const Timeout: {
    encode(message: Timeout, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Timeout;
    fromJSON(object: any): Timeout;
    toJSON(message: Timeout): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["height"], keyof Height>]: never; };
        timestamp?: number;
    } & { [K_1 in Exclude<keyof I, keyof Timeout>]: never; }>(base?: I): Timeout;
    fromPartial<I_1 extends {
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
        } & { [K_2 in Exclude<keyof I_1["height"], keyof Height>]: never; };
        timestamp?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof Timeout>]: never; }>(object: I_1): Timeout;
};
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
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
            } & { [K in Exclude<keyof I["upgradeTimeout"]["height"], keyof Height>]: never; };
            timestamp?: number;
        } & { [K_1 in Exclude<keyof I["upgradeTimeout"], keyof Timeout>]: never; };
    } & { [K_2 in Exclude<keyof I, "upgradeTimeout">]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
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
            } & { [K_3 in Exclude<keyof I_1["upgradeTimeout"]["height"], keyof Height>]: never; };
            timestamp?: number;
        } & { [K_4 in Exclude<keyof I_1["upgradeTimeout"], keyof Timeout>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "upgradeTimeout">]: never; }>(object: I_1): Params;
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
